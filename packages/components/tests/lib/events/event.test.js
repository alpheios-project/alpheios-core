/* eslint-env jest */
import Event from '@/lib/events/event.js'
import EventData from '@/lib/events/event-data.js'

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

  it('Event.pub: should call each subscriber function once', () => {
    const anotherSubscriber = jest.fn()
    event.sub(anotherSubscriber)
    event.pub()
    expect(subscriber).toBeCalledTimes(1)
    expect(anotherSubscriber).toBeCalledTimes(1)
  })

  it('Event.pub: should pass data object and event data to all subscriber functions', () => {
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
})
