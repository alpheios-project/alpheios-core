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
    return Boolean(this.dbDriver.accessToken) && Boolean(this.dbDriver.userId) && Boolean(this.dbDriver.requestsParams.headers)
  }

  async checkAndUpdate (wordItem, segments) {
    let segmentsForUpdate = this.dbDriver.segmentsForUpdate
    let segmentsForMerge = this.dbDriver.segmentsForMerge
    if (! Array.isArray(segments)) {
      segments = [segments]
    }
    let update = false
    let merge = false
    for (let segment of segments) {
      if (segmentsForUpdate.includes(segment)) {
        update = true
      }
      if (segmentsForMerge.includes(segment)) {
        merge = true
      }
    }
    if (update) {
      let updateWordItem
      // if we are updating a segment which requires merging, then we
      // first query the remote item so that we have the values that need to be merged
      let currentItems = []
      if (merge) {
        currentItems = await this.query({ wordItem })
      }
      if (! currentItems || currentItems.length === 0) {
        // if there isn't anything that needs to be merged then
        // we just replace the old wiht the new
        updateWordItem = wordItem
      } else {
        // otherwise we need to create a merged item for update
        updateWordItem = this.dbDriver.mergeLocalRemote(currentItems[0], wordItem)
      }
      await this.update(updateWordItem)
      return [updateWordItem]
    } else {
      return []
    }
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
