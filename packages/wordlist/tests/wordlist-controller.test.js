/* eslint-env jest */
/* eslint-disable no-unused-vars */
import WordlistController from '@/controllers/wordlist-controller.js'
import indexedDB from 'fake-indexeddb'
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange'
// import IndexedDBAdapter from '@/storage/indexed-db-adapter'


describe('wordlist-controller.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}  
  
  let testUserID = 'userIDTest'
  let wC = new WordlistController(testUserID)
  wC.storageAdapter.indexedDB = indexedDB
  wC.storageAdapter.available = true 
  wC.storageAdapter.IDBKeyRange = IDBKeyRange

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

  it('1 WordlistController - constructor saves userID from properties and inits wordLists', () => {
    expect(wC.userID).toEqual(testUserID)
    expect(wC.wordLists).toBeInstanceOf(Object)
    expect(Object.values(wC.wordLists).length).toEqual(0)
  })

  it('2 WordlistController - availableLangs returns array of supported langs', () => {
    expect(Array.isArray(wC.availableLangs)).toBeTruthy()
    expect(wC.availableLangs.length).toBeGreaterThan(0)
    expect(wC.availableLangs.includes('lat')).toBeTruthy()
  })

  it('3 WordlistController - initLists executes uploadListsFromDB if storageAdapter.available', () => {
    wC.uploadListsFromDB = jest.fn()
    wC.storageAdapter.available = false

    wC.initLists()
    expect(wC.uploadListsFromDB).not.toHaveBeenCalled()

    wC.storageAdapter.available = true

    wC.initLists()
    expect(wC.uploadListsFromDB).toHaveBeenCalled()
  })

  it('4 WordlistController - createWordList adds a new WordList instance to wordLists property', async () => {
    let wC1 = new WordlistController(testUserID)
    wC1.createWordList('lat')
    expect(Object.keys(wC1.wordLists).includes('lat')).toBeTruthy()
  })

  it('5 WordlistController - removeWordList removes WordList instance from wordLists property', async () => {
    let wC1 = new WordlistController(testUserID)
    wC1.createWordList('lat')
    expect(Object.keys(wC1.wordLists).includes('lat')).toBeTruthy()

    wC1.removeWordList('lat')
    expect(Object.keys(wC1.wordLists).includes('lat')).toBeFalsy()
  })

  it('6 WordlistController - wordListExist checks if a wordList for the given languageCode is in the wordLists property', async () => {
    let wC1 = new WordlistController(testUserID)
    wC1.createWordList('lat')
    expect(Object.keys(wC1.wordLists).includes('lat')).toBeTruthy()

    expect(wC1.wordListExist('lat')).toBeTruthy()

    wC1.removeWordList('lat')
    expect(wC1.wordListExist('lat')).toBeFalsy()
  })

  it('7 WordlistController - onHomonymReady executes addToWordList with homonym data and type - shortHomonym', async () => {
    wC.addToWordList = jest.fn()

    wC.onHomonymReady({ homonym: 'fooHomonym' })
    expect(wC.addToWordList).toHaveBeenCalledWith({ homonym: 'fooHomonym', type: 'shortHomonym' })
  })

  it('8 WordlistController - onDefinitionsReady executes addToWordList with homonym data and type - fullHomonym', async () => {
    wC.addToWordList = jest.fn()

    wC.onDefinitionsReady({ homonym: 'fooHomonym' })
    expect(wC.addToWordList).toHaveBeenCalledWith({ homonym: 'fooHomonym', type: 'fullHomonym' })
  })

  it('9 WordlistController - onLemmaTranslationsReady executes addToWordList with homonym data and type - fullHomonym', async () => {
    wC.addToWordList = jest.fn()

    wC.onLemmaTranslationsReady('fooHomonym')
    expect(wC.addToWordList).toHaveBeenCalledWith({ homonym: 'fooHomonym', type: 'fullHomonym' })
  })

  it('10 WordlistController - onTextQuoteSelectorRecieved executes addToWordList with textQuoteSelector data and type - textQuoteSelector', async () => {
    wC.addToWordList = jest.fn()

    wC.onTextQuoteSelectorRecieved('fooTextQuoteSelector')
    expect(wC.addToWordList).toHaveBeenCalledWith({ textQuoteSelector: 'fooTextQuoteSelector', type: 'textQuoteSelector' })
  })

  it('11 WordlistController - uploadListsFromDB executes createWordList for each lang if it is not existed, checks data in IndexedDB and if there is no data, it removes wordlist', async () => {
    let wC1 = new WordlistController(testUserID)
    wC1.storageAdapter.indexedDB = indexedDB
    wC1.storageAdapter.available = true
    wC1.storageAdapter.IDBKeyRange = IDBKeyRange

    jest.spyOn(wC1, 'createWordList')
    jest.spyOn(wC1, 'removeWordList')
    
    await wC1.uploadListsFromDB()
    await timeout(3000)
    expect(wC1.createWordList).toHaveBeenCalledTimes(wC1.availableLangs.length)
    expect(wC1.removeWordList).toHaveBeenCalledTimes(wC1.availableLangs.length)
    await timeout(3000)
  }, 50000)

  it('12 WordlistController - uploadListsFromDB executes uploads data from IndexedDB if words are existed there', async () => {
    let wC1 = new WordlistController(testUserID)
    wC1.storageAdapter.indexedDB = indexedDB
    wC1.storageAdapter.available = true
    wC1.storageAdapter.IDBKeyRange = IDBKeyRange

    let testPushData = {
      textQuoteSelector: {
        languageCode: 'lat',
        normalizedText: 'fooTargetWord'
      }
    }

    await wC1.addToWordList(testPushData)
    await timeout(3000)

    wC1.wordLists = {}

    await wC1.uploadListsFromDB()
    await timeout(3000)

    expect(wC1.wordListExist('lat')).toBeTruthy()
    expect(wC1.wordLists['lat']).toBeDefined()

    expect(wC1.wordLists['lat'].values.length).toBeGreaterThan(0)

    let testWI = wC1.wordLists['lat'].values[0]
    expect(testWI.targetWord).toEqual('fooTargetWord')
    expect(testWI.languageCode).toEqual('lat')
    expect(testWI.userID).toEqual(testUserID)
  }, 50000)

  it('13 WordlistController - addToWordList adds a wordItem to the wordList', async () => {
    let wC1 = new WordlistController(testUserID)
    wC1.storageAdapter.indexedDB = indexedDB
    wC1.storageAdapter.available = true
    wC1.storageAdapter.IDBKeyRange = IDBKeyRange

    let testPushData = {
      textQuoteSelector: {
        languageCode: 'lat',
        normalizedText: 'fooTargetWord'
      }
    }

    await wC1.addToWordList(testPushData)
    await timeout(3000)

    expect(wC1.wordListExist('lat')).toBeTruthy()
    expect(wC1.wordLists['lat']).toBeDefined()

    expect(wC1.wordLists['lat'].values.length).toBeGreaterThan(0)

    let testWI = wC1.wordLists['lat'].values[0]
    expect(testWI.targetWord).toEqual('fooTargetWord')
    expect(testWI.languageCode).toEqual('lat')
    expect(testWI.userID).toEqual(testUserID)
  }, 50000)
})