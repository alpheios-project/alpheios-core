/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import Tooltip from '@/vue/components/tooltip.vue'
import Vue from 'vue/dist/vue'

describe('tooltip.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let api = {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          state: {}
        },
        app: {
          platform: {
            isMobile: false
          }
        }
      }
    })

    api = {
      app: {
        homonymDataReady: false,
        homonym: {}
      }
    }
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Tooltip - renders a vue instance (min requirements)', () => {
    const cmp = mount(Tooltip, {
      propsData: {
        tooltipText: ''
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Tooltip - renders a vue instance (min requirements)', async () => {
    const storeLocal = new Vuex.Store({
      modules: {
        app: {
          platform: {
            isMobile: false
          }
        }
      }
    })

    const cmp = mount(Tooltip, {
      store: storeLocal,
      localVue,
      mocks: {
        app: {
          platform: {
            isMobile: false
          }
        }
      },
      propsData: {
        tooltipText: 'foo tooltip'
      }
    })

    expect(cmp.find('.alpheios-tooltiptext').text()).toEqual('foo tooltip')
    expect(cmp.vm.tooltipDirection).toEqual('bottom')
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom': true })

    cmp.setProps({
      tooltipDirection: 'top'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top': true })

    cmp.setProps({
      tooltipDirection: 'foo value'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom': true })

    cmp.setProps({
      tooltipDirection: 'TOP'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top': true })

    cmp.setProps({
      additionalStyles: { color: 'red' }
    })
    await Vue.nextTick()
    expect(cmp.find('.alpheios-tooltiptext').element.style.color).toEqual('red')

    cmp.setProps({
      tooltipDirection: 'bottom-wide'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom-wide': true })

    cmp.setProps({
      tooltipDirection: 'bottom-narrow'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom-narrow': true })

    cmp.setProps({
      tooltipDirection: 'bottom-narrow2'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom-narrow2': true })

    cmp.setProps({
      tooltipDirection: 'left'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-left': true })

    cmp.setProps({
      tooltipDirection: 'right'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-right': true })

    cmp.setProps({
      tooltipDirection: 'bottom-right'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom-right': true })

    cmp.setProps({
      tooltipDirection: 'top-right'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top-right': true })

    cmp.setProps({
      tooltipDirection: 'top-left'
    })
    await Vue.nextTick()
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top-left': true })
  })

  it('3 Tooltip - check required props', () => {
    const cmp = mount(Tooltip)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "tooltipText"'))
  })

  it('4 Tooltip - if is not mobile, renderTooltip = true', () => {
    const storeLocal = new Vuex.Store({
      modules: {
        app: {
          platform: {
            isMobile: false
          }
        }
      }
    })

    const cmp = mount(Tooltip, {
      store: storeLocal,
      localVue,
      mocks: {
        app: {
          platform: {
            isMobile: false
          }
        }
      },
      propsData: {
        tooltipText: 'foo tooltip'
      }
    })

    expect(cmp.vm.renderTooltip).toBeTruthy()
  })

  it('5 Tooltip - if is mobile, renderTooltip = false', () => {
    const storeLocal = new Vuex.Store({
      modules: {
        app: {
          platform: {
            isMobile: true
          }
        }
      }
    })

    const cmp = mount(Tooltip, {
      store: storeLocal,
      localVue,
      mocks: {
        app: {
          platform: {
            isMobile: true
          }
        }
      },
      propsData: {
        tooltipText: 'foo tooltip'
      }
    })

    expect(cmp.vm.renderTooltip).toBeFalsy()
  })
})
