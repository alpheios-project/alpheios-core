import BaseAdapter from '@clAdapters/adapters/base-adapter'
import AlpheiosLexiconTransformer from '@clAdapters/transformers/alpheios-lexicon-transformer'
import { Constants, LanguageModelFactory } from 'alpheios-data-models'
import ImportData from '@clAdapters/transformers/import-morph-data.js'

import DefaultConfig from '@clAdapters/adapters/alpheiostb/config.json'
import {
  MessagingService, WindowIframeDestination as Destination, ArethusaDestinationConfig as ArethusaConfig, RequestMessage
} from 'alpheios-messaging/dist/dev/alpheios-messaging.js'

class ArethusaTreebankAdapter extends BaseAdapter {
  /**
   * Treebank adapter uploads config data and fills model property
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.engineSet = null
    this.config = this.uploadConfig(config, DefaultConfig)
  }

  getMessagingService(config) {
    if (!MessagingService.hasService(config.name)) {
      MessagingService.createService(config.name, new Destination(config))
    }
    return MessagingService.getService(config.name)
  }

  async _fetchArethusaData (targetURL, sentenceId, wordId) {
    const requestBody = {
      getMorph: {
        sentenceId: sentenceId,
        wordId: wordId,
      }
    }
    let config = {
      name: srcUrl,
      targetURL: targetURL,
      targetIframeID: 'alpheios-treebank-frame'
    }
    let svc = this.getMessagingService(config)
    const responseMessage = await svc.sendRequestTo(config.name, new RequestMessage(requestBody))
    return responseMessage.body
  }

  /**
   * This method gets data from adapter's engine. All errors are added to adapter.errors
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} word - the target word
   * @param {String} provider - the domain which provides Arethusa
   * @param {String} sentenceId - the identifier for the sentence
   * @param {String} wordId - the identifier for the word
   * Returned values:
   *      - {Homonym} - if successed
   *      - {undefined} - if failed
  */
  async getHomonym (languageID, word, provider, sentenceId, wordId) {
    try {
      const origin = new URL(provider).origin
      if (typeof sentenceId !== 'undefined' && typeof wordId !== 'undefined') {
        const tbRes = await this._fetchArethusaData(origin,sentenceId,wordId)
        if (! tbRes || Object.keys(tbRes).length === 0) {
          this.addError(this.l10n.messages['MORPH_TREEBANK_NO_ANSWER_FOR_WORD'].get(wordref))
          return
        }
        let mappingData
        let languageModel = LanguageModelFactory.getLanguageModel(languageID)
        if (!languageModel) {
          this.addError(this.l10n.messages['MORPH_TREEBANK_UNSUPPORTED_LANGUAGE'].get(languageID))
          return
        }
        const transformAdapter = new AlpheiosLexiconTransformer(this, new ImportData(languageModel,'arethusa'))
        const homonym = transformAdapter.transformData(tbRes, word)
        return homonym
      } else {
        this.addError(this.l10n.messages['MORPH_TREEBANK_MISSING_REF'].get(wordref))
      }
    } catch (error) {
      console.log(error)
      this.addError(this.l10n.messages['MORPH_TREEBANK_UNKNOWN_ERROR'].get(error.mesage))
    }
  }
}

export default ArethusaTreebankAdapter