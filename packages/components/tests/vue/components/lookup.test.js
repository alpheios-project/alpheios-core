/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import Lookup from '@/vue/components/lookup.vue'

import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Options from '@/lib/options/options.js'
import FeatureOptionDefaults from '@/settings/feature-options-defaults.json'
import TempStorageArea from '@/lib/options/temp-storage-area.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import UIOptionDefaults from '@/settings/ui-options-defaults.json'

import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup.js'

describe('lookup.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  
  const nameBase = 'LookupNameBase'

  let store
  let api

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = BaseTestHelp.baseVuexStore()

    api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)
  })

  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Lookup shall create a Vue instance', () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(cmp.props().nameBase).toBe(nameBase)
    expect(cmp.props().usePageLangPrefs).toBeFalsy()
  })

  it('2 Lookup (with default parameters) shall be initialized properly', () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.props().usePageLangPrefs).toBeFalsy()
    expect(cmp.vm.$options.lookupLanguage).toEqual(cmp.vm.settings.getFeatureOptions().items.lookupLanguage)
  })

  it('3 Lookup (set to show a language selector) shall be initialized properly', () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase,
        showLangSelector: true
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.props().showLangSelector).toBeTruthy()
    expect(cmp.vm.$options.lookupLanguage).toEqual(api.settings.getFeatureOptions().items.lookupLanguage)
  })

  it('4 Lookup\'s lookup action shall not proceed if lookup text is empty', () => {
    let fn = LexicalQueryLookup.create
    LexicalQueryLookup.create = function () {
      return {
        getData: function () { }
      }
    }

    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.find('input').exists()).toBeTruthy()
    jest.spyOn(LexicalQueryLookup, 'create')

    cmp.find('button').trigger('click')
    expect(LexicalQueryLookup.create).not.toHaveBeenCalled()

    LexicalQueryLookup.create = fn
  })

  it('5 Lookup\'s lookup action shall call LexicalQueryLookup.create if correct lookup text is provided', async () => {
    let fn = LexicalQueryLookup.create
    LexicalQueryLookup.create = function () {
      return {
        getData: function () { }
      }
    }

    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.find('input').exists()).toBeTruthy()
    jest.spyOn(LexicalQueryLookup, 'create')

    cmp.setData({
      lookuptext: 'footext'
    })
    expect(cmp.find('input').element.value).toEqual('footext')

    cmp.find('button').trigger('click')


    expect(LexicalQueryLookup.create).toHaveBeenCalled()

    LexicalQueryLookup.create = fn
  })

  it('6 Lookup - method showLookupResult opens popup and closes panel for the lookup result when showResultsIn = popup', () => {
    let api = {
      ui: BaseTestHelp.uiAPI({
        openPopup: jest.fn(),
        closePanel: jest.fn(),
        showPanelTab: jest.fn()
      }),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      showResultsIn: 'popup'
    })

    cmp.vm.showLookupResult()

    expect(cmp.vm.ui.openPopup).toHaveBeenCalled()
    expect(cmp.vm.ui.closePanel).toHaveBeenCalled()
    expect(cmp.vm.ui.showPanelTab).not.toHaveBeenCalled()
  })

  it('7 Lookup - method showLookupResult warns if showResultsIn != popup and panel', () => {
    let api = {
      ui: BaseTestHelp.uiAPI({
        openPopup: jest.fn(),
        closePanel: jest.fn(),
        showPanelTab: jest.fn()
      }),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      showResultsIn: 'test'
    })

    jest.spyOn(cmp.vm.$options.logger, 'warn')

    cmp.vm.showLookupResult()

    expect(cmp.vm.ui.openPopup).not.toHaveBeenCalled()
    expect(cmp.vm.ui.closePanel).not.toHaveBeenCalled()
    expect(cmp.vm.ui.showPanelTab).not.toHaveBeenCalled()
    expect(cmp.vm.$options.logger.warn).toHaveBeenCalledWith(expect.stringContaining('Unknown afterLookupAction value: test'))
  })

  it('8 Lookup - method showLookupResult shows panel tab for the lookup result when showResultsIn = panel', () => {
    let api = {
      ui: BaseTestHelp.uiAPI({
        openPopup: jest.fn(),
        closePanel: jest.fn(),
        showPanelTab: jest.fn()
      }),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      showResultsIn: 'panel'
    })

    cmp.vm.showLookupResult()

    expect(cmp.vm.ui.openPopup).not.toHaveBeenCalled()
    expect(cmp.vm.ui.closePanel).not.toHaveBeenCalled()
    expect(cmp.vm.ui.showPanelTab).toHaveBeenCalledWith('morphology')
  })

  it('9 Lookup\'s -method settingChange changes lookupLanguage, setSelectedLookupLang in store and updates langUpdated', async () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.$options.lookupLanguage.currentValue).toEqual('lat')
    expect(cmp.vm.$store.state.app.selectedLookupLangCode).toEqual('lat')

    cmp.vm.settingChange(null, 'Greek')

    expect(cmp.vm.$options.lookupLanguage.currentValue).toEqual('grc')
    expect(cmp.vm.$store.state.app.selectedLookupLangCode).toEqual('grc')
    expect(cmp.vm.langUpdated).toBeGreaterThan(0)

  })

  it('10 Lookup\'s - when morphDataReady is changed and is not empty then lookupText is cleared', async () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        hasMorphData: () => true
      })
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestMorphDataReady', false)

    cmp.setData({
      lookuptext: 'mare'
    })

    store.commit('app/setTestMorphDataReady', true)

    expect(cmp.vm.lookuptext).toEqual('')
  })

  it('11 Lookup\'s - method toggleLangSelector emitts toggleLangSelector with true value', async () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    cmp.vm.toggleLangSelector()

    expect(cmp.emitted()['toggleLangSelector'][0]).toEqual([true])
  })
})
