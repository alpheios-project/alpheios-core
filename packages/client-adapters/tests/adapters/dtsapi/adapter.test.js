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

    const collections = await adapter.getCollection()
    
    expect(collections.members.length).toEqual(2)
    expect(adapter.errors.length).toEqual(0)
  })

  it('3 DTSAPIAdapter - getCollection - retrieves the second level of collections - latin', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collections = await adapter.getCollection('urn:alpheios:latinLit')
    
    expect(collections.members.length).toEqual(3)
    expect(adapter.errors.length).toEqual(0)
  })

  it('4 DTSAPIAdapter - getCollections - retrieves the third level of collections - latin/Catullus', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollection',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collections = await adapter.getCollection('urn:cts:latinLit:phi0472')
    
    expect(collections.members.length).toEqual(1)
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
    expect(collection.navigation).toBeDefined()

    expect(collection.navigation).toEqual(expect.any(Resource))
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
    await adapter.getNavigation('urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1', collection)
   
    expect(collection.navigation).toEqual(expect.any(Resource))

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
    await adapter.getNavigation('urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1', collection)

    const regexTEI = new RegExp('^<TEI.+')

    const document = await adapter.getDocument(collection.navigation.id, { ref: collection.navigation.refs[0] })
    expect(document.length).toBeGreaterThan(0)  
    expect(regexTEI.test(document)).toBeTruthy()

    expect(adapter.errors.length).toEqual(0)
  })

  it('8 DTSAPIAdapter - getDocument - retrieves several passages by start/end', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getNavigation',
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    })

    const collection = await adapter.getCollection('urn:cts:latinLit:phi0472.phi001')
    await adapter.getNavigation('urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1', collection)
    
    const regexTEI = new RegExp('^<TEI.+')

    const document1 = await adapter.getDocument(collection.navigation.id, { start: collection.navigation.refs[collection.navigation.refs.length-2] })
    expect(document1.length).toBeGreaterThan(0)
    expect(regexTEI.test(document1)).toBeTruthy()

    const document2 = await adapter.getDocument(collection.navigation.id, { start: collection.navigation.refs[0], end: collection.navigation.refs[1] })
    expect(document2.length).toBeGreaterThan(0)
    expect(regexTEI.test(document2)).toBeTruthy()

    expect(adapter.errors.length).toEqual(0)
  })

})
