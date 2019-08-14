import StorageAdapter from './storage-adapter.js'

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
  set (keysObject) {
    return new Promise((resolve, reject) => {
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
      } catch (e) {
        reject(e)
      }
      resolve()
    })
  }

  /**
   * A wrapper around a local storage `removeItem()` function.
   * It allows to remove one key-value pair from the local storage.
   *
   * @param {string} key - a key of the item to be removed.
   * If a pair with the key specified exists, it will be removed.
   * @returns {Promise} - A promise that is resolved with with `true` if a key-value pair was removed
   * successfully. If the pair for removal is not in the storage, a promise is resolved with the `null` value.
   * If a removal operation fails for any reason, a promise is rejected with the error.
   */
  remove (key) {
    return new Promise((resolve, reject) => {
      try {
        if (key) {
          let keys = window.localStorage.getItem(`${this.domain}-keys`)
          if (keys) {
            keys = JSON.parse(keys)

            const index = keys.indexOf(key)
            if (index !== -1) { keys.splice(index, 1) }

            window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify(keys))
            window.localStorage.removeItem(key)
            // the key-value pair was removed successfully, resolving with `true`
            resolve(true)
          } else {
            // Nothing to retrieve, resolve promise with `null`
            resolve(null)
          }
        }
      } catch (e) {
        reject(e)
      }
    })
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
  get (keys = undefined) {
    return new Promise((resolve, reject) => {
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

        let result = {} // eslint-disable-line prefer-const
        if (keys.length === 0) {
          // If no keys specified, will retrieve all values
          keys = window.localStorage.getItem(`${this.domain}-keys`)
          if (keys) {
            keys = JSON.parse(keys)
          } else {
            // Nothing to retrieve
            resolve(result)
          }
        }

        for (const key of keys) {
          result[key] = window.localStorage.getItem(key)
        }

        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  clearAll () {
    return new Promise((resolve, reject) => {
      try {
        let result = null // eslint-disable-line prefer-const
        let keys = window.localStorage.getItem(`${this.domain}-keys`)
        if (keys) {
          keys = JSON.parse(keys)
          for (const key of keys) {
            window.localStorage.removeItem(key)
          }
          window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify([]))
          resolve(true)
        } else {
          // Nothing to retrieve
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
}
