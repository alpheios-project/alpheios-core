/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import { Constants } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'

import LatinLanguageDataset from '@lib/lang/latin/latin-language-dataset.js'
import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'
import GreekParadigmDataset from '@/paradigm/data/greek/greek-paradigm-dataset.js'

import InflectionData from '@lib/inflection-data.js'

describe('language-dataset-factory.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}


  let testHomonymARA, testHomonymGRC

  beforeAll(async () => {
    testHomonymARA = await BaseTestHelp.getHomonym('مَقَرٍ', Constants.LANG_ARABIC)
    testHomonymGRC = await BaseTestHelp.getHomonym('δύο', Constants.LANG_GREEK)
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

    expect(LanguageDatasetFactory.getDataset(Constants.LANG_GREEK)).toBeInstanceOf(GreekParadigmDataset)
    expect(LanguageDatasetFactory.getDataset(Constants.LANG_GREEK).dataLoaded).toBeTruthy()

    expect(LanguageDatasetFactory.getDataset(Constants.LANG_GREEK, 'GreekLanguageDataset')).toBeInstanceOf(GreekLanguageDataset)
    expect(LanguageDatasetFactory.getDataset(Constants.LANG_GREEK, 'GreekLanguageDataset').dataLoaded).toBeTruthy()
  })

  it('4 LanguageDatasetFactory - getDataset returns undefined for unsupported languageID', () => {
    expect(LanguageDatasetFactory.getDataset(Constants.LANG_ARABIC)).toBeUndefined()
  })

})
