/* global Event */
import { Lexeme, Feature, Definition, LanguageModelFactory, Constants } from 'alpheios-data-models'
import { Grammars } from 'alpheios-res-client'
import { ViewSetFactory } from 'alpheios-inflection-tables'
// import {ObjectMonitor as ExpObjMon} from 'alpheios-experience'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

// A panel component
import Panel from '@/vue-components/panel.vue'
// A popup component
import Popup from '@/vue-components/popup.vue'

import EmbedLibWarning from '@/vue-components/embed-lib-warning.vue'

import L10n from '@/lib/l10n/l10n.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'
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
    this.contentOptions = new Options(ContentOptionDefaults, this.options.storageAdapter)
    this.resourceOptions = new Options(LanguageOptionDefaults, this.options.storageAdapter)
    this.uiOptions = new Options(UIOptionDefaults, this.options.storageAdapter)
    this.siteOptions = null // Will be set during an `init` phase
    this.tabState = {
      definitions: false,
      inflections: false,
      inflectionsbrowser: false,
      status: false,
      options: false,
      info: false,
      treebank: false
    }
    this.tabStateDefault = 'info'

    this.irregularBaseFontSize = !UIController.hasRegularBaseFontSize()
    this.isInitialized = false
    this.isActivated = false
    this.isDeactivated = false

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
    LexicalQuery.evt.LEMMA_TRANSL_READY.sub(uiController.onLemmaTranslationsReady.bind(uiController))
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
      verboseMode: 'verbose',
      enableLemmaTranslations: false,
      irregularBaseFontSizeClassName: 'alpheios-irregular-base-font-size',
      template: {
        html: Template,
        panelId: 'alpheios-panel',
        defaultPanelComponent: 'panel',
        popupId: 'alpheios-popup',
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
    if (!this.panel) { return this }
    if (this.uiOptions.items.panelOnActivate.currentValue) {
      // If option value of panelOnActivate is true
      this.state.setPanelOpen()
    } else {
      this.state.setPanelClosed()
    }
    return this
  }

  async init () {
    if (this.isInitialized) { return `Already initialized` }
    // Start loading options as early as possible
    let optionLoadPromises = [this.contentOptions.load(), this.resourceOptions.load(), this.uiOptions.load()]
    this.siteOptions = this.loadSiteOptions()

    this.zIndex = HTMLPage.getZIndexMax()

    this.l10n = new L10n()
      .addMessages(enUS, Locales.en_US)
      .addMessages(enGB, Locales.en_GB)
      .setLocale(Locales.en_US)

    // Will add morph adapter options to the `options` object of UI controller constructor as needed.

    // Inject HTML code of a plugin. Should go in reverse order.
    document.body.classList.add('alpheios')
    let container = document.createElement('div')
    document.body.insertBefore(container, null)
    container.outerHTML = this.options.template.html

    await Promise.all(optionLoadPromises)
    // All options shall be loaded at this point. Can initialize Vue components that will use them
    // Initialize components
    this.panel = new Vue({
      el: `#${this.options.template.panelId}`,
      components: {
        panel: Panel
      },
      data: {
        panelData: {
          isOpen: false,
          tabs: this.tabState,
          verboseMode: this.contentOptions.items.verboseMode.currentValue === this.options.verboseMode,
          currentLanguageID: null,
          grammarAvailable: false,
          grammarRes: {},
          lexemes: [],
          inflectionComponentData: {
            visible: false,
            inflectionViewSet: null,
            inflDataReady: false
          },
          inflectionBrowserData: {
            visible: false
          },
          inflectionsWaitState: false,
          inflectionsEnabled: false,
          // Whether inflection browser is enabled for a language. We always show an inflection browser for now.
          inflectionBrowserEnabled: false,
          inflBrowserTablesCollapsed: null, // Null means that state is not set
          shortDefinitions: [],
          fullDefinitions: '',
          inflections: {
            localeSwitcher: undefined,
            viewSelector: undefined,
            tableBody: undefined
          },
          inflectionIDs: {
            localeSwitcher: 'alpheios-panel-content-infl-table-locale-switcher',
            viewSelector: 'alpheios-panel-content-infl-table-view-selector',
            tableBody: 'alpheios-panel-content-infl-table-body'
          },
          infoComponentData: {
            appInfo: this.options.app,
            languageName: UIController.getLanguageName(this.state.currentLanguage).name
          },
          messages: [],
          notification: {
            visible: false,
            important: false,
            showLanguageSwitcher: false,
            text: ''
          },
          status: {
            selectedText: '',
            languageName: '',
            languageCode: ''
          },
          settings: this.contentOptions.items,
          treebankComponentData: {
            data: {
              word: {},
              page: {}

            },
            visible: false
          },
          resourceSettings: this.resourceOptions.items,
          uiOptions: this.uiOptions,
          classes: [], // Will be set later by `setRootComponentClasses()`
          styles: {
            zIndex: this.zIndex
          },
          minWidth: 400,
          l10n: this.l10n,
          auth: this.auth
        },
        state: this.state,
        options: this.contentOptions,
        resourceOptions: this.resourceOptions,
        currentPanelComponent: this.options.template.defaultPanelComponent,
        uiController: this,
        classesChanged: 0
      },
      methods: {
        isOpen: function () {
          return this.state.isPanelOpen()
        },

        open: function (forceOpen) {
          if (forceOpen || !this.state.isPanelOpen()) {
            this.panelData.isOpen = true
            this.state.setPanelOpen()
          }
          return this
        },

        // `updateState == false` is used to close a panel without updating state
        close: function (updateState = true) {
          this.panelData.isOpen = false
          if (updateState) { this.state.setPanelClosed() }
          return this
        },

        setPositionTo: function (position) {
          this.options.items.panelPosition.setValue(position)
          this.classesChanged += 1
        },

        attachToLeft: function () {
          this.setPositionTo('left')
        },

        attachToRight: function () {
          this.setPositionTo('right')
        },

        changeTab (name) {
          for (let key of Object.keys(this.panelData.tabs)) {
            if (this.panelData.tabs[key]) { this.panelData.tabs[key] = false }
          }

          const inflectionsAvailable = Boolean(this.panelData && this.panelData.inflectionComponentData && this.panelData.inflectionComponentData.inflDataReady)
          const grammarAvailable = Boolean(this.panelData && this.panelData.grammarAvailable)
          const statusAvailable = Boolean(this.panelData && this.panelData.verboseMode)

          // TODO: With state refactoring, eliminate similar code in `panel.vue`
          const treebankTabAvaliable = Boolean(this.panelData && this.panelData.treebankComponentData && this.panelData.treebankComponentData.data &&
          ((this.panelData.treebankComponentData.data.page && this.panelData.treebankComponentData.data.page.src) ||
            (this.panelData.treebankComponentData.data.word && this.panelData.treebankComponentData.data.word.src)))
          // If tab is disabled, switch to a default one
          if (
            (!inflectionsAvailable && name === 'inflections') ||
            (!grammarAvailable && name === 'grammar') ||
            (!treebankTabAvaliable && name === 'treebank') ||
            (!statusAvailable && name === 'status')
          ) {
            name = this.uiController.tabStateDefault
          }
          this.panelData.tabs[name] = true
          this.state.changeTab(name) // Reflect a tab change in a state
          return this
        },

        clearContent: function () {
          this.panelData.shortDefinitions = []
          this.panelData.fullDefinitions = ''
          this.panelData.messages = ''
          this.panelData.treebankComponentData.data.word = {}
          this.panelData.treebankComponentData.visible = false
          this.clearNotifications()
          this.clearStatus()
          return this
        },

        showMessage: function (message) {
          this.panelData.messages = [message]
        },

        appendMessage: function (message) {
          this.panelData.messages.push(message)
        },

        clearMessages: function () {
          this.panelData.messages = []
        },

        showNotification: function (text, important = false) {
          this.panelData.notification.visible = true
          this.panelData.notification.important = important
          this.panelData.notification.showLanguageSwitcher = false
          this.panelData.notification.text = text
        },

        showImportantNotification: function (text) {
          this.showNotification(text, true)
        },

        showLanguageNotification: function (homonym, notFound = false) {
          this.panelData.notification.visible = true
          let languageName
          if (homonym) {
            languageName = UIController.getLanguageName(homonym.languageID).name
          } else if (this.panelData.infoComponentData.languageName) {
            languageName = this.panelData.infoComponentData.languageName
          } else {
            languageName = this.panelData.l10n.messages.TEXT_NOTICE_LANGUAGE_UNKNOWN // TODO this wil be unnecessary when the morphological adapter returns a consistent response for erors
          }
          if (notFound) {
            this.panelData.notification.important = true
            this.panelData.notification.showLanguageSwitcher = true
            this.panelData.notification.text = this.panelData.l10n.messages.TEXT_NOTICE_CHANGE_LANGUAGE.get(languageName)
          } else {
            this.panelData.notification.visible = true
            this.panelData.notification.important = false
            this.panelData.notification.showLanguageSwitcher = false
          }
        },

        showStatusInfo: function (selectionText, languageID) {
          let langDetails = UIController.getLanguageName(languageID)
          this.panelData.status.languageName = langDetails.name
          this.panelData.status.languageCode = langDetails.code
          this.panelData.status.selectedText = selectionText
        },

        showErrorInformation: function (errorText) {
          this.panelData.notification.visible = true
          this.panelData.notification.important = true
          this.panelData.notification.showLanguageSwitcher = false
          this.panelData.notification.text = errorText
        },

        clearNotifications: function () {
          this.panelData.notification.visible = false
          this.panelData.notification.important = false
          this.panelData.notification.showLanguageSwitcher = false
          this.panelData.notification.text = ''
        },

        clearStatus: function () {
          this.panelData.status.languageName = ''
          this.panelData.status.languageCode = ''
          this.panelData.status.selectedText = ''
        },

        toggle: function () {
          if (this.state.isPanelOpen()) {
            this.close()
          } else {
            this.open()
          }
          return this
        },

        requestGrammar: function (feature) {
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
          this.uiController.message(this.panelData.l10n.messages.TEXT_NOTICE_RESOURCE_RETRIEVAL_IN_PROGRESS)
        },

        settingChange: function (name, value) {
          console.log('Change inside instance', name, value)
          // TODO we need to refactor handling of boolean options
          if (name === 'enableLemmaTranslations') {
            this.options.items[name].setValue(value)
          } else {
            this.options.items[name].setTextValue(value)
          }
          switch (name) {
            case 'locale':
              if (this.uiController.presenter) {
                this.uiController.presenter.setLocale(this.options.items.locale.currentValue)
              }
              this.uiController.updateLemmaTranslations()
              break
            case 'preferredLanguage':
              this.uiController.updateLanguage(this.options.items.preferredLanguage.currentValue)
              break
            case 'verboseMode':
              this.uiController.updateVerboseMode()
              break
            case 'enableLemmaTranslations':
              this.uiController.updateLemmaTranslations()
              break
          }
        },
        resourceSettingChange: function (name, value) {
          let keyinfo = this.resourceOptions.parseKey(name)
          console.log('Change inside instance', keyinfo.setting, keyinfo.language, value)
          this.resourceOptions.items[keyinfo.setting].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
        },

        uiOptionChange: function (name, value) {
          if (name === 'fontSize' || name === 'colorSchema' || name === 'panelOnActivate') {
            this.uiController.uiOptions.items[name].setValue(value)
          } else {
            this.uiController.uiOptions.items[name].setTextValue(value)
          }

          switch (name) {
            case 'skin':
              this.uiController.changeSkin(this.uiController.uiOptions.items[name].currentValue)
              break
            case 'popup':
              this.uiController.popup.close() // Close an old popup
              this.uiController.popup.currentPopupComponent = this.uiController.uiOptions.items[name].currentValue
              this.uiController.popup.open() // Will trigger an initialisation of popup dimensions
              break
            case 'fontSize':
              this.uiController.updateFontSizeClass(value)
              break
            case 'colorSchema':
              this.uiController.updateColorSchemaClass(value)
              break
          }
        }
      },
      mounted: function () {
        this.panelData.inflections.localeSwitcher = document.querySelector(`#${this.panelData.inflectionIDs.localeSwitcher}`)
        this.panelData.inflections.viewSelector = document.querySelector(`#${this.panelData.inflectionIDs.viewSelector}`)
        this.panelData.inflections.tableBody = document.querySelector(`#${this.panelData.inflectionIDs.tableBody}`)
      }
    })

    // Create a Vue instance for a popup
    this.popup = new Vue({
      el: `#${this.options.template.popupId}`,
      components: {
        popup: Popup
      },
      data: {
        messages: [],
        lexemes: [],
        definitions: {},

        translations: {},

        linkedFeatures: [],
        visible: false,
        popupData: {
          fixedPosition: true, // Whether to put popup into a fixed position or calculate that position dynamically
          // Default popup position, with units
          top: '10vh',
          left: '10vw',

          draggable: this.options.template.draggable,
          resizable: this.options.template.resizable,
          // Default popup dimensions, in pixels, without units. These values will override CSS rules.
          // Can be scaled down on small screens automatically.
          width: 210,
          /*
          `fixedElementsHeight` is a sum of heights of all elements of a popup, including a top bar, a button area,
          and a bottom bar. A height of all variable elements (i.e. morphological data container) will be
          a height of a popup less this value.
           */
          fixedElementsHeight: 120,
          heightMin: 150, // Initially, popup height will be set to this value
          heightMax: 400, // If a morphological content height is greater than `contentHeightLimit`, a popup height will be increased to this value
          // A margin between a popup and a selection
          placementMargin: 15,
          // A minimal margin between a popup and a viewport border, in pixels. In effect when popup is scaled down.
          viewportMargin: 5,

          // A position of a word selection
          targetRect: {},

          /*
          A date and time when a new request was started, in milliseconds since 1970-01-01. It is used within a
          component to identify a new request coming in and to distinguish it from data updates of the current request.
           */
          requestStartTime: 0,
          settings: this.contentOptions.items,
          verboseMode: this.contentOptions.items.verboseMode.currentValue === this.options.verboseMode,
          defDataReady: false,
          hasTreebank: false,
          inflDataReady: this.inflDataReady,
          morphDataReady: false,

          translationsDataReady: false,

          showProviders: false,
          updates: 0,
          classes: [], // Will be set later by `setRootComponentClasses()`
          l10n: this.l10n,
          notification: {
            visible: false,
            important: false,
            showLanguageSwitcher: false,
            text: ''
          },
          providers: [],
          status: {
            selectedText: '',
            languageName: '',
            languageCode: ''
          },
          currentLanguage: null,
          resourceSettings: this.resourceOptions.items,
          styles: {
            zIndex: this.zIndex
          }
        },
        panel: this.panel,
        options: this.contentOptions,
        resourceOptions: this.resourceOptions,
        currentPopupComponent: this.options.template.defaultPopupComponent,
        uiController: this,
        classesChanged: 0
      },
      methods: {
        setTargetRect: function (targetRect) {
          this.popupData.targetRect = targetRect
        },

        showMessage: function (message) {
          this.messages = [message]
          return this
        },

        appendMessage: function (message) {
          this.messages.push(message)
          return this
        },

        clearMessages: function () {
          while (this.messages.length > 0) {
            this.messages.pop()
          }
          return this
        },

        showNotification: function (text, important = false) {
          this.popupData.notification.visible = true
          this.popupData.notification.important = important
          this.popupData.notification.showLanguageSwitcher = false
          this.popupData.notification.text = text
        },

        showImportantNotification: function (text) {
          this.showNotification(text, true)
        },

        showLanguageNotification: function (homonym, notFound = false) {
          this.popupData.notification.visible = true
          let languageName
          if (homonym) {
            languageName = UIController.getLanguageName(homonym.languageID).name
          } else if (this.popupData.currentLanguageName) {
            languageName = this.popupData.currentLanguageName
          } else {
            languageName = this.popupData.l10n.messages.TEXT_NOTICE_LANGUAGE_UNKNOWN // TODO this wil be unnecessary when the morphological adapter returns a consistent response for erors
          }
          if (notFound) {
            this.popupData.notification.important = true
            this.popupData.notification.showLanguageSwitcher = true
            this.popupData.notification.text = this.popupData.l10n.messages.TEXT_NOTICE_CHANGE_LANGUAGE.get(languageName)
          } else {
            this.popupData.notification.important = false
            this.popupData.notification.showLanguageSwitcher = false
          }
        },

        showStatusInfo: function (selectionText, languageID) {
          let langDetails = UIController.getLanguageName(languageID)
          this.popupData.status.languageName = langDetails.name
          this.popupData.status.languageCode = langDetails.code
          this.popupData.status.selectedText = selectionText
        },

        showErrorInformation: function (errorText) {
          this.popupData.notification.visible = true
          this.popupData.notification.important = true
          this.popupData.notification.showLanguageSwitcher = false
          this.popupData.notification.text = errorText
        },

        newLexicalRequest: function () {
          this.popupData.requestStartTime = new Date().getTime()
          this.panel.panelData.inflBrowserTablesCollapsed = true // Collapse all inflection tables in a browser
        },

        clearContent: function () {
          this.definitions = {}
          this.translations = {}

          this.lexemes = []
          this.popupData.providers = []
          this.popupData.defDataReady = false
          this.popupData.inflDataReady = false
          this.popupData.morphDataReady = false

          this.popupData.translationsDataReady = false

          this.popupData.showProviders = false
          this.popupData.hasTreebank = false
          this.clearNotifications()
          this.clearStatus()
          return this
        },

        clearNotifications: function () {
          this.popupData.notification.visible = false
          this.popupData.notification.important = false
          this.popupData.notification.showLanguageSwitcher = false
          this.popupData.notification.text = ''
        },

        clearStatus: function () {
          this.popupData.status.languageName = ''
          this.popupData.status.languageCode = ''
          this.popupData.status.selectedText = ''
        },

        open: function () {
          this.visible = true
          return this
        },

        close: function () {
          this.visible = false
          return this
        },

        showPanelTab: function (tabName) {
          this.panel.changeTab(tabName)
          this.panel.open()
          return this
        },

        sendFeature: function (feature) {
          this.panel.requestGrammar(feature)
          this.panel.changeTab('grammar')
          this.panel.open()
          return this
        },

        settingChange: function (name, value) {
          console.log('Change inside instance', name, value)
          this.options.items[name].setTextValue(value)
          switch (name) {
            case 'locale':
              if (this.uiController.presenter) {
                this.uiController.presenter.setLocale(this.options.items.locale.currentValue)
              }
              this.uiController.updateLemmaTranslations()
              break
            case 'preferredLanguage':
              this.uiController.updateLanguage(this.options.items.preferredLanguage.currentValue)
              break
          }
        },

        resourceSettingChange: function (name, value) {
          let keyinfo = this.resourceOptions.parseKey(name)
          console.log('Change inside instance', keyinfo.setting, keyinfo.language, value)
          this.resourceOptions.items[keyinfo.setting].filter((f) => f.name === name).forEach((f) => { f.setTextValue(value) })
        },

        uiOptionChange: function (name, value) {
          // TODO this should really be handled within OptionsItem
          // the difference between value and textValues is a little confusing
          // see issue #73
          if (name === 'fontSize' || name === 'colorSchema') {
            this.uiController.uiOptions.items[name].setValue(value)
          } else {
            this.uiController.uiOptions.items[name].setTextValue(value)
          }

          switch (name) {
            case 'skin':
              this.uiController.changeSkin(this.uiController.uiOptions.items[name].currentValue)
              break
            case 'popup':
              this.uiController.popup.close() // Close an old popup
              this.uiController.popup.currentPopupComponent = this.uiController.uiOptions.items[name].currentValue
              this.uiController.popup.open() // Will trigger an initialisation of popup dimensions
              break
            case 'fontSize':
              this.uiController.updateFontSizeClass(value)
              break
            case 'colorSchema':
              this.uiController.updateColorSchemaClass(value)
              break
          }
        }
      }
    })

    // Set initial values of components
    this.setRootComponentClasses()

    const currentLanguageID = LanguageModelFactory.getLanguageIdFromCode(this.contentOptions.items.preferredLanguage.currentValue)
    this.contentOptions.items.lookupLangOverride.setValue(false)
    this.updateLanguage(currentLanguageID)
    this.updateVerboseMode()
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
      this.panel.open(true)
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

    this.popup.close()
    this.panel.close(false) // Close panel without updating it's state so the state can be saved for later reactivation
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
        propsData: {text: message}
      })
      UIController.embedLibWarningInstance.$mount() // Render off-document to append afterwards
    }
    return UIController.embedLibWarningInstance
  }

  /**
   * Load site-specific settings
   */
  loadSiteOptions () {
    let allSiteOptions = []
    for (let site of SiteOptions) {
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
    this.panel.showMessage(message)
    return this
  }

  addMessage (message) {
    this.panel.appendMessage(message)
  }

  addImportantMessage (message) {
    this.panel.appendMessage(message)
    this.popup.appendMessage(message)
    this.panel.showImportantNotification(message)
    this.popup.showImportantNotification(message)
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
    this.panel.showLanguageNotification(homonym, notFound)
    this.popup.showLanguageNotification(homonym, notFound)
  }

  showStatusInfo (selectionText, languageID) {
    this.panel.showStatusInfo(selectionText, languageID)
    this.popup.showStatusInfo(selectionText, languageID)
  }

  showErrorInfo (errorText) {
    this.panel.showErrorInformation(errorText)
  }

  showImportantNotification (message) {
    this.panel.showImportantNotification(message)
    this.popup.showImportantNotification(message)
  }

  changeTab (tabName) {
    if (this.panel) {
      if (!this.tabState.hasOwnProperty(tabName)) {
        // Set tab to a default one if it is an unknown tab name
        tabName = this.tabStateDefault
      }
      this.panel.changeTab(tabName)
    } else {
      console.warn(`Cannot switch tab because panel does not exist`)
    }
    return this
  }

  setTargetRect (targetRect) {
    this.popup.setTargetRect(targetRect)
    return this
  }

  newLexicalRequest (languageID) {
    this.popup.newLexicalRequest()
    this.panel.panelData.inflectionsEnabled = ViewSetFactory.hasInflectionsEnabled(languageID)
    this.panel.panelData.inflectionsWaitState = true // Homonym is retrieved and inflection data is calculated
    this.panel.panelData.grammarAvailable = false
    this.clear().open().changeTab('definitions')
    return this
  }

  updateMorphology (homonym) {
    homonym.lexemes.sort(Lexeme.getSortByTwoLemmaFeatures(Feature.types.frequency, Feature.types.part))
    this.popup.lexemes = homonym.lexemes
    if (homonym.lexemes.length > 0) {
      // TODO we could really move this into the morph component and have it be calculated for each lemma in case languages are multiple
      this.popup.linkedFeatures = LanguageModelFactory.getLanguageModel(homonym.lexemes[0].lemma.languageID).grammarFeatures()
    }
    this.popup.popupData.morphDataReady = true
    this.panel.panelData.lexemes = homonym.lexemes
    this.popup.popupData.updates = this.popup.popupData.updates + 1
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
    this.popup.popupData.providers = Array.from(providers.keys())
  }

  /**
   * Updates grammar data with URLs supplied.
   * If no URLS are provided, will reset grammar data.
   * @param {Array} urls
   */
  updateGrammar (urls = []) {
    if (urls.length > 0) {
      this.panel.panelData.grammarRes = urls[0]
      this.panel.panelData.grammarAvailable = true
    } else {
      this.panel.panelData.grammarRes = { provider: this.l10n.messages.TEXT_NOTICE_GRAMMAR_NOTFOUND }
    }
    // todo show TOC or not found
  }

  updateDefinitions (homonym) {
    this.panel.panelData.fullDefinitions = ''
    this.panel.panelData.shortDefinitions = []
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
        this.panel.panelData.shortDefinitions.push(...lexeme.meaning.shortDefs)
        this.updateProviders(homonym)
      } else if (Object.entries(lexeme.lemma.features).length > 0) {
        definitions[lexeme.lemma.ID] = [new Definition('No definition found.', 'en-US', 'text/plain', lexeme.lemma.word)]
      }

      if (lexeme.meaning.fullDefs.length > 0) {
        this.panel.panelData.fullDefinitions += this.formatFullDefinitions(lexeme)
        hasFullDefs = true
      }
    }

    // Populate a popup
    this.popup.definitions = definitions
    this.popup.popupData.defDataReady = hasFullDefs
    this.popup.popupData.updates = this.popup.popupData.updates + 1
  }

  updateTranslations (homonym) {
    let translations = {}
    for (let lexeme of homonym.lexemes) {
      if (lexeme.lemma.translation !== undefined) {
        translations[lexeme.lemma.ID] = lexeme.lemma.translation
      }
    }
    this.popup.translations = translations
    this.popup.popupData.translationsDataReady = true
    this.popup.popupData.updates = this.popup.popupData.updates + 1
    this.updateProviders(homonym)
  }

  updatePageAnnotationData (data) {
    this.panel.panelData.treebankComponentData.data.page = data.treebank.page || {}
  }

  updateWordAnnotationData (data) {
    if (data && data.treebank) {
      this.panel.panelData.treebankComponentData.data.word = data.treebank.word || {}
      this.popup.popupData.hasTreebank = data.treebank.word
    } else {
      this.panel.panelData.treebankComponentData.data.word = {}
      this.popup.popupData.hasTreebank = false
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

    this.panel.requestGrammar({ type: 'table-of-contents', value: '', languageID: currentLanguageID })
    this.popup.popupData.inflDataReady = this.inflDataReady
    this.panel.panelData.currentLanguageID = currentLanguageID
    this.panel.panelData.infoComponentData.languageName = UIController.getLanguageName(currentLanguageID).name

    Vue.set(this.popup.popupData, 'currentLanguageName', UIController.getLanguageName(currentLanguageID).name)
    console.log(`Current language is ${this.state.currentLanguage}`)
  }

  updateVerboseMode () {
    this.state.setItem('verboseMode', this.contentOptions.items.verboseMode.currentValue === this.options.verboseMode)

    this.panel.panelData.verboseMode = (this.contentOptions.items.verboseMode.currentValue === this.options.verboseMode)
    this.popup.popupData.verboseMode = (this.contentOptions.items.verboseMode.currentValue === this.options.verboseMode)
  }

  updateLemmaTranslations () {
    if (this.contentOptions.items.enableLemmaTranslations.currentValue && !this.contentOptions.items.locale.currentValue.match(/en-/)) {
      this.state.setItem('lemmaTranslationLang', this.contentOptions.items.locale.currentValue)
    } else {
      this.state.setItem('lemmaTranslationLang', null)
    }
  }

  notifyInflectionBrowser () {
    this.panel.panelData.inflectionBrowserEnabled = true
  }

  updateInflections (homonym) {
    this.inflectionsViewSet = ViewSetFactory.create(homonym, this.contentOptions.items.locale.currentValue)

    this.panel.panelData.inflectionComponentData.inflectionViewSet = this.inflectionsViewSet
    if (this.inflectionsViewSet.hasMatchingViews) {
      this.addMessage(this.l10n.messages.TEXT_NOTICE_INFLDATA_READY)
    }
    this.panel.panelData.inflectionsWaitState = false
    this.panel.panelData.inflectionComponentData.inflDataReady = this.inflDataReady
    this.popup.popupData.inflDataReady = this.inflDataReady
  }

  lexicalRequestComplete () {
    this.popup.popupData.morphDataReady = true
    this.panel.panelData.inflBrowserTablesCollapsed = null // Reset inflection browser tables state
  }

  lexicalRequestSucceeded () {
    this.panel.panelData.inflectionsWaitState = false
  }

  lexicalRequestFailed () {
    this.panel.panelData.inflectionsWaitState = false
  }

  get inflDataReady () {
    return this.inflectionsViewSet && this.inflectionsViewSet.hasMatchingViews
  }

  clear () {
    this.panel.clearContent()
    this.popup.clearContent()
    return this
  }

  open () {
    if (this.contentOptions.items.uiType.currentValue === this.options.uiTypePanel) {
      this.panel.open()
    } else {
      if (this.panel.isOpen) { this.panel.close() }
      this.popup.open()
    }
    return this
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

    this.popup.popupData.classes.splice(0, this.popup.popupData.classes.length)
    this.panel.panelData.classes.splice(0, this.popup.popupData.classes.length)

    classes.forEach(classItem => {
      this.popup.popupData.classes.push(classItem)
      this.panel.panelData.classes.push(classItem)
    })
  }

  updateStyleClass (prefix, type) {
    let popupClasses = this.popup.popupData.classes.slice(0)

    popupClasses.forEach(function (item, index) {
      if (item.indexOf(prefix) === 0) {
        popupClasses[index] = `${prefix}${type}_class`
      }
    })

    this.popup.popupData.classes.splice(0, this.popup.popupData.classes.length)
    popupClasses.forEach(classItem => {
      this.popup.popupData.classes.push(classItem)
    })

    let panelClasses = this.panel.panelData.classes.slice(0)

    panelClasses.forEach(function (item, index) {
      if (item.indexOf(prefix) === 0) {
        panelClasses[index] = `${prefix}${type}_class`
      }
    })
    this.panel.panelData.classes.splice(0, this.panel.panelData.classes.length)

    panelClasses.forEach(classItem => {
      this.panel.panelData.classes.push(classItem)
    })
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
          langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
        })

        this.setTargetRect(htmlSelector.targetRect)
        this.newLexicalRequest(textSelector.languageID)
        this.message(this.l10n.messages.TEXT_NOTICE_DATA_RETRIEVAL_IN_PROGRESS)
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

  handleEscapeKey (event, nativeEvent) {
    // TODO: Move to keypress as keyCode is deprecated
    // TODO: Why does it not work on initial panel opening?
    if (nativeEvent.keyCode === 27 && this.state.isActive()) {
      if (this.state.isPanelOpen()) {
        this.panel.close()
      } else if (this.popup.visible) {
        this.popup.close()
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

  onLexicalQueryComplete (data) {
    switch (data.resultStatus) {
      case LexicalQuery.resultStatus.SUCCEEDED:
        this.lexicalRequestSucceeded()
        this.showLanguageInfo(data.homonym)
        this.addMessage(this.l10n.messages.TEXT_NOTICE_LEXQUERY_COMPLETE)
        this.lexicalRequestComplete()
        break
      case LexicalQuery.resultStatus.FAILED:
        this.lexicalRequestFailed()
        this.showLanguageInfo(data.homonym)
        this.addMessage(this.l10n.messages.TEXT_NOTICE_LEXQUERY_COMPLETE)
        this.lexicalRequestComplete()
        break
      default:
        // Request was probably cancelled
        this.lexicalRequestComplete()
    }
  }

  onMorphDataReady () {
    this.addMessage(this.l10n.messages.TEXT_NOTICE_MORPHDATA_READY)
  }

  onMorphDataNotFound () {
    this.addImportantMessage(this.l10n.messages.TEXT_NOTICE_MORPHDATA_NOTFOUND)
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

  onLemmaTranslationsReady (homonym) {
    this.updateTranslations(homonym)
  }

  onDefinitionsReady (data) {
    this.addMessage(this.l10n.messages.TEXT_NOTICE_DEFSDATA_READY.get(data.requestType, data.word))
    this.updateDefinitions(data.homonym)
  }

  onDefinitionsNotFound (data) {
    this.addMessage(this.l10n.messages.TEXT_NOTICE_DEFSDATA_NOTFOUND.get(data.requestType, data.word))
  }

  onResourceQueryComplete () {
    // We don't check result status for now. We always output the same message.
    this.addMessage(this.l10n.messages.TEXT_NOTICE_GRAMMAR_COMPLETE)
  }

  onGrammarAvailable (data) {
    this.addMessage(this.l10n.messages.TEXT_NOTICE_GRAMMAR_READY)
    this.updateGrammar(data.url)
  }

  onGrammarNotFound () {
    this.updateGrammar()
    this.addMessage(this.l10n.messages.TEXT_NOTICE_GRAMMAR_NOTFOUND)
  }

  onAnnotationsAvailable (data) {
    this.updatePageAnnotationData(data.annotations)
  }
}

/**
 * An instance of a warning panel that is shown when UI controller is disabled
 * because an Alpheios embedded lib is active on a page
 * @type {Vue | null}
 */
UIController.embedLibWarningInstance = null
