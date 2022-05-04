/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import DTSAPIAdapter from '@clAdapters/adapters/dtsapi/adapter'

import { Collection, Resource, Author } from 'alpheios-data-models'
import { Fixture, TokenizationFixture } from 'alpheios-fixtures'

describe('dtsapi/adapter.test.js', () => {
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

  it('1 DTSAPIAdapter - constructor uploads config, available', () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })
  
    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
    expect(adapter.config.baseUrl).toEqual('https://dts.alpheios.net/api/dts/')
  })

  it('2 DTSAPIAdapter - getCollection - retrieves the first level of collections', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collection = await adapter.getCollection()
    expect(collection.members.length).toEqual(2)
    expect(adapter.errors.length).toEqual(0)
  })

  it('3 DTSAPIAdapter - getCollection - retrieves the second level of collections - latin', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collection = await adapter.getCollection('urn:alpheios:latinLit')
    
    expect(collection.members.length).toEqual(3)
    expect(adapter.errors.length).toEqual(0)
  })

  it('4 DTSAPIAdapter - getCollections - retrieves the third level of collections - latin/Catullus', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collection = await adapter.getCollection('urn:cts:latinLit:phi0472')
    
    expect(collection.members.length).toEqual(1)
    expect(adapter.errors.length).toEqual(0)
  })

  it('5 DTSAPIAdapter - getCollection - retrieves the fourth level of collections - latin/Catullus/Carmina', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collection = await adapter.getCollection('urn:cts:latinLit:phi0472.phi001')
    expect(collection.members.length).toEqual(0)
    expect(collection.resources.length).toEqual(1)
    expect(adapter.errors.length).toEqual(0)
  })

  it('6 DTSAPIAdapter - getNavigation - retrieves the first navigation level of collections - latin/Catullus/Carmina', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getNavigation',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collection = await adapter.getCollection('urn:cts:latinLit:phi0472.phi001')
    await adapter.getNavigation('urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1', collection.resources[0])
    
    expect(collection.resources[0]).toEqual(expect.any(Resource))
    expect(collection.resources[0].refs.length).toBeGreaterThan(0)
    expect(adapter.errors.length).toEqual(0)
  })

  it('7 DTSAPIAdapter - getDocument - retrieves a passage by ref', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getNavigation',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collection = await adapter.getCollection('urn:cts:latinLit:phi0472.phi001')
    await adapter.getNavigation('urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1', collection.resources[0])

    const regexTEI = new RegExp('^<TEI.+')

    const document = await adapter.getDocument(collection.resources[0].id, { ref: collection.resources[0].refs[0] })
    expect(document.length).toBeGreaterThan(0)  
    expect(regexTEI.test(document)).toBeTruthy()

    expect(adapter.errors.length).toEqual(0)
  })

  it.skip('8 DTSAPIAdapter - getDocument - retrieves several passages by start/end', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getNavigation',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collection = await adapter.getCollection('urn:cts:latinLit:phi0472.phi001')
    await adapter.getNavigation('urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1', collection.resources[0])
    
    const regexTEI = new RegExp('^<TEI.+')

    const document1 = await adapter.getDocument(collection.resources[0].id, { start: collection.resources[0].refs[collection.resources[0].refs.length-2] })
    expect(document1.length).toBeGreaterThan(0)
    expect(regexTEI.test(document1)).toBeTruthy()

    const document2 = await adapter.getDocument(collection.resources[0].id, { start: collection.resources[0].refs[0], end: collection.resources[0].refs[1] })
    expect(document2.length).toBeGreaterThan(0)
    expect(regexTEI.test(document2)).toBeTruthy()

    expect(adapter.errors.length).toEqual(0)
  })

  it.skip('9 DTSAPIAdapter - getCollection - retrieves the first level of collections', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      // baseUrl: 'https://dts.alpheios.net/api/dts/'
      baseUrl: 'https://betamasaheft.eu/api/dts/'
    })

    const col1 = await adapter.getCollection()
    console.info(col1.links)

    const col2 = await adapter.getCollection(col1.links[0].id)
    console.info(col2.links)

    const resource = await adapter.getNavigation(col2.links[0].id, col2.resources[0])
    console.info(resource)

    const doc = await adapter.getDocument(resource.id, { ref: resource.refs[0] })
    console.info(doc.substr(0, 20))
  }, 500000)

  it.skip('10 DTSAPIAdapter - getCollection - retrieves the first level of collections', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
      // baseUrl: 'https://betamasaheft.eu/api/dts/'
    })

    const col1 = await adapter.getCollection()
    console.info(col1.links)

    const col2 = await adapter.getCollection(col1.links[0].id)
    console.info(col2.links)

    const col3 = await adapter.getCollection(col2.links[0].id)
    console.info(col3.links)

    const col4 = await adapter.getCollection(col3.links[0].id)
    console.info(col4.links)

    const resource = await adapter.getNavigation(col4.links[0].id, col4.resources[0])
    console.info(resource)

    const doc = await adapter.getDocument(resource.id, { ref: resource.refs[0] })
    console.info(doc.substr(0, 20))

  }, 500000)

  it.skip('11 DTSAPIAdapter - getCollection - retrieves the first level of collections - pagination', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      // baseUrl: 'https://dts.alpheios.net/api/dts/'
      baseUrl: 'https://betamasaheft.eu/api/dts/'
    })

    const col1 = await adapter.getCollection()
    expect(col1.pagination).not.toBeDefined()

    const col2 = await adapter.getCollection(col1.links[0].id)
    expect(col2.pagination).toEqual({ first: 1, next: 2, last: 204, previous: null, current: 1 })

    const col3 = await adapter.getCollection(col1.links[0].id, 3)
    expect(col3.pagination).toEqual({ first: 1, next: 4, last: 204, previous: 2, current: 3 })

  }, 500000)
})
