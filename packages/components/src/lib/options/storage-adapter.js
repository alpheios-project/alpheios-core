/**
 * An abstract storage adapter class for an Options object. Implements two methods: set() and get().
 * A `domain` argument of a constructor designates a storage area where options key-value pairs
 * are stored. This allows to avoid possible collisions with other options objects.
 *
 * Local storage can contain multiple key-value pairs. get() with an empty parameter
 * should return all keys related to the particular object (e.g. set of options). A set of those keys
 * is defined by the `domain` concept. A key named `domain-name-key` is saved to the
 * local storage along with its key-value pairs. This special key
 * will contain an array of keys that belong to the storage domain. If no key values are provided,
 * get() function will use a list of those stored keys to retrieve all values that belong to a domain.
 */
export default class StorageAdapter {
  constructor (domain = 'alpheios-storage-domain') {
    this.domain = domain
  }

  /**
   * Stores one or several key-value pairs to local storage.
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @return {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set (keysObject) {
    return new Promise((resolve, reject) => reject(new Error(`Set method should be implemented in a subclass`)))
  }

  /**
   * Retrieves one or several values from local storage.
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @return {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get (keys) {
    return new Promise((resolve, reject) => reject(new Error(`Get method should be implemented in a subclass`)))
  }

  /**
   * A wrapper around a local storage `removeItem()` function.
   * It allows to remove one key-value pair from local storage.
   * @param {String} key - key of the item to be removed.
   * If a particular item exists, it will be removed.
   * @return {Promise} - A promise that is resolved with with true if a key was removed
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  remove (key) {
    return new Promise((resolve, reject) => reject(new Error(`Remove method should be implemented in a subclass`)))
  }

  /**
   * clear all items in the storage
   */
  clearAll () {
    return new Promise((resolve, reject) => reject(new Error(`clearAll method should be implemented in a subclass`)))
  }
}
