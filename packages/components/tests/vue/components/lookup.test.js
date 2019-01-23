/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Lookup from '@/vue/components/lookup.vue'
import Setting from '@/vue/components/setting.vue'

import Vue from 'vue/dist/vue'

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
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  const l10nModule = new L10nModule(Locales.en_US, Locales.createBundleArr([
    [enUS, Locales.en_US],
    [enUSData, Locales.en_US],
    [enUSInfl, Locales.en_US],
    [enGB, Locales.en_GB]
  ]))

  it('1 Lookup - renders a vue instance (min requirements)', () => {
    let cmp = mount(Lookup, {
      propsData: {
        uiController: null
      }
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

    let contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: {
          contentOptions: contentOptions,
          resourceOptions: resourceOptions,
          updateLanguage: function () {}
        }
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    expect(cmp.vm.options).toBeDefined()
    expect(cmp.vm.resourceOptions).toBeDefined()

    expect(cmp.vm.currentLanguage).toEqual(contentOptions.items.lookupLanguage.currentTextValue())
    expect(cmp.vm.initLanguage).toBeNull()

    expect(cmp.vm.lookupLanguage.currentTextValue()).toEqual(cmp.vm.options.items.lookupLanguage.currentTextValue())

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
    let contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { contentOptions: contentOptions, resourceOptions: resourceOptions },
        parentLanguage: 'Latin'
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    expect(cmp.vm.initLanguage).toEqual('Latin')
    expect(cmp.vm.currentLanguage).toEqual('Latin')
    expect(cmp.vm.options.items.lookupLanguage.currentTextValue()).toEqual('Latin')

    expect(cmp.vm.lexiconSettingName).toEqual(`lexiconsShort-lat`)
    expect(cmp.vm.lexiconsFiltered).toEqual(resourceOptions.items.lexiconsShort.filter((item) => item.name === `lexiconsShort-lat`))
    expect(cmp.vm.lookupLanguage.currentTextValue()).toEqual(cmp.vm.options.items.lookupLanguage.currentTextValue())
  })

  it('4 Lookup - settings block', () => {
    let contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { contentOptions: contentOptions, resourceOptions: resourceOptions }
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
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
    let contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { contentOptions: contentOptions, resourceOptions: resourceOptions }
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    cmp.vm.settingChange('', 'Greek')
    expect(cmp.vm.options.items.lookupLanguage.currentTextValue()).toEqual('Greek')
    expect(cmp.vm.currentLanguage).toEqual('Greek')

    cmp.vm.resourceSettingChange('lexiconsShort-grc', ['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])
    let keyinfo = resourceOptions.parseKey('lexiconsShort-grc')

    expect(cmp.vm.resourceOptions.items[keyinfo.setting][0].currentTextValue()).toEqual(['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])
  })

  it('6 Lookup - check required props', () => {
    let cmp = mount(Lookup)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "uiController"'))
  })

  it('7 Lookup - override language check - not checked by default', () => {
    let contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { contentOptions: contentOptions, resourceOptions: resourceOptions }
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    expect(cmp.vm.overrideLanguage).toBeFalsy()
    expect(cmp.vm.uiController.contentOptions.items.lookupLangOverride.currentValue).toBeFalsy()
    expect(cmp.vm.showLanguageSettings).toBeFalsy()
  })

  it('8 Lookup - override language check - checkboxClick method changes options (true)', () => {
    let contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { contentOptions: contentOptions, resourceOptions: resourceOptions }
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    jest.spyOn(cmp.vm, 'updateUIbyOverrideLanguage')
    jest.spyOn(cmp.vm, 'switchLookupSettings')

    cmp.vm.checkboxClick()

    expect(cmp.vm.overrideLanguage).toBeTruthy()
    expect(cmp.vm.uiController.contentOptions.items.lookupLangOverride.currentValue).toBeTruthy()
    expect(cmp.vm.updateUIbyOverrideLanguage).toBeCalled()
    expect(cmp.vm.switchLookupSettings).toBeCalled()
    expect(cmp.vm.showLanguageSettings).toBeTruthy()
  })

  it('8 Lookup - override language check - checkboxClick method changes options (false)', () => {
    let contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { contentOptions: contentOptions, resourceOptions: resourceOptions }
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    cmp.vm.checkboxClick()

    cmp.vm.checkboxClick()
    expect(cmp.vm.overrideLanguage).toBeFalsy()
    expect(cmp.vm.uiController.contentOptions.items.lookupLangOverride.currentValue).toBeFalsy()
    expect(cmp.vm.currentLanguage).toEqual(cmp.vm.options.items.preferredLanguage.currentTextValue())
    expect(cmp.vm.options.items.lookupLanguage.currentValue).toEqual(cmp.vm.options.items.preferredLanguage.currentValue)
  })

  it('9 Lookup - watch clearLookupText - clears lookuptext and restore show language data from override language check', () => {
    let contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { contentOptions: contentOptions, resourceOptions: resourceOptions }
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    cmp.vm.lookuptext = 'some text'
    cmp.vm.checkboxClick()
    cmp.vm.showLanguageSettings = false

    cmp.vm.clearLookupText = true

    expect(cmp.vm.lookuptext).toEqual('')
    expect(cmp.vm.showLanguageSettings).toBeTruthy()
    expect(cmp.vm.overrideLanguage).toBeTruthy()
  })

  it('9 Lookup - watch uiController.contentOptions.items.lookupLangOverride.currentValue - syncing overrideLanguage', async () => {
    let contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { contentOptions: contentOptions, resourceOptions: resourceOptions }
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })
    jest.spyOn(cmp.vm, 'updateUIbyOverrideLanguage')

    expect(cmp.vm.overrideLanguage).toBeFalsy()
    expect(cmp.vm.uiController.contentOptions.items.lookupLangOverride.currentValue).toBeFalsy()

    cmp.vm.uiController.contentOptions.items.lookupLangOverride.setValue(true)

    setTimeout(() => {
      expect(cmp.vm.overrideLanguage).toBeTruthy()
      expect(cmp.vm.updateUIbyOverrideLanguage).toBeCalled()
    }, 500)
  })
})
