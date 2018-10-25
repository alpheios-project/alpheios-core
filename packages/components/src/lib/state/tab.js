export default class Tab {
  constructor (tabId, windowId, status) {
    this.tabId = tabId
    this.windowId = windowId
    this.status = 'attached'
  }

  get uniqueId () {
    return this.constructor.createUniqueId(this.tabId, this.windowId)
  }

  get isDeattached () {
    return this.status === 'deattached'
  }

  deattach () {
    this.status = 'deattached'
  }

  attach (newWinId) {
    this.windowId = newWinId
    this.status = 'attached'
  }

  clone () {
    return new Tab(this.tabId, this.windowId)
  }

  compareWithTab (tabObj) {
    return this.tabId === tabObj.tabId && this.windowId === tabObj.windowId
  }

  static createUniqueId (tabId, windowId) {
    return Symbol.for(`Alpheios_tabId:${tabId.toString()},windowId:${windowId.toString()}`)
  }
}
