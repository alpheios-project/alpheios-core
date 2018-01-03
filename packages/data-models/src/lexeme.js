import Lemma from './lemma.js'
import Inflection from './inflection.js'
import DefinitionSet from './definition-set'
import LMF from './language_model_factory'

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

    this.lemma = lemma
    this.inflections = inflections
    this.meaning = meaning || new DefinitionSet(this.lemma.word, this.lemma.languageID)
  }

  getGroupedInflections () {
    let lm = LMF.getLanguageForCode(this.lemma.language)
    return lm.groupInflectionsForDisplay(this.inflections)
  }

  static readObject (jsonObject) {
    let lemma = Lemma.readObject(jsonObject.lemma)
    let inflections = []
    for (let inflection of jsonObject.inflections) {
      inflections.push(Inflection.readObject(inflection))
    }

    let lexeme = new Lexeme(lemma, inflections)
    lexeme.meaning = DefinitionSet.readObject(jsonObject.meaning)
    return lexeme
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
      if (a.lemma.features[primary] && b.lemma.features[primary]) {
        if (a.lemma.features[primary][0].sortOrder < b.lemma.features[primary][0].sortOrder) {
          return 1
        } else if (a.lemma.features[primary][0].sortOrder > b.lemma.features[primary][0].sortOrder) {
          return -1
        } else if (a.lemma.features[secondary] && b.lemma.features[secondary]) {
          if (a.lemma.features[secondary][0].sortOrder < b.lemma.features[secondary][0].sortOrder) {
            return 1
          } else if (a.lemma.features[secondary][0].sortOrder > b.lemma.features[secondary][0].sortOrder) {
            return -1
          } else if (a.lemma.features[secondary] && !b.lemma.features[secondary]) {
            return -1
          } else if (!a.lemma.features[secondary] && b.lemma.features[secondary]) {
            return 1
          } else {
            return 0
          }
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
