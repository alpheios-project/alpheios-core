import LexicalDataResult from '@comp/data-model/word-query/lexical-data/result/lexical-data-result.js'
import { LanguageModelFactory as LMF, Logger, HomonymGroup } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import WordQueryErrorCodes from '@comp/data-model/word-query/error/word-query-error-codes.js'
import ErrorMapper from '@comp/data-model/word-query/error/error-mapper.js'

export default class TuftsMorphologyData {
  constructor ({ word, language, clientId, clearShortDefs } = {}) {
    this._word = word
    this._language = language
    this._clientId = clientId
    this._clearShortDefs = clearShortDefs
  }

  async retrieve (lexicalData) {
    let result = new LexicalDataResult(TuftsMorphologyData.dataType) // eslint-disable-line prefer-const
    const langAttrs = LMF.getLegacyLanguageCodeAndId(this._language)

    // If succeeds, request returns a Homonym in its `result` field
    const adapterMorphRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      clientID: this._clientId,
      params: {
        languageID: langAttrs.languageID,
        word: this._word
      }
    })

    let homonymGroup
    let errors = [] // eslint-disable-line prefer-const
    if (adapterMorphRes.errors.length === 0) {
      // Request succeeded
      if (this._clearShortDefs) {
        // Clear the short defs data if query did not request short definitions but we have them in the homonym, clear their data
        adapterMorphRes.result.lexemes.forEach((l) => { l.meaning.clearShortDefs() })
      }

      homonymGroup = new HomonymGroup([adapterMorphRes.result])
    } else {
      // Request failed
      adapterMorphRes.errors.forEach(error => {
        errors.push(ErrorMapper.clientAdaptersToWordQueryError(
          error,
          { errorCode: WordQueryErrorCodes.TUFTS_ERROR }
        ))
        Logger.getInstance().log(error.message)
      })
      homonymGroup = new HomonymGroup([])
    }

    result.state.loading = false
    result.state.available = (adapterMorphRes.errors.length === 0)
    result.state.failed = (adapterMorphRes.errors.length > 0)
    result.errors = errors
    result.data = homonymGroup
    return result
  }
}

TuftsMorphologyData.dataType = 'tuftsMorphology'
