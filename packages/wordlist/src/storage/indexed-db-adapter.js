import StorageAdapter from '@/storage/storage-adapter.js'
import IndexedDBStructure from '@/storage/indexed-db-structure.js'

/**
 * An implementation of a StorageAdapter interface for a local storage.
 */
export default class IndexedDBAdapter extends StorageAdapter {
  
  constructor (domain = 'alpheios-storage-domain') {
    super(domain)

    this.available = this.initIndexedDBNamespaces()
    this.dbData = new IndexedDBStructure()
  }

  /**
   * This method checks if IndexedDB is used in the current browser
   */
  initIndexedDBNamespaces () {
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    if (!this.indexedDB) {
      console.info("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return false
    }
    return true
  }

  /**
   * This method create a request for opening database and passes callbacks for two events
   */
  openDatabase (upgradeCallback, successCallback) {
    let request = this.indexedDB.open(this.dbName, this.currentVersion)
    request.onerror = (event) => {
      console.info('*************Some problems with opening LabirintOrders', event.target)
    }
    request.onsuccess = successCallback
    request.onupgradeneeded = upgradeCallback
    return request
  }

  async set (data) {
    let promiseOpenDB = await new Promise((resolve, reject) => {
      let request = this.indexedDB.open(this.dbData.dbName, this.dbData.dbVersion)
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        this.dbData.createObjectStores(db)
      }
      request.onsuccess = async (event) => {
        const db = event.target.result
        await this.putItem(db, data)
        resolve()
      }
      request.onerror = (event) => {
        reject()
      }
    })
    return promiseOpenDB
  }

  async putItem (db, data) {
    let promisePut = await new Promise((resolve, reject) => {
      const transaction = db.transaction([data.objectStoreName], 'readwrite')
      transaction.onerror = (event) => {
        reject()
      }
      const objectStore = transaction.objectStore(data.objectStoreName)
      let objectsDone = data.dataItems.length
      for (let dataItem of data.dataItems) {
        const requestPut = objectStore.put(dataItem)
        requestPut.onsuccess = () => {
          objectsDone = objectsDone - 1
          if (objectsDone === 0) {
            resolve()
          }
        }
        requestPut.onerror = () => {
          reject()
        }
      }
    })
    return promisePut
  }

  async get (data) {
    let promiseOpenDB = await new Promise((resolve, reject) => {
      let request = this.indexedDB.open(this.dbData.dbName, this.dbData.dbVersion)
      request.onsuccess = (event) => {
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
          reject()
        }        
      }
      request.onerror = (event) => {
        reject()
      }
    })
    return promiseOpenDB
  }

  async delete (data) {
    let promiseOpenDB = await new Promise((resolve, reject) => {
      let request = this.indexedDB.open(this.dbData.dbName, this.dbData.dbVersion)

      request.onsuccess = (event) => {
        const db = event.target.result
        const transaction = db.transaction([data.objectStoreName], 'readwrite')
        const objectStore = transaction.objectStore(data.objectStoreName)

        const index = objectStore.index(data.condition.indexName)
        const keyRange = this.IDBKeyRange[data.condition.type](data.condition.value)

        let requestOpenCursor = index.openCursor(keyRange)
        requestOpenCursor.onsuccess = (event) => {
          const cursor = event.target.result
          if (cursor) {
            const requestDelete = cursor.delete()
            requestDelete.onerror = (event) => {
              reject()
            }
            cursor.continue()
          } else {
            resolve()
          }
        }
      }

      request.onerror = (event) => {
        reject()
      }
    })

    return promiseOpenDB
  }
}