import { Feature, Inflection, Homonym, LanguageModelFactory } from 'alpheios-data-models'
import LDF from '../../lib/language-dataset-factory.js'
import L10n from '../../l10n/l10n.js'

/**
 * Represents a single view.
 */
export default class View {
  /**
   * Initializes a View object with options. There is at least one view per part of speech,
   * but there could be several views for the same part of speech that show different table representation of a view.
   * @param {Homonym} homonym - A homonym
   * @param {InflectionSet} inflectionSet - An inflection data object.
   * @param {string} locale - A locale for serving localized messages. If none provided, a default language will be used.
   */
  constructor (homonym, inflectionSet, locale = L10n.defaultLocale) {
    this.homonym = homonym
    this.inflectionData = inflectionSet
    this.messages = L10n.getMessages(locale)
    this.pageHeader = {}
    // A view can be rendered for different parts of speech. This is a part of speech this view currently uses
    this.partOfSpeech = this.constructor.mainPartOfSpeech

    // An HTML element where this view is rendered
    this.container = undefined

    // Must be implemented in a descendant

    // A unique ID of a view instance. Can be used as a value in view selectors. Should consist of lowercase letters,
    // numbers, and underscores only.
    this.id = 'base_view'
    this.name = 'base view'
    this.title = 'Base View'
    this.hasComponentData = false // True if vue supports Vue.js components

    this.forms = new Set()
    this.table = {}

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
   * Returns a dataset for a view data
   * @return {LanguageDataset}
   */
  static get dataset () {
    return LDF.getDataset(this.languageID)
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

  sameAs (view) {
    return this.id === view.id
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view has the same language as homonym
   * and homonym's inflections has at least one with a part of speech that matches view
   * @param homonym
   * @return {boolean}
   */
  static matchFilter (homonym) {
    // return (this.languageID === inflection.languageID && this.partsOfSpeech.includes(inflection[Feature.types.part].value))
    // Disable multiple parts of speech for now
    return (this.languageID === homonym.languageID && homonym.inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech))
  }

  /**
   * Finds out what views match inflection data and return initialized instances of those views.
   * By default only one instance of the view is returned, by views can override this method
   * to return multiple views if necessary (e.g. paradigm view can return multiple instances of the view
   * with different data).
   * @param {Inflection} homonym - An inflection for which matching instances to be found.
   * @param {MessageBundle} messages
   * @return {View[] | []} Array of view instances or an empty array if view instance does not match inflection data.
   */
  static getMatchingInstances (homonym, messages) {
    if (this.matchFilter(homonym)) {
      let inflectionData = this.getInflectionsData(homonym)
      return [new this(homonym, inflectionData, messages)]
    }
    return []
  }

  /**
   * test to see if a view is enabled for a specific set of lexemes
   * @param {Lexeme[]} lexemes
   * @return {boolean} true if the view should be shown false if not
   */
  static enabledForLexemes (lexemes) {
    // default returns true
    return true
  }

  get locale () {
    return this.messages.locale
  }

  setLocale (locale) {
    if (this.locale !== locale) {
      this.messages = L10n.getMessages(locale)
    }
    return this
  }

  /**
   * Converts an InflectionData, returned from an inflection tables library, into an HTML representation of an inflection table.
   * `messages` provides a translation for view's texts.
   */
  render () {
    this.footnotes = this.getFootnotes()
    this.table.messages = this.messages
    this.morphemes = this.getMorphemes()
    this.table.construct(this.morphemes).constructViews().addEventListeners()
    this.table.wideView.render() // This is a compatibility code that is required to render HTML nodes
    this.wideTable = this.table.wideView.renderTable()
    return this
  }

  static getInflectionsData (homonym) {
    // Select inflections this view needs
    let inflections = homonym.inflections.filter(i => i[Feature.types.part].value === this.mainPartOfSpeech)
    return this.dataset.createInflectionSet(this.mainPartOfSpeech, inflections)
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
    if (this.table.canCollapse) {
      this.table.hideNoSuffixGroups()
    }
    return this
  }

  /**
   * Displays previously hidden groups with no suffix matches.
   */
  showNoSuffixGroups () {
    this.table.showNoSuffixGroups()
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

  static createStandardFormHomonym () {
    let inflection = new Inflection('standard form stem', this.languageID, 'standard form suffix')
    inflection.addFeature(new Feature(Feature.types.part, this.mainPartOfSpeech, this.languageID))
    let homonym = Homonym.createSimpleForm('standard form word', this.languageID, [inflection])
    inflection = this.dataset.setInflectionData(inflection, homonym.lexemes[0].lemma)
    return homonym
  }

  static getStandardFormInstance (formID, messages) {
    let homonym = this.createStandardFormHomonym()
    let inflectionData = this.getInflectionsData(homonym)
    // TODO: Find the best way to pass messages (the last argument)
    return new this(homonym, inflectionData, messages).render()
  }
}
