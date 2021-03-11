/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import WordUsageExamplesSorting from '@/vue/components/word-usage-examples/word-usage-examples-sorting.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants, Author, TextWork } from 'alpheios-data-models'

describe('word-usage-examples.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let homonym, testWordUsageList

  beforeAll(async () => {
    homonym = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    testWordUsageList = await BaseTestHelp.collectConcordance(homonym)
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

  it('1 WordUsageExamplesSorting - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(WordUsageExamplesSorting, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordUsageExamplesSorting - computed availableSortBy returns true if wordUsage is ready and has results', () => {
    let cmp = shallowMount(WordUsageExamplesSorting, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.vm.availableSortBy).toBeFalsy()

    store.commit('app/setTestWordUsageExamplesReady', true)

    expect(cmp.vm.availableSortBy).toBeFalsy()

    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.availableSortBy).toBeTruthy()
  })

  it('3 WordUsageExamplesSorting - computed finalTypeSortingList returns current sorting ', async () => {
    let cmp = shallowMount(WordUsageExamplesSorting, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.vm.finalTypeSortingList).toBeFalsy()

    cmp.setData({
      calctypeSortingList: 'fooSorting'
    })
    cmp.setProps({
      reloadSorting: 1
    })

    await Vue.nextTick()

    expect(cmp.vm.finalTypeSortingList).toEqual('fooSorting')
  })

  it('4 WordUsageExamplesSorting - method changedSortBy emits changedSortBy', () => {
    let cmp = shallowMount(WordUsageExamplesSorting, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      selectedSortBy: 'byTextWork'
    })

    cmp.vm.changedSortBy()
    expect(cmp.emitted().changedSortBy[0][0]).toEqual('byTextWork')
  })

  it('5 WordUsageExamplesSorting - method clearSorting emits changedSortBy', () => {
    let cmp = shallowMount(WordUsageExamplesSorting, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      selectedSortBy: 'byTextWork'
    })

    cmp.vm.changedSortBy = jest.fn()

    cmp.vm.clearSorting()
    expect(cmp.vm.selectedSortBy).toBeNull()
    expect(cmp.vm.changedSortBy).toHaveBeenCalled()
  })

  it('6 WordUsageExamplesSorting - watch reloadSorting filters sorting types, if availableSortBy is false - then it clears sorting', async () => {
    let cmp = shallowMount(WordUsageExamplesSorting, {
      store,
      localVue,
      mocks: api
    })
    
    store.commit('app/setTestWordUsageExamplesReady', false)
    cmp.vm.changedSortBy = jest.fn()
    cmp.setData({
      selectedSortBy: 'fooSelected'
    })

    cmp.setProps({
      reloadSorting: 1
    })

    await Vue.nextTick()
    expect(cmp.vm.selectedSortBy).toBeNull()
    expect(cmp.vm.changedSortBy).toHaveBeenLastCalledWith()
  })

  it('7 WordUsageExamplesSorting - watch reloadSorting filters sorting types, if availableSortBy is true and no selected text and author, then removes sorting by textWrok', async () => {
    let cmp = shallowMount(WordUsageExamplesSorting, {
      store,
      localVue,
      mocks: api
    })
    
    store.commit('app/setTestWordUsageExamplesReady', true)
    api.app.wordUsageExamples = testWordUsageList

    cmp.vm.changedSortBy = jest.fn()
    cmp.setData({
      selectedSortBy: 'fooSelected'
    })

    cmp.setProps({
      reloadSorting: 1
    })

    await Vue.nextTick()

    expect(cmp.vm.selectedSortBy).toBeNull()
    expect(cmp.vm.changedSortBy).toHaveBeenLastCalledWith()
    expect(cmp.vm.calctypeSortingList.length).toEqual(3)
    expect(cmp.vm.calctypeSortingList.find(item => item.value === 'byTextWork')).toBeFalsy()
  })

  it.skip('8 WordUsageExamplesSorting - watch reloadSorting filters sorting types, if availableSortBy is true and only author is selected, then removes byTextWork sorting', async () => {
    let cmp = shallowMount(WordUsageExamplesSorting, {
      store,
      localVue,
      mocks: api
    })
    
    store.commit('app/setTestWordUsageExamplesReady', true)
    api.app.wordUsageExamples = testWordUsageList
    
    cmp.vm.changedSortBy = jest.fn()
    cmp.setData({
      selectedSortBy: 'fooSelected'
    })

    cmp.setProps({
      reloadSorting: 10,
      hasSelectedAuthor: true
    })

    await Vue.nextTick()
    expect(cmp.vm.selectedSortBy).toBeNull()
    expect(cmp.vm.changedSortBy).toHaveBeenLastCalledWith()
    expect(cmp.vm.calctypeSortingList.length).toEqual(3)

    expect(cmp.vm.calctypeSortingList.find(item => item.value === 'byTextWork')).toBeFalsy()
  })

  it.skip('9 WordUsageExamplesSorting - watch reloadSorting filters sorting types, if availableSortBy is true and textWork is selected, then removes byTextWork sorting', async () => {
    let cmp = shallowMount(WordUsageExamplesSorting, {
      store,
      localVue,
      mocks: api
    })
    
    store.commit('app/setTestWordUsageExamplesReady', true)
    api.app.wordUsageExamples = testWordUsageList
    
    cmp.vm.changedSortBy = jest.fn()
    cmp.setData({
      selectedSortBy: 'fooSelected'
    })

    cmp.setProps({
      reloadSorting: 1,
      hasSelectedTextWork: true
    })

    await Vue.nextTick()
    expect(cmp.vm.selectedSortBy).toBeNull()
    expect(cmp.vm.changedSortBy).toHaveBeenLastCalledWith()
    expect(cmp.vm.calctypeSortingList.length).toEqual(3)

    expect(cmp.vm.calctypeSortingList.find(item => item.value === 'byTextWork')).toBeFalsy()
  })
})