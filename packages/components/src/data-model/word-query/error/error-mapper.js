import WordQueryError from '@comp/data-model/word-query/error/word-query-error.js'
import WordQueryWarning from '@comp/data-model/word-query/error/word-query-warning.js'
import ErrorOrigins from '@comp/data-model/constants/error-origins.js'

/**
 * A class that maps errors from one format to the other.
 */
export default class ErrorMapper {
  /**
   * Converts an error returned by client adapters to a format compatible with the GraphQL schema.
   *
   * @param {object} clientAdaptersErrorOrWarning - An error or warning returned by client adapters.
   * @param {import('../../constants/error-codes.js').ErrorCodes} errCode - A code that represents
   *        a type of an error or a warning.
   * @returns {WordQueryError | WordQueryWarning} - An error or warning object with a format
   *           matching GraphQL specifications (see http://spec.graphql.org/draft/#sec-Errors).
   */
  static clientAdaptersToWordQuery (clientAdaptersErrorOrWarning, { errCode }) {
    const params = [
      clientAdaptersErrorOrWarning.message,
      errCode,
      {
        origin: ErrorOrigins.CLIENT_ADAPTERS,
        clAdapter: clientAdaptersErrorOrWarning.adapter,
        clAdapterMethod: clientAdaptersErrorOrWarning.methodName
      }
    ]
    if (clientAdaptersErrorOrWarning.constructor.name === 'AdapterError') {
      return new WordQueryError(...params)
    } else if (clientAdaptersErrorOrWarning.constructor.name === 'AdapterWarning') {
      return new WordQueryWarning(...params)
    } else {
      throw new Error(`Unsupported error type: ${clientAdaptersErrorOrWarning.constructor.name}`)
    }
  }
}
