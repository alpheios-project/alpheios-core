/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import AlpheiosLogeionAdapter from '@clAdapters/adapters/logeion/adapter'

// import { LogeionFixture } from 'alpheios-fixtures'

describe('logeion/adapter.test.js', () => {
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

  it('1 AlpheiosLogeionAdapter - constructor uploads config, available', () => {
    let adapter = new AlpheiosLogeionAdapter({
      category: 'autocompleteWords',
      adapterName: 'autoCompleteWords',
      method: 'getWords',
      lang: 'lat',
      limit: '15'
    })

    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
    expect(adapter.limit).toEqual(15)
    expect(adapter.available).toBeTruthy()
  })

  it('2 AlpheiosLogeionAdapter - createFetchURL returns url for fetching words for autocomplete', () => {
    let adapter = new AlpheiosLogeionAdapter({
      category: 'autocompleteWords',
      adapterName: 'autoCompleteWords',
      method: 'getWords',
      lang: 'lat',
      limit: '15'
    })

    expect(adapter.createFetchURL('male').length).toBeGreaterThan(5)
  })

  it('3 AlpheiosLogeionAdapter - filterAndLimitWords checks words by language and limit them - latin', () => {
    let adapter = new AlpheiosLogeionAdapter({
      category: 'autocompleteWords',
      adapterName: 'autoCompleteWords',
      method: 'getWords',
      lang: 'lat',
      limit: '2'
    })

    const result = adapter.filterAndLimitWords(['male', 'Malea', 'Males', 'μαλέω', 'Μαλέα'])
    expect(result).toEqual(['male', 'Malea'])
  })

  it('4 AlpheiosLogeionAdapter - filterAndLimitWords checks words by language and limit them - greek', () => {
    let adapter = new AlpheiosLogeionAdapter({
      category: 'autocompleteWords',
      adapterName: 'autoCompleteWords',
      method: 'getWords',
      lang: 'grc',
      limit: '2'
    })

    const result = adapter.filterAndLimitWords(['male', 'Malea', 'Males', 'μαλέω', 'Μαλέα'])
    expect(result).toEqual(['μαλέω', 'Μαλέα'])
  })

  it('5 AlpheiosLogeionAdapter - getWords executes fetch and filterAndLimitWords for the text', async () => {
    let adapter = new AlpheiosLogeionAdapter({
      category: 'autocompleteWords',
      adapterName: 'autoCompleteWords',
      method: 'getWords',
      lang: 'lat',
      limit: '10'
    })

    adapter.fetch = jest.fn().mockResolvedValue({
        words: ['male', 'Malea', 'Males', 'μαλέω', 'Μαλέα']
      })

    const res = await adapter.getWords('male')
    expect(res).toEqual(['male', 'Malea', 'Males'])
  })
})

