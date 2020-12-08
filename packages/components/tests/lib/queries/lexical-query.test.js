/* eslint-env jest */
/* eslint-disable no-unused-vars */
import LexicalQuery from '@comp/lib/queries/lexical-query'
import Locales from '@comp/locales/locales'
import enUS from '@comp/locales/en-us/messages.json'
import enGB from '@comp/locales/en-gb/messages.json'
// import Query from '@comp/lib/queries/query'

import LanguageOptionDefaults from '@comp/settings/language-options-defaults.json'
import SiteOptions from './fixtures/site-options-shortlex.json'

import { Constants, LanguageModelFactory as LMF, Homonym, Options, LocalStorageArea } from 'alpheios-data-models'
import { L10n } from 'alpheios-l10n'

import { ClientAdapters } from 'alpheios-client-adapters'

describe('lexical-query.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  const clientID = 'CLIENT_ID'
  const cedictServiceURL = 'CEDICT_SERVICE_URL'

  const l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  const testUI = {
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

  const testTextSelector = {
    normalizedText: 'foo',
    word: 'foo',
    languageID: Constants.LANG_LATIN,
    data: 'foo data'
  }
  const testHtmlSelector = {
    targetRect: 'foo targetRect'
  }

  const langId = testTextSelector.languageID

  const testHomonym = {
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
      chineseloc: jest.fn(() => { return { result: testHomonym, errors: [] } }),
      alpheiosTreebank: jest.fn(() => { return { result: testHomonym, errors: [] } })
    })
    const mockStaticEmpty = jest.fn()
    mockStaticEmpty.mockReturnValue({
      alpheios: jest.fn(() => { return { result: resultForMock, errors: [] } })
    })

    Object.defineProperty(ClientAdapters, 'morphology', {
      get: mockStaticMorphology
    })
    Object.defineProperty(ClientAdapters, 'lexicon', {
      get: mockStaticEmpty
    })
    Object.defineProperty(ClientAdapters, 'lemmatranslation', {
      get: mockStaticEmpty
    })
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  const testLexicalData = {
    foo: 'bar'
  }
  const testLDFAdapter = {
    getInflectionData: function () { return new Promise((resolve, reject) => { resolve(testLexicalData) }) }
  }

  const testLDFAdapterFailed = {
    getInflectionData: function () { return new Promise((resolve, reject) => { reject(new Error('testLDFAdapterFailed error')) }) }
  }

  it.skip('1 LexicalQuery - create function returns a new LexicalQuery with params', () => {
    const query = LexicalQuery.create('foo selector', {})

    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('LexicalQuery')
    expect(typeof query.ID).toEqual('string')
    expect(query.canReset).toBeFalsy()
  })

  // TODO: Probably removal of iteration of `getInflectionData()` broke it. Need to fix
  it.skip('3 LexicalQuery - getData could make another iterations circle if canReset = true', async () => {
    const curUI = Object.assign({}, testUI)
    const query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector
    })
    const languageID = LMF.getLanguageIdFromCode(testTextSelector.languageCode)
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
    const curUI = Object.assign({}, testUI)
    const query = LexicalQuery.create(testTextSelector, {
      uiController: curUI,
      htmlSelector: testHtmlSelector
    })
    query.canReset = false
    LexicalQuery.getLexiconOptions = function () { return { allow: false } }

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

  it('5 LexicalQuery - getData executes iterations: chineseLoc.getHomonym and after it updateMorphology for Chinese', async () => {
    const testTextSelectorChinese = {
      normalizedText: '培養',
      word: '培養',
      languageID: Constants.LANG_CHINESE,
      data: 'foo data'
    }

    const curUI = Object.assign({}, testUI)
    // eslint-disable-next-line prefer-const
    let query = LexicalQuery.create(testTextSelectorChinese, {
      clientId: clientID,
      cedictServiceUrl: cedictServiceURL,
      uiController: curUI,
      htmlSelector: testHtmlSelector
    })
    query.canReset = false
    LexicalQuery.getLexiconOptions = function () { return { allow: false } }

    query.LDFAdapter = testLDFAdapterFailed
    jest.spyOn(LexicalQuery.evt.HOMONYM_READY, 'pub')

    await query.getData()

    expect(ClientAdapters.morphology.chineseloc).toHaveBeenCalledWith({
      method: 'getHomonym',
      clientId: clientID,
      serviceUrl: cedictServiceURL,
      params: {
        checkContextForward: '',
        languageID: testTextSelectorChinese.languageID,
        word: testTextSelectorChinese.normalizedText
      }
    })
    expect(LexicalQuery.evt.HOMONYM_READY.pub).toHaveBeenCalledWith(testHomonym)
  })

  it.skip('8 LexicalQuery - getData executes fetchShortDefs and fetchFullDefs ', async () => {
    const curUI = Object.assign({}, testUI)
    const query = LexicalQuery.create(testTextSelector, {
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

  it.skip('9 LexicalQuery - getData executes fetchTranslations and it executes updateTranslations', async () => {
    const curUI = Object.assign({}, testUI)

    const userLang = 'fr'
    const query = LexicalQuery.create(testTextSelector, {
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

  it.skip('10 LexicalQuery - _getLexiconOptionsList parses lexicons', () => {
    const location = 'http://example.org'
    const languageCode = 'lat'

    const emptyPromise = () => { return new Promise((resolve, reject) => {}) }

    const allSiteOptions = []
    for (const site of SiteOptions) {
      for (const domain of site.options) {
        const siteOpts = new Options(domain, LocalStorageArea)
        siteOpts.storageAdapter.get = emptyPromise
        siteOpts.storageAdapter.set = emptyPromise
        allSiteOptions.push({ uriMatch: site.uriMatch, resourceOptions: siteOpts })
      }
    }

    const languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

    expect(LexicalQuery.getLexiconOptions({
      lexiconKey: 'lexiconsShort',
      languageCode,
      location,
      siteOptions: allSiteOptions,
      resourceOptions: languageOptions
    })).toEqual({ allow: ['https://github.com/alpheios-project/xx'] })
  })

  it.skip('11 LexicalQuery - _getLexiconOptionsList parses empty lexicons and returns {}', () => {
    const location = 'http://example.org'
    const languageCode = 'lat'
    const languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

    expect(LexicalQuery.getLexiconOptions({
      lexiconKey: 'lexiconsShort',
      languageCode,
      location,
      siteOptions: [],
      resourceOptions: languageOptions
    })).toEqual({})
  })

  it.skip('12 LexicalQuery - calls tbAdapter if treebank data is present in selector', async () => {
    const curUI = Object.assign({}, testUI)
    const mockSelector = {
      normalizedText: 'foo',
      word: 'foo',
      languageID: Constants.LANG_LATIN,
      data: { treebank: { word: { src: '', ref: 'mockref' } } }
    }
    const languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
    const query = LexicalQuery.create(mockSelector, {
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

  it.skip('13 LexicalQuery - does not call tbAdapter if treebank data is not present in selector', async () => {
    const curUI = Object.assign({}, testUI)
    const mockSelector = {
      normalizedText: 'foo',
      word: 'foo',
      languageID: Constants.LANG_LATIN,
      data: { treebank: { } }
    }
    const languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
    const query = LexicalQuery.create(mockSelector, {
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

  it.skip('14 LexicalQuery - it finalizes if no definition requests are made', async () => {
    const curUI = Object.assign({}, testUI)
    const query = LexicalQuery.create(testTextSelector, {
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

  it.skip('15 LexicalQuery - it finalizes if definition requests are made', async () => {
    const curUI = Object.assign({}, testUI)
    const query = LexicalQuery.create(testTextSelector, {
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
})
