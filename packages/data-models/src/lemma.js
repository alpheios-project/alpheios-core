import LMF from './language_model_factory'

/**
 * Lemma, a canonical form of a word.
 */
class Lemma {
  /**
   * Initializes a Lemma object.
   * @param {string} word - A word.
   * @param {string} language - A language code of a word. TODO: Switch to using Language ID instead
   * @param {Array[string]} principalParts - the principalParts of a lemma
   */
  constructor (word, language, principalParts = []) {
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
  }

  static readObject (jsonObject) {
    return new Lemma(jsonObject.word, jsonObject.language)
  }
}

export default Lemma
