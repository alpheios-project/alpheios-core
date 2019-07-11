/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import { WordItem, TextQuoteSelector } from 'alpheios-data-models'
import WordLanguagePanel from '@/vue/components/word-list/word-language-panel.vue'

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
    api = {
      app: {
        getWordList: () => { return { items: [], values: [] } }
      }
    }
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
      ])
    })

    return l10nModule
  }

  it('1 WordLanguagePanel - applySorting obeys language code and sort order', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            wordListUpdateTime: 1
          }
        }
      }
    })
    defineL10n(store)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'grc'
      }
    })
    let caseEquiv = [{targetWord:"ἆσα"},{targetWord:"ἎΣΑ"},{targetWord:"ἆσαι"}]
    let alphaAsc = [{targetWord:"ἆσαι"},{targetWord: "ἐγχείη"}]
    let accentAsc = [{targetWord:"α"},{targetWord:"ά"}]

    expect(cmp.isVueInstance()).toBeTruthy()
    cmp.vm.changeSorting('targetWord','asc')
    expect(cmp.vm.applySorting(caseEquiv)).toEqual(caseEquiv)
    expect(cmp.vm.applySorting(alphaAsc)).toEqual(alphaAsc)
    expect(cmp.vm.applySorting(accentAsc)).toEqual(accentAsc)
    cmp.vm.changeSorting('targetWord','desc')
    expect(cmp.vm.applySorting(caseEquiv)).toEqual(caseEquiv)
    expect(cmp.vm.applySorting(alphaAsc)).toEqual([{targetWord: "ἐγχείη"}, {targetWord:"ἆσαι"}])
    expect(cmp.vm.applySorting(accentAsc)).toEqual([{targetWord:"ά"}, {targetWord:"α"}])
  })

  it('2 WordLanguagePanel - applySorting does not sort if sort order is null', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            wordListUpdateTime: 1
          }
        }
      }
    })
    defineL10n(store)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'grc'
      }
    })
    let unsortedDesc = [ {targetWord: "ἐγχείη"}, {targetWord:"ἆσαι"} ]
    let unsortedAsc = [ {targetWord:"ἆσαι"} , {targetWord: "ἐγχείη"} ]

    expect(cmp.isVueInstance()).toBeTruthy()
    cmp.vm.changeSorting('targetWord',null)
    expect(cmp.vm.applySorting(unsortedDesc)).toEqual(unsortedDesc)
    expect(cmp.vm.applySorting(unsortedAsc)).toEqual(unsortedAsc)
  })

})
