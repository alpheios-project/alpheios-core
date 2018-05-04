/* eslint-env jest */
import AnnotationQuery from '../../../src/lib/queries/annotation-query'
import Options from '../../../src/lib/options/options'
import LocalStorageArea from '../../../src/lib/options/local-storage-area.js'
import SiteOptions from './fixtures/site-options-treebanks.json'

describe('annotation-query.test.js', () => {
  let emptyPromise
  beforeEach(() => {
    emptyPromise = () => { return new Promise((resolve, reject) => {}) }
  })

  it('parses treebank options', async () => {
    let allSiteOptions = []
    for (let site of SiteOptions) {
      for (let domain of site.options) {
        let siteOpts = new Options(domain, LocalStorageArea)
        siteOpts.storageAdapter.get = emptyPromise
        siteOpts.storageAdapter.set = emptyPromise
        allSiteOptions.push({ uriMatch: site.uriMatch, resourceOptions: siteOpts })
      }
    }
    let query = AnnotationQuery.create({
      siteOptions: allSiteOptions,
      document: { location: { href: 'http://example.org/abc' } }
    })
    let results = await query.getTreebankOptions()
    expect(results).toEqual({ treebank: { page: { src: 'https://alpheios.net/treebanks/xx' } } })
  })
})
