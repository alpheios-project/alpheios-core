export default class TreebankDataItem {
  constructor (elem) {
    const tbSrcElem = elem.ownerDocument.querySelector('[data-alpheios_tb_src]')
    if (!tbSrcElem) {
      throw new Error('No treebank source url defined in the document')
    }
    this.version = tbSrcElem.dataset.alpheios_tb_version ? parseInt(tbSrcElem.dataset.alpheios_tb_version) : null
    if (!elem.dataset.alpheios_tb_ref) {
      throw new Error(`Missing treebank reference ${elem.dataset.alpheios_tb_ref}`)
    }
    const [doc, ref] = elem.dataset.alpheios_tb_ref.split(/#/)
    if (!doc || !ref) {
      throw new Error(`Invalid treebank reference ${elem.dataset.alpheios_tb_ref}`)
    }
    const [s, w] = ref.split(/-/)
    this.doc = doc
    this.sentenceId = s
    this.wordId = w
    this.fullUrl = tbSrcElem.dataset.alpheios_tb_src.replace('DOC', doc).replace('SENTENCE', s).replace('WORD', w)
  }

  get provider () {
    return new URL(this.fullUrl).origin
  }
}
