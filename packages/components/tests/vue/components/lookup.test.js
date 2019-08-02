/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Lookup from '@/vue/components/lookup.vue'
import Setting from '@/vue/components/setting.vue'

import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

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
  let settingsAPI
  let l10nModule

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            selectedLookupLangCode: 'lat'
          }
        }
      }
    })

    // Modify defaults to provide more precise test results
    FeatureOptionDefaults.items.preferredLanguage.defaultValue = 'ara'
    FeatureOptionDefaults.items.lookupLanguage.defaultValue = 'grc'

    let ta1 = new TempStorageArea('alpheios-feature-settings')
    let ta2 = new TempStorageArea('alpheios-resource-options')
    let ta3 = new TempStorageArea('alpheios-ui-settings')

    let featureOptions = new Options(FeatureOptionDefaults, ta1)
    let resourceOptions = new Options(LanguageOptionDefaults, ta2)
    let uiOptions = new Options(UIOptionDefaults, ta3)
    let lookupResourceOptions = new Options(LanguageOptionDefaults, ta2)

    api = {
      app: {
        state: {
          lemmaTranslationLang: 'lat',
          selectedLookupLangCode: 'lat'
        },
        updateLanguage: () => true,
        enableWordUsageExamples: () => true,
        setSelectedLookupLang: () => true,
        getLanguageName: () => 'Latin'
      },
      settings: {
        getFeatureOptions: () => { return featureOptions },
        getResourceOptions: () => { return resourceOptions },
        lookupResourceOptions: lookupResourceOptions,
        verboseMode: () => { return false }
      }
    }

    l10nModule = new L10nModule(store, api, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr([
        [enUS, Locales.en_US],
        [enUSData, Locales.en_US],
        [enUSInfl, Locales.en_US],
        [enGB, Locales.en_GB]
      ])
    })
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Lookup shall create a Vue instance', () => {
    localVue.use(Vuex)
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
    localVue.use(Vuex)
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.props().usePageLangPrefs).toBeFalsy()
    expect(cmp.vm.$options.lookupLanguage).toBe(api.settings.getFeatureOptions().items.lookupLanguage)
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
    expect(cmp.vm.$options.lookupLanguage).toBe(api.settings.getFeatureOptions().items.lookupLanguage)
  })

  it(`8 Lookup's lookup action shall not proceed if lookup text is empty`, () => {
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

  it(`9 Lookup's lookup action shall call LexicalQueryLookup.create if correct lookup text is provided`, () => {
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
})
