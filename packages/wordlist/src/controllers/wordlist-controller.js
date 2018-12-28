import { PsEvent, LanguageModelFactory as LMF, Constants, Lemma, Inflection } from 'alpheios-data-models'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import WordList from '@/lib/word-list';
import WordItem from '@/lib/word-item';
import IndexedDBAdapter from '@/storage/indexed-db-adapter'

export default class WordlistController {
  constructor (userID) {
    this.userID = userID
    this.wordLists = {}

    this.storageAdapter = new IndexedDBAdapter()
    this.createAvailableListsID()
  }

  static get langAliases () {
    return new Map([
      [Constants.LANG_LATIN, 'Latin'],
      [Constants.LANG_GREEK, 'Greek'],
      [Constants.LANG_ARABIC, 'Arabic'],
      [Constants.LANG_PERSIAN, 'Persian'],
      [Constants.LANG_GEEZ, 'Ancient Ethiopic (Ge\'ez)']
    ])
  }

  createAvailableListsID () {
    const languages = Array.from(WordlistController.langAliases.keys())
    let lists = []
    languages.forEach(languageID => {
      let languageCode = LMF.getLanguageCodeFromId(languageID)
      lists.push(this.userID + '-' + languageCode)
    })
    this.availableLists = lists
  }

  initLists () {
    if (this.storageAdapter.available) {
      this.storageAdapter.openDatabase(this.initDBStructure.bind(this), this.uploadListsFromDB.bind(this))
    }
  }

  initDBStructure (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('UserLists', { keyPath: 'ID' })
    objectStore.createIndex('ID', 'ID', { unique: true })
    objectStore.createIndex('userID', 'userID', { unique: false })
    objectStore.createIndex('languageCode', 'languageCode', { unique: false })

    console.info('*******************UserLists Object store created')
  }

  uploadListsFromDB (event) {
    const db = event.target.result
    console.info('**************DB opened', db.name, db.version, db.objectStoreNames)
    /*
    const testItems = [
      {ID: this.userID+'-lat', userID: this.userID, languageCode: 'lat', wordList: { items: [{text: 'testItems1'}, {text: 'testItems2'}] }}
    ]
    this.storageAdapter.set(db, 'UserLists', testItems)
    */
    
    const lists = this.availableLists
    lists.forEach(listID => {
      this.storageAdapter.get(db, 'UserLists', {indexName: 'ID', value: listID, type: 'only' }, this.uploadResultToList.bind(this))
    })
  }

  uploadResultToList (result) {
    if (result && result.length > 0) {
      console.info('*****************uploadResultToList', result)
      result[0].wordItems.forEach(wordItemResult => {
        let lemmaSource = wordItemResult.lexemes[0].lemma
        let lemmaTest = Lemma.readObject(lemmaSource)
        let inflectionsTest = []
        wordItemResult.lexemes[0].inflections.forEach(inflSource => {
          inflectionsTest.push(Inflection.readObject(inflSource, lemmaTest))
        })
        console.info('******************lemmaTest', lemmaTest)
        console.info('******************inflectionsTest', inflectionsTest)
      })
    }
  }
  
  async createWordList (languageID, init = false) {
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    let wordList = new WordList(this.userID, languageID, this.storageAdapter)
    this.wordLists[languageCode] = wordList
  }

  async updateWordList(homonym) {
    let languageID = homonym.languageID
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    if (!Object.keys(this.wordLists).includes(languageCode)) {
      await this.createWordList(languageID)
    }
    
    console.info('*****************updateWordList', homonym)
    this.wordLists[languageCode].push(new WordItem(homonym), true)
  }

  async onHomonymReady (data) {
    console.info('******************onHomonymReady start')
    await this.updateWordList(data.homonym)
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
    console.info('******************onHomonymReady finish')
  }
/*
  async onDefinitionsReady (data) {
    console.info('******************onDefinitionsReady start', data)
    await this.updateWordList(data)
    console.info('******************onDefinitionsReady finish')
  }
  */
}

WordlistController.evt = {
  /**
   * Published when a WordList was updated.
   * Data: {
   *  {wordLists} an Array with WordLists object
   * }
   */
  WORDLIST_UPDATED: new PsEvent('Wordlist updated', WordlistController)
}
