/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import { WordItem, TextQuoteSelector } from 'alpheios-data-models'
import WordContextPanel from '@/vue/components/word-list/word-context-panel.vue'
import BackIcon from '@/images/inline-icons/back.svg'

import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

describe('word-context-panel.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let api
  let l10nModule

  beforeEach(() => {
    api = {}
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  function defineL10n(store) {
    l10nModule = new L10nModule(store, api, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr([
        [enUS, Locales.en_US],
        [enUSData, Locales.en_US],
        [enUSInfl, Locales.en_US],
        [enGB, Locales.en_GB]
      ])
    })
    
    return l10nModule
  }

  it('1 WordContextPanel - renders a vue instance (min requirements)', () => {
    store = new Vuex.Store({
      modules: {
        app: {}
      }
    })
    defineL10n(store)    
  
    let cmp = shallowMount(WordContextPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: new WordItem({ targetWord: 'mare', languageCode: 'lat' })
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordContextPanel - renders back link to alpheios-wordlist-commands__item-back', async() => {
    store = new Vuex.Store({
      modules: {
        app: {}
      }
    })
     defineL10n(store)    
    
    let cmp = mount(WordContextPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: new WordItem({ targetWord: 'mare', languageCode: 'lat' })
      }
    })

    let backBlock = cmp.find('.alpheios-wordlist-commands__item-back')
    expect(backBlock.exists()).toBeTruthy()
    expect(backBlock.find(BackIcon).exists()).toBeTruthy()

    backBlock.trigger('click')
    expect(cmp.emitted()['backToWordList']).toBeTruthy()
  })

  it('3 WordContextPanel - computed formattedContext returns formattedContext of the wordItem', () => {
    store = new Vuex.Store({
      modules: {
        app: {}
      }
    })
    defineL10n(store)    

    let contextItem = new TextQuoteSelector('lat', 'mare', 'fooPrefix', 'fooSuffix', 'fooSource')
    let wordItem = new WordItem({ targetWord: 'mare', languageCode: 'lat', important: false, currentSession: true, context: [contextItem] })
    let cmp = mount(WordContextPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: wordItem
      }
    })

    expect(cmp.vm.formattedContext).toEqual(wordItem.formattedContext)
  })

  it('4 WordContextPanel - computed sourcesList returns a list of sources', () => {
    store = new Vuex.Store({
      modules: {
        app: {}
      }
    })
    defineL10n(store)    

    let contextItem1 = new TextQuoteSelector('lat', 'mare', 'fooPrefix', 'fooSuffix', 'fooSource')
    let contextItem2 = new TextQuoteSelector('lat', 'mare', 'fooPrefix', 'fooSuffix', 'fooSource2')
    let wordItem = new WordItem({ targetWord: 'mare', languageCode: 'lat', important: false, currentSession: true, context: [contextItem1, contextItem2] })
    let cmp = mount(WordContextPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: wordItem
      }
    })

    expect(cmp.vm.sourcesList).toEqual(['fooSource', 'fooSource2'])
  })
})
