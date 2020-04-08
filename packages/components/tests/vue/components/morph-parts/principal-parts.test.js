/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import PrincipalParts from '@/vue/components/morph-parts/principal-parts.vue'
import InflectionAttribute from '@/vue/components/infl-attribute.vue'

import { Constants } from 'alpheios-data-models'

describe('principal-parts.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  const api = {}
  let testHomonymCupidinibus, testHomonymFacili, testHomonymOrontea

  beforeAll(async () => {
    testHomonymCupidinibus = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    testHomonymFacili = await BaseTestHelp.collectHomonym('facili', Constants.LANG_LATIN, false)
    testHomonymOrontea = await BaseTestHelp.collectHomonym('Orontea', Constants.LANG_LATIN, false)
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = BaseTestHelp.baseVuexStore()
    BaseTestHelp.l10nModule(store, api)
  })

  /**
   * @param ms
   */
  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 MorphData - renders a vue instance (min requirements)', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymCupidinibus.lexemes[0].lemma,
        lemmaindex: 0,
        lexemeindex: 0,
        lexemeslength: 1
      },
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(Object.keys(cmp.vm.types).length).toBeGreaterThan(2)
  })

  it('2 MorphData - computed printIndex is true if there are more than 1 lexeme', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymCupidinibus.lexemes[0].lemma,
        lemmaindex: 0,
        lexemeindex: 0,
        lexemeslength: testHomonymCupidinibus.lexemes.length
      },
      localVue,
      mocks: api
    })
    expect(cmp.vm.printIndex).toBeTruthy()
  })

  it('3 MorphData - computed printIndex is false if there is only 1 lexeme', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymFacili.lexemes[0].lemma,
        lemmaindex: 0,
        lexemeindex: 0,
        lexemeslength: testHomonymFacili.lexemes.length
      },
      localVue,
      mocks: api
    })
    expect(cmp.vm.printIndex).toBeFalsy()
  })

  it('4 MorphData - computed languageCode returns languageCode of the lemma', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymFacili.lexemes[0].lemma,
        lemmaindex: 0,
        lexemeindex: 0,
        lexemeslength: testHomonymFacili.lexemes.length
      },
      localVue,
      mocks: api
    })
    expect(cmp.vm.languageCode).toEqual('lat')
  })

  it('5 MorphData - computed hasExtras returns true if lemma has one of the following features (frequency, age, area, geo)', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymFacili.lexemes[0].lemma,
        lemmaindex: 0,
        lexemeindex: 0,
        lexemeslength: testHomonymFacili.lexemes.length
      },
      localVue,
      mocks: api
    })
    expect(cmp.vm.hasExtras).toBeTruthy()
  })

  it('6 MorphData - computed hasExtras returns false if lemma doesn\'t have one of the following features (frequency, age, area, geo)', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymOrontea.lexemes[0].lemma,
        lemmaindex: 0,
        lexemeindex: 0,
        lexemeslength: testHomonymOrontea.lexemes.length
      },
      localVue,
      mocks: api
    })
    expect(cmp.vm.hasExtras).toBeFalsy()
  })

  it('7 MorphData - computed hasSource returns true if lemma has source feature', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymCupidinibus.lexemes[0].lemma,
        lemmaindex: 0,
        lexemeindex: 0,
        lexemeslength: testHomonymCupidinibus.lexemes.length
      },
      localVue,
      mocks: api
    })
    expect(cmp.vm.hasExtras).toBeTruthy()
  })

  it('8 MorphData - computed hasSource returns false if lemma doesn\'t have source feature', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymOrontea.lexemes[0].lemma,
        lemmaindex: 0,
        lexemeindex: 0,
        lexemeslength: testHomonymOrontea.lexemes.length
      },
      localVue,
      mocks: api
    })
    expect(cmp.vm.hasExtras).toBeFalsy()
  })

  it('9 MorphData - method featureList returns formated value for the list of features - extras', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymCupidinibus.lexemes[1].lemma,
        lemmaindex: 0,
        lexemeindex: 1,
        lexemeslength: testHomonymCupidinibus.lexemes.length
      },
      localVue,
      mocks: api
    })

    const res = cmp.vm.featureList(['age', 'area', 'geo', 'frequency'], 'extras')

    expect(res.extras).toBeDefined()
    expect(res.extras.value).toEqual('(religion, common)')
    expect(res.extras.values).toEqual(['(religion, common)'])
  })

  it('10 MorphData - method featureList returns empty string if there are no values in the list', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymOrontea.lexemes[0].lemma,
        lemmaindex: 0,
        lexemeindex: 0,
        lexemeslength: testHomonymOrontea.lexemes.length
      },
      localVue,
      mocks: api
    })

    const res = cmp.vm.featureList(['age', 'area', 'geo', 'frequency'], 'extras')

    expect(res.extras).toBeDefined()
    expect(res.extras.value).toEqual('')
    expect(res.extras.values).toEqual([''])
  })

  it('11 MorphData - method getFeature returns undeined if there is no such feature in lemma, and value if it is defined', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymCupidinibus.lexemes[1].lemma,
        lemmaindex: 0,
        lexemeindex: 1,
        lexemeslength: testHomonymCupidinibus.lexemes.length
      },
      localVue,
      mocks: api
    })

    expect(cmp.vm.getFeature('geo')).not.toBeDefined()
    expect(cmp.vm.getFeature('area')).toEqual('religion')
  })

  it('12 MorphData - has all needed parts', () => {
    const cmp = shallowMount(PrincipalParts, {
      propsData: {
        lemma: testHomonymCupidinibus.lexemes[1].lemma,
        lemmaindex: 0,
        lexemeindex: 1,
        lexemeslength: testHomonymCupidinibus.lexemes.length
      },
      localVue,
      mocks: api
    })

    expect(cmp.find('.alpheios-principal-parts__lemma_index').text()).toEqual('2')
    expect(cmp.find('.alpheios-principal-parts__groupitem').text().replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, ' ')).toEqual('Cupido Cupidinis')
  })
})
