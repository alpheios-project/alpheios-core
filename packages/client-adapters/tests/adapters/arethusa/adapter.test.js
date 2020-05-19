/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import ArethusaTreebankAdapter from '@clAdapters/adapters/arethusa/adapter'
import { Constants, Homonym } from 'alpheios-data-models'
import { ArethusaFixture } from 'alpheios-fixtures'

describe('arethusa/adapter.test.js', () => {
  beforeEach(() => {
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 ArethusaTreebankAdapter - constructor uploads config, creates engines and enginesSet', () => {
    const adapter = new ArethusaTreebankAdapter({
      category: 'morphology',
      adapterName: 'arethusaTreebank',
      method: 'getHomonym'
    })

    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
  })

  it('2 ArethusaTreebankAdapter - getHomonym returns Homonym', async () => {
    const adapter = new ArethusaTreebankAdapter({
      category: 'morphology',
      adapterName: 'arethusaTreebank',
      method: 'getHomonym'
    })
    expect(adapter.errors.length).toEqual(0)
    // stub the service request
    adapter._fetchArethusaData = ArethusaFixture.treebankServiceRequest
    const res = await adapter.getHomonym(Constants.LANG_LATIN, 'aberis', 'http://example.org', '1', '1')
    expect(adapter.errors.length).toEqual(0)
    expect(res).toBeInstanceOf(Homonym)
  })

  it('3 ArethusaTreebankAdapter - calls refreshView', async () => {
    const adapter = new ArethusaTreebankAdapter({
      category: 'morphology',
      adapterName: 'arethusaTreebank',
      method: 'refreshView'
    })
    adapter.refreshView = jest.fn().mockResolvedValue({})
    expect(adapter.errors.length).toEqual(0)
    const res = await adapter.refreshView('http://example.org')
    expect(adapter.errors.length).toEqual(0)
    expect(res).toEqual({})
  })

  it('3 ArethusaTreebankAdapter - getHomonym maps participles properly', async () => {
    const adapter = new ArethusaTreebankAdapter({
      category: 'morphology',
      adapterName: 'arethusaTreebank',
      method: 'getHomonym'
    })
    // stub the service request
    adapter._fetchArethusaData = ArethusaFixture.treebankServiceRequest
    const res = await adapter.getHomonym(Constants.LANG_GREEK, 'ἐμπρέποντας', 'http://example.org', '1', '2')
    console.log(adapter.errors)
    expect(adapter.errors.length).toEqual(0)
    expect(res).toBeInstanceOf(Homonym)
    expect(res.lexemes.length).toEqual(1)
    expect(res.lexemes[0].inflections[0]["part of speech"].value).toEqual('verb participle')
    expect(res.lexemes[0].lemma.features["part of speech"].value).toEqual('verb')
  })
})
