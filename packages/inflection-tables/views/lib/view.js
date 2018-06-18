import { LanguageModelFactory } from 'alpheios-data-models'
import uuidv4 from 'uuid/v4'
import L10n from '../../l10n/l10n.js'

/**
 * Represents a single view.
 */
export default class View {
  /**
   * Initializes a View object with options. There is at least one view per part of speech,
   * but there could be several views for the same part of speech that show different table representation of a view.
   * @param {InflectionData} inflectionData - An inflection data object.
   * @param {string} locale - A locale for serving localized messages. If none provided, a default language will be used.
   */
  constructor (inflectionData, locale = L10n.defaultLocale) {
    this.languageID = View.languageID
    this.inflectionData = inflectionData
    this.messages = L10n.getMessages(locale)
    this.pageHeader = {}

    // An HTML element where this view is rendered
    this.container = undefined

    // Must be implemented in a descendant
    this.id = uuidv4() // A unique ID of a view instance. Can be used as a value in view selectors.
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

  /**
   * Defines a language ID of a view. Should be redefined in child classes.
   * @return {symbol}
   */
  static get languageID () {
    return Symbol('Undefined language')
  }

  /**
   * Defines a part of speech of a view. Should be redefined in child classes.
   * @return {string | undefined}
   */
  static get partOfSpeech () {
  }

  /**
   * Defines an inflection type (Suffix/Form) of a view. Should be redefined in child classes.
   * @return {Function | undefined}
   */
  static get inflectionType () {
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (inflectionData) {
    if (LanguageModelFactory.compareLanguages(View.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(View.partOfSpeech) && View.enabledForLexemes(inflectionData.homonym.lexemes)
    }
  }

  /**
   * Finds out what views match inflection data and return initialized instances of those views.
   * By default only one instance of the view is returned, by views can override this method
   * to return multiple views if necessary (e.g. paradigm view can return multiple instances of the view
   * with different data).
   * @param {InflectionData} inflectionData
   * @param {MessageBundle} messages
   * @return {View[] | []} Array of view instances or an empty array if view instance does not match inflection data.
   */
  static getMatchingInstances (inflectionData, messages) {
    if (this.matchFilter(inflectionData)) {
      return [new this(inflectionData, messages)]
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
    this.footnotes = this.getFootnotes(this.inflectionData)
    // Table is already created during a view construction
    this.table.messages = this.messages
    for (let lexeme of this.inflectionData.homonym.lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection['part of speech'].values.includes(this.constructor.partOfSpeech)) {
          this.forms.add(inflection.form)
        }
      }
    }
    this.table.construct(this.constructor.getMorphemes(this.inflectionData)).constructViews().addEventListeners()
    return this
  }

  /**
   * A compatibility function to get morphemes, either suffixes or forms, depending on the view type.
   * By default, it returns suffixes
   * @param {InflectionData} inflectionData
   */
  static getMorphemes (inflectionData) {
    return inflectionData.pos.get(this.partOfSpeech).types.get(this.inflectionType).items
  }

  /**
   * A compatibility function to get footnotes for either suffixes or forms, depending on the view type
   * @param {InflectionData} inflectionData
   */
  getFootnotes (inflectionData) {
    return inflectionData.pos.get(this.constructor.partOfSpeech).types.get(this.constructor.inflectionType).footnotesMap
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
}
