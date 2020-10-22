import DefaultConfig from '@clAdapters/adapters/tokenization/config.json'
import BaseAdapter from '@clAdapters/adapters/base-adapter'

class AlpheiosTokenizationAdapter extends BaseAdapter {
  /**
   * Adapter uploads config data
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.available = this.config.availableLangs.includes(this.config.fetchOptions.lang)
    this.sourceData = config.sourceData

    this.fetchOptions = this.config.fetchOptions

    this.requestParams = {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }
    }
  }

  /**
  * This method uploads segments data with tokens from tokenization service
  * @param {String} text - text for retrieving variants
  * @return {Array} - array of segments
  */
  async getTokens (text) {
    try {
      const url = this.createFetchURL()
      if (!url) {
        this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_OPTIONS_ERROR'))
        return
      }

      if (this.sourceData) {
        return this.sourceData
      } else {
        const finalParams = { requestParams: Object.assign({ body: text }, this.requestParams) }
        const segments = await this.fetch(url, finalParams)
        return segments
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
  * This method constructs full url for getting data
  * @param {String} text
  * @return {String}
  */
  createFetchURL () {
    if (this.fetchOptions) {
      let url = `${this.fetchOptions.baseUrl}${this.fetchOptions.textType}?lang=${this.fetchOptions.lang}`
      
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
}

export default AlpheiosTokenizationAdapter
