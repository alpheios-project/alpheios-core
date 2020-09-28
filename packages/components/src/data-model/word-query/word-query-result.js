// eslint-disable-next-line no-unused-vars
import WordQueryError from '@comp/data-model/word-query/word-query-error.js' // Imported for type definitions only

/**
 * Represents a result object that will be returned by GraphQL.
 */
export default class WordQueryResult {
  constructor () {
    this.homonymGroup = null
    this.state = {
      loading: false,
      lexemes: {
        loading: false,
        available: false,
        failed: false
      },
      shortDefs: {
        loading: false,
        available: false,
        failed: false
      }
    }
    /** @type {WordQueryError[]} */
    this.errors = []
  }

  toJsonObject () {
    // eslint-disable-next-line prefer-const
    let result = {
      homonyms: WordQueryResult.homonymGroupToJsonObject(this.homonymGroup),
      state: WordQueryResult.stateToJsonObject(this.state)
    }
    if (this.errors.length > 0) {
      result.errors = this.errors.map((err) => err.toJsonObject())
    }
    return result
  }

  static homonymGroupToJsonObject (homonymGroup) {
    if (homonymGroup) {
      return homonymGroup.homonyms.map(h => h.convertToJSONObject(true))
    }
    return []
  }

  static stateToJsonObject (state) {
    if (state) {
      return JSON.parse(JSON.stringify(state))
    }
  }

  static errorsToJsonObject (errors) {
    return errors.map(err => err.toJsonObject())
  }

  loadingStarted ({ getLexemes = false, getShortDefs = false } = {}) {
    this.state.loading = true
    this.state.lexemes.loading = getLexemes
    this.state.shortDefs.loading = getLexemes
  }

  static loadingStopped (state) {
    state.loading = false
    state.lexemes.loading = false
    state.shortDefs.loading = false
  }
}
