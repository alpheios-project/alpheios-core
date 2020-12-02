import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client/core'

let singleInstance

const WORD_QUERY =
  gql`
    query WordQuery($langCode: Language, $userID: String) {
      word(langCode: $langCode, userID: $userID) @client
    }
  `

/**
 * Converts a results of GraphQL word query into JS objects.
 * Provides several methods to retrieve data via GraphQL word query.
 */
export default class WordQueryController {
  constructor ({ wordQueryResolver } = {}) {
    const resolvers = {}

    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            word: {
              read: wordQueryResolver
            }
          }
        }
      }
    })

    this._apolloClient = new ApolloClient({
      cache,
      link: new HttpLink({ uri: '/graphql', fetch }),
      resolvers
    })
  }

  static getInstance () {
    if (!singleInstance) {
      singleInstance = new WordQueryController()
    }
    return singleInstance
  }

  /**
   * An asynchronous GraphQL query. Data is returned when the query is fully completed.
   *
   * @param {object} options - Data that will be passed to the GraphQL query.
   * @param {object} options.variables - Variables to be passed to the GraphQL query.
   * @returns {Promise<*>} - A promise that is resolved with the GraphQL result.
   */
  async query ({ variables } = {}) {
    const gqlQuery = {
      query: WORD_QUERY,
      variables
    }
    return this._apolloClient.query(gqlQuery)
  }

  /**
   * A representation of a GraphQL query. `observableQuery()` knows that the query is "live"
   * and it polls the query data every X milliseconds or until the maximum number of poll attempts is reached.
   * It also monitors the `state.loading` filed of the query response. When it would change its value
   * from `true` to `false` it would mean that the query is complete and all query data is fully retrieved.
   * This method is a wrapper around the Apollo Watcher that adds the following functionality:
   *  - It defines a maximum number of iterations that is used to terminate the long-running queries;
   *  - It checks our own custom loading status to verify if the query is still running;
   *  - It splits query response into three separate parts: homonyms, state, and errors thus hiding
   *    the internal structure of the GraphQL response from the client.
   *
   * @param {object} options - Data that will be passed to the GraphQL query.
   * @param {object} options.variables - Variables to be passed to the GraphQL query.
   * @param {Function} options.dataCallback - A function to be called every time new data arrives.
   * @param {number} options.pollInterval - An interval in milliseconds specifying how often a new data will be retrieved.
   * @param {number} options.maxIterations - How many iterations to do before stopping the query.
   */
  observableQuery ({ variables, dataCallback, pollInterval = 1000, maxIterations = 10 } = {}) {
    let counter = 0
    const watchableQuery = this._apolloClient.watchQuery({ query: WORD_QUERY, pollInterval, variables })
    watchableQuery.subscribe({
      next: ({ data }) => {
        const loading = data.word.extensions.state.loading
        if (loading === false) {
          watchableQuery.stopPolling()
        }
        if (counter >= maxIterations) {
          watchableQuery.stopPolling()
        }
        counter++
        dataCallback(data.word)
      }
    })
  }
}
