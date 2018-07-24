import { Feature } from 'alpheios-data-models'
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

  static get ClassType () {
    return this
  }

  get hasFootnotes () {
    return Boolean(this.footnotes.length)
  }

  static readObject (jsonObject) {
    let suffix = new this.ClassType(jsonObject.value)

    if (jsonObject.features) {
      for (let key in jsonObject.features) {
        if (jsonObject.features.hasOwnProperty(key)) {
          suffix.features[key] = jsonObject.features[key]
        }
      }
    }

    if (jsonObject.featureGroups) {
      for (let key in jsonObject.featureGroups) {
        if (jsonObject.featureGroups.hasOwnProperty(key)) {
          suffix.featureGroups[key] = []
          for (let value of jsonObject.featureGroups[key]) {
            suffix.featureGroups[key].push(value)
          }
        }
      }
    }

    if (jsonObject[Feature.types.footnote]) {
      suffix[Feature.types.footnote] = []
      for (let footnote of jsonObject[Feature.types.footnote]) {
        suffix[Feature.types.footnote].push(footnote)
      }
    }

    if (jsonObject.match) {
      suffix.match = MatchData.readObject(jsonObject.match)
    }

    for (const lang in jsonObject.extendedLangData) {
      if (jsonObject.extendedLangData.hasOwnProperty(lang)) {
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
    let clone = new this.constructor.ClassType(this.value)
    for (const key in this.features) {
      if (this.features.hasOwnProperty(key)) {
        clone.features[key] = this.features[key]
      }
    }
    for (const key in this.featureGroups) {
      if (this.featureGroups.hasOwnProperty(key)) {
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
      if (this.extendedLangData.hasOwnProperty(lang)) {
        clone.extendedLangData[lang] = this.extendedLangData[lang]
      }
    }
    return clone
  }

  /**
   * Checks if a morpheme has at least one common feature value with a `feature`.
   * @param {Feature} feature - A feature we need to match with the ones stored inside the morpheme object.
   * @returns {boolean} - True if a `feature` has at least one value in common with a morpheme, false otherwise.
   */
  featureMatch (feature) {
    const matchingValues = this.matchingValues(feature)
    return matchingValues.length > 0
  }

  /**
   * Returns a list of values that are the same between a morpheme and a comparisonFeature.
   * Both morpheme and a comparisonFeature can have either single or multiple values.
   * A match is found if morpheme has one or several values of a comparisonFeature.
   * @param {Feature} comparisonFeature - A feature morpheme should be compared with.
   * @return {string[]} A list of matching feature values
   */
  matchingValues (comparisonFeature) {
    let matches = []

    if (comparisonFeature && this.features.hasOwnProperty(comparisonFeature.type)) {
      const morphemeValue = this.features[comparisonFeature.type]

      if (morphemeValue.isMultiple || comparisonFeature.isMultiple) {
        // Either morphemeValue or comparisonFeature have multiple values
        for (const featureValue of comparisonFeature.values) {
          if (morphemeValue.values.includes(featureValue)) {
            matches.push(featureValue)
          }
        }
      } else {
        // Both features have single values
        if (morphemeValue.value === comparisonFeature.value) {
          matches.push(comparisonFeature.value)
        }
      }
    }

    return matches
  }

  /**
   * Find feature groups in Suffix.featureGroups that are the same between suffixes provided
   * @param suffixes
   */
  static getCommonGroups (suffixes) {
    let features = Object.keys(suffixes[0].featureGroups)

    let commonGroups = features.filter(feature => {
      let result = true
      for (let i = 1; i < suffixes.length; i++) {
        result = result && suffixes[i].features.hasOwnProperty(feature)
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
    let commonGroups = Morpheme.getCommonGroups([this, suffix])
    if (commonGroups.length < 1) {
      // If elements do not have common groups in Suffix.featureGroups then they are not in the same group
      return false
    }

    let commonValues = {}
    commonGroups.forEach((feature) => { commonValues[feature] = new Set([this.features[feature]]) })

    let result = true
    result = result && this.value === suffix.value
    // If suffixes does not match don't check any further
    if (!result) {
      return false
    }

    // Check all features to be a match, except those that are possible group values
    for (let feature of Object.keys(this.features)) {
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
    let morphemes = []
    const currentFeature = features[level]
    for (const value of currentFeature.values) {
      if (level < features.length - 1) {
        let splitted = this.splitByFeature(features, level + 1)
        for (let morpheme of splitted) {
          morpheme.features[currentFeature.type] = currentFeature.createFeature(value)
          morpheme.featureGroups[currentFeature.type] = currentFeature.values
          morphemes.push(morpheme)
        }
      } else {
        // The last level
        let copy = this.clone()
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
    let commonGroups = Morpheme.getCommonGroups([suffixA, suffixB])
    for (let type of commonGroups) {
      // Combine values using a comma separator. Can do anything else if we need to.
      suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type]
    }
    return suffixA
  }
}
