export default class Resource {
  constructor ({ id } = {}) {
    this.id = id
  }

  uploadRefs ({ refs, passage } = {}) {
    this.passage = passage
    this.refs = refs
  }
}
