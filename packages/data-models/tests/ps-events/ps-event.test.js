/* eslint-env jest */
import Event from '../../src/ps-events/ps-event.js'
import EventData from '../../src/ps-events/ps-event-data.js'

describe('event.test.js', () => {
  const eventName = `Test event`
  const publisherName = `Publisher name`
  let event
  let subscriber

  beforeAll(() => {
    subscriber = jest.fn()
  })

  afterAll(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  beforeEach(() => {
    event = new Event(eventName, { name: publisherName })
    event.sub(subscriber)
  })

  afterEach(() => {
    subscriber.mockClear()
  })

  it('Event constructor: should create a properly initialized Event instance', () => {
    // Test only public methods of Event here
    expect(event).toMatchObject({
      name: eventName,
      publisher: publisherName
    })
  })

  it('Event.subscribers: should register a subscriber function', () => {
    expect(event.subscribers).toContain(subscriber)
  })

  it('Event.sub: should register a subscriber function', () => {
    const anotherSubscriber = () => {}
    event.sub(anotherSubscriber)
    expect(event.subscribers).toContain(anotherSubscriber)
  })

  it('Event.sub: should return an unsubscribe function that, when called should remove current subscription', () => {
    const anotherSubscriber = () => {}
    const unsub = event.sub(anotherSubscriber)
    // Subscription should be added to the subscribers list
    expect(event.subscribers).toContain(anotherSubscriber)
    // Unsubscribe from an event
    unsub()
    expect(event.subscribers).not.toContain(anotherSubscriber)
  })

  it('Event.pub: should call each subscriber function once', () => {
    const anotherSubscriber = jest.fn()
    event.sub(anotherSubscriber)
    event.pub()
    expect(subscriber).toBeCalledTimes(1)
    expect(anotherSubscriber).toBeCalledTimes(1)
  })

  it('Event.pub with a caller name: should pass data object and event data to all subscriber functions', () => {
    const data = {
      payload: 'Test data'
    }
    const callerName = 'Caller name'
    const eventData = new EventData(event, callerName)
    const anotherSubscriber = jest.fn()
    event.sub(anotherSubscriber)
    event.pub(data, callerName)
    expect(subscriber).toBeCalledWith(data, eventData)
    expect(anotherSubscriber).toBeCalledWith(data, eventData)
  })

  it('Event.pub without a caller name: should pass data object and event data to all subscriber functions', () => {
    const data = {
      payload: 'Test data'
    }
    const eventData = new EventData(event)
    const anotherSubscriber = jest.fn()
    event.sub(anotherSubscriber)
    event.pub(data)
    expect(subscriber).toBeCalledWith(data, eventData)
    expect(anotherSubscriber).toBeCalledWith(data, eventData)
  })

  it('Event.pub: if called without parameters it should pass an empty data object to the subscribers', () => {
    const eventData = new EventData(event)
    const anotherSubscriber = jest.fn()
    event.sub(anotherSubscriber)
    event.pub()
    expect(subscriber).toBeCalledWith({}, eventData)
    expect(anotherSubscriber).toBeCalledWith({}, eventData)
  })

  it('Event.unsub: should unsubscribe all subscribers listening to an event', () => {
    const anotherSubscriber = () => {}
    event.sub(anotherSubscriber)
    // Subscriber's list should contain two subscribers
    expect(event.subscribers).toHaveLength(2)
    // Unsubscribe all subscribers
    event.unsubAll()
    expect(event.subscribers).toHaveLength(0)
  })
})
