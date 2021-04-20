/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import DetectLangAdapter from '@clAdapters/adapters/detectlang/adapter'

describe('detectlang/adapter.test.js', () => {
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

  it('1 DetectLangAdapter - constructor uploads config, available', () => {
    let adapter = new DetectLangAdapter({
      category: 'detectlangGroup',
      adapterName: 'detectlangMethod',
      method: 'detectLanguage'
    })
  
    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
  })

  it.skip('2 DetectLangAdapter - getDetectedLangsList - real data', async () => {
    let adapter = new DetectLangAdapter({
      category: 'detectlangGroup',
      adapterName: 'detectlangMethod',
      method: 'detectLanguage'
    })

    const result = await adapter.getDetectedLangsList('Mare male')
    expect(result).toEqual('eng')
  }, 50000)

  it('3 DetectLangAdapter - getDetectedLangsList - sourceData - full response', async () => {
    let adapter = new DetectLangAdapter({
      category: 'detectlangGroup',
      adapterName: 'detectlangMethod',
      method: 'detectLanguage',
      sourceData: { data: {
        detections: [
          { language: 'en', isReliable: true, confidence: 5.36 },
          { language: 'pt', isReliable: true, confidence: 4.36 },
          { language: 'eu', isReliable: false, confidence: 3.36 }
        ]
      }}
    })

    const result = await adapter.getDetectedLangsList('Mare male')

    expect(result).toEqual('eng')
  }, 50000)

  it('3 DetectLangAdapter - getDetectedLangsList - sourceData - full response - no reliable languages', async () => {
    let adapter = new DetectLangAdapter({
      category: 'detectlangGroup',
      adapterName: 'detectlangMethod',
      method: 'detectLanguage',
      sourceData: { data: {
        detections: [
          { language: 'en', isReliable: false, confidence: 4.36 },
          { language: 'pt', isReliable: false, confidence: 5.36 },
          { language: 'eu', isReliable: false, confidence: 3.36 }
        ]
      }}
    })

    const result = await adapter.getDetectedLangsList('Mare male')

    expect(result).toEqual('por')
  }, 50000)

  it('4 DetectLangAdapter - getDetectedLangsList - sourceData - empty response', async () => {
    let adapter = new DetectLangAdapter({
      category: 'detectlangGroup',
      adapterName: 'detectlangMethod',
      method: 'detectLanguage',
      sourceData: { data: {
        detections: []
      }}
    })

    const result = await adapter.getDetectedLangsList('Mare male')
    expect(result).toBeNull()
  }, 50000)


  it('5 DetectLangAdapter - getDetectedLangsList - not enough data for url', async () => {
    let adapter = new DetectLangAdapter({
      category: 'detectlangGroup',
      adapterName: 'detectlangMethod',
      method: 'detectLanguage'
    })

    const result = await adapter.getDetectedLangsList('')
    expect(result).toBeUndefined()
    expect(adapter.errors.length).toEqual(1)
  }, 50000)

  it('6 DetectLangAdapter - getDetectedLangsList - errors on fetching', async () => {
    let adapter = new DetectLangAdapter({
      category: 'detectlangGroup',
      adapterName: 'detectlangMethod',
      method: 'detectLanguage'
    })

    adapter.getUrl = jest.fn(() => { throw new Error('Test error') })

    const result = await adapter.getDetectedLangsList('test')

    expect(result).toBeUndefined()
    expect(adapter.errors.length).toEqual(1)
  }, 50000)

})
