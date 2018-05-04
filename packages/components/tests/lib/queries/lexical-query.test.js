/* eslint-env jest */
import LexicalQuery from '../../../src/lib/queries/lexical-query'
import Options from '../../../src/lib/options/options'
import LanguageOptionDefaults from '../../../src/settings/language-options-defaults.json'
import LocalStorageArea from '../../../src/lib/options/local-storage-area.js'
import SiteOptions from './fixtures/site-options-shortlex.json'

describe('lexical-query.test.js', () => {
  let emptyPromise
  beforeEach(() => {
    emptyPromise = () => { return new Promise((resolve, reject) => {}) }
  })

  it('parses lexicon options', async () => {
    let languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

    let allSiteOptions = []
    for (let site of SiteOptions) {
      for (let domain of site.options) {
        let siteOpts = new Options(domain, LocalStorageArea)
        siteOpts.storageAdapter.get = emptyPromise
        siteOpts.storageAdapter.set = emptyPromise
        allSiteOptions.push({ uriMatch: site.uriMatch, resourceOptions: siteOpts })
      }
    }
    let mockSelector = {
      location: 'http://example.org',
      languageCode: 'lat'
    }
    let query = LexicalQuery.create(mockSelector, {
      resourceOptions: languageOptions,
      siteOptions: allSiteOptions,
      langOpts: {}
    })
    expect(query.getLexiconOptions('lexiconsShort')).toEqual({allow: ['https://github.com/alpheios-project/xx']})
  })
})
