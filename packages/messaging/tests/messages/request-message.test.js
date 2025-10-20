/* eslint-env jest */
import RequestMessage from '@messServ/messages/request-message.js'

describe('RequestMessage class', () => {
  it('Message constructor: body (no arguments)', () => {
    const msg = new RequestMessage()
    expect(msg.body).toMatchObject({})
  })

  it('RequestMessage constructor: body is set', () => {
    const body = { prop1: 'one', prop2: 'two' }
    const msg = new RequestMessage(body)
    expect(msg.body).toMatchObject(body)
  })

  it('Message constructor: header is an empty object', () => {
    const msg = new RequestMessage()
    expect(msg.header).toMatchObject({})
  })

  it('RequestMessage constructor: role is REQUEST', () => {
    const msg = new RequestMessage()
    expect(msg.role).toBe(RequestMessage.roles.REQUEST)
  })

  it('RequestMessage constructor: type is GENERIC', () => {
    const msg = new RequestMessage()
    expect(msg.type).toBe(RequestMessage.types.GENERIC)
  })

  it('RequestMessage constructor: ID matches UUID v4 pattern', () => {
    const msg = new RequestMessage()
    expect(msg.ID).toMatch(/(?:[a-z|\d]){8}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){12}/)
  })

  it('RequestMessage constructor: ID is random', () => {
    const msgOne = new RequestMessage()
    const msgTwo = new RequestMessage()
    expect(msgOne.ID).not.toBe(msgTwo.ID)
  })

  it('RequestMessage: must have role definitions', () => {
    expect(Object.keys(RequestMessage.roles)).toMatchObject(['REQUEST', 'RESPONSE'])
  })

  it('RequestMessage: must have type definitions', () => {
    expect(Object.keys(RequestMessage.types)).toMatchObject(['GENERIC'])
  })
})
