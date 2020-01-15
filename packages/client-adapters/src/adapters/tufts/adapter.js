import { LanguageModelFactory as LMF, Lexeme, Feature, Constants } from 'alpheios-data-models'

import BaseAdapter from '@/adapters/base-adapter'
import TransformAdapter from '@/adapters/tufts/transform-adapter'

import DefaultConfig from '@/adapters/tufts/config.json'
import EnginesSet from '@/adapters/tufts/engines-set'

class AlpheiosTuftsAdapter extends BaseAdapter {
  /**
   * Tufts adapter uploads config data, uploads available engines and creates EnginesSet from them
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, DefaultConfig)
    this.uploadEngines(this.config.engine)
    this.engineSet = new EnginesSet(this.engines)
    this.sourceData = config.sourceData
  }

  /**
   * This method creates engines object with the following format:
   * LanguageID: array of available engines from config files, for example Symbol(Latin): ["whitakerLat"]
   * @param {Object} engineConfig - engines config data
  */
  uploadEngines (engineConfig) {
    if (this.engine === undefined) {
      this.engines = {}
    }
    Object.keys(engineConfig).forEach(langCode => {
      const langID = LMF.getLanguageIdFromCode(langCode)

      if (langID !== Constants.LANG_UNDEFINED && this.engines[langID] === undefined) {
        this.engines[langID] = engineConfig[langCode]
      }
    })
  }

  /**
   * This method gets data from adapter's engine. All errors are added to adapter.errors
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} word - a word for getting homonym
   * Returned values:
   *      - {Homonym} - if successed
   *      - {undefined} - if failed
  */
  async getHomonym (languageID, word) {
    let res
    try {
      if (this.sourceData) {
        res = this.sourceData
      } else {
        const url = this.prepareRequestUrl(languageID, word)
        if (!url) {
          this.addError(this.l10n.messages.MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE.get(languageID.toString()))
          return
        }
        res = await this.fetch(url)
        if (res.constructor.name === 'AdapterError') {
          return
        }
      }

      if (res) {
        const transformAdapter = new TransformAdapter(this)

        let homonym = transformAdapter.transformData(res, word) // eslint-disable-line prefer-const

        if (!homonym) {
          this.addError(this.l10n.messages.MORPH_NO_HOMONYM.get(word, languageID.toString()))
          return
        }

        if (homonym && homonym.lexemes) {
          homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))
        }

        return homonym
      }
    } catch (error) {
      this.addError(this.l10n.messages.MORPH_UNKNOWN_ERROR.get(error.mesage))
    }
  }

  /**
   * This method creates url with url from config and chosen engine
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} word - a word for getting homonym
   * Returned url:
   *     - {String} - constructed url for getting data from Tufts if engine is correct
   *     - {null} - if engine is not correct
  */
  prepareRequestUrl (languageID, word) {
    const langCode = LMF.getLanguageCodeFromId(languageID)
    const engine = this.engineSet.getEngineByCode(languageID)

    if (engine) {
      const code = engine.engine
      return this.config.url.replace('r_WORD', encodeURIComponent(word)).replace('r_ENGINE', code).replace('r_LANG', langCode).replace('r_CLIENT', this.config.clientId)
    } else {
      return null
    }
  }
}

export default AlpheiosTuftsAdapter
