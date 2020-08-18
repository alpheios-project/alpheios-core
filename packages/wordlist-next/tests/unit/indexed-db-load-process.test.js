/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import IndexedDBLoadProcess from '@wordlist/storage/indexeddbDriver/indexed-db-load-process'
import { WordItem, Constants, Homonym } from 'alpheios-data-models'
import BaseTestHelp from '@wordlist-tests/helpclasses/base-test-help'


describe('indexed-db-load-process.test.js', () => {
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

  it('1 IndexedDBLoadProcess - loadBaseObject creates WordItem with currentSession = false', () => {
    let testData = {
      ID: 'testUserID-lat-magno',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'magno',
      userID: 'testUserID'
    }

    let result = IndexedDBLoadProcess.loadBaseObject(testData)

    expect(result).toBeInstanceOf(WordItem)
    expect(result.currentSession).toBeFalsy()
  })

  it('2 IndexedDBLoadProcess - loadContext checks if passed array and executes WordItem readContext', () => {
    let testData = {
      ID: 'testUserID-lat-magno',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'magno',
      userID: 'testUserID'
    }

    let wordItem = IndexedDBLoadProcess.loadBaseObject(testData)

    let context = {
      languageCode: Constants.STR_LANG_CODE_LAT,
      targetWord: 'magno',
      target: {
        source: 'foosource',
        selector: {
          exact: 'magno',
          prefix: 'fooprefix',
          suffix: 'foosuffix'
        }
      }
    }

    jest.spyOn(WordItem, 'readContext')
    let result = IndexedDBLoadProcess.loadContext([context], wordItem)

    expect(WordItem.readContext).toHaveBeenCalledWith([context])
    expect(wordItem.context.length).toEqual(1)
  })

  it('3 IndexedDBLoadProcess - loadContext checks if passed not array and executes WordItem readContext', () => {
    let testData = {
      ID: 'testUserID-lat-magno',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'magno',
      userID: 'testUserID'
    }

    let wordItem = IndexedDBLoadProcess.loadBaseObject(testData)

    let context = {
      languageCode: Constants.STR_LANG_CODE_LAT,
      targetWord: 'magno',
      target: {
        source: 'foosource',
        selector: {
          exact: 'magno',
          prefix: 'fooprefix',
          suffix: 'foosuffix'
        }
      }
    }

    jest.spyOn(WordItem, 'readContext')
    let result = IndexedDBLoadProcess.loadContext(context, wordItem)

    expect(WordItem.readContext).toHaveBeenCalledWith([context])
    expect(wordItem.context.length).toEqual(1)
  })


  it('4 IndexedDBLoadProcess - loadHomonym checks if homonym data is passed, and executes WordItem.readHomonym', async () => {
    let testData = {
      ID: 'testUserID-lat-magno',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'magno',
      userID: 'testUserID'
    }

    let wordItem = IndexedDBLoadProcess.loadBaseObject(testData)

    let testHomonym = await BaseTestHelp.getHomonym('magno', Constants.LANG_LATIN)

    let resultHomonym = testHomonym.convertToJSONObject(false)

    jest.spyOn(WordItem, 'readHomonym')
    let jsonObj = [{homonym: resultHomonym}]
    let result = IndexedDBLoadProcess.loadHomonym(jsonObj, wordItem)
    expect(WordItem.readHomonym).toHaveBeenCalledWith({homonym: resultHomonym})
    expect(wordItem.homonym).toBeInstanceOf(Homonym)
    expect(wordItem.homonym.lexemes.length).toEqual(1)
    expect(wordItem.homonym.inflections.length).toEqual(4)
  })

  it('5 IndexedDBLoadProcess - loadHomonym checks if homonym data is not passed, but passed short homonym data (from remote source), then it creates empty Homonym with lexemes from lemmaList data', async () => {
    let testData = {
      ID: 'testUserID-lat-magno',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'magno',
      userID: 'testUserID'
    }

    let wordItem = IndexedDBLoadProcess.loadBaseObject(testData)

    let jsonObj = [{languageCode: 'lat', targetWord: 'magno', homonym: { lemmasList: 'magnus, magno, major, maximus' }}]

    let result = IndexedDBLoadProcess.loadHomonym(jsonObj, wordItem)
    expect(wordItem.homonym).toBeInstanceOf(Homonym)
    expect(wordItem.homonym.lexemes.length).toEqual(4)
    expect(wordItem.homonym.inflections.length).toEqual(0)
  })

  it('6 IndexedDBLoadProcess - loadHomonym checks if homonym data is not passed at all, then it creates empty Homonym with one lexeme from targetWord', async () => {
    let testData = {
      ID: 'testUserID-lat-magno',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'magno',
      userID: 'testUserID'
    }

    let wordItem = IndexedDBLoadProcess.loadBaseObject(testData)

    let jsonObj = [{languageCode: 'lat', targetWord: 'magno', homonym: {}}]

    let result = IndexedDBLoadProcess.loadHomonym(jsonObj, wordItem)
    expect(wordItem.homonym).toBeInstanceOf(Homonym)
    expect(wordItem.homonym.lexemes.length).toEqual(1)
    expect(wordItem.homonym.lexemes[0].lemma.word).toEqual('magno')
    expect(wordItem.homonym.inflections.length).toEqual(0)
  })
})