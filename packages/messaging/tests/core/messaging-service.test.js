/* eslint-env jest */
import Destination from '@messServ/destinations/destination.js'
import MessagingService from '@messServ/core/messaging-service.js'

describe('MessagingService class', () => {
  const serviceName = 'ServiceName'
  const registerResponseCallbackMock = jest.fn()
  const deregisterMock = jest.fn()
  Destination.prototype.registerResponseCallback = registerResponseCallbackMock
  Destination.prototype.deregister = deregisterMock
  const destOneSend = new Destination({ name: 'Destination one', commModes: [Destination.commModes.SEND] })
  const destTwoReceive = new Destination({ name: 'Destination two', commModes: [Destination.commModes.RECEIVE] })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('MessagingService constructor: messages map', () => {
    const messagingService = new MessagingService(serviceName)
    expect(messagingService._messages instanceof Map).toBeTruthy()
    expect(messagingService._messages.size).toBe(0)
  })

  it('MessagingService constructor: destinations map', () => {
    const messagingService = new MessagingService(serviceName)
    expect(messagingService._destinations instanceof Map).toBeTruthy()
    expect(messagingService._destinations.size).toBe(0)
  })

  it('MessagingService constructor: with a single destination', () => {
    const messagingService = new MessagingService(serviceName, destOneSend)
    expect(Array.from(messagingService._destinations.keys())).toMatchObject(['Destination one'])
    expect(Array.from(messagingService._destinations.values())).toMatchObject([destOneSend])
  })

  it('MessagingService constructor: with multiple destinations', () => {
    const messagingService = new MessagingService(serviceName, [destOneSend, destTwoReceive])
    expect(Array.from(messagingService._destinations.keys())).toMatchObject(['Destination one', 'Destination two'])
    expect(Array.from(messagingService._destinations.values())).toMatchObject([destOneSend, destTwoReceive])
  })

  it('MessagingService constructor: throws an error when no name is provided', () => {
    expect(() => new MessagingService()).toThrow(MessagingService.errMsgs.NO_NAME)
  })

  it('hasService: returns true if service exists', () => {
    MessagingService.createService(serviceName)
    expect(MessagingService.hasService(serviceName)).toBeTruthy()
    MessagingService.deleteService(serviceName)
  })

  it('hasService: returns false if there is no such service', () => {
    expect(MessagingService.hasService('unknown service')).toBeFalsy()
  })

  it('getService: returns an instance of the service if service exists', () => {
    MessagingService.createService(serviceName)
    expect(MessagingService.getService(serviceName).name).toBe(serviceName)
    MessagingService.deleteService(serviceName)
  })

  it('getService: returns undefined if service does not exist', () => {
    MessagingService.createService(serviceName)
    expect(MessagingService.getService('unknown name')).toBeUndefined()
    MessagingService.deleteService(serviceName)
  })

  it('creatService: creates an instance of a service', () => {
    MessagingService.createService(serviceName)
    expect(MessagingService.hasService(serviceName)).toBeTruthy()
    MessagingService.deleteService(serviceName)
  })

  it('creatService: throws an error if parameters are incorrect', () => {
    expect(() => MessagingService.createService()).toThrow(MessagingService.errMsgs.NO_NAME)
  })

  it('registerDestination: add a new one', () => {
    const messagingService = new MessagingService(serviceName)
    expect(messagingService._destinations.size).toBe(0)
    messagingService.registerDestination(destOneSend)
    expect(Array.from(messagingService._destinations.keys())).toMatchObject(['Destination one'])
    expect(Array.from(messagingService._destinations.values())).toMatchObject([destOneSend])
  })

  it('registerDestination: must call registerResponseCallback on a destination in a send mode', () => {
    const messagingService = new MessagingService(serviceName)
    messagingService.registerDestination(destOneSend)
    expect(registerResponseCallbackMock.mock.calls.length).toBe(1)
  })

  it('registerDestination: must not call registerResponseCallback on a destination in a receive mode', () => {
    const messagingService = new MessagingService(serviceName)
    messagingService.registerDestination(destTwoReceive)
    expect(registerResponseCallbackMock.mock.calls.length).toBe(0)
  })

  it('registerDestination: add an existing one', () => {
    const messagingService = new MessagingService(serviceName)
    expect(messagingService._destinations.size).toBe(0)
    messagingService.registerDestination(destOneSend)
    expect(() => messagingService.registerDestination(destOneSend)).toThrow('Destination already exists')
  })

  it('updateDestination: destination exists', () => {
    const destName = 'Destination one'
    const destOneType = 'Destination one type'
    const destOneUpdatedType = 'Destination one type updated'
    const messagingService = new MessagingService(serviceName)
    expect(messagingService._destinations.size).toBe(0)
    let destOne = new Destination({ name: destName }) // eslint-disable-line prefer-const
    destOne.type = destOneType
    let destOneUpdated = new Destination({ name: destName }) // eslint-disable-line prefer-const
    destOneUpdated.type = destOneUpdatedType
    messagingService.registerDestination(destOne)
    expect(messagingService._destinations.get(destName).type).toBe(destOneType)
    messagingService.updateDestination(destOneUpdated)
    expect(messagingService._destinations.get(destName).type).toBe(destOneUpdatedType)
  })

  it('updateDestination: destination does not exist', () => {
    const messagingService = new MessagingService(serviceName)
    expect(messagingService._destinations.size).toBe(0)
    const destOne = new Destination({ name: 'Destination name' })
    const destOneUpdated = new Destination({ name: 'A new destination name' })
    messagingService.registerDestination(destOne)
    expect(() => messagingService.updateDestination(destOneUpdated)).toThrow('Cannot update a destination that does not exist')
  })

  it('updateDestination: must call deregister on existing destination', () => {
    const messagingService = new MessagingService(serviceName)
    messagingService.registerDestination(destOneSend)
    expect(deregisterMock.mock.calls.length).toBe(0)
    messagingService.updateDestination(destOneSend)
    expect(deregisterMock.mock.calls.length).toBe(1)
  })
})
