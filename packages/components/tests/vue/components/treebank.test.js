/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Treebank from '@/vue/components/treebank.vue'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'
import Vuex from 'vuex'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

describe('treebank.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let api
  let l10nModule
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = BaseTestHelp.baseVuexStore()
    api = {
      settings: BaseTestHelp.settingsAPI({ experimentalResetTreebankURL: false }),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.lexisModule(store, api)
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Treebank - renders a vue instance (min requirements)', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            treebankData: {
              word: {},
              page: {}
            }
          }
        },
        ui: {
          namespaced: true,
          getters: {
            isActiveTab: () => (tabName) => tabName === 'treebank'
          }
        }
      }
    })

    l10nModule = new L10nModule(store, api, Locales.en_US, Locales.bundleArr([
      [enUS, Locales.en_US],
      [enUSData, Locales.en_US],
      [enUSInfl, Locales.en_US],
      [enGB, Locales.en_GB]
    ]))
    BaseTestHelp.lexisModule(store, api)

    const cmp = shallowMount(Treebank, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  // TODO: Fix after we decide on how URL will be assigned
  it.skip('2 Treebank - renders with src', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            treebankData: {
              word: {
                src: 'http/example.com/DOC/SENTENCE/WORD',
                ref: 'doc#foo1-foo2'
              },
              page: {}
            }
          }
        },
        ui: {
          namespaced: true,
          getters: {
            isActiveTab: () => (tabName) => tabName === 'treebank'
          }
        }
      }
    })

    l10nModule = new L10nModule(store, api, Locales.en_US, Locales.bundleArr([
      [enUS, Locales.en_US],
      [enUSData, Locales.en_US],
      [enUSInfl, Locales.en_US],
      [enGB, Locales.en_GB]
    ]))

    BaseTestHelp.lexisModule(store, api)

    let cmp = shallowMount(Treebank, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.srcURL).toEqual('http/example.com/doc/foo1/foo2')
    expect(cmp.find('iframe').attributes().src).toEqual('http/example.com/doc/foo1/foo2')

    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            treebankData: {
              page: {
                src: 'http/example.com/foo3/foo4'
              }
            }
          }
        },
        ui: {
          namespaced: true,
          getters: {
            isActiveTab: () => (tabName) => tabName === 'treebank'
          }
        }
      }
    })

    l10nModule = new L10nModule(store, api, Locales.en_US, Locales.bundleArr([
      [enUS, Locales.en_US],
      [enUSData, Locales.en_US],
      [enUSInfl, Locales.en_US],
      [enGB, Locales.en_GB]
    ]))

    cmp = shallowMount(Treebank, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.srcURL).toEqual('http/example.com/foo3/foo4')
    expect(cmp.find('iframe').attributes().src).toEqual('http/example.com/foo3/foo4')
  })
})
