import { Feature, FeatureList } from 'alpheios-data-models'
import GroupFeatureType from './group-feature-type.js'

/**
 * Holds a list of all grouping features of a table.
 */
export default class GroupFeatureList extends FeatureList {
  /**
   * Initializes object with an array of grouping feature objects.
   * @param {Feature[]} features - An array of features that form a table.
   * An order of features defines in what order a table tree would be built.
   */
  constructor (features) {
    super(features)
    this._columnFeatures = [] // Features that group cells into columns
    this._rowFeatures = [] // Features that group cells into rows

    this.forEach((feature) => { feature.groupFeatureList = this })

    // Data column represents a single column that holds data values in tables that has no features that form columns.
    this._dataColFeature = null
  }

  /**
   * Whether a list has any column features
   * @return {boolean} True if list has any column features, false otherwise
   */
  get hasColumnFeatures () {
    return this._columnFeatures.length > 0
  }

  /**
   * Return a list of all grouping features that form columns.
   * @returns {GroupFeatureType[]} - An array of grouping features.
   */
  get columnFeatures () {
    return this._columnFeatures
  }

  /**
   * Defines what features form columns. An order of items specifies an order in which columns be shown.
   * @param {Feature[] | GroupingFeature[]} features - What features form columns and what order
   * these columns would follow.
   */
  set columns (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type)
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.formsColumn = true
      this._columnFeatures.push(matchingFeature)
    }
  }

  /**
   * Returns a first column feature item.
   * @returns {GroupFeatureType} A fist column feature.
   */
  get firstColumnFeature () {
    if (this._columnFeatures && this._columnFeatures.length) {
      return this._columnFeatures[0]
    }
  }

  isFirstColumnFeature (groupFeature) {
    return groupFeature.isSameType(this.firstColumnFeature)
  }

  /**
   * Returns a last column feature item.
   * @returns {GroupFeatureType} A last column feature.
   */
  get lastColumnFeature () {
    if (this._columnFeatures && this._columnFeatures.length) {
      return this._columnFeatures[this._columnFeatures.length - 1]
    }
  }

  isLastColumnFeature (groupFeature) {
    return groupFeature.isSameType(this.lastColumnFeature)
  }

  /**
   * Return a list of all grouping features that form rows.
   * @returns {GroupFeatureType[]} - An array of grouping rows.
   */
  get rowFeatures () {
    return this._rowFeatures
  }

  /**
   * Defines what features form rows. An order of items specifies an order in which columns be shown.
   * @param {Feature[] | GroupFeatureType[]} features - What features form rows and what order
   * these rows would follow.
   */
  set rows (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type)
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.formsRow = true
      this._rowFeatures.push(matchingFeature)
    }
    return this
  }

  /**
   * Some tables has no features that form columns. In order to show them properly
   * we need to create a single data column that will hold data values.
   * @return {GroupFeatureType} - A data column feature.
   */
  createDataColumn () {
    // Need to use a known type to pass a type check
    let feature = new Feature('word', 'empty value', Symbol('data column language'))
    feature.type = 'data column type' // To bypass a type check
    this._dataColFeature = new GroupFeatureType('data column type', Symbol('data column language'), '', [feature])
    this._dataColFeature.dataColumn = true
    // this._columnFeatures.push(groupFeature)
    return this._dataColFeature
  }

  /**
   * Checks whether this table has a data column
   * @return {boolean} True if data column exist, false otherwise.
   */
  get hasDataColumn () {
    return Boolean(this._dataColFeature)
  }

  /**
   * Get feature from a certain position. Will ignore data columns.
   * @param {number} position - Position of a feature, starting from zero.
   * @return {GroupFeatureType | null} A feature element or null if not found.
   */
  getFeature (position) {
    if (position < this._features.length) {
      return this._features[position]
    } else {
      console.warn(`Attempting to get feature that is out of bounds, position ${position}`)
      return null
    }
  }

  /**
   * Get feature from a certain position, including data column.
   * @param {number} position - Position of a feature, starting from zero.
   * @return {GroupFeatureType | null} A feature element or null if not found.
   */
  getGroupingFeature (position) {
    if (this.hasDataColumn) {
      if (position === 0) {
        return this._dataColFeature
      } else if (position <= this._features.length) {
        return this._features[position - 1]
      }
    } else {
      return this.getFeature(position)
    }
  }

  /**
   * Returns a first row feature item.
   * @returns {GroupFeatureType} A fist row feature.
   */
  get firstRowFeature () {
    if (this._rowFeatures && this._rowFeatures.length) {
      return this._rowFeatures[0]
    }
  }

  isFirstRowFeature (groupFeature) {
    return groupFeature.isSameType(this.firstRowFeature)
  }

  /**
   * Returns a last row feature item.
   * @returns {GroupFeatureType} A last row feature.
   */
  get lastRowFeature () {
    if (this._rowFeatures && this._rowFeatures.length) {
      return this._rowFeatures[this._rowFeatures.length - 1]
    }
  }

  isLastRowFeature (groupFeature) {
    return groupFeature.isSameType(this.lastRowFeature)
  }

  /**
   * Defines what are the titles of suffix cell rows within a table body.
   * The number of such items defines how many left-side title columns this table would have (default is one).
   * Full width titles (see below) does not need to be specified here.
   * @param {Feature | GroupFeatureType} features - What suffix row titles this table would have.
   */
  set columnRowTitles (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type)
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.hasColumnRowTitle = true
    }
  }

  /**
   * In inflection tables, titles of features are usually located in left-side columns. However, some titles that
   * group several rows together may span the whole table width. This setters defines
   * what those features are.
   * @param {Feature | GroupingFeature} features - What feature titles would take a whole row
   */
  set fullWidthRowTitles (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type)
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.hasFullWidthRowTitle = true
    }
  }

  /**
   * Returns a quantity of grouping features.
   * @returns {number} - A number of grouping features.
   */
  get length () {
    return this._features.length
  }

  /**
   * Calculate a number of title columns.
   * @returns {number} A number of title columns.
   */
  get titleColumnsQuantity () {
    let quantity = 0
    for (let feature of this._features) {
      if (feature.hasColumnRowTitle) {
        quantity++
      }
    }
    return quantity
  }
}
