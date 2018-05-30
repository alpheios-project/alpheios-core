/* eslint-env jest */
import Lemma from '../src/lemma.js'

import Translation from '../src/translation.js'

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
      ID: expect.anything(),
      word: word,
      languageCode: 'lat',
      languageID: expect.anything(),
      principalParts: [],
      features: {}
    })
    expect(lemmaWithParts).toEqual({
      ID: expect.anything(),
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

  // test('Should not allow unsupported languages', () => {
  //  expect(() => new Lemma('someword', 'egyptian')).toThrowError(/not supported/)
  // })

  test('addTranslation - empty translation should give an error', () => {
    expect(() => lemma.addTranslation()).toThrowError(/empty/)
  })

  test('addTranslation - not Translation object should give an error', () => {
    expect(() => lemma.addTranslation('test translation')).toThrowError(/Translation object/)
  })

  test('addTranslation - should append Translation object as an attribute without errors', () => {
    let testTranslation = new Translation(lemma, [])
    lemma.addTranslation(testTranslation)

    expect(lemma.translation).not.toBe(undefined)
    expect(lemma.translation.lemmaWord).toEqual(lemma.word)
    expect(Array.isArray(lemma.translation.glosses)).toBeTruthy()
  })

  afterAll(() => {
    // Clean a test environment up
    lemma = undefined
  })
})
