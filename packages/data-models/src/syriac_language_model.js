import LanguageModel from './language_model.js'
import Feature from './feature.js'
import * as Constants from './constants.js'

let typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  GezLanguageModel is the lass for Ge'ez specific behavior
 */
export default class SyriacLanguageModel extends LanguageModel {
  static get languageID () { return Constants.LANG_SYRIAC }

  static get languageCode () { return Constants.STR_LANG_CODE_SYR }

  static get languageCodes () { return [Constants.STR_LANG_CODE_SYR, Constants.STR_LANG_CODE_SYC, Constants.STR_LANG_CODE_SYR_SYRJ] }

  static get contextForward () { return 0 }

  static get contextBackward () { return 0 }

  static get direction () { return Constants.LANG_DIR_LTR }

  static get baseUnit () { return Constants.LANG_UNIT_WORD }
  static get featureValues () {
    return new Map([
      ...LanguageModel.featureValues,
      [
        Feature.types.part,
        [
          Constants.POFS_ADVERB,
          Constants.POFS_ADVERBIAL,
          Constants.POFS_ADJECTIVE,
          Constants.POFS_ARTICLE,
          Constants.POFS_CONJUNCTION,
          Constants.POFS_EXCLAMATION,
          Constants.POFS_INTERJECTION,
          Constants.POFS_NOUN,
          Constants.POFS_NUMERAL,
          Constants.POFS_PARTICLE,
          Constants.POFS_PREFIX,
          Constants.POFS_PREPOSITION,
          Constants.POFS_PRONOUN,
          Constants.POFS_SUFFIX,
          Constants.POFS_SUPINE,
          Constants.POFS_VERB,
          Constants.POFS_VERB_PARTICIPLE,
          Constants.POFS_DENOMINATIVE
        ]
      ],
      [
        Feature.types.paradigm,
        [
          /** TODO list of kaylo and state values **/
        ]
      ]
    ])
  }

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
    return "፡፨።፣፤፥፦፧፠,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r\u200C\u200D"
  }
}
