import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import WordList from '@/lib/word-list';
import WordItem from '@/lib/word-item';

export default class WordlistController {
  constructor () {
    this.wordList = new WordList()
  }

  updateWordList(homonym) {
    this.wordList.push(new WordItem(homonym))
    
    console.info('******************this.wordList', this.wordList)
  }
}