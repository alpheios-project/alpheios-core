/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import WordListPanel from '@/vue/components/word-list/word-list-panel.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants, WordItem } from 'alpheios-data-models'

describe('word-list-panel.test.js', () => {
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

  it('1 WordListPanel - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordListPanel - computed languagesList returns an empty array if wordLists are empty', () => {
    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api,
      computed: {
        wordLists: () => {}
      }
    })
    expect(cmp.vm.languagesList).toEqual([])
  })

  it('3 WordListPanel - computed languagesList returns an array of languages of all wordLists', () => {
    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api,
      computed: {
        wordLists: () => {
          return {
            lat: 'latinList',
            grc: 'greekList'
          }
        }
      }
    })
    store.commit('app/setTestWordListUpdateTime', 1)
    expect(cmp.vm.languagesList).toEqual(['lat', 'grc'])
  })

  it('4 WordListPanel - computed showContext returns true if showContext is true otherwise it returns false', () => {
    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showContext).toBeFalsy()

    cmp.vm.showContextWordItem = true

    expect(cmp.vm.showContext).toBeTruthy()
  })

  it('5 WordListPanel - method showContexts uploads worditem to showContext panel', () => {
    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api,
      computed: {
        wordLists: () => {
          return {
            lat: {
              getWordItem: (targetWord) => ('selectedWordItem-' + targetWord)
            }
          }
        }
      }
    })

    expect(cmp.vm.showContextWordItem).toBeNull()
    cmp.vm.showContexts('testTargetWord', 'lat')
    expect(cmp.vm.showContextWordItem).toEqual('selectedWordItem-testTargetWord')
  })

  it('6 WordListPanel - method backToWordList makes showContextWordItem to be null', () => {
    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api
    })


    cmp.vm.showContextWordItem = 'testWordItem'
    cmp.vm.backToWordList()

    expect(cmp.vm.showContextWordItem).toBeNull()
  })

  it('7 WordListPanel - method defineDirection returns true if the language is rtl', () => {
    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api
    })

    let dirRTL

    dirRTL = cmp.vm.defineDirection('lat')
    expect(dirRTL).toBeFalsy()

    dirRTL = cmp.vm.defineDirection('grc')
    expect(dirRTL).toBeFalsy()

    dirRTL = cmp.vm.defineDirection('ara')
    expect(dirRTL).toBeTruthy()

    dirRTL = cmp.vm.defineDirection('per')
    expect(dirRTL).toBeTruthy()
  })

  it('8 WordListPanel - computed wordLists returns an empty array if wordlist is not ever updated', () => {
    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.wordLists).toEqual([])
  })

  it('8 WordListPanel - computed wordLists returns an wordLists from the api.app', () => {
    let api = {
      app: BaseTestHelp.appAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api
    })

    api.app.getAllWordLists = jest.fn(() => 'testWordList')
    store.commit('app/setTestWordListUpdateTime', 1)

    expect(api.app.getAllWordLists).toHaveBeenCalled()
    expect(cmp.vm.wordLists).toEqual('testWordList')
  })

})