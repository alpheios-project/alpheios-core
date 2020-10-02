/**
 * Constants that define a macrolanguage.
 *
 * @enum {string} */
export const Lang = {
  LATIN: 'lat',
  GREEK: 'grc',
  ARABIC: 'ara',
  PERSIAN: 'per',
  GEEZ: 'gez',
  CHINESE: 'zho',
  SYRIAC: 'syr'
}

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

  static get LATIN () {
    return new Language(Lang.LATIN)
  }

  static get GREEK () {
    return new Language(Lang.GREEK)
  }

  static get ARABIC () {
    return new Language(Lang.ARABIC)
  }

  static get PERSIAN () {
    return new Language(Lang.PERSIAN)
  }

  static get GEEZ () {
    return new Language(Lang.GEEZ)
  }

  static get CHINESE () {
    return new Language(Lang.CHINESE)
  }

  static get SYRIAC () {
    return new Language(Lang.SYRIAC)
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

  /**
   * Checks whether the language is part of a list of languages provided.
   *
   * @param {Language[]} languages - A list of languages that the current language should be tested against.
   * @returns {boolean} - True if the language list contains the current language, false otherwise.
   */
  isOneOf (languages) {
    return languages.some(l => this.equals(l))
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
