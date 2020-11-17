import DefaultConfig from '@clAdapters/adapters/tokenization/config.json'
import BaseAdapter from '@clAdapters/adapters/base-adapter'

import { Options } from 'alpheios-data-models'

class AlpheiosTokenizationAdapter extends BaseAdapter {
  /**
   * Adapter uploads config data
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.available = true
    this.sourceData = config.sourceData
    this.fetchOptions = this.config.fetchOptions
    this.storage = this.config.storage
  }

  /**
  * This method uploads segments data with tokens from tokenization service
  * @param {String} text - text for retrieving variants
  * @return {Array} - array of segments
  */
  async getTokens (text) {
    try {
      const requestParams = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: text
      }

      const url = this.createTokenizeFetchURL()
      if (!url) {
        this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_OPTIONS_ERROR'))
        return
      }

      if (this.sourceData) {
        return this.sourceData
      } else {
        const segments = await this.fetch(url, { requestParams })
        return segments
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
  * This method uploads default config data from tokenization service
  * @return {Array} - array of settings
  */
  async getConfig () {
    try {
      const url = this.createConfigFetchURL()
      if (!url) {
        this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_OPTIONS_ERROR'))
        return
      }

      if (this.sourceData) {
        return this.sourceData
      } else {
        const configData = await this.fetch(url)

        return this.formatSettings(configData)
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
   * Converts JSON response to Options for text and tei
   * @param {Object} configData - Response from config fetch request
   */
  formatSettings (configData) {
    return {
      tei: this.convertToOptions(configData, 'tei'),
      text: this.convertToOptions(configData, 'text')
    }
  }

  /**
   *
   * @param {Object} configData Response from config fetch request
   * @param {String} textType - tei/text
   */
  convertToOptions (configData, textType) {
    const configDataPath = configData.paths[`/tokenize/${textType}`].post

    const exludeParameters = ['lang', 'direction']
    const dataFormatted = {
      domain: `alpheios-remote-tokenization-${textType}`,
      version: configData.info.version,
      description: configDataPath.description,
      items: {}
    }
    configDataPath.parameters.filter(param => (param.in === 'query') && !exludeParameters.includes(param.name)).forEach(param => {
      const result = {
        defaultValue: param.schema.default,
        labelText: param.description,
        select: Boolean(param.schema.enum),
        boolean: param.schema.type === 'boolean'
      }
      if (result.select) {
        result.values = param.schema.enum.map(val => { return { value: val, text: val } })
      }

      dataFormatted.items[param.name] = result
    })
    return new Options(dataFormatted, new this.storage(dataFormatted.domain)) // eslint-disable-line new-cap
  }

  /**
  * This method constructs full url for getting tokenize data
  * @return {String}
  */
  createTokenizeFetchURL () {
    if (this.fetchOptions) {
      if (!this.fetchOptions.lang || !this.fetchOptions.sourceType) {
        return
      }

      let url = `${this.fetchOptions.baseUrl}tokenize/${this.fetchOptions.sourceType}?lang=${this.fetchOptions.lang}`

      if (this.fetchOptions.segments) {
        url = `${url}&segments=${this.fetchOptions.segments}`
      }

      if (this.fetchOptions.segstart) {
        url = `${url}&segstart=${this.fetchOptions.segstart}`
      }

      if (this.fetchOptions.direction) {
        url = `${url}&direction=${this.fetchOptions.direction}`
      }

      if (this.fetchOptions.tbseg) {
        url = `${url}&tbseg=${this.fetchOptions.tbseg}`
      }
      return url
    }
  }

  /**
  * This method constructs full url for getting config data
  * @return {String}
  */
  createConfigFetchURL () {
    return this.fetchOptions.baseUrl
  }
}

export default AlpheiosTokenizationAdapter
