import axios from 'axios'
import AdapterError from '@/errors/adapter-error'

import L10n from '@/l10n/l10n'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

class BaseAdapter {
  /**
   * Every adapter has errors array and L10n property for localizing messages
  */
  constructor () {
    this.errors = []
    this.l10n = new L10n()
      .addMessages(enUS, Locales.en_US)
      .addMessages(enGB, Locales.en_GB)
      .setLocale(Locales.en_US)
  }

  /**
   * This method is used for adding error meassage with additional data
   * @param {String} message  - message text for the error
  */
  addError (message) {
    let error = new AdapterError(this.config.category, this.config.adapterName, this.config.method, message)
    this.errors.push(error)
  }

  /**
   * This method is used for uploding config property from current properties and default properties
   * @param {Object} config - properties with higher priority
   * @param {Object} defaultConfig - default properties
   * @return {Object} - configuration data
  */
  uploadConfig (config, defaultConfig) {
    let configRes = {}
    Object.keys(config).forEach(configKey => {
      configRes[configKey] = config[configKey]
    })

    Object.keys(defaultConfig).forEach(configKey => {
      if (configRes[configKey] === undefined) {
        configRes[configKey] = defaultConfig[configKey]
      }
    })

    return configRes
  }

  /**
   * This method is used for creating timeout Promise
   * @param {Number} ms - amount of ms for creation timeout
   * @return {Promise}
  */
  timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * This method is used for fetching data using window.fetch
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {String} options.type - json is default, also it could be xml. This property defines output format.
   *                                    xml - response.text(), otherwise - response.json()
   * @return {Object|String}
  */
  async fetchWindow (url, options = { type: 'json' }) {
    if (url) {
      try {
        let response = await window.fetch(url)
        if (!response.ok) {
          this.addError(this.l10n.messages['BASIC_ADAPTER_URL_RESPONSE_FAILED'].get(response.status, response.statusText))
          return
        }
        if (options.type === 'xml') {
          return response.text()
        } else {
          return response.json()
        }
      } catch (error) {
        this.addError(this.l10n.messages['BASIC_ADAPTER_NO_DATA_FROM_URL'].get(url))
      }
    } else {
      this.addError(this.l10n.messages['BASIC_ADAPTER_EMPTY_URL'])
    }
  }

  /**
   * This method is used for fetching data using window.fetch with timeout reject
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {String} options.type - json is default, also it could be xml. This property defines output format.
   *                                    xml - response.text(), otherwise - response.json()
   *     @param {Number} options.timeout - timeout ms amount
   * @return {Promise}
  */
  fetchWindowTimeout (url, options) {
    if (url) {
      let didTimeOut = false
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          didTimeOut = true
          reject(new Error('Request timed out', url))
        }, options.timeout)

        window.fetch(url)
          .then((response) => {
            clearTimeout(timeout)
            if (!didTimeOut) {
              if (options.type === 'xml') {
                resolve(response.text())
              } else {
                resolve(response.json())
              }
            }
          })
          .catch((err) => {
            this.addError(this.l10n.messages['BASIC_ADAPTER_NO_DATA_FROM_URL'].get(url))
            if (didTimeOut) return
            reject(err)
          })
      })
    } else {
      this.addError(this.l10n.messages['BASIC_ADAPTER_EMPTY_URL'])
    }
  }

  /**
   * This method is used for fetching data using axios
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {Number} options.timeout - timeout ms amount
   * @return {Object|String}
  */
  async fetchAxios (url, options) {
    if (url) {
      try {
        let res
        if (options && options.timeout > 0) {
          res = await axios.get(encodeURI(url), { timeout: options.timeout })
        } else {
          res = await axios.get(encodeURI(url))
        }
        return res.data
      } catch (error) {
        this.addError(this.l10n.messages['BASIC_ADAPTER_NO_DATA_FROM_URL'].get(url))
      }
    } else {
      this.addError(this.l10n.messages['BASIC_ADAPTER_EMPTY_URL'])
    }
  }

  printError (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Alpheios error: unexpected response retrieving data from service', error)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Alpheios error: no response from service', error)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Alpheios error: unexpected error requesting data from service', error.message)
    }
  }

  /**
   * This method is used for fetching data using different methods. If window is defined - than it would be used window.fetch.
   * Otherwise axios would be used.
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {String} options.type - json is default, also it could be xml. This property defines output format.
   *                                    xml - response.text(), otherwise - response.json()
   *     @param {Number} options.timeout - timeout ms amount
   * @return {Object|String}
  */
  async fetch (url, options) {
    let res

    if (url) {
      try {
        if (typeof window !== 'undefined' && typeof window.fetch !== 'undefined') {
          if (options && options.timeout > 0) {
            res = await this.fetchWindowTimeout(url, options)
          } else {
            res = await this.fetchWindow(url, options)
          }
        } else {
          res = await this.fetchAxios(url, options)
        }

        return res
      } catch (error) {
        this.addError(this.l10n.messages['BASIC_ADAPTER_UNKNOWN_ERROR'].get(error.message))
      }
    } else {
      this.addError(this.l10n.messages['BASIC_ADAPTER_EMPTY_URL'])
    }
  }
}

export default BaseAdapter
