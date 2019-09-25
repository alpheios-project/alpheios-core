/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import InflFootnote from '@/vue/components/infl-footnote.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'

describe('infl-footnote.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = BaseTestHelp.baseVuexStore()

    api = {
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 InflFootnote - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 InflFootnote - on mounted stage it inits inflpopup, inflpanel (skipped because of attachedToDocument limits)', () => {
    document.body.innerHTML = ''
    let popup = document.createElement("div")
    popup.id = 'alpheios-popup-inner'
    popup.innerHTML = '<div style="height: 50px"></div><div class="alpheios-inflections__footnote-popup" style="height: 150px;">Test text</div>'
    document.body.appendChild(popup)

    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api,
      attachToDocument: true
    })

    expect(cmp.vm.inflpopup).toBeInstanceOf(HTMLDivElement)

    cmp.destroy()
  })

  it('3 InflFootnote - method $_alpheios_init executes setTransformPopup and defines interactInstance', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.setTransformPopup = jest.fn()
    cmp.setData({
      draggable: true
    })

    expect(cmp.vm.$options.interactInstance).not.toBeDefined()
    cmp.vm.$_alpheios_init()

    expect(cmp.vm.setTransformPopup).toHaveBeenCalled()
    expect(cmp.vm.$options.interactInstance).toBeDefined()
  })

  it('4 InflFootnote - method $_alpheios_cleanup removes interactInstance', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      draggable: true
    })
    cmp.vm.$_alpheios_init()
    expect(cmp.vm.$options.interactInstance).toBeDefined()

    cmp.vm.$_alpheios_cleanup()
    expect(cmp.vm.$options.interactInstance).toBeNull()
  })

  it('5 InflFootnote - method setTransformPopup sets transform properties for popupAlignmentStyles', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.popupAlignmentStyles.webkitTransform).not.toBeDefined()
    expect(cmp.vm.popupAlignmentStyles.transform).not.toBeDefined()

    cmp.vm.setTransformPopup('translate(120px, 50%)')
    
    expect(cmp.vm.popupAlignmentStyles.webkitTransform).toEqual('translate(120px, 50%)')
    expect(cmp.vm.popupAlignmentStyles.transform).toEqual('translate(120px, 50%)')
  })

  it('6 InflFootnote - method draggableSettings sets interact properties', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    let result = cmp.vm.draggableSettings()

    expect(result.inertia).toBeDefined()
    expect(result.autoScroll).toBeDefined()
    expect(result.restrict.restriction).toBeDefined()
    expect(result.restrict.elementRect).toBeDefined()
    expect(result.ignoreFrom).toBeDefined()
    expect(result.onmove).toBeDefined()
  })

  it('7 InflFootnote - method dragMoveListener corrects transform properties', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.setTransformPopup = jest.fn()

    let event = {
      target: {
        getAttribute: () => 10,
        setAttribute: (attr, value) => { event.target[attr] = value }
      },
      dx: 20,
      dy: 30
    }

    cmp.vm.dragMoveListener(event)

    expect(cmp.vm.setTransformPopup).toHaveBeenCalledWith('translate(30px, 40px)')
    expect(event.target['data-x']).toEqual(30)
    expect(event.target['data-y']).toEqual(40)
  })

  it('8 InflFootnote - method isOutOfRightXBound checks if is out of the right bound by x', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    let childBR1 = {
      x: 10,
      width: 100
    }

    let parentBR = {
      x: 0,
      width: 50
    }

    let check = cmp.vm.isOutOfRightXBound(childBR1, parentBR)

    expect(check).toBeTruthy()

    let childBR2 = {
      x: 10,
      width: 10
    }

    check = cmp.vm.isOutOfRightXBound(childBR2, parentBR)

    expect(check).toBeFalsy()
  })

  it('9 InflFootnote - method isOutOfLeftXBound checks if is out of the left bound by x', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    let childBR1 = {
      x: -10,
      width: 100
    }

    let parentBR = {
      x: 0,
      width: 50
    }

    let check = cmp.vm.isOutOfRightXBound(childBR1, parentBR)

    expect(check).toBeTruthy()

    let childBR2 = {
      x: 10,
      width: 10
    }

    check = cmp.vm.isOutOfRightXBound(childBR2, parentBR)

    expect(check).toBeFalsy()
  })

  it('10 InflFootnote - method deltaRightXBound returns delta for returning inside right bound', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      defaultRightPadding: 30,
      defaultLeftPadding: 30
    })

    cmp.vm.isOutOfRightXBound = () => false

    let childBR = {
      x: 10,
      width: 100
    }

    let parentBR = {
      x: 0,
      width: 50
    }

    expect(cmp.vm.deltaRightXBound(childBR, parentBR)).toEqual(0)

    cmp.vm.isOutOfRightXBound = () => true
    expect(cmp.vm.deltaRightXBound(childBR, parentBR)).toEqual(90)
  })

  it('11 InflFootnote - method deltaLeftXBound returns delta for returning inside left bound', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      defaultRightPadding: 30,
      defaultLeftPadding: 30
    })

    cmp.vm.isOutOfLeftXBound = () => false

    let childBR = {
      x: -10,
      width: 100
    }

    let parentBR = {
      x: 0,
      width: 150
    }

    expect(cmp.vm.deltaLeftXBound(childBR, parentBR)).toEqual(0)

    cmp.vm.isOutOfLeftXBound = () => true
    expect(cmp.vm.deltaLeftXBound(childBR, parentBR)).toEqual(-20)
  })

  
  it('12 InflFootnote - method checkBounds sets transform properties if it is out  of bound', () => {
    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.setTransformPopup = jest.fn()

    cmp.vm.inflpopup = {
      getBoundingClientRect: () => { return { x:10, width:100 } } 
    }
    cmp.vm.inflpanel = {
      getBoundingClientRect: () => { return { x:0, width:50 } } 
    }

    cmp.vm.checkBounds()

    expect(cmp.vm.setTransformPopup).toHaveBeenLastCalledWith('translateX(calc(-50% - 70px))')

    cmp.vm.inflpopup = {
      getBoundingClientRect: () => { return { x:-30, width:20 } } 
    }
    cmp.vm.inflpanel = {
       getBoundingClientRect: () => { return { x:0, width:50 } } 
    }
  
    cmp.vm.checkBounds()
  
    expect(cmp.vm.setTransformPopup).toHaveBeenLastCalledWith('translateX(-10px)')
  })


  it('13 InflFootnote - method showPopup sets visibility to true, executes _alpheios_init if it is a desktop', async () => {
    let api = {
      app: BaseTestHelp.appAPI({
        platform: {
          isDesktop: true
        }
      })
    }

    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      id: 'fooId'
    })

    cmp.vm.$_alpheios_init = jest.fn()
    cmp.vm.checkBounds = jest.fn()
    cmp.vm.showPopup()

    expect(cmp.vm.draggable).toBeTruthy()
    expect(cmp.vm.$_alpheios_init).toHaveBeenCalled()
    
    expect(cmp.vm.footnotesPopupVisible).toBeTruthy()
    expect(store.state.panel.visibleFootnoteId).toEqual('fooId')

    await Vue.nextTick()

    expect(cmp.vm.checkBounds).toHaveBeenCalled()
  })

  it('14 InflFootnote - method hidePopup sets visibility to false, executes $_alpheios_cleanup if it is a desktop', async () => {
    let api = {
      app: BaseTestHelp.appAPI({
        platform: {
          isDesktop: true
        }
      })
    }

    let cmp = shallowMount(InflFootnote, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      id: 'fooId'
    })

    cmp.vm.$_alpheios_init = jest.fn()
    cmp.vm.checkBounds = jest.fn()
    cmp.vm.setTransformPopup = jest.fn()
    cmp.vm.$_alpheios_cleanup = jest.fn()
    cmp.vm.showPopup()

    await Vue.nextTick()

    cmp.vm.hidePopup()

    expect(cmp.vm.footnotesPopupVisible).toBeFalsy()
    expect(cmp.vm.$_alpheios_cleanup).toHaveBeenCalled()

    expect(cmp.vm.setTransformPopup).toHaveBeenCalledWith()
  })
})