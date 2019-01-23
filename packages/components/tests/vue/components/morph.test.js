/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import Morph from '@/vue/components/morph.vue'
import MorphInner from '@/vue/components/morph-inner-v1.vue'

describe('morph.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
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
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Morph - render with children components (min requirements)', () => {
    let cmp = mount(Morph, {
      propsData: {
        lexemes: []
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.find(MorphInner).exists()).toBeFalsy()
  })

  it('3 Morph - check required props', () => {
    let cmp = mount(Morph)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "lexemes"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "morphDataReady"'))
  })

  it('4 Morph - check non-required props', () => {
    let cmp = mount(Morph, {
      propsData: {
        lexemes: [],
        morphDataReady: false,
        definitions: false,
        translations: false,
        linkedfeatures: false
      }
    })
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Invalid prop: type check failed for prop "definitions"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Invalid prop: type check failed for prop "translations"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Invalid prop: type check failed for prop "linkedfeatures"'))
  })

  it('5 Morph - sendFeature', () => {
    let cmp = mount(Morph, {
      propsData: {
        lexemes: [],
        morphDataReady: false
      }
    })

    cmp.vm.sendFeature(false)
    expect(cmp.emitted()['sendfeature']).toBeTruthy()
  })

  it('6 Morph - showLexeme', () => {
    let cmp = mount(Morph, {
      propsData: {
        lexemes: [],
        morphDataReady: false
      }
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
