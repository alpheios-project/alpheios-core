import { LanguageModelFactory, TextQuoteSelector } from 'alpheios-data-models'

/**
 * This is a general-purpose, media abstract selector.
 * @property {string} selectedText - Selected text (usually a single word)
 * @property {string} normalizedSelectedText - Selected text after normalization
 * @property {string} languageID - A language ID of a selection
 * @property {LanguageModel} language - A language model object
 */
export default class TextSelector {
  /**
   * @param {symbol} languageID - A language ID of a selector
   */
  constructor (languageID) {
    this.text = '' // Calculated?
    this.languageID = languageID || null
    this.model = undefined
    this.location = ''
    this.data = {}
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
    let textSelector = new TextSelector(LanguageModelFactory.getLanguageIdFromCode(jsonObject.languageCode)) // eslint-disable-line prefer-const
    textSelector.text = jsonObject.text
    // textSelector.language = TextSelector.getLanguage(textSelector.languageCode)
    return textSelector
  }

  static createObjectFromText (text, languageID) {
    let textSelector = new TextSelector(languageID) // eslint-disable-line prefer-const
    textSelector.text = text

    textSelector.model = LanguageModelFactory.getLanguageModel(textSelector.languageID)
    return textSelector
  }

  get languageCode () {
    return (this.languageID) ? LanguageModelFactory.getLanguageCodeFromId(this.languageID) : ''
  }

  isEmpty () {
    return this.text === ''
  }

  get normalizedText () {
    return this.model.normalizeWord(this.text)
  }

  createTextQuoteSelector (prefix, suffix) {
    this.textQuoteSelector = new TextQuoteSelector(this.languageCode, this.normalizedText, prefix, suffix, window.location.href)
  }
}
