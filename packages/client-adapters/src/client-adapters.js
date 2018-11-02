import AlpheiosTuftsAdapter from '@/tufts/adapter'

class ClientAdapters {
  static async maAdapter (options) {
    let localMaAdapter = new AlpheiosTuftsAdapter()
    console.info('********************options', options)
    if (options.type === 'getHomonym') {
      let homonym = await localMaAdapter.getHomonym(options.languageID, options.word)
      console.info('*******************maAdapter homonym', homonym)
      return homonym
    }
    return null
  }
}

export default ClientAdapters
