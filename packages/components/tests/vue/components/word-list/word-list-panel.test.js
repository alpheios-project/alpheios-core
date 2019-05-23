/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import WordListPanel from '@/vue/components/word-list/word-list-panel.vue'
import WordLanguagePanel from '@/vue/components/word-list/word-language-panel.vue'
import WordContextPanel from '@/vue/components/word-list/word-context-panel.vue'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

describe('word-list-panel.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let api
  let l10nModule
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  beforeEach(() => {
    jest.spyOn(console, 'error')
    api = {}
    api.app = {
      getAllWordLists: () => []
    }
  })
  afterEach(() => {
    jest.resetModules()
    store = null
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 WordListPanel - renders a vue instance (min requirements)', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          state: {
          }
        }
      }
    })

    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WordListPanel - computed wordLists returns empty array if wordListUpdateTime is not updated', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          state: {
            wordListUpdateTime: null
          }
        }
      }
    })

    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.wordLists).toEqual([])
  })

  it('3 WordListPanel - computed wordLists returns result of app.getAllWordLists if wordListUpdateTime is updated', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          state: {
            wordListUpdateTime: 10
          }
        }
      }
    })

    api.app = {
      getAllWordLists: () => ['fooword']
    }

    let cmp = shallowMount(WordListPanel, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.wordLists).toEqual(['fooword'])
  })

  it.skip('4 WordListPanel - computed languagesList makes showContextWordItem = null and returns empty array if wordListUpdateTime is not updated', async () => {
    store = new Vuex.Store({
        modules: {
          app: {
            state: {
              wordListUpdateTime: 10,
              mutations: {
                setWordLists: (state) => {
                  state.wordListUpdateTime = null
                }
              }
            }
          }
        }
      })

      let cmp = mount(WordListPanel, {
        store,
        localVue,
        mocks: api
      })
      cmp.setData({ showContextWordItem: 'bar' })

      expect(cmp.vm.showContextWordItem).not.toBeNull()
      store.commit('app/setWordLists', [])

      await timeout(5000)

      expect(cmp.vm.languagesList).toEqual([])
      expect(cmp.vm.showContextWordItem).toBeNull()
  }, 15000)

  it('5 WordListPanel - computed languagesList returns keys (languageCodes) from the wordLists if wordListUpdateTime is updated', () => {
    store = new Vuex.Store({
        modules: {
          app: {
            state: {
              wordListUpdateTime: 10
            }
          }
        }
      })
      
      api.app = {
        getAllWordLists: () => {
          return {
            'lat': ['fooWord'],
            'grc': ['fooWord']
          }
        }
      }

      let cmp = shallowMount(WordListPanel, {
        store,
        localVue,
        mocks: api
      })
  
      expect(cmp.vm.languagesList).toEqual(['lat', 'grc'])
  })

  it('6 WordListPanel - computed showContext returns false if showContextWordItem is null', () => {
    store = new Vuex.Store({
        modules: {
          app: {
            state: {
              wordListUpdateTime: 10
            }
          }
        }
      })

      let cmp = shallowMount(WordListPanel, {
        store,
        localVue,
        mocks: api
      })

      expect(cmp.vm.showContext).toBeFalsy()
  })

  it('7 WordListPanel - showContexts saves wordItem to showContextWordItem, makes alpheios-wordlist not visible, alpheios-wordlist-contexts is visible', () => {
    store = new Vuex.Store({
        modules: {
          app: {
            state: {
              wordListUpdateTime: 10
            }
          }
        }
      })
      
      api.app = {
        getAllWordLists: () => {
          return {
            'lat': { getWordItem: () => 'fooLatWord' },
            'grc': { getWordItem: () => 'fooGrcWord' }
          }
        }
      }

      let cmp = shallowMount(WordListPanel, {
        store,
        localVue,
        mocks: api
      })
      
      cmp.vm.showContexts('fooLatWord', 'lat')
      expect(cmp.vm.showContext).toBeTruthy()

      expect(cmp.find('.alpheios-wordlist').exists()).toBeFalsy()
      expect(cmp.find('.alpheios-wordlist-contexts').exists()).toBeTruthy()

      expect(cmp.find(WordLanguagePanel).exists()).toBeFalsy()
      expect(cmp.find(WordContextPanel).exists()).toBeTruthy()
  })

  it('8 WordListPanel - backToWordList makes showContextWordItem = null, makes alpheios-wordlist is visible, alpheios-wordlist-contexts is not visible', () => {
    store = new Vuex.Store({
        modules: {
          app: {
            state: {
              wordListUpdateTime: 10
            }
          }
        }
      })
      
      api.app = {
        getAllWordLists: () => {
          return {
            'lat': { getWordItem: () => 'fooLatWord' },
            'grc': { getWordItem: () => 'fooGrcWord' }
          }
        }
      }

      let cmp = shallowMount(WordListPanel, {
        store,
        localVue,
        mocks: api
      })
      
      cmp.vm.showContexts('fooLatWord', 'lat')
      cmp.vm.backToWordList()
      expect(cmp.vm.showContext).toBeFalsy()

      expect(cmp.find('.alpheios-wordlist').exists()).toBeTruthy()
      expect(cmp.find('.alpheios-wordlist-contexts').exists()).toBeFalsy()

      expect(cmp.find(WordLanguagePanel).exists()).toBeTruthy()
      expect(cmp.find(WordContextPanel).exists()).toBeFalsy()
  })

})