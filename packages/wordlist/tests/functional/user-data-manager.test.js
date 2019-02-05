/* eslint-env jest */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { Constants, WordItem } from 'alpheios-data-models'
import UserDataManager from '@/controllers/user-data-manager'

import IndexedDB from 'fake-indexeddb'
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange'

describe('indexeddb-workflow.test.js', () => {
  // console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testUserID = 'alpheiosMockUser'
  let testWordItem1 = new WordItem({
    targetWord: 'tuli',
    languageCode: Constants.STR_LANG_CODE_LAT
  })

  let testWordItem2 = new WordItem({
    targetWord: 'bene',
    languageCode: Constants.STR_LANG_CODE_LAT
  })

  let testWordItem3 = new WordItem({
    targetWord: 'caeli',
    languageCode: Constants.STR_LANG_CODE_LAT
  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  beforeAll( () => {
    window.indexedDB = IndexedDB
    window.IDBKeyRange = IDBKeyRange
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

  it('1 IndexedDBWorkflow - delete many and update method, checking blocking', async () => {
    let udm = new UserDataManager(testUserID)

    let res1 = udm.update({ dataObj: testWordItem1, params: { segment: 'common' }})
    let res2 = udm.update({ dataObj: testWordItem2, params: { segment: 'common' }})
    let res3 = udm.update({ dataObj: testWordItem3, params: { segment: 'common' }})

    let res4 = udm.deleteMany({ dataType: 'WordItem', params: { languageCode: 'lat' }})
    let res5 = udm.update({ dataObj: testWordItem3, params: { segment: 'common' }})

    let final = [await res1, await res2, await res3, await res4, await res5]

    await timeout(5000)
    let localDataItems = await udm.query({ dataType: 'WordItem', params: { languageCode: 'lat' }})
    
    expect(localDataItems.filter(item => item.targetWord === testWordItem1.targetWord).length).toEqual(0)
    expect(localDataItems.filter(item => item.targetWord === testWordItem2.targetWord).length).toEqual(0)
    expect(localDataItems.filter(item => item.targetWord === testWordItem3.targetWord).length).toEqual(1)
  }, 50000)
})