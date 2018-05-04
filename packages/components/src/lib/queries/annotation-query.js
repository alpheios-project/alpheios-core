import Query from './query.js'

/**
 * This is a Query class to encapsulate queries for document specific Annotations
 * of various types.  At the moment is just querying a local Options object
 * but eventually it will need to interact with remote services.
 */
export default class AnnotationQuery extends Query {
  constructor (name, options) {
    super(name)
    this.ui = options.uiController
    this.l10n = options.l10n
    this.siteOptions = options.siteOptions
    this.document = options.document
  }

  static create (options) {
    return Query.create(AnnotationQuery, options)
  }

  async getData () {
    this.getTreebankOptions().then((data) => {
      this.ui.updatePageAnnotationData(data)
    })
    this.finalize('complete')
  }

  finalize (result) {
    console.log('Finalizing AnnotationQuery')
    Query.destroy(this)
    return result
  }

  async getTreebankOptions () {
    let siteMatch = this.siteOptions.filter((s) => this.document.location.href.match(new RegExp(s.uriMatch)) && s.resourceOptions.items.treebanks)
    // TODO eventually this data should be probably be held in a formal data model object. Not sure what the best format
    // is right now so leaving that for later.
    if (siteMatch.length > 0) {
      return { treebank: { page: { src: siteMatch[0].resourceOptions.items.treebanks.currentValue } } }
    } else {
      return { treebank: { page: {} } }
    }
  }
}
