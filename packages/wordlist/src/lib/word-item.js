import uuidv4 from 'uuid/v4'

export default class WordItem {
  constructor (homonym) {
    this.targetWord = homonym.targetWord
    this.languageID = homonym.languageID
    this.homonym = homonym
    this.important = false
    this.ID = uuidv4()
  }

  makeImportant () {
    this.important = true
  }

  removeImportant () {
    this.important = false
  }
}