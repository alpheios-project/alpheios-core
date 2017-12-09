import LanguageModel from './language_model.js'
import * as Constants from './constants.js'

/**
 * @class  PersianLanguageModel is the lass for Persian specific behavior
 */
class PersianLanguageModel extends LanguageModel {
   /**
   * @constructor
   */
  constructor () {
    super()
    this.sourceLanguage = PersianLanguageModel.sourceLanguage
    this.contextForward = 0
    this.contextBackward = 0
    this.direction = Constants.LANG_DIR_RTL
    this.baseUnit = Constants.LANG_UNIT_WORD
    this.languageCodes = PersianLanguageModel.codes
    this._initializeFeatures()
  }

  _initializeFeatures () {
    this.features = super._initializeFeatures()
  }

  static get sourceLanguage () {
    return Constants.LANG_PERSIAN
  }

  static get codes () {
    return [Constants.STR_LANG_CODE_PER, Constants.STR_LANG_CODE_FAR]
  }

  // For compatibility with existing code, can be replaced with a static version
  toCode () {
    return PersianLanguageModel.toCode()
  }

  static toCode () {
    return Constants.STR_LANG_CODE_PER
  }

  /**
   * Checks wither a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @return {boolean} Wither this language code exists in a language code list
   */
  static hasCode (languageCode) {
    return LanguageModel.hasCodeInList(languageCode, PersianLanguageModel.codes)
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return false
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }
}
export default PersianLanguageModel
