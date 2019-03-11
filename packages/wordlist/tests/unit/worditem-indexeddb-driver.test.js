/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import IndexedDB from 'fake-indexeddb'
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange'
import { ClientAdapters } from 'alpheios-client-adapters'
import { WordItem, Constants, TextQuoteSelector } from 'alpheios-data-models'

import WordItemIndexedDbDriver from '@/storage/worditem-indexeddb-driver'

describe('worditem-indexeddb-driver.test.js', () => {
  console.error = function () {}
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

  it('1 WordItemIndexedDbDriver - constructor creates object with the following properties: userId, storageMap', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    expect(dbDriverLocal.userId).toEqual('fooUserId')
    expect(dbDriverLocal.storageMap).toBeDefined()
    expect(dbDriverLocal.storageMap.hasOwnProperty('common')).toBeTruthy()
    expect(dbDriverLocal.storageMap.hasOwnProperty('context')).toBeTruthy()
    expect(dbDriverLocal.storageMap.hasOwnProperty('shortHomonym')).toBeTruthy()
    expect(dbDriverLocal.storageMap.hasOwnProperty('fullHomonym')).toBeTruthy()
  })

  it('2 WordItemIndexedDbDriver - each object has constants: dbName, dbVersion', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    expect(dbDriverLocal.dbName).toBeDefined()
    expect(dbDriverLocal.dbVersion).toBeDefined()
  })

  it('3 WordItemIndexedDbDriver - segments method should return all segments from storageMap', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    
    let checkSegments = ['common', 'context', 'shortHomonym', 'fullHomonym']
    expect(dbDriverLocal.segments).toEqual(checkSegments)
  })
  
  it('4 WordItemIndexedDbDriver - segmentsNotFirst method should return segments that add data to existed wordItem', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    
    let checkSegments = ['context', 'shortHomonym', 'fullHomonym']
    expect(dbDriverLocal.segmentsNotFirst).toEqual(checkSegments)
  })

  it('5 WordItemIndexedDbDriver - objectStores method should return all objectStores from storageMap', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let checkObjectStores = ['WordListsCommon', 'WordListsContext', 'WordListsHomonym', 'WordListsFullHomonym']
    expect(dbDriverLocal.objectStores).toEqual(checkObjectStores)
  })

  it('6 WordItemIndexedDbDriver - allObjectStoreData method should return all objectStoresData from storageMap', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let checkObjectStoreData = Object.keys(dbDriverLocal.storageMap).filter(key => dbDriverLocal.storageMap[key].type === 'segment').map(key => dbDriverLocal.storageMap[key].objectStoreData)
    expect(dbDriverLocal.allObjectStoreData).toEqual(checkObjectStoreData)
  })

  it('7 WordItemIndexedDbDriver - _objectStoreData returns objectStoreData for a segment argument', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let checkObjectStoreData = dbDriverLocal._objectStoreData('common')
    expect(checkObjectStoreData.name).toEqual('WordListsCommon')
    expect(checkObjectStoreData.structure).toBeDefined()
  })

  it('8 WordItemIndexedDbDriver - _formatQuery returns object for creating IndexedDB request', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let indexData = {
      indexName: 'fooName',
      value: 'fooValue',
      type: 'fooType'
    }
    expect(dbDriverLocal._formatQuery('common', indexData)).toEqual({
      objectStoreName: 'WordListsCommon',
      condition: indexData
    })
  })
  
  it('9 WordItemIndexedDbDriver - _selectByID returns object for creating index condition by ID', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = { languageCode: 'lat', targetWord: 'foo' }
    expect(dbDriverLocal._selectByID(testWordItem)).toEqual({
      indexName: 'ID',
      value: dbDriverLocal._makeStorageID(testWordItem),
      type: 'only'
    })
  })

  it('10 WordItemIndexedDbDriver - _selectByWordItemID returns object for creating index condition by wordItemID', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = { languageCode: 'lat', targetWord: 'foo' }
    expect(dbDriverLocal._selectByWordItemID(testWordItem)).toEqual({
      indexName: 'wordItemID',
      value: dbDriverLocal._makeStorageID(testWordItem),
      type: 'only'
    })
  })

  it('11 WordItemIndexedDbDriver - _selectByListID returns object for creating index condition by listID', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = { languageCode: 'lat', targetWord: 'foo' }
    expect(dbDriverLocal._selectByListID(testWordItem)).toEqual({
      indexName: 'listID',
      value: dbDriverLocal._makeStorageListID(testWordItem),
      type: 'only'
    })
  })

  it.skip('8 WordItemIndexedDbDriver - WordListsCommon defines key and index fields of the objectStore', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let checkStructure = dbDriverLocal.storageMap.common.objectStoreData.structure
    expect(typeof checkStructure).toEqual('object')
    expect(checkStructure.keyPath).toBeDefined()
    expect(checkStructure.indexes).toBeDefined()
    expect(Array.isArray(checkStructure.indexes)).toBeTruthy()
    expect(checkStructure.indexes.length).toBeGreaterThan(0)
  })

  it.skip('6 WordItemIndexedDbDriver - WordListsContext defines key and index fields of the objectStore', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    let checkStructure = dbDriverLocal.storageMap.context.objectStoreData.structure
    expect(typeof checkStructure).toEqual('object')
    expect(checkStructure.keyPath).toBeDefined()
    expect(checkStructure.indexes).toBeDefined()
    expect(Array.isArray(checkStructure.indexes)).toBeTruthy()
    expect(checkStructure.indexes.length).toBeGreaterThan(0)
  })

  it.skip('7 WordItemIndexedDbDriver - WordListsHomonym defines key and index fields of the objectStore', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    let checkStructure = dbDriverLocal.storageMap.shortHomonym.objectStoreData.structure
    expect(typeof checkStructure).toEqual('object')
    expect(checkStructure.keyPath).toBeDefined()
    expect(checkStructure.indexes).toBeDefined()
    expect(Array.isArray(checkStructure.indexes)).toBeTruthy()
    expect(checkStructure.indexes.length).toBeGreaterThan(0)
  })

  it.skip('8 WordItemIndexedDbDriver - WordListsFullHomonym defines key and index fields of the objectStore', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    let checkStructure = dbDriverLocal.storageMap.fullHomonym.objectStoreData.structure
    expect(typeof checkStructure).toEqual('object')
    expect(checkStructure.keyPath).toBeDefined()
    expect(checkStructure.indexes).toBeDefined()
    expect(Array.isArray(checkStructure.indexes)).toBeTruthy()
    expect(checkStructure.indexes.length).toBeGreaterThan(0)
  })

  it('12 WordItemIndexedDbDriver - loadFirst method returns a WordItem with currentSession = false', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    let testData = {
      ID: 'testUserID-lat-beatum',
      createdDT: '2019/02/12 @ 16:09:04',
      important: false,
      languageCode: 'lat',
      listID: 'testUserID-lat',
      targetWord: 'beatum',
      userID: 'testUserID'
    }

    let loadResult = dbDriverLocal.loadFirst(testData)
    expect(loadResult).toBeInstanceOf(WordItem)
    expect(loadResult.currentSession).toBeFalsy()
  })

  it('13 WordItemIndexedDbDriver - loadSegment method executes loadMethod specific for the segment from storageMap', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    dbDriverLocal.storageMap.context.load = jest.fn()
    dbDriverLocal.loadSegment('context', 'fooDataObject', 'foodata')

    expect(dbDriverLocal.storageMap.context.load).toHaveBeenCalledWith('fooDataObject', 'foodata')

    dbDriverLocal.storageMap.shortHomonym.load = jest.fn()
    dbDriverLocal.loadSegment('shortHomonym', 'fooDataObject', 'foodata')

    expect(dbDriverLocal.storageMap.shortHomonym.load).toHaveBeenCalledWith('fooDataObject', 'foodata')

    dbDriverLocal.storageMap.fullHomonym.load = jest.fn()
    dbDriverLocal.loadSegment('fullHomonym', 'fooDataObject', 'foodata')

    expect(dbDriverLocal.storageMap.fullHomonym.load).toHaveBeenCalledWith('fooDataObject', 'foodata')
  })

  it('14 WordItemIndexedDbDriver - listItemsQuery method creates Query from common segment by listID if params has languageCode', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    dbDriverLocal._formatQuery = jest.fn()
    dbDriverLocal.listItemsQuery({ languageCode: 'lat' })
    expect(dbDriverLocal._formatQuery).toHaveBeenCalledWith('common', dbDriverLocal._selectByListID('lat'))
  })

  it('15 WordItemIndexedDbDriver - listItemsQuery method creates Query from common segment by ID if params has wordItem', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    dbDriverLocal._formatQuery = jest.fn()
    let testWordItem = { languageCode: 'lat', targetWord: 'foo' }

    dbDriverLocal.listItemsQuery({ wordItem: testWordItem })
    expect(dbDriverLocal._formatQuery).toHaveBeenCalledWith('common', dbDriverLocal._selectByID(testWordItem))
  })

  it('16 WordItemIndexedDbDriver - listItemsQuery method throws an error if params has no languageCode and wordItem', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    dbDriverLocal._formatQuery = jest.fn()

    expect(function () {
      let l = dbDriverLocal.listItemsQuery({})
      console.log(l)
    }).toThrowError(/Invalid query parameters/)
  })

  it('17 WordItemIndexedDbDriver - segmentSelectQuery method returns settings for getting data for an objectStore', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat'
    })

    let result = dbDriverLocal.segmentSelectQuery('common', testWordItem)
    expect(result.objectStoreName).toEqual(dbDriverLocal.storageMap.common.objectStoreData.name)
    expect(result.condition).toBeDefined()
    expect(result.condition.indexName).toEqual('ID')

    result = dbDriverLocal.segmentSelectQuery('context', testWordItem)
    expect(result.objectStoreName).toEqual(dbDriverLocal.storageMap.context.objectStoreData.name)
    expect(result.condition).toBeDefined()
    expect(result.condition.indexName).toEqual('wordItemID')

    result = dbDriverLocal.segmentSelectQuery('shortHomonym', testWordItem)
    expect(result.objectStoreName).toEqual(dbDriverLocal.storageMap.shortHomonym.objectStoreData.name)
    expect(result.condition).toBeDefined()
    expect(result.condition.indexName).toEqual('ID')

    result = dbDriverLocal.segmentSelectQuery('fullHomonym', testWordItem)
    expect(result.objectStoreName).toEqual(dbDriverLocal.storageMap.fullHomonym.objectStoreData.name)
    expect(result.condition).toBeDefined()
    expect(result.condition.indexName).toEqual('ID')
  })

  it('18 WordItemIndexedDbDriver - segmentSelectQuery method executes select method of the current segment', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    dbDriverLocal.storageMap['common'].select = jest.fn()

    dbDriverLocal.segmentSelectQuery('common', 'fooWorditem')
    expect(dbDriverLocal.storageMap['common'].select).toHaveBeenCalledWith('common', 'fooWorditem')
  })

  it('19 WordItemIndexedDbDriver - segmentDeleteQuery method executes delete method of the current segment', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    dbDriverLocal.storageMap['common'].delete = jest.fn()

    dbDriverLocal.segmentDeleteQuery('common', 'fooWorditem')
    expect(dbDriverLocal.storageMap['common'].delete).toHaveBeenCalledWith('common', 'fooWorditem')
  })

  it('20 WordItemIndexedDbDriver - _segmentSelectQueryByWordItemID method executes _formatQuery', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat'
    })

    dbDriverLocal._formatQuery = jest.fn()

    dbDriverLocal._segmentSelectQueryByWordItemID('common', testWordItem)
    expect(dbDriverLocal._formatQuery).toHaveBeenCalledWith('common', dbDriverLocal._selectByWordItemID(testWordItem))
  })

  it('21 WordItemIndexedDbDriver - _segmentSelectQueryByID method executes _formatQuery', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat'
    })

    dbDriverLocal._formatQuery = jest.fn()

    dbDriverLocal._segmentSelectQueryByID('common', testWordItem)
    expect(dbDriverLocal._formatQuery).toHaveBeenCalledWith('common', dbDriverLocal._selectByID(testWordItem))
  })

  it('22 WordItemIndexedDbDriver - segmentDeleteManyQuery method executes _formatQuery', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    dbDriverLocal._formatQuery = jest.fn()

    dbDriverLocal.segmentDeleteManyQuery('common', { languageCode: 'lat' })
    expect(dbDriverLocal._formatQuery).toHaveBeenCalledWith('common', dbDriverLocal._selectByListID('lat'))
  })

  it('22 WordItemIndexedDbDriver - segmentDeleteManyQuery method throws Error if there is no languageCode in params', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    expect(function () {
      let l = dbDriverLocal.segmentDeleteManyQuery('common', {})
      console.log(l)
    }).toThrowError(/Invalid query parameters/)
  })

  it('23 WordItemIndexedDbDriver - updateSegmentQuery method returns objectStoreName and dataItems for updating', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    let res = dbDriverLocal.updateSegmentQuery('common', {})
    expect(res.objectStoreName).toBeDefined()
    expect(res.dataItems).toBeDefined()
    expect(Array.isArray(res.dataItems)).toBeTruthy()
  })

  it('24 WordItemIndexedDbDriver - _serializeCommon method returns jsonObj with properties common segment', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat',
      important: false
    })

    let res = dbDriverLocal._serializeCommon(testWordItem)[0]
    expect(res.ID).toBeDefined()
    expect(res.listID).toBeDefined()
    expect(res.userID).toBeDefined()
    expect(res.languageCode).toEqual('lat')
    expect(res.targetWord).toEqual('caeli')
    expect(res.important).toBeFalsy()
    expect(res.createdDT).toBeDefined()
  })

  it('25 WordItemIndexedDbDriver - _serializeContext method returns jsonObj with properties context segment', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let context = []
    let tqselector = TextQuoteSelector.readObject({
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
    context.push(tqselector)

    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat',
      important: false,
      context: context
    })

    let res = dbDriverLocal._serializeContext(testWordItem)[0]
    expect(res.ID).toBeDefined()
    expect(res.listID).toBeDefined()
    expect(res.userID).toBeDefined()
    expect(res.languageCode).toEqual('lat')
    expect(res.targetWord).toEqual('caeli')
    expect(res.wordItemID).toBeDefined()
    expect(res.target).toBeDefined()
    expect(res.target.source).toBeDefined()
    expect(res.target.selector).toBeDefined()
  })
  

  it('26 WordItemIndexedDbDriver - _serializeHomonym method returns jsonObj with homonym properties of WordItem', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'caeli'
      }
    })
    let testHomonym = adapterTuftsRes.result

    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat',
      important: false,
      homonym: testHomonym
    })

    let res = dbDriverLocal._serializeHomonym(testWordItem)[0]
    expect(res.ID).toBeDefined()
    expect(res.listID).toBeDefined()
    expect(res.userID).toBeDefined()
    expect(res.languageCode).toEqual('lat')
    expect(res.targetWord).toEqual('caeli')
    expect(res.homonym).toBeDefined()
  })

  it('27 WordItemIndexedDbDriver - _serializeHomonymWithFullDefs executes _serializeHomonym', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'caeli'
      }
    })
    let testHomonym = adapterTuftsRes.result

    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat',
      important: false,
      homonym: testHomonym
    })

    dbDriverLocal._serializeHomonym = jest.fn()

    dbDriverLocal._serializeHomonymWithFullDefs(testWordItem)
    expect(dbDriverLocal._serializeHomonym).toHaveBeenCalledWith(testWordItem, true)
  })

  it('28 WordItemIndexedDbDriver - currentDate returns format date', () => {
    let curDate = WordItemIndexedDbDriver.currentDate

    expect(curDate.match(/\d+\/\d+\/\d+/))
    expect(curDate.match(/\d+:\d+:\d+/))
  })

  it('29 WordItemIndexedDbDriver - _makeStorageID returns ID for using inside IndexedDB', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat',
      important: false
    })

    let testID = dbDriverLocal._makeStorageID(testWordItem)
    expect(testID.includes('fooUserId')).toBeTruthy()
    expect(testID.includes('caeli')).toBeTruthy()
    expect(testID.includes('lat')).toBeTruthy()
  })

  it('30 WordItemIndexedDbDriver - _makeStorageListID returns listID for using inside IndexedDB', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    let testID = dbDriverLocal._makeStorageListID('lat')
    expect(testID.includes('fooUserId')).toBeTruthy()
    expect(testID.includes('lat')).toBeTruthy()
  })

  it('31 WordItemIndexedDbDriver - makeIDCompareWithRemote returns ID for comparing with remote source', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat',
      important: false
    })

    let testID = dbDriverLocal.makeIDCompareWithRemote(testWordItem)
    expect(testID.includes('caeli')).toBeTruthy()
    expect(testID.includes('lat')).toBeTruthy()
  })

  it('32 WordItemIndexedDbDriver - getCheckArray returns array of ID for comparing with remote source', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat',
      important: false
    })
    let checkArray = [dbDriverLocal.makeIDCompareWithRemote(testWordItem)]
    expect(dbDriverLocal.getCheckArray([testWordItem])).toEqual(checkArray)
  })

  it('33 WordItemIndexedDbDriver - createFromRemoteData returns WordItem created from remoteDataSource (without context and homonym)', () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')
    let testWordItem = {
      targetWord: 'caeli', 
      languageCode: 'lat',
      important: false
    }

    jest.spyOn(dbDriverLocal, 'loadFirst')
    jest.spyOn(dbDriverLocal, 'loadSegment')
    
    let resCreatedRemoteItem = dbDriverLocal.createFromRemoteData(testWordItem)
    expect(resCreatedRemoteItem.constructor.name).toMatch(/WordItem/)
    
    expect(dbDriverLocal.loadFirst).toHaveBeenCalledWith(testWordItem)
    expect(dbDriverLocal.loadSegment).toHaveBeenCalled()
  })

  it('34 WordItemIndexedDbDriver - createFromRemoteData returns WordItem created from remoteDataSource (without context and with homonym)', async () => {
    let dbDriverLocal = new WordItemIndexedDbDriver('fooUserId')

    let testWordItem = new WordItem({
      targetWord: 'caeli', 
      languageCode: 'lat',
      important: false,
      homonym: {
        targetWord: 'caeli',
        languageCode: 'lat',
        lemmasList: 'caeli, caelis'
      }
    })

    jest.spyOn(dbDriverLocal, 'loadSegment')
    
    let resCreatedRemoteItem = dbDriverLocal.createFromRemoteData(testWordItem)
    expect(dbDriverLocal.loadSegment).toHaveBeenCalled()
    expect(resCreatedRemoteItem.constructor.name).toMatch(/WordItem/)
    expect(resCreatedRemoteItem.homonym.constructor.name).toMatch(/Homonym/)
  })
})
