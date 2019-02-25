/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount, createLocalVue } from '@vue/test-utils'
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
import ContentOptionDefaults from '@/settings/content-options-defaults.json'
import TempStorageArea from '@/lib/options/temp-storage-area.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'

import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup.js'

describe('lookup.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let contentOptions
  let resourceOptions
  let store
  let api
  let l10nModule

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = new Vuex.Store({
      modules: {}
    })

    contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    api = {
      settings: {
        contentOptions,
        resourceOptions
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

  it('1 Lookup - renders a vue instance (min requirements)', () => {
    let cmp = mount(Lookup, {
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Lookup - full renders and click lookup button execute', () => {
    let fn = LexicalQueryLookup.create
    LexicalQueryLookup.create = function () {
      return {
        getData: function () { }
      }
    }

    let cmp = mount(Lookup, {
      mocks: api
    })

    expect(cmp.vm.settings.contentOptions).toBeDefined()
    expect(cmp.vm.settings.resourceOptions).toBeDefined()

    expect(cmp.vm.currentLanguage).toEqual(contentOptions.items.lookupLanguage.currentTextValue())
    expect(cmp.vm.initLanguage).toBeNull()

    expect(cmp.vm.lookupLanguage.currentTextValue()).toEqual(cmp.vm.settings.contentOptions.items.lookupLanguage.currentTextValue())

    expect(cmp.find('input').exists()).toBeTruthy()
    jest.spyOn(LexicalQueryLookup, 'create')

    // TODO: Redo this after changes in Vue components are finalized
    /* cmp.find('button').trigger('click')
    expect(LexicalQueryLookup.create).not.toHaveBeenCalled() */

    cmp.setData({
      lookuptext: 'footext'
    })
    expect(cmp.find('input').element.value).toEqual('footext')

    // TODO: Redo this after changes in Vue components are finalized
    /* cmp.find('button').trigger('click')
    expect(LexicalQueryLookup.create).toHaveBeenCalled() */

    LexicalQueryLookup.create = fn
  })

  it('3 Lookup - created with parent language', () => {
    let cmp = mount(Lookup, {
      propsData: {
        parentLanguage: 'Latin'
      },
      mocks: api
    })

    expect(cmp.vm.initLanguage).toEqual('Latin')
    expect(cmp.vm.currentLanguage).toEqual('Latin')
    expect(cmp.vm.settings.contentOptions.items.lookupLanguage.currentTextValue()).toEqual('Latin')

    expect(cmp.vm.lexiconSettingName).toEqual(`lexiconsShort-lat`)
    expect(cmp.vm.lexiconsFiltered).toEqual(resourceOptions.items.lexiconsShort.filter((item) => item.name === `lexiconsShort-lat`))
    expect(cmp.vm.lookupLanguage.currentTextValue()).toEqual(cmp.vm.settings.contentOptions.items.lookupLanguage.currentTextValue())
  })

  it('4 Lookup - settings block', () => {
    let cmp = mount(Lookup, {
      mocks: api
    })
    expect(cmp.vm.showLanguageSettings).toBeFalsy()
    expect(cmp.find('.alpheios-lookup__settings-items').element.style.display).toEqual('none')

    // cmp.find('.alpheios-lookup__settings-link').trigger('click')

    cmp.vm.switchLookupSettings()
    expect(cmp.vm.showLanguageSettings).toBeTruthy()
    expect(cmp.find('.alpheios-lookup__settings-items').element.style.display).not.toEqual('none')

    expect(cmp.findAll(Setting).length).toEqual(1)

    cmp.vm.switchLookupSettings()
    expect(cmp.vm.showLanguageSettings).toBeFalsy()

    cmp.vm.switchLookupSettings()
    expect(cmp.vm.showLanguageSettings).toBeTruthy()
  })

  it('5 Lookup - settings block events', () => {
    let cmp = mount(Lookup, {
      mocks: api
    })

    cmp.vm.settingChange('', 'Greek')
    expect(cmp.vm.instanceContentOptions.items.lookupLanguage.currentTextValue()).toEqual('Greek')
    expect(cmp.vm.currentLanguage).toEqual('Greek')

    cmp.vm.resourceSettingChange('lexiconsShort-grc', ['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])
    let keyinfo = resourceOptions.parseKey('lexiconsShort-grc')

    expect(cmp.vm.instanceResourceOptions.items[keyinfo.setting][0].currentTextValue()).toEqual(['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])
  })

  it('6 Lookup - override language check - not checked by default', () => {
    let cmp = mount(Lookup, {
      mocks: api
    })

    expect(cmp.vm.overrideLanguage).toBeFalsy()
    expect(cmp.vm.settings.contentOptions.items.lookupLangOverride.currentValue).toBeFalsy()
    expect(cmp.vm.showLanguageSettings).toBeFalsy()
  })

  it('7 Lookup - override language check - checkboxClick method changes options (true)', () => {
    let cmp = mount(Lookup, {
      mocks: api
    })

    jest.spyOn(cmp.vm, 'updateUIbyOverrideLanguage')
    jest.spyOn(cmp.vm, 'switchLookupSettings')

    cmp.vm.checkboxClick()

    expect(cmp.vm.overrideLanguage).toBeTruthy()
    expect(cmp.vm.settings.contentOptions.items.lookupLangOverride.currentValue).toBeTruthy()
    expect(cmp.vm.updateUIbyOverrideLanguage).toBeCalled()
    expect(cmp.vm.switchLookupSettings).toBeCalled()
    expect(cmp.vm.showLanguageSettings).toBeTruthy()
  })

  it('8 Lookup - override language check - checkboxClick method changes options (false)', () => {
    let cmp = mount(Lookup, {
      mocks: api
    })

    cmp.vm.checkboxClick()

    cmp.vm.checkboxClick()
    expect(cmp.vm.overrideLanguage).toBeFalsy()
    expect(cmp.vm.settings.contentOptions.items.lookupLangOverride.currentValue).toBeFalsy()
    expect(cmp.vm.currentLanguage).toEqual(cmp.vm.instanceContentOptions.items.preferredLanguage.currentTextValue())
    expect(cmp.vm.instanceContentOptions.items.lookupLanguage.currentValue).toEqual(cmp.vm.instanceContentOptions.items.preferredLanguage.currentValue)
  })

  it('9 Lookup - watch clearLookupText - clears lookuptext and restore show language data from override language check', () => {
    let cmp = mount(Lookup, {
      mocks: api
    })

    cmp.vm.lookuptext = 'some text'
    cmp.vm.checkboxClick()
    cmp.vm.showLanguageSettings = false

    cmp.vm.clearLookupText = true

    expect(cmp.vm.lookuptext).toEqual('')
    expect(cmp.vm.showLanguageSettings).toBeTruthy()
    expect(cmp.vm.overrideLanguage).toBeTruthy()
  })

  it('10 Lookup - watch uiController.contentOptions.items.lookupLangOverride.currentValue - syncing overrideLanguage', async () => {
    let cmp = mount(Lookup, {
      mocks: api
    })
    jest.spyOn(cmp.vm, 'updateUIbyOverrideLanguage')

    expect(cmp.vm.overrideLanguage).toBeFalsy()
    expect(cmp.vm.settings.contentOptions.items.lookupLangOverride.currentValue).toBeFalsy()

    cmp.vm.settings.contentOptions.items.lookupLangOverride.setValue(true)

    setTimeout(() => {
      expect(cmp.vm.overrideLanguage).toBeTruthy()
      expect(cmp.vm.updateUIbyOverrideLanguage).toBeCalled()
    }, 500)
  })
})
