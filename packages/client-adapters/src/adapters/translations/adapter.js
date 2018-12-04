import DefaultConfig from '@/adapters/translations/config.json'

import { ResourceProvider, Translation, LanguageModelFactory as LMF } from 'alpheios-data-models'
import BaseAdapter from '@/adapters/base-adapter'

class AlpheiosLemmaTranslationsAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.mapLangUri = {}
    this.provider = new ResourceProvider(this.config.url, this.config.rights)
  }

  async getTranslationsList (homonym, browserLang) {
    let lemmaList = []
    if (!homonym || !homonym.lexemes) {
      this.addError(this.l10n.messages['TRANSLATION_INCORRECT_LEXEMES'])
      return
    }

    for (let lexeme of homonym.lexemes) {
      lemmaList.push(lexeme.lemma)
    }

    const inLang = LMF.getLanguageCodeFromId(homonym.lexemes[0].lemma.languageID)
    let outLang = this.config.langMap[browserLang] || this.config.defaultLang

    let input = this.prepareInput(lemmaList)
    if (!input) {
      this.addError(this.l10n.messages['TRANSLATION_INPUT_PREPARE_ERROR'].get(input.toString()))
      return
    }

    try {
      let urlLang = await this.getAvailableResLang(inLang, outLang)

      if (urlLang && urlLang.constructor.name === 'AdapterError') {
        return
      }

      if (input && urlLang) {
        try {
          let url = urlLang + '?input=' + input
          let translationsList = await this.fetch(url)

          if (translationsList && translationsList.constructor.name === 'AdapterError') {
            return
          }

          for (let lemma of lemmaList) {
            Translation.loadTranslations(lemma, outLang, translationsList, this.provider)
          }
        } catch (error) {
          this.addError(this.l10n.messages['TRANSLATION_UNKNOWN_ERROR'].get(error.message))
        }
      }
    } catch (error) {
      this.addError(this.l10n.messages['TRANSLATION_UNKNOWN_ERROR'].get(error.message))
    }
  }

  prepareInput (lemmaList) {
    let input = ''

    for (let lemma of lemmaList) {
      input += lemma.word + ','
    }
    if (input.length > 0) {
      input = input.substr(0, input.length - 1)
    }
    return input.length > 0 ? input : undefined
  }

  async getAvailableResLang (inLang, outLang) {
    if (this.mapLangUri[inLang] === undefined) {
      let urlAvaLangsRes = this.config.url + '/' + inLang + '/'
      let unparsed = await this.fetch(urlAvaLangsRes)

      if (unparsed && unparsed.constructor.name === 'AdapterError') {
        return unparsed
      }

      let mapLangUri = {}
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
