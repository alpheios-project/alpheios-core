export default class Resource {
  /**
   * @param {string} title
   * @param {string} id
   * @param {string} baseUrl - baseURL for DTS API
   * @param {string} description
   */
  constructor ({ title, id, baseUrl, description } = {}) {
    this.title = title
    this.id = id
    this.baseUrl = baseUrl
    this.description = description
  }

  /**
   *
   * @param {Array[String]} refs - a list of refs to passages
   * @param {string} passage - a url template for getting XML document
   */
  uploadRefs ({ refs, passage } = {}) {
    this.passage = passage
    this.refs = refs
  }

  /**
   * @returns {object} - data for creating link for next step retrieval (descendant)
   */
  get linkData () {
    return {
      baseUrl: this.baseUrl,
      title: this.title,
      id: this.id,
      description: this.description,
      type: 'resource',
      resource: this
    }
  }

  get refsLinks () {
    return this.refs.map(ref => {
      return {
        baseUrl: this.baseUrl,
        id: this.id,
        ref,
        type: 'document'
      }
    })
  }
}
