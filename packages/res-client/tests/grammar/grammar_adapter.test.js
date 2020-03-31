/* eslint-env jest */
'use strict'
import GrammarResAdapter from '@resclient/grammar/grammar_adapter.js'

let bennett = 'https://github.com/alpheios-project/grammar-bennett'

describe('BaseAdapter object', () => {
  beforeAll(() => {
    window.fetch = require('jest-fetch-mock')
  })

  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it.skip('default config', () => {
    let adapter = new GrammarResAdapter(bennett)
    expect(adapter.getConfig('base_url')).toBeTruthy()
    expect(adapter.getConfig('index_url')).toBeTruthy()
  })

  it.skip('default config', () => {
    let adapter = new GrammarResAdapter(bennett, { base_url: 'dummyurl' })
    expect(adapter.getConfig('base_url')).toEqual('dummyurl')
  })

  it.skip('getResource', async () => {
    let mockFeature = {
      type: 'case',
      value: ['locative']
    }
    let mockFeature2 = {
      type: 'case',
      value: ['vocative']
    }
    let adapter = new GrammarResAdapter(bennett)
    let dummyResponse = 'alph-case-locative|part5.htm#alph-case-locative'
    window.fetch.mockResponse(dummyResponse)
    let response = await adapter.getResources(mockFeature)
    expect(response[0].url).toEqual(expect.stringMatching(/^https:\/\/grammars.alpheios.net\/bennett\/part5.htm\?ts=\d+#alph-case-locative$/))
    expect(response[0].provider).toBeTruthy()
    response = await adapter.getResources(mockFeature2)
    expect(response).toEqual([])
  })
})
