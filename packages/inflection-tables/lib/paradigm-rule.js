export default class ParadigmRule {
  /**
   * @param {number} matchOrder
   * @param {Feature[]} features
   * @param {Lemma} lemma
   * @param morphFlags
   */
  constructor (matchOrder, features, lemma, morphFlags) {
    this.matchOrder = matchOrder
    this.features = features
    this.lemma = lemma
    this.morphFlags = morphFlags
  }

  /**
   * Checks if given inflection matches the rule.
   * In order for rule to be considered a match, an inflection should have all features with values equal to those
   * listed within a rule. If rule has a lemma, it should match a `word` property of an inflection
   * (this property contains a target word).
   * @param {Inflection} inflection
   * @return {boolean}
   */
  matches (inflection) {
    let match = true
    for (const feature of this.features) {
      match = match && inflection.hasOwnProperty(feature.type) && feature.value === inflection[feature.type].value // eslint-disable-line no-prototype-builtins
      if (!match) {
        return false
      }
    }
    if (match && this.lemma) {
      // If there is lemma present in the rule, check that it will match the target word
      match = match && inflection.word && inflection.word.value === this.lemma.word
    }
    return match
  }
}
