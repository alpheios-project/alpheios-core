import axios from 'axios'
import AdapterError from '@/errors/adapter-error'

import L10n from '@/l10n/l10n'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

class BaseAdapter {
  constructor () {
    this.errors = []
    this.l10n = new L10n()
      .addMessages(enUS, Locales.en_US)
      .addMessages(enGB, Locales.en_GB)
      .setLocale(Locales.en_US)
  }

  addError (message) {
    let error = new AdapterError(this.config.category, this.config.adapterName, this.config.method, message)
    this.errors.push(error)
  }

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

  timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

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
              console.log('fetch good! ', response)
              resolve(response)
            }
          })
          .catch((err) => {
            console.log('fetch failed! ', err)
            // Rejection already happened with setTimeout
            if (didTimeOut) return
            // Reject with error
            reject(err)
          })
      })
    }
  }

  async fetchAxios (url, options) {
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
  }

  async fetch (url, options) {
    let res

    try {
      if (typeof window !== 'undefined') {
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
  }
}

export default BaseAdapter
