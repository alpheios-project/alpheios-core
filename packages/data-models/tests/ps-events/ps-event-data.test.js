/* eslint-env jest */
import PsEvent from '../../src/ps-events/ps-event.js'
import PsEventData from '../../src/ps-events/ps-event-data.js'

describe('event-data.test.js', () => {
  const eventName = `Test event`
  const publisherName = `Publisher name`
  let event

  beforeAll(() => {
    event = new PsEvent(eventName, { name: publisherName })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.resetModules()
  })

  it('Constructor: should create a properly initialized EventData instance', () => {
    const callerName = 'Caller name'
    expect(new PsEventData(event, callerName)).toEqual({ name: eventName, publisher: publisherName, caller: callerName })
  })

  it('Constructor (with default values): should create an initialized EventData instance with default values set correctly', () => {
    expect(new PsEventData(event)).toEqual({ name: eventName, publisher: publisherName, caller: '' })
  })

  it('Description getter: for a fully initialized event data object', () => {
    const callerName = 'Caller name'
    const descriptionString = 'Publisher name.Caller name -> [Test event]'

    const psEventData = new PsEventData(event, callerName)
    expect(psEventData.description).toEqual(descriptionString)
  })

  it('Description getter: for an event data object created with default parameters', () => {
    const descriptionString = 'Publisher name -> [Test event]'

    const psEventData = new PsEventData(event)
    expect(psEventData.description).toEqual(descriptionString)
  })
})
