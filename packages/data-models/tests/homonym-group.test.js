/* eslint-env jest */
import HomonymGroup from '@/homonym-group.js'
import Homonym from '@/homonym.js'
import Lexeme from '@/lexeme.js'
import Lemma from '@/lemma.js'
import Inflection from '@/inflection.js'
import Language from '@/language.js'

describe('homonym.test.js', () => {
  let lexeme1, lexeme2
  const TARGET_WORD = 'Target Word'

  beforeEach(() => {
    lexeme1 = new Lexeme(
      new Lemma('word1', Language.GREEK),
      [
        new Inflection('stem1', 'grc'),
        new Inflection('stem2', 'grc')
      ]
    )
    lexeme2 = new Lexeme(
      new Lemma('word2', Language.GREEK),
      [
        new Inflection('stem3', 'grc'),
        new Inflection('stem4', 'grc')
      ]
    )
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('HomonymGroup: can be created with no homonyms', () => {
    const hg = new HomonymGroup()
    expect(hg.homonyms).toEqual([])
  })

  it('HomonymGroup: creates a group several homonyms', () => {
    const homonym1 = new Homonym([lexeme1], 'a form')
    const homonym2 = new Homonym([lexeme2], 'a form')
    const hg = new HomonymGroup([homonym1, homonym2])
    expect(hg.homonyms).toEqual([homonym1, homonym2])
  })

  it('HomonymGroup: hasHomonyms returns false in no homonyms are present', () => {
    const hg = new HomonymGroup()
    expect(hg.hasHomonyms).toBeFalsy()
  })

  it('HomonymGroup: hasHomonyms returns true if there are some homonyms', () => {
    const homonym1 = new Homonym([lexeme1], 'a form')
    const hg = new HomonymGroup([homonym1])
    expect(hg.hasHomonyms).toBeTruthy()
  })

  it('HomonymGroup: toHomonym fails if no target word is provided', () => {
    expect(() => new HomonymGroup().toHomonym()).toThrowError(HomonymGroup.errors.NO_TARGET_WORD)
  })

  it('HomonymGroup: toHomonym fails if a group has no homonyms', () => {
    expect(() => new HomonymGroup().toHomonym(TARGET_WORD)).toThrowError('Lexemes data should not be empty.')
  })

  it('HomonymGroup: toHomonym creates a homonym from a single homonym', () => {
    const homonym1 = new Homonym([lexeme1], 'a form')
    const homonym = new HomonymGroup([homonym1]).toHomonym(TARGET_WORD)
    expect(homonym.targetWord).toEqual(TARGET_WORD)
    expect(homonym.lexemes).toEqual([lexeme1])
  })

  it('HomonymGroup: toHomonym creates a homonym from multiple homonyms', () => {
    const homonym1 = new Homonym([lexeme1], 'a form')
    const homonym2 = new Homonym([lexeme2], 'a form')
    const homonym = new HomonymGroup([homonym1, homonym2]).toHomonym(TARGET_WORD)
    expect(homonym.targetWord).toEqual(TARGET_WORD)
    expect(homonym.lexemes).toEqual([lexeme1, lexeme2])
  })
})
