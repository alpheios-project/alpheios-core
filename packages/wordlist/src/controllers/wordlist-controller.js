import { PsEvent, WordList, WordItem } from 'alpheios-data-models'

export default class WordlistController {
  /**
   * @constructor
   * @param {String[]} availableLangs language codes
   * @param {PSEvent[]} events events that the controller can subscribe to
   */
  constructor (availableLangs, events) {
    this.wordLists = {}
    this.availableLangs = availableLangs
    events.TEXT_QUOTE_SELECTOR_RECEIVED.sub(this.onTextQuoteSelectorReceived.bind(this))
    events.HOMONYM_READY.sub(this.onHomonymReady.bind(this))
    events.DEFS_READY.sub(this.onDefinitionsReady.bind(this))
    events.LEMMA_TRANSL_READY.sub(this.onLemmaTranslationsReady.bind(this))
  }

  /**
   * Asynchronously initialize the word lists managed by this controller
   * @param {UserDataManager} dataManager a user data manager to retrieve initial wordlist data from
   * Emits a WORDLIST_UPDATED event when the wordlists are available
   */
  async initLists (dataManager) {
    for (let languageCode of this.availableLangs) {
      let wordItems = await dataManager.query({dataType: 'WordItem', params: {languageCode: languageCode}}, { syncDelete: true })
      if (wordItems.length > 0) {
        this.wordLists[languageCode] = new WordList(languageCode,wordItems)
        WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
      }
    }
  }

  /**
   * Get the wordlist for a specific language code
   * @param {String} languageCode the language for the list
   * @param {Boolean} create set to true to create the list of it doesn't exist
   * Emits a WORDLIST_CREATED event if a new list is created
   * @return {WordList} the wordlist
   */
  getWordList (languageCode, create=true) {
    if (create && ! this._wordListExist(languageCode)) {
      let wordList = new WordList(languageCode,[])
      this.wordLists[languageCode] = wordList
      WordlistController.evt.WORDLIST_CREATED.pub(wordList)
    }
    return this.wordLists[languageCode]
  }

  /**
   * Remove a wordlist for a specific language code and all if its items
   * @param {String} languageCode the language for the list
   * Emits a WORDLIST_DELETED event
   */
  removeWordList (languageCode) {
    delete this.wordLists[languageCode]
    WordlistController.evt.WORDLIST_DELETED.pub({dataType: 'WordItem', params: {languageCode: languageCode}})
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
  }

  /**
   * Remove a WordItem from a WordList
   * @param {String} languageCode the language of the item to be removed
   * @param {String} targetWord the word to be removed
   * Emits a WORDITEM_DELETED event for for the item that was deleted
   */
  removeWordListItem (languageCode, targetWord) {
    let wordList = this.getWordList(languageCode, false)
    if (wordList) {
      let deleted = wordList.deleteWordItem(targetWord)
      if (deleted) {
        WordlistController.evt.WORDITEM_DELETED.pub({dataObj: deleted})
        if (wordList.isEmpty) {
          this.removeWordList(languageCode)
        }
      } else {
        console.error('Trying to delete an absent element')
      }
    }
  }

  /**
   * get an item from a word list
   * @param {String} languageCode the language code of the item
   * @param {String} targetWord the word of the item
   * @param {Boolean} create true to create the item if it doesn't exist
   * @return {WordItem} the retrieved or created WordItem
   */
  getWordListItem (languageCode, targetWord, create=false) {
    let wordList = this.getWordList(languageCode, create)
    let wordItem
    if (wordList) {
      wordItem = wordList.getWordItem(targetWord, create, WordlistController.evt.WORDITEM_UPDATED)
    }
    if (!wordItem) {
      console.error(`There are no items for these parameters ${languageCode} ${targetWord}`)
    }
    return wordItem
  }

  /**
   * Responds to a HOMONYM_READY event by creating or updating a wordlist item for a retrieved Homonym
   * @param {Homonym} data
   * Emits WORDITEM_UPDATED and WORDLIST_UPDATED events
   */
   onHomonymReady (data) {
    // when receiving this event, it's possible this is the first time we are seeing the word so
    // create the item in the word list if it doesn't exist
    let wordItem = this.getWordListItem(data.language, data.targetWord, true)
    wordItem.homonym = data
    WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'shortHomonym'}})
    // emit a wordlist updated event too in case the wordlist was updated
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
  }

  /**
  * Responds to a DEFINITIONS_READY event by updating a wordlist item for retrieved Definitions
  * @param {Object} data {requestType: 'fullDefs',homonym: {Homonym}}
  * Emits a WORDITEM_UPDATED event
  */
  onDefinitionsReady (data) {
    let wordItem = this.getWordListItem(data.homonym.language,data.homonym.targetWord)
    if (wordItem) {
      wordItem.homonym = data.homonym
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'fullHomonym'}})
    } else {
      // TODO error handling
      console.error("Something went wrong: request to add definitions to non-existent item")
    }
  }

  /**
  * Responds to a LEMMA_TRANSLATIONS_READY event by updating a wordlist item for retrieved translations
  * (because lemma translations could come much later we need to resave homonym with translations data to database)
  * @param {Homonym} data
  * Emits a WORDITEM_UPDATED event
  */
  onLemmaTranslationsReady (data) {
    let wordItem = this.getWordListItem(data.language, data.targetWord)
    if (wordItem) {
      wordItem.homonym = data
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'fullHomonym'}})
    } else {
      console.error("Something went wrong: request to add translations to non-existent item")
    }
  }

  /**
  * Responds to a TextQuoteSelectorReceived  event by creating or updating a wordlist item for a retrieved Homonym
  * @param {TextQuoteSelector} data
  * Emits a WORDITEM_UPDATED and WORDLIST_UPDATED events
  */
  onTextQuoteSelectorReceived (data) {
    // when receiving this event, it's possible this is the first time we are seeing the word so
    // create the item in the word list if it doesn't exist
    let wordItem = this.getWordListItem(data.languageCode, data.normalizedText, true)
    if (wordItem) {
      wordItem.addContext([data])
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'context'}})
      // emit a wordlist updated event too in case the wordlist was updated
      WordlistController.evt.WORDLIST_UPDATED.pub(this.getWordList(wordItem.languageCode))
    } else {
      console.error("Unable to create or retrieve worditem")
    }

  }

  /**
  * Update a wordlist item's important flag
  * @param {String} languageCode  the language of the item
  * @param {String} targetWord the word of the item
  * @param {Boolean} important true or false
  * Emits a WORDITEM_UPDATED event
  */
  updateWordItemImportant (languageCode, targetWord, important) {
    let wordItem = this.getWordListItem(languageCode, targetWord,false)
    if (wordItem) {
      wordItem.important = important
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'common'}})
    } else {
      console.error("Something went wrong: request to set important flag on non-existent item")
    }
  }

  /**
  * Update the important flag of all the items in a WordList
  * @param {String} languageCode  the language of the list
  * @param {Boolean} important true or false
  * Emits a WORDITEM_UPDATED event for each updated item
  */
  updateAllImportant (languageCode, important) {
    let wordList = this.getWordList(languageCode, false)
    wordList.values.forEach(wordItem => {
      wordItem.important = important
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'common'}})
    })
  }

  /**
  * Select an item in a word list
  * @param {String} languageCode  the language of the item
  * @param {String} targetWord the word of the item
  * Emits a WORDITEM_SELECTED event for the selected item
  */
  async selectWordItem (languageCode, targetWord) {
    let wordItem = this.getWordListItem(languageCode, targetWord, false)
    WordlistController.evt.WORDITEM_SELECTED.pub(wordItem)
  }

  /**
   * Private method - check to see if we have a wordlist for a specific language code
   * @param {String} languageCode the language code
   * @return {Boolean} true if the wordlist exists otherwise false
   */
  _wordListExist (languageCode) {
    return Object.keys(this.wordLists).includes(languageCode)
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
   * Published when a WordList was created
   * Data: {
   *  {wordLists} an Array with WordLists object
   * }
   */
  WORDLIST_CREATED: new PsEvent('Wordlist created', WordlistController),


  /**
   * Published when a WordList was deleted
   * Data: {
   *  dataType: constructor name for the contained word list items
   *  params: parameters to identify the items to be deleted
   * }
   */
  WORDLIST_DELETED: new PsEvent('Wordlist deleted', WordlistController),

  /**
   * Published when a WordItem was selected.
   * Data: {
   *  dataObj: the selected WordItem
   * }
   */
  WORDITEM_SELECTED: new PsEvent('WordItem selected', WordlistController),

  /**
   * Published when a WordItem was updated
   * Data: {
   *   dataObj: the selected WordItem
   *   params: additional update parameters
   * }
   */
  WORDITEM_UPDATED: new PsEvent('WordItem updated', WordlistController),

  /**
   * Published when a WordItem was deleted
   * Data: {
   *   dataObj: the deleted WordItem
   * }
   */
  WORDITEM_DELETED: new PsEvent('WordItem deleted', WordlistController)

}
