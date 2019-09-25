/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Info from '@/vue/components/info.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'

describe('info.test.js', () => {
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
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 Info - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Info, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Info - computed defaultLanguage returns language name for the defaut languageCode', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        getDefaultLangCode: () => 'lat'
      })
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(Info, {
      store,
      localVue,
      mocks: api
    })

    api.app.getDefaultLangCode = () => 'grc'
    expect(cmp.vm.defaultLanguage).toEqual('Greek')

    api.app.getDefaultLangCode = () => 'ara'
    expect(cmp.vm.defaultLanguage).toEqual('Arabic')
  })

  it('3 Info - computed faqLink returns link for embed or for extension depending on store.state.app.embedLibActive', () => {
    let cmp = shallowMount(Info, {
      store,
      localVue,
      mocks: api
    })

    store.commit('app/setTestEmbedLibActive', false)

    expect(cmp.vm.faqLink).toEqual(expect.stringContaining('faq-extension'))

    store.commit('app/setTestEmbedLibActive', true)

    expect(cmp.vm.faqLink).toEqual(expect.stringContaining('faq-embedded'))

  })

})