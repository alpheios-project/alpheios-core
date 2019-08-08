import uuidv4 from 'uuid/v4'

/**
 * A global object that holds queues of queries of different types. The object structure is:
 * {
 *   QueryName: {Map}, where map holds queries of a specific type using their IDs as keys.
 * }
 */
let queries = {}

/**
 * This is a base class for specialized queries.
 */
export default class Query {
  constructor (name) {
    this.ID = uuidv4()
    this.name = name
    this.active = true
  }

  /**
   * Creates an instance of a query object according to a constructor function provided.
   * @param {Function} constructor - A construction function of an object.
   * @param {TextSelector} selector - A selector object.
   * @param {Object} options - Query's options.
   * @return {Query} An instance of a newly created query object.
   */
  static create (constructor, selector, options) {
    if (queries.hasOwnProperty(constructor.name)) {
      // Deactivate all previous queries as only one query of a particular type can be active at a time
      queries[constructor.name].forEach(query => query.deactivate())
      // Erase all previous queries from a map
      queries[constructor.name].clear()
    } else {
      // Create a key for this new query type
      queries[constructor.name] = new Map()
    }

    let query = new constructor(constructor.name, selector, options)
    queries[query.name].set(query.ID, query)
    return query
  }

  /**
   * Destroys an instance of a query.
   * @param {Query} query - A query to be destroyed.
   */
  static destroy (query) {
    queries[query.name].delete(query.ID)
  }

  /**
   * Deactivates a query object.
   */
  deactivate () {
    this.active = false
  }

  /**
   * Determines whether an object provided is a promise.
   * @param {Promise | Object} obj - An object that needs to be tested.
   * @return {boolean} `true` if a tested object is a promise, `false` otherwise.
   */
  static isPromise (obj) {
    return Boolean(obj) && typeof obj.then === 'function'
  }

  /**
   * An entry point that starts query data retrieval. It is also used as a marker to start recording user experience by
   * an Experience object wrapper.
   * @return {Promise<Error>}
   */
  async getData () {
    return new Error(`getData() method should be implemented in a subclass of a Query`)
  }

  /**
   * An exit point for a query data retrieval. It is also used as a marker to stop recording user experience by
   * an Experience object wrapper.
   * @return {*}
   */
  finalize () {
    throw new Error(`finalize() method should be implemented in a subclass of a Query`)
  }
}

Query.resultStatus = {
  SUCCEEDED: Symbol('Query finished successfully'),
  FAILED: Symbol('Query failed'),
  CANCELED: Symbol('Query has been canceled')
}
