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

import WordUsageExamplesFilters from '@/vue/components/word-usage-examples/word-usage-examples-filters.vue'

describe('word-usage-examples-filters.test.js', () => {
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
        getWordUsageData: jest.fn(() => testWordUsageList)
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

  it('1 WordUsageExamplesFilters - checks if a component mounts properly with min data', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    
    expect(cmp.vm.collapsedHeader).toBeTruthy()
    expect(cmp.vm.selectedAuthor).toBeNull()
    expect(cmp.vm.selectedTextWork).toBeNull()
    expect(cmp.vm.lastTargetWord).toBeNull()
  })

  it('2 WordUsageExamplesFilters - computed homonym returns null if homonym was not recieved and returns homonym as it is ready', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    expect(cmp.vm.homonym).toBeNull()

    let homonym = { targetWord: 'cepit', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')
    
    expect(cmp.vm.homonym).toEqual(homonym)
  })


   it('16 WordUsageExamplesFilters - method calcTitle returns title and abbreviation if they are defined inside item, or only title, or abbreviation if only one of them id defined', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    let testTitle = {
      title: () => 'fooTitle',
      abbreviation: () => 'fooabbreviation'
    }
    expect(cmp.vm.calcTitle(testTitle)).toEqual('fooTitle (fooabbreviation)')
  })

  it('17 WordUsageExamplesFilters - method calcTitle returns only title, or abbreviation if only one of them id defined', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    let testTitle = {
      title: () => 'fooTitle',
      abbreviation: () => null
    }
    expect(cmp.vm.calcTitle(testTitle)).toEqual('fooTitle')

    let testTitle2 = {
      title: () => null,
      abbreviation: () => 'fooabbreviation'
    }
    expect(cmp.vm.calcTitle(testTitle2)).toEqual('fooabbreviation')
  })

  it('18 WordUsageExamplesFilters - method calcTitle returns placeholder if item is not defined, but type is defined', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    expect(cmp.vm.calcTitle(null, 'author')).toEqual(expect.stringContaining('Select'))
    expect(cmp.vm.calcTitle(null, 'textwork')).toEqual(expect.stringContaining('Select'))
  })


})