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

  /**
   * User type definition.
   *
   * @typedef {Object} WordQueryJSON
   * @property {{homonyms: []}} data - An object containing a list of homonyms. If
   * @property {{state: Object}} extensions - An object containing the state of executions
   * @property {{errors: []}} [errors] - A list of errors. If no errors occurred it will not be preset.
   */

  /**
   * Converts a word query response to a JSON format.
   *
   * @returns {WordQueryJSON} - A word query response in JSON format.
   */
  toJsonObject () {
    /*
    According to GraphQL specifications, the only fields allowed at top level are `data`, `extensions`, and `errors`.
    If an error was encountered before execution begins, the data entry should not be present in the result.
    If an error was encountered during the execution that prevented a valid response,
    the data entry in the response should be null.
    If no errors were encountered during the query execution, the errors entry should not be present.
    See http://spec.graphql.org/draft/#sec-Response-Format
     */

    // eslint-disable-next-line prefer-const
    let result = {
      data: {
        homonyms: this.homonymGroup ? this.homonymGroup.homonyms.map(h => h.convertToJSONObject(true)) : []
      },
      extensions: {
        state: JSON.parse(JSON.stringify(this.state))
      }
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
