import AlpheiosTuftsAdapter from '@/adapters/tufts/adapter'
import AlpheiosTreebankAdapter from '@/adapters/alpheiostb/adapter'
import AlpheiosLemmaTranslationsAdapter from '@/adapters/translations/adapter'
import AlpheiosLexiconsAdapter from '@/adapters/lexicons/adapter'

import WrongMethodError from '@/errors/wrong-method-error'
import NoRequiredParamError from '@/errors/no-required-param-error'

import AdaptersConfig from '@/adapters/adapters-config.json'

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

  static checkMethod (category, adapterName, methodName) {
    if (!cachedConfig.get(category)[adapterName].methods.includes(methodName)) {
      throw new WrongMethodError(category, adapterName, methodName)
    }
  }

  static checkParam (params, category, adapterName, methodName) {
    if (cachedConfig.get(category)[adapterName].params) {
      cachedConfig.get(category)[adapterName].params[methodName].forEach(paramName => {
        if (!params[paramName]) {
          throw new NoRequiredParamError(category, adapterName, methodName, paramName)
        }
      })
    }
  }

  static checkMethodParam (category, adapterName, options) {
    ClientAdapters.checkMethod(category, adapterName, options.method)
    ClientAdapters.checkParam(options.params, category, adapterName, options.method)
  }

  /*
   * it is used for getting data from morph adapter
   * @param {options} Object - object contains parametes:
   * options.method String - for now one value - "getHomonym" - action that should be done wth the help of adapter
   * options.params.languageID Symbol - languageID value for the word
   * options.params.word String - target word for what we will receive morph data
*/

  static async maAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'tufts', options)

    let localMaAdapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: options.method
    })

    if (options.method === 'getHomonym') {
      let homonym = await localMaAdapter.getHomonym(options.params.languageID, options.params.word)
      return { result: homonym, errors: localMaAdapter.errors }
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
    ClientAdapters.checkMethodParam('morphology', 'alpheiosTreebank', options)

    let localTbAdapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: options.method
    })
    if (options.method === 'getHomonym') {
      let homonym = await localTbAdapter.getHomonym(options.params.languageID, options.params.wordref)
      return { result: homonym, errors: localTbAdapter.errors }
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
    ClientAdapters.checkMethodParam('lemmatranslation', 'alpheios', options)

    let localLemmasAdapter = new AlpheiosLemmaTranslationsAdapter({
      category: 'lemmatranslation',
      adapterName: 'alpheios',
      method: options.method
    })

    if (options.method === 'fetchTranslations') {
      await localLemmasAdapter.getTranslationsList(options.params.homonym, options.params.browserLang)
      return { errors: localLemmasAdapter.errors }
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
    ClientAdapters.checkMethodParam('lexicon', 'alpheios', options)

    let localLexiconsAdapter = new AlpheiosLexiconsAdapter({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: options.method
    })

    if (options.method === 'fetchShortDefs') {
      await localLexiconsAdapter.fetchShortDefs(options.params.homonym, options.params.opts)
      return { errors: localLexiconsAdapter.errors }
    }
    if (options.method === 'fetchFullDefs') {
      await localLexiconsAdapter.fetchFullDefs(options.params.homonym, options.params.opts)
      return { errors: localLexiconsAdapter.errors }
    }
    return null
  }
}

export default ClientAdapters
