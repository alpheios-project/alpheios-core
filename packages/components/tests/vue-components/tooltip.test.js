/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Tooltip from '@/vue-components/tooltip.vue'

describe('tooltip.test.js', () => {
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

  it('1 Tooltip - renders a vue instance (min requirements)', () => {
    let cmp = mount(Tooltip, {
      propsData: {
        tooltipText: ''
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Tooltip - renders a vue instance (min requirements)', () => {
    let cmp = mount(Tooltip, {
      propsData: {
        tooltipText: 'foo tooltip'
      }
    })

    expect(cmp.find('.tooltiptext').text()).toEqual('foo tooltip')
    expect(cmp.vm.tooltipDirection).toEqual('bottom')
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom': true })

    cmp.setProps({
      tooltipDirection: 'top'
    })

    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top': true })

    cmp.setProps({
      tooltipDirection: 'foo value'
    })

    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom': true })

    cmp.setProps({
      tooltipDirection: 'TOP'
    })

    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top': true })

    cmp.setProps({
      additionalStyles: { color: 'red' }
    })

    expect(cmp.find('.tooltiptext').element.style.color).toEqual('red')

    cmp.setProps({
      tooltipDirection: 'bottom-wide'
    })
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom-wide': true })

    cmp.setProps({
      tooltipDirection: 'bottom-narrow'
    })
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom-narrow': true })

    cmp.setProps({
      tooltipDirection: 'bottom-narrow2'
    })
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom-narrow2': true })

    cmp.setProps({
      tooltipDirection: 'left'
    })
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-left': true })

    cmp.setProps({
      tooltipDirection: 'right'
    })
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-right': true })

    cmp.setProps({
      tooltipDirection: 'bottom-right'
    })
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom-right': true })

    cmp.setProps({
      tooltipDirection: 'top-right'
    })
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top-right': true })

    cmp.setProps({
      tooltipDirection: 'top-left'
    })
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top-left': true })
  })

  it('3 Tooltip - check required props', () => {
    let cmp = mount(Tooltip)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "tooltipText"'))
  })
})
