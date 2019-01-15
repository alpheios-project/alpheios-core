/* eslint-env jest */
/* eslint-disable no-unused-vars */
import WordList from '@/lib/word-list'
import WordItem from '@/lib/word-item'
import IndexedDBAdapter from '@/storage/indexed-db-adapter'
import indexedDB from 'fake-indexeddb'
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange'

describe('wordlist-controller.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {} 
  
  let testUserID = 'userIDTest'
  let testLangCode = 'lat'
  let testStorageAdapter = new IndexedDBAdapter()
  testStorageAdapter.indexedDB = indexedDB
  testStorageAdapter.available = true 
  testStorageAdapter.IDBKeyRange = IDBKeyRange
  
  let wordList = new WordList(testUserID, testLangCode, testStorageAdapter)

  beforeAll(async () => {

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

  it('1 WordList - constructor saves userID from properties and inits items', () => {
    expect(wordList.userID).toEqual(testUserID)
    expect(wordList.languageCode).toEqual(testLangCode)
    expect(wordList.storageAdapter).toEqual(testStorageAdapter)

    expect(wordList.items).toBeInstanceOf(Object)
    expect(Object.values(wordList.items).length).toEqual(0)
  })

  it('2 WordList - languageName returns display name for current languageCode', () => {
    expect(wordList.languageName).toEqual('Latin')
  })

  it('3 WordList - storageID returns userID-langCode', () => {
    expect(wordList.storageID).toEqual(testUserID + '-' + testLangCode)
  })

  it('4 WordList - values returns all wordItems from the wordList', () => {
    expect(Object.values(wordList.items).length).toEqual(0)
    expect(wordList.values.length).toEqual(0)
  })

  it('5 WordList - storageMap returns settings for ObjectStores', () => {
    let storageMap = wordList.storageMap
    expect(Object.keys(storageMap)).toEqual([ 'common', 'textQuoteSelector', 'shortHomonym', 'fullHomonym' ])

    for (let storageMapItem of Object.values(storageMap)) {
      expect(storageMapItem.objectStoreName).toBeDefined()
      expect(storageMapItem.convertMethodName).toBeDefined()
    }
  })

  it('6 WordList - pushWordItem creates wordItem, executes pushWordItemPart with common type (if there is no such wordItem in the list) and executes pushWordItemPart with given type', async () => {
    let wordList = new WordList(testUserID, testLangCode, testStorageAdapter)
    let wordItem = new WordItem({})

    wordList.pushWordItemPart = jest.fn()
    await wordList.pushWordItem({}, 'shortHomonym')

    expect(wordList.pushWordItemPart).toHaveBeenCalledWith([wordItem], 'common')

    // await timeout(3000)
    expect(wordList.pushWordItemPart).toHaveBeenCalledWith([wordItem], 'shortHomonym')
  }, 50000)
})