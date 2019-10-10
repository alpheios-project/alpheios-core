/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Grammar from '@/vue/components/grammar.vue'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Vuex from 'vuex'

describe('grammar.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let store
  let api

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = BaseTestHelp.baseVuexStore()

    api = {
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 Grammar - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })
  
  it('2 Grammar - renders iframe and provider', () => {
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setGrammarProvider', {
      url: 'http://example.com/'
    })

    expect(cmp.find('iframe').attributes().src).toEqual('http://example.com/')
    expect(cmp.find('.alpheios-grammar__provider').attributes('style')).toBe('display: none;')

    store.commit('app/setGrammarProvider', {
      provider: 'fooprovider',
      url: 'http://example.com/'
    })

    expect(cmp.find('.alpheios-grammar__provider').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-grammar__provider').text()).toEqual('fooprovider')
  })

  it('3 Grammar - computed hasGrammarResUrl returns true if url is defined', () => {
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.hasGrammarResUrl).toBeFalsy()

    store.commit('app/setGrammarProvider', {
      url: 'http://example.com/'
    })

    expect(cmp.vm.hasGrammarResUrl).toBeTruthy()
  })

  it('4 Grammar - computed hasGrammarProvider returns true if provider is defined', () => {
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.hasGrammarProvider).toBeFalsy()

    store.commit('app/setGrammarProvider', {
      url: 'http://example.com/',
      provider: 'fooprovider'
    })

    expect(cmp.vm.hasGrammarProvider).toBeTruthy()
  })

  it('5 Grammar - computed grammarProvider returns provider if it is  defined', () => {
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.grammarProvider).toEqual('')

    store.commit('app/setGrammarProvider', {
      url: 'http://example.com/',
      provider: 'fooprovider'
    })

    expect(cmp.vm.grammarProvider).toEqual('fooprovider')
  })

  it('6 Grammar - method returnToIndex executes app.restoreGrammarIndex', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        restoreGrammarIndex: jest.fn()
      })
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.returnToIndex()

    expect(cmp.vm.app.restoreGrammarIndex).toHaveBeenCalled()
  })
})
