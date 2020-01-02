/* eslint-env jest */
/* eslint-disable no-unused-vars */
'use strict'
import Feature from '@/feature.js'
import * as Constants from '@/constants.js'
import FeatureImporter from '@/feature_importer.js'

describe('feature.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  let latID = Constants.LANG_LATIN

  it('1 Feature - check required arguments for Feature constructor', () => {
    expect(function () {
      let l = new Feature('fooType')
      console.log(l)
    }).toThrow(new Error('Features of "fooType" type are not supported.'))

    expect(function () {
      let l = new Feature('word')
      console.log(l)
    }).toThrow(new Error('Feature should have a non-empty value(s).'))

    expect(function () {
      let l = new Feature('word', {})
      console.log(l)
    }).toThrow(new Error('No language ID is provided'))
  })

  it('2 Feature - create with min arguments', () => {
    let feature = new Feature('word', 'fooword', latID)

    expect(feature.type).toEqual('word')
    expect(feature.languageID).toEqual(latID)
    expect(feature.sortOrder).toEqual(1)
    expect(feature.allowedValues).toEqual([])

    expect(feature._data).toEqual([ { value: 'fooword', sortOrder: 1 } ])

    expect(feature.allowsUnrestrictedValues).toBeTruthy()
    expect(feature.valuesUnrestricted).toBeTruthy()
  })

  it('3 Feature - create with full arguments', () => {
    let feature = new Feature('word', 'fooword', latID, 10, ['val1', 'val2'])

    expect(feature.sortOrder).toEqual(10)
    expect(feature.allowedValues).toEqual(['val1', 'val2'])

    expect(feature.allowsUnrestrictedValues).toBeFalsy()
    expect(feature.valuesUnrestricted).toBeFalsy()
  })

  it('4 Feature - check dataValuesFromInput, sort, compareTo, items, isEqual', () => {
    // A single value
    let res = Feature.dataValuesFromInput('foovalue1')
    expect(res).toEqual([ { value: 'foovalue1', sortOrder: 1 } ])

    // A single value in an array
    res = Feature.dataValuesFromInput(['foovalue2'])
    expect(res).toEqual([ { value: 'foovalue2', sortOrder: 1 } ])

    // Multiple values with softOrder set automatically
    res = Feature.dataValuesFromInput(['valueA', 'valueB', 'valueC'])
    // Items that goes earlier in an array will receive the highest sort order numbers.
    expect(res).toEqual([
      { value: 'valueA', sortOrder: 3 },
      { value: 'valueB', sortOrder: 2 },
      { value: 'valueC', sortOrder: 1 }
    ])

    // Multiple values with specified sort order
    res = Feature.dataValuesFromInput([ ['foovalue3', 2], ['foovalue4', 1] ])
    expect(res).toEqual([ { value: 'foovalue3', sortOrder: 2 }, { value: 'foovalue4', sortOrder: 1 } ])

    const feature1 = new Feature('word', [ ['foovalue3', 1], ['foovalue4', 2] ], latID)
    expect(feature1._data).toEqual([ { value: 'foovalue4', sortOrder: 2 }, { value: 'foovalue3', sortOrder: 1 } ])

    const feature2 = new Feature('word', [ ['foovalue4', 1], ['foovalue3', 1] ], latID)
    expect(feature2._data).toEqual([ { value: 'foovalue3', sortOrder: 1 }, { value: 'foovalue4', sortOrder: 1 } ])

    expect(feature1.compareTo(feature2)).toEqual(-1)
    expect(feature2.compareTo(feature1)).toEqual(1)

    expect(feature1.isEqual(feature2)).toBeFalsy()
    expect(feature1.isEqual(feature1)).toBeTruthy()
  })

  it('5 Feature -  isEqual variants check', () => {
    let a, b

    // expects isEqual to correctly equate two single value features
    a = new Feature(Feature.types.note, 'valuea', latID)
    b = new Feature(Feature.types.note, 'valuea', latID)
    expect(a.isEqual(b)).toBeTruthy()

    // expects isEqual to correctly equate two multi value features
    a = new Feature(Feature.types.note, ['valuea', 'valueb'], latID)
    b = new Feature(Feature.types.note, ['valuea', 'valueb'], latID)
    expect(a.isEqual(b)).toBeTruthy()

    // expects isEqual to correctly not equate two single value features
    a = new Feature(Feature.types.note, 'valuea', latID)
    b = new Feature(Feature.types.note, 'valueb', latID)
    expect(a.isEqual(b)).toBeFalsy()

    // expects isEqual to correctly not equate two multi value features
    a = new Feature(Feature.types.note, ['valuea', 'valueb'], latID)
    b = new Feature(Feature.types.note, ['valuea', 'valuec'], latID)
    expect(a.isEqual(b)).toBeFalsy()

    // expects isEqual to correctly not equate two single value features of different type
    a = new Feature(Feature.types.note, 'valuea', Constants.LANG_LATIN)
    b = new Feature(Feature.types.frequency, 'valuea', Constants.LANG_LATIN)
    expect(a.isEqual(b)).toBeFalsy()

    // expects isEqual to correctly not equate two single value features of different language
    a = new Feature(Feature.types.note, 'valuea', Constants.LANG_GREEK)
    b = new Feature(Feature.types.note, 'valuea', Constants.LANG_LATIN)
    expect(a.isEqual(b)).toBeFalsy()

    // expects isEqual to correctly not throw an error for a null value
    a = new Feature(Feature.types.note, 'valuea', Constants.LANG_GREEK)
    b = null
    expect(a.isEqual(b)).toBeFalsy()
  })

  it('6 Feature - compareTo variants check', () => {
    let a, b

    // expects to Feature a to be sorted after Feature b
    a = new Feature(Feature.types.frequency, [['lower', 1]], Constants.LANG_GREEK)
    b = new Feature(Feature.types.frequency, [['higher', 2]], Constants.LANG_GREEK)
    expect(a.compareTo(b)).toBeGreaterThan(0)
    expect([a, b].sort((a, b) => a.compareTo(b))).toEqual([b, a])

    // expects to Feature a to be sorted before Feature b
    a = new Feature(Feature.types.frequency, [['lower', 3]], Constants.LANG_GREEK)
    b = new Feature(Feature.types.frequency, [['higher', 1]], Constants.LANG_GREEK)
    expect(a.compareTo(b)).toBeLessThan(0)
    expect([a, b].sort((a, b) => a.compareTo(b))).toEqual([a, b])

    // expects to Feature a to be sorted the same as Feature b
    a = new Feature(Feature.types.frequency, [['same', 1]], Constants.LANG_GREEK)
    b = new Feature(Feature.types.frequency, [['same', 1]], Constants.LANG_GREEK)
    expect(a.compareTo(b)).toEqual(0)
    expect([a, b].sort((a, b) => a.compareTo(b))).toEqual([a, b])

    // expects to multi-valued Features to sort correctly
    a = new Feature(Feature.types.frequency, [['lower', 1], ['highest', 3]], Constants.LANG_GREEK)
    b = new Feature(Feature.types.frequency, [['higher', 2]], Constants.LANG_GREEK)
    expect(a.compareTo(b)).toBeLessThan(0)
    expect([a, b].sort((a, b) => a.compareTo(b))).toEqual([a, b])

    // expects null values to be handled
    a = new Feature(Feature.types.frequency, [['lower', 1], ['highest', 3]], Constants.LANG_GREEK)
    b = null
    expect(a.compareTo(b)).toBeLessThan(0)
  })

  it('7 Feature - check get types, isAllowedType, defaultSortOrder, joinSeparator, defaultImporterName', () => {
    expect(Feature.types).toBeInstanceOf(Object)
    expect(Feature.defaultSortOrder).toBeGreaterThan(0)
    expect(Feature.joinSeparator.length).toBeGreaterThan(0)
    expect(Feature.defaultImporterName.length).toBeGreaterThan(0)

    expect(Feature.isAllowedType('word')).toBeTruthy()
    expect(Feature.isAllowedType('fooword')).toBeFalsy()
  })

  it('8 Feature - check items, values, value, getValue, valQty, isEmpty, isSingle, isMultiple, hasValue, hasValues, hasSomeValues', () => {
    let feature = new Feature('word', [ ['foovalue1', 2], ['foovalue2', 1] ], latID)

    expect(feature.items).toEqual(feature._data)
    expect(feature.values).toEqual(['foovalue1', 'foovalue2'])
    expect(feature.value).toEqual(`foovalue1${Feature.joinSeparator}foovalue2`)
    expect(feature.toString()).toEqual(`foovalue1${Feature.joinSeparator}foovalue2`)

    expect(feature.getValue('foovalue1')).toEqual({ value: 'foovalue1', sortOrder: 2 })
    expect(feature.valQty).toEqual(2)
    expect(feature.isEmpty).toBeFalsy()
    expect(feature.isSingle).toBeFalsy()
    expect(feature.isMultiple).toBeTruthy()

    expect(feature.hasValue('foovalue1')).toBeTruthy()
    expect(feature.hasValue('foovalue3')).toBeFalsy()

    expect(feature.hasValues(['foovalue1', 'foovalue3'])).toBeFalsy()
    expect(feature.hasValues(['foovalue1', 'foovalue2'])).toBeTruthy()

    expect(feature.hasSomeValues(['foovalue1', 'foovalue3'])).toBeTruthy()
    expect(feature.hasSomeValues(['foovalue4', 'foovalue3'])).toBeFalsy()
  })

  it('9 Feature singleValue should return a value of the feature', () => {
    const value = 'A test value'
    let feature = new Feature(Feature.types.note, value, latID)
    expect(feature.singleValue).toBe(value)
  })

  it('10 Feature singleValue should preserve a value type', () => {
    const number = 5
    let feature = new Feature(Feature.types.note, number, latID)
    expect(feature.singleValue).toEqual(expect.any(Number))
  })

  it('11 Feature singleValue should return undefined if there is no value', () => {
    const number = 5
    let feature = new Feature(Feature.types.note, [], latID)
    expect(feature.singleValue).toBeUndefined()
  })

  it('12 Feature singleValue should throw an error if there is more than one value', () => {
    let feature = new Feature(Feature.types.note, ['one', 'two'], latID)
    expect(() => feature.singleValue).toThrowError(Feature.errMsgs.NO_SINGLE_VALUE)
  })

  it('13 Feature - check addValue, addValues, removeValue', () => {
    let feature = new Feature('word', [ ['foovalue1', 2], ['foovalue2', 1] ], latID)

    let checkRes = [
      { value: 'foovalue3', sortOrder: 3 },
      { value: 'foovalue1', sortOrder: 2 },
      { value: 'foovalue2', sortOrder: 1 }
    ]

    feature.addValue('foovalue3', 3)
    expect(feature._data).toEqual(checkRes)

    feature.addValue('foovalue10')
    checkRes = [
      { value: 'foovalue3', sortOrder: 3 },
      { value: 'foovalue1', sortOrder: 2 },
      { value: 'foovalue10', sortOrder: 1 },
      { value: 'foovalue2', sortOrder: 1 }
    ]
    expect(feature._data).toEqual(checkRes)

    feature.addValue('foovalue3', 3)
    expect(feature._data).toEqual(checkRes)
    expect(console.warn).toHaveBeenCalledWith(`Value "foovalue3" already exists. If you want to change it, use "getValue" to access it directly.`)

    feature.addValues([ ['foovalue4', 4], ['foovalue5', 5] ])

    checkRes = [
      { value: 'foovalue5', sortOrder: 5 },
      { value: 'foovalue4', sortOrder: 4 },
      { value: 'foovalue3', sortOrder: 3 },
      { value: 'foovalue1', sortOrder: 2 },
      { value: 'foovalue10', sortOrder: 1 },
      { value: 'foovalue2', sortOrder: 1 }
    ]

    expect(feature._data).toEqual(checkRes)

    feature.addValues([ ['foovalue4', 4], ['foovalue6', 6] ])

    expect(feature._data).toEqual(checkRes)
    expect(console.warn).toHaveBeenCalledWith(`One or several values from "foovalue4,foovalue6" already exist. If you want to change it, use "getValue" to access a value directly.`)

    feature.removeValue()
    expect(console.warn).toHaveBeenCalledWith(`This feature is not implemented yet`)
  })

  it('14 Feature - check createFeature, createFeatures, getCopy', () => {
    let feature = new Feature('word', 'fooword', latID)

    let res1 = feature.createFeature('fooword2')
    expect(res1).toBeInstanceOf(Feature)
    expect(res1.type).toEqual('word')
    expect(res1.languageID).toEqual(latID)

    expect(res1._data).toEqual([{ value: 'fooword2', sortOrder: 1 }])

    let res2 = feature.createFeatures([ ['foovalue4', 4] ])
    expect(res2).toBeInstanceOf(Feature)
    expect(res2.type).toEqual('word')
    expect(res2.languageID).toEqual(latID)

    expect(res2._data).toEqual([{ value: 'foovalue4', sortOrder: 4 }])

    let res3 = feature.getCopy()
    expect(res3).toBeInstanceOf(Feature)
    expect(res3.type).toEqual('word')
    expect(res3.languageID).toEqual(latID)

    expect(res3._data).toEqual([{ value: 'fooword', sortOrder: 1 }])
  })

  it('15 Feature - check addImporter, getImporter', () => {
    let feature = new Feature('word', 'fooword', latID)
    feature.addImporter()

    expect(feature.importers).toBeInstanceOf(Map)
    expect(feature.importers.get(Feature.defaultImporterName)).toEqual(new FeatureImporter())

    feature.addImporter(undefined, 'fooname')
    expect(feature.importers.size).toEqual(2)
    expect(feature.importers.get('fooname')).toEqual(new FeatureImporter())

    expect(feature.getImporter('fooname')).toEqual(feature.importers.get('fooname'))

    expect(feature.getImporter()).toEqual(feature.importers.get(Feature.defaultImporterName))

    expect(function () {
      let l = feature.getImporter('fooname1')
      console.log(l)
    }).toThrow(new Error(`Importer "fooname1" does not exist`))
  })

  it('16 Feature - check addFromImporter', () => {
    let feature = new Feature('word', 'fooword', latID)

    expect(function () {
      let l = feature.addFromImporter([ ['foovalue1', 1] ], 'fooimporter')
      console.log(l)
    }).toThrow(new Error(`Importer "fooimporter" does not exist`))

    feature.addImporter()

    expect(function () {
      let l = feature.addFromImporter([ ['foovalue1', 1] ], 'fooimporter')
      console.log(l)
    }).toThrow(new Error(`Importer "fooimporter" does not exist`))

    expect(function () {
      let l = feature.addFromImporter([ ['foovalue1', 2] ])
      console.log(l)
    }).toThrow(new Error('A value "foovalue1" is not found in the importer.'))

    feature.addImporter(new FeatureImporter(['foovalue1']), 'default1')
    feature.addFromImporter([ ['foovalue1', 2] ], 'default1')
    expect(feature._data).toEqual([{ value: 'foovalue1', sortOrder: 2 }, { value: 'fooword', sortOrder: 1 }])
  })

  it('17 Feature - check createFromImporter', () => {
    let feature = new Feature('word', 'fooword', latID)

    expect(function () {
      let l = feature.createFromImporter([ ['foovalue1'] ], 'fooimporter')
      console.log(l)
    }).toThrow(new Error(`Importer "fooimporter" does not exist`))

    feature.addImporter()

    expect(function () {
      let l = feature.createFromImporter([ ['foovalue1'] ], 'fooimporter')
      console.log(l)
    }).toThrow(new Error(`Importer "fooimporter" does not exist`))

    feature.addImporter(undefined, 'fooimporter')
    expect(function () {
      let l = feature.createFromImporter(['foovalue1'], 'fooimporter')
      console.log(l)
    }).toThrow(new Error('A value "foovalue1" is not found in the importer.'))

    feature.addImporter(new FeatureImporter(['foovalue1', 'foovalue2']), 'fooimporter')
    let res1 = feature.createFromImporter(['foovalue1', 'foovalue2'], 'fooimporter')

    expect(res1).toBeInstanceOf(Feature)
    expect(res1.type).toEqual('word')
    expect(res1.languageID).toEqual(latID)

    expect(res1._data).toEqual([{ value: 'foovalue1', sortOrder: 2 }, { value: 'foovalue2', sortOrder: 1 }])

    feature.addImporter(new FeatureImporter(['foovalue10']))
    let res2 = feature.createFromImporter('foovalue10')

    expect(res2._data).toEqual([{ value: 'foovalue10', sortOrder: 1 }])
  })
})
