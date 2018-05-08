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
   * @param {Function<StorageAdapter>} StorageAdapter - A storage adapter implementation
   */
  constructor (defaults, StorageAdapter) {
    if (!defaults || !defaults.domain || !defaults.items) {
      throw new Error(`Defaults have no obligatory "domain" and "items" properties`)
    }
    if (!StorageAdapter) {
      throw new Error(`No storage adapter implementation provided`)
    }
    for (const key of Object.keys(defaults)) {
      this[key] = defaults[key]
    }
    this.storageAdapter = new StorageAdapter(defaults.domain)

    this.items = Options.initItems(this.items, this.storageAdapter)
  }

  static initItems (defaults, storageAdapter) {
    let items = {}
    for (let [option, value] of Object.entries(defaults)) {
      if (value.group) {
        items[option] = []
        for (let [key, item] of Object.entries(value.group)) {
          items[option].push(new OptionItem(item, `${option}-${key}`, storageAdapter))
        }
      } else {
        items[option] = new OptionItem(value, option, storageAdapter)
      }
    }
    return items
  }

  get names () {
    return Object.keys(this.items)
  }

  /**
   * Will always return a resolved promise.
   */
  load (callbackFunc) {
    this.storageAdapter.get().then(
      values => {
        for (let key in values) {
          if (this.items.hasOwnProperty(key)) {
            let value
            try {
              value = JSON.parse(values[key])
            } catch (e) {
              // backwards compatibility
              value = values[key]
            }
            this.items[key].currentValue = value
          } else {
            let keyinfo = this.parseKey(key)
            if (this.items.hasOwnProperty(keyinfo.setting)) {
              this.items[keyinfo.setting].forEach((f) => {
                if (f.name === key) {
                  try {
                    f.currentValue = JSON.parse(values[key])
                  } catch (e) {
                    // backwards compatibility
                    f.currentValue = values[key]
                  }
                }
              })
            }
          }
        }
        callbackFunc(this)
      },
      error => {
        console.error(`Cannot retrieve options for Alpheios extension from a local storage: ${error}. Default values
          will be used instead`, error)
        callbackFunc(this)
      }
    )
  }

  /**
  * Parse a stored setting name into its component parts
  * (for simplicity of the data structure, setting names are stored under
  * keys which combine the setting and the language)
  */
  parseKey (name) {
    let [setting, group] = name.split('-', 2)
    return {
      setting: setting,
      group: group
    }
  }
}