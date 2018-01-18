/* eslint-env jest */
import Lexeme from '../src/lexeme.js'
import Lemma from '../src/lemma.js'
import Feature from '../src/feature.js'
import Inflection from '../src/inflection.js'
import Definition from '../src/definition.js'

describe('Lexeme object', () => {
  let lexeme, lemma, inflection1, inflection2

  beforeAll(() => {
    // Create a test environment

    inflection1 = new Inflection('stem1', 'grc')
    inflection2 = new Inflection('stem2', 'grc')
    lemma = new Lemma('word', 'grc')
    lexeme = new Lexeme(lemma, [inflection1, inflection2])
  })

  test('Should be initialized properly', () => {
    expect(lexeme.lemma).toEqual(lemma)
    expect(lexeme.inflections).toEqual([inflection1, inflection2])
    expect(lexeme.meaning).toMatchObject({
      languageID: expect.anything(),
      lemmaWord: 'word',
      shortDefs: [],
      fullDefs: []
    })
  })

  test('meaning gets initialized', () => {
    let def = new Definition('shortdef', 'eng', 'text/plain')
    let testLex = new Lexeme(lemma, [inflection1], def)
    expect(testLex.meaning).toEqual(def)
  })

  test('Should not allow empty arguments', () => {
    expect(() => new Lexeme()).toThrowError(/empty/)
  })

  test('Should not allow arguments of incorrect type', () => {
    expect(() => new Lexeme(new Lemma('someword', 'grc'), 'some value')).toThrowError(/array/)
  })

  test('Should not allow arguments of incorrect type even within an array', () => {
    expect(() => new Lexeme(new Lemma('someword', 'grc'), ['some value'])).toThrowError(/Inflection/)
  })

  test('Sorting on feature order', () => {
    let mockLexemeOne = {
      lemma: {
        features: {
          freq: [ { sortOrder: 5 } ],
          pofs: [ { sortOrder: 3 } ]
        }
      }
    }
    let mockLexemeTwo = {
      lemma: {
        features: {
          freq: [ { sortOrder: 5 } ],
          pofs: [ { sortOrder: 5 } ]
        }
      }
    }
    let mockLexemeThree = {
      lemma: {
        features: {
          pofs: [ { sortOrder: 7 } ]
        }
      }
    }
    let lexemes = [ mockLexemeOne, mockLexemeTwo ]
    let sortFunc = Lexeme.getSortByTwoLemmaFeatures('freq', 'pofs')
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeTwo, mockLexemeOne])
    lexemes = [ mockLexemeTwo, mockLexemeThree ]
    expect(lexemes.sort(sortFunc)).toEqual([mockLexemeTwo, mockLexemeThree])
  })

  test('isPopulated', () => {
    // it has inflections
    expect(lexeme.isPopulated()).toBeTruthy()
    let empty = new Lexeme(lemma, [])
    expect(empty.isPopulated()).toBeFalsy()
    let flemma = new Lemma('word', 'grc')
    flemma.feature = new Feature(['noun'], 'tense', 'grc')
    let withFeatures = new Lexeme(flemma, [])
    expect(withFeatures.isPopulated()).toBeTruthy()
    let def = new Definition('shortdef', 'eng', 'text/plain')
    let withDef = new Lexeme(lemma, [])
    withDef.meaning.appendShortDefs([def])
    expect(withDef.isPopulated()).toBeTruthy()
  })

  afterAll(() => {
    // Clean a test environment up
    lexeme = undefined
  })
})
