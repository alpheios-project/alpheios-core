/**
 * @typedef {object} WordQueryErrorJson - A JSON object that conforms Apollo GraphQL error format conventions.
 * @property {string} message - An error message
 * @property {string[]} path - A path (a sequence of component names) where an error occurred.
 * @property {object} extensions - An object containing additional error data.
 * @property {string} extensions.code - An error code that specifies the type of the error.
 */

/**
 * A class that represents an error in a format compatible with GraphQL error schema.
 */
export default class WordQueryError {
  /**
   * Creates an instance of WordQueryError.
   *
   * @param {string} message - An error message.
   * @param {import('./word-query-error-codes.js').WordQueryErrorCodes} code - An error code.
   *        It is required to match Apollo GraphQL convention for errors.
   * @param {string[]} path - A path (a sequence of component names) where an error occurred.
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

  /**
   * Converts a WordQueryObject to a JSON object that conforms the Apollo GraphQL error format convention.
   *
   * @returns {WordQueryErrorJson} - A JSON object that represents the error.
   */
  toJsonObject () {
    return {
      message: this.message,
      path: this.path,
      extensions: this.extensions
    }
  }
}
