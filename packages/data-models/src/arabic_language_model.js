import LanguageModel from './language_model.js'
import * as Constants from './constants.js'

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class ArabicLanguageModel extends LanguageModel {
   /**
   * @constructor
   */
  constructor () {
    super()
    this.sourceLanguage = Constants.LANG_ARABIC
    this.contextForward = 0
    this.contextBackward = 0
    this.direction = Constants.LANG_DIR_RTL
    this.baseUnit = Constants.LANG_UNIT_WORD
    this.languageCodes = [Constants.STR_LANG_CODE_ARA, Constants.STR_LANG_CODE_AR]
    this._initializeFeatures()
  }

  _initializeFeatures () {
    this.features = super._initializeFeatures()
  }

  toCode () {
    return Constants.STR_LANG_CODE_ARA
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return false
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (word) {
    // TODO
    return word
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }
}
export default ArabicLanguageModel
