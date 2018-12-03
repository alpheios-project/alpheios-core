/* eslint-env jest */
/* eslint-disable no-unused-vars */

import ClientAdapters from '@/client-adapters.js'
import AlpheiosTuftsAdapter from '@/adapters/tufts/adapter'

import { Constants } from 'alpheios-data-models'

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
/*
  it('7 ClientAdapters - maAdapter executes checkMethodParam and doen\'t create AlpheiosTuftsAdapter', () => {
    const spy = jest.fn()
    function Mock (...args) {
      spy(...args)
      Constructor.apply(this, args)
    }
    Mock.prototype = Constructor.prototype
  })
*/
})
