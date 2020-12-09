import Logger from '../logging/logger.js'
import OptionItem from './option-item.js'
/**
 * A set of options grouped by domain. Domain name should be passed in `defaults.domain`.
 */
export default class Options {
  /**
   * Options is a class which encapsulates defaults and user preferences
   *
   * @param {object} defaults - defaults for the instance of the class.
   * Use DefaultsLoader class to convert defaults data from different sources.
   * Mandatory fields:
   *    {string} domain - A domain name that defines options context
   *    {Object} items - An object that represents options that are exposed to the user. Each property is an option name.
   * @param {StorageAdapter} storageAdapter - A storage adapter implementation
   */
  constructor (defaults, storageAdapter) {
    if (!defaults || !defaults.domain || !defaults.items || !defaults.version) {
      throw new Error('Defaults have no obligatory "domain", "version" and "items" properties')
    }
    if (!storageAdapter) {
      throw new Error('No storage adapter implementation provided')
    }

    this.defaults = defaults
    this.domain = defaults.domain
    this.version = defaults.version.toString()
    this.storageAdapter = storageAdapter
    this.items = Options.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version)
  }

  static initItems (defaults, storageAdapter, domain, version) {
    let items = {} // eslint-disable-line prefer-const
    for (const [option, value] of Object.entries(defaults)) {
      if (value.group) {
        items[option] = []
        for (const [group, item] of Object.entries(value.group)) {
          const key = Options.constructKey(domain, version, option, group)
          items[option].push(new OptionItem(item, key, storageAdapter))
        }
      } else {
        const key = Options.constructKey(domain, version, option)
        items[option] = new OptionItem(value, key, storageAdapter)
      }
    }
    return items
  }

  /**
   * Reset all options to default values
   */
  async reset () {
    await this.storageAdapter.clearAll()
    this.items = Options.initItems(this.defaults.items, this.storageAdapter)
  }

  get names () {
    return Object.keys(this.items)
  }

  /**
   * Loads options from the storage. Returns a promise that is resolved if options are loaded
   * successfully and that is rejectd if there was an error retrieving them.
   *
   * @returns {Promise<Options>}
   */
  async load () {
    try {
      const values = await this.storageAdapter.get()
      for (const key in values) {
        const parsedKey = Options.parseKey(key)
        // TODO when we do increase the version we should handle conversion
        if (this.items.hasOwnProperty(parsedKey.name) && this.version === parsedKey.version) { // eslint-disable-line no-prototype-builtins
          if (parsedKey.group) {
            this.items[parsedKey.name].forEach((f) => {
              if (f.name === key) {
                try {
                  f.currentValue = JSON.parse(values[key])
                } catch (e) {
                  Logger.getInstance().warn(`Unable to parse Alpheios option value for  ${parsedKey.name} from ${values[parsedKey.name]}`, e)
                }
              }
            })
          } else {
            try {
              this.items[parsedKey.name].currentValue = JSON.parse(values[key])
            } catch (e) {
              // invalid value
              Logger.getInstance().warn(`Unable to parse Alpheios option value for  ${parsedKey.name} from ${values[parsedKey.name]}`, e)
            }
          }
        }
      }
      return this
    } catch (error) {
      const message = `Unexpected error retrieving options for Alpheios from local storage: ${error}. Default values ` +
      'will be used instead'
      Logger.getInstance().error(message)
    }
  }

  /**
   * Construct a key for a stored setting
   * To future proof the stored settings, we include domain and version
   * in the key name. Grouped settings are also flattened.
   *
   * @param {string} domain - the setting domain
   * @param {string} version - the setting version
   * @param {string} name - the setting name
   * @param {string} group - optional setting group
   */
  static constructKey (domain, version, name, group = null) {
    let key = `${domain}__${version}__${name}`
    if (group) {
      key = `${key}__${group}`
    }
    return key
  }

  /**
   * Parse a stored setting name into a semantically meaningful object
   *
   * @param key
   */
  static parseKey (key) {
    const [domain, version, name, group] = key.split('__', 4)
    let parsed
    try {
      parsed = {
        domain: domain,
        version: version,
        name: name,
        group: group
      }
    } catch (e) {
      Logger.getInstance().warn(`Failed to parse stored Alpheios options key ${key}`)
    }
    return parsed
  }

  /**
   * Converts optionItems to the object: { name of the option: currentValue }
   *
   * @returns {object}
   */
  get formatLabelValueList () {
    let result = {} // eslint-disable-line prefer-const
    Object.keys(this.items).forEach(nameItem => {
      result[nameItem] = this.items[nameItem].currentValue
    })
    return result
  }

  /**
   * Uploads values list from array if an option has valuesArray feature
   *
   * @param {object} valuesArrayList - with format nameValuesArray: Array[option's values]
   */
  checkAndUploadValuesFromArray (valuesArrayList) {
    Object.values(this.items).forEach(optionItem => {
      if (optionItem.valuesArray && !optionItem.values && valuesArrayList[optionItem.valuesArray]) {
        optionItem.uploadValuesFromArray(valuesArrayList[optionItem.valuesArray])
      }
    })
  }

  /**
   *
   * @param {string} domainPostfix - additional string for creating unique domain name
   * @param {StorageAdapter} storageAdapter - class of the storage adapter
   */
  clone (domainPostfix, storageAdapter) {
    let defaults = Object.assign({}, this.defaults) // eslint-disable-line prefer-const

    defaults.domain = `${defaults.domain}-${domainPostfix}`
    const newOptions = new Options(defaults, new storageAdapter(defaults.domain)) // eslint-disable-line new-cap
    Object.keys(newOptions.items).forEach(optionKey => {
      let newOptionItem = newOptions.items[optionKey] // eslint-disable-line prefer-const

      if (this.items[optionKey].values) {
        newOptionItem.uploadValuesFromArray(this.items[optionKey].values)
      }
    })

    return newOptions
  }
}
