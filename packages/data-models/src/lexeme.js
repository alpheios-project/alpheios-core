import Lemma from './lemma.js'
import Inflection from './inflection.js'
import DefinitionSet from './definition-set'
import LMF from './language_model_factory'
import ResourceProvider from './resource_provider.js'

/**
 * A basic unit of lexical meaning. Contains a primary Lemma object, one or more Inflection objects
 * and a DefinitionSet
 */
class Lexeme {
  /**
   * Initializes a Lexeme object.
   * @param {Lemma} lemma - A lemma object.
   * @param {Inflection[]} inflections - An array of inflections.
   * @param {DefinitionSet} meaning - A set of definitions.
   */
  constructor (lemma, inflections, meaning = null) {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }

    if (!(lemma instanceof Lemma)) {
      throw new Error('Lemma should be of Lemma object type.')
    }

    if (!inflections) {
      throw new Error('Inflections data should not be empty.')
    }

    if (!Array.isArray(inflections)) {
      throw new Error('Inflection data should be provided in an array.')
    }

    for (let inflection of inflections) {
      if (!(inflection instanceof Inflection)) {
        throw new Error('All inflection data should be of Inflection object type.')
      }
    }

    if (meaning !== null && !(meaning instanceof DefinitionSet)) {
      throw new Error('Meaning should be of DefinitionSet object type.')
    }

    this.lemma = lemma
    this.altLemmas = []
    this.inflections = []
    inflections.forEach(i => { this.addInflection(i) })
    this.meaning = meaning || new DefinitionSet(this.lemma.word, this.lemma.languageID)
    this.disambiguated = false
  }

  /**
   * add an inflection to the lexeme
   * @param {Inflection} inflection
   */
  addInflection (inflection) {
    inflection.lemma = this.lemma
    inflection.lexeme = this
    this.inflections.push(inflection)
  }

  /**
   * add an alternative lemma to the lexeme
   * @param {Lemma} lemma
   */
  addAltLemma (lemma) {
    this.altLemmas.push(lemma)
  }

  /**
   * test to see if a lexeme is populated with meaningful data
   * Returns true if any of these are true:
   *   its lemma has morphological features defined
   *   it has one ore more definitions supplied in the meaning
   *   it has one ore more inflections
   * @return {boolean}
   */
  isPopulated () {
    return Object.entries(this.lemma.features).length > 0 ||
      !this.meaning.isEmpty() ||
      this.inflections.length > 0
  }

  /**
   * Checks if any short definitions are stored within this lexeme.
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs () {
    return Boolean(this.meaning && this.meaning.hasShortDefs)
  }

  /**
   * Checks if any full definitions are stored within this lexeme.
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs () {
    return Boolean(this.meaning && this.meaning.hasFullDefs)
  }

  /**
   * disambiguate with another supplied Lexeme
   * @param {Lexeme} lexeme the lexeme to be disambiguated
   * @param {Lexeme} disambiguator the lexeme to use to disambiguate
   * @return {Lexeme} a new lexeme, if disamibugation was successful disambiguated flag will be set on it
   */
  static disambiguate (lexeme, disambiguator) {
    let newLexeme = new Lexeme(lexeme.lemma, lexeme.inflections, lexeme.meaning)
    if (lexeme.lemma.isFullHomonym(disambiguator.lemma) && disambiguator.inflections.length > 0) {
      newLexeme.disambiguated = true
      let keepInflections = []
      // iterate through this lexemes inflections and keep only thoes that are disambiguatedBy by the supplied lexeme's inflection
      // we want to keep the original inflections rather than just replacing them
      // because the original inflections may have more information
      for (let inflection of newLexeme.inflections) {
        for (let disambiguatorInflection of disambiguator.inflections) {
          if (inflection.disambiguatedBy(disambiguatorInflection)) {
            keepInflections.push(inflection)
          }
        }
      }
      newLexeme.inflections = keepInflections
      // if we couldn't match any existing inflections, then add the disambiguated one
      if (newLexeme.inflections.length === 0) {
        for (let infl of disambiguator.inflections) {
          newLexeme.addInflection(infl)
        }
      }
    }
    return newLexeme
  }

  getGroupedInflections () {
    let lm = LMF.getLanguageModel(this.lemma.languageID)
    return lm.groupInflectionsForDisplay(this.inflections)
  }

  static readObject (jsonObject) {
    let lemma = Lemma.readObject(jsonObject.lemma)
    let inflections = []
    for (let inflection of jsonObject.inflections) {
      inflections.push(Inflection.readObject(inflection))
    }

    let lexeme = new Lexeme(lemma, inflections)
    if (jsonObject.meaning) {
      lexeme.meaning = DefinitionSet.readObject(jsonObject.meaning)
    }

    if (jsonObject.provider) {
      let provider = ResourceProvider.readObject(jsonObject.provider)
      return ResourceProvider.getProxy(provider, lexeme)
    } else {
      return lexeme
    }
  }

  convertToJSONObject (addMeaning = false) {
    let resInflections = []
    this.inflections.forEach(inflection => { resInflections.push(inflection.convertToJSONObject()) })

    let resLexeme = {
      lemma: this.lemma.convertToJSONObject(),
      inflections: resInflections
    }

    if (addMeaning) {
      let resMeaning = this.meaning.convertToJSONObject()
      resLexeme.meaning = resMeaning
    }

    if (this.provider) {
      resLexeme.provider = this.provider.convertToJSONObject()
    }

    return resLexeme
  }

  /**
   * Get a sort function for an array of lexemes which applies a primary and secondary
   * sort logic using the sort order specified for each feature. Sorts in descending order -
   * higher sort order means it should come first
   * @param {string} primary feature name to use as primary sort key
   * @param {string} secondary feature name to use as secondary sort key
   * @returns {Function} function which can be passed to Array.sort
   */
  static getSortByTwoLemmaFeatures (primary, secondary) {
    return (a, b) => {
      if ((a.lemma.features[primary] && b.lemma.features[primary]) ||
          (!a.lemma.features[primary] && !b.lemma.features[[primary]])) {
        let primarySort
        if (a.lemma.features[primary] && b.lemma.features[primary]) {
          // if both lemmas have the primary sort key, then sort
          primarySort = a.lemma.features[primary].compareTo(b.lemma.features[primary])
        } else {
          // if neither lemma has the primary sort key, then the primary sort is equal
          primarySort = 0
        }
        if (primarySort !== 0) {
          return primarySort
        } else if (a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return a.lemma.features[secondary].compareTo(b.lemma.features[secondary])
        } else if (a.lemma.features[secondary] && !b.lemma.features[secondary]) {
          return -1
        } else if (!a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return 1
        } else {
          // neither have the secondary sort key so they are equal
          return 0
        }
      } else if (a.lemma.features[primary] && !b.lemma.features[primary]) {
        return -1
      } else if (!a.lemma.features[primary] && b.lemma.features[primary]) {
        return 1
      } else {
        return 0
      }
    }
  }
}
export default Lexeme
