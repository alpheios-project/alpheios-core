import Feature from './feature.js'
import LMF from './language_model_factory.js'
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
  constructor (stem, language, suffix = null, prefix = null, example = null) {
    if (!stem) {
      throw new Error('Stem should not be empty.')
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

    // A grammar constraints object
    this.constraints = {
      fullFormBased: false, // True this inflection stores and requires to use a full form of a word
      suffixBased: false, // True if only suffix is enough to identify this inflection
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

  get form () {
    let form = this.prefix ? this.prefix : ''
    form = form + this.stem
    form = this.suffix ? form + this.suffix : form
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

  compareWithWord (word, normalize = true) {
    const model = LMF.getLanguageModel(this.languageID)
    const value = this.constraints.suffixBased ? this.suffix : this.form
    return normalize
      ? model.normalizeWord(value) === model.normalizeWord(word)
      : value === word
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
  }

  /**
   * Checks whether an inflection has a feature with `featureName` name and `featureValue` value
   * @param {string} featureName - A name of a feature
   * @param {string} featureValue - A value of a feature
   * @return {boolean} True if an inflection contains a feature, false otherwise
   */
  hasFeatureValue (featureName, featureValue) {
    if (this.hasOwnProperty(featureName) && Array.isArray(this[featureName]) && this[featureName].length > 0) {
      for (let feature of this[featureName]) {
        if (feature.hasValue(featureValue)) {
          return true
        }
      }
    }
    return false
  }
}
export default Inflection
