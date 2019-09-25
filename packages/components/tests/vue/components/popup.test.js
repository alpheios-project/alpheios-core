/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Popup from '@/vue/components/popup.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

describe('popup.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let defaultData
  
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    defaultData = { moduleConfig: {} }

    store = BaseTestHelp.baseVuexStore()

    api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.authModule(store, api)
    BaseTestHelp.l10nModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 Popup - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    
  })

  it('2 Popup - Vue instance has shift property x,y = 0 by default', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.shift.x).toEqual(0)
    expect(cmp.vm.shift.y).toEqual(0)
  })

  it('3 Popup - Vue instance loads shift property from moduleConfig', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return {
          moduleConfig: {
            initialShift: { x: 10, y: 20 }
          }
        }
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.shift.x).toEqual(10)
    expect(cmp.vm.shift.y).toEqual(20)
  })

  it('4 Popup - computed showToolbar = false by default and loads it from moduleConfig', () => {
    let cmp = shallowMount(Popup, {
      data () { return defaultData },
      store, localVue,
      mocks: api
    })

    expect(cmp.vm.showToolbar).toBeFalsy()

    cmp.setData({
      moduleConfig: {
        showNav: true
      }
    })

    expect(cmp.vm.showToolbar).toBeTruthy()
  })

  it('5 Popup - computed componentStyles defines css properties from data', () => {
    let api = {
      ui: BaseTestHelp.uiAPI({
        zIndex: 50
      }),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI()
    }
    BaseTestHelp.authModule(store, api)
    BaseTestHelp.l10nModule(store, api)
    
    let cmp = shallowMount(Popup, {
      data () { return {
          moduleConfig: {
            initialShift: { x: 60, y: 70 }
          }
        } 
      },
      store, localVue,
      mocks: api,
      computed: {
        positionLeftDm: () => 10,
        positionTopDm: () => 20,
        widthDm: () => 30,
        heightDm: () => 40
      }
    })

    expect(cmp.vm.componentStyles.left).toEqual(10) // positionLeftDm
    expect(cmp.vm.componentStyles.top).toEqual(20) // positionTopDm
    expect(cmp.vm.componentStyles.width).toEqual(30) // widthDm
    expect(cmp.vm.componentStyles.height).toEqual(40) // heightDm
    expect(cmp.vm.componentStyles.zIndex).toEqual(50) // ui.zIndex
    expect(cmp.vm.componentStyles.transform).toEqual('translate(60px, 70px)') // ui.zIndex
  })

  it('6 Popup - computed noLanguage checks if $store.state.app.currentLanguageName is defined, by default = true', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.noLanguage).toBeTruthy()

    store.commit('app/setTestCurrentLanguageName', 'testLanguageName')
    // await timeout(5000)
    expect(cmp.vm.noLanguage).toBeFalsy()
  })

  it('7 Popup - computed positionLeftDm return 0px, if panel is invisible, otherwise it returns initialPos left from the config', () => {
    let cmp = shallowMount(Popup, {
      data () { 
        return {
          moduleConfig: {
            initialPos: { left: 60, top: 70 }
          }
        }
      },
      store,
      localVue,
      mocks: api
    })

    expect(store.state.popup.visible).toBeFalsy()
    expect(cmp.vm.positionLeftDm).toEqual('0px')
    
    store.commit('popup/setPopupVisible', true)
    expect(cmp.vm.positionLeftDm).toEqual('60px')
  })

  it('8 Popup - computed positionTopDm return 0px, if panel is invisible, otherwise it returns initialPos top from the config', () => {
    let cmp = shallowMount(Popup, {
      data () { 
        return {
          moduleConfig: {
            initialPos: { left: 60, top: 70 }
          }
        }
      },
      store,
      localVue,
      mocks: api
    })

    expect(store.state.popup.visible).toBeFalsy()
    expect(cmp.vm.positionTopDm).toEqual('0px')
    
    store.commit('popup/setPopupVisible', true)
    expect(cmp.vm.positionTopDm).toEqual('70px')
  })

  it('9 Popup - computed widthDm returns auto if widthValue is auto', () => {
    Object.assign(defaultData, {
      widthValue: 'auto'
    })
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.widthDm).toEqual('auto')
  })

  it('10 Popup - computed widthDm returns widthValue with px if widthValue is not auto', () => {
    Object.assign(defaultData, {
      widthValue: 10
    })
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.widthDm).toEqual('10px')
  })

  it('11 Popup - computed widthDm returns resizedWidth with px if resizedWidth is defined', () => {
    Object.assign(defaultData, {
      resizedWidth: 100
    })
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.widthDm).toEqual('100px')
  })

  it('12 Popup - computed widthDm set value - updates widthValue with auto, if newWidth is less then maxWidth, and with maxWidth if greater', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true,
      computed: {
        maxWidth: () => 100
      }
    })

    expect(cmp.vm.widthValue).toEqual(0)

    cmp.vm.widthDm = 50
    expect(cmp.vm.widthValue).toEqual('auto')

    cmp.vm.widthDm = 150
    expect(cmp.vm.widthValue).toEqual(100)
    expect(cmp.vm.exactWidth).toEqual(100)

    cmp.destroy()
  })

  it('13 Popup - computed heightDm set value - updates heightValue with auto, if newHeight is less then maxHeight, and with maxHeight if greater', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true,
      computed: {
        maxHeight: () => 100
      }
    })

    expect(cmp.vm.heightValue).toEqual(0)

    cmp.vm.heightDm = 50
    expect(cmp.vm.heightValue).toEqual('auto')

    cmp.vm.heightDm = 150
    expect(cmp.vm.heightValue).toEqual(100)
    expect(cmp.vm.exactHeight).toEqual(100)

    cmp.destroy()
  })

  it('14 Popup - computed maxWidth calculates max available width according to the document and viewport margin', () => {
    Object.defineProperty(document.documentElement, 'clientWidth', {
      get () {
        return 190
      }
    })

    Object.defineProperty(window, 'innerWidth', {
      get () {
        return 200
      }
    })

    Object.assign(defaultData.moduleConfig, {
      viewportMargin: 20
    })

    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    expect(cmp.vm.maxWidth).toEqual(150) // max - 2*viewport - scroll

    cmp.destroy()
  })

  it('15 Popup - computed maxWidth calculates max available width according to the document and viewport margin', () => {
    Object.defineProperty(document.documentElement, 'clientHeight', {
      get () {
        return 190
      }
    })

    Object.defineProperty(window, 'innerHeight', {
      get () {
        return 200
      }
    })

    Object.assign(defaultData.moduleConfig, {
      viewportMargin: 30
    })

    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    expect(cmp.vm.maxHeight).toEqual(130) // max - 2*viewport - scroll

    cmp.destroy()
  })

  it('16 Popup - computed verboseMode checks if verboseMode is turned on', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    cmp.vm.settings.getUiOptions = () => {
      return {
        items: {
          verboseMode: {
            currentValue: null
          }
        }
      }
    }

    expect(cmp.vm.verboseMode).toBeFalsy()

    cmp.vm.settings.getUiOptions = () => {
      return {
        items: {
          verboseMode: {
            currentValue: 'verbose'
          }
        }
      }
    }

    expect(cmp.vm.verboseMode).toBeTruthy()
  })

  it('17 Popup - method switchProviders changes showProviders to oposite (showProviders = false by default)', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showProviders).toBeFalsy()

    cmp.vm.switchProviders()

    expect(cmp.vm.showProviders).toBeTruthy()

    cmp.vm.switchProviders()

    expect(cmp.vm.showProviders).toBeFalsy()
  })

  it('18 Popup - method resizableSettings returns result with enough properties', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    let props = cmp.vm.resizableSettings()
    expect(props.preserveAspectRatio).toBeDefined()
    expect(props.edges).toBeDefined()
    expect(props.edges.left).toBeDefined()
    expect(props.edges.right).toBeDefined()
    expect(props.edges.bottom).toBeDefined()
    expect(props.edges.top).toBeDefined()
    expect(props.restrictEdges).toBeDefined()
    expect(props.restrictEdges.restriction).toBeDefined()
    expect(props.restrictEdges.endOnly).toBeDefined()
  })

  it('19 Popup - method draggableSettings returns result with enough properties', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    let props = cmp.vm.draggableSettings()
    expect(props.inertia).toBeDefined()
    expect(props.autoScroll).toBeDefined()
    expect(props.ignoreFrom).toBeDefined()
  })

  it('20 Popup - method isWithinBounds define if viewport is enough for the element', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        platform: {
          viewport: {
            width: 10,
            height: 10
          }
        }
      })
    }

    BaseTestHelp.authModule(store, api)
    BaseTestHelp.l10nModule(store, api)

    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    // out of the viewport to the right
    cmp.vm.$el.getBoundingClientRect = () => {
      return {
        x: 100, y: 50, width: 150, height: 300
      }
    }

    let props = cmp.vm.isWithinBounds()
    expect(props.withinBounds).toBeFalsy()
    expect(props.adjX).toBeLessThan(0)
    expect(props.adjY).toBeLessThan(0)

    // out of the viewport to the left
    cmp.vm.$el.getBoundingClientRect = () => {
      return {
        x: -10, y: -10, width: 5, height: 5
      }
    }

    props = cmp.vm.isWithinBounds()
    expect(props.withinBounds).toBeFalsy()
    expect(props.adjX).toBeGreaterThan(0)
    expect(props.adjY).toBeGreaterThan(0)

    // inside to the viewport
    cmp.vm.$el.getBoundingClientRect = () => {
      return {
        x: 5, y: 5, width: 5, height: 5
      }
    }

    props = cmp.vm.isWithinBounds()
    expect(props.withinBounds).toBeTruthy()
    expect(props.adjX).toEqual(0)
    expect(props.adjY).toEqual(0)

    cmp.destroy()
  })

  it('21 Popup - method resizeListener updates resized and shift properties only if resizable = true', () => {
    Object.assign(defaultData, {
      resizable: false,
      resizedWidth: 100,
      resizedHeight: 150,
      moduleConfig: {
        initialShift: {
          x: 10, y: 20
        }
      }
    })

    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    let testEvent = {
      rect: {
        width: 200,
        height: 250
      },
      deltaRect: {
        left: 110, top: 120
      }
    }

    expect(cmp.vm.resizable).toBeFalsy()
    cmp.vm.resizeListener(testEvent)
    
    expect(cmp.vm.resizedWidth).toEqual(defaultData.resizedWidth)
    expect(cmp.vm.resizedHeight).toEqual(defaultData.resizedHeight)
    expect(cmp.vm.shift.x).toEqual(defaultData.shift.x)
    expect(cmp.vm.shift.y).toEqual(defaultData.shift.y)

    cmp.vm.resizable = true
    cmp.vm.resizeListener(testEvent)
    
    expect(cmp.vm.resizedWidth).toEqual(testEvent.rect.width)
    expect(cmp.vm.resizedHeight).toEqual(testEvent.rect.height)
    expect(cmp.vm.shift.x).toEqual(120)
    expect(cmp.vm.shift.y).toEqual(140)
  })


  it('22 Popup - method dragMoveListener updates shift properties only if draggable = true, if drag mount more then 100, than it won\'t move  and saves a error to properties', () => {
    Object.assign(defaultData, {
      draggable: false,
      moduleConfig: {
        initialShift: {
          x: 10, y: 20
        }
      }
    })

    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    let testEvent = {
      dx: 50, dy: 50
    }

    expect(cmp.vm.draggable).toBeFalsy()

    cmp.vm.dragMoveListener(testEvent)
    expect(cmp.vm.shift.x).toEqual(defaultData.shift.x)
    expect(cmp.vm.shift.y).toEqual(defaultData.shift.y)

    cmp.vm.draggable = true
    cmp.vm.dragMoveListener(testEvent)

    expect(cmp.vm.shift.x).toEqual(60)
    expect(cmp.vm.shift.y).toEqual(70)

    testEvent = {
      dx: 150, dy: 150
    }

    cmp.vm.dragMoveListener(testEvent)

    expect(cmp.vm.shift.x).toEqual(60)
    expect(cmp.vm.shift.y).toEqual(70)
    expect(cmp.vm.dragErrorX).toBeTruthy()
    expect(cmp.vm.dragErrorY).toBeTruthy()
  })

  it('23 Popup - method dragEndListener updates shift properties according to isWithinBounds', () => {
    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    cmp.vm.isWithinBounds = () => {
      return {
        withinBounds: true,
        adjX: 50,
        adjY: 60
      }
    }

    expect(cmp.vm.shift.x).toEqual(0)
    expect(cmp.vm.shift.y).toEqual(0)

    cmp.vm.dragEndListener()

    expect(cmp.vm.shift.x).toEqual(0)
    expect(cmp.vm.shift.y).toEqual(0)

    cmp.vm.isWithinBounds = () => {
      return {
        withinBounds: false,
        adjX: 50,
        adjY: 60
      }
    }

    cmp.vm.dragEndListener()

    expect(cmp.vm.shift.x).toEqual(50)
    expect(cmp.vm.shift.y).toEqual(60)
  })

  it('24 Popup - method resetPopupDimensions sets 0 to size/position properties', () => {
    Object.assign(defaultData, {
      resizeCount: 10,
      widthValue: 20,
      heightValue: 30,
      exactWidth: 40,
      exactHeight: 50,
      resizedWidth: 100,
      resizedHeight: 150
    })

    let cmp = shallowMount(Popup, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.resizeCount).toEqual(10)
    expect(cmp.vm.widthValue).toEqual(20)
    expect(cmp.vm.heightValue).toEqual(30)
    expect(cmp.vm.exactWidth).toEqual(40)
    expect(cmp.vm.exactHeight).toEqual(50)
    expect(cmp.vm.resizedWidth).toEqual(100)
    expect(cmp.vm.resizedHeight).toEqual(150)

    cmp.vm.resetPopupDimensions()

    expect(cmp.vm.resizeCount).toEqual(0)
    expect(cmp.vm.widthValue).toEqual(0)
    expect(cmp.vm.heightValue).toEqual(0)
    expect(cmp.vm.exactWidth).toEqual(0)
    expect(cmp.vm.exactHeight).toEqual(0)
    expect(cmp.vm.resizedWidth).toBeNull()
    expect(cmp.vm.resizedHeight).toBeNull()
  })
})