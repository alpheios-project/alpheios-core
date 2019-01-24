import LMF from './language_model_factory'
import Lexeme from './lexeme.js'
import Lemma from './lemma.js'

class Homonym {
  /**
   * Initializes a Homonym object.
   * @param {Lexeme[]} lexemes - An array of Lexeme objects.
   * @param {string} form - the form which produces the homonyms
   */
  constructor (lexemes, form) {
    if (!lexemes || (Array.isArray(lexemes) && lexemes.length === 0)) {
      throw new Error('Lexemes data should not be empty.')
    }

    if (!Array.isArray(lexemes)) {
      throw new Error('Lexeme data should be provided in an array.')
    }

    for (let lexeme of lexemes) {
      if (!(lexeme instanceof Lexeme)) {
        throw new Error('All lexeme data should be of Lexeme object type.')
      }
    }

    this.lexemes = lexemes
    this.targetWord = form
  }

  /**
   * Creates a simple form of inflection with one lexeme and zero or more inflections
   * attached to it. The lexeme will have lemma whose `word` will be set to
   * a homonym's target word.
   * @param {string} word - A word that will populate homonym's `targetWord` prop and lemma `word` one.
   * @param {symbol} languageID - A language identificator as defined in Constants.LANG_XXX.
   * @param {Inflection[]} inflections - Zero or more inflection objects that will be attached to the lexeme
   * @return {Homonym} A newly created homonym object.
   */
  static createSimpleForm (word, languageID, inflections = []) {
    let lemma = new Lemma(word, languageID)
    let lexeme = new Lexeme(lemma, inflections)
    return new Homonym([lexeme], word)
  }

  static readObject (jsonObject) {
    let lexemes = []
    if (jsonObject.lexemes) {
      for (let lexeme of jsonObject.lexemes) {
        lexemes.push(Lexeme.readObject(lexeme))
      }
    }
    let homonym = new Homonym(lexemes, jsonObject.form)
    return homonym
  }

  convertToJSONObject (addMeaning = false) {
    let resultHomonym = { lexemes: [], form: this.targetWord }
    for (let lexeme of this.lexemes) {
      resultHomonym.lexemes.push(lexeme.convertToJSONObject(addMeaning))
    }
    return resultHomonym
  }

  /**
   * Returns a language code of a homonym (ISO 639-3).
   * Homonym does not have a language property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using language property of the first lemma. We chan change this logic in the future if we'll need to.
   * @returns {string} A language code, as defined in the `languages` object.
   */
  get language () {
    console.warn(`Please use languageID instead`)
    return LMF.getLanguageCodeFromId(this.languageID)
  }

  /**
   * Returns a language ID of a homonym.
   * Homonym does not have a languageID property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using languageID property of the first lemma. We chan change this logic in the future if we'll need to.
   * @returns {Symbol} A language ID, as defined in the `LANG_` constants.
   */
  get languageID () {
    if (this.lexemes && this.lexemes[0] && this.lexemes[0].lemma && this.lexemes[0].lemma.languageID) {
      return this.lexemes[0].lemma.languageID
    } else {
      throw new Error('Homonym has not been initialized properly. Unable to obtain language ID information.')
    }
  }

  /**
   * Returns a list of all inflections within all lexemes of a homonym
   * @return {Inflection[]} An array of inflections
   */
  get inflections () {
    let inflections = []
    for (const lexeme of this.lexemes) {
      inflections = inflections.concat(lexeme.inflections)
    }
    return inflections
  }

  isDisambiguated () {
    return this.lexemes.filter(l => l.disambiguated).length > 0
  }

  /**
   * Disambiguate homymyn objects with another
   * @param {Homonym} base the homonym to use to disambiguate
   * @param {Homonym[]} disambiguators the homonyms to use to disambiguate
   */
  static disambiguate (base, disambiguators) {
    if (disambiguators.length === 0) {
      // nothing left to disamibugate with
      return base
    }
    let disambiguator = disambiguators.shift()
    let lexemes = []
    let missedLexemes = []
    // iterate through the lexemes in the disambiguator and try
    // to disambiguate the existing lexemes with each
    for (let otherLexeme of disambiguator.lexemes) {
      let lexemeMatched = false
      for (let lexeme of base.lexemes) {
        let newLex = Lexeme.disambiguate(lexeme, otherLexeme)
        lexemes.push(newLex)
        if (newLex.disambiguated) {
          lexemeMatched = true
        }
      }
      // if we couldn't find a matching lexeme, add the disambigutor's lexemes
      // to the list of lexemes for the new Homonym
      if (!lexemeMatched) {
        otherLexeme.disambiguated = true
        missedLexemes.push(otherLexeme)
      }
    }
    // create a new homonym with the disamibugated lexemes
    let newHom = new Homonym([...lexemes, ...missedLexemes], base.targetWord)
    return Homonym.disambiguate(newHom, disambiguators)
  }
}
export default Homonym
