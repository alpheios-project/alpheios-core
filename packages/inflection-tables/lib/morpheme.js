import { Feature } from 'alpheios-data-models'
import InflectionList from './inflection-list.js'
import MatchData from './match-data'
import ExtendedLanguageData from './extended-language-data'
import uuidv4 from 'uuid/v4'

/**
 * Suffix is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
export default class Morpheme {
  /**
   * Initializes a Suffix object.
   * @param {string | null} morphemeValue - A suffix text or null if suffix is empty.
   */
  constructor (morphemeValue) {
    if (morphemeValue === undefined) {
      throw new Error('Morpheme value should not be empty.')
    }
    this.id = uuidv4()
    this.value = morphemeValue
    this.features = {}
    this.featureGroups = {}

    /*
    Extended language data stores additional suffix information that is specific for a particular language.
    It uses the following schema:
    {string} language(key): {object} extended language data. This object is specific for each language
    and is defined in a language model.
     */
    this.extendedLangData = {}
    this.match = undefined

    /**
     * @type {Footnote[]}
     */
    this.footnotes = []
  }

  /**
   * Creates a list of items of the same type as self
   * @return {InflectionList}
   */
  static createList () {
    return new InflectionList(this)
  }

  static get comparisonTypes () {
    return {
      /**
       * Should have the same number of values. Every value should match its counterpart's value and its order.
       */
      EXACT: 'Exact Match',
      /**
       * Should have the same number of values. Every value should match a value of its counterpart.
       * Same as `EXACT`, but does not compare value's order.
       */
      ALL_VALUES: 'All values',
      /**
       * At least one value between two features should be the same.
       */
      PARTIAL: 'Partial Match'
    }
  }

  get hasFootnotes () {
    return Boolean(this.footnotes.length)
  }

  static readObject (jsonObject) {
    const suffix = new this(jsonObject.value)

    if (jsonObject.features) {
      for (const key in jsonObject.features) {
        if (jsonObject.features.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
          suffix.features[key] = jsonObject.features[key]
        }
      }
    }

    if (jsonObject.featureGroups) {
      for (const key in jsonObject.featureGroups) {
        if (jsonObject.featureGroups.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
          suffix.featureGroups[key] = []
          for (const value of jsonObject.featureGroups[key]) {
            suffix.featureGroups[key].push(value)
          }
        }
      }
    }

    if (jsonObject[Feature.types.footnote]) {
      suffix[Feature.types.footnote] = []
      for (const footnote of jsonObject[Feature.types.footnote]) {
        suffix[Feature.types.footnote].push(footnote)
      }
    }

    if (jsonObject.match) {
      suffix.match = MatchData.readObject(jsonObject.match)
    }

    for (const lang in jsonObject.extendedLangData) {
      if (jsonObject.extendedLangData.hasOwnProperty(lang)) { // eslint-disable-line no-prototype-builtins
        suffix.extendedLangData[lang] = ExtendedLanguageData.readObject(jsonObject.extendedLangData[lang])
      }
    }
    return suffix
  }

  /**
   * Returns a copy of itself. Used in splitting suffixes with multi-value features.
   * @returns {Suffix}
   */
  clone () {
    // TODO: do all-feature two-level cloning
    const clone = new this.constructor(this.value)
    for (const key in this.features) {
      if (this.features.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
        clone.features[key] = this.features[key]
      }
    }
    for (const key in this.featureGroups) {
      if (this.featureGroups.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
        clone.featureGroups[key] = this.featureGroups[key]
      }
    }

    if (this[Feature.types.footnote]) {
      clone[Feature.types.footnote] = this[Feature.types.footnote]
    }

    if (this.match) {
      clone.match = this.match
    }

    clone.footnotes.push(...this.footnotes)

    for (const lang in this.extendedLangData) {
      if (this.extendedLangData.hasOwnProperty(lang)) { // eslint-disable-line no-prototype-builtins
        clone.extendedLangData[lang] = this.extendedLangData[lang]
      }
    }
    return clone
  }

  /**
   * Checks if a morpheme has at least one common feature value with a `feature`.
   * @param {Feature} feature - A feature we need to match with the ones stored inside the morpheme object.
   * @param {Morpheme.comparisonTypes} comparisonType - What matching algorithm to use (exact or partial).
   * @returns {boolean} - True if a `feature` has at least one value in common with a morpheme, false otherwise.
   */
  featureMatch (feature, comparisonType) {
    const matchingValues = this.matchingValues(feature, comparisonType)
    return matchingValues.length > 0
  }

  /**
   * Returns a list of values that are the same between a morpheme and a comparisonFeature.
   * Both morpheme and a comparisonFeature can have either single or multiple values.
   * A match is found if morpheme has one or several values of a comparisonFeature.
   * @param {Feature} comparisonFeature - A feature morpheme should be compared with.
   * @param {Morpheme.comparisonTypes} comparisonType - What matching algorithm to use (exact or partial).
   * An exact match requires all values of this and comparison features to be the same. This and comparison
   * features should also have the same number and order of values.
   * A partial match requires this and comparison features to have at least one intersecting feature value.
   * @return {string[]} A list of matching feature values
   */
  matchingValues (comparisonFeature, comparisonType = Morpheme.comparisonTypes.EXACT) {
    const matches = []

    if (comparisonFeature && this.features.hasOwnProperty(comparisonFeature.type)) { // eslint-disable-line no-prototype-builtins
      const morphemeValue = this.features[comparisonFeature.type]

      if (comparisonType === Morpheme.comparisonTypes.EXACT) {
        // Match all values and their order
        if (morphemeValue.value === comparisonFeature.value) {
          matches.push(comparisonFeature.value)
        }
      } else if (comparisonType === Morpheme.comparisonTypes.ALL_VALUES) {
        // Match all values between themselves, ignore order
        let match = true
        for (const value of morphemeValue.values) {
          match = match && comparisonFeature.values.includes(value)
        }
        if (match) {
          matches.push(comparisonFeature.value)
        }
      } else if (comparisonType === Morpheme.comparisonTypes.PARTIAL) {
        // At least one value should be the same
        for (const cfValue of comparisonFeature.values) {
          if (morphemeValue.values.includes(cfValue)) {
            matches.push(cfValue)
          }
        }
      } else {
        console.warn(`Comparison type "${comparisonType}" is not supported`)
      }
    }

    return matches
  }

  /**
   * Find feature groups in Suffix.featureGroups that are the same between suffixes provided
   * @param suffixes
   */
  static getCommonGroups (suffixes) {
    const features = Object.keys(suffixes[0].featureGroups)

    const commonGroups = features.filter(feature => {
      let result = true
      for (let i = 1; i < suffixes.length; i++) {
        result = result && suffixes[i].features.hasOwnProperty(feature) // eslint-disable-line no-prototype-builtins
      }
      return result
    })
    return commonGroups
  }

  /**
   * Finds out if an suffix is in the same group with some other suffix. The other suffix is provided as a function argument.
   * Two suffixes are considered to be in the same group if they are:
   * a. Have at least one common group in featureGroups;
   * b. Have the same suffix
   * c. Have values of all features the same except for those that belong to a common group(s)
   * d. Values of the common group features must be complementary. Here is an example:
   * Let's say a 'gender' group can have values such as 'masculine' and 'feminine'. Then suffixes will be combined
   * only if gender value of one suffix is 'masculine' and the other value is 'feminine'. If both suffixes have the same
   * either 'masculine' or 'feminine' value, they sill not be combined as are not being complementary.
   * @param {Suffix} suffix - An other suffix that we compare this suffix with.
   * @returns {boolean} - True if both suffixes are in the same group, false otherwise.
   */
  isInSameGroupWith (suffix) {
    const commonGroups = Morpheme.getCommonGroups([this, suffix])
    if (commonGroups.length < 1) {
      // If elements do not have common groups in Suffix.featureGroups then they are not in the same group
      return false
    }

    const commonValues = {}
    commonGroups.forEach((feature) => { commonValues[feature] = new Set([this.features[feature]]) })

    let result = true
    result = result && this.value === suffix.value
    // If suffixes does not match don't check any further
    if (!result) {
      return false
    }

    // Check all features to be a match, except those that are possible group values
    for (const feature of Object.keys(this.features)) {
      if (commonGroups.indexOf(feature) >= 0) {
        commonValues[feature].add(suffix.features[feature])
        // Do not compare common groups
        continue
      }

      result = result && this.features[feature] === suffix.features[feature]
      // If feature mismatch discovered, do not check any further
      if (!result) {
        return false
      }
    }

    commonGroups.forEach(feature => {
      result = result && commonValues[feature].size === 2
    })

    return result
  }

  /**
   * Splits a morpheme that has multiple values of one or more grammatical features into an array of Morpheme objects
   * with each Morpheme object having only a single value of those grammatical features. Initial multiple values
   * are stored in a featureGroups[featureType] property as an array of values.
   * @param {Feature[]} features - Multiple grammatical feature values.
   * @param {number} level - Iteration level for recursive call tracking.
   * @returns {Morpheme[]} - An array of morphemes.
   */
  split (features, level = 0) {
    // TODO: Not tested for multiple features (as there were no such cases yet)
    const morphemes = []
    const currentFeature = features[level]
    for (const value of currentFeature.values) {
      if (level < features.length - 1) {
        const splitted = this.splitByFeature(features, level + 1)
        for (const morpheme of splitted) {
          morpheme.features[currentFeature.type] = currentFeature.createFeature(value)
          morpheme.featureGroups[currentFeature.type] = currentFeature.values
          morphemes.push(morpheme)
        }
      } else {
        // The last level
        const copy = this.clone()
        copy.features[currentFeature.type] = currentFeature.createFeature(value)
        copy.featureGroups[currentFeature.type] = currentFeature.values
        morphemes.push(copy)
      }
    }
    return morphemes
  }

  /**
   * Combines suffixes that are in the same group together. Suffixes to be combined must have their values listed
   * in an array stored as featureGroups[featureType] property.
   * @param {Suffix[]} suffixes - An array of suffixes to be combined.
   * @param {function} mergeFunction - A function that will merge two suffixes. By default it uses Suffix.merge,
   * but provides a way to supply a presentation specific functions. Please see Suffix.merge for more
   * information on function format.
   * @returns {Suffix[]} An array of suffixes with some items possibly combined together.
   */
  static combine (suffixes, mergeFunction = Morpheme.merge) {
    let matchFound = false
    let matchIdx

    do {
      matchFound = false

      /*
      Go through an array of suffixes end compare each suffix with each other (two-way compare) one time. \
      If items are in the same group, merge two suffixes, break out of a loop,
      and remove one matching suffix (the second one) from an array.
      Then repeat on a modified array until no further matches found.
       */
      for (let i = 0; i < suffixes.length; i++) {
        if (matchFound) {
          continue
        }
        for (let j = i + 1; j < suffixes.length; j++) {
          if (suffixes[i].isInSameGroupWith(suffixes[j])) {
            matchIdx = j
            matchFound = true
            mergeFunction(suffixes[i], suffixes[j])
          }
        }
      }

      if (matchFound) {
        suffixes.splice(matchIdx, 1)
      }
    }
    while (matchFound)
    return suffixes
  }

  /**
   * This function provide a logic of to merge data of two suffix object that were previously split together.
   * @param {Suffix} suffixA - A first of two suffixes to merge (to be returned).
   * @param {Suffix} suffixB - A second ending to merge (to be discarded).
   * @returns {Suffix} A modified value of ending A.
   */
  static merge (suffixA, suffixB) {
    const commonGroups = Morpheme.getCommonGroups([suffixA, suffixB])
    for (const type of commonGroups) {
      // Combine values using a comma separator. Can do anything else if we need to.
      suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type]
    }
    return suffixA
  }

  toString () {
    let string = `${this.constructor.name} value: ${this.value}, id: ${this.id}\n  features:  `
    for (const [feature, value] of Object.entries(this.features)) {
      string += `${feature}: ${value.value}, `
    }
    if (this.match) { string += `\n  ${this.match}` }
    return string
  }
}
