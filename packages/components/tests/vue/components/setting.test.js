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
    expect(cmp.vm.showLabelText).toBeTruthy()
    expect(cmp.vm.showCheckboxTitle).toBeFalsy()
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

  })

  it('8 Setting - selected from data model', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {
          name: 'fooname',
          labelText: 'foolabel',
          textValues: function () { return [ 'footext1', 'footext2' ] },
          currentTextValue: function () { return 'footext1' }
        }
      }
    })

    expect(cmp.vm.selected).toEqual('footext1')
    expect(cmp.findAll('select').length).toEqual(1)
    expect(cmp.findAll('select option').length).toEqual(2)
    expect(cmp.find('select option:checked').text()).toEqual('footext1')
  })

  it('9 Setting - selected from data override', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {
          name: 'fooname',
          labelText: 'foolabel',
          textValues: function () { return [ 'footext1', 'footext2' ] },
          currentTextValue: function () { return 'footext1' }
        },
        selectedOverride: 'footext2'
      }
    })

    expect(cmp.vm.selected).toEqual('footext2')
    expect(cmp.find('select option:checked').text()).toEqual('footext2')
  })

  it('10 Setting - setting without label and with checkbox label - lookup', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {
          name: 'fooname',
          labelHtml: 'foolabel',
          boolean: true
        },
        showLabelText: false,
        showCheckboxTitle: true
      }
    })

    expect(cmp.find('.alpheios-setting__label').isVisible()).toBeFalsy()
    expect(cmp.find('.alpheios-checkbox-block  label').isVisible()).toBeTruthy()
  })
})
