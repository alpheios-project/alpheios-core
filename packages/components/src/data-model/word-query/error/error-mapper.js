import WordQueryError from '@comp/data-model/word-query/error/word-query-error.js'

/**
 * A class that maps errors from one format to the other.
 */
export default class ErrorMapper {
  /**
   * Converts an error returned by client adapters to a format compatible with GraphQL schema.
   *
   * @param {object} clientAdaptersError - An error returned by client adapters.
   * @param {import('./word-query-error-codes.js').WordQueryErrorCodes} errorCode - A error code representing
   *        an error type. It is required according to the Apollo GraphQL format convention.
   * @returns {WordQueryError} - An error in a GraphQL-compatible format.
   */
  static clientAdaptersToWordQueryError (clientAdaptersError, { errorCode }) {
    return new WordQueryError(
      clientAdaptersError.message,
      errorCode,
      {
        path: [clientAdaptersError.methodName, clientAdaptersError.adapter]
      })
  }
}
