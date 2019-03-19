import { Homonym, WordItem, TextQuoteSelector, LanguageModelFactory as LMF } from 'alpheios-data-models'

import IndexedDBObjectStoresStructure from '@/storage/indexeddbDriver/indexed-db-object-stores-structure'
import IndexedDBLoadProcess from '@/storage/indexeddbDriver/indexed-db-load-process'

export default class WordItemIndexedDbDriver {

  /**
   * @constructor
   * @param {String} userId user id for the database
   */
  constructor(userId) {
    this.userId = userId
    this.storageMap = {
      _loadFirst: 'common',
      common: {
        type: 'segment',
        sync: true,
        objectStoreData: {
          name: 'WordListsCommon',
          structure: IndexedDBObjectStoresStructure.WordListsCommon
        },
        load: IndexedDBLoadProcess.loadBaseObject,
        serialize: this._serializeCommon.bind(this),
        delete: this._segmentSelectQueryByID.bind(this),
        select: this._segmentSelectQueryByID.bind(this)
      },
      context: {
        type: 'segment',
        sync: true,
        objectStoreData: {
          name: 'WordListsContext',
          structure: IndexedDBObjectStoresStructure.WordListsContext
        },
        serialize: this._serializeContext.bind(this),
        load: IndexedDBLoadProcess.loadContext,
        delete: this._segmentSelectQueryByWordItemID.bind(this),
        select: this._segmentSelectQueryByWordItemID.bind(this)
      },
      shortHomonym: {
        type: 'segment',
        sync: true,
        objectStoreData: {
          name: 'WordListsHomonym',
          structure: IndexedDBObjectStoresStructure.WordListsHomonym
        },
        serialize: this._serializeHomonym.bind(this),
        load: IndexedDBLoadProcess.loadHomonym,
        delete: this._segmentSelectQueryByID.bind(this),
        select: this._segmentSelectQueryByID.bind(this)
      },
      fullHomonym: {
        type: 'segment',
        objectStoreData: {
          name: 'WordListsFullHomonym',
          structure: IndexedDBObjectStoresStructure.WordListsFullHomonym
        },
        serialize: this._serializeHomonymWithFullDefs.bind(this),
        load: IndexedDBLoadProcess.loadHomonym,
        delete: this._segmentSelectQueryByID.bind(this),
        select: this._segmentSelectQueryByID.bind(this)
      }
    }
  }

  /**
  * dbName getter
  * @return {String}
  */
  get dbName () {
    return 'AlpheiosWordLists'
  }

  /**
   * dbVersion getter
   * @return {Number}
   */
  get dbVersion () {
    return 3
  }

  /**
   * db segments that we are updating from remote data
   * @return {String[]} - array with segments name
   */
  get segmentsSync() {
    return Object.keys(this.storageMap).filter(key => this.storageMap[key].type === 'segment' && this.storageMap[key].sync)
  }

  /**
   * db segments getter
   * @return {String[]} - array with segments name
   */
  get segments() {
    return Object.keys(this.storageMap).filter(key => this.storageMap[key].type === 'segment')
  }

  /**
   * db segments getter - segments that needs already created wordItem
   * @return {String[]} - array with segment's names
   */
  get segmentsNotFirst () {
    return this.segments.filter(segment => segment !== this.storageMap._loadFirst)
  }

  /**
   * objectStore's names getter
   * @return {String[]} - array with objectStore's names
   */
  get objectStores () {
    return this.allObjectStoreData.map(objectStoreData => objectStoreData.name)
  }

  /**
   * objectStore's full data getter
   * @return {String[]} - array with objectStore's data { name, structure }
   */
  get allObjectStoreData () {
    return this.segments.map(segment => this.storageMap[segment].objectStoreData)
  }

  /**
   * objectStore's data by segment name
   * @param {String} segment - segment name
   * @return {Object} - { name, structure }
   */
  _objectStoreData (segment) {
    return this.storageMap[segment].objectStoreData
  }

  /**
   * Prepares query data for creating IndexedDB Request
   * @param {String} segment
   * @param {Object} indexData - index data for condition
   * @param {String} indexData.name - index name
   * @param {String} indexData.value - index value
   * @param {String} indexData.type - index type (in our queries it is ussually only)
   * @return {Object} - { objectStoreName, condition }
   */
  _formatQuery (segment, indexData) {
    return {
      objectStoreName: this._objectStoreData(segment).name,
      condition: indexData
    }
  }

  /**
   * Prepares indexData for formatQuery when we select by ID from objectStore
   * @param {WordItem} wordItem
   * @param {String} [type=only] - type of index
   * @return {Object} - { indexName, value , type}
   */
  _selectByID(wordItem, type = 'only') {
    return {
      indexName: 'ID',
      value: this._makeStorageID(wordItem),
      type: type
    }
  }

  /**
   * Prepares indexData for formatQuery when we select by wordItemID from objectStore (for example context)
   * @param {WordItem} wordItem
   * @param {String} [type=only] - type of index
   * @return {Object} - { indexName, value , type}
   */
  _selectByWordItemID(wordItem, type = 'only') {
    return {
      indexName: 'wordItemID',
      value: this._makeStorageID(wordItem),
      type: type
    }
  }

  /**
   * Prepares indexData for formatQuery when we select by listID from objectStore (for example all values for languageCode)
   * @param {String} languageCode
   * @param {String} [type=only] - type of index
   * @return {Object} - { indexName, value , type}
   */
  _selectByListID(languageCode, type = 'only') {
    return {
      indexName: 'listID',
      value: this._makeStorageListID(languageCode),
      type: type
    }
  }

  /**
   * Loads a segment that is defined as first
   * @param {Object} jsonObj
   * @return {WordItem}
   */
  loadFirst (jsonObj) {
    return this.loadSegment(this.storageMap._loadFirst, jsonObj)
  }

  /**
   * Loads a segment of a data model object from the database
   * @param {String} segment - segment name
   * @param {Object} jsonObj - json data to load to worditem
   * @param {WordItem} worditem - worditem
   * @return {WordItem}
   */
  loadSegment(segment, jsonObj, worditem) {
    if (this.storageMap[segment].load) {
      return this.storageMap[segment].load(jsonObj, worditem)
    }
  }

  /**
   * Creates query for getting list of wordItems or one wordItem
   * @param {Object} params - stores one of the following properties:
   * @param {String} [params.languageCode] - for selecting all wordItems for the current langugeCode
   * @param {WordItem} [params.worditem] - for selecting one wordItem
   * @return {WordItem}
   */
  listItemsQuery(params) {
    if (params.languageCode) {
      return this._formatQuery('common', this._selectByListID(params.languageCode))
    } else if (params.wordItem) {
      return this._formatQuery('common', this._selectByID(params.wordItem))
    } else {
      throw new Error("Invalid query parameters - missing languageCode")
    }
  }

  /**
   * Creates query for selecting data from the segment
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  segmentSelectQuery(segment, worditem) {
    if (this.storageMap[segment].select) {
      return this.storageMap[segment].select(segment, worditem)
    }
  }

  /**
   * Creates query for selecting data from the segment by wordItem
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  _segmentSelectQueryByWordItemID (segment, worditem) {
    return this._formatQuery(segment, this._selectByWordItemID(worditem))
  }

  /**
   * Creates query for selecting data from the segment by ID
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  _segmentSelectQueryByID (segment, worditem) {
    return this._formatQuery(segment, this._selectByID(worditem))
  }

  /**
   * Creates query for deleting one item from the segment
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  segmentDeleteQuery (segment, worditem) {
    if (this.storageMap[segment].delete) {
      return this.storageMap[segment].delete(segment, worditem)
    }
  }

  /**
   * Creates query for deleting all list items from the segment
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  segmentDeleteManyQuery(segment, params) {
    if (params.languageCode) {
      return this._formatQuery(segment, this._selectByListID(params.languageCode))
    } else {
      throw new Error("Invalid query parameters - missing languageCode")
    }
  }

  /**
   * Creates data for updating items in a segment
   * @param {String} segment - segment name
   * @param {Object} data - the worditem object
   * @return {Object} data for creating IndexedDB Request
   */
  updateSegmentQuery(segment, data) {
    return {
      objectStoreName: this._objectStoreData(segment).name,
      dataItems: this.storageMap[segment].serialize(data)
    }
  }

  /**
   * Creates jsonObj for saving to IndexedDB for common segment
   * @param {WordItem} worditem - the worditem object
   * @return {Object[]}
   */
  _serializeCommon (worditem) {
    return [{
      ID: this._makeStorageID(worditem),
      listID: this.userId + '-' + worditem.languageCode,
      userID: this.userId,
      languageCode: worditem.languageCode,
      targetWord: worditem.targetWord,
      important: worditem.important,
      createdDT: WordItemIndexedDbDriver.currentDate
    }]
  }

  /**
   * Creates jsonObj for saving to IndexedDB for context segment
   * @param {WordItem} worditem - the worditem object
   * @return {Object[]}
   */
  _serializeContext (worditem) {
    let result = []
    let index = 0
    let wordItemId = this._makeStorageID(worditem)
    for (let tq of worditem.context) {
      index++
      let resultItem = {
        ID: wordItemId + '-' + index,
        listID: this.userId + '-' + worditem.languageCode,
        userID: this.userId,
        languageCode: worditem.languageCode,
        targetWord: worditem.targetWord,
        wordItemID: wordItemId,
        target: {
          source: tq.source,
          selector: {
            type: 'TextQuoteSelector',
            exact: tq.text,
            prefix: tq.prefix && tq.prefix.length > 0 ? tq.prefix : ' ',
            suffix: tq.suffix && tq.suffix.length > 0 ? tq.suffix : ' ',
            contextHTML: tq.contextHTML,
            languageCode: tq.languageCode
          }
        },
        createdDT: WordItemIndexedDbDriver.currentDate
      }
      result.push(resultItem)
    }
    return result
  }

  /**
   * Creates jsonObj for saving to IndexedDB for homonyms segment
   * @param {WordItem} worditem - the worditem object
   * @param {Boolean} [addMeaning = false] - if true it adds definitions
   * @return {Object[]}
   */
  _serializeHomonym (worditem, addMeaning = false) {
    let resultHomonym = worditem.homonym && (worditem.homonym instanceof Homonym) ? worditem.homonym.convertToJSONObject(addMeaning) : null
    if (resultHomonym) {
      return [{
        ID: this._makeStorageID(worditem),
        listID: this.userId + '-' + worditem.languageCode,
        userID: this.userId,
        languageCode: worditem.languageCode,
        targetWord: worditem.targetWord,
        homonym: resultHomonym
      }]
    }
    return []
  }


/**
 * Creates jsonObj for saving to IndexedDB for full homonym segment
 * @param {WordItem} worditem - the worditem object
 * @return {Object[]}
 */
_serializeHomonymWithFullDefs (worditem) {
  return this._serializeHomonym(worditem, true)
}

/**
 * Returns formatted date/time for saving to IndexedDB
 * @return {String}
 */
static get currentDate () {
  let dt = new Date()
  return dt.getFullYear() + '/'
      + ((dt.getMonth()+1) < 10 ? '0' : '') + (dt.getMonth()+1)  + '/'
      + ((dt.getDate() < 10) ? '0' : '') + dt.getDate() + ' @ '
              + ((dt.getHours() < 10) ? '0' : '') + dt.getHours() + ":"
              + ((dt.getMinutes() < 10) ? '0' : '') + dt.getMinutes() + ":"
              + ((dt.getSeconds() < 10) ? '0' : '') + dt.getSeconds()

}

  /**
   * Creates ID for wordItem for saving to IndexedDB
   * @param {WordItem} worditem - the worditem object
   * @return {String}
   */
  _makeStorageID(worditem) {
    return this.userId + '-' + worditem.languageCode + '-' + worditem.targetWord
  }

  /**
   * Creates ID for wordList for saving to IndexedDB
   * @param {String} languageCode - languageCode of the wordList
   * @return {String}
   */
  _makeStorageListID(languageCode) {
    return this.userId + '-' + languageCode
  }

  /**
   * Creates ID for wordItem similiar to remote format (without userID)
   * @param {String} languageCode - languageCode of the wordList
   * @return {String}
   */
  makeIDCompareWithRemote (worditem) {
    return worditem.languageCode + '-' + worditem.targetWord
  }

  /**
   * Creates array of IDs for comparing with remote items
   * @param {WordItem[]} wordItems - languageCode of the wordList
   * @return {String[]}
   */
  getCheckArray (wordItems) {
    return wordItems.map(wordItem => this.makeIDCompareWithRemote(wordItem))
  }

  /**
   * Creates wordItem from remote data
   * @param {Object} remoteDataItem - wordItem from remote source in json format
   * @return {WordItem}
   */
  createFromRemoteData (remoteDataItem) {
    let wordItem = this.loadFirst(remoteDataItem)

    if (remoteDataItem.context) {
      this.loadSegment('context', remoteDataItem.context, wordItem)
    }

    if (remoteDataItem.homonym) {
      this.loadSegment('shortHomonym', [ remoteDataItem ], wordItem)
    }
    return wordItem
  }

}
