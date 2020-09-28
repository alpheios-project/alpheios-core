import { makeVar } from '@apollo/client/core'
import { Logger, Digest } from 'alpheios-data-models'
import WordQuery from '@comp/data-model/word-query/word-query.js'
import WordQueryResult from '@comp/data-model/word-query/word-query-result.js'

/**
 * A class that would receive GraphQL requests and resolve them with data.
 * Creates an instance of WordQuery for the query resolution.
 */
export default class WordQueryResolver {
  constructor ({ getLexiconsFn, getShortLexiconsFn } = {}) {
    this._getLexiconsFn = getLexiconsFn
    this._getShortLexiconsFn = getShortLexiconsFn
  }

  // This function will be called by Apollo when new GraphQL query will arrive.
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
      const wqResultWatcher = {
        // This function will track changes in the top-level props of the result object
        set: function (obj, prop, value) {
          let wordReactive = storage.words.get(key) // eslint-disable-line prefer-const
          let word = wordReactive() // eslint-disable-line prefer-const
          if (prop === 'homonymGroup') {
            // Update the value of the reactive variable
            const homonyms = value.toJsonObject().homonyms
            // Need to recreate an object on order for reactive var to be updated
            wordReactive({ ...word, homonyms })
          } else if (prop === 'state') {
            // Update the value of the reactive variable
            const state = WordQueryResult.stateToJsonObject(value)
            // Need to recreate an object on order for reactive var to be updated
            wordReactive({ ...word, state })
          } else if (prop === 'errors') {
            // Update the value of the reactive variable
            const errors = WordQueryResult.errorsToJsonObject(value)
            // Need to recreate an object on order for reactive var to be updated
            wordReactive({ ...word, errors })
          } else {
            Logger.getInstance().warn(`The unsupported ${prop} property has been changed`)
          }

          // Store the value into the result object
          obj[prop] = value
          // Indicate success
          return true
        }
      }
      let result = new WordQueryResult() // eslint-disable-line prefer-const
      result.loadingStarted({ getLexemes: variables.getLexemes, getShortDefs: variables.getShortDefs })
      // This makes an Apollo reactive variable
      const word = makeVar(result.toJsonObject())
      // Store the result object reference into the map
      storage.words.set(key, word)
      // This proxied version of the result will track changes in the top-level props of the result object
      let wqResult = new Proxy(result, wqResultWatcher) // eslint-disable-line prefer-const

      const lexicons = this._getLexiconsFn(variables.language, variables.location)
      const shortLexicons = this._getShortLexiconsFn(variables.language, variables.location)
      const wordQuery = new WordQuery({
        clientID: 'graphql-client',
        lexicons,
        shortLexicons
      },
      variables)
      // Start the new query to obtain lexical data. Don't wait for it to resolve:
      // it will dynamically update the result object until the query if complete fully.
      wordQuery.start(wqResult)
    }
    // Return a value of the reactive variable to the user
    return (storage.words.get(key))()
  }
}
