/* eslint-env jest */
/* eslint-disable no-unused-vars */
import AppController from '@comp/lib/controllers/app-controller.js'
import L10nModule from '@comp/vue/vuex-modules/data/l10n-module.js'
import LexisModule from '@comp/vue/vuex-modules/data/lexis.js'
import AuthModule from '@comp/vue/vuex-modules/data/auth-module.js'
import Module from '@comp/vue/vuex-modules/module.js'
import Locales from '@comp/locales/locales.js'
import Platform from '@comp/lib/utility/platform.js'
import Vue from '@vue-runtime'
import MouseDblClick from '@comp/lib/custom-pointer-events/mouse-dbl-click.js'
import LongTap from '@comp/lib/custom-pointer-events/long-tap.js'
import GenericEvt from '@comp/lib/custom-pointer-events/generic-evt.js'
import { Constants, LanguageModelFactory } from 'alpheios-data-models'
import SelectionController from '@comp/lib/controllers/selection-controller.js'
import { WordlistController } from 'alpheios-wordlist'
import LexicalQuery from '@comp/lib/queries/lexical-query.js'
import ResourceQuery from '@comp/lib/queries/resource-query.js'

import BaseTestHelp from '@compTests/helpclasses/base-test-help.js'

describe('AppController', () => {
  let appC, uiState, state
  const defaultMousemoveParams = {
    enableMouseMoveLimitedByIdCheck: true,
    mouseMoveAccuracy: 10,
    mouseMoveDelay: 1000,
    mouseMoveLimitedById: 'docs-editor-container'
  }

  /*
  Since events are asynchronous, their listeners may be called in a test environment
  after the application is tear down. To prevent errors related to this, a special
  version of the create() method is created for the test environment. In it, event listeners
  that may have issues like described above are not registered.
   */
  AppController.jestCreate = (state, options) => {
    let appController = new AppController(state, options) // eslint-disable-line prefer-const

    // Register data modules
    appController.registerModule(L10nModule, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr()
    })

    appController.registerModule(LexisModule, {
      arethusaTbRefreshRetryCount: appController._options.arethusaTbRefreshRetryCount,
      arethusaTbRefreshDelay: appController._options.arethusaTbRefreshDelay
    })

    // Creates on configures an event listener
    appController._evc.registerListener('HandleEscapeKey', document, appController.handleEscapeKey.bind(appController), GenericEvt, 'keydown')
    SelectionController.evt.TEXT_SELECTED.sub(appController.onTextSelected.bind(appController))

    // Subscribe to LexicalQuery events
    // LexicalQuery.evt.LEXICAL_QUERY_COMPLETE.sub(appController.onLexicalQueryComplete.bind(appController))
    LexicalQuery.evt.MORPH_DATA_READY.sub(appController.onMorphDataReady.bind(appController))
    LexicalQuery.evt.MORPH_DATA_NOTAVAILABLE.sub(appController.onMorphDataNotFound.bind(appController))
    LexicalQuery.evt.HOMONYM_READY.sub(appController.onHomonymReady.bind(appController))
    LexicalQuery.evt.LEMMA_TRANSL_READY.sub(appController.updateTranslations.bind(appController))
    //LexicalQuery.evt.WORD_USAGE_EXAMPLES_READY.sub(appController.updateWordUsageExamples.bind(appController))
    LexicalQuery.evt.SHORT_DEFS_READY.sub(appController.onShortDefinitionsReady.bind(appController))
    LexicalQuery.evt.FULL_DEFS_READY.sub(appController.onFullDefinitionsReady.bind(appController))
    LexicalQuery.evt.SHORT_DEFS_NOT_FOUND.sub(appController.onDefinitionsNotFound.bind(appController))
    LexicalQuery.evt.FULL_DEFS_NOT_FOUND.sub(appController.onDefinitionsNotFound.bind(appController))

    // Subscribe to ResourceQuery events
    // ResourceQuery.evt.RESOURCE_QUERY_COMPLETE.sub(appController.onResourceQueryComplete.bind(appController))
    // ResourceQuery.evt.GRAMMAR_AVAILABLE.sub(appController.onGrammarAvailable.bind(appController))
    ResourceQuery.evt.GRAMMAR_NOT_FOUND.sub(appController.onGrammarNotFound.bind(appController))

    appController._wordlistC = new WordlistController(LanguageModelFactory.availableLanguages(), LexicalQuery.evt)
    // WordlistController.evt.WORDLIST_UPDATED.sub(appController.onWordListUpdated.bind(appController))
    WordlistController.evt.WORDITEM_SELECTED.sub(appController.onWordItemSelected.bind(appController))

    return appController
  }

  beforeAll(() => {
    Vue.config.productionTip = false // Disable a Vue production mode warning
    Vue.config.devtools = false // Disable a Devtools extension warning
  })

  beforeEach(() => {
    uiState = BaseTestHelp.createUIState()
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('AppController - constructor: should create an instance with default arguments', () => {
    appC = new AppController(uiState)
    expect(appC).toBeInstanceOf(AppController)
  })

  it('AppController - constructor: should initialize all properties', () => {
    appC = new AppController(uiState)
    expect(appC.state).toBe(uiState)
    expect(appC.api).toEqual({})
    expect(appC.isInitialized).toBeFalsy()
    expect(appC.isActivated).toBeFalsy()
    expect(appC.isDeactivated).toBeFalsy()
  })

  it('AppController - constructor: should initialize internal options with the constructor arguments', () => {
    const customOptions = {
      clientId: 'alpheios-components',
      app: {
        name: 'Test App'
      }
    }
    appC = new AppController(uiState, customOptions)
    expect(appC._options).toMatchObject(customOptions)
  })

  it('AppController - create: should create an instance with default arguments', () => {
    appC = AppController.jestCreate(uiState)
    appC.registerModule(AuthModule)
    expect(appC).toBeInstanceOf(AppController)
  })

  it('AppController - create: an instance created should have L10n and Lexis modules', () => {
    appC = AppController.jestCreate(uiState)
    expect(appC.hasModule('l10n')).toBeTruthy()
    expect(appC.hasModule('lexis')).toBeTruthy()
  })

  it('AppController - setOptions: should combine options provided and the default ones', () => {
    const customOptions = {
      clientId: 'alpheios-components',
      app: {
        name: 'Test App'
      }
    }
    const options = AppController.setOptions(customOptions, AppController.optionsDefaults)
    expect(options).toMatchObject(customOptions)
  })

  it('AppController - hasUIController: should return true if the UI controller is present', () => {
    appC = AppController.jestCreate(uiState)
    // UIController are registered during an instance construction by the AppController
    expect(appC.hasUIController).toBeTruthy()
  })

  it('AppController - registerModule: should register a specified module', () => {
    appC = AppController.jestCreate(uiState)
    expect(appC.hasModule(AuthModule.moduleName)).toBeFalsy()
    appC.registerModule(AuthModule)
    expect(appC.hasModule(AuthModule.moduleName)).toBeTruthy()
    // UIController is created during an instance construction by default
    expect(appC.hasUIController).toBeTruthy()
  })

  it('AppController - dataModules: returns a list of registered data modules', () => {
    appC = AppController.jestCreate(uiState)
    // L10n and Lexis modules are registered by the constructor of the AppController
    expect(appC.dataModules.map(m => m.ModuleClass.moduleName)).toEqual(['l10n', 'lexis'])
  })

  it('AppController - hasModule: returns true if module has been registered', () => {
    appC = AppController.jestCreate(uiState)
    // L10n is registered by the constructor of the AppController
    expect(appC.hasModule('l10n')).toBeTruthy()
  })

  it('AppController - hasModule: returns false if module is not present', () => {
    appC = AppController.jestCreate(uiState)
    expect(appC.hasModule('Some other module')).toBeFalsy()
  })

  it('AppController - getModule: returns an instance of the module', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    expect(appC.getModule('l10n')).toBeInstanceOf(Module)
  })

  it('AppController - getModule: returns null if module has not been created', () => {
    appC = AppController.jestCreate(uiState)
    expect(appC.getModule('l10n')).toBeNull()
  })

  it('AppController - getModule: throws an error if module does not exist', () => {
    appC = AppController.jestCreate(uiState)
    expect(() => appC.getModule('Unknown module')).toThrowError()
  })

  it('AppController - init: should create the App API', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    expect(appC.api.app).toEqual({
      name: expect.any(String),
      version: expect.any(String),
      buildName: null,
      clientId: expect.any(String),
      libName: expect.any(String),
      libVersion: expect.any(String),
      libBuildName: expect.any(String),
      platform: expect.any(Platform),
      mode: expect.any(String),
      state: expect.any(Object),
      homonym: null,
      wordUsageExamplesCached: null,
      wordUsageExamples: null,
      wordUsageAuthors: [],
      grammarData: {},
      queryParams: expect.any(Object),
      isDevMode: expect.any(Function),
      getDefaultLangCode: expect.any(Function),
      registerTextSelector: expect.any(Function),
      activateTextSelector: expect.any(Function),
      isMousemoveForced: expect.any(Function),
      getMouseMoveOverride: expect.any(Function),
      clearMouseMoveOverride: expect.any(Function),
      applyAllOptions: expect.any(Function),
      applyUIOption: expect.any(Function),
      applyFeatureOption: expect.any(Function),
      updateLanguage: expect.any(Function),
      notifyExperimental: expect.any(Function),
      getLanguageName: expect.any(Function),
      startResourceQuery: expect.any(Function),
      sendFeature: expect.any(Function),
      getHomonymLexemes: expect.any(Function),
      getInflectionsViewSet: expect.any(Function),
      getInflectionViews: expect.any(Function),
      hasMorphData: expect.any(Function),
      getWordUsageData: expect.any(Function),
      getWordList: expect.any(Function),
      selectWordItem: expect.any(Function),
      updateAllImportant: expect.any(Function),
      updateWordItemImportant: expect.any(Function),
      removeWordListItem: expect.any(Function),
      removeWordList: expect.any(Function),
      getAllWordLists: expect.any(Function),
      enableWordUsageExamples: expect.any(Function),
      isGetSelectedTextEnabled: expect.any(Function),
      newLexicalRequest: expect.any(Function),
      getWordUsageExamplesQueryParams: expect.any(Function),
      restoreGrammarIndex: expect.any(Function)
    })
  })

  it('AppController - init: should create an "app" module in the Vuex store', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    expect(appC._store.hasModule('app')).toBeTruthy()
  })

  it('AppController - init: should create a Vuex module with the set of state items', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    expect(appC._store.state.app).toEqual({
      currentLanguageID: expect.anything(),
      currentLanguageCode: expect.any(String),
      currentLanguageName: expect.any(String),
      embedLibActive: false,
      selectedText: '',
      languageName: '',
      languageCode: '',
      selectedLookupLangCode: expect.any(String),
      targetWord: '',
      homonymDataReady: false,
      wordUsageExampleEnabled: false,
      linkedFeatures: [],
      shortDefUpdateTime: 0,
      fullDefUpdateTime: 0,
      lexicalRequest: {
        source: null,
        startTime: 0,
        endTime: 0,
        outcome: null
      },
      inflectionsWaitState: false,
      hasInflData: false,
      morphDataReady: false,
      translationsDataReady: false,

      updatedGrammar: 0,

      wordUsageExamplesReady: false,
      wordUsageAuthorsReady: false,
      hasWordListsData: false,
      wordListUpdateTime: 0,
      providers: [],
      queryStillActive: false,

      mouseMoveOverrideUpdate: 1
    })
  })

  it('AppController - init: should create a Vuex module with the set of getters', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    expect(appC._store.getters['app/shortDefDataReady']).toBeDefined()
    expect(appC._store.getters['app/fullDefDataReady']).toBeDefined()
    expect(appC._store.getters['app/lexicalRequestInProgress']).toBeDefined()
  })

  it('AppController - init: should create a Vuex module with the set of mutations', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    expect(appC._store._mutations['app/setEmbedLibActive']).toBeDefined()
    expect(appC._store._mutations['app/setCurrentLanguage']).toBeDefined()
    expect(appC._store._mutations['app/setSelectedLookupLang']).toBeDefined()
    expect(appC._store._mutations['app/setTextData']).toBeDefined()
    expect(appC._store._mutations['app/lexicalRequestStarted']).toBeDefined()
    expect(appC._store._mutations['app/resetWordData']).toBeDefined()
    expect(appC._store._mutations['app/lexicalRequestFinished']).toBeDefined()
    expect(appC._store._mutations['app/setHomonym']).toBeDefined()
    expect(appC._store._mutations['app/setWordUsageExampleEnabled']).toBeDefined()
    expect(appC._store._mutations['app/setInflData']).toBeDefined()
    expect(appC._store._mutations['app/resetInflData']).toBeDefined()
    expect(appC._store._mutations['app/setUpdatedGrammar']).toBeDefined()
    expect(appC._store._mutations['app/setWordUsageExamplesReady']).toBeDefined()
    expect(appC._store._mutations['app/setWordUsageAuthorsReady']).toBeDefined()
    expect(appC._store._mutations['app/setWordLists']).toBeDefined()
    expect(appC._store._mutations['app/shortDefsUpdated']).toBeDefined()
    expect(appC._store._mutations['app/fullDefsUpdated']).toBeDefined()
    expect(appC._store._mutations['app/setMorphDataReady']).toBeDefined()
    expect(appC._store._mutations['app/setTranslDataReady']).toBeDefined()
    expect(appC._store._mutations['app/setQueryStillActive']).toBeDefined()
    expect(appC._store._mutations['app/setMouseMoveOverrideUpdate']).toBeDefined()
  })

  it('AppController - textSelectorParams: should return correct parameters for the "longTap" trigger on mobile', async () => {
    appC = AppController.jestCreate(uiState, { textQueryTriggerMobile: 'longTap' })
    await appC.init()
    appC._platform = { isMobile: true, isDektop: false }
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('LongTap')
    expect(eventParams).toBeUndefined()
  })

  it('AppController - textSelectorParams: should return correct parameters for the "longtap" trigger on mobile', async () => {
    appC = AppController.jestCreate(uiState, { textQueryTriggerMobile: 'longtap' })
    await appC.init()
    appC._platform = { isMobile: true, isDektop: false }
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('LongTap')
    expect(eventParams).toBeUndefined()
  })

  it('AppController - textSelectorParams: should return correct parameters for the null trigger on mobile', async () => {
    appC = AppController.jestCreate(uiState, { textQueryTriggerMobile: null })
    await appC.init()
    appC._platform = { isMobile: true, isDektop: false }
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('LongTap')
    expect(eventParams).toBeUndefined()
  })

  it('AppController - textSelectorParams: should return correct parameters if no trigger is specified on mobile', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    appC._platform = { isMobile: true, isDektop: false }
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('LongTap')
    expect(eventParams).toBeUndefined()
  })

  it('AppController - textSelectorParams: should return correct parameters if some other trigger is specified on mobile', async () => {
    const triggerParams = {
      a: 'value of A',
      b: 'value of B'
    }
    appC = AppController.jestCreate(uiState, { textQueryTriggerMobile: triggerParams })
    await appC.init()
    appC._platform = { isMobile: true, isDektop: false }
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('GenericEvt')
    expect(eventParams).toBe(triggerParams)
  })

  it('AppController - textSelectorParams: should return correct parameters if mousemove is enabled', async () => {
    appC = AppController.jestCreate(uiState, { textQueryTriggerDesktop: null })
    await appC.init()
    appC._platform = { isMobile: false, isDektop: true }
    Object.defineProperty(appC, 'isMousemoveEnabled', { get: () => true })
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('MouseMove')
    expect(eventParams).toEqual(defaultMousemoveParams)
  })

  it('AppController - textSelectorParams: should return correct parameters for the "dblClick" trigger on desktop', async () => {
    appC = AppController.jestCreate(uiState, { textQueryTriggerDesktop: 'dblClick' })
    await appC.init()
    appC._platform = { isMobile: false, isDektop: true }
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('MouseDblClick')
    expect(eventParams).toBeUndefined()
  })

  it('AppController - textSelectorParams: should return correct parameters for the null trigger on desktop', async () => {
    appC = AppController.jestCreate(uiState, { textQueryTriggerDesktop: null })
    await appC.init()
    appC._platform = { isMobile: false, isDektop: true }
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('MouseDblClick')
    expect(eventParams).toBeUndefined()
  })

  it('AppController - textSelectorParams: should return correct parameters if no trigger is specified on desktop', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    appC._platform = { isMobile: false, isDektop: true }
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('MouseDblClick')
    expect(eventParams).toBeUndefined()
  })

  it('AppController - textSelectorParams: should return correct parameters if some other trigger is specified on desktop', async () => {
    const triggerParams = {
      a: 'value of A',
      b: 'value of B'
    }
    appC = AppController.jestCreate(uiState, { textQueryTriggerDesktop: triggerParams })
    await appC.init()
    appC._platform = { isMobile: false, isDektop: true }
    const [event, eventParams] = appC.textSelectorParams
    expect(event.name).toBe('GenericEvt')
    expect(eventParams).toBe(triggerParams)
  })

  it('AppController - registerTextSelector: should call registerSelector on the selection controller', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    const registerSelectorSpy = jest.spyOn(appC._selc, 'registerSelector')
    appC.registerTextSelector()
    expect(registerSelectorSpy).toBeCalledTimes(1)
  })

  it('AppController - activateTextSelector: should call activateSelector on the selection controller', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    const activateSelectorSpy = jest.spyOn(appC._selc, 'activateSelector')
    appC.activateTextSelector()
    expect(activateSelectorSpy).toBeCalledTimes(1)
  })

  it('AppController - activateTextSelector: should call activateSelector on the selection controller', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    const activateSelectorSpy = jest.spyOn(appC._selc, 'activateSelector')
    appC.activateTextSelector()
    expect(activateSelectorSpy).toBeCalledTimes(1)
  })

  // TODO: Add tests for initUserDataManager() after it will be updated

  it('AppController - activate: should change the state props', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    expect(appC.isActivated).toBeFalsy()
    await appC.activate()
    expect(appC.isActivated).toBeTruthy()
    expect(appC.isDeactivated).toBeFalsy()
  })

  it('AppController - activate: should call init() if has not been instantiated', async () => {
    appC = AppController.jestCreate(uiState)
    const initSpy = jest.spyOn(appC, 'init')
    await appC.activate()
    expect(initSpy).toBeCalledTimes(1)
  })

  it('AppController - activate: should activate modules', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    const l10nModule = appC.getModule('l10n')
    expect(l10nModule.isActivated).toBeFalsy()
    await appC.activate()
    expect(l10nModule.isActivated).toBeTruthy()
  })

  it('AppController - activate: should activate the UI controller', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    const uicActivateSpy = jest.spyOn(appC._uic, 'activate')
    await appC.activate()
    expect(uicActivateSpy).toBeCalledTimes(1)
  })

  it('AppController - activate: should activate listeners of the event controller', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    const evcActivateSpy = jest.spyOn(appC._evc, 'activateListeners')
    await appC.activate()
    expect(evcActivateSpy).toBeCalledTimes(1)
  })

  it('AppController - activate: should activate the selection controller', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    const selcActivateSpy = jest.spyOn(appC._selc, 'activate')
    await appC.activate()
    expect(selcActivateSpy).toBeCalledTimes(1)
  })

  it('AppController - getDefaultLangCode: should return a valid value of the language code', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    expect(appC.getDefaultLangCode()).toBe('lat')
  })

  it('AppController - getMouseMoveOverride: should return a default value of the mousemoveOverride', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    expect(appC.getMouseMoveOverride()).toBeFalsy()
  })

  it('AppController - getMouseMoveOverride: should return a value of the mousemoveOverride from options', async () => {
    appC = AppController.jestCreate(uiState, { enableMouseMoveOverride: true })
    await appC.init()
    expect(appC.getMouseMoveOverride()).toBeTruthy()
  })

  it('AppController - clearMouseMoveOverride: should reset the mousemoveOverride option', async () => {
    appC = AppController.jestCreate(uiState, { enableMouseMoveOverride: true })
    await appC.init()
    expect(appC.getMouseMoveOverride()).toBeTruthy()
    appC.clearMouseMoveOverride()
    expect(appC.getMouseMoveOverride()).toBeFalsy()
  })

  it('AppController - deactivate: should change the state props', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC.isActivated).toBeTruthy()
    await appC.deactivate()
    expect(appC.isActivated).toBeFalsy()
    expect(appC.isDeactivated).toBeTruthy()
  })

  it('AppController - deactivate: should deactivate the UI state', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const deactivateSpy = jest.spyOn(uiState, 'deactivate')
    await appC.deactivate()
    expect(deactivateSpy).toBeCalledTimes(1)
  })

  it('AppController - deactivate: should deactivate modules', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const l10nModule = appC.getModule('l10n')
    expect(l10nModule.isActivated).toBeTruthy()
    await appC.deactivate()
    expect(l10nModule.isActivated).toBeFalsy()
  })

  it('AppController - deactivate: should deactivate the UI controller', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const uicDeactivateSpy = jest.spyOn(appC._uic, 'deactivate')
    await appC.deactivate()
    expect(uicDeactivateSpy).toBeCalledTimes(1)
  })

  it('AppController - deactivate: should deactivate listeners of the event controller', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const evcDeactivateSpy = jest.spyOn(appC._evc, 'deactivateListeners')
    await appC.deactivate()
    expect(evcDeactivateSpy).toBeCalledTimes(1)
  })

  it('AppController - deactivate: should deactivate the selection controller', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const selcDeactivateSpy = jest.spyOn(appC._selc, 'deactivate')
    await appC.deactivate()
    expect(selcDeactivateSpy).toBeCalledTimes(1)
  })

  it('AppController - getEmbedLibWarning: should return an instance of an EmbedLibWarning component', () => {
    const msg = 'Test message'
    const instance = AppController.getEmbedLibWarning(msg)
    expect(instance.constructor.name).toBe('VueComponent')
    expect(instance.text).toBe(msg)
  })

  it('AppController - getLanguageName: should return a name of the language', () => {
    const langCode = 'lat'
    expect(AppController.getLanguageName(langCode)).toEqual({
      code: langCode,
      id: expect.anything(),
      name: 'Latin'
    })
  })

  it('AppController - showLanguageInfo: should create a notification message', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.notification.visible).toBeFalsy()
    expect(appC._store.state.ui.notification.important).toBeFalsy()
    expect(appC._store.state.ui.notification.text).toBeNull()
    appC.showLanguageInfo()
    expect(appC._store.state.ui.notification.visible).toBeTruthy()
    expect(appC._store.state.ui.notification.important).toBeTruthy()
    expect(appC._store.state.ui.notification.text).toMatch(/was not found/)
  })

  it('AppController - showErrorInfo: should create an error message', async () => {
    const errorMessage = 'Error message'
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.notification.visible).toBeFalsy()
    expect(appC._store.state.ui.notification.important).toBeFalsy()
    expect(appC._store.state.ui.notification.text).toBeNull()
    appC.showErrorInfo(errorMessage)
    expect(appC._store.state.ui.notification.visible).toBeTruthy()
    expect(appC._store.state.ui.notification.important).toBeTruthy()
    expect(appC._store.state.ui.notification.text).toBe(errorMessage)
  })

  it('AppController - showImportantNotification: should create a notification message', async () => {
    const notificationMessage = 'Notification message'
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.notification.visible).toBeFalsy()
    expect(appC._store.state.ui.notification.important).toBeFalsy()
    expect(appC._store.state.ui.notification.text).toBeNull()
    appC.showImportantNotification(notificationMessage)
    expect(appC._store.state.ui.notification.visible).toBeTruthy()
    expect(appC._store.state.ui.notification.important).toBeTruthy()
    expect(appC._store.state.ui.notification.text).toBe(notificationMessage)
  })

  it('AppController - sendFeature: should start a resource query', async () => {
    const feature = {
      propA: 'Value of A',
      languageID: Constants.LANG_GREEK
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC.api.ui.hasModule = () => true // To emulate a presence of the UI modules
    const startResourceQuerySpy = jest.fn(() => {})
    appC.startResourceQuery = startResourceQuerySpy
    appC.sendFeature(feature)
    expect(startResourceQuerySpy).toBeCalledTimes(1)
    expect(startResourceQuerySpy).toBeCalledWith(feature)
  })

  // TODO: Add tests for the newLexicalRequest() after its refactoring is complete

  it('AppController - setEmbedLibActive: should set an active status of the embedded library', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.app.embedLibActive).toBeFalsy()
    appC.setEmbedLibActive()
    expect(appC._store.state.app.embedLibActive).toBeTruthy()
  })

  it('AppController - resetInflData: should clear an inflection data', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC._inflectionsViewSet = []
    appC._store.commit('app/setInflData', true)
    appC.resetInflData()
    expect(appC._inflectionsViewSet).toBeNull()
    expect(appC._store.state.app.inflectionsWaitState).toBeFalsy()
    expect(appC._store.state.app.hasInflData).toBeFalsy()
  })

  it('AppController - updateProviders: should set provider information', async () => {
    const provider1 = { uri: 'url1' }
    const provider2 = { uri: 'url2' }
    const provider3 = { uri: 'url3' }
    const homonym = {
      lexemes: [
        {
          provider: provider1
        },
        {
          meaning: {
            shortDefs: [
              {
                provider: provider2
              }
            ]
          }
        },
        {
          lemma: {
            translation: {
              provider: provider3
            }
          }
        }
      ]
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC.updateProviders(homonym)
    expect(appC._store.state.app.providers).toEqual([provider1, provider2, provider3])
  })

  it('AppController - updateGrammar: should update the grammar data', async () => {
    const urlOne = 'url1'
    const urlTwo = 'url2'
    const data = {
      languageID: Constants.LANG_LATIN,
      urls: [
        urlTwo,
        urlOne
      ]
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.app.updatedGrammar).toBe(0)
    appC.updateGrammar(data)
    expect(appC.api.app.grammarData).toEqual({
      lat: urlTwo
    })
    // Should increase a grammar update counter
    expect(appC._store.state.app.updatedGrammar).toBe(1)
  })

  it('AppController - initGrammar: should initialize the grammar data', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.app.updatedGrammar).toBe(0)
    appC.initGrammar('lat')
    expect(appC.api.app.grammarData).toEqual({
      lat: null
    })
    // Should increase a grammar update counter
    expect(appC._store.state.app.updatedGrammar).toBe(1)
  })

  it('AppController - updateTranslations: should set the translations data', async () => {
    const provider1 = { uri: 'url1' }
    const provider2 = { uri: 'url2' }
    const provider3 = { uri: 'url3' }
    const homonym = {
      lexemes: [
        {
          provider: provider1
        },
        {
          meaning: {
            shortDefs: [
              {
                provider: provider2
              }
            ]
          }
        },
        {
          lemma: {
            translation: {
              provider: provider3
            }
          }
        }
      ]
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const updateProvidersSpy = jest.spyOn(appC, 'updateProviders')
    expect(appC._store.state.app.translationsDataReady).toBeFalsy()
    appC.updateTranslations(homonym)
    expect(appC._store.state.app.translationsDataReady).toBeTruthy()
    expect(updateProvidersSpy).toBeCalledTimes(1)
    expect(updateProvidersSpy).toBeCalledWith(homonym)
  })

  it('AppController - notifyExperimental: should set a notification if the language is experimental', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.notification.visible).toBeFalsy()
    expect(appC._store.state.ui.notification.important).toBeFalsy()
    expect(appC._store.state.ui.notification.text).toBeNull()
    appC.notifyExperimental(Constants.LANG_GEEZ)
    expect(appC._store.state.ui.notification.visible).toBeTruthy()
    expect(appC._store.state.ui.notification.important).toBeTruthy()
    expect(appC._store.state.ui.notification.text).toMatch(/Support for .+ is experimental/)
  })

  it('AppController - notifyExperimental: should do nothing for non-experimental language', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.notification.visible).toBeFalsy()
    expect(appC._store.state.ui.notification.important).toBeFalsy()
    expect(appC._store.state.ui.notification.text).toBeNull()
    appC.notifyExperimental(Constants.LANG_LATIN)
    expect(appC._store.state.ui.notification.visible).toBeFalsy()
    expect(appC._store.state.ui.notification.important).toBeFalsy()
    expect(appC._store.state.ui.notification.text).toBeNull()
  })

  it('AppController - updateLanguage: should update language information in the Vuex store', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.app.currentLanguageID).toBe(Constants.LANG_LATIN)
    expect(appC._store.state.app.currentLanguageName).toBe('Latin')
    expect(appC._store.state.app.currentLanguageCode).toBe('lat')
    appC.updateLanguage(Constants.LANG_GREEK)
    expect(appC._store.state.app.currentLanguageID).toBe(Constants.LANG_GREEK)
    expect(appC._store.state.app.currentLanguageName).toBe('Greek')
    expect(appC._store.state.app.currentLanguageCode).toBe('grc')
  })

  it('AppController - updateLanguage: should call corresponding methods', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const notifyExperimentalSpy = jest.spyOn(appC, 'notifyExperimental')
    const setItemSpy = jest.spyOn(uiState, 'setItem')
    const resetInflData = jest.spyOn(appC, 'resetInflData')
    appC.updateLanguage(Constants.LANG_GREEK)
    expect(appC._store.state.app.currentLanguageID).toBe(Constants.LANG_GREEK)
    expect(appC._store.state.app.currentLanguageName).toBe('Greek')
    expect(appC._store.state.app.currentLanguageCode).toBe('grc')
    expect(notifyExperimentalSpy).toBeCalledTimes(1)
    expect(setItemSpy).toBeCalledTimes(1)
    expect(setItemSpy).toBeCalledWith('currentLanguage', 'grc')
    expect(resetInflData).toBeCalledTimes(1)
  })

  it('AppController - restoreGrammarIndex: should start a resource query', async () => {
    const langID = Constants.LANG_GREEK
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const startResourceQuerySpy = jest.spyOn(appC, 'startResourceQuery')
    appC.restoreGrammarIndex(langID)
    expect(startResourceQuerySpy).toBeCalledTimes(1)
    expect(startResourceQuerySpy).toBeCalledWith({ type: 'table-of-contents', value: '', languageID: langID })
  })

  it('AppController - updateLemmaTranslations: should set a lemma translation language', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const setLemmaTranslationLangSpy = jest.spyOn(appC.api.lexis, 'setLemmaTranslationLang')
    appC.updateLemmaTranslations()
    expect(setLemmaTranslationLangSpy).toBeCalledTimes(1)
  })

  it('AppController - updateWordUsageExamples: should update the usage examples data', async () => {
    const data = {
      propA: 'Value of A'
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.messages).toEqual([])
    expect(appC._store.state.app.wordUsageExamplesReady).toBeFalsy()
    appC.updateWordUsageExamples(data)
    expect(appC._store.state.ui.messages).toEqual(['Word Usage Examples are received'])
    expect(appC.api.app.wordUsageExamples).toBe(data)
    expect(appC._store.state.app.wordUsageExamplesReady).toBeTruthy()
  })

  it('AppController - getWordUsageData: starts a getWordUsageData request', async () => {
    const homonym = {
      languageID: Constants.LANG_GREEK
    }
    const params = {
      paramA: 'Value of A'
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const enableWordUsageExamplesSpy = jest.spyOn(appC, 'enableWordUsageExamples')
    const getWordUsageDataSpy = jest.spyOn(LexicalQuery, 'getWordUsageData')
    await appC.getWordUsageData(homonym, params)
    expect(appC._store.state.app.wordUsageExamplesReady).toBeFalsy()
    expect(enableWordUsageExamplesSpy).toBeCalledTimes(1)
    expect(enableWordUsageExamplesSpy).toBeCalledWith({ languageID: homonym.languageID }, 'onDemand')
    expect(getWordUsageDataSpy).toBeCalledTimes(1)
    expect(getWordUsageDataSpy).toBeCalledWith(homonym, null, params)
  })

  it('AppController - enableWordUsageExamples: should return a truthy value when all conditions are met', async () => {
    const textSelector = {
      languageID: Constants.LANG_LATIN
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC.api.settings.getFeatureOptions().items.enableWordUsageExamples.currentValue = true
    expect(appC.enableWordUsageExamples(textSelector, 'onDemand')).toBeTruthy()
  })

  it('AppController - enableWordUsageExamples: should return a truthy value when all conditions are met for "onLexicalQuery" type', async () => {
    const textSelector = {
      languageID: Constants.LANG_LATIN
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC.api.settings.getFeatureOptions().items.wordUsageExamplesON.currentValue = 'onLexicalQuery'
    appC.api.settings.getFeatureOptions().items.enableWordUsageExamples.currentValue = true
    expect(appC.enableWordUsageExamples(textSelector, 'onLexicalQuery')).toBeTruthy()
  })

  it('AppController - enableWordUsageExamples: should return a falsy value if language is not Latin', async () => {
    const textSelector = {
      languageID: Constants.LANG_GREEK
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC.api.settings.getFeatureOptions().items.enableWordUsageExamples.currentValue = true
    expect(appC.enableWordUsageExamples(textSelector, 'onDemand')).toBeFalsy()
  })

  it('AppController - enableWordUsageExamples: should return a falsy value if enableWordUsageExamples is not set', async () => {
    const textSelector = {
      languageID: Constants.LANG_LATIN
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC.api.settings.getFeatureOptions().items.enableWordUsageExamples.currentValue = false
    expect(appC.enableWordUsageExamples(textSelector, 'onDemand')).toBeFalsy()
  })

  it('AppController - enableWordUsageExamples: should return a falsy value when not all conditions are met for "onLexicalQuery" type', async () => {
    const textSelector = {
      languageID: Constants.LANG_LATIN
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC.api.settings.getFeatureOptions().items.wordUsageExamplesON.currentValue = 'onDemand'
    appC.api.settings.getFeatureOptions().items.enableWordUsageExamples.currentValue = true
    expect(appC.enableWordUsageExamples(textSelector, 'onLexicalQuery')).toBeFalsy()
  })

  it('AppController - getWordUsageExamplesQueryParams: should return an object if word usage examples are enabled', async () => {
    const textSelector = {
      languageID: Constants.LANG_LATIN
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC.api.settings.getFeatureOptions().items.wordUsageExamplesON.currentValue = 'onLexicalQuery'
    appC.api.settings.getFeatureOptions().items.enableWordUsageExamples.currentValue = true
    appC.getWordUsageExamplesQueryParams(textSelector)
    expect(appC.getWordUsageExamplesQueryParams(textSelector)).toEqual({
      paginationMax: appC.api.settings.getFeatureOptions().items.wordUsageExamplesMax.currentValue,
      paginationAuthMax: appC.api.settings.getFeatureOptions().items.wordUsageExamplesAuthMax.currentValue
    })
  })

  it('AppController - getWordUsageExamplesQueryParams: should null if word usage examples are disabled', async () => {
    const textSelector = {
      languageID: Constants.LANG_LATIN
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    appC.api.settings.getFeatureOptions().items.wordUsageExamplesON.currentValue = 'onDemand'
    appC.api.settings.getFeatureOptions().items.enableWordUsageExamples.currentValue = false
    appC.getWordUsageExamplesQueryParams(textSelector)
    expect(appC.getWordUsageExamplesQueryParams(textSelector)).toBeNull()
  })

  it('AppController - handleEscapeKey: should close the UI if the UI is active', async () => {
    const event = {}
    const nativeEvent = {
      keyCode: 27
    }
    const uiState = BaseTestHelp.createUIState({ isActive: () => true })
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const closeUISpy = jest.spyOn(appC.api.ui, 'closeUI')
    appC.handleEscapeKey(event, nativeEvent)
    expect(closeUISpy).toBeCalledTimes(1)
  })

  it('AppController - handleEscapeKey: should do nothing if the UI is inactive', async () => {
    const event = {}
    const nativeEvent = {
      keyCode: 27
    }
    // Redefine `isActive()` method of the UI state so it will be reported as inactive to the UI controller.
    // This will allow us to emulate the inactive state of the `uiState` object.
    const uiState = BaseTestHelp.createUIState({ isActive: () => false })
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const closeUISpy = jest.spyOn(appC.api.ui, 'closeUI')
    appC.handleEscapeKey(event, nativeEvent)
    expect(closeUISpy).toBeCalledTimes(0)
  })

  it('AppController - handleEscapeKey: should do nothing if not the ESC key is pressed', async () => {
    const event = {}
    const nativeEvent = {
      keyCode: 10
    }
    const uiState = BaseTestHelp.createUIState({ isActive: () => true })
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const closeUISpy = jest.spyOn(appC.api.ui, 'closeUI')
    appC.handleEscapeKey(event, nativeEvent)
    expect(closeUISpy).toBeCalledTimes(0)
  })

  it('AppController - startResourceQuery: should start a resource query', async () => {
    const feature = {
      propA: 'Value of A',
      languageID: Constants.LANG_GREEK
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const resourceQuerySpy = jest.spyOn(ResourceQuery, 'create')
    appC.startResourceQuery(feature)
    expect(resourceQuerySpy).toBeCalledTimes(1)
    expect(resourceQuerySpy).toBeCalledWith(feature, { grammars: expect.anything(), resourceOptions: expect.anything() })
  })

  it('AppController - startResourceQuery: should produce a message', async () => {
    const feature = {
      propA: 'Value of A',
      languageID: Constants.LANG_GREEK
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.messages).toEqual([])
    appC.startResourceQuery(feature)
    expect(appC._store.state.ui.messages).toEqual(['Please wait while data is retrieved ...'])
  })

  it('AppController - onLexicalQueryComplete: should handle a successful completion', async () => {
    const data = {
      homonym: { propA: 'Value of A' },
      resultStatus: LexicalQuery.resultStatus.SUCCEEDED
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const showLanguageInfoSpy = jest.spyOn(appC, 'showLanguageInfo')
    expect(appC._store.state.app.inflectionsWaitState).toBeFalsy()
    expect(appC._store.state.app.morphDataReady).toBeFalsy()
    expect(appC._store.state.app.lexicalRequest.endTime).toBe(0)
    expect(appC._store.state.ui.messages).toEqual([])
    appC.onLexicalQueryComplete(data)
    expect(showLanguageInfoSpy).toBeCalledTimes(1)
    expect(showLanguageInfoSpy).toBeCalledWith(data.homonym)
    expect(appC._store.state.ui.messages).toEqual(['All lexical queries complete.'])
    expect(appC._store.state.app.inflectionsWaitState).toBeFalsy()
    expect(appC._store.state.app.morphDataReady).toBeTruthy()
    expect(appC._store.state.app.lexicalRequest.endTime).toBeGreaterThan(0)
  })

  it('AppController - onLexicalQueryComplete: should handle a failure', async () => {
    const data = {
      homonym: { propA: 'Value of A' },
      resultStatus: LexicalQuery.resultStatus.FAILED
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const showLanguageInfoSpy = jest.spyOn(appC, 'showLanguageInfo')
    expect(appC._store.state.app.inflectionsWaitState).toBeFalsy()
    expect(appC._store.state.app.morphDataReady).toBeFalsy()
    expect(appC._store.state.app.lexicalRequest.endTime).toBe(0)
    expect(appC._store.state.ui.messages).toEqual([])
    appC.onLexicalQueryComplete(data)
    expect(showLanguageInfoSpy).toBeCalledTimes(1)
    expect(showLanguageInfoSpy).toBeCalledWith(data.homonym)
    expect(appC._store.state.ui.messages).toEqual(['All lexical queries complete.'])
    expect(appC._store.state.app.inflectionsWaitState).toBeFalsy()
    expect(appC._store.state.app.morphDataReady).toBeTruthy()
    expect(appC._store.state.app.lexicalRequest.endTime).toBeGreaterThan(0)
  })

  it('AppController - onMorphDataReady: should render a message', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.messages).toEqual([])
    appC.onMorphDataReady()
    expect(appC._store.state.ui.messages).toEqual(['Morphological analyzer data is ready'])
  })

  it('AppController - onMorphDataNotFound: should update the app and the UI states', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.notification.visible).toBeFalsy()
    expect(appC._store.state.ui.notification.important).toBeFalsy()
    expect(appC._store.state.ui.notification.text).toBeNull()
    expect(appC._store.state.app.queryStillActive).toBeFalsy()
    appC.onMorphDataNotFound()
    expect(appC._store.state.ui.notification.visible).toBeTruthy()
    expect(appC._store.state.ui.notification.important).toBeTruthy()
    expect(appC._store.state.ui.notification.text).toMatch(/Morphological data not found. Definition queries pending/)
    expect(appC._store.state.app.queryStillActive).toBeTruthy()
  })

  it('AppController - onHomonymReady: should process the homonym data', async () => {
    const targetWord = 'Target word'
    const languageID = Constants.LANG_GREEK
    const homonym = {
      lexemes: [],
      inflections: [],
      targetWord,
      languageID,
      hasShortDefs: () => true
    }
    const sortSpy = jest.spyOn(homonym.lexemes, 'sort')
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.app.languageName).toBe('')
    expect(appC._store.state.app.languageCode).toBe('')
    expect(appC._store.state.app.selectedText).toBe('')
    const enableWordUsageExamplesSpy = jest.spyOn(appC, 'enableWordUsageExamples')
    expect(appC._store.state.app.homonymDataReady).toBeFalsy()
    expect(appC._store.state.app.linkedFeatures).toEqual([])
    expect(appC._store.state.app.morphDataReady).toBeFalsy()
    const updateProvidersSpy = jest.spyOn(appC, 'updateProviders')
    expect(appC._store.state.app.shortDefUpdateTime).toBe(0)
    appC.onHomonymReady(homonym)
    expect(sortSpy).toBeCalledTimes(1)
    expect(appC._store.state.app.languageName).toBe('Greek')
    expect(appC._store.state.app.languageCode).toBe('grc')
    expect(appC._store.state.app.selectedText).toBe(targetWord)
    expect(appC.api.app.homonym).toBe(homonym)
    expect(enableWordUsageExamplesSpy).toBeCalledTimes(1)
    expect(enableWordUsageExamplesSpy).toBeCalledWith({ languageID: languageID })
    expect(appC._store.state.app.homonymDataReady).toBeTruthy()
    expect(appC._store.state.app.linkedFeatures).toEqual(['part of speech', 'case', 'mood', 'declension', 'tense', 'voice'])
    expect(appC._store.state.app.wordUsageExampleEnabled).toBeFalsy()
    expect(appC._store.state.app.morphDataReady).toBeTruthy()
    expect(updateProvidersSpy).toBeCalledTimes(1)
    expect(updateProvidersSpy).toBeCalledWith(homonym)
    expect(appC._store.state.app.shortDefUpdateTime).toBeGreaterThan(0)
  })

  it('AppController - onWordListUpdated: should update wordlist data', async () => {
    const wordList = [
      {}
    ]
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.app.hasWordListsData).toBeFalsy()
    expect(appC._store.state.app.wordListUpdateTime).toBe(0)
    appC.onWordListUpdated(wordList)
    expect(appC._store.state.app.hasWordListsData).toBeTruthy()
    expect(appC._store.state.app.wordListUpdateTime).toBeGreaterThan(0)
  })

  it('AppController - onLemmaTranslationsReady: should call updateTranslations()', async () => {
    const homonym = {
      lexemes: []
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const updateTranslationsSpy = jest.spyOn(appC, 'updateTranslations')
    appC.onLemmaTranslationsReady(homonym)
    expect(updateTranslationsSpy).toBeCalledTimes(1)
    expect(updateTranslationsSpy).toBeCalledWith(homonym)
  })

  it('AppController - onShortDefinitionsReady: should update the short definitions data', async () => {
    const homonym = {
      lexemes: []
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const updateProvidersSpy = jest.spyOn(appC, 'updateProviders')
    const showLanguageInfoSpy = jest.spyOn(appC, 'showLanguageInfo')
    expect(appC._store.state.ui.messages).toEqual([])
    expect(appC._store.state.app.shortDefUpdateTime).toBe(0)
    appC.onShortDefinitionsReady({ homonym })
    expect(appC.api.app.homonym).toBe(homonym)
    expect(updateProvidersSpy).toBeCalledTimes(1)
    expect(updateProvidersSpy).toBeCalledWith(homonym)
    expect(appC._store.state.app.queryStillActive).toBeFalsy()
    expect(showLanguageInfoSpy).toBeCalledTimes(1)
    expect(showLanguageInfoSpy).toBeCalledWith(homonym)
    expect(appC._store.state.ui.messages).toEqual([expect.stringContaining('request is completed successfully. Lemma')])
    expect(appC._store.state.app.shortDefUpdateTime).toBeGreaterThan(0)
  })

  it('AppController - onFullDefinitionsReady: should update the full definitions data', async () => {
    const homonym = {
      lexemes: []
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const updateProvidersSpy = jest.spyOn(appC, 'updateProviders')
    expect(appC._store.state.ui.messages).toEqual([])
    expect(appC._store.state.app.fullDefUpdateTime).toBe(0)
    appC.onFullDefinitionsReady({ homonym })
    expect(updateProvidersSpy).toBeCalledTimes(1)
    expect(updateProvidersSpy).toBeCalledWith(homonym)
    expect(appC._store.state.ui.messages).toEqual([expect.stringContaining('request is completed successfully. Lemma')])
    expect(appC._store.state.app.fullDefUpdateTime).toBeGreaterThan(0)
  })

  it('AppController - onDefinitionsNotFound: should commit a message', async () => {
    const data = {
      requestType: 'Test request type',
      word: 'Test word'
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.messages).toEqual([])
    appC.onDefinitionsNotFound(data)
    expect(appC._store.state.ui.messages).toEqual([expect.stringContaining('request failed. Lemma not found')])
  })

  it('AppController - onResourceQueryComplete: should commit a message', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.ui.messages).toEqual([])
    appC.onResourceQueryComplete()
    expect(appC._store.state.ui.messages).toEqual([expect.stringContaining('All grammar resource data retrieved')])
  })

  it('AppController - onGrammarAvailable: should update grammar and commit a message', async () => {
    const urlOne = 'url1'
    const urlTwo = 'url2'
    const data = {
      languageID: Constants.LANG_LATIN,
      urls: [
        urlTwo,
        urlOne
      ]
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const updateGrammarSpy = jest.spyOn(appC, 'updateGrammar')
    expect(appC._store.state.ui.messages).toEqual([])
    appC.onGrammarAvailable(data)
    expect(updateGrammarSpy).toBeCalledTimes(1)
    expect(updateGrammarSpy).toBeCalledWith(data)
    expect(appC._store.state.ui.messages).toEqual([expect.stringContaining('Grammar resource retrieved')])
  })

  it('AppController - onGrammarNotFound: should reset grammar and commit a message', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const updateGrammarSpy = jest.spyOn(appC, 'updateGrammar')
    expect(appC._store.state.ui.messages).toEqual([])
    appC.onGrammarNotFound()
    expect(appC._store.state.ui.messages).toEqual([expect.stringContaining('No grammar resources have been found')])
    expect(updateGrammarSpy).toBeCalledTimes(1)
    expect(updateGrammarSpy).toBeCalledWith()
  })

  it('AppController - onWordItemSelected: should update homonym data if the homonym data is present', async () => {
    const languageID = Constants.LANG_LATIN
    const wordItem = {
      targetWord: 'A test word',
      languageCode: 'lat',
      homonym: {
        lexemes: [
          {
            inflections: [],
            isPopulated: () => true
          }
        ],
        inflections: [],
        targetWord: 'A test word',
        languageID,
        hasShortDefs: () => true
      }
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const newLexicalRequestSpy = jest.spyOn(appC, 'newLexicalRequest')
    const onHomonymReadySpy = jest.spyOn(appC, 'onHomonymReady')
    const wlHomonymReadySpy = jest.spyOn(appC._wordlistC, 'onHomonymReady')
    const updateProvidersSpy = jest.spyOn(appC, 'updateProviders')
    const updateTranslationsSpy = jest.spyOn(appC, 'updateTranslations')
    expect(appC._store.state.app.shortDefUpdateTime).toBe(0)
    expect(appC._store.state.app.fullDefUpdateTime).toBe(0)
    await appC.onWordItemSelected(wordItem)
    expect(newLexicalRequestSpy).toBeCalledTimes(1)
    expect(newLexicalRequestSpy).toBeCalledWith(wordItem.targetWord, languageID, null, 'wordlist')
    expect(onHomonymReadySpy).toBeCalledTimes(1)
    expect(onHomonymReadySpy).toBeCalledWith(wordItem.homonym)
    expect(wlHomonymReadySpy).toBeCalledTimes(1)
    expect(wlHomonymReadySpy).toBeCalledWith(wordItem.homonym)
    expect(updateProvidersSpy).toBeCalled()
    expect(updateProvidersSpy).toBeCalledWith(wordItem.homonym)
    expect(appC._store.state.app.shortDefUpdateTime).toBeGreaterThan(0)
    expect(appC._store.state.app.fullDefUpdateTime).toBeGreaterThan(0)
    expect(updateTranslationsSpy).toBeCalled()
    expect(updateTranslationsSpy).toBeCalledWith(wordItem.homonym)
    expect(appC._store.state.app.inflectionsWaitState).toBeFalsy()
    expect(appC._store.state.app.morphDataReady).toBeTruthy()
    expect(appC._store.state.app.lexicalRequest.endTime).toBeGreaterThan(0)
  })

  it('AppController - onWordItemSelected: should start a lookup request if homonym data is incomplete', async () => {
    const languageID = Constants.LANG_LATIN
    const wordItem = {
      targetWord: 'A test word',
      languageCode: 'lat',
      homonym: {
        lexemes: [],
        inflections: [],
        targetWord: 'A test word',
        languageID,
        hasShortDefs: () => true
      }
    }
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const lookupTextSpy = jest.spyOn(appC.api.lexis, 'lookupText')
    await appC.onWordItemSelected(wordItem)
    expect(lookupTextSpy).toBeCalledTimes(1)
  })

  it('AppController - applyAllOptions: should update all feature options', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const applyFeatureOptionSpy = jest.spyOn(appC, 'applyFeatureOption')
    expect(appC._store.state.settings.featureResetCounter).toBe(0)
    appC.applyAllOptions()
    expect(applyFeatureOptionSpy).toBeCalledTimes(14)
    expect(appC._store.state.settings.featureResetCounter).toBeGreaterThan(0)
  })

  it('AppController - applyAllOptions: should update the resource reset counter', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    expect(appC._store.state.settings.resourceResetCounter).toBe(0)
    appC.applyAllOptions()
    expect(appC._store.state.settings.resourceResetCounter).toBeGreaterThan(0)
  })

  it('AppController - applyAllOptions: should update all UI options', async () => {
    appC = AppController.jestCreate(uiState)
    await appC.init()
    await appC.activate()
    const applyFeatureOptionSpy = jest.spyOn(appC, 'applyFeatureOption')
    expect(appC._store.state.settings.uiResetCounter).toBe(0)
    appC.applyAllOptions()
    expect(applyFeatureOptionSpy).toBeCalledTimes(14)
    expect(appC._store.state.settings.uiResetCounter).toBeGreaterThan(0)
  })
})
