/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import ClientAdapters from '@/client-adapters.js'

import { Constants, Homonym } from 'alpheios-data-models'

describe('client-adapters.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

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

  it('1 ClientAdapters - morphology executes init and returns object with tufts and alpheiosTreebank', () => {
    jest.spyOn(ClientAdapters, 'init')

    let morphRes = ClientAdapters.morphology

    expect(ClientAdapters.init).toHaveBeenCalled()
    expect(morphRes.tufts).toBeDefined()
    expect(morphRes.tufts).toBeInstanceOf(Function)

    expect(morphRes.alpheiosTreebank).toBeDefined()
    expect(morphRes.alpheiosTreebank).toBeInstanceOf(Function)
  })

  it('2 ClientAdapters - lexicon executes init and returns object with alpheios', () => {
    jest.spyOn(ClientAdapters, 'init')

    let lexiconRes = ClientAdapters.lexicon

    expect(ClientAdapters.init).toHaveBeenCalled()
    expect(lexiconRes.alpheios).toBeDefined()
    expect(lexiconRes.alpheios).toBeInstanceOf(Function)
  })

  it('3 ClientAdapters - lemmatranslation executes init and returns object with alpheios', () => {
    jest.spyOn(ClientAdapters, 'init')

    let translationRes = ClientAdapters.lemmatranslation

    expect(ClientAdapters.init).toHaveBeenCalled()
    expect(translationRes.alpheios).toBeDefined()
    expect(translationRes.alpheios).toBeInstanceOf(Function)
  })

  it('4 ClientAdapters - checkMethod checks if given method registered inside adapter, if no raise an error', () => {
    ClientAdapters.init()
    expect(() => {
      let l = ClientAdapters.checkMethod('morphology', 'tufts', 'getHomonym')
    }).not.toThrowError()

    expect(() => {
      let l = ClientAdapters.checkMethod('morphology', 'tufts', 'fooMethod')
    }).toThrowError()
  })

  it('5 ClientAdapters - checkParam checks if all registered parameters are given', () => {
    ClientAdapters.init()
    expect(() => {
      let l = ClientAdapters.checkParam({ word: 'cepit', languageID: Constants.LANG_LATIN }, 'morphology', 'tufts', 'getHomonym')
    }).not.toThrowError()

    expect(() => {
      let l = ClientAdapters.checkParam({ word: 'cepit' }, 'morphology', 'tufts', 'getHomonym')
    }).toThrowError()
  })

  it('6 ClientAdapters - checkMethodParam executes checkMethod and checkParam', () => {
    ClientAdapters.init()
    jest.spyOn(ClientAdapters, 'checkMethod')
    jest.spyOn(ClientAdapters, 'checkParam')

    ClientAdapters.checkMethodParam('morphology', 'tufts', { method: 'getHomonym', params: { word: 'cepit', languageID: Constants.LANG_LATIN } })
    expect(ClientAdapters.checkMethod).toHaveBeenCalledWith('morphology', 'tufts', 'getHomonym')
    expect(ClientAdapters.checkParam).toHaveBeenCalledWith({ word: 'cepit', languageID: Constants.LANG_LATIN }, 'morphology', 'tufts', 'getHomonym')
  })

  it('7 ClientAdapters - maAdapter executes checkMethodParam and returns null if some problems', async () => {
    ClientAdapters.init()
    ClientAdapters.checkMethodParam = jest.fn()
    let res = await ClientAdapters.maAdapter({
      method: 'getHomonymTest'
    })
    expect(ClientAdapters.checkMethodParam).toHaveBeenCalled()
    expect(res).toBeNull()
  })

  it('8 ClientAdapters - maAdapter returns homonym and empty errors if adapter returns correct data', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })

    expect(res.errors).toEqual([])
    expect(res.result).toBeInstanceOf(Homonym)
  })

  it('9 ClientAdapters - maAdapter returns empty homonym and errors if adapter doesn\'t return correct data', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'foo'
      }
    })

    expect(res.errors.length).toBeGreaterThan(0)
    expect(res.result).toBeUndefined()
  }, 20000)

  it('10 ClientAdapters - tbAdapter returns homonym and empty errors if adapter returns correct data', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: 'phi0959.phi006.alpheios-text-lat1#1-2'
      }
    })

    expect(res.errors).toEqual([])
    expect(res.result).toBeInstanceOf(Homonym)
  })

  it('11 ClientAdapters - tbAdapter returns empty homonym and errors if adapter doesn\'t return correct data', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: 'foo'
      }
    })

    expect(res.errors.length).toBeGreaterThan(0)
    expect(res.result).toBeUndefined()
  })

  it('12 ClientAdapters - lemmaTranslations returns empty errors if adapter returns correct data', async () => {
    ClientAdapters.init()

    let reHomonym = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })

    let res = await ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: reHomonym.result,
        browserLang: 'spa'
      }
    })

    expect(res.errors).toEqual([])
  }, 10000)

  it('13 ClientAdapters - lemmaTranslations returns errors if adapter doesn\'t return correct data', async () => {
    ClientAdapters.init()

    let reHomonym = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'foo'
      }
    })

    let res = await ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: reHomonym.result,
        browserLang: 'spa'
      }
    })

    expect(res.errors.length).toBeGreaterThan(0)
  })

  it('14 ClientAdapters - lexicons returns empty errors if adapter returns correct data', async () => {
    ClientAdapters.init()

    let reHomonym = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })

    let res = await ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: reHomonym.result,
        opts: {
          allow: ['https://github.com/alpheios-project/ls']
        }
      }
    })

    expect(res.errors).toEqual([])
  })

  it('15 ClientAdapters - lexicons returns errors if adapter doesn\'t return correct data', async () => {
    ClientAdapters.init()

    let reHomonym = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })

    let res = await ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: reHomonym.result,
        opts: {}
      }
    })

    expect(res.errors.length).toBeGreaterThan(0)
  })

})
