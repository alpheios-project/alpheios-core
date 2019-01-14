import { PsEvent, LanguageModelFactory as LMF, Constants, Lemma, Inflection, DefinitionSet, Lexeme, Homonym } from 'alpheios-data-models'
import WordList from '@/lib/word-list'
import IndexedDBAdapter from '@/storage/indexed-db-adapter'

export default class WordlistController {
  constructor (userID) {
    this.userID = userID
    this.wordLists = {}

    this.storageAdapter = new IndexedDBAdapter()
  }

  get availableLangs () {
    return ['lat', 'grc', 'ara', 'per', 'gez']
  }

  /**
   * This method executes in UIControler init method (at the end)
   * It checks if storageAdapter is avalable (in our case it checks if IndexededDB works in the current browser)
   * And if it is available, it executes openDatabase and 
   * passes initDBStructure method for the case, when database doesn't exist (onupgradeneeded event)
   * and uploadListsFromDB for the case when database already exists
   */
  async initLists () {
    if (this.storageAdapter.available) {
      await this.uploadListsFromDB()
    }
  }


   /**
   * This method loads data from the table in onsuccess event
   * event is an argument, and event.target.result - is a database varaiable
   * We are checking all available lists name (using userIDLangCode property, that defines wordlist)
   * with the help of keyRange property condition - {indexName: 'userIDLangCode', value: listID, type: 'only' }
   * and if it retrieves data successfully, it executes parseResultToWordList
   */

  async uploadListsFromDB () {
    console.info('*********************uploadListsFromDB start')
    this.availableLangs.forEach(async (languageCode) => {
      this.createWordList(languageCode)
      let result = await this.wordLists[languageCode].uploadFromDB()
      if (!result) {
        this.removeWordList(languageCode)
      }
      WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)     
    })
  }

  /**
   * This method creates an empty wordlist and attaches to controller
   */
  createWordList (languageCode) {
    let wordList = new WordList(this.userID, languageCode, this.storageAdapter)
    this.wordLists[languageCode] = wordList
  }

  removeWordList (languageCode) {
    delete this.wordLists[languageCode]
  }

  wordListExist (languageCode) {
    return Object.keys(this.wordLists).includes(languageCode)
  }

  async addToWordList (data) {
    // check if such wordItem exists in the WordList

    let languageCode = data.textQuoteSelector ? data.textQuoteSelector.languageCode : data.homonym.language
    let targetWord = data.textQuoteSelector ? data.textQuoteSelector.normalizedText : data.homonym.targetWord

    if (!this.wordListExist(languageCode)) {
      this.createWordList(languageCode)
    }

    let wordList = this.wordLists[languageCode]
    await wordList.pushWordItem({
      languageCode, targetWord,
      homonym: data.homonym,
      textQuoteSelector: data.textQuoteSelector,
      userID: this.userID,
      currentSession: true,
      important: false
    }, data.type)

    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
  }

  /**
   * This method executes updateWordList with default saveToStorage flag = true
   */
  async onHomonymReady (data) {
    console.info('********************onHomonymReady1', data)
    await this.addToWordList({ homonym: data.homonym, type: 'shortHomonym' })
  }

  /**
   * This method executes updateWordList with default saveToStorage flag = true 
   * (because definitions could come much later we need to resave homonym with definitions data to database)
  */
  async onDefinitionsReady (data) {
    console.info('********************onDefinitionsReady', data)
    await this.addToWordList({ homonym: data.homonym, type: 'fullHomonym' })
  }

  /**
   * This method executes updateWordList with default saveToStorage flag = true 
   * (because lemma translations could come much later we need to resave homonym with translations data to database)
  */
  async onLemmaTranslationsReady (homonym) {
    console.info('********************onLemmaTranslationsReady', homonym)
    await this.addToWordList({ homonym, type: 'fullHomonym' })
  }

  async onTextQuoteSelectorRecieved (textQuoteSelector) {
    console.info('********************onTextQuoteSelectorRecieved', textQuoteSelector)
    await this.addToWordList({ textQuoteSelector, type: 'textQuoteSelector' })
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
  WORDITEM_SELECTED: new PsEvent('WordItem selected', WordlistController),
  
}
