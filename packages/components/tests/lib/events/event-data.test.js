/* eslint-env jest */
import Event from '@/lib/events/event.js'
import EventData from '@/lib/events/event-data.js'

describe('event-data.test.js', () => {
  const eventName = `Test event`
  const publisherName = `Publisher name`
  let event

  beforeAll(() => {
    event = new Event(eventName, { name: publisherName })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.resetModules()
  })

  it('EventData constructor: should create a properly initialized EventData instance', () => {
    expect(new EventData(event)).toEqual({ 'name': eventName, 'publisher': publisherName })
  })
})
