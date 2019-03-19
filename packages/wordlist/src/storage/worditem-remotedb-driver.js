import RemoteConfig from '@/storage/remote-db-config.json'
import { TextQuoteSelector } from 'alpheios-data-models'

export default class WordItemRemoteDbDriver {
  /**
   * Defines proper headers and uploads config for access to remote storage, defines storageMap
   * @param {Object} auth object with accessToken and userId
   */
  constructor (auth) {
    this.config = RemoteConfig
    this.accessToken = auth.accessToken
    this.userId = auth.userId

    this.requestsParams = {
      baseURL: this.config.baseUrl,
      headers: {
        common: {
          Authorization: 'bearer ' + this.accessToken,
          'Content-Type': 'application/json'
        }
      }
    }

    this.storageMap = {
      post: {
        url: this._constructPostURL.bind(this),
        serialize: this._serialize.bind(this),
        checkResult: this._checkPostResult.bind(this)
      },
      put: {
        url: this._constructPostURL.bind(this),
        serialize: this._serialize.bind(this),
        checkResult: this._checkPutResult.bind(this)
      },
      get: {
        url: this._constructGetURL.bind(this),
        checkResult: this._checkGetResult.bind(this),
        checkErrorResult: this._checkGetErrorResult.bind(this),
      },
      deleteOne: {
        url: this._constructPostURL.bind(this),
        checkResult: this._checkPutResult.bind(this)
      },
      deleteMany: {
        url: this._constructDeleteManyURL.bind(this),
        checkResult: this._checkPutResult.bind(this)
      }
    }
  }

  /**
   * db segments that would be merged
   * @return {String[]} - array with segments name
   */
  get segmentsForUpdate () {
    return ['common', 'context', 'shortHomonym']
  }

 /**
   * db segments that require merging upon update
   */
  get segmentsForMerge () {
    return ['context']
  }

  /**
   * merge current item with new item - common, shortHomonym and context parts
   * @return {WordItem}
   */
  mergeLocalRemote (currentItem, newItem) {
    currentItem = this.mergeCommonPart(currentItem, newItem)
    currentItem = this.mergeHommonymPart(currentItem, newItem)
    currentItem = this.mergeContextPart(currentItem, newItem)
    return currentItem
  }

  /**
   * merge common part to current item from new item
   * @return {WordItem}
   */
  mergeCommonPart  (currentItem, newItem) {
    currentItem.important = currentItem.important || newItem.important
    return currentItem
  }

  /**
   * merge short hommonym part to current item from new item
   * @return {WordItem}
   */
  mergeHommonymPart  (currentItem, newItem) {
    currentItem.homonym = currentItem.homonym || this._serializeHomonym(newItem)
    return currentItem
  }

  /**
   * merge context part to current item from new item
   * @return {WordItem}
   */
  mergeContextPart  (currentItem, newItem) {
    let pushContext = currentItem.context || []
    for (let contextItem of newItem.context) {
      let hasCheck = currentItem.context.some(tqCurrent => {
        return TextQuoteSelector.readObject(tqCurrent).isEqual(contextItem)
      })
      if (!hasCheck) {
        pushContext.push(this._serializeContextItem(contextItem, currentItem))
      }
    }
    currentItem.context = pushContext
    return currentItem
  }

   /**
   * Defines url for creating item in remote storage
   * @param {WordItem} wordItem
   * @return {String}
   */
  _constructPostURL (wordItem) {
    return `/words/${this._makeStorageID(wordItem)}`
  }

   /**
   * Defines url for getting wordItem or wordList from remote storage
   * @param {WordItem} wordItem
   * @return {String}
   */
  _constructGetURL (data) {
    if (data.wordItem) {
      return `/words/${this._makeStorageID(data.wordItem)}`
    }
    if (data.languageCode) {
      return `/words?languageCode=${data.languageCode}`
    }
    return
  }

  /**
   * Defines url for deleting items from wordList from languageCode in remote storage
   * @param {WordItem} wordItem
   * @return {String}
   */
  _constructDeleteManyURL (data) {
    return `/words?languageCode=${data.languageCode}`
  }

  /**
   * Defines ID to use in remote storage
   * @param {WordItem} wordItem
   * @return {String}
   */
  _makeStorageID (wordItem) {
    return wordItem.languageCode + '-' + wordItem.targetWord
  }

  /**
   * Defines json object from wordItem to save to remote storage
   * @param {WordItem} wordItem
   * @return {Object}
   */
  _serialize (wordItem) {
    let result = {
      ID: this._makeStorageID(wordItem),
      listID: this.userId + '-' + wordItem.languageCode,
      userID: this.userId,
      languageCode: wordItem.languageCode,
      targetWord: wordItem.targetWord,
      important: wordItem.important,
      createdDT: WordItemRemoteDbDriver.currentDate
    }

    let homonym = this._serializeHomonym(wordItem)
    if (homonym) {
      result.homonym = homonym
    }
    let context = this._serializeContext(wordItem)

    if (context && context.length > 0) {
      result.context = context
    } else {
      result.context = []
    }
    return result
  }

  /**
   * Defines json object from homonym to save to remote storage
   * @param {WordItem} wordItem
   * @return {Object}
   */
  _serializeHomonym (wordItem) {
    if (wordItem.homonym && wordItem.homonym.targetWord) {
      return {
        targetWord: wordItem.homonym.targetWord,
        lemmasList: wordItem.lemmasList
      }
    }
    return null
  }

  /**
   * Defines json object from textQuoteSelectors to save to remote storage
   * @param {WordItem} wordItem
   * @return {Object[]}
   */
  _serializeContext (wordItem) {
    let result = []
    for (let tq of wordItem.context) {
      result.push(this._serializeContextItem(tq, wordItem))
    }
    return result
  }


  /**
   * Defines json object from a single textQuoteSelector to save to remote storage
   * @param {WordItem} wordItem
   * @return {Object[]}
   */
  _serializeContextItem (tq, wordItem) {
    return {
      target: {
        source: tq.source,
        selector: {
          type: 'TextQuoteSelector',
          exact: tq.text,
          prefix: tq.prefix && tq.prefix.length > 0 ? tq.prefix : ' ',
          suffix: tq.suffix && tq.suffix.length > 0 ? tq.suffix : ' ',
          languageCode: tq.languageCode
        }
      },
      languageCode: wordItem.languageCode,
      targetWord: wordItem.targetWord,
      createdDT: WordItemRemoteDbDriver.currentDate
    }
  }

  /**
   * Checks status of response (post) from remote storage
   * @param {WordItem} wordItem
   * @return {Boolean}
   */
  _checkPostResult (result) {
    return result.status === 201
  }

  /**
   * Checks status of response (put) from remote storage
   * @param {WordItem} wordItem
   * @return {Boolean}
   */
  _checkPutResult (result) {
    return result.status === 200
  }

  /**
   * Checks status of response (get) from remote storage
   * @param {WordItem} wordItem
   * @return {Object/Object[]}
   */
  _checkGetResult (result) {
    if (result.status !== 200) {
      return []
    }
    if (Array.isArray(result.data)) {
      return result.data.map(item => item.body ? item.body : item)
    } else {
      return [ result.data ]
    }
  }

  /**
   * Checks status of response error (get) from remote storage
   * If error message consists of 'Item not found.' - it is not an error. Return empty error instead of error.
   * @param {Error} error
   * @return {[]/Boolean}
   */
  _checkGetErrorResult (error) {
    if (error.response && error.response.data && (error.response.data.error === 'Item not found.')) {
      return []
    } else {
      return false
    }
  }

  /**
   * Defines date
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
   * Creates array is IDs from wordItems for comparing with remote storage data
   * @param {WordItem[]} wordItems
   * @return {String[]}
   */
  getCheckArray (dataItems) {
    return dataItems.map(item => this._makeStorageID(item))
  }
}
