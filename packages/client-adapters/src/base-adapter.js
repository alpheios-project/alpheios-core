import axios from 'axios'

class BaseAdapter {
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
        if (options.type === 'xml') {
          return response.text()
        } else {
          return response.json()
        }
      } catch (error) {
        console.error(`Unable to get data from url ${url}`)
      }
    } else {
      console.error(`Unable to prepare parser request url`)
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
      console.error(`Unable to prepare parser request url`, url, error.message)
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
      console.error('*************** adapter fetch', error)
    }
  }
}

export default BaseAdapter
