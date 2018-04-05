/**
 * A set of wrapper functions with signatures similar to the ones in `browser.storage`.
 * Useful in situations when local storage functionality is used
 * as a drop-in replacement for `browser.storage` functions.
 *
 * Local storage can contain multiple key-value pairs. get() with an empty parameter
 * should return all keys related to the particular object (e.g. set of options). A set of those keys
 * is defined by the `storage domain` concept. A key named `storage-domain-name-key` is saved to the
 * local storage along with its key-value pairs. This special key
 * will contain an array of keys that belong to the storage domain. Those key values
 * are used then to retrieve all relevant keys from the storage.
 */
export default class LocalStorageArea {
  /**
   * A wrapper around a local storage `setItem()` function.
   * It allows to store one or several key-value pairs to local storage.
   * A wrapper signature approximates `browser.storage.set()` behavior, except for the first `storageDomain`
   * parameter. It's better to be set with `bind()`.
   * @param {string} storageDomain - A name of a storage domain where key-value pairs should be stored.
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @return {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  static set (storageDomain, keysObject) {
    return new Promise((resolve, reject) => {
      if (!storageDomain) {
        reject(new Error(`Storage domain is not provided`))
      }
      try {
        let keys = window.localStorage.getItem(`${storageDomain}-keys`)
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
   * A wrapper signature approximates `browser.storage.get()` behavior, except for the first `storageDomain`
   * parameter. It's better to be set with `bind()`.
   * @param {string} storageDomain - A name of a storage domain from where the key-value pairs
   * should be retrieved (required only if keys are not provided).
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @return {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  static get (storageDomain, keys = undefined) {
    return new Promise((resolve, reject) => {
      if (!keys && !storageDomain) {
        reject(new Error(`Storage domain is not provided`))
      }
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
          keys = window.localStorage.getItem(`${storageDomain}-keys`)
          if (keys) {
            keys = JSON.parse(keys)
          } else {
            // Nothing to retrieve
            console.log(`Unable to retrieve data for "${storageDomain}" storage domain because no keys provided or no keys listed in local storage`)
            console.log(`This might be normal for devices where no data is saved to the local storage yet`)
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
}
