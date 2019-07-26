/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import AlpheiosTreebankAdapter from '@/adapters/alpheiostb/adapter'
import { Constants, Homonym } from 'alpheios-data-models'

describe('alpheiostb/adapter.test.js', () => {
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

  it('1 AlpheiosTreebankAdapter - constructor uploads config, creates engines and enginesSet', () => {
    let adapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: 'getHomonym'
    })

    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
    expect(adapter.models).toBeDefined()
  })

  it('2 AlpheiosTreebankAdapter - getHomonym executes prepareRequest and if url could not be constructed return undefined and adds error', async () => {
    let adapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: 'getHomonym',
      servers: []
    })

    expect(adapter.errors.length).toEqual(0)

    jest.spyOn(adapter,'prepareRequest')
    let res = await adapter.getHomonym(Constants.LANG_LATIN, 'phi0959.phi006.alpheios-text-lat1#1-2')

    expect(adapter.prepareRequest).toHaveBeenCalled()
    expect(adapter.errors.length).toEqual(1)
    expect(res).toBeUndefined()
  })

  it('3 AlpheiosTreebankAdapter - getHomonym returns undefined if url doesn\'t return answer and adds error', async () => {
    let adapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: 'getHomonym'
    })
    expect(adapter.errors.length).toEqual(0)

    let res = await adapter.getHomonym(Constants.LANG_LATIN, '1-22')
    expect(adapter.errors.length).toEqual(1)
    expect(res).toBeUndefined()
  }, 20000)

  it('4 AlpheiosTreebankAdapter - getHomonym returns homonym if url returns correct answer', async () => {
    let adapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: 'getHomonym'
    })

    let res = await adapter.getHomonym(Constants.LANG_LATIN, 'phi0959.phi006.alpheios-text-lat1#1-2')
    expect(res).toBeInstanceOf(Homonym)
  }, 20000)

  it('5 AlpheiosTreebankAdapter - prepareRequestUrl returns undefined if wordref is not correctly defined', () => {
    let adapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: 'getHomonym'
    })

    let res = adapter.prepareRequest('1-2')
    expect(res).toEqual({})
  })

  it('6 AlpheiosTreebankAdapter - prepareRequestUrl returns url if wordref is defined correctly', () => {
    let adapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: 'getHomonym'
    })

    let res = adapter.prepareRequest('phi0959.phi006.alpheios-text-lat1#1-2')
    expect(res.url).toEqual(expect.stringMatching(/tools.alpheios.net\/exist/))
  })

  it('7 AlpheiosTreebankAdapter - prepareRequestUrl returns correct config', () => {
    let adapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: 'getHomonym',
      servers: [ {isDefault: true, clientId: 'fooClient', url: 'https://example.org/r_TEXT/r_WORD/r_CLIENT' }]
    })
    let res = adapter.prepareRequest('1999.02.0066#1-2')
    expect(res.url).toEqual('https://example.org/1999.02.0066/1-2/fooClient')
    expect(res.config.clientId).toEqual('fooClient')
  })

  it('8 AlpheiosTreebankAdapter - adapted a word properly', async () => {
    let adapter = new AlpheiosTreebankAdapter()
    let homonym = await adapter.getHomonym(Constants.LANG_LATIN, '1999.02.0066#1-2')

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.lexemes[0].lemma.word).toEqual('primus')
    expect(homonym.lexemes[0].lemma.features['part of speech'].value).toEqual('adjective')
    expect(homonym.lexemes[0].inflections[0]['part of speech'].value).toEqual('adjective')
    expect(homonym.lexemes[0].inflections[0]['case'].value).toEqual('nominative')
    expect(homonym.lexemes[0].inflections[0].gender.value).toEqual('feminine')
    expect(homonym.lexemes[0].inflections[0].number.value).toEqual('singular')
  })

  it('8 AlpheiosTreebankAdapter - prepareRequestUrl returns correct config for specific text', () => {
    let adapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: 'getHomonym',
      servers: [ {isDefault: false, texts: [ '1999.02.0066'], clientId: 'fooClient', url: 'https://example.org/r_TEXT/r_WORD/r_CLIENT' }]
    })
    let res = adapter.prepareRequest('1999.02.0066#1-2')
    expect(res.url).toEqual('https://example.org/1999.02.0066/1-2/fooClient')
    expect(res.config.clientId).toEqual('fooClient')
    res = adapter.prepareRequest('abc#1-2')
    expect(res.url).toBeUndefined()
  })
})
