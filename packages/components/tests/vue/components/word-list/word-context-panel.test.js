/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import WordContextPanel from '@/vue/components/word-list/word-context-panel.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'
import BackIcon from '@/images/inline-icons/back.svg'

import { Constants, WordItem } from 'alpheios-data-models'

describe('word-context-panel.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  



  let store
  let api = {}
  let homonym, testWordItem
  
  beforeAll(async () => {
    homonym = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    testWordItem = new WordItem({
      targetWord: 'cupidinibus',
      languageCode: 'lat',
      homonym
    })

    testWordItem.context = [ {source: 'fooSource1'}, {source: 'fooSource2'} ]
  })
  
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  
    store = BaseTestHelp.baseVuexStore()
  
    api = {}
    BaseTestHelp.l10nModule(store, api)
  
  })
  
  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 WordContextPanel - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(WordContextPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordContextPanel - computed formattedContext returns formattedContext from the wordItem', () => {
    let cmp = shallowMount(WordContextPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })
    expect(cmp.vm.formattedContext).toEqual(testWordItem.formattedContext)
  })

  it('3 WordContextPanel - computed formattedContext returns formattedContext from the wordItem', () => {
    let cmp = shallowMount(WordContextPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })
    expect(cmp.vm.sourcesList).toEqual(['fooSource1', 'fooSource2'])
  })

  it('4 WordContextPanel - method backToWordList emitts backToWordList', () => {
    let cmp = shallowMount(WordContextPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })
    cmp.vm.backToWordList()

    expect(cmp.emitted()['backToWordList']).toBeTruthy()
  })

  it('5 WordContextPanel - renders back link to alpheios-wordlist-commands__item-back', async() => {
    let cmp = shallowMount(WordContextPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })

    let backBlock = cmp.find('.alpheios-wordlist-commands__item-back')
    expect(backBlock.exists()).toBeTruthy()
    expect(backBlock.find(BackIcon).exists()).toBeTruthy()

    backBlock.trigger('click')
    expect(cmp.emitted()['backToWordList']).toBeTruthy()
  })
})