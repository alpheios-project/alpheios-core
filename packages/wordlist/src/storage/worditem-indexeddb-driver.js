import WordItem from '@/lib/word-item'
import { Homonym } from 'alpheios-data-models'

export default class WordItemIndexedDbDriver {

  /**
   * @constructor
   * @param {String} userId user id for the database
   */
  constructor(userId) {
    this.userId = userId
    this.storageMap = {
      common: {
        objectStoreName: 'WordListsCommon',
        serialize: this._serializeCommon.bind(this),
        delete: this._segmentDeleteQueryByID.bind(this)
      },
      context: {
        objectStoreName: 'WordListsContext',
        serialize: this._serializeContext.bind(this),
        load: this._loadContext,
        delete: this._segmentDeleteQueryByWordItemID.bind(this)
      },
      shortHomonym: {
        objectStoreName: 'WordListsHomonym',
        serialize: this._serializeHomonym.bind(this),
        load: this._loadHomonym,
        delete: this._segmentDeleteQueryByID.bind(this)
      },
      fullHomonym: {
        objectStoreName: 'WordListsFullHomonym',
        serialize: this._serializeHomonymWithFullDefs.bind(this),
        load: this._loadHomonym,
        delete: this._segmentDeleteQueryByID.bind(this)
      }
    }
  }

  /**
  * dbName getter
  */
  get dbName () {
    return 'AlpheiosWordLists'
  }

  /**
   * dbVersion getter
   */
  get dbVersion () {
    return 3
  }

  /**
   * db segments getter
   */
  get segments() {
    return Object.keys(this.storageMap)
  }

  /**
   * objectStores getter
   * @return {Object} the IndexedDb objectStores for the WordItems
   */
  get objectStores () {
    return Object.keys(this.storageMap).map(k => this.storageMap[k].objectStoreName)
  }

  /**
   * getter for the Common segment store
   */
  get WordListsCommon () {
    return this._objectStoreTemplate()
  }

  /**
   * getter for the Context segment store
   */
  get WordListsContext () {
    let structure = this._objectStoreTemplate()
    structure.indexes.push(
      { indexName: 'wordItemID', keyPath: 'wordItemID', unique: false}
    )
    return structure
  }

  /**
   * getter for the Homonym segment store
   */
  get WordListsHomonym () {
    return this._objectStoreTemplate()
  }

  /**
   * getter for the Full Homonym segment store
   */
  get WordListsFullHomonym () {
    return this._objectStoreTemplate()
  }


  /**
   * load a data model object from the database
   */
  load(data) {
    // make sure when we create from the database
    // that the currentSession flag is set to false
    data.currentSession = false
    return new WordItem(data)
  }

  /**
   * load a segment of a data model object from the database
   */
  loadSegment(segment,dataObj,data) {
    if (this.storageMap[segment].load) {
      this.storageMap[segment].load(dataObj,data)
    }
  }

  /**
   * get a query object which retrieves a segment of an item
   * @param {String} segment segment name
   * @param {WordItem} worditem the worditem object
   * @return {Object} IndexedDBQuery object
   */
  segmentQuery(segment,worditem) {
    let id = this._makeStorageID(worditem)
    let index = segment === 'context' ? 'wordItemID' : 'ID'
    return {
      objectStoreName: this.storageMap[segment].objectStoreName,
      condition: {indexName: index, value: id, type: 'only' }
    }
  }

  segmentDeleteQuery (segment,worditem) {
    return this.storageMap[segment].delete(segment,worditem)
  }

  _segmentDeleteQueryByID(segment,worditem) {
    let ID = this._makeStorageID(worditem)
    return {
      objectStoreName: this.storageMap[segment].objectStoreName,
      condition: { indexName: 'ID', value: ID, type: 'only' }
    }
  }

  _segmentDeleteQueryByWordItemID(segment,worditem) {
    let ID = this._makeStorageID(worditem)
    return {
      objectStoreName: this.storageMap[segment].objectStoreName,
      condition: { indexName: 'wordItemID', value: ID, type: 'only' }
    }
  }


  segmentDeleteManyQuery(segment,params) {
    if (params.languageCode) {
      let listID = this.userId + '-' + params.languageCode
      return  {
        objectStoreName: this.storageMap[segment].objectStoreName,
        condition: { indexName: 'listID', value: listID, type: 'only' }
      }
    } else {
      // TODO throw error
    }
  }

  updateSegmentQuery(segment,data) {
    let dataItems = []
    let resDataItem = this.storageMap[segment].serialize(data)
    if (!Array.isArray(resDataItem)) {
      dataItems.push(resDataItem)
    } else {
      dataItems = dataItems.concat(resDataItem)
    }
    return {
      objectStoreName: this.storageMap[segment].objectStoreName,
      dataItems: dataItems
    }
  }

  /**
   * get a query object which retrieves a list of WordItems
   * @param {Object} params query parameters
   * @return {Object} IndexedDBQuery object
   */
  listQuery(params) {
    if (params.languageCode) {
      let listID = this.userId + '-' + params.languageCode
      return {
        objectStoreName: this.storageMap.common.objectStoreName,
        condition: {indexName: 'listID', value: listID, type: 'only' }
      }
    } else {
      throw new Error("Invalid query parameters - missing languageCode")
      // TODO throw error
    }
  }

  /**
   * private method to load the Homonym property of a WordItem
   */
  _loadHomonym (worditem,jsonObj) {
    worditem.homonym = WordItem.readHomonym(jsonObj[0])
  }

  /**
   * private method to load the Context property of a WordItem
   */
  _loadContext (worditem, jsonObjs) {
    if (! Array.isArray(jsonObjs)) {
      jsonObjs = [jsonObjs]  
    }
    worditem.context = WordItem.readContext(jsonObjs)
  }

  /**
   * private method to convert the common segment to storage
   */
  _serializeCommon (worditem) {
    return {
      ID: this._makeStorageID(worditem),
      listID: this.userId + '-' + worditem.languageCode,
      userID: this.userId,
      languageCode: worditem.languageCode,
      targetWord: worditem.targetWord,
      important: worditem.important,
      createdDT: WordItemIndexedDbDriver.currentDate
    }
  }

  /**
   * private method to convert the context segment to storage
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
            prefix: tq.prefix,
            suffix: tq.suffix,
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
   * private method to convert the homonym segment to storage
   * @param {WordItem}
   */
  _serializeHomonym (worditem,addMeaning = false) {
    let resultHomonym = worditem.homonym && (worditem.homonym instanceof Homonym) ? worditem.homonym.convertToJSONObject(addMeaning) : {}
    return {
      ID: this._makeStorageID(worditem),
      listID: this.userId + '-' + worditem.languageCode,
      userID: this.userId,
      languageCode: worditem.languageCode,
      targetWord: worditem.targetWord,
      homonym: resultHomonym
    }
  }

  /**
   * private method to serialize homonymns with full defs
   * @param {WordItem}
   */
  _serializeHomonymWithFullDefs (worditem) {
    return this._serializeHomonym(worditem,true)
  }

  /**
  * private method to create the storage ID for a WordItem
  */
  _makeStorageID(item) {
    return this.userId + '-' + item.languageCode + '-' + item.targetWord
  }

  /**
   * private method - creates a template for a new Object Store
   */
  _objectStoreTemplate () {
    return {
      keyPath: 'ID',
      indexes: [
        { indexName: 'ID', keyPath: 'ID', unique: true},
        { indexName: 'listID', keyPath: 'listID', unique: false},
        { indexName: 'userID', keyPath: 'userID', unique: false},
        { indexName: 'languageCode', keyPath: 'languageCode', unique: false},
        { indexName: 'targetWord', keyPath: 'targetWord', unique: false}
      ]
    }
  }

  static get currentDate () {
    let dt = new Date()
    return dt.getFullYear() + '/'
        + ((dt.getMonth()+1) < 10 ? '0' : '') + (dt.getMonth()+1)  + '/'
        + ((dt.getDate() < 10) ? '0' : '') + dt.getDate() + ' @ '
                + ((dt.getHours() < 10) ? '0' : '') + dt.getHours() + ":"
                + ((dt.getMinutes() < 10) ? '0' : '') + dt.getMinutes() + ":"
                + ((dt.getSeconds() < 10) ? '0' : '') + dt.getSeconds()

  }

}
