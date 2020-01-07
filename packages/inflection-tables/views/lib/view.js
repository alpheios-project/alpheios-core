import { Feature, Inflection, Homonym, LanguageModelFactory } from 'alpheios-data-models'
import LDF from '../../lib/language-dataset-factory.js'
import WideView from './wide-view'
import Form from '@lib/form.js'
import uuidv4 from 'uuid/v4'

/**
 * Represents a single view.
 */
export default class View {
  /**
   * Initializes a View object with options. There is at least one view per part of speech,
   * but there could be several views for the same part of speech that show different table representation of a view.
   * @param {Homonym} homonym - A homonym
   * @param {InflectionSet} inflectionSet - An inflection data object.
   */
  constructor (homonym, inflectionSet) {
    this.homonym = homonym
    this.inflectionData = inflectionSet
    this.pageHeader = {}
    // A view can be rendered for different parts of speech. This is a part of speech this view currently uses
    this.partOfSpeech = this.constructor.mainPartOfSpeech

    // An HTML element where this view is rendered
    this.container = undefined

    /**
     * A view ID that is unique not only for each view class, but also for each view instance.
     * @type {string}
     */
    this.uid = uuidv4()

    // The following three props must be implemented by descendant classes.
    /**
     * A unique ID of a view class. Can be used as a value in view selectors.
     * Should consist of lowercase letters, numbers, and underscores only.
     * @type {string}
     */
    this.id = 'base_view'
    this.name = 'base view'
    this.title = 'Base View'

    // Indicates whether this view has a pre-rendered table, such as in case with Greek paradigms
    this.hasPrerenderedTables = this.constructor.hasPrerenderedTables

    if (!this.constructor.hasPrerenderedTables) {
      this.isImplemented = this.inflectionData.isImplemented
    } else {
      this.isImplemented = true
    }

    this.forms = new Set()
    this.table = {
      options: {}
    }
    this.wideView = new WideView()

    /**
     * Whether this view has any credits
     * @type {boolean}
     */
    this.hasCredits = false
    /**
     * A text of a credits string
     * @type {string}
     */
    this.creditsText = ''

    /**
     * An array of views that should be shown below the current view by the UI component.
     * It is view's responsibility to create and initialize them.
     * @type {View[]}
     */
    this.linkedViews = []

    this.isRendered = false
  }

  static get viewID () {
    return 'base_view'
  }

  /**
   * Defines a language ID of a view. Should be redefined in child classes.
   * @return {symbol}
   */
  static get languageID () {
    return Symbol('Undefined language')
  }

  /**
   * Defines one or several parts of speech of a view.
   * These are parts of speech for which a view will be rendered.
   * Should be redefined in child classes.
   * @return {string[] | []} A list of part of speech names.
   * An empty array if not defined.
   */
  static get partsOfSpeech () {
    return []
  }

  /**
   * Returns a main part of speech of a view: a part of speech for which this view is defined.
   * It is always the first view in parts of speech array. If no parts of speech defined,
   * returns an empty string.
   * @return {string} A main part of speech name. An empty string in not defined.
   */
  static get mainPartOfSpeech () {
    return this.partsOfSpeech.length > 0 ? this.partsOfSpeech[0] : ''
  }

  /**
   * Returns a language dataset for a view data.
   * @return {LanguageDataset}
   */
  static get dataset () {
    // Every view should have its own dataset property.
    // But if it is not defined explicitly then this would be used.
    // At this case we get the first defined dataset in all datasets defined for the language (by default).
    return LDF.getDatasets(this.languageID)[0]
  }

  static get model () {
    return LanguageModelFactory.getLanguageModel(this.languageID)
  }

  static get datasetConsts () {
    return this.dataset.constructor.constants
  }

  /**
   * Defines an inflection type (Suffix/Form) of a view. Should be redefined in child classes.
   * @return {Suffix|Form|Paradigm|undefined}
   */
  static get inflectionType () {
  }

  static get hasPrerenderedTables () {
    // Usually views do not have pre-rendered tables
    return false
  }

  /**
   * Checks wither an inflection table has any data.
   * If view has no pre-rendered tables, a presence of table object with correct row items is checked.
   * @return {boolean} True if table has no inflection data, false otherwise.
   */
  get isEmpty () {
    return !this.hasPrerenderedTables && (!this.table || !this.table.rows || this.table.rows.length === 0)
  }

  /**
   * Sets a title of a view.
   * This method is chainable.
   * @param {string} title - A title to set.
   * @return {View} A view instance (for chaining).
   */
  setTitle (title) {
    this.title = title
    return this
  }

  sameAs (view) {
    return this.id === view.id
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view has the same language as homonym
   * and homonym's inflections has at least one with a part of speech that matches view
   * @param {symbol} languageID - A language ID of an inflection data
   * @param {Inflection[]} inflections - An array of inflections
   * @return {boolean}
   */
  static matchFilter (languageID, inflections) {
    // return (this.languageID === inflection.languageID && this.partsOfSpeech.includes(inflection[Feature.types.part].value))
    // Disable multiple parts of speech for now
    return (this.languageID === languageID && inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech))
  }

  /**
   * test to see if a view is enabled for a specific inflection
   * @param {Inflection[]} inflection
   * @return {boolean} true if the view should be shown false if not
   */
  static enabledForInflection (inflection) {
    // default returns true
    return true
  }

  /**
   * Checks whether this view can be and needs to be rendered (i.e. construct inflection table structures).
   * Views that don't need to be rendered are the ones that are not implemented and the ones tha have
   * tables already pre-rendered (i.e. Greek paradigm tables that are stored in JSON files).
   * @return {boolean}
   */
  get isRenderable () {
    return this.isImplemented && !this.hasPrerenderedTables
  }

  /**
   * Whether this inflection table can be expanded or collapsed.
   * It usually can't if it has no suffix no matches.
   * In this cause, a full table will always be shown.
   * @return {boolean}
   */
  get canCollapse () {
    return !this.hasPrerenderedTables && this.table.canCollapse
  }

  /**
   * Renders an inflection table view. Done once per view.
   * @param {Object} options - Render options
   */
  render (options = {
    emptyColumnsHidden: true,
    noSuffixMatchesHidden: true
  }) {
    if (!this.isRendered && this.isRenderable) {
      this.footnotes = this.getFootnotes()
      this.table.messages = this.messages
      this.morphemes = this.getMorphemes()

      this.table.construct(this.morphemes, options)
      this.wideView.render(this.table)

      // Render linked views (if any)
      for (const view of this.linkedViews) {
        view.render()
      }
      this.isRendered = true
    }
    return this
  }

  /**
   * A compatibility function to get morphemes, either suffixes or forms, depending on the view type.
   * By default, it returns suffixes
   */
  getMorphemes () {
    return this.inflectionData.types.has(this.constructor.inflectionType)
      ? this.inflectionData.types.get(this.constructor.inflectionType).items
      : []
  }

  /**
   * A compatibility function to get footnotes for either suffixes or forms, depending on the view type
   */
  getFootnotes () {
    return this.inflectionData.types.has(this.constructor.inflectionType)
      ? this.inflectionData.types.get(this.constructor.inflectionType).footnotesMap
      : new Map()
  }

  get isEmptyColumnsHidden () {
    return this.table.options.emptyColumnsHidden
  }

  /**
   * Hide or show column groups with no morphemes depending on the `value`.
   * @param {boolean} value - Whether to hide or show column groups with no morphemes.
   *                  true - hide groups with no morphemes in them;
   *                  false - show groups with no morphemes in them.
   */
  emptyColumnsHidden (value) {
    // Pre-rendered tables cannot collapse and expand
    if (!this.hasPrerenderedTables && this.table.options.emptyColumnsHidden !== value) {
      // If settings were actually changed
      if (value) {
        this.table.hideEmptyColumns()
      } else {
        this.table.showEmptyColumns()
      }
    }
    return this
  }

  get isNoSuffixMatchesGroupsHidden () {
    return this.table.options.noSuffixMatchesHidden
  }

  /**
   * Hide or show column groups with no morpheme matches depending on the `value`.
   * @param {boolean} value - Whether to hide or show groups with not suffix matches.
   *                  true - hide groups with no suffix matches;
   *                  false - show groups with no suffix matches.
   */
  noSuffixMatchesGroupsHidden (value) {
    // Pre-rendered tables cannot collapse and expand
    if (!this.hasPrerenderedTables && this.table.options.noSuffixMatchesHidden !== value) {
      // If settings were actually changed
      if (value) {
        if (this.table.canCollapse) {
          this.table.hideNoSuffixMatchesGroups()
        }
      } else {
        this.table.showNoSuffixMatchesGroups()
      }
    }
    return this
  }

  highlightRowAndColumn (cell) {
    cell.highlightRowAndColumn()
  }

  /**
   * A utility function to convert a string to a Sentence case.
   * @param {string} string - A source string.
   * @return {string} A string capitalized to a Sentence case.
   */
  static toSentenceCase (string) {
    string = string.toLowerCase()
    return string[0].toUpperCase() + string.substr(1)
  }

  /**
   * A utility function to convert a string to a Title Case.
   * @param {string} string - A source string.
   * @return {string} A string capitalized to a Title Case.
   */
  static toTitleCase (string) {
    return string
      .toLowerCase()
      .split(' ')
      .map(word => word.length >= 1 ? `${word[0].toUpperCase()}${word.substr(1)}` : '')
      .join(' ')
  }

  /**
   * Return inflection that this view will use to retrieve inflection data.
   * @param {Inflection[]} inflections
   * @return {Inflection[]}
   */
  static getRelatedInflections (inflections) {
    return inflections.filter(i => i[Feature.types.part].value === this.mainPartOfSpeech)
  }

  static getInflectionsData (homonym, options) {
    // Select inflections this view needs
    return this.dataset.createInflectionSet(this.mainPartOfSpeech, this.getRelatedInflections(homonym.inflections), options)
  }

  /**
   * Finds out what views match inflection data and return initialized instances of those views.
   * By default only one instance of the view is returned, by views can override this method
   * to return multiple views if necessary (e.g. paradigm view can return multiple instances of the view
   * with different data).
   * @param {Inflection} homonym - An inflection for which matching instances to be found.
   * @return {View[] | []} Array of view instances or an empty array if view instance does not match inflection data.
   */
  static getMatchingInstances (homonym) {
    if (this.matchFilter(homonym.languageID, homonym.inflections)) {
      const inflectionData = this.getInflectionsData(homonym)

      if (inflectionData.types.has(this.inflectionType)) {
        // There is some inflection data found for the view's morpheme type
        const view = new this(homonym, inflectionData)
        return [view]
      }
    }
    return []
  }

  static createStandardFormHomonym (options) {
    if (this.inflectionType === Form && !options.form) {
      throw new Error(`Obligatory options property, "form", is missing`)
    }
    const stem = options.form ? options.form : 'stem'
    const suffix = options.suffix ? options.suffix : 'suffix'
    let inflection = new Inflection(stem, this.languageID, suffix)
    inflection.addFeature(new Feature(Feature.types.part, this.mainPartOfSpeech, this.languageID))
    const homonym = Homonym.createSimpleForm(stem, this.languageID, [inflection])
    inflection = this.dataset.setInflectionData(inflection, homonym.lexemes[0].lemma)
    return homonym
  }

  static getStandardFormInstance (options) {
    const homonym = this.createStandardFormHomonym(options)
    const inflectionData = this.getInflectionsData(homonym, { findMatches: false })
    // Standard form tables should have no suffix matches columns visible
    let view = new this(homonym, inflectionData) // eslint-disable-line prefer-const
    if (options.title) {
      view.setTitle(options.title)
    }
    return view
  }
}
