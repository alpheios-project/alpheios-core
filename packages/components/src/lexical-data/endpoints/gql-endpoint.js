import WordQueryResolver from '@comp/lexical-data/word-query/word-query-resolver.js'

export default class GqlEndpoint {
  constructor () {
    this.resolvers = {
      wordQuery: undefined
    }

    this._wordQueryResolver = undefined
  }

  init ({ getLexiconsFn, getShortLexiconsFn, appName, appVersion, branch, buildNumber }) {
    this._wordQueryResolver = new WordQueryResolver({
      getLexiconsFn, getShortLexiconsFn, appName, appVersion, branch, buildNumber
    })
    this.resolvers.wordQuery = this._wordQueryResolver.resolve.bind(this._wordQueryResolver)
  }
}
