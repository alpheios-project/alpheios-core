import BaseAdapter from '@clAdapters/adapters/base-adapter'

import { Collection } from 'alpheios-data-models'

export default class DTSAPIAdapter extends BaseAdapter {
  constructor (config = {}) {
    super()
    this.config = {
      baseUrl: 'https://dts.alpheios.net/api/dts/'
    }
  }

  async getCollections (id) {
    try {
      const url = `${this.config.baseUrl}collections`
      const collections = await this.fetch(url)
      return this.convertToCollections(collections)
    } catch (error) {
      this.addError(this.l10n.getMsg('DTSAPI_FETCH_ERROR', { message: error.message }))
    }
  }

  convertToCollections (collections) {
    const rootCollection = new Collection({
      totalItems: collections.totalItems,
      title: collections.title !== 'None' ? collections.title : 'Alpheios',
      id: collections.collections !== 'default' ? collections.collections : null,
      baseUrl: this.baseUrl
    })

    if (collections.member) {
      collections.member.forEach(collJson => rootCollection.addMember(collJson))
    }

    return rootCollection
  }
}
