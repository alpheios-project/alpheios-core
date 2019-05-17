/* eslint-env jest */
/* eslint-disable no-unused-vars */

import EventElement from '@/lib/custom-pointer-events/event-element.js'

describe('event-element.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 EventElement - constructor creates an object with client, target, time, path, excluded', () => {
    let eventEl = new EventElement()
    expect(eventEl.client.x).toBeNull()
    expect(eventEl.client.y).toBeNull()
    expect(eventEl.target).toBeNull()
    expect(eventEl.time).toEqual(0)
    expect(eventEl.path.length).toEqual(0)
    expect(eventEl.excluded).toBeFalsy()
  })

})