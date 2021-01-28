import LMF from './language_model_factory.js'
import Language from './language.js'
import Feature from './feature.js'
import Translation from './translation.js'
import { v4 as uuidv4 } from 'uuid'
import Logger from './logging/logger.js'

/**
 * Lemma, a canonical form of a word.
 */
class Lemma {
  /**
   * Initializes a Lemma object.
   *
   * @param {string} word - A word.
   * @param {Language | symbol | string} language - A language ID (symbol, please use this) or a language code of a word.
   * @param {string[]} principalParts - the principalParts of a lemma.
   * @param {object} features - the grammatical features of a lemma.
   */
  constructor (word, language, principalParts = [], features = {}) {
    if (!word) {
      throw new Error('Word should not be empty.')
    }

    if (!language) {
      throw new Error('Language should not be empty.')
    }

    // Compatibility code for something providing languageCode instead of languageID
    this.languageID = undefined
    this.languageCode = undefined
    if (language instanceof Language) {
      ;({ languageID: this.languageID, languageCode: this.languageCode } = LMF.getLegacyLanguageCodeAndId(language))
    } else {
      // Language is in a legacy format: either a symbol or a string
      ;({ languageID: this.languageID, languageCode: this.languageCode } = LMF.getLanguageAttrs(language))
    }

    this.word = word
    this.principalParts = principalParts
    this.features = {}

    this.ID = uuidv4()
  }

  get language () {
    Logger.getInstance().warn('Please use "languageID" instead of "language"')
    return this.languageCode
  }

  get displayWord () {
    return this.word.replace(/\d+$/, '')
  }

  static readObject (jsonObject) {
    const language = jsonObject.language ? jsonObject.language : jsonObject.languageCode
    // eslint-disable-next-line prefer-const
    let resLemma = new Lemma(jsonObject.word, language, jsonObject.principalParts, jsonObject.pronunciation)

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
      language: this.languageCode,
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
    Logger.getInstance().warn('Please use "addFeature" instead')
    if (!data) {
      throw new Error('feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data]
    }

    const type = data[0].type
    this.features[type] = []
    for (const element of data) {
      if (!(element instanceof Feature)) {
        throw new Error('feature data must be a Feature object.')
      }

      if (!LMF.compareLanguages(element.languageID, this.languageID)) {
        throw new Error('Language "' + element.languageID.toString() + '" of a feature does not match a language "' +
                this.languageID.toString() + '" of a Lemma object.')
      }

      this.features[type].push(element)
    }
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

    if (!LMF.compareLanguages(feature.languageID, this.languageID)) {
      throw new Error('Language "' + feature.languageID.toString() + '" of a feature does not match a language "' +
        this.languageID.toString() + '" of a Lemma object.')
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
   * @param {boolean} options.ignorePofs - Whether to ignore the part of speech in comparison.
   *                                       (use if the lexeme data is needed
   *                                        for a part of speech comparison)
   * @returns {boolean} true or false.
   */
  isFullHomonym (lemma, { normalize = false, ignorePofs = false } = {}) {
    // If parts of speech do not match this is not a full homonym
    // don't check if told to ignorePofs
    if (!ignorePofs &&
      (!this.features[Feature.types.part] ||
      !lemma.features[Feature.types.part] ||
      !this.features[Feature.types.part].isEqual(lemma.features[Feature.types.part]))) {
      return false
    }

    const lm = LMF.getLanguageModel(this.languageID)
    // Check if words are the same
    const areSameWords = normalize
      ? lm.compareWords(this.word, lemma.word, true,
          { normalizeTrailingDigit: true })
      : this.word === lemma.word

    // if they have differing trailing digits, they cannot be the same
    const thisHasTrailingDigit = lm.hasTrailingDigit(this.word)
    const otherHasTrailingDigit = lm.hasTrailingDigit(lemma.word)
    if (thisHasTrailingDigit && otherHasTrailingDigit) {
      const thisTrailingDigit = this.word.match(/\d+$/)[0]
      const otherTrailingDigit = lemma.word.match(/\d+$/)[0]
      if (thisTrailingDigit !== otherTrailingDigit) {
        return false
      }
    }

    return areSameWords
  }

  /**
   * Disambiguate between this and the other lemma.
   *
   * @param {string} otherLemma - The other lemma for disambiguation.
   * @returns {string} - A disambiguated word.
   */
  disambiguate (otherLemma) {
    const langModel = LMF.getLanguageModel(this.languageID)

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
