import * as Styles from '../styles/styles'
import NarrowViewGroup from './narrow-view-group'

/**
 * A representation of a table that is shown on narrow screens (mobile devices).
 */
export default class NarrowView {
  /**
   * Initializes a narrow view.
   * @param {Table} table - An inflection table object.
   */
  constructor (table) {
    this.table = table
    this.groups = []
    this.groupSize = 0
    if (this.table.features.firstColumnFeature.size) {
      this.groupSize = this.table.columns.length / this.table.features.firstColumnFeature.size
    }

    this.nodes = document.createElement('div')
    this.nodes.classList.add(Styles.classNames.narrowViewsContainer)

    for (let [index, headerCell] of this.table.headers[0].cells.entries()) {
      this.createGroup(index, headerCell)
    }
  }

  /**
   * Creates a group within a table.
   * @returns {NarrowViewGroup} A newly created group.
   */
  createGroup (index) {
    let group = new NarrowViewGroup(index, this.table.headers, this.table.rows, this.table.titleColumnQty)
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
