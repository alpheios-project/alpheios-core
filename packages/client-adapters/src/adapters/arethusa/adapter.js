import BaseAdapter from '@clAdapters/adapters/base-adapter'
import AlpheiosLexiconTransformer from '@clAdapters/transformers/alpheios-lexicon-transformer'
import { LanguageModelFactory } from 'alpheios-data-models'
import ImportData from '@clAdapters/transformers/import-morph-data.js'

import DefaultConfig from '@clAdapters/adapters/alpheiostb/config.json'
import {
  MessagingService, WindowIframeDestination as Destination, RequestMessage, ResponseMessage
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

  getMessagingService (config) {
    if (!MessagingService.hasService(config.name)) {
      MessagingService.createService(config.name, new Destination(config))
    }
    return MessagingService.getService(config.name)
  }

  async _fetchArethusaData (targetURL, sentenceId, wordId) {
    console.info('_fetchArethusaData')
    const config = this._getMessageConfig(targetURL)
    const svc = this.getMessagingService(config)
    const requestBodyNav = {
      gotoSentence: { sentenceId: sentenceId }
    }
    let message = new RequestMessage(requestBodyNav)
    console.info('sending a gotoSentence request:', message)
    const response = await svc.sendRequestTo(config.name, message)
    console.info('response from a gotoSentence request:', response)
    const requestBodyMorph = {
      getMorph: {
        sentenceId: sentenceId,
        wordId: wordId
      }
    }
    message = new RequestMessage(requestBodyMorph)
    console.info('sending a getMorph request:', message)
    const responseMessage = await svc.sendRequestTo(config.name, new RequestMessage(requestBodyMorph))
    console.info('response from a getMorph request:', responseMessage)
    return responseMessage.body
  }

  _getMessageConfig (targetURL) {
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
    const svc = this.getMessagingService(config)
    const requestBody = { refreshView: { } }
    const message = new RequestMessage(requestBody)
    console.info('sending a refreshView request:', message)
    let response
    try {
      response = await svc.sendRequestTo(config.name, new RequestMessage(requestBody))
    } catch (response) {
      console.info('Response error:', response)
      if (response instanceof ResponseMessage) {
        console.info('A remote error occurred')
        this.addRemoteError(response.errorCode, response.body.message)
      } else {
        console.info('A generic error occurred')
        this.addError(response.message)
      }
      return
    }
    console.info('response from a refreshView request:', response)
    return response.body
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
        const tbRes = await this._fetchArethusaData(provider, sentenceId, wordId)
        if (!tbRes || Object.keys(tbRes).length === 0) {
          this.addError(this.l10n.messages['MORPH_TREEBANK_NO_ANSWER_FOR_WORD'].get(word))
          return
        }
        const languageModel = LanguageModelFactory.getLanguageModel(languageID)
        if (!languageModel) {
          this.addError(this.l10n.messages['MORPH_TREEBANK_UNSUPPORTED_LANGUAGE'].get(languageID))
          return
        }
        const transformAdapter = new AlpheiosLexiconTransformer(this, new ImportData(languageModel, 'arethusa'))
        const homonym = transformAdapter.transformData(tbRes, word)
        return homonym
      } else {
        this.addError(this.l10n.messages['MORPH_TREEBANK_MISSING_REF'].get(word))
      }
    } catch (error) {
      console.log(error)
      this.addError(this.l10n.messages['MORPH_TREEBANK_UNKNOWN_ERROR'].get(error.mesage))
    }
  }
}

export default ArethusaTreebankAdapter
