export default class TreebankDataItem {
  /**
   * Creates a treebank item. It can be created for either a specific text element (i.e. a selected word)
   * or for the document (a web page) that has treebank data.
   * If it is created for a text element, an 'elem' parameter will be provided and it will contain
   * a selected text element.
   * If a treebank item is created for a document (as when a web page with treebank data in it is loaded
   * but a specific word is not selected) an 'elem' parameter will be skipped. In that case constructor
   * will scan document in a search of any document ID and sentence ID that are required to be in a URL
   * to load a treebank diagram.
   *
   * @param {node} [elem=null] - An HTML node that contains a selected word (optional).
   */
  constructor (elem = null) {
    this.version = 0
    this.app = null
    this.sourceUrl = null
    this.wordIds = []
    this.sentenceId = null
    this.doc = null
    this.suppressTree = false
    /*
      Treebank data on a page must have an element with the following obligatory data attributes:
        data-alpheios_tb_app - the only app currently supported is 'perseids-treebank-template'
        data-alpheios_tb_app_version - a version of a data format (the latest version is 1);
        data-alpheios_tb_app_url - a schema of a treebank template URL;
        data-alpheios_tb_ref - a reference that will be used to load data into the iframe initially
      Example:
        data-alpheios_tb_app="perseids-treebank-template"
        data-alpheios_tb_app_version="1"
        data-alpheios_tb_app_url="https://alpheios-project.github.io/treebank-template/embed/DOC/SENTENCE?w=WORD"
        data-alpheios_tb_ref="on-the-murder-of-eratosthenes-1-50#1-1"

      HTML elements that are surrounding words must have a `data-alpheios_tb_ref` ref attribute.
      It will tie a word to its position in a tree.
      */
    const tbSrcElem = elem
      ? elem.closest('[data-alpheios_tb_app]')
      : document.querySelector('[data-alpheios_tb_app]')
    if (tbSrcElem) {
      this.app = tbSrcElem.dataset.alpheios_tb_app
      if (this.app !== 'perseids-treebank-template') {
        throw new Error('Unsupported treebank application. This version of Alpheios only supports the perseids-treebank-template viewer app.')
      }
      if (tbSrcElem.dataset.alpheios_tb_app_version) {
        this.version = Number.parseInt(tbSrcElem.dataset.alpheios_tb_app_version, 10)
        if (!Number.isInteger(this.version)) { throw new Error(`Treebank version is incorrect in: ${tbSrcElem.outerHTML}`) }
      }

      if (!tbSrcElem.dataset.alpheios_tb_app_url) { throw new Error(`Missing treebank source URL in: ${tbSrcElem.outerHTML}`) }
      this.sourceUrl = tbSrcElem.dataset.alpheios_tb_app_url

      if (tbSrcElem.dataset.alpheios_tb_morph_only) {
        // any value other than false activates this flag
        this.suppressTree = Boolean(tbSrcElem.dataset.alpheios_tb_morph_only !== 'false')
      }

      // We'll search for any element with the treebank tags if `elem` is not provided.
      const tbRefElem = elem ? elem.closest('[data-alpheios_tb_ref]') : document.querySelector('[data-alpheios_tb_ref]')
      // If TreebankDataItem is created for a page (i.e. `elem` is not provided) we need just a sentence ID, not word ID
      let wordElem = null
      let sentElem
      if (elem) {
        // TreebankDataItem is created for a text element
        wordElem = elem.closest('[data-alpheios_tb_word]')
        sentElem = wordElem ? wordElem.closest('[data-alpheios_tb_sent]') : elem.closest('[data-alpheios_tb_sent]')
      } else {
        // TreebankDataItem is created for a page, we don't need a word ID
        sentElem = document.querySelector('[data-alpheios_tb_sent]')
      }
      if (!tbRefElem && !(wordElem || sentElem)) {
        throw new Error('An element does not have data-alpheios_tb_ref, data-alpheios_tb_word or data-alpheios_tb_sent attributes')
      }

      /*
      If both `data-alpheios_tb_word` and `data-alpheios_tb_ref` data attributes are present, the former will
      have priority because it belongs to a newer tagging schema.
       */
      if (wordElem || sentElem) {
        /*
        Data is using `data-alpheios_tb_sent` and `data-alpheios_tb_word` attributes. There could be multiple
        word combinations specified there. In that case they will be separated by spaces:
        `data-alpheios_tb_word="3 4"`.
         */
        if (!sentElem) {
          throw new Error('Sentence ID is undefined: there is no parent element with data-alpheios_tb_sent attribute')
        }
        const docElem = wordElem ? wordElem.closest('[data-alpheios_tb_doc]') : sentElem.closest('[data-alpheios_tb_doc]')
        if (!docElem) {
          throw new Error('Document ID is undefined: there is no parent element with data-alpheios_tb_doc attribute')
        }
        if (wordElem) {
          this.wordIds = wordElem.dataset.alpheios_tb_word.split(' ')
        }
        this.sentenceId = sentElem.dataset.alpheios_tb_sent
        this.doc = docElem.dataset.alpheios_tb_doc
      } else {
        /*
        Data is using `data-alpheios_tb_ref` attributes. There could be multiple
        sentence and word combinations specified there. In that case they will be separated by spaces:
        `data-alpheios_tb_ref="phi0959.phi006.alpheios-text-lat1#2-13 phi0959.phi006.alpheios-text-lat1#2-14"`.
        We, however, do not support multiple references with different sentence ID. In that case the first
        reference will be used and others with sentence IDs not matching the first one will be ignored.
         */
        const reference = tbRefElem.dataset.alpheios_tb_ref
        let refs
        try {
          refs = reference.split(' ').map(ref => TreebankDataItem.parseReference(ref))
        } catch (err) {
          throw new Error(`${err.message} in: ${tbSrcElem.outerHTML}`)
        }
        refs = refs.filter(i => i.doc === refs[0].doc && i.sent === refs[0].sent)
        this.doc = refs[0].doc
        this.sentenceId = refs[0].sent
        this.wordIds = refs.map(i => i.word)
      }
    }

    if (!this.doc) { throw new Error('Document data is missing') }
    if (!this.sentenceId) { throw new Error('Sentence data is missing') }
  }

  static getTreebankData (elem = null) {
    try {
      return new TreebankDataItem(elem)
    } catch (err) {
      return null
    }
  }

  /**
   * Parse a reference in a "phi0959.phi006.alpheios-text-lat1#2-13" format to document, sentence ID, and word ID.
   *
   * @param {string} reference - A reference value to parse.
   * @returns {{doc: string, sent: string, word: string}} - An object containing parsed values.
   */
  static parseReference (reference) {
    const [doc, sentWordRef] = reference.split(/#/)
    if (!doc || !sentWordRef) { throw new Error('Invalid treebank reference') }
    const [sent, word] = sentWordRef.split(/-/)
    if (!sent) { throw new Error('Invalid treebank sent ID') }
    if (!word) { throw new Error('Invalid treebank word ID') }
    return { doc, sent, word }
  }

  setWordData (wordIds) {
    this.wordIds = wordIds
  }

  removeWordData () {
    this.wordIds = []
  }

  get fullUrl () {
    return this.sourceUrl.replace('DOC', this.doc).replace('SENTENCE', this.sentenceId)
  }

  get docUrl () {
    return this.sourceUrl.replace('DOC', this.doc)
  }

  get provider () {
    return new URL(this.fullUrl).origin
  }

  get hasWordData () {
    return this.wordIds.length > 0
  }

  get hasSentenceData () {
    return Boolean(this.sentenceId)
  }
}
