import uuidv4 from 'uuid/v4'
import { Homonym, LanguageModelFactory as LMF } from 'alpheios-data-models'
import WordlistController from '../controllers/wordlist-controller';

export default class WordItem {
  constructor (data) {
    this.targetWord = data.homonym.targetWord
    this.languageID = data.homonym.languageID
    this.languageCode = LMF.getLanguageCodeFromId(data.homonym.languageID)
    this.homonym = data.homonym
    this.important = data.important || false
    this.currentSession = data.currentSession || false
    this.textQuoteSelector = data.textSelector ? data.textSelector.textQuoteSelector : {}
    this.ID = uuidv4()
  }

  makeImportant () {
    this.important = true
  }

  removeImportant () {
    this.important = false
  }

  get lemmasList () {
    return this.homonym.lexemes.map(lexeme => lexeme.lemma.word).filter( (value, index, self) => { 
      return self.indexOf(value) === index
    }).join(', ')
  }

  static uploadFromJSON (jsonObj) {
    let homonym = Homonym.readObject(jsonObj.homonym)
    return new WordItem(homonym)
  }

  /**
   * This method converts wordItem to be as jsonObject
   * it uses convertToJSON methods for each piece of the data - I will refractor all of them into Homonym methods later
   */
  convertToStorage () {
    // TODO Merging or create a separate structures
    let resultItem = { lexemes: [] }
    for (let lexeme of this.homonym.lexemes) {
      let resInflections = []
      lexeme.inflections.forEach(inflection => { resInflections.push(inflection.convertToJSONObject()) })
      
      let resMeaning = lexeme.meaning.convertToJSONObject()
      let resultLexeme = { 
        lemma: lexeme.lemma.convertToJSONObject(), 
        inflections: resInflections,
        meaning: resMeaning
      }

      resultItem.lexemes.push(resultLexeme)
    }
    resultItem.targetWord = this.targetWord
    return {
      targetWord: this.targetWord,
      languageCode: this.languageCode,
      target: {
        targetWord: this.targetWord,
        source: window.location.href,
        selector: {
          type: 'TextQuoteSelector',
          exact: this.textQuoteSelector.text,
          prefix: this.textQuoteSelector.prefix,
          suffix: this.textQuoteSelector.suffix,
          contextHTML: this.textQuoteSelector.contextHTML
        }
      },
      body: {
        dt: WordItem.currentDate,
        homonym: resultItem,
        important: this.important
      }
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
}