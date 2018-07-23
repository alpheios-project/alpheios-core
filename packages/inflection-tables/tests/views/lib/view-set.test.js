/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import ViewSet from '@views/lib/view-set.js'

import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import { Constants } from 'alpheios-data-models'

import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'
import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'

import L10nJSON from '@tests/l10n/l10n-json.js'
import L10n from '@l10n/l10n.js'

describe('view-set.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let maAdapter, testHomonym, testInflectionData
  let testHomonymFailed, testInflectionDataFailed

  const testLocale = 'en-US'

  Object.defineProperty(GreekLanguageDataset, 'verbParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParadigmTables),
    set: jest.fn()
  })
  Object.defineProperty(GreekLanguageDataset, 'verbParticipleParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParticipleParadigmTables),
    set: jest.fn()
  })

  L10n.getMessages = jest.fn((locale) => L10nJSON.getMessages(locale))

  beforeAll(async () => {
    maAdapter = new AlpheiosTuftsAdapter()
    testHomonym = await maAdapter.getHomonym('grc', 'δύο')
    testInflectionData = await LanguageDatasetFactory.getInflectionData(testHomonym)

    testHomonymFailed = await maAdapter.getHomonym('ara', 'سُلطَان')
    testInflectionDataFailed = await LanguageDatasetFactory.getInflectionData(testHomonymFailed)
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

  it('1 ViewSet - constructor creates viewSet with default values', () => {
    let VS = new ViewSet(testInflectionData, testLocale)

    expect(Array.from(VS.views.keys())).toEqual([Constants.LANG_LATIN, Constants.LANG_GREEK])
    expect(VS.inflectionData.homonym.targetWord).toEqual('δύο')
    expect(VS.languageID).toEqual(Constants.LANG_GREEK)
    expect(VS.locale).toEqual(testLocale)
    expect(VS.matchingViews.length).toBeGreaterThan(0)
    expect(VS.partsOfSpeech.length).toBeGreaterThan(0)
  })

  it('2 ViewSet - hasMatchingViews returns true if inflectionData has views from matching views', () => {
    let VS = new ViewSet(testInflectionData, testLocale)
    expect(VS.hasMatchingViews).toBeTruthy()
  })

  it('3 ViewSet - hasMatchingViews returns false if inflectionData has no views from matching views', () => {
    let VS = new ViewSet(testHomonymFailed, testLocale)
    expect(VS.hasMatchingViews).toBeFalsy()
  })

  it('4 ViewSet - getViews returns all views for the part of speech from attributes', () => {
    let VS = new ViewSet(testInflectionData, testLocale)

    expect(VS.getViews('numeral').length).toEqual(1)
    expect(VS.getViews('adjective').length).toEqual(0)
    expect(VS.getViews().length).toEqual(1)
  })

  it('5 ViewSet - updateMessages executes updateMessages for all matchingViews', () => {
    let VS = new ViewSet(testInflectionData, testLocale)
    VS.getViews()[0].updateMessages = jest.fn()

    VS.updateMessages('foomessages')
    expect(VS.getViews()[0].updateMessages).toHaveBeenCalledWith('foomessages')
  })

  it('6 ViewSet - setLocale executes setLocale for all matchingViews', () => {
    let VS = new ViewSet(testInflectionData, testLocale)
    VS.getViews()[0].setLocale = jest.fn()

    VS.setLocale('foolocale')
    expect(VS.getViews()[0].setLocale).toHaveBeenCalledWith('foolocale')
  })
})
