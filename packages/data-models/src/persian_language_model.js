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
    this.sourceLanguage = Constants.LANG_PERSIAN
    this.contextForward = 0
    this.contextBackward = 0
    this.direction = Constants.LANG_DIR_RTL
    this.baseUnit = Constants.LANG_UNIT_WORD
    this.languageCodes = [Constants.STR_LANG_CODE_PER, Constants.STR_LANG_CODE_FAR]
    this._initializeFeatures()
  }

  _initializeFeatures () {
    this.features = super._initializeFeatures()
  }

  toCode () {
    return Constants.STR_LANG_CODE_PER
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
