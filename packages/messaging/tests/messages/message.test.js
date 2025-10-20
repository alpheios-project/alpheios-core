/* eslint-env jest */
import Message from '@messServ/messages/message.js'

describe('Message class', () => {
  it('Message constructor: body (no arguments)', () => {
    const msg = new Message()
    expect(msg.body).toMatchObject({})
  })

  it('Message constructor: body is set', () => {
    const body = { prop1: 'one', prop2: 'two' }
    const msg = new Message(body)
    expect(msg.body).toMatchObject(body)
  })

  it('Message constructor: role is always undefined', () => {
    const msg = new Message()
    expect(msg.role).toBeUndefined()
  })

  it('Message constructor: type is always GENERIC', () => {
    const msg = new Message()
    expect(msg.type).toBe(Message.types.GENERIC)
  })

  it('Message constructor: ID matches UUID v4 pattern', () => {
    const msg = new Message()
    expect(msg.ID).toMatch(/(?:[a-z|\d]){8}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){12}/)
  })

  it('Message constructor: ID is random', () => {
    const msgOne = new Message()
    const msgTwo = new Message()
    expect(msgOne.ID).not.toBe(msgTwo.ID)
  })

  it('Message: must have role definitions', () => {
    expect(Object.keys(Message.roles)).toMatchObject(['REQUEST', 'RESPONSE'])
  })

  it('Message: must have type definitions', () => {
    expect(Object.keys(Message.types)).toMatchObject(['GENERIC'])
  })

  it('isKnownType: must recognize a known message type', () => {
    expect(Message.isKnownType('ALPHEIOS_MESSAGE')).toBeTruthy()
  })

  it('isKnownType: must fail on an unknown message type', () => {
    expect(Message.isKnownType('UNKNOWN_MESSAGE')).toBeFalsy()
  })
})
