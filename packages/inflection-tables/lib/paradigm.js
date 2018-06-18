import uuidv4 from 'uuid/v4'

import ParadigmRule from './paradigm-rule.js'

export default class Paradigm {
  constructor (languageID, partOfSpeech, table) {
    this.id = uuidv4()
    this.languageID = languageID
    this.partOfSpeech = partOfSpeech
    this.title = table.title
    this.table = table.table
    this.hasCredits = !!table.credits
    this.creditsText = table.credits ? table.credits : ''
    this.subTables = table.subTables
    this.rules = []
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
        if (!inflection.hasOwnProperty(feature.type) || feature.value !== inflection[feature.type].value) {
          match = false
        }
      }
      return match ? {paradigm: this, rule: rule} : undefined
    }
  }
}
