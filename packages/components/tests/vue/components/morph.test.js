/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import Morph from '@/vue/components/morph.vue'
import InflectionAttribute from '@/vue/components/infl-attribute.vue'

import { Constants } from 'alpheios-data-models'

describe('morph.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let testHomonymCupidinibus, testHomonymOvo, testHomonymGreek, testHomonymOrontea, testHomonymPerfundere

  beforeAll(async () => {
    testHomonymCupidinibus = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    testHomonymOvo = await BaseTestHelp.collectHomonym('ovo', Constants.LANG_LATIN, false)

    testHomonymGreek = await BaseTestHelp.collectHomonym('ξηρή', Constants.LANG_GREEK, false)
    testHomonymOrontea = await BaseTestHelp.collectHomonym('Orontea', Constants.LANG_LATIN)

    testHomonymPerfundere = await BaseTestHelp.collectHomonym('perfundere', Constants.LANG_LATIN, false)
    
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
/*
  it('1 Morph - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Morph, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Morph - computed lexemes returns ready lexemes or empty array', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        getHomonymLexemes: () => testHomonymCupidinibus.lexemes
      })
    }
    
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(Morph, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.lexemes).toEqual([])
    store.commit('app/setTestMorphDataReady', true)

    expect(cmp.vm.lexemes).toEqual(testHomonymCupidinibus.lexemes)
  })
*/
  it('3 Morph - computed translations returns empty object if translations are not ready, and returns translations otherwise', async () => {

    await BaseTestHelp.collectTranslations(testHomonymCupidinibus)

    let api = {
      app: BaseTestHelp.appAPI({
        getHomonymLexemes: () => testHomonymCupidinibus.lexemes
      })
    }
    let cmp = shallowMount(Morph, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.vm.translations).toEqual({})

    store.commit('app/setTestMorphDataReady', true)
    store.commit('app/setTranslationsDataReady', true)

    expect(Object.values(cmp.vm.translations).length).toEqual(2)
    expect(Object.values(cmp.vm.translations)[0].glosses.length).toEqual(3)
  }, 500000)

  it('4 Morph - method showLexeme checks lexeme and if it has any data returns true, otherwise returns false', () => {
    let cmp = shallowMount(Morph, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showLexeme(testHomonymCupidinibus.lexemes[0])).toBeTruthy()
    expect(cmp.vm.showLexeme(testHomonymOrontea.lexemes[0])).toBeFalsy()
  })

  it('5 Morph - computed hasTranslations returns true if translations collected and have data', async () => {

    await BaseTestHelp.collectTranslations(testHomonymCupidinibus)

    let api = {
      app: BaseTestHelp.appAPI({
        getHomonymLexemes: () => testHomonymCupidinibus.lexemes
      })
    }
    let cmp = shallowMount(Morph, {
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestMorphDataReady', true)
    store.commit('app/setTranslationsDataReady', true)

    expect(cmp.vm.hasTranslations(testHomonymCupidinibus.lexemes[0].lemma.ID)).toBeTruthy()
    expect(cmp.vm.hasTranslations(testHomonymCupidinibus.lexemes[1].lemma.ID)).toBeFalsy()

  }, 500000)

  it('6 Morph - method morphClass adds class and specific class for disambiguated lexemes', () => {
    let cmp = shallowMount(Morph, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.morphClass(testHomonymCupidinibus.lexemes[0])).toEqual('alpheios-morph__dictentry')
    
    testHomonymPerfundere.lexemes[0].disambiguated = true
    expect(cmp.vm.morphClass(testHomonymPerfundere.lexemes[0])).toEqual('alpheios-morph__dictentry alpheios-morph__dictentry-disambiguated')
  })
})