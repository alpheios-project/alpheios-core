import Resource from './resource.js'

export default class Collection {
  /**
   * Created from DTS API Json
   *
   * @param {number} totalItems - amount of items in a collection
   * @param {string} title
   * @param {string} id
   * @param {string} baseUrl - baseURL for DTS API
   * @param {string} description
   */
  constructor ({ totalItems, title, id, baseUrl, description, pagination } = {}) {
    this.totalItems = totalItems
    this.title = title
    this.id = id
    this.baseUrl = baseUrl
    this.description = description

    this.members = []
    this.resources = []

    if (pagination) {
      this.pagination = this.definePagination(pagination)
    }
  }

  /**
   * Adds level - membered collection or resource
   *
   * @param {JSON Object} jsonObj  - described in Collection/Resource constructors
   */
  addMember (jsonObj) {
    if (jsonObj.type === 'Collection') {
      this.members.push(new Collection(jsonObj))
    }
    if (jsonObj.type === 'Resource') {
      this.resources.push(new Resource(jsonObj))
    }
  }

  /**
   * @returns {string} - title with totalItems in brackets
   */
  get formattedTitle () {
    const totalItems = this.totalItems ? ` (${this.totalItems})` : ''
    return `${this.title}${totalItems}`
  }

  /**
   * @returns {object} - data for creating link for next step retrieval (descendant)
   */
  get linkData () {
    return {
      baseUrl: this.baseUrl,
      totalItems: this.totalItems,
      formattedTitle: this.formattedTitle,
      title: this.title,
      id: this.id,
      type: 'collection'
    }
  }

  /**
   * @returns {Array[Object]} - array of links from membered collections
   */
  get membersLinks () {
    return this.members.map(memberCollection => memberCollection.linkData)
  }

  /**
   * @returns {Array[Object]} - array of links from membered resources
   */
  get resourcesLinks () {
    return this.resources.map(resource => resource.linkData)
  }

  /**
   * @returns {Array[Object]} - array of links - collections or resources
   */
  get links () {
    if (this.members.length > 0) {
      return this.membersLinks
    } else if (this.resources.length > 0) {
      return this.resourcesLinks
    }
    return []
  }

  extractPageNum (link) {
    if (link) {
      const pageData = link.match(/page=(\d+)$/)
      return pageData ? parseInt(pageData[1]) : null
    }
    return null
  }

  definePagination (pagination) {
    const pagintaionFinal = {
      first: this.extractPageNum(pagination.first),
      next: this.extractPageNum(pagination.next),
      last: this.extractPageNum(pagination.last),
      previous: this.extractPageNum(pagination.previous)
    }

    pagintaionFinal.current = pagintaionFinal.next ? pagintaionFinal.next - 1 : (pagintaionFinal.previous ? pagintaionFinal.previous + 1 : 1)
    return pagintaionFinal
  }
}
