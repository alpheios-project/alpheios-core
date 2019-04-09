import { Constants, Feature, LanguageModelFactory, Lexeme } from 'alpheios-data-models'
import { Grammars } from 'alpheios-res-client'
import { ViewSetFactory } from 'alpheios-inflection-tables'
import { WordlistController, UserDataManager } from 'alpheios-wordlist'
// import {ObjectMonitor as ExpObjMon} from 'alpheios-experience'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Vuex from 'vuex'
// Modules and their support dependencies
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'

import EmbedLibWarning from '@/vue/components/embed-lib-warning.vue'

import Template from '@/templates/template.htmlf'
import LexicalQuery from '@/lib/queries/lexical-query.js'
import ResourceQuery from '@/lib/queries/resource-query.js'
import AnnotationQuery from '@/lib/queries/annotation-query.js'
import SiteOptions from '@/settings/site-options.json'
import ContentOptionDefaults from '@/settings/content-options-defaults.json'
import UIOptionDefaults from '@/settings/ui-options-defaults.json'
import HTMLSelector from '@/lib/selection/media/html-selector.js'
import HTMLPage from '@/lib/utility/html-page.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import MouseDblClick from '@/lib/custom-pointer-events/mouse-dbl-click.js'
import LongTap from '@/lib/custom-pointer-events/long-tap.js'
import GenericEvt from '@/lib/custom-pointer-events/generic-evt.js'
import Options from '@/lib/options/options.js'
import LocalStorage from '@/lib/options/local-storage-area.js'
import UIEventController from '@/lib/controllers/ui-event-controller.js'

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

// Enable Vuex
Vue.use(Vuex)

export default class UIController {
  /**
   * @constructor
   * The best way to create a configured instance of a UIController is to use its `create` method.
   * It configures and attaches all UIController's modules.
   * If you need a custom configuration of a UIController, replace its `create` method with your own.
   *
   * @param {UIStateAPI} state - An object to store a UI state.
   * @param {Object} options - UI controller options object.
   * See `optionsDefaults` getter for detailed parameter description: @see {@link optionsDefaults}
   * If any options is not specified, it will be set to a default value.
   * If an options is not present in an `optionsDefaults` object, it will be ignored as an unknown option.
   * Default values: See `optionsDefaults` getter @see {@link optionsDefaults}
   */
  constructor (state, options = {}) {
    this.state = state
    this.options = UIController.setOptions(options, UIController.optionsDefaults)

    /*
    Define defaults for resource options. If a UI controller creator
    needs to provide its own defaults, they shall be defined in a `create()` function.
     */
    this.contentOptionsDefaults = ContentOptionDefaults
    this.resourceOptionsDefaults = LanguageOptionDefaults
    this.uiOptionsDefaults = UIOptionDefaults
    this.siteOptionsDefaults = SiteOptions
    /*
    All following options will be created during an init phase.
    This will allow creators of UI controller to provide their own options defaults
    inside a `create()` builder function.
     */
    this.contentOptions = null
    this.resourceOptions = null
    this.uiOptions = null
    this.siteOptions = null // Will be set during an `init` phase
    this.defaultTab = 'info'

    this.irregularBaseFontSize = !UIController.hasRegularBaseFontSize()
    this.isInitialized = false
    this.isActivated = false
    this.isDeactivated = false
    this.userDataManager = null

    /**
     * A name of the platform (mobile/desktop) UI controller is running within.
     * @type {string} - A platform name from {HTMLPage.platforms}
     */
    this.platform = HTMLPage.getPlatform()
    // Assign a class that will specify what type of layout will be used
    const layoutClassName = (this.platform === HTMLPage.platforms.MOBILE)
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
     * @type {UIEventController}
     */
    this.evc = null

    this.wordlistC = {} // This is a word list controller
  }

  /**
   * Creates an instance of a UI controller with default options. Provide your own implementation of this method
   * if you want to create a different configuration of a UI controller.
   */
  static create (state, options) {
    let uiController = new UIController(state, options)

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
    // uiController.registerDataModule(AuthModule, undefined)

    // Register UI modules. This is environment specific and thus shall be done after a `create()` call.
    /* uiController.registerUiModule(PanelModule, {
      mountPoint: '#alpheios-panel' // To what element a panel will be mounted
    })
    uiController.registerUiModule(PopupModule, {
      mountPoint: '#alpheios-popup'
    }) */

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
    LexicalQuery.evt.DEFS_READY.sub(uiController.onDefinitionsReady.bind(uiController))
    LexicalQuery.evt.DEFS_NOT_FOUND.sub(uiController.onDefinitionsNotFound.bind(uiController))

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
   *     {string} textQueryTrigger - what event will start a lexical query on a selected text. Possible values are
   *     (see custom pointer events library for more details):
   *         'dblClick' - MouseDblClick pointer event will be used;
   *         'longTap' - LongTap pointer event will be used;
   *         genericEvt - if trigger name other than above specified, it will be treated as a GenericEvt pointer event
   *             with the name of the event being the value of this filed;
   *             This name will be passed to the GenericEvt pointer event object;
   *         'none' - do not register any trigger. This will allow a UIController owner to
   *         register its own custom trigger and listener.
   *         Default value: 'dblClick'.
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
      storageAdapter: LocalStorage,
      openPanel: true,
      textQueryTrigger: 'dblClick',
      textQuerySelector: 'body',
      enableLemmaTranslations: false,
      irregularBaseFontSizeClassName: 'alpheios-irregular-base-font-size',
      template: {
        html: Template
      }
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
    let result = {}
    for (const [key, defaultValue] of Object.entries(defaultOptions)) {
      if (typeof defaultValue === 'object' && defaultValue.constructor.name === 'Object') {
        // This is an options group
        const optionsValue = options.hasOwnProperty(key) ? options[key] : {}
        result[key] = this.setOptions(optionsValue, defaultValue)
      } else {
        // This is a primitive type, an array, or other object that is not an options group
        result[key] = options.hasOwnProperty(key) ? options[key] : defaultOptions[key]
      }
    }
    return result
  }

  setDefaultPanelState () {
    if (!this.hasModule('panel')) { return this }
    if (this.uiOptions.items.panelOnActivate.currentValue) {
      // If option value of panelOnActivate is true
      this.state.setPanelOpen()
    } else {
      this.state.setPanelClosed()
    }
    return this
  }

  /**
   * Registers a module for use by UI controller and other modules.
   * It instantiates each module and adds them to the registered modules store.
   * @param {Module} moduleClass - A data module's class (i.e. the constructor function).
   * @param options - Arbitrary number of values that will be passed to the module constructor.
   * @return {UIController} - A self reference for chaining.
   */
  registerModule (moduleClass, options) {
    if (moduleClass.isSupportedPlatform(this.platform)) {
      // Add `platform` to module's options
      options.platform = this.platform
      this.modules.set(moduleClass.moduleName, { ModuleClass: moduleClass, options, instance: null })
    } else {
      console.warn(`Skipping registration of a ${moduleClass.moduleName} module because it does not support a ${this.platform} platform`)
    }
    return this
  }

  get dataModules () {
    return Array.from(this.modules.values()).filter(m => m.ModuleClass.isDataModule)
  }

  get uiModules () {
    return Array.from(this.modules.values()).filter(m => m.ModuleClass.isUiModule)
  }

  createModules () {
    // Create data modules fist, UI modules after that because UI modules are dependent on data ones
    this.dataModules.forEach((m) => { m.instance = new m.ModuleClass(this.store, this.api, m.options) })
    this.uiModules.forEach((m) => { m.instance = new m.ModuleClass(this.store, this.api, m.options) })
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
    // Start loading options as early as possible
    this.contentOptions = new Options(this.contentOptionsDefaults, this.options.storageAdapter)
    this.resourceOptions = new Options(this.resourceOptionsDefaults, this.options.storageAdapter)
    // Create a copy of resource options for the lookup UI component
    this.lookupResourceOptions = new Options(this.resourceOptionsDefaults, this.options.storageAdapter)
    this.uiOptions = new Options(this.uiOptionsDefaults, this.options.storageAdapter)
    let optionLoadPromises = [this.contentOptions.load(), this.resourceOptions.load(), this.uiOptions.load()]
    // TODO: Site options should probably be initialized the same way as other options objects
    this.siteOptions = this.loadSiteOptions(this.siteOptionsDefaults)

    this.zIndex = HTMLPage.getZIndexMax()

    // Will add morph adapter options to the `options` object of UI controller constructor as needed.

    // Inject HTML code of a plugin. Should go in reverse order.
    document.body.classList.add('alpheios')
    let container = document.createElement('div')
    document.body.insertBefore(container, null)
    container.outerHTML = this.options.template.html

    await Promise.all(optionLoadPromises)

    /**
     * This is a settings API. It exposes different options to modules and UI components.
     */
    this.api.settings = {
      contentOptions: this.contentOptions,
      resourceOptions: this.resourceOptions,
      lookupResourceOptions: this.lookupResourceOptions,
      uiOptions: this.uiOptions,
      siteOptions: this.siteOptions
    }

    this.api.app = {
      name: this.options.app.name, // A name of an application
      version: this.options.app.version, // An application's version
      mode: this.options.mode, // Mode of an application: `production` or `development`
      defaultTab: this.defaultTab, // A name of a default tab (a string)
      state: this.state, // An app-level state
      homonym: null,
      inflectionsViewSet: null,
      wordUsageExamples: null,
      wordUsageAuthors: [],

      isDevMode: () => {
        return this.options.mode === 'development'
      },

      // TODO: Some of the functions below should probably belong to other API groups.
      contentOptionChange: this.contentOptionChange.bind(this),
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
      newLexicalRequest: this.newLexicalRequest.bind(this)
    }

    this.store.registerModule('app', {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
        currentLanguageID: undefined,
        currentLanguageName: '',
        selectedText: '',
        languageName: '',
        languageCode: '',
        targetWord: '',
        // An object with x and y props that reflects integer coordinates of a selection target
        selectionTarget: {
          x: 0,
          y: 0
        },
        homonymDataReady: false,
        wordUsageExampleEnabled: false,
        linkedFeatures: [], // An array of linked features, updated with every new homonym value is written to the store
        defUpdateTime: 0, // A time of the last update of defintions, in ms. Needed to track changes in definitions.
        lexicalRequest: {
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
        This getter can serve as an indicator of a new definition data arrival.
        If used within a computed prop, it will force the prop to recalculate every time definitions are updated.
         */
        defDataReady (state) {
          return state.defUpdateTime > 0
        },

        /**
         * Identifies wither grammar resource(s) are available for the current state.
         * @param state - A local state.
         * @return {boolean} True if grammar resource(s) are available, false otherwise.
         */
        hasGrammarRes (state) {
          return state.grammarRes !== null
        },

        hasTreebankData (state) {
          // Treebank data is available if we have it for the word or the page
          return Boolean((state.treebankData.page && state.treebankData.page.src) ||
            (state.treebankData.word && state.treebankData.word.src))
        }
      },

      mutations: {
        setCurrentLanguage (state, languageCodeOrID) {
          let name
          let id
          ({ id, name } = UIController.getLanguageName(languageCodeOrID))
          state.currentLanguageID = id
          state.currentLanguageName = name
        },

        setTextData (state, data) {
          let langDetails = UIController.getLanguageName(data.languageID)
          state.languageName = langDetails.name
          state.languageCode = langDetails.code
          state.selectedText = data.text
        },

        lexicalRequestStarted (state, targetWord) {
          state.targetWord = targetWord
          state.lexicalRequest.startTime = Date.now()
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
          state.defUpdateTime = 0
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
          state.hasWordListsData = Boolean(wordLists.find(wordList => !wordList.isEmpty))
          state.wordListUpdateTime = Date.now()
        },

        /**
         * @param {Object} state - State object of the store
         * @param {ResourceProvider[]} providers - An array of resource provider objects
         */
        setProviders (state, providers) {
          state.providers = providers
        },

        defsUpdated (state) {
          state.defUpdateTime = Date.now()
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
      switchPopup: this.switchPopup.bind(this), // Switches between different types of popups
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
        activeTab: this.defaultTab, // A currently selected panel's tab

        messages: [],
        // Panel and popup notifications
        notification: {
          visible: false,
          important: false,
          showLanguageSwitcher: false,
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

        addMessage (state, text) {
          state.messages.push(text)
        },

        resetMessages (state) {
          state.messages = []
        }
      }
    })

    this.api.language = {
      resourceSettingChange: this.resourceSettingChange.bind(this)
    }

    this.createModules()

    const currentLanguageID = LanguageModelFactory.getLanguageIdFromCode(this.contentOptions.items.preferredLanguage.currentValue)
    this.updateLanguage(currentLanguageID)
    this.updateLemmaTranslations()

    this.state.setWatcher('uiActive', this.updateAnnotations.bind(this))

    this.isInitialized = true

    return this
  }

  async initUserDataManager (isAuthenticated) {
    let wordLists
    if (isAuthenticated) {
      let authData = await this.api.auth.getUserData()
      this.userDataManager = new UserDataManager(authData, WordlistController.evt)
      wordLists = this.wordlistC.initLists(this.userDataManager)
      this.store.commit('app/setWordLists', wordLists)
    } else {
      this.userDataManager = null
      wordLists = this.wordlistC.initLists()
    }
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
      this.changeTab(this.state.tab)
    }

    this.authUnwatch = this.store.watch((state) => state.auth.isAuthenticated, (newValue, oldValue) => {
      this.userDataManager = this.initUserDataManager(newValue)
    })

    if (this.api.auth) {
      // initiate session check so that user data is available
      // if we have an active session
      this.api.auth.session()
    }
    return this
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
    this.isActivated = false
    this.isDeactivated = true
    this.authUnwatch()
    this.state.deactivate()

    return this
  }

  /**
   * Returns an unmounted Vue instance of a warning panel.
   * This panel is displayed when UI controller is disabled
   * due to embedded lib presence.
   * @param {string} message - A message to display within a panel
   */
  static getEmbedLibWarning (message) {
    if (!UIController.embedLibWarningInstance) {
      let EmbedLibWarningClass = Vue.extend(EmbedLibWarning)
      UIController.embedLibWarningInstance = new EmbedLibWarningClass({
        propsData: { text: message }
      })
      UIController.embedLibWarningInstance.$mount() // Render off-document to append afterwards
    }
    return UIController.embedLibWarningInstance
  }

  /**
   * Load site-specific settings
   * @param {Object[]} siteOptions - An array of site options
   */
  loadSiteOptions (siteOptions) {
    let allSiteOptions = []
    for (let site of siteOptions) {
      for (let domain of site.options) {
        let siteOpts = new Options(domain, this.options.storageAdapter)
        allSiteOptions.push({ uriMatch: site.uriMatch, resourceOptions: siteOpts })
      }
    }
    return allSiteOptions
  }

  static hasRegularBaseFontSize () {
    let htmlElement = document.querySelector('html')
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
    let langID
    let langCode // eslint-disable-line
      // Compatibility code in case method be called with languageCode instead of ID. Remove when not needed
    ;({ languageID: langID, languageCode: langCode } = LanguageModelFactory.getLanguageAttrs(language))
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
      const message = this.api.l10n.getMsg('TEXT_NOTICE_CHANGE_LANGUAGE', { languageName: languageName })
      this.store.commit(`ui/setNotification`, { text: message, important: true, showLanguageSwitcher: true })
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
   * Switched between tabs in a panel.
   * All tab switching should be done through this function only as it performs safety check
   * regarding wither or not current tab can be available.
   * @param {string} tabName - A name of a tab to switch to.
   * @return {UIController} - An instance of a UI controller, for chaining.
   */
  changeTab (tabName) {
    // If tab is disabled, switch to a default one
    if (
      (name === 'definitions' && !this.store.getters['app/defDataReady']) ||
      (name === 'inflections' && !this.store.state.app.hasInflData) ||
      (name === 'grammar' && !this.store.getters['app/hasGrammarRes']) ||
      (name === 'treebank' && !this.store.getters['app/hasTreebankData']) ||
      (name === 'wordUsage' && !this.store.state.app.wordUsageExampleEnabled) ||
      (name === 'status' && this.api.settings.contentOptions.items.verboseMode.currentValue !== 'verbose')
    ) {
      console.warn(`Attempting to switch to a ${tabName} tab which is not available`)
      tabName = this.defaultTab
    }
    this.store.commit('ui/setActiveTab', tabName) // Reflect a tab change in a state
    return this
  }

  showPanelTab (tabName) {
    this.api.ui.changeTab(tabName)
    this.api.ui.openPanel()
    return this
  }

  togglePanelTab (tabName) {
    if (this.store.state.ui.activeTab === tabName) {
      // If clicked on the tab matching a currently selected tab, close the panel
      if (this.state.isPanelOpen()) {
        this.api.ui.closePanel()
      } else {
        this.api.ui.openPanel()
      }
    } else {
      this.api.ui.changeTab(tabName)
      if (!this.state.isPanelOpen()) {
        this.api.ui.openPanel()
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

  newLexicalRequest (targetWord, languageID) {
    // Reset old word-related data
    this.api.app.homonym = null
    this.store.commit('app/resetWordData')
    this.resetInflData()
    this.store.commit('ui/resetNotification')
    this.store.commit('ui/resetMessages')

    // Set new data values
    this.store.commit(`app/setTextData`, { text: targetWord, languageID: languageID })
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DATA_RETRIEVAL_IN_PROGRESS'))
    this.updateLanguage(languageID)
    this.updateWordAnnotationData()
    this.store.commit('app/lexicalRequestStarted', targetWord)
    this.open()
    return this
  }

  resetInflData () {
    this.api.app.inflectionsViewSet = null
    this.store.commit('app/resetInflData')
  }

  updateProviders (homonym) {
    let providers = new Map()
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

  updateDefinitions (homonym) {
    this.updateProviders(homonym)
    this.store.commit('app/defsUpdated')
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
      console.warn('updateLanguage was called with a string value')
      currentLanguageID = LanguageModelFactory.getLanguageIdFromCode(currentLanguageID)
    }
    this.store.commit('app/setCurrentLanguage', currentLanguageID)
    let newLanguageCode = LanguageModelFactory.getLanguageCodeFromId(currentLanguageID)
    if (this.state.currentLanguage !== newLanguageCode) {
      this.store.commit('app/resetGrammarData')
      this.state.setItem('currentLanguage', newLanguageCode)
      this.startResourceQuery({ type: 'table-of-contents', value: '', languageID: currentLanguageID })
    }
    this.resetInflData()
  }

  updateLemmaTranslations () {
    if (this.contentOptions.items.enableLemmaTranslations.currentValue && !this.contentOptions.items.locale.currentValue.match(/en-/)) {
      this.state.setItem('lemmaTranslationLang', this.contentOptions.items.locale.currentValue)
    } else {
      this.state.setItem('lemmaTranslationLang', null)
    }
  }

  async updateWordUsageExamples (wordUsageExamplesData) {
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_WORDUSAGE_READY'))
    this.api.app.wordUsageExamples = wordUsageExamplesData
    this.store.commit('app/setWordUsageExamplesReady')
  }

  open () {
    if (this.api.ui.hasModule('panel') && this.platform === HTMLPage.platforms.MOBILE) {
      // This is a compact version of a UI
      this.api.ui.openPanel()
      this.changeTab('morphology')
    } else {
      if (this.api.ui.hasModule('panel') && this.state.isPanelOpen()) { this.api.ui.closePanel() }
      if (this.api.ui.hasModule('popup')) { this.api.ui.openPopup() }
      this.changeTab('definitions')
    }
    return this
  }

  /**
   * Opens a panel. Used from a content script upon a panel status change request.
   */
  openPanel (forceOpen = false) {
    if (this.api.ui.hasModule('panel')) {
      if (forceOpen || !this.state.isPanelOpen()) {
        this.store.commit('panel/open')
        this.state.setPanelOpen()
      }
      // Close a toolbar when panel opens
      this.store.commit(`toolbar/close`)
    }
  }

  /**
   * Closes a panel. Used from a content script upon a panel status change request.
   */
  closePanel (syncState = true) {
    if (this.api.ui.hasModule('panel')) {
      this.store.commit('panel/close')
      if (syncState) { this.state.setPanelClosed() }
      // Open a toolbar when panel closes
      this.store.commit(`toolbar/open`)
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

  getSelectedText (event) {
    if (this.state.isActive() && this.state.uiIsActive()) {
      /*
      TextSelector conveys text selection information. It is more generic of the two.
      HTMLSelector conveys page-specific information, such as location of a selection on a page.
      It's probably better to keep them separated in order to follow a more abstract model.
       */
      let htmlSelector = new HTMLSelector(event, this.contentOptions.items.preferredLanguage.currentValue)
      this.store.commit('app/setHtmlSelector', htmlSelector)
      let textSelector = htmlSelector.createTextSelector()

      if (!textSelector.isEmpty()) {
        // TODO: disable experience monitor as it might cause memory leaks
        /* ExpObjMon.track(
          LexicalQuery.create(textSelector, {
            htmlSelector: htmlSelector,
            uiController: this.ui,
            maAdapter: this.maAdapter,
            lexicons: Lexicons,
            resourceOptions: this.resourceOptions,
            siteOptions: [],
            lemmaTranslations: this.enableLemmaTranslations(textSelector) ? { adapter: LemmaTranslations, locale: this.contentOptions.items.locale.currentValue } : null,
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

        let lexQuery = LexicalQuery.create(textSelector, {
          htmlSelector: htmlSelector,
          resourceOptions: this.resourceOptions,
          siteOptions: [],
          lemmaTranslations: this.enableLemmaTranslations(textSelector) ? { locale: this.contentOptions.items.locale.currentValue } : null,
          wordUsageExamples: this.enableWordUsageExamples(textSelector, 'onLexicalQuery')
            ? { paginationMax: this.contentOptions.items.wordUsageExamplesMax.currentValue,
              paginationAuthMax: this.contentOptions.items.wordUsageExamplesAuthMax.currentValue }
            : null,
          langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
        })

        this.newLexicalRequest(textSelector.normalizedText, textSelector.languageID)
        lexQuery.getData()
      }
    }
  }

  async getWordUsageData (homonym, params = {}) {
    this.store.commit('app/setWordUsageExamplesReady', false)

    let wordUsageExamples = this.enableWordUsageExamples({ languageID: homonym.languageID }, 'onDemand')
      ? { paginationMax: this.contentOptions.items.wordUsageExamplesMax.currentValue,
        paginationAuthMax: this.contentOptions.items.wordUsageExamplesAuthMax.currentValue }
      : null

    await LexicalQuery.getWordUsageData(homonym, wordUsageExamples, params)
  }

  /**
   * Check to see if Lemma Translations should be enabled for a query
   *  NB this is Prototype functionality
   */
  enableLemmaTranslations (textSelector) {
    return textSelector.languageID === Constants.LANG_LATIN &&
      this.contentOptions.items.enableLemmaTranslations.currentValue &&
      !this.contentOptions.items.locale.currentValue.match(/^en-/)
  }

  enableWordUsageExamples (textSelector, requestType) {
    let checkType = requestType === 'onLexicalQuery' ? this.contentOptions.items.wordUsageExamplesON.currentValue === requestType : true
    return textSelector.languageID === Constants.LANG_LATIN &&
      this.contentOptions.items.enableWordUsageExamples.currentValue &&
      checkType
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
    let inflectionsViewSet = ViewSetFactory.create(homonym, this.contentOptions.items.locale.currentValue)
    if (inflectionsViewSet.hasMatchingViews) {
      this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_INFLDATA_READY'))
    }
    this.api.app.homonym = homonym
    let wordUsageExampleEnabled = this.enableWordUsageExamples({ languageID: homonym.languageID })

    this.store.commit('app/setHomonym', homonym)
    this.store.commit('app/setWordUsageExampleEnabled', wordUsageExampleEnabled)

    this.store.commit('app/setMorphDataReady')

    let inflDataReady = false
    if (LanguageModelFactory.getLanguageModel(this.store.state.app.currentLanguageID).canInflect()) {
      inflDataReady = Boolean(inflectionsViewSet && inflectionsViewSet.hasMatchingViews)
      this.api.app.inflectionsViewSet = inflectionsViewSet
    }
    this.store.commit('app/setInflData', inflDataReady)

    this.updateProviders(homonym)
    this.updateDefinitions(homonym)
  }

  onWordListUpdated (wordList) {
    this.store.commit('app/setWordLists', [wordList])
    if (this.store.state.auth.promptLogin && !this.store.state.auth.isAuthenticated) {
      this.store.commit(`auth/setNotification`, { text: 'TEXT_NOTICE_SUGGEST_LOGIN', showLogin: true, count: this.wordlistC.getWordListItemCount() })
    }
  }

  onLemmaTranslationsReady (homonym) {
    this.updateTranslations(homonym)
  }

  onDefinitionsReady (data) {
    this.store.commit('ui/addMessage', this.api.l10n.getMsg('TEXT_NOTICE_DEFSDATA_READY', { requestType: data.requestType, lemma: data.word }))
    this.updateDefinitions(data.homonym)
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
    if (this.userDataManager) {
      let wordItemFull = await this.userDataManager.query({ dataType: 'WordItem', params: { wordItem } }, { type: 'full' })
      let homonym = wordItemFull[0].homonym
      this.newLexicalRequest(homonym.targetWord, homonym.languageID)

      this.onHomonymReady(homonym)
      this.updateDefinitions(homonym)
      this.updateTranslations(homonym)
    } else {
      console.warn('UserDataManager is not defined, data couldn\'t be loaded from the storage')
    }
  }

  /**
   * This is to support a switch between different popup types.
   * It is not used now as the only type of popup is available currently.
   */
  switchPopup () {
    if (this.api.ui.hasModule('popup')) {
      const popup = this.api.ui.getModule('popup')
      popup.close() // Close an old popup
      popup.currentPopupComponent = this.api.settings.uiOptions.items[name].currentValue
      popup.open() // Will trigger an initialisation of popup dimensions
    }
  }

  contentOptionChange (name, value) {
    // TODO we need to refactor handling of boolean options
    if (name === 'enableLemmaTranslations' || name === 'enableWordUsageExamples' || name === 'wordUsageExamplesMax' || name === 'wordUsageExamplesAuthMax') {
      this.api.settings.contentOptions.items[name].setValue(value)
    } else {
      this.api.settings.contentOptions.items[name].setTextValue(value)
    }
    switch (name) {
      case 'locale':
        // TODO: It seems that presenter is never defined. Do we need it?
        if (this.presenter) {
          this.presenter.setLocale(this.api.settings.contentOptions.items.locale.currentValue)
        }
        this.updateLemmaTranslations()
        break
      case 'preferredLanguage':
        this.updateLanguage(this.api.settings.contentOptions.items.preferredLanguage.currentValue)
        break
      case 'enableLemmaTranslations':
        this.updateLemmaTranslations()
        break
    }
  }

  /**
   * Handles a UI options in settings.
   * @param {string} name - A name of an option.
   * @param {string | value} value - A new value of an options.
   */
  uiOptionChange (name, value) {
    const FONT_SIZE_PROP = '--alpheios-base-text-size'
    // TODO this should really be handled within OptionsItem
    // the difference between value and textValues is a little confusing
    // see issue #73
    if (name === 'fontSize' || name === 'panelOnActivate') {
      this.api.settings.uiOptions.items[name].setValue(value)
    } else {
      this.api.settings.uiOptions.items[name].setTextValue(value)
    }

    switch (name) {
      case 'panel':
        if (this.api.ui.hasModule('popup')) {
          this.store.commit('panel/close')
          this.store.commit('panel/setPanelLayout', this.api.settings.uiOptions.items[name].currentValue)
          this.store.commit('panel/open')
        }
        break
      case 'popup':
        if (this.api.ui.hasModule('popup')) {
          const popup = this.api.ui.getModule('popup')
          popup.close() // Close an old popup
          popup.currentPopupComponent = this.api.settings.uiOptions.items[name].currentValue
          popup.open() // Will trigger an initialisation of popup dimensions
        }
        break
      case 'fontSize':
        try {
          document.documentElement.style.setProperty(FONT_SIZE_PROP, `${value}px`)
        } catch (error) {
          console.error(`Cannot change a ${FONT_SIZE_PROP} custom prop:`, error)
        }
        break
    }
  }

  resourceSettingChange (name, value) {
    let keyinfo = this.api.settings.resourceOptions.parseKey(name)
    this.api.settings.resourceOptions.items[keyinfo.setting].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
  }

  registerGetSelectedText (listenerName, selector) {
    let ev
    if (this.platform === HTMLPage.platforms.MOBILE) {
      ev = LongTap
    } else {
      switch (this.options.textQueryTrigger) {
        case 'dblClick':
          ev = MouseDblClick
          break
        case 'dblclick':
          ev = MouseDblClick
          break
        case 'longTap':
          ev = LongTap
          break
        default:
          ev = null
      }
    }
    if (ev) {
      this.evc.registerListener(listenerName, selector, this.getSelectedText.bind(this), ev)
    } else {
      this.evc.registerListener(
        listenerName, selector, this.getSelectedText.bind(this), GenericEvt, this.options.textQueryTrigger)
    }
  }

  registerAndActivateGetSelectedText (listenerName, selector) {
    this.registerGetSelectedText(listenerName, selector)
    this.evc.activateListener(listenerName)
  }
}

/**
 * An instance of a warning panel that is shown when UI controller is disabled
 * because an Alpheios embedded lib is active on a page
 * @type {Vue | null}
 */
UIController.embedLibWarningInstance = null
