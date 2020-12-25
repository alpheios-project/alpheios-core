import Language from './language.js'
import LanguageModel from './language_model.js'
import LatinLanguageModel from './latin_language_model.js'
import GreekLanguageModel from './greek_language_model.js'
import ArabicLanguageModel from './arabic_language_model.js'
import PersianLanguageModel from './persian_language_model.js'
import GeezLanguageModel from './geez_language_model.js'
import ChineseLanguageModel from './chinese_language_model.js'
import SyriacLanguageModel from './syriac_language_model.js'
import * as Constants from './constants.js'

const MODELS = new Map([
  [Constants.STR_LANG_CODE_LA, LatinLanguageModel],
  [Constants.STR_LANG_CODE_LAT, LatinLanguageModel],
  [Constants.STR_LANG_CODE_GRC, GreekLanguageModel],
  [Constants.STR_LANG_CODE_ARA, ArabicLanguageModel],
  [Constants.STR_LANG_CODE_AR, ArabicLanguageModel],
  [Constants.STR_LANG_CODE_PER, PersianLanguageModel],
  [Constants.STR_LANG_CODE_GEZ, GeezLanguageModel],
  [Constants.STR_LANG_CODE_ZHO, ChineseLanguageModel],
  [Constants.STR_LANG_CODE_SYR, SyriacLanguageModel],
  [Constants.STR_LANG_CODE_SYC, SyriacLanguageModel],
  [Constants.STR_LANG_CODE_SYR_SYRJ, SyriacLanguageModel]
])

class LanguageModelFactory {
  /**
   * Checks whether a language is supported
   *
   * @param {Language | string | symbol} language - Language as a Language object,
   *        language ID (a symbol) or a language code (a string).
   * @returns {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage (language) {
    let langCode
    if (language instanceof Language) {
      langCode = language.toCode()
    } else if (typeof language === 'symbol') {
      // language is in a language ID format
      langCode = LanguageModelFactory.getLanguageCodeFromId(language)
    } else {
      // language contains the language code
      langCode = language
    }
    return MODELS.has(langCode)
  }

  static availableLanguages () {
    let avail = new Set() // eslint-disable-line prefer-const
    for (const model of MODELS.values()) {
      avail.add(model.languageCode)
    }
    return Array.from(avail)
  }

  /**
   * Returns a constructor of language model for a specific language ID.
   *
   * @param {symbol} languageID - A language ID of a desired language model.
   * @returns {LanguageModel} A language model for a given language ID.
   */
  static getLanguageModel (languageID) {
    const languageCode = LanguageModelFactory.getLanguageCodeFromId(languageID)
    return LanguageModelFactory.getLanguageModelFromCode(languageCode)
  }

  static getLanguageModelFromCode (languageCode) {
    if (MODELS.has(languageCode)) {
      return MODELS.get(languageCode)
    } else {
      // A default value
      return LanguageModel
    }
  }

  /**
   * Returns a language model for a specified language.
   *
   * @param {Language} language - A language for which a language model shall be returned.
   * @returns {LanguageModel} - A language model matching the language provided.
   */
  static getModelFromLanguage (language) {
    for (const languageModel of MODELS.values()) {
      if (language.equals(languageModel.language)) {
        return languageModel
      }
    }
    // A default value
    return LanguageModel
  }

  static getLanguageForCode (code = null) {
    const Model = MODELS.get(code)
    if (Model) {
      return new Model()
    }
    // for now return a default Model
    // TODO may want to throw an error
    return new LanguageModel()
  }

  /**
   * Converts an ISO 639-3 language code to a language ID
   *
   * @param {string} languageCode - An ISO 639-3 language code
   * @returns {symbol | undefined} A language ID or undefined if language ID is not found
   */
  static getLanguageIdFromCode (languageCode) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.hasCode(languageCode)) {
        return languageModel.languageID
      }
    }
    // Noting found, return a Symbol with an undefined value (to keep return value type the same)
    return Constants.LANG_UNDEFINED
  }

  /**
   * Converts a language ID to an default ISO 639-3 language code for that language
   *
   * @param {symbol} languageID - A language ID
   * @returns {string | undefined} An ISO 639-3 language code or undefined if language code is not found
   */
  static getLanguageCodeFromId (languageID) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.languageID.toString() === languageID.toString()) {
        return languageModel.languageCode
      }
    }
    // Noting found, return a string with an undefined value (to keep return value type the same)
    return Constants.STR_LANG_CODE_UNDEFINED
  }

  /**
   * Returns a language ID and a language code values that matches the Language object.
   * This method is used for compatibility in places where either the legacy language ID or
   * the language code are required.
   * TODO: This method shall be removed once all components would switch to the Language object.
   *
   * @param {Language} language - A Language object.
   * @returns {{languageID: symbol, languageCode: string}} - An object containing
   *          both the language ID and the language code.
   */
  static getLegacyLanguageCodeAndId (language) {
    const languageModel = this.getModelFromLanguage(language)
    return {
      languageID: languageModel.languageID,
      languageCode: languageModel.languageCode
    }
  }

  /**
   * Takes either a language ID or a language code and returns an object with both an ID and a code.
   *
   * @param {symbol | string} language - Language in one of the following formats:
   *        the language ID (a Symbol) or the language code (a String).
   *
   * @returns {object} An object with the following properties:
   *    {symbol} languageID
   *    {string} languageCode
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
   *
   * @param {string | symbol} languageA - Either a language ID (a symbol) or a language code (a string).
   * @param {string | symbol} languageB - Either a language ID (a symbol) or a language code (a string).
   * @returns {boolean} True if languages are the same, false otherwise.
   */
  static compareLanguages (languageA, languageB) {
    languageA = (typeof languageA === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageA) : languageA
    languageB = (typeof languageB === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageB) : languageB
    return languageA === languageB
  }

  /**
   * returns true if support for the requested language id is in an experimental state
   *
   * @param {symbol} languageID - Language as a language ID (symbol)
   * @returns {boolean}
   */
  static isExperimentalLanguage (languageID) {
    return [Constants.LANG_GEEZ, Constants.LANG_SYRIAC, Constants.LANG_CHINESE].includes(languageID)
  }
}
export default LanguageModelFactory
