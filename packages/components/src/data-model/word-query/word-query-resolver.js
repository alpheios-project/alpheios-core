import { makeVar } from '@apollo/client/core'
import { Logger, Digest, Language } from 'alpheios-data-models'
import WordQuery from '@comp/data-model/word-query/word-query.js'
import WordQueryResponse from '@comp/data-model/word-query/word-query-response.js'

/**
 * A class that would receive GraphQL requests and resolve them with data.
 * Creates an instance of WordQuery for the query resolution.
 */
export default class WordQueryResolver {
  constructor ({
    getLexiconsFn, getShortLexiconsFn, appName = 'alpheios', appVersion = '', branch = '', buildNumber = ''
  } = {}) {
    this._getLexiconsFn = getLexiconsFn
    this._getShortLexiconsFn = getShortLexiconsFn
    this._appName = appName
    this._appVersion = appVersion
    this._branch = branch
    this._buildNumber = buildNumber
    this._clientName = 'graphql-client'
  }

  get _clientId () {
    let clientId = this._appName
    if (this._appVersion) { clientId += `.${this._appVersion}` }
    if (this._branch) { clientId += `.${this._branch}` }
    if (this._buildNumber) { clientId += `.${this._buildNumber}` }
    clientId += `.${this._clientName}`
    return clientId
  }

  /**
   * This method is called when a new GraphQL query arrives.
   *
   * @param {*} _ - A parameter that is not used in a method, underscore is used to designate
   *                such a parameter, according to Apollo convention.
   * @param {object} options - An options object.
   * @param {object} options.storage - A storage object that outlives the query.
   * @param {object} options.variables - Parameters of a GraphQL query.
   * @returns {object} - A result of a GraphQL query.
   */
  resolve (_, { storage, variables }) {
    // This is a unique key of each request. We'll use its hash value to cache requests already resolved.
    const key = Digest.fromObject({
      word: variables.word,
      language: variables.language,
      contextForward: variables.contextForward,
      contextBackward: variables.contextBackward
    })
    // The words map will store references to the results stored in the Apollo cache
    if (!storage.words) { storage.words = new Map() }
    if (!storage.words.has(key)) {
      // eslint-disable-next-line prefer-const
      let response = new WordQueryResponse({ updateCallback: this.updateCallback.bind(this, storage, key) })
      // This makes an Apollo reactive variable
      const word = makeVar(response.toJsonObject())
      // Store the result object reference into the map
      storage.words.set(key, word)

      const lexicons = this._getLexiconsFn(variables.language, variables.location)
      const shortLexicons = this._getShortLexiconsFn(variables.language, variables.location)

      /** @type {import('./word-query.js').WordQueryOptions} */
      let wordQueryOptions = { // eslint-disable-line prefer-const
        word: variables.word,
        language: Language.fromJsonObject({ code: variables.language }),
        clientId: this._clientId
      }
      if (variables.getLexemes) {
        /** @type {import('./word-query.js').GetLexemesOptions} */
        wordQueryOptions.getLexemes = {
          useMorphService: variables.useMorphService,
          useWordAsLexeme: variables.useWordAsLexeme
        }
        if (variables.useTreebankData) {
          /** @type {import('./word-query.js').TreebankDataOptions} */
          wordQueryOptions.getLexemes.useTreebankData = {
            treebankProvider: variables.treebankProvider,
            treebankSentenceId: variables.treebankSentenceId,
            treebankWordIds: variables.treebankWordIds
          }
        }
      }
      if (variables.getShortDefs) {
        /** @type {import('./word-query.js').GetShortDefsOptions} */
        wordQueryOptions.getShortDefs = {
          lexicons,
          shortLexicons
        }
      }
      const wordQuery = new WordQuery(
        wordQueryOptions,
        response
      )
      // Start the new query to obtain lexical data. Don't wait for it to resolve:
      // it will dynamically update the result object until the query if complete fully.
      wordQuery.start()
    }
    // Return a value of the reactive variable to the user
    return (storage.words.get(key))()
  }

  updateCallback (storage, key, wordQueryResult) {
    if (storage.words.has(key)) {
      let wordReactive = storage.words.get(key) // eslint-disable-line prefer-const
      const resultJson = wordQueryResult.toJsonObject()
      wordReactive(resultJson)
    } else {
      Logger.getInstance().warn(`Cannot update query results because the word key ${key} is missing from the storage`)
    }
  }
}
