import * as Constants from './constants.js'
import LanguageModelFactory from './language_model_factory.js'
import Feature from './feature.js'
import FeatureType from './feature_type.js'
import InflectionGroupingKey from './inflection_grouping_key.js'
import InflectionGroup from './inflection_group.js'
import Logger from './logging/logger.js'

/**
 * @class  LanguageModel is the base class for language-specific behavior
 */
class LanguageModel {
  constructor () {
    // This is just to avoid JavaScript Standard error on `context_backward` getter name. Don't need a constructor otherwise
    // TODO: `contextBackward` shall be used instead of `context_backward` wherever it is used
    this.context_backward = LanguageModel.contextBackward
  }

  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return Constants.LANG_DIR_LTR }
  static get baseUnit () { return Constants.LANG_UNIT_WORD }

  /**
   * @deprecated
   */
  get contextForward () {
    Logger.getInstance().warn('Please use static "contextForward" instead')
    return this.constructor.contextForward
  }

  /**
   * @deprecated
   */
  get contextBackward () {
    Logger.getInstance().warn('Please use static "contextBackward" instead')
    return this.constructor.contextBackward
  }

  /**
   * @deprecated
   */
  get direction () {
    Logger.getInstance().warn('Please use static "direction" instead')
    return this.constructor.direction
  }

  /**
   * @deprecated
   */
  get baseUnit () {
    Logger.getInstance().warn('Please use static "baseUnit" instead')
    return this.constructor.baseUnit
  }

  /**
   * @deprecated
   */
  get features () {
    Logger.getInstance().warn('Please use individual "getFeatureType" or static "features" instead')
    return this.constructor.features
  }

  /**
   * Returns a list of names of feature types that are defined in a language model.
   *
   * @returns {string[]} Names of features that are defined in a model.
   */
  static get featureNames () {
    return this.featureValues.keys()
  }

  /**
   * Returns a feature a `featureType` name that is defined for a language. It does not create a new Feature
   * object instance. It returns the one defined in a language model. To get a new instance of a Feature
   * object, use `getFeature` instead.
   * If no feature of `featureType` is defined in a language model, throws an error.
   *
   * @param {string} featureType - A feature type name.
   * @returns {Feature} A feature object of requested type.
   */
  static typeFeature (featureType) {
    if (this.typeFeatures.has(featureType)) {
      return this.typeFeatures.get(featureType)
    } else {
      throw new Error(`Type feature "${featureType}" is not defined within "${this}"`)
    }
  }

  /**
   * Returns a map with Feature objects of all features defined in a language. Use this method to get all
   * Feature objects defined in a language model.
   *
   * @returns {Map} Feature objects for all features defined within a language in a Map object. The key is
   * a feature type (a string), and the value is a Feature object.
   */
  static get typeFeatures () {
    Logger.getInstance().warn('This getter must be defined in a descendant class')
  }

  static get features () {
    let features = {} // eslint-disable-line prefer-const
    for (const featureName of this.featureNames) {
      features[featureName] = this.getFeature(featureName)
    }
    return features
  }

  static get languageID () {
    return Constants.LANG_UNDEFINED
  }

  static get languageCode () {
    return Constants.STR_LANG_CODE_UNDEFINED
  }

  /**
   * Returns an array of language codes that represents the language.
   *
   * @returns {string[]} An array of language codes that matches the language.
   */
  static get languageCodes () {
    return []
  }

  static get codes () {
    Logger.getInstance().warn('Use static "languageCodes" instead')
    return this.languageCodes
  }

  /**
   * @deprecated
   * @returns {string[]}
   */
  get codes () {
    Logger.getInstance().warn('Please use a static version of "codes" instead')
    return this.constructor.languageCodes
  }

  /**
   * @deprecated
   * @returns {string}
   */
  toCode () {
    Logger.getInstance().warn('Please use a static "languageCode" instead')
    return this.constructor.languageCode
  }

  /**
   * @deprecated
   * @returns {string}
   */
  static toCode () {
    Logger.getInstance().warn('Please use a static "languageCode" instead')
    return this.languageCode
  }

  /**
   * Return a list of feature values that are allowed for each feature type
   *
   * @returns {Map<string, string[]>}
   */
  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
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
          Constants.POFS_VERB_PARTICIPLE
        ]
      ],
      [
        Feature.types.gender,
        [
          Constants.GEND_MASCULINE,
          Constants.GEND_FEMININE,
          Constants.GEND_NEUTER
        ]
      ],
      [
        Feature.types.type,
        [
          Constants.TYPE_REGULAR,
          Constants.TYPE_IRREGULAR
        ]
      ],
      [
        Feature.types.person,
        [
          Constants.ORD_1ST,
          Constants.ORD_2ND,
          Constants.ORD_3RD
        ]
      ],
      [
        Feature.types.number,
        [
          Constants.NUM_SINGULAR,
          Constants.NUM_PLURAL
        ]
      ],
      [
        Feature.types.age,
        []
      ],
      [
        Feature.types.area,
        []
      ],
      [
        Feature.types.source,
        []
      ],
      [
        Feature.types.frequency,
        []
      ],
      [
        Feature.types.geo,
        []
      ],
      [
        Feature.types.pronunciation,
        []
      ],
      [
        Feature.types.kind,
        []
      ],
      [
        Feature.types.comparison,
        []
      ],
      [
        Feature.types.morph,
        []
      ],
      [
        Feature.types.stemtype,
        []
      ],
      [
        Feature.types.derivtype,
        []
      ]
    ])
  }

  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  static get sourceLanguage () {
    Logger.getInstance().warn('Please use languageID directly')
    return this.languageID
  }

  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  get sourceLanguage () {
    Logger.getInstance().warn('Please use languageID directly')
    return this.constructor.languageID
  }

  /**
   * @deprecated
   * @param name
   * @returns {FeatureType}
   */
  static getFeatureType (name) {
    Logger.getInstance().warn('Please use getFeature instead')
    const featureValues = this.featureValues
    if (featureValues.has(name)) {
      return new FeatureType(name, featureValues.get(name), this.languageID)
    } else {
      throw new Error(`Feature "${name}" is not defined`)
    }
  }

  /**
   * Returns a new instance of a feature with `featureType`. It uses a feature defined in a language model
   * as a master.
   *
   * @param {string} featureType - A name of a feature type.
   * @returns {Feature} - A newly created Feature object.
   */
  static getFeature (featureType) {
    const featureValues = this.featureValues // To cache the values
    if (featureValues.has(featureType)) {
      const allowedValues = featureValues.get(featureType)
      return new Feature(featureType, allowedValues, this.languageID, 1, allowedValues)
    } else {
      throw new Error(`Feature "${featureType}" is not defined`)
    }
  }

  _initializeFeatures () {
    const features = {}
    for (const featureName of this.constructor.featureValues.keys()) {
      features[featureName] = this.constructor.getFeature(featureName)
    }
    return features
  }

  /**
   * @deprecated
   */
  grammarFeatures () {
    Logger.getInstance().warn('Please use a static version of "grammarFeatures" instead')
    return this.constructor.grammarFeatures()
  }

  /**
   * Identify the morphological features which should be linked to a grammar.
   *
   * @returns {string[]} Array of Feature types
   */
  static grammarFeatures () {
    return []
  }

  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   * @returns {boolean}
   */
  static canInflect (node) {
    return false
  }

  /**
   * Check to see if the supplied language code is supported by this tool
   *
   * @param {string} code - The language code
   * @returns {boolean} - True if supported, false if not
   */
  static supportsLanguage (code) {
    return this.languageCodes.includes[code]
  }

  /**
   * Checks if the word provided has a trailing digit (e.g. αἴγυπτος1 in Greek).
   *
   * @param {string} word - A word to be checked.
   * @returns {boolean} - True if the word has a trailing digit, false otherwise.
   */
  static hasTrailingDigit (word) {
    return /^.+\d$/.test(word)
  }

  /**
   * Morphological parsers and dictionary indexes may add a trailing digit to disambiguate homonyms.
   * These can be ignored for purposes of string comparison.
   *
   * @param {string} word - A word to normalize.
   * @returns {string} A normalized word.
   */
  static normalizeTrailingDigit (word) {
    return /^.+1$/.test(word) ? word.substring(0, word.length - 1) : word
  }

  /**
   * Checks if the word provided is in a normalized form.
   * It also checks if the word has the right single quotation (elision).
   *
   * @see {@link GreekLanguageModel#normalizeText}
   * @param {string} text - A word or a text string to be checked.
   * @returns {boolean} - True if at least one character of the word
   * is NOT in an Unicode Normalization Form, false otherwise.
   */
  static needsNormalization (text) {
    return Boolean(text.localeCompare(this.normalizeText(text)))
  }

  /**
   * Checks if the word provided has any letters in an upper case.
   *
   * @param {string} word - A word to be checked.
   * @returns {boolean} - True if the word at least one letter in upper case, false if all letters are lower case.
   */
  static hasUpperCase (word) {
    return Boolean(word.localeCompare(word.toLocaleLowerCase()))
  }

  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} word the source word
   * @returns {string} Normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   */
  static normalizeText (word) {
    return word
  }

  /**
   * Returns alternate encodings for a word
   *
   * @param {object} params - A parameters object.
   * @param {string} params.word - The word.
   * @param {string} [params.preceding=null] - A preceding word (optional).
   * @param {string} [params.following=null] - A following word (optional).
   * @param {string} [params.encoding=null] - Encoding name to filter the response to (optional).
   * @param {boolean} [params.preserveCase=false] - If true will preserve the case (default is false).
   * @param {boolean} [params.includeOriginal=false] - If true will include the original word even if it is unchanged (default is false).
   * @returns {Array} an array of alternate encodings if they differ from the original
   */
  static alternateWordEncodings ({
    word = null, preceding = null, following = null, encoding = null,
    preserveCase = false, includeOriginal = false
  } = {}) {
    return includeOriginal ? [word] : []
  }

  /**
   * Compare two words with language specific logic
   *
   * @param {string} wordA - a first word for comparison.
   * @param {string} wordB - a second word for comparison.
   * @param {boolean} normalize - whether or not to apply normalization algorithms
   * @param {object} options - Additional comparison criteria.
   */
  static compareWords (wordA, wordB, normalize = true, options = {}) {
    if (normalize) {
      wordA = this.normalizeTrailingDigit(wordA)
      wordB = this.normalizeTrailingDigit(wordB)
      return this.normalizeText(wordA) === this.normalizeText(wordB)
    } else {
      return wordA === wordB
    }
  }

  /**
   * Get a list of valid puncutation for this language
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return '\\-\\.,;:!?\'"(){}\\[\\]<>\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r'
  }

  /**
   * @deprecated
   * @returns {string}
   */
  getPunctuation () {
    Logger.getInstance().warn('Please use a static version of "getPunctuation"')
    return this.constructor.getPunctuation()
  }

  toString () {
    return String(this.constructor.languageCode)
  }

  isEqual (model) {
    return LanguageModelFactory.compareLanguages(this.languageID, model.languageID)
  }

  /*
  There are two types of language identificators: language IDs and language code. Language ID is a symbol constant
  defined in constants.js, such as LANG_LATIN or LANG_GREEK. Language code is a string containing (usually)
  a three-letter language codes such as 'lat' or 'la' for latin. There can be multiple language codes that identify
  the same language, but there is only one unique language ID for each language.
   */

  /**
   * Checks whether a language has a particular language code in its list of codes
   *
   * @param {string} languageCode - A language code to check
   * @returns {boolean} Whether this language code exists in a language code list
   */
  static hasCode (languageCode) {
    if (this.isLanguageCode(languageCode)) {
      return this.languageCodes.includes(languageCode)
    } else {
      throw new Error(`Format of a "${languageCode}" is incorrect`)
    }
  }

  /**
   * Tests wither a provided language identificator is a language ID.
   *
   * @param {symbol|string} language - A language identificator, either a Symbol or a string language code.
   * @returns {boolean} True if language identificator provided is a language ID.
   */
  static isLanguageID (language) {
    return (typeof language === 'symbol')
  }

  /**
   * Tests wither a provided language identificator is a language code.
   *
   * @param {symbol|string} language - A language identificator, either a Symbol or a string language code.
   * @returns {boolean} - True if language identificator provided is a language code.
   */
  static isLanguageCode (language) {
    return !LanguageModel.isLanguageID(language)
  }

  /**
   * @deprecated
   * @param node
   */
  canInflect (node) {
    Logger.getInstance().warn('Please use a static version of "canInflect" instead')
    return this.constructor.canInflect(node)
  }

  /**
   * Groups a set of inflections according to a language-specific display paradigm
     The default groups according to the following logic:
     1. groups of groups with unique stem, prefix, suffix, part of speech, declension, dialect and comparison
     2. groups of those groups with unique
     number, if it's an inflection with a grammatical case
     tense, if it's an inflection with tense but no case (i.e. a verb)
     verbs without tense or case
     adverbs
     everything else
     3. groups of those groups with unique voice and tense
     4. groups of inflections with unique gender, person, mood, and sort
   *
   * @param inflections
   */
  static groupInflectionsForDisplay (inflections) {
    let grouped = new Map() // eslint-disable-line prefer-const
    const aggregated = this.aggregateInflectionsForDisplay(inflections)

    // group inflections by part of speech
    for (const infl of aggregated) {
      const groupingKey = new InflectionGroupingKey(infl,
        [Feature.types.part, Feature.types.declension, Feature.types.dialect, Feature.types.comparison],
        {
          prefix: infl.prefix,
          suffix: infl.suffix,
          stem: infl.stem
        }
      )
      const groupingKeyStr = groupingKey.toString()
      if (grouped.has(groupingKeyStr)) {
        grouped.get(groupingKeyStr).append(infl)
      } else {
        grouped.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]))
      }
    }

    // iterate through each group key to group the inflections in that group
    for (const kv of grouped) {
      const inflgrp = new Map()
      for (const infl of kv[1].inflections) {
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
        const groupingKey = new InflectionGroupingKey(infl, [keyprop], { isCaseInflectionSet: isCaseInflectionSet })
        const groupingKeyStr = groupingKey.toString()
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
      for (const kv of inflgrp) {
        const nextGroup = new Map()
        const sortOrder = new Map()
        for (const infl of kv[1].inflections) {
          const sortkey = infl[Feature.types.grmCase] ? Math.max(infl[Feature.types.grmCase].items.map(f => f.sortOrder)) : 1
          const groupingKey = new InflectionGroupingKey(infl, [Feature.types.tense, Feature.types.voice])
          const groupingKeyStr = groupingKey.toString()
          if (nextGroup.has(groupingKeyStr)) {
            nextGroup.get(groupingKeyStr).append(infl)
          } else {
            nextGroup.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl], sortkey))
            sortOrder.set(groupingKeyStr, sortkey)
          }
        }
        kv[1].inflections = []
        const sortedKeys = Array.from(nextGroup.keys()).sort(
          (a, b) => {
            const orderA = sortOrder.get(a)
            const orderB = sortOrder.get(b)
            return orderA > orderB ? -1 : orderB > orderA ? 1 : 0
          }
        )
        for (const groupkey of sortedKeys) {
          kv[1].inflections.push(nextGroup.get(groupkey))
        }
      }

      // inflgrp is now a Map of groups of groups of inflections

      for (const kv of inflgrp) {
        const groups = kv[1]
        for (const group of groups.inflections) {
          let nextGroup = new Map() // eslint-disable-line prefer-const
          for (const infl of group.inflections) {
            // set key is case comp gend pers mood sort
            const groupingKey = new InflectionGroupingKey(infl,
              [Feature.types.grmCase, Feature.types.comparison, Feature.types.gender, Feature.types.number, Feature.types.person,
                Feature.types.tense, Feature.types.mood, Feature.types.voice])
            const groupingKeyStr = groupingKey.toString()
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

  /**
   * Aggregate inflections for display according to language model characteristics
   *
   * @param {Inflection[]} inflections an array of inflections
   * @returns Inflection[] the aggregated inflections
   */
  static aggregateInflectionsForDisplay (inflections) {
    // default is just to do nothing
    return inflections
  }

  /**
   * @deprecated
   * @param inflections
   * @returns {*}
   */
  groupInflectionsForDisplay (inflections) {
    Logger.getInstance().warn('Please use a static version of "groupInflectionsForDisplay" instead')
    return this.constructor.groupInflectionsForDisplay(inflections)
  }
}

export default LanguageModel
