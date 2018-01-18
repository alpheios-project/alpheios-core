import Definition from './definition'

export default class DefinitionSet {
  constructor (lemmaWord, languageID) {
    this.lemmaWord = lemmaWord
    this.languageID = languageID

    this.shortDefs = []
    this.fullDefs = []
  }

  /**
   * A function that is used to instantiate a DefinitionSet object from a JSON object.
   * @param {Object} jsonObject - A JSON object representing DefinitionSet data.
   * @return {DefinitionSet} A DefinitionSet object populated with data from JSON object.
   */
  static readObject (jsonObject) {
    let definitionSet = new DefinitionSet(jsonObject.lemmaWord, jsonObject.languageID)

    for (let shortDef of jsonObject.shortDefs) {
      definitionSet.shortDefs.push(Definition.readObject(shortDef))
    }
    for (let fullDef of jsonObject.fullDefs) {
      definitionSet.fullDefs.push(Definition.readObject(fullDef))
    }

    return definitionSet
  }

  /**
   * Check to see if the DefinitionSet is empty
   * @return {boolean} true if empty false if there is at least one definition
   */
  isEmpty () {
    return this.shortDefs.length === 0 && this.fullDefs.length === 0
  }

  /**
   * Appends one or more definitions to a list of short definitions.
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @return {Definition[]} A list of short definitions this object has.
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
   * Appends one or more definitions to a list of full definitions.
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @return {Definition[]} A list of full definitions this object has.
   */
  appendFullDefs (definitions) {
    // TODO: check for duplicates?
    if (definitions) {
      if (!Array.isArray(definitions)) { definitions = [definitions] }
      this.fullDefs = this.fullDefs.concat(definitions)
    }
    return this.fullDefs
  }
}
