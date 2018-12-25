import { LanguageModelFactory as LMF } from 'alpheios-data-models'
import WordItem from '@/lib/word-item'

export default class WordList {
  constructor (userID, languageID, storageAdapter) {
    this.userID = userID
    this.languageID = languageID
    this.storageAdapter = storageAdapter
    this.items = {}
    this.createStorageID()
  }

  createStorageID () {
    let languageCode = LMF.getLanguageCodeFromId(this.languageID)
    this.storageID =  this.userID + '-' + languageCode
  }

  async uploadFromStorage () {
    let result = await this.storageAdapter.get(this.storageID)
    console.info('***************result', result)
    let resultObj = JSON.parse(result[this.storageID])
    if (!resultObj) {
      return false
    }
    console.info('**********************resultObj', resultObj)
    Object.values(resultObj.items).forEach(resItem => {
      let wordItem = WordItem.uploadFromJSON(resItem)
      this.push(wordItem)
    })
    
    console.info('********************uploadFromStorage1', result)
    console.info('********************uploadFromStorage2', this.items)
    return true
  }

  get values () {
    return Object.values(this.items)
  }

  push (wordItem) {
    if (this.languageID === wordItem.languageID && !this.contains(wordItem)) {
      this.items[wordItem.ID] = wordItem
      return true
    }
    return false
  }
  
  pushToStorage (wordItem) {
    if (this.push(wordItem)) {
      this.saveToStorage()
    }
  }

  saveToStorage () {
    let values = {}
    values[this.storageID] = this.convertToStorage()
    this.storageAdapter.set(values)
  }

  convertToStorage () {
    let result = {}
    Object.values(this.items).forEach(item => {
      result[item.ID] = JSON.stringify(Object.assign( {}, item ))
    })
    console.info('*******************convertToStorage', result)
    return JSON.stringify(result)
  }

  contains (wordItem) {
    return this.values.map(item => item.targetWord).includes(wordItem.targetWord)
  }

  makeAllImportant () {
    this.values.forEach(wordItem => {
      wordItem.makeImportant()
    })
  }

  removeAllImportant () {
    this.values.forEach(wordItem => {
      wordItem.removeImportant()
    })
  }

  getWordItemByID (languageID, ID) {
    return this.items[ID]
  }
}