export default class TreebankDataItem {
  constructor (elem) {
    this.version = 0
    this.app = null
    this.sourceUrl = null
    this.reference = null

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
    const tbSrcElem = elem.ownerDocument.querySelector('[data-alpheios_tb_app]')
    if (tbSrcElem) {
      this.app = tbSrcElem.dataset.alpheios_tb_app
      if (this.app !== 'perseids-treebank-template') {
        throw new Error('Unsupported treebank application. This version of Alpheios only supports the perseids-treebank-template viewer app.')
      }
      if (tbSrcElem.dataset.alpheios_tb_app_version) {
        this.version = Number.parseInt(tbSrcElem.dataset.alpheios_tb_app_version, 10)
        if (Number.isNaN(this.version)) { throw new Error(`Treebank version is incorrect in: ${tbSrcElem.outerHTML}`) }
      }

      if (!tbSrcElem.dataset.alpheios_tb_app_url) { throw new Error(`Missing treebank source URL in: ${tbSrcElem.outerHTML}`) }
      this.sourceUrl = tbSrcElem.dataset.alpheios_tb_app_url

      const tbRefElem = elem.closest('[data-alpheios_tb_ref]')
      if (!tbRefElem || !tbRefElem.dataset.alpheios_tb_ref) {
        throw new Error('Cannot find an element with the data-alpheios_tb_ref data attribute among the ancestors')
      }
      this.reference = tbRefElem.dataset.alpheios_tb_ref
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
    if (this.app && this.version > 0 && this.sourceUrl) {
      return true
    } else  {
      return false
    }

  }
}
