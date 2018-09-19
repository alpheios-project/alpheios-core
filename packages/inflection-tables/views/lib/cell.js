import * as Styles from '../styles/styles'

export default class Cell {
  /**
   * Creates a cell for an inflection table.
   * @param {Morpheme[]} morphemes - A list of morphemes that belongs to this cell.
   * @param {Feature[]} features - A list of features this cell corresponds to.
   */
  constructor (morphemes, features) {
    this.morphemes = morphemes
    if (!this.morphemes) {
      this.morphemes = []
    }
    this.features = features
    this.empty = (this.morphemes.length === 0)
    this.suffixMatches = !!this.morphemes.find(element => {
      if (element.match && element.match.suffixMatch) {
        return element.match.suffixMatch
      }
    })

    this.column = undefined // A column this cell belongs to
    this.row = undefined // A row this cell belongs to

    this._index = undefined

    this.render()
  }

  get isDataCell () {
    return true
  }

  /**
   * Renders an element's HTML representation.
   */
  render () {
    let element = document.createElement('div')
    element.classList.add(Styles.classNames.cell)
    for (let [index, morpheme] of this.morphemes.entries()) {
      // Render each morpheme
      let suffixElement = document.createElement('span')
      suffixElement.classList.add(Styles.classNames.suffix)
      if (morpheme.match && morpheme.match.suffixMatch) {
        suffixElement.classList.add(Styles.classNames.suffixMatch)
      }
      if (morpheme.match && morpheme.match.fullMatch) {
        suffixElement.classList.add(Styles.classNames.suffixFullFeatureMatch)
      }
      suffixElement.innerHTML = morpheme.value || '-'
      element.appendChild(suffixElement)

      if (morpheme.hasFootnotes) {
        let footnoteElement = document.createElement('a')
        footnoteElement.innerHTML = `<sup>${morpheme.footnote}</sup>`
        footnoteElement.dataset.footnote = morpheme.footnote
        element.appendChild(footnoteElement)
      }
      if (index < this.morphemes.length - 1) {
        element.appendChild(document.createTextNode(', ')) // 00A0 is a non-breaking space
      }
    }
    const morphologyMatch = this.morphemes.length > 0 && this.morphemes.every(m => m.match && m.match.morphologyMatch)

    this.value = element.innerHTML
    this.classes = {
      [Styles.classNames.cell]: true,
      [Styles.classNames.morphologyMatch]: morphologyMatch,
      [Styles.classNames.highlight]: false,
      [Styles.classNames.hidden]: false
    }
    this.wNode = element
    this.nNode = element.cloneNode(true)
  }

  /**
   * Returns an HTML element for a wide view.
   * @returns {HTMLElement}
   */
  get wvNode () {
    return this.wNode
  }

  /**
   * Returns an HTML element for a narrow view.
   * @returns {HTMLElement}
   */
  get nvNode () {
    return this.nNode
  }

  /**
   * Sets a unique index of the cell that can be used for cell identification via 'data-index' attribute.
   * @param {number} index - A unique cell index.
   */
  set index (index) {
    this._index = index
    this.wNode.dataset.index = this._index
    this.nNode.dataset.index = this._index
  }

  /**
   * A proxy for adding an event listener for both wide and narrow view HTML elements.
   * @param {string} type - Listener type.
   * @param {EventListener} listener - Event listener function.
   */
  addEventListener (type, listener) {
    this.wNode.addEventListener(type, listener)
    this.nNode.addEventListener(type, listener)
  }

  /**
   * Hides an element.
   */
  hide () {
    if (!this.wNode.classList.contains(Styles.classNames.hidden)) {
      this.classes[Styles.classNames.hidden] = true
      this.wNode.classList.add(Styles.classNames.hidden)
      this.nNode.classList.add(Styles.classNames.hidden)
    }
  }

  /**
   * Shows a previously hidden element.
   */
  show () {
    if (this.wNode.classList.contains(Styles.classNames.hidden)) {
      this.classes[Styles.classNames.hidden] = false
      this.wNode.classList.remove(Styles.classNames.hidden)
      this.nNode.classList.remove(Styles.classNames.hidden)
    }
  }

  /**
   * Highlights a cell with color.
   */
  highlight () {
    if (!this.wNode.classList.contains(Styles.classNames.highlight)) {
      this.classes[Styles.classNames.highlight] = true
      this.wNode.classList.add(Styles.classNames.highlight)
      this.nNode.classList.add(Styles.classNames.highlight)
    }
  }

  /**
   * Removes highlighting from a previously highlighted cell.
   */
  clearHighlighting () {
    if (this.wNode.classList.contains(Styles.classNames.highlight)) {
      this.classes[Styles.classNames.highlight] = false
      this.wNode.classList.remove(Styles.classNames.highlight)
      this.nNode.classList.remove(Styles.classNames.highlight)
    }
  }

  /**
   * Highlights a row and a column this cell belongs to.
   */
  highlightRowAndColumn () {
    if (!this.column) {
      throw new Error('Column is undefined.')
    }
    if (!this.row) {
      throw new Error('Row is undefined.')
    }
    this.column.highlight()
    this.row.highlight()
  }

  /**
   * Removes highlighting form a previously highlighted row and column.
   */
  clearRowAndColumnHighlighting () {
    if (!this.column) {
      throw new Error('Column is undefined.')
    }
    if (!this.row) {
      throw new Error('Row is undefined.')
    }
    this.column.clearHighlighting()
    this.row.clearHighlighting()
  }
}
