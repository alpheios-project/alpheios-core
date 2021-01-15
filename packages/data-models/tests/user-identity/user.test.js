/* eslint-env jest */
import User from '@dmodels/user-identity/user.js'

describe('User', () => {
  const identityData = {
    ID: 'User ID',
    name: 'User name',
    nickname: 'User nickname'
  }

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('constructor: should be able to create an instance with a full set of arguments', () => {
    const user = new User(identityData.ID, { name: identityData.name, nickname: identityData.nickname })
    expect(user.ID).toBe(identityData.ID)
    expect(user.name).toBe(identityData.name)
    expect(user.nickname).toBe(identityData.nickname)
  })

  it('constructor: should be able to create an instance with just the user ID', () => {
    const user = new User(identityData.ID)
    expect(user.ID).toBe(identityData.ID)
    expect(user.name).toBeUndefined()
    expect(user.nickname).toBeUndefined()
  })

  it('constructor: should not proceed without the user ID', () => {
    expect(() => new User()).toThrowError(User.errMsgs.ID_IS_MISSING)
  })

  it('ID getter: should return the value of the ID', () => {
    const user = new User(identityData.ID)
    expect(user.ID).toBe(identityData.ID)
  })

  it('name getter: should return the user name', () => {
    const user = new User(identityData.ID, { name: identityData.name })
    expect(user.name).toBe(identityData.name)
  })

  it('nickname getter: should return the user nickname', () => {
    const user = new User(identityData.ID, { nickname: identityData.nickname })
    expect(user.nickname).toBe(identityData.nickname)
  })
})
