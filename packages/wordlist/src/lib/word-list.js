import { LanguageModelFactory as LMF } from 'alpheios-data-models'

export default class WordList {
  constructor (userID, languageID, storageAdapter) {
    this.userID = userID
    this.languageID = languageID
    this.storageAdapter = storageAdapter
    this.items = {}
    this.wordItemsToSave = []
    this.wordItemsToDelete = []
    this.createStorageID()
  }

  createStorageID () {
    let languageCode = LMF.getLanguageCodeFromId(this.languageID)
    this.storageID =  this.userID + '-' + languageCode
  }

  get values () {
    return Object.values(this.items)
  }

  /**
   * This method removes wordItem with the same targetWord if it exists
   * checks for the languageId to be the same as defines in the current wordList
   * adds wordItem to the current wordList
   * and saves to storage (if saveToStorage flag = true)
   * before saving - it duplicates upgradeQueue from wordlist 
   * to pass it later to IndexedDB put callback and move queue further after success saving
   */
  push (wordItem, saveToStorage = false, upgradeQueue = {}) {
    this.removeWordItemByWord(wordItem)

    if (this.languageID === wordItem.languageID) {
      this.items[wordItem.ID] = wordItem
      if (saveToStorage) {
        this.upgradeQueue = upgradeQueue
        this.upgradeQueue.setCurrentWord(wordItem)

        this.wordItemsToSave = [ wordItem ]
        this.saveToStorage()
      }
      return true
    }
    return false
  }
  
  removeWordItemByWord (wordItem) {
    if (this.contains(wordItem)) { 
      let deleteID = this.getIDByTargetWord(wordItem)
      this.wordItemsToDelete = [ this.storageID + '-' + this.items[deleteID].targetWord ]
      delete this.items[deleteID]
      this.removeFromStorage()
    }
  }

  removeWordItemByID (ID) {
    if (this.items[ID]) { 
      this.wordItemsToDelete = [ this.storageID + '-' + this.items[ID].targetWord ]
      delete this.items[ID]
      this.removeFromStorage()
    }
  }

  removeAllWordItems () {
    this.wordItemsToDelete = this.values.map(item => this.storageID + '-' + item.targetWord)
    let IDsforDelete = this.values.map(item => item.ID)
    IDsforDelete.forEach(ID => {
      delete this.items[ID]
    })
    this.removeFromStorage()
  }

  removeFromStorage () {
    if (this.storageAdapter.available) {
      this.storageAdapter.openDatabase(null, this.deleteStorageTransaction.bind(this))
    }
  }

  deleteStorageTransaction (event) {
    const db = event.target.result
    let successCallBackF = this.upgradeQueue ? this.upgradeQueue.clearCurrentItem.bind(this.upgradeQueue) : null
    this.storageAdapter.delete(db, 'UserLists', this.wordItemsToDelete.slice(), successCallBackF)
    this.wordItemsToDelete = []
  }

  /**
   * This method is the same as in WordList and it passes putToStorageTransaction as a callback for successful opening database
   */
  saveToStorage () {
    if (this.storageAdapter.available) {
      this.storageAdapter.openDatabase(null, this.putToStorageTransaction.bind(this))
    }
  }

  /**
   * This method executes in successfull callback from saveToStorage method
   * it gets db from event data
   * and passes the foolowing arguments to set method of the storageAdapter
   *        db - opened database from the event
   *        UserLists - table name
   *        jsonObject data - selected amount of wordItems (it could be one wordItem, it could be the whole list) converted to be as jsonObject
   *        successCallBackF - it is used to move queue further, if there is a queue (it is not defined everytime)
   */
  putToStorageTransaction (event) {
    const db = event.target.result
    let successCallBackF = this.upgradeQueue ? this.upgradeQueue.clearCurrentItem.bind(this.upgradeQueue) : null
    this.storageAdapter.set(db, 'UserLists', this.convertToStorageList(), successCallBackF)
  }

  /**
   * This method converts some amount of wordItems to be as jsonObject
   * as we couldn't pass some arguments to the IndexedDB callbacks (as they are events)
   * I have created a variable in wordList that stores currently defined amount of wordItem - it is this.wordItemsToSave
   * this.wordItemsToSave is defined now in push, and changing important flags methods
   */
  convertToStorageList () {
    let result = []
    for (let item of this.wordItemsToSave) {
      result.push(this.convertToStorageItem(item))
    }
    this.wordItemsToSave = []
    return result
  }

  convertToStorageItem (wordItem) {
    return Object.assign({ 
      ID: this.storageID + '-' + wordItem.targetWord, 
      userID: this.userID, 
      userIDLangCode: this.storageID      
    }, wordItem.convertToStorage())
  }
  
  contains (wordItem) {
    return this.values.map(item => item.targetWord).includes(wordItem.targetWord)
  }

  getIDByTargetWord (wordItem) {
    let checkRes = this.values.filter(item => item.targetWord === wordItem.targetWord)
    return checkRes ? checkRes[0].ID : null
  }

  makeImportantByID (wordItemID) {
    this.items[wordItemID].makeImportant()
    this.wordItemsToSave = [ this.items[wordItemID] ]
    this.saveToStorage()
  }

  removeImportantByID (wordItemID) {
    this.items[wordItemID].removeImportant()
    this.wordItemsToSave = [ this.items[wordItemID] ]
    this.saveToStorage()
  }

  makeAllImportant () {
    this.values.forEach(wordItem => {
      wordItem.makeImportant()
    })
    this.wordItemsToSave = this.values
    this.saveToStorage()
  }

  removeAllImportant () {
    this.values.forEach(wordItem => {
      wordItem.removeImportant()
    })
    this.wordItemsToSave = this.values
    this.saveToStorage()
  }

}