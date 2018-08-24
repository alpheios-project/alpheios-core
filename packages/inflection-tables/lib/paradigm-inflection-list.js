import InflectionList from './inflection-list.js'

export default class ParadigmInflectionList extends InflectionList {
  /**
   * Checks if an array of items has at least one element that matches an inflection.
   *  A match is determined as a result of item's `match` function.
   * @param {Inflection|Inflection[]} inflections - One or several inflection to match against.
   * @return {boolean} - True if there is at least one match, false otherwise
   */
  hasMatches (inflections) {
    if (!Array.isArray(inflections)) {
      inflections = [inflections]
    }
    for (const inflection of inflections) {
      if (this.items.some(i => i.matchingRules(inflection).length > 0)) {
        // There is at least one matching rule
        return true
      }
    }
    return false
  }

  /**
   * Returns an array of paradigms that `matches` an array of inflections.
   * A match is determined by the paradigm's `match` function.
   * Returned value is determined by item's `match` function as well.
   * @param {Inflection[]} inflections - One or several inflections to match against paradigms.
   * @return {Paradigm[]|[]} An array of paradigms that matches inflections. Only those paradigms are returned
   * whose matching rules have the highest `matchOrder`. If no matches found, an empty array will be returned.
   */
  getMatches (inflections) {
    // Select only those inflections that are paradigm based
    inflections = inflections.filter(i => i.constraints && i.constraints.paradigmBased)
    let matchingParadigm = []
    // Get all matching paradigms for all inflections
    let highestMatchOrder = Number.MIN_SAFE_INTEGER
    for (const inflection of inflections) {
      for (const paradigm of this.items) {
        const matchingRules = paradigm.matchingRules(inflection)
        if (matchingRules.length > 0) {
          // There is one or several matching rules for this paradigm
          const rulesMatchOrder = matchingRules.reduce((acc, rule) => rule.matchOrder > acc ? rule.matchOrder : acc, Number.MIN_SAFE_INTEGER)
          if (rulesMatchOrder > highestMatchOrder) {
            // This is the matching rule with the highers order. Scrap all previous matches and store this one
            matchingParadigm = [paradigm]
            highestMatchOrder = rulesMatchOrder
          } else if (rulesMatchOrder === highestMatchOrder) {
            // Rule with the same matchOrder as we already have stored.

            // Check if there is the same paradigm in matches already
            if (!matchingParadigm.find(p => p.id === paradigm.id)) {
              matchingParadigm.push(paradigm)
            }
          }
        }
      }
    }
    return matchingParadigm
  }
}
