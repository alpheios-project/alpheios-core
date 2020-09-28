/**
 * A class that matches a GraphQL error format.
 * TODO: Should we use our own error classes internally and provide conversion to GraphQL formats?
 */
export default class WordQueryError {
  /**
   * Creates an instance of WordQueryError.
   *
   * @param {string} message - An error message.
   * @param {WordQueryError.errorCodes} code - An error code.
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

/** @enum {string} */
WordQueryError.errorCodes = {
  TUFTS_ERROR: 'TUFTS_ERROR',
  TREEBANK_ERROR: 'TREEBANK_ERROR',
  LEXICONS_ERROR: 'LEXICONS_ERROR'
}
