/* eslint-env jest */
/* eslint-disable no-unused-vars */

import LongTap from '@/lib/custom-pointer-events/long-tap.js'

describe('long-tap.test.js', () => {
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

  it('1 LongTap - constructor creates an object with tracking, start, end', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new LongTap(testElement, evtHandler)

    expect(eventEl.tracking).toBeFalsy()
    expect(eventEl.start.constructor.name).toEqual('EventElement')
    expect(eventEl.end.constructor.name).toEqual('EventElement')

    expect(eventEl.element).toEqual(testElement)
    expect(eventEl.evtHandler).toEqual(evtHandler)
  })

  it('2 LongTap - constructor defines ponter properties if window.PointerEvent = true', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    window.PointerEvent = true
    let eventEl = new LongTap(testElement, evtHandler)
    
    expect(eventEl.evtStartType).toEqual('pointerdown')
    expect(eventEl.evtEndType).toEqual('pointerup')
    expect(eventEl.boundStartListener.constructor).toEqual(eventEl.constructor.pointerDownListener.constructor)
    expect(eventEl.boundEndListener.constructor).toEqual(eventEl.constructor.pointerUpListener.constructor)
  })

  it('3 LongTap - constructor defines touch properties if window.PointerEvent = false', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    window.PointerEvent = false
    let eventEl = new LongTap(testElement, evtHandler)
    
    expect(eventEl.evtStartType).toEqual('touchstart')
    expect(eventEl.evtEndType).toEqual('touchend')
    expect(eventEl.boundStartListener.constructor).toEqual(eventEl.constructor.touchStartListener.constructor)
    expect(eventEl.boundEndListener.constructor).toEqual(eventEl.constructor.touchEndListener.constructor)
  })

  it('4 LongTap - constructor sets mvmntThreshold (default = 5)', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new LongTap(testElement, evtHandler)
    expect(eventEl.mvmntThreshold).toEqual(5)

    let eventEl2 = new LongTap(testElement, evtHandler, 10)
    expect(eventEl2.mvmntThreshold).toEqual(10)
  })

  it('5 LongTap - constructor sets durationThreshold (default = 125)', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new LongTap(testElement, evtHandler, 5)
    expect(eventEl.durationThreshold).toEqual(125)

    let eventEl2 = new LongTap(testElement, evtHandler, 10, 200)
    expect(eventEl2.durationThreshold).toEqual(200)
  })

  it('6 LongTap - static excludeCpeTest checks if DOMStringMap has alphExcludeLongTapCpe', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)
    
    expect(LongTap.excludeCpeTest(testElement.dataset)).toBeFalsy()
    testElement.setAttribute('data-alph-exclude-long-tap-cpe', 'yes')
    
    expect(LongTap.excludeCpeTest(testElement.dataset)).toBeTruthy()
  })

  it('7 LongTap - setEndPoint method retrurns true if it is not in excluded and is completed', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})
    let eventEl = new LongTap(testElement, evtHandler)

    eventEl.setStartPoint(10, 20, testElement)
    eventEl.start.time = 10 // to make duration more
    let res = eventEl.setEndPoint(12, 22, testElement)  
    expect(res).toBeTruthy()
  })

  it('8 LongTap - setEndPoint method retrurns false if it is not in excluded, but start end point are too far from each other', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})
    let eventEl = new LongTap(testElement, evtHandler)

    eventEl.setStartPoint(10, 20, testElement)
    eventEl.start.time = 10 // to make duration more
    let res = eventEl.setEndPoint(100, 200, testElement)  
    expect(res).toBeFalsy()
  })

  it('9 LongTap - setEndPoint method retrurns false if it is not in excluded, but duration between start and end too small', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})
    let eventEl = new LongTap(testElement, evtHandler)

    eventEl.setStartPoint(10, 20, testElement)
    let res = eventEl.setEndPoint(12, 22, testElement)  
    expect(res).toBeFalsy()
  })

  it('10 LongTap - setEndPoint method retrurns false if it is in excluded', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)

    testElementParent.setAttribute('data-alpheios-ignore', 'all')
    let evtHandler = jest.fn(() => {})
    let eventEl = new LongTap(testElement, evtHandler)

    eventEl.setStartPoint(10, 20, testElement)
    eventEl.start.time = 10 // to make duration more
    let res = eventEl.setEndPoint(10, 20, testElement)  
    expect(res).toBeFalsy()
  })

  it('11 LongTap - set method executes addEventListener for the element to the evtStartType and evtEndType', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    window.PointerEvent = true
    let eventEl = new LongTap(testElement, evtHandler)
    jest.spyOn(testElement, 'addEventListener')

    eventEl.set()
    expect(testElement.addEventListener).toHaveBeenCalledWith('pointerdown', expect.anything(), expect.anything())
    expect(testElement.addEventListener).toHaveBeenCalledWith('pointerup', expect.anything(), expect.anything())
  })
  
  it('12 LongTap - set method executes removeEventListener for the element to the evtStartType and evtEndType', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})
    window.PointerEvent = true

    let eventEl = new LongTap(testElement, evtHandler)
    jest.spyOn(testElement, 'removeEventListener')

    eventEl.remove()
    expect(testElement.removeEventListener).toHaveBeenCalledWith('pointerdown', expect.anything(), expect.anything())
    expect(testElement.removeEventListener).toHaveBeenCalledWith('pointerup', expect.anything(), expect.anything())
  })

  it('13 LongTap - static listen method sets addEventListener for each node according to the selector ', () => {
    let testElement = document.createElement("div")
    let testElement2 = document.createElement("div")
    let testElement3 = document.createElement("a")

    document.body.appendChild(testElement)
    document.body.appendChild(testElement2)
    document.body.appendChild(testElement3)

    window.PointerEvent = true
    let evtHandler = jest.fn(() => {})

    jest.spyOn(testElement, 'addEventListener')
    jest.spyOn(testElement2, 'addEventListener')
    jest.spyOn(testElement3, 'addEventListener')

    LongTap.listen('div', evtHandler)

    expect(testElement.addEventListener).toHaveBeenCalledWith('pointerdown', expect.anything(), expect.anything())
    expect(testElement.addEventListener).toHaveBeenCalledWith('pointerup', expect.anything(), expect.anything())
    expect(testElement2.addEventListener).toHaveBeenCalledWith('pointerdown', expect.anything(), expect.anything())
    expect(testElement2.addEventListener).toHaveBeenCalledWith('pointerup', expect.anything(), expect.anything())
    expect(testElement3.addEventListener).not.toHaveBeenCalled()
  })
})