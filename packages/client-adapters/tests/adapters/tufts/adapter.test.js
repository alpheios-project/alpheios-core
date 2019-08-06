/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import AlpheiosTuftsAdapter from '@/adapters/tufts/adapter'
import { Constants, Homonym } from 'alpheios-data-models'

describe('tufts/adapter.test.js', () => {
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

  it('1 AlpheiosTuftsAdapter - constructor uploads config, creates engines and enginesSet', () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
    expect(adapter.engines).toBeDefined()
    expect(adapter.engineSet).toBeDefined()
  })

  it('2 AlpheiosTuftsAdapter - uploadEngines creates egines property', () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    for (let engine in adapter.engines) {
      expect(typeof engine).toBe(Symbol)
      expect(Array.isArray(adapter.engines[engine])).toBeTruthy()
    }
  })

  it('3 AlpheiosTuftsAdapter - getHomonym executes prepareRequestUrl and if url could not be constructed return undefined and adds error', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    expect(adapter.errors.length).toEqual(0)

    adapter.prepareRequestUrl = jest.fn()
    let res = await adapter.getHomonym(Constants.LANG_LATIN, 'cepit')

    expect(adapter.prepareRequestUrl).toHaveBeenCalled()
    expect(adapter.errors.length).toEqual(1)
    expect(res).toBeUndefined()
  })

  it('4 AlpheiosTuftsAdapter - getHomonym returns undefined if url doesn\'t return answer and adds error', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })
    expect(adapter.errors.length).toEqual(0)

    let res = await adapter.getHomonym(Constants.LANG_LATIN, 'fooword')
    expect(adapter.errors.length).toEqual(1)
    expect(res).toBeUndefined()
  }, 20000)

  it('5 AlpheiosTuftsAdapter - getHomonym returns homonym if url returns correct answer', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let res = await adapter.getHomonym(Constants.LANG_LATIN, 'placito')
    expect(res).toBeInstanceOf(Homonym)
  }, 20000)

  it('6 AlpheiosTuftsAdapter - prepareRequestUrl returns null if engine is not defined for given languageID', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let res = adapter.prepareRequestUrl(Constants.LANG_UNDEFINED, 'placito')
    expect(res).toBeNull()
  })

  it('7 AlpheiosTuftsAdapter - prepareRequestUrl returns url if engine is defined for given languageID', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let res = adapter.prepareRequestUrl(Constants.LANG_LATIN, 'placito')
    expect(res).toEqual(expect.stringMatching(/morph.alpheios.net\/api/))
  })

  it('8 AlpheiosTuftsAdapter - prepareRequestUrl adds clientId to url', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      clientId: 'abcdef'
    })

    let res = adapter.prepareRequestUrl(Constants.LANG_LATIN, 'placito')
    expect(res).toEqual(expect.stringMatching(/&clientId=abcdef$/))
  })
})
