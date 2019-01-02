import { PsEvent, LanguageModelFactory as LMF, Constants, Lemma, Inflection, DefinitionSet, Lexeme, Homonym } from 'alpheios-data-models'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import WordList from '@/lib/word-list';
import WordItem from '@/lib/word-item';
import IndexedDBAdapter from '@/storage/indexed-db-adapter'
import UpgradeQueue from '@/controllers/upgrade-queue';

export default class WordlistController {
  constructor (userID) {
    this.userID = userID
    this.wordLists = {}

    this.storageAdapter = new IndexedDBAdapter()
    this.createAvailableListsID()
    this.upgradeQueue = new UpgradeQueue()
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
    objectStore.createIndex('userIDLangCode', 'userIDLangCode', { unique: false })
    objectStore.createIndex('targetWord', 'targetWord', { unique: true })
  }

  uploadListsFromDB (event) {
    const db = event.target.result
    const lists = this.availableLists
    lists.forEach(listID => {
      this.storageAdapter.get(db, 'UserLists', {indexName: 'userIDLangCode', value: listID, type: 'only' }, this.parseResultToWordList.bind(this))
    })
  }

  parseResultToWordList (result) {
    if (result && result.length > 0) {
      console.info('*******************parseResultToWordList result', result)
      result.forEach(wordItemResult => {
        let homonymRes = Homonym.readObject(wordItemResult.homonym)
        this.updateWordList({ homonym: homonymRes, important: wordItemResult.important }, false)
      })
    }
  }
  
  createWordList (languageID) {
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    let wordList = new WordList(this.userID, languageID, this.storageAdapter)
    this.wordLists[languageCode] = wordList
  }

  updateWordList(wordItemData, saveToStorage = true) {
    let languageID = wordItemData.homonym.languageID
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    if (!Object.keys(this.wordLists).includes(languageCode)) {
      this.createWordList(languageID)
    }
    
    if (!this.upgradeQueue.includeHomonym(wordItemData.homonym)) {
      this.upgradeQueue.addToQueue(wordItemData.homonym)
      this.wordLists[languageCode].push(new WordItem(wordItemData.homonym, wordItemData.important), saveToStorage, this.upgradeQueue)
      WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
    } else {
      this.upgradeQueue.addToMetods(this.updateWordList.bind(this), [ wordItemData, saveToStorage ])
    }
  }

  onHomonymReady (data) {
    // console.info('******************onHomonymReady start')
    this.updateWordList({ homonym: data.homonym })
    // console.info('******************onHomonymReady finish')
  }

  onDefinitionsReady (data) {
    // let testData = data.homonym.lexemes[0].meaning.fullDefs
    // let testText = testData && testData.length > 0 ? testData[0].text.substr(0, 10) + '...' : '<no text>'
    // console.info('******************onDefinitionsReady start', testText)
    this.updateWordList({ homonym: data.homonym })
    // console.info('******************onDefinitionsReady finish')
  }
}

WordlistController.evt = {
  /**
   * Published when a WordList was updated.
   * Data: {
   *  {wordLists} an Array with WordLists object
   * }
   */
  WORDLIST_UPDATED: new PsEvent('Wordlist updated', WordlistController),
  WORDITEM_SELECTED: new PsEvent('WordItem selected', WordlistController),
}
