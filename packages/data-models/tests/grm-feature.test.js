/* eslint-env jest */
'use strict'
import GrmFeature from '../src/grm-feature.js'
import LanguageModelFactory from '../src/language_model_factory.js'

describe('GrmFeature object', () => {
  let featureGreek1, featureValue1
  let languageGreek

  beforeAll(() => {
    // Create a test environment
    featureValue1 = 'featureValueOne'
    languageGreek = LanguageModelFactory.getLanguageForCode('grc').toCode()
    featureGreek1 = new GrmFeature(featureValue1, GrmFeature.types.number, languageGreek)
  })

  test('Should be initialized properly', () => {
    expect(featureGreek1).toEqual({
      value: featureValue1,
      type: GrmFeature.types.number,
      languageCode: languageGreek,
      languageID: LanguageModelFactory.getLanguageIdFromCode(languageGreek),
      sortOrder: 1
    })
  })

  test('Constructor should throw an exception if no arguments are provided', () => {
    expect(() => {
      let f = new GrmFeature()
      console.log(f)
    }).toThrow()
  })

  test('Constructor should throw an exception if less than 3 arguments are provided', () => {
    expect(() => {
      let f = new GrmFeature(featureValue1, GrmFeature.types.number)
      console.log(f)
    }).toThrowError(/requires a language/)
  })

  test('Constructor should throw an exception if any incorrect values of arguments are provided', () => {
    expect(() => {
      let f = new GrmFeature(featureValue1, 'incorrect value', languageGreek)
      console.log(f)
    }).toThrowError(/not supported/)
  })

  test('Constructor should throw an exception if correct argument values are provided in incorrect order', () => {
    expect(() => {
      let f = new GrmFeature(featureValue1, languageGreek, GrmFeature.types.number)
      console.log(f)
    }).toThrowError(/not supported/)
  })

  test('toString returns value', () => {
    let f = new GrmFeature(featureValue1, GrmFeature.types.number, languageGreek)
    expect(`${f}`).toEqual(featureValue1)
  })

  test('toLocaleStringAbbr returns value', () => {
    let f = new GrmFeature('feminine', GrmFeature.types.gender, 'lat')
    expect(f.toLocaleStringAbbr('en')).toEqual('f')
  })

  test('hasValue', () => {
    let f = new GrmFeature(['foo', 'bar'], GrmFeature.types.gender, 'lat')
    expect(f.hasValue('foo')).toBeTruthy()
    expect(f.hasValue('bar')).toBeTruthy()
    expect(f.hasValue('junk')).toBeFalsy()
  })

  afterAll(() => {
    // Clean a test environment up
    featureGreek1 = undefined
  })
})
