import * as Styles from '../styles/styles'

/**
 * A cell that specifies a title for a row in an inflection table.
 */
export default class RowTitleCell {
  /**
   * Initializes a row title cell.
   * @param {string} title - A text that will be shown within the cell.
   * @param {GroupFeatureType} groupingFeature - A grouping feature that specifies a row for which a title cell
   * is created.
   * @param {number} nvGroupQty - A number of narrow view groups. Because each group will be shown separately
   * and will have its own title cells, we need to create a copy of a title cell for each such group.
   */
  constructor (title, groupingFeature, nvGroupQty) {
    this.parent = undefined
    this.title = title
    this.feature = groupingFeature
    this.nvGroupQty = nvGroupQty

    this.render()
  }

  /**
   * Renders an element's HTML representation.
   */
  render () {
    // Generate HTML representation for a wide view node
    this.wNode = document.createElement('div')
    this.wNode.classList.add(Styles.classNames.cell)
    if (this.feature.formsColumn) {
      this.wNode.classList.add(Styles.classNames.header)
    }
    if (this.feature.hasFullWidthRowTitle) {
      // This cell is taking an entire row
      this.wNode.classList.add(Styles.classNames.fullWidth)
    }
    if (this.feature.formsColumn && this.feature.groupFeatureList.titleColumnsQuantity > 1) {
      this.wNode.classList.add(Styles.classNames.widthPrefix + this.feature.groupFeatureList.titleColumnsQuantity)
    }
    this.wNode.innerHTML = this.title

    // Copy HTML representation to all narrow view nodes (each narrow view group has its own node)
    this.nNodes = [] // Narrow nodes, one for each group
    for (let i = 0; i < this.nvGroupQty; i++) {
      this.nNodes.push(this.wNode.cloneNode(true))
    }
  }

  /**
   * Returns an HTML element for a wide view
   * @returns {HTMLElement} HTML element for a wide view's cell.
   */
  get wvNode () {
    return this.wNode
  }

  /**
   * Returns an array HTML element for narrow view groups
   * @returns {HTMLElement[]} Array of HTML elements for narrow view group's cells.
   */
  getNvNode (index) {
    return this.nNodes[index]
  }

  /**
   * Generates an empty cell placeholder of a certain width. Useful for situation when empty title cells need to be
   * inserted into a table structure (i.e. when title cells occupy multiple columns.
   * @param {number} width - A number of columns placeholder cell will occupy.
   * @returns {HTMLElement} HTML element of a placeholder cell.
   */
  static placeholder (width = 1) {
    let placeholder = document.createElement('div')
    placeholder.classList.add(Styles.classNames.cell, Styles.classNames.widthPrefix + width)
    return placeholder
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
    this.wNode.classList.add(Styles.classNames.highlight)
    for (let nNode of this.nNodes) {
      nNode.classList.add(Styles.classNames.highlight)
    }
  }

  /**
   * Removes highlighting from this row title cell
   */
  clearHighlighting () {
    this.wNode.classList.remove(Styles.classNames.highlight)
    for (let nNode of this.nNodes) {
      nNode.classList.remove(Styles.classNames.highlight)
    }
  }
}
