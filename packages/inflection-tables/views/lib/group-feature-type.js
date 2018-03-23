import { Feature, FeatureType } from 'alpheios-data-models'
import RowTitleCell from './row-title-cell'

// TODO: Rebase on Feature instead of FeatureType
/**
 * This is a wrapper around a FeatureType object. When a Table object creates a
 * hierarchical tree of suffixes, it uses grammatical features as tree nodes.
 * GroupFeatureType extends a Feature object so that it'll be able to store additional information
 * that is required for that.
 */
export default class GroupFeatureType extends FeatureType {
  /**
   * GroupFeatureType extends FeatureType to serve as a grouping feature (i.e. a feature that forms
   * either a column or a row in an inflection table). For that, it adds some additional functionality,
   * such as custom feature orders that will allow to combine suffixes from several grammatical features
   * (i.e. masculine and feminine) into a one column of a table.
   * @param {Feature} feature - A feature that defines a type of this item.
   * @param {string} titleMessageID - A message ID of a title, used to get a formatted title from a
   * language-specific message bundle.
   * @param {string[]} order - A custom sort order for this feature that redefines
   * a default one stored in FeatureType object (optional).
   * Use this parameter to redefine a default sort order for a type.
   */
  constructor (feature, titleMessageID, order = feature.values) {
    super(feature.type, order, feature.languageID)

    this.groupTitle = titleMessageID
    this._groupType = undefined

    this.groupFeatureList = undefined

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
   * Converts a list of Feature objects into a list of strings that represent their values. Keeps tha original
   * array structure intact (work with up two two array levels).
   * @param {Feature[] | Feature[][]} features - An array of feature objects.
   * @return {string[] | strings[][]} A matching array of strings with feature values.
   */
  static featuresToValues (features) {
    return features.map((feature) => {
      if (Array.isArray(feature)) {
        return feature.map((feature) => feature.value)
      } else {
        return feature.value
      }
    })
  }

  /**
   * This is a wrapper around orderedFeatures() that allows to set a custom feature order for particular columns.
   * @returns {Feature[] | Feature[][]} A sorted array of feature values.
   */
  getOrderedFeatures (ancestorFeatures) {
    return this.getOrderedValues(ancestorFeatures).map((value) => new Feature(this.type, value, this.languageID))
  }

  /**
   * This is a wrapper around orderedValues() that allows to set a custom feature order for particular columns.
   * By default it returns features in the same order that is defined in a base FeatureType class.
   * Redefine it to provide a custom grouping and sort order.
   * @returns {string[] | string[][]} A sorted array of feature values.
   */
  getOrderedValues (ancestorFeatures) {
    return this._orderIndex
  }

  /**
   * Returns a column or row title for a value of a feature provided.
   * Redefine it if you want to display custom titles instead of feature values.
   * @param {Feature} featureValue - A feature object containing a feature value
   * @return {string} - A row or column title for a table
   */
  getTitle (featureValue) {
    if (this.hasOwnProperty(featureValue)) {
      if (Array.isArray(this[featureValue])) {
        return this[featureValue].map((feature) => feature.value).join('/')
      } else {
        return this[featureValue].value
      }
    } else {
      return 'not available'
    }
  }

  /**
   * Returns true if an ending grammatical feature defined by featureType has a value that is listed in a featureValues array.
   * This function is used with Array.prototype.filter().
   * If you want to provide a custom grouping for any particular feature type, redefine this function
   * to implement a custom grouping logic.
   * @param {string | string[]} featureValues - a list of possible values of a type specified by featureType that
   * this ending should have.
   * @param {Suffix} suffix - an ending we need to filter out.
   * @returns {boolean} True if suffix has a value of a grammatical feature specified.
   */
  filter (featureValues, suffix) {
    // If not an array, convert it to array for uniformity
    if (!Array.isArray(featureValues)) {
      featureValues = [featureValues]
    }
    for (const value of featureValues) {
      if (suffix.features[this.type] === value) {
        return true
      }
    }

    return false
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
    return this.orderedValues.length
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
   * Creates a title cell for a feature from the current group.
   * @param {string} title - A text that will be shown within a cell.
   * @param {number} nvGroupQty - A number of narrow view groups.
   * @returns {RowTitleCell} A created RowTitleCell object.
   */
  createTitleCell (title, nvGroupQty) {
    return new RowTitleCell(title, this, nvGroupQty)
  }
}
