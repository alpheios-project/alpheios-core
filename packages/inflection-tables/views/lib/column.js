/**
 * Represent a column of cells in an inflection table.
 */
export default class Column {
  /**
   * Initializes column with a provided set of cells.
   * @param {Cell} cells - Cells that are within this column.
   */
  constructor (cells) {
    this.cells = cells
    if (!cells) {
      this.cells = []
    }
    this._headerCell = undefined
    this.hidden = false
    this.empty = this.cells.every(cell => cell.empty)
    this.suffixMatches = !!this.cells.find(cell => cell.suffixMatches)

    for (let cell of this.cells) {
      cell.column = this
    }
  }

  /**
   * Assigns a header cell to the column.
   * @param {HeaderCell} headerCell - A header cell of this column.
   */
  set headerCell (headerCell) {
    this._headerCell = headerCell
    headerCell.addColumn(this)
  }

  /**
   * Returns a number of cells within this column.
   * @returns {Number} A number of cells this column contains.
   */
  get length () {
    return this.cells.length
  }

  /**
   * Hides the column. Notifies a header about a state change.
   */
  hide () {
    if (!this.hidden) {
      this.hidden = true

      for (let cell of this.cells) {
        cell.hide()
      }
      if (this._headerCell) {
        this._headerCell.columnStateChange()
      }
    }
  }

  /**
   * Shows the column. Notifies a header about a state change.
   */
  show () {
    if (this.hidden) {
      this.hidden = false

      for (let cell of this.cells) {
        cell.show()
      }
      if (this._headerCell) {
        this._headerCell.columnStateChange()
      }
    }
  }

  /**
   * Highlights a column and its header.
   */
  highlight () {
    for (let cell of this.cells) {
      cell.highlight()
    }
    if (this._headerCell) {
      this._headerCell.highlight()
    }
  }

  /**
   * Removes highlighting from a column and its header.
   */
  clearHighlighting () {
    for (let cell of this.cells) {
      cell.clearHighlighting()
    }
    if (this._headerCell) {
      this._headerCell.clearHighlighting()
    }
  }
}
