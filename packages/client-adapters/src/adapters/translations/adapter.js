import DefaultConfig from '@/adapters/translations/config.json'

import { ResourceProvider, Translation, LanguageModelFactory as LMF } from 'alpheios-data-models'
import BaseAdapter from '@/adapters/base-adapter'

class AlpheiosLemmaTranslationsAdapter extends BaseAdapter {
  /**
   * Adapter uploads config data, creates provider and inits mapLangUri (Object for storing data for available languages)
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.mapLangUri = {}
    this.provider = new ResourceProvider(this.config.url, this.config.rights)
  }

  /**
   * This method updates homonym with retrieved translations, if an error occurs it will be added to errors property of an adapter
   * @param {Homonym} homonym
   * @param {String} browserLang - language of the translation (for example its, spa)
  */
  async getTranslationsList (homonym, browserLang) {
    let lemmaList = [] // eslint-disable-line prefer-const
    if (!homonym || !homonym.lexemes) {
      this.addError(this.l10n.messages.TRANSLATION_INCORRECT_LEXEMES)
      return
    }

    for (const lexeme of homonym.lexemes) {
      lemmaList.push(lexeme.lemma)
    }

    const inLang = LMF.getLanguageCodeFromId(homonym.lexemes[0].lemma.languageID)
    const outLang = this.config.langMap[browserLang] || this.config.defaultLang

    const input = this.prepareInput(lemmaList)

    if (!input) {
      this.addError(this.l10n.messages.TRANSLATION_INPUT_PREPARE_ERROR.get(input.toString()))
      return
    }

    try {
      const urlLang = await this.getAvailableResLang(inLang, outLang)
      if (urlLang && urlLang.constructor.name === 'AdapterError') {
        return
      }

      if (input && urlLang) {
        try {
          const url = urlLang + '?input=' + input
          const translationsList = await this.fetch(url)
          if (translationsList && translationsList.constructor.name === 'AdapterError') {
            return
          }

          for (const lemma of lemmaList) {
            Translation.loadTranslations(lemma, outLang, translationsList, this.provider)
          }
        } catch (error) {
          this.addError(this.l10n.messages.TRANSLATION_UNKNOWN_ERROR.get(error.message))
        }
      }
    } catch (error) {
      this.addError(this.l10n.messages.TRANSLATION_UNKNOWN_ERROR.get(error.message))
    }
  }

  /**
   * This method creates a string with unique lemma's words form lemmas list
   * @param {[Lemma]} lemmaList
  */
  prepareInput (lemmaList) {
    const inputList = lemmaList.map(lemma => encodeURIComponent(lemma.word)).filter((item, index, self) => self.indexOf(item) === index)
    return inputList.length > 0 ? inputList.join(',') : undefined
  }

  /**
   * This method fetches an url for translation
   * @param {String} inLang  - translate from language  (for example, lat)
   * @param {String} outLang  - translate to language  (for example, es, it)
  */
  async getAvailableResLang (inLang, outLang) {
    if (this.mapLangUri[inLang] === undefined) {
      const urlAvaLangsRes = this.config.url + '/' + inLang + '/'
      const unparsed = await this.fetch(urlAvaLangsRes)

      if (unparsed && unparsed.constructor.name === 'AdapterError') {
        return unparsed
      }

      let mapLangUri = {} // eslint-disable-line prefer-const
      unparsed.forEach(function (langItem) {
        mapLangUri[langItem.lang] = langItem.uri
      })

      if (Object.keys(mapLangUri).length > 0) {
        this.mapLangUri[inLang] = mapLangUri
      }
    }

    return this.mapLangUri[inLang] ? this.mapLangUri[inLang][outLang] : undefined
  }
}

export default AlpheiosLemmaTranslationsAdapter
