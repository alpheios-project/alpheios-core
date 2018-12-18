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
    if (this.languageID === wordItem.languageID && !this.contains(wordItem)) {
      this.items[wordItem.ID] = wordItem
    }
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
}