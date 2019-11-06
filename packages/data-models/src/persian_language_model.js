import LanguageModel from './language_model.js'
import * as Constants from './constants.js'

let typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  PersianLanguageModel is the lass for Persian specific behavior
 */
export default class PersianLanguageModel extends LanguageModel {
  static get languageID () { return Constants.LANG_PERSIAN }

  static get languageCode () { return Constants.STR_LANG_CODE_PER }

  static get languageCodes () { return [Constants.STR_LANG_CODE_PER, Constants.STR_LANG_CODE_FAS, Constants.STR_LANG_CODE_FA, Constants.STR_LANG_CODE_FA_IR] }

  static get contextForward () { return 0 }

  static get contextBackward () { return 0 }

  static get direction () { return Constants.LANG_DIR_RTL }

  static get baseUnit () { return Constants.LANG_UNIT_WORD }

  static get typeFeatures () {
    if (!typeFeaturesInitialized) { this.initTypeFeatures() }
    return typeFeatures
  }

  static initTypeFeatures () {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName))
    }
    typeFeaturesInitialized = true
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  static canInflect (node) {
    return false
  }

  /**
   * Returns alternate encodings for a word
   * @param {string} word the word
   * @param {string} preceding optional preceding word
   * @param {string} following optional following word
   * @param {string} encoding optional encoding name to filter the response to
   * @returns {Array} an array of alternate encodings
   */
  static alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
    // Not implemented yet
    return []
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r\u200C\u200D"
  }
}
