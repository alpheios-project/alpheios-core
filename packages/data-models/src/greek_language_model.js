import LanguageModel from './language_model.js'
import * as Constants from './constants.js'
import Feature from './feature.js'
import FeatureType from './feature_type.js'

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class GreekLanguageModel extends LanguageModel {
   /**
   * @constructor
   */
  constructor () {
    super()
    this.sourceLanguage = GreekLanguageModel.sourceLanguage
    this.contextForward = 0
    this.contextBackward = 0
    this.direction = Constants.LANG_DIR_LTR
    this.baseUnit = Constants.LANG_UNIT_WORD
    this.languageCodes = GreekLanguageModel.codes
    this.features = this._initializeFeatures()
  }

  _initializeFeatures () {
    let features = super._initializeFeatures()
    let code = this.toCode()
    features[Feature.types.number] = new FeatureType(Feature.types.number, [Constants.NUM_SINGULAR, Constants.NUM_PLURAL, Constants.NUM_DUAL], code)
    features[Feature.types.grmCase] = new FeatureType(Feature.types.grmCase,
      [ Constants.CASE_NOMINATIVE,
        Constants.CASE_GENITIVE,
        Constants.CASE_DATIVE,
        Constants.CASE_ACCUSATIVE,
        Constants.CASE_VOCATIVE
      ], code)
    features[Feature.types.declension] = new FeatureType(Feature.types.declension,
      [ Constants.ORD_1ST, Constants.ORD_2ND, Constants.ORD_3RD ], code)
    features[Feature.types.tense] = new FeatureType(Feature.types.tense,
      [ Constants.TENSE_PRESENT,
        Constants.TENSE_IMPERFECT,
        Constants.TENSE_FUTURE,
        Constants.TENSE_PERFECT,
        Constants.TENSE_PLUPERFECT,
        Constants.TENSE_FUTURE_PERFECT,
        Constants.TENSE_AORIST
      ], code)
    features[Feature.types.voice] = new FeatureType(Feature.types.voice,
      [ Constants.VOICE_PASSIVE,
        Constants.VOICE_ACTIVE,
        Constants.VOICE_MEDIOPASSIVE,
        Constants.VOICE_MIDDLE
      ], code)
    features[Feature.types.mood] = new FeatureType(Feature.types.mood,
      [ Constants.MOOD_INDICATIVE,
        Constants.MOOD_SUBJUNCTIVE,
        Constants.MOOD_OPTATIVE,
        Constants.MOOD_IMPERATIVE
      ], code)
    // TODO full list of greek dialects
    features[Feature.types.dialect] = new FeatureType(Feature.types.dialect, ['attic', 'epic', 'doric'], code)
    return features
  }

  static get sourceLanguage () {
    return Constants.LANG_GREEK
  }

  static get codes () {
    return [Constants.STR_LANG_CODE_GRC]
  }

  /**
   * Checks wither a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @return {boolean} Wither this language code exists in a language code list
   */
  static hasCode (languageCode) {
    return LanguageModel.hasCodeInList(languageCode, GreekLanguageModel.codes)
  }

  // For compatibility with existing code, can be replaced with a static version
  toCode () {
    return GreekLanguageModel.toCode()
  }

  static toCode () {
    return Constants.STR_LANG_CODE_GRC
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return true
  }
  /**
   * @override LanguageModel#grammarFeatures
   */
  grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense, Feature.types.voice]
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (word) {
    // we normalize greek to NFC - Normalization Form Canonical Composition
    if (word) {
      return word.normalize('NFC')
    } else {
      return word
    }
  }

  /**
   * @override LanguageModel#alternateWordEncodings
   */
  alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
    // the original alpheios code used the following normalizations
    // 1. When looking up a lemma
    //    stripped vowel length
    //    stripped caps
    //    then if failed, tried again with out these
    // 2. when adding to a word list
    //    precombined unicode (vowel length/diacritics preserved)
    // 2. When looking up a verb in the verb paradigm tables
    //    it set e_normalize to false, otherwise it was true...
    // make sure it's normalized to NFC and in lower case
    let normalized = this.normalizeWord(word).toLocaleLowerCase()
    let strippedVowelLength = normalized.replace(
      /[\u{1FB0}\u{1FB1}]/ug, '\u{03B1}').replace(
      /[\u{1FB8}\u{1FB9}]/ug, '\u{0391}').replace(
      /[\u{1FD0}\u{1FD1}]/ug, '\u{03B9}').replace(
      /[\u{1FD8}\u{1FD9}]/ug, '\u{0399}').replace(
      /[\u{1FE0}\u{1FE1}]/ug, '\u{03C5}').replace(
      /[\u{1FE8}\u{1FE9}]/ug, '\u{03A5}').replace(
      /[\u{00AF}\u{0304}\u{0306}]/ug, '')
    let strippedDiaeresis = normalized.replace(
      /\u{0390}/ug, '\u{03AF}').replace(
      /\u{03AA}/ug, '\u{0399}').replace(
      /\u{03AB}/ug, '\u{03A5}').replace(
      /\u{03B0}/ug, '\u{03CD}').replace(
      /\u{03CA}/ug, '\u{03B9}').replace(
      /\u{03CB}/ug, '\u{03C5}').replace(
      /\u{1FD2}/ug, '\u{1F76}').replace(
      /\u{1FD3}/ug, '\u{1F77}').replace(
      /\u{1FD7}/ug, '\u{1FD6}').replace(
      /\u{1FE2}/ug, '\u{1F7A}').replace(
      /\u{1FE3}/ug, '\u{1F7B}').replace(
      /\u{1FE7}/ug, '\u{1FE6}').replace(
      /\u{1FC1}/ug, '\u{1FC0}').replace(
      /\u{1FED}/ug, '\u{1FEF}').replace(
      /\u{1FEE}/ug, '\u{1FFD}').replace(
      /[\u{00A8}\u{0308}]/ug, '')
    if (encoding === 'strippedDiaeresis') {
      return [strippedDiaeresis]
    } else {
      return [strippedVowelLength]
    }
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }
}
export default GreekLanguageModel
