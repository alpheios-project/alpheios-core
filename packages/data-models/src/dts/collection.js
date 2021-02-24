import Resource from './resource.js'

export default class Collection {
  constructor ({ totalItems, title, id } = {}) {
    this.totalItems = totalItems
    this.title = title
    this.id = id
    this.members = []
    this.navigation = null
  }

  addMember (jsonObj) {
    if (jsonObj.type === 'Collection') {
      this.members.push(new Collection(jsonObj))
    }
    if (jsonObj.type === 'Resource') {
      this.navigation = new Resource(jsonObj)
    }
  }
}
