/**
 * Constants that define a macrolanguage in an ISO 639-3 format.
 *
 * @enum {string} */
export const Lang = {
  LATIN: 'lat',
  GREEK: 'grc',
  ARABIC: 'ara',
  PERSIAN: 'per',
  GEEZ: 'gez',
  CHINESE: 'zho',
  SYRIAC: 'syr',
  ENGLISH: 'eng'
}

/**
 * A value object that represents the notion of a language.
 */
export default class Language {
  /**
   * Creates an instance of a language class.
   *
   * @param {Lang | string} code - A constant that specifies a language in an ISO 639-3 format.
   * @param {object} options - Additional options of the Language object to be created.
   * @param {boolean} options.normalize - Whether the language code provided, in case it is not
   *        in the format supported by the Language object, should attempted
   *        to be converted to the supported format.
   */
  constructor (code, { normalize = false } = {}) {
    if (!code) {
      throw new Error('Language object cannot be created without a language code')
    }

    if (normalize) {
      code = Language.normalizedCode(code)
    }

    /**
     *An ISO 639-3 _code.
     *
     * @private
     * @type {string}
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

  static get ENGLISH () {
    return new Language(Lang.ENGLISH)
  }

  /**
   * Tries to convert a language code that is in an unsupported format to the one
   * that is supported by the Language class.
   *
   * @param {string} code - A language code to normalize.
   * @returns {Lang|string} - A normalized, if normalization is possible,
   *          or an unchanged language code supplied to the function,
   */
  static normalizedCode (code) {
    if (Object.values(Lang).includes(code)) {
      // The code is already in the supported format and does not need to be normalized
      return code
    } else if (['en'].includes(code)) {
      return Lang.ENGLISH
    } else {
      // We don't know how to normalize this code so we return the value unchanged
      return code
    }
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
