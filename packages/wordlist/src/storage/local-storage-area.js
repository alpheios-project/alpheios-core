import StorageAdapter from '@/storage/storage-adapter.js'

/**
 * An implementation of a StorageAdapter interface for a local storage.
 */
export default class LocalStorageArea extends StorageAdapter {
  /**
   * A wrapper around a local storage `setItem()` function.
   * It allows to store one or several key-value pairs to local storage.
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @return {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  async set (keysObject) {
    try {
      let keys = window.localStorage.getItem(`${this.domain}-keys`)
      if (keys) {
        keys = JSON.parse(keys)
      } else {
        keys = [] // No keys in storage yet
      }
      for (const [key, value] of Object.entries(keysObject)) {
        window.localStorage.setItem(key, value)
        if (!keys.includes(key)) {
          keys.push(key)
        }
      }
      // Save a list of keys to the local storage
      window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify(keys))
      return true
    } catch (e) {
      return e
    }  
  }

  /**
   * A wrapper around a local storage `removeItem()` function.
   * It allows to remove one key-value pair from local storage.
   * @param {String} key - key of the item to be removed.
   * If a particular item exists, it will be removed.
   * @return {Promise} - A promise that is resolved with with true if a key was removed
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  async remove (key) {
      try {
        let result = null
        if (key) {
          let keys = window.localStorage.getItem(`${this.domain}-keys`)
          if (keys) {
            keys = JSON.parse(keys)

            let index = keys.indexOf(key)
            if (index !== -1) { keys.splice(index, 1) }

            window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify(keys))
            window.localStorage.removeItem(key)
            return true
          } else {
            // Nothing to retrieve
            console.log(`Unable to retrieve data for "${this.domain}" storage domain because no keys provided or no keys listed in local storage. ` +
              `This might be normal for devices where no data is saved to the local storage yet`)
            return false
          }
        }
      } catch (e) {
        return (e)
      }
  }

  /**
   * A wrapper around a local storage `getItem()` function. It retrieves one or several values from
   * local storage.
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @return {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  async get (keys = undefined) {
      try {
        if (!keys) {
          keys = []
        } else if (Array.isArray(keys) && keys.length === 0) {
          keys = []
        } else if (typeof keys === 'string') {
          keys = [keys]
        } else if (typeof keys === 'object') {
          keys = Object.keys(keys)
        } else {
          keys = []
        }

        let result = {}
        if (keys.length === 0) {
          // If no keys specified, will retrieve all values
          keys = window.localStorage.getItem(`${this.domain}-keys`)
          if (keys) {
            keys = JSON.parse(keys)
          } else {
            // Nothing to retrieve
            console.log(`Unable to retrieve data for "${this.domain}" storage domain because no keys provided or no keys listed in local storage. ` +
              `This might be normal for devices where no data is saved to the local storage yet`)
            return false
          }
        }

        for (const key of keys) {
          result[key] = window.localStorage.getItem(key)
        }

        return result
      } catch (e) {
        return e
      }
  }
}