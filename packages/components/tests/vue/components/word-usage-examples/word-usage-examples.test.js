/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import WordUsageExamples from '@/vue/components/word-usage-examples/word-usage-examples.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants, Author, TextWork } from 'alpheios-data-models'

describe('word-usage-examples.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let homonym, testWordUsageList

  beforeAll(async () => {
    homonym = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    testWordUsageList = await BaseTestHelp.collectConcordance(homonym)
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

  it('1 WordUsageExamples - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordUsageExamples - computed finalCollapsedHeader is true if it is mobile and collapsed', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        platform: {
          isMobile: false
        }
      })
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })
    cmp.setData({
      collapsedHeader: true
    })

    expect(cmp.vm.finalCollapsedHeader).toBeFalsy()

    api.app.platform.isMobile = true
    expect(cmp.vm.finalCollapsedHeader).toBeTruthy()

    cmp.setData({
      collapsedHeader: false
    })

    expect(cmp.vm.finalCollapsedHeader).toBeFalsy()
  })

  it('3 WordUsageExamples - computed targetWord returns targetWord from homonym if it is ready', async () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        homonym: null
      })
    }

    BaseTestHelp.l10nModule(store, api)
    
    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })
    
    store.commit('app/setTestHomonymDataReady', false)

    await Vue.nextTick()

    expect(cmp.vm.targetWord).toBeNull()

    store.commit('app/setTestHomonymDataReady', true)

    await Vue.nextTick()

    expect(cmp.vm.targetWord).toBeNull()

    api.app.homonym = homonym

    await Vue.nextTick()
    
    expect(cmp.vm.targetWord).toEqual(homonym.targetWord)

  })

  it('4 WordUsageExamples - computed language returns language from homonym if it is ready', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        homonym: null
      })
    }

    BaseTestHelp.l10nModule(store, api)
    
    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })
    
    store.commit('app/setTestHomonymDataReady', false)

    expect(cmp.vm.language).toBeNull()

    store.commit('app/setTestHomonymDataReady', true)
    expect(cmp.vm.language).toBeNull()

    api.app.homonym = homonym
    expect(cmp.vm.language).toEqual(homonym.language)

  })

  it('5 WordUsageExamples - computed showHeaderFilters returns true when it is mobile and wordUsageExamplesReady = true', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        platform: {
          isMobile: false
        }
      })
    }

    BaseTestHelp.l10nModule(store, api)
    
    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })
    
    store.commit('app/setTestWordUsageExamplesReady', false)

    expect(cmp.vm.showHeaderFilters).toBeFalsy()

    store.commit('app/setTestWordUsageExamplesReady', true)
    expect(cmp.vm.showHeaderFilters).toBeFalsy()

    api.app.platform.isMobile = true
    expect(cmp.vm.showHeaderFilters).toBeTruthy()

  })

  it('5 WordUsageExamples - computed showHeader returns true author is selected and wordUsage are ready', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      selectedAuthor: null
    })

    store.commit('app/setTestWordUsageExamplesReady', false)

    expect(cmp.vm.showHeader).toBeFalsy()

    store.commit('app/setTestWordUsageExamplesReady', true)

    expect(cmp.vm.showHeader).toBeTruthy()

    cmp.setData({
      selectedAuthor: 'fooAuthor'
    })

    expect(cmp.vm.showHeader).toBeTruthy()
  })

  it('6 WordUsageExamples - computed showWordUsageExampleItems returns wordUsageExamplesReady from the store, if false changes collapsedHeader to true ', async () => {
    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestWordUsageExamplesReady', false)
    expect(cmp.vm.showWordUsageExampleItems).toBeFalsy()
    
    
    store.commit('app/setTestWordUsageExamplesReady', true)

    expect(cmp.vm.showWordUsageExampleItems).toBeTruthy()

    cmp.setData({
      collapsedHeader: false
    })
    store.commit('app/setTestWordUsageExamplesReady', false)
    await Vue.nextTick()
    expect(cmp.vm.collapsedHeader).toBeTruthy()
  })

  it('6 WordUsageExamples - computed wordUsageExamples returns data from adapter', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }
  
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })
    store.commit('app/setTestWordUsageExamplesReady', false)

    expect(cmp.vm.wordUsageExamples).toEqual([])

    cmp.setData({
      selectedAuthor: null,
      needInnerFilter: false
    })
    store.commit('app/setTestWordUsageExamplesReady', true)
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.wordUsageExamples).toEqual(testWordUsageList.wordUsageExamples)

    cmp.setData({
      selectedAuthor: new Author('urn:cts:latinLit:phi0690', { "eng": "Virgil" }),
      needInnerFilter: true
    })

    expect(cmp.vm.wordUsageExamples.length).toBeLessThan(testWordUsageList.wordUsageExamples.length)
  })

  it('7 WordUsageExamples - computed provider returns provider from wordUsageExamples', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }
    
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestWordUsageExamplesReady', false)
    expect(cmp.vm.provider).toBeNull()

    store.commit('app/setTestWordUsageExamplesReady', true)
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.provider).toEqual(testWordUsageList.provider.toString())
  })

  it('8 WordUsageExamples - computed providerRights returns providerRights from wordUsageExamples', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestWordUsageExamplesReady', false)
    expect(cmp.vm.providerRights).toEqual([])
    
    api.app.wordUsageExamples = testWordUsageList
    store.commit('app/setTestWordUsageExamplesReady', true)

    expect(cmp.vm.providerRights.length).toBeGreaterThan(0)
  })

  it('9 WordUsageExamples - computed wordUsageListSorted returns sorted array (executes sortWordUSageExamplesBy method)', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestWordUsageExamplesReady', true)
    api.app.wordUsageExamples = testWordUsageList

    jest.spyOn(cmp.vm, 'sortWordUsageExamplesBy')
    expect(cmp.vm.wordUsageListSorted.length).toEqual(testWordUsageList.wordUsageExamples.length)
    expect(cmp.vm.sortWordUsageExamplesBy).toHaveBeenCalled()
  })

  it('10 WordUsageExamples - computed collapsedHeaderTitle returns shows if collapsedHeader=true and hide otherwise ', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })
    cmp.vm.collapsedHeader = true
    expect(cmp.vm.collapsedHeaderTitle).toEqual(expect.stringContaining('Show'))

    cmp.vm.collapsedHeader = false
    expect(cmp.vm.collapsedHeaderTitle).toEqual(expect.stringContaining('Hide'))
  })

  it('11 WordUsageExamples - method changedSortBy sets the value of the property - sortBy', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.sortBy).toBeNull()
    cmp.vm.changedSortBy('fooSortBy')
    expect(cmp.vm.sortBy).toEqual('fooSortBy')
  })

  it('12 WordUsageExamples - method setAuthorTextWork sets values to selectedAuthor and selectedTextWork', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.selectedAuthor).toBeNull()
    expect(cmp.vm.selectedTextWork).toBeNull()
    cmp.vm.setAuthorTextWork('fooAuthor', 'fooTextWork')

    expect(cmp.vm.selectedAuthor).toEqual('fooAuthor')
    expect(cmp.vm.selectedTextWork).toEqual('fooTextWork')
  })

  it('13 WordUsageExamples - method filterCurrentByAuthor executes setAuthorTextWork and sets needInnerFilter and collapsedHeader truthy', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    jest.spyOn(cmp.vm, 'setAuthorTextWork')

    cmp.vm.needInnerFilter = false
    cmp.vm.collapsedHeader = false

    cmp.vm.filterCurrentByAuthor('fooAuthor', 'fooTextWork')

    expect(cmp.vm.setAuthorTextWork).toHaveBeenCalledWith('fooAuthor', 'fooTextWork')
    expect(cmp.vm.needInnerFilter).toBeTruthy()
    expect(cmp.vm.collapsedHeader).toBeTruthy()
  })

  it('14 WordUsageExamples - method getMoreResults executes setAuthorTextWork  and sets needInnerFilter falsy', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    jest.spyOn(cmp.vm, 'setAuthorTextWork')

    cmp.vm.needInnerFilter = true

    cmp.vm.getMoreResults('fooAuthor', 'fooTextWork')

    expect(cmp.vm.setAuthorTextWork).toHaveBeenCalledWith('fooAuthor', 'fooTextWork')
    expect(cmp.vm.needInnerFilter).toBeFalsy()
  })

  it('15 WordUsageExamples - method getAllResults executes setAuthorTextWork with nulls and sets needInnerFilter - falsy, collapsedHeader - truthy ', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    jest.spyOn(cmp.vm, 'setAuthorTextWork')

    cmp.vm.needInnerFilter = true
    cmp.vm.collapsedHeader = false

    cmp.vm.getAllResults()

    expect(cmp.vm.setAuthorTextWork).toHaveBeenCalledWith(null, null)
    expect(cmp.vm.needInnerFilter).toBeFalsy()
    expect(cmp.vm.collapsedHeader).toBeTruthy()
  })

  it('16 WordUsageExamples - method getAllResults executes setAuthorTextWork with nulls and sets needInnerFilter - falsy, collapsedHeader - truthy ', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    jest.spyOn(cmp.vm, 'setAuthorTextWork')

    cmp.vm.needInnerFilter = true
    cmp.vm.collapsedHeader = false

    cmp.vm.getAllResults()

    expect(cmp.vm.setAuthorTextWork).toHaveBeenCalledWith(null, null)
    expect(cmp.vm.needInnerFilter).toBeFalsy()
    expect(cmp.vm.collapsedHeader).toBeTruthy()
  })

  it('17 WordUsageExamples - method getPropertyBySortBy defines sort order, if type = byAuthor, then returns author property of the given usage example', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx, 'byAuthor')
    expect(res).toEqual(wordUsageEx.authorForSort())
  })

  it('18 WordUsageExamples - method getPropertyBySortBy defines sort order, if type = byTextWork, then returns texWork property of the given usage example', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx, 'byTextWork')
    expect(res).toEqual(wordUsageEx.textWorkForSort())
  })

  it('19 WordUsageExamples - method getPropertyBySortBy defines sort order, if type = byPrefix, then returns the preceeding word of the given usage example', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx, 'byPrefix')
    expect(res).toEqual(wordUsageEx.prefixForSort)
  })

  it('20 WordUsageExamples - method getPropertyBySortBy defines sort order, if type = bySuffix, then returns the following word of the given usage example', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx, 'bySuffix')
    expect(res).toEqual(wordUsageEx.suffixForSort)
  })

  it('21 WordUsageExamples - method getPropertyBySortBy defines sort order, if type is not defined, then by default it returns fullCit (Author + TextWork)', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx)
    expect(res).toEqual(wordUsageEx.fullCit().toUpperCase())
  })

  it('22 WordUsageExamples - method formattedFullCit defines html format for one wordUsageExample', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.formattedFullCit(wordUsageEx)
    
    expect(res).toEqual(wordUsageEx.formattedAuthor + ' <i>' + wordUsageEx.formattedTextWork + '</i> ' + wordUsageEx.formattedPassage)
  })

  it('23 WordUsageExamples - method gotToTheSource opens new tab in the window and focus on it', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let tab = {
      focus: jest.fn()
    }

    window.open = jest.fn(() => tab) 

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]

    cmp.vm.gotToTheSource(wordUsageEx)

    expect(window.open).toHaveBeenCalledWith(wordUsageEx.source, '_blank')
    expect(tab.focus).toHaveBeenCalled()
  })
})