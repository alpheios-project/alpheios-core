/* eslint-env jest */
import UIController from '@comp/lib/controllers/ui-controller.js'
import Platform from '@comp/lib/utility/platform.js'
import PanelModule from '@comp/vue/vuex-modules/ui/panel-module.js'
import PopupModule from '@comp/vue/vuex-modules/ui/popup-module.js'
import ToolbarModule from '@comp/vue/vuex-modules/ui/toolbar-module.js'
import ActionPanelModule from '@comp/vue/vuex-modules/ui/action-panel-module.js'
import BaseTestHelp from '@compTests/helpclasses/base-test-help.js'

describe('UIController', () => {
  let uiC, uiState, desktopPlatform, mobilePlatform, store, api, appAPI, settingsAPI, l10nAPI, authAPI, lexisAPI
  const baseStoreModules = ['app', 'auth', 'lexis', 'settings']

  const getUiController = (options) => {
    // eslint-disable-next-line prefer-const
    let uiC = new UIController(options)
    /*
    Recursive traversing of all HTML element in a Jest environment is slow. It could take up to
    the thousands of milliseconds. Because of this, an original method should be replaced with the fast mock.
     */
    uiC._getZIndexMax = () => 2000
    return uiC
  }

  beforeAll(() => {
    uiState = BaseTestHelp.createUIState()
    desktopPlatform = new Platform()
    desktopPlatform.deviceType = Platform.deviceTypes.DESKTOP // Requires desktop to be able to register the popup module
    mobilePlatform = new Platform()
    mobilePlatform.deviceType = Platform.deviceTypes.MOBILE
    settingsAPI = BaseTestHelp.settingsAPI()
    appAPI = BaseTestHelp.appAPI()
    l10nAPI = BaseTestHelp.l10nAPI()
    authAPI = BaseTestHelp.appAPI()
  })

  beforeEach(() => {
    store = BaseTestHelp.baseVuexStore(baseStoreModules)
    api = {
      app: appAPI,
      settings: settingsAPI,
      l10n: l10nAPI,
      auth: authAPI,
      lexis: lexisAPI
    }
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('UIController - constructor: should create an instance with default arguments', () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    expect(uiC.TAB_NAMES_DEFAULT).toBe(UIController.tabNames.DEFAULT)
  })

  it('UIController - constructor: should create an instance with overrideHelp on', () => {
    uiC = getUiController({ uiState, platform: desktopPlatform, overrideHelp: true })
    expect(uiC.TAB_NAMES_DEFAULT).toBe(UIController.tabNames.DEFAULT_HELP_OVERRIDDEN)
  })

  it('UIController - constructor: should throw an error if called with no uiState parameter', () => {
    const errMessage = 'No UI state data provided for a UI controller'
    expect(() => getUiController({ platform: desktopPlatform })).toThrowError(errMessage)
  })

  it('UIController - constructor: should throw an error if called with no platform parameter', () => {
    const errMessage = 'No platform data provided for a UI controller'
    expect(() => getUiController({ uiState })).toThrowError(errMessage)
  })

  it('UIController - init: must define a public UI API', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })
    expect(api.ui).toEqual({
      hasModule: expect.any(Function),
      getModule: expect.any(Function),
      registerModule: expect.any(Function),
      openLexQueryUI: expect.any(Function),
      closeUI: expect.any(Function),
      openPanel: expect.any(Function),
      closePanel: expect.any(Function),
      showPanelTab: expect.any(Function),
      changeTab: expect.any(Function),
      togglePanelTab: expect.any(Function),
      isPopupVisible: expect.any(Function),
      openToolbar: expect.any(Function),
      openActionPanel: expect.any(Function),
      closeActionPanel: expect.any(Function),
      toggleActionPanel: expect.any(Function),
      showLookupResultsUI: expect.any(Function)
    })
  })

  it('UIController - init: must add an alpheios class to the body of the document', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })
    expect(document.body.classList.contains('alpheios')).toBeTruthy()
  })

  it('UIController - init: must create a UI Vuex store module with the state items', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })

    // Check Vuex state
    expect(store.state.ui).toEqual({
      zIndexMax: expect.any(Number),
      activeTab: UIController.tabNames.DEFAULT,
      disabledTab: UIController.tabNames.DISABLED,
      hint: {
        text: null,
        visible: false
      },
      messages: [],
      notification: {
        important: false,
        showLanguageSwitcher: false,
        text: null,
        visible: false
      },
      overrideHelp: false
    })
  })

  it('UIController - init: must create a UI Vuex store module with the set of getters', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })

    // Check Vuex getters
    expect(store.getters['ui/isActiveTab']).toBeInstanceOf(Function)
  })

  it('UIController - init: must create a UI Vuex store module with the set of mutations', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })

    // Check Vuex mutations
    expect(store._mutations['ui/setActiveTab']).toBeDefined()
    expect(store._mutations['ui/resetActiveTab']).toBeDefined()
    expect(store._mutations['ui/setNotification']).toBeDefined()
    expect(store._mutations['ui/resetNotification']).toBeDefined()
    expect(store._mutations['ui/setHint']).toBeDefined()
    expect(store._mutations['ui/resetHint']).toBeDefined()
    expect(store._mutations['ui/addMessage']).toBeDefined()
    expect(store._mutations['ui/resetMessages']).toBeDefined()
  })

  it('UIController - init: must call createModules()', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    const createModulesSpy = jest.spyOn(uiC, 'createModules')
    await uiC.init({ store, api })
    expect(createModulesSpy).toBeCalledTimes(1)
  })

  it('UIController - init: must create instance of all registered modules', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    uiC.registerModule(PopupModule, {})
    await uiC.init({ store, api })
    expect(uiC.hasModule(PanelModule.moduleName)).toBeTruthy()
    expect(uiC.getModule(PanelModule.moduleName)).toBeDefined()
    expect(uiC.hasModule(PopupModule.moduleName)).toBeTruthy()
    expect(uiC.getModule(PopupModule.moduleName)).toBeDefined()
  })

  it('UIController - init: must set options of a panel module', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    await uiC.init({ store, api })
    const uiOptions = settingsAPI.getUiOptions()
    expect(store.state.panel.position).toEqual(uiOptions.items.panelPosition.currentValue)
  })

  it('UIController - init: must set options of a popup module', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PopupModule, {})
    await uiC.init({ store, api })
    const uiOptions = settingsAPI.getUiOptions()
    expect(uiC._modules.get(PopupModule.moduleName).options.initialShift).toEqual({
      x: uiOptions.items.popupShiftX.currentValue,
      y: uiOptions.items.popupShiftY.currentValue
    })
  })

  it('UIController - init: must set options of a toolbar module', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {}) // Toolbar module uses some functionality of the panel
    uiC.registerModule(ToolbarModule, {})
    await uiC.init({ store, api })
    const uiOptions = settingsAPI.getUiOptions()
    expect(uiC._modules.get(ToolbarModule.moduleName).options.initialShift).toEqual({
      x: uiOptions.items.toolbarShiftX.currentValue,
      y: uiOptions.items.toolbarShiftY.currentValue
    })
  })

  it('UIController - init: must set font size within the document', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    const fontSize = settingsAPI.getUiOptions().items.fontSize.currentValue
    await uiC.init({ store, api })
    expect(document.documentElement.style.getPropertyValue(UIController.styleProps.FONT_SIZE_PROP)).toBe(`${fontSize}px`)
  })

  it('UIController - activate: should remove a disabled class if text selection is enabled', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })
    document.body.classList.add(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
    uiC.activate()
    expect(document.body.classList.contains(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)).toBeFalsy()
    // Remove the add class in case activate() fail to do so
    document.body.classList.remove(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
  })

  it('UIController - activate: should NOT remove a disabled class if text selection is disabled on mobile', async () => {
    uiC = getUiController({ uiState, platform: mobilePlatform })
    await uiC.init({ store, api })
    document.body.classList.add(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
    uiC.activate({ disableTextSelOnMobile: true })
    expect(document.body.classList.contains(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)).toBeTruthy()
    document.body.classList.remove(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
  })

  it('UIController - activate: should call activate() and activateUI() on a UI state', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })
    const activateSpy = jest.spyOn(uiState, 'activate')
    const activateUiSpy = jest.spyOn(uiState, 'activateUI')
    uiC.activate()
    expect(activateSpy).toBeCalledTimes(1)
    expect(activateUiSpy).toBeCalledTimes(1)
  })

  it('UIController - activate: must activate registered modules', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    uiC.registerModule(PopupModule, {})
    await uiC.init({ store, api })
    const panelSpy = jest.spyOn(uiC._modules.get(PanelModule.moduleName).instance, 'activate')
    const popupSpy = jest.spyOn(uiC._modules.get(PopupModule.moduleName).instance, 'activate')
    expect(panelSpy).toBeCalledTimes(0)
    expect(popupSpy).toBeCalledTimes(0)
    uiC.activate()
    expect(panelSpy).toBeCalledTimes(1)
    expect(popupSpy).toBeCalledTimes(1)
  })

  it('UIController - activate: should NOT close a panel the UI state is not default or invalid', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelStateDefault: () => false,
      isPanelStateValid: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    await uiC.init({ store, api })
    const setPanelClosedSpy = jest.spyOn(uiState, 'setPanelClosed')
    uiC.activate()
    expect(setPanelClosedSpy).toBeCalledTimes(0)
  })

  it('UIController - activate: should close a panel if the UI state is default', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelStateDefault: () => true,
      isPanelStateValid: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    await uiC.init({ store, api })
    const setPanelClosedSpy = jest.spyOn(uiState, 'setPanelClosed')
    uiC.activate()
    expect(setPanelClosedSpy).toBeCalledTimes(1)
  })

  it('UIController - activate: should close a panel if the UI state is invalid', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelStateDefault: () => false,
      isPanelStateValid: () => false
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    await uiC.init({ store, api })
    const setPanelClosedSpy = jest.spyOn(uiState, 'setPanelClosed')
    uiC.activate()
    expect(setPanelClosedSpy).toBeCalledTimes(1)
  })

  it('UIController - activate: should open a panel if it is open in the UI state', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelStateDefault: () => false,
      isPanelStateValid: () => true,
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    await uiC.init({ store, api })
    const openPanelSpy = jest.spyOn(uiC, 'openPanel')
    uiC.activate()
    expect(openPanelSpy).toBeCalledTimes(1)
    expect(openPanelSpy).toBeCalledWith(true) // Should be called with the forceOpen argument
  })

  it('UIController - activate: should NOT open a panel if it is not open in the UI state', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelStateDefault: () => false,
      isPanelStateValid: () => true,
      isPanelOpen: () => false
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    await uiC.init({ store, api })
    const openPanelSpy = jest.spyOn(uiC, 'openPanel')
    uiC.activate()
    expect(openPanelSpy).toBeCalledTimes(0)
  })

  it('UIController - activate: should switch UI to the tab specified', async () => {
    const tabName = 'test'
    const uiState = BaseTestHelp.createUIState({
      tab: tabName
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    await uiC.init({ store, api })
    const changeTabSpy = jest.spyOn(uiC, 'changeTab')
    uiC.activate()
    expect(changeTabSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledWith(tabName)
  })

  it('UIController - activate: should switch UI to a default tab if the tab in the UI state is set to default', async () => {
    const tabName = 'test'
    const uiState = BaseTestHelp.createUIState({
      tab: tabName,
      isTabStateDefault: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    await uiC.init({ store, api })
    const changeTabSpy = jest.spyOn(uiC, 'changeTab')
    uiC.activate()
    expect(changeTabSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledWith(uiC.TAB_NAMES_DEFAULT)
  })

  it('UIController - activateOnPage: should remove a disabled class if text selection is enabled', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })
    document.body.classList.add(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
    uiC.activateOnPage()
    expect(document.body.classList.contains(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)).toBeFalsy()
    // Remove the add class in case activate() fail to do so
    document.body.classList.remove(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
  })

  it('UIController - activateOnPage: should NOT remove a disabled class if text selection is disabled on mobile', async () => {
    uiC = getUiController({ uiState, platform: mobilePlatform })
    await uiC.init({ store, api })
    uiC._config.disableTextSelOnMobile = true
    document.body.classList.add(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
    uiC.activateOnPage({ disableTextSelOnMobile: true })
    expect(document.body.classList.contains(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)).toBeTruthy()
    document.body.classList.remove(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
  })

  it('UIController - deactivate: should deactivate modules', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    uiC.registerModule(PopupModule, {})
    await uiC.init({ store, api })
    uiC.activate()
    const panelSpy = jest.spyOn(uiC._modules.get(PanelModule.moduleName).instance, 'deactivate')
    const popupSpy = jest.spyOn(uiC._modules.get(PopupModule.moduleName).instance, 'deactivate')
    expect(panelSpy).toBeCalledTimes(0)
    expect(popupSpy).toBeCalledTimes(0)
    uiC.deactivate()
    expect(panelSpy).toBeCalledTimes(1)
    expect(popupSpy).toBeCalledTimes(1)
  })

  it('UIController - deactivate: should add a disabled CSS class', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })
    uiC.activate()
    expect(document.body.classList.contains(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)).toBeFalsy()
    uiC.deactivate()
    expect(document.body.classList.contains(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)).toBeTruthy()
    // Remove the class added to remove initial state of the document
    document.body.classList.remove(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
  })

  it('UIController - deactivate: should close a popup', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PopupModule, {})
    await uiC.init({ store, api })
    uiC.activate()
    store.commit('popup/open')
    expect(store.state.popup.visible).toBeTruthy()
    uiC.deactivate()
    expect(store.state.popup.visible).toBeFalsy()
  })

  it('UIController - deactivate: should close a panel', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule, {})
    await uiC.init({ store, api })
    uiC.activate()
    const closePanelSpy = jest.spyOn(uiC, 'closePanel')
    uiC.deactivate()
    expect(closePanelSpy).toBeCalledTimes(1)
    expect(closePanelSpy).toBeCalledWith(false) // Should be called with syncState off
  })

  it('UIController - deactivateOnPage: should add a disabled CSS class', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    // Make sure disabled class is not set before the test
    document.body.classList.remove(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
    await uiC.init({ store, api })
    expect(document.body.classList.contains(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)).toBeFalsy()
    uiC.deactivateOnPage()
    expect(document.body.classList.contains(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)).toBeTruthy()
    // Remove the class added to remove initial state of the document
    document.body.classList.remove(UIController.styleProps.DISABLE_TEXT_SELECTION_CSS_CLASS)
  })

  it('UIController - registerModule: should add module to the modules list', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    expect(uiC.hasModule(PopupModule.moduleName)).toBeFalsy()
    uiC.registerModule(PopupModule)
    expect(uiC.hasModule(PopupModule.moduleName)).toBeTruthy()
  })

  it('UIController - registerModule: should set options of the module', async () => {
    const options = {
      optionOne: 'one',
      optionTwo: 'two'
    }
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PopupModule, options)
    expect(uiC._modules.get(PopupModule.moduleName).options).toBe(options)
  })

  it('UIController - createModules: should create instances of all registered modules', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })
    uiC.registerModule(PopupModule)
    uiC.registerModule(PanelModule)
    expect(uiC._modules.get(PopupModule.moduleName).instance).toBeFalsy()
    expect(uiC._modules.get(PanelModule.moduleName).instance).toBeFalsy()
    uiC.createModules()
    expect(uiC._modules.get(PopupModule.moduleName).instance).toBeTruthy()
    expect(uiC._modules.get(PanelModule.moduleName).instance).toBeTruthy()
  })

  it('UIController - hasModule: should return true if the module has been registered', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PopupModule)
    expect(uiC.hasModule(PopupModule.moduleName)).toBeTruthy()
  })

  it('UIController - hasModule: should return false if the module has not been registered', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    expect(uiC.hasModule(PopupModule.moduleName)).toBeFalsy()
  })

  it('UIController - getModule: should return an instance of the module that has been created', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    await uiC.init({ store, api })
    uiC.registerModule(PopupModule)
    uiC.createModules()
    expect(uiC.getModule(PopupModule.moduleName)).toBeInstanceOf(PopupModule)
  })

  it('UIController - getModule: should throw an error if the module has not been registered', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    expect(() => uiC.getModule(PopupModule.moduleName)).toThrowError(`UI controller has no ${PopupModule.moduleName} module`)
  })

  it('UIController - getModule: should return null if the module has been registered but not instantiated', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PopupModule)
    expect(uiC.getModule(PopupModule.moduleName)).toBeFalsy()
  })

  it('UIController - applyFontSize: must set the font size within the document to the specified value', async () => {
    const fontSize = 14
    UIController.applyFontSize(fontSize)
    expect(document.documentElement.style.getPropertyValue(UIController.styleProps.FONT_SIZE_PROP)).toBe(`${fontSize}px`)
  })

  it('UIController - openLexQueryUI: should open the panel on mobile', async () => {
    uiC = getUiController({ uiState, platform: mobilePlatform })
    uiC.registerModule(PopupModule)
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const openPanelSpy = jest.spyOn(uiC, 'openPanel')
    const changeTabSpy = jest.spyOn(uiC, 'changeTab')
    uiC.openLexQueryUI()
    expect(openPanelSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledWith(UIController.tabNames.LEX_RESULTS_MOBILE)
  })

  it('UIController - openLexQueryUI: should close the panel if it was opened and show the popup on desktop', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PopupModule)
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const closePanelSpy = jest.spyOn(uiC, 'closePanel')
    expect(store.state.popup.visible).toBeFalsy()
    uiC.openLexQueryUI()
    expect(closePanelSpy).toBeCalledTimes(1)
    expect(store.state.popup.visible).toBeTruthy()
  })

  it('UIController - openLexQueryUI: should open the popup it the panel is closed', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelOpen: () => false
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PopupModule)
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const closePanelSpy = jest.spyOn(uiC, 'closePanel')
    expect(store.state.popup.visible).toBeFalsy()
    uiC.openLexQueryUI()
    expect(closePanelSpy).toBeCalledTimes(0)
    expect(store.state.popup.visible).toBeTruthy()
  })

  it('UIController - openPanel: should open the panel if it is closed', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelOpen: () => false
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const setPanelOpenSpy = jest.spyOn(uiState, 'setPanelOpen')
    expect(store.state.panel.visible).toBeFalsy()
    uiC.openPanel()
    expect(setPanelOpenSpy).toBeCalledTimes(1)
    expect(store.state.panel.visible).toBeTruthy()
  })

  it('UIController - openPanel: should not open the panel if it already has been opened', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const setPanelOpenSpy = jest.spyOn(uiState, 'setPanelOpen')
    expect(store.state.panel.visible).toBeTruthy()
    uiC.openPanel()
    expect(setPanelOpenSpy).toBeCalledTimes(0)
  })

  it('UIController - openPanel: with forceOpen on should open the panel even if it is open', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const setPanelOpenSpy = jest.spyOn(uiState, 'setPanelOpen')
    expect(store.state.panel.visible).toBeTruthy()
    uiC.openPanel(true)
    expect(setPanelOpenSpy).toBeCalledTimes(1)
    expect(store.state.panel.visible).toBeTruthy()
  })

  it('UIController - openPanel: should switch to a default tab if the active tab is in a disabled state', async () => {
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DISABLED,
      isPanelOpen: () => false
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const changeTabSpy = jest.spyOn(uiC, 'changeTab')
    uiC.openPanel()
    expect(changeTabSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledWith(uiC.TAB_NAMES_DEFAULT)
  })

  it('UIController - openPanel: should close the toolbar if the toolbar is present', async () => {
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DISABLED,
      isPanelOpen: () => false
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const changeTabSpy = jest.spyOn(uiC, 'changeTab')
    uiC.openPanel()
    expect(changeTabSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledWith(uiC.TAB_NAMES_DEFAULT)
  })

  it('UIController - closePanel: should close the panel and disable the active tab', async () => {
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DEFAULT,
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    expect(store.state.panel.visible).toBeTruthy()
    expect(store.state.ui.activeTab).toBe(UIController.tabNames.DEFAULT)
    const setPanelClosedSpy = jest.spyOn(uiState, 'setPanelClosed')
    uiC.closePanel()
    expect(store.state.panel.visible).toBeFalsy()
    expect(store.state.ui.activeTab).toBe(UIController.tabNames.DISABLED)
    expect(setPanelClosedSpy).toBeCalledTimes(1)
  })

  it('UIController - closePanel: should not update the UI state if syncState is false', async () => {
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DEFAULT,
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const setPanelClosedSpy = jest.spyOn(uiState, 'setPanelClosed')
    uiC.closePanel(false)
    expect(setPanelClosedSpy).toBeCalledTimes(0)
  })

  it('UIController - closePanel: should open the toolbar if the toolbar is present', async () => {
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DEFAULT,
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    uiC.registerModule(ToolbarModule)
    await uiC.init({ store, api })
    uiC.activate()
    expect(store.state.toolbar.visible).toBeFalsy()
    uiC.closePanel()
    expect(store.state.toolbar.visible).toBeTruthy()
  })

  it('UIController - showPanelTab: should change to the specified tab and open the panel', async () => {
    const targetTab = 'inflections'
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DEFAULT,
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const changeTabSpy = jest.spyOn(uiC, 'changeTab')
    const openPanelSpy = jest.spyOn(uiC, 'openPanel')
    uiC.showPanelTab(targetTab)
    expect(changeTabSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledWith(targetTab)
    expect(openPanelSpy).toBeCalledTimes(1)
  })

  it('UIController - changeTab: should change tab to the one specified', async () => {
    const targetTab = 'settings'
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DEFAULT,
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    expect(store.state.ui.activeTab).toBe(UIController.tabNames.DEFAULT)
    const changeTabSpy = jest.spyOn(uiC, 'changeTab')
    uiC.changeTab(targetTab)
    expect(store.state.ui.activeTab).toBe(targetTab)
    expect(changeTabSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledWith(targetTab)
  })

  it('UIController - togglePanelTab: should switch panel to the specified tab', async () => {
    const targetTab = 'settings'
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DEFAULT,
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const changeTabSpy = jest.spyOn(uiC, 'changeTab')
    uiC.togglePanelTab(targetTab)
    expect(changeTabSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledWith(targetTab)
  })

  it('UIController - togglePanelTab: should open a panel if it is closed', async () => {
    const targetTab = 'settings'
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DEFAULT,
      isPanelOpen: () => false
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const openPanelSpy = jest.spyOn(uiC, 'openPanel')
    uiC.togglePanelTab(targetTab)
    expect(openPanelSpy).toBeCalledTimes(1)
  })

  it('UIController - togglePanelTab: if the tab does not change, it should open the panel if it is closed', async () => {
    const targetTab = 'settings'
    const uiState = BaseTestHelp.createUIState({
      tab: targetTab,
      isPanelOpen: () => false
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const openPanelSpy = jest.spyOn(uiC, 'openPanel')
    uiC.togglePanelTab(targetTab)
    expect(openPanelSpy).toBeCalledTimes(1)
  })

  it('UIController - togglePanelTab: if tab does not change, it should close the panel if it is open', async () => {
    const targetTab = 'settings'
    const uiState = BaseTestHelp.createUIState({
      tab: targetTab,
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const closePanelSpy = jest.spyOn(uiC, 'closePanel')
    uiC.togglePanelTab(targetTab)
    expect(closePanelSpy).toBeCalledTimes(1)
  })

  it('UIController - openToolbar: should open the toolbar', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule) // Toolbar module depends on the state of the panel
    uiC.registerModule(ToolbarModule)
    await uiC.init({ store, api })
    uiC.activate()
    store.commit('toolbar/close')
    expect(store.state.toolbar.visible).toBeFalsy()
    uiC.openToolbar()
    expect(store.state.toolbar.visible).toBeTruthy()
  })

  it('UIController - openActionPanel: should open the action panel', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(ActionPanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    expect(store.state.actionPanel.visible).toBeFalsy()
    uiC.openActionPanel()
    expect(store.state.actionPanel.visible).toBeTruthy()
  })

  it('UIController - closeActionPanel: should close the action panel', async () => {
    const store = BaseTestHelp.baseVuexStore([...baseStoreModules, 'toolbar'])
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(ActionPanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    store.commit('actionPanel/open')
    expect(store.state.actionPanel.visible).toBeTruthy()
    uiC.closeActionPanel()
    expect(store.state.actionPanel.visible).toBeFalsy()
  })

  it('UIController -  toggleActionPanel: should open the action panel if it was closed', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(ActionPanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    expect(store.state.actionPanel.visible).toBeFalsy()
    uiC.toggleActionPanel()
    expect(store.state.actionPanel.visible).toBeTruthy()
  })

  it('UIController -  toggleActionPanel: should close the action panel if it was open', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(ActionPanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    store.commit('actionPanel/open')
    expect(store.state.actionPanel.visible).toBeTruthy()
    uiC.toggleActionPanel()
    expect(store.state.actionPanel.visible).toBeFalsy()
  })

  it('UIController -  closeUI: should close the panel if it was open', async () => {
    const uiState = BaseTestHelp.createUIState({
      isPanelOpen: () => true
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    const closePanelSpy = jest.spyOn(uiC, 'closePanel')
    uiC.closeUI()
    expect(closePanelSpy).toBeCalledTimes(1)
  })

  it('UIController -  showLookupResultsUI: with the "popup" option, should open the popup', async () => {
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PopupModule)
    await uiC.init({ store, api })
    uiC.activate()
    expect(store.state.popup.visible).toBeFalsy()
    uiC.showLookupResultsUI(UIController.components.POPUP)
    expect(store.state.popup.visible).toBeTruthy()
  })

  it('UIController -  showLookupResultsUI: with the "panel" option, should open the panel and switch to the "morphology" tab', async () => {
    const targetTab = 'morphology'
    const uiState = BaseTestHelp.createUIState({
      tab: UIController.tabNames.DEFAULT
    })
    uiC = getUiController({ uiState, platform: desktopPlatform })
    uiC.registerModule(PanelModule)
    await uiC.init({ store, api })
    uiC.activate()
    expect(store.state.panel.visible).toBeFalsy()
    expect(uiState.tab).toBe(UIController.tabNames.DEFAULT)
    const changeTabSpy = jest.spyOn(uiState, 'changeTab')
    uiC.showLookupResultsUI(UIController.components.PANEL)
    expect(store.state.panel.visible).toBeTruthy()
    expect(changeTabSpy).toBeCalledTimes(1)
    expect(changeTabSpy).toBeCalledWith(targetTab)
    expect(store.state.ui.activeTab).toBe(targetTab)
  })
})
