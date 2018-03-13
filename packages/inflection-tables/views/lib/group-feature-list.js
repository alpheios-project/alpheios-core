import { FeatureList } from 'alpheios-data-models'

/**
 * Holds a list of all grouping features of a table.
 */
export default class GroupFeatureList extends FeatureList {
  /**
   * Initializes object with an array of grouping feature objects.
   * @param {GroupFeatureType[]} features - An array of features that form a table.
   * An order of features defines in what order a table tree would be built.
   */
  constructor (features) {
    super(features)
    this._columnFeatures = [] // Features that group cells into columns
    this._rowFeatures = [] // Features that group cells into rows

    this.forEach((feature) => { feature.groupFeatureList = this })
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

  /**
   * Returns a last column feature item.
   * @returns {GroupFeatureType} A last column feature.
   */
  get lastColumnFeature () {
    if (this._columnFeatures && this._columnFeatures.length) {
      return this._columnFeatures[this._columnFeatures.length - 1]
    }
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
   * @param {Feature[] | GroupingFeature[]} features - What features form rows and what order
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
   * Returns a first row feature item.
   * @returns {GroupFeatureType} A fist row feature.
   */
  get firstRowFeature () {
    if (this._rowFeatures && this._rowFeatures.length) {
      return this._rowFeatures[0]
    }
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

  /**
   * Defines what are the titles of suffix cell rows within a table body.
   * The number of such items defines how many left-side title columns this table would have (default is one).
   * Full width titles (see below) does not need to be specified here.
   * @param {Feature | GroupingFeature} features - What suffix row titles this table would have.
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
