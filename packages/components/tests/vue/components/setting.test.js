/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Setting from '../../../src/vue/components/setting.vue'
import Multiselect from 'vue-multiselect'

describe('setting.test.js', () => {
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

  it('1 Setting - renders a vue instance (min requirements)', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {}
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(cmp.vm.classes).toEqual([])
    expect(cmp.vm.showTitle).toBeTruthy()
  })

  it('2 Setting - renders a vue instance (with data)', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {
          name: 'fooname',
          labelText: 'foolabel',
          textValues: function () { return [ { text: 'footext1', value: 'foovalue1' }, { text: 'footext2', value: 'foovalue2' } ] },
          currentTextValue: function () { return { text: 'footext1', value: 'foovalue1' } }
        }
      }
    })

    expect(cmp.vm.selected).toEqual({ text: 'footext1', value: 'foovalue1' })
    expect(cmp.findAll('select').length).toEqual(1)
    expect(cmp.findAll('select option').length).toEqual(2)

    cmp.vm.selected = 'foovalue'
    expect(cmp.emitted()['change']).toBeTruthy()
    expect(cmp.emitted()['change'][0]).toEqual(['fooname', 'foovalue'])
  })

  it('3 Setting - renders a vue instance (with data)', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {
          labelText: 'foolabel',
          multiValue: true,
          textValues: function () { return [ { text: 'footext1', value: 'foovalue1' }, { text: 'footext2', value: 'foovalue2' } ] },
          currentTextValue: function () { return [{ text: 'footext1', value: 'foovalue1' }, { text: 'footext2', value: 'foovalue2' }] }
        }
      }
    })

    expect(cmp.vm.selected).toEqual([{ text: 'footext1', value: 'foovalue1' }, { text: 'footext2', value: 'foovalue2' }])
    // expect(cmp.find('select').attributes().multiple).toBeTruthy()
    expect(cmp.find(Multiselect)).toBeTruthy()
  })

  it('4 Setting - check required props', () => {
    let cmp = mount(Setting)

    expect(console.error).toBeCalledWith(expect.stringContaining('Missing required prop'))
  })

  it('5 Setting - classes', () => {
    let cmp = mount(Setting, {
      propsData: {
        classes: 'foovalue'
      }
    })

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "data"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('Invalid prop: type check failed for prop "classes". Expected Array, got String'))
    // expect(console.error).toBeCalledWith(expect.stringContaining('Invalid prop: type check failed for prop "classes". Expected Array, got String with value "foovalue".'))
  })

  it('7 Setting - checkbox', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {
          boolean: true,
          currentValue: false,
          textValues: function () { return [ { text: 'footext1', value: 'foovalue1' }, { text: 'footext2', value: 'foovalue2' } ] },
          currentTextValue: function () { return [{ text: 'footext1', value: 'foovalue1' }] }
        }
      }
    })

    expect(cmp.vm.checkboxLabel).toEqual('footext1')
    expect(cmp.vm.selected).toBeFalsy()

    cmp.vm.checkboxClick()
    expect(cmp.emitted()['change']).toBeTruthy()
  })
})
