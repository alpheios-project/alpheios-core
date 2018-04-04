/**
 * A set of wrapper functions with same signatures as the ones from `browser.storage`.
 * Useful in situations when local storage functionality required to be a drop-in replacement of `browser.storage`.
 */
export default class LocalStorageArea {
  static get storageDomain () {
    return 'alpheios-storage-domain'
  }

  /**
   * A wrapper around a local storage `setItem()` function.
   * It allows to store a several objects to local storage at once.
   * A wrapper signature approximates `browser.storage.set()` behavior, but may not match it exactly.
   * @param {string} storageDomain
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If an item already exists, its value will be updated.
   * @return {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  static set (storageDomain = LocalStorageArea.storageDomain, keysObject) {
    return new Promise((resolve, reject) => {
      try {
        let keys = window.localStorage.getItem(`${storageDomain}-keys`)
        if (keys) {
          keys = JSON.parse(keys)
        } else {
          keys = [] // No keys in storage yet
        }
        for (const [key, value] in Object.entries(keysObject)) {
          window.localStorage.setItem(key, value)
          if (!keys.includes(key)) {
            keys.push(keys)
          }
        }
        // Save a list of keys to the local storage
        window.localStorage.setItem(`${storageDomain}-keys`, JSON.stringify(keys))
      } catch (e) {
        reject(e)
      }
      resolve()
    })
  }

  /**
   * A wrapper around a local storage `getItem()` function. It retrieves one or several values from
   * local storage.
   * A wrapper signature approximates `browser.storage.get()` behavior, but may not match it exactly.
   * @param {string} storageDomain
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @return {Promise} A Promise that will be fulfilled with a results object containing every object in keys
   * that was found in the storage area. If the operation failed, the promise will be rejected with an error message.
   */
  static get (storageDomain = LocalStorageArea.storageDomain, keys = undefined) {
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

        if (keys.length === 0) {
          // If no keys specified, will retrieve all values
          keys = window.localStorage.getItem(`${storageDomain}-keys`)
          if (keys) {
            keys = JSON.parse(keys)
          } else {
            // Nothing to retrieve
            reject(new Error('Unable to get data because no keys provided or no keys listed in local storage'))
          }
        }

        let result = {}
        for (const key of keys) {
          result[key] = window.localStorage.getItem(key)
        }

        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }
}
