import { PsEvent, LanguageModelFactory as LMF } from 'alpheios-data-models'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import WordList from '@/lib/word-list';
import WordItem from '@/lib/word-item';

export default class WordlistController {
  constructor (userID) {
    this.userID = userID
    this.wordLists = {}
  }

  createWordList (languageID) {
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    this.wordLists[languageCode] = new WordList(this.userID, languageID)
    console.info('****************createWordList this.wordLists', this.wordLists)
  }

  updateWordList(homonym) {
    let languageID = homonym.languageID
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    if (!Object.keys(this.wordLists).includes(languageCode)) {
      this.createWordList(languageID)
    }
    
    this.wordLists[languageCode].push(new WordItem(homonym))
    console.info('****************updateWordList this.wordLists', this.wordLists)
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
