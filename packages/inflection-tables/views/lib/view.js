/**
 * Represents a single view.
 */
export default class View {
  /**
   * Initializes a View object with options. There is at least one view per part of speech,
   * but there could be several views for the same part of speech that show different table representation of a view.
   * @param {Object} viewOptions
   */
  constructor () {
    // this.options = viewOptions;
    this.pageHeader = {}

    // An HTML element where this view is rendered
    this.container = undefined

    // Must be implemented in a descendant
    this.id = 'baseView'
    this.name = 'base view'
    this.title = 'Base View'
    this.language = undefined
    this.partOfSpeech = undefined
    this.table = {}
  }

  /**
   * Converts an InflectionData, returned from an inflection tables library, into an HTML representation of an inflection table.
   * `messages` provides a translation for view's texts.
   * @param {InflectionData} inflectionData - A result set from inflection tables library.
   * @param {MessageBundle} messages - A message bundle with message translations.
   */
  render (inflectionData, messages) {
    let selection = inflectionData[this.partOfSpeech]

    this.footnotes = new Map()
    if (selection.footnotes && Array.isArray(selection.footnotes)) {
      for (const footnote of selection.footnotes) {
        this.footnotes.set(footnote.index, footnote)
      }
    }

    // Table is created during view construction
    this.table.messages = messages
    this.table.construct(selection.suffixes).constructViews().addEventListeners()
    return this
  }

  get wideViewNodes () {
    return this.table.wideView.render()
  }

  get narrowViewNodes () {
    return this.table.narrowView.render()
  }

  /**
   * Hides all empty columns of the view.
   */
  hideEmptyColumns () {
    this.table.hideEmptyColumns()
    return this
  }

  /**
   * Displays all previously hidden columns.
   */
  showEmptyColumns () {
    this.table.showEmptyColumns()
    return this
  }

  /**
   * Hides groups (formed by first column feature) that have no suffix matches.
   */
  hideNoSuffixGroups () {
    this.table.hideNoSuffixGroups()
    return this
  }

  /**
   * Displays previously hidden groups with no suffix matches.
   */
  showNoSuffixGroups () {
    this.table.showNoSuffixGroups()
    return this
  }
}
