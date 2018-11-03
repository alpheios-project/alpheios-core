/* eslint-env jest */
import 'whatwg-fetch'
import { Constants } from 'alpheios-data-models'

import TuftsAdapter from '@/tufts/adapter.js'
import TreebankAdapter from '@/alpheiostb/adapter.js'

describe('TuftsAdapter', () => {
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

  it('1 TuftsAdapter', async () => {
    let adapter = new TuftsAdapter()
    console.info('adapter1', adapter)

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN, 'cepit')
    console.info('****************homonym1', homonym)
  })

  it('1 AlpheiosTreebankAdapter', async () => {
    let adapter = new TreebankAdapter()
    console.info('adapter2', adapter)

    let homonym = await adapter.getHomonym(Constants.LANG_LATIN, 'phi0959.phi006.alpheios-text-lat1#1-2')
    console.info('****************homonym2', homonym)
  })
})
