import AlpheiosTuftsAdapter from '@clAdapters/adapters/tufts/adapter'
import AlpheiosChineseLocAdapter from '@clAdapters/adapters/chineseloc/adapter'
import AlpheiosTreebankAdapter from '@clAdapters/adapters/alpheiostb/adapter'
import AlpheiosLemmaTranslationsAdapter from '@clAdapters/adapters/translations/adapter'
import AlpheiosLexiconsAdapter from '@clAdapters/adapters/lexicons/adapter'
import AlpheiosConcordanceAdapter from '@clAdapters/adapters/concordance/adapter'
import ArethusaTreebankAdapter from '@clAdapters/adapters/arethusa/adapter'
import AlpheiosLogeionAdapter from '@clAdapters/adapters/logeion/adapter'
import AlpheiosTokenizationAdapter from '@clAdapters/adapters/tokenization/adapter'
import DTSAPIAdapter from '@clAdapters/adapters/dtsapi/adapter'

import WrongMethodError from '@clAdapters/errors/wrong-method-error'
import NoRequiredParamError from '@clAdapters/errors/no-required-param-error'

import AdaptersConfig from '@clAdapters/adapters/adapters-config.json'

let cachedConfig = new Map() // eslint-disable-line prefer-const
let cachedAdaptersList = new Map() // eslint-disable-line prefer-const

class ClientAdapters {
  /**
   * it is used for uploading data from AdaptersConfig to cachedConfig and CachedAdaptersList
  */
  static init () {
    if (cachedConfig.size === 0) {
      for (const category in AdaptersConfig) {
        let adapters = {} // eslint-disable-line prefer-const
        for (const adapterKey in AdaptersConfig[category]) {
          const adapterData = AdaptersConfig[category][adapterKey]

          adapters[adapterKey] = {
            adapter: ClientAdapters[adapterData.adapter],
            methods: adapterData.methods,
            params: adapterData.params
          }
        }
        cachedConfig.set(category, adapters)
      }

      for (const key of cachedConfig.keys()) {
        const res = {}
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

  static get autocompleteWords () {
    ClientAdapters.init()
    return cachedAdaptersList.get('autocompleteWords')
  }

  static get tokenizationGroup () {
    ClientAdapters.init()
    return cachedAdaptersList.get('tokenizationGroup')
  }

  static get dtsapiGroup () {
    ClientAdapters.init()
    return cachedAdaptersList.get('dtsapiGroup')
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
  * This method checks if given array with parameteres doesn't have required parameters, registered in config file
  * @param {[String]} params - array of parameter's names for being checked
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {String} methodName - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkParam (params, category, adapterName, methodName) {
    if (cachedConfig.get(category)[adapterName].params) {
      cachedConfig.get(category)[adapterName].params[methodName].forEach(paramName => {
        // Param values other than `undefined` such as `null` or empty strings could be valid values
        if (params && typeof params[paramName] === 'undefined') {
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

    const localMaAdapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: options.method,
      clientId: options.clientId,
      sourceData: options.sourceData
    })

    if (options.method === 'getHomonym') {
      const homonym = await localMaAdapter.getHomonym(options.params.languageID, options.params.word)
      return { result: homonym, errors: localMaAdapter.errors }
    }
    return null
  }

  static async chineseAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'chineseloc', options)

    const localChineseAdapter = new AlpheiosChineseLocAdapter({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: options.method,
      // A URL of a CEDICT service
      serviceUrl: options.serviceUrl
    })

    if (options.method === 'getHomonym') {
      const homonym = await localChineseAdapter.getHomonym(options.params.word, options.params.checkContextForward)
      return { result: homonym, errors: localChineseAdapter.errors }
    }
    if (options.method === 'loadData') {
      const result = await localChineseAdapter.loadData(options.params.timeout)
      return { result, errors: localChineseAdapter.errors }
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

    const localTbAdapter = new AlpheiosTreebankAdapter({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: options.method,
      clientId: options.clientId
    })
    if (options.method === 'getHomonym') {
      const homonym = await localTbAdapter.getHomonym(options.params.languageID, options.params.wordref)
      return { result: homonym, errors: localTbAdapter.errors }
    }
    return null
  }

  /**
   * it is used for getting data from arethusa
   * @param {Object} options - object contains parameters:
   *    @param {String} options.method - for now one value - "getHomonym" - action that should be done wth the help of adapter
   *    @param {Symbol} options.params.languageID - languageID value for the word
   *    @param {Symbol} options.params.word - target word
   *    @param {String} options.params.provider - the provider url for Arethusa
   *    @param {String} options.params.sentenceId - the sentence identifier
   *    @param {String} options.params.wordId - the word identifier
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Homonym, errors: [AdapterError] }
*/

  static async arethusaAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'arethusaTreebank', options)

    const localAdapter = new ArethusaTreebankAdapter({
      category: 'morphology',
      adapterName: 'arethusaTreebank',
      method: options.method,
      clientId: options.clientId
    })
    if (options.method === 'getHomonym') {
      const homonym = await localAdapter.getHomonym(options.params.languageID,
        options.params.word,
        options.params.provider,
        options.params.sentenceId,
        options.params.wordId)
      return { result: homonym, errors: localAdapter.errors }
    }
    if (options.method === 'refreshView') {
      const resp = await localAdapter.refreshView(options.params.provider)
      return { result: resp, errors: localAdapter.errors }
    }
    if (options.method === 'gotoSentence') {
      const resp = await localAdapter.gotoSentence(
        options.params.provider,
        options.params.sentenceId,
        options.params.wordIds
      )
      return { result: resp, errors: localAdapter.errors }
    }
    if (options.method === 'findWord') {
      const resp = await localAdapter.findWord(
        options.params.provider,
        options.params.word,
        options.params.prefix,
        options.params.suffix,
        options.params.sentenceId
      )
      return { result: resp, errors: localAdapter.errors }
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

    const localLemmasAdapter = new AlpheiosLemmaTranslationsAdapter({
      category: 'lemmatranslation',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId,
      sourceData: options.sourceData
    })

    if (options.method === 'fetchTranslations') {
      await localLemmasAdapter.getTranslationsList(options.params.homonym, options.params.browserLang)
      return { errors: localLemmasAdapter.errors }
    }
    return null
  }

  static async wordUsageExamples (options) {
    ClientAdapters.checkMethodParam('wordusageExamples', 'concordance', options)

    const localLemmasAdapter = new AlpheiosConcordanceAdapter({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: options.method,
      clientId: options.clientId
    })

    if (options.method === 'getAuthorsWorks') {
      const res = await localLemmasAdapter.getAuthorsWorks()
      return { result: res, errors: localLemmasAdapter.errors }
    }

    if (options.method === 'getWordUsageExamples') {
      const res = await localLemmasAdapter.getWordUsageExamples(options.params.homonym, options.params.filters, options.params.pagination, options.params.sort)
      return { result: res, errors: localLemmasAdapter.errors }
    }

    return null
  }

  /**
   * it is used for getting data from lexicons adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - action that should be done wth the help of adapter - fetchShortDefs and fetchFullDefs
   *    @param {Object} options.config - lexicon configuration supplied by client
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

    const adapterParams = {
      category: 'lexicon',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId,
      timeout: options.params && options.params.timeout ? options.params.timeout : 3000,
      callBackEvtSuccess: options.params ? options.params.callBackEvtSuccess : null,
      callBackEvtFailed: options.params ? options.params.callBackEvtFailed : null
    }

    const localLexiconsAdapter = new AlpheiosLexiconsAdapter(adapterParams, options.config)

    if (options.method === 'fetchShortDefs') {
      await localLexiconsAdapter.fetchShortDefs(options.params.homonym, options.params.opts)
      return { errors: localLexiconsAdapter.errors }
    }
    if (options.method === 'fetchFullDefs') {
      await localLexiconsAdapter.fetchFullDefs(options.params.homonym, options.params.opts)
      return { errors: localLexiconsAdapter.errors }
    }

    if (options.method === 'checkCachedData') {
      await localLexiconsAdapter.checkCachedData(options.params.url, options.params.externalData, options.params.skipFetch)
      return { errors: localLexiconsAdapter.errors }
    }

    if (options.method === 'getConfig') {
      return localLexiconsAdapter.config.lexicons
    }
    return null
  }

  /**
   * It is used for getting segments and tokens from Alpheios Tokenization Service
   * @param {Object} options
   */
  static async autoCompleteWords (options) {
    ClientAdapters.checkMethodParam('autocompleteWords', 'logeion', options)

    const localLogeionAdapter = new AlpheiosLogeionAdapter({
      category: 'autocompleteWords',
      adapterName: 'logeion',
      method: options.method,
      clientId: options.clientId,
      limit: options.params.limit,
      lang: options.params.lang,
      sourceData: options.params.sourceData,
      fetchOptions: options.params.fetchOptions
    })

    if (localLogeionAdapter.available && options.method === 'getWords') {
      const res = await localLogeionAdapter.getWords(options.params.text)
      return { result: res, errors: localLogeionAdapter.errors }
    }
    return null
  }

  /**
   * It is used for getting segments and tokens from Alpheios Tokenization Service
   * @param {Object} options
   */
  static async tokenizationMethod (options) {
    ClientAdapters.checkMethodParam('tokenizationGroup', 'alpheios', options)

    const localTokenizationAdapter = new AlpheiosTokenizationAdapter({
      category: 'tokenizationGroup',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId,
      fetchOptions: options.params.fetchOptions,
      storage: options.params.storage,
      sourceData: options.params.sourceData
    })

    if (!localTokenizationAdapter.available) {
      localTokenizationAdapter.addError(localTokenizationAdapter.l10n.getMsg('TOKENIZATION_AVAILABILITY_ERROR'))
      return {
        errors: localTokenizationAdapter.errors
      }
    }

    if (options.method === 'getTokens') {
      const res = await localTokenizationAdapter.getTokens(options.params.text)
      return { result: res, errors: localTokenizationAdapter.errors }
    }
    if (options.method === 'getConfig') {
      const res = await localTokenizationAdapter.getConfig()
      return { result: res, errors: localTokenizationAdapter.errors }
    }
    return null
  }

  static async dtsApiMethod (options) {
    ClientAdapters.checkMethodParam('dtsapiGroup', 'dtsapi', options)

    const localDTSAPIAdapter = new DTSAPIAdapter({
      category: 'dtsapiGroup',
      adapterName: 'dtsapi',
      method: options.method,
      clientId: options.clientId,
      baseUrl: options.params.baseUrl
    })

    if (options.method === 'getCollection') {
      const res = await localDTSAPIAdapter.getCollection(options.params.id)
      return { result: res, errors: localDTSAPIAdapter.errors }
    }

    if (options.method === 'getNavigation') {
      const res = await localDTSAPIAdapter.getNavigation(options.params.id, options.params.resource)
      return { result: res, errors: localDTSAPIAdapter.errors }
    }

    if (options.method === 'getDocument') {
      const res = await localDTSAPIAdapter.getDocument(options.params.id, options.params.refParams)
      return { result: res, errors: localDTSAPIAdapter.errors }
    }
  }
}

export default ClientAdapters
