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
      return undefined
    })
    this.morphologyMatch = this.morphemes.length > 0 && this.morphemes.every(m => m.match && m.match.morphologyMatch)

    this.column = undefined // A column this cell belongs to
    this.row = undefined // A row this cell belongs to

    this._index = undefined
    this.hidden = false
    this.highlighted = false
  }

  get isDataCell () {
    return true
  }

  /**
   * Sets a unique index of the cell that can be used for cell identification via 'data-index' attribute.
   * @param {number} index - A unique cell index.
   */
  set index (index) {
    this._index = index
  }

  /**
   * Hides an element.
   */
  hide () {
    this.hidden = true
  }

  /**
   * Shows a previously hidden element.
   */
  show () {
    this.hidden = false
  }

  /**
   * Highlights a cell with color.
   */
  highlight () {
    this.highlighted = true
  }

  /**
   * Removes highlighting from a previously highlighted cell.
   */
  clearHighlighting () {
    this.highlighted = false
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
