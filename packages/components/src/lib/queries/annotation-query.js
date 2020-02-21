import Query from './query.js'
import { PsEvent, TreebankDataItem } from 'alpheios-data-models'

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
    let data = {
      treebank: {
        page: {},
        word: {}
      },
    }
    if (siteMatch.length > 0) {
      data.page.src = siteMatch[0].resourceOptions.items.treebanks.currentValue
    }

    const tbSrcElem = this.document.querySelector('[data-alpheios_tb_src]')

    // version 3 uses the messaging service to connect to the treebank for
    // morphology data
    // we retrieve the first treebank document so that it is preloaded
    // before the user selects a word
    const tbRefElem = this.document.querySelector('[data-alpheios_tb_ref]')
    if (tbRefElem) {
      try {
        data.word = treebankDataItem = new TreebankDataItem()
      } catch (e) {
        console.warn("Error reading treebank data",e)
      }
    }
    return data
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
