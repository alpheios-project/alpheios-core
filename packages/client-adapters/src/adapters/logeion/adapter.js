import DefaultConfig from '@clAdapters/adapters/logeion/config.json'
import BaseAdapter from '@clAdapters/adapters/base-adapter'

import { LanguageModelFactory as LMF, Constants } from 'alpheios-data-models'

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
    this.sourceData = config.sourceData
    this.fetchOptions = config.fetchOptions
  }

  /**
  * This method retrieves a list of words for lookup autocomplete
  * @param {String} text - text for retrieving variants
  * @return {Array} - array of words
  */
  async getWords (text) {
    try {
      const url = this.createFetchURL(text)
      if (!url) {
        this.addError(this.l10n.getMsg('LOGEION_FETCH_OPTIONS_ERROR'))
        return
      }

      if (this.sourceData) {
        return this.sourceData
      } else {
        const wordsVariants = await this.fetch(url)

        if (wordsVariants.words && Array.isArray(wordsVariants.words)) {
          return this.filterAndLimitWords(wordsVariants.words)
        } else {
          return []
        }
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('LOGEION_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
  * This method constructs full url for getting words
  * @param {String} text - text for retrieving variants
  * @return {String}
  */
  createFetchURL (text) {
    if (this.fetchOptions) {
      return `${this.fetchOptions.baseurl}?key=${this.fetchOptions.apikey}&q=${text}&lang=${this.logeionLangCode}`
    }
  }

  get logeionLangCode () {
    if (this.config.lang === Constants.STR_LANG_CODE_GRC) {
      return 'greek'
    } else if ([Constants.STR_LANG_CODE_LAT, Constants.STR_LANG_CODE_LA].includes(this.config.lang)) {
      return 'latin'
    }
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
      if (lang !== this.config.lang && modelLang.isValidUnicode) {
        otherModels.push(modelLang)
      }
    })

    for (let i = 0; i < words.length; i++) {
      if ((model.isValidUnicode && model.isValidUnicode(words[i])) ||
          (!model.isValidUnicode && otherModels.every(modelLang => !modelLang.isValidUnicode(words[i])))) {
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
