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

  it('EventData constructor: should create a properly initialized EventData instance', () => {
    expect(new PsEventData(event)).toEqual({ 'name': eventName, 'publisher': publisherName })
  })
})
