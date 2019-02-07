import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Popup from '@/vue/components/popup.vue'

// TODO: Add a check for required modules
export default class PopupModule {
  constructor (store, api, options) {
    // TODO: Direct links to a UI controller is a temporary solution for compatibility with older code
    this.options = Object.assign(PopupModule.optionsDefaults, options)

    this.vi = new Vue({
      el: this.options.mountPoint,
      store: store,
      provide: api, // Expose APIs to child components
      /*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       */
      api: api,
      components: {
        popup: Popup
      },
      data: {
        messages: [],
        lexemes: [],
        definitions: {},

        translations: {},

        linkedFeatures: [],
        popupData: {
          fixedPosition: true, // Whether to put popup into a fixed position or calculate that position dynamically
          // Default popup position, with units
          top: '10vh',
          left: '10vw',

          draggable: this.options.draggable,
          resizable: this.options.resizable,
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
          defDataReady: false,
          morphDataReady: false,

          translationsDataReady: false,

          showProviders: false,
          updates: 0,
          classes: [], // Will be set later by `setRootComponentClasses()`
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
          styles: {
            zIndex: api.app.zIndex
          }
        },
        currentPopupComponent: this.options.popupComponent,
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
            languageName = this.$options.api.app.getLanguageName(homonym.languageID).name
          } else if (this.$store.state.app.currentLanguageName) {
            languageName = this.$store.state.app.currentLanguageName
          } else {
            // TODO this wil be unnecessary when the morphological adapter returns a consistent response for erors
            languageName = this.$options.api.l10n.getMsg('TEXT_NOTICE_LANGUAGE_UNKNOWN')
          }
          if (notFound) {
            this.popupData.notification.important = true
            this.popupData.notification.showLanguageSwitcher = true
            this.popupData.notification.text = this.$options.api.l10n.getMsg('TEXT_NOTICE_CHANGE_LANGUAGE', { languageName: languageName })
          } else {
            this.popupData.notification.important = false
            this.popupData.notification.showLanguageSwitcher = false
          }
        },

        showStatusInfo: function (selectionText, languageID) {
          let langDetails = this.$options.api.app.getLanguageName(languageID)
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
          if (this.$options.api.ui.hasModule('panel')) {
            this.$options.api.ui.getModule('panel').vi.panelData.inflBrowserTablesCollapsed = true // Collapse all inflection tables in a browser
          }
        },

        clearContent: function () {
          this.definitions = {}
          this.translations = {}

          this.lexemes = []
          this.popupData.providers = []
          this.popupData.defDataReady = false
          this.popupData.morphDataReady = false

          this.popupData.translationsDataReady = false

          this.popupData.showProviders = false
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

        showPanelTab: function (tabName) {
          this.$options.api.app.changeTab(tabName)
          this.$options.api.ui.openPanel()
          return this
        },
        sendFeature: function (feature) {
          if (this.$options.api.ui.hasModule('panel')) {
            const panel = this.$options.api.ui.getModule('panel')
            this.$options.api.app.startResourceQuery(feature)
            // panel.vi.requestGrammar(feature)
            panel.vi.changeTab('grammar')
            this.$options.api.ui.openPanel()
          }
          return this
        }
      }
    })
  }

  get publicName () {
    return this.constructor.publicName || `Module's name is not defined`
  }
}

PopupModule.publicName = 'popup'

PopupModule.store = () => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a popup is displayed
      visible: false
    },
    mutations: {
      /**
       * Opens a panel
       * @param state
       */
      open (state) {
        state.visible = true
      },

      /**
       * Closes a panel
       * @param state
       */
      close (state) {
        state.visible = false
      }
    }
  }
}

PopupModule.optionsDefaults = {
  // A selector that specifies to what DOM element a popup will be mounted.
  // This element will be replaced with the root element of the popup component.
  mountPoint: '#alpheios-popup',

  // A name of the popup component defined in `components` section of a Vue instance.
  // This is a component that will be mounted.
  popupComponent: 'popup',

  // Whether a popup can be dragged and resized
  draggable: true,
  resizeable: true
}