import * as Styles from '../styles/styles'
import NarrowViewGroup from './narrow-view-group'

/**
 * A representation of a table that is shown on narrow screens (mobile devices).
 */
export default class NarrowView {
  /**
   * Initializes a narrow view.
   * @param {number} groupQty - A number of visible groups (sub tables) within a narrow view.
   * @param {Column[]} columns - Table columns.
   * @param {Row[]} rows - Table rows.
   * @param {Row[]} headers - Table headers.
   * @param {number} titleColumnQty - Number of title columns in a table.
   */
  constructor (groupQty, columns, rows, headers, titleColumnQty) {
    this.columns = columns
    this.rows = rows
    this.headers = headers
    this.titleColumnQty = titleColumnQty
    this.groups = []
    this.groupQty = groupQty
    this.groupSize = 0
    if (groupQty) {
      this.groupSize = this.columns.length / groupQty
    }

    this.nodes = document.createElement('div')
    this.nodes.classList.add(Styles.classNames.narrowViewsContainer)

    for (let [index, headerCell] of this.headers[0].cells.entries()) {
      this.createGroup(index, headerCell)
    }
  }

  /**
   * Creates a group within a table.
   * @returns {NarrowViewGroup} A newly created group.
   */
  createGroup (index, headerCell) {
    let group = new NarrowViewGroup(index, this.headers, this.rows, this.titleColumnQty)
    this.nodes.appendChild(group.nodes)
    this.groups.push(group)
  }

  /**
   * Generates an HTML representation of a view.
   * @returns {HTMLElement} - HTML representation of a view.
   */
  render () {
    for (let group of this.groups) {
      group.render()
    }
    return this.nodes
  }
}
