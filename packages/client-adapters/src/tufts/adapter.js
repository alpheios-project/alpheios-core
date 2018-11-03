import { LanguageModelFactory as LMF, Lexeme, Feature } from 'alpheios-data-models'

import BaseAdapter from '@/base-adapter'
import TransformAdapter from '@/tufts/transform-adapter'

import DefaultConfig from '@/tufts/config.json'
import EnginesSet from '@/tufts/engines-set'
import TuftsConfigData from '@/tufts/config-data'

class AlpheiosTuftsAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = new TuftsConfigData(config, DefaultConfig)
    this.engineSet = new EnginesSet(this.config.engine)
  }

  async getHomonym (languageID, word) {
    let url = this.prepareRequestUrl(languageID, word)
    console.info('***************async getHomonym1', languageID, word, url)
    let jsonObj = await this.fetch(url)
    console.info('***************async getHomonym2', jsonObj)

    if (jsonObj) {
      let transformAdapter = new TransformAdapter(this.engineSet, this.config)

      console.info('***************async getHomonym3', jsonObj.RDF.Annotation, word)

      let homonym = transformAdapter.transformData(jsonObj, word)
      if (homonym && homonym.lexemes) {
        homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))
      }
      console.info('***************async getHomonym4', homonym)
      return homonym
    } else {
      // No data found for this word
      return undefined
    }
  }

  prepareRequestUrl (languageID, word) {
    let engine = this.engineSet.getEngineByCode(languageID)
    let langCode = LMF.getLanguageCodeFromId(languageID)
    if (engine) {
      let code = engine.engine
      return this.config.url.replace('r_WORD', word).replace('r_ENGINE', code).replace('r_LANG', langCode).replace('r_CLIENT', this.config.clientId)
    } else {
      return null
    }
  }
}

export default AlpheiosTuftsAdapter
