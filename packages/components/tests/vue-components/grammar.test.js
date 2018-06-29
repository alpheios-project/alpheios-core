/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Grammar from '@/vue-components/grammar.vue'

describe('grammar.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Grammar - renders a vue instance (min requirements)', () => {
    let cmp = mount(Grammar, {
      propsData: {
        res: {}
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })
  it('2 Grammar - renders a vue instance (min requirements)', () => {
    let cmp = mount(Grammar, {
      propsData: {
        res: {
          url: 'http://example.com/'
        }
      }
    })
    expect(cmp.find('iframe').attributes().src).toEqual('http://example.com/')

    expect(cmp.find('.alpheios-grammar__provider').exists()).toBeFalsy()

    cmp.setProps({ res: { url: 'http://example.com/', provider: 'fooprovider' } })

    expect(cmp.find('.alpheios-grammar__provider').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-grammar__provider').text()).toEqual('fooprovider')
  })

  it('3 Grammar - check required props', () => {
    let cmp = mount(Grammar)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "res"'))
  })
})
