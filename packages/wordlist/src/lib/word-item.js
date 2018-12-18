export default class WordItem {
  constructor (homonym) {
    this.targetWord = homonym.targetWord
    this.languageID = homonym.languageID
    this.homonym = homonym
    this.important = false
  }

  makeImportant () {
    this.important = true
  }

  removeImportant () {
    this.important = false
  }
}