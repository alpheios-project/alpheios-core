/* eslint-env jest */
'use strict'
import Feature from '../src/feature.js'
import LanguageModelFactory from '../src/language_model_factory.js'

describe('Feature object', () => {
  let featureGreek1, featureValue1
  let languageGreek

  beforeAll(() => {
        // Create a test environment
    featureValue1 = 'featureValueOne'
    languageGreek = LanguageModelFactory.getLanguageForCode('grc')
    featureGreek1 = new Feature(featureValue1, Feature.types.number, languageGreek)
  })

  test('Should be initialized properly', () => {
    expect(featureGreek1).toEqual({
      value: featureValue1,
      type: Feature.types.number,
      language: languageGreek
    })
  })

  test('Constructor should throw an exception if no arguments are provided', () => {
    expect(() => {
      let f = new Feature()
      console.log(f)
    }).toThrow()
  })

  test('Constructor should throw an exception if less than 3 arguments are provided', () => {
    expect(() => {
      let f = new Feature(featureValue1, Feature.types.number)
      console.log(f)
    }).toThrowError(/requires a language/)
  })

  test('Constructor should throw an exception if any incorrect values of arguments are provided', () => {
    expect(() => {
      let f = new Feature(featureValue1, 'incorrect value', languageGreek)
      console.log(f)
    }).toThrowError(/not supported/)
  })

  test('Constructor should throw an exception if correct argument values are provided in incorrect order', () => {
    expect(() => {
      let f = new Feature(featureValue1, languageGreek, Feature.types.number)
      console.log(f)
    }).toThrowError(/not supported/)
  })

  afterAll(() => {
        // Clean a test environment up
    featureGreek1 = undefined
  })
})
