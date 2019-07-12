import { LanguageModelFactory } from 'alpheios-data-models'
import LDF from '@lib/language-dataset-factory.js'
import Morpheme from '@lib/morpheme.js'
import RowTitleCell from './row-title-cell.js'
import HeaderCell from './header-cell.js'

// TODO: Rebase on Feature instead of FeatureType
/**
 * This is a wrapper around a FeatureType object. When a Table object creates a
 * hierarchical tree of suffixes, it uses grammatical features as tree nodes.
 * GroupFeatureType extends a Feature object so that it'll be able to store additional information
 * that is required for that.
 */
export default class GroupFeatureType {
  /**
   * GroupFeatureType extends FeatureType to serve as a grouping feature (i.e. a feature that forms
   * either a column or a row in an inflection table). For that, it adds some additional functionality,
   * such as custom feature orders that will allow to combine suffixes from several grammatical features
   * (i.e. masculine and feminine) into a one column of a table.
   * @param {string} type - A type of a feature.
   * @param {symbol} languageID - A language ID.
   * @param {string} titleMessageID - A message ID of a title, used to get a formatted title from a
   * language-specific message bundle.
   * @param {Feature[]} features - A list of feature values for this type (i.e. gender, declension, etc.).
   * @param {Morpheme.comparisonTypes} comparisonType - What matching algorithm to use (exact or partial).
   * Each feature value is stored in a Feature object.
   */
  constructor (type, languageID, titleMessageID, features, comparisonType = Morpheme.comparisonTypes.EXACT) {
    this.type = type
    this.languageID = languageID
    this.featureMap = new Map(features.map(f => [f.value, f]))
    this.comparisonType = comparisonType
    this.dataset = LDF.getDataset(this.languageID)

    this.groupTitle = titleMessageID
    this._groupType = undefined

    // Properties below are required to store information during tree creation
    this.subgroups = [] // Each value of the feature
    this.cells = [] // All cells within this group and below
    this.parent = undefined
    this.header = undefined

    this._formsColumn = false
    this._formsRow = false
    this.hasColumnRowTitle = false // Whether this feature has a title of a suffix row in the left-side column.
    this.hasFullWidthRowTitle = false // Whether this feature has a title of suffix rows that spans the whole table width.
  }

  /**
   * Creates an instance of GroupFeatureType from a type feature of a language
   * @param {string} type - A type of a feature.
   * @param {symbol} languageID - A language ID
   * @param {string} titleMessageID - A message ID of a title, used to get a formatted title from a
   * language-specific message bundle.
   * @return {GroupFeatureType} A newly created GroupFeatureType object.
   */
  static createFromType (type, languageID, titleMessageID) {
    return new GroupFeatureType(type, languageID, titleMessageID,
      LanguageModelFactory.getLanguageModel(languageID).typeFeature(type).ownFeatures
    )
  }

  /**
   * Creates an instance of GroupFeatureType of the same type and with same feature set as the current one.
   * Used when it is required to obtain a copy and modify certain characteristics of it
   * so that the original won't be affected by the change.
   * This function does not create a full copy of a GroupFeatureType object. It creates an object with only
   * those properties that will be required during a view definition.
   * @return {GroupFeatureType} - A new object with same type and same features as the current one.
   */
  createOfSameType () {
    return this.constructor.createFromType(this.type, this.languageID, this.groupTitle)
  }

  addFeature (key, values) {
    const typeFeature = LanguageModelFactory.getLanguageModel(this.languageID).typeFeature(this.type)
    const newFeature = typeFeature.createFeatures(values)
    this.featureMap.set(key, newFeature)
  }

  /**
   * This is a wrapper around orderedFeatures() that allows to set a custom feature order for particular columns.
   * @param {Feature[]|[]} ancestorFeatures - An array of features in an inflection table tree before the current feature.
   * A feature with the highest index in the array is the closest to the current one. The feature with zero index
   * is the most far away. Ancestor features array is empty if the current feature is the first one in the list.
   * @returns {Feature[] | Feature[][]} A sorted array of feature values.
   */
  getOrderedFeatures (ancestorFeatures = []) {
    return Array.from(this.featureMap.values())
    // return this.getOrderedValues(ancestorFeatures).map((value) => new Feature(this.type, value, this.languageID))
  }

  /**
   * This is a wrapper around orderedValues() that allows to set a custom feature order for particular columns.
   * By default it returns features in the same order that is defined in a base FeatureType class.
   * Redefine it to provide a custom grouping and sort order.
   * @returns {string[] | string[][]} A sorted array of feature values.
   */
  /* getOrderedValues (ancestorFeatures) {
    return this._orderIndex
  } */

  /**
   * Returns a column or row title for a value of a feature provided.
   * Redefine it if you want to display custom titles instead of feature values.
   * @param {string} featureValue - A value of a Feature object
   * @return {string} - A row or column title for a table
   */
  getTitle (featureValue) {
    if (this.featureMap.has(featureValue)) {
      return this.featureMap.get(featureValue).value
    } else {
      // Pass through for texts that are not feature values
      return featureValue
    }
  }

  /**
   * Whether this feature forms a columns group.
   * @returns {boolean} True if this feature forms a column.
   */
  get formsColumn () {
    return this._formsColumn
  }

  /**
   * Sets that this feature would form a column.
   * @param {boolean} value
   */
  set formsColumn (value) {
    this._formsColumn = value
    this._formsRow = !value // Can't do both
  }

  /**
   * Whether this feature forms a row group.
   * @returns {boolean} True if this feature forms a row.
   */
  get formsRow () {
    return this._formsRow
  }

  /**
   * Sets that this feature would form a row.
   * @param {boolean} value
   */
  set formsRow (value) {
    this._formsRow = value
    this._formsColumn = !value // Can't do both
  }

  /**
   * How many groups this feature would form.
   * @returns {Number} A number of groupes formed by this feature.
   */
  get size () {
    return this.featureMap.size
  }

  /**
   * Checks if two grouping features are of the same type.
   * @param {GroupFeatureType} groupingFeature - A grouping feature to compare with the current one.
   * @returns {boolean} True if grouping features are of the same type.
   */
  isSameType (groupingFeature) {
    return this.type === groupingFeature.type
  }

  /**
   * Creates a row title cell for a feature from the current group.
   * @param {string} value - A text that will be shown within a cell.
   * @param {number} nvGroupQty - A number of narrow view groups.
   * @returns {RowTitleCell} A created RowTitleCell object.
   */
  createRowTitleCell (value, nvGroupQty) {
    return new RowTitleCell(value, this, nvGroupQty)
  }

  createHeaderCell (value, columnSpan) {
    return new HeaderCell(value, this, columnSpan)
  }
}
