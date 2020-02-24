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
    const config = this._getMessageConfig(targetURL)
    let svc = this.getMessagingService(config)
    const responseMessage = await svc.sendRequestTo(config.name, new RequestMessage(requestBody))
    return responseMessage.body
  }

  _getMessageConfig(targetURL) {
    return {
      name: targetURL,
      targetURL: targetURL,
      targetIframeID: 'alpheios-treebank-frame'
    }
  }

  /**
   * This method refreshes the view of the Arethusa application
   */
  async refreshView (provider) {
    const config = this._getMessageConfig(provider)
    let svc = this.getMessagingService(config)
    const requestBody = { refreshView: { } }
    svc.sendRequestTo(config.name, new RequestMessage(requestBody))
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
      if (typeof sentenceId !== 'undefined' && typeof wordId !== 'undefined') {
        const tbRes = await this._fetchArethusaData(provider,sentenceId,wordId)
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
