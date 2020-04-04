/* global DEVELOPMENT_MODE_BUILD */
import Module from '@/vue/vuex-modules/module.js'
import Platform from '@/lib/utility/platform.js'
import HTMLSelector from '@/lib/selection/media/html-selector.js'
import LexicalQuery from '@/lib/queries/lexical-query.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants, TreebankDataItem } from 'alpheios-data-models'
import {
  CedictDestinationConfig as CedictProdConfig,
  CedictDestinationDevConfig as CedictDevConfig
} from 'alpheios-messaging'
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
    // A TextSelector of the last lexical query
    this._lastTextSelector = null
    // A current TreebankDataItem
    this._treebankDataItem = null
    // Whether a treebank service has been loaded
    this._treebankServiceLoaded = false
    // Add an iframe with CEDICT service
    this.createIframe()

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this, store)

    // For creating a page's TrrebankDataItem, use page body as a selection target
    const body = document.querySelector('body')
    if (!body) { throw new Error('Document body is not available') }
    try {
      this._treebankDataItem = new TreebankDataItem(body)
      store.commit('lexis/setTreebankInfo', this._treebankDataItem)
      if (!this._settingsApi.experimentalResetTreebankURL) {
        // If treebank URL is reset in an iframe we don't need to send a refresh request
        this.constructor.refreshUntilLoaded(this._treebankDataItem.provider)
          .then(() => {
            this._treebankServiceLoaded = true
          })
          .catch((err) => console.warn(err.message)) // If refreshUntilLoaded failed treebank will be unavailable
      }
    } catch (error) {
      // Treebank info is not present on a page or is incorrect. Treebank data will not be used.
    }

    LexicalQuery.evt.CEDICT_SERVICE_UNINITIALIZED.sub(this.onCedictServiceUninitialized.bind(this, store))
  }

  createIframe () {
    const iframe = document.createElement('iframe')
    iframe.id = cedictConfig.targetIframeID
    iframe.style.display = 'none'
    iframe.src = cedictConfig.targetURL
    document.body.appendChild(iframe)
  }

  onCedictServiceUninitialized (store) {
    store.commit('lexis/setCedictUninitializedState')
    store.commit('lexis/showCedictNotification')
  }

  /**
   * A utility function to delay code execution.
   *
   * @param {Number} ms - A number of milliseconds an execution should delayed by.
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
   * @returns {Promise<void> | Promise<Error>} - A promise that is resolved when a `refreshView`
   *          request succeeds or is reject when it fails after a certain number of retries.
   */
  static async refreshUntilLoaded (provider) {
    const retryMax = 20
    // Need to refresh a view only for treebank V3 or higher
    let count = retryMax
    do {
      const result = await ClientAdapters.morphology.arethusaTreebank({
        method: 'refreshView',
        params: {
          provider
        }
      })
      if (result.errors.length === 0) {
        return
      }
      // refreshView returned an error, let's try again after a timeout
      await this.timeout(100)
    } while (count--)
    // All attempts to get a response with no errors failed
    throw new Error(`refreshView request did not succeed in ${retryMax} attempts`)
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
      hasTreebankData: false,
      treebankSrc: null,
      treebankRefreshDT: 0
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
       * Sets treebank information in a Vuex store
       *
       * @param {object} state - A Vuex state object
       * @param {TreebankDataItem} treebankDataItem - A treebank data item element
       */
      setTreebankInfo (state, treebankDataItem) {
        state.hasTreebankData = treebankDataItem.hasTreebankData
        state.treebankSrc = treebankDataItem.fullUrl
      },

      resetTreebankInfo (state) {
        state.hasTreebankData = false
        state.treebankSrc = null
      },

      setTreebankRefreshDT (state) {
        state.treebankRefreshDT = Date.now()
      }
    }
  }
}

Lexis.api = (moduleInstance, store) => {
  return {
    getSelectedText: (event, domEvent) => {
      if (moduleInstance._appApi.isGetSelectedTextEnabled(domEvent)) {
        const defaultLangCode = moduleInstance._appApi.getDefaultLangCode()
        const htmlSelector = new HTMLSelector(event, defaultLangCode)
        const textSelector = htmlSelector.createTextSelector()

        console.info('textSelector - ', textSelector)
        if (textSelector && !textSelector.isEmpty()) {
          const lastTextSelector = moduleInstance._lastTextSelector || {}
          const checkSameTestSelector = (
            lastTextSelector.text === textSelector.text &&
            lastTextSelector.languageID === textSelector.languageID &&
            moduleInstance._uiApi.isPopupVisible()
          )
          if (checkSameTestSelector) {
            // Do nothing
            console.info('***********NO lexQuery - same text selector')
            return
          }
          moduleInstance._lastTextSelector = textSelector

          try {
            moduleInstance._treebankDataItem = new TreebankDataItem(htmlSelector.target)
            store.commit('lexis/setTreebankInfo', moduleInstance._treebankDataItem)
          } catch (error) {
            // Treebank info is not present on a page or is incorrect
            moduleInstance._treebankDataItem = null
            store.commit('lexis/resetTreebankInfo')
          }

          console.info('***********lexQuery- start lexical query')
          console.info('***********htmlSelector - ', htmlSelector)
          const lexQuery = LexicalQuery.create(textSelector, {
            clientId: moduleInstance._appApi.clientId,
            resourceOptions: moduleInstance._settingsApi.getResourceOptions(),
            siteOptions: [],
            lemmaTranslations: moduleInstance._appApi.getLemmaTranslationsQueryParams(textSelector),
            wordUsageExamples: moduleInstance._appApi.getWordUsageExamplesQueryParams(textSelector),
            langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } }, // TODO this should be externalized
            checkContextForward: textSelector.checkContextForward
          })

          moduleInstance._appApi.newLexicalRequest(textSelector.normalizedText, textSelector.languageID, textSelector.data)
          lexQuery.getData()

          // Hide a CEDICT notification on a new lexical query
          store.commit('lexis/hideCedictNotification')
        } else {
          console.info('***********NO lexQuery - not valid text selector')
        }
      }
    },

    /**
     * This method starts a lexical query similarly to `getSelectedText`, but it differs in
     * how query parameters are set.
     * `lookupText` is intend to be used by lookup components where the user type the word in.
     *
     * @param textSelector
     * @param resourceOptions
     * @param lemmaTranslationLang
     * @param wordUsageExamples
     * @param clientId
     * @param verboseMode
     */
    lookupText: (textSelector, resourceOptions, lemmaTranslationLang, wordUsageExamples, clientId, verboseMode) => {
      /*
      When word is entered in the lookup component, it is out of context and we cannot get any treebank data on it.
       */
      moduleInstance._treebankDataItem = null
      store.commit('lexis/resetTreebankInfo')

      let lemmaTranslations
      if (textSelector.languageID === Constants.LANG_LATIN && lemmaTranslationLang) {
        lemmaTranslations = { locale: lemmaTranslationLang }
      }

      const lexQuery = LexicalQuery.create(textSelector, {
        htmlSelector: HTMLSelector.getDumpHTMLSelector(),
        clientId: clientId,
        verboseMode: verboseMode,
        lemmaTranslations: lemmaTranslations,
        wordUsageExamples: wordUsageExamples,
        resourceOptions: resourceOptions,
        langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } }, // TODO this should be externalized
        checkContextForward: ''
      })
      lexQuery.getData()

      // Hide a CEDICT notification on a new lexical query
      store.commit('lexis/hideCedictNotification')
    },

    loadCedictData: async () => {
      store.commit('lexis/setCedictInitInProgressState')
      const loadResult = await ClientAdapters.morphology.chineseloc({
        method: 'loadData',
        clientId,
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
        if (moduleInstance._settingsApi.experimentalResetTreebankURL) {
          // Update a refresh date time to trigger a URL reset in  a treebank component
          store.commit('lexis/setTreebankRefreshDT')
        } else {
          // If treebank URL is reset in an iframe we don't need to send a refresh request
          Lexis.refreshUntilLoaded(moduleInstance._treebankDataItem.provider)
            .then(() => {
              store.commit('lexis/setTreebankRefreshDT')
            })
            .catch((err) => console.warn(err.message)) // If refreshUntilLoaded failed treebank will be unavailable
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
