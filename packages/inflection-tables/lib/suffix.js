import * as Models from 'alpheios-data-models'
import MatchData from './match-data'
import ExtendedLanguageData from './extended-language-data'

/**
 * Suffix is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
export default class Suffix {
  /**
   * Initializes a Suffix object.
   * @param {string | null} suffixValue - A suffix text or null if suffix is empty.
   */
  constructor (suffixValue) {
    if (suffixValue === undefined) {
      throw new Error('Suffix should not be empty.')
    }
    this.value = suffixValue
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
  }

  static readObject (jsonObject) {
    let suffix = new Suffix(jsonObject.value)

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

    if (jsonObject[Models.Feature.types.footnote]) {
      suffix[Models.Feature.types.footnote] = []
      for (let footnote of jsonObject[Models.Feature.types.footnote]) {
        suffix[Models.Feature.types.footnote].push(footnote)
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
    let clone = new Suffix(this.value)
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

    if (this.hasOwnProperty(Models.Feature.types.footnote)) {
      clone[Models.Feature.types.footnote] = this[Models.Feature.types.footnote]
    }

    for (const lang in this.extendedLangData) {
      if (this.extendedLangData.hasOwnProperty(lang)) {
        clone.extendedLangData[lang] = this.extendedLangData[lang]
      }
    }
    return clone
  };

  /**
   * Checks if suffix has a feature that is a match to the one provided.
   * @param {string} featureType - Sets a type of a feature we need to match with the ones stored inside the suffix
   * @param {Feature[]} features - A list of features we need to match with the ones stored inside the suffix
   * @returns {string | undefined} - If provided feature is a match, returns a value of a first feature that matched.
   * If no match found, return undefined.
   */
  featureMatch (featureType, features) {
    if (features && this.features.hasOwnProperty(featureType)) {
      for (let feature of features) {
        if (feature.value === this.features[featureType]) {
          return feature.value
        }
      }
    }
    return undefined
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
    let commonGroups = Suffix.getCommonGroups([this, suffix])
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
   * Splits a suffix that has multiple values of one or more grammatical features into an array of Suffix objects
   * with each Suffix object having only a single value of those grammatical features. Initial multiple values
   * are stored in a featureGroups[featureType] property as an array of values.
   * @param {string} featureType - A type of a feature
   * @param {Feature[]} featureValues - Multiple grammatical feature values.
   * @returns {Suffix[]} - An array of suffixes.
   */
  split (featureType, featureValues) {
    let copy = this.clone()
    let values = []
    featureValues.forEach(element => values.push(element.value))
    copy.features[featureType] = featureValues[0].value
    copy.featureGroups[featureType] = values
    let suffixItems = [copy]
    for (let i = 1; i < featureValues.length; i++) {
      copy = this.clone()
      copy.features[featureType] = featureValues[i].value
      copy.featureGroups[featureType] = values
      suffixItems.push(copy)
    }
    return suffixItems
  };

  /**
   * Combines suffixes that are in the same group together. Suffixes to be combined must have their values listed
   * in an array stored as featureGroups[featureType] property.
   * @param {Suffix[]} suffixes - An array of suffixes to be combined.
   * @param {function} mergeFunction - A function that will merge two suffixes. By default it uses Suffix.merge,
   * but provides a way to supply a presentation specific functions. Please see Suffix.merge for more
   * information on function format.
   * @returns {Suffix[]} An array of suffixes with some items possibly combined together.
   */
  static combine (suffixes, mergeFunction = Suffix.merge) {
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
    let commonGroups = Suffix.getCommonGroups([suffixA, suffixB])
    for (let type of commonGroups) {
      // Combine values using a comma separator. Can do anything else if we need to.
      suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type]
    }
    return suffixA
  };
}
