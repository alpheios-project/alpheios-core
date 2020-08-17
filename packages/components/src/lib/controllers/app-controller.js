/* eslint-disable no-unused-vars */
/* global BUILD_BRANCH, BUILD_NUMBER, BUILD_NAME, DEVELOPMENT_MODE_BUILD */
import { version as packageVersion, description as packageDescription } from '../../../package'
import { Constants, Feature, LanguageModelFactory, Lexeme, Logger } from 'alpheios-data-models'
import { Grammars } from 'alpheios-res-client'
import { ViewSetFactory } from 'alpheios-inflection-tables'
import { WordlistController, UserDataManager } from 'alpheios-wordlist'
import Vue from '@vue-runtime'
import Vuex from 'vuex'
import interact from 'interactjs'
// Modules and their support dependencies
import L10nModule from '@comp/vue/vuex-modules/data/l10n-module.js'
import LexisModule from '@comp/vue/vuex-modules/data/lexis.js'
import Locales from '@comp/locales/locales.js'

import EmbedLibWarning from '@comp/vue/components/embed-lib-warning.vue'

import LexicalQuery from '@comp/lib/queries/lexical-query.js'
import ResourceQuery from '@comp/lib/queries/resource-query.js'
import TextSelector from '@comp/lib/selection/text-selector'
import Platform from '@comp/lib/utility/platform.js'
import MouseDblClick from '@comp/lib/custom-pointer-events/mouse-dbl-click.js'
import LongTap from '@comp/lib/custom-pointer-events/long-tap.js'
import GenericEvt from '@comp/lib/custom-pointer-events/generic-evt.js'
import MouseMove from '@comp/lib/custom-pointer-events/mouse-move.js'

import Options from '@comp/lib/options/options.js'
import LocalStorage from '@comp/lib/options/local-storage-area.js'
import RemoteAuthStorageArea from '@comp/lib/options/remote-auth-storage-area.js'
import SettingsController from '@comp/lib/controllers/settings-controller.js'
import UIController from '@comp/lib/controllers/ui-controller.js'
import UIEventController from '@comp/lib/controllers/ui-event-controller.js'
import SelectionController from '@comp/lib/controllers/selection-controller.js'
import QueryParams from '@comp/lib/utility/query-params.js'

const languageNames = new Map([
  [Constants.LANG_LATIN, 'Latin'],
  [Constants.LANG_GREEK, 'Greek'],
  [Constants.LANG_ARABIC, 'Arabic'],
  [Constants.LANG_PERSIAN, 'Persian'],
  [Constants.LANG_GEEZ, 'Ancient Ethiopic (Ge\'ez)'],
  [Constants.LANG_SYRIAC, 'Syriac'],
  [Constants.LANG_CHINESE, 'Chinese']
])

// Enable Vuex
Vue.use(Vuex)

export default class AppController {
  /**
   * The best way to create a configured instance of a AppController is to use its `create` method.
   * It configures and attaches all AppController's modules.
   * If you need a custom configuration of a AppController, replace its `create` method with your own.
   *
   * @class
   *
   * @param {UIStateAPI} state - An object to store a UI state.
   * @param {object} options - app controller options object.
   * See `optionsDefaults` getter for detailed parameter description: @see {@link optionsDefaults}
   * If any options is not specified, it will be set to a default value.
   * If an options is not present in an `optionsDefaults` object, it will be ignored as an unknown option.
   * Default values: See `optionsDefaults` getter @see {@link optionsDefaults}
   */
  constructor (state, options = {}) {
    this.state = state
    this._options = AppController.setOptions(options, AppController.optionsDefaults)

    this.isInitialized = false
    this.isActivated = false
    this.isDeactivated = false
    this._inflectionsViewSet = null // Stores the inflections view set, will be set during the lexical query execution
    this._userDataManager = null

    /**
     * Information about the platform an app is running upon.
     *
     * @type {Platform} - A an object containing data about the platform.
     */
    this._platform = new Platform({ setRootAttributes: true, appType: this._options.appType })

    // Vuex store. A public API for data and UI module interactions.
    this._store = new Vuex.Store({
      /*
      Strict mode is ON for a development build to add safety checks
      and is OFF for a production build to not slow the app down.
       */
      strict: DEVELOPMENT_MODE_BUILD
    })
    this.api = {} // An API object for functions of registered modules and an app controller.

    /**
     * A map that holds data modules.
     *
     * @type {Map<string, Module>}
     */
    this._modules = new Map()

    // Get query parameters from the URL. Do this early so they will be available to modules during registration
    this._queryParams = QueryParams.parse()

    this._stC = new SettingsController({
      platform: this._platform
    })

    /**
     * Holds an instance of a UI controller. Its purpose is to manage all UI components within an application.
     *
     * @type {UIEventController}
     */
    this._uic = new UIController({
      platform: this._platform,
      uiState: this.state,
      queryParams: this._queryParams,
      overrideHelp: this._options.overrideHelp
    })

    /**
     * `evc` holds an instance of an event controller that handle key events.
     * It will be initialized at a later stage.
     *
     * @type {UIEventController}
     */
    this._evc = new UIEventController()
    this._selc = new SelectionController(this.getDefaultLangCode.bind(this))

    this._wordlistC = {} // This is a word list controller
  }

  /**
   * Creates an instance of an app controller with default options. Provide your own implementation of this method
   * if you want to create a different configuration of an app controller.
   * TODO: Right now the app controller's tests has its own `create()` method with some listeners not registered.
   *       That's needed for tests to pass in a Jest environment. This creates a problem, however, because
   *       the test setup is becoming different from the production one. We should, in the future,
   *       try to come up with the way of using the same setup in both production and test environments.
   *
   * @param state
   * @param options
   */
  static create (state, options) {
    let appController = new AppController(state, options) // eslint-disable-line prefer-const

    // Register data modules
    appController.registerModule(L10nModule, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr()
    })

    appController.registerModule(LexisModule, {
      arethusaTbRefreshRetryCount: appController._options.arethusaTbRefreshRetryCount,
      arethusaTbRefreshDelay: appController._options.arethusaTbRefreshDelay
    })

    /*
    The second parameter of an AuthModule is environment specific.
    For webexetension it, for example, can be a messaging service.
    Some environments may not register an Auth module at all.
    That's why this registration shall be made not here,
    but from within an environment that creates an app controller
    (after a call to `create()` function, usually).
     */
    // appController.registerModule(AuthModule, undefined)

    // Register UI modules. This is environment specific and thus shall be done after a `create()` call.
    /* appController.registerModule(PanelModule, {
      mountPoint: '#alpheios-panel' // To what element a panel will be mounted
    })
    appController.registerModule(PopupModule, {
      mountPoint: '#alpheios-popup'
    })
    appController.registerModule(ActionPanelModule, {})
    */

    // Creates on configures an event listener
    appController._evc.registerListener('HandleEscapeKey', document, appController.handleEscapeKey.bind(appController), GenericEvt, 'keydown')
    SelectionController.evt.TEXT_SELECTED.sub(appController.onTextSelected.bind(appController))

    // Subscribe to LexicalQuery events
    LexicalQuery.evt.LEXICAL_QUERY_COMPLETE.sub(appController.onLexicalQueryComplete.bind(appController))
    LexicalQuery.evt.MORPH_DATA_READY.sub(appController.onMorphDataReady.bind(appController))
    LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.sub(appController.onMorphDataNotFound.bind(appController))
    LexicalQuery.evt.HOMONYM_READY.sub(appController.onHomonymReady.bind(appController))
    LexicalQuery.evt.LEMMA_TRANSL_READY.sub(appController.updateTranslations.bind(appController))
    LexicalQuery.evt.WORD_USAGE_EXAMPLES_READY.sub(appController.updateWordUsageExamples.bind(appController))
    LexicalQuery.evt.SHORT_DEFS_READY.sub(appController.onShortDefinitionsReady.bind(appController))
    LexicalQuery.evt.FULL_DEFS_READY.sub(appController.onFullDefinitionsReady.bind(appController))
    LexicalQuery.evt.SHORT_DEFS_NOT_FOUND.sub(appController.onDefinitionsNotFound.bind(appController))
    LexicalQuery.evt.FULL_DEFS_NOT_FOUND.sub(appController.onDefinitionsNotFound.bind(appController))

    // Subscribe to ResourceQuery events
    ResourceQuery.evt.RESOURCE_QUERY_COMPLETE.sub(appController.onResourceQueryComplete.bind(appController))
    ResourceQuery.evt.GRAMMAR_AVAILABLE.sub(appController.onGrammarAvailable.bind(appController))
    ResourceQuery.evt.GRAMMAR_NOT_FOUND.sub(appController.onGrammarNotFound.bind(appController))

    appController._wordlistC = new WordlistController(LanguageModelFactory.availableLanguages(), LexicalQuery.evt)
    WordlistController.evt.WORDLIST_UPDATED.sub(appController.onWordListUpdated.bind(appController))
    WordlistController.evt.WORDITEM_SELECTED.sub(appController.onWordItemSelected.bind(appController))

    return appController
  }

  /**
   * Returns an object with default options of a AppController.
   * Can be redefined to provide other default values.
   *
   * @returns {object} An object that contains default options.
   *     {Object} app - A set of app related options with the following properties:
   *          {string} name - An application name;
   *          {string} version - A version of an application;
   *          {string} buildNumber - A build number, if provided.
   *     {Object} storageAdapter - A storage adapter for storing options (see `lib/options`). Is environment dependent.
   *     {boolean} openPanel - whether to open panel when an app controller is activated. Default: panelOnActivate of uiOptions.
   *     {string} textQueryTriggerDesktop - what event will start a lexical query on a selected text on the desktop. If null,
                                            the default 'dblClick' will be used.
   *     {string} textQueryTriggerMobile - what event will start a lexical query on a selected text on mobile devices.  if null,
   *                                       the default 'longTap' pointer event will be used.
   *     {boolean} enableMouseMoveOverride - whether or not to enable mousemovement for word selection
   *     {string} textQuerySelector - an area(s) on a page where a trigger event will start a lexical query. This is
   *     a standard CSS selector. Default value: 'body'.
   *     {Object} template - object w ith the following properties:
   *         html: HTML string for the container of the Alpheios components
   */
  static get optionsDefaults () {
    return {
      app: {
        name: 'name',
        version: 'version',
        buildBranch: null,
        buildNumber: null,
        buildName: null
      },
      mode: 'production', // Controls options available and output. Other possible values: `development`
      appType: Platform.appTypes.OTHER, // A type of application that uses the controller
      clientId: 'alpheios-components',
      storageAdapter: LocalStorage,
      openPanel: true,
      textQueryTriggerMobile: 'longTap',
      textQueryTriggerDesktop: 'dblClick',
      enableMouseMoveOverride: false,
      textQuerySelector: 'body',
      enableLemmaTranslations: false,
      irregularBaseFontSizeClassName: 'alpheios-irregular-base-font-size',
      // Whether to disable text selection on mobile devices
      disableTextSelection: false,
      /*
      textLangCode is a language of a text that is set by the host app during a creation of an app controller.
      It has a higher priority than a `preferredLanguage` (a language that is set as default on
      the UI settings page). However, textLangCode has a lower priority than the language
      set by the surrounding context of the word on the HTML page (i.e. the language that is set
      for the word's HTML element or for its parent HTML elements).
      The value of the textLangCode must be in an ISO 639-3 format.
      A host application may not necessarily set the current language. In that case
      it's value (which will be null by default) will be ignored.
       */
      textLangCode: null,
      // If set to true, will use the `textLangCode` over the `preferredLanguage`
      overridePreferredLanguage: false,
      // a callback to execute before the word selection handler
      triggerPreCallback: null,
      // if true, the help button on the toolbar can be controlled by the client, no click handler will
      // be added by the components library
      overrideHelp: false,
      /*
      How many times to retry and what timout to use within an Arethusa treebank app `refreshView` request.
       */
      arethusaTbRefreshRetryCount: 5,
      arethusaTbRefreshDelay: 200,
      // A URL of a server that provides an app configuration
      configServiceUrl: 'https://config.alpheios.net/v1/config'
    }
  }

  /**
   * Constructs a new options object that contains properties from either an `options` argument,
   * or, if not provided, from a `defaultOptions` object.
   * `defaultOptions` object serves as a template. It is a list of valid options known to the app controller.
   * All properties from `options` must be presented in `defaultOptions` or
   * they will not be copied into a resulting options object.
   * If an option property is itself an object (i.e. is considered as a group of options),
   * it will be copied recursively.
   *
   * @param {object} options - A user specified options object.
   * @param {object} defaultOptions - A set of default options specified by an app controller.
   * @returns {object} A resulting options object
   */
  static setOptions (options, defaultOptions) {
    let result = {} // eslint-disable-line prefer-const
    for (const [key, defaultValue] of Object.entries(defaultOptions)) {
      // Due to the bug in JS typeof null is `object` and they do not have a `constructor` prop
      // so we have to filter those null values out
      if (typeof defaultValue === 'object' && defaultValue !== null && defaultValue.constructor.name === 'Object') {
        // This is an options group
        const optionsValue = options.hasOwnProperty(key) ? options[key] : {} // eslint-disable-line no-prototype-builtins
        result[key] = this.setOptions(optionsValue, defaultValue)
      } else {
        // This is a primitive type, an array, or other object that is not an options group
        result[key] = options.hasOwnProperty(key) ? options[key] : defaultOptions[key] // eslint-disable-line no-prototype-builtins
      }
    }
    return result
  }

  /**
   * Checks whether an app is using a UI controller.
   *
   * @returns {boolean} True if a UI controller is used, false otherwise.
   */
  get hasUIController () {
    return Boolean(this._uic)
  }

  /**
   * Registers a module for use by an app controller and other modules.
   * It instantiates each module and adds them to the registered modules store.
   *
   * @param {Module} moduleClass - A data module's class (i.e. the constructor function).
   * @param {object} options - Arbitrary number of values that will be passed to the module constructor.
   * @returns {AppController} - A self reference for chaining.
   */
  registerModule (moduleClass, options = {}) {
    if (!moduleClass.isSupportedPlatform(this._platform)) {
      Logger.getInstance().warn(`Skipping registration of a ${moduleClass.moduleName} module because it does not support a ${this._platform.deviceType} type of devices`)
      return this
    }

    options.queryParams = this._queryParams
    options.platform = this._platform
    if (moduleClass.isDataModule) {
      // Data modules are registered with an app controller
      this._modules.set(moduleClass.moduleName, { ModuleClass: moduleClass, options, instance: null })
    } else if (moduleClass.isUiModule) {
      // UI modules belong to a UI controller
      if (this.hasUIController) { this._uic.registerModule(moduleClass, options) }
    } else {
      Logger.getInstance().warn(`Skipping registration of a ${moduleClass.moduleName} of unkown type: ${moduleClass.moduleType}`)
    }
    return this
  }

  get dataModules () {
    return Array.from(this._modules.values()).filter(m => m.ModuleClass.isDataModule)
  }

  _createModules () {
    this.dataModules.forEach((m) => {
      m.instance = new m.ModuleClass(this._store, this.api, m.options)
    })
  }

  _activateModules () {
    this.dataModules.forEach(m => m.instance.activate())
  }

  _deactivateModules () {
    this.dataModules.forEach(m => m.instance.deactivate())
  }

  hasModule (moduleName) {
    return this._modules.has(moduleName)
  }

  getModule (moduleName) {
    return this._modules.get(moduleName).instance
  }

  async init () {
    if (this.isInitialized) { return 'Already initialized' }
    // Initialize options
    await this._stC.init({
      api: this.api,
      store: this._store,
      configServiceUrl: this._options.configServiceUrl,
      clientId: this._options.clientId,
      appName: this._options.app.name,
      appVersion: this._options.app.version,
      branch: this._options.app.buildBranch,
      buildNumber: this._options.app.buildNumber,
      storageAdapter: this._options.storageAdapter
    })
    // All options has been loaded and initialized after this point

    // The following options will be applied to all logging done via a single Logger instance
    // Set the  logger verbose mode according to the settings
    Logger.getInstance().setVerboseMode(this.api.settings.isInVerboseMode())
    Logger.getInstance().prependModeOn() // Set a prepend mode that will add an Alpheios prefix to the printed statements
    Logger.getInstance().traceModeOff() // Enable the log call stack tracing

    this.api.app = {
      name: this._options.app.name, // A name of a host application (embed lib or webextension)
      version: this._options.app.version, // An version of a host application (embed lib or webextension)
      buildName: this._options.app.buildName, // A build number of a host application
      clientId: this._options.clientId, // alpheios api client identifier
      libName: AppController.libName, // A name of the components library
      libVersion: AppController.libVersion, // A version of the components library
      libBuildName: typeof BUILD_NAME !== 'undefined' ? BUILD_NAME : '', // A name of a build of a components library that will be injected by Webpack
      platform: this._platform,
      mode: this._options.mode, // Mode of an application: `production` or `development`
      state: this.state, // An app-level state
      homonym: null,
      wordUsageExamplesCached: null,
      wordUsageExamples: null,
      wordUsageAuthors: [],
      grammarData: {},
      // Exposes parsed query parameters to other components
      queryParams: this._queryParams,
      isDevMode: () => {
        return this._options.mode === 'development'
      },

      // TODO: Some of the functions below should probably belong to other API groups.
      getDefaultLangCode: this.getDefaultLangCode.bind(this),
      registerTextSelector: this.registerTextSelector.bind(this),
      activateTextSelector: this.activateTextSelector.bind(this),
      // TODO: The following is used in a UI controller only. We should try to eliminate that dependency.
      isMousemoveForced: this.isMousemoveForced.bind(this),
      getMouseMoveOverride: this.getMouseMoveOverride.bind(this),
      clearMouseMoveOverride: this.clearMouseMoveOverride.bind(this),
      applyAllOptions: this.applyAllOptions.bind(this),
      applyUIOption: this.applyUIOption.bind(this),
      applyFeatureOption: this.applyFeatureOption.bind(this),
      updateLanguage: this.updateLanguage.bind(this),
      notifyExperimental: this.notifyExperimental.bind(this),
      getLanguageName: AppController.getLanguageName,
      startResourceQuery: this.startResourceQuery.bind(this),
      sendFeature: this.sendFeature.bind(this),
      getHomonymLexemes: () => this.api.app.homonym ? this.api.app.homonym.lexemes : [],
      getInflectionsViewSet: () => this._inflectionsViewSet,
      getInflectionViews: (partOfSpeech) => this._inflectionsViewSet ? this._inflectionsViewSet.getViews(partOfSpeech) : [],
      hasMorphData: () => {
        const lexemes = this.api.app.getHomonymLexemes()
        if (!this._store.state.app.homonymDataReady || lexemes.length === 0) {
          return false
        }
        return (Array.isArray(lexemes) && lexemes.length > 0 &&
          (lexemes[0].lemma.principalParts.length > 0 || lexemes[0].inflections.length > 0 || lexemes[0].inflections.length > 0 ||
            lexemes[0].meaning.fullDefs.length > 0 || lexemes[0].meaning.shortDefs.length > 0)
        )
      },
      getWordUsageData: this.getWordUsageData.bind(this),
      getWordList: this._wordlistC.getWordList.bind(this._wordlistC),
      selectWordItem: this._wordlistC.selectWordItem.bind(this._wordlistC),
      updateAllImportant: this._wordlistC.updateAllImportant.bind(this._wordlistC),
      updateWordItemImportant: this._wordlistC.updateWordItemImportant.bind(this._wordlistC),
      removeWordListItem: this._wordlistC.removeWordListItem.bind(this._wordlistC),
      removeWordList: this._wordlistC.removeWordList.bind(this._wordlistC),
      getAllWordLists: () => this._wordlistC ? this._wordlistC.wordLists : [],

      enableWordUsageExamples: this.enableWordUsageExamples.bind(this),
      isGetSelectedTextEnabled: this.isGetSelectedTextEnabled.bind(this),
      newLexicalRequest: this.newLexicalRequest.bind(this),
      getWordUsageExamplesQueryParams: this.getWordUsageExamplesQueryParams.bind(this),

      restoreGrammarIndex: this.restoreGrammarIndex.bind(this)
    }

    this._store.registerModule('app', {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
        currentLanguageID: undefined,
        currentLanguageCode: null,
        currentLanguageName: '',
        embedLibActive: false,
        selectedText: '',
        languageName: '',
        languageCode: '',
        // A language code that is selected in the language drop-down of a lookup component
        selectedLookupLangCode: '',
        targetWord: '',
        homonymDataReady: false,
        wordUsageExampleEnabled: false,
        linkedFeatures: [], // An array of linked features, updated with every new homonym value is written to the store
        shortDefUpdateTime: 0, // A time of the last update of short definitions, in ms. Needed to track changes in definitions.
        fullDefUpdateTime: 0, // A time of the last update of full definitions, in ms. Needed to track changes in definitions.
        lexicalRequest: {
          source: null, // the source of the request
          startTime: 0, // A time when the last lexical request is started, in ms
          endTime: 0, // A time when the last lexical request is started, in ms
          outcome: null // A result of the completed lexical request
        },
        inflectionsWaitState: false, // Whether there is a lexical query in progress
        hasInflData: false, // Whether we have any inflection data available
        morphDataReady: false,
        translationsDataReady: false,

        updatedGrammar: 0,

        wordUsageExamplesReady: false, // Whether word usage examples data is available
        wordUsageAuthorsReady: false, // Whether word usage authors data is available
        hasWordListsData: false,
        wordListUpdateTime: 0, // To notify word list panel about data update
        providers: [], // A list of resource providers
        queryStillActive: false, // it is for Persian case, when we canReset

        mouseMoveOverrideUpdate: 1
      },

      getters: {
        /*
        Returns true if short definitions are available.
        This getter can serve as an indicator of a new definition data arrival.
        If used within a computed prop, it will force the prop to recalculate every time definitions are updated.
         */
        shortDefDataReady (state) {
          return state.shortDefUpdateTime > 0
        },

        /*
        Returns true if full definitions are available.
        This getter can serve as an indicator of a new definition data arrival.
        If used within a computed prop, it will force the prop to recalculate every time definitions are updated.
         */
        fullDefDataReady (state) {
          return state.fullDefUpdateTime > 0
        },

        lexicalRequestInProgress (state) {
          return state.lexicalRequest.startTime > state.lexicalRequest.endTime
        }
      },

      mutations: {
        setEmbedLibActive (state, status) {
          state.embedLibActive = status
        },
        setCurrentLanguage (state, languageCodeOrID) {
          const langDetails = AppController.getLanguageName(languageCodeOrID)
          state.currentLanguageID = langDetails.id
          state.currentLanguageName = langDetails.name
          state.currentLanguageCode = langDetails.code
        },

        setSelectedLookupLang (state, langCode) {
          state.selectedLookupLangCode = langCode
        },

        setTextData (state, data) {
          const langDetails = AppController.getLanguageName(data.languageID)
          state.languageName = langDetails.name
          state.languageCode = langDetails.code
          state.selectedText = data.text
        },

        lexicalRequestStarted (state, data) {
          state.targetWord = data.targetWord
          state.lexicalRequest.startTime = Date.now()
          state.lexicalRequest.source = data.source
        },

        resetWordData (state) {
          state.languageName = ''
          state.languageCode = ''
          state.selectedText = ''
          state.inflectionsWaitState = true
          state.wordUsageExamplesReady = false
          state.linkedFeatures = []
          state.homonymDataReady = false
          state.wordUsageExampleEnabled = false
          state.shortDefUpdateTime = 0 // When short definitions were last updated
          state.fullDefUpdateTime = 0 // When full definitions were last updated
          state.morphDataReady = false
          state.translationsDataReady = false
          state.providers = []
        },

        lexicalRequestFinished (state) {
          state.inflectionsWaitState = false
          state.morphDataReady = true
          state.lexicalRequest.endTime = Date.now()
        },

        setHomonym (state, homonym) {
          state.homonymDataReady = true
          state.linkedFeatures = LanguageModelFactory.getLanguageModel(homonym.languageID).grammarFeatures()
        },

        setWordUsageExampleEnabled (state, wordUsageExampleEnabled) {
          state.wordUsageExampleEnabled = wordUsageExampleEnabled
        },

        setInflData (state, hasInflData = true) {
          state.inflectionsWaitState = false
          state.hasInflData = hasInflData
        },

        resetInflData (state) {
          state.inflectionsWaitState = false
          state.hasInflData = false
        },

        setUpdatedGrammar (state) {
          state.updatedGrammar = state.updatedGrammar + 1
        },

        setWordUsageExamplesReady (state, value = true) {
          state.wordUsageExamplesReady = value
        },

        setWordUsageAuthorsReady (state, value = true) {
          state.wordUsageAuthorsReady = value
        },

        setWordLists (state, wordLists) {
          let checkWordLists
          if (!wordLists || (!Array.isArray(wordLists) && Object.keys(wordLists).length === 0)) {
            checkWordLists = []
          } else {
            checkWordLists = Array.isArray(wordLists) ? wordLists : Object.values(wordLists)
          }

          state.hasWordListsData = Boolean(checkWordLists.find(wordList => wordList && !wordList.isEmpty))
          state.wordListUpdateTime = Date.now()
        },

        /**
         * @param {object} state - State object of the store
         * @param {ResourceProvider[]} providers - An array of resource provider objects
         */
        setProviders (state, providers) {
          state.providers = providers
        },

        shortDefsUpdated (state) {
          state.shortDefUpdateTime = Date.now()
        },

        fullDefsUpdated (state) {
          state.fullDefUpdateTime = Date.now()
        },

        setMorphDataReady (state, value = true) {
          state.morphDataReady = value
        },

        setTranslDataReady (state, value = true) {
          state.translationsDataReady = value
        },

        setQueryStillActive (state, value = true) {
          state.queryStillActive = value
        },

        setMouseMoveOverrideUpdate (state) {
          state.mouseMoveOverrideUpdate = state.mouseMoveOverrideUpdate + 1
        }
      }
    })

    // If `textLangCode` is set, use it over the `preferredLanguage`
    this._options.overridePreferredLanguage = Boolean(this._options.textLangCode)
    this._store.commit('app/setSelectedLookupLang', this.getDefaultLangCode())

    // Create registered data modules
    // Data modules and UI modules use the Settings Controller; it must be fully initialized at this point
    this._createModules()

    // The current language must be set after data modules are created (because it uses an L10n module)
    // but before the UI modules are created (because UI modules use current language during rendering).
    const defaultLangCode = this.getDefaultLangCode()
    const defaultLangID = LanguageModelFactory.getLanguageIdFromCode(defaultLangCode)
    // Set the lookup
    this.api.settings.getFeatureOptions().items.lookupLanguage.setValue(defaultLangCode)
    this.updateLanguage(defaultLangID)
    if (this.hasUIController) { this._uic.init({ api: this.api, store: this._store }) }

    try {
      this.registerTextSelector('GetSelectedText', this._options.textQuerySelector)
    } catch (err) {
      Logger.getInstance().error(err)
    }
    this.updateLemmaTranslations()
    this.updateCurrentLocale()
    this.isInitialized = true
    return this
  }

  get textSelectorParams () {
    let event
    let eventParams
    if (this._platform.isMobile) {
      // A mobile platform
      if (['longTap', 'longtap', null].includes(this._options.textQueryTriggerMobile)) {
        event = LongTap
      } else {
        event = GenericEvt
        eventParams = this._options.textQueryTriggerMobile
      }
    } else if (this.isMousemoveEnabled) {
      // A desktop platform with mousemove enabled
      event = MouseMove
      eventParams = {
        mouseMoveDelay: this.api.settings.getUiOptions().items.mouseMoveDelay.currentValue,
        mouseMoveAccuracy: this.api.settings.getUiOptions().items.mouseMoveAccuracy.currentValue,
        enableMouseMoveLimitedByIdCheck: this.api.settings.getUiOptions().items.enableMouseMoveLimitedByIdCheck.currentValue,
        mouseMoveLimitedById: this.api.settings.getUiOptions().items.mouseMoveLimitedById.currentValue
      }
    } else {
      // A desktop platform with mousemove disabled
      if (['dblClick', 'dblclick', null].includes(this._options.textQueryTriggerDesktop)) {
        event = MouseDblClick
      } else {
        event = GenericEvt
        eventParams = this._options.textQueryTriggerDesktop
      }
    }
    return [event, eventParams]
  }

  registerTextSelector (selectorName, selector) {
    if (!this._selc) {
      throw new Error(`Selection controller is missing. Cannot register a ${selectorName} selector`)
    }
    this._selc.registerSelector(selectorName, selector, ...this.textSelectorParams)
    return this.api.app
  }

  activateTextSelector (selectorName) {
    if (!this._selc) {
      throw new Error(`Selection controller is missing. Cannot register a ${selectorName} selector`)
    }
    this._selc.activateSelector(selectorName)
    return this.api.app
  }

  async initUserDataManager (isAuthenticated) {
    let wordLists
    let optionLoadPromises
    if (isAuthenticated) {
      const authData = await this.api.auth.getUserData()
      this._userDataManager = new UserDataManager(authData, WordlistController.evt)
      wordLists = await this._wordlistC.initLists(this._userDataManager)
      this._store.commit('app/setWordLists', wordLists)
      optionLoadPromises = this.api.settings.initOptions(RemoteAuthStorageArea, authData)
    } else {
      // TODO we need to make the UserDataManager a singleton that can
      // handle switching users gracefully
      this._userDataManager.clear()
      this._userDataManager = null
      wordLists = await this._wordlistC.initLists()

      // reload the user-configurable options
      optionLoadPromises = this.api.settings.initOptions(this._options.storageAdapter)
    }
    await Promise.all(optionLoadPromises)
    this.applyAllOptions()
    this._store.commit('app/setWordLists', wordLists)
  }

  /**
   * Activates an app controller. If `deactivate()` method unloads some resources, we should restore them here.
   *
   * @returns {Promise<AppController>}
   */
  async activate () {
    if (this.isActivated) { return 'Already activated' }
    if (this.state.isDisabled()) { return 'App controller is disabled' }

    if (!this.isInitialized) { await this.init() }

    this.isActivated = true
    this.isDeactivated = false

    this._activateModules()

    if (this.hasUIController) {
      this._uic.activate({ disableTextSelOnMobile: this._options.disableTextSelection })
    }

    // Activate listeners
    if (this._evc) { this._evc.activateListeners() }
    if (this._selc) { this._selc.activate() }

    if (this.hasModule('auth')) {
      this.authUnwatch = this._store.watch((state) => state.auth.isAuthenticated, (newIsAuthenticatedStatus) => {
        // Reinitialize data when user logged in
        this.initUserDataManager(newIsAuthenticatedStatus)
      })

      // initiate session check so that user data is available
      // if we have an active session
      this.api.auth.session()
    }
    return this
  }

  getDefaultLangCode () {
    return this._options.overridePreferredLanguage ? this._options.textLangCode : this.api.settings.getFeatureOptions().items.preferredLanguage.currentValue
  }

  getMouseMoveOverride () {
    return this._options.enableMouseMoveOverride
  }

  clearMouseMoveOverride () {
    this._options.enableMouseMoveOverride = undefined
    this._store.commit('app/setMouseMoveOverrideUpdate')
  }

  /**
   * Deactivates an app controller. May unload some resources to preserve memory.
   * In this case an `activate()` method will be responsible for restoring them.
   *
   * @returns {Promise<AppController>}
   */
  async deactivate () {
    if (this.isDeactivated) { return 'Already deactivated' }

    // Deactivate event listeners
    if (this._evc) { this._evc.deactivateListeners() }
    if (this._selc) { this._selc.deactivate() }

    this._deactivateModules()
    if (this.hasUIController) {
      this._uic.deactivate()
    }

    this.isActivated = false
    this.isDeactivated = true
    if (this.authUnwatch) {
      this.authUnwatch()
    }
    this.state.deactivate()

    return this
  }

  static initAlignedTranslation (documentObject, alignedTranslSelector, resizableOptions, resizemoveListener) {
    const alignedTranslation = documentObject.querySelectorAll('.aligned-translation')
    for (const a of alignedTranslation) {
      interact(a).resizable(resizableOptions).on('resizemove', resizemoveListener)
    }
    return alignedTranslation
  }

  /**
   * Returns an unmounted Vue instance of a warning panel.
   * This panel is displayed when an app controller is disabled
   * due to embedded lib presence.
   *
   * @param {string} message - A message to display within a panel
   */
  static getEmbedLibWarning (message) {
    if (!AppController.embedLibWarningInstance) {
      const EmbedLibWarningClass = Vue.extend(EmbedLibWarning)
      AppController.embedLibWarningInstance = new EmbedLibWarningClass({
        propsData: { text: message }
      })
      AppController.embedLibWarningInstance.$mount() // Render off-document to append afterwards
    }
    return AppController.embedLibWarningInstance
  }

  /**
   * Gets language name details by either language ID (a symbol) or language code (string)
   *
   * @param {symbol|string} language - Either language ID or language code (see constants in `data-models` for definitions)
   * @returns {object} An object containing:
   *     {string} name - Language name
   *     {string} code - Language code
   *     {symbol} id - Language ID
   */
  static getLanguageName (language) {
    // Compatibility code in case method be called with languageCode instead of ID. Remove when not needed
    const { languageID: langID, languageCode: langCode } = LanguageModelFactory.getLanguageAttrs(language)
    return { name: languageNames.has(langID) ? languageNames.get(langID) : '', code: langCode, id: langID }
  }

  showLanguageInfo (homonym) {
    const notFound = !homonym ||
      !homonym.lexemes ||
      homonym.lexemes.length < 1 ||
      homonym.lexemes.filter((l) => l.isPopulated()).length < 1
    if (notFound && !this._store.state.app.queryStillActive) {
      let languageName
      if (homonym) {
        languageName = this.api.app.getLanguageName(homonym.languageID).name
      } else if (this._store.state.app.currentLanguageName) {
        languageName = this._store.state.app.currentLanguageName
      } else {
        languageName = this.api.l10n.getMsg('TEXT_NOTICE_LANGUAGE_UNKNOWN')
      }
      if (this._store.state.app.lexicalRequest.source === LexicalQuery.sources.PAGE) {
        // we offer change language here when the lookup was from the page because the language used for the
        // lookup is deduced from the page and might be wrong
        const message = this.api.l10n.getMsg('TEXT_NOTICE_CHANGE_LANGUAGE',
          { targetWord: this._store.state.app.targetWord, languageName: languageName, langCode: homonym.language })
        this._store.commit('ui/setNotification', { text: message, important: true, showLanguageSwitcher: true })
      } else {
        // if we are coming from e.g. the lookup or the wordlist, offering change language
        // here creates some confusion and the language was explicit upon lookup so it is not necessary
        const message = this.api.l10n.getMsg('TEXT_NOTICE_NOT_FOUND',
          { targetWord: this._store.state.app.targetWord, languageName: languageName, langCode: homonym ? homonym.language : '' })
        this._store.commit('ui/setNotification', { text: message, important: true, showLanguageSwitcher: false })
      }
    } else if (!this._store.state.app.queryStillActive) {
      this._store.commit('ui/resetNotification')
    }
  }

  // TODO: Do we need this function
  showErrorInfo (errorText) {
    this._store.commit('ui/setNotification', { text: errorText, important: true })
  }

  // TODO: Do we need this function
  showImportantNotification (message) {
    this._store.commit('ui/setNotification', { text: message, important: true })
  }

  sendFeature (feature) {
    if (this.api.ui.hasModule('panel')) {
      this.startResourceQuery(feature)
      this.api.ui.changeTab('grammar')
      this.api.ui.openPanel()
    }
    return this
  }

  /**
   * Start a new lexical request.
   *
   * @param {string} targetWord - the word to query
   * @param {string} languageID - the language identifier for the query
   * @param {object} data - extra annotation data attributes from the selection, if any
   * @param {LexicalQuery.sources} source - source of the request. Possible values: 'page', 'lookup', or 'wordlist'
   *                          default is 'page'
   */
  newLexicalRequest (targetWord, languageID, data = null, source = LexicalQuery.sources.PAGE) {
    // Reset old word-related data
    this.api.app.homonym = null
    this._store.commit('app/resetWordData')
    this.resetInflData()
    this._store.commit('ui/resetNotification')
    this._store.commit('ui/resetMessages')
    /*
    Do not reset authentication notification if there is an expired user session:
    in this case we always need to show a login prompt to the user
     */
    if (this.hasModule('auth') && !this._store.state.auth.isSessionExpired) {
      this._store.commit('auth/resetNotification')
    }

    // Set new data values
    this._store.commit('app/setTextData', { text: targetWord, languageID: languageID })
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DATA_RETRIEVAL_IN_PROGRESS'))
    this.updateLanguage(languageID)
    // this.updateWordAnnotationData(data)
    this._store.commit('app/lexicalRequestStarted', { targetWord: targetWord, source: source })

    // Right now we always need to open a UI with the new Lexical request, but we can make it configurable if needed
    this.api.ui.openLexQueryUI()
    return this
  }

  /**
   * Used by the embedded library to set an active status.
   */
  setEmbedLibActive () {
    this._store.commit('app/setEmbedLibActive', true)
  }

  resetInflData () {
    this._inflectionsViewSet = null
    this._store.commit('app/resetInflData')
  }

  // TODO: Update logic should probably go to the homonym-related objects
  updateProviders (homonym) {
    let providers = new Map() // eslint-disable-line prefer-const
    homonym.lexemes.forEach((l) => {
      if (l.provider) {
        providers.set(l.provider.uri, l.provider)
      }
      if (l.meaning && l.meaning.shortDefs) {
        l.meaning.shortDefs.forEach((d) => {
          if (d.provider) {
            providers.set(d.provider.uri, d.provider)
          }
        })
      }
      if (l.lemma && l.lemma.translation && l.lemma.translation.provider) {
        providers.set(l.lemma.translation.provider.uri, l.lemma.translation.provider)
      }
    })
    this._store.commit('app/setProviders', Array.from(providers.values()))
  }

  /**
   * Updates grammar data with URLs supplied.
   * If no URLS are provided, will reset grammar data.
   *
   * @param data
   * @param {Array} urls
   */
  updateGrammar (data) {
    if (data && data.urls && data.urls.length > 0) {
      const langCode = LanguageModelFactory.getLanguageCodeFromId(data.languageID)
      this.api.app.grammarData[langCode] = data.urls[0]

      this._store.commit('app/setUpdatedGrammar')
    }
  }

  /**
   * (re)initializes grammar data from settings
   *
   * @param {string} langCode - A language of a grammar specified by the code.
   */
  initGrammar (langCode) {
    this.api.app.grammarData[langCode] = null
    this._store.commit('app/setUpdatedGrammar')
  }

  updateTranslations (homonym) {
    this._store.commit('app/setTranslDataReady')
    this.updateProviders(homonym)
  }

  notifyExperimental (languageID) {
    if (typeof languageID !== 'symbol') {
      languageID = LanguageModelFactory.getLanguageIdFromCode(languageID)
    }
    if (LanguageModelFactory.isExperimentalLanguage(languageID)) {
      const langDetails = AppController.getLanguageName(languageID)
      this._store.commit('ui/setNotification',
        { text: this.api.l10n.getMsg('TEXT_NOTICE_EXPIRIMENTAL_LANGUAGE', { languageName: langDetails.name }), important: true })
    }
  }

  updateLanguage (currentLanguageID) {
    // the code which follows assumes we have been passed a languageID symbol
    // we can try to recover gracefully if we accidentally get passed a string value
    if (typeof currentLanguageID !== 'symbol') {
      Logger.getInstance().warn('updateLanguage was called with a string value')
      currentLanguageID = LanguageModelFactory.getLanguageIdFromCode(currentLanguageID)
    }
    this._store.commit('app/setCurrentLanguage', currentLanguageID)
    this.notifyExperimental(currentLanguageID)
    const newLanguageCode = LanguageModelFactory.getLanguageCodeFromId(currentLanguageID)
    if (this.state.currentLanguage !== newLanguageCode) {
      this.state.setItem('currentLanguage', newLanguageCode)
    }
    this.resetInflData()
  }

  restoreGrammarIndex (currentLanguageID) {
    this.startResourceQuery({ type: 'table-of-contents', value: '', languageID: currentLanguageID })
  }

  updateLemmaTranslations () {
    if (this.api.settings.getFeatureOptions().items.enableLemmaTranslations.currentValue && !this.api.settings.getFeatureOptions().items.locale.currentValue.match(/en-/)) {
      this.api.lexis.setLemmaTranslationLang(this.api.settings.getFeatureOptions().items.locale.currentValue)
    } else {
      this.api.lexis.setLemmaTranslationLang(null)
    }
  }

  updateCurrentLocale() {
    if (this.api.settings.getFeatureOptions().items.locale.currentValue) {
      this.api.l10n.setLocale(this.api.settings.getFeatureOptions().items.locale.currentValue)
    }
  }

  updateWordUsageExamples (wordUsageExamplesData) {
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_WORDUSAGE_READY'))
    this.api.app.wordUsageExamples = wordUsageExamplesData

    if (!this.api.app.wordUsageExamplesCached || this.api.app.wordUsageExamplesCached.targetWord !== this.api.app.wordUsageExamples.targetWord) {
      this.api.app.wordUsageExamplesCached = wordUsageExamplesData
    }
    this._store.commit('app/setWordUsageExamplesReady')
  }

  isGetSelectedTextEnabled (domEvent) {
    return (this.state.isActive() &&
      this.state.uiIsActive() &&
      (!this._options.triggerPreCallback || this.isMousemoveEnabled || this._options.triggerPreCallback(domEvent)))
  }

  async getWordUsageData (homonym, params = {}) {
    if (this.api.app.wordUsageExamplesCached && (this.api.app.wordUsageExamplesCached.targetWord === homonym.targetWord) && (Object.keys(params).length === 0)) {
      this._store.commit('app/setWordUsageExamplesReady', false)
      this.api.app.wordUsageExamples = this.api.app.wordUsageExamplesCached
      this._store.commit('app/setWordUsageExamplesReady', true)
      return
    }

    this._store.commit('app/setWordUsageExamplesReady', false)

    const wordUsageExamples = this.enableWordUsageExamples({ languageID: homonym.languageID }, 'onDemand')
      ? {
        paginationMax: this.api.settings.getFeatureOptions().items.wordUsageExamplesMax.currentValue,
        paginationAuthMax: this.api.settings.getFeatureOptions().items.wordUsageExamplesAuthMax.currentValue
      }
      : null

    await LexicalQuery.getWordUsageData(homonym, wordUsageExamples, params)
  }

  enableWordUsageExamples (textSelector, requestType) {
    const checkType = requestType === 'onLexicalQuery' ? this.api.settings.getFeatureOptions().items.wordUsageExamplesON.currentValue === requestType : true
    return textSelector.languageID === Constants.LANG_LATIN &&
    this.api.settings.getFeatureOptions().items.enableWordUsageExamples.currentValue &&
    checkType
  }

  getWordUsageExamplesQueryParams (textSelector) {
    if (this.enableWordUsageExamples(textSelector, 'onLexicalQuery')) {
      return {
        paginationMax: this.api.settings.getFeatureOptions().items.wordUsageExamplesMax.currentValue,
        paginationAuthMax: this.api.settings.getFeatureOptions().items.wordUsageExamplesAuthMax.currentValue
      }
    } else {
      return null
    }
  }

  handleEscapeKey (event, nativeEvent) {
    // TODO: Move to keypress as keyCode is deprecated
    // TODO: Why does it not work on initial panel opening?
    if (nativeEvent.keyCode === 27 && this.state.isActive()) {
      this.api.ui.closeUI()
    }
    return true
  }

  startResourceQuery (feature) {
    // ExpObjMon.track(
    ResourceQuery.create(feature, {
      grammars: Grammars,
      resourceOptions: this.api.settings.getResourceOptions()
    }).getData()
    //, {
    // experience: 'Get resource',
    //  actions: [
    //    { name: 'getData', action: ExpObjMon.actions.START, event: ExpObjMon.events.GET },
    //    { name: 'finalize', action: ExpObjMon.actions.STOP, event: ExpObjMon.events.GET }
    // ]
    // }).getData()
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_RESOURCE_RETRIEVAL_IN_PROGRESS'))
  }

  onLexicalQueryComplete (data) {
    switch (data.resultStatus) {
      case LexicalQuery.resultStatus.SUCCEEDED:
        this.showLanguageInfo(data.homonym)
        this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_LEXQUERY_COMPLETE'))
        break
      case LexicalQuery.resultStatus.FAILED:
        this.showLanguageInfo(data.homonym)
        this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_LEXQUERY_COMPLETE'))
    }
    this._store.commit('app/lexicalRequestFinished')
  }

  onMorphDataReady () {
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_MORPHDATA_READY'))
  }

  onMorphDataNotFound () {
    this._store.commit('ui/setNotification', { text: this.api.l10n.getMsg('TEXT_NOTICE_MORPHDATA_NOTFOUND'), important: true })
    this._store.commit('app/setQueryStillActive', true)
  }

  onHomonymReady (homonym) {
    homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))

    // Update status info with data from a morphological analyzer
    this._store.commit('app/setTextData', { text: homonym.targetWord, languageID: homonym.languageID })

    // Update inflections data
    const inflectionsViewSet = ViewSetFactory.create(homonym, this.api.settings.getFeatureOptions().items.locale.currentValue)

    if (inflectionsViewSet.hasMatchingViews) {
      this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_INFLDATA_READY'))
    }
    this.api.app.homonym = homonym
    const wordUsageExampleEnabled = this.enableWordUsageExamples({ languageID: homonym.languageID })

    this._store.commit('app/setHomonym', homonym)
    this._store.commit('app/setWordUsageExampleEnabled', wordUsageExampleEnabled)

    this._store.commit('app/setMorphDataReady')

    let inflDataReady = false
    if (LanguageModelFactory.getLanguageModel(this._store.state.app.currentLanguageID).canInflect()) {
      inflDataReady = Boolean(inflectionsViewSet && inflectionsViewSet.hasMatchingViews)
      this._inflectionsViewSet = inflectionsViewSet
    }

    // TODO: Shall we make this delay conditional to avoid performance degradation?
    //       Or will it be not noticeable at all?
    Vue.nextTick(() => {
      /*
      If we're using a word from a word list and a data manager is null then we're actually getting
      a homonym data from memory. Because of this `inflDataReady` app store prop is changed to
      false and then to true so fast that both those changes end up within the same Vue loop.
      As a result of optimization performed by Vue, the change to false is probably never applied,
      and maybe a change to true too.
      This prevents an inflDataReady watcher within `inflection.vue` component from being called.
      As a result, an update of inflection data within an inflections component that is triggered
      within that callback does not happen.
      To prevent this, we introduce a delay that will allow Vue to notice a prop change
      and call a watcher function.
       */
      this._store.commit('app/setInflData', inflDataReady)
    })

    // The homonym can already has short defs data
    if (homonym.hasShortDefs) {
      this.updateProviders(homonym)
      this._store.commit('app/shortDefsUpdated')
    }
  }

  onWordListUpdated (wordList) {
    this._store.commit('app/setWordLists', wordList)
    if (this.hasModule('auth') && this._store.state.auth.enableLogin && !this._store.state.auth.isAuthenticated && !this._store.state.auth.isSessionExpired) {
      this._store.commit('auth/setNotification', { text: 'TEXT_NOTICE_SUGGEST_LOGIN', showLogin: true, count: this._wordlistC.getWordListItemCount() })
    }
  }

  onLemmaTranslationsReady (homonym) {
    this.updateTranslations(homonym)
  }

  onShortDefinitionsReady (data) {
    this.api.app.homonym = data.homonym
    this._store.commit('app/setQueryStillActive', false)
    this.showLanguageInfo(data.homonym)
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DEFSDATA_READY', { requestType: data.requestType, lemma: data.word }))
    this.updateProviders(data.homonym)
    this._store.commit('app/shortDefsUpdated')
  }

  onFullDefinitionsReady (data) {
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DEFSDATA_READY', { requestType: data.requestType, lemma: data.word }))
    this.updateProviders(data.homonym)
    this._store.commit('app/fullDefsUpdated')
  }

  onDefinitionsNotFound (data) {
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DEFSDATA_NOTFOUND', { requestType: data.requestType, word: data.word }))
  }

  onResourceQueryComplete () {
    // We don't check result status for now. We always output the same message.
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_COMPLETE'))
  }

  onGrammarAvailable (data) {
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_READY'))
    this.updateGrammar(data)
  }

  onGrammarNotFound () {
    this.updateGrammar()
    this._store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_NOT_FOUND'))
  }

  async onWordItemSelected (wordItem) {
    if (!this._userDataManager && !wordItem.homonym) {
      Logger.getInstance().warn('UserDataManager is not defined, data couldn\'t be loaded from the storage')
      return
    }
    const languageID = LanguageModelFactory.getLanguageIdFromCode(wordItem.languageCode)
    this.newLexicalRequest(wordItem.targetWord, languageID, null, 'wordlist')

    let homonym
    if (this._userDataManager) {
      const wordItemFull = await this._userDataManager.query({ dataType: 'WordItem', params: { wordItem } }, { type: 'full' })
      homonym = wordItemFull[0].homonym
    } else {
      homonym = wordItem.homonym
    }

    if (homonym && homonym.lexemes && homonym.lexemes.length > 0 && homonym.lexemes.filter(l => l.isPopulated()).length === homonym.lexemes.length) {
      // if we were able to retrieve full homonym data then we can just display it
      this.onHomonymReady(homonym)
      // we still need to notify the wordlist controller that an onHomonymReady event
      // was received so that it can update the wordlist item as appropriate
      this._wordlistC.onHomonymReady(homonym)

      // TODO: updateProvides is already called by the onHomonymReady() (if there are short definitions)
      //       and by the updateTranslations(). We should try to optimize that flow.
      this.updateProviders(homonym)
      // We already have both short and full definitions so we can update the status of both
      this._store.commit('app/shortDefsUpdated')
      this._store.commit('app/fullDefsUpdated')
      // this.updateDefinitions(homonym)
      this.updateTranslations(homonym)
      this._store.commit('app/lexicalRequestFinished')
    } else {
      // otherwise we can query for it as usual
      const textSelector = TextSelector.createObjectFromText(homonym.targetWord, homonym.languageID)
      this.api.lexis.lookupText(textSelector)
    }
  }

  /**
   * Updates the Application State after settings have been reset or reloaded
   */
  applyAllOptions () {
    for (const name of this.api.settings.getFeatureOptions().names) {
      this.applyFeatureOption(name)
      this._store.commit('settings/incrementFeatureResetCounter')
    }
    for (const name of this.api.settings.getResourceOptions().names) { // eslint-disable-line no-unused-vars
      this._store.commit('settings/incrementResourceResetCounter')
    }
    for (const name of this.api.settings.getUiOptions().names) {
      this.applyUIOption(name, this.api.settings.getUiOptions().items[name].currentValue)
      this._store.commit('settings/incrementUiResetCounter')
    }
  }

  /**
   * Updates the state of a feature to correspond to current options
   *
   * @param {string} settingName the name of the setting
   */
  applyFeatureOption (settingName) {
    switch (settingName) {
      case 'locale':
        this.updateLemmaTranslations()
        this.updateCurrentLocale()
        break
      case 'preferredLanguage':
        this.updateLanguage(this.api.settings.getFeatureOptions().items.preferredLanguage.currentValue)
        // If user manually sets the preferred language option then the language chosen must have priority over the `textLang`
        this._options.overridePreferredLanguage = false
        break
      case 'enableLemmaTranslations':
        this.updateLemmaTranslations()
        break
      case 'enableMouseMove':
        // If user manually sets the mouse move option then this takes priority over the page override
        this._options.enableMouseMoveOverride = false
        this._store.commit('app/setMouseMoveOverrideUpdate')
        if (this._selc) {
          this._selc.replaceEventForAll(...this.textSelectorParams)
        }
        break
    }
  }

  applyResourceOption (name, value) {
    // grouped setting are referenced under Options object
    // by the parsed name but each individual setting in a group is referenced
    // by its fullname (with version and groupname appended)
    // multivalued settings are handled in the Options.setTextValue method which can take
    // an array or an individual text value
    const baseKey = Options.parseKey(name)
    if (baseKey.name === 'grammars') {
      this.initGrammar(baseKey.group)
    }
  }

  /**
   * Updates the state of the UI to match the options settings.
   *
   * @param {string} settingName - The name of the setting to apply.
   * @param value
   */
  applyUIOption (settingName, value) {
    switch (settingName) {
      case 'fontSize':
        UIController.applyFontSize(value)
        break
      case 'panelPosition':
        if (this.hasModule('panel')) {
          this._store.commit('panel/setPosition', value)
        }
        break
      case 'verboseMode':
        /*
        The value of the `verboseMode` option passed as an argument of this method is a string value.
        The text of the string is specific to the options object and may change without notice.
        The App Controller has no knowledge of what those string option values might be.
        That's why we're using a `isInVerboseMode()` method of the Settings public API.
        It returns a boolean and is much simpler and safer in use.
         */
        Logger.getInstance().setVerboseMode(this.api.settings.isInVerboseMode())
        break
      case 'hideLoginPrompt':
        if (this.api.auth) {
          this._store.commit('auth/setHideLoginPrompt', value)
        }
        break
      case 'mouseMoveDelay':
        if (this._selc && this.isMousemoveEnabled) {
          this._selc.updateParamsForAll({ mouseMoveDelay: value })
        }
        break
      case 'mouseMoveAccuracy':
        if (this._selc && this.isMousemoveEnabled) {
          this._selc.updateParamsForAll({ mouseMoveAccuracy: value })
        }
        break
      case 'enableMouseMoveLimitedByIdCheck':
        if (this._selc && this.isMousemoveEnabled) {
          this._selc.updateParamsForAll({ enableMouseMoveLimitedByIdCheck: value })
        }
        break
      case 'forceMouseMoveGoogleDocs':
        if (this._selc) {
          // An event must be replaced because a change of this setting may cause an event change
          this._selc.replaceEventForAll(...this.textSelectorParams)
        }
        break
    }
  }

  /**
   * This is a callback for the text selection done via a selection UI.
   *
   * @param {TextSelector} textSelector - An object containing a text selection.
   * @param {Event} domEvent - A DOM event that initiated a query.
   */
  onTextSelected ({ textSelector, domEvent }) {
    if (this.isGetSelectedTextEnabled(domEvent) && textSelector && !textSelector.isEmpty()) {
      const lastTextSelector = this.api.lexis.lastTextSelector || {}
      // Do not run a lexical query if the same word is already shown in a popup on desktop
      if (this._platform.isDesktop && this.api.ui.isPopupVisible()) {
        if (lastTextSelector.text === textSelector.text &&
          lastTextSelector.languageID === textSelector.languageID) {
          // Do nothing
          return
        }
      }
      this.api.lexis.getSelectedText(textSelector, domEvent.target)
    }
  }

  get isMousemoveEnabled () {
    return this._platform.isDesktop && (this.api.settings.getFeatureOptions().items.enableMouseMove.currentValue || this._options.enableMouseMoveOverride || this.isMousemoveForced())
  }

  isMousemoveForced () {
    return Boolean(this._platform.isDesktop && this._platform.isGoogleDocs && this.api.settings.getUiOptions().items.forceMouseMoveGoogleDocs.currentValue)
  }
}

/**
 * A name of a components library from a "description" field of package.json
 */
AppController.libName = packageDescription

/**
 * A version of a components library from a "version" field of package.json
 */
AppController.libVersion = packageVersion

/**
 * An instance of a warning panel that is shown when an app controller is disabled
 * because an Alpheios embedded lib is active on a page
 *
 * @type {Vue | null}
 */
AppController.embedLibWarningInstance = null
