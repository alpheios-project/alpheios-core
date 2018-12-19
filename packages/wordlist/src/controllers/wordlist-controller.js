import { PsEvent } from 'alpheios-data-models'
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
  }

  onHomonymReady (homonym) {
    this.updateWordList(homonym)
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
  }
}

WordlistController.evt = {
  /**
   * Published when a new LexicalQuery data processing is complete.
   * Data: {
   *  {symbol} resultStatus - A lexical query result status,
      {Homonym} homonym - A homonym data
   * }
   */
  WORDLIST_UPDATED: new PsEvent('Wordlist updated', WordlistController)
}
