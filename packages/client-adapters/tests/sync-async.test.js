/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import ClientAdapters from '@/client-adapters.js'

import { Constants, Homonym } from 'alpheios-data-models'

// For the time now

describe('sync-async.test.js', () => {
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

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function timeNow () {
    return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds()
  }

  it('1 ClientAdapters - maAdapter sync getting data', async () => {
    ClientAdapters.init()
    let newDate = new Date()
    console.info('*******************************SYNC*******************', timeNow.bind(newDate)())

    let res1 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'placito'
      }
    })
    let newDate1 = new Date()
    console.info('**************************res1', timeNow.bind(newDate1)(), res1.result.targetWord, res1.result.lexemes.length)

    let res2 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })
    let newDate2 = new Date()
    console.info('**************************res2', timeNow.bind(newDate2)(), res2.result.targetWord, res2.result.lexemes.length)

    let res3 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'συνήθως'
      }
    })
    let newDate3 = new Date()
    console.info('**************************res3', timeNow.bind(newDate3)(), res3.result.targetWord, res3.result.lexemes.length)

    let res4 = await ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'male'
      }
    })
    let newDate4 = new Date()
    console.info('**************************res4', timeNow.bind(newDate4)(), res4.result.targetWord, res4.result.lexemes.length)
  })

  it('2 ClientAdapters - maAdapter async getting data', async () => {
    ClientAdapters.init()
    let newDate = new Date()
    console.info('*******************************ASYNC*******************', timeNow.bind(newDate)())
    let res1 = ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'placito'
      }
    })

    res1.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value1', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res2 = ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'cepit'
      }
    })

    res2.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value2', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res3 = ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'συνήθως'
      }
    })

    res3.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value3', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res4 = ClientAdapters.maAdapter({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'male'
      }
    })

    res4.then((value) => {
      let newDate1 = new Date()
      console.info('**************************value4', timeNow.bind(newDate1)(), value.result.targetWord, value.result.lexemes.length)
    })

    let res = await timeout(3000)
    return res
  }, 50000)
})
