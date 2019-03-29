/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { ClientAdapters } from 'alpheios-client-adapters'
import WordItemRemoteDbDriver from '@/storage/worditem-remotedb-driver'
import { WordItem, Constants, TextQuoteSelector } from 'alpheios-data-models'

describe('worditem-remotedb-driver.test.js', () => {
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

  it('1 WordItemRemoteDbDriver - constructor creates object with the following properties: userId, storageMap, requestsParams', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})

    expect(dbDriverRemote.userId).toEqual('fooUserId')
    expect(dbDriverRemote.storageMap).toBeDefined()

    let checkStorageMapKeys = ['get', 'post', 'put', 'deleteOne', 'deleteMany'].sort()
    expect(Object.keys(dbDriverRemote.storageMap).sort()).toEqual(checkStorageMapKeys)

    expect(dbDriverRemote.requestsParams.headers.common.Authorization).toBeDefined()
  })

  it('2 WordItemRemoteDbDriver - _constructPostURL creates url for creating the word', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})
    let testData = {
      ID: 'testUserID-lat-beatum',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'beatum',
      userID: 'testUserID'
    }
    let testWordItem = new WordItem(testData)

    let resUrl = dbDriverRemote._constructPostURL(testWordItem)
    expect(resUrl).toEqual('/lat-beatum')
  })

  it('3 WordItemRemoteDbDriver - _constructGetURL creates url for getting one word', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})
    let testData = {
      ID: 'testUserID-lat-beatum',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'beatum',
      userID: 'testUserID'
    }
    let testWordItem = new WordItem(testData)

    let resUrl = dbDriverRemote._constructGetURL({ wordItem: testWordItem })
    expect(resUrl).toEqual('/lat-beatum')
  })

  it('4 WordItemRemoteDbDriver - _constructGetURL creates url for getting all words from the list by languageCode', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})
    let resUrl = dbDriverRemote._constructGetURL({ languageCode: 'lat' })
    expect(resUrl).toEqual('/?languageCode=lat')
  })

  it('5 WordItemRemoteDbDriver - _constructGetURL returns undefined if there are no wordItem or languageCode', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})
    let resUrl = dbDriverRemote._constructGetURL({})
    expect(resUrl).not.toBeDefined()
  })

  it('6 WordItemRemoteDbDriver - _constructDeleteManyURL creates url for deleting all words from the list by languageCode', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})
    let resUrl = dbDriverRemote._constructDeleteManyURL({ languageCode: 'lat' })
    expect(resUrl).toEqual('/?languageCode=lat')
  })

  it('7 WordItemRemoteDbDriver - _makeStorageID creates ID for the remote source format (without userID)', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})
    let testData = {
      ID: 'testUserID-lat-beatum',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'beatum',
      userID: 'testUserID'
    }

    let testWordItem = new WordItem(testData)

    let resID = dbDriverRemote._makeStorageID(testWordItem)
    expect(resID).toEqual('lat-beatum')
  })

  it('8 WordItemRemoteDbDriver - _serialize creates jsonObj from wordItem, without homonym and context if they are absent in wordItem, executes _serializeHomonym, _serializeContext', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})

    let testData = {
      ID: 'testUserID-lat-beatum',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'beatum',
      userID: 'testUserID'
    }
    let testWordItem = new WordItem(testData)

    jest.spyOn(dbDriverRemote, '_serializeHomonym')
    jest.spyOn(dbDriverRemote, '_serializeContext')

    let resJsonObj = dbDriverRemote._serialize(testWordItem)
    expect(resJsonObj.ID).toBeDefined()
    expect(resJsonObj.listID).toBeDefined()
    expect(resJsonObj.userID).toBeDefined()
    expect(resJsonObj.languageCode).toEqual('lat')
    expect(resJsonObj.targetWord).toEqual('beatum')
    expect(resJsonObj.important).toBeFalsy()
    expect(resJsonObj.createdDT).toBeDefined()

    expect(resJsonObj.homonym).not.toBeDefined()
    expect(resJsonObj.context).toEqual([])

    expect(dbDriverRemote._serializeHomonym).toHaveBeenCalled()
    expect(dbDriverRemote._serializeContext).toHaveBeenCalled()
  })

  it('9 WordItemRemoteDbDriver - _serialize creates jsonObj from WordItem with homonym, if homonym is present in wordItem', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})

    let testData = {
      ID: 'testUserID-lat-beatum',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'beatum',
      userID: 'testUserID'
    }
    let testWordItem = new WordItem(testData)

    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'caeli'
      }
    })
    let testHomonym = adapterTuftsRes.result
    testWordItem.homonym = testHomonym

    let resJsonObj = dbDriverRemote._serialize(testWordItem)
    expect(resJsonObj.homonym).toBeDefined()
    expect(resJsonObj.homonym.targetWord).toBeDefined()
    expect(resJsonObj.homonym.lemmasList).toBeDefined()
  })

  it('10 WordItemRemoteDbDriver - _serialize creates jsonObj from WordItem with context, if context is present in wordItem', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})

    let testData = {
      ID: 'testUserID-lat-beatum',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'beatum',
      userID: 'testUserID'
    }
    let testWordItem = new WordItem(testData)

    let context = TextQuoteSelector.readObject({
      languageCode: Constants.STR_LANG_CODE_LAT,
      targetWord: 'caeli',
      target: {
        source: 'foosource',
        selector: {
          exact: 'caeli',
          prefix: 'fooprefix',
          suffix: 'foosuffix'
        }
      }
    })
    testWordItem.context = [context]

    let resJsonObj = dbDriverRemote._serialize(testWordItem)
    expect(resJsonObj.context).toBeDefined()
    expect(resJsonObj.context.length).toEqual(1)
    expect(resJsonObj.context[0].targetWord).toEqual('beatum')
    expect(resJsonObj.context[0].target.source).toEqual('foosource')
  })

  it('11 WordItemRemoteDbDriver - _checkPostResult checks result\'s status', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})

    expect(dbDriverRemote._checkPostResult({ status: 201 })).toBeTruthy()
    expect(dbDriverRemote._checkPostResult({ status: 500 })).toBeFalsy()
    expect(dbDriverRemote._checkPostResult({ status: 403 })).toBeFalsy()
    expect(dbDriverRemote._checkPostResult({ status: 200 })).toBeFalsy()
  })

  it('12 WordItemRemoteDbDriver - _checkPutResult checks result\'s status', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})

    expect(dbDriverRemote._checkPutResult({ status: 200 })).toBeTruthy()
    expect(dbDriverRemote._checkPutResult({ status: 500 })).toBeFalsy()
    expect(dbDriverRemote._checkPutResult({ status: 403 })).toBeFalsy()
    expect(dbDriverRemote._checkPutResult({ status: 201 })).toBeFalsy()
  })

  it('13 WordItemRemoteDbDriver - _checkGetResult checks result\'s status and return data', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})

    expect(dbDriverRemote._checkGetResult({ status: 500 })).toEqual([])

    let result1 = dbDriverRemote._checkGetResult({ status: 200, data: 'fooData' })
    expect(result1).toEqual(['fooData'])

    let result2 = dbDriverRemote._checkGetResult({ status: 200, data: [{ body: 'fooData'}] })
    expect(result2).toEqual(['fooData'])
  })

  it('14 WordItemRemoteDbDriver - getCheckArray prepares array with ID for compare with remote data', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver({accessToken:'mockToken',userId:'fooUserId',endpoints:{wordlist: 'http://example.org'}})

    let testDataItems = [{targetWord: 'fooWord1', languageCode: 'lat'}, {targetWord: 'fooWord2', languageCode: 'lat'}]
    let result = dbDriverRemote.getCheckArray(testDataItems)
    expect(result).toEqual(['lat-fooWord1', 'lat-fooWord2'])
  })
})