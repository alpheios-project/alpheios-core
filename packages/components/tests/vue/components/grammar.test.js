/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Grammar from '@/vue/components/grammar.vue'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'
import Vuex from 'vuex'

describe('grammar.test.js', () => {
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

    api = {}
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Grammar - renders a vue instance (min requirements)', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          state: {
            grammarRes: {}
          }
        }
      }
    })

    l10nModule = new L10nModule(store, api, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr([
        [enUS, Locales.en_US],
        [enUSData, Locales.en_US],
        [enUSInfl, Locales.en_US],
        [enGB, Locales.en_GB]
      ])
    })

    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })
  it('2 Grammar - renders a vue instance (min requirements)', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            grammarRes: {
              url: 'http://example.com/'
            }
          },
          getters: {
            hasGrammarRes (state) {
              return state.grammarRes !== null
            }
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

    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.find('iframe').attributes().src).toEqual('http://example.com/')
    expect(cmp.find('.alpheios-grammar__provider').attributes('style')).toBe('display: none;')

    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            grammarRes: {
              url: 'http://example.com/',
              provider: 'fooprovider'
            }
          },
          getters: {
            hasGrammarRes (state) {
              return state.grammarRes !== null
            }
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

    cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.find('.alpheios-grammar__provider').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-grammar__provider').text()).toEqual('fooprovider')
  })
})
