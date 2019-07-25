/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import papaparse from 'papaparse'

import AlpheiosLexiconsAdapter from '@/adapters/lexicons/adapter'
import ClientAdapters from '@/client-adapters.js'
import { LanguageModelFactory as LMF, Constants, Homonym, Lexeme, Lemma } from 'alpheios-data-models'

describe('lexicons/adapter.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testSuccessHomonym, testFailedHomonym, testLangID

  beforeAll(async () => {
    ClientAdapters.init()
    testLangID = Constants.LANG_GREEK

    let homonymRes1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: testLangID,
        word: 'μύες'
      }
    })
    testSuccessHomonym = homonymRes1.result
    let formLexeme = new Lexeme(new Lemma('ινώδους', testLangID), [])
    testFailedHomonym = new Homonym([formLexeme], 'ινώδους')
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

  it('1 AlpheiosLexiconsAdapter - constructor uploads config and options', () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
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
      method: 'fetchShortDefs'
    })

    adapter.fetchDefinitions = jest.fn()

    adapter.fetchShortDefs('fooHomonym')
    expect(adapter.fetchDefinitions).toHaveBeenCalledWith('fooHomonym', {}, 'short')
  })

  it('3 AlpheiosLexiconsAdapter - fetchFullDefs executes fetchDefinitions with lookupFunction = full', () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    adapter.fetchDefinitions = jest.fn()

    adapter.fetchFullDefs('fooHomonym')
    expect(adapter.fetchDefinitions).toHaveBeenCalledWith('fooHomonym', {}, 'full')
  })

  it('4 AlpheiosLexiconsAdapter - prepareShortDefPromise, if success - it executes updateShortDefs, prepareSuccessCallback', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs'
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let url = adapter.config[urlKey].urls.short
    await adapter.checkCachedData(url)

    jest.spyOn(adapter, 'updateShortDefs')
    adapter.prepareSuccessCallback = jest.fn()

    adapter.prepareShortDefPromise(testSuccessHomonym, urlKey)
    let timeoutRes = await timeout(5000)

    expect(adapter.updateShortDefs).toHaveBeenCalled()
    expect(adapter.prepareSuccessCallback).toHaveBeenCalled()
    return timeoutRes
  }, 25000)

  it('5 AlpheiosLexiconsAdapter - prepareShortDefPromise, if failed - it executes prepareFailedCallback', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs'
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let url = adapter.config[urlKey].urls.short
    await adapter.checkCachedData(url)

    adapter.prepareFailedCallback = jest.fn()

    adapter.prepareShortDefPromise(testFailedHomonym, urlKey)
    let timeoutRes = await timeout(5000)
    expect(adapter.prepareFailedCallback).toHaveBeenCalled()
    return timeoutRes
  }, 25000)

  it('6 AlpheiosLexiconsAdapter - prepareFullDefPromise, if success - it executes collectFullDefURLs, updateFullDefs, prepareSuccessCallback', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let url = adapter.config[urlKey].urls.full
    await adapter.checkCachedData(url)

    jest.spyOn(adapter, 'collectFullDefURLs')
    jest.spyOn(adapter, 'updateFullDefs')
    adapter.prepareSuccessCallback = jest.fn()

    adapter.prepareFullDefPromise(testSuccessHomonym, urlKey)
    let timeoutRes = await timeout(5000)

    expect(adapter.collectFullDefURLs).toHaveBeenCalled()
    expect(adapter.updateFullDefs).toHaveBeenCalled()
    expect(adapter.prepareSuccessCallback).toHaveBeenCalled()
    return timeoutRes
  }, 25000)

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
      method: 'fetchFullDefs'
    })
    adapter.addError = jest.fn()

    adapter.fetchDefinitions('fooHomonym', {}, 'fooLookupFunction')
    expect(adapter.addError).toHaveBeenCalledWith(adapter.l10n.messages['LEXICONS_NO_ALLOWED_URL'])
  })

  it('10 AlpheiosLexiconsAdapter - fetchDefinitions with short lookupFunction, for each url it will be executed prepareShortDefPromise', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
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
      method: 'fetchFullDefs'
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
      method: 'fetchFullDefs'
    })

    jest.spyOn(adapter, 'fetch')
    jest.spyOn(adapter, 'fillMap')

    let testURL = 'https://repos1.alpheios.net/lexdata/as/dat/grc-as-ids.dat'

    await adapter.checkCachedData(testURL)
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
      method: 'fetchFullDefs'
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
      method: 'fetchShortDefs'
    })

    jest.spyOn(adapter, 'lookupInDataIndex')

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let testURL = 'https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-defs.dat'
    let unparsed = await adapter.fetch(testURL, { type: 'xml', timeout: adapter.options.timeout })
    let parsed = papaparse.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
    let data = adapter.fillMap(parsed.data)

    let cachedDefinitions = new Map()
    cachedDefinitions.set(testURL, data)

    let model = LMF.getLanguageModel(testLangID)

    await adapter.updateShortDefs(cachedDefinitions.get(testURL), testSuccessHomonym, adapter.config[urlKey])

    expect(adapter.lookupInDataIndex).toHaveBeenCalled()

    for (let lexeme of testSuccessHomonym.lexemes) {
      expect(adapter.lookupInDataIndex).toHaveBeenCalledWith(cachedDefinitions.get(testURL), lexeme.lemma, model)
      let deftexts = adapter.lookupInDataIndex(data, lexeme.lemma, model)
      expect(lexeme.meaning.shortDefs[0].text).toEqual(deftexts[0])
    }
  }, 20000)

  it('15 AlpheiosLexiconsAdapter - collectFullDefURLs returns an array of requests', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let testURL = 'https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-ids.dat'
    let unparsed = await adapter.fetch(testURL, { type: 'xml', timeout: adapter.options.timeout })
    let parsed = papaparse.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
    let data = adapter.fillMap(parsed.data)

    let cachedDefinitionsIndex = new Map()
    cachedDefinitionsIndex.set(testURL, data)

    let fullDefsRequests = adapter.collectFullDefURLs(cachedDefinitionsIndex.get(testURL), testSuccessHomonym, adapter.config[urlKey])
    expect(fullDefsRequests.length).toEqual(testSuccessHomonym.lexemes.length)

    fullDefsRequests.forEach(reqData => {
      expect(reqData.url).toEqual(expect.stringContaining('https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq'))
    })
  }, 20000)

  it('16 AlpheiosLexiconsAdapter - collectFullDefURLs adds an error if there are no full url in config', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    let urlKey = 'https://github.com/alpheios-project/dod'
    adapter.addError = jest.fn()
    adapter.collectFullDefURLs({}, testSuccessHomonym, adapter.config[urlKey])
    expect(adapter.addError).toHaveBeenCalledWith(adapter.l10n.messages['LEXICONS_NO_FULL_URL'])
  })

  it('17 AlpheiosLexiconsAdapter - updateFullDefs fetches each request and adds full definition to lexeme', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let testURL = 'https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-ids.dat'
    let unparsed = await adapter.fetch(testURL, { type: 'xml', timeout: adapter.options.timeout })
    let parsed = papaparse.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
    let data = adapter.fillMap(parsed.data)

    let cachedDefinitionsIndex = new Map()
    cachedDefinitionsIndex.set(testURL, data)

    let fullDefsRequests = adapter.collectFullDefURLs(cachedDefinitionsIndex.get(testURL), testSuccessHomonym, adapter.config[urlKey])

    jest.spyOn(adapter, 'fetch')
    adapter.prepareSuccessCallback = jest.fn()
    await adapter.updateFullDefs(fullDefsRequests, adapter.config[urlKey], testSuccessHomonym)

    let timeoutRes = await timeout(20000)

    expect(fullDefsRequests.length).toEqual(testSuccessHomonym.lexemes.length)
    expect(adapter.fetch).toBeCalledTimes(2)
    expect(adapter.prepareSuccessCallback).toBeCalledTimes(2)
    return timeoutRes
  }, 50000)

  it('18 AlpheiosLexiconsAdapter - getRequests return available urls from config', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    let res = adapter.getRequests(testLangID)
    expect(res.length).toEqual(5)
    res.forEach(url => {
      expect(url).toEqual(expect.stringContaining('https://github.com/alpheios-project/'))
    })
  })

  it('19 AlpheiosLexiconsAdapter - fillMap creates object from parsed data', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    let urlKey = 'https://github.com/alpheios-project/lsj'
    let testURL = 'https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-ids.dat'
    let unparsed = await adapter.fetch(testURL, { type: 'xml', timeout: adapter.options.timeout })
    let parsed = papaparse.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
    let data = adapter.fillMap(parsed.data)

    expect(typeof data).toEqual('object')
    expect(Array.isArray(data.values().next().value)).toBeTruthy()
  }, 20000)

  it('20 AlpheiosLexiconsAdapter - get shortDefinitions (multiple) - mare', async () => {
    let homonymTestRes = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'μύες'
      }
    })

    let homonymTest = homonymTestRes.result
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchShortDefs'
    })

    await adapter.fetchShortDefs(homonymTest, { allow: ['https://github.com/alpheios-project/lsj'] })

    let timeoutRes = await timeout(15000)

    let testMeaning = homonymTest.lexemes[0].meaning

    expect(testMeaning.shortDefs.length).toEqual(1)
    expect(testMeaning.shortDefs[0].text).toEqual('mouse or rat')
    expect(testMeaning.shortDefs[0].lemmaText).toEqual('μῦς')

    let testMeaning2 = homonymTest.lexemes[1].meaning

    expect(testMeaning2.shortDefs.length).toEqual(1)
    expect(testMeaning2.shortDefs[0].text).toEqual('close, be shut')
    expect(testMeaning2.shortDefs[0].lemmaText).toEqual('μύω')

    return timeoutRes
  }, 60000)

  it('21 AlpheiosLexiconsAdapter - get fullDefinitions (multiple) - mare', async () => {
    let homonymMareRes = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'mare'
      }
    })

    let homonymMare = homonymMareRes.result
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    await adapter.fetchFullDefs(homonymMare, { allow: ['https://github.com/alpheios-project/ls'] })

    let timeoutRes = await timeout(15000)

    let testMeaning = homonymMare.lexemes[0].meaning

    expect(testMeaning.fullDefs[0].text).toBeDefined()
    expect(testMeaning.fullDefs[0].text).toEqual(expect.stringContaining('however, refers these words to root'))

    let testMeaning2 = homonymMare.lexemes[1].meaning
    expect(testMeaning2.fullDefs[0].text).toBeDefined()
    expect(testMeaning2.fullDefs[0].text).toEqual(expect.stringContaining('mare et femineum sexus,'))

    return timeoutRes
  }, 60000)

  it('22 AlpheiosLexiconsAdapter - get fullDefinitions fails on not found', async () => {
    let adapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: 'fetchFullDefs'
    })

    let formLexeme = new Lexeme(new Lemma('foo', Constants.LANG_LATIN), [])
    let homonym = new Homonym([formLexeme], 'foo')
    adapter.addError = jest.fn()
    await adapter.fetchFullDefs(homonym, { allow: ['https://github.com/alpheios-project/ls'] })
    let timeoutRes = await timeout(15000)
    expect(adapter.addError).toHaveBeenCalledWith('There is a problem with catching data from lexicon source - No entries found.')
    return timeoutRes
  }, 60000)

})
