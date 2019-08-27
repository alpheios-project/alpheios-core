/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Popup from '@/vue/components/popup.vue'
import Tooltip from '@/vue/components/tooltip.vue'
import Lookup from '@/vue/components/lookup.vue'
import Setting from '@/vue/components/setting.vue'

import Vue from 'vue/dist/vue'
import Vuex from 'vuex'

import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import AuthModule from '@/vue/vuex-modules/data/auth-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

import Options from '@/lib/options/options.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import FeatureOptionDefaults from '@/settings/feature-options-defaults.json'
import UIOptionDefaults from '@/settings/ui-options-defaults.json'
import LocalStorageArea from '@/lib/options/local-storage-area.js'
import TempStorageArea from '@/lib/options/temp-storage-area.js'

describe('popup.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let api = {}
  let settingsAPI
  let l10nModule
  let authModule
  const uiAPI = {
    closePopup: () => {}
  }
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    let ta1 = new TempStorageArea('alpheios-feature-settings')
    let ta2 = new TempStorageArea('alpheios-resource-settings')
    let ta3 = new TempStorageArea('alpheios-ui-settings')
    let featureOptions = new Options(FeatureOptionDefaults, ta1)
    let resourceOptions = new Options(LanguageOptionDefaults, ta2)
    let uiOptions = new Options(UIOptionDefaults, ta3)
    const appAPI = {
      platform: {
        viewport: {
          width: 0,
          height: 0
        }
      }
    }
    let settingsAPI = {
      getFeatureOptions: () => { return featureOptions },
      getResourceOptions: () => { return resourceOptions },
      getUiOptions: () => { return uiOptions },
      verboseMode: () => { return false }
    }

    store = new Vuex.Store({
      modules: {
        popup: {
          state: {
            visible: false
          },
          actions: {},
          getters: {}
        },
        app: {
          status: {
            selectedText: '',
            languageName: '',
            languageCode: ''
          }
        },
        ui: {
          namespaced: true,
          state: {
            rootClasses: [],

            messages: [],
            notification: {
              visible: false,
              important: false,
              showLanguageSwitcher: false,
              text: null
            }
          }
        }
      }
    })

    authModule = new AuthModule(store,api,{auth:null})
    api = {
      ui: uiAPI,
      auth: authModule,
      settings: settingsAPI,
      app: appAPI
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

  it.skip('1 Popup - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return {
          moduleConfig: {
            draggable: true,
            initialShift: { x: 0, y: 0 }
          },
          shift: { x: 0, y: 0 }
        }
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it.skip('2 Popup - render with children components (min requirements)', async () => {
    let featureOptions = new Options(FeatureOptionDefaults, LocalStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

    let cmp = mount(Popup, {
      propsData: {
        messages: [],
        lexemes: [],
        definitions: {},
        linkedfeatures: [],
        visible: false,
        translations: {}
      },
      computed: {
        'uiController': function () {
          return {
            featureOptions: featureOptions,
            resourceOptions: resourceOptions
          }
        }
      },
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.vm.interactInstance).not.toBeDefined()

    expect(cmp.element.style.display).toEqual('none')

    expect(cmp.find('.alpheios-popup__header').findAll('button').length).not.toBeLessThan(4)

    expect(cmp.find('.alpheios-popup__header').findAll(Tooltip).length).not.toBeLessThan(4)

    for (let i = 0; i < 4; i++) {
      expect(cmp.find('.alpheios-popup__header').findAll(Tooltip).at(i).find('button').exists()).toBeTruthy()
    }

    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).toEqual('none')
    expect(cmp.findAll('.alpheios-popup__definitions--placeholder').filter(w => w.element.style.display !== 'none').exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__providers').find('img').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-popup__providers').find('a').exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__morph-cont-providers').exists()).toBeFalsy()

    expect(cmp.find(Lookup)).toBeTruthy()

    let lookupC = cmp.find(Lookup)

    expect(lookupC.find('input').exists()).toBeTruthy()
    expect(lookupC.find('button').exists()).toBeTruthy()
    expect(lookupC.findAll(Setting).length).toEqual(1)
  })

  it.skip('3 Popup - render with children components (l10n - check labels buttons)', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: false,
      translations: {}
    }
    curProps.data.l10n = l10n

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.find('.alpheios-popup__more-btn-treebank').text()).toEqual(l10n.messages.LABEL_POPUP_TREEBANK.get())

    let tooltipsHeader = cmp.find('.alpheios-popup__header').findAll(Tooltip)
    let k = 0

    for (let i = 0; i < tooltipsHeader.length; i++) {
      let checkText = tooltipsHeader.at(i).find('button').text()

      if (checkText === l10n.messages.LABEL_POPUP_TREEBANK.get()) {
        expect(tooltipsHeader.at(i).vm.tooltipText).toEqual(l10n.messages.TOOLTIP_TREEBANK.get())
        expect(tooltipsHeader.at(i).find('.tooltiptext').text()).toEqual(l10n.messages.TOOLTIP_TREEBANK.get())
        tooltipsHeader.at(i).find('button').trigger('click')

        await Vue.nextTick()
        expect(cmp.emitted()['showpaneltab'][k]).toEqual(['treebank'])
        k++
      }

      if (checkText === l10n.messages.LABEL_POPUP_INFLECT.get()) {
        expect(tooltipsHeader.at(i).vm.tooltipText).toEqual(l10n.messages.TOOLTIP_SHOW_INFLECTIONS.get())
        expect(tooltipsHeader.at(i).find('.tooltiptext').text()).toEqual(l10n.messages.TOOLTIP_SHOW_INFLECTIONS.get())
        tooltipsHeader.at(i).find('button').trigger('click')

        await Vue.nextTick()
        expect(cmp.emitted()['showpaneltab'][k]).toEqual(['inflections'])
        k++
      }

      if (checkText === l10n.messages.LABEL_POPUP_DEFINE.get()) {
        expect(tooltipsHeader.at(i).vm.tooltipText).toEqual(l10n.messages.TOOLTIP_SHOW_DEFINITIONS.get())
        expect(tooltipsHeader.at(i).find('.tooltiptext').text()).toEqual(l10n.messages.TOOLTIP_SHOW_DEFINITIONS.get())
        tooltipsHeader.at(i).find('button').trigger('click')

        await Vue.nextTick()
        expect(cmp.emitted()['showpaneltab'][k]).toEqual(['definitions'])
        k++
      }

      if (checkText === l10n.messages.LABEL_POPUP_OPTIONS.get()) {
        expect(tooltipsHeader.at(i).vm.tooltipText).toEqual(l10n.messages.TOOLTIP_SHOW_OPTIONS.get())
        expect(tooltipsHeader.at(i).find('.tooltiptext').text()).toEqual(l10n.messages.TOOLTIP_SHOW_OPTIONS.get())
        tooltipsHeader.at(i).find('button').trigger('click')

        await Vue.nextTick()
        expect(cmp.emitted()['showpaneltab'][k]).toEqual(['options'])
        k++
      }
    }
  })

  it.skip('4.1 Popup - check showProviders functions', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: false,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.showProviders = false
    curProps.data.morphDataReady = true
    curProps.data.providers = [ 'Provider1', 'Provider2' ]

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.find('.alpheios-popup__morph-cont-ready').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-popup__morph-cont-providers').exists()).toBeFalsy()

    expect(cmp.vm.providersLinkText).toEqual(l10n.messages.LABEL_POPUP_SHOWCREDITS.get())
  })

  it.skip('4.2 Popup - check showProviders functions', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: false,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.showProviders = true
    curProps.data.morphDataReady = true
    curProps.data.providers = [ 'Provider1', 'Provider2' ]

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.vm.data.showProviders).toBeTruthy()
    expect(cmp.find('.alpheios-popup__morph-cont-providers').exists()).toBeTruthy()

    expect(cmp.vm.providersLinkText).toEqual(l10n.messages.LABEL_POPUP_HIDECREDITS.get())

    expect(cmp.findAll('.alpheios-popup__morph-cont-providers .alpheios-popup__morph-cont-providers-source').at(0).text()).toEqual('Provider1')
    expect(cmp.findAll('.alpheios-popup__morph-cont-providers .alpheios-popup__morph-cont-providers-source').at(1).text()).toEqual('Provider2')
  })

  it.skip('5 Popup - header styles and close button check', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'

    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.element.style.display).not.toEqual('none')
    expect(cmp.element.style.left).toBeDefined()
    expect(cmp.element.style.top).toBeDefined()
    expect(cmp.element.style.width).toBeDefined()
    expect(cmp.element.style.height).toBeDefined()

    expect(cmp.vm.divClasses).toEqual('')

    curProps.data.classes = ['foo1', 'foo2']
    //    cmp.setProps({ classesChanged: 1 })
    //    expect(cmp.vm.divClasses).toEqual('foo1 foo2')

    //    expect(cmp.find('.alpheios-popup__close-btn').exists()).toBeTruthy()

    //    cmp.find('.alpheios-popup__close-btn').trigger('click')

    //    await Vue.nextTick()

    //    expect(cmp.emitted()['close']).toBeTruthy()

    //    let tooltips = cmp.findAll(Tooltip)
    //    for (let i = 0; i < tooltips.length; i++) {
    //      if (tooltips.at(i).find('.alpheios-popup__close-btn').length === 1) {
    //        expect(tooltips.at(i).vm.tooltiptext).toEqual(l10n.messages.TOOLTIP_POPUP_CLOSE)
    //        expect(tooltips.at(i).vm.additionalStyles).toBeDefined()
    //      }
    //    }
  })

  it.skip('6.1 Popup - check morph placeholders', () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }
    curProps.data.l10n = l10n
    curProps.data.morphDataReady = false
    curProps.data.currentLanguageName = 'lat'
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'
    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })

    let placeholder1 = cmp.findAll('.alpheios-popup__definitions--placeholder').filter(elm => elm.text() === l10n.messages.PLACEHOLDER_POPUP_DATA.get())

    expect(placeholder1.exists()).toBeTruthy()
    expect(placeholder1.at(0).element.style.display).not.toEqual('none')
    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).toEqual('none')

    // curProps.data.morphDataReady = false
    // curProps.data.currentLanguageName = undefined

    // curProps.data.morphDataReady = true
    // curProps.data.currentLanguageName = 'lat'

    // curProps.data.morphDataReady = true
    // curProps.data.currentLanguageName = 'lat'

    // cmp.setProps({
    //  lexemes: [
    //    {
    //      lemma: {
    //        principalParts: [ {} ]
    //      }
    //    }
    //  ]
    // })

    // let allplaceholders = cmp.findAll('.alpheios-popup__definitions--placeholder')
    // for (let i = 0; i < allplaceholders.length; i++) {
    //   expect(allplaceholders.at(i).element.style.display).toEqual('none')
    // }

    // expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).not.toEqual('none')
  })

  it.skip('6.2 Popup - check morph placeholders', () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }
    curProps.data.l10n = l10n
    curProps.data.morphDataReady = false
    curProps.data.currentLanguageName = undefined
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'
    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })
    let placeholder2 = cmp.findAll('.alpheios-popup__definitions--placeholder').filter(elm => elm.text() === l10n.messages.PLACEHOLDER_NO_LANGUAGE_POPUP_DATA.get())
    expect(placeholder2.exists()).toBeTruthy()
    expect(placeholder2.at(0).element.style.display).not.toEqual('none')
    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).toEqual('none')
  })

  it.skip('6.3 Popup - check morph placeholders', () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }
    curProps.data.l10n = l10n
    curProps.data.morphDataReady = true
    curProps.data.currentLanguageName = 'lat'
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'
    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })
    let placeholder3 = cmp.findAll('.alpheios-popup__definitions--placeholder').filter(elm => elm.text() === l10n.messages.PLACEHOLDER_NO_DATA_POPUP_DATA.get())
    expect(placeholder3.exists()).toBeTruthy()
    expect(placeholder3.at(0).element.style.display).not.toEqual('none')
    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).toEqual('none')
  })

  //  it('6.4 Popup - check morph placeholders', () => {
  //    let curProps = {
  //      data: {},
  //      messages: [],
  //      lexemes: [
  //        {
  //          lemma: {
  //            principalParts: [ {} ]
  //          }
  //        }
  //      ],
  //      definitions: {},
  //      linkedfeatures: [],
  //      visible: true,
  //      translations: {}
  //    }
  //    curProps.data.l10n = l10n
  //    curProps.data.morphDataReady = true
  //    curProps.data.currentLanguageName = 'lat'
  //    curProps.data.left = '10vw'
  //    curProps.data.top = '10vh'
  //    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

  //    let cmp = mount(Popup, {
  //      propsData: curProps
  //    })
  //    let allplaceholders = cmp.findAll('.alpheios-popup__definitions--placeholder')
  //    for (let i = 0; i < allplaceholders.length; i++) {
  //      expect(allplaceholders.at(i).element.style.display).toEqual('none')
  //    }

  //    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).not.toEqual('none')
  //  })

  it.skip('7.1 Popup - check notifications', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }
    curProps.data.l10n = l10n
    curProps.data.notification = {
      important: false,
      showLanguageSwitcher: false,
      text: '',
      visible: true
    }

    curProps.data.left = '10vw'
    curProps.data.top = '10vh'

    let featureOptions = new Options(FeatureOptionDefaults, LocalStorageArea)

    curProps.data.settings = {}
    curProps.data.settings.popupPosition = featureOptions.items.popupPosition
    curProps.data.settings.popupPosition.currentValue = 'fixed'
    curProps.data.settings.preferredLanguage = featureOptions.items.preferredLanguage

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.find('.alpheios-popup__notifications').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-popup__notifications').element.style.display).toEqual('none')
  })

  it.skip('7.2 Popup - check notifications', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }
    curProps.data.l10n = l10n
    curProps.data.notification = {
      important: true,
      showLanguageSwitcher: true,
      text: '',
      visible: true
    }

    curProps.data.left = '10vw'
    curProps.data.top = '10vh'

    let featureOptions = new Options(FeatureOptionDefaults, LocalStorageArea)

    curProps.data.settings = {}
    curProps.data.settings.popupPosition = featureOptions.items.popupPosition
    curProps.data.settings.popupPosition.currentValue = 'fixed'
    curProps.data.settings.preferredLanguage = featureOptions.items.preferredLanguage

    let cmp = mount(Popup, {
      propsData: curProps
    })
    expect(cmp.find('.alpheios-popup__notifications').element.style.display).not.toEqual('none')

    expect(cmp.find('.alpheios-popup__notifications-close-btn').exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__notifications').find(Setting).exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__notifications').find(Setting).element.style.display).not.toEqual('none')

    cmp.find('.alpheios-popup__notifications-close-btn').trigger('click')

    await Vue.nextTick()

    expect(cmp.emitted()['closepopupnotifications']).toBeTruthy()
  })

  it.skip('8 Popup - check events on created, change visible and updated', () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'

    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })

    jest.spyOn(cmp.vm, 'updatePopupDimensions')
    jest.spyOn(cmp.vm, 'resetPopupDimensions')

    cmp.vm.$emit('updatePopupDimensions')

    expect(cmp.vm.updatePopupDimensions).toHaveBeenCalled()

    cmp.vm.$emit('changeStyleClass', 'fontSize', 'medium')

    expect(cmp.emitted()['ui-option-change']).toBeTruthy()
    expect(cmp.emitted()['ui-option-change'][0]).toEqual(['fontSize', 'medium'])

    cmp.vm.data.left = '9vw'
    expect(cmp.vm.updatePopupDimensions).toHaveBeenCalled()
    cmp.setProps({ visible: false })

    expect(cmp.vm.resetPopupDimensions).toHaveBeenCalled()
  })

  it.skip('9 Popup - check computed properties', () => {
    let curProps = {
      data: {
        requestStartTime: 'foo-time',
        inflDataReady: 'foo-inflDataReady',
        defDataReady: 'foo-defDataReady',
        translationsDataReady: 'foo-translationsDataReady',
        morphDataReady: 'foo-morphDataReady',
        currentLanguageName: 'foo-language',
        showProviders: 'foo-showProviders',
        updates: 'foo-updates'
      },
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'
    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.vm.uiController).toBeNull()
    expect(cmp.vm.requestStartTime).toEqual('foo-time')
    expect(cmp.vm.inflDataReady).toEqual('foo-inflDataReady')
    expect(cmp.vm.defDataReady).toEqual('foo-defDataReady')
    expect(cmp.vm.translationsDataReady).toEqual('foo-translationsDataReady')
    expect(cmp.vm.morphDataReady).toEqual('foo-morphDataReady')
    expect(cmp.vm.currentLanguageName).toEqual('foo-language')
    expect(cmp.vm.showProviders).toEqual('foo-showProviders')
    expect(cmp.vm.updates).toEqual('foo-updates')
  })

  it.skip('10 Popup - check methods', () => {
    let curProps = {
      data: {},
      messages: ['foomessage1', 'foomessage2'],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'
    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })

    cmp.vm.clearMessages()
    expect(cmp.vm.messages.length).toEqual(0)

    cmp.vm.uiOptionChanged('fooname', 'foovalue')
    expect(cmp.emitted()['ui-option-change']).toBeTruthy()
    expect(cmp.emitted()['ui-option-change'][0]).toEqual(['fooname', 'foovalue'])

    cmp.vm.closePopup()
    expect(cmp.emitted()['close']).toBeTruthy()

    cmp.vm.closeNotifications()
    expect(cmp.emitted()['closepopupnotifications']).toBeTruthy()

    cmp.vm.showPanelTab('footab')
    expect(cmp.emitted()['showpaneltab']).toBeTruthy()
    expect(cmp.emitted()['showpaneltab'][0]).toEqual(['footab'])

    cmp.vm.settingChanged('fooname', 'foovalue')
    expect(cmp.emitted()['settingchange']).toBeTruthy()
    expect(cmp.emitted()['settingchange'][0]).toEqual(['fooname', 'foovalue'])

    cmp.vm.sendFeature('foofeature')
    expect(cmp.emitted()['sendfeature']).toBeTruthy()
    expect(cmp.emitted()['sendfeature'][0]).toEqual(['foofeature'])

    let res = cmp.vm.ln10Messages()
    expect(res).toEqual('unknown')

    res = cmp.vm.ln10Messages('fooname')
    expect(res).toEqual('unknown')

    res = cmp.vm.ln10Messages('fooname', 'foounknown')
    expect(res).toEqual('foounknown')

    res = cmp.vm.ln10Messages('TOOLTIP_POPUP_CLOSE')
    expect(res).toEqual(l10n.messages.TOOLTIP_POPUP_CLOSE.get())
  })

  //  it('11 Popup - check required props', () => {
  //    let cmp = shallowMount(Popup, {
  //      propsData: {}
  //    })

  //    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "data"'))
  //    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "messages"'))
  //    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "lexemes"'))
  //    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "definitions"'))
  //    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "linkedfeatures"'))
  //    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "visible"'))
  //    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "translations"'))
  //  })

  it.skip('12 Popup - interact properties', () => {
    let curProps = {
      data: {},
      messages: ['foomessage1', 'foomessage2'],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'
    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    curProps.data.draggable = true
    curProps.data.resizable = true

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.vm.interactInstance).toBeDefined()

    expect(cmp.vm.interactInstance.events.ondragmove).toEqual(cmp.vm.dragMoveListener)
    expect(cmp.vm.interactInstance.events.resizemove[0]).toEqual(cmp.vm.resizeListener)
  })

  it.skip('13 Popup - if popup invisible then positionLeftDm === 0px', async () => {
    let curProps = {
      data: { l10n: {} },
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: false,
      translations: {}
    }

    let cmp = mount(Popup, {
      propsData: curProps
    })

    await Vue.nextTick()
    expect(cmp.vm.positionLeftDm).toEqual('0px')
    expect(cmp.vm.positionTopDm).toEqual('0px')
  })

  it.skip('14 Popup - header selection has language code', () => {
    let cmp = mount(Popup, {
      propsData: {
        data: {
          l10n: {},
          status: { languageName: 'latin', languageCode: 'lat' }
        },
        messages: [],
        lexemes: [],
        definitions: {},
        linkedfeatures: [],
        visible: false,
        translations: {}
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(cmp.find('.alpheios-popup__header-text').attributes()['lang']).toEqual('lat')
    expect(cmp.find('.alpheios-popup__header-selection').attributes()['lang']).toEqual('lat')
  })
})
