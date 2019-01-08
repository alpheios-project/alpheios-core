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

  /**
   * This method executes in UIControler init method (at the end)
   * It checks if storageAdapter is avalable (in our case it checks if IndexededDB works in the current browser)
   * And if it is available, it executes openDatabase and 
   * passes initDBStructure method for the case, when database doesn't exist (onupgradeneeded event)
   * and uploadListsFromDB for the case when database already exists
   */
  initLists () {
    if (this.storageAdapter.available) {
      this.storageAdapter.openDatabase(this.initDBStructure.bind(this), this.uploadListsFromDB.bind(this))
      // this.storageAdapter.openDatabase(this.initDBStructure.bind(this), this.deleteWordItemFromDB.bind(this))
      
    }
  }

  /**
   * This method creats structure for the UserList Table in onupgradeneeded event
   * Later we could use defined indexes as a range key for searching/filterng data
   * Besides defined indexes Table could have any other fields,
   * in our case it will have also - homonym and important
   * So each item in the table defines one worditem in the wordlist
   * userID, languageCode, userIDLangCode defines wordList in the table's item
   * ID has a structure - userID-languageCode-targetWord, for example userIDTest-lat-cepit
   */
  initDBStructure (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('UserLists', { keyPath: 'ID' })
    objectStore.createIndex('ID', 'ID', { unique: true })
    objectStore.createIndex('userID', 'userID', { unique: false })
    objectStore.createIndex('languageCode', 'languageCode', { unique: false })
    objectStore.createIndex('userIDLangCode', 'userIDLangCode', { unique: false })
    objectStore.createIndex('targetWord', 'targetWord', { unique: true })
  }

   /**
   * This method loads data from the table in onsuccess event
   * event is an argument, and event.target.result - is a database varaiable
   * We are checking all available lists name (using userIDLangCode property, that defines wordlist)
   * with the help of keyRange property condition - {indexName: 'userIDLangCode', value: listID, type: 'only' }
   * and if it retrieves data successfully, it executes parseResultToWordList
   */
  uploadListsFromDB (event) {
    const db = event.target.result
    const lists = this.availableLists
    lists.forEach(listID => {
      this.storageAdapter.get(db, 'UserLists', {indexName: 'userIDLangCode', value: listID, type: 'only' }, this.parseResultToWordList.bind(this))
    })
  }

  deleteWordItemFromDB (event) {
    const db = event.target.result
    this.storageAdapter.delete(db, 'UserLists', ['userIDTest-lat-cepit'])
  }
  /**
   * This method parses data from the database table (filtered by wordList)
   * and creates Homonym from saved object (it is looks like jsonObject)
   * After that it executes updateWordList method with saveToStorage parameter = false,
   * to prevent form re-saving action
   */
  parseResultToWordList (result) {
    if (result && result.length > 0) {
      result.forEach(wordItemResult => {
        let homonymRes = Homonym.readObject(wordItemResult.body.homonym)
        // console.info('*******************parseResultToWordList', homonymRes)
        this.updateWordList({ homonym: homonymRes, important: wordItemResult.body.important }, false)
        if (this.upgradeQueue) {
          this.upgradeQueue.clearCurrentItem()
        }
      })
    }
  }

  /**
   * This method checks if there already exists wordList in controller's wordLists property
   * If it doesn't exists, it executes createWordList method
   * then it checks upgradeQueue object, if it has the similiar homonym (it checks by the target word)
   * if not, then
   *         it creates a new WordItem with arguments, passes a saveToStorage flag (if it cames from LexicalQuery event, than we need to save to storage)
   *         pushes it to the wordlist and publishes event for UIController to update WordList tab in the panel
   * if it has, then
   *         it saves this method and data to the queue
   *         when current saveToStorage method from this wordlist would be finished it will execute next method from this queue
   */
  updateWordList(wordItemData, saveToStorage = true) {
    let languageID = wordItemData.homonym.languageID
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    if (!Object.keys(this.wordLists).includes(languageCode)) {
      this.createWordList(languageID)
    }
    
    console.info('*******************updateWordList 1', this.upgradeQueue, this.upgradeQueue.includeHomonym(wordItemData.homonym))

    if (!this.upgradeQueue.includeHomonym(wordItemData.homonym)) {
      this.upgradeQueue.addToQueue(wordItemData.homonym)
      console.info('*******************updateWordList 2', wordItemData.homonym)
      this.wordLists[languageCode].push(new WordItem(wordItemData.homonym, wordItemData.important, wordItemData.currentSession), saveToStorage, this.upgradeQueue)
      WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
    } else {
      this.upgradeQueue.addToMetods(this.updateWordList.bind(this), [ wordItemData, saveToStorage ])
    }
  }

  /**
   * This method creates an empty wordlist and attaches to controller
   */
  createWordList (languageID) {
    let languageCode = LMF.getLanguageCodeFromId(languageID)
    let wordList = new WordList(this.userID, languageID, this.storageAdapter)
    this.wordLists[languageCode] = wordList
  }

  /**
   * This method executes updateWordList with default saveToStorage flag = true
   */
  onHomonymReady (data) {
    this.updateWordList({ homonym: data.homonym, currentSession: true })
  }

  /**
   * This method executes updateWordList with default saveToStorage flag = true 
   * (because definitions could come much later we need to resave homonym with definitions data to database)
  */
  onDefinitionsReady (data) {
    console.info('********************onDefinitionsReady', data)
    this.updateWordList({ homonym: data.homonym, currentSession: true })
  }

  /**
   * This method executes updateWordList with default saveToStorage flag = true 
   * (because lemma translations could come much later we need to resave homonym with translations data to database)
  */
  onLemmaTranslationsReady (homonym) {
    console.info('********************onLemmaTranslationsReady', homonym)
    this.updateWordList({ homonym: homonym, currentSession: true })
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
  /**
   * Published when a WordItem was selected.
   * Data: {
   *  {Homonym} a Homonym that should be uploaded to popup/panel
   * }
   */
  WORDITEM_SELECTED: new PsEvent('WordItem selected', WordlistController)
}
