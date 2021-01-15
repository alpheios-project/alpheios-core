import WordQueryError from '@comp/lexical-data/word-query/error/word-query-error.js'
import ErrorSeverityTypes from '@comp/lexical-data/constants/error-severity-types.js'

/**
 * A class that represents a warning in a GraphQL-compatible format.
 * A warning is less severe than an error.
 */
export default class WordQueryWarning extends WordQueryError {
  /**
   * Creates an instance of WordQueryError.
   *
   * @param {string} message - An error message.
   * @param {import('../../constants/error-codes.js').ErrorCodes} code - An error or a warning code.
   * @param {object} [warnData] - Additional parameters of the warning.
   */
  constructor (message, code, warnData = {}) {
    super(message, code, warnData)
    this.extensions.severity = ErrorSeverityTypes.WARNING
  }
}

WordQueryWarning.errMsgs = {
  NO_MESSAGE: 'WordQueryWarning requires a message to be provided',
  NO_ERROR_CODE: 'WordQueryWarning requires an error code to be provided'
}
