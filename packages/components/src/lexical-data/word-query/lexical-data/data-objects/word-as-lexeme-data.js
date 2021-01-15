import LexicalDataResult from '@comp/lexical-data/word-query/lexical-data/result/lexical-data-result.js'
import { Lexeme, Lemma, Homonym, HomonymGroup } from 'alpheios-data-models'
import LexicalDataTypes from '@comp/lexical-data/word-query/lexical-data/types/lexical-data-types.js'

export default class WordAsLexemeData {
  /**
   * Creates an instance of a WordAsLexemeData object.
   *
   * @param {string} word - A word to be associated with an object.
   * @param {Language} language - A language of a word.
   */
  constructor ({ word, language } = {}) {
    if (!word) {
      throw new Error(WordAsLexemeData.errMsgs.NO_WORD_PROVIDED)
    }
    if (!language) {
      throw new Error(WordAsLexemeData.errMsgs.NO_LANGUAGE_PROVIDED)
    }
    this._word = word
    this._language = language
  }

  /**
   * Creates a homonym group object from the word. The homonym group object contains a single homonym that
   * has a single lexeme generated from the word of this object instance.
   *
   * @param {Map<import('../types/lexical-data-types.js').LexicalDataTypes, LexicalDataResult>} [lexicalData] - A map
   *        containing lexical data that was already obtained.
   * @returns {Promise<LexicalDataResult>} - A lexical data result object containing the homonym group with
   *          a single homonym and a single lexeme.
   */
  async retrieve (lexicalData) {
    let result = new LexicalDataResult(WordAsLexemeData.dataType) // eslint-disable-line prefer-const
    const formLexeme = new Lexeme(new Lemma(this._word, this._language), [])
    const homonym = new Homonym([formLexeme], this._word)
    const homonymGroup = new HomonymGroup([homonym])

    result.state.loading = false
    result.state.available = true
    result.state.failed = false
    result.data = homonymGroup
    return result
  }
}

/** @type {import('../types/lexical-data-types.js').LexicalDataTypes | string} */
WordAsLexemeData.dataType = LexicalDataTypes.WORD_AS_LEXEME

WordAsLexemeData.errMsgs = {
  NO_WORD_PROVIDED: 'WordAsLexemeData cannot be created without a word',
  NO_LANGUAGE_PROVIDED: 'WordAsLexemeData cannot be created without a language'
}
