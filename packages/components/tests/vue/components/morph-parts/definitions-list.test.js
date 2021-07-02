/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import DefinitionsList from '@/vue/components/morph-parts/definitions-list.vue'
import InflectionAttribute from '@/vue/components/infl-attribute.vue'

import { Constants } from 'alpheios-data-models'

describe('definitions-list.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let testHomonymCupidinibus, testHomonymFacili, testHomonymGreek

  beforeAll(async () => {
    testHomonymCupidinibus = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    testHomonymFacili = await BaseTestHelp.collectHomonym('facili', Constants.LANG_LATIN, false)
    testHomonymGreek = await BaseTestHelp.collectHomonym('ξηρή', Constants.LANG_GREEK, false)
  })

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

  it('1 DefinitionsList - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(DefinitionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 DefinitionsList - computed definitions returns definitions list  if there are definitions', () => {
    let cmp = shallowMount(DefinitionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestShortDefUpdateTime', 1)
    expect(cmp.vm.definitions.length).toEqual(1)
    expect(cmp.vm.definitions[0].text).toEqual('desire/love/wish/longing (passionate); lust; greed, appetite; desire for gain;')
  })

  it('3 DefinitionsList - computed definitions returns definitions list  if there are definitions', () => {
    let cmp = shallowMount(DefinitionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestShortDefUpdateTime', 1)
    expect(cmp.vm.definitions.length).toEqual(1)
    expect(cmp.vm.definitions[0].text).toEqual('desire/love/wish/longing (passionate); lust; greed, appetite; desire for gain;')
  })

  it('4 DefinitionsList - computed definitions returns no definitions text  if there are no definitions', async () => {
    // console.info('testHomonymGreek.lexemes', testHomonymGreek.lexemes)
    let cmp = shallowMount(DefinitionsList, {
      propsData: {
        lexeme: testHomonymGreek.lexemes[1]
      },
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestShortDefUpdateTime', 2)

    // console.info('testHomonymGreek', testHomonymGreek.lexemes)
    // console.info('cmp.vm.lexeme', cmp.vm.lexeme)

    expect(cmp.vm.definitions.length).toEqual(1)
    expect(cmp.vm.definitions[0].text).toEqual(expect.stringContaining('No definitions'))
  })

  it('5 DefinitionsList - computed definitionIndex returns letter by index', () => {
    let cmp = shallowMount(DefinitionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })


    expect(cmp.vm.definitionIndex(2)).toEqual('c.')
  })

  it('6 DefinitionsList - renders progressbar while short defs is not ready', () => {
    store.commit('app/setTestShortDefUpdateTime', 0)
    let cmp = shallowMount(DefinitionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })


    expect(cmp.find('.alpheios-morph-definitions_list__definitions--placeholder').isVisible()).toBeTruthy()
  })

})