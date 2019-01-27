import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Panel from '@/vue/components/panel.vue'
import { getLanguageName } from '@/lib/utility/language-names.js'

// TODO: Add a check for required modules
export default class PanelModule {
  constructor (store, api, options) {
    // TODO: Direct links to a UI controller is a temporary solution for compatibility with older code
    const uiController = options.uiController
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
      uiController: uiController, // TODO: Remove during refactoring
      components: {
        panel: Panel
      },
      data: {
        panelData: {
          tabs: options.tabs,
          verboseMode: uiController.contentOptions.items.verboseMode.currentValue === uiController.options.verboseMode,
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
          infoComponentData: {
            appInfo: uiController.options.app,
            // A string containing a language name
            languageName: getLanguageName(uiController.state.currentLanguage).name
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
          settings: uiController.contentOptions.items,
          treebankComponentData: {
            data: {
              word: {},
              page: {}

            },
            visible: false
          },
          classes: [], // Will be set later by `setRootComponentClasses()`
          styles: {
            zIndex: uiController.zIndex
          },
          minWidth: 400,
          auth: uiController.auth,
          wordUsageExamplesData: null
        },
        state: uiController.state,
        options: uiController.contentOptions,
        currentPanelComponent: uiController.options.template.defaultPanelComponent,
        uiController: uiController,
        classesChanged: 0
      },
      methods: {
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
            name = this.$options.uiController.tabStateDefault
          }
          this.panelData.tabs[name] = true
          this.state.changeTab(name) // Reflect a tab change in a state
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
            languageName = getLanguageName(homonym.languageID).name
          } else if (this.panelData.infoComponentData.languageName) {
            languageName = this.panelData.infoComponentData.languageName.name
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
          let langDetails = getLanguageName(languageID)
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
          this.$options.uiController.startResourceQuery(feature)
        },

        settingChange: function (name, value) {
          console.log('Change inside instance', name, value)
          // TODO we need to refactor handling of boolean options
          if (name === 'enableLemmaTranslations' || name === 'enableWordUsageExamples' || name === 'wordUsageExamplesMax') {
            this.options.items[name].setValue(value)
          } else {
            this.options.items[name].setTextValue(value)
          }
          switch (name) {
            case 'locale':
              if (this.$options.uiController.presenter) {
                this.$options.uiController.presenter.setLocale(this.options.items.locale.currentValue)
              }
              this.$options.uiController.updateLemmaTranslations()
              break
            case 'preferredLanguage':
              this.$options.uiController.updateLanguage(this.options.items.preferredLanguage.currentValue)
              break
            case 'verboseMode':
              this.$options.uiController.updateVerboseMode()
              break
            case 'enableLemmaTranslations':
              this.$options.uiController.updateLemmaTranslations()
              break
          }
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
  mountPoint: '#alpheios-panel'
}
