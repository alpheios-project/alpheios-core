import LexicalDataResult from '@comp/data-model/word-query/lexical-data/result/lexical-data-result.js'
import { LanguageModelFactory as LMF, Logger, HomonymGroup } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import WordQueryErrorCodes from '@comp/data-model/word-query/error/word-query-error-codes.js'
import ErrorMapper from '@comp/data-model/word-query/error/error-mapper.js'
import LexicalDataTypes from '@comp/data-model/word-query/lexical-data/types/lexical-data-types.js'

export default class TuftsMorphologyData {
  /**
   * Creates an instance of a TuftsMorphologyData object.
   *
   * @param {string} word - A word to be associated with an object.
   * @param {Language} language - A language of a word.
   * @param {string} clientId - An ID of a client application.
   * @param {boolean} clearShortDefs - Whether to clear short definitions returned by the Tufts morphology.
   */
  constructor ({ word, language, clientId, clearShortDefs = false } = {}) {
    if (!word) {
      throw new Error(TuftsMorphologyData.errMsgs.NO_WORD_PROVIDED)
    }
    if (!language) {
      throw new Error(TuftsMorphologyData.errMsgs.NO_LANGUAGE_PROVIDED)
    }
    if (!clientId) {
      throw new Error(TuftsMorphologyData.errMsgs.NO_CLIENT_ID_PROVIDED)
    }
    this._word = word
    this._language = language
    this._clientId = clientId
    this._clearShortDefs = clearShortDefs
  }

  /**
   * Creates a homonym group object from the word. The homonym group object contains a single homonym that
   * has a single lexeme generated from the word of this object instance.
   *
   * @param {Map<import('../types/lexical-data-types.js').LexicalDataTypes, LexicalDataResult>} [lexicalData] - A map
   *        containing lexical data that was already obtained.
   * @returns {Promise<LexicalDataResult>} - A lexical data result object containing the homonym group with
   *          a single homonym and a single lexeme.
   */
  async retrieve (lexicalData) {
    let requestFailed = false
    let result = new LexicalDataResult(TuftsMorphologyData.dataType) // eslint-disable-line prefer-const
    // If succeeds, request returns a Homonym in its `result` field
    const adapterMorphRes = await this._getHomonym()

    if (adapterMorphRes.errors.length === 0) {
      // If there were any errors store them in the result object
      adapterMorphRes.errors.forEach(error => {
        result.errors.push(ErrorMapper.clientAdaptersToWordQueryError(
          error,
          { errorCode: WordQueryErrorCodes.TUFTS_ERROR }
        ))
        Logger.getInstance().log(error.message)
      })
    }

    if (adapterMorphRes.result) {
      // If there is a result returned, the request succeeded, even if there were errors reported
      if (this._clearShortDefs) {
        // Clear the short defs data if query did not request short definitions but we have them in the homonym, clear their data
        adapterMorphRes.result.lexemes.forEach((l) => { l.meaning.clearShortDefs() })
      }
      result.data = new HomonymGroup([adapterMorphRes.result])
    } else {
      // Request failed
      requestFailed = true
      result.data = new HomonymGroup([])
    }

    result.state.loading = false
    result.state.available = !requestFailed
    result.state.failed = requestFailed
    return result
  }

  /**
   * Makes a call to the Tufts client adapter and return its results.
   * The call to the outside infrastructure is separated into a method
   * in order to be mocked during testing.
   *
   * @returns {Promise<*>}
   * @private
   */
  async _getHomonym () {
    const langAttrs = LMF.getLegacyLanguageCodeAndId(this._language)
    return ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      clientID: this._clientId,
      params: {
        languageID: langAttrs.languageID,
        word: this._word
      }
    })
  }
}

/** @type {import('../types/lexical-data-types.js').LexicalDataTypes | string} */
TuftsMorphologyData.dataType = LexicalDataTypes.TUFTS_MORPHOLOGY

TuftsMorphologyData.errMsgs = {
  NO_WORD_PROVIDED: 'TuftsMorphologyData cannot be created without a word',
  NO_LANGUAGE_PROVIDED: 'TuftsMorphologyData cannot be created without a language',
  NO_CLIENT_ID_PROVIDED: 'TuftsMorphologyData cannot be created without a client ID'
}
