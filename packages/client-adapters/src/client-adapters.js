import AlpheiosTuftsAdapter from '@/adapters/tufts/adapter'
import AlpheiosChineseLocAdapter from '@/adapters/chineseloc/adapter'
import AlpheiosTreebankAdapter from '@/adapters/alpheiostb/adapter'
import AlpheiosLemmaTranslationsAdapter from '@/adapters/translations/adapter'
import AlpheiosLexiconsAdapter from '@/adapters/lexicons/adapter'
import AlpheiosConcordanceAdapter from '@/adapters/concordance/adapter'

import WrongMethodError from '@/errors/wrong-method-error'
import NoRequiredParamError from '@/errors/no-required-param-error'

import AdaptersConfig from '@/adapters/adapters-config.json'

let cachedConfig = new Map()
let cachedAdaptersList = new Map()

class ClientAdapters {
  /**
   * it is used for uploading data from AdaptersConfig to cachedConfig and CachedAdaptersList
  */
  static init () {
    if (cachedConfig.size === 0) {
      for (let category in AdaptersConfig) {
        let adapters = {}
        for (let adapterKey in AdaptersConfig[category]) {
          let adapterData = AdaptersConfig[category][adapterKey]

          adapters[adapterKey] = {
            adapter: ClientAdapters[adapterData.adapter],
            methods: adapterData.methods,
            params: adapterData.params
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
  /**
  *  Additional abstraction layer for structuring adapters
  *  it is used for retrieving data from morphology category
  */
  static get morphology () {
    ClientAdapters.init()
    return cachedAdaptersList.get('morphology')
  }
  /**
  * it is used for retrieving data from lexicon category
  */
  static get lexicon () {
    ClientAdapters.init()
    return cachedAdaptersList.get('lexicon')
  }
  /**
  * it is used for retrieving data from lemmatranslation category
  */
  static get lemmatranslation () {
    ClientAdapters.init()
    return cachedAdaptersList.get('lemmatranslation')
  }

  static get wordusageExamples () {
    ClientAdapters.init()
    return cachedAdaptersList.get('wordusageExamples')
  }

  /**
  * This method checks if given method is registered in config for category.adapterName
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {String} methodName - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkMethod (category, adapterName, methodName) {
    if (!cachedConfig.get(category)[adapterName].methods.includes(methodName)) {
      throw new WrongMethodError(category, adapterName, methodName)
    }
  }

  /**
  * This method checks if given array with parameteres doesn\'t have required parameters, registered in config file
  * @param {[String]} params - array of parameter\' names for being checked
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {String} methodName - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkParam (params, category, adapterName, methodName) {
    if (cachedConfig.get(category)[adapterName].params) {
      cachedConfig.get(category)[adapterName].params[methodName].forEach(paramName => {
        if (!params[paramName]) {
          throw new NoRequiredParamError(category, adapterName, methodName, paramName)
        }
      })
    }
  }

  /*
  * This method executes both checks for given options - checks method and given parameters from options
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {Object} options - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkMethodParam (category, adapterName, options) {
    ClientAdapters.checkMethod(category, adapterName, options.method)
    ClientAdapters.checkParam(options.params, category, adapterName, options.method)
  }

  /**
   * it is used for getting data from morph adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - for now one value - "getHomonym" - action that should be done wth the help of adapter
   *    @param {Symbol} options.params.languageID - languageID value for the word
   *    @param {String} options.params.word - target word for what we will receive morph data
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Homonym, errors: [AdapterError] }
*/

  static async maAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'tufts', options)

    let localMaAdapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: options.method,
      clientId: options.clientId
    })

    if (options.method === 'getHomonym') {
      let homonym = await localMaAdapter.getHomonym(options.params.languageID, options.params.word)
      return { result: homonym, errors: localMaAdapter.errors }
    }
    return null
  }

  static async chineseAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'chineseloc', options)

    let localChineseAdapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: options.method
    })

    if (options.method === 'getHomonym') {
      let homonym = await localChineseAdapter.getHomonym(options.params.word)
      return { result: homonym, errors: localChineseAdapter.errors }
    }
    return null
  }

  /**
   * it is used for getting data from treebank adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - for now one value - "getHomonym" - action that should be done wth the help of adapter
   *    @param {Symbol} options.params.languageID - languageID value for the word
   *    @param {String} options.params.wordref - target wordref for getting data from treebank adapter
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Homonym, errors: [AdapterError] }
*/

  static async tbAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'alpheiosTreebank', options)

    let localTbAdapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: options.method,
      clientId: options.clientId
    })
    if (options.method === 'getHomonym') {
      let homonym = await localTbAdapter.getHomonym(options.params.languageID, options.params.wordref)
      return { result: homonym, errors: localTbAdapter.errors }
    }
    return null
  }

  /**
   * it is used for getting data from translations adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - for now one value - "fetchTranslations" - action that should be done wth the help of adapter
   *    @param {Homonym} options.params.homonym - homonym for retrieving translations
   *    @param {String} options.params.browserLang - language for translations
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Boolean, errors: [AdapterError] }
*/
  static async lemmaTranslations (options) {
    ClientAdapters.checkMethodParam('lemmatranslation', 'alpheios', options)

    let localLemmasAdapter = new AlpheiosLemmaTranslationsAdapter({
      category: 'lemmatranslation',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId
    })

    if (options.method === 'fetchTranslations') {
      await localLemmasAdapter.getTranslationsList(options.params.homonym, options.params.browserLang)
      return { errors: localLemmasAdapter.errors }
    }
    return null
  }

  static async wordUsageExamples (options) {
    ClientAdapters.checkMethodParam('wordusageExamples', 'concordance', options)

    let localLemmasAdapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: options.method,
      clientId: options.clientId
    })

    if (options.method === 'getAuthorsWorks') {
      let res = await localLemmasAdapter.getAuthorsWorks()
      return { result: res, errors: localLemmasAdapter.errors }
    }

    if (options.method === 'getWordUsageExamples') {
      let res = await localLemmasAdapter.getWordUsageExamples(options.params.homonym, options.params.filters, options.params.pagination, options.params.sort)
      return { result: res, errors: localLemmasAdapter.errors }
    }

    return null
  }

  /**
   * it is used for getting data from lexicons adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - action that should be done wth the help of adapter - fetchShortDefs and fetchFullDefs
   *    @param {Homonym} options.params.homonym - homonym for retrieving translations
   *    @param {Object(allow: [String])} options.params.opts - an object with array of urls for dictionaries
   *    @param {PSEvent} options.params.callBackEvtSuccess - an event that should be published on success result
   *    @param {PSEvent} options.params.callBackEvtFailed - an event that should be published on failed result
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Boolean, errors: [AdapterError] }
*/
  static async lexicons (options) {
    ClientAdapters.checkMethodParam('lexicon', 'alpheios', options)

    let adapterParams = {
      category: 'lexicon',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId,
      timeout: options.params.timeout ? options.params.timeout : 3000,
      callBackEvtSuccess: options.params.callBackEvtSuccess,
      callBackEvtFailed: options.params.callBackEvtFailed
    }

    let localLexiconsAdapter = new AlpheiosLexiconsAdapter(adapterParams)

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
