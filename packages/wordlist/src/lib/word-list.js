export default class WordList {
  constructor () {
    this.items = []
  }

  push (wordItem) {
    if (!this.contains(wordItem)) {
      this.items.push(wordItem)
    }
  }
  
  contains (wordItem) {
    return this.items.map(item => item.targetWord).includes(wordItem.targetWord)
  }
}