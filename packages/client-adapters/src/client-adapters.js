import AlpheiosTuftsAdapter from '@/tufts/adapter'
import AlpheiosTreebankAdapter from '@/alpheiostb/adapter'
import AlpheiosLemmaTranslationsAdapter from '@/translations/adapter'
import AlpheiosLexiconsAdapter from '@/lexicons/adapter'

class ClientAdapters {
  /*
  *  Additional abstraction layer for structuring adapters
  */
  static get morphology () {
    return {
      alpheiosTreebank: ClientAdapters.tbAdapter,
      tufts: ClientAdapters.maAdapter
    }
  }

  static get lexicon () {
    return {
      alpheios: ClientAdapters.lexicons
    }
  }

  static get lemmatranslation () {
    return {
      alpheios: ClientAdapters.lemmaTranslations
    }
  }

  /*
   * it is used for getting data from morph adapter
   * @param {options} Object - object contains parametes:
   * options.method String - for now one value - "getHomonym" - action that should be done wth the help of adapter
   * options.params.languageID Symbol - languageID value for the word
   * options.params.word String - target word for what we will receive morph data
*/

  static async maAdapter (options) {
    let localMaAdapter = new AlpheiosTuftsAdapter()
    if (options.method === 'getHomonym') {
      let homonym = await localMaAdapter.getHomonym(options.params.languageID, options.params.word)
      return homonym
    }
    return null
  }

  /*
   * it is used for getting data from treebank adapter
   * @param {options} Object - object contains parametes:
   * options.method String - for now one value - "getHomonym" - action that should be done wth the help of adapter
   * options.params.languageID Symbol - languageID value for the word
   * options.params.word String - target word for what we will receive morph data
*/

  static async tbAdapter (options) {
    let localTbAdapter = new AlpheiosTreebankAdapter()
    if (options.method === 'getHomonym') {
      let homonym = await localTbAdapter.getHomonym(options.params.languageID, options.params.wordref)
      return homonym
    }
    return null
  }

  /*
   * it is used for getting data from translations adapter
   * @param {options} Object - object contains parametes:
   * options.method String - for now one value - "fetchTranslations" - action that should be done wth the help of adapter
   * options.params.lemmaList [Lemma] - languageID value for the word
   * options.params.inLang String - language code of the target word
   * options.params.browserLang - language for translations
*/
  static async lemmaTranslations (options) {
    let localLemmasAdapter = new AlpheiosLemmaTranslationsAdapter()

    if (options.method === 'fetchTranslations') {
      await localLemmasAdapter.getTranslationsList(options.params.homonym, options.params.browserLang)
      return true
    }
    return null
  }

  /*
   * it is used for getting data from lexicons adapter
   * @param {options} Object - object contains parametes:
   * options.method String - action that should be done wth the help of adapter
   *      variants: fetchShortDefs
   * options.params.lemmaList [Lemma] - languageID value for the word
   * options.params.inLang String - language code of the target word
   * options.params.browserLang - language for translations
*/
  static async lexicons (options) {
    let localLexiconsAdapter = new AlpheiosLexiconsAdapter()

    if (options.method === 'fetchShortDefs') {
      await localLexiconsAdapter.fetchShortDefs(options.params.homonym, options.params.opts)
      return true
    }
    if (options.method === 'fetchFullDefs') {
      await localLexiconsAdapter.fetchFullDefs(options.params.homonym, options.params.opts)
      return true
    }
    return null
  }
}

export default ClientAdapters
