/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import NotificationArea from '@/vue/components/notification-area.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'

describe('notification-area.test.js', () => {
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
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.authModule(store, api)
    BaseTestHelp.l10nModule(store, api)
    BaseTestHelp.lexisModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 NotificationArea - renders a vue instance (min requirements)', () => {
    let cmp = mount(NotificationArea, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 NotificationArea - if there are no hints and notification in store - it is empty', () => {
    let cmp = shallowMount(NotificationArea, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.findAll('.alpheios-notification-area__hint').isVisible()).toBeFalsy()
    expect(cmp.findAll('.alpheios-notification-area__notification').isVisible()).toBeFalsy()    
  })

  it('3 NotificationArea - computed notificationClasses returns special classes for important and hidden notifications', () => {
    let cmp = shallowMount(NotificationArea, {
      store,
      localVue,
      mocks: api
    })

    store.commit('ui/setTestNotification', { visible: false, important: false })
    expect(cmp.vm.notificationClasses).toEqual(['alpheios-notification-area__notification--hidden'])

    store.commit('ui/setTestNotification', { visible: false, important: true })
    expect(cmp.vm.notificationClasses).toEqual(['alpheios-notification-area__notification--important', 'alpheios-notification-area__notification--hidden'])

    store.commit('ui/setTestNotification', { visible: true, important: true })
    expect(cmp.vm.notificationClasses).toEqual(['alpheios-notification-area__notification--important'])    
  })

  it('4 NotificationArea - computed showHint gives true if there is a hint and it is the first time to show on this tab', () => {
    let cmp = shallowMount(NotificationArea, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showHint).toBeFalsy()

    store.commit('ui/setTestCurrentTab', 'inflections')
    store.commit('ui/setTestHint', { visible: true })

    expect(cmp.vm.showHint).toBeTruthy()

    store.commit('ui/setTestCurrentTab', 'wordusage')
    store.commit('ui/setTestHint', { visible: true })

    expect(cmp.vm.showHint).toBeTruthy()

    store.commit('ui/setTestCurrentTab', 'inflections')
    expect(cmp.vm.showHint).toBeFalsy()

    store.commit('ui/setTestCurrentTab', 'wordlist')
    store.commit('ui/setTestHint', { visible: false })

    expect(cmp.vm.showHint).toBeFalsy()
  })


  it('5 NotificationArea - computed showNotification gives true if notification is visible and important', () => {
    let cmp = shallowMount(NotificationArea, {
      store,
      localVue,
      mocks: api
    })

    store.commit('ui/setTestNotification', { visible: false, important: false })
    expect(cmp.vm.showNotification).toBeFalsy()

    store.commit('ui/setTestNotification', { visible: false, important: true })
    expect(cmp.vm.showNotification).toBeFalsy()

    store.commit('ui/setTestNotification', { visible: true, important: false })
    expect(cmp.vm.showNotification).toBeFalsy()

    store.commit('ui/setTestNotification', { visible: true, important: true })
    expect(cmp.vm.showNotification).toBeTruthy()  
  })

  it('6 NotificationArea - computed showLoginNotification gives true if there is a notification from auth', () => {
    let cmp = shallowMount(NotificationArea, {
      store,
      localVue,
      mocks: api
    })


    expect(cmp.vm.showLoginNotification).toBeFalsy()

    store.commit('auth/setTestNotification', { visible: true })
    expect(cmp.vm.showLoginNotification).toBeTruthy()
  })

  it('7 NotificationArea - method featureOptionChanged executes app.featureOptionChange', () => {
    let cmp = shallowMount(NotificationArea, {
      store,
      localVue,
      mocks: api
    })

    api.app.featureOptionChange = jest.fn()
    
    cmp.vm.featureOptionChanged('d__v__fooname__g', 'foovalue')
    expect(api.app.featureOptionChange).toHaveBeenCalledWith('fooname', 'foovalue')
  })

  it('8 NotificationArea - method hideLoginPrompt executes ui.optionChange', () => {
    let cmp = shallowMount(NotificationArea, {
      store,
      localVue,
      mocks: api
    })

    api.ui.optionChange = jest.fn()
    
    cmp.vm.hideLoginPrompt()
    expect(api.ui.optionChange).toHaveBeenCalledWith('hideLoginPrompt',true)
  })

})