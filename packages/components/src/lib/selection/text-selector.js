import TextQuoteSelector from './w3c/text-quote-selector'
import ContentOptions from '../options/content-options'
import {LanguageModelFactory} from 'alpheios-data-models'
/**
 * This is a general-purpose, media abstract selector that
 * @property {string} selectedText - Selected text (usually a single word)
 * @property {string] normalizedSelectedText - Selected text after normalization
 * @property {string} languageCode - A language code of a selection
 * @property {LanguageModel} language - A language model object
 */
export default class TextSelector {
  constructor () {
    this.text = '' // Calculated?
    this.languageCode = ''
    this.languageID = undefined
    this.model = undefined
    // this.language = undefined

    this.start = 0
    this.end = 0
    this.context = null
    this.position = 0
  }

  // language
  // selectedText
  // selection fragment Fragments
  // {[selection, language]}
  // languages -> [language]
  // fragmentsForLanguage()
  // isMultilingual
  // textLanguage or fragmentLanguages
  // selectedText or selectedFragments

  // language or languages
  // selectedText or selectedFragments
  //

  // Support language per word in selectedText. Keep character index?
  // What if same word is there twice?
  // Maybe words with corresponding languages? [word, boundaries, language]. Selected text consists of words.

  // textLanguage  - fragmentsLanguages
  // text - fragments
  // textLanguage
  // fragments[i].language
  // languages
  // languageCodes

  static readObject (jsonObject) {
    let textSelector = new TextSelector()
    textSelector.text = jsonObject.text
    textSelector.languageCode = jsonObject.languageCode
    // textSelector.language = TextSelector.getLanguage(textSelector.languageCode)
    return textSelector
  }

  static createObjectFromText (text) {
    let textSelector = new TextSelector()
    textSelector.text = text

    let options = new ContentOptions()
    textSelector.languageCode = options.items.preferredLanguage.currentValue
    textSelector.languageID = LanguageModelFactory.getLanguageIdFromCode(textSelector.languageCode)
    textSelector.model = LanguageModelFactory.getLanguageModel(textSelector.languageID)
    return textSelector
  }

  isEmpty () {
    return this.text === ''
  }

  get normalizedText () {
    return this.model.normalizeWord(this.text)
  }

  /**
   * Returns a language of a selection target. If language cannot be determined, defaultLanguageCode will be used instead.
   * @param {string} languageCode - A default language code that will be used if language cannot be determined.
   * @return {LanguageModel} Language model of a selection's language
   */
  /* static getLanguage (languageCode) {
    return Models.LanguageModelFactory.getLanguageForCode(languageCode)
  } */

  get textQuoteSelector () {
    return new TextQuoteSelector()
  }
}
