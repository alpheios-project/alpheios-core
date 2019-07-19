/**
 * Represents a row of cells
 */
export default class Row {
  /**
   * Populates row with cells
   * @param {Cell[]} cells - Cells that belong to this row
   */
  constructor (cells = []) {
    this.cells = cells
    if (!cells) {
      this.cells = []
    }
    this.titleCell = undefined

    for (let cell of this.cells) { // eslint-disable-line prefer-const
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

  get empty () {
    return this.cells.filter(c => !c.empty).length === 0
  }

  /**
   * Cells are usually grouped into rows not by a single feature, but by combination of features.
   * In such situations, a row might have not one, but several title cells.
   * Those additional title cells will be stored in a `parent` property of each other.
   * However, all parent feature values will be shown only for the first row in a group
   * in the current table format. For other rows in a group parent values (the ones that are
   * the same within a group) will be omitted and only. They will display only those feature values
   * that are different between the rows in a group (i.e. the last grouping feature value).
   * Thus, the first row in a group will have a title cell value and its parent values set.
   * Other rows in a group will have only a title cell value set, but the parent value of it will be empty
   * (this will indicate that those parent values will not be shown for rows that are not first in a group).
   * This function checks if a current row is the first one in a group or not.
   * @return {boolean}
   */
  get firstInGroup () {
    return Boolean(this.titleCell && this.titleCell.parent)
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
    let slice = new Row() // eslint-disable-line prefer-const
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
    for (let cell of this.cells) { // eslint-disable-line prefer-const
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
    for (let cell of this.cells) { // eslint-disable-line prefer-const
      cell.clearHighlighting()
    }
    if (this.titleCell) {
      this.titleCell.clearHighlighting()
    }
  }
}
