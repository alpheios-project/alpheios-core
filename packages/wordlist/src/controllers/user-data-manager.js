import WordItemIndexedDbDriver from '@/storage/worditem-indexeddb-driver.js'
import WordItemRemoteDbDriver from '@/storage/worditem-remotedb-driver.js'
import IndexedDBAdapter from '@/storage/indexed-db-adapter.js'
import RemoteDBAdapter from '@/storage/remote-db-adapter.js'

export default class UserDataManager {

  /**
   * Creates with auth argument, subscribe to WordItem and WorList events, inits blocked property and request queue
   * @param {AuthModule} auth - auth object with userId and accessToken properties
   * @param {String} events - events object of the WordlistController, passed in UIController
   */
  constructor (auth, events) {
    this.auth = auth
    this.subscriptions = []
    if (events) {
      this.subscriptions.push(events.WORDITEM_UPDATED.sub(this.update.bind(this)))
      this.subscriptions.push(events.WORDITEM_DELETED.sub(this.delete.bind(this)))
      this.subscriptions.push(events.WORDLIST_DELETED.sub(this.deleteMany.bind(this)))
    }
    this.blocked = false
    this.requestsQueue = []
  }

  /**
   * Clear this instance
   * TODO we should make the UserDataManager a singleton so that it can
   * fully accomodate switching users gracefully
   */
  clear() {
    if (this.blocked) {
      // TODO we should wait on the request queue completion
      console.warn("Alpheios warn: destroying user data manager with requests pending. Words may not all be deleted.")
    }
    for (let unsub of this.subscriptions) {
      unsub()
    }
    this.subscriptions = []
  }

  /**
   * Initializes IndexedDBAdapter with appropriate local dbDriver (WordItemIndexedDbDriver)
   * @param {String} dataType - data type for choosing a proper dbDriver (WordItem)
   * @return {IndexedDBAdapter}
   */
  _localStorageAdapter(dataType) {
    let dbDriver = new UserDataManager.LOCAL_DRIVER_CLASSES[dataType](this.auth.userId)
    return new IndexedDBAdapter(dbDriver)
  }

  /**
   * Initializes RemoteDBAdapter with appropriate remote dbDriver (WordItemRemoteDbDriver)
   * @param {String} dataType - data type for choosing a proper dbDriver (WordItem)
   * @return {RemoteDBAdapter}
   */
  _remoteStorageAdapter(dataType) {
    let dbDriver = new UserDataManager.REMOTE_DRIVER_CLASSES[dataType](this.auth)
    return new RemoteDBAdapter(dbDriver)
  }

  /**
   * Checks availability of remote and local adapter according to params.source value
   * @param {String} dataType - data type for choosing a proper dbDriver (WordItem)
   * @return {RemoteDBAdapter}
   */
  checkAdapters (localAdapter, remoteAdapter, params) {
    let localCheck = false
    let remoteCheck = false

    if (params.source === 'remote') {
      localCheck = true
      remoteCheck = remoteAdapter.available
    } else if (params.source === 'local') {
      localCheck = localAdapter.available
      remoteCheck = true
    } else {
      localCheck = localAdapter.available
      remoteCheck = remoteAdapter.available
      if (!localAdapter.available) {
        this.printErrorAdapterUnvailable(localAdapter)
      }
      if (!remoteAdapter.available) {
        this.printErrorAdapterUnvailable(remoteAdapter)
      }
    }

    return localCheck && remoteCheck
  }

  printErrorAdapterUnvailable(adapter) {
    console.error(`Alpheios error: user data adapter is not available - ${adapter.constructor.name}`)
  }

  /**
   * Promise-based method - updates object in local/remote storage
   * uses blocking workflow:
   * @param {Object} data
   * @param {WordItem} data.dataObj - object for saving to local/remote storage
   * @param {WordItem} data.params - could have segment property to define exact segment for updating
   * @param {Object} [params={}] - additional parameters for updating, now it is only params.source = [local, remote, both]
   * @return {Boolean} true if updated successful, false if not
   */
  async update(data, params = {}) {
    if (this.blocked) {
      this.requestsQueue.push({
        method: 'update',
        data, params
      })
      return
    }
    try {
      params.source = params.source||'both'
      let finalConstrName = this.defineConstructorName(data.dataObj.constructor.name)

      let localAdapter = this._localStorageAdapter(finalConstrName)
      let remoteAdapter = this._remoteStorageAdapter(finalConstrName)

      let result = false
      let segment = data.params && data.params.segment ? data.params.segment : localAdapter.dbDriver.segments

      if (this.checkAdapters(localAdapter, remoteAdapter, params)) {
        this.blocked = true
        if (params.source === 'local') {
          result = await localAdapter.update(data.dataObj, data.params)
        } else if (params.source === 'remote') {
          result = await remoteAdapter.update(data.dataObj, data.params)
        } else {
          let currentRemoteItems = await remoteAdapter.checkAndUpdate(data.dataObj, segment)
          result = await localAdapter.checkAndUpdate(data.dataObj, segment, currentRemoteItems)
        }

        this.printErrors(remoteAdapter)
        this.printErrors(localAdapter)

        this.blocked = false
        this.checkRequestQueue()
      }
      return result
    } catch (error) {
      console.error('Alpheios error: unexpected error updating user data.', error)
    }
  }

  /**
   * Promise-based method - deletes single object in local/remote storage
   * uses blocking workflow:
   * @param {Object} data
   * @param {WordItem} data.dataObj - object for saving to local/remote storage
   * @param {WordItem} data.params - could have segment property to define exact segment for updating
   * @param {Object} [params={}] - additional parameters for updating, now it is only params.source = [local, remote, both]
   * @return {Boolean} true if deleted successful, false if not
   */
  async delete(data, params = {}) {
    if (this.blocked) {
      this.requestsQueue.push({
        method: 'delete',
        data, params
      })
      return
    }
    try {
      this.blocked = true
      let finalConstrName = this.defineConstructorName(data.dataObj.constructor.name)

      let localAdapter = this._localStorageAdapter(finalConstrName)
      let remoteAdapter = this._remoteStorageAdapter(finalConstrName)

      let remoteResult = false
      let localResult = false

      if (this.checkAdapters(localAdapter, remoteAdapter, params)) {
        this.blocked = true

        remoteResult = true
        localResult = true

        if (params.source !== 'local') {
          remoteResult = await remoteAdapter.deleteOne(data.dataObj)
        }
        if (params.source !== 'remote') {
          localResult = await localAdapter.deleteOne(data.dataObj)
        }

        this.printErrors(remoteAdapter)
        this.printErrors(localAdapter)

        this.blocked = false
        this.checkRequestQueue()
      }
      return remoteResult && localResult
    } catch (error) {
      console.error('Alpheios error: unexpected error deleting user data.', error.message)
    }
  }

  /**
   * Promise-based method - deletes all objects from the wordlist by languageCode in local/remote storage
   * uses blocking workflow:
   * @param {Object} data
   * @param {String} data.languageCode - languageCode of Wordlist to be deleted
   * @param {WordItem} data.params - could have segment property to define exact segment for updating
   * @param {Object} [params={ source: both }] - additional parameters for updating, now it is only params.source = [local, remote, both]
   * @return {Boolean} true if deleted successful, false if not
   */
  async deleteMany(data, params = {}) {
    if (this.blocked) {
      this.requestsQueue.push({
        method: 'deleteMany',
        data, params
      })
      return
    }
    try {

      let remoteAdapter =  this._remoteStorageAdapter(data.dataType)
      let localAdapter = this._localStorageAdapter(data.dataType)

      let deletedLocal = false
      let deletedRemote = false

      if (this.checkAdapters(localAdapter, remoteAdapter, params)) {
        deletedLocal = true
        deletedRemote = true

        this.blocked = true
        if (params.source !== 'local') {
          deletedRemote = await remoteAdapter.deleteMany(data.params)
        }
        if (params.source !== 'remote') {
          deletedLocal = await localAdapter.deleteMany(data.params)
        }

        this.printErrors(remoteAdapter)
        this.printErrors(localAdapter)

        this.blocked = false
        this.checkRequestQueue()
      }

      return deletedLocal && deletedRemote
    } catch (error) {
      console.error('Alpheios error: unexpected error deleting user data.', error.message)
    }
  }

  /**
   * Promise-based method - queries all objects from the wordlist by languageCode , only for only one wordItem
   * or one wordItem from local/remote storage
   * @param {Object} data
   *                 data.languageCode - for quering all wordItems from wordList by languageCode
   *                 data.wordItem - for quering one wordItem
   *                 data.params - type specific query parameters
   * @param {Object} [params={ source: both, type: short, syncDelete: false }] - additional parameters for updating, now there are the following:
   *                  params.source = [local, remote, both]
   *                  params.type = [short, full] - short - short data for homonym, full - homonym with definitions data
   *                  params.syncDelete = [true, false] - if true (and params.source = both, and languageCode is defined in params),
   *                                      than localItems would be compared with remoteItems, items that are existed only in local would be removed
   * @return {WordItem[]}
   */
  async query (data, params = {}) {
    try {
      params.type = params.type||'short'
      params.source = params.source||'both'
      params.syncDelete = params.syncDelete||false

      let remoteAdapter =  this._remoteStorageAdapter(data.dataType)
      let localAdapter = this._localStorageAdapter(data.dataType)

      let finalItems = []
      let remoteItems

      if (params.source === 'local') {
        finalItems = await localAdapter.query(data.params)
      } else if (params.source === 'remote') {
        remoteItems = await remoteAdapter.query(data.params)
        for(let remoteItem of remoteItems) {
          finalItems.push(localAdapter.dbDriver.createFromRemoteData(remoteItem))
        }
      } else {
        remoteItems = await remoteAdapter.query(data.params)
        if (params.type === 'full') {
          for (let remoteItem of remoteItems) {
            await localAdapter.checkAndUpdate(remoteItem, data.params.segment, [remoteItem])
          }
          let localItems = await localAdapter.query(data.params)
          finalItems = localItems
        } else {
          remoteItems = await remoteAdapter.query(data.params)
          for(let remoteItem of remoteItems) {
            let wordItem = localAdapter.dbDriver.createFromRemoteData(remoteItem)
            finalItems.push(wordItem)
            localAdapter.checkAndUpdate(wordItem, null, [remoteItem])
          }
        }
        if (params.syncDelete && data.params.languageCode) {
          this.deleteAbsentInRemote(localAdapter, remoteItems, data.params.languageCode)
        }
      }

      this.printErrors(remoteAdapter)
      this.printErrors(localAdapter)
      return finalItems
    } catch (error) {
      console.error('Alpheios error: unexpected error querying user data.', error.message)
    }
  }

  async deleteAbsentInRemote (localAdapter, remoteItems, languageCode) {
    let localItems = await localAdapter.query({ languageCode })
    for (let localItem of localItems) {
      let checkID  = localAdapter.dbDriver.makeIDCompareWithRemote(localItem)
      if (!remoteItems.find(remoteItem => remoteItem.ID === checkID)) {
        this.delete({ dataObj: localItem})
      }
    }
  }

  /**
   * Method prints errors from the errors property of the given adapter
   */
  printErrors (adapter) {
    if (adapter.errors && adapter.errors.length > 0) {
      adapter.errors.forEach(error => console.error(`Alpheios error: user data unexpected error - ${error}`))
    }
  }

  /**
   * Method checks request queue, and if it is not empty executes the first in the queue
   */
  checkRequestQueue () {
    if (this.requestsQueue.length > 0) {
      let curRequest = this.requestsQueue.shift()
      this[curRequest.method](curRequest.data, curRequest.params)
    }
  }

  /**
   * Checks and formats Class name (if neccessary) to a normal state (after uglifying pugins)
   * @param {String} sourceConstrName recieved class name
   * @return {String} formatted class name
   */
  defineConstructorName (sourceConstrName) {
    let firstLetter = sourceConstrName.substr(0,1)
    let finalConstrName

    if (firstLetter == firstLetter.toUpperCase()) {
      finalConstrName = sourceConstrName
    } else {
      let removed = sourceConstrName.split('_').length-1
      let classNameStart = sourceConstrName.replace('_', '').toLowerCase().length/2
      finalConstrName = sourceConstrName.substr(-(classNameStart+removed-2))
    }
    return finalConstrName
  }
}

// Constants (could be done better, dynamically, etc.)
UserDataManager.LOCAL_DRIVER_CLASSES = {
  WordItem: WordItemIndexedDbDriver
}
UserDataManager.REMOTE_DRIVER_CLASSES = {
  WordItem: WordItemRemoteDbDriver
}
