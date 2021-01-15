/* eslint-env jest */
import User from '@dmodels/user-identity/user.js'
import Negation from '@dmodels/annotations/negation.js'

describe('Negation', () => {
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
    const negation = new Negation(user, { confidence, dateTime })
    expect(negation.author).toBe(user)
    expect(negation.confidence).toBe(confidence)
    expect(negation.dateTime).toBe(dateTime)
    expect(negation.ID).toEqual(expect.any(String))
  })

  it('constructor: should be able to create an instance with only an author', () => {
    const negation = new Negation(user)
    expect(negation.author).toBe(user)
    expect(typeof negation.confidence).toBe('number')
    expect(negation.dateTime).toBeInstanceOf(Date)
    expect(negation.ID).toEqual(expect.any(String))
  })

  it('constructor: should not proceed with the incorrect confidence argument', () => {
    expect(() => new Negation(user, { confidence: null }))
      .toThrowError(Negation.errMsgs.CONFIDENCE_IS_MISSING)
  })

  it('constructor: should not proceed with the missing author argument', () => {
    expect(() => new Negation()).toThrowError(Negation.errMsgs.AUTHOR_IS_MISSING)
  })

  it('constructor: should not proceed with the incorrect author argument', () => {
    expect(() => new Negation(dateTime)).toThrowError(Negation.errMsgs.AUTHOR_TYPE_MISMATCH)
  })

  it('constructor: should not proceed with the missing dateTime argument', () => {
    expect(() => new Negation(user, { confidence, dateTime: null }))
      .toThrowError(Negation.errMsgs.DATETIME_IS_MISSING)
  })

  it('constructor: should not proceed with the incorrect dateTime argument', () => {
    expect(() => new Negation(user, { confidence, dateTime: user }))
      .toThrowError(Negation.errMsgs.DATETIME_TYPE_MISMATCH)
  })

  it('author getter: should return the value of the author', () => {
    const negation = new Negation(user)
    expect(negation.author).toBe(user)
  })

  it('confidence getter: should return the value of the confidence', () => {
    const negation = new Negation(user, { confidence })
    expect(negation.confidence).toBe(confidence)
  })

  it('dateTime getter: should return the value of the dateTime', () => {
    const negation = new Negation(user, { dateTime })
    expect(negation.dateTime).toBe(dateTime)
  })

  it('ID getter: should return the value of the ID', () => {
    const negation = new Negation(user)
    expect(negation.ID).toEqual(expect.any(String))
  })
})
