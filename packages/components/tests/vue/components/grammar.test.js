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
  const l10nModule = new L10nModule(Locales.en_US, Locales.bundleArr([
    [enUS, Locales.en_US],
    [enUSData, Locales.en_US],
    [enUSInfl, Locales.en_US],
    [enGB, Locales.en_GB]
  ]))
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
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
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
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
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })
    expect(cmp.find('iframe').attributes().src).toEqual('http://example.com/')
    expect(cmp.find('.alpheios-grammar__provider').exists()).toBeFalsy()

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
    cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    expect(cmp.find('.alpheios-grammar__provider').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-grammar__provider').text()).toEqual('fooprovider')
  })
})
