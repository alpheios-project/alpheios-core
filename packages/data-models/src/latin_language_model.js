import LanguageModel from './language_model.js'
import Feature from './feature.js'
import FeatureType from './feature_type.js'
import * as Constants from './constants.js'
/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class LatinLanguageModel extends LanguageModel {
   /**
   */
  constructor () {
    super()
    this.sourceLanguage = Constants.LANG_LATIN
    this.contextForward = 0
    this.contextBackward = 0
    this.direction = Constants.LANG_DIR_LTR
    this.baseUnit = Constants.LANG_UNIT_WORD
    this.codes = [Constants.STR_LANG_CODE_LA, Constants.STR_LANG_CODE_LAT]
    this.features = this._initializeFeatures()
  }

  _initializeFeatures () {
    let features = super._initializeFeatures()
    let code = this.toCode()
    features[Feature.types.number] = new FeatureType(Feature.types.number, [Constants.NUM_SINGULAR, Constants.NUM_PLURAL], code)
    features[Feature.types.grmCase] = new FeatureType(Feature.types.grmCase,
      [ Constants.CASE_NOMINATIVE,
        Constants.CASE_GENITIVE,
        Constants.CASE_DATIVE,
        Constants.CASE_ACCUSATIVE,
        Constants.CASE_ABLATIVE,
        Constants.CASE_LOCATIVE,
        Constants.CASE_VOCATIVE
      ], code)
    features[Feature.types.declension] = new FeatureType(Feature.types.declension,
      [ Constants.ORD_1ST, Constants.ORD_2ND, Constants.ORD_3RD, Constants.ORD_4TH, Constants.ORD_5TH ], code)
    features[Feature.types.tense] = new FeatureType(Feature.types.tense,
      [ Constants.TENSE_PRESENT,
        Constants.TENSE_IMPERFECT,
        Constants.TENSE_FUTURE,
        Constants.TENSE_PERFECT,
        Constants.TENSE_PLUPERFECT,
        Constants.TENSE_FUTURE_PERFECT
      ], code)
    features[Feature.types.voice] = new FeatureType(Feature.types.voice, [Constants.VOICE_PASSIVE, Constants.VOICE_ACTIVE], code)
    features[Feature.types.mood] = new FeatureType(Feature.types.mood, [Constants.MOOD_INDICATIVE, Constants.MOOD_SUBJUNCTIVE], code)
    features[Feature.types.conjugation] = new FeatureType(Feature.types.conjugation,
      [ Constants.ORD_1ST,
        Constants.ORD_2ND,
        Constants.ORD_3RD,
        Constants.ORD_4TH
      ], code)
    return features
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return true
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (word) {
    return word
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }

  toCode () {
    return Constants.STR_LANG_CODE_LAT
  }
}
export default LatinLanguageModel
