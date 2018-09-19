import Feature from './feature.js'
import LMF from './language_model_factory.js'
import * as Constants from './constants.js'
/*
 Hierarchical structure of return value of a morphological analyzer:

 Homonym (a group of words that are written the same way, https://en.wikipedia.org/wiki/Homonym)
    Lexeme 1 (a unit of lexical meaning, https://en.wikipedia.org/wiki/Lexeme)
        Have a lemma and one or more inflections
        Lemma (also called a headword, a canonical form of a group of words https://en.wikipedia.org/wiki/Lemma_(morphology) )
        Inflection 1
            Stem
            Suffix (also called ending)
        Inflection 2
            Stem
            Suffix
    Lexeme 2
        Lemma
        Inflection 1
            Stem
            Suffix
 */

/**
 * Represents an inflection of a word
 */
class Inflection {
  /**
     * Initializes an Inflection object.
     * @param {string} stem - A stem of a word.
     * @param {string | symbol} language - A word's language.
     * @param {string} suffix - a suffix of a word
     * @param {prefix} prefix - a prefix of a word
     * @param {example} example - example
     */
  constructor (stem = null, language, suffix = null, prefix = null, example = null) {
    if (!stem && !suffix) {
      throw new Error('At least stem or suffix must be defined')
    }
    if (!language) {
      throw new Error('Language should not be empty.')
    }

    if (!LMF.supportsLanguage(language)) {
      throw new Error(`language ${language} not supported.`)
    }

    this.stem = stem
    this.languageID = undefined
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = LMF.getLanguageAttrs(language))
    this.model = LMF.getLanguageModel(this.languageID)
    this.features = new Set() // Names of features of this inflection

    // A grammar constraints object
    this.constraints = {
      fullFormBased: false, // True this inflection stores and requires to use a full form of a word
      suffixBased: false, // True if only suffix is enough to identify this inflection
      irregular: false, // Whether this word is an irregular one
      obligatoryMatches: [], // Names of features that should be matched in order to include a form or suffix to an inflection table
      optionalMatches: [] // Names of features that will be recorded but are not important for inclusion of a form or suffix to an inflection table
    }

    // Suffix may not be present in every word. If missing, it will be set to null.
    this.suffix = suffix

    // Prefix may not be present in every word. If missing, it will be set to null.
    this.prefix = prefix

    // Example may not be provided
    this.example = example
  }

  /**
   * Returns a full form of a word using ' - ' as a divider for suffix-based inflections.
   * @return {string} A word form.
   */
  get form () {
    const divider = this.stem ? ' - ' : ''
    return this.getForm(divider)
  }

  /**
   * Returns a full form of a word using user specified divider for suffix-based inflections.
   * @param {string} divider - A divider to use between stem and suffix.
   * @return {string} A word form.
   */
  getForm (divider = '') {
    let form, prefix, suffix

    let stem = this.stem ? this.stem : ''

    if (this.model.direction === Constants.LANG_DIR_RTL) {
      prefix = this.prefix ? divider + this.prefix : ''
      suffix = this.suffix ? this.suffix + divider : ''

      form = suffix + stem + prefix
    } else {
      prefix = this.prefix ? this.prefix + divider : ''
      suffix = this.suffix ? divider + this.suffix : ''

      form = prefix + stem + suffix
    }

    return form
  }

  /**
   * This is a compatibility function for legacy code.
   * @return {String} A language code.
   */
  get language () {
    console.warn(`Please use a "languageID" instead of a "language"`)
    return this.languageCode
  }

  /**
   * Sets grammar properties based on inflection info
   */
  setConstraints () {
    if (this.model.hasOwnProperty('getInflectionConstraints')) {
      let constraintData = this.model.getInflectionConstraints(this)
      this.constraints = Object.assign(this.constraints, constraintData)
    }
  }

  /**
   * Compares if two words are the same. Options allows to specify
   * comparison algorithms for cases when word info is not fully correct.
   * @param {string} word - A word or suffix to compare with inflection.
   * @param {string} className - A type of word: 'Suffix' or "Form'.
   * @param {comparison} options - These settings define comparison algorithm:
   *        'normalize' - normalize word and inflection before comparison.
   *        'fuzzySuffix' - if suffix contained in a 'word' does not match our suffix data,
   *                        try to find a match by checking if inflection full form
   *                        ends with this suffix.
   * @return {boolean} True for match, false otherwise.
   */
  smartWordCompare (word, className, options = {}) {
    // Default values
    if (!options.hasOwnProperty(`normalize`)) { options.normalize = true }
    if (!options.hasOwnProperty(`fuzzySuffix`)) { options.fuzzySuffix = false }

    let value
    if (!this.constraints.irregular) {
      value = this.constraints.suffixBased ? this.suffix : this.form
    } else {
      if (className === 'Suffix') {
        value = this.suffix
      } else {
        value = this[Feature.types.fullForm] ? this[Feature.types.fullForm].value : this.form
      }
    }

    let matchResult = this.modelCompareWords(word, value, options.normalize)

    if (!matchResult && className === 'Suffix' && options.fuzzySuffix) {
      let form = this.getForm()
      if (form && word && form.length >= word.length) {
        let altSuffix = form.substring(form.length - word.length)
        matchResult = this.modelCompareWords(word, altSuffix, options.normalize)
      }
    }

    return matchResult
  }

  compareWithWord (word, normalize = true) {
    const value = this.constraints.suffixBased ? this.suffix : this.form
    return this.modelCompareWords(word, value, normalize)
  }

  /**
   * Compare to words (or partial words) delegating to the language model
   * rules for normalization
   * @param {String} wordA the first word
   * @param {String} wordB the second word
   * @param {Boolean} normalize whether or not to apply normalization
   */
  modelCompareWords (wordA, wordB, normalize = true) {
    const model = LMF.getLanguageModel(this.languageID)
    let matched = false
    if (normalize) {
      let altWordA = model.alternateWordEncodings(wordA, null, null, 'strippedDiacritics')
      let altWordB = model.alternateWordEncodings(wordB, null, null, 'strippedDiacritics')
      for (let i = 0; i < altWordA.length; i++) {
        matched = altWordA[i] === altWordB[i]
        if (matched) {
          break
        }
      }
      if (!matched) {
        matched = model.normalizeWord(wordA) === model.normalizeWord(wordB)
      }
    } else {
      matched = wordA === wordB
    }
    return matched
  }

  /**
   * Check to see if the supplied inflection can disambiguate this one
   * @param {Inflection} infl Inflection object to be used for disambiguation
   */
  disambiguatedBy (infl) {
    let matched = true
    // an inflection can only be disambiguated by its features
    if (this.features.length === 0 || infl.features.length === 0) {
      matched = false
    }
    // the supplied inflection can be less specific but not more
    if (infl.features.length > this.features.length) {
      matched = false
    }
    for (let feature of infl.features) {
      if (!this[feature] || !this[feature].isEqual(infl[feature])) {
        matched = false
        break
      }
    }
    return matched
  }

  static readObject (jsonObject) {
    let inflection =
      new Inflection(
        jsonObject.stem, jsonObject.languageCode, jsonObject.suffix, jsonObject.prefix, jsonObject.example)
    inflection.languageID = LMF.getLanguageIdFromCode(inflection.languageCode)
    return inflection
  }

  /**
   * @deprecated Use `addFeature` instead
   * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature (data) {
    console.warn(`Please use "addFeature" instead.`)
    if (!data) {
      throw new Error('Inflection feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data]
    }

    let type = data[0].type
    this[type] = []
    for (let element of data) {
      if (!(element instanceof Feature)) {
        throw new Error('Inflection feature data must be a Feature object.')
      }

      if (!LMF.compareLanguages(element.languageID, this.languageID)) {
        throw new Error(`Language "${element.languageID.toString()}" of a feature does not match
          a language "${this.languageID.toString()}" of an Inflection object.`)
      }

      this[type].push(element)
      this.features.add(type)
    }
  }

  /**
   * Sets a grammatical feature of an inflection. Feature is stored in a `feature.type` property.
   * @param {Feature} feature - A feature object with one or multiple values.
   */
  addFeature (feature) {
    if (!feature) {
      throw new Error('feature data cannot be empty.')
    }

    if (!(feature instanceof Feature)) {
      throw new Error('feature data must be a Feature object.')
    }

    if (!LMF.compareLanguages(feature.languageID, this.languageID)) {
      throw new Error('Language "' + feature.languageID.toString() + '" of a feature does not match a language "' +
        this.languageID.toString() + '" of a Lemma object.')
    }

    this[feature.type] = feature
    this.features.add(feature.type)
  }

  /**
   * Sets multiple grammatical features of an inflection.
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures (features) {
    if (!Array.isArray(features)) {
      throw new Error(`Features must be in an array`)
    }

    for (let feature of features) {
      this.addFeature(feature)
    }
  }

  /**
   * Checks whether an inflection has a feature with `featureName` name and `featureValue` value
   * @param {string} featureName - A name of a feature
   * @param {string} featureValue - A value of a feature
   * @return {boolean} True if an inflection contains a feature, false otherwise
   */
  hasFeatureValue (featureName, featureValue) {
    if (this.hasOwnProperty(featureName)) {
      return this[featureName].values.includes(featureValue)
    }
    return false
  }
}
export default Inflection
