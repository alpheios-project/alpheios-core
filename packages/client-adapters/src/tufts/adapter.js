import { LanguageModelFactory as LMF, Lexeme, Feature, Constants } from 'alpheios-data-models'

import BaseAdapter from '@/base-adapter'
import TransformAdapter from '@/tufts/transform-adapter'

import DefaultConfig from '@/tufts/config.json'
import EnginesSet from '@/tufts/engines-set'

class AlpheiosTuftsAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.uploadEngines(this.config.engine)
    this.engineSet = new EnginesSet(this.engines)
  }

  uploadEngines (engineConfig) {
    if (this.engine === undefined) {
      this.engines = {}
    }
    Object.keys(engineConfig).forEach(langCode => {
      let langID = LMF.getLanguageIdFromCode(langCode)

      if (langID !== Constants.LANG_UNDEFINED && this.engines[langID] === undefined) {
        this.engines[langID] = engineConfig[langCode]
      }
    })
  }

  async getHomonym (languageID, word) {
    let url = this.prepareRequestUrl(languageID, word)
    let jsonObj = await this.fetch(url)

    if (jsonObj) {
      let transformAdapter = new TransformAdapter(this.engineSet, this.config)

      let homonym = transformAdapter.transformData(jsonObj, word)
      if (homonym && homonym.lexemes) {
        homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))
      }

      return homonym
    } else {
      // No data found for this word
      return undefined
    }
  }

  prepareRequestUrl (languageID, word) {
    let langCode = LMF.getLanguageCodeFromId(languageID)
    let engine = this.engineSet.getEngineByCode(languageID)

    if (engine) {
      let code = engine.engine
      return this.config.url.replace('r_WORD', word).replace('r_ENGINE', code).replace('r_LANG', langCode).replace('r_CLIENT', this.config.clientId)
    } else {
      return null
    }
  }
}

export default AlpheiosTuftsAdapter
