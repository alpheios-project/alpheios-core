import LanguageModel from './language_model.js'
import Feature from './feature.js'
import * as Constants from './constants.js'

const typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  GezLanguageModel is the lass for Ge'ez specific behavior
 */
export default class GeezLanguageModel extends LanguageModel {
  static get languageID () { return Constants.LANG_GEEZ }

  static get languageCode () { return Constants.STR_LANG_CODE_GEZ }

  static get languageCodes () { return [Constants.STR_LANG_CODE_GEZ] }

  static get contextForward () { return 0 }

  static get contextBackward () { return 0 }

  static get direction () { return Constants.LANG_DIR_LTR }

  static get baseUnit () { return Constants.LANG_UNIT_WORD }
  static get featureValues () {
    return new Map([
      ...LanguageModel.featureValues,
      [
        Feature.types.grmCase,
        [
          // TODO Valid Values for case for gez
        ]
      ],
      [
        Feature.types.number,
        [
          // TODO Valid Values for number for gez
        ]
      ],
      [
        Feature.types.gender,
        [
          // TODO Valid Values for gender for gez
        ]
      ],
      [
        Feature.types.mood,
        [
          // TODO Valid Values for mood for gez
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
for the current node
   *
   * @param node
   */
  static canInflect (node) {
    return false
  }

  /**
   * Returns alternate encodings for a word
   *
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
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return "፡፨።፣፤፥፦፧፠,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r\u200C\u200D"
  }
}
