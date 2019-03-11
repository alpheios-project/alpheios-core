/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import WordItemRemoteDbDriver from '@/storage/worditem-remotedb-driver'
import RemoteDBAdapter from '@/storage/remote-db-adapter'
import axios from 'axios';
import { WordItem } from 'alpheios-data-models'

describe('remote-db-adapter.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
     
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

  it('1 RemoteDBAdapter - constructor creates object with the following properties: dbDriver, available, errors', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    expect(remoteAdapter.dbDriver).toEqual(dbDriverRemote)
    expect(remoteAdapter.available).toBeTruthy()
    expect(remoteAdapter.errors).toEqual([])
  })

  it('2 RemoteDBAdapter - _checkRemoteDBAvailability returns true if userID and correct headers are in dbDriver', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    expect(remoteAdapter._checkRemoteDBAvailability()).toBeTruthy()
  })

  it('3 RemoteDBAdapter - _checkRemoteDBAvailability returns false if userID is not set', () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)
    dbDriverRemote.userID = null

    expect(remoteAdapter._checkRemoteDBAvailability()).toBeFalsy()
  })

  it('4 RemoteDBAdapter - create method executes axios.post with proper url, checks result and returns true', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    let testWordItem = new WordItem({
      targetWord: 'provincias',
      languageCode: 'lat'
    })

    jest.spyOn(dbDriverRemote.storageMap.post, 'url')
    jest.spyOn(dbDriverRemote.storageMap.post, 'serialize')
    jest.spyOn(dbDriverRemote.storageMap.post, 'checkResult')

    axios.post = jest.fn(() => { return { status: 201 }})

    let createResult = await remoteAdapter.create(testWordItem)

    expect(dbDriverRemote.storageMap.post.url).toHaveBeenCalledWith(testWordItem)
    expect(dbDriverRemote.storageMap.post.serialize).toHaveBeenCalledWith(testWordItem)

    let url = dbDriverRemote.storageMap.post.url(testWordItem)
    let content = dbDriverRemote.storageMap.post.serialize(testWordItem)

    expect(axios.post).toHaveBeenCalledWith(url, content, dbDriverRemote.requestsParams)
    expect(dbDriverRemote.storageMap.post.checkResult).toHaveBeenCalledWith({ status: 201 })
    expect(createResult).toBeTruthy()
  })

  it('5 RemoteDBAdapter - create method catches error and saves it to errors property', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    let testWordItem = new WordItem({
      targetWord: 'provincias',
      languageCode: 'lat'
    })

    axios.post = jest.fn(() => { throw new Error('Something is wrong') })

    let createResult = await remoteAdapter.create(testWordItem)

    expect(remoteAdapter.errors.length).toEqual(1)
    expect(remoteAdapter.errors[0].message).toEqual('Something is wrong')

    expect(createResult).toBeFalsy()
  })

  it('6 RemoteDBAdapter - update method executes axios.put with proper url, checks result and returns true', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    let testWordItem = new WordItem({
      targetWord: 'provincias',
      languageCode: 'lat'
    })

    jest.spyOn(dbDriverRemote.storageMap.put, 'url')
    jest.spyOn(dbDriverRemote.storageMap.put, 'serialize')
    jest.spyOn(dbDriverRemote.storageMap.put, 'checkResult')

    axios.put = jest.fn(() => { return { status: 200 }})

    let createResult = await remoteAdapter.update(testWordItem)

    expect(dbDriverRemote.storageMap.put.url).toHaveBeenCalledWith(testWordItem)
    expect(dbDriverRemote.storageMap.put.serialize).toHaveBeenCalledWith(testWordItem)

    let url = dbDriverRemote.storageMap.put.url(testWordItem)
    let content = dbDriverRemote.storageMap.put.serialize(testWordItem)

    expect(axios.put).toHaveBeenCalledWith(url, content, dbDriverRemote.requestsParams)
    expect(dbDriverRemote.storageMap.put.checkResult).toHaveBeenCalledWith({ status: 200 })
    expect(createResult).toBeTruthy()
  })

  it('7 RemoteDBAdapter - update method catches error and saves it to errors property', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    let testWordItem = new WordItem({
      targetWord: 'provincias',
      languageCode: 'lat'
    })

    axios.put = jest.fn(() => { throw new Error('Something is wrong') })

    let updateResult = await remoteAdapter.update(testWordItem)

    expect(remoteAdapter.errors.length).toEqual(1)
    expect(remoteAdapter.errors[0].message).toEqual('Something is wrong')

    expect(updateResult).toBeFalsy()
  })

  it('8 RemoteDBAdapter - deleteOne method executes axios.delete with proper url, checks result and returns true', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    let testWordItem = new WordItem({
      targetWord: 'provincias',
      languageCode: 'lat'
    })

    jest.spyOn(dbDriverRemote.storageMap.deleteOne, 'url')
    jest.spyOn(dbDriverRemote.storageMap.deleteOne, 'checkResult')

    axios.delete = jest.fn(() => { return { status: 200 }})

    let deleteResult = await remoteAdapter.deleteOne(testWordItem)

    expect(dbDriverRemote.storageMap.deleteOne.url).toHaveBeenCalledWith(testWordItem)

    let url = dbDriverRemote.storageMap.deleteOne.url(testWordItem)

    expect(axios.delete).toHaveBeenCalledWith(url, dbDriverRemote.requestsParams)
    expect(dbDriverRemote.storageMap.deleteOne.checkResult).toHaveBeenCalledWith({ status: 200 })
    expect(deleteResult).toBeTruthy()
  })

  it('9 RemoteDBAdapter - deleteOne method catches error and saves it to errors property', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    let testWordItem = new WordItem({
      targetWord: 'provincias',
      languageCode: 'lat'
    })

    axios.delete = jest.fn(() => { throw new Error('Something is wrong') })

    let deleteResult = await remoteAdapter.deleteOne(testWordItem)

    expect(remoteAdapter.errors.length).toEqual(1)
    expect(remoteAdapter.errors[0].message).toEqual('Something is wrong')

    expect(deleteResult).toBeFalsy()
  })

  it('10 RemoteDBAdapter - deleteMany method executes axios.delete with proper url, checks result and returns true', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    jest.spyOn(dbDriverRemote.storageMap.deleteMany, 'url')
    jest.spyOn(dbDriverRemote.storageMap.deleteMany, 'checkResult')

    axios.delete = jest.fn(() => { return { status: 200 }})

    let deleteResult = await remoteAdapter.deleteMany({ languageCode: 'lat' })

    expect(dbDriverRemote.storageMap.deleteMany.url).toHaveBeenCalledWith({ languageCode: 'lat' })

    let url = dbDriverRemote.storageMap.deleteMany.url({ languageCode: 'lat' })

    expect(axios.delete).toHaveBeenCalledWith(url, dbDriverRemote.requestsParams)
    expect(dbDriverRemote.storageMap.deleteMany.checkResult).toHaveBeenCalledWith({ status: 200 })
    expect(deleteResult).toBeTruthy()
  })

  it('11 RemoteDBAdapter - deleteMany method catches error and saves it to errors property', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    axios.delete = jest.fn(() => { throw new Error('Something is wrong') })

    let deleteResult = await remoteAdapter.deleteMany({ languageCode: 'lat' })

    expect(remoteAdapter.errors.length).toEqual(1)
    expect(remoteAdapter.errors[0].message).toEqual('Something is wrong')

    expect(deleteResult).toBeFalsy()
  })

  it('12 RemoteDBAdapter - query method executes axios.get with proper url, checks result and returns true', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    jest.spyOn(dbDriverRemote.storageMap.get, 'url')
    jest.spyOn(dbDriverRemote.storageMap.get, 'checkResult')

    axios.get = jest.fn(() => { return { status: 200, data: 'foodata' }})

    let getResult = await remoteAdapter.query({ languageCode: 'lat' })

    expect(dbDriverRemote.storageMap.get.url).toHaveBeenCalledWith({ languageCode: 'lat' })

    let url = dbDriverRemote.storageMap.get.url({ languageCode: 'lat' })

    expect(axios.get).toHaveBeenCalledWith(url, dbDriverRemote.requestsParams)
    expect(dbDriverRemote.storageMap.get.checkResult).toHaveBeenCalledWith({ status: 200, data: 'foodata' })
    expect(getResult).toEqual(['foodata'])
  })

  it('13 RemoteDBAdapter - query method catches error and saves it to errors property', async () => {
    let dbDriverRemote = new WordItemRemoteDbDriver('alpheiosMockUser')
    let remoteAdapter = new RemoteDBAdapter(dbDriverRemote)

    axios.get = jest.fn(() => { throw new Error('Something is wrong') })

    let queryResult = await remoteAdapter.query({ languageCode: 'lat' })

    expect(remoteAdapter.errors.length).toEqual(1)
    expect(remoteAdapter.errors[0].message).toEqual('Something is wrong')

    expect(queryResult).toBeFalsy()
  })
})