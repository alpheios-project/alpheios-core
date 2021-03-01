import BaseAdapter from '@clAdapters/adapters/base-adapter'

import { Collection } from 'alpheios-data-models'

export default class DTSAPIAdapter extends BaseAdapter {
  /**
   *
   * @param {Object} config - properties for the adapter
   */
  constructor (config = {}) {
    super()
    this.config = {
      baseUrl: config.baseUrl
    }
  }

  /**
   * Retrieves collection
   * @param {String} id - @id for the collection for example urn:alpheios:latinLit, if it is null would be retrieved the root collections
   * @return {Collection}
   */
  async getCollection (id) {
    try {
      const url = this.getCollectionUrl(id)
      const collections = await this.fetch(url)
      if (collections) {
        return this.convertToCollections(collections)
      }
      return false
    } catch (error) {
      this.addError(this.l10n.getMsg('DTSAPI_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
   * Retrieves refs
   * @param {String} id - @id for the Resource for example urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1
   * @param {Collection} collection - would be updated with retrieve data
   *
   */
  async getNavigation (id, resource) {
    try {
      const url = this.getNavigationUrl(id)
      const refs = await this.fetch(url)
      if (refs) {
        this.convertToRefs(refs, resource)
        return resource
      }
      return false
    } catch (error) {
      this.addError(this.l10n.getMsg('DTSAPI_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
   * Retrieves TEI document - by setting ref, start, end
   * @param {String} id - @id for the document for example urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1
   * @param {Object} refParams
   *        {String} ref - a ref for the passage (if defined start and end are ignored)
   *        {String} start - a starting ref from it the text would be retrieved
   *        {String} end - an ending ref till it the text would be retrieved (if it is not defined - would be retrieved till the end of the text)
   * @retunrs {String} - TEI xml document
   */
  async getDocument (id, refParams = {}) {
    try {
      const url = this.getDocumentUrl(id, refParams)
      if (!url) { return }

      const document = await this.fetch(url, { type: 'xml' })
      return document
    } catch (error) {
      this.addError(this.l10n.getMsg('DTSAPI_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
   *
   * @param {String} id - @id
   * @returns {string} - url for getting collections
   */
  getCollectionUrl (id) {
    let url = `${this.config.baseUrl}collections`
    if (id) {
      url = `${url}?id=${id}`
    }
    return url
  }

  /**
   *
   * @param {String} id - @id
   * @returns {string} - url for getting resources
   */
  getNavigationUrl (id) {
    let url = `${this.config.baseUrl}navigation`
    if (id) {
      url = `${url}?id=${id}`
    }
    return url
  }

  /**
   *
   * @param {String} id - @id
   * @returns {string} - url for getting document
   */
  getDocumentUrl (id, refParams) {
    const { ref, start, end } = refParams
    let url = `${this.config.baseUrl}document`
    if (!id || (!ref && !start)) {
      const message = 'getDocumentUrl - not defined id or ref/start'
      this.addError(this.l10n.getMsg('DTSAPI_NO_OBLIGATORY_PROPS', { message }))
      return
    }

    url = `${url}?id=${id}`

    if (ref) { return `${url}&ref=${ref}` }

    url = `${url}&start=${start}`
    if (end) { return `${url}&end=${end}` }

    return url
  }

  /**
   * Converts JSON object to Collection with members
   * @param {Object} collectionsJSON - JSON object retrieved from the remote
   * @returns {Collection}
   */
  convertToCollections (collectionsJSON) {
    const rootCollection = new Collection({
      totalItems: collectionsJSON.totalItems,
      title: collectionsJSON.title !== 'None' ? collectionsJSON.title : 'Alpheios',
      id: collectionsJSON['@id'] !== 'default' ? collectionsJSON['@id'] : null,
      baseUrl: this.config.baseUrl,
      description: collectionsJSON.description
    })

    if (collectionsJSON.member) {
      collectionsJSON.member.forEach(collJson => {
        rootCollection.addMember({
          totalItems: collJson.totalItems,
          title: collJson.title,
          id: collJson['@id'],
          type: collJson['@type'],
          description: collJson.description,
          baseUrl: this.config.baseUrl
        })
      })
    }
    return rootCollection
  }

  /**
   * Converts and uploads passage's refs to collection
   * @param {Array[Object]} refs - array of passage's refs - [ { ref: '1' }, { ref: '1a' } .. ]
   * @param {Collection} collection
   */
  convertToRefs (refs, resource) {
    let finalRefs

    if (refs['hydra:member'] && refs['hydra:member'].length > 0) {
      finalRefs = refs['hydra:member'].map(refObj => refObj.ref)
    } else if (refs.member && refs.member.length > 0) {
      finalRefs = refs.member.map(refObj => refObj['dts:ref'])
    }

    if (finalRefs) {
      resource.uploadRefs({
        refs: finalRefs,
        passage: refs.passage ? refs.passage : refs['dts:passage']
      })
    }
    return true
  }
}
