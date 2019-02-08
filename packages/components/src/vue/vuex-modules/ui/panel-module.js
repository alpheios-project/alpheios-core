import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Panel from '@/vue/components/panel.vue'
import CompactPanel from '@/vue/components/panel-compact.vue'

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
        panel: Panel, // A desktop version of a panel
        compactPanel: CompactPanel // A mobile version of a panel
      },
      data: {
        panelData: {
          lexemes: [],
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
          classes: [] // Will be set later by `setRootComponentClasses()`
        },
        currentPanelComponent: this.options.panelComponent
      },
      methods: {
        clearContent: function () {
          this.panelData.shortDefinitions = []
          this.panelData.fullDefinitions = ''
          this.panelData.messages = []
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
  // This element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-panel',

  // A name of the panel component defined in `components` section of a Vue instance.
  // This is a component that will be mounted.
  panelComponent: 'panel'
}
