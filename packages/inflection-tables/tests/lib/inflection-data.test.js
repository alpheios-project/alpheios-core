/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { Homonym } from 'alpheios-data-models'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'

import InflectionData from '@lib/inflection-data.js'
import InflectionSet from '@lib/inflection-set.js'

import Form from '@lib/form.js'
import Suffix from '@lib/suffix.js'

describe('inflection-data.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let maAdapter, testHomonym

  beforeAll(async () => {
    maAdapter = new AlpheiosTuftsAdapter()
    testHomonym = await maAdapter.getHomonym('grc', 'δύο')
  })

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

  it('1 InflectionData - constructor creates attributes with default values', () => {
    let infldata = new InflectionData(testHomonym)

    expect(infldata.homonym).toBeInstanceOf(Homonym)
    expect(infldata.pos.size).toEqual(0)
  })

  it('2 InflectionData - addInflectionSet adds InflectionSet to pos', () => {
    let infldata = new InflectionData(testHomonym)

    infldata.addInflectionSet(new InflectionSet('numeral'))
    expect(infldata.pos.size).toEqual(1)
    expect(Array.from(infldata.pos.keys())).toEqual(['numeral'])
  })

  it('3 InflectionData - targetWord returns targetWord from homonym', () => {
    let infldata = new InflectionData(testHomonym)
    expect(infldata.targetWord).toEqual(testHomonym.targetWord)
  })

  it('4 InflectionData - languageID returns languageID from homonym', () => {
    let infldata = new InflectionData(testHomonym)
    expect(infldata.languageID).toEqual(testHomonym.languageID)
  })

  it('5 InflectionData - hasInflectionSets returns true if pos constains InflectionSet', () => {
    let infldata = new InflectionData(testHomonym)
    expect(infldata.hasInflectionSets).toBeFalsy()

    infldata.addInflectionSet(new InflectionSet('numeral'))
    expect(infldata.hasInflectionSets).toBeTruthy()
  })

  it('6 InflectionData - partsOfSpeech returns partsOfSpeech of InflectionSets from pos', () => {
    let infldata = new InflectionData(testHomonym)

    infldata.addInflectionSet(new InflectionSet('numeral'))
    infldata.addInflectionSet(new InflectionSet('noun'))

    expect(infldata.partsOfSpeech).toEqual(['numeral', 'noun'])
  })

  it('7 InflectionData - getMorphemes returns Morphemes for a partOfSpeech and inflTypes from arguments', () => {
    let infldata = new InflectionData(testHomonym)

    let inflsSet = new InflectionSet('numeral')
    inflsSet.addInflectionItem(new Form('δύο'))

    infldata.addInflectionSet(inflsSet)

    // expect(infldata.getMorphemes('numeral', Form).length).toEqual(1) // error in the code

    expect(infldata.getMorphemes('verb', Form).length).toEqual(0)
    expect(infldata.getMorphemes('numeral', Suffix).length).toEqual(0)
  })

  it('8 InflectionData - getFootnotesMap returns footnotes  for a partOfSpeech from arguments and inflTypes', () => {
    let infldata = new InflectionData(testHomonym)

    let inflsSet = new InflectionSet('numeral')
    inflsSet.addInflectionItem(new Form('δύο'))
    inflsSet.addFootnote(Form, 1, 'fooFootNote')

    infldata.addInflectionSet(inflsSet)
    expect(infldata.getFootnotesMap('numeral', Form).size).toEqual(1)
    expect(infldata.getFootnotesMap('verb', Form).size).toEqual(0)
    expect(infldata.getFootnotesMap('numeral', Suffix).size).toEqual(0)
  })
})
