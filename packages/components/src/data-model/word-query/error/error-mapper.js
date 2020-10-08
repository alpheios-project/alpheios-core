import WordQueryError from '@comp/data-model/word-query/error/word-query-error.js'

/**
 * A class that maps errors from one format to the other.
 */
export default class ErrorMapper {
  /**
   * Converts an error returned by client adapters to a format compatible with GraphQL schema.
   *
   * @param {object} clientAdaptersError - An error returned by client adapters.
   * @param {WordQueryErrorCodes} errorCode - A error code that is required by GraphQL.
   * @returns {WordQueryError} - An error in a GraphQL-compatible format.
   */
  static toWordQueryError (clientAdaptersError, { errorCode }) {
    return new WordQueryError(
      clientAdaptersError.message,
      errorCode,
      {
        path: [clientAdaptersError.methodName, clientAdaptersError.adapter]
      })
  }
}
