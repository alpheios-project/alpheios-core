import LanguageModel from './language_model.js'
import LatinLanguageModel from './latin_language_model.js'
import GreekLanguageModel from './greek_language_model.js'
import ArabicLanguageModel from './arabic_language_model.js'
import PersianLanguageModel from './persian_language_model.js'
import * as Constants from './constants.js'

const MODELS = new Map([
  [ Constants.STR_LANG_CODE_LA, LatinLanguageModel ],
  [ Constants.STR_LANG_CODE_LAT, LatinLanguageModel ],
  [ Constants.STR_LANG_CODE_GRC, GreekLanguageModel ],
  [ Constants.STR_LANG_CODE_ARA, ArabicLanguageModel ],
  [ Constants.STR_LANG_CODE_AR, ArabicLanguageModel ],
  [ Constants.STR_LANG_CODE_PER, PersianLanguageModel ]
])

class LanguageModelFactory {
  /**
   * Checks whether a language is supported
   * @param {String | Symbol} language - Language as a language ID (Symbol) or a language code (String)
   * @return {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage (language) {
    language = (typeof language === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(language) : language
    return MODELS.has(language)
  }

  static getLanguageForCode (code = null) {
    let Model = MODELS.get(code)
    if (Model) {
      return new Model()
    }
    // for now return a default Model
    // TODO may want to throw an error
    return new LanguageModel()
  }

  /**
   * Converts an ISO 639-3 language code to a language ID
   * @param {String} languageCode - An ISO 639-3 language code
   * @return {Symbol | undefined} A language ID or undefined if language ID is not found
   */
  static getLanguageIdFromCode (languageCode) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.hasCode(languageCode)) {
        return languageModel.sourceLanguage
      }
    }
  }

  /**
   * Converts a language ID to an default ISO 639-3 language code for that language
   * @param {Symbol} languageID - A language ID
   * @return {String | undefined} An ISO 639-3 language code or undefined if language code is not found
   */
  static getLanguageCodeFromId (languageID) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.sourceLanguage === languageID) {
        return languageModel.toCode()
      }
    }
  }

  /**
   * Takes either a language ID or a language code and returns an object with both an ID and a code.
   * @param {String | Symbol} language - Either a language ID (a Symbol) or a language code (a String).
   * @return {Object} An object with the following properties:
   *    {Symbol} languageID
   *    {String} languageCode
   */
  static getLanguageAttrs (language) {
    if (typeof language === 'symbol') {
      // `language` is a language ID
      return {
        languageID: language,
        languageCode: LanguageModelFactory.getLanguageCodeFromId(language)
      }
    } else {
      // `language` is a language code
      return {
        languageID: LanguageModelFactory.getLanguageIdFromCode(language),
        languageCode: language
      }
    }
  }

  /**
   * Compares two languages in either a language ID or a language code format. For this, does conversion of
   * language IDs to language code. Because fo this, it will work even for language IDs defined in
   * different modules
   * @param {String | Symbol} languageA - Either a language ID (a Symbol) or a language code (a String).
   * @param {String | Symbol} languageB - Either a language ID (a Symbol) or a language code (a String).
   * @return {boolean} True if languages are the same, false otherwise.
   */
  static compareLanguages (languageA, languageB) {
    languageA = (typeof languageA === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageA) : languageA
    languageB = (typeof languageB === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageB) : languageB
    return languageA === languageB
  }
}
export default LanguageModelFactory
