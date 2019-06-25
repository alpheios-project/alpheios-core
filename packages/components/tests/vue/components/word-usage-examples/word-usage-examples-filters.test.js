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

    expect(cmp.vm.typeFilter).toEqual('noFilters')
    expect(cmp.vm.selectedAuthor).toBeNull()
    expect(cmp.vm.selectedTextWork).toBeNull()
    expect(cmp.vm.lastTargetWord).toBeNull()
    expect(cmp.vm.lastAuthorID).toBeNull()
    expect(cmp.vm.lastAuthorsList.length).toEqual(0)
    expect(cmp.vm.lastTextWorksList.length).toEqual(0)
    
    expect(cmp.vm.typeFiltersList.length).toBeGreaterThan(0)
    
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

  it('3 WordUsageExamplesFilters - computed authorsList set data properties to starting state if there is no homonym or wordUsageExamples are not retrieved ', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    jest.spyOn(cmp.vm, 'setDisabledToType')

    cmp.vm.typeFilter = 'fooTypeFilter'
    cmp.vm.selectedAuthor = 'fooAuthor'
    cmp.vm.selectedTextWork = 'fooTextWork'
    cmp.vm.lastTargetWord = 'fooLastTargetWord'
    cmp.vm.lastAuthorID = 'fooLastAuthorID'
    cmp.vm.lastAuthorsList = ['fooAuthor']
    cmp.vm.lastTextWorksList = ['fooTextWork']

    store.commit('app/setWordUsageExamplesReady', false)

    let res = cmp.vm.authorsList
    // expect(cmp.vm.setDisabledToType).toHaveBeenCalled()

    expect(cmp.vm.typeFilter).toEqual('noFilters')
    expect(cmp.vm.selectedAuthor).toBeNull()
    expect(cmp.vm.selectedTextWork).toBeNull()
    expect(cmp.vm.lastTargetWord).toBeNull()
    expect(cmp.vm.lastAuthorID).toBeNull()
    expect(cmp.vm.lastAuthorsList.length).toEqual(0)
    expect(cmp.vm.lastTextWorksList.length).toEqual(0)
  })

 it('4 WordUsageExamplesFilters - computed authorsList defines lastTargetWord, clears lastAuthorsList, lastTextWorksList, sets typeFilter to noFilter, setDisabledToType (if wordExamples are retrieved and homonym is defined, but wordExamples are empty) ', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    let homonym = { targetWord: 'cupidinibus', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')

    api.app.wordUsageExamples = testWordUsageList
    store.commit('app/setWordUsageExamplesReady')
    
    expect(cmp.vm.lastTargetWord).toEqual('cupidinibus')

    api.app.wordUsageExamples = {}
    store.commit('app/setWordUsageExamplesReady')

    homonym = { targetWord: 'cepit', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')

    await timeout(5000)
    let res = cmp.vm.authorsList // it is only for showing a place, as it is used in the template it doesn't need to be exicuted directly
    expect(cmp.vm.lastTargetWord).toEqual('cepit')
    expect(cmp.vm.lastAuthorsList.length).toEqual(0)
    expect(cmp.vm.lastTextWorksList.length).toEqual(0)
    expect(cmp.vm.typeFilter).toEqual('noFilters')
  }, 50000)
  
  it('5 WordUsageExamplesFilters - computed authorsList defines lastAuthorsList (with first null to remove filtering), lastTextWorksList (with first null to remove filtering), typeFilter, when there is a new homonym and wordUsageExamples is retrieved', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    let homonym = { targetWord: 'cupidinibus', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')

    api.app.wordUsageExamples = testWordUsageList
    store.commit('app/setWordUsageExamplesReady')

    let res = cmp.vm.authorsList // it is only for showing a place, as it is used in the template it doesn't need to be exicuted directly
    expect(cmp.vm.lastTargetWord).toEqual('cupidinibus')
    expect(cmp.vm.lastAuthorsList.length).toEqual(3)
    expect(cmp.vm.lastAuthorsList[0]).toBeNull()

    expect(cmp.vm.lastTextWorksList.length).toEqual(4)
    expect(cmp.vm.lastTextWorksList[0]).toBeNull()

    expect(cmp.vm.typeFilter).toEqual('filterCurrentResults')
  })

  it('6 WordUsageExamplesFilters - computed filteredWorkList returns empty array if selectedAuthor is not defined', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    expect(cmp.vm.filteredWorkList.length).toEqual(0)
  })

  it('7 WordUsageExamplesFilters - computed filteredWorkList returns filtered work list by selectedAuthor with  first item = null', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })
  
    let homonym = { targetWord: 'cupidinibus', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')
  
    api.app.wordUsageExamples = testWordUsageList
    store.commit('app/setWordUsageExamplesReady')

    expect(cmp.vm.lastTextWorksList.length).toEqual(4)
    
    cmp.vm.selectedAuthor = cmp.vm.lastAuthorsList[1] // get the first author from examples, 0 - null
    let res = cmp.vm.filteredWorkList
    expect(res.length).toEqual(2)
    expect(res[0]).toBeNull()
  })

  it('8 WordUsageExamplesFilters - method checkVisibilityFilterOption returns false if item is skip', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    let typeFilterItem1 = { value: 'fooTypeFilter' }
    expect(cmp.vm.checkVisibilityFilterOption(typeFilterItem1)).toBeTruthy()

    let typeFilterItem2 = { value: 'fooTypeFilter', skip: true }
    expect(cmp.vm.checkVisibilityFilterOption(typeFilterItem2)).toBeFalsy()
  })

  it('9 WordUsageExamplesFilters - method setDisabledToType sets disabled property to typeFiltersList by value', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    expect(cmp.vm.typeFiltersList[0].disabled).toBeFalsy()

    cmp.vm.setDisabledToType([cmp.vm.typeFiltersList[0].value])

    expect(cmp.vm.typeFiltersList[0].disabled).toBeTruthy()
  })

  it('10 WordUsageExamplesFilters - method getResults executes getResultsNoFilters, emits getAllResults, clears lastAuthorID event if typeFilter === noFilters ', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    jest.spyOn(cmp.vm, 'getResultsNoFilters')
    jest.spyOn(cmp.vm, 'clearFilter')

    cmp.vm.typeFilter = 'noFilters'
    await  cmp.vm.getResults()

    expect(cmp.vm.getResultsNoFilters).toHaveBeenCalled()
    expect(cmp.emitted()['getAllResults']).toBeTruthy()
    expect(cmp.vm.clearFilter).toHaveBeenCalled()
    expect(cmp.vm.lastAuthorID).toBeNull()

  })

  it('11 WordUsageExamplesFilters - method getResults executes getResultsWithFilters, emits getMoreResults, lastAuthorID sets to selectedAuthor.ID event if typeFilter === moreResults ', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    jest.spyOn(cmp.vm, 'getResultsWithFilters')

    let homonym = { targetWord: 'cupidinibus', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')
  
    api.app.wordUsageExamples = testWordUsageList
    store.commit('app/setWordUsageExamplesReady')

    cmp.vm.selectedAuthor = testAuthor

    cmp.vm.typeFilter = 'moreResults'
    await cmp.vm.getResults()

    expect(cmp.vm.getResultsWithFilters).toHaveBeenCalled()
    expect(cmp.emitted()['getMoreResults']).toBeTruthy()
    expect(cmp.vm.lastAuthorID).toEqual(testAuthor.ID)
    
  })

  it('12 WordUsageExamplesFilters - method getResults emits filterCurrentByAuthor, lastAuthorID sets to selectedAuthor.ID event if typeFilter === filterCurrentResults ', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    let homonym = { targetWord: 'cupidinibus', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')
  
    api.app.wordUsageExamples = testWordUsageList
    store.commit('app/setWordUsageExamplesReady')

    cmp.vm.selectedAuthor = testAuthor

    cmp.vm.typeFilter = 'filterCurrentResults'
    await cmp.vm.getResults()

    expect(cmp.emitted()['filterCurrentByAuthor']).toBeTruthy()
    expect(cmp.vm.lastAuthorID).toEqual(testAuthor.ID)
  })

  it('13 WordUsageExamplesFilters - method getResultsNoFilters executes app.getWordUsageData with only homonym', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    let homonym = { targetWord: 'cupidinibus', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')

    await cmp.vm.getResultsNoFilters()
    expect(api.app.getWordUsageData).toHaveBeenCalledWith(cmp.vm.homonym)
  })

  it('14 WordUsageExamplesFilters - method getResultsWithFilters executes app.getWordUsageData', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    let homonym = { targetWord: 'cupidinibus', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')

    cmp.vm.selectedAuthor = testAuthor

    await cmp.vm.getResultsWithFilters()
    expect(api.app.getWordUsageData).toHaveBeenCalledWith(cmp.vm.homonym, { author: testAuthor, textWork: null })
  })

  it('15 WordUsageExamplesFilters - method removeFiltersFromResults emits filterCurrentByAuthor with nulls and fills lastAuthorID', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    let homonym = { targetWord: 'cupidinibus', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')

    cmp.vm.selectedAuthor = testAuthor

    cmp.vm.removeFiltersFromResults()
    expect(cmp.emitted()['filterCurrentByAuthor']).toBeTruthy()
    expect(cmp.emitted()['filterCurrentByAuthor'][0]).toEqual([null, null])
    expect(cmp.vm.lastAuthorID).toEqual(testAuthor.ID)
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

  it('19 WordUsageExamplesFilters - method clearFilter clears selectedAuthor and textWork depending on type', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store: store,
      localVue,
      mocks:api
    })

    cmp.vm.selectedAuthor = 'fooAuthor'
    cmp.vm.selectedTextWork = 'fooTextWork'

    cmp.vm.clearFilter('author')

    expect(cmp.vm.selectedAuthor).toBeNull()
    expect(cmp.vm.selectedTextWork).toBeNull()


    cmp.vm.selectedAuthor = 'fooAuthor'
    cmp.vm.selectedTextWork = 'fooTextWork'

    cmp.vm.clearFilter('textwork')

    expect(cmp.vm.selectedAuthor).toEqual('fooAuthor')
    expect(cmp.vm.selectedTextWork).toBeNull()
  })

})