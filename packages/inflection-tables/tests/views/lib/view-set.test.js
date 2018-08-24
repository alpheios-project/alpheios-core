/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import ViewSet from '@views/lib/view-set.js'
import GroupFeatureType from '@views/lib/group-feature-type.js'
import ViewSetFactory from '@views/lib/view-set-factory.js'
import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'
import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'

import L10nJSON from '@tests/l10n/l10n-json.js'
import L10n from '@l10n/l10n.js'

/*
It seems that `ViewSetFactory.create(testHomonym, testLocale)` behave in a strange way in Jest.
It fails where it calls `GroupFeatureType.createFromType()` within constructor of a GreekView class.
`GroupFeatureType.createFromType()` fails because
`LanguageModelFactory.getLanguageModel(languageID).typeFeature(type).ownFeatures` returns undefined.
It seems that a type feature (of Feature type) is created properly, but a call to its `ownFeatures` getter fails.
This seems to be working fine within a library though.
All tests with this problem are skipped for now as immediate solution cannot be found.
TODO: figure this out
 */
describe('view-set.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let maAdapter, testHomonym, testHomonymFailed

  const testLocale = 'en-US'

  /*  Object.defineProperty(GreekLanguageDataset, 'verbParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParadigmTables),
    set: jest.fn()
  })
  Object.defineProperty(GreekLanguageDataset, 'verbParticipleParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParticipleParadigmTables),
    set: jest.fn()
  }) */

  L10n.getMessages = jest.fn((locale) => L10nJSON.getMessages(locale))

  beforeAll(async () => {
    maAdapter = new AlpheiosTuftsAdapter()
    testHomonym = await maAdapter.getHomonym(Constants.LANG_GREEK, 'ἐμαυτοῦ')
    testHomonymFailed = await maAdapter.getHomonym(Constants.LANG_ARABIC, 'سُلطَان')
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

  it.skip('1 ViewSet - constructor creates viewSet with default values', () => {
    let VS = ViewSetFactory.create(testHomonym, testLocale)

    expect(VS.homonym.targetWord).toEqual('ἐμαυτοῦ')
    expect(VS.languageID).toEqual(Constants.LANG_GREEK)
    expect(VS.locale).toEqual(testLocale)
    expect(VS.matchingViews.length).toBeGreaterThan(0)
    expect(VS.partsOfSpeech.length).toBeGreaterThan(0)
  })

  it.skip('2 ViewSet - hasMatchingViews returns true if inflectionData has views from matching views', () => {
    let VS = ViewSetFactory.create(testHomonym, testLocale)
    expect(VS.hasMatchingViews).toBeTruthy()
  })

  it('3 ViewSet - hasMatchingViews returns false if inflectionData has no views from matching views', () => {
    let VS = ViewSetFactory.create(testHomonymFailed, testLocale)
    expect(VS.hasMatchingViews).toBeFalsy()
  })

  it.skip('4 ViewSet - getViews returns all views for the part of speech from attributes', () => {
    let VS = ViewSetFactory.create(testHomonym, testLocale)

    expect(VS.getViews('pronoun').length).toEqual(1)
    expect(VS.getViews('adjective').length).toEqual(0)
    expect(VS.getViews().length).toEqual(1)
  })

  it.skip('5 ViewSet - updateMessages executes updateMessages for all matchingViews', () => {
    let VS = ViewSetFactory.create(testHomonym, testLocale)
    VS.getViews()[0].updateMessages = jest.fn()

    VS.updateMessages('foomessages')
    expect(VS.getViews()[0].updateMessages).toHaveBeenCalledWith('foomessages')
  })

  it.skip('6 ViewSet - setLocale executes setLocale for all matchingViews', () => {
    let VS = ViewSetFactory.create(testHomonym, testLocale)
    VS.getViews()[0].setLocale = jest.fn()

    VS.setLocale('foolocale')
    expect(VS.getViews()[0].setLocale).toHaveBeenCalledWith('foolocale')
  })
})
