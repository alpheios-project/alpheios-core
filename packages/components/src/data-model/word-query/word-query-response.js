/**
 * Represents a result object that will be returned by GraphQL.
 */
export default class WordQueryResponse {
  constructor ({ updateCallback } = {}) {
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
    /** @type {import('./error/word-query-error.js').WordQueryError[]} */
    this.errors = []
    this._updateCallback = updateCallback
  }

  toJsonObject () {
    // eslint-disable-next-line prefer-const
    let result = {
      homonyms: this.homonymGroup ? this.homonymGroup.homonyms.map(h => h.convertToJSONObject(true)) : [],
      state: JSON.parse(JSON.stringify(this.state))
    }
    if (this.errors.length > 0) {
      result.errors = this.errors.map((err) => err.toJsonObject())
    }
    return result
  }

  notify () {
    if (this._updateCallback) {
      this._updateCallback(this)
    }
  }
}
