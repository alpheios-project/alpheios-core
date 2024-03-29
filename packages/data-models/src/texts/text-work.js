class TextWork {
  /**
   * Constructor, extracts ID from urn
   *
   * @param {Author} author - author of the textWork
   * @param {string} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
   * @param {object} titles - has the following format { languageCode: title }
   * @param {object} abbreviations - has the following format { languageCode: abbreviation }
   * @returns {TextWork}
   */
  constructor (author, urn, titles, abbreviations) {
    this.urn = urn
    this.titles = titles
    this.author = author
    this.abbreviations = abbreviations
  }

  /**
   * This property is used to define title for panel
   *
   * @returns {string}
   */
  static get defaultLang () {
    return 'eng'
  }

  /**
   * This property is used to define prefix fr extract ID
   *
   * @returns {string}
   */
  static get defaultIDPrefix () {
    return 'phi'
  }

  /**
   * Method returns title in the lang from arguments, otherwise in default language or (if not exists) it returns first available title
   *
   * @param {string} lang - language for getting title
   * @returns {string}
   */
  title (lang) {
    if (this.titles[lang]) {
      return this.titles[lang]
    } else if (this.titles[TextWork.defaultLang]) {
      return this.titles[TextWork.defaultLang]
    } else if (Object.values(this.titles).length > 0) {
      return Object.values(this.titles)[0]
    }
    return null
  }

  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation (lang) {
    if (this.abbreviations[lang]) {
      return this.abbreviations[lang]
    } else if (this.abbreviations[TextWork.defaultLang]) {
      return this.abbreviations[TextWork.defaultLang]
    } else if (Object.values(this.abbreviations).length > 0) {
      return Object.values(this.abbreviations)[0]
    }
    return null
  }
}

export default TextWork
