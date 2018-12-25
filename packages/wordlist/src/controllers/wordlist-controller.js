import { PsEvent, LanguageModelFactory as LMF, Constants } from 'alpheios-data-models'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import WordList from '@/lib/word-list';
import WordItem from '@/lib/word-item';
import IndexedDBAdapter from '@/storage/indexed-db-adapter'

export default class WordlistController {
  constructor (userID) {
    this.userID = userID
    this.wordLists = {}

    this.storageAdapter = new IndexedDBAdapter()
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

  get availableLists () {
    const languages = Array.from(WordlistController.langAliases.keys())
    let lists = []
    languages.forEach(languageID => {
      let languageCode = LMF.getLanguageCodeFromId(languageID)
      lists.push(this.userID + '-' + languageCode)
    })
    return lists
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
      console.info('**********************getting for', listID)
      this.storageAdapter.get(db, 'UserLists', {indexName: 'ID', value: listID, type: 'only' })
    })
    
  }

  async initLists_backup () {
    let langs = WordlistController.availableLists
    console.info('****************************langs', langs)
    await langs.forEach(async (languageID) => {
      await this.createWordList(languageID, true)
      WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
    })
    
    console.info('********************initLists', this.wordLists)
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
    /*
    let langs = WordlistController.availableLists
    console.info('****************************langs', langs)

    await this.createWordList(Constants.LANG_LATIN)
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
    */
  }

  async createWordList (languageID, init = false) {
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    let wordList = new WordList(this.userID, languageID, this.storageAdapter)
    let resUpload = await wordList.uploadFromStorage()
    if (wordList.items.length > 0 || init === false) {
      this.wordLists[languageCode] = wordList 
    }
  }

  async updateWordList(homonym) {
    let languageID = homonym.languageID
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    if (!Object.keys(this.wordLists).includes(languageCode)) {
      await this.createWordList(languageID)
    }
    
    this.wordLists[languageCode].pushToStorage(new WordItem(homonym))
  }

  async onHomonymReady (homonym) {
    await this.updateWordList(homonym)
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
  }
}

WordlistController.evt = {
  /**
   * Published when a new LexicalQuery data processing is complete.
   * Data: {
   *  {symbol} resultStatus - A lexical query result status,
      {Homonym} homonym - A homonym data
   * }
   */
  WORDLIST_UPDATED: new PsEvent('Wordlist updated', WordlistController)
}
