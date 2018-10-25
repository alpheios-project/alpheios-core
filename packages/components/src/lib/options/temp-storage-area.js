import StorageAdapter from './storage-adapter.js'

/**
 * An implementation of a StorageAdapter interface for temporary storage
 */
export default class TempStorageArea extends StorageAdapter {
  /**
   * A wrapper around a local storage `setItem()` function.
   * It allows to store one or several key-value pairs to local storage.
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @return {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set (keysObject) {
    return new Promise((resolve) => { resolve(`TempStorageArea does not store any values permanently`) })
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
    return new Promise((resolve) => { resolve(`TempStorageArea does not have any stored values`) })
  }
}
