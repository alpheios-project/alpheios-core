/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import ClientAdapters from '@/client-adapters.js'
import AlpheiosConcordanceAdapter from '@/adapters/concordance/adapter'

import { Constants, Author, TextWork, WordUsageExample } from 'alpheios-data-models'

describe('concordance.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testHomonym1, testHomonym2, testHomonym3
  let testWord1 = 'submersasque'
  let testWord2 = 'regemque'
  let testWord3 = 'magno'

  let testAuthor = new Author('urn:cts:latinLit:phi0690', { "eng": "Virgil" })
  testAuthor.ID = 690
  let testTextWork = new TextWork(testAuthor, 'urn:cts:latinLit:phi0690.phi003', { "eng": "Aeneid" })
  testTextWork.ID = 3

  beforeAll(async () => {
    let testHomonymRes1 = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: testWord1
      }
    })

    testHomonym1 = testHomonymRes1.result

    let testHomonymRes2 = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: testWord2
      }
    })

    testHomonym2 = testHomonymRes2.result

    let testHomonymRes3 = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: testWord3
      }
    })

    testHomonym3 = testHomonymRes3.result
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

  it('1 AlpheiosConcordanceAdapter - constructor uploads config and options', () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    expect(adapter.errors).toEqual([])
    expect(adapter.config).toBeDefined()
    expect(adapter.authors).toEqual([])
  })

  it('2 AlpheiosConcordanceAdapter - getAuthorsWorks uploads json data with the list of authors with their textWorks and parses it in Author and TextWork objects', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    jest.spyOn(adapter, 'uploadConfig')

    let result = await adapter.getAuthorsWorks()
    let testAuthorJson = { "urn": "urn:cts:latinLit:phi0690",
    "title": [
        { "@lang": "eng",
          "@value": "Virgil"
        }
    ],
    "abbreviations": [
       { "@lang": "eng",
          "@value": "Verg."
       }
     ],
    "works": [
      { "urn": "urn:cts:latinLit:phi0690.phi003",
        "title": [
          { "@lang":"lat",
            "@value": "Aeneid"
          },
          { "@lang":"eng",
            "@value": "Aeneid"
          }
        ],
        "abbreviations": [
         { "@lang": "eng",
          "@value": "A."
         }
       ]
      }
    ]
  }
    let checkAuthorItem = adapter.createAuthor(testAuthorJson)

    expect(adapter.uploadConfig).toHaveBeenCalled()
    expect(adapter.errors.length).toEqual(0)
    expect(Array.isArray(result)).toBeTruthy()
    expect(result.find(author => author.ID === checkAuthorItem.ID)).toBeTruthy()
  })

  it('3 AlpheiosConcordanceAdapter - getAuthorsWorks adds an error on any problem with fetching data to errors array', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    adapter.uploadConfig = jest.fn()

    let res = await adapter.getAuthorsWorks()

    expect(adapter.errors.length).toBeGreaterThan(0)
  })

  it('4 AlpheiosConcordanceAdapter - getAuthorsWorks uploads only once (if reload === false)', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    jest.spyOn(adapter, 'uploadConfig')

    let res1 = await adapter.getAuthorsWorks()
    let res2 = await adapter.getAuthorsWorks()

    expect(adapter.uploadConfig).toHaveBeenCalledTimes(1)
  })

  it('5 AlpheiosConcordanceAdapter - getAuthorsWorks uploads every time if reload === true', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    jest.spyOn(adapter, 'uploadConfig')

    let res1 = await adapter.getAuthorsWorks()
    let res2 = await adapter.getAuthorsWorks(true)

    expect(adapter.uploadConfig).toHaveBeenCalledTimes(2)
  })

  it('6 AlpheiosConcordanceAdapter - getWordUsageExamples method fetches data from concordance API and converts it to WordUsageExamplesObject', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let filterOptions = {
      author: testAuthor,
      textWork: testTextWork
    }

    let paginationOptions =  {
      property: 'max',
      value: 5
    }

    let authPaginationOptions =  {
      property: 'authmax',
      value: 5
    }

    // single item result
    let res1 = await adapter.getWordUsageExamples(testHomonym1, filterOptions, paginationOptions)

    expect(Array.isArray(res1.wordUsageExamples)).toBeTruthy()
    expect(res1.wordUsageExamples.length).toEqual(1)

    expect(res1.wordUsageExamples[0]).toBeInstanceOf(WordUsageExample)
    expect(res1.wordUsageExamples[0].provider).toBeDefined()
    expect(res1.provider).toBeDefined()

    let res2 = await adapter.getWordUsageExamples(testHomonym2, filterOptions, paginationOptions) // multiple usage

    expect(Array.isArray(res2.wordUsageExamples)).toBeTruthy()
    expect(res2.wordUsageExamples.length).toEqual(5)

    expect(res2.wordUsageExamples[0]).toBeInstanceOf(WordUsageExample)
    expect(res2.wordUsageExamples[0].provider).toBeDefined()
    expect(res2.provider).toBeDefined()

    // multiple usage in different texts of the same author - 1 case - filter by author and text, no pagination
    let res3 = await adapter.getWordUsageExamples(testHomonym3, filterOptions)

    // console.info('*******************res3', res3.length, res3[0])
    expect(Array.isArray(res3.wordUsageExamples)).toBeTruthy()
    expect(res3.wordUsageExamples.length).toEqual(62)

    expect(res3.wordUsageExamples[0]).toBeInstanceOf(WordUsageExample)
    expect(res3.wordUsageExamples[0].provider).toBeDefined()
    expect(res3.provider).toBeDefined()

    // multiple usage in different texts of the same author - 1 case - filter by author and text, with pagination
    let res4 = await adapter.getWordUsageExamples(testHomonym3, filterOptions, paginationOptions)
    expect(Array.isArray(res4.wordUsageExamples)).toBeTruthy()
    expect(res4.wordUsageExamples.length).toBeLessThanOrEqual(5)

    expect(res4.wordUsageExamples[0]).toBeInstanceOf(WordUsageExample)
    expect(res4.wordUsageExamples[0].provider).toBeDefined()
    expect(res4.provider).toBeDefined()

    // multiple usage in different texts of the same author - 1 case - filter by author, no pagination
    let filterOptionsOnlyAuthor = { author: filterOptions.author }
    let res5 = await adapter.getWordUsageExamples(testHomonym3, filterOptionsOnlyAuthor)
    expect(Array.isArray(res5.wordUsageExamples)).toBeTruthy()
    expect(res5.wordUsageExamples.length).toBeGreaterThan(res4.wordUsageExamples.length)

    expect(res5.wordUsageExamples[0]).toBeInstanceOf(WordUsageExample)
    expect(res5.wordUsageExamples[0].provider).toBeDefined()
    expect(res5.provider).toBeDefined()

    // multiple usage in different texts of the same author - 1 case - no filter, no pagination
    let res6 = await adapter.getWordUsageExamples(testHomonym3)

    expect(Array.isArray(res6.wordUsageExamples)).toBeTruthy()
    expect(res6.wordUsageExamples.length).toBeGreaterThan(res5.wordUsageExamples.length)

    expect(res6.wordUsageExamples[0]).toBeInstanceOf(WordUsageExample)
    expect(res6.wordUsageExamples[0].provider).toBeDefined()
    expect(res6.provider).toBeDefined()

    expect(adapter.errors.length).toEqual(0)
  })

  it('5 AlpheiosConcordanceAdapter - getWordUsageExamples adds an error on any problem with fetching data to errors array', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let res = await adapter.getWordUsageExamples()

    expect(adapter.errors.length).toBeGreaterThan(0)
  })

  it('6 AlpheiosConcordanceAdapter - createFetchURL method returns final url for getting word usage examples', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let filterOptions = {
      author: testAuthor,
      textWork: testTextWork
    }

    let paginationOptions =  {
      property: 'max',
      value: 5
    }

    jest.spyOn(adapter, 'formatFilter')
    jest.spyOn(adapter, 'formatPagination')

    let resURL = adapter.createFetchURL(testHomonym1, filterOptions, paginationOptions)

    expect(adapter.formatFilter).toHaveBeenCalled()
    expect(adapter.formatPagination).toHaveBeenCalled()
    expect(resURL).toEqual('https://latin.packhum.org/rst/concordance/submersasque[690:3]?max=5')
  })

  it('7 AlpheiosConcordanceAdapter - formatFilter method returns formatted filter part of the url', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let res1 = adapter.formatFilter()
    expect(res1).toEqual('')

    let res2 = adapter.formatFilter({author: testAuthor})
    expect(res2).toEqual('[690]')

    let res3 = adapter.formatFilter({author: testAuthor, textWork: testTextWork})
    expect(res3).toEqual('[690:3]')
  })

  it('8 AlpheiosConcordanceAdapter - formatPagination method returns formatted pagination part of the url', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let res1 = adapter.formatPagination()
    expect(res1).toEqual('')

    let res2 = adapter.formatPagination({ property: 'max' })
    expect(res2).toEqual('')

    let res3 = adapter.formatPagination({ property: 'max', value: 10 })
    expect(res3).toEqual('?max=10')
  })

  it('9 AlpheiosConcordanceAdapter - parseWordUsageResult method returns parsed WordUsageExample objects', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let testJsonObj = [{
      cit: 'SenPhil.Med.484',
      left: 'felix uicem. ex opibus illis, quas procul raptas Scythae ',
      link: '/loc/1017/4/9/2890-2895',
      right: ' a perustis Indiae populis agunt, quas quia referta uix',
      target: 'usque'
    }]

    let testHomonym = { languageID: Constants.LANG_LATIN, targetWord: 'usque' }
    let testAuthor = 'fooAuthor'
    let testTextWork = 'fooTextWork'

    jest.spyOn(adapter, 'createWordUsageExample')
    let res = await adapter.parseWordUsageResult(testJsonObj, testHomonym, testAuthor, testTextWork)

    expect(adapter.createWordUsageExample).toHaveBeenCalled()
    expect(Array.isArray(res)).toBeTruthy()
    expect(res[0]).toBeInstanceOf(WordUsageExample)
    expect(res[0].provider).toBeDefined()

    expect(res[0].author.urn).toBeDefined()
    expect(res[0].textWork.urn).toBeDefined()
  })

  it('9.1 AlpheiosConcordanceAdapter - parseWordUsageResult method won\'t create a wordUsageExample if there is an author not from the list ', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let testJsonObj = [{
      "link":"/loc/1041/1/0/8625-8629",
      "cit":"[Var].Sent.105.1",
      "left":"ad videndum, quid senseris. Ad mores et opiniones ",
      "right":"entium prudens vocem formabit. In singulis excellere et","target":"audi"
    }]

    let testHomonym = { languageID: Constants.LANG_LATIN, targetWord: 'usque' }
    let testAuthor = 'fooAuthor'
    let testTextWork = 'fooTextWork'

    jest.spyOn(adapter, 'createWordUsageExample')
    let res = await adapter.parseWordUsageResult(testJsonObj, testHomonym, testAuthor, testTextWork)

    expect(adapter.createWordUsageExample).not.toHaveBeenCalled()
    expect(res).toEqual([])
  })

  it('9.2 AlpheiosConcordanceAdapter - parseWordUsageResult method won\'t create a wordUsageExample if there is a textWork not from the list ', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let testJsonObj = [{
      "link":"/loc/1041/1/0/8625-8629",
      "cit":"SenPhil.[Sent].105.1",
      "left":"ad videndum, quid senseris. Ad mores et opiniones ",
      "right":"entium prudens vocem formabit. In singulis excellere et","target":"audi"
    }]

    let testHomonym = { languageID: Constants.LANG_LATIN, targetWord: 'usque' }
    let testAuthor = 'fooAuthor'
    let testTextWork = 'fooTextWork'

    jest.spyOn(adapter, 'createWordUsageExample')
    let res = await adapter.parseWordUsageResult(testJsonObj, testHomonym, testAuthor, testTextWork)

    expect(adapter.createWordUsageExample).not.toHaveBeenCalled()
    expect(res).toEqual([])
  })

  it('10 AlpheiosConcordanceAdapter - getAuthorByAbbr and getTextWorkByAbbr extracts author and textWork by abbreviation', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let authors = await adapter.getAuthorsWorks()

    let testJsonObj = {
      "link":"/loc/959/6/219/77-81",
      "cit":"Ov.Met.14.528",
      "left":"Hinc ubi legati rediere, negata ferentes ",
      "right":" Aetola sibi, Rutuli sine viribus illis bella instructa",
      "target":"arma"
    }

    let authorAbbr = testJsonObj.cit.split('.')[0]
    let author = authors.find(author => author.abbreviation() === authorAbbr)

    let textWorkAbbr = testJsonObj.cit.split('.')[1]
    let textWork = author.works.find(textWork => textWork.abbreviation() === textWorkAbbr)

    let methodAuthor = await adapter.getAuthorByAbbr(testJsonObj)
    expect(methodAuthor).not.toBeNull()
    expect(methodAuthor).toEqual(author)

    let methodTextWork = adapter.getTextWorkByAbbr(methodAuthor, testJsonObj)
    expect(methodTextWork).not.toBeNull()
    expect(methodTextWork).toEqual(textWork)
  })


  it('11 AlpheiosConcordanceAdapter - createAuthor method returns Author object from jsonObj', () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let testJsonObj = { 'urn': 'urn:cts:latinLit:phi0690',
      'title': [
        { '@lang': 'eng',
          '@value': 'Virgil'
        }
      ],
      'abbreviations': [
        { '@lang': 'eng',
          '@value': 'Verg.'
        }
      ],
      'works': [
        { 'urn': 'urn:cts:latinLit:phi0690.phi003',
          'title': [
            { '@lang': 'lat',
              '@value': 'Aeneid'
            },
            { '@lang': 'eng',
              '@value': 'Aeneid'
            }
          ],
          'abbreviations': [
            { '@lang': 'eng',
              '@value': 'A.'
            }
          ]
        }
      ]
    }

    let author = adapter.createAuthor(testJsonObj)
    expect(author.urn).toEqual('urn:cts:latinLit:phi0690')
    expect(Object.values(author.titles).length).toEqual(1)
    expect(Object.values(author.abbreviations).length).toEqual(1)
    expect(author.works.length).toEqual(1)
  })

  it('12 AlpheiosConcordanceAdapter - extractIDFromURNAuthor methods extract ID from author urn (concordance API)', () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })
    let testCorrectURN = 'urn:cts:latinLit:phi0690'

    let author = new Author(testCorrectURN, 'fooTitles')
    expect(adapter.extractIDFromURNAuthor(author.urn)).toEqual(690)

    author.urn = 'urn:cts:latinLit'
    expect(adapter.extractIDFromURNAuthor(author.urn)).toBeNull()
  })


  it('13 AlpheiosConcordanceAdapter - createTextWork method returns TextWork object from jsonObj', () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let testJsonObj = {
      'urn': 'urn:cts:latinLit:phi0690.phi003',
      'title': [
        { '@lang': 'lat',
          '@value': 'Aeneid'
        },
        { '@lang': 'eng',
          '@value': 'Aeneid'
        }
      ],
      'abbreviations': [
        { '@lang': 'eng',
          '@value': 'A.'
        }
      ]
    }

    let textWork = adapter.createTextWork('fooAuthor', testJsonObj)
    expect(textWork.urn).toEqual('urn:cts:latinLit:phi0690.phi003')
    expect(textWork.author).toEqual('fooAuthor')
    expect(Object.values(textWork.titles).length).toEqual(2)
    expect(Object.values(textWork.abbreviations).length).toEqual(1)
  })

  it('14 AlpheiosConcordanceAdapter - extractIDFromURNTextWork methods extract ID from textWork urn (concordance API)', () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let testCorrectURN = 'urn:cts:latinLit:phi0690.phi003'

    let textWork = new TextWork('fooAuthor', testCorrectURN, 'fooTitles')
    expect(adapter.extractIDFromURNTextWork(textWork.urn)).toEqual(3)

    textWork.urn = 'urn:cts:latinLit'
    expect(adapter.extractIDFromURNTextWork(textWork.urn)).toBeNull()
  })

  it('15 AlpheiosConcordanceAdapter - defaultIDPrefix property is defined', () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    expect(adapter.defaultIDPrefix).toBeDefined()
  })


  it('16 WordUsageExample - readObject creates WordUsageExample from jsonObj, homonym, author, textWork and sourceLink', () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let testJsonObj = {
      cit: 'SenPhil.Med.484',
      left: 'felix uicem. ex opibus illis, quas procul raptas Scythae ',
      link: '/loc/1017/4/9/2890-2895',
      right: ' a perustis Indiae populis agunt, quas quia referta uix',
      target: 'usque'
    }

    let testHomonym = { languageID: Constants.LANG_LATIN, targetWord: 'usque' }
    let testAuthor = 'fooAuthor'
    let testTextWork = 'fooTextWork'
    let testPassage = '1.1.1'
    let testSourceLink = 'https://latin.packhum.org'

    let wordUsageExample = adapter.createWordUsageExample(testJsonObj, testHomonym, testAuthor, testTextWork, testPassage)

    expect(wordUsageExample.languageCode).toEqual('lat')
    expect(wordUsageExample.prefix).toEqual(testJsonObj.left)
    expect(wordUsageExample.suffix).toEqual(testJsonObj.right)
    expect(wordUsageExample.source).toEqual(testSourceLink + testJsonObj.link)
    expect(wordUsageExample.cit).toEqual(testJsonObj.cit)
    expect(wordUsageExample.author).toEqual(testAuthor)
    expect(wordUsageExample.textWork).toEqual(testTextWork)
    expect(wordUsageExample.passage).toEqual(testPassage)

    expect(wordUsageExample.provider).toBeDefined()
  })

  it('17 AlpheiosConcordanceAdapter - formatPagination method overrides max for authmax', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let res3 = adapter.formatPagination({ property: 'authmax', value: 10 })
    expect(res3).toEqual(`?authmax=10&max=${adapter.config.maxResultsOverride}`)
  })
  it('18 AlpheiosConcordanceAdapter - getTextWorkByAbbr handles missing title', async () => {
    let adapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: 'getAuthorsWorks'
    })

    let authors = await adapter.getAuthorsWorks()

    let testJsonObj = {
      "link": "/loc/911/1/0/9671-9676",
      "cit": "LausPis.213",
      "left": "accipe nostri certus et hoc veri complectere pignus a",
      "right": ". Quod si digna tua minus est mea pagina laude, at",
      "target": "moris"
    }

    let methodAuthor = await adapter.getAuthorByAbbr(testJsonObj)
    expect(methodAuthor).not.toBeNull()
    expect(methodAuthor).not.toBeNull()

    let methodTextWork = adapter.getTextWorkByAbbr(methodAuthor, testJsonObj)
    expect(methodTextWork).toBeNull()
    expect(adapter.getPassage(testJsonObj)).toEqual('213')
  })

})
