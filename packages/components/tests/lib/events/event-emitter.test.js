/* eslint-env jest */
import EventEmitter from '@/lib/events/event-emitter.js'

describe('event-emitter.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  let queryOne
  let queryTwo

  /**
   * QueryOne registers two events: eventA and eventB
   */
  class QueryOne extends EventEmitter {
    constructor () {
      super()
      QueryOne.registerEvent(`eventA`)
      QueryOne.registerEvent(`eventB`)
    }
  }

  /**
   * QueryTwo registers no events
   */
  class QueryTwo extends EventEmitter {
  }

  afterAll(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    queryOne = new QueryOne()
    queryTwo = new QueryTwo()

    jest.spyOn(console, 'warn')
  })

  afterEach(() => {
    jest.resetModules()
  })

  it('EventEmitter.events: should list all events registered to the class in order they were registered', () => {
    expect(QueryOne.events).toEqual(['eventA', 'eventB'])
  })

  it('EventEmitter.events: should return an empty array if no events are registered', () => {
    expect(QueryTwo.events).toEqual([])
  })

  it('EventEmitter.registerEvent: should add an event to the list of the ones registered', () => {
    // EventE is not present before adding
    expect(QueryOne.events).not.toContain(`eventE`)

    // Add an event
    QueryOne.registerEvent(`eventE`)
    // Test that it was added successfully
    expect(QueryOne.events).toContain(`eventE`)
  })

  it('EventEmitter.registerEvent: adding an event that is already registered should result in a warning', () => {
    // Add an event that is already registered
    QueryOne.registerEvent(`eventA`)
    // A warning should be printed into the console
    expect(console.warn).toHaveBeenCalled()
  })

  it('EventEmitter.getFullName: should return a full name of an event', () => {
    expect(QueryOne.getFullName(`eventA`)).toBe(`Alpheios.QueryOne.eventA`)
  })

  it('EventEmitter.getListeners: should return an empty array if no listeners are registered', () => {
    expect(QueryOne.getListeners(`eventA`)).toEqual([])
  })

  it('EventEmitter.addListener: must register a listener that shall be listed via a getListeners() call', () => {
    let callback = () => { }
    QueryOne.addListener(`eventA`, callback)
    expect(QueryOne.getListeners(`eventA`)).toContain(callback)
  })

  it('EventEmitter.addListener: must throw an error when called for an unregistered event', () => {
    expect(() => QueryOne.addListener(`unregisteredEvent`, () => {})).toThrow()
  })

  it('EventEmitter.addListener: must throw an error if no events are registered', () => {
    expect(() => QueryTwo.addListener(`eventA`, () => {})).toThrow()
  })

  it('EventEmitter.emit: must call all registered callbacks with an argument that provided for an emitter', () => {
    const data = {}
    const callbackOne = jest.fn()
    const callbackTwo = jest.fn()

    QueryOne.addListener(`eventA`, callbackOne)
    QueryOne.addListener(`eventA`, callbackTwo)
    QueryOne.emit(`eventA`, data)

    expect(callbackOne).toHaveBeenCalledWith(data)
    expect(callbackTwo).toHaveBeenCalledWith(data)
  })

  it('EventEmitter.emit: must call all registered callbacks only once', () => {
    const data = {}
    const callbackOne = jest.fn()
    const callbackTwo = jest.fn()

    QueryOne.addListener(`eventA`, callbackOne)
    QueryOne.addListener(`eventA`, callbackTwo)
    QueryOne.emit(`eventA`, data)

    expect(callbackOne).toHaveBeenCalledTimes(1)
    expect(callbackTwo).toHaveBeenCalledTimes(1)
  })
})
