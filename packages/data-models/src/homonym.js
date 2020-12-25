import LMF from './language_model_factory'
import Lexeme from './lexeme.js'
import Lemma from './lemma.js'
import Language from './language.js'

/**
 * A class representing a homonym object.
 *
 * @typedef {object} Homonym
 * @property {Lexeme[]} lexemes - A list of lexemes that the homonym contains.
 * @property {string} targetWord - A word that was used to create a homonym.
 */
class Homonym {
  /**
   * Initializes a Homonym object.
   *
   * @param {Lexeme[]} lexemes - An array of Lexeme objects.
   * @param {string} targetWord - the form which produces the homonyms
   */
  constructor (lexemes, targetWord) {
    if (!lexemes || (Array.isArray(lexemes) && lexemes.length === 0)) {
      throw new Error('Lexemes data should not be empty.')
    }

    if (!Array.isArray(lexemes)) {
      throw new Error('Lexeme data should be provided in an array.')
    }

    for (const lexeme of lexemes) {
      if (!(lexeme instanceof Lexeme)) {
        throw new Error('All lexeme data should be of Lexeme object type.')
      }
    }

    /** @type {Lexeme[]} */
    this.lexemes = lexemes
    this.targetWord = targetWord
  }

  /**
   * Creates a simple form of inflection with one lexeme and zero or more inflections
   * attached to it. The lexeme will have lemma whose `word` will be set to
   * a homonym's target word.
   *
   * @param {string} word - A word that will populate homonym's `targetWord` prop and lemma `word` one.
   * @param {Language} language - An object representing the language.
   * @param {Inflection[]} inflections - Zero or more inflection objects that will be attached to the lexeme
   * @returns {Homonym} A newly created homonym object.
   */
  static createSimpleForm (word, language, inflections = []) {
    const lemma = new Lemma(word, language)
    const lexeme = new Lexeme(lemma, inflections)
    return new Homonym([lexeme], word)
  }

  /**
   * Checks if any of the lexemes of this homonym has short definitions stored.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs () {
    return Boolean(this.lexemes && this.lexemes.some(l => l.hasShortDefs))
  }

  /**
   * Checks if any of the lexemes of this homonym has full definitions stored.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs () {
    return Boolean(this.lexemes && this.lexemes.some(l => l.hasFullDefs))
  }

  static readObject (jsonObject) {
    if (!jsonObject.form && !jsonObject.targetWord) {
      throw new Error(Homonym.errMsgs.NO_TARGET_WORD_IN_JSON)
    }
    const targetWord = jsonObject.form || jsonObject.targetWord
    let lexemes = [] // eslint-disable-line prefer-const
    if (jsonObject.lexemes) {
      for (const lexeme of jsonObject.lexemes) {
        lexemes.push(Lexeme.readObject(lexeme))
      }
    } else {
      if (!jsonObject.languageCode) {
        throw new Error(Homonym.errMsgs.NO_LANGUAGE_IN_JSON)
      }
      const lang = new Language(jsonObject.languageCode)
      lexemes = [new Lexeme(new Lemma(targetWord, lang), [])]
    }
    const homonym = new Homonym(lexemes, targetWord)
    homonym.lemmasList = jsonObject.lemmasList
    return homonym
  }

  convertToJSONObject (addMeaning = false) {
    // TODO: Shall we use targetWord instead of form to match the internal homonym structure?
    let resultHomonym = { lexemes: [], form: this.targetWord } // eslint-disable-line prefer-const
    for (const lexeme of this.lexemes) {
      resultHomonym.lexemes.push(lexeme.convertToJSONObject(addMeaning))
    }
    return resultHomonym
  }

  /**
   * Returns a language of the homonym..
   * Homonym does not have a language property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using language property of the first lemma. We can change this logic in the future if we'll need to.
   *
   * @returns {Language} A language of the homonym.
   */
  get language () {
    if (this.lexemes && this.lexemes[0] && this.lexemes[0].lemma && this.lexemes[0].lemma.language) {
      return this.lexemes[0].lemma.language
    } else {
      throw new Error(Homonym.errMsgs.NO_LANGUAGE_IN_HOMONYM)
    }
  }

  /**
   * @deprecated
   * Returns a language ID of a homonym. This getter has been deprecated, please use language getter instead.
   *
   * @returns {symbol} A language IDs.
   */
  get languageID () {
    return LMF.getLanguageIdFromCode(this.language.toCode())
  }

  /**
   * Returns a list of all inflections within all lexemes of a homonym
   *
   * @returns {Inflection[]} An array of inflections
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
   *
   * @param {Homonym} base the homonym to use to disambiguate
   * @param {Homonym[]} disambiguators the homonyms to use to disambiguate
   */
  static disambiguate (base, disambiguators) {
    if (disambiguators.length === 0) {
      // nothing left to disamibugate with
      return base
    }
    const disambiguator = disambiguators.shift()
    let lexemes = [] // eslint-disable-line prefer-const
    let missedLexemes = [] // eslint-disable-line prefer-const
    // iterate through the lexemes in the disambiguator and try
    // to disambiguate the existing lexemes with each
    for (const otherLexeme of disambiguator.lexemes) {
      let lexemeMatched = false
      for (const lexeme of base.lexemes) {
        // Do not try to disambiguate lexemes that can't: it will erase a `disambiguated` flag
        const newLex = lexeme.canBeDisambiguatedWith(otherLexeme) ? Lexeme.disambiguate(lexeme, otherLexeme) : lexeme

        if (lexeme.isFullHomonym(otherLexeme, { normalize: true })) {
          lexemeMatched = true
          // If lexeme is a full homonym with a disambiguator, it should always be marked as disambiguated
          newLex.disambiguated = true
        }
        lexemes.push(newLex)
      }
      // if we couldn't find a matching lexeme, add the disambigutor's lexemes
      // to the list of lexemes for the new Homonym
      if (!lexemeMatched) {
        otherLexeme.disambiguated = true
        missedLexemes.push(otherLexeme)
      }
    }
    // create a new homonym with the disamibugated lexemes
    const newHom = new Homonym([...lexemes, ...missedLexemes], base.targetWord)
    return Homonym.disambiguate(newHom, disambiguators)
  }
}

Homonym.errMsgs = {
  NO_LANGUAGE_IN_HOMONYM: 'Homonym has not been initialized properly. Unable to obtain language ID information',
  NO_LANGUAGE_IN_JSON: 'Cannot create homonym from JSON with no lexemes and no language info',
  NO_TARGET_WORD_IN_JSON: 'Cannot create homonym from JSON with no lexemes and no target word'
}
export default Homonym
