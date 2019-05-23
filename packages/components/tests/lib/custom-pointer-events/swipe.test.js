/* eslint-env jest */
/* eslint-disable no-unused-vars */

import Swipe from '@/lib/custom-pointer-events/swipe.js'

describe('swipe.test.js', () => {
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

  it('1 Swipe - constructor creates an object with tracking, start, end', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)

    expect(eventEl.tracking).toBeFalsy()
    expect(eventEl.start.constructor.name).toEqual('EventElement')
    expect(eventEl.end.constructor.name).toEqual('EventElement')

    expect(eventEl.element).toEqual(testElement)
    expect(eventEl.evtHandler).toEqual(evtHandler)
    expect(eventEl.direction).toEqual('none')
  })

  it('2 Swipe - constructor sets mvmntThreshold (default = 100)', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)
    expect(eventEl.mvmntThreshold).toEqual(100)

    let eventEl2 = new Swipe(testElement, evtHandler, 10)
    expect(eventEl2.mvmntThreshold).toEqual(10)
  })

  it('3 Swipe - constructor sets durationThreshold (default = 600)', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler, 5)
    expect(eventEl.durationThreshold).toEqual(600)

    let eventEl2 = new Swipe(testElement, evtHandler, 10, 200)
    expect(eventEl2.durationThreshold).toEqual(200)
  })

  it('4 Swipe - static excludeCpeTest checks if DOMStringMap has alphExcludeSwipeCpe', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)
    
    expect(Swipe.excludeCpeTest(testElement.dataset)).toBeFalsy()
    testElement.setAttribute('data-alph-exclude-swipe-cpe', 'yes')
    
    expect(Swipe.excludeCpeTest(testElement.dataset)).toBeTruthy()
  })

  it('5 Swipe - static directions defines values for UP, RIGHT, DOWN, LEFT, NONE', () => {
    expect(Swipe.directions.UP).toBeDefined()
    expect(Swipe.directions.RIGHT).toBeDefined()
    expect(Swipe.directions.DOWN).toBeDefined()
    expect(Swipe.directions.LEFT).toBeDefined()
    expect(Swipe.directions.NONE).toBeDefined()
  })

  it('6 Swipe - isDirectedUp checks if direction is equal UP', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)
    eventEl.direction = Swipe.directions.UP

    expect(eventEl.isDirectedUp()).toBeTruthy()
  })

  it('7 Swipe - isDirectedRight checks if direction is equal RIGHT', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)
    eventEl.direction = Swipe.directions.RIGHT

    expect(eventEl.isDirectedRight()).toBeTruthy()
  })

  it('8 Swipe - isDirectedDown checks if direction is equal DOWN', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)
    eventEl.direction = Swipe.directions.DOWN

    expect(eventEl.isDirectedDown()).toBeTruthy()
  })

  it('9 Swipe - isDirectedLeft checks if direction is equal LEFT', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)
    eventEl.direction = Swipe.directions.LEFT

    expect(eventEl.isDirectedLeft()).toBeTruthy()
  })

  it('10 Swipe - setEndPoint method returns true if it is not in excluded and is completed', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)

    eventEl.setStartPoint(10, 20, testElement)
    let res = eventEl.setEndPoint(200, 22, testElement)  

    expect(res).toBeTruthy()
  })

  it('11 Swipe - setEndPoint method returns false if it is in excluded', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)

    let testElementParent = document.createElement("div")
    testElementParent.appendChild(testElement)

    testElementParent.setAttribute('data-alpheios-ignore', 'all')
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)

    eventEl.setStartPoint(10, 20, testElement)
    let res = eventEl.setEndPoint(200, 22, testElement)  

    expect(res).toBeFalsy()
  })

  it('12 Swipe - setEndPoint method returns false if it is not in excluded and is not completed - start and end to close to each other', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)

    eventEl.setStartPoint(10, 20, testElement)
    let res = eventEl.setEndPoint(20, 22, testElement)  

    expect(res).toBeFalsy()
  })

  it('13 Swipe - setEndPoint method defines direction if is completed - to right', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)

    eventEl.setStartPoint(10, 20, testElement)
    let res = eventEl.setEndPoint(200, 22, testElement)  

    expect(eventEl.isDirectedRight()).toBeTruthy()
  })

  it('14 Swipe - setEndPoint method defines direction if is completed - to left', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)

    eventEl.setStartPoint(200, 20, testElement)
    let res = eventEl.setEndPoint(10, 22, testElement)  

    expect(eventEl.isDirectedLeft()).toBeTruthy()
  })

  it('15 Swipe - setEndPoint method defines direction if is completed - to down', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)

    eventEl.setStartPoint(10, 20, testElement)
    let res = eventEl.setEndPoint(10, 220, testElement)  

    expect(eventEl.isDirectedDown()).toBeTruthy()
  })

  it('16 Swipe - setEndPoint method defines direction if is completed - to up', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new Swipe(testElement, evtHandler)

    eventEl.setStartPoint(10, 200, testElement)
    let res = eventEl.setEndPoint(10, 20, testElement)  

    expect(eventEl.isDirectedUp()).toBeTruthy()
  })

  it('17 Swipe - static listen method sets addUpDownListeners for each node according to the selector ', () => {
    let testElement = document.createElement("div")
    let testElement2 = document.createElement("div")
    let testElement3 = document.createElement("a")

    document.body.appendChild(testElement)
    document.body.appendChild(testElement2)
    document.body.appendChild(testElement3)

    let evtHandler = jest.fn(() => {})

    jest.spyOn(Swipe, 'addUpDownListeners')
    jest.spyOn(Swipe, 'addUpDownListeners')
    jest.spyOn(Swipe, 'addUpDownListeners')

    Swipe.listen('div', evtHandler)

    expect(Swipe.addUpDownListeners).toHaveBeenCalledWith(testElement, expect.anything())
    expect(Swipe.addUpDownListeners).toHaveBeenCalledWith(testElement2, expect.anything())
    expect(Swipe.addUpDownListeners).not.toHaveBeenCalledWith(testElement3, expect.anything())
  })
})