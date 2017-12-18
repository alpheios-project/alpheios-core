import * as Styles from '../styles/styles'

/**
 * Represents a list of footnotes.
 */
export default class Footnotes {
  /**
   * Initialises a Footnotes object.
   * @param {Footnote[]} footnotes - An array of footnote objects.
   */
  constructor (footnotes) {
    this.footnotes = footnotes

    this.nodes = document.createElement('dl')
    this.nodes.id = Styles.footnotes.id
    this.nodes.classList.add(Styles.classNames.footnotesContainer)
    for (let footnote of footnotes) {
      let index = document.createElement('dt')
      index.innerHTML = footnote.index
      this.nodes.appendChild(index)
      let text = document.createElement('dd')
      text.innerHTML = footnote.text
      this.nodes.appendChild(text)
    }
  }

  /**
   * Returns an HTML representation of a Footnotes object.
   * @returns {HTMLElement} An HTML representation of a Footnotes object.
   */
  get html () {
    return this.nodes
  }
}
