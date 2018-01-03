import LMF from './language_model_factory'
import Feature from './feature.js'

/**
 * Lemma, a canonical form of a word.
 */
class Lemma {
  /**
   * Initializes a Lemma object.
   * @param {string} word - A word.
   * @param {string} language - A language code of a word. TODO: Switch to using Language ID instead
   * @param {Array[string]} principalParts - the principalParts of a lemma
   * @param {Object} features - the grammatical features of a lemma
   */
  constructor (word, language, principalParts = [], features = {}) {
    if (!word) {
      throw new Error('Word should not be empty.')
    }

    if (!language) {
      throw new Error('Language should not be empty.')
    }

    // if (!languages.isAllowed(language)) {
    //    throw new Error('Language "' + language + '" is not supported.');
    // }

    this.word = word
    this.language = language // For compatibility, should probably use language ID instead
    this.languageCode = language
    this.languageID = LMF.getLanguageIdFromCode(this.languageCode)
    this.principalParts = principalParts
    this.features = {}
  }

  static readObject (jsonObject) {
    return new Lemma(jsonObject.word, jsonObject.language, jsonObject.principalParts, jsonObject.pronunciation)
  }

  /**
   * Sets a grammatical feature for a lemma. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature (data) {
    if (!data) {
      throw new Error('feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data]
    }

    let type = data[0].type
    this.features[type] = []
    for (let element of data) {
      if (!(element instanceof Feature)) {
        throw new Error('feature data must be a Feature object.')
      }

      if (element.languageID !== this.languageID) {
        throw new Error('Language "' + element.languageID + '" of a feature does not match a language "' +
                this.languageID + '" of a Lemma object.')
      }

      this.features[type].push(element)
    }
  }

  /**
   * Get a string which can be used as a unique key to identify this lemma
   * @return {string} the key
   */
  get key () {
    return [this.word, this.languageCode, ...this.features[Feature.types.part]].join('-')
  }
}

export default Lemma
