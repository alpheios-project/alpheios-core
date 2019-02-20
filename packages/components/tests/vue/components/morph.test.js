/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Vuex from 'vuex'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Morph from '@/vue/components/morph.vue'
import MorphInner from '@/vue/components/morph-inner.vue'

describe('morph.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let api = {}
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: {
            morphDataReady: true,
            translationsDataReady: false
          },
          getters: {
            hasMorphData () {
              return true
            }
          }
        }
      }
    })

    api = {
      app: {}
    }
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Morph - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Morph, {
      propsData: {
        lexemes: []
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Morph - render with children components (min requirements)', () => {
    let cmp = mount(Morph, {
      propsData: {
        lexemes: []
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.find(MorphInner).exists()).toBeFalsy()
  })

  it('3 Morph - showLexeme', () => {
    let cmp = mount(Morph, {
      propsData: {
        lexemes: [],
        morphDataReady: false
      },
      store,
      localVue,
      mocks: api
    })

    let testLexeme = {}

    let res = cmp.vm.showLexeme(testLexeme)
    expect(res).toBeFalsy()

    testLexeme = { isPopulated: jest.fn(() => 'test') }
    res = cmp.vm.showLexeme(testLexeme)

    expect(testLexeme.isPopulated).toBeCalled()
    expect(res).toEqual('test')
  })
})
