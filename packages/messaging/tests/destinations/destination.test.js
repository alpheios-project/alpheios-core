/* eslint-env jest */
import Destination from '@messServ/destinations/destination.js'

describe('Destination class', () => {
  const destinationName = 'Destination name'

  it('Constructor: shall create a Destination object', () => {
    const destination = new Destination({ name: destinationName })
    expect(destination).toMatchObject({
      name: destinationName,
      _responseCallback: null
    })
  })

  it('Constructor: name must be provided', () => {
    expect(() => new Destination()).toThrow(Destination.errMsgs.NO_DESTINATION)
  })

  it('Constructor: SEND mode should be enabled by default', () => {
    const destination = new Destination({ name: destinationName })
    expect(destination.commModes).toEqual([Destination.commModes.SEND])
  })

  it('ableToSend: must return true for a destination in a SEND mode', () => {
    const destination = new Destination({ name: destinationName, commModes: [Destination.commModes.SEND] })
    expect(destination.ableToSend).toBeTruthy()
  })

  it('ableToSend: must return false for a destination in a RECEIVE mode', () => {
    const destination = new Destination({ name: destinationName, commModes: [Destination.commModes.RECEIVE] })
    expect(destination.ableToSend).toBeFalsy()
  })

  it('ableToReceive: must return false for a destination in a SEND mode', () => {
    const destination = new Destination({ name: destinationName, commModes: [Destination.commModes.SEND] })
    expect(destination.ableToReceive).toBeFalsy()
  })

  it('ableToReceive: must return true for a destination in a RECEIVE mode', () => {
    const destination = new Destination({ name: destinationName, commModes: [Destination.commModes.RECEIVE] })
    expect(destination.ableToReceive).toBeTruthy()
  })

  it('Constructor: destination can have multiple communication modes', () => {
    const destination = new Destination({
      name: destinationName,
      commModes: [Destination.commModes.SEND, Destination.commModes.RECEIVE]
    })
    expect(destination.ableToSend).toBeTruthy()
    expect(destination.ableToReceive).toBeTruthy()
  })

  it('deregister: must throw an error when called on a parent', () => {
    const destination = new Destination({ name: destinationName })
    expect(() => destination.deregister()).toThrow()
  })
})
