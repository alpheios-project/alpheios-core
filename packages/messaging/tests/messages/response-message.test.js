/* eslint-env jest */
import RequestMessage from '@messServ/messages/request-message.js'
import ResponseMessage from '@messServ/messages/response-message.js'

describe('ResponseMessage class', () => {
  const responseMessageCreator = (...args) => new ResponseMessage(...args)
  const requestMessage = new RequestMessage()

  it('Message constructor: request argument object must be provided', () => {
    expect(responseMessageCreator).toThrow('Request is not provided')
  })

  it('Message constructor: request argument object must have an ID', () => {
    let requestMessage = new RequestMessage() // eslint-disable-line prefer-const
    delete requestMessage.ID
    expect(responseMessageCreator.bind(this, requestMessage, {})).toThrow('Request has no ID')
  })

  it('Message constructor: body (no arguments)', () => {
    const msg = new ResponseMessage(requestMessage)
    expect(msg.body).toMatchObject({})
  })

  it('ResponseMessage constructor: body is set', () => {
    const body = { prop1: 'one', prop2: 'two' }
    const msg = new ResponseMessage(requestMessage, body)
    expect(msg.body).toMatchObject(body)
  })

  it('ResponseMessage constructor: role is RESPONSE', () => {
    const msg = new ResponseMessage(requestMessage)
    expect(msg.role).toBe(ResponseMessage.roles.RESPONSE)
  })

  it('Message constructor: request header is empty if not provided by the request object', () => {
    const msg = new ResponseMessage(requestMessage)
    expect(msg.requestHeader).toMatchObject({})
  })

  it('Message constructor: request header must match the header in the request object', () => {
    let requestMessage = new RequestMessage() // eslint-disable-line prefer-const
    const header = { prop1: 'one' }
    requestMessage.header = header
    const msg = new ResponseMessage(requestMessage)
    expect(msg.requestHeader).toBe(header)
  })

  it('Message constructor: requestID must match the ID of the request object', () => {
    const requestMessage = new RequestMessage()
    const msg = new ResponseMessage(requestMessage)
    expect(msg.requestID).toBe(requestMessage.ID)
  })

  it('ResponseMessage constructor: type is GENERIC', () => {
    const msg = new ResponseMessage(requestMessage)
    expect(msg.type).toBe(ResponseMessage.types.GENERIC)
  })

  it('ResponseMessage constructor: ID matches UUID v4 pattern', () => {
    const msg = new ResponseMessage(requestMessage)
    expect(msg.ID).toMatch(/(?:[a-z|\d]){8}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){12}/)
  })

  it('ResponseMessage constructor: ID is random', () => {
    const msgOne = new ResponseMessage(requestMessage)
    const msgTwo = new ResponseMessage(requestMessage)
    expect(msgOne.ID).not.toBe(msgTwo.ID)
  })

  it('ResponseMessage constructor: responseCode is UNDEFINED if not provided', () => {
    const msg = new ResponseMessage(requestMessage)
    expect(msg.responseCode).toBe(ResponseMessage.responseCodes.UNDEFINED)
  })

  it('ResponseMessage: must have role definitions', () => {
    expect(Object.keys(ResponseMessage.roles)).toMatchObject(['REQUEST', 'RESPONSE'])
  })

  it('ResponseMessage: must have type definitions', () => {
    expect(Object.keys(ResponseMessage.types)).toMatchObject(['GENERIC'])
  })

  it('ResponseMessage: must have response code definitions', () => {
    expect(Object.keys(ResponseMessage.responseCodes)).toEqual(expect.arrayContaining(['SUCCESS', 'UNDEFINED', 'ERROR']))
  })

  it('Success: request argument object must be provided', () => {
    expect(ResponseMessage.Success.bind(ResponseMessage)).toThrow('Request is not provided')
  })

  it('Success: request argument object must have an ID', () => {
    let requestMessage = new RequestMessage() // eslint-disable-line prefer-const
    delete requestMessage.ID
    expect(ResponseMessage.Success.bind(ResponseMessage, requestMessage, {})).toThrow('Request has no ID')
  })

  it('Success: body (no arguments)', () => {
    const msg = ResponseMessage.Success(requestMessage)
    expect(msg.body).toMatchObject({})
  })

  it('Success: body is set', () => {
    const body = { prop1: 'one', prop2: 'two' }
    const msg = ResponseMessage.Success(requestMessage, body)
    expect(msg.body).toMatchObject(body)
  })

  it('Success: role is RESPONSE', () => {
    const msg = ResponseMessage.Success(requestMessage)
    expect(msg.role).toBe(ResponseMessage.roles.RESPONSE)
  })

  it('Success: request header is empty if not provided by the request object', () => {
    const msg = ResponseMessage.Success(requestMessage)
    expect(msg.requestHeader).toMatchObject({})
  })

  it('Success: request header must match the header in the request object', () => {
    let requestMessage = new RequestMessage() // eslint-disable-line prefer-const
    const header = { prop1: 'one' }
    requestMessage.header = header
    const msg = ResponseMessage.Success(requestMessage)
    expect(msg.requestHeader).toBe(header)
  })

  it('Success: requestID must match the ID of the request object', () => {
    const requestMessage = new RequestMessage()
    const msg = ResponseMessage.Success(requestMessage)
    expect(msg.requestID).toBe(requestMessage.ID)
  })

  it('Success: type is GENERIC', () => {
    const msg = ResponseMessage.Success(requestMessage)
    expect(msg.type).toBe(ResponseMessage.types.GENERIC)
  })

  it('Success: ID matches UUID v4 pattern', () => {
    const msg = ResponseMessage.Success(requestMessage)
    expect(msg.ID).toMatch(/(?:[a-z|\d]){8}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){12}/)
  })

  it('Success: ID is random', () => {
    const msgOne = ResponseMessage.Success(requestMessage)
    const msgTwo = ResponseMessage.Success(requestMessage)
    expect(msgOne.ID).not.toBe(msgTwo.ID)
  })

  it('Success: responseCode is SUCCESS', () => {
    const msg = ResponseMessage.Success(requestMessage)
    expect(msg.responseCode).toBe(ResponseMessage.responseCodes.SUCCESS)
  })

  it('Error: request argument object must be provided', () => {
    expect(ResponseMessage.Error.bind(ResponseMessage)).toThrow('Request is not provided')
  })

  it('Error: request argument object must have an ID', () => {
    let requestMessage = new RequestMessage() // eslint-disable-line prefer-const
    delete requestMessage.ID
    expect(ResponseMessage.Error.bind(ResponseMessage, requestMessage, {})).toThrow('Request has no ID')
  })

  it('Error: must be created with the error object and an errorCode', () => {
    const error = new Error('Error message')
    const errorCode = 101
    const msg = ResponseMessage.Error(requestMessage, error, errorCode)
    expect(msg.body).toBe(error)
    expect(msg.errorCode).toBe(errorCode)
  })

  it('Error: an error code must be provided', () => {
    const error = new Error('Error message')
    expect(() => ResponseMessage.Error(requestMessage, error)).toThrow('An error code must be provided for failed requests')
  })

  it('Error: role is RESPONSE', () => {
    const error = new Error('Error message')
    const errorCode = 101
    const msg = ResponseMessage.Error(requestMessage, error, errorCode)
    expect(msg.role).toBe(ResponseMessage.roles.RESPONSE)
  })

  it('Error: request header is empty if not provided by the request object', () => {
    const error = new Error('Error message')
    const errorCode = 101
    const msg = ResponseMessage.Error(requestMessage, error, errorCode)
    expect(msg.requestHeader).toMatchObject({})
  })

  it('Error: request header must match the header in the request object', () => {
    const error = new Error('Error message')
    const errorCode = 101
    let requestMessage = new RequestMessage() // eslint-disable-line prefer-const
    const header = { prop1: 'one' }
    requestMessage.header = header
    const msg = ResponseMessage.Error(requestMessage, error, errorCode)
    expect(msg.requestHeader).toBe(header)
  })

  it('Error: requestID must match the ID of the request object', () => {
    const error = new Error('Error message')
    const errorCode = 101
    const requestMessage = new RequestMessage()
    const msg = ResponseMessage.Error(requestMessage, error, errorCode)
    expect(msg.requestID).toBe(requestMessage.ID)
  })

  it('Error: type is GENERIC', () => {
    const error = new Error('Error message')
    const errorCode = 101
    const msg = ResponseMessage.Error(requestMessage, error, errorCode)
    expect(msg.type).toBe(ResponseMessage.types.GENERIC)
  })

  it('Error: ID matches UUID v4 pattern', () => {
    const error = new Error('Error message')
    const errorCode = 101
    const msg = ResponseMessage.Error(requestMessage, error, errorCode)
    expect(msg.ID).toMatch(/(?:[a-z|\d]){8}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){4}-(?:[a-z|\d]){12}/)
  })

  it('Error: ID is random', () => {
    const error = new Error('Error message')
    const errorCode = 101
    const msgOne = ResponseMessage.Error(requestMessage, error, errorCode)
    const msgTwo = ResponseMessage.Error(requestMessage, error, errorCode)
    expect(msgOne.ID).not.toBe(msgTwo.ID)
  })

  it('Error: responseCode is ERROR', () => {
    const error = new Error('Error message')
    const errorCode = 101
    const msg = ResponseMessage.Error(requestMessage, error, errorCode)
    expect(msg.responseCode).toBe(ResponseMessage.responseCodes.ERROR)
  })

  it('isResponse: should succeed for response message', () => {
    const msg = new ResponseMessage(requestMessage)
    expect(ResponseMessage.isResponse(msg)).toBeTruthy()
  })

  it('isResponse: should fail for request message', () => {
    const msg = new RequestMessage()
    expect(ResponseMessage.isResponse(msg)).toBeFalsy()
  })

  it('isResponse: should fail for an arbitrary object', () => {
    expect(ResponseMessage.isResponse({})).toBeFalsy()
  })
})
