import LexicalDataResult from '@comp/data-model/word-query/lexical-data/result/lexical-data-result.js'
import { Lexeme, Lemma, Homonym, HomonymGroup } from 'alpheios-data-models'

export default class WordAsLexemeData {
  constructor ({ word, language } = {}) {
    this._word = word
    this._language = language
  }

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

WordAsLexemeData.dataType = 'wordAsLexeme'
