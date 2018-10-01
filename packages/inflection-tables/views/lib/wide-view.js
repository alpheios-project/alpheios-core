import RowTitleCell from './row-title-cell'

/**
 * A representation of a table that is shown on wide screens (desktops).
 */
export default class WideView {
  /**
   * Initializes a wide view.
   */
  constructor () {
    this.rows = [] // To store rows of view's inflection table

    // Wither this view is collapsed in a UI component
    this.collapsed = false
  }

  /**
   * Calculates a number of visible columns in this view.
   * @returns {number} A number of visible columns.
   */
  get visibleColumnQty () {
    let qty = 0
    for (let column of this.table.columns) {
      if (!column.hidden) {
        qty++
      }
    }
    return qty
  }

  get titleColumnQty () {
    return this.table.titleColumnQty
  }

  /**
   * Renders a table in a size suitable for Vue.js display
   * @param {Table} table - An inflection table object.
   * @return {{rows: Array}}
   */
  render (table) {
    this.rows = []
    this.table = table
    for (let row of table.headers) {
      let cells = []
      cells.push(row.titleCell)
      for (let cell of row.cells) {
        cells.push(cell)
      }
      this.rows.push({ cells: cells })
    }

    for (let row of table.rows) {
      let cells = []
      let titleCells = row.titleCell.hierarchyList
      if (titleCells.length < this.table.titleColumnQty) {
        cells.push(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length))
      }
      for (let titleCell of titleCells) {
        cells.push(titleCell)
      }

      for (let cell of row.cells) {
        cells.push(cell)
      }
      this.rows.push({ cells: cells })
    }
  }
}
