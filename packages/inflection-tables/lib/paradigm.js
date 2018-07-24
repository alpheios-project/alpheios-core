import uuidv4 from 'uuid/v4'
import {Feature} from 'alpheios-data-models'
import ParadigmRule from './paradigm-rule.js'

export default class Paradigm {
  constructor (languageID, partOfSpeech, paradigm) {
    this.id = uuidv4()
    this.paradigmID = paradigm.ID
    this.languageID = languageID
    this.partOfSpeech = partOfSpeech
    this.title = paradigm.title
    this.table = paradigm.table
    this.hasCredits = !!paradigm.credits
    this.creditsText = paradigm.credits ? paradigm.credits : ''
    this.subTables = paradigm.subTables
    this.rules = []

    // Convert strin feature values to Feature objects for later comparison
    for (let row of this.table.rows) {
      for (let cell of row.cells) {
        if (cell.role === 'data') {
          let cellFeatures = []
          for (const prop of Object.keys(cell)) {
            // Eliminate "non-feature" keys
            if (prop !== 'role' && prop !== 'value') {
              cellFeatures.push(prop)
            }
          }
          for (const feature of cellFeatures) {
            const values = cell[feature].split(' ')
            cell[feature] = new Feature(feature, values, this.languageID)
          }
          cell[Feature.types.part] = new Feature(Feature.types.part, this.partOfSpeech, this.languageID)
        }
      }
    }

    /**
     * Sometimes paradigm sub tables may have links to another paradigms.
     * Those supplemental paradigms will be saved in the map.
     * @type {Map<{string} paradigmID, {Paradigm} paradigm>}
     * @private
     */
    this._suppParadigms = new Map()
  }

  static get ClassType () {
    return this
  }

  addRule (matchOrder, features, lemma, morphFlags) {
    this.rules.push(new ParadigmRule(matchOrder, features, lemma, morphFlags))
  }

  sortRules () {
    this.rules.sort((a, b) => b.matchOrder - a.matchOrder)
  }

  /**
   * Scans paradigm sub tables for other paradigm tables links and, if found,
   * stores paradigms the found links refers to into a `_suppParadigms` prop.
   * @param {Map<{string} paradigmID, {Paradigm} paradigm>} paradigmMap - A map of all known paradigms.
   */
  addSuppTables (paradigmMap) {
    for (const subTable of this.subTables) {
      for (const row of subTable.rows) {
        for (const cell of row.cells) {
          if (cell.hasOwnProperty('reflink')) {
            if (paradigmMap.has(cell.reflink.id)) {
              this._suppParadigms.set(cell.reflink.id, paradigmMap.get(cell.reflink.id))
            } else {
              console.warn(`"${cell.reflink.id}" supplemental table is not found`)
            }
          }
        }
      }
    }
  }

  /**
   * Whether this paradigm has any linked paradigms stored.
   * @return {boolean}
   */
  get hasSuppParadigms () {
    return this._suppParadigms.size > 0
  }

  /**
   * Returns an array of linked paradigms.
   * @return {Paradigm[]}
   */
  get suppParadigmList () {
    return Array.from(this._suppParadigms.values())
  }

  /**
   * Returns linked paradigms in a map.
   * @return {Map<{string}, paradigmID, {Paradigm}, paradigm>}
   */
  get suppParadigmsMap () {
    return this._suppParadigms
  }

  /**
   * Checks wither an inflection matches any single rules within a `rules` array. Rules within a Paradigm
   * are sorted according to the match order, highest first. This is an order an array of rules will be iterated by.
   * In order for rule to be a match, an inflection should have all features with values equal to those
   * listed within a rule.
   * If rule is a match, an object with a paradigm and a rule that matched is returned.
   * @param {Inflection} inflection.
   * @return {Object | undefined} An object with a paradigm and a matching rule if there is a match
   * or false otherwise.
   */
  matches (inflection) {
    for (const rule of this.rules) {
      let match = true
      for (const feature of rule.features) {
        match = match && inflection.hasOwnProperty(feature.type) && feature.value === inflection[feature.type].value
      }
      return match ? {paradigm: this, rule: rule} : undefined
    }
  }
}
