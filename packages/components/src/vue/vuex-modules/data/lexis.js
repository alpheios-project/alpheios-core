/* global DEVELOPMENT_MODE_BUILD */
import Module from '@/vue/vuex-modules/module.js'
import Platform from '@/lib/utility/platform.js'
import HTMLSelector from '@/lib/selection/media/html-selector.js'
import LexicalQuery from '@/lib/queries/lexical-query.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants, TreebankDataItem, HomonymGroup, LanguageModelFactory as LMF } from 'alpheios-data-models'
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
   * @param {object} config - A module's configuration object:
   *        {Function} config.getSelectedText - A UI controller's function to start a lexical query.
   *        This is a temporary solution until wil fully integrate lexical query functionality into a
   *        UI controller.
   */
  constructor (store, api, config = {}) {
    super(store, api, config)
    // APIs provided by the UI controller
    this._appApi = api.app
    this._uiApi = api.ui
    this._settingsApi = api.settings
    this._lexisConfig = (api.app.config && api.app.config['lexis-cs']) ? api.app.config['lexis-cs'] : null

    if (!this._lexisConfig) {
      // If Lexis configuration is not available we will disable any CEDICT-related functionality
      console.warn('CEDICT functionality will be disabled because LexisCS configuration is not available')
    }

    // A TextSelector of the last lexical query
    this._lastTextSelector = null
    // Whether a treebank application has been initialized
    this._treebankReady = false
    // A current TreebankDataItem
    this._treebankDataItem = null
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
          this._treebankReady = true
        })
        .catch((err) => {
          // If refreshUntilLoaded failed treebank data will be unavailable
          console.warn(err.message)
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
          provider
        }
      })
      if (result.errors.length === 0) {
        // Request completed successfully
        return
      }
      // refreshView returned an error, let's try again after a timeout
      await this.timeout(timeout)
    } while (count--)
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
      findWordResult.errors.forEach(error => console.error(error.message))
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
      loadResult.errors.forEach(error => console.error(error.message))
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
        return undefined
      }
      return adapterTreebankRes.result
    }))
    // Filter incorrect and empty responses out
    homonyms = homonyms.filter(homonym => Boolean(homonym))
    return new HomonymGroup(homonyms)
  }

  async getTreebankData ({
    store,
    textSelector,
    treebankDataItem = null
  } = {}) {
    const prevTreebankDataItem = this._treebankDataItem || {}
    this._treebankDataItem = treebankDataItem
    let annotatedHomonyms

    if (this._treebankReady && this._treebankDataItem) {
      if (prevTreebankDataItem.doc !== this._treebankDataItem.doc) {
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
        this._treebankReady = false
        await Vue.nextTick()
        store.commit('lexis/setTreebankInfo', { treebankSrc: this._treebankDataItem.fullUrl })
        try {
          /*
          We need to wait until a URL change is applied to the iframe within the treebank Vue component
          before issuing a refreshUntilLodaed request. Without that, a refresh request will take effect on
          the old URL, not on the new one. We can use `nextTick()` to wait until the update is completed
          and call `refreshUntilLoaded()` after that.
           */
          await Vue.nextTick()
          await Lexis.refreshUntilLoaded(
            this._treebankDataItem.provider,
            this.config.arethusaTbRefreshRetryCount,
            this.config.arethusaTbRefreshDelay
          )
          this._treebankReady = true
          // No need to update treebank sourceURL
          store.commit('lexis/setTreebankInfo', { hasTreebankData: this._treebankDataItem.hasSentenceData })
        } catch (err) {
          // If refreshUntilLoaded failed treebank data will be unavailable
          console.warn(err.message)
          this._treebankReady = false
          store.commit('lexis/setTreebankInfo', { hasTreebankData: false })
        }
      } else {
        // Do not update a treebankSrc in a store, it has not changed
        store.commit('lexis/setTreebankInfo', { hasTreebankData: this._treebankDataItem.hasSentenceData })
      }
      try {
        if (!this._treebankDataItem.hasWordData) {
          // Try to get words IDs from an Arethusa treebank app
          const wordIDs = await Lexis.getTreebankWordIds(this._treebankDataItem, textSelector)
          if (wordIDs.length > 0) {
            this._treebankDataItem.setWordData(wordIDs)
          }
        }
        annotatedHomonyms = await Lexis.getHomonymsFromTreebank(this._treebankDataItem, textSelector)
      } catch (err) {
        console.error(err)
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
        Lexis.updateTreebankDiagram(this._treebankDataItem)
      } catch (err) {
        console.error(err)
        // Mark treebank data as unavailable
        store.commit('lexis/setTreebankInfo', { hasTreebankData: false })
      }
    } else if (this._treebankReady) {
      store.commit('lexis/resetTreebankInfo')
      this._treebankReady = false
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
    source = 'page'
  } = {}) {
    if (textSelector.languageID === Constants.LANG_CHINESE && !this._lexisConfig) {
      console.warn('Lookup request cannot be completed: LexisCS configuration is unavailable')
      return
    }

    if (!lemmaTranslations && textSelector.languageID === Constants.LANG_LATIN && store.state.app.lemmaTranslationLang) {
      // Use our own rules if lemmaTranslations is not provided
      lemmaTranslations = { locale: store.state.app.lemmaTranslationLang }
    }
    if (!wordUsageExamples) { wordUsageExamples = this._appApi.getWordUsageExamplesQueryParams(textSelector) }

    if (source !== 'wordlist') {
      this._appApi.newLexicalRequest(textSelector.normalizedText, textSelector.languageID, textSelector.data, source)
    }

    let annotatedHomonyms
    if (source === 'page') {
      annotatedHomonyms = await this.getTreebankData({
        store, textSelector, treebankDataItem
      })
    }

    const lexQuery = LexicalQuery.create(textSelector, {
      clientId: this._appApi.clientId,
      siteOptions,
      verboseMode: this._settingsApi.verboseMode(),
      lemmaTranslations,
      wordUsageExamples,
      resourceOptions: this._settingsApi.getResourceOptions(),
      langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } }, // TODO this should be externalized
      checkContextForward,
      cedictServiceUrl: this._lexisConfig ? this._lexisConfig.cedict.target_url : null,
      annotatedHomonyms
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
      treebankSrc: null
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
      }
    }
  }
}

Lexis.api = (moduleInstance, store) => {
  return {
    /**
     * Starts a lexical query from a page.
     *
     * @param {EventElement} event - An event that initiated a query.
     * @param {Event} domEvent - A corresponding DOM event.
     */
    getSelectedText: (event, domEvent) => {
      if (moduleInstance._appApi.isGetSelectedTextEnabled(domEvent)) {
        const defaultLangCode = moduleInstance._appApi.getDefaultLangCode()
        const htmlSelector = new HTMLSelector(event, defaultLangCode)
        const textSelector = htmlSelector.createTextSelector()

        if (textSelector && !textSelector.isEmpty()) {
          const lastTextSelector = moduleInstance._lastTextSelector || {}
          const checkSameTestSelector = (
            lastTextSelector.text === textSelector.text &&
            lastTextSelector.languageID === textSelector.languageID &&
            moduleInstance._uiApi.isPopupVisible()
          )
          if (checkSameTestSelector) {
            // Do nothing
            return
          }
          moduleInstance._lastTextSelector = textSelector

          moduleInstance.lexicalQuery({
            store,
            textSelector,
            wordUsageExamples: moduleInstance._appApi.getWordUsageExamplesQueryParams(textSelector),
            checkContextForward: textSelector.checkContextForward,
            treebankDataItem: TreebankDataItem.getTreebankData(htmlSelector.target),
            source: 'page'
          })
        }
      }
    },

    /**
     * Starts a lexical query from a lookup component.
     *
     * @param {TextSelector} textSelector - A text selector object containing information about a lookup word.
     * @param {string} lemmaTranslationLang - A locale for lemma translations (e.g. 'en-US')
     */
    lookupText: async (textSelector) => {
      return moduleInstance.lexicalQuery({ store, textSelector, source: 'lookup' })
    },

    /**
     * Starts a lexical query for adding data to wordlist.
     *
     * @param {TextSelector} textSelector - A text selector object containing information about a word from the wordlist.
     */
    lookupForWordlist: async (textSelector) => {
      return moduleInstance.lexicalQuery({ store, textSelector, source: 'wordlist' })
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
        console.error('Load CEDICT data request failed', loadResult.errors)
      }
    },

    hideCedictNotification: () => {
      store.commit('lexis/hideCedictNotification')
    },

    refreshTreebankView: () => {
      if (moduleInstance._treebankDataItem) {
        Lexis.refreshUntilLoaded(
          moduleInstance._treebankDataItem.provider,
          moduleInstance.arethusaTbRefreshRetryCount,
          moduleInstance.arethusaTbRefreshDelay
        ).catch((err) => {
          // Treebank data is probably not available
          console.warn(err.message)
          moduleInstance._treebankDataItem = null
          store.commit('lexis/resetTreebankInfo')
        })
      }
    }
  }
}
Lexis._configDefaults = {
  _moduleName: 'lexis',
  _moduleType: Module.types.DATA,
  _supportedDeviceTypes: [Platform.deviceTypes.ANY]
}
