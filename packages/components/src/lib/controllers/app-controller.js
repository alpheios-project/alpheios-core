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
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import LexisModule from '@/vue/vuex-modules/data/lexis.js'
import Locales from '@/locales/locales.js'

import EmbedLibWarning from '@/vue/components/embed-lib-warning.vue'

import LexicalQuery from '@/lib/queries/lexical-query.js'
import ResourceQuery from '@/lib/queries/resource-query.js'
import SiteOptions from '@/settings/site-options.json'
import FeatureOptionDefaults from '@/settings/feature-options-defaults.json'
import UIOptionDefaults from '@/settings/ui-options-defaults.json'
import TextSelector from '@/lib/selection/text-selector'
import Platform from '@/lib/utility/platform.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import MouseDblClick from '@/lib/custom-pointer-events/mouse-dbl-click.js'
import LongTap from '@/lib/custom-pointer-events/long-tap.js'
import GenericEvt from '@/lib/custom-pointer-events/generic-evt.js'
import MouseMove from '@/lib/custom-pointer-events/mouse-move.js'

import Options from '@/lib/options/options.js'
import LocalStorage from '@/lib/options/local-storage-area.js'
import RemoteAuthStorageArea from '@/lib/options/remote-auth-storage-area.js'
import UIController from '@/lib/controllers/ui-controller.js'
import UIEventController from '@/lib/controllers/ui-event-controller.js'
import QueryParams from '@/lib/utility/query-params.js'

const languageNames = new Map([
  [Constants.LANG_LATIN, 'Latin'],
  [Constants.LANG_GREEK, 'Greek'],
  [Constants.LANG_ARABIC, 'Arabic'],
  [Constants.LANG_PERSIAN, 'Persian'],
  [Constants.LANG_GEEZ, 'Ancient Ethiopic (Ge\'ez)'],
  [Constants.LANG_SYRIAC, 'Syriac'],
  [Constants.LANG_CHINESE, 'Chinese']
])

const layoutClasses = {
  COMPACT: 'alpheios-layout-compact',
  LARGE: 'alpheios-layout-large'
}

const injectionClasses = {
  DISABLE_TEXT_SELECTION: 'alpheios-disable-user-selection'
}

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
    this.options = AppController.setOptions(options, AppController.optionsDefaults)

    this.tabs = {
      DEFAULT: this.options.overrideHelp ? 'settings' : 'info',
      DISABLED: 'disabled'
    }
    /*
    Define defaults for resource options. If a app controller creator
    needs to provide its own defaults, they shall be defined in a `create()` function.
     */
    this.featureOptionsDefaults = FeatureOptionDefaults
    this.resourceOptionsDefaults = LanguageOptionDefaults
    this.uiOptionsDefaults = UIOptionDefaults
    this.siteOptionsDefaults = SiteOptions
    /*
    All following options will be created during an init phase.
    This will allow creators of an app controller to provide their own options defaults
    inside a `create()` builder function.
     */
    this.featureOptions = null
    this.resourceOptions = null
    this.uiOptions = null
    this.siteOptions = null // Will be set during an `init` phase

    this.irregularBaseFontSize = !AppController.hasRegularBaseFontSize()
    this.isInitialized = false
    this.isActivated = false
    this.isDeactivated = false
    // The following indicate whether we're registered getSelectedText callback
    // TODO: this will probably be not needed in the long run as this functionality will go to a Lexis data module
    this.isGetSelectedTextRegistered = false
    this.userDataManager = null

    // Obtain the logger instance
    this.logger = Logger.getInstance()

    /**
     * Information about the platform an app is running upon.
     *
     * @type {Platform} - A an object containing data about the platform.
     */
    this.platform = new Platform({ setRootAttributes: true, appType: this.options.appType })
    // Assign a class that will specify what type of layout will be used
    const layoutClassName = (this.platform.isMobile)
      ? layoutClasses.COMPACT
      : layoutClasses.LARGE
    document.body.classList.add(layoutClassName)

    // Vuex store. A public API for data and UI module interactions.
    this.store = new Vuex.Store({
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
    this.modules = new Map()

    // Get query parameters from the URL. Do this early so they will be available to modules during registration
    this.queryParams = QueryParams.parse()

    /**
     * Holds an instance of a UI controller. Its purpose is to manage all UI components within an application.
     *
     * @type {UIEventController}
     */
    this.uic = new UIController({
      platform: this.platform,
      uiState: this.state,
      queryParams: this.queryParams,
      defaultTabName: this.options.overrideHelp ? 'settings' : 'info'
    })

    /**
     * `evc` holds an instance of an event controller, if the latter is used in an application.
     * It will be initialized at a later stage.
     *
     * @type {UIEventController}
     */
    this.evc = null

    this.wordlistC = {} // This is a word list controller
  }

  /**
   * Creates an instance of an app controller with default options. Provide your own implementation of this method
if you want to create a different configuration of an app controller.
   *
   * @param state
   * @param options
   */
  static create (state, options) {
    let appController = new AppController(state, options) // eslint-disable-line prefer-const

    /*
    If necessary override defaults of an app controller's options objects here as:
    appController.siteOptionsDefaults = mySiteDefaults
     */

    // Register data modules
    appController.registerModule(L10nModule, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr()
    })

    appController.registerModule(LexisModule, {
      arethusaTbRefreshRetryCount: appController.options.arethusaTbRefreshRetryCount,
      arethusaTbRefreshDelay: appController.options.arethusaTbRefreshDelay
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
    appController.evc = new UIEventController()
    appController.evc.registerListener('HandleEscapeKey', document, appController.handleEscapeKey.bind(appController), GenericEvt, 'keydown')

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

    appController.wordlistC = new WordlistController(LanguageModelFactory.availableLanguages(), LexicalQuery.evt)
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
    return Boolean(this.uic)
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
    if (!moduleClass.isSupportedPlatform(this.platform)) {
      this.logger.warn(`Skipping registration of a ${moduleClass.moduleName} module because it does not support a ${this.platform.deviceType} type of devices`)
      return this
    }

    if (moduleClass.isDataModule) {
      // Data modules are registered with an app controller
      options.queryParams = this.queryParams
      options.platform = this.platform
      this.modules.set(moduleClass.moduleName, { ModuleClass: moduleClass, options, instance: null })
    } else if (moduleClass.isUiModule) {
      // UI modules belong to a UI controller
      if (this.hasUIController) { this.uic.registerModule(moduleClass, options) }
    } else {
      this.logger.warn(`Skipping registration of a ${moduleClass.moduleName} of unkown type: ${moduleClass.moduleType}`)
    }
    return this
  }

  get dataModules () {
    return Array.from(this.modules.values()).filter(m => m.ModuleClass.isDataModule)
  }

  createModules () {
    this.dataModules.forEach((m) => {
      m.instance = new m.ModuleClass(this.store, this.api, m.options)
    })
  }

  activateModules () {
    this.dataModules.forEach(m => m.instance.activate())
  }

  deactivateModules () {
    this.dataModules.forEach(m => m.instance.deactivate())
  }

  hasModule (moduleName) {
    return this.modules.has(moduleName)
  }

  getModule (moduleName) {
    return this.modules.get(moduleName).instance
  }

  async init () {
    if (this.isInitialized) { return 'Already initialized' }
    // Start loading options as early as possible
    const optionLoadPromises = this.initOptions(this.options.storageAdapter)
    const appConfigLoadPromise = this.loadAppConfig({
      url: this.options.configServiceUrl,
      clientId: this.options.clientId,
      appName: this.options.app.name,
      appVersion: this.options.app.version,
      branch: this.options.app.buildBranch,
      buildNumber: this.options.app.buildNumber
    })

    // Create a copy of resource options for the lookup UI component
    // this doesn't get reloaded from the storage adapter because
    // we don't expose it to the user via preferences
    this.lookupResourceOptions = new Options(this.resourceOptionsDefaults, new this.options.storageAdapter(this.resourceOptionsDefaults.domain)) // eslint-disable-line new-cap
    // TODO: Site options should probably be initialized the same way as other options objects
    this.siteOptions = this.loadSiteOptions(this.siteOptionsDefaults)

    // Will add morph adapter options to the `options` object of an app controller constructor as needed.

    // Inject HTML code of a plugin. Should go in reverse order.
    document.body.classList.add('alpheios')

    const [appConfig, ...options] = await Promise.all([appConfigLoadPromise, ...optionLoadPromises])
    this.appConfig = appConfig

    // All options has been loaded after this point

    // The following options will be applied to all logging done via a single Logger instance
    // Set the  logger verbose mode according to the settings
    this.logger.setVerboseMode(this.verboseMode())
    this.logger.prependModeOn() // Set a prepend mode that will add an Alpheios prefix to the printed statements
    this.logger.traceModeOff() // Enable the log call stack tracing

    /**
     * This is a settings API. It exposes different options to modules and UI components.
     */
    this.api.settings = {
      getFeatureOptions: this.getFeatureOptions.bind(this),
      getResourceOptions: this.getResourceOptions.bind(this),
      getUiOptions: this.getUiOptions.bind(this),
      verboseMode: this.verboseMode.bind(this),
      // we don't offer UI to change to lookupResourceOptions or siteOptions
      // so they remain out of dynamic state for now - should eventually
      // refactor
      lookupResourceOptions: this.lookupResourceOptions,
      siteOptions: this.siteOptions
    }

    this.store.registerModule('settings', {
      // All stores of modules are namespaced
      namespaced: true,
      state: {
        // these counters are used to enable the settings ui components
        // to redraw themselves when settings are reset or reloaded
        // it might be better if all settings were made into
        // state variables but for now state is monitored at the domain level
        uiResetCounter: 0,
        featureResetCounter: 0,
        resourceResetCounter: 0
      },
      mutations: {
        incrementUiResetCounter (state) {
          state.uiResetCounter += 1
        },

        incrementFeatureResetCounter (state) {
          state.featureResetCounter += 1
        },

        incrementResourceResetCounter (state) {
          state.resourceResetCounter += 1
        }
      }
    })

    this.api.app = {
      name: this.options.app.name, // A name of a host application (embed lib or webextension)
      version: this.options.app.version, // An version of a host application (embed lib or webextension)
      buildName: this.options.app.buildName, // A build number of a host application
      clientId: this.options.clientId, // alpheios api client identifier
      libName: AppController.libName, // A name of the components library
      libVersion: AppController.libVersion, // A version of the components library
      libBuildName: BUILD_NAME, // A name of a build of a components library that will be injected by Webpack
      config: this.appConfig,
      platform: this.platform,
      mode: this.options.mode, // Mode of an application: `production` or `development`
      defaultTab: this.tabs.DEFAULT, // A name of a default tab (a string)
      state: this.state, // An app-level state
      homonym: null,
      inflectionsViewSet: null,
      wordUsageExamplesCached: null,
      wordUsageExamples: null,
      wordUsageAuthors: [],
      grammarData: {},
      // Exposes parsed query parameters to other components
      queryParams: this.queryParams,
      isDevMode: () => {
        return this.options.mode === 'development'
      },

      // TODO: Some of the functions below should probably belong to other API groups.
      getDefaultLangCode: this.getDefaultLangCode.bind(this),
      registerAndActivateGetSelectedText: this.registerAndActivateGetSelectedText.bind(this),
      forceMouseMoveEvent: this.forceMouseMoveEvent.bind(this),
      getMouseMoveOverride: this.getMouseMoveOverride.bind(this),
      clearMouseMoveOverride: this.clearMouseMoveOverride.bind(this),
      featureOptionChange: this.featureOptionChange.bind(this),
      resetAllOptions: this.resetAllOptions.bind(this),
      updateLanguage: this.updateLanguage.bind(this),
      notifyExperimental: this.notifyExperimental.bind(this),
      getLanguageName: AppController.getLanguageName,
      startResourceQuery: this.startResourceQuery.bind(this),
      sendFeature: this.sendFeature.bind(this),
      getHomonymLexemes: () => this.api.app.homonym ? this.api.app.homonym.lexemes : [],
      getInflectionsViewSet: () => this.api.app.inflectionsViewSet,
      getInflectionViews: (partOfSpeech) => this.api.app.inflectionsViewSet ? this.api.app.inflectionsViewSet.getViews(partOfSpeech) : [],
      hasMorphData: () => {
        const lexemes = this.api.app.getHomonymLexemes()
        if (!this.store.state.app.homonymDataReady || lexemes.length === 0) {
          return false
        }
        if (Array.isArray(lexemes) && lexemes.length > 0 &&
          (lexemes[0].lemma.principalParts.length > 0 || lexemes[0].inflections.length > 0 || lexemes[0].inflections.length > 0 ||
            lexemes[0].meaning.fullDefs.length > 0 || lexemes[0].meaning.shortDefs.length > 0)
        ) {
          return true
        }
        return false
      },
      getWordUsageData: this.getWordUsageData.bind(this),
      getWordList: this.wordlistC.getWordList.bind(this.wordlistC),
      selectWordItem: this.wordlistC.selectWordItem.bind(this.wordlistC),
      updateAllImportant: this.wordlistC.updateAllImportant.bind(this.wordlistC),
      updateWordItemImportant: this.wordlistC.updateWordItemImportant.bind(this.wordlistC),
      removeWordListItem: this.wordlistC.removeWordListItem.bind(this.wordlistC),
      removeWordList: this.wordlistC.removeWordList.bind(this.wordlistC),
      getAllWordLists: () => this.wordlistC ? this.wordlistC.wordLists : [],

      enableWordUsageExamples: this.enableWordUsageExamples.bind(this),
      isGetSelectedTextEnabled: this.isGetSelectedTextEnabled.bind(this),
      newLexicalRequest: this.newLexicalRequest.bind(this),
      getWordUsageExamplesQueryParams: this.getWordUsageExamplesQueryParams.bind(this),

      restoreGrammarIndex: this.restoreGrammarIndex.bind(this)
    }

    this.store.registerModule('app', {
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

    /**
     * This is a UI-level public API of a UI controller. All objects should use this public API only.
     */
    this.api.ui = {
      optionChange: this.uiOptionChange.bind(this) // Handle a change of UI options
    }

    this.store.registerModule('ui', {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
        activeTab: this.tabs.DEFAULT, // A currently selected panel's tab
        disabledTab: this.tabs.DISABLED,
        overrideHelp: this.options.overrideHelp,

        messages: [],
        // Panel and popup notifications
        notification: {
          visible: false,
          important: false,
          showLanguageSwitcher: false,
          text: null
        },

        hint: {
          visible: false,
          text: null
        }
      },

      getters: {
        isActiveTab: (state) => (tabName) => {
          return state.activeTab === tabName
        }
      },

      mutations: {
        setActiveTab (state, tabName) {
          state.activeTab = tabName
        },

        // Set active tab name to `disabled` when panel is closed so that no selected tab be shown in a toolbar
        resetActiveTab (state) {
          state.activeTab = state.disabledTab
        },

        setNotification (state, data) {
          state.notification.visible = true
          state.notification.important = data.important || false
          state.notification.showLanguageSwitcher = data.showLanguageSwitcher || false
          state.notification.text = data.text || data
        },

        resetNotification (state) {
          state.notification.visible = false
          state.notification.important = false
          state.notification.showLanguageSwitcher = false
          state.notification.text = null
        },

        setHint (state, data) {
          state.hint.visible = true
          state.hint.text = data
        },

        resetHint (state) {
          state.hint.visible = false
          state.hint.text = null
        },

        addMessage (state, text) {
          state.messages.push(text)
        },

        resetMessages (state) {
          state.messages = []
        }
      }
    })

    // If `textLangCode` is set, use it over the `preferredLanguage`
    this.options.overridePreferredLanguage = Boolean(this.options.textLangCode)
    this.store.commit('app/setSelectedLookupLang', this.getDefaultLangCode())
    this.api.language = {
      resourceSettingChange: this.resourceSettingChange.bind(this)
    }

    // Create registered data modules
    this.createModules()

    // The current language must be set after data modules are created (because it uses an L10n module)
    // but before the UI modules are created (because UI modules use current language during rendering).
    const defaultLangCode = this.getDefaultLangCode()
    const defaultLangID = LanguageModelFactory.getLanguageIdFromCode(defaultLangCode)
    // Set the lookup
    this.featureOptions.items.lookupLanguage.setValue(defaultLangCode)
    this.updateLanguage(defaultLangID)

    // Create registered UI modules
    // this.createUiModules()
    if (this.hasUIController) { this.uic.init({ api: this.api, store: this.store, uiOptions: this.uiOptions }) }

    // this.uiSetFontSize(this.uiOptions)

    this.updateLemmaTranslations()

    // Get selected text must be registered after a Lexis data module is activated because it uses its functionality
    if (!this.isGetSelectedTextRegistered) {
      this.registerGetSelectedText('GetSelectedText', this.options.textQuerySelector)
      this.isGetSelectedTextRegistered = true
    }

    this.isInitialized = true

    return this
  }

  /**
   * initialize the options using the supplied storage adapter class
   *
   * @param {Function<StorageAdapter>} StorageAdapter the adapter class to instantiate
   * @param {object} authData optional authentication data if the adapter is one that requires it
   * @returns Promise[] an array of promises to load the options data from the adapter
   */
  initOptions (StorageAdapter, authData = null) {
    this.featureOptions = new Options(this.featureOptionsDefaults, new StorageAdapter(this.featureOptionsDefaults.domain, authData))
    this.resourceOptions = new Options(this.resourceOptionsDefaults, new StorageAdapter(this.resourceOptionsDefaults.domain, authData))
    this.uiOptions = new Options(this.uiOptionsDefaults, new StorageAdapter(this.uiOptionsDefaults.domain, authData))
    return [this.featureOptions.load(), this.resourceOptions.load(), this.uiOptions.load()]
  }

  /**
   * Loads an application wide configuration file in a JSON format.
   *
   * @param {string} url - A URL of an app config server.
   * @param {string} clientId - A client ID.
   * @param {string} appName - An application name, such as "Alpheios Reading Tools".
   * @param {string} appVersion - An application version, following a semver specification.
   * @param {string} branch - A name of a git branch that was used to build the code.
   * @param {string} buildNumber - A build number in a YYYYMMDDCCC format.
   *        See `node-build` package for a generator function.
   * @returns {Promise<object> | Promise<null>} - A promise that is resolved with an app config in a JSON format
   *          or is resolved with a `null` value if a config retrieval failed.
   */
  async loadAppConfig ({ url, clientId, appName, appVersion, branch, buildNumber } = {}) {
    if (!url) {
      throw new Error('An app config server URL is missing')
    }
    try {
      const configUrl = `${url}?clientId=${encodeURIComponent(clientId)}&appName=${encodeURIComponent(appName)}` +
        `&appVersion=${encodeURIComponent(appVersion)}&buildBranch=${encodeURIComponent(branch)}` +
        `&buildNumber=${encodeURIComponent(buildNumber)}`
      const request = new Request(configUrl)
      const response = await fetch(request)
      return response.json()
    } catch (err) {
      this.logger.error(`Unable to retrieve an app configuration from ${url}: ${err.message}`)
      return null
    }
  }

  async initUserDataManager (isAuthenticated) {
    let wordLists
    let optionLoadPromises
    if (isAuthenticated) {
      const authData = await this.api.auth.getUserData()
      this.userDataManager = new UserDataManager(authData, WordlistController.evt)
      wordLists = await this.wordlistC.initLists(this.userDataManager)
      this.store.commit('app/setWordLists', wordLists)
      optionLoadPromises = this.initOptions(RemoteAuthStorageArea, authData)
    } else {
      // TODO we need to make the UserDataManager a singleton that can
      // handle switching users gracefully
      this.userDataManager.clear()
      this.userDataManager = null
      wordLists = await this.wordlistC.initLists()

      // reload the user-configurable options
      optionLoadPromises = this.initOptions(this.options.storageAdapter)
    }
    await Promise.all(optionLoadPromises)
    this.onOptionsReset()
    this.store.commit('app/setWordLists', wordLists)
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

    // Inject Alpheios CSS rules
    this.activateOnPage()

    this.isActivated = true
    this.isDeactivated = false

    this.activateModules()

    if (this.hasUIController) {
      this.uic.activate()
    }

    // Activate listeners
    if (this.evc) { this.evc.activateListeners() }

    // we have to register and activate the mouse move event separately
    // because when it is active the regular GetSelectedText listener needs
    // to be diabled and vice-versa. We don't currently have a way to express
    // this dependency between registered event listeners in the EventListenerController
    // EventListController.activateListeners activates ALL registered listeners
    // so we can't register the mouse move event and the regular get selected text
    // event together. At some point we should refactor to either make the mousemove
    // event handled by the regular get selected text listener as a valid value for
    // textQueryTriggerDesktop  or support this type of dependency in the
    // EventListenerController
    this.registerAndActivateMouseMove('GetSelectedText', this.options.textQuerySelector)

    this.authUnwatch = this.store.watch((state) => state.auth.isAuthenticated, (newValue, oldValue) => {
      this.initUserDataManager(newValue)
    })

    if (this.api.auth) {
      // initiate session check so that user data is available
      // if we have an active session
      this.api.auth.session()
    }
    return this
  }

  getDefaultLangCode () {
    return this.options.overridePreferredLanguage ? this.options.textLangCode : this.featureOptions.items.preferredLanguage.currentValue
  }

  getMouseMoveOverride () {
    return this.options.enableMouseMoveOverride
  }

  clearMouseMoveOverride () {
    this.options.enableMouseMoveOverride = undefined
    this.store.commit('app/setMouseMoveOverrideUpdate')
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
    if (this.evc) { this.evc.deactivateListeners() }

    this.deactivateModules()
    if (this.hasUIController) {
      this.uic.deactivate()
    }

    // Remove Alpheios CSS rules
    this.deactivateOnPage()

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

  activateOnPage () {
    if (document && document.body) {
      if (this.options.disableTextSelection && this.platform.isMobile) {
        // Disable text selection on mobile platforms when a corresponding option is set
        document.body.classList.add(injectionClasses.DISABLE_TEXT_SELECTION)
      } else {
        // If extension has been deactivated previously, deactivateOnPage() would be setting
        // a DISABLE_TEXT_SELECTION for the page body. We shall remove it.
        if (document.body.classList.contains(injectionClasses.DISABLE_TEXT_SELECTION)) {
          document.body.classList.remove(injectionClasses.DISABLE_TEXT_SELECTION)
        }
      }
    } else {
      this.logger.warn('Cannot inject Alpheios CSS rules because either document or body do not exist')
    }
  }

  deactivateOnPage () {
    if (document && document.body) {
      document.body.classList.add(injectionClasses.DISABLE_TEXT_SELECTION)
    }
  }

  /**
   * Load site-specific settings
   *
   * @param {object[]} siteOptions - An array of site options
   */
  loadSiteOptions (siteOptions) {
    let allSiteOptions = [] // eslint-disable-line prefer-const
    for (const site of siteOptions) {
      for (const domain of site.options) {
        const siteOpts = new Options(domain, new this.options.storageAdapter(domain.domain)) // eslint-disable-line new-cap
        allSiteOptions.push({ uriMatch: site.uriMatch, resourceOptions: siteOpts })
      }
    }
    return allSiteOptions
  }

  static hasRegularBaseFontSize () {
    const htmlElement = document.querySelector('html')
    return window.getComputedStyle(htmlElement, null).getPropertyValue('font-size') === '16px'
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
    if (notFound && !this.store.state.app.queryStillActive) {
      let languageName
      if (homonym) {
        languageName = this.api.app.getLanguageName(homonym.languageID).name
      } else if (this.store.state.app.currentLanguageName) {
        languageName = this.store.state.app.currentLanguageName
      } else {
        languageName = this.api.l10n.getMsg('TEXT_NOTICE_LANGUAGE_UNKNOWN')
      }
      if (this.store.state.app.lexicalRequest.source === LexicalQuery.sources.PAGE) {
        // we offer change language here when the lookup was from the page because the language used for the
        // lookup is deduced from the page and might be wrong
        const message = this.api.l10n.getMsg('TEXT_NOTICE_CHANGE_LANGUAGE',
          { targetWord: this.store.state.app.targetWord, languageName: languageName, langCode: homonym.language })
        this.store.commit('ui/setNotification', { text: message, important: true, showLanguageSwitcher: true })
      } else {
        // if we are coming from e.g. the lookup or the wordlist, offering change language
        // here creates some confusion and the language was explicit upon lookup so it is not necessary
        const message = this.api.l10n.getMsg('TEXT_NOTICE_NOT_FOUND',
          { targetWord: this.store.state.app.targetWord, languageName: languageName, langCode: homonym.language })
        this.store.commit('ui/setNotification', { text: message, important: true, showLanguageSwitcher: false })
      }
    } else if (!this.store.state.app.queryStillActive) {
      this.store.commit('ui/resetNotification')
    }
  }

  // TODO: Do we need this function
  showErrorInfo (errorText) {
    this.store.commit('ui/setNotification', { text: errorText, important: true })
  }

  // TODO: Do we need this function
  showImportantNotification (message) {
    this.store.commit('ui/setNotification', { text: message, important: true })
  }

  sendFeature (feature) {
    if (this.uic.hasModule('panel')) {
      this.api.app.startResourceQuery(feature)
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
    this.store.commit('app/resetWordData')
    this.resetInflData()
    this.store.commit('ui/resetNotification')
    this.store.commit('ui/resetMessages')
    /*
    Do not reset authentication notification if there is an expired user session:
    in this case we always need to show a login prompt to the user
     */
    if (!this.store.state.auth.isSessionExpired) {
      this.store.commit('auth/resetNotification')
    }

    // Set new data values
    this.store.commit('app/setTextData', { text: targetWord, languageID: languageID })
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DATA_RETRIEVAL_IN_PROGRESS'))
    this.updateLanguage(languageID)
    // this.updateWordAnnotationData(data)
    this.store.commit('app/lexicalRequestStarted', { targetWord: targetWord, source: source })

    // Right now we always need to open a UI with the new Lexical request, but we can make it configurable if needed
    this.open()
    return this
  }

  setEmbedLibActive () {
    this.store.commit('app/setEmbedLibActive', true)
  }

  resetInflData () {
    this.api.app.inflectionsViewSet = null
    this.store.commit('app/resetInflData')
  }

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
    this.store.commit('app/setProviders', Array.from(providers.values()))
  }

  /**
   * Updates grammar data with URLs supplied.
If no URLS are provided, will reset grammar data.
   *
   * @param data
   * @param {Array} urls
   */
  updateGrammar (data) {
    if (data && data.urls && data.urls.length > 0) {
      const langCode = LanguageModelFactory.getLanguageCodeFromId(data.languageID)
      this.api.app.grammarData[langCode] = data.urls[0]

      this.store.commit('app/setUpdatedGrammar')
    }
  }

  /**
   * (re)initializes grammar data from settings
   *
   * @param {string} langCode - A language of a grammar specified by the code.
   */
  initGrammar (langCode) {
    this.api.app.grammarData[langCode] = null
    this.store.commit('app/setUpdatedGrammar')
  }

  updateTranslations (homonym) {
    this.store.commit('app/setTranslDataReady')
    this.updateProviders(homonym)
  }

  notifyExperimental (languageID) {
    if (typeof languageID !== 'symbol') {
      languageID = LanguageModelFactory.getLanguageIdFromCode(languageID)
    }
    if (LanguageModelFactory.isExperimentalLanguage(languageID)) {
      const langDetails = AppController.getLanguageName(languageID)
      this.store.commit('ui/setNotification',
        { text: this.api.l10n.getMsg('TEXT_NOTICE_EXPIRIMENTAL_LANGUAGE', { languageName: langDetails.name }), important: true })
    }
  }

  updateLanguage (currentLanguageID) {
    // the code which follows assumes we have been passed a languageID symbol
    // we can try to recover gracefully if we accidentally get passed a string value
    if (typeof currentLanguageID !== 'symbol') {
      this.logger.warn('updateLanguage was called with a string value')
      currentLanguageID = LanguageModelFactory.getLanguageIdFromCode(currentLanguageID)
    }
    this.store.commit('app/setCurrentLanguage', currentLanguageID)
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
    if (this.featureOptions.items.enableLemmaTranslations.currentValue && !this.featureOptions.items.locale.currentValue.match(/en-/)) {
      this.api.lexis.setLemmaTranslationLang(this.featureOptions.items.locale.currentValue)
    } else {
      this.api.lexis.setLemmaTranslationLang(null)
    }
  }

  async updateWordUsageExamples (wordUsageExamplesData) {
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_WORDUSAGE_READY'))
    this.api.app.wordUsageExamples = wordUsageExamplesData

    if (!this.api.app.wordUsageExamplesCached || this.api.app.wordUsageExamplesCached.targetWord !== this.api.app.wordUsageExamples.targetWord) {
      this.api.app.wordUsageExamplesCached = wordUsageExamplesData
    }
    this.store.commit('app/setWordUsageExamplesReady')
  }

  open () {
    if (this.uic.hasModule('panel') && this.platform.isMobile) {
      // This is a compact version of a UI
      this.api.ui.openPanel()
      this.api.ui.changeTab('morphology')
    } else {
      if (this.uic.hasModule('panel') && this.state.isPanelOpen()) { this.api.ui.closePanel() }
      if (this.uic.hasModule('popup')) { this.api.ui.openPopup() }
    }
    return this
  }

  isGetSelectedTextEnabled (domEvent) {
    return (this.state.isActive() &&
      this.state.uiIsActive() &&
      (!this.options.triggerPreCallback || this.enableMouseMoveEvent() || this.options.triggerPreCallback(domEvent)))
  }

  getFeatureOptions () {
    return this.featureOptions
  }

  getResourceOptions () {
    return this.resourceOptions
  }

  getUiOptions () {
    return this.uiOptions
  }

  verboseMode () {
    return this.uiOptions.items.verboseMode.currentValue === 'verbose'
  }

  async getWordUsageData (homonym, params = {}) {
    if (this.api.app.wordUsageExamplesCached && (this.api.app.wordUsageExamplesCached.targetWord === homonym.targetWord) && (Object.keys(params).length === 0)) {
      this.store.commit('app/setWordUsageExamplesReady', false)
      this.api.app.wordUsageExamples = this.api.app.wordUsageExamplesCached
      this.store.commit('app/setWordUsageExamplesReady', true)
      return
    }

    this.store.commit('app/setWordUsageExamplesReady', false)

    const wordUsageExamples = this.enableWordUsageExamples({ languageID: homonym.languageID }, 'onDemand')
      ? {
        paginationMax: this.featureOptions.items.wordUsageExamplesMax.currentValue,
        paginationAuthMax: this.featureOptions.items.wordUsageExamplesAuthMax.currentValue
      }
      : null

    await LexicalQuery.getWordUsageData(homonym, wordUsageExamples, params)
  }

  enableWordUsageExamples (textSelector, requestType) {
    const checkType = requestType === 'onLexicalQuery' ? this.featureOptions.items.wordUsageExamplesON.currentValue === requestType : true
    return textSelector.languageID === Constants.LANG_LATIN &&
    this.featureOptions.items.enableWordUsageExamples.currentValue &&
    checkType
  }

  getWordUsageExamplesQueryParams (textSelector) {
    if (this.enableWordUsageExamples(textSelector, 'onLexicalQuery')) {
      return {
        paginationMax: this.featureOptions.items.wordUsageExamplesMax.currentValue,
        paginationAuthMax: this.featureOptions.items.wordUsageExamplesAuthMax.currentValue
      }
    } else {
      return null
    }
  }

  handleEscapeKey (event, nativeEvent) {
    // TODO: Move to keypress as keyCode is deprecated
    // TODO: Why does it not work on initial panel opening?
    if (nativeEvent.keyCode === 27 && this.state.isActive()) {
      if (this.state.isPanelOpen()) {
        if (this.uic.hasModule('panel')) { this.api.ui.closePanel() }
      } else if (this.uic.hasModule('popup')) {
        this.api.ui.closePopup()
      }
    }
    return true
  }

  startResourceQuery (feature) {
    // ExpObjMon.track(
    ResourceQuery.create(feature, {
      grammars: Grammars,
      resourceOptions: this.getResourceOptions()
    }).getData()
    //, {
    // experience: 'Get resource',
    //  actions: [
    //    { name: 'getData', action: ExpObjMon.actions.START, event: ExpObjMon.events.GET },
    //    { name: 'finalize', action: ExpObjMon.actions.STOP, event: ExpObjMon.events.GET }
    // ]
    // }).getData()
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_RESOURCE_RETRIEVAL_IN_PROGRESS'))
  }

  onLexicalQueryComplete (data) {
    switch (data.resultStatus) {
      case LexicalQuery.resultStatus.SUCCEEDED:
        this.showLanguageInfo(data.homonym)
        this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_LEXQUERY_COMPLETE'))
        break
      case LexicalQuery.resultStatus.FAILED:
        this.showLanguageInfo(data.homonym)
        this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_LEXQUERY_COMPLETE'))
    }
    this.store.commit('app/lexicalRequestFinished')
  }

  onMorphDataReady () {
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_MORPHDATA_READY'))
  }

  onMorphDataNotFound () {
    this.store.commit('ui/setNotification', { text: this.api.l10n.getMsg('TEXT_NOTICE_MORPHDATA_NOTFOUND'), important: true })
    this.store.commit('app/setQueryStillActive', true)
  }

  onHomonymReady (homonym, source) {
    homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))

    // Update status info with data from a morphological analyzer
    this.store.commit('app/setTextData', { text: homonym.targetWord, languageID: homonym.languageID })

    // Update inflections data
    const inflectionsViewSet = ViewSetFactory.create(homonym, this.featureOptions.items.locale.currentValue)

    if (inflectionsViewSet.hasMatchingViews) {
      this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_INFLDATA_READY'))
    }
    this.api.app.homonym = homonym
    const wordUsageExampleEnabled = this.enableWordUsageExamples({ languageID: homonym.languageID })

    this.store.commit('app/setHomonym', homonym)
    this.store.commit('app/setWordUsageExampleEnabled', wordUsageExampleEnabled)

    this.store.commit('app/setMorphDataReady')

    let inflDataReady = false
    if (LanguageModelFactory.getLanguageModel(this.store.state.app.currentLanguageID).canInflect()) {
      inflDataReady = Boolean(inflectionsViewSet && inflectionsViewSet.hasMatchingViews)
      this.api.app.inflectionsViewSet = inflectionsViewSet
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
      this.store.commit('app/setInflData', inflDataReady)
    })

    // The homonym can already has short defs data
    if (homonym.hasShortDefs) {
      this.updateProviders(homonym)
      this.store.commit('app/shortDefsUpdated')
    }
  }

  onWordListUpdated (wordList) {
    this.store.commit('app/setWordLists', wordList)
    if (this.store.state.auth.enableLogin && !this.store.state.auth.isAuthenticated && !this.store.state.auth.isSessionExpired) {
      this.store.commit('auth/setNotification', { text: 'TEXT_NOTICE_SUGGEST_LOGIN', showLogin: true, count: this.wordlistC.getWordListItemCount() })
    }
  }

  onLemmaTranslationsReady (homonym) {
    this.updateTranslations(homonym)
  }

  onShortDefinitionsReady (data) {
    this.api.app.homonym = data.homonym
    this.store.commit('app/setQueryStillActive', false)
    this.showLanguageInfo(data.homonym)
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DEFSDATA_READY', { requestType: data.requestType, lemma: data.word }))
    this.updateProviders(data.homonym)
    this.store.commit('app/shortDefsUpdated')
  }

  onFullDefinitionsReady (data) {
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DEFSDATA_READY', { requestType: data.requestType, lemma: data.word }))
    this.updateProviders(data.homonym)
    this.store.commit('app/fullDefsUpdated')
  }

  onDefinitionsNotFound (data) {
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DEFSDATA_NOTFOUND', { requestType: data.requestType, word: data.word }))
  }

  onResourceQueryComplete () {
    // We don't check result status for now. We always output the same message.
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_COMPLETE'))
  }

  onGrammarAvailable (data) {
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_READY'))
    this.updateGrammar(data)
  }

  onGrammarNotFound () {
    this.updateGrammar()
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_NOTFOUND'))
  }

  async onWordItemSelected (wordItem) {
    if (!this.userDataManager && !wordItem.homonym) {
      this.logger.warn('UserDataManager is not defined, data couldn\'t be loaded from the storage')
      return
    }
    const languageID = LanguageModelFactory.getLanguageIdFromCode(wordItem.languageCode)
    this.newLexicalRequest(wordItem.targetWord, languageID, null, 'wordlist')

    let homonym
    if (this.userDataManager) {
      const wordItemFull = await this.userDataManager.query({ dataType: 'WordItem', params: { wordItem } }, { type: 'full' })
      homonym = wordItemFull[0].homonym
    } else {
      homonym = wordItem.homonym
    }

    if (homonym && homonym.lexemes && homonym.lexemes.length > 0 && homonym.lexemes.filter(l => l.isPopulated()).length === homonym.lexemes.length) {
      // if we were able to retrieve full homonym data then we can just display it
      this.onHomonymReady(homonym)
      // we still need to notify the wordlist controller that an onHomonymReady event
      // was received so that it can update the wordlist item as appropriate
      this.wordlistC.onHomonymReady(homonym)
      this.updateProviders(homonym)
      // We already have both short and full definitions so we can update the status of both
      this.store.commit('app/shortDefsUpdated')
      this.store.commit('app/fullDefsUpdated')
      // this.updateDefinitions(homonym)
      this.updateTranslations(homonym)
      this.store.commit('app/lexicalRequestFinished')
    } else {
      // otherwise we can query for it as usual
      const textSelector = TextSelector.createObjectFromText(homonym.targetWord, homonym.languageID)
      this.api.lexis.lookupText(textSelector)
    }
  }

  /**
   * Resets all configurable options to the defaults, replacing user preferences
   */
  async resetAllOptions () {
    await this.featureOptions.reset()
    await this.resourceOptions.reset()
    await this.uiOptions.reset()
    // we don't reload lookupResourceOptions or siteOptions
    // because we don't currently allow user configuration of these
    this.onOptionsReset()
  }

  /**
   * Updates the Application State after settings have been reset or reloaded
   */
  onOptionsReset () {
    for (const name of this.featureOptions.names) {
      this.featureOptionStateChange(name)
      this.store.commit('settings/incrementFeatureResetCounter')
    }
    for (const name of this.resourceOptions.names) { // eslint-disable-line no-unused-vars
      this.store.commit('settings/incrementResourceResetCounter')
    }
    for (const name of this.uiOptions.names) {
      this.uiOptionStateChange(name)
      this.store.commit('settings/incrementUiResetCounter')
    }
  }

  /**
   * Handle a change to a single feature option
   *
   * @param {string} name the setting name
   * @param {string} value the new value
   */
  featureOptionChange (name, value) {
    let featureOptions = this.api.settings.getFeatureOptions() // eslint-disable-line prefer-const
    // TODO we need to refactor handling of boolean options
    const nonTextFeatures = ['enableLemmaTranslations', 'enableWordUsageExamples', 'wordUsageExamplesMax', 'wordUsageExamplesAuthMax',
      'enableMouseMove', 'wordlistMaxFlashcardExport', 'enableLogeionAutoComplete', 'showBetaCodesInfo', 'useBetaCodes']
    if (nonTextFeatures.includes(name)) {
      featureOptions.items[name].setValue(value)
    } else {
      featureOptions.items[name].setTextValue(value)
    }
    this.featureOptionStateChange(name)
  }

  /**
   * Updates the state of a feature to correspond to current options
   *
   * @param {string} settingName the name of the setting
   */
  featureOptionStateChange (settingName) {
    switch (settingName) {
      case 'locale':
        this.updateLemmaTranslations()
        break
      case 'preferredLanguage':
        this.updateLanguage(this.api.settings.getFeatureOptions().items.preferredLanguage.currentValue)
        // If user manually sets the preferred language option then the language chosen must have priority over the `textLang`
        this.options.overridePreferredLanguage = false
        break
      case 'enableLemmaTranslations':
        this.updateLemmaTranslations()
        break
      case 'enableMouseMove':
        // If user manually sets the mouse move option then this takes priority over the page override
        this.options.enableMouseMoveOverride = false
        this.store.commit('app/setMouseMoveOverrideUpdate')
        this.registerAndActivateMouseMove('GetSelectedText', this.options.textQuerySelector)
        break
    }
  }

  /**
   * Handle a change to a single ui option
   *
   * @param {string} name - A name of an option.
   * @param {string | value} value - A new value of an options.
   */
  uiOptionChange (name, value) {
    let uiOptions = this.api.settings.getUiOptions() // eslint-disable-line prefer-const
    // TODO this should really be handled within OptionsItem
    // the difference between value and textValues is a little confusing
    // see issue #73
    const nonTextFeatures = [
      'fontSize',
      'hideLoginPrompt',
      'maxPopupWidth',
      'mouseMoveDelay',
      'mouseMoveAccuracy',
      'enableMouseMoveLimitedByIdCheck',
      'mouseMoveLimitedById',
      'forceMouseMoveGoogleDocs'
    ]
    if (nonTextFeatures.includes(name)) {
      uiOptions.items[name].setValue(value)
    } else {
      uiOptions.items[name].setTextValue(value)
    }
    this.uiOptionStateChange(name)
  }

  /**
   * Updates the state of a ui component to correspond to current options
   *
   * @param {string} settingName the name of the setting
   */
  uiOptionStateChange (settingName) {
    const uiOptions = this.api.settings.getUiOptions()

    switch (settingName) {
      case 'fontSize':
        this.uic.setFontSize()
        break
      case 'panelPosition':
        this.store.commit('panel/setPosition', uiOptions.items.panelPosition.currentValue)
        break
      case 'verboseMode':
        this.logger.setVerboseMode(uiOptions.items.verboseMode.currentValue === 'verbose')
        break
      case 'hideLoginPrompt':
        if (this.api.auth) {
          this.store.commit('auth/setHideLoginPrompt', uiOptions.items.hideLoginPrompt.currentValue)
        }
        break
      case 'mouseMoveDelay':
        this.registerAndActivateMouseMove('GetSelectedText', this.options.textQuerySelector)
        break
      case 'mouseMoveAccuracy':
        this.registerAndActivateMouseMove('GetSelectedText', this.options.textQuerySelector)
        break
      case 'enableMouseMoveLimitedByIdCheck':
        this.registerAndActivateMouseMove('GetSelectedText', this.options.textQuerySelector)
        break
      case 'forceMouseMoveGoogleDocs':
        this.registerAndActivateMouseMove('GetSelectedText', this.options.textQuerySelector)
        break
    }
  }

  /**
   * Handle a change to a single resource option
   *
   * @param {string} name - A name of an option.
   * @param {string | value} value - A new value of an options.
   */
  resourceSettingChange (name, value) {
    // grouped setting are referenced under Options object
    // by the parsed name but each individual setting in a group is referenced
    // by its fullname (with version and groupname appended)
    // multivalued settings are handled in the Options.setTextValue method which can take
    // an array or an individual text value
    const baseKey = Options.parseKey(name)
    this.api.settings.getResourceOptions().items[baseKey.name].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
    if (baseKey.name === 'grammars') {
      this.initGrammar(baseKey.group)
    }
  }

  registerGetSelectedText (listenerName, selector) {
    let ev
    let customEv
    if (this.platform.isMobile) {
      switch (this.options.textQueryTriggerMobile) {
        case 'longTap':
          ev = LongTap
          break
        case 'longtap':
          ev = LongTap
          break
        case null:
          ev = LongTap
          break
        default:
          customEv = this.options.textQueryTriggerMobile
      }
    } else {
      switch (this.options.textQueryTriggerDesktop) {
        case 'dblClick':
          ev = MouseDblClick
          break
        case 'dblclick':
          ev = MouseDblClick
          break
        case null:
          ev = MouseDblClick
          break
        default:
          customEv = this.options.textQueryTriggerDesktop
      }
    }
    const lexisModule = this.getModule('lexis')
    if (ev) {
      this.evc.registerListener(listenerName, selector, this.api.lexis.getSelectedText.bind(lexisModule), ev)
    } else {
      this.evc.registerListener(
        listenerName, selector, this.api.lexis.getSelectedText.bind(lexisModule), GenericEvt, customEv)
    }
  }

  registerAndActivateGetSelectedText (listenerName, selector) {
    this.registerGetSelectedText(listenerName, selector)
    this.evc.activateListener(listenerName)
    this.registerAndActivateMouseMove(listenerName, selector)
  }

  registerAndActivateMouseMove (listenerName, selector) {
    if (this.enableMouseMoveEvent()) {
      const uiOptions = this.api.settings.getUiOptions()

      const eventParams = {
        mouseMoveDelay: uiOptions.items.mouseMoveDelay.currentValue,
        mouseMoveAccuracy: uiOptions.items.mouseMoveAccuracy.currentValue,
        enableMouseMoveLimitedByIdCheck: uiOptions.items.enableMouseMoveLimitedByIdCheck.currentValue,
        mouseMoveLimitedById: uiOptions.items.mouseMoveLimitedById.currentValue
      }
      const lexisModule = this.getModule('lexis')
      this.evc.registerListener(listenerName + '-mousemove', selector, this.api.lexis.getSelectedText.bind(lexisModule), MouseMove, eventParams)
      // when the mousemove event is activated, the regular listener needs to be deactivated
      this.evc.deactivateListener(listenerName)
      this.evc.activateListener(listenerName + '-mousemove')
    } else {
      // when the mousemove event is deactivated, the regular listener needs to be reactivated
      this.evc.deactivateListener(listenerName + '-mousemove')
      this.evc.activateListener(listenerName)
    }
  }

  enableMouseMoveEvent () {
    return this.platform.isDesktop && (this.featureOptions.items.enableMouseMove.currentValue || this.options.enableMouseMoveOverride || this.forceMouseMoveEvent())
  }

  forceMouseMoveEvent () {
    return Boolean(this.platform.isDesktop && this.platform.isGoogleDocs && this.uiOptions.items.forceMouseMoveGoogleDocs.currentValue)
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
