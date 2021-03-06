/**
 * A cell that specifies a title for a row in an inflection table.
 */
export default class RowTitleCell {
  /**
   * Initializes a row title cell.
   * @param {string} featureValue - A text that will be shown within the cell.
   * @param {GroupFeatureType} groupingFeature - A grouping feature that specifies a row for which a title cell
   * is created.
   * @param {number} nvGroupQty - A number of narrow view groups. Because each group will be shown separately
   * and will have its own title cells, we need to create a copy of a title cell for each such group.
   */
  constructor (featureValue, groupingFeature, nvGroupQty) {
    this.parent = undefined
    this.title = groupingFeature.getTitle(featureValue)
    this.feature = groupingFeature
    this.nvGroupQty = nvGroupQty
    this.span = 1
    this.formsColumn = this.feature.formsColumn
    this.fullWidth = this.feature.hasFullWidthRowTitle
    this.titleColumnsQuantity = this.feature.groupFeatureList.titleColumnsQuantity

    this.value = this.title

    if (this.feature.formsColumn && this.feature.groupFeatureList.titleColumnsQuantity > 1) {
      this.span = this.titleColumnsQuantity
    }
  }

  /**
   * Same as `placeholder`, but generates a cell in Vue.js style
   * @param {number} width - How many columns this cell should span
   * @return {Object}
   */
  /**
  * Generates an empty cell placeholder of a certain width. Useful for situation when empty title cells need to be
  * inserted into a table structure (i.e. when title cells occupy multiple columns).
  * @param {number} span - A number of columns a placeholder cell would occupy.
  * @returns {Object}
   */
  static placeholder (span = 1) {
    return {
      value: '', // This cell is empty
      span: span
    }
  }

  /**
   * Some table layouts require multiple title cells to be shown for a row. These could be, for example, a title
   * cell for a parent category that will follow a title cell for a category that defines a row. In such situation a
   * title cell will have a parent, which will represent a parent cell object.
   * This function returns an array of title cells for a row, starting from the topmost parent and moving down
   * tot the current title cell.
   * @returns {RowTitleCell[]} An array of title row cells representing a title cell hierarchy list.
   */
  get hierarchyList () {
    let parentCells = []
    if (this.parent) {
      parentCells = this.parent.hierarchyList
    }
    return parentCells.concat(this)
  }

  /**
   * Highlights this row title cell
   */
  highlight () {
    this.highlighted = true
  }

  /**
   * Removes highlighting from this row title cell
   */
  clearHighlighting () {
    this.highlighted = false
  }
}
