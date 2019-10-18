/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import MorphData from '@/vue/components/morph-parts/morph-data.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import PrincipalParts from '@/vue/components/morph-parts/principal-parts.vue'
import InflectionAttribute from '@/vue/components/infl-attribute.vue'

import { Constants } from 'alpheios-data-models'

describe('morph-data.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let testHomonymCupidinibus, testHomonymAdsit

  beforeAll(async () => {
    testHomonymCupidinibus = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    testHomonymAdsit = await BaseTestHelp.collectHomonym('adsit', Constants.LANG_LATIN, false)
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 MorphData - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(MorphData, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0],
        lexemeindex: 0,
        lexemeslength: testHomonymCupidinibus.lexemes.length
      },
      localVue
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(Object.keys(cmp.vm.types).length).toBeGreaterThan(2)
  })

  it('2 MorphData - computed allLemmas returns all lemmas for the passed lexeme (without altLemmas)', () => {
    let cmp = shallowMount(MorphData, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0],
        lexemeindex: 0,
        lexemeslength: testHomonymCupidinibus.lexemes.length
      },
      localVue
    })
    expect(cmp.vm.allLemmas.length).toEqual(1)
    expect(cmp.vm.allLemmas.map(lemma => lemma.word)).toEqual(['cupido'])
  })

  it('3 MorphData - computed allLemmas returns all lemmas for the passed lexeme (with altLemmas, both has frequency)', () => {
    let cmp = shallowMount(MorphData, {
      propsData: {
        lexeme: testHomonymAdsit.lexemes[0],
        lexemeindex: 0,
        lexemeslength: testHomonymAdsit.lexemes.length
      },
      localVue
    })
    expect(cmp.vm.allLemmas.length).toEqual(2)
    expect(cmp.vm.allLemmas.map(lemma => lemma.word)).toEqual(['adsum', 'adsum'])
  })

  it('4 MorphData - renders all needed parts - principal parts', () => {
    let cmp = shallowMount(MorphData, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0],
        lexemeindex: 0,
        lexemeslength: testHomonymCupidinibus.lexemes.length
      },
      localVue
    })

    let allPP = cmp.findAll(PrincipalParts)

    expect(allPP.length).toEqual(1)
    let allPPAttr = allPP.at(0).attributes()
    
    expect(allPPAttr.lemma.length).toBeGreaterThan(0)
    expect(allPPAttr.lemmaindex).toEqual("0")
    expect(allPPAttr.lexemeslength).toEqual("2")
    expect(allPPAttr.lexemeindex).toEqual("0")
    
  })

  it('5 MorphData - renders all needed parts - inflection attributes', () => {
    let cmp = shallowMount(MorphData, {
      propsData: {
        lexeme: testHomonymCupidinibus.lexemes[0],
        lexemeindex: 0,
        lexemeslength: testHomonymCupidinibus.lexemes.length
      },
      localVue
    })

    let allIA = cmp.findAll(InflectionAttribute)
    expect(allIA.length).toEqual(7)

    expect(allIA.at(0).attributes().type).toEqual('case')
    expect(allIA.at(1).attributes().type).toEqual('gender')
    expect(allIA.at(2).attributes().type).toEqual('part of speech')
    expect(allIA.at(3).attributes().type).toEqual('kind')
    expect(allIA.at(4).attributes().type).toEqual('declension')
    expect(allIA.at(5).attributes().type).toEqual('conjugation')
    expect(allIA.at(6).attributes().type).toEqual('note')
  })
})