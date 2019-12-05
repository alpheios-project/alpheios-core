/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import WordUsageExamplesFilters from '@/vue/components/word-usage-examples/word-usage-examples-filters.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants, Author, TextWork } from 'alpheios-data-models'

describe('word-usage-examples-filters.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let testHomonym, testWordUsageList, testAuthor, testTextWork

  beforeAll(async () => {
    testAuthor = new Author('urn:cts:latinLit:phi0893', { "lat": "Horace" }, { "lat": "Hor" })

    testAuthor.works = []
    testAuthor.works.push(new TextWork(testAuthor, 'urn:cts:latinLit:phi0893.phi0001', { "lat": "Carmina" }, { "lat": "Carm" }))
    testAuthor.works.push(new TextWork(testAuthor, 'urn:cts:latinLit:phi0893.phi0004', { "lat": "Sermones" }, { "lat": "S" }))

    testHomonym = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    testWordUsageList = await BaseTestHelp.collectConcordance(testHomonym)
    
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = BaseTestHelp.baseVuexStore()

    api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }


  it('1 WordUsageExamplesFilters - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordUsageExamplesFilters - clears filters on changing tab to wordusage', async () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })
    
    cmp.vm.getResults = jest.fn()

    cmp.setData({
      selectedAuthor: 'fooAuthor',
      selectedTextWork: 'fooTextWork'
    })

    api.app.homonym = testHomonym
    store.commit('app/setTestHomonymDataReady', true)
    store.commit('app/setTestWordUsageExamplesReady', false)

    store.commit('ui/setTestCurrentTab', 'wordUsage')
    await Vue.nextTick()
    expect(cmp.vm.selectedAuthor).toBeNull()
    expect(cmp.vm.selectedTextWork).toBeNull()
    expect(cmp.vm.getResults).toHaveBeenCalled()
  })

  it('3 WordUsageExamplesFilters - computed homonym returns homonym if it is ready or null otherwise', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.homonym).toBeNull()

    store.commit('app/setTestHomonymDataReady', true)
    api.app.homonym = testHomonym

    expect(cmp.vm.homonym).toEqual(testHomonym)
  })

  it('4 WordUsageExamplesFilters - computed languageCode returns languageCode from homonym or null otherwise', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.languageCode).toBeNull()

    store.commit('app/setTestHomonymDataReady', true)
    api.app.homonym = testHomonym

    expect(cmp.vm.languageCode).toEqual(testHomonym.language)
  })

  it('5 WordUsageExamplesFilters - computed authorsList returns false when homonym is not ready', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestHomonymDataReady', false)

    expect(cmp.vm.authorsList).toBeFalsy()
  })

  it('6 WordUsageExamplesFilters - computed authorsList returns false when word usage is not ready and author is not selected', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      selectedAuthor: null
    })

    store.commit('app/setTestHomonymDataReady', true)
    store.commit('app/setTestWordUsageExamplesReady', false)

    expect(cmp.vm.authorsList).toBeFalsy()
  })

  it('7 WordUsageExamplesFilters - computed authorsList updates and sort authors list if it word usage examples were retrieved ', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })


    store.commit('app/setTestWordUsageExamplesReady', true)

    jest.spyOn(cmp.vm, 'applySort')

    api.app.homonym = testHomonym
    api.app.wordUsageExamples = testWordUsageList
    store.commit('app/setTestHomonymDataReady', true)

    expect(cmp.vm.authorsList).toBeTruthy()

    expect(cmp.vm.lastTargetWord).toEqual(testHomonym.targetWord)
    expect(cmp.vm.lastAuthorsList.length).toBeGreaterThan(1)
    expect(cmp.vm.applySort).toHaveBeenCalledWith('author', expect.any(Array))

    expect(cmp.vm.lastAuthorsList[0]).toBeNull()
  })


  it('8 WordUsageExamplesFilters - computed filteredWorkList returns false if homonym is not ready ', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestHomonymDataReady', false)

    expect(cmp.vm.filteredWorkList).toBeFalsy()
  })

  it('9 WordUsageExamplesFilters - computed filteredWorkList returns null if no author is selected ', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })
    
    cmp.setData({
      selectedAuthor: null
    })
    store.commit('app/setTestHomonymDataReady', true)

    expect(cmp.vm.filteredWorkList).toBeNull()
  })


  it('10 WordUsageExamplesFilters - computed filteredWorkList returns sorted textWork list (if there are more than one textWork) ', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })
    
    api.app.homonym = testHomonym
    api.app.wordUsageExamples = testWordUsageList

    cmp.setData({
      selectedAuthor: testAuthor,
      selectedTextWork: testAuthor.works[0]
    })
    jest.spyOn(cmp.vm, 'applySort')

    store.commit('app/setTestWordUsageExamplesReady', true)
    store.commit('app/setTestHomonymDataReady', true)

    expect(cmp.vm.filteredWorkList.length).toBeGreaterThan(1)
    expect(cmp.vm.applySort).toHaveBeenLastCalledWith('textwork', expect.any(Array))
    expect(cmp.vm.filteredWorkList[0]).toBeNull()
    expect(cmp.vm.selectedTextWork).toBeNull()
  })


  it('11 WordUsageExamplesFilters - computed filteredWorkList returns textwork list and defines selectedWork if there is only one textWork in the list', () => {
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })
    
    api.app.homonym = testHomonym
    api.app.wordUsageExamples = testWordUsageList

    let newAuthor = Object.assign({}, testAuthor)
    newAuthor.works = testAuthor.works.slice(0, 1)

    cmp.setData({
      selectedAuthor: newAuthor,
      selectedTextWork: null
    })

    store.commit('app/setTestWordUsageExamplesReady', true)
    store.commit('app/setTestHomonymDataReady', true)

    expect(cmp.vm.filteredWorkList.length).toEqual(1)
    expect(cmp.vm.filteredWorkList[0]).not.toBeNull()

    expect(cmp.vm.selectedTextWork).toEqual(newAuthor.works[0])
  })


  it('12 WordUsageExamplesFilters - method getResults executes getWordUsageData with only homonym if selectedAuthor and selectedTextWork are empty', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        getWordUsageData: jest.fn(() => Promise.resolve(true))
      })
    }
  
    BaseTestHelp.l10nModule(store, api)
    
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      selectedAuthor: null,
      selectedTextWork: null
    })

    api.app.homonym = testHomonym
    store.commit('app/setTestHomonymDataReady', true)

    cmp.vm.getResults()

    expect(api.app.getWordUsageData).toHaveBeenCalledWith(testHomonym)
  })

  it('13 WordUsageExamplesFilters - method getResults executes getWordUsageData with homonym and filters if selectedAuthor is not empty', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        getWordUsageData: jest.fn(() => Promise.resolve(true))
      })
    }
  
    BaseTestHelp.l10nModule(store, api)
    
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    api.app.homonym = testHomonym
    store.commit('app/setTestHomonymDataReady', true)

    cmp.setData({
      selectedAuthor: testAuthor,
      selectedTextWork: testAuthor.works[0]
    })

    cmp.vm.getResults()

    expect(api.app.getWordUsageData).toHaveBeenCalledWith(testHomonym, { author: testAuthor, textWork: testAuthor.works[0] })
  })

  it('14 WordUsageExamplesFilters - method getResults executes getWordUsageData with homonym and filters if selectedAuthor is not empty, when passed type=author, it executes with empty textWork', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        getWordUsageData: jest.fn(() => Promise.resolve(true))
      })
    }
  
    BaseTestHelp.l10nModule(store, api)
    
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    api.app.homonym = testHomonym
    store.commit('app/setTestHomonymDataReady', true)

    cmp.setData({
      selectedAuthor: testAuthor,
      selectedTextWork: testAuthor.works[0]
    })

    cmp.vm.getResults('author')

    expect(api.app.getWordUsageData).toHaveBeenCalledWith(testHomonym, { author: testAuthor, textWork: null })
  })

  it('15 WordUsageExamplesFilters - method calcTitle calcs title for authors and textWorks in filters (placeholder)', () => {  
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      selectedAuthor: null
    })

    let result1 = cmp.vm.calcTitle(null, 'author') // empty author and empty filter
    expect(result1).toEqual('Select an author')

    cmp.setData({
      selectedAuthor: testAuthor
    })

    let result2 = cmp.vm.calcTitle(null, 'author')
    expect(result2).toEqual('Clear author') // selected author and empty filter

    let result3 = cmp.vm.calcTitle(null, 'textwork') // empty textwork and empty filter
    expect(result3).toEqual('Select a work')

    cmp.setData({
      selectedTextWork: testAuthor.works[0]
    })
    let result4 = cmp.vm.calcTitle(null, 'textwork') // selected textwork and empty filter
    expect(result4).toEqual('Clear work')
  })

  it('16 WordUsageExamplesFilters - method calcTitle calcs title for authors and textWorks in filters (item)', () => {  
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    let result1 = cmp.vm.calcTitle({   //item has only title
      title: () => 'fooTitle',
      abbreviation: () => null
    }, 'author') 

    expect(result1).toEqual('fooTitle')

    let result2 = cmp.vm.calcTitle({   //item has only abbreviation
        title: () => null,
        abbreviation: () => 'fooAbbreviation'
    }, 'author')
    
    expect(result2).toEqual('fooAbbreviation')

    let result3 = cmp.vm.calcTitle({   //item has only abbreviation
        title: () => 'fooTitle',
        abbreviation: () => 'fooAbbreviation'
    }, 'author')
    
    expect(result3).toEqual('fooTitle (fooAbbreviation)')
  })

  
  it('16 WordUsageExamplesFilters - method calcFocusHint return hint for author or textWork with data from options', () => {  
    let cmp = shallowMount(WordUsageExamplesFilters, {
      store,
      localVue,
      mocks: api
    })

    let maxResults = cmp.vm.settings.getFeatureOptions().items.wordUsageExamplesMax.currentValue

    let result1 = cmp.vm.calcFocusHint('author')
    expect(result1).toEqual(expect.stringContaining('Choose an Author'))
    expect(result1).toEqual(expect.stringContaining(`up to ${maxResults} examples`))

    let result2 = cmp.vm.calcFocusHint('textwork')
    expect(result2).toEqual(expect.stringContaining('Focus on Work'))
    expect(result2).toEqual(expect.stringContaining(`up to ${maxResults} examples`))
  })

})