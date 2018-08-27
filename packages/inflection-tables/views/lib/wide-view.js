import * as Styles from '../styles/styles'
import RowTitleCell from './row-title-cell'

/**
 * A representation of a table that is shown on wide screens (desktops).
 */
export default class WideView {
  /**
   * Initializes a wide view.
   * @param {Table} table - An inflection table object.
   */
  constructor (table) {
    this.table = table
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

  /**
   * Renders a table in a size suitable for Vue.js display
   * @return {{rows: Array}}
   */
  render () {
    this.rows = []
    for (let row of this.table.headers) {
      let cells = []
      cells.push(row.titleCell)
      for (let cell of row.cells) {
        cells.push(cell)
      }
      this.rows.push({cells: cells})
    }

    for (let row of this.table.rows) {
      let cells = []
      let titleCells = row.titleCell.hierarchyList
      if (titleCells.length < this.table.titleColumnQty) {
        cells.push(RowTitleCell.placeholderCell(this.titleColumnQty - titleCells.length))
      }
      for (let titleCell of titleCells) {
        cells.push(titleCell)
      }

      for (let cell of row.cells) {
        cells.push(cell)
      }
      this.rows.push({cells: cells})
    }
  }

  /**
   * Inline styles object to use with Vue.js components
   * @return {{gridTemplateColumns: string}}
   */
  get style () {
    return {
      gridTemplateColumns: `repeat(${this.visibleColumnQty + this.table.titleColumnQty}, ${Styles.wideView.column.width}${Styles.wideView.column.unit})`
    }
  }
}
