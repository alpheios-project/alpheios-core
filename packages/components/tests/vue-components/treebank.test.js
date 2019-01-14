/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Treebank from '@/vue/components/treebank.vue'

describe('treebank.test.js', () => {
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

  it('1 Treebank - renders a vue instance (min requirements)', () => {
    let cmp = mount(Treebank, {
      propsData: {
        res: {},
        messages: {},
        locale: {},
        visible: false
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Treebank - renders with src', () => {
    let cmp = mount(Treebank, {
      propsData: {
        res: {
          word: {
            src: 'http/example.com/DOC/SENTENCE/WORD',
            ref: 'doc#foo1-foo2'
          }
        },
        messages: {},
        locale: {},
        visible: false
      }
    })

    cmp.setProps({
      visible: true
    })
    expect(cmp.vm.srcUrl).toEqual('http/example.com/doc/foo1/foo2')

    expect(cmp.find('iframe').attributes().src).toEqual('http/example.com/doc/foo1/foo2')
    cmp.setProps({
      visible: false,
      res: {
        page: {
          src: 'http/example.com/foo3/foo4'
        }
      }
    })

    cmp.setProps({
      visible: true
    })
    expect(cmp.vm.srcUrl).toEqual('http/example.com/foo3/foo4')

    expect(cmp.find('iframe').attributes().src).toEqual('http/example.com/foo3/foo4')
  })

  it('3 Treebank - check required props', () => {
    let cmp = mount(Treebank)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "res"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "messages"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "locale"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "visible"'))
  })
})
