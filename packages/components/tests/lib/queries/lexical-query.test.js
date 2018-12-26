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

import { Constants, LanguageModelFactory as LMF, Homonym } from 'alpheios-data-models'

import { ClientAdapters } from 'alpheios-client-adapters'

describe('lexical-query.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  // console.info = function () {}

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
    lexicalRequestSucceeded: function () { },
    lexicalRequestFailed: function () { },
    lexicalRequestComplete: function () { },
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
      lemma: { word: 'foo lemma' },
      meaning: { appendShortDefs: () => {}, appendFullDefs: () => {} }
    }],
    disambiguate: function () { }

  }

  let resultForMock = true
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    resultForMock = true

    const mockStaticMorphology = jest.fn()
    mockStaticMorphology.mockReturnValue({
      tufts: jest.fn(() => { return { result: testHomonym, errors: [] } }),
      alpheiosTreebank: jest.fn(() => { return { result: testHomonym, errors: [] } }),
    })
    const mockStaticEmpty = jest.fn()
    mockStaticEmpty.mockReturnValue({
      alpheios: jest.fn(() => { return { result: resultForMock, errors: [] } })
    })
  
    Object.defineProperty( ClientAdapters, 'morphology', {
      get: mockStaticMorphology
    })
    Object.defineProperty( ClientAdapters, 'lexicon', {
      get: mockStaticEmpty
    })
    Object.defineProperty( ClientAdapters, 'lemmatranslation', {
      get: mockStaticEmpty
    })
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  let testLexicalData = {
    foo: 'bar'
  }
  let testLDFAdapter = {
    getInflectionData: function () { return new Promise((resolve, reject) => { resolve(testLexicalData) }) }
  }

  let testLDFAdapterFailed = {
    getInflectionData: function () { return new Promise((resolve, reject) => { reject(new Error('testLDFAdapterFailed error')) }) }
  }
/*
  it('1 LexicalQuery - create function returns a new LexicalQuery with params', () => {
    let query = LexicalQuery.create('foo selector', {})

    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('LexicalQuery')
    expect(typeof query.ID).toEqual('string')
    expect(query.canReset).toBeFalsy()
  })

  // TODO: Probably removal of iteration of `getInflectionData()` broke it. Need to fix
  it('3 LexicalQuery - getData could make another iterations circle if canReset = true', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector
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
*/
  it('4 LexicalQuery - getData executes iterations: maAdapter.getHomonym and after it updateMorphology, updateDefinitions, showStatusInfo with homonym data', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector
    })
    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = testLDFAdapterFailed
    jest.spyOn(LexicalQuery.evt.HOMONYM_READY, 'pub')

    await query.getData()

    expect(ClientAdapters.morphology.tufts).toHaveBeenCalledWith({
      method: 'getHomonym',
      params: {
        languageID: testTextSelector.languageID,
        word: testTextSelector.normalizedText
      }
    })
    expect(LexicalQuery.evt.HOMONYM_READY.pub).toHaveBeenCalledWith(testHomonym)
  })
/*
  it('8 LexicalQuery - getData executes fetchShortDefs and fetchFullDefs ', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector
    })

    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = Object.assign({}, testLDFAdapter)

    jest.spyOn(LexicalQuery.evt.HOMONYM_READY, 'pub')

    await query.getData()

    expect(ClientAdapters.lexicon.alpheios).toHaveBeenCalledWith({
      method: 'fetchShortDefs',
      params: {
        opts: { allow: false },
        homonym: testHomonym
      }
    })
    expect(ClientAdapters.lexicon.alpheios).toHaveBeenCalledWith({
      method: 'fetchFullDefs',
      params: {
        opts: { allow: false },
        homonym: testHomonym
      }
    })
    expect(LexicalQuery.evt.HOMONYM_READY.pub).toHaveBeenCalledWith(testHomonym)
  })

  it('9 LexicalQuery - getData executes fetchTranslations and it executes updateTranslations', async () => {
    let curUI = Object.assign({}, testUI)

    let userLang = 'fr'
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector,
      lemmaTranslations: { locale: userLang }
    })

    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = Object.assign({}, testLDFAdapter)

    jest.spyOn(LexicalQuery.evt.LEMMA_TRANSL_READY, 'pub')

    await query.getData()

    const langCode = LMF.getLanguageCodeFromId(testTextSelector.languageID)
    expect(ClientAdapters.lemmatranslation.alpheios).toHaveBeenCalledWith({
      method: 'fetchTranslations',
      params: {
        homonym: testHomonym,
        browserLang: userLang
      }
    })

    expect(LexicalQuery.evt.LEMMA_TRANSL_READY.pub).toHaveBeenCalledWith(testHomonym)
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
    expect(query.getLexiconOptions('lexiconsShort')).toEqual({ allow: ['https://github.com/alpheios-project/xx'] })
  })

  it('11 LexicalQuery - getLexiconOptions parses empty lexicons and returns {}', () => {
    let mockSelector = {
      location: 'http://example.org',
      languageID: Constants.LANG_LATIN
    }
    let languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
    let query = LexicalQuery.create(mockSelector, {
      resourceOptions: languageOptions,
      siteOptions: [],
      langOpts: {}
    })

    expect(query.getLexiconOptions('lexiconsShort')).toEqual({})
  })

  it('12 LexicalQuery - calls tbAdapter if treebank data is present in selector', async () => {
    let curUI = Object.assign({}, testUI)
    let mockSelector = {
      normalizedText: 'foo',
      word: 'foo',
      languageID: Constants.LANG_LATIN,
      data: { treebank: { word: { src: '', ref: 'mockref' } } }
    }
    let languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
    let query = LexicalQuery.create(mockSelector, {
      uiController: curUI,
      resourceOptions: languageOptions,
      htmlSelector: testHtmlSelector,
      siteOptions: [],
      langOpts: {}
    })

    Homonym.disambiguate = jest.fn(() => testHomonym)
    await query.getData()

    expect(ClientAdapters.morphology.alpheiosTreebank).toHaveBeenCalledWith({
      method: 'getHomonym',
      params: {
        languageID: mockSelector.languageID,
        wordref: mockSelector.data.treebank.word.ref
      }
    })

    expect(ClientAdapters.morphology.tufts).toHaveBeenCalledWith({
      method: 'getHomonym',
      params: {
        languageID: mockSelector.languageID,
        word: mockSelector.normalizedText
      }
    })
  })

  it('13 LexicalQuery - does not call tbAdapter if treebank data is not present in selector', async () => {
    let curUI = Object.assign({}, testUI)
    let mockSelector = {
      normalizedText: 'foo',
      word: 'foo',
      languageID: Constants.LANG_LATIN,
      data: { treebank: { } }
    }
    let languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
    let query = LexicalQuery.create(mockSelector, {
      uiController: curUI,
      resourceOptions: languageOptions,
      htmlSelector: testHtmlSelector,
      siteOptions: [],
      langOpts: {}
    })

    await query.getData()
    expect(ClientAdapters.morphology.alpheiosTreebank).not.toHaveBeenCalled()
    expect(ClientAdapters.morphology.tufts).toHaveBeenCalledWith({
      method: 'getHomonym',
      params: {
        languageID: mockSelector.languageID,
        word: mockSelector.normalizedText
      }
    })
  })

  it('14 LexicalQuery - it finalizes if no definition requests are made', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector
    })

    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = Object.assign({}, testLDFAdapter)

    resultForMock = false
    jest.spyOn(query, 'finalize')

    await query.getData()
    expect(query.finalize).toHaveBeenCalledWith('Success-NoDefs')
  })

  it('15 LexicalQuery - it finalizes if definition requests are made', async () => {
    let curUI = Object.assign({}, testUI)
    let query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector
    })

    query.canReset = false
    query.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = Object.assign({}, testLDFAdapter)

    jest.spyOn(query, 'finalize')
    jest.spyOn(LexicalQuery.evt.DEFS_READY, 'pub')

    await query.getData()
    expect(LexicalQuery.evt.DEFS_READY.pub).toHaveBeenCalled()
    expect(query.finalize).toHaveBeenCalledWith('Success')
  })
*/
})
