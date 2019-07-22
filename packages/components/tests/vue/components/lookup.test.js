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
          state: {}
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
          lemmaTranslationLang: 'lat'
        },
        updateLanguage: () => true,
        enableWordUsageExamples: () => true,
        setSelectedLookupLang: () => true
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
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
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
      localVue,
      mocks: api
    })

    expect(cmp.props().usePageLangPrefs).toBeFalsy()
    expect(cmp.vm.$options.lookupLanguage).toBe(api.settings.getFeatureOptions().items.lookupLanguage)
    expect(cmp.vm.$options.resourceOptions).toStrictEqual(api.settings.lookupResourceOptions)
  })

  it('3 Lookup (set to show a language selector) shall be initialized properly', () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase,
        showLangSelector: true
      },
      localVue,
      mocks: api
    })

    expect(cmp.props().showLangSelector).toBeTruthy()
    expect(cmp.vm.$options.lookupLanguage).toBe(api.settings.getFeatureOptions().items.lookupLanguage)
    expect(cmp.vm.$options.resourceOptions).toStrictEqual(api.settings.lookupResourceOptions)
  })

  it('5 Lookup(set to show a language selector).currentLanguage shall return correct values', () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase,
        showLangSelector: true
      },
      localVue,
      mocks: api
    })

    expect(cmp.vm.selectedLangName).toEqual('Greek')
  })

  it('6 Lookup(with default parameters).lexiconsFiltered shall return correct values', () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      localVue,
      mocks: api
    })

    expect(cmp.vm.lexiconsFiltered).toEqual([{
      currentValue: ['https://github.com/alpheios-project/lsj'],
      defaultValue: ['https://github.com/alpheios-project/lsj'],
      labelText: 'Greek Lexicons (short)',
      multiValue: true,
      name: 'alpheios-resource-options__2__lexiconsShort__grc',
      storageAdapter: {
        domain: 'alpheios-resource-options'
      },
      values: [
        {
          text: 'Middle Liddell',
          value: 'https://github.com/alpheios-project/ml'
        },
        {
          text: 'Liddell, Scott, Jones',
          value: 'https://github.com/alpheios-project/lsj'
        },
        {
          text: 'Autenrieth Homeric Lexicon',
          value: 'https://github.com/alpheios-project/aut'
        },
        {
          text: 'Dodson',
          value: 'https://github.com/alpheios-project/dod'
        },
        {
          text: 'Abbott-Smith',
          value: 'https://github.com/alpheios-project/as'
        }
      ]
    }])
  })

  it('7 Lookup(set to show a language selector).lexiconsFiltered shall return correct values', () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase,
        showLangSelector: true
      },
      localVue,
      mocks: api
    })

    expect(cmp.vm.lexiconsFiltered).toEqual([{
      currentValue: ['https://github.com/alpheios-project/lsj'],
      defaultValue: ['https://github.com/alpheios-project/lsj'],
      labelText: 'Greek Lexicons (short)',
      multiValue: true,
      name: 'alpheios-resource-options__2__lexiconsShort__grc',
      storageAdapter: {
        domain: 'alpheios-resource-options'
      },
      values: [
        {
          text: 'Middle Liddell',
          value: 'https://github.com/alpheios-project/ml'
        },
        {
          text: 'Liddell, Scott, Jones',
          value: 'https://github.com/alpheios-project/lsj'
        },
        {
          text: 'Autenrieth Homeric Lexicon',
          value: 'https://github.com/alpheios-project/aut'
        },
        {
          text: 'Dodson',
          value: 'https://github.com/alpheios-project/dod'
        },
        {
          text: 'Abbott-Smith',
          value: 'https://github.com/alpheios-project/as'
        }
      ]
    }])
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

  it(`10 Lookup's dictionaries block shall be displayed by default`, () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      localVue,
      mocks: api
    })
    expect(cmp.find('.alpheios-lookup__settings').exists()).toBe(true)
  })

  it(`12 Lookup shall display a list of dictionaries for languages where that list exists`, () => {
    let cmp = mount(Lookup, {
      propsData: {
        nameBase: nameBase,
        showLangSelector: true
      },
      localVue,
      mocks: api
    })

    expect(cmp.find('.alpheios-lookup__settings').exists()).toBe(true)
    expect(cmp.find('.alpheios-lookup__resource-control').exists()).toBe(true)
  })

  it(`13 Lookup shall NOT display a list of dictionaries for languages that has none`, () => {
    let cmp = shallowMount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      localVue,
      mocks: api
    })

    expect(cmp.find('.alpheios-lookup__settings').exists()).toBe(true)
    expect(cmp.find('.alpheios-lookup__resource-control').exists()).toBe(false)
  })

  it.skip('14 Lookup: events of selector elements shall update data correctly', () => {
    let cmp = mount(Lookup, {
      propsData: {
        nameBase: nameBase
      },
      localVue,
      mocks: api
    })

    cmp.vm.settingChange('', 'Greek')
    expect(cmp.vm.$options.lookupLanguage.currentTextValue()).toEqual('Greek')

    cmp.vm.resourceSettingChange('alpheios-resource-options__2__lexiconsShort__grc', ['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])

    expect(cmp.vm.$options.resourceOptions.items.lexiconsShort[0].currentTextValue()).toEqual(['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])
  })
})
