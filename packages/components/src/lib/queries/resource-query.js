import Query from './query.js'

export default class ResourceQuery extends Query {
  constructor (name, feature, options) {
    super(name)
    this.feature = feature
    this.ui = options.uiController
    this.grammars = options.grammars
  }

  static create (feature, options) {
    return Query.create(ResourceQuery, feature, options)
  }

  async getData () {
    this.ui.message(`Retrieving requested resource ...`)
    let iterator = this.iterations()

    let result = iterator.next()
    while (true) {
      if (!this.active) { this.finalize() }
      if (Query.isPromise(result.value)) {
        try {
          let resolvedValue = await result.value
          result = iterator.next(resolvedValue)
        } catch (error) {
          console.error(error)
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
      this.ui.updateGrammar([])
      this.ui.addMessage(this.ui.l10n.messages.TEXT_NOTICE_GRAMMAR_NOTFOUND)
      this.finalize()
    }
    for (let q of grammarRequests) {
      q.res.then(
        url => {
          q.complete = true
          if (this.active) {
            this.ui.addMessage(this.ui.l10n.messages.TEXT_NOTICE_GRAMMAR_READY)
            this.ui.updateGrammar(url)
          }
          if (grammarRequests.every(request => request.complete)) {
            if (this.active) { this.ui.addMessage(this.ui.l10n.messages.TEXT_NOTICE_GRAMMAR_COMPLETE) }
            this.finalize()
          }
        },
        error => {
          console.log('Error retrieving Grammar resource', error)
          if (grammarRequests.every(request => request.complete)) {
            if (this.active) { this.ui.addMessage(this.ui.l10n.messages.TEXT_NOTICE_RESQUERY_COMPLETE) }
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
