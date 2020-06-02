/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import WordLanguagePanel from '@/vue/components/word-list/word-language-panel.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'
import Download from '@/lib/utility/download.js'
import DownloadConfirmation from '@/vue/components/word-list/download-confirmation.vue'

import { Constants, WordItem, WordList } from 'alpheios-data-models'

describe('word-language-panel.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  let store
  let api = {}
  let testWordItem1, testWordItem2, testWordItem3, testWordList
  
  beforeAll(async () => {
    let homonym1 = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN, false)
    let homonym2 = await BaseTestHelp.collectHomonym('male', Constants.LANG_LATIN, false)
    let homonym3 = await BaseTestHelp.collectHomonym('placito', Constants.LANG_LATIN, false)

    testWordItem1 = new WordItem({
      targetWord: 'cupidinibus',
      languageCode: 'lat',
      homonym: homonym1,
      important: true
    })

    testWordItem2 = new WordItem({
      targetWord: 'male',
      languageCode: 'lat',
      homonym: homonym2
    })

    testWordItem3 = new WordItem({
      targetWord: 'placito',
      languageCode: 'lat',
      homonym: homonym3,
      important: true
    })

    testWordList = new WordList('lat', [ testWordItem1 ])
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

  it('1 WordLanguagePanel - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordLanguagePanel - computed hasSeveralItems returns true if wordItems in wordList are more than 1', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)
    
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    expect(cmp.vm.hasSeveralItems).toBeFalsy()

    let testWordList2 = new WordList('lat', [ testWordItem1, testWordItem2 ])
    api.app.getWordList = () => testWordList2

    expect(cmp.vm.hasSeveralItems).toBeTruthy()
  })

  it('3 WordLanguagePanel - computed wordlist returns empty wordlist or ready wordList', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    cmp.vm.reloadList = 0
    expect(Object.keys(cmp.vm.wordlist.items).length).toEqual(0)

    cmp.vm.reloadList = 1
    expect(Object.keys(cmp.vm.wordlist.items).length).toEqual(1)
  })

  it('4 WordLanguagePanel - computed wordItems returns an empty array if it is not ready', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    cmp.vm.reloadList = 0
    expect(cmp.vm.wordItems).toEqual([])
  })

  it('5 WordLanguagePanel - computed wordItems returns filtered wordList items if the filter is selected and applySorting', () => {
    let testWordList2 = new WordList('lat', [ testWordItem1, testWordItem2, testWordItem3 ])

    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList2
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    cmp.vm.applySorting = jest.fn()
    expect(cmp.vm.wordItems.length).toEqual(3)

    cmp.vm.selectedFilterBy = 'byImportant'

    expect(cmp.vm.wordItems.length).toEqual(2)
    expect(cmp.vm.applySorting).toHaveBeenCalled()
  })

  it('6 WordLanguagePanel - computed wordExactForms returns an array with targetWords', () => {
    let testWordList2 = new WordList('lat', [ testWordItem1, testWordItem2 ])

    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList2
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    expect(cmp.vm.wordExactForms).toEqual(['cupidinibus', 'male'])
  })

  it('7 WordLanguagePanel - computed wordLemmaForms returns an array with lemmas', () => {
    let testWordList2 = new WordList('lat', [ testWordItem1, testWordItem2 ])

    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList2
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    expect(cmp.vm.wordLemmaForms).toEqual(['Cupido', 'cupido', 'male', 'malus'])
  })

  it('8 WordLanguagePanel - computed languageName returns a language code of the wordlist', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    expect(cmp.vm.languageName).toEqual('lat')
  })

  it('9 WordLanguagePanel - method showDeleteAll updates showDeleteAllBox to true and shows alpheios-wordlist-delete-all-confirmation block', async () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    const deleteAllBlock = cmp.find('.alpheios-wordlist-delete-all-confirmation')
    expect(cmp.vm.showDeleteAllBox).toBeFalsy()
    expect(deleteAllBlock.isVisible()).toBeFalsy()

    cmp.vm.showDeleteAll()
    await Vue.nextTick()
    expect(cmp.vm.showDeleteAllBox).toBeTruthy()
    expect(deleteAllBlock.isVisible()).toBeTruthy()
  })

  it('10 WordLanguagePanel - method showDownloadList updates showDownloadBox to true and shows alpheios-wordlist-download-confirmation block', async () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    const downloadBlock = cmp.find(DownloadConfirmation)
    expect(cmp.vm.showDownloadBox).toBeFalsy()
    expect(downloadBlock.isVisible()).toBeFalsy()

    cmp.vm.showDownloadList()

    await Vue.nextTick()
    expect(cmp.vm.showDownloadBox).toBeTruthy()
    expect(downloadBlock.isVisible()).toBeTruthy()
  })

  it('11 WordLanguagePanel - method makeAllImportant executes app.updateAllImportant with true and emitts eventChangeImportant', async () => {
    let testWordList2 = new WordList('lat', [ testWordItem1, testWordItem2 ])

    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList2,
        updateAllImportant: jest.fn(() => Promise.resolve(true))
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    await cmp.vm.makeAllImportant()

    expect(api.app.updateAllImportant).toHaveBeenCalledWith('lat', true)
    expect(cmp.emitted()['eventChangeImportant'].length).toEqual(1)
  })

  it('12 WordLanguagePanel - method removeAllImportant executes app.updateAllImportant with false and emitts eventChangeImportant', async () => {
    let testWordList2 = new WordList('lat', [ testWordItem1, testWordItem2 ])

    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList2,
        updateAllImportant: jest.fn(() => Promise.resolve(true))
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    await cmp.vm.removeAllImportant()

    expect(api.app.updateAllImportant).toHaveBeenCalledWith('lat', false)
    expect(cmp.emitted()['eventChangeImportant'].length).toEqual(1)
  })

  it('13 WordLanguagePanel - method changeImportant executes app.changeImportant with languageCode, targetWord, important', async () => {
    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList,
        updateWordItemImportant: jest.fn(() => Promise.resolve(true))
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    await cmp.vm.changeImportant('cupidinibus', true)

    expect(api.app.updateWordItemImportant).toHaveBeenCalledWith('lat', 'cupidinibus', true)
  })

  it('14 WordLanguagePanel - method deleteItem executes app.removeWordListItem with languageCode, targetWord and reloads list', async () => {
    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList,
        removeWordListItem: jest.fn(() => Promise.resolve(true))
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    await cmp.vm.deleteItem('cupidinibus')

    expect(api.app.removeWordListItem).toHaveBeenCalledWith('lat', 'cupidinibus')
    expect(cmp.vm.reloadList).toEqual(2)
  })  

  it('15 WordLanguagePanel - method deleteAll executes app.removeWordList with languageCode, reloads list and hide showDeletAllBlock', async () => {
    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList,
        removeWordList: jest.fn(() => Promise.resolve(true))
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    cmp.vm.showDeleteAll()
    await cmp.vm.deleteAll()

    expect(api.app.removeWordList).toHaveBeenCalledWith('lat')
    expect(cmp.vm.reloadList).toEqual(2)
    expect(cmp.vm.showDeletAllBlock).toBeFalsy()
  })  

  it('16 WordLanguagePanel - method cancelDeleteAll updates showDeleteAllBox to false and hides alpheios-wordlist-delete-all-confirmation block', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    const deleteAllBlock = cmp.find('.alpheios-wordlist-delete-all-confirmation')
    cmp.vm.showDeleteAll()
    cmp.vm.cancelDeleteAll()

    expect(cmp.vm.showDeleteAllBox).toBeFalsy()
    expect(deleteAllBlock.isVisible()).toBeFalsy()
  })

  it('17 WordLanguagePanel - method cancelDownloadList updates showDownloadBox to false and hides alpheios-wordlist-download-confirmation block', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    const downloadBlock = cmp.find(DownloadConfirmation)

    cmp.vm.showDownloadList()
    cmp.vm.changeShowDownloadBox()
    expect(cmp.vm.showDownloadBox).toBeFalsy()
    expect(downloadBlock.isVisible()).toBeFalsy()
  })

  it('18 WordLanguagePanel - method showContexts emitts showContexts', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    cmp.vm.showContexts('cupidinibus')
    expect(cmp.emitted()['showContexts'][0]).toEqual(['cupidinibus', 'lat'])
  })

  it('19 WordLanguagePanel - method changedFilterBy updates selectedFilterBy and textInput', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    cmp.vm.changedFilterBy('byExactForm', 'Cupido')
    expect(cmp.vm.selectedFilterBy).toEqual('byExactForm')
    expect(cmp.vm.textInput).toEqual('Cupido')
  })

  it('20 WordLanguagePanel - method setLemmaFilterByClick updates clickedLemma if it is empty and a lemma is passed', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    cmp.vm.setLemmaFilterByClick(false)
    expect(cmp.vm.clickedLemma).toBeNull()

    cmp.vm.setLemmaFilterByClick('fooLemma')

    expect(cmp.vm.clickedLemma).toEqual('fooLemma')
    
    cmp.vm.setLemmaFilterByClick('fooLemma1')
    expect(cmp.vm.clickedLemma).toEqual('fooLemma')
  })

  it('21 WordLanguagePanel - method clearClickedLemma updates clickedLemma with null', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 
    cmp.vm.setLemmaFilterByClick('fooLemma')
    cmp.vm.clearClickedLemma()
    expect(cmp.vm.clickedLemma).toBeNull()
  })

  it('22 WordLanguagePanel - method changeSorting updates sortingState and reloads list', () => {
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    expect(cmp.vm.sortingState['targetWord']).toBeNull()

    cmp.vm.changeSorting('targetWord', 'asc')
    expect(cmp.vm.sortingState['targetWord']).toEqual('asc')
    expect(cmp.vm.reloadList).toEqual(2)
  })

  it('23 WordLanguagePanel - method applySorting sorts passed items with current sortingState (null)', () => {
    let testWordList2 = new WordList('lat', [ testWordItem3, testWordItem1, testWordItem2 ]) // placito, cupidinibus, male

    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList2
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    expect(cmp.vm.sortingState['targetWord']).toBeNull()
    let result = cmp.vm.applySorting(testWordList2.values)

    // order is not changed
    expect(result[0].targetWord).toEqual('placito')
    expect(result[1].targetWord).toEqual('cupidinibus')
    expect(result[2].targetWord).toEqual('male')
  })

  it('24 WordLanguagePanel - method applySorting sorts passed items with current sortingState (asc)', () => {
    let testWordList2 = new WordList('lat', [ testWordItem3, testWordItem1, testWordItem2 ]) // placito, cupidinibus, male

    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList2
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    cmp.vm.sortingState['targetWord'] = 'asc'

    let result = cmp.vm.applySorting(testWordList2.values)

    // order is asc
    expect(result[0].targetWord).toEqual('cupidinibus')
    expect(result[1].targetWord).toEqual('male')
    expect(result[2].targetWord).toEqual('placito')
  })

  it('25 WordLanguagePanel - method applySorting sorts passed items with current sortingState (desc)', () => {
    let testWordList2 = new WordList('lat', [ testWordItem3, testWordItem1, testWordItem2 ]) // placito, cupidinibus, male

    let api = {
      app: BaseTestHelp.appAPI({
        getWordList: () => testWordList2
      }),
      settings: BaseTestHelp.settingsAPI()
    }
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 

    cmp.vm.sortingState['targetWord'] = 'desc'

    let result = cmp.vm.applySorting(testWordList2.values)

    // order is asc  
    expect(result[0].targetWord).toEqual('placito')
    expect(result[1].targetWord).toEqual('male')
    expect(result[2].targetWord).toEqual('cupidinibus')
  })

  it('26 WordLanguagePanel - method downloadList executes Download.collectionToCSV, Download.downloadBlob and hides downloadAll confirmation box', async () => {
    let cmp = mount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    }) 
    
    Download.collectionToCSV = jest.fn(() => {
      return () => true
    })
    Download.downloadBlob = jest.fn()

    const downloadConfComponent = cmp.find(DownloadConfirmation)

    cmp.vm.showDownloadList()

    await downloadConfComponent.vm.downloadList()

    expect(Download.collectionToCSV).toHaveBeenCalledWith(';', [])
    expect(Download.downloadBlob).toHaveBeenCalled()
    expect(cmp.vm.showDownloadBox).toBeFalsy()
  })

})
