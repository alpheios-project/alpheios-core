import { Constants, LanguageModelFactory } from 'alpheios-data-models'

// TODO: Add language name to a language model?
const languageNames = new Map([
  [Constants.LANG_LATIN, 'Latin'],
  [Constants.LANG_GREEK, 'Greek'],
  [Constants.LANG_ARABIC, 'Arabic'],
  [Constants.LANG_PERSIAN, 'Persian']
])

const UNKNOWN_LANGUAGE_NAME = ''

// TODO: Shall we move it to data models?
export default class Language {
  /**
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   */
  constructor (language) {
    this.ID = Constants.LANG_UNDEFINED
    this.code = Constants.STR_LANG_CODE_UNDEFINED
    this.name = UNKNOWN_LANGUAGE_NAME
    this.model = undefined
    this.set(language)
  }

  /**
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   */
  set (language) {
    if (language) {
      this.ID = (typeof language === 'symbol') ? language : LanguageModelFactory.getLanguageIdFromCode(language)
      this.code = LanguageModelFactory.getLanguageCodeFromId(this.ID)
      this.name = languageNames.has(this.ID) ? languageNames.get(this.ID) : UNKNOWN_LANGUAGE_NAME
      this.model = LanguageModelFactory.getLanguageModel(this.ID)
    }
  }

  /**
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   */
  is (language) {
    if (language) {
      const languageID = (typeof language === 'symbol') ? language : LanguageModelFactory.getLanguageIdFromCode(language)
      return LanguageModelFactory.compareLanguages(this.ID, languageID)
    }
    return false
  }
}
