/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'

import { Constants, Author, TextWork } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'

import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

import WordUsageExamplesSorting from '@/vue/components/word-usage-examples/word-usage-examples-sorting.vue'

describe('word-usage-examples-sorting.test.js', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    let testWordUsageList, testWord1, mockProvider, store, l10nModule, testWordUsageList2
  
    let testAuthor, testTextWork
    let api = {}
    
    console.error = function () {}
    console.log = function () {}
    console.warn = function () {}
  
    beforeAll(async () => {
      testAuthor = new Author('urn:cts:latinLit:phi0690', { "eng": "Virgil" })
      testAuthor.ID = 690
      testTextWork = new TextWork(testAuthor, 'urn:cts:latinLit:phi0690.phi003', { "eng": "Aeneid" })
      testTextWork.ID = 3
      testWord1 = 'cupidinibus'
  
      let adapterTuftsRes = await ClientAdapters.morphology.tufts({
        method: 'getHomonym',
        params: {
          languageID: Constants.LANG_LATIN,
          word: testWord1
        }
      })
  
      let filterOptions = {
        author: testAuthor,
        textWork: testTextWork
      }
  
      let paginationOptions =  {
        property: 'max',
        value: 5
      }
  
      let adapterConcordanceRes = await ClientAdapters.wordusageExamples.concordance({
        method: 'getWordUsageExamples',
        params: { homonym: adapterTuftsRes.result, filters: {}, pagination: paginationOptions }
      })
  
      testWordUsageList = adapterConcordanceRes.result
  
      let adapterConcordanceRes2 = await ClientAdapters.wordusageExamples.concordance({
        method: 'getWordUsageExamples',
        params: { homonym: adapterTuftsRes.result, filters: {}, pagination: paginationOptions }
      })
  
      testWordUsageList2 = adapterConcordanceRes2.result
  
    })
  
    beforeEach(() => {
      jest.spyOn(console, 'error')
      jest.spyOn(console, 'log')
      jest.spyOn(console, 'warn')
  
      store = new Vuex.Store({
        
        modules: {
          app: {
            namespaced: true,
            homonym: null,
            
            state: {
              homonymDataReady: false,
              wordUsageExamplesReady: false
            },
            mutations: {
              setHomonym (state) {
                state.homonymDataReady = true
              },
              setWordUsageExamplesReady (state, value = true) {
                state.wordUsageExamplesReady = value
              }
            }
          }
        }
      })
  
      api = {
        app: {
          state: {
            homonymDataReady: false
          },
          homonym: null,
          getWordUsageData: () => testWordUsageList
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
  
    function timeout (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  
    it('1 WordUsageExamplesSorting - checks if a component mounts properly with min data', async () => {
      let cmp = shallowMount(WordUsageExamplesSorting, {
        store: store,
        localVue,
        mocks: api
      })
      expect(cmp.isVueInstance()).toBeTruthy()
      
      expect(cmp.vm.collapsedHeader).toBeTruthy()
      expect(cmp.vm.selectedSortBy).toBeNull()
      
      expect(cmp.vm.typeSortingList.length).toBeGreaterThan(0)
    })

    it('2 WordUsageExamplesSorting - computed availableSortBy returns false if there are no wordUsageExamples', async () => {
      let cmp = shallowMount(WordUsageExamplesSorting, {
        store: store,
        localVue,
        mocks: api
      })

      expect(cmp.vm.availableSortBy).toBeFalsy()

      api.app.wordUsageExamples = {}
      store.commit('app/setWordUsageExamplesReady')
      expect(cmp.vm.availableSortBy).toBeFalsy()        
    })

    it('3 WordUsageExamplesSorting - computed availableSortBy returns true if there are wordUsageExamples', async () => {
      let cmp = shallowMount(WordUsageExamplesSorting, {
        store: store,
        localVue,
        mocks: api
      })
  
      api.app.wordUsageExamples = testWordUsageList
      store.commit('app/setWordUsageExamplesReady')
      expect(cmp.vm.availableSortBy).toBeTruthy()        
    })

    it('4 WordUsageExamplesSorting - method changedSortBy emits changedSortBy with selectedSortBy', async () => {
      let cmp = shallowMount(WordUsageExamplesSorting, {
        store: store,
        localVue,
        mocks: api
      })
    
      cmp.vm.selectedSortBy = 'fooSortBy'
      cmp.vm.changedSortBy()
      expect(cmp.emitted()['changedSortBy']).toBeTruthy()
      expect(cmp.emitted()['changedSortBy'][0]).toEqual(['fooSortBy']) 
    })

    it('5 WordUsageExamplesSorting - method clearSorting clears selectedSortBy and executes changedSortBy', async () => {
      let cmp = shallowMount(WordUsageExamplesSorting, {
        store: store,
        localVue,
        mocks: api
      })
      
      cmp.vm.selectedSortBy = 'fooSortBy'
      jest.spyOn(cmp.vm, 'changedSortBy')

      cmp.vm.clearSorting()

      expect(cmp.vm.selectedSortBy).toBeNull()
      expect(cmp.vm.changedSortBy).toHaveBeenCalled()
    })
})  