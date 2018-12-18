export default class WordList {
  constructor (userID, languageID) {
    this.userID = userID
    this.languageID = languageID
    this.items = []
  }

  push (wordItem) {
    if (this.languageID === wordItem.languageID && !this.contains(wordItem)) {
      this.items.push(wordItem)
    }
  }

  contains (wordItem) {
    return this.items.map(item => item.targetWord).includes(wordItem.targetWord)
  }

  makeAllImportant () {
    this.items.forEach(wordItem => {
      wordItem.makeImportant()
    })
  }

  removeAllImportant () {
    this.items.forEach(wordItem => {
      wordItem.removeImportant()
    })
  }
}