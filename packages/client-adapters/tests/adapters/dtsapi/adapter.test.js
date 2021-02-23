/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import DTSAPIAdapter from '@clAdapters/adapters/dtsapi/adapter'

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
      method: 'getCollections'
    })
  
    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
  })

  it('2 DTSAPIAdapter - getCollections - retrieves the first level of collections', async () => {
    let adapter = new DTSAPIAdapter({
      category: 'datsapiGroup',
      adapterName: 'dtsapiMethod',
      method: 'getCollections'
    })

    const result = await adapter.getCollections()
    console.info(result)
    console.info(adapter.errors)
  })
})
