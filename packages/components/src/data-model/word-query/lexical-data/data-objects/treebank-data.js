import LexicalDataResult from '@comp/data-model/word-query/lexical-data/result/lexical-data-result.js'
import { LanguageModelFactory as LMF, Logger, HomonymGroup } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import ErrorCodes from '@comp/data-model/constants/error-codes.js'
import ErrorMapper from '@comp/data-model/word-query/error/error-mapper.js'
import LexicalDataTypes from '@comp/data-model/word-query/lexical-data/types/lexical-data-types.js'

export default class TreebankData {
  /**
   * Creates an instance of a TreebankData object.
   *
   * @param {string} word - A word to be associated with an object.
   * @param {Language} language - A language of a word.
   * @param {string} clientId - An ID of a client application.
   * @param {string} treebankProvider - The URL of a treebank data provider.
   * @param {string} treebankSentenceId - An ID of a sentence in the treebank.
   * @param {string[]} treebankWordIds - An array of word IDs.
   */
  constructor ({ word, language, clientId, treebankProvider, treebankSentenceId, treebankWordIds } = {}) {
    if (!word) {
      throw new Error(TreebankData.errMsgs.NO_WORD_PROVIDED)
    }
    if (!language) {
      throw new Error(TreebankData.errMsgs.NO_LANGUAGE_PROVIDED)
    }
    if (!clientId) {
      throw new Error(TreebankData.errMsgs.NO_CLIENT_ID_PROVIDED)
    }
    if (!treebankProvider) {
      throw new Error(TreebankData.errMsgs.NO_TREEBANK_PROVIDER)
    }
    if (!treebankSentenceId) {
      throw new Error(TreebankData.errMsgs.NO_TREEBANK_SENTENCE_ID)
    }
    if (!treebankWordIds || !Array.isArray(treebankWordIds) || treebankWordIds.length === 0) {
      throw new Error(TreebankData.errMsgs.NO_TREEBANK_WORD_IDS)
    }
    this._word = word
    this._language = language
    this._clientId = clientId
    this._treebankProvider = treebankProvider
    this._treebankSentenceId = treebankSentenceId
    this._treebankWordIds = treebankWordIds
  }

  /**
   * Creates a lexical word date from the treebank source. Returns a HomonymGroup populated with the
   * data retrieved.
   *
   * @param {Map<import('../types/lexical-data-types.js').LexicalDataTypes, LexicalDataResult>} [lexicalData] - A map
   *        containing lexical data that was already obtained.
   * @returns {Promise<LexicalDataResult>} - A lexical data result object containing the homonym group with
   *          the word lexical data.
   */
  async retrieve (lexicalData) {
    let result = new LexicalDataResult(TreebankData.dataType) // eslint-disable-line prefer-const

    const failed = false
    let homonyms = [] // eslint-disable-line prefer-const
    let errors = [] // eslint-disable-line prefer-const
    await Promise.all(this._treebankWordIds.map(async (wordId) => {
      const adapterTreebankRes = this._getTreebankData(wordId)

      if (adapterTreebankRes.errors.length === 0) {
        // Request succeeded
        // Filter out incorrect and empty responses
        homonyms.push(...adapterTreebankRes.filter(homonym => Boolean(homonym)))
      } else {
        // Request failed
        adapterTreebankRes.errors.forEach(error => {
          errors.push(ErrorMapper.clientAdaptersToWordQuery(
            error,
            { errCode: ErrorCodes.TREEBANK_ERROR }
          ))
          Logger.getInstance().log(error.message)
        })
      }
    }))

    const homonymGroup = new HomonymGroup(homonyms)

    result.state.loading = false
    result.state.available = !failed
    result.state.failed = failed
    result.errors = errors
    result.data = homonymGroup
    return result
  }

  /**
   * Makes a call to the Arethusa treebank client adapter and return the results of this call.
   * The call to the outside infrastructure is separated into a method of its own
   * in order to enable its mocking during testing.
   *
   * @param {string} wordId - An ID of a word which info needs to be retrieved.
   * @returns {Promise<*>} - A promise that is resolved with the results returned from the client adapter.
   * @private
   */
  async _getTreebankData (wordId) {
    const langAttrs = LMF.getLegacyLanguageCodeAndId(this._language)
    return ClientAdapters.morphology.arethusaTreebank({
      method: 'getHomonym',
      clientID: this._clientId,
      params: {
        languageID: langAttrs.languageID,
        word: this._word,
        provider: this._treebankProvider,
        sentenceId: this._treebankSentenceId,
        wordId: wordId
      }
    })
  }
}

/** @type {import('../types/lexical-data-types.js').LexicalDataTypes | string} */
TreebankData.dataType = LexicalDataTypes.TREEBANK

TreebankData.errMsgs = {
  NO_WORD_PROVIDED: 'TreebankData cannot be created without a word',
  NO_LANGUAGE_PROVIDED: 'TreebankData cannot be created without a language',
  NO_CLIENT_ID_PROVIDED: 'TreebankData cannot be created without a client ID',
  NO_TREEBANK_PROVIDER: 'TreebankData cannot be created without a treebank provider',
  NO_TREEBANK_SENTENCE_ID: 'TreebankData cannot be created without a treebank sentence ID',
  NO_TREEBANK_WORD_IDS: 'TreebankData cannot be created without an array of treebank word IDs'
}
