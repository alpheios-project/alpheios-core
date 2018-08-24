/* eslint-env jest */
/* eslint-disable no-unused-vars */
import GroupFeatureList from '@views/lib/group-feature-list.js'

import { Feature, Constants } from 'alpheios-data-models'
import GroupFeatureType from '@views/lib/group-feature-type.js'

describe('group-feature-list.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testGFT = []
  testGFT.push(new GroupFeatureType(Feature.types.hdwd, Constants.LANG_GREEK, 'Lemma', [new Feature(Feature.types.hdwd, 'δύο (2)', Constants.LANG_GREEK)]))
  testGFT.push(new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK)]))
  testGFT.push(new GroupFeatureType(Feature.types.type, Constants.LANG_GREEK, 'Type', [new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK)]))
  testGFT.push(new GroupFeatureType(Feature.types.number, Constants.LANG_GREEK, 'Number', [new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK)]))
  testGFT.push(new GroupFeatureType(Feature.types.case, Constants.LANG_GREEK, 'Case', [new Feature(Feature.types.case, 'nominative', Constants.LANG_GREEK)]))

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

  it('1 GroupFeatureList - constructor creates with features in arguments and adds GFL to each feature', () => {
    let GFL = new GroupFeatureList(testGFT)

    expect(GFL._features.length).toEqual(5)
    expect(Object.keys(GFL._types).length).toEqual(5)

    expect(testGFT.forEach(feature => { expect(feature.groupFeatureList).toBeDefined() }))
  })

  it('2 GroupFeatureList - columns set method fills _columnFeatures with data', () => {
    let GFL = new GroupFeatureList(testGFT)

    GFL.columns = testGFT
    expect(GFL._columnFeatures.length).toEqual(5)
  })

  it('3 GroupFeatureList - columns set method throw error if try to add feature not from the check list', () => {
    let GFL = new GroupFeatureList(testGFT)

    let ntestGFT = [] // testGFT.slice()
    ntestGFT.push(new GroupFeatureType(Feature.types.voice, Constants.LANG_GREEK, 'Voice', [new Feature(Feature.types.voice, 'passive', Constants.LANG_GREEK)]))
    expect(() => { GFL.columns = ntestGFT }).toThrow(new Error(`Feature of voice is not found.`))
  })

  it('4 GroupFeatureList - columnFeatures returns _columnFeatures', () => {
    let GFL = new GroupFeatureList(testGFT)
    expect(GFL.columnFeatures.length).toEqual(0)

    GFL.columns = testGFT
    expect(GFL.columnFeatures.length).toEqual(5)
  })

  it('5 GroupFeatureList - firstColumnFeature returns undefined or the first item from _columnFeatures', () => {
    let GFL = new GroupFeatureList(testGFT)
    expect(GFL.firstColumnFeature).toBeUndefined()

    GFL.columns = testGFT
    expect(GFL.firstColumnFeature.type).toEqual('headword')
  })

  it('6 GroupFeatureList - lastColumnFeature returns undefined or the first item from _columnFeatures', () => {
    let GFL = new GroupFeatureList(testGFT)
    expect(GFL.lastColumnFeature).toBeUndefined()

    GFL.columns = testGFT
    expect(GFL.lastColumnFeature.type).toEqual('case')
  })

  it('7 GroupFeatureList - rows set method fills _rowFeatures with data', () => {
    let GFL = new GroupFeatureList(testGFT)

    GFL.rows = testGFT
    expect(GFL._rowFeatures.length).toEqual(5)
    expect(GFL.rowFeatures.length).toEqual(5)
  })

  it('8 GroupFeatureList - rows set method throw error if try to add feature not from the check list', () => {
    let GFL = new GroupFeatureList(testGFT)

    let ntestGFT = [] // testGFT.slice()
    ntestGFT.push(new GroupFeatureType(Feature.types.voice, Constants.LANG_GREEK, 'Voice', [new Feature(Feature.types.voice, 'passive', Constants.LANG_GREEK)]))
    expect(() => { GFL.rows = ntestGFT }).toThrow(new Error(`Feature of voice is not found.`))
  })

  it('9 GroupFeatureList - firstRowFeature returns undefined or the first item from _rowFeatures', () => {
    let GFL = new GroupFeatureList(testGFT)
    expect(GFL.firstRowFeature).toBeUndefined()

    GFL.rows = testGFT
    expect(GFL.firstRowFeature.type).toEqual('headword')
  })

  it('10 GroupFeatureList - lastRowFeature returns undefined or the first item from _rowFeatures', () => {
    let GFL = new GroupFeatureList(testGFT)
    expect(GFL.lastRowFeature).toBeUndefined()

    GFL.rows = testGFT
    expect(GFL.lastRowFeature.type).toEqual('case')
  })

  it('11 GroupFeatureList - columnRowTitles sets hasColumnRowTitle for matched features', () => {
    let GFL = new GroupFeatureList(testGFT)

    let ntestGFT = [] // testGFT.slice()
    ntestGFT.push(new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK)]))

    GFL.columnRowTitles = ntestGFT
    expect(testGFT.filter(feature => feature.type === 'gender').every(feature => feature.hasColumnRowTitle)).toBeTruthy()
    expect(testGFT.filter(feature => feature.type !== 'gender').every(feature => feature.hasColumnRowTitle === false)).toBeTruthy()
  })

  it('12 GroupFeatureList - columnRowTitles throw Error for feature not from matched list', () => {
    let GFL = new GroupFeatureList(testGFT)

    let ntestGFT = [] // testGFT.slice()
    ntestGFT.push(new GroupFeatureType(Feature.types.voice, Constants.LANG_GREEK, 'Voice', [new Feature(Feature.types.voice, 'passive', Constants.LANG_GREEK)]))

    expect(() => { GFL.columnRowTitles = ntestGFT }).toThrow(new Error(`Feature of voice is not found.`))
  })

  it('13 GroupFeatureList - fullWidthRowTitles sets hasFullWidthRowTitle for matched features', () => {
    let GFL = new GroupFeatureList(testGFT)

    let ntestGFT = [] // testGFT.slice()
    ntestGFT.push(new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK)]))

    GFL.fullWidthRowTitles = ntestGFT
    expect(testGFT.filter(feature => feature.type === 'gender').every(feature => feature.hasFullWidthRowTitle)).toBeTruthy()
    expect(testGFT.filter(feature => feature.type !== 'gender').every(feature => feature.hasFullWidthRowTitle === false)).toBeTruthy()
  })

  it('14 GroupFeatureList - fullWidthRowTitles throw Error for feature not from matched list', () => {
    let GFL = new GroupFeatureList(testGFT)

    let ntestGFT = [] // testGFT.slice()
    ntestGFT.push(new GroupFeatureType(Feature.types.voice, Constants.LANG_GREEK, 'Voice', [new Feature(Feature.types.voice, 'passive', Constants.LANG_GREEK)]))

    expect(() => { GFL.fullWidthRowTitles = ntestGFT }).toThrow(new Error(`Feature of voice is not found.`))
  })

  it('15 GroupFeatureList - length returns count of features', () => {
    let GFL = new GroupFeatureList(testGFT)
    expect(GFL.length).toEqual(5)
  })

  it('16 GroupFeatureList - titleColumnsQuantity returns count of titled features', () => {
    /*
    It seems that testGFT can be affected by previous test and results of this test will depend on whether ib
    be run on its own or in sequence. For stable results we can redefine testGFT inside this test.
     */
    let testGFT = []
    testGFT.push(new GroupFeatureType(Feature.types.hdwd, Constants.LANG_GREEK, 'Lemma', [new Feature(Feature.types.hdwd, 'δύο (2)', Constants.LANG_GREEK)]))
    testGFT.push(new GroupFeatureType(Feature.types.gender, Constants.LANG_GREEK, 'Gender', [new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK)]))
    testGFT.push(new GroupFeatureType(Feature.types.type, Constants.LANG_GREEK, 'Type', [new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK)]))
    testGFT.push(new GroupFeatureType(Feature.types.number, Constants.LANG_GREEK, 'Number', [new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK)]))
    testGFT.push(new GroupFeatureType(Feature.types.case, Constants.LANG_GREEK, 'Case', [new Feature(Feature.types.case, 'nominative', Constants.LANG_GREEK)]))

    let GFL = new GroupFeatureList(testGFT)
    GFL.columnRowTitles = testGFT.slice(0, 1)
    expect(GFL.titleColumnsQuantity).toEqual(1)
  })
})
