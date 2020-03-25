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
       * Sets treebank information in a Vuex store
       *
       * @param {object} state - A Vuex state object
       * @param {TreebankDataItem} treebankDataItem - A treebank data item element
       */
      setTreebankInfo (state, treebankDataItem) {
        state.hasTreebankData = treebankDataItem.hasTreebankData
        state.treebankSrc = treebankDataItem.fullUrl
        // Previous business logic for determining if there is a treebank data was:
        // Treebank data is available if we have it for the word or the page
        /* return Boolean((state.treebankData.page && state.treebankData.page.src) ||
          (state.treebankData.word && state.treebankData.word.fullUrl)) */

        // Previous logic for determining source URL is:
        /* let newSrcUrl = this.$store.state.app.treebankData.page.src
        if (this.$store.state.app.treebankData.word &&
          this.$store.state.app.treebankData.word.fullUrl) {
          newSrcUrl = this.$store.state.app.treebankData.word.fullUrl
        }
        if (!this.$store.getters['ui/isActiveTab']('treebank') &&
          this.$store.state.app.treebankData.word &&
          !this.$store.state.app.treebankData.word.version) {
          /!*
          Prior to version 3 of treebank integration, which uses the Arethusa api
          The arethusa application could not initialize itself properly
          if it's not visible, so we wait to update the src url of the
          parent iframe until the tab is visible.
           *!/
          newSrcUrl = ''
        } */
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

          try {
            moduleInstance._treebankDataItem = new TreebankDataItem(htmlSelector.target)
            store.commit('lexis/setTreebankInfo', moduleInstance._treebankDataItem)
          } catch (error) {
            // Treebank info is not present on a page or is incorrect
            moduleInstance._treebankDataItem = null
            store.commit('lexis/resetTreebankInfo')
          }

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
      if (moduleInstance._treebankDataItem && moduleInstance._treebankDataItem.version >= 3) {
        // Need to refresh a view only for treebank V3 or higher
        ClientAdapters.morphology.arethusaTreebank({
          method: 'refreshView',
          params: {
            provider: moduleInstance._treebankDataItem.provider
          }
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
