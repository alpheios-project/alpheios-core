/**
 * An interface to IndexedDB Storage
 */
export default class IndexedDBAdapter {

  /**
   * @param {String} domain the storage domain
   * @param {Object} dbDriver a driver for a specific data type
   */
  constructor (dbDriver) {
    this.available = this._initIndexedDBNamespaces()
    this.dbDriver = dbDriver
    this.errors = []
  }

  /**
   * Create a new data item in the data base
   * @param {Object} data the data model item to be created
   * @return {Boolean} true if create succeeded false if not
   */
  async create(data) {
    try {
      let segments = this.dbDriver.segments
      let updated
      // iterate through the declared segmentation of the object
      // and store accordingly
      // TODO we need transaction handling here
      for (let segment of segments) {
        updated = await this.update(data, {segment: segment})
        if (! updated) {
          throw new Error(`Unknown problems with updating segment ${segment}`)
        }
      }
      return updated > 0
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return
    }
  }

  /**
   * Clear the datastore of many items of a given type
   * @param {Object} params data type specific parameters for identifying the items
   *                        to be deleted
   * @return {int} number of items deleted
   *
   */
  async deleteMany(params) {
    try {
      let deletedResult = {}
      for (let segment of this.dbDriver.segments) {
        let q = this.dbDriver.segmentDeleteManyQuery(segment,params)
        let deletedItems = await this._deleteFromStore(q)
        deletedResult[segment] = deletedItems
      }
      return deletedResult
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return
    }
  }

  /**
   * Remove a single item from the data store
   * @param {Object} data the deta model object to be deleted
   * @return {int} number of items deleted
   *
   */
  async deleteOne(data) {
    try {
      for (let segment of this.dbDriver.segments) {
        let q = this.dbDriver.segmentDeleteQuery(segment,data)
        await this._deleteFromStore(q)
      }
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return
    }
  }

  /**
   * Update a data item, creating it if it doesn't exist
   * @param {Object} data the data model object to update
   * @param {Object} params update params
   *                  { segment: name of segment needing update }
   * @return {Boolean} true if update succeeded false if not
   */
  async update (data, params) {
    try {
      let segments = [params.segment]
      let result
      // if we weren't asked to update a specific segment, update them all
      if (segments.length === 0)  {
        segments = this.dbDriver.segments
      }
      for (let s of segments) {
        let q = this.dbDriver.updateSegmentQuery(s,data)
        result = await this._set(q)
      }
      return result
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return
    }
  }

  /**
   * Query for a set of data items
   * @param {Object} params datatype specific query parameters
   * @return Object[] array of data model items
   */
  async query(params) {
    try {
      let listQuery = this.dbDriver.listQuery(params)
      let queryResult = await this._getFromStore(listQuery)
      
      let items = []
      if (queryResult.length > 0) {
        for (let item of queryResult) {
          let modelObj = this.dbDriver.load(item)
  
          let segments = this.dbDriver.segments
          for (let segment of segments) {
            let query = this.dbDriver.segmentQuery(segment, modelObj)
  
            let res = await this._getFromStore(query)
            if (res.length > 0) {
              this.dbDriver.loadSegment(segment, modelObj, res)
            }
          }
          items.push(modelObj)
        }
      }
      return items
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return []
    }
  }

  /**
   * Clear all the object stores
   * Used primarily for testing right now
   * TODO needs to be enhanced to support async removal of old database versions
   */
  clear () {
    let request = this.indexedDB.open(this.dbDriver.dbName, this.dbDriver.dbVersion)
    request.onsuccess = (event) => {
      try {
        let db = event.target.result
        let objectStores = this.dbDriver.objectStores
        for (let store of objectStores) {
          // open a read/write db transaction, ready for clearing the data
          let transaction = db.transaction([store], 'readwrite')
          // create an object store on the transaction
          let objectStore = transaction.objectStore(store)
          // Make a request to clear all the data out of the object store
          let objectStoreRequest = objectStore.clear()
          objectStoreRequest.onsuccess = function(event) {
            console.log(`store ${store} cleared`)
          }
          objectStoreRequest.onerror = function(event) {
            this.errors.push(event.target)
          }
        }
      } catch (error) {
        this.errors.push(error)
      }
    }
    request.onerror = (event) => {
      this.errors.push(event.target)
    }
  }



  /**
   * This method checks if IndexedDB is used in the current browser
   */
  _initIndexedDBNamespaces () {
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    if (!this.indexedDB) {
      console.warn("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return false
    }
    return true
  }


  /**
   * utility method ot open a database. Sets a callback which causes the database to be created if it doesn't exist
   */
  _openDatabaseRequest () {
    let request = this.indexedDB.open(this.dbDriver.dbName, this.dbDriver.dbVersion)
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      const upgradeTransaction = event.target.transaction
      this._createObjectStores(db, upgradeTransaction)
      // TODO we should clean up old database versions
    }
    return request
  }

  /**
   * Iniitalize the object store(s) for for an IndexedDb adapter
   */
  _createObjectStores (db, upgradeTransaction) {
    try {
      let objectStores = this.dbDriver.objectStores
      objectStores.forEach(objectStoreName => {
        const objectStoreStructure = this.dbDriver[objectStoreName]

        let objectStore
        if (!db.objectStoreNames.contains(objectStoreName)) {
          objectStore = db.createObjectStore(objectStoreName, { keyPath: objectStoreStructure.keyPath })
        } else {
          objectStore = upgradeTransaction.objectStore(objectStoreName)
        }
        objectStoreStructure.indexes.forEach(index => {
          if (!objectStore.indexNames.contains(index.indexName)) {
            objectStore.createIndex(index.indexName, index.keyPath, { unique: index.unique })
          }
        })
      })
    } catch (error) {
      this.errors.push(error)
    }
  }

  /**
   * Internal method to open a database and update one or items in a specific store
   * @param {Object} data data item to be updated  in the format
   *                      { objectStoreName: name of the object store,
   *                        dataItems: array of data items to be updated }
   * @return {Promise} resolves to true on success
   */
  async _set (data) {
    let idba = this

    let promiseOpenDB = await new Promise((resolve, reject) => {
      let request = this._openDatabaseRequest()
      request.onsuccess = async (event) => {
        const db = event.target.result
        let rv = await this._putItem(db, data)
        resolve(rv)
      }
      request.onerror = (event) => {
        idba.errors.push(event.target)
        reject()
      }
    })
    return promiseOpenDB
  }

  /**
   * Internal method to put an item into a database
   * @param {} db the database handle
   * @param {Object} data data item to be updated  in the format
   *                      { objectStoreName: name of the object store,
   *                        dataItems: array of data items to be updated }
   * @return {Promise} resolves to true on success
   */
  async _putItem (db, data) {
    let idba = this

    let promisePut = await new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction([data.objectStoreName], 'readwrite')
        transaction.onerror = (event) => {
          idba.errors.push(event.target)
          reject()
        }
        const objectStore = transaction.objectStore(data.objectStoreName)
        let objectsDone = data.dataItems.length
        for (let dataItem of data.dataItems) {
          const requestPut = objectStore.put(dataItem)
          requestPut.onsuccess = () => {
            objectsDone = objectsDone - 1
            if (objectsDone === 0) {
              resolve(true)
            }
          }
          requestPut.onerror = () => {
            idba.errors.push(event.target)
            reject()
          }
        }
      } catch (error) {
        if (error) {
          idba.errors.push(error)
          return
        }
      }
    })
    return promisePut
  }

  /**
   * Internal method to get an item from a database store
   * @param {Object} data data item to be retrieved  in the format
   *                      { objectStoreName: name of the object store,
   *                        condition: query parameters }
   * @return {Promise} resolves to the retrieved items
   */
  async _getFromStore (data) {
    let idba = this
    let promiseOpenDB = await new Promise((resolve, reject) => {
      let request = this._openDatabaseRequest()
      request.onsuccess = (event) => {
        try {
          const db = event.target.result
          const transaction = db.transaction([data.objectStoreName])
          const objectStore = transaction.objectStore(data.objectStoreName)

          const index = objectStore.index(data.condition.indexName)
          const keyRange = this.IDBKeyRange[data.condition.type](data.condition.value)
          
          const requestOpenCursor = index.getAll(keyRange, 0)
          requestOpenCursor.onsuccess = (event) => {
            resolve(event.target.result)
          }

          requestOpenCursor.onerror = (event) => {
            idba.errors.push(event.target)
            reject()
          }
        } catch (error) {
          idba.errors.push(error)
          reject()
        }
      }
      request.onerror = (event) => {
        reject(event.target)
      }
    })
    return promiseOpenDB
    
  }

  /**
   * Internal method to delete an item from  a specific data store
   * @param {Object} data data item to be retrieved  in the format
   *                      { objectStoreName: name of the object store,
   *                        condition: query parameters }
   * @return {Promise} resolves to the number of deleted items
   */
  async _deleteFromStore (data) {
    let idba = this
    let promiseOpenDB = await new Promise((resolve, reject) => {
      let request = this._openDatabaseRequest()
      request.onsuccess = (event) => {
        try {
          const db = event.target.result
          const transaction = db.transaction([data.objectStoreName], 'readwrite')
          const objectStore = transaction.objectStore(data.objectStoreName)

          const index = objectStore.index(data.condition.indexName)
          const keyRange = this.IDBKeyRange[data.condition.type](data.condition.value)

          let requestOpenCursor = index.openCursor(keyRange)
          let deletedItems = 0
          requestOpenCursor.onsuccess = (event) => {
            const cursor = event.target.result
            if (cursor) {
              const requestDelete = cursor.delete()
              requestDelete.onerror = (event) => {
                idba.errors.push(event.target)
                reject()
              }
              requestDelete.onsuccess = (event) => {
                deletedItems = deletedItems + 1
              }
              cursor.continue()
            } else {
              resolve(deletedItems)
            }
          }
        } catch (error) {
          idba.errors.push(error)
          reject()
        }
      }

      request.onerror = (event) => {
        idba.errors.push(event.target)
        reject()
      }
    })

    return promiseOpenDB
  }

}