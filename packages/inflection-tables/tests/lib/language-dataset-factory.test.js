/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import { Constants } from 'alpheios-data-models'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'

import LatinLanguageDataset from '@lib/lang/latin/latin-language-dataset.js'
import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'
import InflectionData from '@lib/inflection-data.js'

import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'

describe('language-dataset-factory.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  /*  Object.defineProperty(GreekLanguageDataset, 'verbParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParadigmTables),
    set: jest.fn()
  })
  Object.defineProperty(GreekLanguageDataset, 'verbParticipleParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParticipleParadigmTables),
    set: jest.fn()
  }) */

  let maAdapter, testHomonymARA, testHomonymGRC

  beforeAll(async () => {
    maAdapter = new AlpheiosTuftsAdapter()
    testHomonymARA = await maAdapter.getHomonym(Constants.LANG_ARABIC, 'مَقَرٍ')
    testHomonymGRC = await maAdapter.getHomonym(Constants.LANG_GREEK, 'δύο')
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

  it('1 LanguageDatasetFactory - constructor creates sets for each languageID', () => {
    let LDF = new LanguageDatasetFactory()

    expect(LDF.sets.size).toEqual(2)
    expect(Array.from(LDF.sets.keys())).toEqual([Constants.LANG_LATIN, Constants.LANG_GREEK])
  })

  it('2 LanguageDatasetFactory - instance creates a new LanguageDatasetFactory and do it only once', () => {
    let LDFInstance = LanguageDatasetFactory.instance

    expect(LDFInstance).toBeInstanceOf(LanguageDatasetFactory)
    expect(LanguageDatasetFactory.instance).toBeInstanceOf(LanguageDatasetFactory)
  })

  it('3 LanguageDatasetFactory - getDataset returns LanguageDataset for languageID', () => {
    expect(LanguageDatasetFactory.getDataset(Constants.LANG_LATIN)).toBeInstanceOf(LatinLanguageDataset)
    expect(LanguageDatasetFactory.getDataset(Constants.LANG_LATIN).dataLoaded).toBeTruthy()

    expect(LanguageDatasetFactory.getDataset(Constants.LANG_GREEK)).toBeInstanceOf(GreekLanguageDataset)
    expect(LanguageDatasetFactory.getDataset(Constants.LANG_GREEK).dataLoaded).toBeTruthy()
  })

  it('4 LanguageDatasetFactory - getDataset returns undefined for unsupported languageID', () => {
    expect(LanguageDatasetFactory.getDataset(Constants.LANG_ARABIC)).toBeUndefined()
  })

  it('5 LanguageDatasetFactory - getInflectionData returns an empty InflectionData for unsupported language', () => {
    let LDFAra = LanguageDatasetFactory.getInflectionData(testHomonymARA)
    expect(LDFAra).toBeInstanceOf(InflectionData)
    expect(LDFAra.pos.size).toEqual(0)
  })

  it('6 LanguageDatasetFactory - getInflectionData returns a filled InflectionData for supported language', () => {
    // console.info('***********testHomonymGRC', testHomonymGRC.inflections)
    let LDFGrc = LanguageDatasetFactory.getInflectionData(testHomonymGRC)
    expect(LDFGrc).toBeInstanceOf(InflectionData)
    expect(Array.from(LDFGrc.pos.keys())).toEqual(['numeral'])
    expect(LDFGrc.pos.get('numeral').types.size).toBeGreaterThan(0)
  })
})
