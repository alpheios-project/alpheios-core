import Homonym from './homonym.js'

export default class HomonymGroup {
  /**
   * Creates an instance of a HomonymGroup object.
   *
   * @param {Homonym[]} homonyms - Homonyms to include into the homonym group.
   */
  constructor (homonyms = []) {
    if (!homonyms) {
      throw new Error('Homonyms are required to create a HomonymGroup')
    }
    if (!Array.isArray(homonyms)) {
      throw new Error('An array of homonyms is required to create a HomonymGroup')
    }
    /**
     @type {Homonym[]}
     @private
     */
    this._homonyms = homonyms
  }

  get homonyms () {
    return this._homonyms
  }

  get hasHomonyms () {
    return this._homonyms.length > 0
  }

  /**
   * Converts a homonyms form a HomonymGroup into a single Homonym.
   * This function was created to provide backward compatibility with the code that
   * does not work with homonym groups.
   *
   * @param {string} targetWord - A target word that will be set for all lemmas within a resulting homonym.
   * @param {boolean} disambiguated - Whether lemmas in a resulting homonyms should be disambiguated.
   * @returns {Homonym} - A resulting homonym.
   */
  toHomonym (targetWord, { disambiguated = false } = {}) {
    if (!targetWord) {
      throw new Error(HomonymGroup.errors.NO_TARGET_WORD)
    }
    const lexemes = this._homonyms.map(homonym => homonym.lexemes).flat()
    if (disambiguated) {
      lexemes.forEach(lexeme => { lexeme.disambiguated = true })
    }
    return new Homonym(lexemes, targetWord)
  }

  /**
   * Converts the homonym group into a serializable JSON object.
   *
   * @returns {object} - A serializable JSON object.
   */
  toJsonObject () {
    return {
      homonyms: this._homonyms.map(h => h.convertToJSONObject(true))
    }
  }

  /**
   * Creates a HomonymGroup object from its JSON representation.
   *
   * @param {object} jsonObj - A deserialized JSON object representing the homonym group.
   * @returns {HomonymGroup} - An instance representing a deserialized JSON object.
   */
  static fromJsonObject (jsonObj) {
    const homonyms = jsonObj.homonyms.map(h => Homonym.readObject(h))
    return new HomonymGroup(homonyms)
  }
}

HomonymGroup.errors = {
  NO_TARGET_WORD: 'Target word is not provided'
}
