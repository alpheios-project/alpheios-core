/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import Vuex from 'vuex'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'

import { Constants, Author, TextWork, ResourceProvider } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Options from '@/lib/options/options.js'
import FeatureOptionDefaults from '@/settings/feature-options-defaults.json'
import TempStorageArea from '@/lib/options/temp-storage-area.js'

import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

import WordUsageExamples from '@/vue/components/word-usage-examples/word-usage-examples.vue'

describe('word-usage-examples.test.js', () => {
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
    let ta = new TempStorageArea('alpheios-feature-settings')
    let featureOptions = new Options(FeatureOptionDefaults, ta)

    store = new Vuex.Store({

      modules: {
        app: {
          namespaced: true,
          homonym: null,
          platform: {
            isMobile: true
          },
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
        },
        ui: {}
      }
    })

    api = {
      app: {
        state: {
          homonymDataReady: false
        },
        platform: {
          isMobile: true
        },
        homonym: null
      },
      ui: {},
      settings: {
        getFeatureOptions: () => { return featureOptions },
      },
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

  it('1 WordUsageExamples - checks if a component mounts properly without word usage examples ready', async () => {
    let storeLocal = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          state: {}
        },
        app: {
          homonym: { targetWord: 'cepit', language: 'lat' },
          state: {
            homonymDataReady: true,
            wordUsageExamplesReady: false
          }
        }
      }
    })

    let cmp = shallowMount(WordUsageExamples, {
      store: storeLocal,
      localVue,
      mocks: {
        l10n: api.l10n,
        app: {
          homonymDataReady: true,
          platform: {
            isMobile: true
          },
          homonym: { targetWord: 'cepit', language: 'lat' }
        },
        ui: api.ui,
        settings: api.settings
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.vm.targetWord).toEqual('cepit')
    expect(cmp.vm.language).toEqual('lat')
    expect(cmp.vm.wordUsageExamples).toEqual([])
    expect(cmp.vm.provider).toBeNull()
    expect(cmp.vm.providerRights).toEqual([])
    expect(cmp.vm.wordUsageListSorted).toEqual([])
    expect(cmp.vm.showWordUsageExampleItems).toBeFalsy()

  })

  it('2 WordUsageExamples - checks if a component mounts properly with word usage examples ready', async () => {
    let storeLocal = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          state: {}
        },
        app: {
          homonym: { targetWord: 'cepit', language: 'lat' },
          wordUsageExamples: [],
          state: {
            homonymDataReady: true,
            wordUsageExamplesReady: true
          }
        }
      }
    })

    let cmp = shallowMount(WordUsageExamples, {
      store: storeLocal,
      localVue,
      mocks: {
        l10n: api.l10n,
        app: {
          homonymDataReady: true,
          homonym: { targetWord: 'cepit', language: 'lat' },
          wordUsageExamplesReady: true,
          wordUsageExamples: testWordUsageList,
          platform: {
            isMobile: true
          }
        },
        ui: api.ui,
        settings: api.settings
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(cmp.vm.showWordUsageExampleItems).toBeTruthy()
    expect(cmp.vm.wordUsageExamples).toEqual(testWordUsageList.wordUsageExamples)

    expect(cmp.vm.provider).not.toBeNull()
    expect(cmp.vm.providerRights.length).toBeGreaterThan(0)
  })

  it('3 WordUsageExamples - computed targetWord returns null if homonyn is not yet retrieved and returned homonym.targetWord - if retrieved', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: {
        l10n: api.l10n,
        ui: api.ui,
        app: api.app,
        settings: api.settings

      }
    })

    expect(cmp.vm.targetWord).toBeNull()

    let homonym = { targetWord: 'cepit', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')

    expect(cmp.vm.targetWord).toEqual('cepit')
  })

  it('4 WordUsageExamples - computed language returns null if homonyn is not yet retrieved and returned homonym.language - if retrieved', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.targetWord).toBeNull()

    let homonym = { targetWord: 'cepit', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')

    expect(cmp.vm.language).toEqual('lat')
  })

  it('5 WordUsageExamples - computed showHeaderFilters is true only if we have word usage examples ready', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showHeaderFilters).toBeFalsy()
    store.commit('app/setWordUsageExamplesReady')
    expect(cmp.vm.showHeaderFilters).toBeTruthy()
  })

  it('6 WordUsageExamples - computed showHeader is true if selectedAuthor is not empty', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showHeaderFilters).toBeFalsy()
    cmp.vm.selectedAuthor = testAuthor
    expect(cmp.vm.showHeader).toBeTruthy()
  })

  it('7 WordUsageExamples - computed showHeader is true if word usage examples are already retrieved and examples list is not empty', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showHeaderFilters).toBeFalsy()
    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.showHeader).toBeTruthy()
  })

  it('8 WordUsageExamples - computed showHeader is true if word usage examples are already retrieved and examples list is not empty', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showHeaderFilters).toBeFalsy()
    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.showHeader).toBeTruthy()
  })

  it('9 WordUsageExamples - computed wordUsageExamples returns empty array if usage examples are not retrieved', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.wordUsageExamples.length).toEqual(0)
  })

  it('10 WordUsageExamples - computed wordUsageExamples returns full array of usage examples if selected author is not chosen or needInnerFilter is false', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.wordUsageExamples.length).toBeGreaterThan(0)
    expect(cmp.vm.wordUsageExamples.length).toEqual(testWordUsageList.wordUsageExamples.length)

    cmp.vm.selectedAuthor = testAuthor
    cmp.vm.needInnerFilter = false

    expect(cmp.vm.wordUsageExamples.length).toEqual(testWordUsageList.wordUsageExamples.length)
  })

  it('11 WordUsageExamples - computed wordUsageExamples returns filtered array of usage examples if selected author is chosen and needInnerFilter is true', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.wordUsageExamples.length).toEqual(testWordUsageList.wordUsageExamples.length)

    cmp.vm.selectedAuthor = testAuthor
    cmp.vm.needInnerFilter = true

    expect(cmp.vm.wordUsageExamples.length).toBeLessThan(testWordUsageList.wordUsageExamples.length)
  })

  it('12 WordUsageExamples - computed provider returns String(provider) from WordUsageExamples data if this data is retrieved and provider is defined', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.provider).toBeNull()

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.provider).toEqual(expect.stringContaining('Word usage examples are provided by'))
  })

  it.skip('13 WordUsageExamples - NOT APPLICABLE computed providerRights returns Array with provider rights if this data is retrieved and provider is defined and has rights', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.providerRights.length).toEqual(0)

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.providerRights).toBeGreaterThan(0)
  })

  it('14 WordUsageExamples - computed wordUsageListSorted returns empty array if usage examples are not retrieved', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.wordUsageListSorted.length).toEqual(0)
  })

  it('15 WordUsageExamples - computed wordUsageListSorted returns sorted array (executes sortWordUSageExamplesBy method)', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    jest.spyOn(cmp.vm, 'sortWordUsageExamplesBy')
    expect(cmp.vm.wordUsageListSorted.length).toEqual(testWordUsageList.wordUsageExamples.length)
    expect(cmp.vm.sortWordUsageExamplesBy).toHaveBeenCalled()
  })

  it('16 WordUsageExamples - computed collapsedHeaderTitle returns shows if collapsedHeader=true and hide otherwise ', () => {
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

  it('17 WordUsageExamples - method changedSortBy sets the value of the property - sortBy', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.sortBy).toBeNull()
    cmp.vm.changedSortBy('fooSortBy')
    expect(cmp.vm.sortBy).toEqual('fooSortBy')
  })

  it('18 WordUsageExamples - method setAuthorTextWork sets values to selectedAuthor and selectedTextWork', () => {
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

  it('19 WordUsageExamples - method filterCurrentByAuthor executes setAuthorTextWork and sets needInnerFilter and collapsedHeader truthy', () => {
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

  it('20 WordUsageExamples - method getMoreResults executes setAuthorTextWork  and sets needInnerFilter falsy', () => {
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

  it('21 WordUsageExamples - method getAllResults executes setAuthorTextWork with nulls and sets needInnerFilter - falsy, collapsedHeader - truthy ', () => {
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

  it('22 WordUsageExamples - method getAllResults executes setAuthorTextWork with nulls and sets needInnerFilter - falsy, collapsedHeader - truthy ', () => {
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

  it('23 WordUsageExamples - method getPropertyBySortBy defines sort order, if type = byAuthor, then returns author property of the given usage example', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx, 'byAuthor')
    expect(res).toEqual(wordUsageEx.authorForSort())
  })

  it('24 WordUsageExamples - method getPropertyBySortBy defines sort order, if type = byTextWork, then returns texWork property of the given usage example', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx, 'byTextWork')
    expect(res).toEqual(wordUsageEx.textWorkForSort())
  })

  it('25 WordUsageExamples - method getPropertyBySortBy defines sort order, if type = byPrefix, then returns the preceeding word of the given usage example', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx, 'byPrefix')
    expect(res).toEqual(wordUsageEx.prefixForSort)
  })

  it('26 WordUsageExamples - method getPropertyBySortBy defines sort order, if type = bySuffix, then returns the following word of the given usage example', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx, 'bySuffix')
    expect(res).toEqual(wordUsageEx.suffixForSort)
  })

  it('27 WordUsageExamples - method getPropertyBySortBy defines sort order, if type is not defined, then by default it returns fullCit (Author + TextWork)', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    let wordUsageEx = testWordUsageList.wordUsageExamples[0]
    let res = cmp.vm.getPropertyBySortBy(wordUsageEx)
    expect(res).toEqual(wordUsageEx.fullCit().toUpperCase())
  })

  it.skip('28 WordUsageExamples - method sortWordUsageExamplesBy returns wordUsageExamples sorted by sortBy property - by default', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    let checkArrayWithoutSort, sortedRes
    // by default

    checkArrayWithoutSort = cmp.vm.wordUsageExamples.map(item => cmp.vm.getPropertyBySortBy(item))
    //
    // checkArrayWithoutSort = [
    // 0  'GAIUS SALLUSTIUS CRISPUS BELLUM IUGURTHINUM 1',
    // 1  'CORNELIUS TACITUS ANNALES 3',
    // 2  'CORNELIUS TACITUS HISTORIAE 4',
    // 3  'CORNELIUS TACITUS ANNALES 13',
    // 4  'CORNELIUS TACITUS HISTORIAE 1'
    // ]



    sortedRes = cmp.vm.sortWordUsageExamplesBy().map(item => cmp.vm.getPropertyBySortBy(item))
    expect(sortedRes[0]).toEqual('CORNELIUS TACITUS ANNALES 13')
    expect(sortedRes[1]).toEqual('CORNELIUS TACITUS ANNALES 3')
    expect(sortedRes[2]).toEqual('CORNELIUS TACITUS HISTORIAE 1')
    expect(sortedRes[3]).toEqual('CORNELIUS TACITUS HISTORIAE 4')
    expect(sortedRes[4]).toEqual('GAIUS SALLUSTIUS CRISPUS BELLUM IUGURTHINUM 1')
  })

  // This test needs to be updated
  it.skip('29 WordUsageExamples - method sortWordUsageExamplesBy returns wordUsageExamples sorted by sortBy property - by defined sortBy', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList2

    //byPrefix
    cmp.vm.sortBy = 'byPrefix'
    //
    // [ 'DOMINATIONIS', 'FORTUNA', 'LUXU', 'LONGA', 'PRAVIS' ]
    //

    let sortedRes = cmp.vm.sortWordUsageExamplesBy().map(item => cmp.vm.getPropertyBySortBy(item, 'byPrefix'))
    expect(sortedRes).toEqual([ 'DOMINATIONIS', 'FORTUNA', 'LONGA', 'LUXU', 'PRAVIS' ])
  })
})
