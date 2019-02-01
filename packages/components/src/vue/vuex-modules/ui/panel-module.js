import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Panel from '@/vue/components/panel.vue'

// TODO: Add a check for required modules
export default class PanelModule {
  constructor (store, api, options) {
    this.options = Object.assign(PanelModule.optionsDefaults, options)

    this.vi = new Vue({
      el: this.options.mountPoint,
      store: store, // Install store into the panel
      provide: api, // Public API of the modules for child components
      /*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       */
      api: api,
      components: {
        panel: Panel
      },
      data: {
        panelData: {
          tabs: options.tabs,
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
          treebankComponentData: {
            data: {
              word: {},
              page: {}

            },
            visible: false
          },
          classes: [], // Will be set later by `setRootComponentClasses()`
          styles: {
            zIndex: api.app.zIndex
          },
          minWidth: 400,
          wordUsageExamplesData: null
        },
        currentPanelComponent: this.options.panelComponent,
        classesChanged: 0
      },
      methods: {
        setPositionTo: function (position) {
          this.$options.api.settings.contentOptions.items.panelPosition.setValue(position)
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
          const statusAvailable = Boolean(this.$options.api.settings.contentOptions.items.verboseMode.currentValue === 'verbose')

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
            name = this.$options.api.app.defaultTab
          }
          this.panelData.tabs[name] = true
          this.$options.api.app.state.changeTab(name) // Reflect a tab change in a state
          return this
        },

        clearContent: function () {
          this.panelData.shortDefinitions = []
          this.panelData.fullDefinitions = ''
          this.panelData.messages = []
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
            languageName = this.$options.api.app.getLanguageName(homonym.languageID).name
          } else if (this.$store.state.app.currentLanguageName) {
            languageName = this.$store.state.app.currentLanguageName
          } else {
            languageName = this.$options.api.l10n.getMsg('TEXT_NOTICE_LANGUAGE_UNKNOWN') // TODO this wil be unnecessary when the morphological adapter returns a consistent response for erors
          }
          if (notFound) {
            this.panelData.notification.important = true
            this.panelData.notification.showLanguageSwitcher = true
            this.panelData.notification.text = this.$options.api.l10n.getMsg('TEXT_NOTICE_CHANGE_LANGUAGE', { languageName: languageName })
          } else {
            this.panelData.notification.visible = true
            this.panelData.notification.important = false
            this.panelData.notification.showLanguageSwitcher = false
          }
        },

        showStatusInfo: function (selectionText, languageID) {
          let langDetails = this.$options.api.app.getLanguageName(languageID)
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
          if (this.$options.api.app.state.isPanelOpen()) {
            this.close()
          } else {
            this.open()
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

PanelModule.publicName = 'panel'

PanelModule.store = () => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a panel is shown or hidden
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

PanelModule.optionsDefaults = {
  // A selector that specifies to what DOM element a panel will be mounted.
  // The element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-panel',

  // A name of the panel component defined in `components` section of a Vue instance.
  // This is a component that will be mounted.
  panelComponent: 'panel'
}
