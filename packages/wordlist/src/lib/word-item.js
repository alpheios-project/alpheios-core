import uuidv4 from 'uuid/v4'
import { Homonym, TextQuoteSelector, LanguageModelFactory as LMF } from 'alpheios-data-models'
import WordlistController from '@/controllers/wordlist-controller';

export default class WordItem {
  constructor (data) {
    this.targetWord = data.targetWord
    this.languageCode = data.languageCode
    this.userID = data.userID

    this.textQuoteSelectors = data.textQuoteSelector ? [ data.textQuoteSelector ] : []
    this.homonym = data.homonym ? data.homonym : {}
    this.important = data.important || false
    this.currentSession = data.currentSession || false
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

  uploadTextQuoteSelectors (jsonObjs) {
    for (let jsonObj of jsonObjs) {
      let tq = TextQuoteSelector.readObject(jsonObj)
      this.textQuoteSelectors.push(tq)
    }
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
    let result = []
    let index = 0
    for (let tq of this.textQuoteSelectors) {
      index++
      let resultItem = {
        ID: this.storageID + '-' + index,
        listID: this.listID,
        userID: this.userID,
        languageCode: this.languageCode,
        targetWord: this.targetWord,
        wordItemID: this.storageID,
        
        target: {
          source: tq.source,
          selector: {
            type: 'TextQuoteSelector',
            exact: tq.text,
            prefix: tq.prefix,
            suffix: tq.suffix,
            contextHTML: tq.contextHTML,
            languageCode: tq.languageCode
          }
        },
        createdDT: WordItem.currentDate
      }
      result.push(resultItem)
    }
    return result
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

  emptyProp (propName) {
    return !this[propName] || (typeof this[propName] === 'object' && Object.keys(this[propName]).length === 0)
  }

  hasThisTextQuoteSelector (tq) {
    return this.textQuoteSelectors.filter(tqCurrent => tqCurrent.prefix === tq.prefix && tqCurrent.suffix === tq.suffix && tqCurrent.source === tq.source).length > 0
  }

  mergeTextQuoteSelectors (prevWordItem) {
    for (let tq of prevWordItem.textQuoteSelectors) {
      if (!this.hasThisTextQuoteSelector(tq)) {
        this.textQuoteSelectors.push(tq)
      }
    }
  }

  merge (prevWordItem) {
    let checkProps = ['homonym', 'important', 'currentSession']
    for(let prop of checkProps) {
      if (this.emptyProp(prop) && !prevWordItem.emptyProp(prop)) {
        this[prop] = prevWordItem[prop]
      }
    }

    this.mergeTextQuoteSelectors(prevWordItem)
  }
}