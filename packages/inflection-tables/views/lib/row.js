/**
 * Represents a row of cells
 */
export default class Row {
  /**
   * Populates row with cells
   * @param {Cell[]} cells - Cells that belong to this row
   */
  constructor (cells) {
    this.cells = cells
    if (!cells) {
      this.cells = []
    }
    this.titleCell = undefined

    for (let cell of this.cells) {
      cell.row = this
    }
  }

  /**
   * Adds a cell to the row.
   * This is a chainable function.
   * @param {Cell} cell - A cell to be added to the row
   */
  add (cell) {
    cell.row = this
    this.cells.push(cell)
    return this
  }

  /**
   * Returns a number of cells in a row
   * @returns {Number} A number of cells in a row
   */
  get length () {
    return this.cells.length
  }

  /**
   * Returns a portion of a cells array starting from `from` item and up to, but not including, `upto` element.
   * It does not create new copies of cells to populate a newly created array; this array contains references to
   * the same cells that original Row refers to. It also does not update row reference within Cell objects.
   *
   * This function presents a way to create another structure of existing table's cells.
   * It can be useful for views that have a different structure (i.e. narrow view).
   * @param {number} from
   * @param {number} upto
   */
  slice (from, upto) {
    let slice = new Row()
    if (from < 0 && from > this.cells.length) {
      throw new Error('"from" parameter is out of range.')
    }
    if (upto < 0 && upto > this.cells.length) {
      throw new Error('"upto" parameter is out of range.')
    }
    for (let index = from; index < upto; index++) {
      slice.cells.push(this.cells[index])
    }
    slice.titleCell = this.titleCell
    return slice
  }

  /**
   * Highlights all cells in a row, and a title cells
   */
  highlight () {
    for (let cell of this.cells) {
      cell.highlight()
    }
    if (this.titleCell) {
      this.titleCell.highlight()
    }
  }

  /**
   * Removes highlighting from all cells in a row, and from a title cell
   */
  clearHighlighting () {
    for (let cell of this.cells) {
      cell.clearHighlighting()
    }
    if (this.titleCell) {
      this.titleCell.clearHighlighting()
    }
  }
}
