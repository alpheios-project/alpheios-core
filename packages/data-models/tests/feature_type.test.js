/* eslint-env jest */
import FeatureType from '../src/feature_type.js'
import Feature from '../src/feature.js'
import FeatureImporter from '../src/feature_importer.js'
import * as Constants from '../src/constants.js'

describe('FeatureType', () => {
  let featureType

  beforeAll(() => {
    // Create a test environment
    featureType = new FeatureType(Feature.types.declension, ['first', ['second', 'third'], 'fourth'], 'lat')
  })

  test('Should be initialized properly', () => {
    expect(featureType).toMatchObject({
      '_orderIndex': ['first', ['second', 'third'], 'fourth'],
      '_orderLookup': {'first': 0, 'second': 1, 'third': 1, 'fourth': 2},
      'first': {'languageID': Constants.LANG_LATIN, 'type': 'declension', '_data': [{'sortOrder': 1, 'value': 'first'}]},
      'second': {'languageID': Constants.LANG_LATIN, 'type': 'declension', '_data': [{'sortOrder': 1, 'value': 'second'}]},
      'third': {'languageID': Constants.LANG_LATIN, 'type': 'declension', '_data': [{'sortOrder': 1, 'value': 'third'}]},
      'fourth': {'languageID': Constants.LANG_LATIN, 'type': 'declension', '_data': [{'sortOrder': 1, 'value': 'fourth'}]},
      'languageCode': 'lat',
      'languageID': Constants.LANG_LATIN,
      'type': Feature.types.declension
    })
  })

  test('Constructor should throw an exception if no arguments are provided', () => {
    expect(() => {
      new new FeatureType() // eslint-disable-line
    }).toThrow()
  })

  test('Constructor should throw an exception if arguments are provided in wrong order', () => {
    expect(() => {
      new new FeatureType(Feature.types.declension, 'lat', ['first', 'second', 'third'])() // eslint-disable-line
    }).toThrowError(/should be an array/)
  })

  test('Get method should return a new Feature object that is initialized properly', () => {
    let value = 'some value'
    expect(featureType.get(value)).toMatchObject({
      'languageID': Constants.LANG_LATIN,
      'type': Feature.types.declension,
      '_data': [{'sortOrder': 1, 'value': 'some value'}]
    })
  })

  test('Get method with no value should throw an exception', () => {
    expect(() => featureType.get()).toThrowError(/non-empty/)
  })

  test('addImporter method should return a new Importer object', () => {
    expect(featureType.addImporter('some value')).toBeInstanceOf(FeatureImporter)
  })

  test('addImporter method should return a new properly initialized Importer object', () => {
    let importerName = 'some value'
    expect(featureType.addImporter(importerName)).toEqual({
      hash: {},
      returnUnknown: false
    })
  })

  test('addImporter method should create an Importer object inside a FeatureType object', () => {
    featureType.addImporter('some value')
    expect(featureType).toMatchObject({
      'importer': {
        'some value': {hash: {}}
      }
    })
  })

  test('addImporter method with no value should throw an exception', () => {
    expect(() => featureType.addImporter()).toThrowError(/non-empty/)
  })

  test('orderedValues() method should return a new properly initialized Importer object', () => {
    expect(featureType.orderedValues).toEqual(['first', ['second', 'third'], 'fourth'])
  })

  test('orderedFeatures() should return type features in an indexed order.', () => {
    expect(featureType.orderedFeatures).toMatchObject([
      {'languageID': Constants.LANG_LATIN, 'type': 'declension', '_data': [{'sortOrder': 1, 'value': 'first'}]},
      {'languageID': Constants.LANG_LATIN, 'type': 'declension', '_data': [{'sortOrder': 2, 'value': 'second'}, {'sortOrder': 1, 'value': 'third'}]},
      {'languageID': Constants.LANG_LATIN, 'type': 'declension', '_data': [{'sortOrder': 1, 'value': 'fourth'}]}
    ])
  })

  test('orderedValues() should return type features in an indexed order.', () => {
    expect(featureType.orderedValues).toEqual(['first', ['second', 'third'], 'fourth'])
  })

  test('orderLookup method should return a new properly initialized Importer object', () => {
    expect(featureType.orderLookup).toEqual({'first': 0, 'second': 1, 'third': 1, 'fourth': 2})
  })

  test('order setter should change an order of items properly', () => {
    let f1 = new Feature(Feature.types.declension, 'first', Constants.LANG_LATIN)
    let f2 = new Feature(Feature.types.declension, 'second', Constants.LANG_LATIN)
    let f3 = new Feature(Feature.types.declension, 'third', Constants.LANG_LATIN)
    let f4 = new Feature(Feature.types.declension, 'fourth', Constants.LANG_LATIN)
    featureType.order = [[f4, f2], f3, f1]
    expect(featureType).toEqual(expect.objectContaining({
      '_orderIndex': [['fourth', 'second'], 'third', 'first'],
      '_orderLookup': {'first': 2, 'fourth': 0, 'second': 0, 'third': 1}
    }))
  })

  test('order setter with no argument should throw an exception', () => {
    expect(() => featureType.order = undefined).toThrowError(/non-empty/) // eslint-disable-line
  })

  test('order setter with an empty array argument should throw an exception', () => {
    expect(() => featureType.order = []).toThrowError(/non-empty/) //eslint-disable-line
  })

  test('order setter with an argument(s) of mismatching type should throw an exception', () => {
    let f1 = new Feature(Feature.types.gender, 'first', Constants.LANG_LATIN)
    expect(() => featureType.order = [f1]).toThrowError(/is different/) //eslint-disable-line
  })

  test('order setter with an argument(s) of mismatching language should throw an exception', () => {
    let f1 = new Feature(Feature.types.declension, 'first', Constants.LANG_GREEK)
    expect(() => featureType.order = [f1]).toThrowError(/is different/) // eslint-disable-line
  })

  test('order setter with an argument(s) of values that are not stored should throw an exception', () => {
    let f1 = new Feature(Feature.types.declension, 'fifth', 'lat')
    expect(() => featureType.order = [f1]).toThrowError(/not stored/) //eslint-disable-line
  })

  test('hasUnrestrictedValue', () => {
    let f1 = new FeatureType(Feature.types.age, [FeatureType.UNRESTRICTED_VALUE], 'lat')
    expect(f1.hasUnrestrictedValue()).toBeTruthy()
  })

  afterAll(() => {
    // Clean a test environment up
    featureType = undefined
  })
})
