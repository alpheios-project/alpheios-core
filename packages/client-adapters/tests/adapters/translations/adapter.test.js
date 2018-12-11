/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import AlpheiosLemmaTranslationsAdapter from '@/adapters/translations/adapter'
import ClientAdapters from '@/client-adapters.js'
import { LanguageModelFactory as LMF, Constants, Homonym, Lexeme, Lemma } from 'alpheios-data-models'

describe('lexicons/adapter.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testSuccessHomonym, testLangID

  beforeAll(async () => {
    ClientAdapters.init()
    testLangID = Constants.LANG_LATIN

    let homonymRes1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: testLangID,
        word: 'mare'
      }
    })
    testSuccessHomonym = homonymRes1.result
  })
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

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 AlpheiosLemmaTranslationsAdapter - constructor uploads config, mapLangUri, provider', () => {
    let adapter = new AlpheiosLemmaTranslationsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchTranslations'
    })

    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
    expect(adapter.mapLangUri).toBeDefined()
    expect(adapter.provider).toBeDefined()
  })

  it.skip('2 AlpheiosLemmaTranslationsAdapter - getTranslationsList gets translations and adds no error', async () => {
    let adapter = new AlpheiosLemmaTranslationsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchTranslations'
    })

    adapter.addError = jest.fn()
    await adapter.getTranslationsList(testSuccessHomonym, 'es')
    let timeoutRes = await timeout(15000)

    let translationsCheck = [
      ['mar'], ['varón, macho; varonil, viril'], ['varón, macho; varonil, viril'], ['mar']
    ]
    expect(adapter.addError).not.toHaveBeenCalled()
    testSuccessHomonym.lexemes.forEach((lexeme, i) => {
      expect(lexeme.lemma.translation).toBeDefined()
      expect(lexeme.lemma.translation.glosses).toEqual(translationsCheck[i])
    })

    return timeoutRes
  }, 30000)

  it('3 AlpheiosLemmaTranslationsAdapter - prepareInput creates input string for url', async () => {
    let adapter = new AlpheiosLemmaTranslationsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchTranslations'
    })

    let lemmaList = []
    for (let lexeme of testSuccessHomonym.lexemes) {
      lemmaList.push(lexeme.lemma)
    }

    let res = adapter.prepareInput(lemmaList)
    expect(res).toEqual('mare,mas')
  })

  it('4 AlpheiosLemmaTranslationsAdapter - getAvailableResLang check availablity of translations', async () => {
    let adapter = new AlpheiosLemmaTranslationsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchTranslations'
    })

    let resSuccess = await adapter.getAvailableResLang('lat', 'spa')
    expect(resSuccess).toEqual('https://ats.alpheios.net/lat/spa')

    let resFailed = await adapter.getAvailableResLang('lat', 'foo')
    expect(resFailed).toBeUndefined()
  })
})