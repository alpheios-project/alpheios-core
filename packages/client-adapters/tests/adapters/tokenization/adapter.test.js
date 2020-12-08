/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import AlpheiosTokenizationAdapter from '@clAdapters/adapters/tokenization/adapter'
import { Options, LocalStorageArea } from 'alpheios-data-models'

describe('tokenization/adapter.test.js', () => {
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

  it('1 AlpheiosTokenizationAdapter - constructor uploads config, available', () => {
    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      fetchOptions: {
        lang: 'lat'
      }
    })

    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
    expect(adapter.fetchOptions).toEqual(expect.any(Object))
  })

  it('2 AlpheiosTokenizationAdapter - createTokenizeFetchURL constructs url', () => {
    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      fetchOptions: {
        lang: 'lat'
      }
    })

    let url = adapter.createTokenizeFetchURL()

    expect(url).toEqual(`${adapter.fetchOptions.baseUrl}tokenize/text?lang=lat`)

    adapter.fetchOptions.segments = 'doubline'

    url = adapter.createTokenizeFetchURL()
    expect(url).toEqual(`${adapter.fetchOptions.baseUrl}tokenize/text?lang=lat&segments=doubline`)

    adapter.fetchOptions.segments = 'singleline'
    adapter.fetchOptions.segstart = 20

    url = adapter.createTokenizeFetchURL()
    expect(url).toEqual(`${adapter.fetchOptions.baseUrl}tokenize/text?lang=lat&segments=singleline&segstart=20`)

    delete adapter.fetchOptions.segments
    delete adapter.fetchOptions.segstart
    adapter.fetchOptions.direction = 'ltr'

    url = adapter.createTokenizeFetchURL()
    expect(url).toEqual(`${adapter.fetchOptions.baseUrl}tokenize/text?lang=lat&direction=ltr`)

    adapter.fetchOptions.direction = 'ltr'
    adapter.fetchOptions.tbseg = true

    url = adapter.createTokenizeFetchURL()
    expect(url).toEqual(`${adapter.fetchOptions.baseUrl}tokenize/text?lang=lat&direction=ltr&tbseg=true`)

  })

  it('3 AlpheiosTokenizationAdapter - createTokenizeFetchURL returns empty url, if sourceType or lang is not defined in fetchOptions', () => {
    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      fetchOptions: {
      }
    })


    let url = adapter.createTokenizeFetchURL() // lang is not defined, textType is defined in defaultConfig
    expect(url).not.toBeDefined()

    adapter.fetchOptions.lang = 'lat'
    delete adapter.fetchOptions.sourceType

    url = adapter.createTokenizeFetchURL() // lang is defined, textType is not defined
    expect(url).not.toBeDefined()
  })

  it('4 AlpheiosTokenizationAdapter - getTokens returns segments -  text/lineseg', async () => {
    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      fetchOptions: {
        lang: 'lat'
      }
    })

    const text = `
    In nova fert animus mutatas dicere formas
corpora. Di , coeptis (nam vos mutastis et illas)
adspirate meis primaque ab origine mundi
ad mea perpetuum deducite tempora carmen.
Ante mare et terras et quod tegit omnia caelum
unus erat toto naturae vultus in orbe,
quem dixere chaos : rudis indigestaque moles
nec quicquam nisi pondus iners congestaque eodem
non bene iunctarum discordia semina rerum.

nullus adhuc mundo praebebat lumina Titan,
nec nova crescendo reparabat cornua Phoebe,
nec circumfuso pendebat in aere tellus
ponderibus librata suis, nec bracchia longo
margine terrarum porrexerat Amphitrite;
utque aer, tellus illic et pontus et aether.
Sic erat instabilis tellus, innabilis unda,
lucis egens aer: nulli sua forma manebat,
obstabatque aliis aliud, quia corpore in uno
frigida pugnabant calidis, umentia siccis,
mollia cum duris, sine pondere habentia pondus.
    `
    const result = await adapter.getTokens(text)
    expect(result.segments.length).toEqual(2)
    // console.info('segments', segments)
    expect(adapter.errors).toEqual([])
  })

  it('5 AlpheiosTokenizationAdapter - getTokens returns undefined and adds error to adapter, if url is not constructed', async () => {
    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      fetchOptions: {
      }
    })

    const text = 'In nova fert animus mutatas dicere formas'
    const result = await adapter.getTokens(text)

    expect(result).not.toBeDefined()
    expect(adapter.errors.length).toEqual(1)
  })

  it('6 AlpheiosTokenizationAdapter - getTokens returns sourceData if it is passed to adapter', async () => {
    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      sourceData: {
        segments: []
      },
      fetchOptions: {
        lang: 'lat'
      }
    })

    const text = 'In nova fert animus mutatas dicere formas'
    const result = await adapter.getTokens(text)

    expect(result).toEqual({ segments: []})
    expect(adapter.errors).toEqual([])
  })

  it('7 AlpheiosTokenizationAdapter - getConfig returns config from the remote source', async () => {
    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getConfig',
      storage: LocalStorageArea
    })

    jest.spyOn(adapter, 'formatSettings')
    jest.spyOn(adapter, 'convertToOptions')

    const result = await adapter.getConfig()

    expect(adapter.formatSettings).toHaveBeenCalled()
    expect(adapter.convertToOptions).toHaveBeenCalledTimes(2)

    expect(result).toEqual({
      tei: expect.any(Options),
      text: expect.any(Options)
    })
  })
})
