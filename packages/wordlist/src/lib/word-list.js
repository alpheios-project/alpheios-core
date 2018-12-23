export default class WordList {
  constructor (userID, languageID) {
    this.userID = userID
    this.languageID = languageID
    this.items = {}
  }

  get values () {
    return Object.values(this.items)
  }

  push (wordItem) {
    console.info('************this.items1', this.items)
    console.info('************this.items2', this.languageID, wordItem.languageID)
    console.info('************this.items3', this.contains(wordItem), this.contains(wordItem))
    if (this.languageID === wordItem.languageID && !this.contains(wordItem)) {
      console.info('************this.items4 inside')
      this.items[wordItem.ID] = wordItem
    }
    console.info('************this.items5', this.items[wordItem.ID])
  }

  contains (wordItem) {
    return this.values.map(item => item.targetWord).includes(wordItem.targetWord)
  }

  makeAllImportant () {
    this.values.forEach(wordItem => {
      wordItem.makeImportant()
    })
  }

  removeAllImportant () {
    this.values.forEach(wordItem => {
      wordItem.removeImportant()
    })
  }

  getWordItemByID (languageID, ID) {
    return this.items[ID]
  }
}