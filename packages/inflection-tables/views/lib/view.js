import * as Styles from '../styles/styles'
import Footnotes from './footnotes'

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
  }

  /**
   * Converts a WordData, returned from inflection tables library, into an HTML representation of an inflection table
   * and inserts that HTML into a `container` HTML element. `messages` provides a translation for view's texts.
   * @param {HTMLElement} container - An HTML element where this view will be inserted.
   * @param {InflectionData} wordData - A result set from inflection tables library.
   * @param {MessageBundle} messages - A message bundle with message translations.
   */
  render (container, wordData, messages) {
    'use strict'

    this.messages = messages
    this.container = container
    this.inflectionData = wordData
    let selection = wordData[this.partOfSpeech]

    this.footnotes = new Footnotes(selection.footnotes)

    // this.table = new Table(selection.suffixes, this.groupingFeatures, messages);
    // this.table = new Table();
    // this.setTableData();
    this.table.messages = messages
    this.table.construct(selection.suffixes).constructViews()
    this.display()
  }

  /**
   * Renders a view's HTML representation and inserts it into `container` HTML element.
   */
  display () {
    // Clear the container
    this.container.innerHTML = ''

    let title = document.createElement('h3')
    title.innerHTML = this.title
    this.container.appendChild(title)

    this.pageHeader = {nodes: document.createElement('div')}
    this.pageHeader.nodes.innerHTML = Styles.pageHeader.html
    this.pageHeader.hideEmptyColumnsBtn = this.pageHeader.nodes.querySelector(Styles.pageHeader.hideEmptyColumnsBtnSel)
    this.pageHeader.showEmptyColumnsBtn = this.pageHeader.nodes.querySelector(Styles.pageHeader.showEmptyColumnsBtnSel)
    this.pageHeader.hideNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(Styles.pageHeader.hideNoSuffixGroupsBtnSel)
    this.pageHeader.showNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(Styles.pageHeader.showNoSuffixGroupsBtnSel)
    this.container.appendChild(this.pageHeader.nodes)

    // Insert a wide view
    this.container.appendChild(this.table.wideView.render())
    // Insert narrow views
    this.container.appendChild(this.table.narrowView.render())

    this.table.addEventListeners()

    this.container.appendChild(this.footnotes.html)

    this.pageHeader.hideEmptyColumnsBtn.addEventListener('click', this.hideEmptyColumns.bind(this))
    this.pageHeader.showEmptyColumnsBtn.addEventListener('click', this.showEmptyColumns.bind(this))

    this.pageHeader.hideNoSuffixGroupsBtn.addEventListener('click', this.hideNoSuffixGroups.bind(this))
    this.pageHeader.showNoSuffixGroupsBtn.addEventListener('click', this.showNoSuffixGroups.bind(this))
  }

  /**
   * Hides all empty columns of the view.
   */
  hideEmptyColumns () {
    this.table.hideEmptyColumns()
    this.display()
    this.pageHeader.hideEmptyColumnsBtn.classList.add(Styles.classNames.hidden)
    this.pageHeader.showEmptyColumnsBtn.classList.remove(Styles.classNames.hidden)
  }

  /**
   * Displays all previously hidden columns.
   */
  showEmptyColumns () {
    this.table.showEmptyColumns()
    this.display()
    this.pageHeader.showEmptyColumnsBtn.classList.add(Styles.classNames.hidden)
    this.pageHeader.hideEmptyColumnsBtn.classList.remove(Styles.classNames.hidden)
  }

  /**
   * Hides groups (formed by first column feature) that have no suffix matches.
   */
  hideNoSuffixGroups () {
    this.table.hideNoSuffixGroups()
    this.display()
    this.pageHeader.hideNoSuffixGroupsBtn.classList.add(Styles.classNames.hidden)
    this.pageHeader.showNoSuffixGroupsBtn.classList.remove(Styles.classNames.hidden)
  }

  /**
   * Displays previously hidden groups with no suffix matches.
   */
  showNoSuffixGroups () {
    this.table.showNoSuffixGroups()
    this.display()
    this.pageHeader.hideNoSuffixGroupsBtn.classList.add(Styles.classNames.hidden)
    this.pageHeader.showNoSuffixGroupsBtn.classList.remove(Styles.classNames.hidden)
  }
}
