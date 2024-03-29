import axios from 'axios'
import { Logger } from 'alpheios-data-models'
import { L10n } from 'alpheios-l10n'
import AdapterError from '@clAdapters/errors/adapter-error'
import AdapterWarning from '@clAdapters/errors/adapter-warning.js'
import RemoteError from '@clAdapters/errors/remote-error.js'

import Locales from '@clAdapters/locales/locales.js'
import enUS from '@clAdapters/locales/en-us/messages.json'
import enGB from '@clAdapters/locales/en-gb/messages.json'

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
  addError (message, statusCode) {
    const error = new AdapterError(this.config.category, this.config.adapterName, this.config.method, message, statusCode)
    this.errors.push(error)
  }

  addRemoteError (errorCode, message) {
    const error = new RemoteError(this.config.category, this.config.adapterName, this.config.method, errorCode, message)
    this.errors.push(error)
  }

  addWarning (errorCode, message) {
    const warning = new AdapterWarning(this.config.category, this.config.adapterName, this.config.method, errorCode, message)
    this.errors.push(warning)
  }

  /**
   * This method is used for uploding config property from current properties and default properties
   * @param {Object} config - properties with higher priority
   * @param {Object} defaultConfig - default properties
   * @return {Object} - configuration data
  */
  uploadConfig (config, defaultConfig) {
    let configRes = {} // eslint-disable-line prefer-const
    Object.keys(config).forEach(configKey => {
      configRes[configKey] = config[configKey]
    })

    Object.keys(defaultConfig).forEach(configKey => {
      if (!configRes[configKey]) {
        configRes[configKey] = defaultConfig[configKey]
      } else if (Array.isArray(configRes[configKey])) {
        configRes[configKey] = configRes[configKey].map((item, index) => {
          return { ...defaultConfig[configKey][index], ...item }
        })
      } else if (configRes[configKey] instanceof Object) {
        configRes[configKey] = { ...defaultConfig[configKey], ...configRes[configKey] }
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
        const response = await window.fetch(url, options.requestParams)
        if (!response.ok) {
          let statusText

          if (response.status === 400) {
            const resultResponse = await response.json()
            statusText = (resultResponse && resultResponse.message) ? resultResponse.message : response.statusText
          }

          this.addError(this.l10n.getMsg('BASIC_ADAPTER_URL_RESPONSE_FAILED', { statusCode: response.status, statusText }), response.status)
          return
        }
        if (options.type === 'xml') {
          return response.text()
        } else {
          return response.json()
        }
      } catch (error) {
        this.addError(this.l10n.getMsg('BASIC_ADAPTER_NO_DATA_FROM_URL', { url: url }))
      }
    } else {
      this.addError(this.l10n.getMsg('BASIC_ADAPTER_EMPTY_URL'))
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

        window.fetch(url, options.requestParams)
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
            this.addError(this.l10n.getMsg('BASIC_ADAPTER_NO_DATA_FROM_URL', { url: url }))
            if (didTimeOut) return
            reject(err)
          })
      })
    } else {
      this.addError(this.l10n.getMsg('BASIC_ADAPTER_EMPTY_URL'))
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
      const finalOptions = Object.assign({ url: encodeURI(decodeURI(url)) }, options)
      try {
        const res = await axios(finalOptions)
        return res.data
      } catch (error) {
        this.addError(this.l10n.getMsg('BASIC_ADAPTER_NO_DATA_FROM_URL', { url: url }))
      }
    } else {
      this.addError(this.l10n.getMsg('BASIC_ADAPTER_EMPTY_URL'))
    }
  }

  printError (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      Logger.getInstance().error('Alpheios error: unexpected response retrieving data from service', error)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      Logger.getInstance().error('Alpheios error: no response from service', error)
    } else {
      // Something happened in setting up the request that triggered an Error
      Logger.getInstance().error('Alpheios error: unexpected error requesting data from service', error.message)
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
  async fetch (url, options = {}) {
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
        this.addError(this.l10n.getMsg('BASIC_ADAPTER_UNKNOWN_ERROR', { message: error.message }))
      }
    } else {
      this.addError(this.l10n.getMsg('BASIC_ADAPTER_EMPTY_URL'))
    }
  }
}

export default BaseAdapter
