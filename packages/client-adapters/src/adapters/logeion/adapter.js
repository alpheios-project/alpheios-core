import DefaultConfig from '@clAdapters/adapters/logeion/config.json'
import BaseAdapter from '@clAdapters/adapters/base-adapter'

import { LanguageModelFactory as LMF } from 'alpheios-data-models'

class AlpheiosLogeionAdapter extends BaseAdapter {
  /**
   * Adapter uploads config data
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.limit = parseInt(this.config.limit)
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
        return this.filterAndLimitWords(wordsVariants.words)
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

  /**
  * This method removes words from the other language - checks two variants - greek and the other
  * @param {[Array]} words - list of words that should be checked and filtered
  * @return {Array}
  */
  filterAndLimitWords (words) {
    const finalWords = []
    const model = LMF.getLanguageModelFromCode(this.config.lang)
    const otherModels = []
    this.config.availableLangs.forEach(lang => {
      const modelLang = LMF.getLanguageModelFromCode(lang)
      if (lang !== this.config.lang && modelLang.checkCorrespond) {
        otherModels.push(modelLang)
      }
    })

    for (let i = 0; i < words.length; i++) {
      if ((model.checkCorrespond && model.checkCorrespond(words[i])) ||
          (!model.checkCorrespond && otherModels.every(modelLang => !modelLang.checkCorrespond(words[i])))) {
        finalWords.push(words[i])
      }

      if (finalWords.length === this.limit) {
        break
      }
    }
    return finalWords
  }
}

export default AlpheiosLogeionAdapter
