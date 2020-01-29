import { Constants, Feature } from 'alpheios-data-models'
import Paradigm from '@/paradigm/lib/paradigm.js'
import View from '@views/lib/view.js'
import GreekView from '@views/lang/greek/greek-view.js'

import LDF from '@lib/language-dataset-factory.js'

/**
 * This is a base class for all pronoun views. This class should not be used to create tables. Its purpose
 * is to define common features and properties for all pronoun classes.
 */
export default class GreekVerbParadigmView extends GreekView {
  /**
   * @param {Paradigm} paradigm
   * @param {Homonym} homonym
   * @param {InflectionData} inflectionData
   */
  constructor (paradigm, homonym, inflectionData) {
    super(homonym, inflectionData)
    this.id = paradigm.id
    this.name = paradigm.title.toLowerCase()
    this.title = paradigm.title
    this.paradigm = paradigm
    this.featureTypes = {}

    this.wideTable = this.paradigm.table
    this.wideSubTables = this.paradigm.subTables
    this.wideView = this.wideTable // For compatibility with non-prerendered tables

    /**
     * Whether there are any linked paradigms for this view
     * @type {boolean}
     */
    this.hasSuppParadigms = this.paradigm.hasSuppParadigms

    /**
     * An array of linked paradigms
     * @type {Paradigm[]}
     */
    this.suppParadigms = this.paradigm.suppParadigmList

    /**
     * Linked paradigms in a map
     * @type {Map<{string}, paradigmID, {Paradigm}, paradigm>}
     */
    this.suppParadigmsMap = this.paradigm.suppParadigmsMap

    this.hasCredits = this.paradigm.hasCredits
    this.creditsText = this.paradigm.creditsText

    this.fullMatchDefined = false
  }

  static get dataset () {
    return LDF.getDataset(this.languageID, 'GreekParadigmDataset')
  }

  static get viewID () {
    return 'greek_verb_paradigm_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB]
  }

  static get inflectionType () {
    return Paradigm
  }

  static get hasPrerenderedTables () {
    return true
  }

  /**
   * What classes of pronouns this view should be used with.
   * Should be defined in descendants.
   * @return {string[]} Array of class names
   */
  static get classes () {
    return []
  }

  static getID (grammarClass) {
    return `${grammarClass}${View.toTitleCase(GreekVerbParadigmView.mainPartOfSpeech)}Paradigm`
  }

  static getName (grammarClass) {
    return `${grammarClass} ${GreekVerbParadigmView.mainPartOfSpeech} paradigm`
  }

  static getTitle (grammarClass) {
    return View.toTitleCase(`${grammarClass} ${GreekVerbParadigmView.mainPartOfSpeech} Paradigm`).trim()
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param {symbol} languageID
   * @param {Inflection[]} inflections
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (languageID, inflections, inflectionData) {
    return (this.languageID === languageID &&
      inflections.some(i => i[Feature.types.part] && i[Feature.types.part].value === this.mainPartOfSpeech)) &&
      inflectionData.types.has(this.inflectionType)
  }

  static getMatchingInstances (homonym) {
    const inflectionData = this.getInflectionsData(homonym)
    if (this.matchFilter(homonym.languageID, homonym.inflections, inflectionData)) {
      const paradigms = inflectionData.types.get(this.inflectionType).items
      return paradigms.map(paradigm => new this(paradigm, homonym, inflectionData))
    }
    return []
  }

  render (options) {
    // Do nothing as there is no need to render anything
    if (!this.fullMatchDefined) { this.fillFullMatch() }
    return this
  }

  fillFullMatch () {
    this.checkTableForFullMatch(this.wideTable)

    if (this.wideSubTables && this.wideSubTables.length > 0) {
      this.wideSubTables.forEach(table => this.checkTableForFullMatch(table))
    }
    this.fullMatchDefined = true
  }

  checkTableForFullMatch (table) {
    table.rows.forEach(row => {
      row.cells.forEach(cell => {
        cell.fullMatch = this.defineCellFullMatch(cell)
      })
    })
  }


  defineComparativeFeatures (cell) {
    let comparativeFeatures = []
    Object.keys(cell).forEach(prop => {
      if (prop !== 'role' && prop !== 'value') {
        comparativeFeatures.push(prop)
      }
    })    

    return comparativeFeatures
  }

  defineCellFullMatch (cell) {
    if (cell.role !== 'data') { return }
    if (this.homonym && this.homonym.inflections) {
      const comparativeFeatures = this.defineComparativeFeatures(cell)

      for (const inflection of this.homonym.inflections) {
        let fullMatch = true

        for (const feature of comparativeFeatures) {
          if (inflection.hasOwnProperty(feature) || (feature === 'lemma')) {

            if (feature === 'lemma') {
              fullMatch = fullMatch && inflection.word && this.constructor.model.compareWords(cell[feature],inflection.word.value)
            } else {
              fullMatch = fullMatch && cell[feature].hasValues(inflection[feature].values)
            }

            if (!fullMatch) {
              break
            } // If at least one feature does not match, there is no reason to check others
          }
        }

        if (fullMatch) { return true }
      }
    }
    return false
  }

  get wideViewNodes () {
    return this.nodes
  }

  hideEmptyColumns () {
    return this
  }

  showEmptyColumns () {
    return this
  }

  hideNoSuffixGroups () {
    return this
  }

  showNoSuffixGroups () {
    return this
  }

  static getStandardFormInstance (options) {
    if (!options || !options.paradigmID) {
      throw new Error(`Obligatory options property, "paradigmID", is missing`)
    }
    const paradigm = this.dataset.pos.get(this.mainPartOfSpeech).types.get(Paradigm).getByID(options.paradigmID)
    if (paradigm) {
      return new this(paradigm, null, null).render().noSuffixMatchesGroupsHidden(false)
    }
  }
}
