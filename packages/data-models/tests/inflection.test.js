/* eslint-env jest */
'use strict'
import Inflection from '../src/inflection.js'
import Feature from '../src/feature.js'
import * as Constants from '../src/constants.js'

describe('Inflection object', () => {
  let inflection, grc

  beforeAll(() => {
        // Create a test environment
    grc = Constants.STR_LANG_CODE_GRC
    inflection = new Inflection('stem', grc)
  })

  test('Should be initialized properly', () => {
    expect(inflection).toEqual({
      stem: 'stem',
      suffix: null,
      prefix: null,
      example: null,
      language: grc
    })
  })

  test('Should not allow empty arguments', () => {
    expect(() => new Inflection('stem', '')).toThrowError(/empty/)
  })

  test('Should not allow unsupported languages', () => {
    expect(() => new Inflection('stem', 'egyptian')).toThrowError(/not supported/) // eslint-disable-line  no-return-assign
  })

  test('feature method should add a single feature to the inflection', () => {
    inflection.feature = new Feature('masculine', Feature.types.gender, grc)
    expect(inflection).toEqual(expect.objectContaining({
      gender: [{
        language: 'grc',
        type: 'gender',
        value: 'masculine'
      }]
    }))
  })

  test('feature method should add multiple feature values to the inflection', () => {
    inflection.feature = [
      new Feature('masculine', Feature.types.gender, grc),
      new Feature('feminine', Feature.types.gender, grc)
    ]
    expect(inflection).toEqual(expect.objectContaining({
      gender: [
        {
          language: 'grc',
          type: 'gender',
          value: 'masculine'
        },
        {
          language: 'grc',
          type: 'gender',
          value: 'feminine'
        }
      ]
    }))
  })

  test('feature method should throw an error if no arguments are provided', () => {
    expect(() => inflection.feature = '').toThrowError(/empty/) // eslint-disable-line no-return-assign
  })

  test('feature method should throw an error if argument(s) are of the wrong type', () => {
    expect(() => inflection.feature = 'some value').toThrowError(/Feature/) // eslint-disable-line no-return-assign
  })

  test('feature method should not allow a feature language to be different from a language of an inflection', () => {
    expect(() => inflection.feature = new Feature('masculine', Feature.types.gender, Constants.STR_LANG_CODE_LAT)) // eslint-disable-line no-return-assign
            .toThrowError(/not match/)
  })

  test('featureMatch', () => {
    let one = new Inflection('nat', 'lat', 'urae', null, null)
    one.feature = [new Feature('feminine', Feature.types.gender, 'lat'),
      new Feature('masculine', Feature.types.gender, 'lat')]
    one.feature = new Feature('verb', Feature.types.part, 'lat')
    console.log(one)
    let two = new Inflection('nat', 'lat', 'urae', null, null)
    two.feature = new Feature('feminine', Feature.types.gender, 'lat')
    two.feature = new Feature('noun', Feature.types.part, 'lat')
    expect(one.featureMatch(Feature.types.gender, two)).toEqual(true)
    expect(one.featureMatch(Feature.types.part, two)).toEqual(false)
  })

  afterAll(() => {
        // Clean a test environment up
    inflection = undefined
  })
})
