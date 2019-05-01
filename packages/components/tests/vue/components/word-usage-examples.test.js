/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import Vuex from 'vuex'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'

import { Constants, Author, TextWork, ResourceProvider } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'

import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

import WordUsageExamples from '@/vue/components/word-usage-examples/word-usage-examples.vue'

describe('word-usage-examples-block.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let testWordUsageList, testWord1, mockProvider, store, l10nModule

  let api = {}
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
    let testAuthor = new Author('urn:cts:latinLit:phi0690', { "eng": "Virgil" })
    testAuthor.ID = 690
    let testTextWork = new TextWork(testAuthor, 'urn:cts:latinLit:phi0690.phi003', { "eng": "Aeneid" })
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
    mockProvider = { toString: () => { return 'fooProvider'} }
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          state: {}
        },
        app: {
          homonym: {},
          state: {
            homonymDataReady: true,
            wordUsageExamplesReady: false
          }
        }
      }
    })

    api = {
      app: {
        homonymDataReady: false,
        homonym: {}
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

  it.skip('1 WordUsageExamples - checks if a component mounts properly without word usage examples ready', async () => {
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
        // l10n: api.l10n,
        app: {
          homonymDataReady: true,
          homonym: { targetWord: 'cepit', language: 'lat' }
        },
        ui: api.ui
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
          wordUsageExamples: testWordUsageList
        },
        ui: api.ui
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(cmp.vm.showWordUsageExampleItems).toBeTruthy()
    expect(cmp.vm.wordUsageExamples).toEqual(testWordUsageList.wordUsageExamples)

    expect(cmp.vm.provider).not.toBeNull()
    expect(cmp.vm.providerRights.length).toBeGreaterThan(0)
  })
/*
  it.skip('2 WordUsageExamples - doesn\'t render wordUsageExampleItem if wordUsageList is empty', async () => {
    let cmp = mount(WordUsageExamples, {
      propsData: {
        wordUsageList: [],
        targetWord: testWord1,
        language: 'lat',
        provider: mockProvider
      },
      store,
      localVue
    })
    expect(cmp.vm.showWordUsageExampleItems).toBeFalsy()
    expect(cmp.findAll(wordUsageExampleItem).length).toEqual(0)
  })

  it.skip('3 WordUsageExamples - renders wordUsageExampleItem for each item in the list', async () => {
    let cmp = mount(WordUsageExamples, {
      propsData: {
        wordUsageList: testWordUsageList.wordUsageExamples,
        targetWord: testWord1,
        language: 'lat',
        provider: mockProvider
      },
      store,
      localVue
    })
    expect(cmp.vm.showWordUsageExampleItems).toBeTruthy()
    expect(cmp.findAll(wordUsageExampleItem).length).toEqual(testWordUsageList.wordUsageExamples.length)
  })

  it.skip('4 WordUsageExamples - renders provider data if exists', async () => {
    const resourceProviderName = 'Resource Provider'
    let cmp = mount(WordUsageExamples, {
      propsData: {
        wordUsageList: testWordUsageList.wordUsageExamples,
        targetWord: testWord1,
        language: 'lat',
        provider: new ResourceProvider('https://test.com', resourceProviderName)
      },
      store,
      localVue
    })
    expect(cmp.vm.showWordUsageExampleItems).toBeTruthy()
    expect(cmp.find('.alpheios-word_usage_list__provider')).toBeTruthy()
    expect(cmp.find('.alpheios-word_usage_list__provider').text()).toEqual(resourceProviderName)
  })

  it.skip('4 WordUsageExamples - sorts lists', async () => {
    let mockExA = { fullCit: () => {return 'abc.def.123'} }
    let mockExB = { fullCit: () => {return 'abc.def.123'} }
    let mockExC = { fullCit: () => {return 'abc.ghi.123'} }
    let mockExD = { fullCit: () => {return 'def.ghi.123'} }
    let mockExE = { fullCit: () => {return 'ghi.jkl.123'} }
    let cmp = mount(WordUsageExamples, {
      propsData: {
        wordUsageList: [
          mockExE,
          mockExD,
          mockExC,
          mockExA,
          mockExB
        ],
        targetWord: testWord1,
        language: 'lat',
        provider: 'fooProvider'
      },
      store,
      localVue
    })
    expect(cmp.vm.wordUsageListSorted).toEqual([
      mockExA,
      mockExB,
      mockExC,
      mockExD,
      mockExE
    ])
  })
  */
})
