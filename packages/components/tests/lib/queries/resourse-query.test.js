/* eslint-env jest */
import ResourceQuery from '@comp/lib/queries/resource-query'
import Query from '@comp/lib/queries/query'

import Locales from '@comp/locales/locales'
import enUS from '@comp/locales/en-us/messages.json'
import enGB from '@comp/locales/en-gb/messages.json'
import { Constants, Feature } from 'alpheios-data-models'
import { L10n } from 'alpheios-l10n'
import Options from '@comp/lib/options/options'
import LanguageOptionDefaults from '@comp/settings/language-options-defaults.json'
import LocalStorageArea from '@comp/lib/options/local-storage-area.js'

describe('resource-query.test.js', () => {
  let l10n
  let testUi
  let resourceOptions
  let testFeature

  beforeAll(() => {
    l10n = new L10n()
      .addMessages(enUS, Locales.en_US)
      .addMessages(enGB, Locales.en_GB)
      .setLocale(Locales.en_US)

    testUi = {
      message: function () { },
      updateGrammar: function () { },
      addMessage: function () { },
      l10n: l10n
    }

    resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

    testFeature = new Feature(Feature.types.part, 'verb', Constants.LANG_LATIN)

    console.error = function () {}
    console.log = function () {}
    console.warn = function () {}
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

  it('1 ResourceQuery - create method returns a new ResourceQuery with params', () => {
    const query = ResourceQuery.create(testFeature, { grammars: 'foo grammars', resourceOptions: resourceOptions })

    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('ResourceQuery')
    expect(typeof query.ID).toEqual('string')

    expect(query.feature).toEqual(testFeature)
    expect(query.grammars).toEqual('foo grammars')
  })

  it('2 ResourceQuery - getData method executes steps: ResourceQuery.evt.GRAMMAR_NOT_FOUND.pub, finalize (when fetchResources returns [])', async () => {
    const testGrammars = {
      fetchResources: function () {
        return []
      }
    }

    jest.spyOn(ResourceQuery.evt.GRAMMAR_NOT_FOUND, 'pub')

    // eslint-disable-next-line prefer-const
    let query = ResourceQuery.create(testFeature, { grammars: testGrammars, resourceOptions: resourceOptions })
    jest.spyOn(query, 'finalize')

    await query.getData()

    expect(ResourceQuery.evt.GRAMMAR_NOT_FOUND.pub).toHaveBeenCalled()
    expect(query.finalize).toHaveBeenCalled()
  })

  it('3 ResourceQuery - getData method publishes GRAMMAR_AVAILABLE event with a url as an argument (when fetchResources returns a request url)', async () => {
    const testGrammars = {
      fetchResources: function () {
        return [
          new Promise((resolve, reject) => { resolve('http:/testurl.com') })
        ]
      }
    }

    // eslint-disable-next-line prefer-const
    let query = ResourceQuery.create(testFeature, { grammars: testGrammars, resourceOptions: resourceOptions })
    jest.spyOn(ResourceQuery.evt.GRAMMAR_AVAILABLE, 'pub')
    jest.spyOn(ResourceQuery.evt.RESOURCE_QUERY_COMPLETE, 'pub')

    await query.getData()
    expect(ResourceQuery.evt.GRAMMAR_AVAILABLE.pub).toHaveBeenCalledWith({ urls: 'http:/testurl.com', languageID: Constants.LANG_LATIN })
    expect(ResourceQuery.evt.RESOURCE_QUERY_COMPLETE.pub).toHaveBeenCalled()
  })

  it('4 ResourceQuery - getData method throws error to console when fetchResources returns error', async () => {
    const testError = new Error('test error')
    const testGrammars = {
      fetchResources: function () {
        return [
          new Promise((resolve, reject) => { reject(testError) })
        ]
      }
    }

    const query = ResourceQuery.create(testFeature, { uiController: testUi, grammars: testGrammars, resourceOptions: resourceOptions })
    await query.getData()

    expect(console.error).toHaveBeenCalledWith(expect.stringMatching(/retrieving/), testError)
  })

  it('5 ResourceQuery - On finalize Query.destroy executes', async () => {
    const testGrammars = {
      fetchResources: function () {
        return []
      }
    }

    jest.spyOn(Query, 'destroy')

    // eslint-disable-next-line prefer-const
    let query = ResourceQuery.create(testFeature, { uiController: testUi, grammars: testGrammars, resourceOptions: resourceOptions })
    query.finalize()
    expect(Query.destroy).toHaveBeenCalled()
  })

  it('6 ResourceQuery - getGrammarOptions sets preferred grammar)', async () => {
    const testGrammars = {
      fetchResources: function () {
        return []
      }
    }

    // eslint-disable-next-line prefer-const
    let query = ResourceQuery.create(testFeature, { uiController: testUi, grammars: testGrammars, resourceOptions: resourceOptions })
    expect(query.getGrammarOptions(Constants.LANG_LATIN)).toEqual({ prefer: 'https://github.com/alpheios-project/grammar-allen-greenough' })
  })
})
