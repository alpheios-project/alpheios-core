import { LanguageModelFactory as LMF } from 'alpheios-data-models'

export default class WordList {
  constructor (userID, languageID, storageAdapter) {
    this.userID = userID
    this.languageID = languageID
    this.storageAdapter = storageAdapter
    this.items = {}
    this.wordItemsToSave = []
    this.createStorageID()
  }

  createStorageID () {
    let languageCode = LMF.getLanguageCodeFromId(this.languageID)
    this.storageID =  this.userID + '-' + languageCode
  }

  get values () {
    return Object.values(this.items)
  }

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
      delete this.items[deleteID]
    }
  }

  saveToStorage () {
    if (this.storageAdapter.available) {
      this.storageAdapter.openDatabase(null, this.putToStorageTransaction.bind(this))
    }
  }

  putToStorageTransaction (event) {
    const db = event.target.result
    let successCallBackF = this.upgradeQueue ? this.upgradeQueue.clearCurrentItem.bind(this.upgradeQueue) : null
    this.storageAdapter.set(db, 'UserLists', this.convertToStorageList(), successCallBackF)
  }

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