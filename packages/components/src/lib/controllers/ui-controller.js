/* global Event */
import { Lexeme, Feature, Definition, LanguageModelFactory, Constants } from 'alpheios-data-models'
import { Grammars } from 'alpheios-res-client'
import { ViewSetFactory } from 'alpheios-inflection-tables'
// import {ObjectMonitor as ExpObjMon} from 'alpheios-experience'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Vuex from 'vuex'

// Modules and their support dependencies
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import PanelModule from '@/vue/vuex-modules/ui/panel-module.js'
import PopupModule from '@/vue/vuex-modules/ui/popup-module.js'

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
    this.tabState = {
      definitions: false,
      inflections: false,
      inflectionsbrowser: false,
      status: false,
      options: false,
      info: false,
      treebank: false,
      wordUsage: false
    }
    this.tabStateDefault = 'info'

    this.irregularBaseFontSize = !UIController.hasRegularBaseFontSize()
    this.isInitialized = false
    this.isActivated = false
    this.isDeactivated = false

    this.store = new Vuex.Store() // Vuex store. A public API for data and UI module interactions.
    this.api = {} // An API object for functions of registered modules and UI controller.
    this.dataModules = new Map() // Data modules that are registered to be included into the store.
    this.uiModules = new Map()

    /**
     * If an event controller be used with an instance of a UI Controller,
     * this prop will hold an event controller instance. It is usually initialized within a `build` method.
     * @type {UIEventController}
     */
    this.evc = null

    this.inflectionsViewSet = null // Holds inflection tables ViewSet

    this.auth = null // An object used for user's authorization
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
    uiController.registerDataModule(L10nModule, Locales.en_US, Locales.bundleArr())

    // Register UI modules
    uiController.registerUiModule(PanelModule, {
      mountPoint: '#alpheios-panel', // To what element a panel will be mounted
      panelComponent: 'panel', // A Vue component that will represent a panel
      tabs: uiController.tabState, // TODO: should be accessed via a public API, not via a direct link. This is a temporary solutions
      uiController: uiController // Some child UI components require direct link to a uiController. TODO: remove during refactoring
    })
    uiController.registerUiModule(PopupModule, {
      mountPoint: '#alpheios-popup',
      uiController: uiController // Some child UI components require direct link to a uiController. TODO: remove during refactoring
    })

    // Creates on configures an event listener
    let eventController = new UIEventController()
    switch (uiController.options.textQueryTrigger) {
      case 'dblClick':
        eventController.registerListener('GetSelectedText', uiController.options.textQuerySelector, uiController.getSelectedText.bind(uiController), MouseDblClick)
        break
      case 'longTap':
        eventController.registerListener('GetSelectedText', uiController.options.textQuerySelector, uiController.getSelectedText.bind(uiController), LongTap)
        break
      default:
        eventController.registerListener(
          'GetSelectedText', uiController.options.textQuerySelector, uiController.getSelectedText.bind(uiController), GenericEvt, uiController.options.textQueryTrigger
        )
    }

    eventController.registerListener('HandleEscapeKey', document, uiController.handleEscapeKey.bind(uiController), GenericEvt, 'keydown')
    eventController.registerListener('AlpheiosPageLoad', 'body', uiController.updateAnnotations.bind(uiController), GenericEvt, 'Alpheios_Page_Load')

    // Attaches an event controller to a UIController instance
    uiController.evc = eventController

    // Subscribe to LexicalQuery events
    LexicalQuery.evt.LEXICAL_QUERY_COMPLETE.sub(uiController.onLexicalQueryComplete.bind(uiController))
    LexicalQuery.evt.MORPH_DATA_READY.sub(uiController.onMorphDataReady.bind(uiController))
    LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.sub(uiController.onMorphDataNotFound.bind(uiController))
    LexicalQuery.evt.HOMONYM_READY.sub(uiController.onHomonymReady.bind(uiController))
    LexicalQuery.evt.LEMMA_TRANSL_READY.sub(uiController.updateTranslations.bind(uiController))
    LexicalQuery.evt.WORD_USAGE_EXAMPLES_READY.sub(uiController.onWordUsageExamplesReady.bind(uiController))
    LexicalQuery.evt.DEFS_READY.sub(uiController.onDefinitionsReady.bind(uiController))
    LexicalQuery.evt.DEFS_NOT_FOUND.sub(uiController.onDefinitionsNotFound.bind(uiController))

    // Subscribe to ResourceQuery events
    ResourceQuery.evt.RESOURCE_QUERY_COMPLETE.sub(uiController.onResourceQueryComplete.bind(uiController))
    ResourceQuery.evt.GRAMMAR_AVAILABLE.sub(uiController.onGrammarAvailable.bind(uiController))
    ResourceQuery.evt.GRAMMAR_NOT_FOUND.sub(uiController.onGrammarNotFound.bind(uiController))

    // Subscribe to AnnotationQuery events
    AnnotationQuery.evt.ANNOTATIONS_AVAILABLE.sub(uiController.onAnnotationsAvailable.bind(uiController))

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
   *         panelId: the id of the wrapper for the panel component,
   *         popupId: the id of the wrapper for the popup component
   */
  static get optionsDefaults () {
    return {
      app: {
        name: 'name',
        version: 'version'
      },
      storageAdapter: LocalStorage,
      openPanel: true,
      textQueryTrigger: 'dblClick',
      textQuerySelector: 'body',
      uiTypePanel: 'panel',
      uiTypePopup: 'popup',
      enableLemmaTranslations: false,
      irregularBaseFontSizeClassName: 'alpheios-irregular-base-font-size',
      template: {
        html: Template,
        defaultPanelComponent: 'panel',
        defaultPopupComponent: 'popup',
        draggable: true,
        resizable: true
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
    if (!this.hasUiModule('panel')) { return this }
    if (this.uiOptions.items.panelOnActivate.currentValue) {
      // If option value of panelOnActivate is true
      this.state.setPanelOpen()
    } else {
      this.state.setPanelClosed()
    }
    return this
  }

  /**
   * Registers a data module for use by UI controller and other modules.
   * It instantiates each module and adds them to the registered modules store.
   * @param {Module} moduleClass - A data module's class (i.e. the constructor function).
   * @param options - Arbitrary number of values that will be passed to the module constructor.
   * @return {UIController} - A self reference for chaining.
   */
  registerDataModule (moduleClass, ...options) {
    this.dataModules.set(moduleClass.publicName, { ModuleClass: moduleClass, options: options, instance: null })
    return this
  }

  registerUiModule (moduleClass, ...options) {
    this.uiModules.set(moduleClass.publicName, { ModuleClass: moduleClass, options: options, instance: null })
    return this
  }

  hasUiModule (moduleName) {
    return this.uiModules.has(moduleName)
  }

  getUiModule (moduleName) {
    return this.uiModules.get(moduleName).instance
  }

  async init () {
    if (this.isInitialized) { return `Already initialized` }
    // Start loading options as early as possible
    this.contentOptions = new Options(this.contentOptionsDefaults, this.options.storageAdapter)
    this.resourceOptions = new Options(this.resourceOptionsDefaults, this.options.storageAdapter)
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

    // All options shall be loaded at this point. Can initialize Vue components that will use them
    // Create all registered data modules
    this.dataModules.forEach((m) => { m.instance = new m.ModuleClass(...m.options) })
    // Mount all registered data modules into the store
    this.dataModules.forEach((m) => this.store.registerModule(m.instance.publicName, m.instance.store))
    // Mount all registered UI modules into the store
    this.uiModules.forEach((m) => this.store.registerModule(m.ModuleClass.publicName, m.ModuleClass.store()))

    // Construct a public API of all data modules that will be shared using `provide`
    this.api = Object.assign(this.api, ...Array.from(this.dataModules.values()).map(m => ({ [m.instance.publicName]: m.instance.api(this.store) })))

    /**
     * This is a settings API. It exposes different options to modules and UI components.
     */
    this.api.settings = {
      contentOptions: this.contentOptions,
      resourceOptions: this.resourceOptions,
      uiOptions: this.uiOptions,
      siteOptions: this.siteOptions
    }

    this.api.app = {
      state: this.state, // An app-level state

      // TODO: Some of the functions below should probably belong to other API groups.
      contentOptionChange: this.contentOptionChange.bind(this)
    }

    /**
     * This is a UI-level public API of a UI controller. All objects should use this public API only.
     */
    this.api.ui = {
      // Modules
      hasModule: this.hasUiModule.bind(this), // Checks if a UI module is available
      getModule: this.getUiModule.bind(this), // Gets direct access to module.

      // Actions
      openPanel: this.openPanel.bind(this),
      closePanel: this.closePanel.bind(this),
      openPopup: this.openPopup.bind(this),
      closePopup: this.closePopup.bind(this),
      switchPopup: this.switchPopup.bind(this), // Switches between different types of popups

      optionChange: this.uiOptionChange.bind(this) // Handle a change of UI options
    }

    this.api.language = {
      resourceSettingChange: this.resourceSettingChange.bind(this)
    }

    // Create all registered UI modules. First two parameters of their constructors are Vuex store and API refs.
    // This must be done after creation of data modules.
    this.uiModules.forEach((m) => { m.instance = new m.ModuleClass(this.store, this.api, ...m.options) })

    // Initialize components
    // TODO: this is for compatibility with legacy code only. All UI modules must by dynamic, not static
    this.panel = this.api.ui.getModule('panel')
    this.popup = this.api.ui.getModule('popup')

    // Set initial values of components
    this.setRootComponentClasses()

    const currentLanguageID = LanguageModelFactory.getLanguageIdFromCode(this.contentOptions.items.preferredLanguage.currentValue)
    this.contentOptions.items.lookupLangOverride.setValue(false)
    this.updateLanguage(currentLanguageID)
    this.updateLemmaTranslations()
    this.notifyInflectionBrowser()

    this.state.setWatcher('uiActive', this.updateAnnotations.bind(this))

    this.isInitialized = true

    return this
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

    this.isActivated = true
    this.isDeactivated = false
    this.state.activate()

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

    if (this.api.ui.hasModule('popup')) { this.api.ui.closePopup() }
    if (this.api.ui.hasModule('panel')) { this.api.ui.closePanel(false) } // Close panel without updating it's state so the state can be saved for later reactivation
    this.isActivated = false
    this.isDeactivated = true
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

  formatFullDefinitions (lexeme) {
    let content = `<h3>${lexeme.lemma.word}</h3>\n`
    for (let fullDef of lexeme.meaning.fullDefs) {
      content += `${fullDef.text}<br>\n`
    }
    return content
  }

  message (message) {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.showMessage(message) }
    return this
  }

  addMessage (message) {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.appendMessage(message) }
  }

  addImportantMessage (message) {
    if (this.hasUiModule('panel')) {
      const panel = this.getUiModule('panel')
      panel.vi.appendMessage(message)
      panel.vi.showImportantNotification(message)
    }
    if (this.hasUiModule('popup')) {
      const popup = this.getUiModule('popup')
      popup.vi.appendMessage(message)
      popup.vi.showImportantNotification(message)
    }
  }

  /**
   * Gets language name details by either language ID (a symbol) or language code (string)
   * @param {symbol|string} language - Either language ID or language code (see constants in `data-models` for definitions)
   * @return {string} A language name
   */
  static getLanguageName (language) {
    let langID
    let langCode // eslint-disable-line
    // Compatibility code in case method be called with languageCode instead of ID. Remove when not needed
    ;({ languageID: langID, languageCode: langCode } = LanguageModelFactory.getLanguageAttrs(language))
    return { name: languageNames.has(langID) ? languageNames.get(langID) : '', code: langCode }
  }

  showLanguageInfo (homonym) {
    let notFound = !homonym ||
      !homonym.lexemes ||
      homonym.lexemes.length < 1 ||
      homonym.lexemes.filter((l) => l.isPopulated()).length < 1
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.showLanguageNotification(homonym, notFound) }
    if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.showLanguageNotification(homonym, notFound) }
  }

  showStatusInfo (selectionText, languageID) {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.showStatusInfo(selectionText, languageID) }
    if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.showStatusInfo(selectionText, languageID) }
  }

  showErrorInfo (errorText) {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.showErrorInformation(errorText) }
  }

  showImportantNotification (message) {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.showImportantNotification(message) }
    if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.showImportantNotification(message) }
  }

  changeTab (tabName) {
    if (this.hasUiModule('panel')) {
      if (!this.tabState.hasOwnProperty(tabName)) {
        // Set tab to a default one if it is an unknown tab name
        tabName = this.tabStateDefault
      }
      this.getUiModule('panel').vi.changeTab(tabName)
    } else {
      console.warn(`Cannot switch tab because panel does not exist`)
    }
    return this
  }

  setTargetRect (targetRect) {
    if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.setTargetRect(targetRect) }
    return this
  }

  newLexicalRequest (languageID) {
    if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.newLexicalRequest() }
    if (this.hasUiModule('panel')) {
      const panel = this.api.ui.getModule('panel')
      panel.vi.panelData.inflectionsEnabled = ViewSetFactory.hasInflectionsEnabled(languageID)
      panel.vi.panelData.inflectionsWaitState = true // Homonym is retrieved and inflection data is calculated
      panel.vi.panelData.grammarAvailable = false
      panel.vi.panelData.wordUsageExamplesData = null
    }
    this.clear().open().changeTab('definitions')
    return this
  }

  updateMorphology (homonym) {
    homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))
    if (this.hasUiModule('popup')) {
      const popup = this.getUiModule('popup')
      popup.vi.lexemes = homonym.lexemes
      if (homonym.lexemes.length > 0) {
        // TODO we could really move this into the morph component and have it be calculated for each lemma in case languages are multiple
        popup.vi.linkedFeatures = LanguageModelFactory.getLanguageModel(homonym.lexemes[0].lemma.languageID).grammarFeatures()
      }
      popup.vi.popupData.morphDataReady = true
      popup.vi.popupData.updates = popup.vi.popupData.updates + 1
    }
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.lexemes = homonym.lexemes }
    this.updateProviders(homonym)
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
    if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.popupData.providers = Array.from(providers.keys()) }
  }

  /**
   * Updates grammar data with URLs supplied.
   * If no URLS are provided, will reset grammar data.
   * @param {Array} urls
   */
  updateGrammar (urls = []) {
    if (this.hasUiModule('panel')) {
      const panel = this.getUiModule('panel')
      if (urls.length > 0) {
        panel.vi.panelData.grammarRes = urls[0]
        panel.vi.panelData.grammarAvailable = true
      } else {
        panel.vi.panelData.grammarRes = { provider: this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_NOTFOUND') }
      }
    }
    // todo show TOC or not found
  }

  updateDefinitions (homonym) {
    if (this.hasUiModule('panel')) {
      const panel = this.getUiModule('panel')
      panel.vi.panelData.fullDefinitions = ''
      panel.vi.panelData.shortDefinitions = []
    }
    let definitions = {}
    // let defsList = []
    let hasFullDefs = false
    for (let lexeme of homonym.lexemes) {
      if (lexeme.meaning.shortDefs.length > 0) {
        definitions[lexeme.lemma.ID] = []
        for (let def of lexeme.meaning.shortDefs) {
          // for now, to avoid duplicate showing of the provider we create a new unproxied definitions
          // object without a provider if it has the same provider as the morphology info
          if (def.provider && lexeme.provider && def.provider.uri === lexeme.provider.uri) {
            definitions[lexeme.lemma.ID].push(new Definition(def.text, def.language, def.format, def.lemmaText))
          } else {
            definitions[lexeme.lemma.ID].push(def)
          }
        }
        if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.shortDefinitions.push(...lexeme.meaning.shortDefs) }
        this.updateProviders(homonym)
      } else if (Object.entries(lexeme.lemma.features).length > 0) {
        definitions[lexeme.lemma.ID] = [new Definition('No definition found.', 'en-US', 'text/plain', lexeme.lemma.word)]
      }

      if (lexeme.meaning.fullDefs.length > 0) {
        if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.fullDefinitions += this.formatFullDefinitions(lexeme) }
        hasFullDefs = true
      }
    }

    // Populate a popup
    if (this.hasUiModule('popup')) {
      const popup = this.getUiModule('popup')
      popup.vi.definitions = definitions
      popup.vi.popupData.defDataReady = hasFullDefs
      popup.vi.popupData.updates = popup.vi.popupData.updates + 1
    }
  }

  updateTranslations (homonym) {
    let translations = {}
    for (let lexeme of homonym.lexemes) {
      if (lexeme.lemma.translation !== undefined) {
        translations[lexeme.lemma.ID] = lexeme.lemma.translation
      }
    }
    if (this.hasUiModule('popup')) {
      const popup = this.getUiModule('popup')
      popup.vi.translations = translations
      popup.vi.popupData.translationsDataReady = true
      popup.vi.popupData.updates = popup.vi.popupData.updates + 1
    }
    this.updateProviders(homonym)
  }

  updatePageAnnotationData (data) {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.treebankComponentData.data.page = data.treebank.page || {} }
  }

  updateWordAnnotationData (data) {
    if (data && data.treebank) {
      if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.treebankComponentData.data.word = data.treebank.word || {} }
      if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.popupData.hasTreebank = data.treebank.word }
    } else {
      if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.treebankComponentData.data.word = {} }
      if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.popupData.hasTreebank = false }
    }
  }

  updateLanguage (currentLanguageID) {
    // the code which follows assumes we have been passed a languageID symbol
    // we can try to recover gracefully if we accidentally get passed a string value
    if (typeof currentLanguageID !== 'symbol') {
      console.warn('updateLanguage was called with a string value')
      currentLanguageID = LanguageModelFactory.getLanguageIdFromCode(currentLanguageID)
    }
    this.state.setItem('currentLanguage', LanguageModelFactory.getLanguageCodeFromId(currentLanguageID))

    if (this.hasUiModule('panel')) {
      const panel = this.getUiModule('panel')
      panel.vi.requestGrammar({ type: 'table-of-contents', value: '', languageID: currentLanguageID })
      panel.vi.panelData.currentLanguageID = currentLanguageID
      panel.vi.panelData.infoComponentData.languageName = UIController.getLanguageName(currentLanguageID).name
    }

    if (this.hasUiModule('popup')) {
      const popup = this.getUiModule('popup')
      popup.vi.popupData.inflDataReady = this.inflDataReady
      Vue.set(popup.vi.popupData, 'currentLanguageName', UIController.getLanguageName(currentLanguageID).name)
    }
    console.log(`Current language is ${this.state.currentLanguage}`)
  }

  updateLemmaTranslations () {
    if (this.contentOptions.items.enableLemmaTranslations.currentValue && !this.contentOptions.items.locale.currentValue.match(/en-/)) {
      this.state.setItem('lemmaTranslationLang', this.contentOptions.items.locale.currentValue)
    } else {
      this.state.setItem('lemmaTranslationLang', null)
    }
  }

  notifyInflectionBrowser () {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.inflectionBrowserEnabled = true }
  }

  updateInflections (homonym) {
    this.inflectionsViewSet = ViewSetFactory.create(homonym, this.contentOptions.items.locale.currentValue)

    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.inflectionComponentData.inflectionViewSet = this.inflectionsViewSet }
    if (this.inflectionsViewSet.hasMatchingViews) {
      this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_INFLDATA_READY'))
    }
    if (this.hasUiModule('panel')) {
      const panel = this.getUiModule('panel')
      panel.vi.panelData.inflectionsWaitState = false
      panel.vi.panelData.inflectionComponentData.inflDataReady = this.inflDataReady
    }
    if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.popupData.inflDataReady = this.inflDataReady }
  }

  updateWordUsageExamples (wordUsageExamplesData) {
    if (this.hasUiModule('panel')) {
      this.getUiModule('panel').vi.panelData.wordUsageExamplesData = wordUsageExamplesData
    }
  }

  lexicalRequestComplete () {
    if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.popupData.morphDataReady = true }
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.inflBrowserTablesCollapsed = null } // Reset inflection browser tables state
  }

  lexicalRequestSucceeded () {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.inflectionsWaitState = false }
  }

  lexicalRequestFailed () {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.panelData.inflectionsWaitState = false }
  }

  get inflDataReady () {
    return this.inflectionsViewSet && this.inflectionsViewSet.hasMatchingViews
  }

  clear () {
    if (this.hasUiModule('panel')) { this.getUiModule('panel').vi.clearContent() }
    if (this.hasUiModule('popup')) { this.getUiModule('popup').vi.clearContent() }
    return this
  }

  // TODO: Is this ever called?
  open () {
    if (this.contentOptions.items.uiType.currentValue === this.options.uiTypePanel) {
      if (this.api.ui.hasModule('panel')) { this.api.ui.openPanel() }
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
        this.store.commit('panel/open')
        this.state.setPanelOpen()
      }
    }
  }

  /**
   * Closes a panel. Used from a content script upon a panel status change request.
   */
  closePanel (syncState = true) {
    if (this.api.ui.hasModule('panel')) {
      this.store.commit('panel/close')
      if (syncState) { this.state.setPanelClosed() }
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
  setRootComponentClasses () {
    let classes = []

    if (!UIController.hasRegularBaseFontSize()) {
      classes.push(this.options.irregularBaseFontSizeClassName)
    }
    if (this.uiOptions.items.skin !== undefined) {
      classes.push(`auk--${this.uiOptions.items.skin.currentValue}`)
    }

    if (this.uiOptions.items.fontSize !== undefined && this.uiOptions.items.fontSize.value !== undefined) {
      classes.push(`alpheios-font_${this.uiOptions.items.fontSize.currentValue}_class`)
    } else {
      classes.push(`alpheios-font_${this.uiOptions.items.fontSize.defaultValue}_class`)
    }

    if (this.uiOptions.items.colorSchema !== undefined && this.uiOptions.items.colorSchema.value !== undefined) {
      classes.push(`alpheios-color_schema_${this.uiOptions.items.colorSchema.currentValue}_class`)
    } else {
      classes.push(`alpheios-color_schema_${this.uiOptions.items.colorSchema.defaultValue}_class`)
    }

    let classesLength = 0
    if (this.hasUiModule('popup')) {
      const popup = this.getUiModule('popup')
      const classesLength = popup.vi.popupData.classes.length
      popup.vi.popupData.classes.splice(0, classesLength)
      classes.forEach(classItem => {
        popup.vi.popupData.classes.push(classItem)
      })
    }

    if (this.hasUiModule('panel')) {
      const panel = this.getUiModule('panel')
      panel.vi.panelData.classes.splice(0, classesLength)

      classes.forEach(classItem => {
        panel.vi.panelData.classes.push(classItem)
      })
    }
  }

  updateStyleClass (prefix, type) {
    if (this.hasUiModule('popup')) {
      const popup = this.getUiModule('popup')
      let popupClasses = popup.vi.popupData.classes.slice(0)

      popupClasses.forEach(function (item, index) {
        if (item.indexOf(prefix) === 0) {
          popupClasses[index] = `${prefix}${type}_class`
        }
      })

      popup.vi.popupData.classes.splice(0, popup.vi.popupData.classes.length)
      popupClasses.forEach(classItem => {
        popup.vi.popupData.classes.push(classItem)
      })
    }

    if (this.hasUiModule('panel')) {
      const panel = this.getUiModule('panel')
      let panelClasses = panel.vi.panelData.classes.slice(0)

      panelClasses.forEach(function (item, index) {
        if (item.indexOf(prefix) === 0) {
          panelClasses[index] = `${prefix}${type}_class`
        }
      })
      panel.vi.panelData.classes.splice(0, panel.vi.panelData.classes.length)

      panelClasses.forEach(classItem => {
        panel.vi.panelData.classes.push(classItem)
      })
    }
  }

  updateFontSizeClass (type) {
    this.updateStyleClass('alpheios-font_', type)
  }

  updateColorSchemaClass (type) {
    this.updateStyleClass('alpheios-color_schema_', type)
  }

  changeSkin () {
    // Update skin name in classes
    this.setRootComponentClasses()
  }

  getSelectedText (event) {
    if (this.state.isActive() && this.state.uiIsActive()) {
      /*
      TextSelector conveys text selection information. It is more generic of the two.
      HTMLSelector conveys page-specific information, such as location of a selection on a page.
      It's probably better to keep them separated in order to follow a more abstract model.
       */
      let htmlSelector = new HTMLSelector(event, this.contentOptions.items.preferredLanguage.currentValue)
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
          wordUsageExamples: this.enableWordUsageExamples(textSelector) ? { paginationMax: this.contentOptions.items.wordUsageExamplesMax.currentValue } : null,
          langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
        })

        this.setTargetRect(htmlSelector.targetRect)
        this.newLexicalRequest(textSelector.languageID)
        this.message(this.api.l10n.getMsg('TEXT_NOTICE_DATA_RETRIEVAL_IN_PROGRESS'))
        this.showStatusInfo(textSelector.normalizedText, textSelector.languageID)
        this.updateLanguage(textSelector.languageID)
        this.updateWordAnnotationData(textSelector.data)

        lexQuery.getData()
      }
    }
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

  enableWordUsageExamples (textSelector) {
    return textSelector.languageID === Constants.LANG_LATIN &&
      this.contentOptions.items.enableWordUsageExamples.currentValue
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
    this.message(this.api.l10n.getMsg('TEXT_NOTICE_RESOURCE_RETRIEVAL_IN_PROGRESS'))
  }

  onLexicalQueryComplete (data) {
    switch (data.resultStatus) {
      case LexicalQuery.resultStatus.SUCCEEDED:
        this.lexicalRequestSucceeded()
        this.showLanguageInfo(data.homonym)
        this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_LEXQUERY_COMPLETE'))
        this.lexicalRequestComplete()
        break
      case LexicalQuery.resultStatus.FAILED:
        this.lexicalRequestFailed()
        this.showLanguageInfo(data.homonym)
        this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_LEXQUERY_COMPLETE'))
        this.lexicalRequestComplete()
        break
      default:
        // Request was probably cancelled
        this.lexicalRequestComplete()
    }
  }

  onMorphDataReady () {
    this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_MORPHDATA_READY'))
  }

  onMorphDataNotFound () {
    this.addImportantMessage(this.api.l10n.getMsg('TEXT_NOTICE_MORPHDATA_NOTFOUND'))
    // Need to notify a UI controller that there is no morph data on this word in an analyzer
    // However, controller may not have `morphologyDataNotFound()` implemented, so need to check first
    if (this.morphologyDataNotFound) { this.morphologyDataNotFound(true) }
  }

  onHomonymReady (homonym) {
    this.updateMorphology(homonym)
    this.updateDefinitions(homonym)
    // Update status info with data from a morphological analyzer
    this.showStatusInfo(homonym.targetWord, homonym.languageID)
    this.updateInflections(homonym)
  }

  onDefinitionsReady (data) {
    this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_DEFSDATA_READY', { requestType: data.requestType, lemma: data.word }))
    this.updateDefinitions(data.homonym)
  }

  onWordUsageExamplesReady (wordUsageExamplesData) {
    this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_WORDUSAGE_READY'))
    this.updateWordUsageExamples(wordUsageExamplesData)
  }

  onDefinitionsNotFound (data) {
    this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_DEFSDATA_NOTFOUND', { requestType: data.requestType, word: data.word }))
  }

  onResourceQueryComplete () {
    // We don't check result status for now. We always output the same message.
    this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_COMPLETE'))
  }

  onGrammarAvailable (data) {
    this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_READY'))
    this.updateGrammar(data.url)
  }

  onGrammarNotFound () {
    this.updateGrammar()
    this.addMessage(this.api.l10n.getMsg('TEXT_NOTICE_GRAMMAR_NOTFOUND'))
  }

  onAnnotationsAvailable (data) {
    this.updatePageAnnotationData(data.annotations)
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
    console.log('Change inside instance', name, value)
    // TODO we need to refactor handling of boolean options
    if (name === 'enableLemmaTranslations' || name === 'enableWordUsageExamples' || name === 'wordUsageExamplesMax') {
      this.api.settings.contentOptions.items[name].setValue(value)
    } else {
      this.api.settings.contentOptions.items[name].setTextValue(value)
    }
    switch (name) {
      case 'locale':
        if (this.presenter) {
          this.presenter.setLocale(this.options.items.locale.currentValue)
        }
        this.updateLemmaTranslations()
        break
      case 'preferredLanguage':
        this.updateLanguage(this.options.items.preferredLanguage.currentValue)
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
    // TODO this should really be handled within OptionsItem
    // the difference between value and textValues is a little confusing
    // see issue #73
    if (name === 'fontSize' || name === 'colorSchema' || name === 'panelOnActivate') {
      this.api.settings.uiOptions.items[name].setValue(value)
    } else {
      this.api.settings.uiOptions.items[name].setTextValue(value)
    }

    switch (name) {
      case 'skin':
        this.changeSkin(this.api.settings.uiOptions.items[name].currentValue)
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
        this.updateFontSizeClass(value)
        break
      case 'colorSchema':
        this.updateColorSchemaClass(value)
        break
    }
  }

  resourceSettingChange (name, value) {
    let keyinfo = this.api.settings.resourceOptions.parseKey(name)
    this.api.settings.resourceOptions.items[keyinfo.setting].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
  }
}

/**
 * An instance of a warning panel that is shown when UI controller is disabled
 * because an Alpheios embedded lib is active on a page
 * @type {Vue | null}
 */
UIController.embedLibWarningInstance = null
