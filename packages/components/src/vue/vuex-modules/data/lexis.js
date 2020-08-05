/* global DEVELOPMENT_MODE_BUILD */
import Module from '@/vue/vuex-modules/module.js'
import Platform from '@/lib/utility/platform.js'
import LexicalQuery from '@/lib/queries/lexical-query.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants, TreebankDataItem, HomonymGroup, LanguageModelFactory as LMF, Logger } from 'alpheios-data-models'
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

    if (!this._lexisConfig) {
      // If Lexis configuration is not available we will disable any CEDICT-related functionality
      Logger.getInstance().warn('CEDICT functionality will be disabled because LexisCS configuration is not available')
    }

    // A locale for lemma translations (e.g. 'en-US')
    this._lemmaTranslationLang = null
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
    // Add an iframe with CEDICT service if Lexis config is available
    if (this._lexisConfig) { this.createCedictIframe() }

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
    let annotatedHomonyms

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
          store.commit('lexis/setTreebankInfo', { hasTreebankData: treebankDataItem.hasSentenceData })
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
        store.commit('lexis/setTreebankInfo', { hasTreebankData: treebankDataItem.hasSentenceData })
      }
      try {
        if (!treebankDataItem.hasWordData) {
          // Try to get words IDs from an Arethusa treebank app
          const wordIDs = await Lexis.getTreebankWordIds(treebankDataItem, textSelector)
          if (wordIDs.length > 0) {
            treebankDataItem.setWordData(wordIDs)
          }
        }
        annotatedHomonyms = await Lexis.getHomonymsFromTreebank(treebankDataItem, textSelector)
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
    return annotatedHomonyms
  }

  async lexicalQuery ({
    store,
    textSelector,
    siteOptions = [],
    lemmaTranslations = null,
    wordUsageExamples = null,
    checkContextForward = '',
    treebankDataItem = null,
    source = LexicalQuery.sources.PAGE // Values that are possible currently are: 'page', 'lookup', 'wordlist'
  } = {}) {
    if (textSelector.languageID === Constants.LANG_CHINESE && !this._lexisConfig) {
      Logger.getInstance().warn('Lookup request cannot be completed: LexisCS configuration is unavailable')
      return
    }

    if (!lemmaTranslations && textSelector.languageID === Constants.LANG_LATIN && this._lemmaTranslationLang) {
      // Use our own rules if lemmaTranslations is not provided
      lemmaTranslations = { locale: this._lemmaTranslationLang }
    }
    if (!wordUsageExamples) { wordUsageExamples = this._appApi.getWordUsageExamplesQueryParams(textSelector) }

    if (source !== LexicalQuery.sources.WORDLIST) {
      this._appApi.newLexicalRequest(textSelector.normalizedText, textSelector.languageID, textSelector.data, source)
    }

    let annotatedHomonyms
    if (source === LexicalQuery.sources.PAGE) {
      annotatedHomonyms = await this.getTreebankData({
        store, textSelector, treebankDataItem
      })
    }

    const lexQuery = LexicalQuery.create(textSelector, {
      clientId: this._appApi.clientId,
      siteOptions,
      verboseMode: this._settingsApi.isInVerboseMode(),
      lemmaTranslations,
      wordUsageExamples,
      resourceOptions: this._settingsApi.getResourceOptions(),
      langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } }, // TODO this should be externalized
      checkContextForward,
      cedictServiceUrl: this._lexisConfig ? this._lexisConfig.cedict.target_url : null,
      annotatedHomonyms,
      source
    })
    const result = lexQuery.getData()

    // Hide a CEDICT notification on a new lexical query
    store.commit('lexis/hideCedictNotification')
    return result
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
       *        to show on a diagram.
       */
      setTreebankInfo (state, {
        treebankSrc = undefined,
        hasTreebankData = undefined
      } = {}) {
        // Update store variables only if some meaningful values are provided
        if (typeof hasTreebankData !== 'undefined') { state.hasTreebankData = hasTreebankData }
        if (typeof treebankSrc !== 'undefined') { state.treebankSrc = treebankSrc }
      },

      resetTreebankInfo (state) {
        state.hasTreebankData = false
        state.treebankSrc = null
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

    setLemmaTranslationLang (lemmaTranslationLang) {
      moduleInstance._lemmaTranslationLang = lemmaTranslationLang
    },

    loadCedictData: async () => {
      if (!moduleInstance._lexisConfig) { return } // Do nothing if Lexis configuration is not available
      store.commit('lexis/setCedictInitInProgressState')
      const loadResult = await ClientAdapters.morphology.chineseloc({
        method: 'loadData',
        clientId,
        serviceUrl: moduleInstance._lexisConfig ? moduleInstance._lexisConfig.cedict.target_url : null,
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
