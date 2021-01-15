import ErrorSeverityTypes from '@comp/lexical-data/constants/error-severity-types.js'

/**
 * @typedef {object} WordQueryErrorJson - A JSON object that conforms Apollo GraphQL error format conventions.
 * @property {string} message - An error message
 * @property {string[]} path - A path (a sequence of component names) where an error occurred.
 * @property {object} extensions - An object containing additional error data.
 * @property {string} [extensions.errCode] - An error code that specifies the type of the error.
 * @property {string} [extensions.origin] - A name of the module from where the error or warning are coming from.
 * @property {string} [extensions.clAdapter] - If the error was originated within client adapters, this
 *                    would be the name of the client adapter that produced an error or a warning.
 * @property {string} [extensions.clAdapterMethod] - If the error was originated within client adapters, this
 *                    would be the name of method within the client adapter that produced an error or a warning.
 */

/**
 * A class that represents an error in a format compatible with GraphQL error schema.
 */
export default class WordQueryError {
  /**
   * Creates an instance of WordQueryError.
   *
   * @param {string} message - An error message.
   * @param {import('../../constants/error-codes.js').ErrorCodes} errCode - An error or a warning code.
   * @param {string[]} path - A path (a sequence of component names) where an error occurred.
   */
  constructor (message, errCode, { origin, clAdapter, clAdapterMethod } = {}) {
    if (!message) {
      throw new Error(this.constructor.errMsgs.NO_MESSAGE)
    }
    if (!errCode) {
      throw new Error(this.constructor.errMsgs.NO_ERROR_CODE)
    }
    this.message = message
    this.path = ['homonyms']
    this.extensions = {
      severity: ErrorSeverityTypes.ERROR,
      errCode,
      origin,
      clAdapter,
      clAdapterMethod
    }
  }

  /**
   * Converts a WordQueryObject to a JSON object that conforms the GraphQL error format specification.
   *
   * @returns {WordQueryErrorJson} - A JSON object that represents the error.
   */
  toJsonObject () {
    /** type: {WordQueryErrorJson} */
    let extensions = {} // eslint-disable-line prefer-const
    // Extensions should contain only those keys that have non-empty values
    for (const [key, value] of Object.entries(this.extensions)) {
      if (value) { extensions[key] = value }
    }
    return {
      message: this.message,
      path: this.path,
      extensions
    }
  }
}

WordQueryError.errMsgs = {
  NO_MESSAGE: 'WordQueryError requires a message to be provided',
  NO_ERROR_CODE: 'WordQueryError requires an error code to be provided'
}
