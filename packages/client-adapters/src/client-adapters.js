import AlpheiosTuftsAdapter from '@/tufts/adapter'
import AlpheiosTreebankAdapter from '@/alpheiostb/adapter'
import AlpheiosLemmaTranslationsAdapter from '@/translations/adapter'
import AlpheiosLexiconsAdapter from '@/lexicons/adapter'
import WrongMethodError from '@/errors/wrong-method-error'

import AdaptersConfig from '@/adapters-config.json'

let cachedConfig = new Map()
let cachedAdaptersList = new Map()

class ClientAdapters {
  static init () {
    if (cachedConfig.size === 0) {
      for (let category in AdaptersConfig) {
        let adapters = {}
        for (let adapterKey in AdaptersConfig[category]) {
          let adapterData = AdaptersConfig[category][adapterKey]

          adapters[adapterKey] = {
            adapter: ClientAdapters[adapterData.adapter],
            methods: adapterData.methods
          }
        }
        cachedConfig.set(category, adapters)
      }

      for (let key of cachedConfig.keys()) {
        let res = {}
        Object.keys(cachedConfig.get(key)).forEach(typeAdapter => {
          res[typeAdapter] = cachedConfig.get(key)[typeAdapter].adapter
        })

        cachedAdaptersList.set(key, res)
      }
    }
  }
  /*
  *  Additional abstraction layer for structuring adapters
  */
  static get morphology () {
    ClientAdapters.init()
    return cachedAdaptersList.get('morphology')
  }

  static get lexicon () {
    ClientAdapters.init()
    return cachedAdaptersList.get('lexicon')
  }

  static get lemmatranslation () {
    ClientAdapters.init()
    return cachedAdaptersList.get('lemmatranslation')
  }

  static checkMethod (category, adapterName, method) {
    if (!cachedConfig.get(category)[adapterName].methods.includes(method)) {
      throw new WrongMethodError(`Wrong method for ${category}.${adapterName} - ${method}`, `${category}.${adapterName}`)
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
    ClientAdapters.checkMethod('morphology', 'tufts', options.method)

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
    ClientAdapters.checkMethod('morphology', 'alpheiosTreebank', options.method)

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
    ClientAdapters.checkMethod('lemmatranslation', 'alpheios', options.method)

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
    ClientAdapters.checkMethod('lexicon', 'alpheios', options.method)

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
