/* eslint-env jest */
import Lemma from '../src/lemma.js'
describe('Lemma object', () => {
  let lemma, word

  beforeAll(() => {
    // Create a test environment

    word = 'someword'
    lemma = new Lemma(word, 'lat')
  })

  test('Should be initialized properly', () => {
    expect(lemma).toEqual({
      word: word,
      language: 'lat'
    })
  })

  test('Should not allow empty arguments', () => {
    expect(() => new Lemma()).toThrowError(/empty/)
  })

  // test('Should not allow unsupported languages', () => {
  //  expect(() => new Lemma('someword', 'egyptian')).toThrowError(/not supported/)
  // })

  afterAll(() => {
    // Clean a test environment up
    lemma = undefined
  })
})
