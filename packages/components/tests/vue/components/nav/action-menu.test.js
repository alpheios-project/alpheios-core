/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import ActionMenu from '@/vue/components/nav/action-menu.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'

describe('action-menu.test.js', () => {
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
  
    store = BaseTestHelp.baseVuexStore()
  
    api = {
      ui: BaseTestHelp.uiAPI()
    }
    BaseTestHelp.l10nModule(store, api)
  })
  
  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 ActionMenu - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(ActionMenu, {
      store,
      localVue,
      mocks: api,
      propsData: {
        visible: false
      }
    }) 

    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 ActionMenu - method tooltipText returns message if availabilityCondition = "N/A"', () => {
    let cmp = shallowMount(ActionMenu, {
      store,
      localVue,
      mocks: api,
      propsData: {
        visible: false
      }
    }) 

    jest.spyOn(cmp.vm.l10n, 'getText')
    
    let result = cmp.vm.tooltipText('TOOLTIP_OPTIONS')
    expect(cmp.vm.l10n.getText).toHaveBeenCalledWith('TOOLTIP_OPTIONS')
    expect(result).toEqual(cmp.vm.l10n.getText('TOOLTIP_OPTIONS'))
  })

  it('3 ActionMenu - method tooltipText returns message if availabilityCondition = true', () => {
    let cmp = shallowMount(ActionMenu, {
      store,
      localVue,
      mocks: api,
      propsData: {
        visible: false
      }
    }) 

    jest.spyOn(cmp.vm.l10n, 'getText')
    
    let result = cmp.vm.tooltipText('TOOLTIP_WORDLIST', true)
    expect(cmp.vm.l10n.getText).toHaveBeenCalledWith('TOOLTIP_WORDLIST')
    expect(result).toEqual(cmp.vm.l10n.getText('TOOLTIP_WORDLIST'))
  })

  it('4 ActionMenu - method tooltipText returns message with additional text if availabilityCondition = false', () => {
    let cmp = shallowMount(ActionMenu, {
      store,
      localVue,
      mocks: api,
      propsData: {
        visible: false
      }
    }) 

    jest.spyOn(cmp.vm.l10n, 'getText')
    
    let result = cmp.vm.tooltipText('TOOLTIP_WORDLIST', false)
    expect(cmp.vm.l10n.getText).toHaveBeenCalledWith('TOOLTIP_WORDLIST')
    expect(result).toEqual(expect.stringContaining(cmp.vm.l10n.getText('TOOLTIP_WORDLIST')))
    expect(result).toEqual(expect.stringContaining('not available'))
  })

  it('5 ActionMenu - method close emitts close-action-menu', () => {
    let cmp = shallowMount(ActionMenu, {
      store,
      localVue,
      mocks: api,
      propsData: {
        visible: false
      }
    }) 

    cmp.vm.close()
    expect(cmp.emitted()['close-action-menu'].length).toEqual(1)
  })

  it('6 ActionMenu - method showPanelTab executes ui.showPanelTab with tabName and close', () => {
    let cmp = shallowMount(ActionMenu, {
      store,
      localVue,
      mocks: api,
      propsData: {
        visible: false
      }
    }) 

    jest.spyOn(cmp.vm.ui, 'showPanelTab')
    cmp.vm.close = jest.fn()

    cmp.vm.showPanelTab('wordlist')
    expect(cmp.vm.ui.showPanelTab).toHaveBeenCalledWith('wordlist')
    expect(cmp.vm.close).toHaveBeenCalled()
  })

  it('7 ActionMenu - method toggleLangSelector sets the value of showLangSelector', () => {
    let cmp = shallowMount(ActionMenu, {
      store,
      localVue,
      mocks: api,
      propsData: {
        visible: false
      }
    }) 

    cmp.vm.showLangSelector = false

    cmp.vm.toggleLangSelector(true)
    expect(cmp.vm.showLangSelector).toBeTruthy()

    cmp.vm.toggleLangSelector(false)
    expect(cmp.vm.showLangSelector).toBeFalsy()
  })
})