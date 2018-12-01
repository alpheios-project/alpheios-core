import { LanguageModelFactory as LMF, Lexeme, Feature, Constants } from 'alpheios-data-models'

import BaseAdapter from '@/adapters/base-adapter'
import TransformAdapter from '@/adapters/tufts/transform-adapter'

import DefaultConfig from '@/adapters/tufts/config.json'
import EnginesSet from '@/adapters/tufts/engines-set'

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
    if (!url) {
      this.addError(this.l10n.messages['MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE'].get(languageID.toString()))
      return
    }
    try {
      let res = await this.fetch(url)
      if (res.constructor.name === 'AdapterError') {
        return
      }
      if (res) {
        let transformAdapter = new TransformAdapter(this.engineSet, this.config)

        let homonym = transformAdapter.transformData(res, word)

        if (!homonym) {
          this.addError(this.l10n.messages['MORPH_TUFTS_NO_HOMONYM'].get(word, languageID.toString()))
          return
        }

        if (homonym && homonym.lexemes) {
          homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))
        }

        return homonym
      } else {
        return
      }
    } catch (error) {
      this.addError(this.l10n.messages['MORPH_TUFTS_UNKNOWN_ERROR'].get(error.mesage))
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
