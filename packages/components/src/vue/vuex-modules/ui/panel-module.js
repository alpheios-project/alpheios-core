import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Panel from '@/vue/components/panel.vue'
import { getLanguageName } from '@/lib/utility/language-names.js'

export default class PopupModule {
  constructor (store, api, uiController) {
    this._uiController = uiController
    this.vi = new Vue({
      el: `#${this.options.template.panelId}`,
      store: this.store, // Install store into the panel
      provide: this.api, // Public API of the modules for child components
      /*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       */
      api: this.api,
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
            languageName: getLanguageName(this.state.currentLanguage)
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
          this.uiController.message(this.$options.api.l10n.getMsg('TEXT_NOTICE_RESOURCE_RETRIEVAL_IN_PROGRESS'))
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
  }
}
