/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Grammar from '@/vue/components/grammar.vue'
import BaseTestHelp from '@tests/helpclasses/base-test-help'
import { Constants, LanguageModelFactory as LMF } from 'alpheios-data-models'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

describe('grammar.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let store
  let api

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

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

  it('1 Grammar - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Grammar - languageList is defined on the created state', () => {
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.vm.languageList).toBeDefined()
    expect(Object.keys(cmp.vm.languageList)).toEqual(['lat', 'grc'])

    expect(cmp.vm.languageList.lat).toEqual(expect.objectContaining({
      languageID: Constants.LANG_LATIN,
      languageCode: 'lat',
      title: 'New Latin Grammar (Bennett)'
    }))

    expect(cmp.vm.languageList.grc).toEqual(expect.objectContaining({
      languageID: Constants.LANG_GREEK,
      languageCode: 'grc',
      title: 'A Greek Grammar for Colleges (Smyth)'
    }))
  })

  it('3 Grammar - when Lexical Query is started all languages become collapsed', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.languageList.lat.collapsed = false
    cmp.vm.currentLanguageCode = 'lat'
    cmp.vm.currentUrl = 'fooURL'

    store.commit('app/lexicalRequestStarted')
    await Vue.nextTick()

    expect(cmp.vm.languageList.lat.collapsed).toBeTruthy()
    expect(cmp.vm.currentLanguageCode).toBeNull()
    expect(cmp.vm.currentUrl).toBeNull()
  })

  it('4 Grammar - when store.state.app.updatedGrammar is changed we update languageList', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    jest.spyOn(cmp.vm, 'updateLanguageList')



    store.commit('app/setUpdatedGrammar')

    await Vue.nextTick()
    expect(cmp.vm.updateLanguageList).toHaveBeenCalled()
  })

  it('5 Grammar - when store.state.app.currentLanguageCode is changed we update currentLanguageCode and collapse if it is available', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.collapseLanguage = jest.fn()

    expect(cmp.vm.currentLanguageCode).toBeNull()
    expect(cmp.vm.languageList.lat.collapsed).toBeTruthy()

    store.commit('app/setCurrentLanguage', { languageID: Constants.LANG_LATIN, languageCode: 'lat' })

    await Vue.nextTick()
    expect(cmp.vm.collapseLanguage).toHaveBeenLastCalledWith('lat', false)

    store.commit('app/setCurrentLanguage', { languageID: Constants.LANG_GREEK, languageCode: 'grc' })
    await Vue.nextTick()
    expect(cmp.vm.collapseLanguage).toHaveBeenLastCalledWith('grc', false)

    store.commit('ui/setTestCurrentTab', 'grammar')
    store.commit('app/setCurrentLanguage', { languageID: Constants.LANG_LATIN, languageCode: 'lat' })
    expect(cmp.vm.collapseLanguage).toHaveBeenCalledTimes(2) // was not called this time
  })
  
  it('6 Grammar - method checkIfUpdatedCentralLangCode checks if centralLanguageCode should be updated with store.state.app.currentLanguageCode', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    // check 1
    expect(store.state.app.currentLanguageCode).toBeNull()
    let result = cmp.vm.checkIfUpdatedCentralLangCode()
    expect(result).toBeFalsy()

    // check 2
    cmp.vm.centralLanguageCode = 'lat'
    store.commit('app/setCurrentLanguage', { languageID: Constants.LANG_LATIN, languageCode: 'lat' })
    store.commit('ui/setTestCurrentTab', 'grammar')

    await Vue.nextTick()
    result = cmp.vm.checkIfUpdatedCentralLangCode()
    expect(result).toBeFalsy()

    // check 3
    cmp.vm.centralLanguageCode = null
    result = cmp.vm.checkIfUpdatedCentralLangCode()
    expect(result).toBeTruthy()

    // check 4
    cmp.vm.centralLanguageCode = 'grc'
    expect(store.state.app.currentLanguageCode).not.toEqual(cmp.vm.centralLanguageCode)
    result = cmp.vm.checkIfUpdatedCentralLangCode()
    expect(result).toBeTruthy()

    // check 5
    cmp.vm.centralLanguageCode = 'lat'
    expect(store.state.app.currentLanguageCode).toEqual(cmp.vm.centralLanguageCode)
    store.commit('ui/setTestCurrentTab', 'info')
    result = cmp.vm.checkIfUpdatedCentralLangCode()
    expect(result).toBeTruthy()
  })

  it('7 Grammar - method updateLanguageList updates languageList from app.grammarData', async () => {
    let api = {
      app: BaseTestHelp.appAPI({
        grammarData: {
          lat: {
            url: 'fooLatinURL',
            provider: 'fooLatinProvider'
          },
          grc: {
            url: 'fooGreekURL',
            provider: 'fooGreekProvider'
          }
        }
      })
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.updateLanguageList()

    expect(cmp.vm.languageList.lat).toEqual(expect.objectContaining({
      url: 'fooLatinURL',
      provider: 'fooLatinProvider'
    }))

    expect(cmp.vm.languageList.grc).toEqual(expect.objectContaining({
      url: 'fooGreekURL',
      provider: 'fooGreekProvider'
    }))
  })

  it('8 Grammar - method collapseLanguage collapse all languages if passed languageCode doesn\'t have grammar', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    jest.spyOn(cmp.vm, 'collapseOthers')
    cmp.vm.collapseLanguage('ara')

    expect(cmp.vm.collapseOthers).toHaveBeenLastCalledWith()
  })

  it('9 Grammar - method collapseLanguage sets collapseValue if defined otherwise it toggles collapse property', () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.checkUrl = jest.fn()

    expect(cmp.vm.languageList.lat.collapsed).toBeTruthy()

    cmp.vm.collapseLanguage('lat')
    expect(cmp.vm.languageList.lat.collapsed).toBeFalsy()

    cmp.vm.collapseLanguage('lat', false)
    expect(cmp.vm.languageList.lat.collapsed).toBeFalsy()
  })

  it('10 Grammar - method collapseLanguage checks final collapsed value and clearCurrentData if collapsed = true', () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.clearCurrentData = jest.fn()
    cmp.vm.collapseLanguage('lat', true)

    expect(cmp.vm.clearCurrentData).toHaveBeenCalled()
  })

  it('11 Grammar - method collapseLanguage checks final collapsed value and if collapsed = false, then executes - updateCurrentData, collapseOthers, checkUrl', () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.updateCurrentData = jest.fn()
    cmp.vm.collapseOthers = jest.fn()
    cmp.vm.checkUrl = jest.fn()

    cmp.vm.collapseLanguage('lat', false)

    expect(cmp.vm.updateCurrentData).toHaveBeenLastCalledWith('lat')
    expect(cmp.vm.collapseOthers).toHaveBeenLastCalledWith('lat')
    expect(cmp.vm.checkUrl).toHaveBeenCalled()
  })

  it('12 Grammar - method collapseOthers collapse all languages besides given languageCode', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.languageList.lat.collapsed = false

    cmp.vm.collapseOthers('lat')
    expect(cmp.vm.languageList.lat.collapsed).toBeFalsy()

    cmp.vm.collapseOthers('grc')
    expect(cmp.vm.languageList.lat.collapsed).toBeTruthy()

    cmp.vm.languageList.lat.collapsed = false
    cmp.vm.collapseOthers()
    expect(cmp.vm.languageList.lat.collapsed).toBeTruthy()

  })

  it('13 Grammar - method updateCurrentData updates currentLanguageCode and currentUrl with given languageCode', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.languageList.lat.url = 'fooLatinUrl'

    expect(cmp.vm.currentLanguageCode).toBeNull()
    expect(cmp.vm.currentUrl).toBeNull()

    cmp.vm.updateCurrentData('lat')

    expect(cmp.vm.currentLanguageCode).toEqual('lat')
    expect(cmp.vm.currentUrl).toEqual('fooLatinUrl')
  })

  it('14 Grammar - method clearCurrentData updates currentLanguageCode and currentUrl with null', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.currentLanguageCode = 'lat'
    cmp.vm.languageList.lat.url = 'fooLatinUrl'

    cmp.vm.clearCurrentData()

    expect(cmp.vm.currentLanguageCode).toBeNull()
    expect(cmp.vm.currentUrl).toBeNull()
  })

  it('15 Grammar - method checkUrl - if url for currentLanguageCode is not defined then app.startResourceQuery would be executed and waitingForGrammar becomes true', async () => {
    let api = {
      app: BaseTestHelp.appAPI({
        startResourceQuery: jest.fn()
      })
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.currentLanguageCode = 'lat'
    expect(cmp.vm.languageList.lat.url).toBeNull()

    cmp.vm.checkUrl()

    expect(api.app.startResourceQuery).toHaveBeenLastCalledWith(expect.objectContaining({
      languageID: Constants.LANG_LATIN
    }))
  })

  it('16 Grammar - method returnToIndex executes app.restoreGrammarIndex', async () => {
    let api = {
      app: BaseTestHelp.appAPI({
        restoreGrammarIndex: jest.fn()
      })
    }

    BaseTestHelp.l10nModule(store, api)

    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.currentLanguageCode = 'lat'
    expect(cmp.vm.languageList.lat.url).toBeNull()

    cmp.vm.returnToIndex()

    expect(api.app.restoreGrammarIndex).toHaveBeenCalled()
  })
})
