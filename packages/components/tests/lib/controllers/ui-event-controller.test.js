/* eslint-env jest */
import UIEventController from '@/lib/controllers/ui-event-controller.js'

describe('ui-event-controller.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  let evc
  let listenerName = `Test Listener`
  let className = `test`
  let p
  let div

  beforeAll(() => {
    p = document.createElement('p')
    p.classList.add(className)
    document.body.appendChild(p)
    div = document.createElement('div')
    div.classList.add(className)
    document.body.appendChild(div)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    evc = new UIEventController()

    jest.spyOn(console, 'warn')
  })

  afterEach(() => {
    jest.resetModules()
  })

  it('UIEventController: should be created and listeners map should be empty', () => {
    expect(evc.listeners.size).toEqual(0)
  })

  it('UIEventController.registerListener: if called for HTML node should add a single listener object', () => {
    let TestEvent = jest.fn()
    evc.registerListener(listenerName, document, () => {}, TestEvent, `param A`, `param B`)
    expect(evc.listeners.get(listenerName)).toEqual([{}])
  })

  it('UIEventController.registerListener: if called for HTML node should create an Event object and pass parameters correctly to it', () => {
    let TestEvent = jest.fn()
    let evtHanlder = () => {}
    evc.registerListener(listenerName, document, evtHanlder, TestEvent, `param A`, `param B`)
    expect(TestEvent).toBeCalledWith(document, evtHanlder, `param A`, `param B`)
  })

  it('UIEventController.registerListener: if called for a CSS selector should add two listener objects', () => {
    let TestEvent = jest.fn()
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent, `param A`, `param B`)
    expect(evc.listeners.get(listenerName)).toEqual([{}, {}])
  })

  it('UIEventController.registerListener: if called for a CSS selector should pass parameters to Events object correctly', () => {
    let TestEvent = jest.fn()
    let evtHanlder = () => {}
    evc.registerListener(listenerName, `.${className}`, evtHanlder, TestEvent, `param A`, `param B`)
    expect(TestEvent).lastCalledWith(div, evtHanlder, `param A`, `param B`)
  })

  it('UIEventController.unregisterListener: should remove a listener that was registered previously', () => {
    let TestEvent = jest.fn().mockImplementation(() => {
      return {
        remove: () => {}
      }
    })
    evc.registerListener(listenerName, document, () => {}, TestEvent)
    expect(evc.listeners.get(listenerName)).toBeTruthy() // To verify that the listener is registered
    evc.unregisterListener(listenerName)
    expect(evc.listeners.get(listenerName)).toBeFalsy() // To verify that the listener is unregistered
  })

  it('UIEventController.unregisterListener: should call remove() function of an event', () => {
    let removeFn = jest.fn()
    let TestEvent = jest.fn().mockImplementation(() => {
      return {
        remove: removeFn
      }
    })
    evc.registerListener(listenerName, document, () => {}, TestEvent)
    expect(evc.listeners.get(listenerName)).toBeTruthy() // To verify that the listener is registered
    evc.unregisterListener(listenerName)
    expect(removeFn).toBeCalledTimes(1)
  })

  it('UIEventController.activateListener: should call a set() method on all event objects', () => {
    let setlFn = jest.fn()
    let TestEvent = jest.fn().mockImplementation(() => {
      return {
        set: setlFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.activateListener(listenerName)
    expect(setlFn).toBeCalledTimes(2)
  })

  it('UIEventController.activateListeners: should call a set() method on all event objects of all listeners', () => {
    let setlFn = jest.fn()
    let TestEvent = jest.fn().mockImplementation(() => {
      return {
        set: setlFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.registerListener(`Document Listener`, document, () => {}, TestEvent)
    evc.activateListeners()
    expect(setlFn).toBeCalledTimes(3)
  })

  it('UIEventController.deactivateListener: should call a remove() method on all event objects', () => {
    let removeFn = jest.fn()
    let TestEvent = jest.fn().mockImplementation(() => {
      return {
        remove: removeFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.deactivateListener(listenerName)
    expect(removeFn).toBeCalledTimes(2)
  })

  it('UIEventController.deactivateListeners: should call a remove() method on all event objects of all listeners', () => {
    let removeFn = jest.fn()
    let TestEvent = jest.fn().mockImplementation(() => {
      return {
        remove: removeFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.registerListener(`Document Listener`, document, () => {}, TestEvent)
    evc.deactivateListeners()
    expect(removeFn).toBeCalledTimes(3)
  })
})
