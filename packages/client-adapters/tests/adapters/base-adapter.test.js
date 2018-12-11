/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import BaseAdapter from '@/adapters/base-adapter'
import L10n from '@/l10n/l10n'

import ClientAdapters from '@/client-adapters.js'
import { Constants, Homonym } from 'alpheios-data-models'

describe('base-adapter.test.js', () => {
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

  it('1 BaseAdapter - constructor creates errors and l10n properties', () => {
    let adapter = new BaseAdapter()
    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeInstanceOf(L10n)
  })

  it('2 BaseAdapter - addError add an Error to errors property with config properties', () => {
    let adapter = new BaseAdapter()
    adapter.config = {}
    expect(adapter.errors.length).toEqual(0)

    adapter.addError('Test error')
    expect(adapter.errors.length).toEqual(1)
  })

  it('3 BaseAdapter - uploadConfig sets properties from config and defaultConfig', () => {
    let config = {
      foo1: 'bar1',
      foo2: 'bar2'
    }
    let defaultConfig = {
      foo2: 'barAnother2',
      foo3: 'bar3'
    }
    let adapter = new BaseAdapter()
    expect(adapter.config).toBeUndefined()

    let resultConfig = adapter.uploadConfig(config, defaultConfig)

    expect(resultConfig).toEqual({
      foo1: 'bar1',
      foo2: 'bar2',
      foo3: 'bar3'
    })
  })

  it('4 BaseAdapter - fetchWindow adds error if url is not given', () => {
    let adapter = new BaseAdapter()
    expect(adapter.errors.length).toEqual(0)

    adapter.config = {}
    adapter.fetchWindow()
    expect(adapter.errors.length).toEqual(1)
  })

  it('5 BaseAdapter - fetchWindow adds error if url doesn\'t answer', async () => {
    let adapter = new BaseAdapter()
    expect(adapter.errors.length).toEqual(0)

    adapter.config = {}
    await adapter.fetchWindow('fakeUrl')
    expect(adapter.errors.length).toEqual(1)
  })

  it('6 BaseAdapter - fetchWindow returns json if type is not defined', async () => {
    let adapter = new BaseAdapter()
    adapter.config = {}

    let result = await adapter.fetchWindow('https://morph.alpheios.net/api/v1/analysis/word?word=cepit&engine=whitakerLat&lang=lat&clientId=undefined')
    expect(result).toBeInstanceOf(Object)
  })

  it('7 BaseAdapter - fetchWindow returns string if type is defined as xml', async () => {
    let adapter = new BaseAdapter()
    adapter.config = {}

    let result = await adapter.fetchWindow('https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html&n=n6614', { type: 'xml' })
    expect(typeof result).toBe('string')
  }, 40000)

  it('8 BaseAdapter - fetchWindowTimeout adds error if url is not given', () => {
    let adapter = new BaseAdapter()
    expect(adapter.errors.length).toEqual(0)

    adapter.config = {}
    adapter.fetchWindowTimeout()
    expect(adapter.errors.length).toEqual(1)
  })

  it.skip('9 BaseAdapter - fetchWindowTimeout adds error if url doesn\'t answer', async () => {
    let adapter = new BaseAdapter()
    expect(adapter.errors.length).toEqual(0)

    adapter.config = {}
    await adapter.fetchWindowTimeout('fakeUrl', { timeout: 3000 })
    expect(adapter.errors.length).toEqual(1)
  })

  it('10 BaseAdapter - fetchWindowTimeout returns json if type is not defined', async () => {
    let adapter = new BaseAdapter()
    adapter.config = {}

    let result = await adapter.fetchWindowTimeout('https://morph.alpheios.net/api/v1/analysis/word?word=cepit&engine=whitakerLat&lang=lat&clientId=undefined', { timeout: 20000 })
    expect(result).toBeInstanceOf(Object)
  }, 40000)

  it('11 BaseAdapter - fetchWindowTimeout returns string if type is defined as xml', async () => {
    let adapter = new BaseAdapter()
    adapter.config = {}

    let result = await adapter.fetchWindowTimeout('https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html&n=n6614', { type: 'xml', timeout: 20000 })
    expect(typeof result).toBe('string')
  }, 40000)

  it('12 BaseAdapter - fetchAxios adds error if url is not given', () => {
    let adapter = new BaseAdapter()
    expect(adapter.errors.length).toEqual(0)

    adapter.config = {}
    adapter.fetchAxios()
    expect(adapter.errors.length).toEqual(1)
  })

  it('13 BaseAdapter - fetchAxios adds error if url doesn\'t answer', async () => {
    let adapter = new BaseAdapter()
    expect(adapter.errors.length).toEqual(0)

    adapter.config = {}
    await adapter.fetchAxios('fakeUrl')
    expect(adapter.errors.length).toEqual(1)
  })

  it('14 BaseAdapter - fetchAxios returns json if type is not defined', async () => {
    let adapter = new BaseAdapter()
    adapter.config = {}

    let result = await adapter.fetchAxios('https://morph.alpheios.net/api/v1/analysis/word?word=cepit&engine=whitakerLat&lang=lat&clientId=undefined')
    expect(result).toBeInstanceOf(Object)
  }, 40000)

  it('15 BaseAdapter - fetchAxios returns string if type is defined as xml', async () => {
    let adapter = new BaseAdapter()
    adapter.config = {}

    let result = await adapter.fetchAxios('https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html&n=n6614', { type: 'xml' })
    expect(typeof result).toBe('string')
  }, 40000)

  it('16 BaseAdapter - fetch adds error if url is not given', () => {
    let adapter = new BaseAdapter()
    expect(adapter.errors.length).toEqual(0)

    adapter.config = {}
    adapter.fetch()
    expect(adapter.errors.length).toEqual(1)
  })

  it('17 BaseAdapter - fetch execute fetchWindow if window is defined and timeout is not defined', () => {
    let adapter = new BaseAdapter()
    adapter.config = {}

    let url = 'https://morph.alpheios.net/api/v1/analysis/word?word=cepit&engine=whitakerLat&lang=lat&clientId=undefined'
    adapter.fetchAxios = jest.fn()
    adapter.fetchWindow = jest.fn()
    adapter.fetchWindowTimeout = jest.fn()

    adapter.fetch(url)

    expect(adapter.fetchWindow).toHaveBeenCalledWith(url, undefined)
    expect(adapter.fetchAxios).not.toHaveBeenCalled()
    expect(adapter.fetchWindowTimeout).not.toHaveBeenCalled()
  })

  it('18 BaseAdapter - fetch execute fetchWindowTimeout if window is defined and timeout is defined', () => {
    let adapter = new BaseAdapter()
    adapter.config = {}

    let url = 'https://morph.alpheios.net/api/v1/analysis/word?word=cepit&engine=whitakerLat&lang=lat&clientId=undefined'
    let options = { timeout: 3000 }

    adapter.fetchAxios = jest.fn()
    adapter.fetchWindow = jest.fn()
    adapter.fetchWindowTimeout = jest.fn()

    adapter.fetch(url, options)

    expect(adapter.fetchWindowTimeout).toHaveBeenCalledWith(url, options)
    expect(adapter.fetchAxios).not.toHaveBeenCalled()
    expect(adapter.fetchWindow).not.toHaveBeenCalled()
  })
})
