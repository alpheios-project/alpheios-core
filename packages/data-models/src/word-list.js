import WordItem from './word-item'

export default class WordList {
  /**
   * @class
   * @param {string} languageCode the language code of the list
   * @param {WordItem[]} worditems an optional array of WordItems with which to initialize the list
   */
  constructor (languageCode, worditems = []) {
    if (!languageCode) {
      throw new Error('Unable to construct a wordlist without a languagecode')
    }
    this.languageCode = languageCode
    this.items = {}
    worditems.forEach(item => {
      this.addWordItem(item)
    })
  }

  get size () {
    return Object.keys(this.items).length
  }

  /**
   * get the items of the list
   */
  get values () {
    return Object.values(this.items)
  }

  /**
   * checks to see if the list is empty
   *
   * @returns {boolean}
   */
  get isEmpty () {
    return Object.values(this.items).length === 0
  }

  addWordItem (item) {
    if (item.languageCode !== this.languageCode) {
      throw new Error(`Language Code mismatch ${item.languageCode} !=== ${this.languageCode}`)
    }
    const existingItem = this.getWordItem(item.targetWord, false)
    if (existingItem) {
      item.merge(existingItem)
    }
    const key = this._makeItemKey(this.languageCode, item.targetWord)
    this.items[key] = item
  }

  /**
   * delete an individual word item from the list
   *
   * @param {string} targetWord the word to delete
   * @returns {WordItem} the deleted item
   */
  deleteWordItem (targetWord) {
    const key = this._makeItemKey(this.languageCode, targetWord)
    const toDelete = this.items[key]
    if (toDelete) {
      delete this.items[key]
    }
    return toDelete
  }

  /**
   * delete all items from a list
   */
  removeAllWordItems () {
    this.items = {}
  }

  /**
   * get an item from a list
   *
   * @param targetWord the word to get
   * @param {boolean} create true to create the item if it doesn't exist
   * @param eventWordItemUpdated
   * @returns {WordItem} the retrieved item
   */
  getWordItem (targetWord, create = true, eventWordItemUpdated = null) {
    const key = this._makeItemKey(this.languageCode, targetWord)
    if (create && !this.items[key]) {
      const wordItem = new WordItem({ targetWord: targetWord, languageCode: this.languageCode })
      if (eventWordItemUpdated) {
        eventWordItemUpdated.pub({ dataObj: wordItem, params: { segment: 'common' } })
      }
      this.items[key] = wordItem
    }
    return this.items[key]
  }

  /**
   * make a key for a word item
   *
   * @param {string} languageCode
   * @param {string} targetWord
   */
  _makeItemKey (languageCode, targetWord) {
    return `${languageCode}:${targetWord.toLowerCase()}`
  }
}
