import DefaultConfig from '@clAdapters/adapters/logeion/config.json'
import BaseAdapter from '@clAdapters/adapters/base-adapter'

class AlpheiosLogeionAdapter extends BaseAdapter {
  /**
   * Adapter uploads config data
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.available = this.config.availableLangs.includes(this.config.lang)
  }

  /**
  * This method retrieves a list of words for lookup autocomplete
  * @param {String} text - text for retrieving variants
  * @return {Array} - array of words
  */
  async getWords (text) {
    try {
      const url = this.createFetchURL(text)

      const wordsVariants = await this.fetch(url)

      if (wordsVariants.words && Array.isArray(wordsVariants.words)) {
        return wordsVariants.words.slice(0, this.config.limit)
      } else {
        return []
      }
    } catch (error) {
      this.addError(this.l10n.messages.LOGEION_FETCH_ERROR.get(error.message))
    }
  }

  /**
  * This method constructs full url for getting words
  * @param {String} text - text for retrieving variants
  * @return {String}
  */
  createFetchURL (text) {
    return `${this.config.url}${encodeURIComponent(text)}`
  }
}

export default AlpheiosLogeionAdapter
