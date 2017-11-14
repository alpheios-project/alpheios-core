/* eslint-env jest */
import FeatureType from '../src/feature_type.js'
import Feature from '../src/feature.js'
import FeatureImporter from '../src/feature_importer.js'

describe('FeatureType', () => {
  let featureType

  beforeAll(() => {
    // Create a test environment
    featureType = new FeatureType(Feature.types.declension, ['first', ['second', 'third'], 'fourth'], 'lat')
  })

  test('Should be initialized properly', () => {
    expect(featureType).toEqual({
      '_orderIndex': ['first', ['second', 'third'], 'fourth'],
      '_orderLookup': {'first': 0, 'second': 1, 'third': 1, 'fourth': 2},
      'first': {'language': 'lat', 'type': 'declension', 'value': 'first'},
      'second': {'language': 'lat', 'type': 'declension', 'value': 'second'},
      'third': {'language': 'lat', 'type': 'declension', 'value': 'third'},
      'fourth': {'language': 'lat', 'type': 'declension', 'value': 'fourth'},
      'language': 'lat',
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
    expect(featureType.get(value)).toEqual({
      'language': 'lat',
      'type': Feature.types.declension,
      'value': value
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
      'hash': {}
    })
  })

  test('addImporter method should create an Importer object inside a FeatureType object', () => {
    featureType.addImporter('some value')
    expect(featureType).toEqual(expect.objectContaining({
      'importer': {
        'some value': {hash: {}}
      }
    }))
  })

  test('addImporter method with no value should throw an exception', () => {
    expect(() => featureType.addImporter()).toThrowError(/non-empty/)
  })

  test('orderedValues() method should return a new properly initialized Importer object', () => {
    expect(featureType.orderedValues).toEqual(['first', ['second', 'third'], 'fourth'])
  })

  test('orderedFeatures() should return type features in an indexed order.', () => {
    expect(featureType.orderedFeatures).toEqual([
      {'language': 'lat', 'type': 'declension', 'value': 'first'},
      {'language': 'lat', 'type': 'declension', 'value': ['second', 'third']},
      {'language': 'lat', 'type': 'declension', 'value': 'fourth'}
    ])
  })

  test('orderedValues() should return type features in an indexed order.', () => {
    expect(featureType.orderedValues).toEqual(['first', ['second', 'third'], 'fourth'])
  })

  test('orderLookup method should return a new properly initialized Importer object', () => {
    expect(featureType.orderLookup).toEqual({'first': 0, 'second': 1, 'third': 1, 'fourth': 2})
  })

  test('order setter should change an order of items properly', () => {
    let f1 = new Feature('first', Feature.types.declension, 'lat')
    let f2 = new Feature('second', Feature.types.declension, 'lat')
    let f3 = new Feature('third', Feature.types.declension, 'lat')
    let f4 = new Feature('fourth', Feature.types.declension, 'lat')
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
    let f1 = new Feature('first', Feature.types.gender, 'lat')
    expect(() => featureType.order = [f1]).toThrowError(/is different/) //eslint-disable-line
  })

  test('order setter with an argument(s) of mismatching language should throw an exception', () => {
    let f1 = new Feature('first', Feature.types.declension, 'grc')
    expect(() => featureType.order = [f1]).toThrowError(/is different/) // eslint-disable-line
  })

  test('order setter with an argument(s) of values that are not stored should throw an exception', () => {
    let f1 = new Feature('fifth', Feature.types.declension, 'lat')
    expect(() => featureType.order = [f1]).toThrowError(/not stored/) //eslint-disable-line
  })

  afterAll(() => {
    // Clean a test environment up
    featureType = undefined
  })
})
