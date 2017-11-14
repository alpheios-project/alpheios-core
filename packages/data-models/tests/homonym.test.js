/* eslint-env jest */
import Homonym from '../src/homonym.js'
import Lexeme from '../src/lexeme.js'
import Lemma from '../src/lemma.js'
import Inflection from '../src/inflection.js'

describe('Homonym', () => {
  let homonym, lexeme1, lexeme2

  beforeAll(() => {
    // Create a test environment

    lexeme1 = new Lexeme(
        new Lemma('word1', 'grc'),
      [
        new Inflection('stem1', 'grc'),
        new Inflection('stem2', 'grc')
      ]
      )
    lexeme2 = new Lexeme(
        new Lemma('word2', 'grc'),
      [
        new Inflection('stem3', 'grc'),
        new Inflection('stem4', 'grc')
      ]
      )
    homonym = new Homonym([lexeme1, lexeme2])
  })

  test('Constructor should initialize an properly.', () => {
    expect(homonym.lexemes).toEqual([lexeme1, lexeme2])
  })

  test('Constructor should not allow empty arguments.', () => {
    expect(() => new Homonym()).toThrowError(/empty/)
  })

  test('Constructor should not allow an argument this is not an array.', () => {
    expect(() => new Homonym('some value')).toThrowError(/array/)
  })

  test('Cosntructor should not allow arguments of incorrect type.', () => {
    expect(() => new Homonym(['some value'])).toThrowError(/Lexeme/)
  })

  test('language() should return a language of a homonym.', () => {
    expect(homonym.language).toBe('grc')
  })

  afterAll(() => {
    // Clean a test environment up
    homonym = undefined
  })
})
