import { LanguageModelFactory as LMF, Lexeme, Feature } from 'alpheios-data-models'

import BaseAdapter from '@/base-adapter'
import TransformAdapter from '@/tufts/transform-adapter'

import DefaultConfig from '@/tufts/config.json'
import EnginesSet from '@/tufts/engines-set'
import ConfigData from '@/tufts/config-data'

class AlpheiosTuftsAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = new ConfigData(config, DefaultConfig)
    this.engineSet = new EnginesSet(this.config.engine)
  }

  async getHomonym (languageID, word) {
    let url = this.prepareRequestUrl(languageID, word)
    let jsonObj = await this.fetch(url)

    if (jsonObj) {
      let transformAdapter = new TransformAdapter(this.engineSet, this.config)

      let homonym = transformAdapter.transformData(jsonObj.RDF.Annotation, word)
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
