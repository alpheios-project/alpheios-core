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
})
