/* eslint-env jest */
/* eslint-disable no-unused-vars */

import PointerEvt from '@/lib/custom-pointer-events/pointer-evt.js'
import Swipe from '@/lib/custom-pointer-events/swipe.js'

describe('pointer-evt.test.js', () => {
  // console.error = function () {}
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

  it('1 PointerEvt - constructor creates an object with tracking, start, end', () => {
    let eventEl = new PointerEvt()
    expect(eventEl.tracking).toBeFalsy()
    expect(eventEl.start.constructor.name).toEqual('EventElement')
    expect(eventEl.end.constructor.name).toEqual('EventElement')
  })

  it('2 PointerEvt - static alpheiosIgnoreAllTest checks if DOMStringMap has alpheiosIgnore = all attribute', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)
    
    expect(PointerEvt.alpheiosIgnoreAllTest(testElement.dataset)).toBeFalsy()
    testElement.setAttribute('data-alpheios-ignore', 'all')
    expect(PointerEvt.alpheiosIgnoreAllTest(testElement.dataset)).toBeTruthy()
  })

  it('3 PointerEvt - static excludeAllCpeTest checks if DOMStringMap has alphExcludeAllCpe', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)
    
    expect(PointerEvt.excludeAllCpeTest(testElement.dataset)).toBeFalsy()
    testElement.setAttribute('data-alph-exclude-all-cpe', 'yes')
    expect(PointerEvt.excludeAllCpeTest(testElement.dataset)).toBeTruthy()
  })

  it('4 PointerEvt - setPoint method defines time, x, y, target, pathe and excluded for the given type', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)

    let eventEl = new PointerEvt()

    jest.spyOn(eventEl.constructor, 'buildPath')

    eventEl.setPoint('start', 10, 20, testElement)

    expect(eventEl.start.time).toBeDefined()
    expect(eventEl.start.client.x).toEqual(10)
    expect(eventEl.start.client.y).toEqual(20)
    expect(eventEl.start.target).toEqual(testElement)
    expect(eventEl.start.path.length).toEqual(2)
    expect(eventEl.start.excluded).toBeFalsy()

    expect(eventEl.constructor.buildPath).toHaveBeenCalled()

    testElementParent.setAttribute('data-alpheios-ignore', 'all')

    eventEl.setPoint('end', 110, 120, testElement)

    expect(eventEl.end.time).toBeDefined()
    expect(eventEl.end.client.x).toEqual(110)
    expect(eventEl.end.client.y).toEqual(120)
    expect(eventEl.end.target).toEqual(testElement)
    expect(eventEl.end.path.length).toEqual(2)
    expect(eventEl.end.excluded).toBeTruthy()
  })

  it('5 PointerEvt - static buildPath method creates path array from child to all parents', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)

    let path = PointerEvt.buildPath(testElement)
    expect(path.length).toEqual(2)
    expect(path[0]).toEqual(testElement)
    expect(path[1]).toEqual(testElementParent)
  })

  it('6 PointerEvt - setStartPoint method executes setPoint for the start type', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)

    let eventEl = new PointerEvt()

    jest.spyOn(eventEl, 'setPoint')
    eventEl.setStartPoint(10, 20, testElement)

    expect(eventEl.setPoint).toHaveBeenCalledWith('start', 10, 20, testElement, undefined)
  })

  it('7 PointerEvt - setEndPoint method executes setPoint for the end type', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)

    let eventEl = new PointerEvt()

    jest.spyOn(eventEl, 'setPoint')
    eventEl.setEndPoint(10, 20, testElement)

    expect(eventEl.setPoint).toHaveBeenCalledWith('end', 10, 20, testElement, undefined)
  })

  it('8 PointerEvt - type method returns class name', () => {
    let eventEl = new PointerEvt()
    expect(eventEl.type).toEqual('PointerEvt')
  })

  it('9 PointerEvt - duration method returns period between start and end', () => {
    let testElement = document.createElement("div")

    let eventEl = new PointerEvt()
    eventEl.start.time = 10
    eventEl.end.time = 20

    expect(eventEl.duration).toEqual(10)    
  })

  it('10 PointerEvt - mvmntX method returns difference between start.x and end.x, mvmntXAbs - returns abs of it', () => {
    let testElement = document.createElement("div")

    let eventEl = new PointerEvt()
    eventEl.setStartPoint(110, 150, testElement)
    eventEl.setEndPoint(10, 20, testElement)    

    expect(eventEl.mvmntX).toEqual(-100)
    expect(eventEl.mvmntXAbs).toEqual(100)   
  })

  it('11 PointerEvt - mvmntY method returns difference between start.y and end.y, mvmntYAbs - returns abs of it', () => {
    let testElement = document.createElement("div")

    let eventEl = new PointerEvt()
    eventEl.setStartPoint(110, 150, testElement)
    eventEl.setEndPoint(10, 20, testElement)    

    expect(eventEl.mvmntY).toEqual(-130)
    expect(eventEl.mvmntYAbs).toEqual(130)
    expect(Math.ceil(eventEl.mvmntDist)).toEqual(165)    
  })

  it('12 PointerEvt - mvmntDist method returns distance between points', () => {
    let testElement = document.createElement("div")

    let eventEl = new PointerEvt()
    eventEl.setStartPoint(110, 150, testElement)
    eventEl.setEndPoint(10, 20, testElement)    

    expect(Math.ceil(eventEl.mvmntDist)).toEqual(165)    
  })

  it('13 PointerEvt - static pointerDownListener method saves start data from domEvt to the current event (could be any type of PointerEvt,but currently used for Swipe)', () => {
    let testElement = document.createElement("div")
    let eventEl = new PointerEvt()
    jest.spyOn(eventEl, 'setStartPoint')
    
    PointerEvt.pointerDownListener(eventEl, { clientX: 10, clientY: 20, target: testElement })   

    expect(eventEl.setStartPoint).toHaveBeenCalledWith(10, 20, testElement, undefined)
  })

  it('14 PointerEvt - static pointerUpListener method saves end data from domEvt to the current event (could be any type of PointerEvt,but currently used for Swipe)', () => {
    let testElement = document.createElement("div")
    let eventEl = new PointerEvt()
    jest.spyOn(eventEl, 'setEndPoint')
    
    PointerEvt.pointerUpListener(eventEl, { clientX: 10, clientY: 20, target: testElement })   

    expect(eventEl.setEndPoint).toHaveBeenCalledWith(10, 20, testElement, undefined)
  })

  it('15 PointerEvt - static pointerUpListener method executes event.evtHandler if setEndPoint returns true (it is for Swipe) ', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})
    let eventEl = new Swipe(testElement, evtHandler)
    let domEvt = { clientX: 10, clientY: 120, target: testElement }
    
    PointerEvt.pointerUpListener(eventEl, domEvt)   
    expect(evtHandler).toHaveBeenCalledWith(eventEl, domEvt)
  })

  it('16 PointerEvt - static touchStartListener method saves start data from domEvt to the current event (could be any type of PointerEvt, but currently used for Swipe)', () => {
    let testElement = document.createElement("div")
    let eventEl = new PointerEvt()
    jest.spyOn(eventEl, 'setStartPoint')

    let domEvt = { changedTouches: [{ clientX: 10, clientY: 110 }], target: testElement }

    PointerEvt.touchStartListener(eventEl, domEvt)   

    expect(eventEl.setStartPoint).toHaveBeenCalledWith(10, 110, testElement, undefined)
  })

  it('17 PointerEvt - static touchEndListener method saves end data from domEvt to the current event (could be any type of PointerEvt,but currently used for Swipe)', () => {
    let testElement = document.createElement("div")
    let eventEl = new PointerEvt()
    jest.spyOn(eventEl, 'setEndPoint')
    
    let domEvt = { changedTouches: [{ clientX: 10, clientY: 110 }], target: testElement }
    PointerEvt.touchEndListener(eventEl, domEvt)   

    expect(eventEl.setEndPoint).toHaveBeenCalledWith(10, 110, testElement, undefined)
  })

  it('18 PointerEvt - static touchEndListener method executes event.evtHandler if setEndPoint returns true (it is for Swipe) ', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})
    let eventEl = new Swipe(testElement, evtHandler)
    let domEvt = { changedTouches: [{ clientX: 10, clientY: 110 }], target: testElement }
    
    PointerEvt.touchEndListener(eventEl, domEvt)   
    expect(evtHandler).toHaveBeenCalledWith(eventEl, domEvt)
  })

  it('19 PointerEvt - static addUpDownListeners method checks pointerEventSupported, if yes - adds listeners for the pointerdown, pointerup ', () => {
    let eventEl = new PointerEvt()
    window.PointerEvent = true
    let testElement = document.createElement("div")

    testElement.addEventListener = jest.fn(() => {})

    PointerEvt.addUpDownListeners(testElement, eventEl)
    
    expect(testElement.addEventListener).toHaveBeenCalledWith('pointerdown', expect.anything(), expect.anything())
    expect(testElement.addEventListener).toHaveBeenCalledWith('pointerup', expect.anything(), expect.anything())
  })

  it('20 PointerEvt - static addUpDownListeners method checks pointerEventSupported, if no - adds listeners for the touchstart, touchend ', () => {
    let eventEl = new PointerEvt()
    window.PointerEvent = false
    let testElement = document.createElement("div")

    testElement.addEventListener = jest.fn(() => {})

    PointerEvt.addUpDownListeners(testElement, eventEl)
    
    expect(testElement.addEventListener).toHaveBeenCalledWith('touchstart', expect.anything(), expect.anything())
    expect(testElement.addEventListener).toHaveBeenCalledWith('touchend', expect.anything(), expect.anything())
  })

})