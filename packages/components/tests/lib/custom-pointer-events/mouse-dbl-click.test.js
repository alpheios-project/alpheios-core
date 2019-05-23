/* eslint-env jest */
/* eslint-disable no-unused-vars */

import MouseDblClick from '@/lib/custom-pointer-events/mouse-dbl-click.js'

describe('mouse-dbl-click.test.js', () => {
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

  it('1 MouseDblClick - constructor creates an object with tracking, start, end', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new MouseDblClick(testElement, evtHandler)

    expect(eventEl.tracking).toBeFalsy()
    expect(eventEl.start.constructor.name).toEqual('EventElement')
    expect(eventEl.end.constructor.name).toEqual('EventElement')

    expect(eventEl.evtType).toEqual('dblclick')
    expect(eventEl.element).toEqual(testElement)
    expect(eventEl.evtHandler).toEqual(evtHandler)
  })

  it('2 MouseDblClick - static excludeCpeTest checks if DOMStringMap has alphExcludeDblClickCpe', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)
    
    expect(MouseDblClick.excludeCpeTest(testElement.dataset)).toBeFalsy()
    testElement.setAttribute('data-alph-exclude-dbl-click-cpe', 'yes')
    
    expect(MouseDblClick.excludeCpeTest(testElement.dataset)).toBeTruthy()
  })

  it('3 MouseDblClick - setEndPoint method retrurns true if it is not in excluded', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})
    let eventEl = new MouseDblClick(testElement, evtHandler)

    let res = eventEl.setEndPoint(10, 20, testElement)  
    expect(res).toBeTruthy()
  })

  it('4 MouseDblClick - setEndPoint method retrurns false if it is in excluded', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)

    testElementParent.setAttribute('data-alpheios-ignore', 'all')
    let evtHandler = jest.fn(() => {})
    let eventEl = new MouseDblClick(testElement, evtHandler)

    let res = eventEl.setEndPoint(10, 20, testElement)  
    expect(res).toBeFalsy()
  })

  it('5 MouseDblClick - eventListener method sets start and end point, and if both doesn\'t have excluded, it executes evtHandler', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)
    let evtHandler = jest.fn(() => {})

    let eventEl = new MouseDblClick(testElement, evtHandler)

    let domEvt = { clientX: 10, clientY: 120, target: testElement, stopPropagation: jest.fn(() => {}) }
    domEvt
    jest.spyOn(eventEl, 'setStartPoint')
    jest.spyOn(eventEl, 'setEndPoint')

    eventEl.eventListener(domEvt)

    expect(domEvt.stopPropagation).toHaveBeenCalled()

    expect(eventEl.setStartPoint).toHaveBeenCalledWith(domEvt.clientX, domEvt.clientY, domEvt.target, undefined)
    expect(eventEl.setEndPoint).toHaveBeenCalledWith(domEvt.clientX, domEvt.clientY, domEvt.target, undefined)
    expect(evtHandler).toHaveBeenCalledWith(eventEl, domEvt)
  })

  it('6 MouseDblClick - set method executes addEventListener for the element of the defined evtType', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})
    let eventEl = new MouseDblClick(testElement, evtHandler)
    jest.spyOn(testElement, 'addEventListener')

    eventEl.set()
    expect(testElement.addEventListener).toHaveBeenCalledWith('dblclick', expect.anything(), expect.anything())
  })

  it('7 MouseDblClick - remove method executes removeEventListener for the element of the defined evtType', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})
    let eventEl = new MouseDblClick(testElement, evtHandler)
    jest.spyOn(testElement, 'removeEventListener')

    eventEl.remove()
    expect(testElement.removeEventListener).toHaveBeenCalledWith('dblclick', expect.anything(), expect.anything())
  })

  it('8 MouseDblClick - static listen method sets addEventListener for each node according to the selector ', () => {
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

    MouseDblClick.listen('div', evtHandler)

    expect(testElement.addEventListener).toHaveBeenCalledWith('dblclick', expect.anything(), expect.anything())
    expect(testElement2.addEventListener).toHaveBeenCalledWith('dblclick', expect.anything(), expect.anything())
    expect(testElement3.addEventListener).not.toHaveBeenCalled()
  })
})