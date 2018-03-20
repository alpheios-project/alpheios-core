/* eslint-env jest */
import Constants from '../src/constants.js'
import Lemma from '../src/lemma.js'
import Feature from '../src/grm-feature.js'

describe('Lemma object', () => {
  let lemma, word, lemmaWithParts

  beforeAll(() => {
    // Create a test environment

    word = 'someword'
    lemma = new Lemma(word, 'lat')
    lemmaWithParts = new Lemma(word, 'lat', ['part1', 'part2'])
  })

  test('Should be initialized properly', () => {
    expect(lemma).toEqual({
      word: word,
      languageCode: 'lat',
      languageID: expect.anything(),
      principalParts: [],
      features: {}
    })
    expect(lemmaWithParts).toEqual({
      word: word,
      languageCode: 'lat',
      languageID: expect.anything(),
      principalParts: ['part1', 'part2'],
      features: {}

    })
  })

  test('Should not allow empty arguments', () => {
    expect(() => new Lemma()).toThrowError(/empty/)
  })

  test('key', () => {
    lemma.feature = new Feature(Feature.types.part, 'noun', Constants.LANG_LATIN)
    lemma.feature = new Feature(Feature.types.tense, 'present', Constants.LANG_LATIN)
    expect(lemma.key).toEqual('someword-lat-noun-present')
  })

  // test('Should not allow unsupported languages', () => {
  //  expect(() => new Lemma('someword', 'egyptian')).toThrowError(/not supported/)
  // })

  afterAll(() => {
    // Clean a test environment up
    lemma = undefined
  })
})
