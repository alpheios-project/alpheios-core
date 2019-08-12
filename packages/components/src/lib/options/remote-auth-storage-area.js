import StorageAdapter from './storage-adapter.js'
import axios from 'axios'

/**
 * An implementation of the StorageAdapterinterface that retrieves
 * data from an authentication-protected remote service implementing
 * the Alpheios user-settings-api.
 * @param {String} domain a string identifying the storage domain
 * @param {Object} auth athentication details object adhering to:
 *                      { endpoints: {settings: <baseUrl of settings api},
 *                        accessToken: JWT token identying user and granting
 *                                     access to the settings api
 *                      }
 *
 */
export default class RemoteAuthStorageArea extends StorageAdapter {
  constructor (domain = 'alpheios-storage-domain', auth = null) {
    super(domain)
    if (!auth ||
        !auth.endpoints ||
        !auth.endpoints.settings.match(/^https:\/\//) ||
        !auth.accessToken) {
      throw new Error('Authentication details missing or invalid')
    }
    this.baseURL = auth.endpoints.settings
    this.requestContext = {
      headers: {
        common: {
          Authorization: 'bearer ' + auth.accessToken,
          'Content-Type': 'application/json'
        }
      }
    }
  }

  /**
   * A proxy for the Alpheios user-settings-api
   * It allows for storing key/value pairs to the api with an authorized user account
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  async set (keysObject) {
    for (const [key, value] of Object.entries(keysObject)) {
      const url = `${this.baseURL}/${key}`
      const result = await axios.post(url, value, this.requestContext)
      if (result.status !== 201) {
        throw new Error(`Unexpected result status from settings api: ${result.status}`)
      }
    }
  }

  /**
   * proxy for the Alpheios user-settings-api LIST operation
   * Retrieves all data for the storage domain.
   *
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  async get () {
    const url = `${this.baseURL}?domain=${this.domain}`
    const result = await axios.get(url, this.requestContext)
    if (result.status === 200) {
      return result.data
    } else {
      throw new Error(`Unexpected result status from settings api: ${result.status}`)
    }
  }

  /**
   * proxy for the Alpheios user-settings DELETE LIST operation
   * deletes all settings for the domain from storage
   *
   * @returns {Promise} A Promise that executes the operation.
   */
  async clearAll () {
    const url = `${this.baseURL}?domain=${this.domain}`
    const result = await axios.delete(url, this.requestContext)
    if (result.status !== 200) {
      throw new Error(`Unexpected result status from settings api: ${result.status}`)
    }
  }
}
