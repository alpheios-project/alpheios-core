/* eslint-env jest */
'use strict'
import FeatureImporter from '../src/feature_importer.js'

describe('FeatureImporter object', () => {
  beforeAll(() => {
  })

  test('Should be initialized properly', () => {
    let importer = new FeatureImporter()
    expect(importer).toEqual({
      hash: {}
    })
  })

  test('map method should create proper mapping', () => {
    let importer = new FeatureImporter()
    importer.map('value1', 'valueOne').map('value2', 'valueTwo')
    expect(importer).toEqual({'hash': {'value1': 'valueOne', 'value2': 'valueTwo'}})
  })

  test('map method should overwrite old values', () => {
    let importer = new FeatureImporter()
    importer.map('value1', 'valueOne').map('value2', 'valueTwo')
    importer.map('value1', 'newValueOne')
    expect(importer).toEqual({'hash': {'value1': 'newValueOne', 'value2': 'valueTwo'}})
  })

  test('map method should not allow empty arguments', () => {
    let importer = new FeatureImporter()
    expect(() => importer.map('value')).toThrowError(/empty/)
  })

  test('has method should check if value is in a map properly', () => {
    let importer = new FeatureImporter()
    importer.map('value1', 'valueOne').map('value2', 'valueTwo')
    expect(importer.has('value2')).toBeTruthy()
  })

  test('get method should return a proper library object', () => {
    let importer = new FeatureImporter()
    let key = 'value2'
    let value = 'valueTwo'
    importer.map('value1', 'valueOne').map(key, value)
    expect(importer.get(key)).toEqual(value)
  })

  test('get method should throw an error if mapping is not found', () => {
    let importer = new FeatureImporter()
    expect(() => importer.get('incorrect value')).toThrowError(/not found/)
  })

  afterAll(() => {
    // Clean a test environment up
  })
})
