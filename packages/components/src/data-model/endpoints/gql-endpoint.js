import WordQueryResolver from '@comp/data-model/word-query/word-query-resolver.js'

export default class GqlEndpoint {
  constructor () {
    this.resolvers = {
      wordQuery: undefined
    }

    this._wordQueryResolver = undefined
  }

  init ({ getLexiconsFn, getShortLexiconsFn }) {
    this._wordQueryResolver = new WordQueryResolver({ getLexiconsFn, getShortLexiconsFn })
    this.resolvers.wordQuery = this._wordQueryResolver.resolve.bind(this._wordQueryResolver)
  }
}
