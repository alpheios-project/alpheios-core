/* eslint-env jest */
import User from '@dmodels/user-identity/user.js'
import Assertion from '@dmodels/annotations/assertion.js'

describe('Assertion', () => {
  const identityData = {
    ID: 'User ID',
    name: 'User name',
    nickname: 'User nickname'
  }
  const confidence = 4
  let user
  let dateTime

  beforeAll(() => {
    user = new User(identityData.ID, { name: identityData.name, nickname: identityData.nickname })
    dateTime = new Date()
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('constructor: should be able to create an instance with a full set of arguments', () => {
    const assertion = new Assertion(user, { confidence, dateTime })
    expect(assertion.author).toBe(user)
    expect(assertion.confidence).toBe(confidence)
    expect(assertion.dateTime).toBe(dateTime)
    expect(assertion.ID).toEqual(expect.any(String))
  })

  it('constructor: should be able to create an instance with only an author', () => {
    const assertion = new Assertion(user)
    expect(assertion.author).toBe(user)
    expect(typeof assertion.confidence).toBe('number')
    expect(assertion.dateTime).toBeInstanceOf(Date)
    expect(assertion.ID).toEqual(expect.any(String))
  })

  it('constructor: should not proceed with the incorrect confidence argument', () => {
    expect(() => new Assertion(user, { confidence: null }))
      .toThrowError(Assertion.errMsgs.CONFIDENCE_IS_MISSING)
  })

  it('constructor: should not proceed with the missing author argument', () => {
    expect(() => new Assertion()).toThrowError(Assertion.errMsgs.AUTHOR_IS_MISSING)
  })

  it('constructor: should not proceed with the incorrect author argument', () => {
    expect(() => new Assertion(dateTime)).toThrowError(Assertion.errMsgs.AUTHOR_TYPE_MISMATCH)
  })

  it('constructor: should not proceed with the missing dateTime argument', () => {
    expect(() => new Assertion(user, { confidence, dateTime: null }))
      .toThrowError(Assertion.errMsgs.DATETIME_IS_MISSING)
  })

  it('constructor: should not proceed with the incorrect dateTime argument', () => {
    expect(() => new Assertion(user, { confidence, dateTime: user }))
      .toThrowError(Assertion.errMsgs.DATETIME_TYPE_MISMATCH)
  })

  it('author getter: should return the value of the author', () => {
    const assertion = new Assertion(user)
    expect(assertion.author).toBe(user)
  })

  it('confidence getter: should return the value of the confidence', () => {
    const assertion = new Assertion(user, { confidence })
    expect(assertion.confidence).toBe(confidence)
  })

  it('dateTime getter: should return the value of the dateTime', () => {
    const assertion = new Assertion(user, { dateTime })
    expect(assertion.dateTime).toBe(dateTime)
  })

  it('ID getter: should return the value of the ID', () => {
    const assertion = new Assertion(user)
    expect(assertion.ID).toEqual(expect.any(String))
  })
})
