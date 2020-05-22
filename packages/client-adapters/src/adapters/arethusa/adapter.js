import BaseAdapter from '@clAdapters/adapters/base-adapter'
import AlpheiosLexiconTransformer from '@clAdapters/transformers/alpheios-lexicon-transformer'
import { LanguageModelFactory, Constants, Feature } from 'alpheios-data-models'
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
    const config = this._getMessageConfig(targetURL)
    const svc = this.getMessagingService(config)
    const requestBodyNav = {
      gotoSentence: { sentenceId: sentenceId }
    }
    const message = new RequestMessage(requestBodyNav)
    await svc.sendRequestTo(config.name, message)
    const requestBodyMorph = {
      getMorph: {
        sentenceId: sentenceId,
        wordId: wordId
      }
    }
    const responseMessage = await svc.sendRequestTo(config.name, new RequestMessage(requestBodyMorph))
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
    let response
    try {
      response = await svc.sendRequestTo(config.name, new RequestMessage(requestBody))
    } catch (response) {
      if (response instanceof ResponseMessage) {
        // This is an error from a treebank template app
        this.addRemoteError(response.errorCode, response.body.message)
      } else {
        // This is some other error
        this.addError(response.message)
      }
      return
    }
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
        let mapper = new ImportData(languageModel, 'arethusa') // eslint-disable-line prefer-const
        mapper.setPropertyParser(function (propertyName, propertyValue, inputElem) {
          if (propertyName === 'pers') {
            propertyValue = propertyValue.replace('first person', Constants.ORD_1ST)
            propertyValue = propertyValue.replace('second person', Constants.ORD_2ND)
            propertyValue = propertyValue.replace('third person', Constants.ORD_3RD)
          }
          return [propertyValue]
        })
        const transformAdapter = new AlpheiosLexiconTransformer(this, mapper, 'arethusa')
        const homonym = transformAdapter.transformData(tbRes, word)
        // handle verb participles in a way consistent with the morpheus parser
        // which reports the pofs of the lemma as verb and pofs of the inflection as verb participle
        if (homonym.lexemes.length === 1 &&
           homonym.lexemes[0].lemma.features[Feature.types.part].value === Constants.POFS_VERB &&
           homonym.lexemes[0].inflections.length === 1 &&
           homonym.lexemes[0].inflections[0][Feature.types.mood].value === Constants.MOOD_PARTICIPLE) {
          homonym.lexemes[0].inflections[0].addFeature(new Feature(Feature.types.part, Constants.POFS_VERB_PARTICIPLE, languageModel.languageID))
        }
        return homonym
      } else {
        this.addError(this.l10n.messages['MORPH_TREEBANK_MISSING_REF'].get(word))
      }
    } catch (error) {
      this.addError(this.l10n.messages['MORPH_TREEBANK_UNKNOWN_ERROR'].get(error.mesage))
    }
  }

  async findWord (provider, word, prefix, suffix, sentenceId) {
    const config = this._getMessageConfig(provider)
    const svc = this.getMessagingService(config)
    const gotoSentenceBody = {
      gotoSentence: { sentenceId }
    }
    try {
      await svc.sendRequestTo(config.name, new RequestMessage(gotoSentenceBody))
      const findWordBody = { findWord: { sentenceId, word, prefix, suffix } }
      const response = await svc.sendRequestTo(config.name, new RequestMessage(findWordBody))
      return response.body
    } catch (response) {
      if (response instanceof ResponseMessage) {
        // This is an error from a treebank template app
        this.addRemoteError(response.errorCode, response.body.message)
      } else {
        // This is some other error
        this.addError(response.message)
      }
    }
  }

  async gotoSentence (provider, sentenceId, wordIds = []) {
    const config = this._getMessageConfig(provider)
    const svc = this.getMessagingService(config)
    const gotoSentenceBody = {
      gotoSentence: { sentenceId, wordIds }
    }
    try {
      const response = await svc.sendRequestTo(config.name, new RequestMessage(gotoSentenceBody))
      return response.body
    } catch (response) {
      if (response instanceof ResponseMessage) {
        // This is an error from a treebank template app
        this.addRemoteError(response.errorCode, response.body.message)
      } else {
        // This is some other error
        this.addError(response.message)
      }
    }
  }
}

export default ArethusaTreebankAdapter
