import * as Styles from '../styles/styles'
import RowTitleCell from './row-title-cell'

/**
 * A representation of a table that is shown on wide screens (desktops).
 */
export default class WideView {
  /**
   * Initializes a wide view.
   * @param {Column[]} columns - Table columns.
   * @param {Row[]} rows - Table rows.
   * @param {Row[]} headers - Table headers.
   * @param {number} titleColumnQty - Number of title columns in a table.
   */
  constructor (columns, rows, headers, titleColumnQty) {
    this.columns = columns
    this.rows = rows
    this.headers = headers
    this.titleColumnQty = titleColumnQty
    this.nodes = document.createElement('div')
    this.nodes.classList.add(Styles.classNames.inflectionTable, Styles.classNames.wideView)
  }

  /**
   * Calculates a number of visible columns in this view.
   * @returns {number} A number of visible columns.
   */
  get visibleColumnQty () {
    let qty = 0
    for (let column of this.columns) {
      if (!column.hidden) {
        qty++
      }
    }
    return qty
  }

  /**
   * Renders an HTML representation of a wide table view.
   * @returns {HTMLElement} A rendered HTML Element.
   */
  render () {
    // Remove any previously inserted nodes
    this.nodes.innerHTML = ''

    for (let row of this.headers) {
      this.nodes.appendChild(row.titleCell.wvNode)
      for (let cell of row.cells) {
        this.nodes.appendChild(cell.wvNode)
      }
    }

    for (let row of this.rows) {
      let titleCells = row.titleCell.hierarchyList
      if (titleCells.length < this.titleColumnQty) {
        this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length))
      }
      for (let titleCell of titleCells) {
        this.nodes.appendChild(titleCell.wvNode)
      }

      for (let cell of row.cells) {
        this.nodes.appendChild(cell.wvNode)
      }
    }
    this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', ' +
      Styles.wideView.column.width + Styles.wideView.column.unit + ')'

    return this.nodes
  }
}
