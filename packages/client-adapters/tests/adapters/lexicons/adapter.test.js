/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import papaparse from 'papaparse'

import AlpheiosLexiconsAdapter from '@clAdapters/adapters/lexicons/adapter'
import ClientAdapters from '@clAdapters/client-adapters.js'
import { LanguageModelFactory as LMF, Constants, Homonym, Lexeme, Lemma } from 'alpheios-data-models'
import { Fixture, LexiconsFixture } from 'alpheios-fixtures'

import BaseTestHelp from '@tests/base-test-help.js'

describe('lexicons/adapter.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testSuccessHomonym, testFailedHomonym, testLangID

  beforeAll(async () => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    const adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs'
    })

    const urlKey = 'https://github.com/alpheios-project/lsj'

    let url = adapter.config.lexicons[urlKey].urls.short
    let result = await adapter.checkCachedData(url, LexiconsFixture.lexData[url])

    url = adapter.config.lexicons[urlKey].urls.index
    result = await adapter.checkCachedData(url, LexiconsFixture.lexData[url])

    return result
  }, 50000)

  beforeEach(async () => {
    ClientAdapters.init()
    testLangID = Constants.LANG_GREEK
    let sourceJson = Fixture.getFixtureRes({
      langCode: 'grc', adapter: 'tufts', word: 'μύες'
    })

    let homonymRes1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: testLangID,
        word: 'μύες'
      },
      sourceData: sourceJson
    })
    testSuccessHomonym = homonymRes1.result
    let formLexeme = new Lexeme(new Lemma('ινώδους', testLangID), [])
    testFailedHomonym = new Homonym([formLexeme], 'ινώδους')
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

  function updateObjectWithFixtures (adapter, urlLib, urlType) {
    let urlKey = adapter.config.lexicons[urlLib].urls[urlType]

    let cachedDefinitions = new Map()
    cachedDefinitions.set(urlKey, LexiconsFixture.lexData[urlKey])
    return cachedDefinitions
  }

  it('1 AlpheiosLexiconsAdapter - constructor uploads config and options', () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    expect(adapter.errors).toEqual([])
    expect(adapter.l10n).toBeDefined()
    expect(adapter.config).toBeDefined()
    expect(adapter.options).toBeDefined()
    expect(adapter.options.timeout).toBeDefined()
  })

  it('2 AlpheiosLexiconsAdapter - fetchShortDefs executes fetchDefinitions with lookupFunction = short', () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    adapter.fetchDefinitions = jest.fn()

    adapter.fetchShortDefs('fooHomonym')
    expect(adapter.fetchDefinitions).toHaveBeenCalledWith('fooHomonym', {}, 'short')
  })

  it('3 AlpheiosLexiconsAdapter - fetchFullDefs executes fetchDefinitions with lookupFunction = full', () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    adapter.fetchDefinitions = jest.fn()

    adapter.fetchFullDefs('fooHomonym')
    expect(adapter.fetchDefinitions).toHaveBeenCalledWith('fooHomonym', {}, 'full')
  })

  it('4 AlpheiosLexiconsAdapter - prepareShortDefPromise, if success - it executes updateShortDefs, prepareSuccessCallback', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'

    await BaseTestHelp.updateCacheWithFixtures()

    jest.spyOn(adapter, 'updateShortDefs')
    adapter.prepareSuccessCallback = jest.fn()

    await adapter.prepareShortDefPromise(testSuccessHomonym, urlKey)

    expect(adapter.updateShortDefs).toHaveBeenCalled()
    expect(adapter.prepareSuccessCallback).toHaveBeenCalled()

  }, 25000)

  it('5 AlpheiosLexiconsAdapter - prepareShortDefPromise, if failed - it executes prepareFailedCallback', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    await BaseTestHelp.updateCacheWithFixtures()

    adapter.prepareFailedCallback = jest.fn()

    await adapter.prepareShortDefPromise(testFailedHomonym, urlKey)
    expect(adapter.prepareFailedCallback).toHaveBeenCalled()
  }, 25000)

  it('6 AlpheiosLexiconsAdapter - prepareFullDefPromise, if success - it executes collectFullDefURLs, updateFullDefsAsync, prepareSuccessCallback', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    await BaseTestHelp.updateCacheWithFixtures()

    jest.spyOn(adapter, 'collectFullDefURLs')
    jest.spyOn(adapter, 'updateFullDefsAsync')
    adapter.prepareSuccessCallback = jest.fn()

    await adapter.prepareFullDefPromise(testSuccessHomonym, urlKey)
    expect(adapter.collectFullDefURLs).toHaveBeenCalled()
    expect(adapter.updateFullDefsAsync).toHaveBeenCalled()
    expect(adapter.prepareSuccessCallback).toHaveBeenCalled()

  }, 500000)

  it('7 AlpheiosLexiconsAdapter - prepareSuccessCallback, if callBackEvtSuccess is defined it would be executed', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: jest.fn() }
    })

    adapter.prepareSuccessCallback('fooTypeRequest', 'fooHomonym')
    expect(adapter.config.callBackEvtSuccess.pub).toHaveBeenCalledWith({
      requestType: 'fooTypeRequest',
      homonym: 'fooHomonym'
    })
  })

  it('8 AlpheiosLexiconsAdapter - prepareFailedCallback, if callBackEvtFailed is defined it would be executed', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtFailed: { pub: jest.fn() }
    })

    adapter.prepareFailedCallback('fooTypeRequest', 'fooHomonym')
    expect(adapter.config.callBackEvtFailed.pub).toHaveBeenCalledWith({
      requestType: 'fooTypeRequest',
      homonym: 'fooHomonym'
    })
  })

  it('9 AlpheiosLexiconsAdapter - fetchDefinitions, if there are no allow in options it is addError', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })
    adapter.addError = jest.fn()

    adapter.fetchDefinitions('fooHomonym', {}, 'fooLookupFunction')
    expect(adapter.addError).toHaveBeenCalledWith(adapter.l10n.getMsg('LEXICONS_NO_ALLOWED_URL'))
  })

  it('10 AlpheiosLexiconsAdapter - fetchDefinitions with short lookupFunction, for each url it will be executed prepareShortDefPromise', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })
    jest.spyOn(adapter, 'getRequests')
    adapter.prepareShortDefPromise = jest.fn()

    let options = { allow: ['https://github.com/alpheios-project/lsj'] }
    adapter.fetchDefinitions(testSuccessHomonym, options, 'short')

    expect(adapter.getRequests).toHaveBeenCalled()
    let urlKeys = adapter.getRequests(testLangID).filter(url => adapter.options.allow.includes(url))

    for (let urlKey of urlKeys) {
      expect(adapter.prepareShortDefPromise).toHaveBeenCalledWith(testSuccessHomonym, urlKey, 'short')
    }
  })

  it('11 AlpheiosLexiconsAdapter - fetchDefinitions with full lookupFunction, for each url it will be executed prepareFullDefPromise', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })
    jest.spyOn(adapter, 'getRequests')
    adapter.prepareFullDefPromise = jest.fn()

    let options = { allow: ['https://github.com/alpheios-project/lsj'] }
    adapter.fetchDefinitions(testSuccessHomonym, options, 'full')

    expect(adapter.getRequests).toHaveBeenCalled()
    let urlKeys = adapter.getRequests(testLangID).filter(url => adapter.options.allow.includes(url))

    for (let urlKey of urlKeys) {
      expect(adapter.prepareFullDefPromise).toHaveBeenCalledWith(testSuccessHomonym, urlKey, 'full')
    }
  })

  it('12 AlpheiosLexiconsAdapter - checkCachedData execute fetch, fillMap only once - if successed', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    jest.spyOn(adapter, 'fetch')
    jest.spyOn(adapter, 'fillMap')

    let testURL = 'https://repos1.alpheios.net/lexdata/as/dat/grc-as-ids.dat'

    await adapter.checkCachedData(testURL)

    expect(adapter.fetch).toHaveBeenCalledWith(testURL, { timeout: 0, type: 'xml' })
    expect(adapter.fillMap).toHaveBeenCalled()

    expect(adapter.fetch).toHaveBeenCalledTimes(1)
    expect(adapter.fillMap).toHaveBeenCalledTimes(1)
  })

  it('13 AlpheiosLexiconsAdapter - checkCachedData execute addError - if failed', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    jest.spyOn(adapter, 'addError')

    let testURL = 'https://repos1Test.alpheios.net/lexdata/as/dat/grc-as-ids.dat'
    await adapter.checkCachedData(testURL)

    expect(adapter.addError).toHaveBeenCalled()
  })

  it('14 AlpheiosLexiconsAdapter - updateShortDefs executes lookupInDataIndex', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    jest.spyOn(adapter, 'lookupInDataIndex')


    let urlKey = 'https://github.com/alpheios-project/lsj'
    let url = adapter.config.lexicons[urlKey].urls.short

    const cachedDefinitions = updateObjectWithFixtures(adapter, urlKey, 'short')

    let model = LMF.getLanguageModel(testLangID)

    await adapter.updateShortDefs(cachedDefinitions.get(url), testSuccessHomonym, adapter.config.lexicons[urlKey])

    expect(adapter.lookupInDataIndex).toHaveBeenCalled()

    for (let lexeme of testSuccessHomonym.lexemes) {
      expect(adapter.lookupInDataIndex).toHaveBeenCalledWith(cachedDefinitions.get(url), lexeme.lemma, model)
      let deftexts = adapter.lookupInDataIndex(cachedDefinitions.get(url), lexeme.lemma, model)
      expect(lexeme.meaning.shortDefs[0].text).toEqual(deftexts[0].field1)
      expect(lexeme.meaning.shortDefs[0].provider.toString()).toEqual(expect.stringContaining('Liddell'))
    }
  }, 25000)

  it('15 AlpheiosLexiconsAdapter - collectFullDefURLs returns an array of requests', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let url = adapter.config.lexicons[urlKey].urls.index

    const cachedDefinitionsIndex = updateObjectWithFixtures(adapter, urlKey, 'index')

    await BaseTestHelp.updateCacheWithFixtures()

    let fullDefsRequests = adapter.collectFullDefURLs(cachedDefinitionsIndex.get(url), testSuccessHomonym, adapter.config.lexicons[urlKey])
    expect(fullDefsRequests.length).toEqual(testSuccessHomonym.lexemes.length)

    fullDefsRequests.forEach(reqData => {
      expect(reqData.url).toEqual(expect.stringContaining('https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq'))
    })
  })

  it('16 AlpheiosLexiconsAdapter - collectFullDefURLs adds an error if there are no full url in config', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    let urlKey = 'https://github.com/alpheios-project/dod'
    adapter.addError = jest.fn()
    adapter.collectFullDefURLs({}, testSuccessHomonym, adapter.config.lexicons[urlKey])
    expect(adapter.addError).toHaveBeenCalledWith(adapter.l10n.getMsg('LEXICONS_NO_FULL_URL'))
  })

  it('17 AlpheiosLexiconsAdapter - updateFullDefsAsync fetches each request and adds full definition to lexeme', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let url = adapter.config.lexicons[urlKey].urls.index
    const cachedDefinitionsIndex = updateObjectWithFixtures(adapter, urlKey, 'index')

    await BaseTestHelp.updateCacheWithFixtures()

    let fullDefsRequests = adapter.collectFullDefURLs(cachedDefinitionsIndex.get(url), testSuccessHomonym, adapter.config.lexicons[urlKey])
    adapter.prepareSuccessCallback = jest.fn()
    await adapter.updateFullDefsAsync(fullDefsRequests, adapter.config.lexicons[urlKey], testSuccessHomonym)

    await timeout(300)

    expect(fullDefsRequests.length).toEqual(testSuccessHomonym.lexemes.length)
    expect(adapter.prepareSuccessCallback).toBeCalledTimes(2)

  }, 50000)

  it('18 AlpheiosLexiconsAdapter - getRequests return available urls from config', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    let res = adapter.getRequests(testLangID)
    expect(res.length).toEqual(8)
    res.forEach(url => {
      expect(url).toEqual(expect.stringContaining('https://'))
    })
  })

  it('19 AlpheiosLexiconsAdapter - fillMap creates object from parsed data', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    const url = 'https://github.com/alpheios-project/lsj'
    let testURL = 'https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-ids.dat'

    let unparsed = LexiconsFixture.libUrls.find(sourceData => sourceData.url === url && sourceData.type === 'short' ).source
    unparsed = unparsed.join("\n")

    let parsed = papaparse.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
    let data = adapter.fillMap(parsed.data)

    expect(typeof data).toEqual('object')
    expect(Array.isArray(data.values().next().value)).toBeTruthy()
  }, 50000)

  it('20 AlpheiosLexiconsAdapter - get shortDefinitions (multiple) - mare', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    await BaseTestHelp.updateCacheWithFixtures()

    await adapter.fetchShortDefs(testSuccessHomonym, { allow: ['https://github.com/alpheios-project/lsj'] })

    await timeout(300)

    let testMeaning = testSuccessHomonym.lexemes[0].meaning

    expect(testMeaning.shortDefs.length).toEqual(1)
    expect(testMeaning.shortDefs[0].text).toEqual('mouse or rat')
    expect(testMeaning.shortDefs[0].lemmaText).toEqual('μῦς')

    let testMeaning2 = testSuccessHomonym.lexemes[1].meaning

    expect(testMeaning2.shortDefs.length).toEqual(1)
    expect(testMeaning2.shortDefs[0].text).toEqual('close, be shut')
    expect(testMeaning2.shortDefs[0].lemmaText).toEqual('μύω')
  })

  it('21 AlpheiosLexiconsAdapter - get fullDefinitions (multiple) - mare', async () => {
    let sourceJson = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: 'mare'
    })
    let homonymMareRes = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'mare'
      },
      sourceData: sourceJson
    })

    let homonymMare = homonymMareRes.result
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    await BaseTestHelp.updateCacheWithFixtures()

    await adapter.fetchFullDefs(homonymMare, { allow: ['https://github.com/alpheios-project/ls'] })

    await timeout(300)

    let testMeaning = homonymMare.lexemes[0].meaning

    expect(testMeaning.fullDefs[0].text).toBeDefined()
    expect(testMeaning.fullDefs[0].text).toEqual(expect.stringContaining('however, refers these words to root'))

    let testMeaning2 = homonymMare.lexemes[1].meaning
    expect(testMeaning2.fullDefs[0].text).toBeDefined()
    expect(testMeaning2.fullDefs[0].text).toEqual(expect.stringContaining('mare et femineum sexus,'))
  }, 60000)

  it('22 AlpheiosLexiconsAdapter - get fullDefinitions fails on not found', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    await BaseTestHelp.updateCacheWithFixtures()

    let formLexeme = new Lexeme(new Lemma('foo', Constants.LANG_LATIN), [])
    let homonym = new Homonym([formLexeme], 'foo')
    adapter.addError = jest.fn()

    await adapter.fetchFullDefs(homonym, { allow: ['https://github.com/alpheios-project/ls'] })
    await timeout(1300)
    expect(adapter.addError).toHaveBeenCalledWith('There is a problem with catching data from lexicon source - No entries found.')

  }, 60000)

  it('23 AlpheiosLexiconsAdapter - collectFullDefURLs escapes words', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let data = new Map()
    let formLexeme = new Lexeme(new Lemma('συνίημι', Constants.LANG_GREEK), [])
    let homonym = new Homonym([formLexeme], 'ξυνέηκε')

    let fullDefsRequests = adapter.collectFullDefURLs(data, homonym, adapter.config.lexicons[urlKey])

    fullDefsRequests.forEach(reqData => {
      expect(reqData.url).toEqual(expect.stringContaining('l=%CF%83%CF%85%CE%BD%CE%AF%CE%B7%CE%BC%CE%B9'))
    })
  }, 20000)

  it('24 AlpheiosLexiconsAdapter - get shortDefinitions with rights', async () => {
    let sourceJson = Fixture.getFixtureRes({
      langCode: 'grc', adapter: 'tufts', word: 'μῦθος'
    })
    let homonymRes = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'μῦθος'
      },
      sourceData: sourceJson
    })
    let testHomonym = homonymRes.result

    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    await BaseTestHelp.updateCacheWithFixtures()

    await adapter.fetchShortDefs(testHomonym, { allow: ['https://github.com/alpheios-project/majorplus'] })
    await timeout(300)
    let testMeaning = testHomonym.lexemes[0].meaning

    expect(testMeaning.shortDefs.length).toEqual(1)
    expect(testMeaning.shortDefs[0].text).toEqual('story')
    expect(testMeaning.shortDefs[0].provider.toString()).toEqual(expect.stringContaining('Major'))

    await adapter.fetchShortDefs(testSuccessHomonym, { allow: ['https://github.com/alpheios-project/majorplus'] })
    let test2Meaning = testSuccessHomonym.lexemes[0].meaning
    expect(test2Meaning.shortDefs[0].text).toEqual('mouse or rat')
    expect(test2Meaning.shortDefs[0].provider.toString()).toEqual(expect.stringContaining('Liddell'))

  },25000)

  it('25 AlpheiosLexiconsAdapter - test lookupInDataIndex', async () => {

    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })
    const model = LMF.getLanguageModel(Constants.LANG_GREEK)

    let dataRows = [
      ['@Εὖρος','the East wind','LSJ'],
      ['εὖρος','@','LSJ'],
      ['@εὖρος','breadth, width','LSJ'],
      ['Καῖσαρ','Caesar','VGorman'],
      ['ἀλέξανδρος','defending men','LSJ'],
      ['Ἀλέξανδρος', 'Alexander','VGorman']
    ]
    let data = adapter.fillMap(dataRows)

    let mockLemma =  {word: "εὖρος", principalParts:[]}
    expect(adapter.lookupInDataIndex(data,mockLemma,model)[0].field1).toEqual('breadth, width')
    mockLemma =  {word: "Εὖρος", principalParts:[]}
    expect(adapter.lookupInDataIndex(data,mockLemma,model)[0].field1).toEqual('the East wind')
    mockLemma =  {word: "Καῖσαρ", principalParts:[]}
    expect(adapter.lookupInDataIndex(data,mockLemma,model)[0].field1).toEqual('Caesar')
    mockLemma =  {word: "καῖσαρ", principalParts:[]}
    expect(adapter.lookupInDataIndex(data,mockLemma,model)).not.toBeDefined()
    mockLemma =  {word: "ἀλέξανδρος", principalParts:[]}
    expect(adapter.lookupInDataIndex(data,mockLemma,model)[0].field1).toEqual('defending men')
    mockLemma =  {word: "Ἀλέξανδρος", principalParts:[]}
    expect(adapter.lookupInDataIndex(data,mockLemma,model)[0].field1).toEqual('Alexander')
  })

  it('26 AlpheiosLexiconsAdapter - test fallback lookup stripped of diacritics', async () => {

    let adapter = new AlpheiosLexiconsAdapter({
            category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })
    const model = LMF.getLanguageModel(Constants.LANG_GREEK)

    let dataRows = [
      ['@Εὖρος','the East wind','LSJ'],
      ['εὖρος','@','LSJ'],
      ['@εὖρος','breadth, width','LSJ'],
      ['Καῖσαρ','Caesar','VGorman']
    ]
    let data = adapter.fillMap(dataRows)

    let mockLemma =  {word: "εῦρος", principalParts:[]}
    expect(adapter.lookupInDataIndex(data,mockLemma,model)[0].field1).toEqual('breadth, width')
    mockLemma =  {word: "Εῦρος", principalParts:[]}
    expect(adapter.lookupInDataIndex(data,mockLemma,model)[0].field1).toEqual('the East wind')
    mockLemma =  {word: "Καῑσαρ", principalParts:[]}
    expect(adapter.lookupInDataIndex(data,mockLemma,model)[0].field1).toEqual('Caesar')
  })

  it('27 AlpheiosLexiconsAdapter - async fetchShortDefs', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    expect(adapter.async).toBeTruthy()

    jest.spyOn(adapter, 'getRequests')
    jest.spyOn(adapter, 'prepareShortDefPromise')

    let options = { allow: ['https://github.com/alpheios-project/lsj'] }
    await adapter.fetchDefinitions(testSuccessHomonym, options, 'short')

    expect(adapter.prepareShortDefPromise).toHaveBeenCalled()

    await timeout(6000)
    expect(testSuccessHomonym.lexemes[0].meaning.shortDefs.length).toEqual(1)
    expect(testSuccessHomonym.lexemes[0].meaning.shortDefs[0].text).toEqual('mouse or rat')
  }, 50000)

  it('28 AlpheiosLexiconsAdapter - sync fetchShortDefs', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs'
    })

    expect(adapter.async).toBeFalsy()

    let options = { allow: ['https://github.com/alpheios-project/lsj'] }
    await adapter.fetchDefinitions(testSuccessHomonym, options, 'short')

    expect(testSuccessHomonym.lexemes[0].meaning.shortDefs.length).toEqual(1)
    expect(testSuccessHomonym.lexemes[0].meaning.shortDefs[0].text).toEqual('mouse or rat')
  }, 500000)

  it.skip('29 AlpheiosLexiconsAdapter - async fetchFullDefs', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs',
      callBackEvtSuccess: { pub: () => jest.fn() }
    })

    expect(adapter.async).toBeTruthy()

    jest.spyOn(adapter, 'updateFullDefsAsync')
    jest.spyOn(adapter, 'prepareFullDefPromise')


    let options = { allow: ['https://github.com/alpheios-project/lsj'] }
    await adapter.fetchDefinitions(testSuccessHomonym, options, 'full')

    expect(adapter.prepareFullDefPromise).toHaveBeenCalled()
    await timeout(6000)

    expect(adapter.updateFullDefsAsync).toHaveBeenCalled()

    expect(testSuccessHomonym.lexemes[0].meaning.fullDefs.length).toEqual(1)
    expect(testSuccessHomonym.lexemes[0].meaning.fullDefs[0].text).toEqual(expect.stringContaining('Anaxandr.41.61'))
  }, 50000)

  it('30 AlpheiosLexiconsAdapter - sync fetchFullDefs', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    expect(adapter.async).toBeFalsy()

    jest.spyOn(adapter, 'updateFullDefs')

    let options = { allow: ['https://github.com/alpheios-project/lsj'] }
    await adapter.fetchDefinitions(testSuccessHomonym, options, 'full')

    expect(adapter.updateFullDefs).toHaveBeenCalled()

    expect(testSuccessHomonym.lexemes[0].meaning.fullDefs.length).toEqual(1)
    expect(testSuccessHomonym.lexemes[0].meaning.fullDefs[0].text).toEqual(expect.stringContaining('Anaxandr.41.61'))
  }, 50000)

  it('31 AlpheiosLexiconAdapter - uses remote config if defined', async () => {
    const testUrl = "http://otherurlformjm"
    const remoteConfig =
      {
        "https://github.com/alpheios-project/mjm": {
          "urls": {
            "short": testUrl
          },
          "langs": {
            "source": "grc",
            "target": "en"
          },
          "format": { "short" :"text/html" },
          "description": "Definitions derived from Wilfred E. Major's Core Greek Vocabulary, extended with definitions from the Middle Liddell.",
          "rights_keys": {
            "ML": " \"An Intermediate Greek-English Lexicon\" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University. Edits and additions provided by Vanessa Gorman, University of Nebraska.",
            "Major": " Wilfred E. Major, Core Greek Vocabulary for the First Two Years of Greek. CPL Online, Winter 2008. Edits and additions provided by Vanessa Gorman, University of Nebraska."
          }
        }
      }
      const retrievedConfig = await ClientAdapters.lexicon.alpheios({ method: 'getConfig', config: remoteConfig })
      expect(retrievedConfig["https://github.com/alpheios-project/mjm"].urls.short).toEqual(testUrl)
      expect(retrievedConfig["https://github.com/alpheios-project/lsj"].urls.short).toEqual("https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-defs.dat")
      const adapter = new AlpheiosLexiconsAdapter({
        category: 'lexicon',
        adapterName: 'alpheios',
        method: 'fetchFullDefs',
      },remoteConfig)
      expect(adapter.config.lexicons["https://github.com/alpheios-project/mjm"].urls.short).toEqual(testUrl)
      expect(adapter.config.lexicons["https://github.com/alpheios-project/lsj"].urls.short).toEqual("https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-defs.dat")
    })
})
