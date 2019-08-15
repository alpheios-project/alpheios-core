/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import WordItemIndexedDbDriver from '@/storage/worditem-indexeddb-driver'
import IndexedDBAdapter from '@/storage/indexed-db-adapter'
import { WordItem, Constants } from 'alpheios-data-models'

import IndexedDB from 'fake-indexeddb'
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange'

describe('indexed-db-adapter.test.js', () => {
  // console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll( () => {
    window.indexedDB = IndexedDB
    window.IDBKeyRange = IDBKeyRange
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

  it('1 IndexedDBAdapter - constructor creates object with the following properties: dbDriver, available, errors', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    expect(localAdapter.dbDriver).toEqual(dbDriverLocal)
    expect(localAdapter.available).toBeTruthy()
    expect(localAdapter.errors).toEqual([])
  })

  it('2 IndexedDBAdapter - create method executes update with each segment from WordItemIndexedDbDriver and saves data to IndexedDB', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let testWordItem = new WordItem({
      targetWord: 'tuli',
      languageCode: Constants.STR_LANG_CODE_LAT
    })

    jest.spyOn(localAdapter, 'update')

    let result = await localAdapter.create(testWordItem)
    expect(result).toBeTruthy()
    expect(localAdapter.update).toHaveBeenCalledTimes(dbDriverLocal.segments.length)

    let localItems = await localAdapter.query({languageCode: 'lat'})
    expect(localItems[0].targetWord).toEqual('tuli')
    await localAdapter.deleteMany({languageCode: 'lat'})
  })

  it('3 IndexedDBAdapter - create method saves error to errors property', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    localAdapter.update = jest.fn(() => { throw new Error('Something is wrong') })

    let result = await localAdapter.create()
    expect(result).toBeFalsy()
    expect(localAdapter.errors.length).toEqual(1)
    expect(localAdapter.errors[0].message).toEqual('Something is wrong')

    let localItems = await localAdapter.query({languageCode: 'lat'})
    expect(localItems.length).toEqual(0)
  })

  it('4 IndexedDBAdapter - deleteMany method executes segmentDeleteManyQuery and _deleteFromStore for each segment from WordItemIndexedDbDriver', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let testWordItem = new WordItem({
      targetWord: 'tuli',
      languageCode: Constants.STR_LANG_CODE_LAT
    })

    await localAdapter.create(testWordItem)

    jest.spyOn(localAdapter, '_deleteFromStore')
    jest.spyOn(dbDriverLocal, 'segmentDeleteManyQuery')

    let result = await localAdapter.deleteMany({languageCode: 'lat'})
    expect(result).toBeTruthy()
    expect(localAdapter._deleteFromStore).toHaveBeenCalledTimes(dbDriverLocal.segments.length)
    expect(dbDriverLocal.segmentDeleteManyQuery).toHaveBeenCalledTimes(dbDriverLocal.segments.length)

    let localItems = await localAdapter.query({languageCode: 'lat'})
    expect(localItems.length).toEqual(0)
    await localAdapter.deleteMany({languageCode: 'lat'})
  })

  it('5 IndexedDBAdapter - deleteMany method saves error to errors property', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    localAdapter._deleteFromStore = jest.fn(() => { throw new Error('Something is wrong') })

    let result = await localAdapter.deleteMany({languageCode: 'lat'})
    expect(result).toBeFalsy()
    expect(localAdapter.errors.length).toEqual(1)
    expect(localAdapter.errors[0].message).toEqual('Something is wrong')
  })

  it('6 IndexedDBAdapter - deleteOne method executes segmentDeleteQuery and _deleteFromStore for each segment from WordItemIndexedDbDriver', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let testWordItem1 = new WordItem({
      targetWord: 'tuli',
      languageCode: Constants.STR_LANG_CODE_LAT
    })

    let testWordItem2 = new WordItem({
      targetWord: 'latus',
      languageCode: Constants.STR_LANG_CODE_LAT
    })

    await localAdapter.create(testWordItem1)
    await localAdapter.create(testWordItem2)

    jest.spyOn(localAdapter, '_deleteFromStore')
    jest.spyOn(dbDriverLocal, 'segmentDeleteQuery')

    let result = await localAdapter.deleteOne(testWordItem1)

    expect(result).toBeTruthy()
    expect(localAdapter._deleteFromStore).toHaveBeenCalledTimes(dbDriverLocal.segments.length)
    expect(dbDriverLocal.segmentDeleteQuery).toHaveBeenCalledTimes(dbDriverLocal.segments.length)

    let localItems = await localAdapter.query({languageCode: 'lat'})
    expect(localItems.filter(item => item.targetWord === testWordItem1.targetWord).length).toEqual(0)
    await localAdapter.deleteMany({languageCode: 'lat'})
  })

  it('7 IndexedDBAdapter - deleteOne method saves error to errors property', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    localAdapter._deleteFromStore = jest.fn(() => { throw new Error('Something is wrong') })

    let result = await localAdapter.deleteOne({languageCode: 'lat'})
    expect(result).toBeFalsy()
    expect(localAdapter.errors.length).toEqual(1)
    expect(localAdapter.errors[0].message).toEqual('Something is wrong')
  })

  it('8 IndexedDBAdapter - update method executes updateSegmentQuery and _set for each segment from WordItemIndexedDbDriver', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let testWordItem1 = new WordItem({
      targetWord: 'tuli',
      languageCode: Constants.STR_LANG_CODE_LAT,
      important: false
    })

    await localAdapter.create(testWordItem1)
    let localItems = await localAdapter.query({wordItem: testWordItem1})
    expect(localItems[0].targetWord).toEqual('tuli')
    expect(localItems[0].important).toBeFalsy()

    testWordItem1.important = true

    jest.spyOn(localAdapter, '_set')
    jest.spyOn(dbDriverLocal, 'updateSegmentQuery')

    let result = await localAdapter.update(testWordItem1)

    expect(result).toBeTruthy()
    expect(localAdapter._set).toHaveBeenCalledTimes(1) // only common segment, because there are no homonym and context data
    expect(dbDriverLocal.updateSegmentQuery).toHaveBeenCalledTimes(dbDriverLocal.segments.length) // but prepare for each segment

    localItems = await localAdapter.query({wordItem: testWordItem1})

    expect(localItems[0].targetWord).toEqual('tuli')
    expect(localItems[0].important).toBeTruthy()

    await localAdapter.deleteMany({languageCode: 'lat'})

  })

  it('9 IndexedDBAdapter - update method executes updateSegmentQuery and _set only for given segment in parameters', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let testWordItem1 = new WordItem({
      targetWord: 'tuli',
      languageCode: Constants.STR_LANG_CODE_LAT,
      important: false
    })

    await localAdapter.create(testWordItem1)
    let localItems = await localAdapter.query({wordItem: testWordItem1})
    expect(localItems[0].targetWord).toEqual('tuli')
    expect(localItems[0].important).toBeFalsy()

    testWordItem1.important = true

    jest.spyOn(localAdapter, '_set')
    jest.spyOn(dbDriverLocal, 'updateSegmentQuery')

    let result = await localAdapter.update(testWordItem1, { segment: 'common' } )

    expect(result).toBeTruthy()
    expect(localAdapter._set).toHaveBeenCalledTimes(1) // only common segment, because there are no homonym and context data
    expect(dbDriverLocal.updateSegmentQuery).toHaveBeenCalledTimes(1) // but prepare for each segment

    localItems = await localAdapter.query({wordItem: testWordItem1})

    expect(localItems[0].targetWord).toEqual('tuli')
    expect(localItems[0].important).toBeTruthy()

    await localAdapter.deleteMany({languageCode: 'lat'})

  })

  it('10 IndexedDBAdapter - update method saves error to errors property', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    localAdapter._set = jest.fn(() => { throw new Error('Something is wrong') })

    let result = await localAdapter.update({languageCode: 'lat'})
    expect(result).toBeFalsy()
    expect(localAdapter.errors.length).toEqual(1)
    expect(localAdapter.errors[0].message).toEqual('Something is wrong')
  })


  it('11 IndexedDBAdapter - query method returns empty array if there are no items in IndexedDB', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let localItems = await localAdapter.query({ languageCode: 'lat' })
    expect(localItems).toEqual([])
  })

  it('12 IndexedDBAdapter - query method returns array with wordItems if there are items in IndexedDB', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let testWordItem1 = new WordItem({
      targetWord: 'tuli',
      languageCode: Constants.STR_LANG_CODE_LAT
    })

    let testWordItem2 = new WordItem({
      targetWord: 'latus',
      languageCode: Constants.STR_LANG_CODE_LAT
    })

    await localAdapter.create(testWordItem1)
    await localAdapter.create(testWordItem2)

    let localItems = await localAdapter.query({ languageCode: 'lat' })
    expect(localItems.length).toEqual(2)

    expect(localItems[0]).toBeInstanceOf(WordItem)
    expect(localItems[1]).toBeInstanceOf(WordItem)

    expect(localItems.filter(item => item.targetWord === 'tuli').length).toEqual(1)
    expect(localItems.filter(item => item.targetWord === 'latus').length).toEqual(1)
    await localAdapter.deleteMany({languageCode: 'lat'})
  })

  it('13 IndexedDBAdapter - query method saves error to errors property', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    localAdapter._getFromStore = jest.fn(() => { throw new Error('Something is wrong') })

    let result = await localAdapter.query({languageCode: 'lat'})
    expect(result).toBeFalsy()
    expect(localAdapter.errors.length).toEqual(1)
    expect(localAdapter.errors[0].message).toEqual('Something is wrong')
  })

  it('14 IndexedDBAdapter - clear method removes all items from IndexedDB', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let testWordItem1 = new WordItem({
      targetWord: 'tuli',
      languageCode: Constants.STR_LANG_CODE_LAT
    })

    let testWordItem2 = new WordItem({
      targetWord: 'latus',
      languageCode: Constants.STR_LANG_CODE_LAT
    })

    await localAdapter.create(testWordItem1)
    await localAdapter.create(testWordItem2)

    let localItems = await localAdapter.query({ languageCode: 'lat' })
    expect(localItems.length).toEqual(2)

    await localAdapter.clear()

    localItems = await localAdapter.query({ languageCode: 'lat' })
    expect(localItems.length).toEqual(0)
  })

  it('15 IndexedDBAdapter - query method saves error to errors property', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    dbDriverLocal.storageMap = {
      common: {
        type: 'segment',
        objectStoreData: {
          name: 'FooWordListsCommon'
        }
      }
    }

    try {
      await localAdapter.clear()
    } catch (error) {
    }

    expect(localAdapter.errors.length).toEqual(1)
  })


  it('16 IndexedDBAdapter - _initIndexedDBNamespaces method checks if IndexedDB is available', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    window.indexedDB = IndexedDB
    window.IDBKeyRange = IDBKeyRange

    expect(localAdapter._initIndexedDBNamespaces()).toBeTruthy()

    window.indexedDB = undefined
    window.IDBKeyRange = undefined

    expect(localAdapter._initIndexedDBNamespaces()).toBeFalsy()
    expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(/IndexedDB/))

    window.indexedDB = IndexedDB
    window.IDBKeyRange = IDBKeyRange
  })

  it('17 IndexedDBAdapter - _openDatabaseRequest method creates request for opening database with defined upgradeEvent', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let request = localAdapter._openDatabaseRequest()

    expect(request.constructor.name).toEqual('FDBOpenDBRequest')
    expect(request.onupgradeneeded).toBeDefined()
    expect(request.readyState).toEqual('pending')
  })

  it('18 IndexedDBAdapter - _createObjectStores method checks if objectStore from driver\'s list exists and creates it if not and creates indexes', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let testMockDB = {
      objectStoreNames: { contains: () => { return false } },
      createObjectStore: jest.fn(() => {
        return {
          indexNames: { contains: () => { return false } },
          createIndex: jest.fn()
        }
      })
    }

    localAdapter._createObjectStores(testMockDB)
    expect(testMockDB.createObjectStore).toHaveBeenCalledTimes(dbDriverLocal.allObjectStoreData.length)
  })

  it('19 IndexedDBAdapter - _createObjectStores method saves error to errors property of localAdapter', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('alpheiosMockUser')
    let localAdapter = new IndexedDBAdapter(dbDriverLocal)

    let testMockDB = {
      objectStoreNames: { contains: () => { throw new Error('Something is wrong') } },
      createObjectStore: jest.fn(() => {
        return {
          indexNames: { contains: () => { return false } },
          createIndex: jest.fn()
        }
      })
    }

    localAdapter._createObjectStores(testMockDB)

    expect(localAdapter.errors.length).toEqual(1)
  })


})