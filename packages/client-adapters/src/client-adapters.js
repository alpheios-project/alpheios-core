import AlpheiosTuftsAdapter from '@/tufts/adapter'

class ClientAdapters {
  static maAdapter (options) {
    let localMaAdapter = new AlpheiosTuftsAdapter()
    if (options.type === 'getHomonym') {
      return localMaAdapter.getHomonym(options.languageID, options.word)
    }
  }
}

export default ClientAdapters
