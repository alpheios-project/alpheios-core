class Author {
  /**
  * Constructor, extracts ID from urn
  * @param {String} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
  * @param {Object} titles - has the following format { languageCode: title }
  * @param {Object} abbreviations - has the following format { languageCode: abbreviation }
  * @returns {Author}
  */
  constructor (urn, titles, abbreviations) {
    this.urn = urn
    this.titles = titles
    this.abbreviations = abbreviations
  }

  /**
  * This property is used to define title for panel
  * @returns {String}
  */
  static get defaultLang () {
    return 'eng'
  }

  /**
  * Method returns title in the lang from arguments, otherwise in default language or (if not exists) it returns first available title
  * @param {String} lang - language for getting title
  * @returns {String}
  */
  title (lang) {
    if (this.titles[lang]) {
      return this.titles[lang]
    } else if (this.titles[Author.defaultLang]) {
      return this.titles[Author.defaultLang]
    } else if (Object.values(this.titles).length > 0) {
      return Object.values(this.titles)[0]
    }
    return null
  }

  /**
  * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
  * @param {String} lang - language for getting abbreviation
  * @returns {String}
  */
  abbreviation (lang) {
    if (this.abbreviations[lang]) {
      return this.abbreviations[lang]
    } else if (this.abbreviations[Author.defaultLang]) {
      return this.abbreviations[Author.defaultLang]
    } else if (Object.values(this.abbreviations).length > 0) {
      return Object.values(this.abbreviations)[0]
    }
    return null
  }
}

export default Author
