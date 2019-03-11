import axios from 'axios'

export default class RemoteDBAdapter {
  /**
   * 
   * @param {WordItemRemoteDbDriver} dbDriver
   */
  constructor (dbDriver) {
    this.dbDriver = dbDriver
    this.available = this._checkRemoteDBAvailability()
    this.errors = []
  }

  /**
   * Checks if defined obligatory params - userID and headers for request
   * @return {Boolean} - true - adapter could be used, false - couldn't
   */
  _checkRemoteDBAvailability () {
    return Boolean(this.dbDriver.userID) && Boolean(this.dbDriver.requestsParams.headers)
  }

  async checkAndUpdate (wordItem, segment) {
    let currentItems = await this.query({ wordItem })
    let segmentsForUpdate = this.dbDriver.segmentsForUpdate

    if (currentItems.length === 0) {
      await this.create(wordItem)
    } else if (segmentsForUpdate.includes(segment)) {
      let resultWordItem = this.dbDriver.mergeLocalRemote(currentItems[0], wordItem)

      await this.update(resultWordItem)
    }

    currentItems = await this.query({ wordItem })
    return currentItems
  }

  /**
   * Creates an item in remote storage
   * @param {WordItem} data
   * @return {Boolean} - successful/failed result
   */
  async create(data) {
    try {
      let url = this.dbDriver.storageMap.post.url(data)
      let content = this.dbDriver.storageMap.post.serialize(data)

      let result = await axios.post(url, content, this.dbDriver.requestsParams)

      let updated = this.dbDriver.storageMap.post.checkResult(result)
      
      return updated
    } catch (error) {
      console.error(error)
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Updates an item in remote storage
   * we could receive here data in two formats - wordItem (if updated from selected wordItem) and object (if updated from already serialized when merged)
   * so if it is already an object - we skip serialization
   * @param {WordItem/Object} data
   * @return {Boolean} - successful/failed result
   */
  async update(data) {
    try {
      let url = this.dbDriver.storageMap.put.url(data)
      let skipSerialize = !data.constructor.name.match(/WordItem/)

      let content
      if (skipSerialize) {
        content = data
      } else {
        content = this.dbDriver.storageMap.put.serialize(data)
      }

      let result = await axios.put(url, content, this.dbDriver.requestsParams)
      let updated = this.dbDriver.storageMap.put.checkResult(result)
      return updated
    } catch (error) {
      console.error(error)
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Deletes a single item in remote storage
   * @param {WordItem} data
   * @return {Boolean} - successful/failed result
   */
  async deleteOne(data) {
    try {
      let url = this.dbDriver.storageMap.deleteOne.url(data)
      let result = await axios.delete(url, this.dbDriver.requestsParams)
      let updated = this.dbDriver.storageMap.deleteOne.checkResult(result)
      return updated
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Deletes all items by languageCode in remote storage
   * @param {Object} data
   * @param {String} data.languageCode
   * @return {Boolean} - successful/failed result
   */
  async deleteMany(data) {
    try {
      let url = this.dbDriver.storageMap.deleteMany.url(data)

      let result = await axios.delete(url, this.dbDriver.requestsParams)
      let updated = this.dbDriver.storageMap.deleteMany.checkResult(result)
      return updated
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Queries data for one wordItem or wordList by languageID
   * @param {Object} data
   * @param {WordItem} data.wordItem
   * @param {String} data.languageCode
   * @return {WordItem[]}
   */
  async query(data) {
    try {
      let url = this.dbDriver.storageMap.get.url(data)
      let result = await axios.get(url, this.dbDriver.requestsParams)
      let final = this.dbDriver.storageMap.get.checkResult(result)
      return final
    } catch (error) {
      let errorFinal = this.dbDriver.storageMap.get.checkErrorResult(error)
      if (!errorFinal && error) {
        if (error) {
          this.errors.push(error)
        }
      }
      return errorFinal      
    }
  }
}
