/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import ActionPanel from '@/vue/components/nav/action-panel.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'

describe('action-panel.test.js', () => {
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

  it('1 ActionPanel - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api
    }) 

    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 ActionPanel - computed componentStyles adaptes styles according to config', () => {
    let api = {
      ui: BaseTestHelp.uiAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api,
      computed: {
        config: () => {
          return {
            initialShift: { x:10, y:20 }
          }
        }
      }
    }) 

    store.commit('actionPanel/setInitialPos', { top:30, left:40, right:50, bottom:60})
    
    let styles = cmp.vm.componentStyles

    expect(styles.transform).toEqual('translate(10px, 20px)')
    expect(styles.zIndex).toBeGreaterThan(9)
    expect(styles.top).toEqual('30px')
    expect(styles.left).toEqual('40px')
    expect(styles.right).toEqual('50px')
    expect(styles.bottom).toEqual('60px')
  })

  it('3 ActionPanel - computed showPanel defines if actionPanel is visible (and panel is not visible)', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api
    }) 

    store.commit('actionPanel/setVisible', false)
    store.commit('panel/setVisible', false)
    
    expect(cmp.vm.showPanel).toBeFalsy()

    store.commit('actionPanel/setVisible', true)
    expect(cmp.vm.showPanel).toBeTruthy()

    store.commit('panel/setVisible', true)
    expect(cmp.vm.showPanel).toBeFalsy()
  })

  it('4 ActionPanel - computed config returns moduleConfig if defined or default empty object', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api
    }) 

    expect(cmp.vm.config).toEqual({ initialShift: {} })
  })

  it('5 ActionPanel - method tooltipText returns message if availabilityCondition = "N/A"', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api
    }) 

    jest.spyOn(cmp.vm.l10n, 'getText')
    
    let result = cmp.vm.tooltipText('TOOLTIP_OPTIONS')
    expect(cmp.vm.l10n.getText).toHaveBeenCalledWith('TOOLTIP_OPTIONS')
    expect(result).toEqual(cmp.vm.l10n.getText('TOOLTIP_OPTIONS'))
  })

  it('6 ActionPanel - method tooltipText returns message if availabilityCondition = true', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api
    }) 

    jest.spyOn(cmp.vm.l10n, 'getText')
    
    let result = cmp.vm.tooltipText('TOOLTIP_WORDLIST', true)
    expect(cmp.vm.l10n.getText).toHaveBeenCalledWith('TOOLTIP_WORDLIST')
    expect(result).toEqual(cmp.vm.l10n.getText('TOOLTIP_WORDLIST'))
  })

  it('7 ActionPanel - method tooltipText returns message with additional text if availabilityCondition = false', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api
    }) 

    jest.spyOn(cmp.vm.l10n, 'getText')
    
    let result = cmp.vm.tooltipText('TOOLTIP_WORDLIST', false)
    expect(cmp.vm.l10n.getText).toHaveBeenCalledWith('TOOLTIP_WORDLIST')
    expect(result).toEqual(expect.stringContaining(cmp.vm.l10n.getText('TOOLTIP_WORDLIST')))
    expect(result).toEqual(expect.stringContaining('not available'))
  })

  it('8 ActionPanel - method openTab executes ui.showPanelTab and doesn\'t close ActionPanel if closeAfterNav is set to false in config ', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api,
      computed: {
        config: () => {
          return {
            initialShift: { x:10, y:20 },
            closeAfterNav: false
          }
        }
      }
    }) 

    jest.spyOn(cmp.vm.ui, 'showPanelTab')
    jest.spyOn(store, 'commit')

    cmp.vm.openTab('wordlist')
    expect(cmp.vm.ui.showPanelTab).toHaveBeenCalledWith('wordlist')
    expect(store.commit).not.toHaveBeenLastCalledWith('actionPanel/close')
  })

  it('9 ActionPanel - method openTab executes ui.showPanelTab and close ActionPanel if closeAfterNav is set to true in config ', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api,
      computed: {
        config: () => {
          return {
            initialShift: { x:10, y:20 },
            closeAfterNav: true
          }
        }
      }
    }) 

    jest.spyOn(cmp.vm.ui, 'showPanelTab')
    jest.spyOn(store, 'commit')

    cmp.vm.openTab('wordlist')
    expect(cmp.vm.ui.showPanelTab).toHaveBeenCalledWith('wordlist')
    expect(store.commit).toHaveBeenLastCalledWith('actionPanel/close')
  })

  it('10 ActionPanel - method lookupStarted do nothing if closeAfterLookup is set to false in config ', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api,
      computed: {
        config: () => {
          return {
            initialShift: { x:10, y:20 },
            closeAfterLookup: false
          }
        }
      }
    }) 

    jest.spyOn(cmp.vm.ui, 'showPanelTab')
    jest.spyOn(store, 'commit')

    cmp.vm.lookupStarted()
    expect(store.commit).not.toHaveBeenLastCalledWith('actionPanel/close')
  })

  it('11 ActionPanel - method lookupStarted closes actionPanel if closeAfterLookup is set to true in config ', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api,
      computed: {
        config: () => {
          return {
            initialShift: { x:10, y:20 },
            closeAfterLookup: true
          }
        }
      }
    }) 

    jest.spyOn(cmp.vm.ui, 'showPanelTab')
    jest.spyOn(store, 'commit')

    cmp.vm.lookupStarted()
    expect(store.commit).toHaveBeenLastCalledWith('actionPanel/close')
  })

  it('12 ActionPanel - method toggleLangSelector sets the value of showLangSelector', () => {
    let cmp = shallowMount(ActionPanel, {
      store,
      localVue,
      mocks: api
    }) 

    cmp.vm.showLangSelector = false

    cmp.vm.toggleLangSelector(true)
    expect(cmp.vm.showLangSelector).toBeTruthy()

    cmp.vm.toggleLangSelector(false)
    expect(cmp.vm.showLangSelector).toBeFalsy()
  })
})