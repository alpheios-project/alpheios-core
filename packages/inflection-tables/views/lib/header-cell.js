/**
 * A cell in a header row, a column title cell.
 */
export default class HeaderCell {
  /**
   * Initializes a header cell.
   * @param {string} featureValue - A title text that will be shown in the header cell.
   * @param {GroupFeatureType} groupingFeature - A feature that defines one or several columns this header forms.
   * @param {number} [span=1] - How many columns in a table this header cell forms.
   */
  constructor (featureValue, groupingFeature, span = 1) {
    this.feature = groupingFeature
    this.title = groupingFeature.getTitle(featureValue)
    this.span = span

    this.parent = undefined
    this.children = []
    this.columns = []

    this.value = this.title
  }

  /**
   * Registers a column that's being formed by this header cell. Adds column to itself and to its parent(s).
   * @param {Column} column - A column that is formed by this header cell.
   */
  addColumn (column) {
    this.columns = this.columns.concat([column])

    if (this.parent) {
      this.parent.addColumn(column)
    }
  }

  /**
   * Temporary changes a width of a header cell. This happens when one or several columns
   * that this header forms are hidden or shown.
   * @param value
   */
  changeSpan (value) {
    this.span += value
  }

  /**
   * This function will notify all parents and children of a title column that some columns under this headers cell
   * changed their state (i.e. were hidden or shown). This way parents and children will be able to update their
   * states accordingly.
   */
  columnStateChange () {
    let visibleColumns = 0
    for (let column of this.columns) {
      if (!column.hidden) {
        visibleColumns++
      }
    }
    if (this.span !== visibleColumns) {
      // Number of visible columns has been changed
      let change = visibleColumns - this.span
      this.changeSpan(change)

      // Notify parents and children
      if (this.children.length) {
        for (let child of this.children) {
          child.columnStateChange()
        }
      }
      if (this.parent) {
        this.parent.columnStateChange()
      }
    }
  }

  /**
   * Highlights a header cell, its parent and children
   */
  highlight () {
    if (!this.highlighted) {
      this.highlighted = true
      if (this.parent) {
        this.parent.highlight()
      }
    }
  }

  /**
   * Removes highlighting from a header cell, its parent and children
   */
  clearHighlighting () {
    if (this.highlighted) {
      this.highlighted = false
      if (this.parent) {
        this.parent.clearHighlighting()
      }
    }
  }
}
