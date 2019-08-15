/* eslint-disable no-unused-vars */
import { version as packageVersion, description as packageDescription } from '../../../package'
import { Constants, Feature, LanguageModelFactory, Lexeme } from 'alpheios-data-models'
import { Grammars } from 'alpheios-res-client'
import { ViewSetFactory } from 'alpheios-inflection-tables'
import { WordlistController, UserDataManager } from 'alpheios-wordlist'
// import {ObjectMonitor as ExpObjMon} from 'alpheios-experience'
import Vue from '@vue-runtime'
import Vuex from 'vuex'
import interact from 'interactjs'
import Logger from '@/lib/log/logger.js'
// Modules and their support dependencies
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'

import EmbedLibWarning from '@/vue/components/embed-lib-warning.vue'

import LexicalQuery from '@/lib/queries/lexical-query.js'
import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup.js'
import ResourceQuery from '@/lib/queries/resource-query.js'
import AnnotationQuery from '@/lib/queries/annotation-query.js'
import SiteOptions from '@/settings/site-options.json'
import FeatureOptionDefaults from '@/settings/feature-options-defaults.json'
import UIOptionDefaults from '@/settings/ui-options-defaults.json'
import TextSelector from '@/lib/selection/text-selector'
import HTMLSelector from '@/lib/selection/media/html-selector.js'
import HTMLPage from '@/lib/utility/html-page.js'
import Platform from '@/lib/utility/platform.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import MouseDblClick from '@/lib/custom-pointer-events/mouse-dbl-click.js'
import LongTap from '@/lib/custom-pointer-events/long-tap.js'
import GenericEvt from '@/lib/custom-pointer-events/generic-evt.js'
import Options from '@/lib/options/options.js'
import LocalStorage from '@/lib/options/local-storage-area.js'
import RemoteAuthStorageArea from '@/lib/options/remote-auth-storage-area.js'
import UIEventController from '@/lib/controllers/ui-event-controller.js'
import QueryParams from '@/lib/utility/query-params.js'

const languageNames = new Map([
  [Constants.LANG_LATIN, 'Latin'],
  [Constants.LANG_GREEK, 'Greek'],
  [Constants.LANG_ARABIC, 'Arabic'],
  [Constants.LANG_PERSIAN, 'Persian'],
  [Constants.LANG_GEEZ, 'Ancient Ethiopic (Ge\'ez)']
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

export default class UIController {
  /**
   * The best way to create a configured instance of a UIController is to use its `create` method.
   * It configures and attaches all UIController's modules.
   * If you need a custom configuration of a UIController, replace its `create` method with your own.
   *
   * @class
   *
   * @param {UIStateAPI} state - An object to store a UI state.
   * @param {object} options - UI controller options object.
   * See `optionsDefaults` getter for detailed parameter description: @see {@link optionsDefaults}
   * If any options is not specified, it will be set to a default value.
   * If an options is not present in an `optionsDefaults` object, it will be ignored as an unknown option.
   * Default values: See `optionsDefaults` getter @see {@link optionsDefaults}
   */
  constructor (state, options = {}) {
    this.state = state
    this.options = UIController.setOptions(options, UIController.optionsDefaults)

    this.tabs = {
      DEFAULT: this.options.overrideHelp ? 'settings' : 'info',
      DISABLED: 'disabled'
    }
    /*
    Define defaults for resource options. If a UI controller creator
    needs to provide its own defaults, they shall be defined in a `create()` function.
     */
    this.featureOptionsDefaults = FeatureOptionDefaults
    this.resourceOptionsDefaults = LanguageOptionDefaults
    this.uiOptionsDefaults = UIOptionDefaults
    this.siteOptionsDefaults = SiteOptions
    /*
    All following options will be created during an init phase.
    This will allow creators of UI controller to provide their own options defaults
    inside a `create()` builder function.
     */
    this.featureOptions = null
    this.resourceOptions = null
    this.uiOptions = null
    this.siteOptions = null // Will be set during an `init` phase

    this.irregularBaseFontSize = !UIController.hasRegularBaseFontSize()
    this.isInitialized = false
    this.isActivated = false
    this.isDeactivated = false
    this.userDataManager = null

    // Obtain the logger instance
    this.logger = Logger.getInstance()

    /**
     * Information about the platform an app is running upon.
     *
     * @type {Platform} - A an object containing data about the platform.
     */
    this.platform = new Platform(true)
    // Assign a class that will specify what type of layout will be used
    const layoutClassName = (this.platform.isMobile)
      ? layoutClasses.COMPACT
      : layoutClasses.LARGE
    document.body.classList.add(layoutClassName)

    // Vuex store. A public API for data and UI module interactions.
    this.store = new Vuex.Store({
      // TODO: Remove this for production as it slows things down
      strict: true
    })
    this.api = {} // An API object for functions of registered modules and UI controller.
    this.modules = new Map()

    /**
     * If an event controller be used with an instance of a UI Controller,
     * this prop will hold an event controller instance. It is usually initialized within a `build` method.
     *
     * @type {UIEventController}
     */
    this.evc = null

    this.wordlistC = {} // This is a word list controller
  }

  /**
   * Creates an instance of a UI controller with default options. Provide your own implementation of this method
   * if you want to create a different configuration of a UI controller.
   *
   */
  static create (state, options) {
    let uiController = new UIController(state, options) // eslint-disable-line prefer-const

    /*
    If necessary override defaults of a UI controller's options objects here as:
    uiController.siteOptionsDefaults = mySiteDefaults
     */

    // Register data modules
    uiController.registerModule(L10nModule, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr()
    })

    /*
    The second parameter of an AuthModule is environment specific.
    For webexetension it, for example, can be a messaging service.
    Some environments may not register an Auth module at all.
    That's why this registration shall be made not here,
    but from within an environment that creates a UI controller
    (after a call to `create()` function, usually).
     */
    // uiController.registerModule(AuthModule, undefined)

    // Register UI modules. This is environment specific and thus shall be done after a `create()` call.
    /* uiController.registerModule(PanelModule, {
      mountPoint: '#alpheios-panel' // To what element a panel will be mounted
    })
    uiController.registerModule(PopupModule, {
      mountPoint: '#alpheios-popup'
    })
    uiController.registerModule(ActionPanelModule, {})
    */

    // Creates on configures an event listener
    uiController.evc = new UIEventController()
    uiController.registerGetSelectedText('GetSelectedText', uiController.options.textQuerySelector)
    uiController.evc.registerListener('HandleEscapeKey', document, uiController.handleEscapeKey.bind(uiController), GenericEvt, 'keydown')
    uiController.evc.registerListener('AlpheiosPageLoad', 'body', uiController.updateAnnotations.bind(uiController), GenericEvt, 'Alpheios_Page_Load')

    // Subscribe to LexicalQuery events
    LexicalQuery.evt.LEXICAL_QUERY_COMPLETE.sub(uiController.onLexicalQueryComplete.bind(uiController))
    LexicalQuery.evt.MORPH_DATA_READY.sub(uiController.onMorphDataReady.bind(uiController))
    LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.sub(uiController.onMorphDataNotFound.bind(uiController))
    LexicalQuery.evt.HOMONYM_READY.sub(uiController.onHomonymReady.bind(uiController))
    LexicalQuery.evt.LEMMA_TRANSL_READY.sub(uiController.updateTranslations.bind(uiController))
    LexicalQuery.evt.WORD_USAGE_EXAMPLES_READY.sub(uiController.updateWordUsageExamples.bind(uiController))
    LexicalQuery.evt.SHORT_DEFS_READY.sub(uiController.onShortDefinitionsReady.bind(uiController))
    LexicalQuery.evt.FULL_DEFS_READY.sub(uiController.onFullDefinitionsReady.bind(uiController))
    LexicalQuery.evt.SHORT_DEFS_NOT_FOUND.sub(uiController.onDefinitionsNotFound.bind(uiController))
    LexicalQuery.evt.FULL_DEFS_NOT_FOUND.sub(uiController.onDefinitionsNotFound.bind(uiController))

    // Subscribe to ResourceQuery events
    ResourceQuery.evt.RESOURCE_QUERY_COMPLETE.sub(uiController.onResourceQueryComplete.bind(uiController))
    ResourceQuery.evt.GRAMMAR_AVAILABLE.sub(uiController.onGrammarAvailable.bind(uiController))
    ResourceQuery.evt.GRAMMAR_NOT_FOUND.sub(uiController.onGrammarNotFound.bind(uiController))

    // Subscribe to AnnotationQuery events
    AnnotationQuery.evt.ANNOTATIONS_AVAILABLE.sub(uiController.onAnnotationsAvailable.bind(uiController))

    uiController.wordlistC = new WordlistController(LanguageModelFactory.availableLanguages(), LexicalQuery.evt)
    WordlistController.evt.WORDLIST_UPDATED.sub(uiController.onWordListUpdated.bind(uiController))
    WordlistController.evt.WORDITEM_SELECTED.sub(uiController.onWordItemSelected.bind(uiController))

    return uiController
  }

  /**
   * Returns an object with default options of a UIController.
   * Can be redefined to provide other default values.
   * @return {object} An object that contains default options.
   *     {Object} app - A set of app related options with the following properties:
   *          {string} name - An application name;
   *          {string} version - A version of an application.
   *     {Object} storageAdapter - A storage adapter for storing options (see `lib/options`). Is environment dependent.
   *     {boolean} openPanel - whether to open panel when UI controller is activated. Default: panelOnActivate of uiOptions.
   *     {string} textQueryTriggerDesktop - what event will start a lexical query on a selected text on the desktop. If null,
                                            the default 'dblClick' will be used.
   *     {string} textQueryTriggerMobile - what event will start a lexical query on a selected text on mobile devices.  if null,
   *                                       the default 'longTap' pointer event will be used.
   *     {string} textQuerySelector - an area(s) on a page where a trigger event will start a lexical query. This is
   *     a standard CSS selector. Default value: 'body'.
   *     {Object} template - object w ith the following properties:
   *         html: HTML string for the container of the Alpheios components
   */
  static get optionsDefaults () {
    return {
      app: {
        name: 'name',
        version: 'version'
      },
      mode: 'production', // Controls options available and output. Other possible values: `development`
      clientId: 'alpheios-components',
      storageAdapter: LocalStorage,
      openPanel: true,
      textQueryTriggerMobile: 'longTap',
      textQueryTriggerDesktop: 'dblClick',
      textQuerySelector: 'body',
      enableLemmaTranslations: false,
      irregularBaseFontSizeClassName: 'alpheios-irregular-base-font-size',
      // Whether to disable text selection on mobile devices
      disableTextSelection: false,
      /*
      textLangCode is a language of a text that is set by the host app during a creation of a UI controller.
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
      overrideHelp: false
    }
  }

  /**
   * Constructs a new options object that contains properties from either an `options` argument,
   * or, if not provided, from a `defaultOptions` object.
   * `defaultOptions` object serves as a template. It is a list of valid options known to the UI controller.
   * All properties from `options` must be presented in `defaultOptions` or
   * they will not be copied into a resulting options object.
   * If an option property is itself an object (i.e. is considered as a group of options),
   * it will be copied recursively.
   * @param {object} options - A user specified options object.
   * @param {object} defaultOptions - A set of default options specified by a UI controller.
   * @return {object} A resulting options object
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

  setDefaultPanelState () {
    if (!this.hasModule('panel')) { return this }
    this.state.setPanelClosed()
    return this
  }

  /**
   * Registers a module for use by UI controller and other modules.
   * It instantiates each module and adds them to the registered modules store.
   *
   * @param {Module} moduleClass - A data module's class (i.e. the constructor function).
   * @param {object} options - Arbitrary number of values that will be passed to the module constructor.
   * @returns {UIController} - A self reference for chaining.
   */
  registerModule (moduleClass, options = {}) {
    if (moduleClass.isSupportedPlatform(this.platform)) {
      // Add `platform` to module's options
      options.platform = this.platform
      this.modules.set(moduleClass.moduleName, { ModuleClass: moduleClass, options, instance: null })
    } else {
      this.logger.warn(`Skipping registration of a ${moduleClass.moduleName} module because it does not support a ${this.platform.deviceType} type of devices`)
    }
    return this
  }

  get dataModules () {
    return Array.from(this.modules.values()).filter(m => m.ModuleClass.isDataModule)
  }

  get uiModules () {
    return Array.from(this.modules.values()).filter(m => m.ModuleClass.isUiModule)
  }

  createDataModules () {
    this.dataModules.forEach((m) => {
      m.instance = new m.ModuleClass(this.store, this.api, m.options)
    })
  }

  createUiModules () {
    this.uiModules.forEach((m) => {
      m.instance = new m.ModuleClass(this.store, this.api, m.options)
    })
  }

  createModules () {
    // Create data modules fist, UI modules after that because UI modules are dependent on data ones
    this.createDataModules()
    this.createUiModules()
  }

  activateModules () {
    // Activate data modules fist, UI modules after them because UI modules are dependent on data modules
    this.dataModules.forEach(m => m.instance.activate())
    this.uiModules.forEach(m => m.instance.activate())
  }

  deactivateModules () {
    // Deactivate data modules in reverse order: UI modules first, data modules after them.
    this.dataModules.forEach(m => m.instance.deactivate())
    this.uiModules.forEach(m => m.instance.deactivate())
  }

  hasModule (moduleName) {
    return this.modules.has(moduleName)
  }

  getModule (moduleName) {
    return this.modules.get(moduleName).instance
  }

  async init () {
    if (this.isInitialized) { return `Already initialized` }
    // Get query parameters from the URL
    this.queryParams = QueryParams.parse()
    // Start loading options as early as possible
    const optionLoadPromises = this.initOptions(this.options.storageAdapter)
    // Create a copy of resource options for the lookup UI component
    // this doesn't get reloaded from the storage adapter because
    // we don't expose it to the user via preferences
    this.lookupResourceOptions = new Options(this.resourceOptionsDefaults, new this.options.storageAdapter(this.resourceOptionsDefaults.domain)) // eslint-disable-line new-cap
    // TODO: Site options should probably be initialized the same way as other options objects
    this.siteOptions = this.loadSiteOptions(this.siteOptionsDefaults)

    this.zIndex = HTMLPage.getZIndexMax()

    // Will add morph adapter options to the `options` object of UI controller constructor as needed.

    // Inject HTML code of a plugin. Should go in reverse order.
    document.body.classList.add('alpheios')

    await Promise.all(optionLoadPromises)
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
      clientId: this.options.clientId, // alpheios api client identifier
      libName: UIController.libName, // A name of the components library
      libVersion: UIController.libVersion, // A version of the components library
      platform: this.platform,
      mode: this.options.mode, // Mode of an application: `production` or `development`
      defaultTab: this.tabs.DEFAULT, // A name of a default tab (a string)
      state: this.state, // An app-level state
      homonym: null,
      inflectionsViewSet: null,
      wordUsageExamplesCached: null,
      wordUsageExamples: null,
      wordUsageAuthors: [],
      // Exposes parsed query parameters to other components
      queryParams: this.queryParams,

      isDevMode: () => {
        return this.options.mode === 'development'
      },

      // TODO: Some of the functions below should probably belong to other API groups.
      getDefaultLangCode: this.getDefaultLangCode.bind(this),
      featureOptionChange: this.featureOptionChange.bind(this),
      resetAllOptions: this.resetAllOptions.bind(this),
      updateLanguage: this.updateLanguage.bind(this),
      getLanguageName: UIController.getLanguageName,
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
      newLexicalRequest: this.newLexicalRequest.bind(this),

      restoreGrammarIndex: this.restoreGrammarIndex.bind(this)
    }

    this.store.registerModule('app', {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
        currentLanguageID: undefined,
        currentLanguageName: '',
        embedLibActive: false,
        selectedText: '',
        languageName: '',
        languageCode: '',
        // A language code that is selected in the language drop-down of a lookup component
        selectedLookupLangCode: '',
        targetWord: '',
        // An object with x and y props that reflects integer coordinates of a selection target
        selectionTarget: {
          x: 0,
          y: 0
        },
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
        grammarRes: null,
        treebankData: {
          word: {},
          page: {}
        },
        wordUsageExamplesReady: false, // Whether word usage examples data is available
        wordUsageAuthorsReady: false, // Whether word usage authors data is available
        hasWordListsData: false,
        wordListUpdateTime: 0, // To notify word list panel about data update
        providers: [] // A list of resource providers
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

        /**
         * Identifies wither grammar resource(s) are available for the current state.
         *
         * @param {object} state - A local state.
         * @returns {boolean} True if grammar resource(s) are available, false otherwise.
         */
        hasGrammarRes (state) {
          return state.grammarRes !== null
        },

        hasTreebankData (state) {
          // Treebank data is available if we have it for the word or the page
          return Boolean((state.treebankData.page && state.treebankData.page.src) ||
            (state.treebankData.word && state.treebankData.word.src))
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
          const { id, name } = UIController.getLanguageName(languageCodeOrID)
          state.currentLanguageID = id
          state.currentLanguageName = name
        },

        setSelectedLookupLang (state, langCode) {
          state.selectedLookupLangCode = langCode
        },

        setTextData (state, data) {
          const langDetails = UIController.getLanguageName(data.languageID)
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
          state.selectionTarget = {
            x: 0,
            y: 0
          }
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

          state.treebankData.page = {}
          state.treebankData.word = {}
        },

        resetGrammarData (state) {
          state.grammarRes = null
        },

        lexicalRequestFinished (state) {
          state.inflectionsWaitState = false
          state.morphDataReady = true
          state.lexicalRequest.endTime = Date.now()
        },

        setHtmlSelector (state, htmlSelector) {
          if (htmlSelector.targetRect) {
            state.selectionTarget.x = Math.round(htmlSelector.targetRect.left)
            state.selectionTarget.y = Math.round(htmlSelector.targetRect.top)
          }
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

        setGrammarRes (state, grammarRes) {
          state.grammarRes = grammarRes
        },

        resetGrammarRes (state) {
          state.grammarRes = null
        },

        setPageAnnotationData (state, pageData) {
          state.treebankData.page = pageData
        },

        setWordAnnotationData (state, wordData) {
          state.treebankData.word = wordData
        },

        resetTreebankData (state) {
          state.treebankData.page = {}
          state.treebankData.word = {}
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
        }
      }
    })

    /**
     * This is a UI-level public API of a UI controller. All objects should use this public API only.
     */
    this.api.ui = {
      zIndex: this.zIndex, // A z-index of Alpheios UI elements

      // Modules
      hasModule: this.hasModule.bind(this), // Checks if a UI module is available
      getModule: this.getModule.bind(this), // Gets direct access to module.

      // Actions
      openPanel: this.openPanel.bind(this),
      closePanel: this.closePanel.bind(this),
      openPopup: this.openPopup.bind(this),
      closePopup: this.closePopup.bind(this),
      openActionPanel: this.openActionPanel.bind(this),
      closeActionPanel: this.closeActionPanel.bind(this),
      toggleActionPanel: this.toggleActionPanel.bind(this),
      changeTab: this.changeTab.bind(this),
      showPanelTab: this.showPanelTab.bind(this),
      togglePanelTab: this.togglePanelTab.bind(this),
      registerAndActivateGetSelectedText: this.registerAndActivateGetSelectedText.bind(this),

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

    // Set options of modules before modules are created
    if (this.hasModule('popup')) {
      let popupOptions = this.modules.get('popup').options // eslint-disable-line prefer-const
      popupOptions.initialShift = {
        x: this.uiOptions.items.popupShiftX.currentValue,
        y: this.uiOptions.items.popupShiftY.currentValue
      }
    }

    if (this.hasModule('toolbar')) {
      let toolbarOptions = this.modules.get('toolbar').options // eslint-disable-line prefer-const
      toolbarOptions.initialShift = {
        x: this.uiOptions.items.toolbarShiftX.currentValue,
        y: this.uiOptions.items.toolbarShiftY.currentValue
      }
    }

    // Create registered data modules
    this.createDataModules()

    // The current language must be set after data modules are created (because it uses an L10n module)
    // but before the UI modules are created (because UI modules use current language during rendering).
    const defaultLangCode = this.getDefaultLangCode()
    const defaultLangID = LanguageModelFactory.getLanguageIdFromCode(defaultLangCode)
    // Set the lookup
    this.featureOptions.items.lookupLanguage.setValue(defaultLangCode)
    this.updateLanguage(defaultLangID)

    // Create registered UI modules
    this.createUiModules()

    // Adjust configuration of modules according to feature options
    if (this.hasModule('panel')) {
      this.store.commit('panel/setPosition', this.uiOptions.items.panelPosition.currentValue)
    }

    this.uiSetFontSize(this.uiOptions)

    this.updateLemmaTranslations()

    this.state.setWatcher('uiActive', this.updateAnnotations.bind(this))

    this.isInitialized = true

    return this
  }

  /**
   * initialize the options using the supplied storage adapter class
   * @param {Function<StorageAdapter>} StorageAdapter the adapter class to instantiate
   * @param {Object} authData optional authentication data if the adapter is one that requires it
   * @return Promise[] an array of promises to load the options data from the adapter
   */
  initOptions (StorageAdapter, authData = null) {
    this.featureOptions = new Options(this.featureOptionsDefaults, new StorageAdapter(this.featureOptionsDefaults.domain, authData))
    this.resourceOptions = new Options(this.resourceOptionsDefaults, new StorageAdapter(this.resourceOptionsDefaults.domain, authData))
    this.uiOptions = new Options(this.uiOptionsDefaults, new StorageAdapter(this.uiOptionsDefaults.domain, authData))
    return [this.featureOptions.load(), this.resourceOptions.load(), this.uiOptions.load()]
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
   * Activates a UI controller. If `deactivate()` method unloads some resources, we should restore them here.
   * @returns {Promise<UIController>}
   */
  async activate () {
    if (this.isActivated) { return `Already activated` }
    if (this.state.isDisabled()) { return `UI controller is disabled` }

    if (!this.isInitialized) { await this.init() }

    // Inject Alpheios CSS rules
    this.addPageInjections()

    // Activate listeners
    if (this.evc) { this.evc.activateListeners() }

    this.isActivated = true
    this.isDeactivated = false

    this.activateModules()
    // Activate an app first, then activate the UI
    this.state.activate()
    this.state.activateUI()

    if (this.state.isPanelStateDefault() || !this.state.isPanelStateValid()) {
      this.setDefaultPanelState()
    }
    // If panel should be opened according to the state, open it
    if (this.state.isPanelOpen()) {
      if (this.api.ui.hasModule('panel')) { this.api.ui.openPanel(true) } // Force close the panel
    }

    if (this.state.tab) {
      if (this.state.isTabStateDefault()) {
        this.state.tab = this.tabs.DEFAULT
      }
      this.changeTab(this.state.tab)
    }

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

  /**
   * Deactivates a UI controller. May unload some resources to preserve memory.
   * In this case an `activate()` method will be responsible for restoring them.
   * @returns {Promise<UIController>}
   */
  async deactivate () {
    if (this.isDeactivated) { return `Already deactivated` }

    // Deactivate event listeners
    if (this.evc) { this.evc.deactivateListeners() }

    this.deactivateModules()
    if (this.api.ui.hasModule('popup')) { this.api.ui.closePopup() }
    if (this.api.ui.hasModule('panel')) { this.api.ui.closePanel(false) } // Close panel without updating it's state so the state can be saved for later reactivation

    // Remove Alpheios CSS rules
    this.removePageInjections()

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
   * This panel is displayed when UI controller is disabled
   * due to embedded lib presence.
   * @param {string} message - A message to display within a panel
   */
  static getEmbedLibWarning (message) {
    if (!UIController.embedLibWarningInstance) {
      const EmbedLibWarningClass = Vue.extend(EmbedLibWarning)
      UIController.embedLibWarningInstance = new EmbedLibWarningClass({
        propsData: { text: message }
      })
      UIController.embedLibWarningInstance.$mount() // Render off-document to append afterwards
    }
    return UIController.embedLibWarningInstance
  }

  addPageInjections () {
    if (this.options.disableTextSelection && this.platform.isMobile) {
      if (document && document.body) {
        document.body.classList.add(injectionClasses.DISABLE_TEXT_SELECTION)
      } else {
        this.logger.warn(`Cannot inject Alpheios CSS rules because either document or body do not exist`)
      }
    }
  }

  removePageInjections () {
    if (document && document.body) {
      document.body.classList.add(injectionClasses.DISABLE_TEXT_SELECTION)
    }
  }

  /**
   * Load site-specific settings
   * @param {Object[]} siteOptions - An array of site options
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
   * @param {symbol|string} language - Either language ID or language code (see constants in `data-models` for definitions)
   * @return {Object} An object containing:
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

    if (notFound) {
      let languageName
      if (homonym) {
        languageName = this.api.app.getLanguageName(homonym.languageID).name
      } else if (this.store.state.app.currentLanguageName) {
        languageName = this.store.state.app.currentLanguageName
      } else {
        languageName = this.api.l10n.getMsg('TEXT_NOTICE_LANGUAGE_UNKNOWN')
      }
      if (this.store.state.app.lexicalRequest.source === 'page') {
        // we offer change language here when the lookup was from the page because the language used for the
        // lookup is deduced from the page and might be wrong
        const message = this.api.l10n.getMsg('TEXT_NOTICE_CHANGE_LANGUAGE',
          { targetWord: this.store.state.app.targetWord, languageName: languageName })
        this.store.commit(`ui/setNotification`, { text: message, important: true, showLanguageSwitcher: true })
      } else {
        // if we are coming from e.g. the lookup or the wordlist, offering change language
        // here creates some confusion and the language was explicit upon lookup so it is not necessary
        const message = this.api.l10n.getMsg('TEXT_NOTICE_NOT_FOUND',
          { targetWord: this.store.state.app.targetWord, languageName: languageName })
        this.store.commit(`ui/setNotification`, { text: message, important: true, showLanguageSwitcher: false })
      }
    }
  }

  // TODO: Do we need this function
  showErrorInfo (errorText) {
    this.store.commit(`ui/setNotification`, { text: errorText, important: true })
  }

  // TODO: Do we need this function
  showImportantNotification (message) {
    this.store.commit(`ui/setNotification`, { text: message, important: true })
  }

  /**
   * Checks wither a given tab is disabled.
   * @param {string} tabName - A tab name  to be checked.
   * @return {boolean} - True if the given tab is disabled,
   *         false otherwise (including if we have no disabling conditions on this tab).
   */
  isDisabledTab (tabName) {
    /**
     * A structure that defines availability condition for panel's tabs.
     * The key is a tab name, and a value is the function that returns true if the tab is available.
     */
    const tabsCheck = {
      definitions: () => this.store.getters['app/fullDefDataReady'],
      inflections: () => this.store.state.app.hasInflData,
      grammar: () => this.store.getters['app/hasGrammarRes'],
      treebank: () => this.store.getters['app/hasTreebankData'],
      wordUsage: () => this.store.state.app.wordUsageExampleEnabled,
      status: () => this.api.settings.getUiOptions().items.verboseMode.currentValue === 'verbose',
      wordlist: () => this.store.state.app.hasWordListsData
    }
    return tabsCheck.hasOwnProperty(tabName) && !tabsCheck[tabName]() // eslint-disable-line no-prototype-builtins
  }

  /**
   * Switched between tabs in a panel.
   * All tab switching should be done through this function only as it performs safety check
   * regarding wither or not current tab can be available.
   *
   * @param {string} tabName - A name of a tab to switch to.
   * @return {UIController} - An instance of a UI controller, for chaining.
   */
  changeTab (tabName) {
    // If tab is disabled, switch to a default one
    if (this.isDisabledTab(tabName)) {
      this.logger.warn(`Attempting to switch to a ${tabName} tab which is not available`)
      tabName = this.tabs.DEFAULT
    }
    this.store.commit('ui/setActiveTab', tabName) // Reflect a tab change in a state
    // This is for compatibility with watchers in webextension that track tab changes
    // and sends this into to a background script
    this.state.changeTab(tabName)

    const isPortrait = this.store.state.panel && (this.store.state.panel.orientation === Platform.orientations.PORTRAIT)

    if (['treebank', 'inflections', 'inflectionsbrowser', 'wordUsage'].includes(tabName) && this.platform.isMobile && isPortrait) {
      const message = this.api.l10n.getMsg('HINT_LANDSCAPE_MODE')
      this.store.commit(`ui/setHint`, message, tabName)
    } else {
      this.store.commit(`ui/resetHint`)
    }
    return this
  }

  /**
   * Opens a panel and switches tab to the one specified.
   * @param {string} tabName - A name of a tab to switch to.
   * @return {UIController} - A UI controller's instance reference, for chaining.
   */
  showPanelTab (tabName) {
    this.api.ui.changeTab(tabName)
    this.api.ui.openPanel()

    return this
  }

  /**
   * Reverses the current visibility state of a panel and switches it to the tab specified.
   *
   * @param {string} tabName - A name of a tab to switch to.
   * @return {UIController} - A UI controller's instance reference, for chaining.
   */
  togglePanelTab (tabName) {
    if (this.store.state.ui.activeTab === tabName) {
      // If clicked on the tab matching a currently selected tab, close the panel
      if (this.state.isPanelOpen()) {
        this.api.ui.closePanel()
      } else {
        this.api.ui.openPanel()
      }
    } else {
      if (!this.isDisabledTab(tabName)) {
        // Do not switch to a tab and do not open a panel if a tab is disabled.
        this.api.ui.changeTab(tabName)
        if (!this.state.isPanelOpen()) {
          this.api.ui.openPanel()
        }
      }
    }
    return this
  }

  sendFeature (feature) {
    if (this.api.ui.hasModule('panel')) {
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
   * @param {string} source - source of the request. Possible values: 'page', 'lookup', or 'wordlist'
   *                          default is 'page'
   */
  newLexicalRequest (targetWord, languageID, data = null, source = 'page') {
    // Reset old word-related data
    this.api.app.homonym = null
    this.store.commit('app/resetWordData')
    this.resetInflData()
    this.store.commit('ui/resetNotification')
    this.store.commit('ui/resetMessages')
    this.store.commit('auth/resetNotification')

    // Set new data values
    this.store.commit(`app/setTextData`, { text: targetWord, languageID: languageID })
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DATA_RETRIEVAL_IN_PROGRESS'))
    this.updateLanguage(languageID)
    this.updateWordAnnotationData(data)
    this.store.commit('app/lexicalRequestStarted', { targetWord: targetWord, source: source })
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
        providers.set(l.provider, 1)
      }
      if (l.meaning && l.meaning.shortDefs) {
        l.meaning.shortDefs.forEach((d) => {
          if (d.provider) {
            providers.set(d.provider, 1)
          }
        })
      }
      if (l.lemma && l.lemma.translation && l.lemma.translation.provider) {
        providers.set(l.lemma.translation.provider, 1)
      }
    })
    this.store.commit(`app/setProviders`, Array.from(providers.keys()))
  }

  /**
   * Updates grammar data with URLs supplied.
   * If no URLS are provided, will reset grammar data.
   * @param {Array} urls
   */
  updateGrammar (urls = []) {
    if (urls.length > 0) {
      this.store.commit('app/setGrammarRes', urls[0])
    }
  }

  updateTranslations (homonym) {
    this.store.commit('app/setTranslDataReady')
    this.updateProviders(homonym)
  }

  updatePageAnnotationData (data) {
    this.store.commit('app/setPageAnnotationData', data.treebank.page)
  }

  updateWordAnnotationData (data) {
    if (data && data.treebank) {
      this.store.commit('app/setWordAnnotationData', data.treebank.word)
    } else {
      this.store.commit('app/resetTreebankData')
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
    const newLanguageCode = LanguageModelFactory.getLanguageCodeFromId(currentLanguageID)
    if (this.state.currentLanguage !== newLanguageCode) {
      this.store.commit('app/resetGrammarData')
      this.state.setItem('currentLanguage', newLanguageCode)
      this.startResourceQuery({ type: 'table-of-contents', value: '', languageID: currentLanguageID })
    }
    this.resetInflData()
  }

  restoreGrammarIndex () {
    const currentLanguageID = this.store.state.app.currentLanguageID
    this.startResourceQuery({ type: 'table-of-contents', value: '', languageID: currentLanguageID })
  }

  updateLemmaTranslations () {
    if (this.featureOptions.items.enableLemmaTranslations.currentValue && !this.featureOptions.items.locale.currentValue.match(/en-/)) {
      this.state.setItem('lemmaTranslationLang', this.featureOptions.items.locale.currentValue)
    } else {
      this.state.setItem('lemmaTranslationLang', null)
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
    if (this.api.ui.hasModule('panel') && this.platform.isMobile) {
      // This is a compact version of a UI
      this.api.ui.openPanel()
      this.changeTab('morphology')
    } else {
      if (this.api.ui.hasModule('panel') && this.state.isPanelOpen()) { this.api.ui.closePanel() }
      if (this.api.ui.hasModule('popup')) { this.api.ui.openPopup() }
    }
    return this
  }

  /**
   * Opens a panel. Used from a content script upon a panel status change request.
   */
  openPanel (forceOpen = false) {
    if (this.api.ui.hasModule('panel')) {
      if (forceOpen || !this.state.isPanelOpen()) {
        // If an active tab has been disabled previously, set it to a default one
        if (this.store.getters['ui/isActiveTab'](this.tabs.DISABLED)) {
          this.changeTab(this.tabs.DEFAULT)
        }
        this.store.commit('panel/open')
        this.state.setPanelOpen()
      }
      if (this.hasModule('toolbar')) {
        // Close a toolbar when a panel opens
        this.store.commit(`toolbar/close`)
      }
    }
  }

  /**
   * Closes a panel. Used from a content script upon a panel status change request.
   */
  closePanel (syncState = true) {
    if (this.api.ui.hasModule('panel')) {
      this.store.commit('panel/close')
      this.store.commit('ui/resetActiveTab')
      if (syncState) { this.state.setPanelClosed() }
      // Open a toolbar when a panel closes. Do not open if the toolbar is deactivated.
      if (this.hasModule('toolbar') && this.getModule('toolbar').isActivated) {
        this.store.commit(`toolbar/open`)
      }
    }
  }

  openPopup () {
    if (this.api.ui.hasModule('popup')) {
      this.store.commit('popup/open')
    }
  }

  closePopup () {
    if (this.api.ui.hasModule('popup')) {
      this.store.commit('popup/close')
    }
  }

  openToolbar () {
    if (this.api.ui.hasModule('toolbar')) {
      this.store.commit('toolbar/open')
    } else {
      this.logger.warn(`Toolbar cannot be opened because its module is not registered`)
    }
  }

  /**
   * Opens an action panel.
   * @param {object} panelOptions - An object that specifies parameters of an action panel (see below):
   * @param {boolean} panelOptions.showLookup - Whether to show a lookup input when the action panel is opened.
   * @param {boolean} panelOptions.showNav - Whether to show a nav toolbar when the action panel is opened.
   */
  openActionPanel (panelOptions = {}) {
    if (this.api.ui.hasModule('actionPanel')) {
      this.store.commit('actionPanel/open', panelOptions)
    } else {
      this.logger.warn(`Action panel cannot be opened because its module is not registered`)
    }
  }

  closeActionPanel () {
    if (this.api.ui.hasModule('actionPanel')) {
      this.store.commit('actionPanel/close')
    } else {
      this.logger.warn(`Action panel cannot be closed because its module is not registered`)
    }
  }

  toggleActionPanel () {
    if (this.api.ui.hasModule('actionPanel')) {
      this.store.state.actionPanel.visible
        ? this.store.commit('actionPanel/close')
        : this.store.commit('actionPanel/open', {})
    } else {
      this.logger.warn(`Action panel cannot be toggled because its module is not registered`)
    }
  }

  getSelectedText (event, domEvent) {
    if (this.state.isActive() &&
        this.state.uiIsActive() &&
        (!this.options.triggerPreCallback || this.options.triggerPreCallback(domEvent))) {
      // Open the UI immediately to reduce visual delays
      this.open()
      /*
      TextSelector conveys text selection information. It is more generic of the two.
      HTMLSelector conveys page-specific information, such as location of a selection on a page.
      It's probably better to keep them separated in order to follow a more abstract model.
       */
      const defaultLangCode = this.getDefaultLangCode()
      const htmlSelector = new HTMLSelector(event, defaultLangCode)
      this.store.commit('app/setHtmlSelector', htmlSelector)
      const textSelector = htmlSelector.createTextSelector()

      if (textSelector && !textSelector.isEmpty()) {
        // TODO: disable experience monitor as it might cause memory leaks
        /* ExpObjMon.track(
          LexicalQuery.create(textSelector, {
            htmlSelector: htmlSelector,
            uiController: this.ui,
            maAdapter: this.maAdapter,
            lexicons: Lexicons,
            resourceOptions: this.resourceOptions,
            siteOptions: [],
            lemmaTranslations: this.enableLemmaTranslations(textSelector) ? { adapter: LemmaTranslations, locale: this.featureOptions.items.locale.currentValue } : null,
            langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
          }),
          {
            experience: 'Get word data',
            actions: [
              { name: 'getData', action: ExpObjMon.actions.START, event: ExpObjMon.events.GET },
              { name: 'finalize', action: ExpObjMon.actions.STOP, event: ExpObjMon.events.GET }
            ]
          })
          .getData() */

        const lexQuery = LexicalQuery.create(textSelector, {
          htmlSelector: htmlSelector,
          clientId: this.api.app.clientId,
          resourceOptions: this.api.settings.getResourceOptions(),
          verboseMode: this.api.settings.verboseMode(),
          siteOptions: [],
          lemmaTranslations: this.enableLemmaTranslations(textSelector) ? { locale: this.featureOptions.items.locale.currentValue } : null,
          wordUsageExamples: this.getWordUsageExamplesQueryParams(textSelector),
          langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
        })

        this.newLexicalRequest(textSelector.normalizedText, textSelector.languageID, textSelector.data)
        lexQuery.getData()
      } else {
        this.closePopup() // because we open popup before any check, but selection could be incorrect
      }
    }
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
      ? { paginationMax: this.featureOptions.items.wordUsageExamplesMax.currentValue,
        paginationAuthMax: this.featureOptions.items.wordUsageExamplesAuthMax.currentValue }
      : null

    await LexicalQuery.getWordUsageData(homonym, wordUsageExamples, params)
  }

  /**
   * Check to see if Lemma Translations should be enabled for a query
   *  NB this is Prototype functionality
   */
  enableLemmaTranslations (textSelector) {
    return textSelector.languageID === Constants.LANG_LATIN &&
      this.featureOptions.items.enableLemmaTranslations.currentValue &&
      !this.featureOptions.items.locale.currentValue.match(/^en-/)
  }

  enableWordUsageExamples (textSelector, requestType) {
    const checkType = requestType === 'onLexicalQuery' ? this.featureOptions.items.wordUsageExamplesON.currentValue === requestType : true
    return textSelector.languageID === Constants.LANG_LATIN &&
    this.featureOptions.items.enableWordUsageExamples.currentValue &&
    checkType
  }

  getWordUsageExamplesQueryParams (textSelector) {
    if (this.enableWordUsageExamples(textSelector, 'onLexicalQuery')) {
      return { paginationMax: this.featureOptions.items.wordUsageExamplesMax.currentValue,
        paginationAuthMax: this.featureOptions.items.wordUsageExamplesAuthMax.currentValue }
    } else {
      return null
    }
  }

  handleEscapeKey (event, nativeEvent) {
    // TODO: Move to keypress as keyCode is deprecated
    // TODO: Why does it not work on initial panel opening?
    if (nativeEvent.keyCode === 27 && this.state.isActive()) {
      if (this.state.isPanelOpen()) {
        if (this.api.ui.hasModule('panel')) { this.api.ui.closePanel() }
      } else if (this.api.ui.hasModule('popup')) {
        this.api.ui.closePopup()
      }
    }
    return true
  }

  /**
   * Issues an AnnotationQuery to find and apply annotations for the currently loaded document
   */
  updateAnnotations () {
    if (this.state.isActive() && this.state.uiIsActive()) {
      AnnotationQuery.create({
        document: document,
        siteOptions: this.siteOptions
      }).getData()
    }
  }

  startResourceQuery (feature) {
    // ExpObjMon.track(
    ResourceQuery.create(feature, {
      grammars: Grammars
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
    this.store.commit(`ui/setNotification`, { text: this.api.l10n.getMsg('TEXT_NOTICE_MORPHDATA_NOTFOUND'), important: true })
  }

  onHomonymReady (homonym) {
    homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))

    // Update status info with data from a morphological analyzer
    this.store.commit(`app/setTextData`, { text: homonym.targetWord, languageID: homonym.languageID })

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
    this.store.commit('app/setInflData', inflDataReady)

    // The homonym can already has short defs data
    if (homonym.hasShortDefs) {
      this.updateProviders(homonym)
      this.store.commit('app/shortDefsUpdated')
    }
  }

  onWordListUpdated (wordList) {
    this.store.commit('app/setWordLists', wordList)
    if (this.store.state.auth.enableLogin && !this.store.state.auth.isAuthenticated) {
      this.store.commit(`auth/setNotification`, { text: 'TEXT_NOTICE_SUGGEST_LOGIN', showLogin: true, count: this.wordlistC.getWordListItemCount() })
    }
  }

  onLemmaTranslationsReady (homonym) {
    this.updateTranslations(homonym)
  }

  onShortDefinitionsReady (data) {
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
    this.updateGrammar(data.url)
  }

  onGrammarNotFound () {
    this.updateGrammar()
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_NOTFOUND'))
  }

  onAnnotationsAvailable (data) {
    this.updatePageAnnotationData(data.annotations)
  }

  async onWordItemSelected (wordItem) {
    if (!this.userDataManager && !wordItem.homonym) {
      this.logger.warn('UserDataManager is not defined, data couldn\'t be loaded from the storage')
      return
    }
    const languageID = LanguageModelFactory.getLanguageIdFromCode(wordItem.languageCode)
    this.newLexicalRequest(wordItem.targetWord, languageID, null, 'wordlist')
    this.open()

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
      const wordUsageExamples = this.getWordUsageExamplesQueryParams(textSelector)
      const lexQuery = LexicalQueryLookup.create(textSelector, this.resourceOptions, this.state.lemmaTranslationLang, wordUsageExamples, this.api.app.clientId)
      lexQuery.getData()
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
   * @param {String} name the setting name
   * @param {String} value the new value
   */
  featureOptionChange (name, value) {
    let featureOptions = this.api.settings.getFeatureOptions() // eslint-disable-line prefer-const
    // TODO we need to refactor handling of boolean options
    if (name === 'enableLemmaTranslations' ||
        name === 'enableWordUsageExamples' ||
        name === 'wordUsageExamplesMax' ||
        name === 'wordUsageExamplesAuthMax') {
      featureOptions.items[name].setValue(value)
    } else {
      featureOptions.items[name].setTextValue(value)
    }
    this.featureOptionStateChange(name)
  }

  /**
   * Updates the state of a feature to correspond to current options
   * @param {String} settingName the name of the setting
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
    }
  }

  /**
   * Handle a change to a single ui option
   * @param {string} name - A name of an option.
   * @param {string | value} value - A new value of an options.
   */
  uiOptionChange (name, value) {
    let uiOptions = this.api.settings.getUiOptions() // eslint-disable-line prefer-const
    // TODO this should really be handled within OptionsItem
    // the difference between value and textValues is a little confusing
    // see issue #73
    if (name === 'fontSize' || name === 'hideLoginPrompt') {
      uiOptions.items[name].setValue(value)
    } else {
      uiOptions.items[name].setTextValue(value)
    }
    this.uiOptionStateChange(name)
  }

  /**
   * Updates the state of a ui component to correspond to current options
   * @param {String} settingName the name of the setting
   */
  uiOptionStateChange (settingName) {
    const uiOptions = this.api.settings.getUiOptions()

    switch (settingName) {
      case 'fontSize':
        this.uiSetFontSize(uiOptions)
        break
      case 'panelPosition':
        this.store.commit('panel/setPosition', uiOptions.items.panelPosition.currentValue)
        break
      case 'verboseMode':
        this.logger.setVerboseMode(uiOptions.items.verboseMode.currentValue === 'verbose')
        break
      case 'hideLoginPrompt':
        if (this.api.auth) {
          this.store.commit(`auth/setHideLoginPrompt`, uiOptions.items.hideLoginPrompt.currentValue)
        }
        break
    }
  }

  uiSetFontSize (uiOptions) {
    const FONT_SIZE_PROP = '--alpheios-base-text-size'
    try {
      document.documentElement.style.setProperty(FONT_SIZE_PROP,
        `${uiOptions.items.fontSize.currentValue}px`)
    } catch (error) {
      this.logger.error(`Cannot change a ${FONT_SIZE_PROP} custom prop:`, error)
    }
  }

  /**
   * Handle a change to a single resource option
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
    if (ev) {
      this.evc.registerListener(listenerName, selector, this.getSelectedText.bind(this), ev)
    } else {
      this.evc.registerListener(
        listenerName, selector, this.getSelectedText.bind(this), GenericEvt, customEv)
    }
  }

  registerAndActivateGetSelectedText (listenerName, selector) {
    this.registerGetSelectedText(listenerName, selector)
    this.evc.activateListener(listenerName)
  }
}

/**
 * A name of a components library from a "description" field of package.json
 */
UIController.libName = packageDescription

/**
 * A version of a components library from a "version" field of package.json
 */
UIController.libVersion = packageVersion

/**
 * An instance of a warning panel that is shown when UI controller is disabled
 * because an Alpheios embedded lib is active on a page
 * @type {Vue | null}
 */
UIController.embedLibWarningInstance = null
