import LexicalDataResult from '@comp/data-model/word-query/lexical-data/result/lexical-data-result.js'
import { LanguageModelFactory as LMF, Logger, HomonymGroup } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import WordQueryErrorCodes from '@comp/data-model/word-query/error/word-query-error-codes.js'
import ErrorMapper from '@comp/data-model/word-query/error/error-mapper.js'

export default class TreebankData {
  constructor ({ word, language, clientId, treebankProvider, treebankSentenceId, treebankWordIds } = {}) {
    this._word = word
    this._language = language
    this._clientId = clientId
    this._treebankProvider = treebankProvider
    this._treebankSentenceId = treebankSentenceId
    this._treebankWordIds = treebankWordIds
  }

  async retrieve (lexicalData) {
    let result = new LexicalDataResult(TreebankData.dataType) // eslint-disable-line prefer-const
    const langAttrs = LMF.getLegacyLanguageCodeAndId(this._language)

    const failed = false
    let homonyms = [] // eslint-disable-line prefer-const
    let errors = [] // eslint-disable-line prefer-const
    await Promise.all(this._treebankWordIds.map(async (wordId) => {
      const adapterTreebankRes = await ClientAdapters.morphology.arethusaTreebank({
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

      if (adapterTreebankRes.errors.length === 0) {
        // Request succeeded
        // Filter out incorrect and empty responses
        homonyms.push(...adapterTreebankRes.filter(homonym => Boolean(homonym)))
      } else {
        // Request failed
        adapterTreebankRes.errors.forEach(error => {
          errors.push(ErrorMapper.clientAdaptersToWordQueryError(
            error,
            { errorCode: WordQueryErrorCodes.TREEBANK_ERROR }
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
}

TreebankData.dataType = 'treebankData'
