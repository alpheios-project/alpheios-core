/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import InflectionAttribute from '@/vue-components/infl-attribute.vue'
import Vue from 'vue/dist/vue'

describe('tooltip.test.js', () => {
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

  it('1 InflectionAttribute - renders a vue instance (min requirements)', () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {},
        type: ''
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 InflectionAttribute - renders a vue instance (min requirements)', () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {
          fooType: 'fooValue'
        },
        type: 'fooType',
        grouplevel: 2
      }
    })
    expect(cmp.find('span').text()).toEqual('fooValue')
    expect(cmp.find('span').attributes()['data-feature']).toEqual('fooType')
    expect(cmp.find('span').attributes()['data-grouplevel']).toEqual('2')
  })

  it('3 InflectionAttribute - renders a vue instance (min requirements)', async () => {
    let cmp = mount(InflectionAttribute, {
      propsData: {
        data: {
          fooType: {
            value: 'fooValue',
            type: 'fooType2'
          },
          features: {
            fooType2: {
              type: 'fooType2'
            }
          }
        },
        type: 'fooType',
        grouplevel: 2,
        linkedfeatures: ['fooType2']
      }
    })

    cmp.find('span').trigger('click')

    await Vue.nextTick()

    expect(cmp.emitted()['sendfeature']).toBeTruthy()
    expect(cmp.emitted()['sendfeature'][0]).toEqual([{ value: 'fooValue', type: 'fooType2' }])
  })

/*  it('3 InflectionAttribute - check required props', () => {
    let cmp = mount(InflectionAttribute)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "data"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "type"'))
  }) */
})
