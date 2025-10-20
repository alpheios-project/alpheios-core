/* eslint-env jest */
import StoredRequest from '@messServ/core/stored-request.js'

describe('StoredRequest class', () => {
  const storedRequest = new StoredRequest()

  it('StoredRequest constructor: resolve must be initialized with a function', () => {
    expect(storedRequest.resolve instanceof Function).toBeTruthy()
  })

  it('StoredRequest constructor: reject must be initialized with a function', () => {
    expect(storedRequest.reject instanceof Function).toBeTruthy()
  })

  it('StoredRequest constructor: promise must be a Promise object', () => {
    expect(storedRequest.promise instanceof Promise).toBeTruthy()
  })
})
