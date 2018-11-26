/* eslint-env jest */
import AnnotationQuery from '@/lib/queries/annotation-query'
import Options from '@/lib/options/options'
import LocalStorageArea from '@/lib/options/local-storage-area.js'
import SiteOptions from './fixtures/site-options-treebanks.json'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

describe('annotation-query.test.js', () => {
  let emptyPromise
  beforeEach(() => {
    emptyPromise = () => { return new Promise((resolve, reject) => {}) }
  })

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

  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  let allSiteOptions = []
  for (let site of SiteOptions) {
    for (let domain of site.options) {
      let siteOpts = new Options(domain, LocalStorageArea)
      siteOpts.storageAdapter.get = emptyPromise
      siteOpts.storageAdapter.set = emptyPromise
      allSiteOptions.push({ uriMatch: site.uriMatch, resourceOptions: siteOpts })
    }
  }

  it('1 AnnotationQuery - getTreebankOptions returns empty treebank if href is empty', async () => {
    let query = AnnotationQuery.create({
      siteOptions: allSiteOptions,
      document: { location: { href: '' } }
    })
    let results = await query.getTreebankOptions()
    expect(results).toEqual({ treebank: { page: {} } })
  })

  it('2 AnnotationQuery - getTreebankOptions parses treebank options', async () => {
    let query = AnnotationQuery.create({
      siteOptions: allSiteOptions,
      document: { location: { href: 'http://example.org/abc' } }
    })
    let results = await query.getTreebankOptions()
    expect(results).toEqual({ treebank: { page: { src: 'https://alpheios.net/treebanks/xx' } } })
  })

  it('3 AnnotationQuery - getData execute - getTreebankOptions, updatePageAnnotationData, finalize', async () => {
    let options = {
      l10n: l10n,
      siteOptions: allSiteOptions,
      document: { location: { href: 'http://example.org/abc' } },
      uiController: {
        updatePageAnnotationData: function () { }
      }
    }
    let query = AnnotationQuery.create(options)

    let spy1 = jest.spyOn(AnnotationQuery.evt.ANNOTATIONS_AVAILABLE, 'pub')
    let spy2 = jest.spyOn(query, 'getTreebankOptions')
    let spy3 = jest.spyOn(query, 'finalize')
    await query.getData()

    expect(spy1).toBeCalled()
    expect(spy2).toBeCalled()
    expect(spy3).toBeCalled()
  })
})
