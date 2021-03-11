/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import WordFilterPanel from '@/vue/components/word-list/word-filter-panel.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants, WordItem, WordList } from 'alpheios-data-models'

describe('word-filter-panel.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  let store
  let api = {}
  let testWordItem1, testWordItem2, testWordList
  
  beforeAll(async () => {
    let homonym1 = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    let homonym2 = await BaseTestHelp.collectHomonym('male', Constants.LANG_LATIN, false)

    testWordItem1 = new WordItem({
      targetWord: 'cupidinibus',
      languageCode: 'lat',
      homonym: homonym1
    })

    testWordItem2 = new WordItem({
      targetWord: 'male',
      languageCode: 'lat',
      homonym: homonym2
    })


    testWordList = new WordList('lat', [ testWordItem1, testWordItem2 ])
  })
  
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  
    store = BaseTestHelp.baseVuexStore()
  
    api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)
    store.commit('app/setTestWordListUpdateTime', 1)
  })
  
  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 WordFilterPanel - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordFilterPanel - computed currentTypeFilter returns null if filter is not selected', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    expect(cmp.vm.currentTypeFilter).toBeNull()
  })

  it('3 WordFilterPanel - computed currentTypeFilter returns typeFilter by its value from selectedFilterBy', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byImportant'

    expect(cmp.vm.currentTypeFilter.value).toEqual('byImportant')
  })

  it('4 WordFilterPanel - computed currentClickedLemma executes setClickedLemmaFilter if clickedLemma is not null', async () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.setClickedLemmaFilter = jest.fn()
    let res = cmp.vm.currentClickedLemma

    expect(cmp.vm.setClickedLemmaFilter).not.toHaveBeenCalled()

    cmp.setProps({
      clickedLemma: 'male'
    })

    await Vue.nextTick()

    res = cmp.vm.currentClickedLemma
    expect(cmp.vm.setClickedLemmaFilter).toHaveBeenCalled()
  })

  it('5 WordFilterPanel - computed wordExactFormsFiltered returns null if currentTypeFilter is not byExactForm', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    expect(cmp.vm.wordExactFormsFiltered).toEqual([])
  })

  it('6 WordFilterPanel - computed wordExactFormsFiltered returns the full wordExactForms list if textInput is not defined (currentTypeFilter = byExactForm)', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byExactForm'
    expect(cmp.vm.wordExactFormsFiltered).toEqual(['cupidinibus', 'male'])
  })

  it('7 WordFilterPanel - computed wordExactFormsFiltered returns the selected wordExactForm inside markLayout list if textInput is defined (currentTypeFilter = byExactForm)', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byExactForm'
    cmp.vm.textInput = 'male'

    let result = cmp.vm.wordExactFormsFiltered
    expect(result[0]).toEqual(expect.stringContaining('male'))
    expect(result[0]).toEqual(expect.stringContaining(cmp.vm.markLayout.start))
    expect(result[0]).toEqual(expect.stringContaining(cmp.vm.markLayout.end))
  })

  it('8 WordFilterPanel - computed wordLemmaFormsFiltered returns null if currentTypeFilter is not byLemma', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    expect(cmp.vm.wordLemmaFormsFiltered).toEqual([])
  })

  it('9 WordFilterPanel - computed wordLemmaFormsFiltered returns the full wordLemmaForms list if textInput is not defined (currentTypeFilter = byLemma)', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byLemma'
    expect(cmp.vm.wordLemmaFormsFiltered).toEqual(['Cupido', 'cupido', 'male', 'malus'])
  })

  it('10 WordFilterPanel - computed wordLemmaFormsFiltered returns the selected wordLemmaForms inside markLayout list if textInput is defined (currentTypeFilter = byLemma)', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byLemma'
    cmp.vm.textInput = 'cupido'

    let result = cmp.vm.wordLemmaFormsFiltered
    expect(result[0]).toEqual(expect.stringContaining('cupido'))
    expect(result[0]).toEqual(expect.stringContaining(cmp.vm.markLayout.start))
    expect(result[0]).toEqual(expect.stringContaining(cmp.vm.markLayout.end))
  })

  it('11 WordFilterPanel - method changedFilterBy emitts changedFilterBy if currentTypeFilter is defined and has onChange event', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byImportant'

    cmp.vm.changedFilterBy()

    expect(cmp.emitted()['changedFilterBy'][0]).toEqual([null, null]) // first clear filters
    expect(cmp.emitted()['changedFilterBy'][1]).toEqual(['byImportant', null]) // then apply new one
  })

  it('12 WordFilterPanel - method changedFilterBy executes clearFilteringAdditionalField if currentTypeFilter is not defined and does not have onChange event', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.clearFilteringAdditionalField = jest.fn()
    cmp.vm.selectedFilterBy = 'byLemma'

    cmp.vm.changedFilterBy()
    expect(cmp.vm.clearFilteringAdditionalField).toHaveBeenCalled()
  })

  it('13 WordFilterPanel - method selectExactForm uploads clear exactForm to textInput and executes clickFilterBy', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.clickFilterBy = jest.fn()
    cmp.vm.selectedFilterBy = 'byExactForm'
    cmp.vm.textInput = 'male'
    let result = cmp.vm.wordExactFormsFiltered[0]

    cmp.vm.textInput = null

    cmp.vm.selectExactForm(result)
    expect(cmp.vm.textInput).toEqual('male')
    expect(cmp.vm.clickFilterBy).toHaveBeenCalled()
  })

  it('14 WordFilterPanel - method selectLemmaForm uploads clear lemma to textInput and executes clickFilterBy', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.clickFilterBy = jest.fn()
    cmp.vm.selectedFilterBy = 'byLemma'
    cmp.vm.textInput = 'malus'
    let result = cmp.vm.wordLemmaFormsFiltered[0]

    cmp.vm.textInput = null

    cmp.vm.selectLemmaForm(result)
    expect(cmp.vm.textInput).toEqual('malus')
    expect(cmp.vm.clickFilterBy).toHaveBeenCalled()
  })


  it('15 WordFilterPanel - method clickFilterBy does nothing if selected filter doesn\'t work by click', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byImportant'
    cmp.vm.clickFilterBy()

    expect(cmp.emitted()['changedFilterBy']).toBeUndefined()
  })

  it('16 WordFilterPanel - method clickFilterBy does nothing if selectedFilterBy = byExactForm but textInput is empty or is not included in wordExactForms', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byExactForm'
    cmp.vm.clickFilterBy()

    expect(cmp.emitted()['changedFilterBy']).toBeUndefined()

    cmp.vm.textInput = 'placito'
    cmp.vm.clickFilterBy()

    expect(cmp.emitted()['changedFilterBy']).toBeUndefined()
  })

  it('17 WordFilterPanel - method clickFilterBy does nothing if selectedFilterBy = byLemma but textInput is empty or is not included in wordLemmaForms', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byLemma'
    cmp.vm.clickFilterBy()

    expect(cmp.emitted()['changedFilterBy']).toBeUndefined()

    cmp.vm.textInput = 'placito'
    cmp.vm.clickFilterBy()

    expect(cmp.emitted()['changedFilterBy']).toBeUndefined()
  })

  it('18 WordFilterPanel - method clickFilterBy emitts changedFilterBy and sets shownVariantsSelect to false if selectedFilterBy = byExactForm and textInput is defined', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byExactForm'
    cmp.vm.textInput = 'cupidinibus'
    cmp.vm.shownVariantsSelect = true

    cmp.vm.clickFilterBy()

    expect(cmp.emitted()['changedFilterBy'][0]).toEqual(['byExactForm', 'cupidinibus'])
    expect(cmp.vm.shownVariantsSelect).toBeFalsy()
  })

  it('19 WordFilterPanel - method clickFilterBy emitts changedFilterBy and sets shownVariantsSelect to false if selectedFilterBy = byLemma and textInput is defined', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.selectedFilterBy = 'byLemma'
    cmp.vm.textInput = 'cupido'
    cmp.vm.shownVariantsSelect = true

    cmp.vm.clickFilterBy()

    expect(cmp.emitted()['changedFilterBy'][0]).toEqual(['byLemma', 'cupido'])
    expect(cmp.vm.shownVariantsSelect).toBeFalsy()
  })

  it('20 WordFilterPanel - method clearFiltering clears selectedFilterBy and textInput and executes clearFilterEvent', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.clearFilterEvent = jest.fn()

    cmp.vm.selectedFilterBy = 'byLemma'
    cmp.vm.textInput = 'malus'

    cmp.vm.clearFiltering()

    expect(cmp.vm.selectedFilterBy).toBeNull()
    expect(cmp.vm.textInput).toBeNull()
    expect(cmp.vm.clearFilterEvent).toHaveBeenCalled()
  })

  it('21 WordFilterPanel - method clearFilteringText clears only textInput, executes clearFilterEvent and emitts clearClickedLemma', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.clearFilterEvent = jest.fn()

    cmp.vm.selectedFilterBy = 'byLemma'
    cmp.vm.textInput = 'malus'

    cmp.vm.clearFilteringAdditionalField()

    expect(cmp.vm.selectedFilterBy).toEqual('byLemma')
    expect(cmp.vm.textInput).toBeNull()
    expect(cmp.vm.clearFilterEvent).toHaveBeenCalled()
    expect(cmp.emitted()['clearClickedLemma'].length).toEqual(1)
  })

  it('22 WordFilterPanel - method clearFilterEvent emitts changedFilterBy with null', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.clearFilterEvent()
    expect(cmp.emitted()['changedFilterBy'][0]).toEqual([null, null])
  })

  it('23 WordFilterPanel - method setClickedLemmaFilter defines selectedFilterBy, textInput and executes clickFilterBy', async () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.setProps({
      clickedLemma: 'cupido'
    })

    await Vue.nextTick()
    
    cmp.vm.clickFilterBy = jest.fn()
    cmp.vm.setClickedLemmaFilter()

    await Vue.nextTick()

    expect(cmp.vm.selectedFilterBy).toEqual('byLemma')
    expect(cmp.vm.textInput).toEqual('cupido')
    expect(cmp.vm.clickFilterBy).toHaveBeenCalled()
  })

  it('24 WordFilterPanel - method filterVariants sets shownVariantsSelect = true textInput is defined, otherwise - false', () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.filterVariants()
    expect(cmp.vm.shownVariantsSelect).toBeFalsy()

    cmp.vm.textInput = 'male'

    cmp.vm.filterVariants()
    expect(cmp.vm.shownVariantsSelect).toBeTruthy()
  })

  it('25 WordFilterPanel - method hideAutocomplete sets shownVariantsSelect = false within a timeout (300)', async () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    }) 

    cmp.vm.shownVariantsSelect = true

    cmp.vm.hideAutocomplete()

    expect(cmp.vm.shownVariantsSelect).toBeTruthy()

    await timeout(300)
    expect(cmp.vm.shownVariantsSelect).toBeFalsy()
  })

  it('26 WordFilterPanel - method calcTitle defines filter title by value type if it is not null', async () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    })

    let result = cmp.vm.calcTitle(cmp.vm.typeFiltersList[1]) // type filter with value
    expect(result).toEqual(cmp.vm.typeFiltersList[1].title)

    result = cmp.vm.calcTitle(cmp.vm.typeFiltersList[0])// type filter with null value
  })

  it('27 WordFilterPanel - method calcTitle defines filter title as a placeholder if typeFilter value is null and selectedFilterBy is empty', async () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    })

    let result = cmp.vm.calcTitle(cmp.vm.typeFiltersList[0])// type filter with null value
    expect(result).toEqual(expect.stringContaining('Select'))
  })

  it('28 WordFilterPanel - method calcTitle defines filter title as a clear filters if typeFilter value is null and selectedFilterBy is not empty', async () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    })

    cmp.vm.selectedFilterBy = 'byImportant'

    let result = cmp.vm.calcTitle(cmp.vm.typeFiltersList[0], 'selectedFilterBy')// type filter with null value
    expect(result).toEqual(expect.stringContaining('Clear'))
  })

  it('29 WordFilterPanel - if property clearFilters is changed then selectedFilterBy and textInput are set to null', async () => {
    let cmp = shallowMount(WordFilterPanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        clickedLemma: null,
        clearFilters: 0,
        wordExactForms: ['cupidinibus', 'male'],
        wordLemmaForms: ['Cupido', 'cupido', 'male', 'malus']
      }
    })

    cmp.vm.selectedFilterBy = 'byLemma'
    cmp.vm.textInput = 'male'

    cmp.setProps({
      clearFilters: 2
    })
    await Vue.nextTick()
    expect(cmp.vm.selectedFilterBy).toBeNull()
    expect(cmp.vm.textInput).toBeNull()
  })

})
