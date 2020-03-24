export default class TreebankDataItem {
  constructor (elem) {
    this.version = 0
    this.sourceUrl = null
    this.reference = null

    /*
    Let's check if this is a document with treebank V2 data.
    It has a metadata element in the head with a `alpheios-v2-treebank-diagram-url` name:
       <meta name="alpheios-v2-treebank-diagram-url" data-alpheios_tb_src="https://alpheios.net/alpheios-treebanks/DOC.html?chunk=SENTENCE&amp;w=WORD">
   */
    let tbSrcElem = elem.ownerDocument.querySelector('meta[name="alpheios-v2-treebank-diagram-url"]')
    if (tbSrcElem) {
      // This document contains a version 2 of treebank data
      this.version = 2
      this.sourceUrl = tbSrcElem.dataset.alpheios_tb_src
      if (!this.sourceUrl) { throw new Error(`Treebank source URL is missing in: ${tbSrcElem.outerHTML}`) }
      /*
      Documents with version 2 of treebank data do not have a reference for the initial loading of a template
      into an iframe of the current document. For that we'll use a `data-alpheios_tb_ref` data attribute
      of the element provided to the constructor. If this element has no such element, we'll check
      its ancestors for this attribute.
      */
      let tbRefElem = elem.closest('[data-alpheios_tb_ref]')
      if (!tbRefElem || !tbRefElem.dataset.alpheios_tb_ref) {
        /*
          If `data-alpheios_tb_ref` data attribute is not found among ancestors then it is probably an
          initial loading of a treebank diagram. In that case we can use a first `data-alpheios_tb_ref`
          found on a page.
         */
        tbRefElem = elem.ownerDocument.querySelector('[data-alpheios_tb_ref]')
      }
      if (!tbRefElem || !tbRefElem.dataset.alpheios_tb_ref) {
        throw new Error('Cannot find an element with the data-alpheios_tb_ref data attribute among the ancestors')
      }
      this.reference = tbRefElem.dataset.alpheios_tb_ref
    }

    if (!this.version) {
      /*
      Data for V2 is not found. Let's check if it has data for V3 or later. It must have an element
      with the following obligatory data attributes:
        data-alpheios_tb_version - a version of a data format
        data-alpheios_tb_src - a schema of a treebank template URL
        data-alpheios_tb_ref - a reference that will be used to load data into the iframe initially
      Example:
        data-alpheios_tb_version="3"
        data-alpheios_tb_src="https://alpheios-project.github.io/treebank-template/embed/DOC/SENTENCE?w=WORD"
        data-alpheios_tb_ref="on-the-murder-of-eratosthenes-1-50#1-1"
      */
      tbSrcElem = elem.ownerDocument.querySelector('[data-alpheios_tb_version]')
      if (tbSrcElem) {
        if (tbSrcElem.dataset.alpheios_tb_version) {
          this.version = Number.parseInt(tbSrcElem.dataset.alpheios_tb_version, 10)
          if (Number.isNaN(this.version)) { throw new Error(`Treebank version is incorrect in: ${tbSrcElem.outerHTML}`) }
        }

        if (!tbSrcElem.dataset.alpheios_tb_src) { throw new Error(`Missing treebank source URL in: ${tbSrcElem.outerHTML}`) }
        this.sourceUrl = tbSrcElem.dataset.alpheios_tb_src

        const tbRefElem = elem.closest('[data-alpheios_tb_ref]')
        if (!tbRefElem || !tbRefElem.dataset.alpheios_tb_ref) {
          throw new Error('Cannot find an element with the data-alpheios_tb_ref data attribute among the ancestors')
        }
        this.reference = tbRefElem.dataset.alpheios_tb_ref
      }
    }

    if (this.hasTreebankData) {
      const [doc, ref] = this.reference.split(/#/)
      if (!doc || !ref) { throw new Error(`Invalid treebank reference in: ${tbSrcElem.outerHTML}`) }
      const [s, w] = ref.split(/-/)
      if (!s) { throw new Error(`Invalid treebank sentence ID in: ${tbSrcElem.outerHTML}`) }
      if (!w) { throw new Error(`Invalid treebank word ID in: ${tbSrcElem.outerHTML}`) }
      this.doc = doc
      this.sentenceId = s
      this.wordId = w
      this.fullUrl = this.sourceUrl.replace('DOC', doc).replace('SENTENCE', s).replace('WORD', w)
    }
  }

  get provider () {
    return new URL(this.fullUrl).origin
  }

  get hasTreebankData () {
    return this.version > 0
  }
}
