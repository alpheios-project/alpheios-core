import Definition from './definition.js'
import Language from './language.js'
import LMF from './language_model_factory.js'

export default class DefinitionSet {
  /**
   * @param {string} lemmaWord - A word for which a definition set was created.
   * @param {Language} language - A language of the lexical entity (lexeme) to which the definition set is attached.
   */
  constructor (lemmaWord, language) {
    if (!lemmaWord) {
      throw new Error('DefinitionSet cannot be created without the lemma word')
    }
    if (!language) {
      throw new Error('DefinitionSet cannot be created without the language')
    }
    if (!(language instanceof Language)) {
      throw new Error('The language must be an instance of the Language class')
    }

    /**
     * A word for which a definition set was created.
     *
     * @type {string}
     */
    this.lemmaWord = lemmaWord

    /**
     * A language on what a text of a definitions in a definition set is written.
     *
     * @type {Language}
     */
    this.language = language

    this.shortDefs = []
    this.fullDefs = []
  }

  get languageID () {
    const langData = LMF.getLegacyLanguageCodeAndId(this.language)
    return langData.languageID
  }

  /**
   * A function that is used to instantiate a DefinitionSet object from a JSON object.
   *
   * @param {object} jsonObject - A JSON object representing DefinitionSet data.
   * @returns {DefinitionSet} A DefinitionSet object populated with data from JSON object.
   */
  static readObject (jsonObject) {
    const lang = new Language(jsonObject.languageCode)

    let definitionSet = new DefinitionSet(jsonObject.lemmaWord, lang) // eslint-disable-line prefer-const

    for (const shortDef of jsonObject.shortDefs) {
      definitionSet.shortDefs.push(Definition.readObject(shortDef))
    }
    for (const fullDef of jsonObject.fullDefs) {
      definitionSet.fullDefs.push(Definition.readObject(fullDef))
    }

    return definitionSet
  }

  /**
   * Checks if any short definitions are stored within this object.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs () {
    return this.shortDefs.length > 0
  }

  /**
   * Checks if any full definitions are stored within this object.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs () {
    return this.fullDefs.length > 0
  }

  /**
   * Check to see if the DefinitionSet is empty
   *
   * @returns {boolean} true if empty false if there is at least one definition
   */
  isEmpty () {
    return this.shortDefs.length === 0 && this.fullDefs.length === 0
  }

  /**
   * Appends one or more definitions to a list of short definitions.
   *
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @returns {Definition[]} A list of short definitions this object has.
   */
  appendShortDefs (definitions) {
    // TODO: check for duplicates?
    if (definitions) {
      if (!Array.isArray(definitions)) { definitions = [definitions] }
      this.shortDefs = this.shortDefs.concat(definitions)
    }
    return this.shortDefs
  }

  /**
   * clear accumulated short definitions
   */
  clearShortDefs () {
    this.shortDefs = []
  }

  /**
   * Appends one or more definitions to a list of full definitions.
   *
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @returns {Definition[]} A list of full definitions this object has.
   */
  appendFullDefs (definitions) {
    // TODO: check for duplicates?
    if (definitions) {
      if (!Array.isArray(definitions)) { definitions = [definitions] }
      this.fullDefs = this.fullDefs.concat(definitions)
    }
    return this.fullDefs
  }

  /**
   * clear accumulated full definitions
   */
  clearFullDefs () {
    this.fullDefs = []
  }

  convertToJSONObject () {
    return {
      lemmaWord: this.lemmaWord,
      languageCode: this.language.toCode(),
      shortDefs: this.shortDefs.map(def => def.convertToJSONObject()),
      fullDefs: this.fullDefs.map(def => def.convertToJSONObject())
    }
  }
}
