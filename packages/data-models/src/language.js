// TODO: This creates a circular dependency and probably prevent Jest tests to succeed
import { Lang } from './constants.js'

/**
 * A value object that represents the notion of a language.
 */
export default class Language {
  /**
   * Creates an instance of a language class.
   *
   * @param {Lang} code - A constant that specifies a language.
   */
  constructor (code) {
    if (!code) {
      throw new Error('Language object cannot be create without a language _code')
    }

    /**
     An ISO 639-3 _code.
     *
     @private
     @type {string}
     */
    this._code = code
  }

  /**
   * Check whether two languages are equal.
   *
   * @param {Language} language - A language object to be compared with the current one.
   * @returns {boolean} - True if languages are equal, false otherwise.
   */
  equals (language) {
    return this._code === language.toCode()
  }

  isOneOf (languages) {
    return languages.map(l => this.equals(l))
  }

  /**
   * Returns a language code of the object.
   *
   * @returns {string} - A language code.
   */
  toCode () {
    return this._code
  }

  /**
   * Converts the current language object into a serializable JSON object.
   *
   * @returns {object} - A serializable JSON object.
   */
  toJsonObject () {
    return {
      code: this._code
    }
  }

  /**
   * Creates a Language object out of its JSON representation.
   *
   * @param {object} jsonObj - A deserialized JSON object representing the language.
   * @returns {Language} - A Language object created from a deserialized JSON representation.
   */
  static fromJsonObject (jsonObj) {
    return new Language(jsonObj.code)
  }
}
