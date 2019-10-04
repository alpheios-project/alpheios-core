/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import WordItemPanel from '@/vue/components/word-list/word-item-panel.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants, WordItem } from 'alpheios-data-models'

describe('word-item-panel.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  let store
  let api = {}
  let homonym, testWordItem
  
  beforeAll(async () => {
    homonym = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN)
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

  it('1 WordItemPanel - renders a vue instance (min requirements)', () => {
    testWordItem.important = true


    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,

      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.vm.important).toBeTruthy()
    testWordItem.important = false
  })

  it('2 WordItemPanel - computed itemClasses returns spcific class for important', () => {
    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })

    expect(cmp.vm.itemClasses['alpheios-wordlist-language__worditem__active']).toBeFalsy()

    cmp.vm.important = true

    expect(cmp.vm.itemClasses['alpheios-wordlist-language__worditem__active']).toBeTruthy()
  })

  it('3 WordItemPanel - computed lemmasList returns lemmas array', () => {
    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: {}
      }
    })

    expect(cmp.vm.lemmasList).toEqual([])

    cmp.setProps({
        worditem: testWordItem
    })
    store.commit('app/setTestWordListUpdateTime', 1)

    expect(cmp.vm.lemmasList.length).toEqual(2)
  })

  it('4 WordItemPanel - method changeImportant changes local important property and emits event to change important of the worditem', () => {
    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })

    expect(testWordItem.important).toBeFalsy()
    expect(cmp.vm.important).toBeFalsy()

    cmp.vm.changeImportant()
    Vue.nextTick().then(() => {
        expect(cmp.vm.important).toBeTruthy()
        expect(cmp.emitted()['changeImportant']).toBeTruthy()
        expect(testWordItem.important).toBeTruthy()
    })
  })

  it('5 WordItemPanel - method eventChangeImportant loads important from the wordItem', () => {
    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })

    expect(testWordItem.important).toBeFalsy()
    expect(cmp.vm.important).toBeFalsy()

    testWordItem.important = true
    expect(cmp.vm.important).toBeFalsy()

    cmp.vm.eventChangeImportant()
    expect(cmp.vm.important).toBeTruthy()

  })

  it('6 WordItemPanel - method selectWordItem executes app.selectWordItem', () => {
    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })

    api.app.selectWordItem = jest.fn()

    cmp.vm.selectWordItem()
    expect(api.app.selectWordItem).toHaveBeenCalledWith(testWordItem.languageCode, testWordItem.targetWord)
  })


  it('7 WordItemPanel - method selectWordItemMobile executes app.selectWordItem only on Mobile platform', () => {
    let api = {
      app: BaseTestHelp.appAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })

    api.app.platform.isMobile = false

    cmp.vm.selectWordItem = jest.fn()

    cmp.vm.selectWordItemMobile()
    expect(cmp.vm.selectWordItem).not.toHaveBeenCalled()

    api.app.platform.isMobile = true

    cmp.vm.selectWordItemMobile()
    expect(cmp.vm.selectWordItem).toHaveBeenCalled()
  })

  it('8 WordItemPanel - method deleteItem emitts deleteItem', () => {
    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })

    cmp.vm.deleteItem()
    expect(cmp.emitted()['deleteItem']).toBeTruthy()
  })

  it('9 WordItemPanel - method showContexts emitts showContexts', () => {
    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })

    cmp.vm.showContexts()
    expect(cmp.emitted()['showContexts']).toBeTruthy()
  })

  it('10 WordItemPanel - method setLemmaFilterByClick emitts setLemmaFilterByClick', () => {
    let cmp = shallowMount(WordItemPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        worditem: testWordItem
      }
    })

    cmp.vm.setLemmaFilterByClick()
    expect(cmp.emitted()['setLemmaFilterByClick']).toBeTruthy()
  })

})