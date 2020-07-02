/* eslint-env jest */
import UIEventController from '@/lib/controllers/ui-event-controller.js'

describe('ui-event-controller.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  let evc
  const listenerName = 'Test Listener'
  const className = 'test'
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
    expect(evc.listenerNames.length).toEqual(0)
  })

  it('UIEventController.registerListener: if called for HTML node should add a single listener object', () => {
    const TestEvent = jest.fn()
    evc.registerListener(listenerName, document, () => {}, TestEvent, 'param A', 'param B')
    expect(evc.listenerNames).toEqual([listenerName])
  })

  it('UIEventController.registerListener: if called for HTML node should create an Event object and pass parameters correctly to it', () => {
    const TestEvent = jest.fn()
    const evtHanlder = () => {}
    evc.registerListener(listenerName, document, evtHanlder, TestEvent, 'param A', 'param B')
    expect(TestEvent).toBeCalledWith(document, evtHanlder, 'param A', 'param B')
  })

  it('UIEventController.registerListener: if called for a CSS selector should add two listener objects', () => {
    const TestEvent = jest.fn()
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent, 'param A', 'param B')
    expect(evc._listeners.get(listenerName).events).toEqual([{}, {}])
  })

  it('UIEventController.registerListener: if called for a CSS selector should pass parameters to Events object correctly', () => {
    const TestEvent = jest.fn()
    const evtHanlder = () => {}
    evc.registerListener(listenerName, `.${className}`, evtHanlder, TestEvent, 'param A', 'param B')
    expect(TestEvent).lastCalledWith(div, evtHanlder, 'param A', 'param B')
  })

  it('UIEventController.unregisterListener: should remove a listener that was registered previously', () => {
    const TestEvent = jest.fn().mockImplementation(() => {
      return {
        remove: () => {}
      }
    })
    evc.registerListener(listenerName, document, () => {}, TestEvent)
    expect(evc.listenerNames).toEqual([listenerName]) // To verify that the listener is registered
    evc.unregisterListener(listenerName)
    expect(evc.listenerNames).toEqual([]) // To verify that the listener is unregistered
  })

  it('UIEventController.unregisterListener: should call remove() function of an activated event', () => {
    const removeFn = jest.fn()
    const TestEvent = jest.fn().mockImplementation(() => {
      return {
        set: () => {},
        remove: removeFn
      }
    })
    evc.registerListener(listenerName, document, () => {}, TestEvent)
    evc.activateListener(listenerName)
    expect(evc.listenerNames).toEqual([listenerName]) // To verify that the listener is registered
    evc.unregisterListener(listenerName)
    expect(removeFn).toBeCalledTimes(1)
  })

  it('UIEventController.activateListener: should call a set() method on all event objects', () => {
    const setlFn = jest.fn()
    const TestEvent = jest.fn().mockImplementation(() => {
      return {
        set: setlFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.activateListener(listenerName)
    expect(setlFn).toBeCalledTimes(2)
  })

  it('UIEventController.activateListeners: should call a set() method on all event objects of all listeners', () => {
    const setlFn = jest.fn()
    const TestEvent = jest.fn().mockImplementation(() => {
      return {
        set: setlFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.registerListener('Document Listener', document, () => {}, TestEvent)
    evc.activateListeners()
    expect(setlFn).toBeCalledTimes(3)
  })

  it('UIEventController.deactivateListener: should call a remove() method on all activated event objects', () => {
    const removeFn = jest.fn()
    const TestEvent = jest.fn().mockImplementation(() => {
      return {
        set: () => {},
        remove: removeFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.activateListener(listenerName)
    evc.deactivateListener(listenerName)
    expect(removeFn).toBeCalledTimes(2)
  })

  it('UIEventController.deactivateListener: should never call a remove() method if a registered listener was not activated', () => {
    const removeFn = jest.fn()
    const TestEvent = jest.fn().mockImplementation(() => {
      return {
        remove: removeFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.deactivateListener(listenerName)
    expect(removeFn).toBeCalledTimes(0)
  })

  it('UIEventController.deactivateListeners: should call a remove() method on all event objects of all activated listeners', () => {
    const removeFn = jest.fn()
    const TestEvent = jest.fn().mockImplementation(() => {
      return {
        set: () => {},
        remove: removeFn
      }
    })
    const docListenerName = 'Document Listener'
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.activateListener(listenerName)
    evc.registerListener(docListenerName, document, () => {}, TestEvent)
    evc.activateListener(docListenerName)
    evc.deactivateListeners()
    expect(removeFn).toBeCalledTimes(3)
  })

  it('UIEventController.deactivateListeners: should call a remove() method on all event objects of all listeners that are activated', () => {
    const removeFn = jest.fn()
    const TestEvent = jest.fn().mockImplementation(() => {
      return {
        set: () => {},
        remove: removeFn
      }
    })
    const docListenerName = 'Document Listener'
    evc.registerListener(listenerName, `.${className}`, () => {}, TestEvent)
    evc.registerListener(docListenerName, document, () => {}, TestEvent)
    evc.activateListener(docListenerName)
    evc.deactivateListeners()
    expect(removeFn).toBeCalledTimes(1)
  })
})
