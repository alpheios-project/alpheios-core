import LanguageModelFactory from './language_model_factory.js'
import FeatureImporter from './feature_importer.js'
import * as i18n from './i18n.js'

/**
 * A grammatical feature object, that can replace both Feature and FeatureType objects.
 */
export default class Feature {
  /**
   *
   * @param {string} type - A type of the feature, allowed values are specified in 'type' getter.
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations.
   *
   * If a single value with no sort order is provided, data format will be:
   *  value
   *  This value will be assigned a default sort order.
   *
   * If a single value with sort order is provided, data format will be:
   *  [[value, sortOrder]]
   *
   * If multiple values without sort order are provided, data format will be:
   *  [value1, value2, value3, ...]
   * Items will be assigned a sort order according to their order in an array, starting from one.
   *
   * If multiple values with sort order are provided, data format will be:
   *  [[value1, sortOrder1], [value2, sortOrder2], [value3, sortOrder3], ...]
   * If a sort order is omitted anywhere, it will be set to a default sort order.
   *
   * Each value of a feature has its `sortOrder` property. This value is used to soft values of a feature
   * between themselves. Feature object has a `sortOrder` property of its own, too. It is used
   * to compare two Feature objects between themselves.
   *
   * @param {symbol} languageID - A language ID of a feature
   * @param {number} sortOrder - A sort order of a feature when multiple features are compared.
   * @param allowedValues - If feature has a restricted set of allowed values, here will be a list of those
   * values. An order of those values can define a sort order.
   */
  constructor (type, data, languageID, sortOrder = 1, allowedValues = []) {
    if (!Feature.isAllowedType(type)) {
      throw new Error('Features of "' + type + '" type are not supported.')
    }
    if (!data) {
      throw new Error('Feature should have a non-empty value(s).')
    }
    if (!languageID) {
      throw new Error('No language ID is provided')
    }

    this.type = type
    this.languageID = languageID
    this.sortOrder = sortOrder
    this.allowedValues = allowedValues

    // `_data` is an array
    this._data = Feature.dataValuesFromInput(data)
    this.sort()
  }

  static dataValuesFromInput (data) {
    let normalized
    if (!Array.isArray(data)) {
      // Single value with no sort order
      normalized = [[data, this.defaultSortOrder]]
    } else if (!Array.isArray(data[0])) {
      // Multiple values without any sort order, default sort order will be used
      // we reverse because sortOrder is numeric descending (i.e. 2 is before 1)
      normalized = data.map((v, i) => [v, data.length - i])
    } else {
      // Value has all the data, including a sort order
      normalized = data
    }
    return normalized.map(d => { return { value: d[0], sortOrder: Number.parseInt(d[1]) } })
  }

  /**
   *
   * @param featureData
   */
  static newFromFtr (featureData) {

  }

  static get types () {
    return {
      /**
       * @deprecated : Use `fullForm` where appropriate instead
       */
      word: 'word',
      fullForm: 'full form',
      hdwd: 'headword',
      part: 'part of speech', // Part of speech
      number: 'number',
      'case': 'case',
      grmCase: 'case', // A synonym of `case`
      declension: 'declension',
      gender: 'gender',
      type: 'type',
      'class': 'class',
      grmClass: 'class', // A synonym of `class`
      conjugation: 'conjugation',
      comparison: 'comparison',
      tense: 'tense',
      voice: 'voice',
      mood: 'mood',
      person: 'person',
      frequency: 'frequency', // How frequent this word is
      meaning: 'meaning', // Meaning of a word
      source: 'source', // Source of word definition
      footnote: 'footnote', // A footnote for a word's ending
      dialect: 'dialect', // a dialect identifier
      note: 'note', // a general note
      pronunciation: 'pronunciation',
      age: 'age',
      area: 'area',
      geo: 'geo', // geographical data
      kind: 'kind', // verb kind information
      derivtype: 'derivtype',
      stemtype: 'stemtype',
      morph: 'morph', // general morphological information
      var: 'var' // variance?
    }
  }

  static isAllowedType (value) {
    return Object.values(this.types).includes(`${value}`)
  }

  static get defaultSortOrder () {
    return 1
  }

  static get joinSeparator () {
    return ' '
  }

  static get defaultImporterName () {
    return 'default'
  }

  /**
   * Test to see if this feature allows unrestricted values.
   * @returns {boolean} true if unrestricted false if not.
   */
  get allowsUnrestrictedValues () {
    /*
    If `allowedValues` array is empty then there are no value restrictions
     */
    return this.allowedValues.length === 0
  }

  /**
   * Defines a sort order of feature values. Values are sorted according to their sort order
   * (a number starting from one). If several values have the same sort order, they will be
   * sorted alphabetically according to their values.
   * Sort order is deterministic.
   */
  sort () {
    this._data.sort((a, b) => a.sortOrder !== b.sortOrder ? b.sortOrder - a.sortOrder : a.value.localeCompare(b.value))
  }

  /**
   * Compares a feature's values to another feature's values for sorting
   * @param {Feature} otherFeature the feature to compare this feature's values to
   * @return {integer} >=1 if this feature should be sorted first, 0 if they are equal and -1 if this feature should be sorted second
   */
  compareTo (otherFeature) {
    // the data values are sorted upon construction and insertion so we only should need to look at the first values
    // feature sortOrders are descending (i.e. 5 sorts higher than 1)
    return otherFeature._data[0].sortOrder - this._data[0].sortOrder
  }

  get items () {
    return this._data
  }

  /**
   * Returns a single value string. If feature has a single value, this value will be returned.
   * If it has multiple values, those values will be concatenated with a default separator and
   * returned in a single string. Values composing this string are sorted according
   * to each value's sort order.
   * @return {string} A single value string.
   */
  get value () {
    return this.values.join(this.constructor.joinSeparator)
  }

  /**
   * Returns an array of string values of a feature, sorted according to each item's sort order.
   * If a feature contains a single feature, an array with one value will be returned.
   * @return {string[]} An array of string values.
   */
  get values () {
    return this._data.map(v => v.value)
  }

  /**
   * Retrieves a value object by name. Can be used to update a value object directly.
   * @param {string} featureVale - A feature value of an object to retrieve.
   */
  getValue (featureVale) {
    return this._data.find(v => v.value === featureVale)
  }

  /**
   * Returns a number of feature values.
   * @retrun {number] A quantity of feature values
   */
  get valQty () {
    return this._data.length
  }

  get isEmpty () {
    return this.valQty === 0
  }

  get isSingle () {
    return this.valQty === 1
  }

  get isMultiple () {
    return this.valQty > 1
  }

  /**
   * A string representation of a feature.
   * @return {string}
   */
  toString () {
    return this.value
  }

  /**
   * Examines the feature for a specific value.
   * @param {string} value
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasValue (value) {
    return this.values.includes(value)
  }

  /**
   * Checks if this feature has all value from an array.
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasValues (values) {
    let hasValues = true
    for (let value of values) {
      hasValues = hasValues && this.hasValue(value)
    }
    return hasValues
  }

  /**
   * Checks if this feature has some value from an array.
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasSomeValues (values) {
    let hasValues = false
    for (let value of values) {
      hasValues = hasValues || this.hasValue(value)
    }
    return hasValues
  }

  get valuesUnrestricted () {
    return this.allowedValues.length === 0
  }

  /**
   * Two features are considered fully equal if they are of the same type, have the same language,
   * and the same set of feature values in the same order.
   * @param {Feature} feature - A GrmFtr object this feature should be compared with.
   * @return {boolean} True if features are equal, false otherwise.
   */
  isEqual (feature) {
    return this.type === feature.type &&
      LanguageModelFactory.compareLanguages(this.languageID, feature.languageID) &&
      this.value === feature.value
  }

  /**
   * Adds a single new value to the existing feature object.
   * This function is chainable.
   * @param {string} value - A feature value.
   * @param {number} sortOrder - A sort order.
   * @return {Feature} - Self reference for chaining.
   */
  addValue (value, sortOrder = this.constructor.defaultSortOrder) {
    if (!this.hasValue(value)) {
      this._data.push({
        value: value,
        sortOrder: sortOrder
      })
      this.sort() // Resort an array to place an inserted value to the proper place
    } else {
      console.warn(`Value "${value}" already exists. If you want to change it, use "getValue" to access it directly.`)
    }
    return this
  }

  /**
   * Adds multiple new values to the existing feature object.
   * This function is chainable.
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations.
   * @return {Feature} - Self reference for chaining.
   */
  addValues (data) {
    let normalizedData = this.constructor.dataValuesFromInput(data)
    let values = normalizedData.map(v => v.value)
    if (!this.hasSomeValues(values)) {
      this._data = this._data.concat(normalizedData)
      this.sort() // Resort an array to place an inserted value to the proper place
    } else {
      console.warn(`One or several values from "${values}" already exist. If you want to change it, use "getValue" to access a value directly.`)
    }
    return this
  }

  /**
   * Removes a single value from the existing feature object.
   * @param value
   */
  removeValue (value) {
    // TODO: Do we need it?
    console.warn(`This feature is not implemented yet`)
  }

  /**
   * Creates a new single value Feature object of the same type and same language,
   * but with a different feature value.
   * This can be used when one feature defines a type and it is necessary
   * to create other items of the same type.
   * @param {string} value - A value of a feature.
   * @param {number} sortOrder.
   * @return {Feature} A new Ftr object.
   */
  createFeature (value, sortOrder = this.constructor.defaultSortOrder) {
    // TODO: Add a check of if the value exists in a source Feature object
    return new Feature(this.type, [[value, sortOrder]], this.languageID, this.sortOrder, this.allowedValues)
  }

  /**
   * Creates a multiple value Feature object of the same type and same language,
   * but with a different feature values.
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations,
   * formatted according to rules described in a Ftr constructor.
   * @return {Feature} A new Ftr object.
   */
  createFeatures (data) {
    return new Feature(this.type, data, this.languageID, this.sortOrder, this.allowedValues)
  }

  /**
   * Creates an array of Feature objects where each Feature object is matching one feature value
   * form the values of this object.
   * Useful when the current objects is a type feature and it is necessary to create an array
   * of Feature objects for the type from it.
   * @return {Feature[]} - An array of Feature objects. Each object represents one feature value
   * from the current object.
   */
  get ownFeatures () {
    return this.values.map(v => new Feature(this.type, v, this.languageID, 1, this.allowedValues))
  }

  /**
   * Create a copy of the feature object.
   */
  getCopy () {
    let values = this._data.map(item => [item.value, item.sortOrder])
    return new Feature(this.type, values, this.languageID, this.sortOrder, this.allowedValues.slice())
  }

  /**
   * A locale-specific abbreviation for a feature's values.
   * @return {string[]}
   */
  toLocaleStringAbbr (lang = 'en') {
    return this.values.map(v => i18n.i18n[lang][v] ? i18n.i18n[lang][v].abbr : v).join(this.constructor.joinSeparator)
  }

  /**
   * Adds an importer to the internal list.
   * @param {string} name - A name of an importer.
   * @param {FeatureImporter} importer - A `FeatureImporter` object.
   */
  addImporter (importer = new FeatureImporter(), name = this.constructor.defaultImporterName) {
    if (!this.importers) {
      this.importers = new Map()
    }
    this.importers.set(name, importer)
    return importer
  }

  getImporter (name = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(name)) {
      throw new Error(`Importer "${name}" does not exist`)
    }
    return this.importers.get(name)
  }

  /**
   * Adds feature values from the imported values.
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @return {Feature} - A new Ftr object.
   */
  addFromImporter (foreignData, name = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(name)) {
      throw new Error(`Importer "${name}" does not exist`)
    }
    const importer = this.importers.get(name)
    foreignData = this.constructor.dataValuesFromInput(foreignData)
    this._data.push(...foreignData.map(fv => { return { value: importer.get(fv.value), sortOrder: fv.sortOrder } }))
    this.sort()
    return this
  }

  /**
   * Creates a new feature of the same type and with the same language from the imported values.
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @return {Feature} - A new Ftr object.
   */
  createFromImporter (foreignData, name = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(name)) {
      throw new Error(`Importer "${name}" does not exist`)
    }
    const importer = this.importers.get(name)
    if (!Array.isArray(foreignData)) {
      foreignData = [foreignData]
    }
    let values = foreignData.map(fv => importer.get(fv))
    /*
    Some values may be mapped into multiple values. For them an importer will return an array of values instead of a single value.
    The values will be a multidimensional array that will require flattening.
     */
    values = values.reduce((acc, cv) => acc.concat(cv), [])
    return new Feature(this.type, values, this.languageID, this.sortOrder, this.allowedValues)
  }
}
