import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import WordList from '@/lib/word-list';
import WordItem from '@/lib/word-item';

export default class WordlistController {
  constructor (userID) {
    this.userID = userID
    this.wordLists = new Map()
  }

  createWordList (languageID) {
    this.wordLists.set(languageID, new WordList(this.userID, languageID))
  }

  updateWordList(homonym) {
    let languageID = homonym.languageID
    if (!this.wordLists.has(languageID)) {
      this.createWordList(languageID)
    }
    
    this.wordLists.get(languageID).push(new WordItem(homonym))

    console.info('*******************this.wordLists', this.wordLists)
  }

  onHomonymReady (homonym) {
    this.updateWordList(homonym)
  }
}
