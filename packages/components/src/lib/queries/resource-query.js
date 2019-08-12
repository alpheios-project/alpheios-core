import Query from './query.js'
import { PsEvent } from 'alpheios-data-models'

export default class ResourceQuery extends Query {
  constructor (name, feature, options) {
    super(name)
    this.feature = feature
    this.grammars = options.grammars
  }

  static create (feature, options) {
    return Query.create(ResourceQuery, feature, options)
  }

  async getData () {
    const iterator = this.iterations()

    let result = iterator.next()
    while (true) {
      if (!this.active) { this.finalize() }
      if (Query.isPromise(result.value)) {
        try {
          const resolvedValue = await result.value
          result = iterator.next(resolvedValue)
        } catch (error) {
          console.error('Unexpected error retrieving Alpheios grammar resource', error)
          iterator.return()
          break
        }
      } else {
        result = iterator.next(result.value)
      }
      if (result.done) { break }
    }
  }

  * iterations () {
    this.grammarResources = yield this.grammars.fetchResources(this.feature)
    yield 'Retrieval of grammar info complete'
    let grammarRequests = []
    grammarRequests = grammarRequests.concat(this.grammarResources.map(res => {
      return {
        res: res,
        complete: false
      }
    }
    ))
    if (grammarRequests.length === 0) {
      ResourceQuery.evt.GRAMMAR_NOT_FOUND.pub()
      this.finalize()
    }
    for (let q of grammarRequests) { // eslint-disable-line prefer-const
      q.res.then(
        url => {
          q.complete = true
          if (this.active) {
            ResourceQuery.evt.GRAMMAR_AVAILABLE.pub({ url: url })
          }
          if (grammarRequests.every(request => request.complete)) {
            if (this.active) {
              ResourceQuery.evt.RESOURCE_QUERY_COMPLETE.pub({ resultStatus: ResourceQuery.resultStatus.SUCCEEDED })
            }
            this.finalize()
          }
        },
        error => {
          console.error('Unexpected error retrieving Alpheios grammar resource', error)
          if (grammarRequests.every(request => request.complete)) {
            if (this.active) {
              ResourceQuery.evt.RESOURCE_QUERY_COMPLETE.pub({ resultStatus: ResourceQuery.resultStatus.SUCCEEDED })
            }
            this.finalize()
          }
        }
      )
    }
    yield 'Retrieval of resources complete'
  }

  finalize (result) {
    Query.destroy(this)
    return result
  }
}

/**
 * This is a description of a ResourceQuery event interface.
 * Data: empty.
 */
ResourceQuery.evt = {
  /**
   * Published when a new LexicalQuery data processing is complete.
   * Data: {
   *  {symbol} resultStatus - A lexical query result status
   * }
   */
  RESOURCE_QUERY_COMPLETE: new PsEvent('Resource Query Complete', ResourceQuery),

  /**
   * Published when some new piece of grammar data becomes available.
   * Data: {Array} url - A grammar data URLs.
   */
  GRAMMAR_AVAILABLE: new PsEvent('Grammar Data is Available', ResourceQuery),

  /**
   * Published when a no grammar information is found.
   * Data: {symbol} languageID - a language ID of a selected text.
   */
  GRAMMAR_NOT_FOUND: new PsEvent('Grammar Not Found', ResourceQuery)
}
