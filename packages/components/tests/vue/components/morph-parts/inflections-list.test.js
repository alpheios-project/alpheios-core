/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import InflectionsList from '@/vue/components/morph-parts/inflections-list.vue'
import InflectionAttribute from '@/vue/components/infl-attribute.vue'

import { Constants } from 'alpheios-data-models'

describe('inflections-list.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let testHomonymCupidinibus, testHomonymOvo, testHomonymGreek

  beforeAll(async () => {
    testHomonymCupidinibus = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    testHomonymOvo = await BaseTestHelp.collectHomonym('ovo', Constants.LANG_LATIN, false)
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

  it('1 InflectionsList - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(InflectionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(Object.keys(cmp.vm.types).length).toBeGreaterThan(2)
  })

  it('2 InflectionsList - computed hasInflections returns true if there are inflections, and false if they are not ready yet', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        hasMorphData: () => true
      })
    }
  
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(InflectionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.hasInflections).toBeFalsy()

    store.commit('app/setTestMorphDataReady', true)

    expect(cmp.vm.hasInflections).toBeTruthy()
  })

  it('3 InflectionsList - computed hasInflections returns grouped inflections if they are ready and empty array, if not', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        hasMorphData: () => true
      })
    }
  
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(InflectionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.inflections).toEqual([])

    store.commit('app/setTestMorphDataReady', true)

    expect(cmp.vm.inflections.length).toEqual(1)
    expect(cmp.vm.inflections[0].groupingKey['stem']).toEqual('cupidin')
    expect(cmp.vm.inflections[0].groupingKey['suffix']).toEqual('ibus')
  })

  it('4 InflectionsList - computed languageCode returns languageCode of the lemma', () => {
    let cmp = shallowMount(InflectionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.vm.languageCode).toEqual('lat')
    
  })

  it('4 InflectionsList - method groupClass returns class based on grouping property - alpheios-inflections-list__inline', () => {
    let cmp = shallowMount(InflectionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })

    let groupInfl = testHomonymCupidinibus.lexemes[0].getGroupedInflections()[0].inflections[0]
    expect(cmp.vm.groupClass(groupInfl)).toEqual('alpheios-inflections-list__inline')
    
  })

  it('5 InflectionsList - method groupClass returns class based on grouping property - alpheios-inflections-list__block', () => {
    let cmp = shallowMount(InflectionsList, {
      propsData: {
        lexeme: testHomonymOvo.lexemes[1]
      },
      store,
      localVue,
      mocks: api
    })

    let groupInfl = testHomonymOvo.lexemes[1].getGroupedInflections()[0].inflections[0]
    expect(cmp.vm.groupClass(groupInfl)).toEqual('alpheios-inflections-list__block')
    
  })

  it('6 InflectionsList - method featureMatch returns true if both features are defined and equal, otherwise returns false', () => {
    let cmp = shallowMount(InflectionsList, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0]
      },
      store,
      localVue,
      mocks: api
    })

    let resEqual = cmp.vm.featureMatch(testHomonymCupidinibus.lexemes[0].lemma.features[cmp.vm.types.part], testHomonymOvo.lexemes[0].lemma.features[cmp.vm.types.part])
    expect(resEqual).toBeTruthy()
    
    resEqual = cmp.vm.featureMatch(testHomonymCupidinibus.lexemes[0].lemma.features[cmp.vm.types.gender], testHomonymOvo.lexemes[0].lemma.features[cmp.vm.types.gender])
    expect(resEqual).toBeFalsy()

    resEqual = cmp.vm.featureMatch(null, testHomonymOvo.lexemes[0].lemma.features[cmp.vm.types.gender])
    expect(resEqual).toBeFalsy()

    resEqual = cmp.vm.featureMatch(testHomonymCupidinibus.lexemes[0].lemma.features[cmp.vm.types.gender], null)
    expect(resEqual).toBeFalsy()
  })
})