/* eslint-env jest */
'use strict'
import Feature from '../src/feature.js'
import * as Constants from '../src/constants.js'

describe('Feature object', () => {
  it('expects isEqual to correctly equate two single value features', () => {
    let a = new Feature(Feature.types.note, 'valuea', Constants.LANG_LATIN)
    let b = new Feature(Feature.types.note, 'valuea', Constants.LANG_LATIN)
    expect(a.isEqual(b)).toBeTruthy()
  })

  it('expects isEqual to correctly equate two multi value features', () => {
    let a = new Feature(Feature.types.note, ['valuea', 'valueb'], Constants.LANG_LATIN)
    let b = new Feature(Feature.types.note, ['valuea', 'valueb'], Constants.LANG_LATIN)
    expect(a.isEqual(b)).toBeTruthy()
  })

  it('expects isEqual to correctly not equate two single value features', () => {
    let a = new Feature(Feature.types.note, 'valuea', Constants.LANG_LATIN)
    let b = new Feature(Feature.types.note, 'valueb', Constants.LANG_LATIN)
    expect(a.isEqual(b)).toBeFalsy()
  })

  it('expects isEqual to correctly not equate two multi value features', () => {
    let a = new Feature(Feature.types.note, ['valuea', 'valueb'], Constants.LANG_LATIN)
    let b = new Feature(Feature.types.note, ['valuea', 'valuec'], Constants.LANG_LATIN)
    expect(a.isEqual(b)).toBeFalsy()
  })

  it('expects isEqual to correctly not equate two single value features of different type', () => {
    let a = new Feature(Feature.types.note, 'valuea', Constants.LANG_LATIN)
    let b = new Feature(Feature.types.frequency, 'valuea', Constants.LANG_LATIN)
    expect(a.isEqual(b)).toBeFalsy()
  })

  it('expects isEqual to correctly not equate two single value features of different language', () => {
    let a = new Feature(Feature.types.note, 'valuea', Constants.LANG_GREEK)
    let b = new Feature(Feature.types.note, 'valuea', Constants.LANG_LATIN)
    expect(a.isEqual(b)).toBeFalsy()
  })

  it('expects to Feature a to be sorted after Feature b', () => {
    let a = new Feature(Feature.types.frequency, [['lower', 1]], Constants.LANG_GREEK)
    let b = new Feature(Feature.types.frequency, [['higher', 2]], Constants.LANG_GREEK)
    expect(a.compareTo(b)).toBeGreaterThan(0)
    expect([a, b].sort((a, b) => a.compareTo(b))).toEqual([b, a])
  })

  it('expects to Feature a to be sorted before Feature b', () => {
    let a = new Feature(Feature.types.frequency, [['lower', 3]], Constants.LANG_GREEK)
    let b = new Feature(Feature.types.frequency, [['higher', 1]], Constants.LANG_GREEK)
    expect(a.compareTo(b)).toBeLessThan(0)
    expect([a, b].sort((a, b) => a.compareTo(b))).toEqual([a, b])
  })

  it('expects to Feature a to be sorted the same as Feature b', () => {
    let a = new Feature(Feature.types.frequency, [['same', 1]], Constants.LANG_GREEK)
    let b = new Feature(Feature.types.frequency, [['same', 1]], Constants.LANG_GREEK)
    expect(a.compareTo(b)).toEqual(0)
    expect([a, b].sort((a, b) => a.compareTo(b))).toEqual([a, b])
  })

  it('expects to multi-valued Features to sort correctly', () => {
    let a = new Feature(Feature.types.frequency, [['lower', 1], ['highest', 3]], Constants.LANG_GREEK)
    let b = new Feature(Feature.types.frequency, [['higher', 2]], Constants.LANG_GREEK)
    expect(a.compareTo(b)).toBeLessThan(0)
    expect([a, b].sort((a, b) => a.compareTo(b))).toEqual([a, b])
  })

  it('expects toLocaleStringAbbr to return abbreviation if defined', () => {
    let f = new Feature(Feature.types.gender, 'feminine', Constants.LANG_LATIN)
    expect(f.toLocaleStringAbbr()).toEqual('f.')
  })
  it('expects toLocaleStringAbbr to return value if no abbreviation defined', () => {
    let f = new Feature(Feature.types.gender, 'unknown', Constants.LANG_LATIN)
    expect(f.toLocaleStringAbbr()).toEqual('unknown')
  })
})
