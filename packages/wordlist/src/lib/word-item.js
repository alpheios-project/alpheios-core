import uuidv4 from 'uuid/v4'
import { Homonym, LanguageModelFactory as LMF } from 'alpheios-data-models'
import WordlistController from '../controllers/wordlist-controller';

export default class WordItem {
  constructor (data) {
    this.targetWord = data.targetWord
    this.languageCode = data.languageCode
    this.important = data.important || false
    this.currentSession = data.currentSession || false
    this.userID = data.userID

    this.textQuoteSelector = data.textQuoteSelector ? data.textQuoteSelector : {}
    this.homonym = data.homonym ? data.homonym : {}
  }

  get storageID () {
    return this.userID + '-' + this.languageCode + '-' + this.targetWord
  }

  get listID () {
    return this.userID + '-' + this.languageCode
  }

  makeImportant () {
    this.important = true
  }

  removeImportant () {
    this.important = false
  }

  get lemmasList () {
    if (this.homonym && this.homonym.lexemes) {
      return this.homonym.lexemes.map(lexeme => lexeme.lemma.word).filter( (value, index, self) => { 
        return self.indexOf(value) === index
      }).join(', ')
    }
    return ''
  }
  
  uploadHomonym (jsonObj) {
    let homonym = Homonym.readObject(jsonObj.homonym)
    this.homonym = homonym
  }

  selectWordItem () {
    WordlistController.evt.WORDITEM_SELECTED.pub(this.homonym)
  }

  static get currentDate () {
    let dt = new Date()
    return dt.getFullYear() + '/'
        + ((dt.getMonth()+1) < 10 ? '0' : '') + (dt.getMonth()+1)  + '/'
        + ((dt.getDate() < 10) ? '0' : '') + dt.getDate() + ' @ '
                + ((dt.getHours() < 10) ? '0' : '') + dt.getHours() + ":"  
                + ((dt.getMinutes() < 10) ? '0' : '') + dt.getMinutes() + ":" 
                + ((dt.getSeconds() < 10) ? '0' : '') + dt.getSeconds()

  }

  convertCommonToStorage () {
    return {
      ID: this.storageID,
      listID: this.listID,
      userID: this.userID,
      languageCode: this.languageCode,
      targetWord: this.targetWord,
      important: this.important,
      createdDT: WordItem.currentDate
    }
  }

  convertTQSelectorToStorage () {
    return {
      ID: this.storageID,
      listID: this.listID,
      userID: this.userID,
      languageCode: this.languageCode,
      targetWord: this.targetWord,
      
      target: {
        source: window.location.href,
        selector: {
          type: 'TextQuoteSelector',
          exact: this.textQuoteSelector.text,
          prefix: this.textQuoteSelector.prefix,
          suffix: this.textQuoteSelector.suffix,
          contextHTML: this.textQuoteSelector.contextHTML
        }
      },
      createdDT: WordItem.currentDate
    }
  }

  convertHomonymToStorage (addMeaning = false) {
    let resultHomonym = this.homonym.convertToJSONObject(addMeaning)
    return {
      ID: this.storageID,
      listID: this.listID,
      userID: this.userID,
      languageCode: this.languageCode,
      targetWord: this.targetWord,

      homonym: resultHomonym
    }
  }
  convertShortHomonymToStorage () {
    return this.convertHomonymToStorage(false)
  }

  convertFullHomonymToStorage () {
    return this.convertHomonymToStorage(true)
  }
}