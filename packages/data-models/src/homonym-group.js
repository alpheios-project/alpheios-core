import Homonym from './homonym.js'

export default class HomonymGroup {
  constructor (homonyms = []) {
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
}

HomonymGroup.errors = {
  NO_TARGET_WORD: 'Target word is not provided'
}
