/* eslint-env jest */
/* eslint-disable no-unused-vars */

import GenericEvt from '@/lib/custom-pointer-events/generic-evt.js'

describe('generic-evt.test.js', () => {
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

  it('1 GenericEvt - constructor creates an object with element, evtType, evtHandler, boundListener', () => {
    let eventEl = new GenericEvt('fooElement', 'fooEvtHandler', 'fooEvtType')
    expect(eventEl.element).toEqual('fooElement')
    expect(eventEl.evtHandler).toEqual('fooEvtHandler')
    expect(eventEl.evtType).toEqual('fooEvtType')
    expect(eventEl.boundListener).toBeDefined()

    expect(eventEl.tracking).toBeFalsy()
    expect(eventEl.start.constructor.name).toEqual('EventElement')
    expect(eventEl.end.constructor.name).toEqual('EventElement')
  })

  it('2 GenericEvt - static excludeCpeTest checks if DOMStringMap has alphExcludeGenericEvtCpe', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    expect(GenericEvt.excludeCpeTest(testElement.dataset)).toBeFalsy()
    testElement.setAttribute('data-alph-exclude-generic-evt-cpe', 'yes')

    expect(GenericEvt.excludeCpeTest(testElement.dataset)).toBeTruthy()
  })

  it('3 GenericEvt - setEndPoint executes super.setEndPoint and returns true if start or end doesn\'t have excluded', () => {
    let testElement = document.createElement("div")
    let eventEl = new GenericEvt(testElement, 'fooEvtHandler', 'fooEvtType')

    let res = eventEl.setEndPoint(10, 20, testElement)

    expect(eventEl.end).toBeDefined()
    expect(res).toBeTruthy()
  })

  it('4 GenericEvt - setEndPoint executes super.setEndPoint and returns false if start and end have excluded', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)

    testElementParent.setAttribute('data-alpheios-ignore', 'all')

    let eventEl = new GenericEvt(testElement, 'fooEvtHandler', 'fooEvtType')

    let res = eventEl.setEndPoint(10, 20, testElement)

    expect(eventEl.end).toBeDefined()
    expect(res).toBeFalsy()
  })

  it('5 GenericEvt - eventListener method sets start and end point, and if both doesn\'t have excluded, it executes evtHandler', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)
    let evtHandler = jest.fn(() => {})

    let eventEl = new GenericEvt(testElement, evtHandler, 'fooEvtType')

    let domEvt = { clientX: 10, clientY: 120, target: testElement, stopPropagation: jest.fn(() => {}) }
    jest.spyOn(eventEl, 'setStartPoint')
    jest.spyOn(eventEl, 'setEndPoint')

    eventEl.eventListener(domEvt)

    expect(eventEl.setStartPoint).toHaveBeenCalledWith(domEvt.clientX, domEvt.clientY, domEvt.target, undefined)
    expect(eventEl.setEndPoint).toHaveBeenCalledWith(domEvt.clientX, domEvt.clientY, domEvt.target, undefined)
    expect(evtHandler).toHaveBeenCalledWith(eventEl, domEvt)
  })

  it('6 GenericEvt - set method executes addEventListener for the element of the defined evtType', () => {
    let testElement = document.createElement("div")
    let eventEl = new GenericEvt(testElement, 'fooEvtHandler', 'click')
    jest.spyOn(testElement, 'addEventListener')

    eventEl.set()
    expect(testElement.addEventListener).toHaveBeenCalledWith('click', expect.anything(), expect.anything())
  })

  it('7 GenericEvt - remove method executes removeEventListener for the element of the defined evtType', () => {
    let testElement = document.createElement("div")
    let eventEl = new GenericEvt(testElement, 'fooEvtHandler', 'click')
    jest.spyOn(testElement, 'removeEventListener')

    eventEl.remove()
    expect(testElement.removeEventListener).toHaveBeenCalledWith('click', expect.anything(), expect.anything())
  })

  it('8 GenericEvt - static listen method sets addEventListener for each node according to the selector ', () => {
    let testElement = document.createElement("div")
    let testElement2 = document.createElement("div")
    let testElement3 = document.createElement("a")

    document.body.appendChild(testElement)
    document.body.appendChild(testElement2)
    document.body.appendChild(testElement3)

    let evtHandler = jest.fn(() => {})

    jest.spyOn(testElement, 'addEventListener')
    jest.spyOn(testElement2, 'addEventListener')
    jest.spyOn(testElement3, 'addEventListener')

    GenericEvt.listen('div', evtHandler, 'click')

    expect(testElement.addEventListener).toHaveBeenCalledWith('click', expect.anything(), expect.anything())
    expect(testElement2.addEventListener).toHaveBeenCalledWith('click', expect.anything(), expect.anything())
    expect(testElement3.addEventListener).not.toHaveBeenCalled()
  })

})