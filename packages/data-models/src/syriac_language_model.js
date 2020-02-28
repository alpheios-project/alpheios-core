import LanguageModel from './language_model.js'
import Feature from './feature.js'
import * as Constants from './constants.js'
import InflectionGroupingKey from './inflection_grouping_key'
import InflectionGroup from './inflection_group'

const typeFeatures = new Map()
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

  static get direction () { return Constants.LANG_DIR_RTL }

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
        Feature.types.kaylo,
        []
      ],
      [
        Feature.types.state,
        []
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

  /**
   * Groups a set of inflections according to a syriac display paradigm
The default groups according to the following logic:
1. groups of groups with unique stem, prefix, suffix, part of speech, declension, kaylo or state, and comparison
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
    const grouped = new Map()
    const aggregated = this.aggregateInflectionsForDisplay(inflections)

    // group inflections by part of speech
    for (const infl of aggregated) {
      const groupingKey = new InflectionGroupingKey(infl,
        [Feature.types.part, Feature.types.declension, Feature.types.kaylo, Feature.types.state, Feature.types.comparison],
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
          const nextGroup = new Map()
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
}
