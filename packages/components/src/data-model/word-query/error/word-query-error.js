// eslint-disable-next-line no-unused-vars
import WordQueryErrorCodes from '@comp/data-model/word-query/error/word-query-error-codes.js' // Imported for type definitions only

/**
 * A class that represents an error in a format compatible with GraphQL error schema.
 */
export default class WordQueryError {
  /**
   * Creates an instance of WordQueryError.
   *
   * @param {string} message - An error message.
   * @param {WordQueryErrorCodes} code - An error code.
   * @param {string[]} path - A path where an error occurred.
   */
  constructor (message, code, { path = [] } = {}) {
    if (!message) {
      throw new Error('WordQueryError requires a message to be provided')
    }
    if (!code) {
      throw new Error('WordQueryError requires a code to be provided')
    }
    this.message = message
    this.path = path
    this.extensions = {
      code
    }
  }

  toJsonObject () {
    return {
      message: this.message,
      path: this.path,
      extensions: this.extensions
    }
  }
}
