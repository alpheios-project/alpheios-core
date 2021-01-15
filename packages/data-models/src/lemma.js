/** @module lemma */
import LMF from './language_model_factory.js'
import Language from './language.js'
import Feature from './feature.js'
import Translation from './translation.js'
import { v4 as uuidv4 } from 'uuid'

/**
 * Lemma, a canonical form of a word.
 */
class Lemma {
  /**
   * Initializes a Lemma object.
   *
   * @param {string} word - A word.
   * @param {Language} language - A language of the word.
   * @param {string[]} principalParts - the principal parts of a lemma.
   * @param {object} features - the grammatical features of a lemma.
   */
  constructor (word, language, principalParts = [], features = {}) {
    if (!word) {
      throw new Error('Word should not be empty.')
    }

    if (!language) {
      throw new Error('Language should not be empty.')
    }

    if (!(language instanceof Language)) {
      throw new Error('The language argument should be of the Language type')
    }

    // TODO: In order for Lemma to become a true value object, a word must be read only.
    //       We cannot to do that now, however, because Lexeme.disambiguate() sets it directly.
    //       This should be fixed.
    /**
     * A word of a lemma.
     *
     * @type {string}
     */
    this.word = word

    /**
     * A language of a lemma.
     *
     * @type {Language}
     */
    this._language = language

    this.principalParts = principalParts
    this.features = {}

    this.ID = uuidv4()
  }

  /**
   * Returns a language of a lemma.
   *
   * @returns {Language} - A language of a lemma.
   */
  get language () {
    return this._language
  }

  /**
   * @deprecated
   * Returns a language code of a lemma.
   *
   * @returns {string} - A language code.
   */
  get languageCode () {
    const langData = LMF.getLegacyLanguageCodeAndId(this._language)
    return langData.languageCode
  }

  /**
   * @deprecated
   * Returns a language ID of a lemma.
   *
   * @returns {symbol} - A language ID.
   */
  get languageID () {
    const langData = LMF.getLegacyLanguageCodeAndId(this._language)
    return langData.languageID
  }

  get displayWord () {
    return this.word.replace(/\d+$/, '')
  }

  static readObject (jsonObject) {
    const langCode = jsonObject.language ? jsonObject.language : jsonObject.languageCode
    const lang = new Language(langCode)
    // eslint-disable-next-line prefer-const
    let resLemma = new Lemma(jsonObject.word, lang, jsonObject.principalParts, jsonObject.pronunciation)

    if (jsonObject.features && jsonObject.features.length > 0) {
      jsonObject.features.forEach(featureSource => {
        resLemma.addFeature(Feature.readObject(featureSource))
      })
    }

    if (jsonObject.translation) {
      resLemma.translation = Translation.readObject(jsonObject.translation, resLemma)
    }
    return resLemma
  }

  convertToJSONObject () {
    let resultFeatures = [] // eslint-disable-line prefer-const
    for (const feature of Object.values(this.features)) {
      resultFeatures.push(feature.convertToJSONObject())
    }
    // eslint-disable-next-line prefer-const
    let resultLemma = {
      word: this.word,
      languageCode: this._language.toCode(),
      principalParts: this.principalParts,
      features: resultFeatures
    }

    if (this.translation) {
      resultLemma.translation = this.translation.convertToJSONObject()
    }
    return resultLemma
  }

  /**
   * @deprecated Please use `addFeature` instead.
   * Sets a grammatical feature for a lemma. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature (data) {
    // TODO: The usage of setter seems to be eliminated form the code. It can be removed if no exceptions
    //       will be thrown during an extended testing.
    throw new Error('Lexeme feature setter is deprecated. Please use addFeature() method instead')
  }

  /**
   * Sets a grammatical feature of a lemma. Feature is stored in a `feature.type` property.
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

    if (!this._language.equals(feature.language)) {
      throw new Error(`Language "${feature.language.toCode()}" of a feature does not match a language ` +
        `"${this._language.toCode()}" of a Lemma object.`)
    }

    this.features[feature.type] = feature
  }

  /**
   * Sets multiple grammatical features of a lemma.
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
   * Sets a translation from python service.
   *
   * @param {Translation} translation - A translation object
   */
  addTranslation (translation) {
    if (!translation) {
      throw new Error('translation data cannot be empty.')
    }

    if (translation.constructor.name.indexOf('Translation') === -1) {
      throw new Error('translation data must be a Translation object.')
    }

    this.translation = translation
  }

  /**
   * Test to see if two lemmas are full homonyms.
   *
   * @param {Lemma} lemma - the lemma to compare.
   * @param {object} options - Additional comparison options.
   * @param {boolean} options.normalize - Whether to normalize words before comparison.
   * @returns {boolean} true or false.
   */
  isFullHomonym (lemma, { normalize = false } = {}) {
    // If parts of speech do not match this is not a full homonym
    if (!this.features[Feature.types.part] ||
      !lemma.features[Feature.types.part] ||
      !this.features[Feature.types.part].isEqual(lemma.features[Feature.types.part])) {
      return false
    }

    // Check if words are the same
    const areSameWords = normalize
      ? LMF.getModelFromLanguage(this._language).compareWords(this.word, lemma.word, true,
          { normalizeTrailingDigit: true })
      : this.word === lemma.word

    return areSameWords
  }

  /**
   * Disambiguate between this and the other lemma.
   *
   * @param {string} otherLemma - The other lemma for disambiguation.
   * @returns {string} - A disambiguated word.
   */
  disambiguate (otherLemma) {
    const langModel = LMF.getModelFromLanguage(this._language)

    // Check if words are the same
    const areSameWords = langModel.compareWords(this.word, otherLemma.word, true, { normalizeTrailingDigit: true })
    if (!areSameWords) {
      throw new Error('Words that differ cannot be disambiguated')
    }

    const thisHasMixedCase = langModel.hasUpperCase(this.word)
    const otherHasMixedCase = langModel.hasUpperCase(otherLemma.word)
    /*
    If one of the words has both upper and lower case letters, it will be returned right away, without
    go through other normalizations.
     */
    if (otherHasMixedCase) {
      return otherLemma.word
    }
    if (thisHasMixedCase) {
      return this.word
    }
    /*
    If one of the word has characters that are not in the NFC Unicode Normalization Form,
    return that word, normalized.
     */
    const thisNeesNormalization = langModel.needsNormalization(this.word)
    const otherNeesNormalization = langModel.needsNormalization(otherLemma.word)
    if (otherNeesNormalization) {
      return langModel.normalizeText(otherLemma.word)
    }
    if (thisNeesNormalization) {
      return langModel.normalizeText(this.word)
    }
    /*
    If one of the words has a trailing digit, return a word with a trailing digit.
     */
    const thisHasTrailingDigit = langModel.hasTrailingDigit(this.word)
    const otherHasTrailingDigit = langModel.hasTrailingDigit(otherLemma.word)
    if (otherHasTrailingDigit) {
      return otherLemma.word
    }
    if (thisHasTrailingDigit) {
      return this.word
    }
    return this.word
  }

  /**
   * extracts lemma.word and all principal parts for flashcards export
   *
   */
  get wordPrincipalParts () {
    const allParts = [...this.principalParts]
    if (!this.principalParts.includes(this.word)) {
      allParts.push(this.word)
    }
    return allParts.join(', ')
  }
}

export default Lemma
