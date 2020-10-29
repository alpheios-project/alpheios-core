/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import ClientAdapters from '@clAdapters/client-adapters.js'
import { Fixture, TranslationsFixture } from 'alpheios-fixtures'
import { Constants, Homonym, Author, WordUsageExample } from 'alpheios-data-models'

describe('client-adapters.test.js', () => {
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

  it('1 ClientAdapters - morphology executes init and returns object with tufts and alpheiosTreebank', () => {
    jest.spyOn(ClientAdapters, 'init')

    let morphRes = ClientAdapters.morphology

    expect(ClientAdapters.init).toHaveBeenCalled()
    expect(morphRes.tufts).toBeDefined()
    expect(morphRes.tufts).toBeInstanceOf(Function)

    expect(morphRes.alpheiosTreebank).toBeDefined()
    expect(morphRes.alpheiosTreebank).toBeInstanceOf(Function)

    expect(morphRes.arethusaTreebank).toBeDefined()
    expect(morphRes.arethusaTreebank).toBeInstanceOf(Function)
  })

  it('2 ClientAdapters - lexicon executes init and returns object with alpheios', () => {
    jest.spyOn(ClientAdapters, 'init')

    let lexiconRes = ClientAdapters.lexicon

    expect(ClientAdapters.init).toHaveBeenCalled()
    expect(lexiconRes.alpheios).toBeDefined()
    expect(lexiconRes.alpheios).toBeInstanceOf(Function)
  })

  it('3 ClientAdapters - lemmatranslation executes init and returns object with alpheios', () => {
    jest.spyOn(ClientAdapters, 'init')

    let translationRes = ClientAdapters.lemmatranslation

    expect(ClientAdapters.init).toHaveBeenCalled()
    expect(translationRes.alpheios).toBeDefined()
    expect(translationRes.alpheios).toBeInstanceOf(Function)
  })

  it('4 ClientAdapters - checkMethod checks if given method registered inside adapter, if no raise an error', () => {
    ClientAdapters.init()
    expect(() => {
      let l = ClientAdapters.checkMethod('morphology', 'tufts', 'getHomonym')
    }).not.toThrowError()

    expect(() => {
      let l = ClientAdapters.checkMethod('morphology', 'tufts', 'fooMethod')
    }).toThrowError()
  })

  it('5 ClientAdapters - checkParam checks if all registered parameters are given', () => {
    ClientAdapters.init()
    expect(() => {
      let l = ClientAdapters.checkParam({ word: 'cepit', languageID: Constants.LANG_LATIN }, 'morphology', 'tufts', 'getHomonym')
    }).not.toThrowError()

    expect(() => {
      let l = ClientAdapters.checkParam({ word: 'cepit' }, 'morphology', 'tufts', 'getHomonym')
    }).toThrowError()
  })

  it('6 ClientAdapters - checkMethodParam executes checkMethod and checkParam', () => {
    ClientAdapters.init()
    jest.spyOn(ClientAdapters, 'checkMethod')
    jest.spyOn(ClientAdapters, 'checkParam')

    ClientAdapters.checkMethodParam('morphology', 'tufts', { method: 'getHomonym', params: { word: 'cepit', languageID: Constants.LANG_LATIN } })
    expect(ClientAdapters.checkMethod).toHaveBeenCalledWith('morphology', 'tufts', 'getHomonym')
    expect(ClientAdapters.checkParam).toHaveBeenCalledWith({ word: 'cepit', languageID: Constants.LANG_LATIN }, 'morphology', 'tufts', 'getHomonym')
  })

  it('7 ClientAdapters - maAdapter executes checkMethodParam and returns null if some problems', async () => {
    ClientAdapters.init()
    ClientAdapters.checkMethodParam = jest.fn()
    let res = await ClientAdapters.maAdapter({
      method: 'getHomonymTest'
    })
    expect(ClientAdapters.checkMethodParam).toHaveBeenCalled()
    expect(res).toBeNull()
  })

  it('8 ClientAdapters - maAdapter returns homonym and empty errors if adapter returns correct data', async () => {
    ClientAdapters.init()
    let sourceJson = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: 'cepit'
    })

    let res = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      },
      sourceData: sourceJson
    })

    expect(res.errors).toEqual([])
    expect(res.result).toBeInstanceOf(Homonym)
  })

  it('9 ClientAdapters - maAdapter returns empty homonym and errors if adapter doesn\'t return correct data', async () => {
    ClientAdapters.init()

    let sourceJson = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: 'foo'
    })


    let res = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'foo'
      },
      sourceData: sourceJson
    })

    expect(res.errors.length).toBeGreaterThan(0)
    expect(res.result).toBeUndefined()
  }, 20000)

  it('10 ClientAdapters - tbAdapter returns homonym and empty errors if adapter returns correct data', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: 'phi0959.phi006.alpheios-text-lat1#1-2'
      }
    })

    expect(res.errors).toEqual([])
    expect(res.result).toBeInstanceOf(Homonym)
  })

  it('11 ClientAdapters - tbAdapter returns empty homonym and errors if adapter doesn\'t return correct data', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.tbAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        wordref: 'foo'
      }
    })

    expect(res.errors.length).toBeGreaterThan(0)
    expect(res.result).toBeUndefined()
  })

  it('12 ClientAdapters - lemmaTranslations returns empty errors if adapter returns correct data', async () => {
    ClientAdapters.init()

    let sourceJson = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: 'cepit'
    })

    let reHomonym = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      },
      sourceData: sourceJson
    })

    let res = await ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: reHomonym.result,
        browserLang: 'es'
      },
      sourceData: {
        langs: TranslationsFixture.allLangs,
        translations: TranslationsFixture.library['lat-spa-cepit']
      }
    })

    expect(res.errors).toEqual([])
  }, 10000)

  it('13 ClientAdapters - lemmaTranslations returns errors if adapter doesn\'t return correct data', async () => {
    ClientAdapters.init()

    let sourceJson = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: 'foo'
    })

    let resHomonym = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'foo'
      }
    })

    let res = await ClientAdapters.lemmaTranslations({
      method: 'fetchTranslations',
      params: {
        homonym: resHomonym.result,
        browserLang: 'bla'
      }
    })

    expect(res.errors.length).toBeGreaterThan(0)
  })

  it('14 ClientAdapters - lexicons returns empty errors if adapter returns correct data', async () => {
    ClientAdapters.init()

    let sourceJson = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: 'cepit'
    })

    let reHomonym = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      },
      sourceData: sourceJson
    })

    let res = await ClientAdapters.lexicons({
      method: 'fetchFullDefs',
      params: {
        homonym: reHomonym.result,
        opts: {
          allow: ['https://github.com/alpheios-project/ls']
        }
      }
    })

    expect(res.errors).toEqual([])
  })

  it('15 ClientAdapters - lexicons returns errors if adapter doesn\'t return correct data', async () => {
    ClientAdapters.init()

    let sourceJson = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: 'cepit'
    })

    let reHomonym = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      },
      sourceData: sourceJson
    })

    let res = await ClientAdapters.lexicons({
      method: 'fetchShortDefs',
      params: {
        homonym: reHomonym.result,
        opts: {},
        callBackEvtSuccess: { pub: () => jest.fn() }
      }
    })

    expect(res.errors.length).toBeGreaterThan(0)
  })

  it('16 ClientAdapters - wordusageExamples executes init and returns object with alpheios', () => {
    jest.spyOn(ClientAdapters, 'init')

    let concordanceRes = ClientAdapters.wordusageExamples

    expect(ClientAdapters.init).toHaveBeenCalled()
    expect(concordanceRes.concordance).toBeDefined()
    expect(concordanceRes.concordance).toBeInstanceOf(Function)
  })

  it('17 ClientAdapters - wordusageExamples - getAuthorsWorks returns array of authors with wordTexts', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.wordUsageExamples({
      method: 'getAuthorsWorks',
      params: {}
    })

    expect(res.errors).toEqual([])

    expect(Array.isArray(res.result)).toBeTruthy()
    for (let resItem of res.result) {
      expect(resItem).toBeInstanceOf(Author)
    }

    let adapterConcordanceRes = await ClientAdapters.wordusageExamples.concordance({
      method: 'getAuthorsWorks',
      params: {}
    })

    expect(res.result).toEqual(adapterConcordanceRes.result)
  })

  it('18 ClientAdapters - wordusageExamples - getWordUsageExamples returns array of wordUsageExample', async () => {
    ClientAdapters.init()

    let sourceJson = Fixture.getFixtureRes({
      langCode: 'lat', adapter: 'tufts', word: 'submersasque'
    })

    let testHomonymRes1 = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'submersasque'
      },
      sourceData: sourceJson
    })

    let res = await ClientAdapters.wordUsageExamples({
      method: 'getWordUsageExamples',
      params: { homonym: testHomonymRes1.result }
    })

    expect(res.errors).toEqual([])

    expect(Array.isArray(res.result.wordUsageExamples)).toBeTruthy()
    for (let resItem of res.result.wordUsageExamples) {
      expect(resItem).toBeInstanceOf(WordUsageExample)
    }

    let adapterConcordanceRes = await ClientAdapters.wordusageExamples.concordance({
      method: 'getWordUsageExamples',
      params: { homonym: testHomonymRes1.result }
    })

    let i = 0
    for (let resItem of res.result.wordUsageExamples) {
      expect(resItem.source).toEqual(adapterConcordanceRes.result.wordUsageExamples[i].source)
      i++
    }
  }, 25000)

  it('19 ClientAdapters - autocompleteWords - getWords returns array words variants - grc', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.autocompleteWords.logeion({
      method: 'getWords',
      params: {
        text: 'λεξ',
        lang: 'grc',
        limit: 15, 
        sourceData: ['\u03bb\u03ad\u03be\u03bf', '\u03bb\u03ad\u03be\u03b5\u03bf', '\u03bb\u03ad\u03be\u03b9\u03c2', '\u03bb\u03b5\u03be\u03b9\u03ba\u03cc\u03c2', 
                     '\u03bb\u03b5\u03be\u03af\u03b4\u03b9\u03bf\u03bd', '\u03bb\u03b5\u03be\u03b9\u03b8\u03b7\u03c1\u03ad\u03c9', 
                     '\u03bb\u03b5\u03be\u03af\u03b4\u03c1\u03b9\u03bf\u03bd', '\u039b\u03b5\u03be\u03b9\u03c6\u03ac\u03bd\u03b7\u03c2'],
        fetchOptions: {
          apikey: 'testkey',
          baseurl: 'testurl'
        }
      }
    })

    expect(res.errors).toEqual([])

    expect(res.result.length).toBeGreaterThan(0)
    expect(res.result.length).toEqual(8)

    expect(Array.isArray(res.result)).toBeTruthy()
  })

  it('20 ClientAdapters - autocompleteWords - getWords returns array words variants - lat', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.autocompleteWords.logeion({
      method: 'getWords',
      params: {
        text: 'mar',
        lang: 'lat',
        limit: 15, 
        sourceData: ['mar', 'Mars', 'mara', 'mare', 'Maro', 'Marca', 'marsa', 'Marsa'],
        fetchOptions: {
          apikey: 'testkey',
          baseurl: 'testurl'
        }
      }
    })

    expect(res.errors).toEqual([])

    expect(res.result.length).toBeGreaterThan(0)
    expect(res.result.length).toEqual(8)

    expect(Array.isArray(res.result)).toBeTruthy()
  })

  it('21 ClientAdapters - tokenizationMethod - getTokens returns array of segments - lat', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.tokenizationGroup.alpheios({
      method: 'getTokens',
      params: {
        text: 'veni vidi vichi',
        fetchOptions: {
          lang: 'lat',
          textType: 'text',
          segments: 'singleline'
        }
      }
    })

    expect(res.errors).toEqual([])

    expect(res.result.segments.length).toEqual(1)
    expect(res.result.segments[0].tokens.length).toEqual(3)
  })

  it('22 ClientAdapters - tokenizationMethod - getTokens returns array of errors - if passed incorrect parameters', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.tokenizationGroup.alpheios({
      method: 'getTokens',
      params: {
        text: 'veni vidi vichi',
        fetchOptions: {
          lang: 'lat',
          textType: 'tei',
          segments: 'singleline'
        }
      }
    })

    expect(res.errors.length).toEqual(1)
    expect(res.result).not.toBeDefined()
  })

  it('23 ClientAdapters - tokenizationMethod - passed unavailable lang', async () => {
    ClientAdapters.init()

    let res = await ClientAdapters.tokenizationGroup.alpheios({
      method: 'getTokens',
      params: {
        text: 'veni vidi vichi',
        fetchOptions: {
          lang: 'ara',
        }
      }
    })

    console.info('res', res)
    expect(res.errors.length).toEqual(1)
    expect(res.result).not.toBeDefined()
  })
})
