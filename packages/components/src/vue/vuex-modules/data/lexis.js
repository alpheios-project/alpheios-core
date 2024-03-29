/* global DEVELOPMENT_MODE_BUILD */
import Module from '@/vue/vuex-modules/module.js'
import Platform from '@/lib/utility/platform.js'
import LexicalQuery from '@/lib/queries/lexical-query.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants, TreebankDataItem, HomonymGroup, Language, LanguageModelFactory as LMF, Logger } from 'alpheios-data-models'
import {
  CedictDestinationConfig as CedictProdConfig,
  CedictDestinationDevConfig as CedictDevConfig
} from 'alpheios-messaging'
import Vue from '@vue-runtime'
const clientId = 'alpheios-components'
let cedictConfig = CedictProdConfig
if (DEVELOPMENT_MODE_BUILD) { cedictConfig = CedictDevConfig }

export default class Lexis extends Module {
  /**
   * @param {object} store - A Vuex store.
   * @param {object} api - A public API object.
   * @param {object} config - A module's configuration object
   */
  constructor (store, api, config = {}) {
    super(store, api, config)
    // APIs provided by the app controller
    this._appApi = api.app
    this._settingsApi = api.settings
    this._lexisConfig = api.settings.getLexisOptions()
    this._lexiconsConfig = api.settings.getLexiconsOptions()
    this._adapters = config.adapters

    if (!this.hasCedict()) {
      // If CEDICT configuration is not available we will disable any CEDICT-related functionality
      Logger.getInstance().warn('CEDICT functionality will be disabled because CEDICT configuration is not available')
    }

    // Whether lemma translations are enabled
    this._lemmaTranslationEnabled = true
    // A locale for lemma translations (e.g. 'en-US')
    this._lemmaTranslationLocale = null
    // A TextSelector of the last lexical query
    this._lastTextSelector = null
    // Whether a treebank application has been initialized successfully
    this._treebankAvailable = false
    // A current TreebankDataItem
    this._treebankDataItem = null
    // A treebank data item of a last request, either successful or not
    this._lastTreebankDataItem = null
    // Whether a treebank service has been loaded
    this._treebankServiceLoaded = false
    // Add an iframe with CEDICT service if CEDICT config is available
    if (this.hasCedict()) { this.createCedictIframe() }

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this, store)

    this._treebankDataItem = TreebankDataItem.getTreebankData()
    if (this._treebankDataItem) {
      store.commit('lexis/setTreebankInfo', { treebankSrc: this._treebankDataItem.fullUrl, hasTreebankData: false })
      this.constructor.refreshUntilLoaded(
        this._treebankDataItem.provider,
        this.config.arethusaTbRefreshRetryCount,
        this.config.arethusaTbRefreshDelay)
        .then(() => {
          // Treebank app has become available
          this._treebankAvailable = true
          this._lastTreebankDataItem = this._treebankDataItem
        })
        .catch((err) => {
          // If refreshUntilLoaded failed treebank data will be unavailable
          Logger.getInstance().warn(err.message)
          store.commit('lexis/showTreebankFailedNotification')
          this._lastTreebankDataItem = this._treebankDataItem
        })
    }
    LexicalQuery.evt.CEDICT_SERVICE_UNINITIALIZED.sub(this.onCedictServiceUninitialized.bind(this, store))
  }

  hasCedict () {
    return Boolean(this._lexisConfig && this._lexisConfig.cedict)
  }

  hasLexiconsConfig () {
    // note that an empty config object is allowed
    // as it indicates that there are not remote settings
    // that override local ones
    return Boolean(this._lexiconsConfig)
  }

  createCedictIframe () {
    const iframe = document.createElement('iframe')
    iframe.id = cedictConfig.targetIframeID
    iframe.style.display = 'none'
    iframe.src = this._lexisConfig.cedict.target_url
    document.body.appendChild(iframe)
  }

  onCedictServiceUninitialized (store) {
    store.commit('lexis/setCedictUninitializedState')
    store.commit('lexis/showCedictNotification')
  }

  /**
   * A utility function to delay code execution.
   *
   * @param {number} ms - A number of milliseconds an execution should delayed by.
   * @returns {Promise} A promise that will be resolved when timeout is expired.
   */
  static timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * A utility function that will send a `refreshView` request to a treebank template
   * until a non-error response is received or a maximum number of retries is achieved.
   *
   * @param {string} provider - A URL of a treebank template app.
   * @param {number | string} retryCount - How many times to resend a request if a previous attempt failed.
   * @param {number | string} timeout - A timeout between resend attempts.
   * @returns {Promise<void> | Promise<Error>} - A promise that is resolved when a `refreshView`
   *          request succeeds or is reject when it fails after a certain number of retries.
   */
  static async refreshUntilLoaded (provider, retryCount, timeout) {
    let count = retryCount
    do {
      const result = await ClientAdapters.morphology.arethusaTreebank({
        method: 'refreshView',
        params: {
          provider,
          timeout: 10000 // set timeout explicitly to 10 seconds
        }
      })
      if (result.errors.length === 0) {
        // Request completed successfully
        return
      }
      // refreshView returned an error, let's try again after a timeout
      await this.timeout(timeout)
    } while (--count > 0)
    // All attempts to get a response with no errors failed
    throw new Error(`refreshUntilLoaded did not succeed in ${retryCount} attempts`)
  }

  static async getTreebankWordIds (treebankDataItem, textSelector) {
    const lm = LMF.getLanguageModel(textSelector.languageID)
    const findWordResult = await ClientAdapters.morphology.arethusaTreebank({
      method: 'findWord',
      params: {
        provider: treebankDataItem.provider,
        word: textSelector.normalizedText,
        prefix: lm.normalizeText(textSelector.textQuoteSelector.prefix),
        suffix: lm.normalizeText(textSelector.textQuoteSelector.suffix),
        sentenceId: treebankDataItem.sentenceId
      }
    })
    if (findWordResult.errors.length > 0) {
      findWordResult.errors.forEach(error => Logger.getInstance().error(error.message))
      throw new Error('findWord request failed')
    }
    if (findWordResult.result) {
      return findWordResult.result || []
    }
  }

  static async updateTreebankDiagram (treebankDataItem) {
    const loadResult = await ClientAdapters.morphology.arethusaTreebank({
      method: 'gotoSentence',
      params: {
        provider: treebankDataItem.provider,
        sentenceId: treebankDataItem.sentenceId,
        wordIds: treebankDataItem.wordIds
      }
    })
    if (loadResult.errors.length > 0) {
      loadResult.errors.forEach(error => Logger.getInstance().error(error.message))
      throw new Error('updateTreebankDiagram request failed')
    }
  }

  static async getHomonymsFromTreebank (treebankDataItem, textSelector) {
    let homonyms = await Promise.all(treebankDataItem.wordIds.map(async (wordId) => {
      const adapterTreebankRes = await ClientAdapters.morphology.arethusaTreebank({
        method: 'getHomonym',
        clientId: this.clientId,
        params: {
          languageID: textSelector.languageID,
          word: textSelector.normalizedText,
          provider: treebankDataItem.provider,
          sentenceId: treebankDataItem.sentenceId,
          wordId: wordId
        }
      })
      if (adapterTreebankRes.errors.length > 0) {
        throw new Error('Homonym data from treebank is not available')
      }
      return adapterTreebankRes.result
    }))
    // Filter incorrect and empty responses out
    homonyms = homonyms.filter(homonym => Boolean(homonym))
    return new HomonymGroup(homonyms)
  }

  _isFailedTreebank (treebankDataItem) {
    // If there were no previous requests we cannot say if the provider is failing
    if (!this._lastTreebankDataItem) { return false }
    // If we already tried to load this treebank and it failed then provider is failing
    // for this document
    if (this._lastTreebankDataItem.docUrl === treebankDataItem.docUrl &&
      !this._treebankAvailable) {
      return true
    }
    return false
  }

  _isTreebankLoaded (treebankDataItem) {
    // Not enough information to say or loading failed
    if (!this._lastTreebankDataItem || !this._treebankAvailable) { return false }
    return this._lastTreebankDataItem.docUrl === treebankDataItem.docUrl
  }

  async getTreebankData ({
    store,
    textSelector,
    treebankDataItem = null
  } = {}) {
    const wordIDs = await this.getTreebankWordIDs({
      store,
      textSelector,
      treebankDataItem
    })
    return wordIDs.length > 0 ? Lexis.getHomonymsFromTreebank(treebankDataItem, textSelector) : null
  }

  async getTreebankWordIDs ({
    store,
    textSelector,
    treebankDataItem = null
  } = {}) {
    let wordIDs = []

    this._treebankDataItem = treebankDataItem

    if (treebankDataItem && !this._isFailedTreebank(treebankDataItem)) {
      store.commit('lexis/hideTreebankFailedNotification')
      if (!this._isTreebankLoaded(treebankDataItem)) {
        /*
        Treebank's doc has changed. A treebank app's URL in an iframe needs to be updated
        only when a document ID changes. If document ID stayed the same and only a sentence ID changed,
        we can keep an iframe URL the same: `gotoSentence` request will navigate to the
        correct sentence sentence regardless of what sentence ID is in the URL. After a URL is chanted,
        we need to wait for a treebank app to be loaded. The first step is to reset an app's URL
        and wait for this change to be applied to DOM; that's why the use of `Vue.nextTick()`.
        Without this step, refreshUntilLoaded()` may succeed but
        for the previous treebank URL, not for the current one. This is not what we want.
        As a next step, we set a new URL, wait for the next tick, and issue a `refreshView` request.
         */

        /*
        Reset a treebank source URL but keep a previous `hasTreebankData` state var value.
        `hasTreebankData` controls whether a treebank icon is shown. If we reset it here and then set to true
        a several moments later, when treebank is loaded, an icon will flash. We want to avoid that
        to keep a user experience as smooth as possible. That's why we keep it in its previous
        state until a `refreshView` request is completed.
         */
        store.commit('lexis/setTreebankInfo', { treebankSrc: null })
        await Vue.nextTick()
        store.commit('lexis/setTreebankInfo', { treebankSrc: treebankDataItem.fullUrl })
        try {
          /*
          We need to wait until a URL change is applied to the iframe within the treebank Vue component
          before issuing a refreshUntilLodaed request. Without that, a refresh request will take effect on
          the old URL, not on the new one. We can use `nextTick()` to wait until the update is completed
          and call `refreshUntilLoaded()` after that.
           */
          await Vue.nextTick()
          await Lexis.refreshUntilLoaded(
            treebankDataItem.provider,
            this.config.arethusaTbRefreshRetryCount,
            this.config.arethusaTbRefreshDelay
          )
          this._treebankAvailable = true
          this._lastTreebankDataItem = treebankDataItem
          // No need to update treebank sourceURL
          store.commit('lexis/setTreebankInfo', {
            hasTreebankData: treebankDataItem.hasSentenceData,
            suppressTree: treebankDataItem.suppressTree
          })
        } catch (err) {
          // If refreshUntilLoaded failed treebank data will be unavailable
          Logger.getInstance().warn(err.message)
          this._treebankAvailable = false
          this._treebankDataItem = null
          this._lastTreebankDataItem = treebankDataItem
          store.commit('lexis/setTreebankInfo', { hasTreebankData: false })
          store.commit('lexis/showTreebankFailedNotification')
        }
      } else {
        // Do not update a treebankSrc in a store, it has not changed
        this._lastTreebankDataItem = treebankDataItem
        store.commit('lexis/setTreebankInfo', {
          hasTreebankData: treebankDataItem.hasSentenceData,
          suppressTree: treebankDataItem.suppressTree
        })
      }
      try {
        if (!treebankDataItem.hasWordData) {
          // Try to get words IDs from an Arethusa treebank app
          const wordIDs = await Lexis.getTreebankWordIds(treebankDataItem, textSelector)
          if (wordIDs.length > 0) {
            treebankDataItem.setWordData(wordIDs)
          }
        }
        wordIDs = treebankDataItem.wordIds
      } catch (err) {
        // Treebank data is unavailable
        store.commit('lexis/setTreebankInfo', { hasTreebankData: false })
        Logger.getInstance().warn(err)
      }

      /*
        Update a treebank diagram to highlight selected words but don't wait for it to finish
        (to not hold the following requests back).
        This must be done as the last call in a chain of other treebank requests because
        previous calls might send `gotoSentence` request without any `wordIds` data.
        Such requests will cause no words to be highlighted on a diagram. If they will be executed
        after `updateTreebankDiagram` request, they will erase a highlighting made by `updateTreebankDiagram`.
         */
      try {
        Lexis.updateTreebankDiagram(treebankDataItem)
      } catch (err) {
        Logger.getInstance().error(err)
        // Mark treebank data as unavailable
        store.commit('lexis/setTreebankInfo', { hasTreebankData: false })
      }
    } else if (this._treebankAvailable) {
      // Treebank icon is shown if $store.state.lexis.hasTreebankData
      store.commit('lexis/setTreebankInfo', { hasTreebankData: false })
      this._treebankDataItem = null
    }
    return wordIDs
  }

  async getWordQueryData ({ variables, pollInterval = 1000, maxIterations = 10, source, languageId } = {}) {
    return new Promise((resolve, reject) => {
      try {
        this._adapters.wordQuery.observableQuery({
          variables,
          // This callback is called every time the GraphQL query is updated, until the query is complete.
          dataCallback: (result) => {
            // Data would contain an array of homonyms
            let homonym = null
            const state = result.extensions.state
            if (!state.lexemes.loading) {
              if (state.lexemes.available && result.data.homonyms) {
                const homonymGroup = HomonymGroup.fromJsonObject({ homonyms: result.data.homonyms })
                if (homonymGroup.homonyms.length > 1) {
                  Logger.getInstance().warn('Multiple homonyms are not supported at the moment. Only the first homonym will be used')
                }
                homonym = homonymGroup.homonyms[0]
              }
              if (source !== LexicalQuery.sources.WORDLIST) {
                if (state.lexemes.available) {
                  LexicalQuery.evt.HOMONYM_READY.pub(homonym)
                } else {
                  LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.pub({
                    targetWord: variables.word,
                    languageId: languageId
                  })
                }
              }
            }
            if (!state.shortDefs.loading) {
              if (source !== LexicalQuery.sources.WORDLIST) {
                if (state.shortDefs.available) {
                  LexicalQuery.evt.SHORT_DEFS_READY.pub({
                    requestType: 'short',
                    homonym: homonym,
                    word: variables.word
                  })
                } else {
                  LexicalQuery.evt.SHORT_DEFS_NOT_FOUND.pub({
                    requestType: 'short',
                    word: variables.word
                  })
                }
              }
            }
            if (!state.loading) {
              const errors = result.errors || []
              // A GraphQL query is complete
              resolve({ homonym, state, errors })
            }
          },
          pollInterval,
          maxIterations
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  async lexicalQuery ({
    store,
    textSelector,
    siteOptions = [],
    wordUsageExamples = null,
    checkContextForward = '',
    treebankDataItem = null,
    source = LexicalQuery.sources.PAGE // Values that are possible currently are: 'page', 'lookup', 'wordlist'
  } = {}) {
    if (textSelector.languageID === Constants.LANG_CHINESE && !this.hasCedict()) {
      Logger.getInstance().warn('Lookup request cannot be completed: CEDICT configuration is unavailable')
      return
    }

    if (!wordUsageExamples) { wordUsageExamples = this._appApi.getWordUsageExamplesQueryParams(textSelector) }

    if (source !== LexicalQuery.sources.WORDLIST) {
      this._appApi.newLexicalRequest(textSelector.normalizedText, textSelector.languageID, textSelector.data, source)
    }

    let treebankWordIDs = []
    if (source === LexicalQuery.sources.PAGE) {
      treebankWordIDs = await this.getTreebankWordIDs({
        store,
        textSelector,
        treebankDataItem
      })
    }

    /*
    TODO: Retrieve lemma, then merge with resources available
     */

    const language = LMF.getLanguageModel(textSelector.languageID).language
    const word = textSelector.normalizedText

    let result
    // A result of a getWordQueryData() request
    let wqData
    // This is a bypass of an old workflow for Latin and Greek
    if (language.isOneOf([Language.LATIN, Language.GREEK])) {
      // The new workflow is enabled for Latin only
      let variables = {
        language: language.toCode(),
        location: textSelector.location,
        word,
        getLexemes: true,
        getShortDefs: true,
        useMorphService: true
      }

      if (language.equals(Language.PERSIAN)) { variables.useWordAsLexeme = true }

      if (treebankWordIDs.length > 0) {
        // There is treebank data available on the page
        const treebankVariables = {
          useTreebankData: true,
          treebankProvider: treebankDataItem.provider,
          treebankSentenceID: treebankDataItem.sentenceId,
          treebankWordIDs
        }
        variables = { ...variables, ...treebankVariables }
      }

      try {
        wqData = await this.getWordQueryData({
          variables,
          source
        })
      } catch (err) {
        Logger.getInstance().error('Observable word query error', err)
      }

      if (wqData && wqData.homonym) {
        let homonym = wqData.homonym // eslint-disable-line prefer-const

        // Get lemma translations. Lemma translations are enabled for Latin only
        if (this._lemmaTranslationEnabled && textSelector.languageID === Constants.LANG_LATIN) {
          homonym = await Lexis.getLemmaTranslations({
            homonym, browserLang: this._lemmaTranslationLocale, clientId: this._appApi.clientId, source
          })
        }

        // Get word usage examples
        if (wordUsageExamples) {
          homonym = await Lexis.getWordUsageExamples({
            homonym, paginationAuthMax: wordUsageExamples.paginationAuthMax, clientId: this._appApi.clientId
          })
        }

        const languageCode = LMF.getLanguageCodeFromId(textSelector.languageID)
        homonym = await Lexis.getFullDefinitions({
          homonym,
          languageCode,
          clientId: this._appApi.clientId,
          location: textSelector.location,
          siteOptions,
          resourceOptions: this._settingsApi.getResourceOptions()
        })
        if (source !== LexicalQuery.sources.WORDLIST) {
          LexicalQuery.evt.LEXICAL_QUERY_COMPLETE.pub({
            resultStatus: LexicalQuery.resultStatus.SUCCEEDED,
            homonym: homonym
          })
        }
      } else {
        Logger.getInstance().error('Homonym is not available')
        if (source !== LexicalQuery.sources.WORDLIST) {
          LexicalQuery.evt.LEXICAL_QUERY_COMPLETE.pub({
            resultStatus: LexicalQuery.resultStatus.FAILED
          })
        }
      }
    } else {
      /*
      Use the old workflow for languages other than Latin and Greek
       */
      let annotatedHomonyms
      if (treebankWordIDs.length > 0) {
        annotatedHomonyms = await this.getTreebankData({
          store, textSelector, treebankDataItem
        })
      }

      const lexQuery = LexicalQuery.create(textSelector, {
        clientId: this._appApi.clientId,
        siteOptions,
        verboseMode: this._settingsApi.isInVerboseMode(),
        wordUsageExamples,
        resourceOptions: this._settingsApi.getResourceOptions(),
        langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } }, // TODO this should be externalized
        checkContextForward,
        cedictServiceUrl: this.hasCedict() ? this._lexisConfig.cedict.target_url : null,
        lexiconsConfig: this.hasLexiconsConfig() ? this._lexiconsConfig : null,
        annotatedHomonyms,
        source
      })
      result = lexQuery.getData()
    }

    // Hide a CEDICT notification on a new lexical query
    store.commit('lexis/hideCedictNotification')
    return result
  }

  // TODO: Should be moved behind the GraphQL facade
  static async getLemmaTranslations ({ homonym, browserLang, clientId, source }) {
    const adapterTranslationRes = await ClientAdapters.lemmatranslation.alpheios({
      method: 'fetchTranslations',
      clientId: clientId,
      params: {
        homonym,
        browserLang
      }
    })
    /*
    If the request obtained any translations they will be attached
    to the `translation` prop of the corresponding lexeme's lemma object.
    The `adapterTranslationRes` object will contain only errors, if any.
     */
    if (adapterTranslationRes.errors.length > 0) {
      adapterTranslationRes.errors.forEach(error => Logger.getInstance().log(error.message))
    }
    // Suppress events that will trigger UI messages if source is wordlist
    if (source !== LexicalQuery.sources.WORDLIST) {
      LexicalQuery.evt.LEMMA_TRANSL_READY.pub(homonym)
    } else {
      LexicalQuery.evt.WORDLIST_UPDATE_LEMMA_TRANSL_READY.pub(homonym)
    }
    return homonym
  }

  // TODO: Should be moved behind the GraphQL facade
  static async getWordUsageExamples ({ homonym, paginationAuthMax, clientId }) {
    // the default query for usage examples should be to request all examples
    // for all authors, with user pagination preference for max number of examples
    // per author applied. Total max across all authors will be enforced on the
    // client adapter side. Different pagination options may apply when working
    // directly with the usage examples display
    const adapterConcordanceRes = await ClientAdapters.wordusageExamples.concordance({
      method: 'getWordUsageExamples',
      clientId: clientId,
      params: {
        homonym,
        pagination: {
          property: 'authmax',
          value: paginationAuthMax
        }
      }
    })
    if (adapterConcordanceRes.errors.length > 0) {
      adapterConcordanceRes.errors.forEach(error => Logger.getInstance().log(error))
    }
    LexicalQuery.evt.WORD_USAGE_EXAMPLES_READY.pub(adapterConcordanceRes.result)
    return homonym
  }

  // TODO: Should be moved behind the GraphQL facade
  static async getFullDefinitions ({ homonym, languageCode, clientId, location, siteOptions, resourceOptions }) {
    let adapterLexiconResFull = {}
    // Do not retrieve full definition for wordlist requests
    if (this._source !== LexicalQuery.sources.WORDLIST) {
      const lexiconFullOpts = LexicalQuery.getLexiconOptions({
        lexiconKey: 'lexicons',
        languageCode,
        location: location,
        siteOptions: siteOptions,
        resourceOptions: resourceOptions
      })
      adapterLexiconResFull = await ClientAdapters.lexicon.alpheios({
        method: 'fetchFullDefs',
        clientId: clientId,
        params: {
          opts: lexiconFullOpts,
          homonym,
          callBackEvtSuccess: LexicalQuery.evt.FULL_DEFS_READY,
          callBackEvtFailed: LexicalQuery.evt.FULL_DEFS_NOT_FOUND
        }
      })
      if (adapterLexiconResFull.errors.length > 0) {
        adapterLexiconResFull.errors.forEach(error => this.logger.log(error))
      }
    }
    return homonym
  }
}

Lexis.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      cedictDataLoaded: false,
      cedictLoadingInProgress: false,
      cedictDisplayNotification: false,
      hasTreebankData: false, // Whether treebank has any word or sentence data
      treebankSrc: null,
      // The following indicates that treebank resource is unavailable as the latest refresh request to it failed
      treebankRefreshFailed: false
    },

    mutations: {
      setCedictUninitializedState (state) {
        state.cedictDataLoaded = false
        state.cedictLoadingInProgress = false
      },

      setCedictInitInProgressState (state) {
        state.cedictDataLoaded = false
        state.cedictLoadingInProgress = true
      },

      setCedictLoadedState (state) {
        state.cedictDataLoaded = true
        state.cedictLoadingInProgress = false
      },

      showCedictNotification (state) {
        state.cedictDisplayNotification = true
      },

      hideCedictNotification (state) {
        state.cedictDisplayNotification = false
      },

      /**
       * Sets treebank information in a Vuex store.
       *
       * @param {object} state - A Vuex state object.
       * @param {object} data - A data object.
       * @param {string} data.treebankSrc - A URL of a treebank app.
       * @param {boolean} data.hasTreebankData - Whether there is any treebank word or sentence data
       * to show on a diagram.
       * @param data.suppressTree
       */
      setTreebankInfo (state, {
        treebankSrc = undefined,
        hasTreebankData = undefined,
        suppressTree = false
      } = {}) {
        // Update store variables only if some meaningful values are provided
        if (typeof hasTreebankData !== 'undefined') { state.hasTreebankData = hasTreebankData }
        if (typeof treebankSrc !== 'undefined') { state.treebankSrc = treebankSrc }
        if (typeof suppressTree !== 'undefined') { state.suppressTree = suppressTree }
      },

      resetTreebankInfo (state) {
        state.hasTreebankData = false
        state.treebankSrc = null
        state.treebankSrc = false
      },

      showTreebankFailedNotification (state) {
        state.treebankRefreshFailed = true
      },

      hideTreebankFailedNotification (state) {
        state.treebankRefreshFailed = false
      }
    }
  }
}

Lexis.api = (moduleInstance, store) => {
  return {
    /**
     * A selector for the last lexical query done via a `getSelectedText()`
     *
     * @type {TextSelector | null}
     */
    lastTextSelector: moduleInstance._lastTextSelector,

    /**
     * Starts a lexical query from a page.
     *
     * @param {TextSelector} textSelector - A selector with the text selected.
     * @param {HTMLElement} selectionTarget - An HTML element containing the selection.
     */
    getSelectedText: (textSelector, selectionTarget) => {
      moduleInstance._lastTextSelector = textSelector
      moduleInstance.lexicalQuery({
        store,
        textSelector,
        wordUsageExamples: moduleInstance._appApi.getWordUsageExamplesQueryParams(textSelector),
        checkContextForward: textSelector.checkContextForward,
        treebankDataItem: TreebankDataItem.getTreebankData(selectionTarget),
        source: LexicalQuery.sources.PAGE
      })
    },

    /**
     * Starts a lexical query from a lookup component.
     *
     * @param {TextSelector} textSelector - A text selector object containing information about a lookup word.
     */
    lookupText: async (textSelector) => {
      // Treebank info is not available for queries from a lookup component
      store.commit('lexis/setTreebankInfo', { hasTreebankData: false })
      return moduleInstance.lexicalQuery({ store, textSelector, source: LexicalQuery.sources.LOOKUP })
    },

    /**
     * Starts a lexical query for adding data to wordlist.
     *
     * @param {TextSelector} textSelector - A text selector object containing information about a word from the wordlist.
     */
    lookupForWordlist: async (textSelector) => {
      return moduleInstance.lexicalQuery({ store, textSelector, source: LexicalQuery.sources.WORDLIST })
    },

    enableLemmaTranslations (lemmaTranslationLocale) {
      if (!lemmaTranslationLocale) {
        throw new Error('A lemma translations locale should be provided')
      }
      this._lemmaTranslationEnabled = true
      moduleInstance._lemmaTranslationLocale = lemmaTranslationLocale
    },

    disableLemmaTranslations () {
      this._lemmaTranslationEnabled = false
      moduleInstance._lemmaTranslationLocale = null
    },

    loadCedictData: async () => {
      if (!moduleInstance.hasCedict()) { return } // Do nothing if CEDICT configuration is not available
      store.commit('lexis/setCedictInitInProgressState')
      const loadResult = await ClientAdapters.morphology.chineseloc({
        method: 'loadData',
        clientId,
        serviceUrl: moduleInstance._lexisConfig.cedict.target_url,
        params: {
          timeout: 60000 // Use a long timeout of 10 minutes because loading of CEDICT data may take a while
        }
      })
      if (loadResult.errors.length === 0) {
        store.commit('lexis/setCedictLoadedState')
      } else {
        Logger.getInstance().error('Load CEDICT data request failed', loadResult.errors)
      }
    },

    hideCedictNotification: () => {
      store.commit('lexis/hideCreebankFailedNoedictNotification')
    },

    refreshTreebankView: async () => {
      if (moduleInstance._treebankDataItem && !moduleInstance._isFailedTreebank(moduleInstance._treebankDataItem)) {
        try {
          await Lexis.refreshUntilLoaded(
            moduleInstance._treebankDataItem.provider,
            moduleInstance.arethusaTbRefreshRetryCount,
            moduleInstance.arethusaTbRefreshDelay
          )
        } catch (err) {
          // Treebank data is probably not available
          Logger.getInstance().warn(err.message)
          moduleInstance._treebankAvailable = false
          moduleInstance._lastTreebankDataItem = moduleInstance._treebankDataItem
          moduleInstance._treebankDataItem = null
          store.commit('lexis/resetTreebankInfo')
          store.commit('lexis/showTreebankFailedNotification')
        }
      }
    }
  }
}
Lexis._configDefaults = {
  _moduleName: 'lexis',
  _moduleType: Module.types.DATA,
  _supportedDeviceTypes: [Platform.deviceTypes.ANY]
}
