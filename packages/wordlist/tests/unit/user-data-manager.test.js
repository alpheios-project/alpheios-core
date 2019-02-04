/* eslint-env jest */
/* eslint-disable no-unused-vars */
import UserDataManager from '@/controllers/user-data-manager'

describe('indexed-db-adapter.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let mockEvents
  let mockUserId
  let mockIndexedDbAdapter
  let mockRemoteDbAdapter
  let mockItemA
  let mockItemB

  beforeAll(() => {
    mockUserId = 'mockUser'
    mockEvents = {
      WORDITEM_UPDATED: {sub: jest.fn()},
      WORDITEM_DELETED: {sub: jest.fn()},
      WORDLIST_DELETED: {sub: jest.fn()},
    }
    mockItemA = {
      languageCode: 'lat',
      targetWord: 'mare'
    }
    mockItemB = {
      languageCode: 'lat',
      targetWord: 'veni'
    }
    mockIndexedDbAdapter = {
      create: jest.fn((i) => {return i}),
      update: jest.fn(()=> {return true}),
      deleteOne: jest.fn(() => {return true}),
      deleteMany: jest.fn(() => {return true}),
      query: jest.fn(() => {
        return [mockItemA, mockItemB]
      })
    }
    mockRemoteDbAdapter = {
      create: jest.fn((i) => {return i}),
      update: jest.fn(()=> {return true}),
      deleteOne: jest.fn(() => {return true}),
      deleteMany: jest.fn(() => {return true}),
      query: jest.fn(() => { return []})
    }
  })

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

  it('1 UserDataManager - constructor subscribes to events', () => {
    jest.spyOn(mockEvents.WORDITEM_UPDATED,'sub')
    jest.spyOn(mockEvents.WORDITEM_DELETED,'sub')
    jest.spyOn(mockEvents.WORDLIST_DELETED,'sub')
    let dm = new UserDataManager(mockUserId,mockEvents)
    expect(dm.userID).toEqual(mockUserId)
    expect(mockEvents.WORDITEM_UPDATED.sub).toHaveBeenCalled()
    expect(mockEvents.WORDITEM_DELETED.sub).toHaveBeenCalled()
    expect(mockEvents.WORDLIST_DELETED.sub).toHaveBeenCalled()
  })

  it('2 UserDataManager - instantiates a local storage adapter', () => {
    let dm = new UserDataManager(mockUserId,mockEvents)
    let sa = dm._localStorageAdapter('WordItem')
    expect(sa).toBeDefined()
  })

  it('3 UserDataManager - instantiates a remote storage adapter', () => {
    let dm = new UserDataManager(mockUserId,mockEvents)
    let sa = dm._remoteStorageAdapter('WordItem')
    expect(sa).toBeDefined()
  })

  it('4 UserDataManager - update updates both local and remote', async () => {
    jest.spyOn(mockIndexedDbAdapter,'update')
    jest.spyOn(mockRemoteDbAdapter,'update')
    let dm = new UserDataManager(mockUserId,mockEvents)
    dm._localStorageAdapter = jest.fn(()=>{ return mockIndexedDbAdapter })
    dm._remoteStorageAdapter = jest.fn(()=>{ return mockRemoteDbAdapter })
    let rv = await dm.update({dataObj: {}, params: {}})
    expect(mockIndexedDbAdapter.update).toHaveBeenCalled()
    expect(mockRemoteDbAdapter.update).toHaveBeenCalled()
    expect(rv).toBeTruthy()

  })

  it('5 UserDataManager - delete deletes from both local and remote', async () => {
    jest.spyOn(mockIndexedDbAdapter,'update')
    jest.spyOn(mockRemoteDbAdapter,'update')
    let dm = new UserDataManager(mockUserId,mockEvents)
    dm._localStorageAdapter = jest.fn(()=>{ return mockIndexedDbAdapter })
    dm._remoteStorageAdapter = jest.fn(()=>{ return mockRemoteDbAdapter })
    let rv = await dm.delete({dataObj: {}})
    expect(mockIndexedDbAdapter.deleteOne).toHaveBeenCalled()
    expect(mockRemoteDbAdapter.deleteOne).toHaveBeenCalled()
    expect(rv).toBeTruthy()
  })

  it('6 UserDataManager - deleteMany deletes from both local and remote', async () => {
    jest.spyOn(mockIndexedDbAdapter,'update')
    jest.spyOn(mockRemoteDbAdapter,'update')
    let dm = new UserDataManager(mockUserId, mockEvents)
    dm._localStorageAdapter = jest.fn(()=>{ return mockIndexedDbAdapter })
    dm._remoteStorageAdapter = jest.fn(()=>{ return mockRemoteDbAdapter })
    let rv = await dm.deleteMany({dataType: 'WordItem', params: {}})
    expect(mockIndexedDbAdapter.deleteMany).toHaveBeenCalled()
    expect(mockRemoteDbAdapter.deleteMany).toHaveBeenCalled()
  })

  it('5 UserDataManager - query local populates remote ', async () => {
    jest.spyOn(mockRemoteDbAdapter,'create')
    let dm = new UserDataManager(mockUserId,mockEvents)
    dm._localStorageAdapter = jest.fn(()=>{ return mockIndexedDbAdapter })
    dm._remoteStorageAdapter = jest.fn(()=>{ return mockRemoteDbAdapter })
    let items = await dm.query({dataType: 'WordItem', params: {}})
    expect(items).toEqual([mockItemA,mockItemB])
    expect(mockRemoteDbAdapter.create).toHaveBeenCalledTimes(2)

  })
  it('5 UserDataManager - query remote populates local ', async () => {})
  it('5 UserDataManager - query remote and local merge ', async () => {})


  // TODO test error conditions
})
