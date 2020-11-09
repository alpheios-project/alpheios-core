import Feature from './feature.js'
import LMF from './language_model_factory.js'
import * as Constants from './constants.js'
import Logger from './logging/logger.js'
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
   *
   * @param {string} stem - A stem of a word.
   * @param {string | symbol} language - A word's language.
   * @param {string} suffix - a suffix of a word
   * @param {prefix} prefix - a prefix of a word
   * @param {example} example - example
   */
  constructor (stem = null, language = null, suffix = null, prefix = null, example = null) {
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
    ;({ languageID: this.languageID, languageCode: this.languageCode } = LMF.getLanguageAttrs(language))
    this.model = LMF.getLanguageModel(this.languageID)
    this.features = new Set() // Stores names of features of this inflection, feature objects themselves are stored as props

    // TODO: Separate constraints to a class of its own to share definition with language model and provide `clone()` method?
    // A grammar constraints object
    this.constraints = {
      fullFormBased: false, // True this inflection stores and requires to use a full form of a word
      suffixBased: false, // True if only suffix is enough to identify this inflection
      irregular: false, // Whether this word is an irregular one
      obligatoryMatches: [], // {string[]} Names of features that should be matched in order to include a form or suffix to an inflection table
      optionalMatches: [], // {string[]} Names of features that will be recorded but are not important for inclusion of a form or suffix to an inflection table
      morphologyMatches: [] // {string[]} These features should match for a morphology match
    }

    // Suffix may not be present in every word. If missing, it will be set to null.
    this.suffix = suffix

    // Prefix may not be present in every word. If missing, it will be set to null.
    this.prefix = prefix

    // Example may not be provided
    this.example = example

    // A lemma this inflection belongs to. Is set by `Lexeme.addInflection()`
    // TODO: make sure inflections are not set directly or this data will not be set
    this.lemma = null
  }

  clone () {
    // eslint-disable-next-line prefer-const
    let clone = new Inflection(this.stem, this.languageID, this.suffix, this.prefix, this.example)
    // Features are not modified right now so we can share them
    clone.addFeatures(Array.from(this.features).map(f => this[f]))
    clone.constraints = {
      fullFormBased: this.constraints.fullFormBased,
      suffixBased: this.constraints.suffixBased,
      irregular: this.constraints.irregular,
      obligatoryMatches: this.constraints.obligatoryMatches ? Array.from(this.constraints.obligatoryMatches) : [],
      optionalMatches: this.constraints.obligatoryMatches ? Array.from(this.constraints.obligatoryMatches) : [],
      morphologyMatches: this.constraints.morphologyMatches ? Array.from(this.constraints.morphologyMatches) : []
    }
    // A clone will share the same lexeme with an original item
    clone.lemma = this.lemma
    return clone
  }

  /**
   * Returns a full form of a word using ' - ' as a divider for suffix-based inflections.
   *
   * @returns {string} A word form.
   */
  get form () {
    const divider = this.stem ? ' - ' : ''
    return this.getForm(divider)
  }

  /**
   * Returns a full form of a word using user specified divider for suffix-based inflections.
   *
   * @param {string} divider - A divider to use between stem and suffix.
   * @returns {string} A word form.
   */
  getForm (divider = '') {
    let form, prefix, suffix

    const stem = this.stem ? this.stem : ''

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
   *
   * @returns {string} A language code.
   */
  get language () {
    Logger.getInstance().warn('Please use a "languageID" instead of a "language"')
    return this.languageCode
  }

  /**
   * Sets grammar properties based on inflection info
   */
  setConstraints () {
    if (this.model.hasOwnProperty('getInflectionConstraints')) {
      const constraintData = this.model.getInflectionConstraints(this)
      this.constraints = Object.assign(this.constraints, constraintData)
    }
  }

  /**
   * Compares if two words are the same. Options allows to specify
   * comparison algorithms for cases when word info is not fully correct.
   *
   * @param {string} word - A word or suffix to compare with inflection.
   * @param {string} className - A type of word: 'Suffix' or "Form'.
   * @param {comparison} options - These settings define comparison algorithm:
   *        'normalize' - normalize word and inflection before comparison.
   *        'fuzzySuffix' - if suffix contained in a 'word' does not match our suffix data,
   *                        try to find a match by checking if inflection full form
   *                        ends with this suffix.
   * @returns {boolean} True for match, false otherwise.
   */
  smartWordCompare (word, className, options = {}) {
    // Default values
    if (!options.hasOwnProperty('normalize')) { options.normalize = true }
    if (!options.hasOwnProperty('fuzzySuffix')) { options.fuzzySuffix = false }

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
      const form = this.getForm()
      if (form && word && form.length >= word.length) {
        const altSuffix = form.substring(form.length - word.length)
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
   *
   * @param {string} wordA the first word
   * @param {string} wordB the second word
   * @param {boolean} normalize whether or not to apply normalization
   */
  modelCompareWords (wordA, wordB, normalize = true) {
    const model = LMF.getLanguageModel(this.languageID)
    return model.compareWords(wordA, wordB, normalize)
  }

  /**
   * Check to see if the supplied inflection can disambiguate this one
   *
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
    for (const feature of infl.features) {
      if (!this[feature] || !this[feature].isEqual(infl[feature])) {
        matched = false
        break
      }
    }
    return matched
  }

  /**
   * @deprecated Use `addFeature` instead
   * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature (data) {
    Logger.getInstance().warn('Please use "addFeature" instead.')
    if (!data) {
      throw new Error('Inflection feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data]
    }

    const type = data[0].type
    this[type] = []
    for (const element of data) {
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
   *
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
   *
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures (features) {
    if (!Array.isArray(features)) {
      throw new Error('Features must be in an array')
    }

    for (const feature of features) {
      this.addFeature(feature)
    }
  }

  /**
   * Checks whether an inflection has a feature with `featureName` name and `featureValue` value
   *
   * @param {string} featureName - A name of a feature
   * @param {string} featureValue - A value of a feature
   * @returns {boolean} True if an inflection contains a feature, false otherwise
   */
  hasFeatureValue (featureName, featureValue) {
    if (this.hasOwnProperty(featureName)) {
      return this[featureName].values.includes(featureValue)
    }
    return false
  }

  toString () {
    let string = `Inflection stem: ${this.stem}, prefix: ${this.prefix}, suffix: ${this.suffix}, langID: ${this.languageID.toString()}\n  features:  `
    for (const feature of this.features.values()) {
      string += `${feature}: ${this[feature].value}, `
    }
    string += '\n  constraints:  '
    for (const [key, value] of Object.entries(this.constraints)) {
      if (Array.isArray(value)) {
        string += `${key}: [${value}], `
      } else {
        string += `${key}: ${value}, `
      }
    }
    string += `\n  example: ${this.example}`
    return string
  }

  static readObject (jsonObject, lemma) {
    // eslint-disable-next-line prefer-const
    let inflection =
      new Inflection(
        jsonObject.stem, jsonObject.languageCode, jsonObject.suffix, jsonObject.prefix, jsonObject.example)
    inflection.languageID = LMF.getLanguageIdFromCode(inflection.languageCode)

    if (jsonObject.features && jsonObject.features.length > 0) {
      jsonObject.features.forEach(featureSource => {
        inflection.addFeature(Feature.readObject(featureSource))
      })
    }
    if (lemma) {
      inflection.lemma = lemma
    }
    return inflection
  }

  convertToJSONObject () {
    let resultFeatures = [] // eslint-disable-line prefer-const
    for (const key of this.features.keys()) {
      resultFeatures.push(this[key].convertToJSONObject())
    }
    const languageCode = LMF.getLanguageCodeFromId(this.languageID)
    return {
      stem: this.stem,
      languageCode: languageCode,
      suffix: this.suffix,
      prefix: this.prefix,
      example: this.example,
      features: resultFeatures
    }
  }
}
export default Inflection
