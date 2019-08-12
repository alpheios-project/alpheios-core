import Query from './query.js'
import { PsEvent } from 'alpheios-data-models'

/**
 * This is a Query class to encapsulate queries for document specific Annotations
 * of various types.  At the moment is just querying a local Options object
 * but eventually it will need to interact with remote services.
 */
export default class AnnotationQuery extends Query {
  constructor (name, options) {
    super(name)
    this.l10n = options.l10n
    this.siteOptions = options.siteOptions
    this.document = options.document
  }

  static create (options) {
    return Query.create(AnnotationQuery, options)
  }

  async getData () {
    this.getTreebankOptions().then((data) => {
      AnnotationQuery.evt.ANNOTATIONS_AVAILABLE.pub({ annotations: data })
    })
    this.finalize('complete')
  }

  finalize (result) {
    Query.destroy(this)
    return result
  }

  async getTreebankOptions () {
    const siteMatch = this.siteOptions.filter((s) => this.document.location.href.match(new RegExp(s.uriMatch)) && s.resourceOptions.items.treebanks)
    // TODO eventually this data should be probably be held in a formal data model object. Not sure what the best format
    // is right now so leaving that for later.
    if (siteMatch.length > 0) {
      return { treebank: { page: { src: siteMatch[0].resourceOptions.items.treebanks.currentValue } } }
    } else {
      return { treebank: { page: {} } }
    }
  }
}

/**
 * This is a description of a ResourceQuery event interface.
 * Data: empty.
 */
AnnotationQuery.evt = {
  /**
   * Published when annotations become available.
   * Data: annotations - An annotations data.
   */
  ANNOTATIONS_AVAILABLE: new PsEvent('Annotations Become Available', AnnotationQuery)
}
