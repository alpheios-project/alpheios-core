import DefaultConfig from '@/translations/config.json'

import { ResourceProvider, Translation, LanguageModelFactory as LMF } from 'alpheios-data-models'
import BaseAdapter from '@/base-adapter'
import AdapterError from '@/errors/adapter-error'

class AlpheiosLemmaTranslationsAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.mapLangUri = {}
    this.provider = new ResourceProvider(this.config.url, this.config.rights)
  }

  async getTranslationsList (homonym, browserLang) {
    let lemmaList = []
    for (let lexeme of homonym.lexemes) {
      lemmaList.push(lexeme.lemma)
    }

    const inLang = LMF.getLanguageCodeFromId(homonym.lexemes[0].lemma.languageID)
    let outLang = this.config.langMap[browserLang] || this.config.defaultLang

    let input = this.prepareInput(lemmaList)
    if (!input) {
      return new AdapterError(this.config.category, this.config.adapterName, this.config.method, `There were problems with preparing input - ${input}`)
    }

    try {
      let urlLang = await this.getAvailableResLang(inLang, outLang)

      if (urlLang && urlLang.constructor.name === 'AdapterError') {
        return urlLang
      }

      if (input && urlLang) {
        try {
          let url = urlLang + '?input=' + input
          let translationsList = await this.fetch(url)

          if (translationsList && translationsList.constructor.name === 'AdapterError') {
            return translationsList.update(this.config)
          }

          for (let lemma of lemmaList) {
            Translation.loadTranslations(lemma, outLang, translationsList, this.provider)
          }
        } catch (error) {
          return new AdapterError(this.config.category, this.config.adapterName, this.config.method, error.message)
        }
      }
    } catch (error) {
      return new AdapterError(this.config.category, this.config.adapterName, this.config.method, error.message)
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
        return unparsed.update(this.config)
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
