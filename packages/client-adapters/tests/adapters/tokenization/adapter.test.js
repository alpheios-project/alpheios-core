/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import AlpheiosTokenizationAdapter from '@clAdapters/adapters/tokenization/adapter'
import { Options, LocalStorageArea } from 'alpheios-data-models'

import { Fixture, TokenizationFixture } from 'alpheios-fixtures'

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
    let sourceJson = TokenizationFixture.getFixtureRes({
      testName: 'text-example-1'
    })

    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      fetchOptions: {
        lang: 'lat'
      }, 
      sourceData: sourceJson
    })

    const text = `
    In nova fert animus mutatas dicere formas
corpora. Di , coeptis (nam vos mutastis et illas)
adspirate meis primaque ab origine mundi
ad mea perpetuum deducite tempora carmen.

nullus adhuc mundo praebebat lumina Titan,
nec nova crescendo reparabat cornua Phoebe,
nec circumfuso pendebat in aere tellus
ponderibus librata suis, nec bracchia longo
margine terrarum porrexerat Amphitrite;
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
    let sourceJson = TokenizationFixture.getFixtureRes({
      testName: 'config-data'
    })

    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getConfig',
      storage: LocalStorageArea, 
      sourceData: sourceJson
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

  it('8 AlpheiosTokenizationAdapter - defineContentType returns correct mime type', async () => {
    let adapterText = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      sourceData: {
        segments: []
      },
      fetchOptions: {
        lang: 'lat',
        sourceType: 'text'
      }
    })

    expect(adapterText.defineContentType()).toEqual({ 'Content-Type': 'text/plain' })

    let adapterTei = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      sourceData: {
        segments: []
      },
      fetchOptions: {
        lang: 'lat',
        sourceType: 'tei'
      }
    })

    expect(adapterTei.defineContentType()).toEqual({ 'Content-Type': 'application/xml' })
  })

  it('9 AlpheiosTokenizationAdapter - getTokens returns segments -  tei/default', async () => {
    let sourceJson = TokenizationFixture.getFixtureRes({
      testName: 'tei-example-1'
    })

    let adapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'tokenizationMethod',
      method: 'getTokens',
      fetchOptions: {
        lang: 'lat',
        sourceType: 'tei'
      }, 
      sourceData: sourceJson
    })

    const text = `
    <TEI xmlns="http://www.tei-c.org/ns/1.0">
    <teiHeader>
      <fileDesc>
        <titleStmt>
          <title type="work" n="Gal.">De bello Gallico</title>
        </titleStmt>
        <publicationStmt>
          <ab/>
        </publicationStmt>
        <sourceDesc>
          <ab/>
        </sourceDesc>
      </fileDesc>
    </teiHeader>
  
    <text>
      <body>
        <div type="edition" xml:lang="lat" n="urn:cts:latinLit:phi0448.phi001.perseus-lat2">
          <div n="1" type="textpart" subtype="book">
            <head>COMMENTARIUS PRIMUS</head>
            <div type="textpart" subtype="chapter" n="1">
              <div type="textpart" subtype="section" n="1">
                <p>Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae,
                  aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli
                  appellantur.</p>
              </div>
  
              <div type="textpart" subtype="section" n="2">
                <p>Hi omnes lingua, institutis, legibus inter se differunt. Gallos ab
                  Aquitanis Garumna flumen, a Belgis Matrona et Sequana dividit.</p>
              </div>
  
              <div type="textpart" subtype="section" n="3">
                <p>Horum omnium fortissimi sunt Belgae, propterea quod a cultu atque
                  humanitate provinciae longissime absunt, minimeque ad eos mercatores
                  saepe commeant atque ea quae ad effeminandos animos pertinent
                  important,</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </text>
  </TEI>
  
    `
    const result = await adapter.getTokens(text)

    expect(result.segments.length).toEqual(1)
    expect(adapter.errors).toEqual([])
  })

})
