import AlpheiosTuftsAdapter from '@/tufts/adapter'
import AlpheiosTreebankAdapter from '@/alpheiostb/adapter'
import AlpheiosLemmaTranslationsAdapter from '@/translations/adapter'
import AlpheiosLexiconsAdapter from '@/lexicons/adapter'

class ClientAdapters {
/*
   * it is used for getting data from morph adapter
   * @param {options} Object - object contains parametes:
   * options.type String - for now one value - "getHomonym" - action that should be done wth the help of adapter
   * options.languageID Symbol - languageID value for the word
   * options.word String - target word for what we will receive morph data
*/

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

  /*
   * it is used for getting data from treebank adapter
   * @param {options} Object - object contains parametes:
   * options.type String - for now one value - "getHomonym" - action that should be done wth the help of adapter
   * options.languageID Symbol - languageID value for the word
   * options.word String - target word for what we will receive morph data
*/

  static async tbAdapter (options) {
    let localTbAdapter = new AlpheiosTreebankAdapter()
    console.info('********************options', options)
    if (options.type === 'getHomonym') {
      let homonym = await localTbAdapter.getHomonym(options.languageID, options.wordref)
      console.info('*******************tbAdapter homonym', homonym)
      return homonym
    }
    return null
  }

  /*
   * it is used for getting data from translations adapter
   * @param {options} Object - object contains parametes:
   * options.type String - for now one value - "fetchTranslations" - action that should be done wth the help of adapter
   * options.lemmaList [Lemma] - languageID value for the word
   * options.inLang String - language code of the target word
   * options.browserLang - language for translations
*/
  static async lemmaTranslations (options) {
    let localLemmasAdapter = new AlpheiosLemmaTranslationsAdapter()

    if (options.type === 'fetchTranslations') {
      await localLemmasAdapter.getTranslationsList(options.lemmaList, options.inLang, options.browserLang)
      return true
    }
    return null
  }

  /*
   * it is used for getting data from lexicons adapter
   * @param {options} Object - object contains parametes:
   * options.type String - action that should be done wth the help of adapter
   *      variants: fetchShortDefs
   * options.lemmaList [Lemma] - languageID value for the word
   * options.inLang String - language code of the target word
   * options.browserLang - language for translations
*/
  static async lexicons (options) {
    let localLexiconsAdapter = new AlpheiosLexiconsAdapter()

    if (options.type === 'fetchShortDefs') {
      await localLexiconsAdapter.fetchShortDefs(options.lemma, options.opts)
      return true
    }
    return null
  }
}

export default ClientAdapters
