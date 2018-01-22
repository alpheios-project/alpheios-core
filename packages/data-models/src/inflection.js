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
     * @param {String | Symbol} language - A word's language.
     * @param {string} suffix - a suffix of a word
     * @param {prefix} prefix - a prefix of a word
     * @param {example} example - example
     */
  constructor (stem, language, suffix = null, prefix = null, example = null) {
    if (!stem) {
      throw new Error('Stem should not be empty.')
    }

    if (!language) {
      throw new Error('Langauge should not be empty.')
    }

    if (!LMF.supportsLanguage(language)) {
      throw new Error(`language ${language} not supported.`)
    }

    this.stem = stem
    this.languageID = undefined
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = LMF.getLanguageAttrs(language))

    // Suffix may not be present in every word. If missing, it will set to null.
    this.suffix = suffix

    // Prefix may not be present in every word. If missing, it will set to null.
    this.prefix = prefix

    // Example may not be provided
    this.example = example
  }

  /**
   * This is a compatibility function for legacy code.
   * @return {String} A language code.
   */
  get language () {
    console.warn(`Please use a "languageID" instead of a "language"`)
    return this.languageCode
  }

  static readObject (jsonObject) {
    let inflection =
      new Inflection(
        jsonObject.stem, jsonObject.languageCode, jsonObject.suffix, jsonObject.prefix, jsonObject.example)
    inflection.languageID = LMF.getLanguageIdFromCode(inflection.languageCode)
    return inflection
  }

    /**
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
}
export default Inflection
