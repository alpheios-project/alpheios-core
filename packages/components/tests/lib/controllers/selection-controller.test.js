/* eslint-env jest */
import SelectionController from '@comp/lib/controllers/selection-controller.js'
import UIEventController from '@comp/lib/controllers/ui-event-controller.js'
import MouseDblClick from '@comp/lib/custom-pointer-events/mouse-dbl-click.js'

describe('SelectionController', () => {
  let selC

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('SelectionController - constructor: should create an instance with default arguments', () => {
    selC = new SelectionController()
    expect(selC._evc).toBeInstanceOf(UIEventController)
    expect(selC._getDefaultLangCode).toBeInstanceOf(Function)
  })

  it('SelectionController - constructor: should create an instance with a specified language function', () => {
    const langFn = jest.fn(() => 'grc')
    selC = new SelectionController({ getDefaultLangCodeFn: langFn })
    expect(selC._getDefaultLangCode).toBe(langFn)
  })

  it('SelectionController - registerSelector: should register a single text selector', () => {
    const selectorName = 'Test Selector'
    const selector = '.selector'
    const eventConstructor = MouseDblClick
    const eventParms = {}
    selC = new SelectionController()
    const registerListenerSpy = jest.spyOn(selC._evc, 'registerListener')
    selC.registerSelector(selectorName, selector, eventConstructor, eventParms)
    expect(registerListenerSpy).toBeCalledTimes(1)
    expect(registerListenerSpy).toBeCalledWith(selectorName, selector, expect.any(Function), eventConstructor, eventParms)
  })

  it('SelectionController - replaceEventForAll: should update events for all registered selectors', () => {
    const selectorName = 'Test Selector'
    const selectorNameTwo = 'Test Selector Two'
    const selector = '.selector'
    const selectorTwo = '.selectorTwo'
    const eventConstructor = MouseDblClick
    const eventParms = {}
    selC = new SelectionController()
    const updateEventSpy = jest.spyOn(selC._evc, 'updateEvent')
    selC.registerSelector(selectorName, selector, eventConstructor, eventParms)
    selC.registerSelector(selectorNameTwo, selectorTwo, eventConstructor, eventParms)
    selC.replaceEventForAll(eventConstructor, eventParms)
    expect(updateEventSpy).toBeCalledTimes(2)
    expect(updateEventSpy).toBeCalledWith(selectorName, eventConstructor, eventParms)
    expect(updateEventSpy).toBeCalledWith(selectorNameTwo, eventConstructor, eventParms)
  })

  it('SelectionController - updateParams: should update event parameters of a single text selector', () => {
    const selectorName = 'Test Selector'
    const selector = '.selector'
    const eventConstructor = MouseDblClick
    const eventParms = {}
    const eventParmsTwo = { param: 'value' }
    selC = new SelectionController()
    const updateEventParamsSpy = jest.spyOn(selC._evc, 'updateEventParams')
    selC.registerSelector(selectorName, selector, eventConstructor, eventParms)
    selC.updateParams(selectorName, eventParmsTwo)
    expect(updateEventParamsSpy).toBeCalledTimes(1)
    expect(updateEventParamsSpy).toBeCalledWith(selectorName, eventParmsTwo)
  })

  it('SelectionController - updateParamsForAll: should update event parameters of all registered selectors', () => {
    const selectorName = 'Test Selector'
    const selectorNameTwo = 'Test Selector Two'
    const selector = '.selector'
    const selectorTwo = '.selectorTwo'
    const eventConstructor = MouseDblClick
    const eventParms = {}
    const eventParmsTwo = { param: 'value' }
    selC = new SelectionController()
    const updateEventParamsSpy = jest.spyOn(selC._evc, 'updateEventParams')
    selC.registerSelector(selectorName, selector, eventConstructor, eventParms)
    selC.registerSelector(selectorNameTwo, selectorTwo, eventConstructor, eventParms)
    selC.updateParamsForAll(eventParmsTwo)
    expect(updateEventParamsSpy).toBeCalledTimes(2)
    expect(updateEventParamsSpy).toBeCalledWith(selectorName, eventParmsTwo)
    expect(updateEventParamsSpy).toBeCalledWith(selectorNameTwo, eventParmsTwo)
  })

  it('SelectionController - activateSelector: should activate a specific text selector', () => {
    const selectorName = 'Test Selector'
    const selector = '.selector'
    const eventConstructor = MouseDblClick
    const eventParms = {}
    selC = new SelectionController()
    const activateListenerSpy = jest.spyOn(selC._evc, 'activateListener')
    selC.registerSelector(selectorName, selector, eventConstructor, eventParms)
    selC.activateSelector(selectorName)
    expect(activateListenerSpy).toBeCalledTimes(1)
    expect(activateListenerSpy).toBeCalledWith(selectorName)
  })

  it('SelectionController - activate: should activate all registered text selectors', () => {
    const selectorName = 'Test Selector'
    const selectorNameTwo = 'Test Selector Two'
    const selector = '.selector'
    const selectorTwo = '.selectorTwo'
    const eventConstructor = MouseDblClick
    const eventParms = {}
    selC = new SelectionController()
    const activateListenersSpy = jest.spyOn(selC._evc, 'activateListeners')
    selC.registerSelector(selectorName, selector, eventConstructor, eventParms)
    selC.registerSelector(selectorNameTwo, selectorTwo, eventConstructor, eventParms)
    selC.activate()
    expect(activateListenersSpy).toBeCalledTimes(1)
    expect(activateListenersSpy).toBeCalledWith()
  })

  it('SelectionController - deactivateSelector: should deactivate a specific text selector', () => {
    const selectorName = 'Test Selector'
    const selector = '.selector'
    const eventConstructor = MouseDblClick
    const eventParms = {}
    selC = new SelectionController()
    const deactivateListenerSpy = jest.spyOn(selC._evc, 'deactivateListener')
    selC.registerSelector(selectorName, selector, eventConstructor, eventParms)
    selC.deactivateSelector(selectorName)
    expect(deactivateListenerSpy).toBeCalledTimes(1)
    expect(deactivateListenerSpy).toBeCalledWith(selectorName)
  })

  it('SelectionController - deactivate: should deactivate all registered text selectors', () => {
    const selectorName = 'Test Selector'
    const selectorNameTwo = 'Test Selector Two'
    const selector = '.selector'
    const selectorTwo = '.selectorTwo'
    const eventConstructor = MouseDblClick
    const eventParms = {}
    selC = new SelectionController()
    const deactivateListenersSpy = jest.spyOn(selC._evc, 'deactivateListeners')
    selC.registerSelector(selectorName, selector, eventConstructor, eventParms)
    selC.registerSelector(selectorNameTwo, selectorTwo, eventConstructor, eventParms)
    selC.deactivate()
    expect(deactivateListenersSpy).toBeCalledTimes(1)
    expect(deactivateListenersSpy).toBeCalledWith()
  })

  it('SelectionController - onTextSelected: should publish a TEXT_SELECTED event', () => {
    let event = new Event('test') // eslint-disable-line prefer-const
    // target.ownerDocument.location.href
    event.end = {
      target: {
        textContent: 'mare',
        ownerDocument: {
          location: {
            href: 'test.com'
          },
          getSelection: () => 'test',
          querySelector: () => 'test'
        },
        dataset: {}
      },
      client: {
        x: 0,
        y: 0
      }
    }
    const domEvent = {}
    selC = new SelectionController()
    const textSelectedSpy = jest.spyOn(SelectionController.evt.TEXT_SELECTED, 'pub')
    
    selC.onTextSelected(event, domEvent)
    expect(textSelectedSpy).toBeCalledTimes(1)
    // Text selector will be undefined because a valid instance cannot be created from a test event
    expect(textSelectedSpy).toHaveBeenCalledWith({ textSelector: undefined, domEvent: domEvent })
  })
})
