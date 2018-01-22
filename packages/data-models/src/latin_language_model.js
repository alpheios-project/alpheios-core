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
    this.sourceLanguage = LatinLanguageModel.sourceLanguage // For compatibility, should use a static method instead
    this.contextForward = 0
    this.contextBackward = 0
    this.direction = Constants.LANG_DIR_LTR
    this.baseUnit = Constants.LANG_UNIT_WORD
    this.codes = LatinLanguageModel.codes // To keep compatibility with existing code
    this.features = this._initializeFeatures()
  }

  static get sourceLanguage () {
    return Constants.LANG_LATIN
  }

  static get codes () {
    return [Constants.STR_LANG_CODE_LA, Constants.STR_LANG_CODE_LAT]
  }

  /**
   * Checks wither a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @return {boolean} Wither this language code exists in a language code list
   */
  static hasCode (languageCode) {
    return LanguageModel.hasCodeInList(languageCode, LatinLanguageModel.codes)
  }

  _initializeFeatures () {
    let features = super._initializeFeatures()
    let code = this.toCode()
    features[Feature.types.grmClass] = new FeatureType(Feature.types.grmClass,
      [ Constants.CLASS_PERSONAL,
        Constants.CLASS_REFLEXIVE,
        Constants.CLASS_POSSESSIVE,
        Constants.CLASS_DEMONSTRATIVE,
        Constants.CLASS_RELATIVE,
        Constants.CLASS_INTERROGATIVE
      ],
      code)
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
    features[Feature.types.mood] = new FeatureType(Feature.types.mood,
      [ Constants.MOOD_INDICATIVE,
        Constants.MOOD_SUBJUNCTIVE,
        Constants.MOOD_IMPERATIVE,
        Constants.MOOD_PARTICIPLE
      ], code)
    features[Feature.types.conjugation] = new FeatureType(Feature.types.conjugation,
      [ Constants.ORD_1ST,
        Constants.ORD_2ND,
        Constants.ORD_3RD,
        Constants.ORD_4TH
      ], code)
    return features
  }

  /**
   * @override LanguageModel#grammarFeatures
   */
  grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense]
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
   * @returns the normalized form of the word (Latin replaces accents and special chars)
   * @type String
   */
  normalizeWord (word) {
    if (word) {
      word = word.replace(/[\u00c0\u00c1\u00c2\u00c3\u00c4\u0100\u0102]/g, 'A')
      word = word.replace(/[\u00c8\u00c9\u00ca\u00cb\u0112\u0114]/g, 'E')
      word = word.replace(/[\u00cc\u00cd\u00ce\u00cf\u012a\u012c]/g, 'I')
      word = word.replace(/[\u00d2\u00d3\u00d4\u00df\u00d6\u014c\u014e]/g, 'O')
      word = word.replace(/[\u00d9\u00da\u00db\u00dc\u016a\u016c]/g, 'U')
      word = word.replace(/[\u00c6\u01e2]/g, 'AE')
      word = word.replace(/[\u0152]/g, 'OE')
      word = word.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u0101\u0103]/g, 'a')
      word = word.replace(/[\u00e8\u00e9\u00ea\u00eb\u0113\u0115]/g, 'e')
      word = word.replace(/[\u00ec\u00ed\u00ee\u00ef\u012b\u012d\u0129]/g, 'i')
      word = word.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6\u014d\u014f]/g, 'o')
      word = word.replace(/[\u00f9\u00fa\u00fb\u00fc\u016b\u016d]/g, 'u')
      word = word.replace(/[\u00e6\u01e3]/g, 'ae')
      word = word.replace(/[\u0153]/g, 'oe')
    }
    return word
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }

  // For compatibility with existing code, can be replaced with a static version
  toCode () {
    return LatinLanguageModel.toCode()
  }

  static toCode () {
    return Constants.STR_LANG_CODE_LAT
  }
}
export default LatinLanguageModel
