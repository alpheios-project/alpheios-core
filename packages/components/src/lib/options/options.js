import OptionItem from './options-item.js'
/**
 * A set of options grouped by domain. Domain name should be passed in `defaults.domain`.
 */
export default class Options {
  /**
   * Options is a class which encapsulates defaults and user preferences
   * @param {Object} defaults - defaults for the instance of the class.
   * Use DefaultsLoader class to convert defaults data from different sources.
   * Mandatory fields:
   *    {string} domain - A domain name that defines options context
   *    {Object} items - An object that represents options that are exposed to the user. Each property is an option name.
   * @param {StorageAdapter} storageAdapter - A storage adapter implementation
   */
  constructor (defaults, storageAdapter) {
    if (!defaults || !defaults.domain || !defaults.items || !defaults.version) {
      throw new Error(`Defaults have no obligatory "domain", "version" and "items" properties`)
    }
    if (!storageAdapter) {
      throw new Error(`No storage adapter implementation provided`)
    }

    this.defaults = defaults
    this.domain = defaults.domain
    this.version = defaults.version
    this.storageAdapter = storageAdapter
    this.items = Options.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version)
  }

  static initItems (defaults, storageAdapter, domain, version) {
    let items = {}
    for (let [option, value] of Object.entries(defaults)) {
      if (value.group) {
        items[option] = []
        for (let [group, item] of Object.entries(value.group)) {
          let key = Options.constructKey(domain,version,option,group)
          items[option].push(new OptionItem(item, key, storageAdapter))
        }
      } else {
        let key = Options.constructKey(domain,version,option)
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
   * @returns {Promise<Options>}
   */
  async load () {
    try {
      let values = await this.storageAdapter.get()
      for (let key in values) {
        let parsedKey = Options.parseKey(key)
        // TODO when we do increase the version we should handle conversion
        if (this.items.hasOwnProperty(parsedKey.name) && this.version == parsedKey.version) {
          if (parsedKey.group) {
            this.items[parsedKey.name].forEach((f) => {
              if (f.name === key) {
                try {
                  f.currentValue = JSON.parse(values[key])
                } catch (e) {
                  console.warn(`Unable to parse option value for  ${parsedKey.name} from ${values[parsedKey.name]}`, e)
                }
              }
            })
          } else {
            let value
            try {
              this.items[parsedKey.name].currentValue = JSON.parse(values[key])
            } catch (e) {
              // invalid value
              console.warn(`Unable to parse option value for  ${parsedKey.name} from ${values[parsedKey.name]}`, e)
            }
          }
        } else {
          console.warn(`Unrecognized setting ${parsedKey.name} or version ${parsedKey.version}`)
        }
      }
      return this
    } catch (error) {
      let message = `Cannot retrieve options for Alpheios extension from a local storage: ${error}. Default values ` +
      `will be used instead`
      console.error(message)
    }
  }

  /**
   * Construct a key for a stored setting
   * To future proof the stored settings, we include domain and version
   * in the key name. Grouped settings are also flattened.
   * @param {String} domain - the setting domain
   * @param {String} version - the setting version
   * @param {String} name - the setting name
   * @param {String} group - optional setting group
   */
  static constructKey (domain, version, name, group=null) {
    let key = `${domain}__${version}__${name}`
    if (group) {
      key = `${key}__${group}`
    }
    return key
  }

  /**
  * Parse a stored setting name into a semantically meaningful object
  */
  static parseKey (key) {
    let [domain, version, name, group] = key.split('__', 4)
    let parsed
    try {
      parsed = {
        domain: domain,
        version: parseInt(version),
        name: name,
        group: group
      }
    } catch (e) {
      console.warn(`Unable to parse options key ${key}`)
    }
    return parsed
  }
}
