export default class IndexedDBStructure {
  get dbName () {
    return 'AlpheiosWordLists'
  }

  get dbVersion () {
    return 2
  }

  get objectStores () {
    return {
      WordListsCommon: this.wordListsCommon,
      WordListsContext: this.wordListsContext,
      WordListsHomonym: this.wordListsHomonym,
      WordListsFullHomonym: this.wordListsFullHomonym
    }
  }

  get objectStoreTemplate () {
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

  get wordListsCommon () {
    return this.objectStoreTemplate
  }

  get wordListsContext () {
    let structure = this.objectStoreTemplate
    structure.indexes.push(
      { indexName: 'wordItemID', keyPath: 'wordItemID', unique: false}
    )
    return structure
  }

  get wordListsHomonym () {
    return this.objectStoreTemplate
  }

  get wordListsFullHomonym () {
    return this.objectStoreTemplate
  }

  createObjectStores (db, upgradeTransaction) {
    Object.keys(this.objectStores).forEach(objectStoreName => {
      const objectStoreStructure = this.objectStores[objectStoreName]

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
  }
}
