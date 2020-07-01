import Platform from '@/lib/utility/platform.js'
import HTMLPage from '@/lib/utility/html-page.js'
import { Logger } from 'alpheios-data-models'

/**
 * A UI controller class is responsible for coordination between all UI components,
 * such as Panel, Popup, Action Panel, and so on.
 * A UI controller is a part of a higher-level app controller.
 */
export default class UIController {
  constructor ({ uiState, platform, queryParams = {}, overrideHelp = false } = {}) {
    if (!platform) {
      throw new Error('No platform data provided for a UI controller')
    }

    if (!uiState) {
      throw new Error('No UI state data provided for a UI controller')
    }

    /**
     * An object with information about an app environment.
     *
     * @type {Platform}
     */
    this._platform = platform

    /**
     * An object with parsed query parameters (if any).
     *
     * @type {QueryParams}
     */
    this._queryParams = queryParams

    /**
     * The UI state object contains a current state of the UI: whether a UI is activated or not,
     * whether a panel is open or closed, whether a popup is visible, etc.
     * It must have an API compatible with a UIStateAPI.
     *
     * Usually it is provided by a client from the outside of the app (i.e. by a webextenstion or an embed lib).
     * A UI controller must follow a state of a `uiState` and make matching changes to the UI, if necessary.
     * On the other hand, whenever a UI state is changed by user actions, this state must be
     * reflected in the UI state object.
     *
     * @type {UIStateAPI}
     */
    this._uiState = uiState

    /**
     * A map that holds instances of UI _modules of an application.
     *
     * @type {Map<string, Module>}
     */
    this._modules = new Map()

    /**
     * Holds a shard app-wide API object
     *
     * @type {object}
     * @private
     */
    this._api = {}

    // A shared Vuex store object
    this._store = null

    // An object that stores config settings of a controller
    this._config = {
      overrideHelp
    }

    // Options that are shown in a UI section of a Settings tab of the panel and control the visual representation
    this._uiOptions = null

    this.TAB_NAMES_DEFAULT = this._config.overrideHelp ? 'settings' : 'info'
    this.TAB_NAMES_DISABLED = 'disabled'
  }

  init ({ api, store, uiOptions } = {}) {
    if (!api) {
      throw new Error('API object is required for a UI controller initialization')
    }
    if (!store) {
      throw new Error('Vuex store is required for a UI controller initialization')
    }
    if (!uiOptions) {
      throw new Error('UI options are required for a UI controller initialization')
    }

    this._api = api
    this._store = store
    this._uiOptions = uiOptions

    // region Public API of a UI controller
    // A public API must be defined before modules are created because modules may use it
    this._api.ui = {
      zIndex: HTMLPage.getZIndexMax(),
      hasModule: this.hasModule.bind(this),
      getModule: this.getModule.bind(this),
      registerModule: this.registerModule.bind(this),
      open: this.open.bind(this),
      openPanel: this.openPanel.bind(this),
      closePanel: this.closePanel.bind(this),
      showPanelTab: this.showPanelTab.bind(this),
      changeTab: this.changeTab.bind(this),
      togglePanelTab: this.togglePanelTab.bind(this),
      openPopup: this.openPopup.bind(this),
      closePopup: this.closePopup.bind(this),
      isPopupVisible: () => Boolean(this.hasModule('popup') && this._store.state.popup.visible),
      openToolbar: this.openToolbar.bind(this),
      openActionPanel: this.openActionPanel.bind(this),
      closeActionPanel: this.closeActionPanel.bind(this),
      toggleActionPanel: this.toggleActionPanel.bind(this),
      setFontSize: this.setFontSize.bind(this)
    }
    // endregion Public API of a UI controller

    // region Vuex store module
    this._store.registerModule('ui', {
      // All stores of modules are namespaced
      namespaced: true,

      state: {
        activeTab: this.TAB_NAMES_DEFAULT, // A currently selected panel's tab
        disabledTab: this.TAB_NAMES_DISABLED,
        overrideHelp: this._config.overrideHelp,

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
    // endregion Vuex store module

    // Set options of _modules before _modules are created
    if (this.hasModule('popup')) {
      let popupOptions = this._modules.get('popup').options // eslint-disable-line prefer-const
      popupOptions.initialShift = {
        x: this._uiOptions.items.popupShiftX.currentValue,
        y: this._uiOptions.items.popupShiftY.currentValue
      }
    }

    if (this.hasModule('toolbar')) {
      let toolbarOptions = this._modules.get('toolbar').options // eslint-disable-line prefer-const
      toolbarOptions.initialShift = {
        x: this._uiOptions.items.toolbarShiftX.currentValue,
        y: this._uiOptions.items.toolbarShiftY.currentValue
      }
    }

    this.createModules()

    // Adjust configuration of _modules according to feature options
    if (this.hasModule('panel')) {
      this._store.commit('panel/setPosition', this._uiOptions.items.panelPosition.currentValue)
    }

    this.setFontSize(this._uiOptions)
  }

  activate () {
    this._uiState.activate()
    this.activateModules()
    this._uiState.activateUI()

    if (this.hasModule('panel')) {
      if (this._uiState.isPanelStateDefault() || !this._uiState.isPanelStateValid()) {
        this._uiState.setPanelClosed()
      }
      if (this._uiState.isPanelOpen()) {
        this.openPanel(true)
      }
    }

    if (this._uiState.tab) {
      if (this._uiState.isTabStateDefault()) {
        this._uiState.tab = this.TAB_NAMES_DEFAULT
      }
      this.changeTab(this._uiState.tab)
    }
  }

  deactivate () {
    this.deactivateModules()
    if (this.hasModule('popup')) { this.closePopup() }
    if (this.hasModule('panel')) { this.closePanel(false) } // Close panel without updating it's state so the state can be saved for later reactivation
  }

  /**
   * Registers a module for use by an app controller and other _modules.
   * It instantiates each module and adds them to the registered _modules store.
   *
   * @param {Module} moduleClass - A data module's class (i.e. the constructor function).
   * @param {object} options - Arbitrary number of values that will be passed to the module constructor.
   * @returns {UIController} - A self reference for chaining.
   */
  registerModule (moduleClass, options = {}) {
    if (moduleClass.isSupportedPlatform(this._platform)) {
      // Add query parameters and platform info to module's options
      options.queryParams = this._queryParams
      options.platform = this._platform
      this._modules.set(moduleClass.moduleName, { ModuleClass: moduleClass, options, instance: null })
    } else {
      Logger.getInstance().warn(`Skipping registration of a ${moduleClass.moduleName} UI module because it does not support a ${this._platform.deviceType} type of devices`)
    }
    return this
  }

  createModules () {
    this._modules.forEach((m) => {
      m.instance = new m.ModuleClass(this._store, this._api, m.options)
    })
  }

  hasModule (moduleName) {
    return this._modules.has(moduleName)
  }

  getModule (moduleName) {
    if (this.hasModule(moduleName)) {
      return this._modules.get(moduleName).instance
    } else {
      throw new Error(`UI controller has no ${moduleName} module`)
    }
  }

  activateModules () {
    this._modules.forEach(m => m.instance.activate())
  }

  deactivateModules () {
    this._modules.forEach(m => m.instance.deactivate())
  }

  setFontSize () {
    const FONT_SIZE_PROP = '--alpheios-base-text-size'
    try {
      document.documentElement.style.setProperty(FONT_SIZE_PROP,
        `${this._uiOptions.items.fontSize.currentValue}px`)
    } catch (error) {
      Logger.getInstance().error(`Cannot change a ${FONT_SIZE_PROP} custom prop:`, error)
    }
  }

  open () {
    if (this.hasModule('panel') && this._platform.isMobile) {
      // This is a compact version of a UI
      this.openPanel()
      this.changeTab('morphology')
    } else {
      if (this.hasModule('panel') && this._uiState.isPanelOpen()) { this.closePanel() }
      if (this.hasModule('popup')) { this.openPopup() }
    }
    return this
  }

  /**
   * Opens a panel. Used from a content script upon a panel status change request.
   *
   * @param {boolean} forceOpen - Whether to open a panel no matter in what stat it is.
   */
  openPanel (forceOpen = false) {
    if (this.hasModule('panel')) {
      if (forceOpen || !this._uiState.isPanelOpen()) {
        // If an active tab has been disabled previously, set it to a default one
        if (this._store.getters['ui/isActiveTab'](this.TAB_NAMES_DISABLED)) {
          this.changeTab(this.TAB_NAMES_DEFAULT)
        }
        this._store.commit('panel/open')
        this._uiState.setPanelOpen()
      }
      if (this.hasModule('toolbar')) {
        // Close a toolbar when a panel opens
        this._store.commit('toolbar/close')
      }
    }
  }

  /**
   * Closes a panel. Used from a content script upon a panel status change request.
   *
   * @param syncState
   */
  closePanel (syncState = true) {
    if (this.hasModule('panel')) {
      this._store.commit('panel/close')
      this._store.commit('ui/resetActiveTab')
      if (syncState) { this._uiState.setPanelClosed() }
      // Open a toolbar when a panel closes. Do not open if the toolbar is deactivated.
      if (this.hasModule('toolbar') && this.getModule('toolbar').isActivated) {
        this._store.commit('toolbar/open')
      }
    }
  }

  /**
   * Opens a panel and switches tab to the one specified.
   *
   * @param {string} tabName - A name of a tab to switch to.
   * @returns {UIController} - An app controller's instance reference, for chaining.
   */
  showPanelTab (tabName) {
    this.changeTab(tabName)
    this.openPanel()

    return this
  }

  /**
   * Switched between tabs in a panel.
   * All tab switching should be done through this function only as it performs safety check
   * regarding wither or not current tab can be available.
   *
   * @param {string} tabName - A name of a tab to switch to.
   * @returns {UIController} - An instance of an app controller, for chaining.
   */
  changeTab (tabName) {
    // If tab is disabled, switch to a default one
    if (this.isDisabledTab(tabName)) {
      Logger.getInstance().warn(`Attempting to switch to a ${tabName} tab which is not available`)
      tabName = this.TAB_NAMES_DEFAULT
    }
    this._store.commit('ui/setActiveTab', tabName) // Reflect a tab change in a state
    // This is for compatibility with watchers in webextension that track tab changes
    // and sends this into to a background script
    this._uiState.changeTab(tabName)

    if (tabName === 'treebank') {
      // We need to refresh a treebank view if its tab becomes visible. Otherwise a view may not be displayed correctly
      this._api.lexis.refreshTreebankView()
    }
    const isPortrait = this._store.state.panel && (this._store.state.panel.orientation === Platform.orientations.PORTRAIT)

    if (['inflections', 'inflectionsbrowser', 'wordUsage'].includes(tabName) && this._platform.isMobile && isPortrait) {
      const message = this._api.l10n.getMsg('HINT_LANDSCAPE_MODE')
      this._store.commit('ui/setHint', message, tabName)
    } else if (this._api.app.isMousemoveForced()) {
      this._store.commit('ui/setHint', this._api.l10n.getMsg('TEXT_HINT_MOUSE_MOVE'))
    } else {
      this._store.commit('ui/resetHint')
    }
    return this
  }

  /**
   * Reverses the current visibility state of a panel and switches it to the tab specified.
   *
   * @param {string} tabName - A name of a tab to switch to.
   * @returns {UIController} - An app controller's instance reference, for chaining.
   */
  togglePanelTab (tabName) {
    if (this._store.state.ui.activeTab === tabName) {
      // If clicked on the tab matching a currently selected tab, close the panel
      if (this._uiState.isPanelOpen()) {
        this._api.ui.closePanel()
      } else {
        this.openPanel()
      }
    } else {
      if (!this.isDisabledTab(tabName)) {
        // Do not switch to a tab and do not open a panel if a tab is disabled.
        this.changeTab(tabName)
        if (!this._uiState.isPanelOpen()) {
          this.openPanel()
        }
      }
    }
    return this
  }

  /**
   * Checks wither a given tab is disabled.
   *
   * @param {string} tabName - A tab name  to be checked.
   * @returns {boolean} - True if the given tab is disabled,
   *         false otherwise (including if we have no disabling conditions on this tab).
   */
  isDisabledTab (tabName) {
    /**
     * A structure that defines availability condition for panel's tabs.
     * The key is a tab name, and a value is the function that returns true if the tab is available.
     */
    const tabsCheck = {
      definitions: () => this._store.getters['app/fullDefDataReady'],
      inflections: () => this._store.state.app.hasInflData,
      treebank: () => this._store.state.lexis.hasTreebankData,
      wordUsage: () => this._store.state.app.wordUsageExampleEnabled,
      status: () => this._api.settings.getUiOptions().items.verboseMode.currentValue === 'verbose',
      wordlist: () => this._store.state.app.hasWordListsData
    }
    return tabsCheck.hasOwnProperty(tabName) && !tabsCheck[tabName]() // eslint-disable-line no-prototype-builtins
  }

  openPopup () {
    if (this.hasModule('popup')) {
      this._store.commit('popup/open')
    }
  }

  closePopup () {
    if (this.hasModule('popup')) {
      this._store.commit('popup/close')
    }
  }

  openToolbar () {
    if (this.hasModule('toolbar')) {
      this._store.commit('toolbar/open')
    } else {
      Logger.getInstance().warn('Toolbar cannot be opened because its module is not registered')
    }
  }

  /**
   * Opens an action panel.
   *
   * @param {object} panelOptions - An object that specifies parameters of an action panel (see below):
   * @param {boolean} panelOptions.showLookup - Whether to show a lookup input when the action panel is opened.
   * @param {boolean} panelOptions.showNav - Whether to show a nav toolbar when the action panel is opened.
   */
  openActionPanel (panelOptions = {}) {
    if (this.hasModule('actionPanel')) {
      this._store.commit('actionPanel/open', panelOptions)
    } else {
      Logger.getInstance().warn('Action panel cannot be opened because its module is not registered')
    }
  }

  closeActionPanel () {
    if (this.hasModule('actionPanel')) {
      this._store.commit('actionPanel/close')
    } else {
      Logger.getInstance().warn('Action panel cannot be closed because its module is not registered')
    }
  }

  toggleActionPanel () {
    if (this.hasModule('actionPanel')) {
      this._store.state.actionPanel.visible
        ? this._store.commit('actionPanel/close')
        : this._store.commit('actionPanel/open', {})
    } else {
      Logger.getInstance().warn('Action panel cannot be toggled because its module is not registered')
    }
  }
}
