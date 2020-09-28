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
export default class WordQueryAdapter {
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

    this._gql = new ApolloClient({
      cache,
      link: new HttpLink({ uri: '/graphql', fetch }),
      resolvers
    })
  }

  static getInstance () {
    if (!singleInstance) {
      singleInstance = new WordQueryAdapter()
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
    return this._gql.query(gqlQuery)
  }

  /**
   * An asynchronous GraphQL query. Data is returned when the query is fully completed.
   *
   * @param {object} options - Data that will be passed to the GraphQL query.
   * @param {object} options.variables - Variables to be passed to the GraphQL query.
   * @param {Function} options.dataCallback - A function to be called every time new data arrives.
   * @param {number} options.pollInterval - An interval in milliseconds specifying how often a new data will be retrieved.
   * @param {number} options.maxIterations - How many iterations to do before stopping the query.
   */
  observableQuery ({ variables, dataCallback, pollInterval = 1000, maxIterations = 10 } = {}) {
    let counter = 0
    const observableQuery = this._gql.watchQuery({ query: WORD_QUERY, pollInterval, variables })
    observableQuery.subscribe({
      next: ({ data }) => {
        const loading = data.word.state.loading
        if (loading === false) {
          observableQuery.stopPolling()
        }
        if (counter >= maxIterations) {
          observableQuery.stopPolling()
        }
        counter++
        dataCallback(data.word.homonyms, data.word.state, data.word.errors)
      }
    })
  }

  /**
   * Similar to `observableQuery()`, but with its own callback implementation.
   *
   * @param {object} options - Data that will be passed to the GraphQL query.
   * @param {object} options.variables - Variables to be passed to the GraphQL query.
   * @param {number} options.pollInterval - An interval in milliseconds specifying how often a new data will be retrieved.
   * @param {number} options.maxIterations - How many iterations to do before stopping the query.
   * @returns {Promise<*>} - A promise that is resolved with GraphQL data or is rejected with an error.
   */
  async getFromObservableQuery ({ variables, pollInterval = 1000, maxIterations = 10 } = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.observableQuery({
          variables,
          dataCallback: (data, loading) => {
            if (loading === false) {
              resolve(data)
            }
          },
          pollInterval,
          maxIterations
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}
