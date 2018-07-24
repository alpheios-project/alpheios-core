/* eslint-env jest */
/* eslint-disable no-unused-vars */
import LexicalQuery from '@/lib/queries/lexical-query'
import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'
// import Query from '@/lib/queries/query'

import Options from '@/lib/options/options'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import LocalStorageArea from '@/lib/options/local-storage-area.js'
import SiteOptions from './fixtures/site-options-shortlex.json'

import { Constants, LanguageModelFactory as LMF } from 'alpheios-data-models'

describe('lexical-query.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  // console.info = function () {}

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

  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  let testUI = {
    setTargetRect: function () {
      return {
        newLexicalRequest: function () {
          return { message: function () { } }
        }
      }
    },
    showStatusInfo: function () { },
    updateWordAnnotationData: function () { },

    addMessage: function () { },
    addImportantMessage: function () { },

    updateMorphology: function () { },
    updateDefinitions: function () { },
    showLanguageInfo: function () { },
    updateLanguage: function () { },
    updateInflections: function () { },
    updateTranslations: function () { },
    l10n: l10n
  }

  let testTextSelector = {
    normalizedText: 'foo',
    word: 'foo',
    languageID: Constants.LANG_LATIN,
    data: 'foo data'
  }
  let testHtmlSelector = {
    targetRect: 'foo targetRect'
  }

  let langId = testTextSelector.languageID

  let testHomonym = {
    targetWord: 'testHomonym',
    languageID: testTextSelector.languageID,
    lexemes: [{
      isPopulated: function () { return true },
      lemma: { word: 'foo lemma' }
    }]
  }
  let testMaAdapter = {
    getHomonym: function () { return new Promise((resolve, reject) => { resolve(testHomonym) }) }
  }

  let testLexicalData = {
    foo: 'bar'
  }
  let testLDFAdapter = {
    getInflectionData: function () { return new Promise((resolve, reject) => { resolve(testLexicalData) }) }
  }

  let testLDFAdapterFailed = {
    getInflectionData: function () { return new Promise((resolve, reject) => { reject(new Error('testLDFAdapterFailed error')) }) }
  }

  let testDefinition = {

  }
  let testLexiconAdapter = {
    fetchFullDefs: function () {
      return [
        new Promise((resolve, reject) => { resolve(testDefinition) })
      ]
    },
    fetchShortDefs: function () {
      return [
        new Promise((resolve, reject) => { resolve(testDefinition) })
      ]
    }
  }

  let testLexiconAdapterPromiseReject = {
    fetchFullDefs: function () {
      return [
        new Promise((resolve, reject) => { reject(new Error('testLexiconAdapterPromiseReject error')) })
      ]
    },
    fetchShortDefs: function () {
      return [
        new Promise((resolve, reject) => { resolve(testDefinition) })
      ]
    }
  }

  let testLexiconAdapterFailed = {
    fetchFullDefs: function () { throw new Error('testLexiconAdapterFailed error') },
    fetchShortDefs: function () { throw new Error('testLexiconAdapterFailed error') }
  }

  let testLemmaTranslations = {
    fetchTranslations: function () { }
  }

  it('1 LexicalQuery - create function returns a new LexicalQuery with params', () => {
    let query = LexicalQuery.create('foo selector', {})

    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('LexicalQuery')
    expect(typeof query.ID).toEqual('string')
    expect(query.canReset).toBeFalsy()
  })

  it('2 LexicalQuery - getData executes before iterations init languageId, ui.setTargetRect, ui.showStatusInfo, ui.updateWordAnnotationData', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector,
      maAdapter: testMaAdapter
    })
    let languageID = testTextSelector.languageID
    query.active = false

    jest.spyOn(curUI, 'setTargetRect')
    jest.spyOn(curUI, 'showStatusInfo')
    jest.spyOn(curUI, 'updateWordAnnotationData')

    await query.getData()

    expect(curUI.setTargetRect).toHaveBeenCalledWith(testHtmlSelector.targetRect)
    expect(curUI.showStatusInfo).toHaveBeenCalledWith(testTextSelector.normalizedText, languageID)
    expect(curUI.updateWordAnnotationData).toHaveBeenCalledWith(testTextSelector.data)
    expect(query.languageID).toEqual(languageID)
  })

  // TODO: Probably removal of iteration of `getInflectionData()` broke it. Need to fix
  it.skip('3 LexicalQuery - getData could make another iterations circle if canReset = true', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector,
      maAdapter: testMaAdapter
    })
    let languageID = LMF.getLanguageIdFromCode(testTextSelector.languageCode)
    query.active = true
    query.canReset = true

    query.getLexiconOptions = function () { return { allow: false } }
    query.LDFAdapter = testLDFAdapterFailed

    jest.spyOn(query, 'getData')

    await query.getData()

    expect(query.canReset).toBeFalsy()
    expect(query.getData).toHaveBeenCalled()
  })

  it('4 LexicalQuery - getData executes iterations: maAdapter.getHomonym and after it updateMorphology, updateDefinitions, showStatusInfo with homonym data', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector,
      maAdapter: Object.assign({}, testMaAdapter)
    })
    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = testLDFAdapterFailed
    jest.spyOn(query.maAdapter, 'getHomonym')
    jest.spyOn(curUI, 'addMessage')
    jest.spyOn(curUI, 'updateMorphology')
    jest.spyOn(curUI, 'updateDefinitions')
    jest.spyOn(curUI, 'showStatusInfo')

    await query.getData()

    expect(query.maAdapter.getHomonym).toHaveBeenCalledWith(testTextSelector.languageID, testTextSelector.normalizedText)
    expect(curUI.addMessage).toHaveBeenCalledWith(l10n.messages.TEXT_NOTICE_MORPHDATA_READY)
    expect(curUI.updateMorphology).toHaveBeenCalledWith(testHomonym)
    expect(curUI.updateDefinitions).toHaveBeenCalledWith(testHomonym)
    expect(curUI.showStatusInfo).toHaveBeenCalledWith(testHomonym.targetWord, testHomonym.languageID)
  })

  it('5 LexicalQuery - getData executes iterations: LDFAdapter.getInflectionData and after it getInflectionData, addMessage, updateInflections', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector,
      maAdapter: Object.assign({}, testMaAdapter),
      lexicons: Object.assign({}, testLexiconAdapterFailed)
    })
    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = Object.assign({}, testLDFAdapter)

    jest.spyOn(query.LDFAdapter, 'getInflectionData')
    jest.spyOn(curUI, 'addMessage')
    jest.spyOn(curUI, 'updateInflections')

    await query.getData()

    // expect(query.LDFAdapter.getInflectionData).toHaveBeenCalledWith(testHomonym)
    expect(curUI.addMessage).toHaveBeenCalledWith(l10n.messages.TEXT_NOTICE_MORPHDATA_READY)
    expect(curUI.updateInflections).toHaveBeenCalledWith(testHomonym)
  })

  it('6 LexicalQuery - If GetData couldn\'t finalize the full Lexical Request it throws error to console with LexicalQuery failed:', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector,
      maAdapter: Object.assign({}, testMaAdapter),
      lexicons: Object.assign({}, testLexiconAdapterFailed)
    })
    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = Object.assign({}, testLDFAdapter)

    await query.getData()

    expect(console.error).toHaveBeenCalledWith('LexicalQuery failed: testLexiconAdapterFailed error')
  })

  it('7 LexicalQuery - getData executes fetchShortDefs and fetchFullDefs and on each request it executes updateDefinitions', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector,
      maAdapter: Object.assign({}, testMaAdapter),
      lexicons: Object.assign({}, testLexiconAdapterPromiseReject)
    })

    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = Object.assign({}, testLDFAdapter)

    jest.spyOn(console, 'error')
    jest.spyOn(curUI, 'addMessage')

    await query.getData()

    expect(console.error).toHaveBeenCalled()
    expect(curUI.addMessage).toHaveBeenCalledWith(l10n.messages.TEXT_NOTICE_DEFSDATA_NOTFOUND.get('Full definition', testHomonym.lexemes[0].lemma.word))
  })

  it('8 LexicalQuery - getData executes fetchShortDefs and fetchFullDefs and if request is rejected than ', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector,
      maAdapter: Object.assign({}, testMaAdapter),
      lexicons: Object.assign({}, testLexiconAdapter)
    })

    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = Object.assign({}, testLDFAdapter)

    jest.spyOn(query.lexicons, 'fetchShortDefs')
    jest.spyOn(query.lexicons, 'fetchFullDefs')
    jest.spyOn(curUI, 'updateDefinitions')

    await query.getData()

    expect(query.lexicons.fetchShortDefs).toHaveBeenCalledWith({ word: 'foo lemma' }, { allow: false })
    expect(query.lexicons.fetchFullDefs).toHaveBeenCalledWith({ word: 'foo lemma' }, { allow: false })
    expect(curUI.updateDefinitions).toHaveBeenCalledWith(testHomonym)
  })

  it('9 LexicalQuery - getData executes fetchTranslations and it executes updateTranslations', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector,
      maAdapter: Object.assign({}, testMaAdapter),
      lexicons: Object.assign({}, testLexiconAdapter),
      lemmaTranslations: Object.assign({}, testLemmaTranslations)
    })

    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = Object.assign({}, testLDFAdapter)

    jest.spyOn(query.lemmaTranslations, 'fetchTranslations')
    jest.spyOn(curUI, 'updateTranslations')

    await query.getData()

    let userLang = navigator.language || navigator.userLanguage

    const langCode = LMF.getLanguageCodeFromId(testTextSelector.languageID)
    expect(query.lemmaTranslations.fetchTranslations).toHaveBeenCalledWith([{ word: 'foo lemma' }], langCode, userLang)
    expect(curUI.updateTranslations).toHaveBeenCalledWith(testHomonym)
  })

  it('10 LexicalQuery - getLexiconOptions parses lexicons', () => {
    let mockSelector = {
      location: 'http://example.org',
      languageID: Constants.LANG_LATIN
    }

    let emptyPromise = () => { return new Promise((resolve, reject) => {}) }

    let allSiteOptions = []
    for (let site of SiteOptions) {
      for (let domain of site.options) {
        let siteOpts = new Options(domain, LocalStorageArea)
        siteOpts.storageAdapter.get = emptyPromise
        siteOpts.storageAdapter.set = emptyPromise
        allSiteOptions.push({ uriMatch: site.uriMatch, resourceOptions: siteOpts })
      }
    }

    let languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

    let query = LexicalQuery.create(mockSelector, {
      resourceOptions: languageOptions,
      siteOptions: allSiteOptions,
      langOpts: {}
    })
    expect(query.getLexiconOptions('lexiconsShort')).toEqual({allow: ['https://github.com/alpheios-project/xx']})
  })

  it('11 LexicalQuery - getLexiconOptions parses empty lexicons and returns {}', () => {
    let mockSelector = {
      location: 'http://example.org',
      languageCode: 'lat'
    }
    let languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
    let query = LexicalQuery.create(mockSelector, {
      resourceOptions: languageOptions,
      siteOptions: [],
      langOpts: {}
    })

    expect(query.getLexiconOptions('lexiconsShort')).toEqual({})
  })
})
