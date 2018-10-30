/* global Event */
import { Lexeme, Feature, Definition, LanguageModelFactory, Constants } from 'alpheios-data-models'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import { Lexicons } from 'alpheios-lexicon-client'
import { Grammars } from 'alpheios-res-client'
import { LemmaTranslations } from 'alpheios-lemma-client'
import { ViewSetFactory } from 'alpheios-inflection-tables'
// import {ObjectMonitor as ExpObjMon} from 'alpheios-experience'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

// A panel component
import Panel from '@/vue-components/panel.vue'
// A popup component
import Popup from '@/vue-components/popup.vue'

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
   * @param {UIStateAPI} state - An object to store a UI state.
   * @param {Object} storageAdapter - A storage adapter for storing options (see `lib/options`). Is environment dependent.
   * @param {Object} options - UI controller options, an object with the following props
   * (if not specified, will be set to default):
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
   * @param {Object} manifest - parent application info details  (API definition pending)
   * In some environments manifest data may not be available. Then a `{}` default value
   * will be used.
   * @param {Object} template - object with the following properties:
   *                            html: HTML string for the container of the Alpheios components
   *                            panelId: the id of the wrapper for the panel component,
   *                            panelComponent: Vue single file component of a panel element.
   *                              Allows to provide an alternative panel layout
   *                            popupId: the id of the wrapper for the popup component
   *                            popupComponent: Vue single file component of a panel element.
   *                              Allows to provide an alternative popup layout
   */
  constructor (state, storageAdapter, options = {}, manifest = {}, template = {}) {
    this.state = state
    this.storageAdapter = storageAdapter
    this.contentOptions = new Options(ContentOptionDefaults, this.storageAdapter)
    this.resourceOptions = new Options(LanguageOptionDefaults, this.storageAdapter)
    this.uiOptions = new Options(UIOptionDefaults, this.storageAdapter)
    this.siteOptions = null // Will be set during an `init` phase

    // Default values for options
    const optionsDefaults = {
      openPanel: this.uiOptions.items.panelOnActivate.currentValue,
      textQueryTrigger: 'dblClick',
      textQuerySelector: 'body',
      uiTypePanel: 'panel',
      uiTypePopup: 'popup',
      verboseMode: 'verbose',
      enableLemmaTranslations: false
    }

    this.options = Object.assign({}, optionsDefaults, options)

    this.irregularBaseFontSizeClassName = 'alpheios-irregular-base-font-size'
    this.irregularBaseFontSize = !UIController.hasRegularBaseFontSize()
    this.manifest = manifest
    const templateDefaults = {
      html: Template,
      panelId: 'alpheios-panel',
      panelComponents: {
        panel: Panel
      },
      defaultPanelComponent: 'panel',
      popupId: 'alpheios-popup',
      popupComponents: {
        popup: Popup
      },
      defaultPopupComponent: 'popup',
      draggable: true,
      resizable: true
    }
    this.template = Object.assign(templateDefaults, template)
    this.isInitialized = false
    this.isActivated = false
    this.isDeactivated = false

    this.inflectionsViewSet = null // Holds inflection tables ViewSet
  }

  static get defaults () {
    return {
      irregularBaseFontSizeClassName: 'alpheios-irregular-base-font-size'
    }
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
    this.maAdapter = new AlpheiosTuftsAdapter() // Morphological analyzer adapter, with default arguments

    // Inject HTML code of a plugin. Should go in reverse order.
    document.body.classList.add('alpheios')
    let container = document.createElement('div')
    document.body.insertBefore(container, null)
    container.outerHTML = this.template.html

    await Promise.all(optionLoadPromises)
    // All options shall be loaded at this point. Can initialize Vue components that will use them

    // Initialize components
    this.panel = new Vue({
      el: `#${this.template.panelId}`,
      components: this.template.panelComponents,
      data: {
        panelData: {
          isOpen: false,
          tabs: {
            definitions: false,
            inflections: false,
            status: false,
            options: false,
            info: true,
            treebank: false
          },
          verboseMode: this.options.verboseMode,
          grammarAvailable: false,
          grammarRes: {},
          lexemes: [],
          inflectionComponentData: {
            visible: false,
            inflectionViewSet: null
          },
          inflectionsWaitState: false,
          inflectionsEnabled: false,
          // Whether inflection browser is enabled for a language. We always show an inflection browser for now.
          inflectionBrowserEnabled: false,
          // Whether all table in an inflection browser should be collapsed
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
            manifest: this.manifest,
            languageName: UIController.getLanguageName(this.state.currentLanguage)
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
            languageName: ''
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
          l10n: this.l10n
        },
        state: this.state,
        options: this.contentOptions,
        resourceOptions: this.resourceOptions,
        currentPanelComponent: this.template.defaultPanelComponent,
        uiController: this,
        classesChanged: 0
      },
      methods: {
        isOpen: function () {
          return this.state.isPanelOpen()
        },

        open: function () {
          if (!this.state.isPanelOpen()) {
            this.panelData.isOpen = true
            this.state.setPanelOpen()
          }
          return this
        },

        close: function () {
          if (!this.state.isPanelClosed()) {
            this.panelData.isOpen = false
            this.state.setPanelClosed()
          }
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
            languageName = UIController.getLanguageName(homonym.languageID)
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
          this.panelData.status.languageName = UIController.getLanguageName(languageID)
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
            uiController: this.uiController,
            grammars: Grammars
          }).getData()
          //, {
          // experience: 'Get resource',
          //  actions: [
          //    { name: 'getData', action: ExpObjMon.actions.START, event: ExpObjMon.events.GET },
          //    { name: 'finalize', action: ExpObjMon.actions.STOP, event: ExpObjMon.events.GET }
          // ]
          // }).getData()
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
      el: `#${this.template.popupId}`,
      components: this.template.popupComponents,
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

          draggable: this.template.draggable,
          resizable: this.template.resizable,
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
          verboseMode: this.options.verboseMode,
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
            languageName: ''
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
        currentPopupComponent: this.template.defaultPopupComponent,
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
            languageName = UIController.getLanguageName(homonym.languageID)
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
          this.popupData.status.languageName = UIController.getLanguageName(languageID)
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
    if (this.options.textQueryTrigger !== 'none') { this.addTextQueryListener(this.options.textQueryTrigger, this.options.textQuerySelector) }
    document.addEventListener('keydown', this.handleEscapeKey.bind(this))
    document.body.addEventListener('Alpheios_Page_Load', this.updateAnnotations.bind(this))

    this.state.activateUI()

    // Update panel on activation
    if (this.options.openPanel && !this.panel.isOpen()) {
      /**
       * Without this, the panel will close immediately after opening.
       * Probably this is a matter of timing between state updates.
       * Shall be solved during state refactoring.
       */
      setTimeout(() => this.panel.open(), 0)
    }
    this.isActivated = true
    this.isDeactivated = false
    this.state.activate()

    return this
  }

  addTextQueryListener (trigger, selector = 'body') {
    if (trigger === 'dblClick') {
      MouseDblClick.listen(selector, evt => this.getSelectedText(evt))
    } else if (trigger === 'longTap') {
      LongTap.listen(selector, evt => this.getSelectedText(evt))
    } else {
      GenericEvt.listen(selector, (evt) => this.getSelectedText(evt), trigger)
    }
  }

  /**
   * Deactivates a UI controller. May unload some resources to preserve memory.
   * In this case an `activate()` method will be responsible for restoring them.
   * @returns {Promise<UIController>}
   */
  async deactivate () {
    if (this.isDeactivated) { return `Already deactivated` }

    // TODO: probably need to remove event listeners here

    this.popup.close()
    this.panel.close()
    this.isActivated = false
    this.isDeactivated = true
    this.state.deactivate()

    return this
  }

  /**
   * Load site-specific settings
   */
  loadSiteOptions () {
    let allSiteOptions = []
    for (let site of SiteOptions) {
      for (let domain of site.options) {
        let siteOpts = new Options(domain, this.storageAdapter)
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
   * Gets language name by either language ID (a symbol) or language code (string)
   * @param {symbol|string} language - Either language ID or language code (see constants in `data-models` for definitions)
   * @return {string} A language name
   */
  static getLanguageName (language) {
    let langID
    let langCode // eslint-disable-line
    // Compatibility code in case method be called with languageCode instead of ID. Remove when not needed
    ;({ languageID: langID, languageCode: langCode } = LanguageModelFactory.getLanguageAttrs(language))
    return languageNames.has(langID) ? languageNames.get(langID) : ''
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
    this.panel.changeTab(tabName)
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
    this.panel.panelData.inflBrowserTablesCollapsed = true // Collapse all inflection tables in a browser
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

  updateGrammar (urls) {
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
    this.state.setItem('currentLanguage', LanguageModelFactory.getLanguageCodeFromId(currentLanguageID))

    this.panel.requestGrammar({ type: 'table-of-contents', value: '', languageID: currentLanguageID })
    this.popup.popupData.inflDataReady = this.inflDataReady

    this.panel.panelData.infoComponentData.languageName = UIController.getLanguageName(currentLanguageID)

    Vue.set(this.popup.popupData, 'currentLanguageName', UIController.getLanguageName(currentLanguageID))
    console.log(`Current language is ${this.state.currentLanguage}`)
  }

  updateVerboseMode () {
    this.state.setItem('verboseMode', this.contentOptions.items.verboseMode.currentValue === this.options.verboseMode)
    this.panel.panelData.verboseMode = this.options.verboseMode
    this.popup.popupData.verboseMode = this.options.verboseMode
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
    this.popup.popupData.inflDataReady = this.inflDataReady
  }

  lexicalRequestComplete () {
    this.panel.panelData.inflBrowserTablesCollapsed = null // Reset inflection browser tables state
    this.popup.popupData.morphDataReady = true
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
      classes.push(this.constructor.defaults.irregularBaseFontSizeClassName)
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

        LexicalQuery.create(textSelector, {
          htmlSelector: htmlSelector,
          uiController: this,
          maAdapter: this.maAdapter,
          lexicons: Lexicons,
          resourceOptions: this.resourceOptions,
          siteOptions: [],
          lemmaTranslations: this.enableLemmaTranslations(textSelector) ? { adapter: LemmaTranslations, locale: this.contentOptions.items.locale.currentValue } : null,
          langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
        }).getData()
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

  handleEscapeKey (event) {
    // TODO: Move to keypress as keyCode is deprecated
    // TODO: Why does it not work on initial panel opening?
    if (event.keyCode === 27 && this.state.isActive()) {
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
        uiController: this,
        document: document,
        siteOptions: this.siteOptions
      }).getData()
    }
  }
}
