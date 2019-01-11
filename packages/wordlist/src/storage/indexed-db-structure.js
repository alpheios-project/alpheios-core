export default class IndexedDBStructure {
  get dbName () {
    return 'AlpheiosWordLists'
  }

  get dbVersion () {
    return 1
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
    return this.objectStoreTemplate
  }

  get wordListsHomonym () {
    return this.objectStoreTemplate
  }

  get wordListsFullHomonym () {
    return this.objectStoreTemplate
  }

  createObjectStores (db) {
    Object.keys(this.objectStores).forEach(objectStoreName => {
      const objectStoreStructure = this.objectStores[objectStoreName]

      console.info('*************objectStoreStructure', objectStoreName, objectStoreStructure)
      const objectStore = db.createObjectStore(objectStoreName, { keyPath: objectStoreStructure.keyPath })
      objectStoreStructure.indexes.forEach(index => {
        objectStore.createIndex(index.indexName, index.keyPath, { unique: index.unique })    
      })
    })
  }
}
