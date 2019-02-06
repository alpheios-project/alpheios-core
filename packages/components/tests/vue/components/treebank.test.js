/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Treebank from '@/vue/components/treebank.vue'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'
import Vuex from 'vuex'

describe('treebank.test.js', () => {
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
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
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
          state: {
            treebankData: {
              word: {},
              page: {}
            }
          }
        }
      }
    })

    let cmp = shallowMount(Treebank, {
      store,
      localVue,
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Treebank - renders with src', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          state: {
            treebankData: {
              word: {
                src: 'http/example.com/DOC/SENTENCE/WORD',
                ref: 'doc#foo1-foo2'
              },
              page: {}
            }
          }
        }
      }
    })

    let cmp = shallowMount(Treebank, {
      store,
      localVue,
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    expect(cmp.vm.srcURL).toEqual('http/example.com/doc/foo1/foo2')
    expect(cmp.find('iframe').attributes().src).toEqual('http/example.com/doc/foo1/foo2')

    store = new Vuex.Store({
      modules: {
        app: {
          state: {
            treebankData: {
              page: {
                src: 'http/example.com/foo3/foo4'
              }
            }
          }
        }
      }
    })

    cmp = shallowMount(Treebank, {
      store,
      localVue,
      mocks: {
        l10n: l10nModule.api(l10nModule.store)
      }
    })

    expect(cmp.vm.srcURL).toEqual('http/example.com/foo3/foo4')
    expect(cmp.find('iframe').attributes().src).toEqual('http/example.com/foo3/foo4')
  })
})
