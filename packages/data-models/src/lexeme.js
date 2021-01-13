import Lemma from './lemma.js'
import Inflection from './inflection.js'
import Feature from './feature.js'
import DefinitionSet from './definition-set.js'
import LMF from './language_model_factory.js'
import LM from './language_model.js'
import ResourceProvider from './resource_provider.js'

/**
 * A basic unit of lexical meaning. Contains a primary Lemma object, one or more Inflection objects
 * and a DefinitionSet
 */
class Lexeme {
  /**
   * Initializes a Lexeme object.
   *
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

    for (const inflection of inflections) {
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
    this.addInflections(inflections)
    this.meaning = meaning || new DefinitionSet(this.lemma.word, this.lemma.languageID)
    this.disambiguated = false
    this.selectedInflection = null
  }

  /**
   * Set the selected inflection for a lexeme which has had its
   * inflections disambiguated
   * @param {Inflection} inflection the selected inflection
   */
  setSelectedInflection (inflection) {
    this.selectedInflection = inflection
  }

  /**
   * Get the selected inflection for a lexeme which has had its
   * inflections disambiguated
   * @returns {Inflection} (or null if none is selected)
   */
  getSelectedInflection () {
    return this.selectedInflection
  }

  /**
   * Gets the selected inflection formatted for display
   * (returns an array because the display is grouped by feature
   * but there should only be one inflection in the array)
   * @returns {Array} if no selected inflection the array will be empty
   */
  getGroupedSelectedInflection () {
    if (this.selectedInflection) {
      const lm = LMF.getLanguageModel(this.lemma.languageID)
      return lm.groupInflectionsForDisplay([this.selectedInflection])
    } else {
      return []
    }
  }

  /**
   * add an inflection to the lexeme
   *
   * @param {Inflection} inflection
   */
  addInflection (inflection) {
    inflection.lemma = this.lemma
    inflection.lexeme = this
    this.inflections.push(inflection)
  }

  /**
   * Adds one or several inflections to a Lexeme object.
   *
   * @param {Inflection | Inflection[]} inflections - a single Inflection object or an array of Inflection
   *        objects to add to a lexeme.
   */
  addInflections (inflections) {
    if (!Array.isArray(inflections)) { inflections = [inflections] }
    inflections.forEach(i => this.addInflection(i))
  }

  /**
   * add an alternative lemma to the lexeme
   *
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
   *
   * @returns {boolean}
   */
  isPopulated () {
    return Object.entries(this.lemma.features).length > 0 ||
      !this.meaning.isEmpty() ||
      this.inflections.length > 0
  }

  /**
   * Checks if any short definitions are stored within this lexeme.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs () {
    return Boolean(this.meaning && this.meaning.hasShortDefs)
  }

  /**
   * Checks if any full definitions are stored within this lexeme.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs () {
    return Boolean(this.meaning && this.meaning.hasFullDefs)
  }

  /**
   * Checks whether a lemma of a current lexeme is a full homonym of the lemma of the other lexeme.
   *
   * @param {Lexeme} otherLexeme - a lexeme whose lemma will be compared with the lemma of a current lexeme.
   * @param {boolean} normalize - whether to use normalization for word comparison.
   * @returns {boolean} - true if two aforementioned lemmas are full homonyms, false otherwise.
   */
  isFullHomonym (otherLexeme, { normalize = false } = {}) {
    const lm = LMF.getLanguageModel(this.lemma.languageID)
    const normalizedPofs = lm.normalizePartOfSpeechValue(this)
    if (normalizedPofs === lm.normalizePartOfSpeechValue(otherLexeme)) {
      const ignorePofs = Boolean(normalizedPofs !== this.lemma.features[Feature.types.part])
      return this.lemma.isFullHomonym(otherLexeme.lemma, { normalize, ignorePofs })
    } else {
      return false
    }
  }

  /**
   * Determines whether a lexeme can be disambiguated with the other disambiguator lexeme.
   *
   * @param {Lexeme} disambiguator - A possible disambiguator; a lexeme that is checked
   *         whether it can disambiguate a current lexeme.
   * @returns {boolean} - True if a current lexeme can be disambiguated with a disambiguator, false otherwise.
   */
  canBeDisambiguatedWith (disambiguator) {
    /*
    A Lexeme can be used as an disambiguator if:
    - its lemma is a full homonym of a disambiguator's lemma;
    - disambiguator, comparing to a lexeme, has some extra features worth adding such as:
      - some additional information in a word (e.g. a trailing digit) that lemma has not;
      - at least one inflection.
    */
    const hasExtraFeatures = disambiguator.inflections.length || LM.hasTrailingDigit(disambiguator.lemma.word)
    return this.isFullHomonym(disambiguator, { normalize: true }) && hasExtraFeatures
  }

  /**
   * disambiguate the inflections in this lexeme with those in another lexeme
   *
   * @param {Lexeme} lexeme the lexeme to be disambiguated
   * @param {Lexeme} disambiguator the lexeme to use to disambiguate
   * @returns {Lexeme} a new lexeme, if disambiguation was successful the
   * disambiguated inflection will be selected
   */
  static disambiguateInflections (lexeme, disambiguator) {
    let newLexeme = new Lexeme(lexeme.lemma, lexeme.inflections, lexeme.meaning) // eslint-disable-line prefer-const
    if (lexeme.canBeDisambiguatedWith(disambiguator)) {
      // iterate through this lexemes inflections and see if one is disambiguated
      // there should be only one that matches
      for (const inflection of newLexeme.inflections) {
        for (const disambiguatorInflection of disambiguator.inflections) {
          const inflMatch = inflection.disambiguatedBy(disambiguatorInflection, { ignorePofs: true })
          if (inflMatch.match) {
            if (inflMatch.exactMatch) {
              // if it was an exact match, we can use the source lexeme's inflection
              // which may carry more information
              newLexeme.setSelectedInflection(inflection)
            } else {
              // if it was not an exact match (e.g. if the source inflection
              // had a multi-valued feature), use the disambiguator lexeme's
              // inflection
              newLexeme.setSelectedInflection(disambiguatorInflection)
            }
          }
        }
      }
    }
    return newLexeme
  }

  /**
   * Set the disambiguation flag of this lexeme
   * if a disambiguator lexeme is provided, it's lemma word will be used
   * to update the word of this lexeme's lemma
   * @param {Lexeme} disambiguator
   */
  setDisambiguation(disambiguator = null) {
    this.disambiguated = true
    if (disambiguator) {
      this.lemma.word = this.lemma.disambiguate(disambiguator.lemma)
    }
  }

  getGroupedInflections () {
    const lm = LMF.getLanguageModel(this.lemma.languageID)
    return lm.groupInflectionsForDisplay(this.inflections)
  }

  static readObject (jsonObject) {
    const lemma = Lemma.readObject(jsonObject.lemma)
    let inflections = [] // eslint-disable-line prefer-const
    for (const inflection of jsonObject.inflections) {
      inflections.push(Inflection.readObject(inflection))
    }

    const lexeme = new Lexeme(lemma, inflections)
    if (jsonObject.meaning) {
      lexeme.meaning = DefinitionSet.readObject(jsonObject.meaning)
    }

    if (jsonObject.provider) {
      const provider = ResourceProvider.readObject(jsonObject.provider)
      return ResourceProvider.getProxy(provider, lexeme)
    } else {
      return lexeme
    }
  }

  convertToJSONObject (addMeaning = false) {
    let resInflections = [] // eslint-disable-line prefer-const
    this.inflections.forEach(inflection => { resInflections.push(inflection.convertToJSONObject()) })

    const resLexeme = {
      lemma: this.lemma.convertToJSONObject(),
      inflections: resInflections
    }

    if (addMeaning) {
      resLexeme.meaning = this.meaning.convertToJSONObject()
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
   *
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
