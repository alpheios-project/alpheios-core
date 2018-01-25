import * as Constants from './constants.js'
import Feature from './feature.js'
import FeatureType from './feature_type.js'
import InflectionGroupingKey from './inflection_grouping_key.js'
import InflectionGroup from './inflection_group.js'

/**
 * @class  LanguageModel is the base class for language-specific behavior
 */
class LanguageModel {
   /**
   */
  constructor () {
    this.sourceLanguage = null
    this.contextForward = 0
    this.context_backward = 0
    this.direction = Constants.LANG_DIR_LTR
    this.baseUnit = Constants.LANG_UNIT_WORD
    this.codes = []
  }

  _initializeFeatures () {
    let features = {}
    let code = this.toCode()
    features[Feature.types.part] = new FeatureType(Feature.types.part,
      [ Constants.POFS_ADVERB,
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
        Constants.POFS_VERB_PARTICIPLE ], code)
    features[Feature.types.gender] = new FeatureType(Feature.types.gender,
      [ Constants.GEND_MASCULINE, Constants.GEND_FEMININE, Constants.GEND_NEUTER ], code)
    features[Feature.types.type] = new FeatureType(Feature.types.type,
      [Constants.TYPE_REGULAR, Constants.TYPE_IRREGULAR], code)
    features[Feature.types.person] = new FeatureType(Feature.types.person,
      [Constants.ORD_1ST, Constants.ORD_2ND, Constants.ORD_3RD], code)
    // some general, non-language specific grammatical features
    features[Feature.types.age] = new FeatureType(Feature.types.age,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.area] = new FeatureType(Feature.types.area,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.source] = new FeatureType(Feature.types.source,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.frequency] = new FeatureType(Feature.types.frequency,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.geo] = new FeatureType(Feature.types.geo,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.source] = new FeatureType(Feature.types.source,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.pronunciation] = new FeatureType(Feature.types.pronunciation,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.kind] = new FeatureType(Feature.types.kind,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.comparison] = new FeatureType(Feature.types.comparison,
      [Constants.COMP_POSITIVE, Constants.COMP_SUPERLATIVE, Constants.COMP_COMPARITIVE], code)
    features[Feature.types.morph] = new FeatureType(Feature.types.morph,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.stemtype] = new FeatureType(Feature.types.stemtype,
      [FeatureType.UNRESTRICTED_VALUE], code)
    features[Feature.types.derivtype] = new FeatureType(Feature.types.derivtype,
      [FeatureType.UNRESTRICTED_VALUE], code)
    return features
  }

  /**
   * Identify the morphological features which should be linked to a grammar.
   * @returns {String[]} Array of Feature types
   */
  grammarFeatures () {
    return []
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return false
  }

  /**
   * Check to see if the supplied language code is supported by this tool
   * @param {string} code the language code
   * @returns true if supported false if not
   * @type Boolean
   */
  static supportsLanguage (code) {
    return this.codes.includes[code]
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {string} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (word) {
    return word
  }

  /**
   * Return alternate encodings for a word
   * @param {string} word the word
   * @param {string} preceding optional preceding word
   * @param {string} following optional following word
   * @param {string} encoding optional encoding name to filter the response to
   * @returns an array of alternate encodinges
   */
  alternateWordEncodings (word, preceding = null, folloiwng = null, encoding = null) {
    return []
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }

  toString () {
    return String(this.sourceLanguage)
  }

  isEqual (model) {
    return this.sourceLanguage === model.sourceLanguage
  }

  toCode () {
    return null
  }

  /*
  There are two types of language identificators: language IDs and language code. Language ID is a symbol constant
  defined in constants.js, such as LANG_LATIN or LANG_GREEK. Language code is a string containing (usually)
  a three-letter language codes such as 'lat' or 'la' for latin. There can be multiple language codes that identify
  the same language, but there is only one unique language ID for each language.
   */

  /**
   * Returns an array of language codes that represents the language.
   * @return {String[]} An array of language codes that matches the language.
   */
  static get codes () {
    return []
  }

  /**
   * Checks wither a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @param {String[]} codes - Array of language codes a specific language has
   * @return {boolean} Wither this language code exists in a language code list
   */
  static hasCodeInList (languageCode, codes) {
    if (LanguageModel.isLanguageCode(languageCode)) {
      return codes.includes(languageCode)
    } else {
      throw new Error(`Format of a "${languageCode}" is incorrect`)
    }
  }

  /**
   * Tests wither a provided language identificator is a language ID.
   * @param {Symbol | string} language - A language identificator, either a Symbol or a string language code.
   * @return {boolean} True if language identificator provided is a language ID.
   */
  static isLanguageID (language) {
    return (typeof language === 'symbol')
  }

  /**
   * Tests wither a provided language identificator is a language code.
   * @param {Symbol | string} language - A language identificator, either a Symbol or a string language code.
   * @return {boolean} - True if language identificator provided is a language code.
   */
  static isLanguageCode (language) {
    return !LanguageModel.isLanguageID(language)
  }

  /**
   * Groups a set of inflections according to a language-specific display paradigm
   * The default groups according to the following logic:
   *   1. groups of groups with unique stem, prefix, suffix, part of speech dialect and comparison
   *     2. groups of those groups with unique
   *          number, if it's an inflection with a grammatical case
   *          tense, if it's an inflection with tense but no case (i.e. a verb)
   *          verbs without tense or case
   *          adverbs
   *          everything else
   *       3. groups of those groups with unique voice and tense
   *         4. groups of inflections with unique gender, person, mood, and sort
   */
  groupInflectionsForDisplay (inflections) {
    let grouped = new Map()

    // group inflections by part of speech
    for (let infl of inflections) {
      let groupingKey = new InflectionGroupingKey(infl,
        [Feature.types.part, Feature.types.dialect, Feature.types.comparison],
        { prefix: infl.prefix,
          suffix: infl.suffix,
          stem: infl.stem
        }
        )
      let groupingKeyStr = groupingKey.toString()
      if (grouped.has(groupingKeyStr)) {
        grouped.get(groupingKeyStr).append(infl)
      } else {
        grouped.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]))
      }
    }

    // iterate through each group key to group the inflections in that group
    for (let kv of grouped) {
      let inflgrp = new Map()
      for (let infl of kv[1].inflections) {
        let keyprop
        let isCaseInflectionSet = false
        if (infl[Feature.types.grmCase]) {
          // grouping on number if case is defined
          keyprop = Feature.types.number
          isCaseInflectionSet = true
        } else if (infl[Feature.types.tense]) {
          // grouping on tense if tense is defined but not case
          keyprop = Feature.types.tense
        } else if (infl[Feature.types.part] === Constants.POFS_VERB) {
          // grouping on no case or tense but a verb
          keyprop = Feature.types.part
        } else if (infl[Feature.types.part] === Constants.POFS_ADVERB) {
          keyprop = Feature.types.part
          // grouping on adverbs without case or tense
        } else {
          keyprop = 'misc'
          // grouping on adverbs without case or tense
          // everything else
        }
        let groupingKey = new InflectionGroupingKey(infl, [keyprop], {isCaseInflectionSet: isCaseInflectionSet})
        let groupingKeyStr = groupingKey.toString()
        if (inflgrp.has(groupingKeyStr)) {
          inflgrp.get(groupingKeyStr).append(infl)
        } else {
          inflgrp.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]))
        }
      }
      // inflgrp is now a map of groups of inflections grouped by
      //  inflections with number
      //  inflections without number but with tense
      //  inflections of verbs without tense
      //  inflections of adverbs
      //  everything else
      // iterate through each inflection group key to group the inflections in that group by tense and voice
      for (let kv of inflgrp) {
        let nextGroup = new Map()
        let sortOrder = new Map()
        for (let infl of kv[1].inflections) {
          let sortkey = infl[Feature.types.grmCase] ? Math.max(infl[Feature.types.grmCase].map((f) => { return f.sortOrder })) : 1
          let groupingKey = new InflectionGroupingKey(infl, [Feature.types.tense, Feature.types.voice])
          let groupingKeyStr = groupingKey.toString()
          if (nextGroup.has(groupingKeyStr)) {
            nextGroup.get(groupingKeyStr).append(infl)
          } else {
            nextGroup.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl], sortkey))
            sortOrder.set(groupingKeyStr, sortkey)
          }
        }
        kv[1].inflections = []
        let sortedKeys = Array.from(nextGroup.keys()).sort(
          (a, b) => {
            let orderA = sortOrder.get(a)
            let orderB = sortOrder.get(b)
            return orderA > orderB ? -1 : orderB > orderA ? 1 : 0
          }
        )
        for (let groupkey of sortedKeys) {
          kv[1].inflections.push(nextGroup.get(groupkey))
        }
      }

      // inflgrp is now a Map of groups of groups of inflections

      for (let kv of inflgrp) {
        let groups = kv[1]
        for (let group of groups.inflections) {
          let nextGroup = new Map()
          for (let infl of group.inflections) {
            // set key is case comp gend pers mood sort
            let groupingKey = new InflectionGroupingKey(infl,
              [Feature.types.grmCase, Feature.types.comparison, Feature.types.gender, Feature.types.number, Feature.types.person,
                Feature.types.tense, Feature.types.mood, Feature.types.sort, Feature.types.voice])
            let groupingKeyStr = groupingKey.toString()
            if (nextGroup.has(groupingKeyStr)) {
              nextGroup.get(groupingKeyStr).append(infl)
            } else {
              nextGroup.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]))
            }
          }
          group.inflections = Array.from(nextGroup.values()) // now a group of inflection groups
        }
      }
      kv[1].inflections = Array.from(inflgrp.values())
    }
    return Array.from(grouped.values())
  }
}

export default LanguageModel
