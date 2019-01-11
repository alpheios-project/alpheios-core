import WordItem from '@/lib/word-item'

export default class WordList {
  constructor (userID, languageCode, storageAdapter) {
    this.userID = userID
    this.languageCode = languageCode
    this.storageAdapter = storageAdapter
    this.items = {}
  }

  get languageName () {
    switch(this.languageCode) {
      case 'lat':
        return 'Latin'
      case 'grc':
        return 'Greek'
      case 'ara':
        return 'Arabic'
      case 'per':
        return 'Persian'
      case 'gez':
        return 'Ancient Ethiopic (Ge\'ez)'
      default:
        'Unknown'
    }
  }

  get storageID () {
    return this.userID + '-' + this.languageCode
  }

  get values () {
    return Object.values(this.items)
  }

  async removeWordItemByID (ID) {
    if (this.items[ID]) { 
      await this.removeFromStorage({indexName: 'ID', value: this.items[ID].storageID, type: 'only' })
      delete this.items[ID]
    }
  }

  async removeAllWordItems () {
    await this.removeFromStorage({indexName: 'listID', value: this.storageID, type: 'only' })
    this.items = {}
  }

  async removeFromStorage (condition) {
    for (let objectStoreData of Object.values(this.storageMap)) {
      await this.storageAdapter.delete({
        objectStoreName: objectStoreData.objectStoreName,
        condition
      })
    }
  }

  contains (wordItem) {
    return this.values.map(item => item.targetWord).includes(wordItem.targetWord)
  }

  async makeImportantByID (wordItemID) {
    this.items[wordItemID].makeImportant()
    await this.pushWordItemPart([this.items[wordItemID]], 'common')
  }

  async removeImportantByID (wordItemID) {
    this.items[wordItemID].removeImportant()
    await this.pushWordItemPart([this.items[wordItemID]], 'common')
  }

  async makeAllImportant () {
    this.values.forEach(wordItem => {
      wordItem.makeImportant()
    })
    await this.pushWordItemPart(this.values, 'common')
  }

  async removeAllImportant () {
    this.values.forEach(wordItem => {
      wordItem.removeImportant()
    })
    await this.pushWordItemPart(this.values, 'common')
  }

  get storageMap () {
    return {
      common: {
        objectStoreName: 'WordListsCommon',
        convertMethodName: 'convertCommonToStorage'
      },
      textQuoteSelector: {
        objectStoreName: 'WordListsContext',
        convertMethodName: 'convertTQSelectorToStorage'
      },
      shortHomonym: {
        objectStoreName: 'WordListsHomonym',
        convertMethodName: 'convertShortHomonymToStorage'
      },
      fullHomonym: {
        objectStoreName: 'WordListsFullHomonym',
        convertMethodName: 'convertFullHomonymToStorage'
      }
    }
  }

  async pushWordItem (data, type) {
    let wordItem = new WordItem(data)
    //check if worditem exists in the list
    if (!this.contains(wordItem)) {
      await this.pushWordItemPart([wordItem], 'common')
    }

    await this.pushWordItemPart([wordItem], type)
  }

  async pushWordItemPart (wordItems, type) {
      if (this.storageMap[type]) {
        let dataItems = []
        for (let wordItem of wordItems) {
          this.items[wordItem.storageID] = wordItem
          let dataItem = wordItem[this.storageMap[type].convertMethodName]()
          dataItems.push(dataItem)
        }

        await this.storageAdapter.set({
          objectStoreName: this.storageMap[type].objectStoreName,
          dataItems: dataItems
        })
        
      }
  }

  async uploadFromDB () {
    let res = await this.storageAdapter.get({
      objectStoreName: this.storageMap.common.objectStoreName,
      condition: {indexName: 'listID', value: this.storageID, type: 'only' }
    })
    if (res.length === 0) {
      return false
    } else {
      for (let resWordItem of res) {
        let resKey = resWordItem.ID
        let wordItem = new WordItem(resWordItem)

        let resFullHomonym = await this.storageAdapter.get({
          objectStoreName: this.storageMap.fullHomonym.objectStoreName,
          condition: {indexName: 'ID', value: resKey, type: 'only' }
        })
        
        if (resFullHomonym.length > 0) {
          wordItem.uploadHomonym(resFullHomonym[0])
        } else {
          let resShortHomonym = await this.storageAdapter.get({
            objectStoreName: this.storageMap.shortHomonym.objectStoreName,
            condition: {indexName: 'ID', value: resKey, type: 'only' }
          })
          if (resShortHomonym.length > 0)
          wordItem.uploadHomonym(resShortHomonym[0])
        }

        let resTextQuoteSelector = await this.storageAdapter.get({
          objectStoreName: this.storageMap.textQuoteSelector.objectStoreName,
          condition: {indexName: 'ID', value: resKey, type: 'only' }
        })

        if (resTextQuoteSelector.length > 0) {
          console.info('**********************resTextQuoteSelector', resTextQuoteSelector)
        }

        this.items[wordItem.storageID] = wordItem
      }
      return true
    }
  }
}