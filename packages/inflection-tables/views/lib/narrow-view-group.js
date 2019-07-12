import * as Styles from '../styles/styles'
import Row from './row'
import RowTitleCell from './row-title-cell'

/**
 * Represents a group within a narrow view. A narrow view is split into separate sub tables
 * by values of a first grammatical feature that forms columns. Then each sub table would contain
 * a suffixes that belong to that grammatical feature value only. Each sub table becomes a
 * separated object and can be reflown on devices with narrow screens.
 */
export default class NarrowViewGroup {
  // TODO: Review constructor parameters

  /**
   * Initializes a narrow view group. Please note that column, rows, and headers are those of a whole table,
   * not of this particular group. NarrowViewGroup constructor will use this data to build
   * the corresponding objects of the group itself.
   * @param {number} index - An index of this group within a groups array, starting from zero.
   * @param {Row[]} headers - Table headers.
   * @param {Row[]} rows - Table rows.
   * @param {number} titleColumnQty - Number of title columns in a table.
   */
  constructor (index, headers, rows, titleColumnQty) {
    this.index = index
    this.columns = headers[0].cells[index].columns
    this.groupSize = this.columns.length
    const columnsStartIndex = this.columns[0].index
    const columnsEndIndex = this.columns[this.columns.length - 1].index

    this.rows = []
    for (const row of rows) {
      this.rows.push(row.slice(columnsStartIndex, columnsEndIndex + 1))
    }
    this.headers = []
    /**
     * Since we group by the first column feature, there will be a single feature in a first header row,
     * its children in the second row, children of its children in a third row and so on.
     */
    for (const [headerIndex, headerRow] of headers.entries()) {
      const row = new Row()
      row.titleCell = headerRow.titleCell
      if (headerIndex === 0) {
        row.cells.push(headerRow.cells[index])
      } else {
        for (const headerCell of this.headers[headerIndex - 1].cells) {
          row.cells = row.cells.concat(headerCell.children)
        }
      }
      this.headers.push(row)
    }
    this.titleColumnQty = titleColumnQty

    this.nodes = document.createElement('div')
    this.nodes.classList.add(Styles.classNames.inflectionTable, Styles.classNames.narrowView)
  }

  /**
   * Calculates a number of visible columns in this view.
   * @returns {number} A number of visible columns.
   */
  get visibleColumnQty () {
    let qty = 0
    for (const column of this.columns) {
      if (!column.hidden) {
        qty++
      }
    }
    return qty
  }

  /**
   * Renders an HTML representation of a narrow view group.
   */
  render () {
    this.nodes.innerHTML = ''

    if (this.visibleColumnQty) {
      // This group is visible
      for (const headerRow of this.headers) {
        this.nodes.appendChild(headerRow.titleCell.getNvNode(this.index))
        for (const headerCell of headerRow.cells) {
          this.nodes.appendChild(headerCell.nvNode)
        }
      }

      for (const row of this.rows) {
        const titleCells = row.titleCell.hierarchyList
        if (titleCells.length < this.titleColumnQty) {
          this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length))
        }
        for (const titleCell of titleCells) {
          this.nodes.appendChild(titleCell.getNvNode(this.index))
        }

        for (const cell of row.cells) {
          this.nodes.appendChild(cell.nvNode)
        }
      }
      this.nodes.classList.remove(Styles.classNames.hidden)
      this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', ' +
        Styles.narrowView.column.width + Styles.narrowView.column.unit + ')'
      this.nodes.style.width = (this.visibleColumnQty + this.titleColumnQty) * Styles.narrowView.column.width +
        Styles.narrowView.column.unit
    } else {
      // This group is hidden
      this.nodes.classList.add(Styles.classNames.hidden)
    }
  }
}
