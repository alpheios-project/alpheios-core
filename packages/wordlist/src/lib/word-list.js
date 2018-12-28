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
/*
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
*/
  get values () {
    return Object.values(this.items)
  }

  push (wordItem, saveToStorage = false) {
    if (this.languageID === wordItem.languageID && !this.contains(wordItem)) {
      this.items[wordItem.ID] = wordItem
      if (saveToStorage) {
        this.saveToStorage()
      }
      return true
    }
    return false
  }
  
  saveToStorage () {
    if (this.storageAdapter.available) {
      this.storageAdapter.openDatabase(null, this.putToStorageTransaction.bind(this))
    }
  }

  putToStorageTransaction (event) {
    const db = event.target.result
    console.info('**************DB opened', db.name, db.version, db.objectStoreNames)
    this.storageAdapter.set(db, 'UserLists', this.convertToStorage())
  }

  convertToStorage () {
    let languageCode = LMF.getLanguageCodeFromId(this.languageID)
    let result = { ID: this.storageID, userID: this.userID, languageCode: languageCode }
    console.info('**********************convert to Storage', this)
    result.wordItems = []

    for (let item of Object.values(this.items)) {
      let resultItem = { lexemes: [] }
      for (let lexeme of item.homonym.lexemes) {
        let resInflections = []
        lexeme.inflections.forEach(inflection => {
          let resInflection = {
            stem: inflection.stem,
            languageCode: languageCode,
            suffix: inflection.suffix,
            prefix: inflection.prefix,
            example: inflection.example
          }
          resInflections.push(resInflection)
        })
        
        let resultLexeme = { 
          lemma: lexeme.lemma.convertToJSON(), 
          inflections: resInflections
        }

        resultItem.lexemes.push(resultLexeme)
      }
      result.wordItems.push(resultItem)
    }
    console.info('******************result', result)
    return [ result ]
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