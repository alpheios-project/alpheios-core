/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import WordSortingPanel from '@/vue/components/word-list/word-sorting-panel.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'
import Download from '@/lib/utility/download.js'

import { Constants, WordItem, WordList } from 'alpheios-data-models'

describe('word-sorting-panel.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  let store
  let api = {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  
  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 WordSortingPanel - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(WordSortingPanel) 

    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordSortingPanel - method changeSort updates sortingState and emitts changeSorting if it not equal current sortingState', () => {
    let cmp = shallowMount(WordSortingPanel) 

    cmp.vm.changeSort('targetWord', 'asc')

    expect(cmp.vm.sortingState.targetWord).toEqual('asc')
    expect(cmp.emitted()['changeSorting'][0]).toEqual(['targetWord', 'asc'])
  })

  it('3 WordSortingPanel - method changeSort clears sortingState and emitts changeSorting if it equal current sortingState', () => {
    let cmp = shallowMount(WordSortingPanel) 

    cmp.vm.sortingState['targetWord'] = 'asc'

    cmp.vm.changeSort('targetWord', 'asc')

    expect(cmp.vm.sortingState.targetWord).toBeNull()
    expect(cmp.emitted()['changeSorting'][0]).toEqual(['targetWord', null])
  })
})