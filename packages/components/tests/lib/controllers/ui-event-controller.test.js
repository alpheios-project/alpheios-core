/* eslint-env jest */
import UIEventController from '@comp/lib/controllers/ui-event-controller.js'

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

  it('UIEventController.listenerNames: should return names of all registered listeners', () => {
    const testEvent = jest.fn()
    const listenerNameOne = 'Listener One'
    const listenerNameTwo = 'Listener Two'
    evc.registerListener(listenerNameOne, document, () => {}, testEvent)
    evc.registerListener(listenerNameTwo, document, () => {}, testEvent)
    expect(evc.listenerNames).toEqual([listenerNameOne, listenerNameTwo])
  })

  it('UIEventController.registerListener: if called for HTML node should add a single listener object', () => {
    const testEvent = jest.fn()
    evc.registerListener(listenerName, document, () => {}, testEvent, 'param A', 'param B')
    expect(evc.listenerNames).toEqual([listenerName])
  })

  it('UIEventController.registerListener: if called for HTML node should create an Event object and pass parameters correctly to it', () => {
    const testEvent = jest.fn()
    const evtHanlder = () => {}
    evc.registerListener(listenerName, document, evtHanlder, testEvent, 'param A', 'param B')
    expect(testEvent).toBeCalledWith(document, evtHanlder, 'param A', 'param B')
  })

  it('UIEventController.registerListener: if called for a CSS selector should add two listener objects', () => {
    const testEvent = jest.fn()
    evc.registerListener(listenerName, `.${className}`, () => {}, testEvent, 'param A', 'param B')
    expect(evc._listeners.get(listenerName).events).toEqual([{}, {}])
  })

  it('UIEventController.registerListener: if called for a CSS selector should pass parameters to Events object correctly', () => {
    const testEvent = jest.fn()
    const evtHanlder = () => {}
    evc.registerListener(listenerName, `.${className}`, evtHanlder, testEvent, 'param A', 'param B')
    expect(testEvent).lastCalledWith(div, evtHanlder, 'param A', 'param B')
  })

  it('UIEventController.unregisterListener: should remove a listener that was registered previously', () => {
    const testEvent = jest.fn().mockImplementation(() => {
      return {
        remove: () => {}
      }
    })
    evc.registerListener(listenerName, document, () => {}, testEvent)
    expect(evc.listenerNames).toEqual([listenerName]) // To verify that the listener is registered
    evc.unregisterListener(listenerName)
    expect(evc.listenerNames).toEqual([]) // To verify that the listener is unregistered
  })

  it('UIEventController.unregisterListener: should call remove() function of an activated event', () => {
    const removeFn = jest.fn()
    const testEvent = jest.fn().mockImplementation(() => {
      return {
        set: () => {},
        remove: removeFn
      }
    })
    evc.registerListener(listenerName, document, () => {}, testEvent)
    evc.activateListener(listenerName)
    expect(evc.listenerNames).toEqual([listenerName]) // To verify that the listener is registered
    evc.unregisterListener(listenerName)
    expect(removeFn).toBeCalledTimes(1)
  })

  it('UIEventController.updateEvent: should replace all events of the listener with the other events', () => {
    const eventOneName = 'Event One'
    const testEventOne = jest.fn().mockImplementation(() => {
      return {
        name: eventOneName
      }
    })
    const eventTwoName = 'Event Two'
    const testEventTwo = jest.fn().mockImplementation(() => {
      return {
        name: eventTwoName
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, testEventOne, 'param A', 'param B')
    expect(evc._listeners.get(listenerName).events.map(e => e.name)).toEqual([eventOneName, eventOneName])
    evc.updateEvent(listenerName, testEventTwo, 'param C')
    expect(evc._listeners.get(listenerName).events.map(e => e.name)).toEqual([eventTwoName, eventTwoName])
  })

  it('UIEventController.updateEvent: should use updated parameters for an event being replaced', () => {
    const testEventOne = jest.fn().mockImplementation(() => {
      return {}
    })
    const testEventTwo = jest.fn().mockImplementation(() => {
      return {}
    })
    const evtHandler = () => {}
    evc.registerListener(listenerName, `.${className}`, evtHandler, testEventOne, 'param A', 'param B')
    expect(testEventTwo).toHaveBeenCalledTimes(0)
    const paramC = 'param C'
    evc.updateEvent(listenerName, testEventTwo, paramC)
    expect(testEventTwo).toHaveBeenCalledTimes(2)
    expect(testEventTwo).toHaveBeenNthCalledWith(1, expect.anything(), evtHandler, paramC)
    expect(testEventTwo).toHaveBeenNthCalledWith(2, expect.anything(), evtHandler, paramC)
  })

  it('UIEventController.updateEvent: replacement events should have the same state as the ones they\'ve replaced', () => {
    const eventOneName = 'Event One'
    const testEventOne = jest.fn().mockImplementation(() => {
      return {
        name: eventOneName,
        set: () => {},
        remove: () => {}
      }
    })
    const eventTwoName = 'Event Two'
    const testEventTwo = jest.fn().mockImplementation(() => {
      return {
        name: eventTwoName,
        set: () => {},
        remove: () => {}
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, testEventOne, 'param A', 'param B')
    expect(evc._listeners.get(listenerName).events[0].name).toEqual(eventOneName)
    expect(evc._listeners.get(listenerName).activated).toBeFalsy()
    evc.updateEvent(listenerName, testEventTwo, 'param C')
    expect(evc._listeners.get(listenerName).events[0].name).toEqual(eventTwoName)
    expect(evc._listeners.get(listenerName).activated).toBeFalsy()
    evc.activateListener(listenerName)
    expect(evc._listeners.get(listenerName).events[0].name).toEqual(eventTwoName)
    expect(evc._listeners.get(listenerName).activated).toBeTruthy()
    evc.updateEvent(listenerName, testEventOne, 'param A')
    expect(evc._listeners.get(listenerName).events[0].name).toEqual(eventOneName)
    expect(evc._listeners.get(listenerName).activated).toBeTruthy()
  })

  it('UIEventController.updateEventParams: should replace params of all registered events', () => {
    const initialParams = ['param A', 'param B']
    const replacementParams = ['param A', 'param B']
    const updateParamsFn = jest.fn()
    const testEventOne = jest.fn().mockImplementation(() => {
      return {
        updateParams: updateParamsFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, testEventOne, ...initialParams)
    evc.updateEventParams(listenerName, ...replacementParams)
    expect(updateParamsFn).toBeCalledTimes(2)
    expect(updateParamsFn).toHaveBeenNthCalledWith(1, ...replacementParams)
    expect(updateParamsFn).toHaveBeenNthCalledWith(2, ...replacementParams)
  })

  it('UIEventController.activateListener: should call a set() method on all event objects', () => {
    const setlFn = jest.fn()
    const testEvent = jest.fn().mockImplementation(() => {
      return {
        set: setlFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, testEvent)
    evc.activateListener(listenerName)
    expect(setlFn).toBeCalledTimes(2)
  })

  it('UIEventController.activateListeners: should call a set() method on all event objects of all listeners', () => {
    const setlFn = jest.fn()
    const testEvent = jest.fn().mockImplementation(() => {
      return {
        set: setlFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, testEvent)
    evc.registerListener('Document Listener', document, () => {}, testEvent)
    evc.activateListeners()
    expect(setlFn).toBeCalledTimes(3)
  })

  it('UIEventController.deactivateListener: should call a remove() method on all activated event objects', () => {
    const removeFn = jest.fn()
    const testEvent = jest.fn().mockImplementation(() => {
      return {
        set: () => {},
        remove: removeFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, testEvent)
    evc.activateListener(listenerName)
    evc.deactivateListener(listenerName)
    expect(removeFn).toBeCalledTimes(2)
  })

  it('UIEventController.deactivateListener: should never call a remove() method if a registered listener was not activated', () => {
    const removeFn = jest.fn()
    const testEvent = jest.fn().mockImplementation(() => {
      return {
        remove: removeFn
      }
    })
    evc.registerListener(listenerName, `.${className}`, () => {}, testEvent)
    evc.deactivateListener(listenerName)
    expect(removeFn).toBeCalledTimes(0)
  })

  it('UIEventController.deactivateListeners: should call a remove() method on all event objects of all activated listeners', () => {
    const removeFn = jest.fn()
    const testEvent = jest.fn().mockImplementation(() => {
      return {
        set: () => {},
        remove: removeFn
      }
    })
    const docListenerName = 'Document Listener'
    evc.registerListener(listenerName, `.${className}`, () => {}, testEvent)
    evc.activateListener(listenerName)
    evc.registerListener(docListenerName, document, () => {}, testEvent)
    evc.activateListener(docListenerName)
    evc.deactivateListeners()
    expect(removeFn).toBeCalledTimes(3)
  })

  it('UIEventController.deactivateListeners: should call a remove() method on all event objects of activated listeners only', () => {
    const removeFn = jest.fn()
    const testEvent = jest.fn().mockImplementation(() => {
      return {
        set: () => {},
        remove: removeFn
      }
    })
    const docListenerName = 'Document Listener'
    evc.registerListener(listenerName, `.${className}`, () => {}, testEvent)
    evc.registerListener(docListenerName, document, () => {}, testEvent)
    evc.activateListener(docListenerName)
    evc.deactivateListeners()
    expect(removeFn).toBeCalledTimes(1)
  })
})
