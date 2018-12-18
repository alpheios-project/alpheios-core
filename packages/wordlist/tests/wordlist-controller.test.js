/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import WordlistController from '@/controllers/wordlist-controller.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants } from 'alpheios-data-models'

describe('wordlist-controller.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}  

  let testHomonym

  beforeAll(async () => {
    let resTestHomonym = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'caeli'
      }
    })
    testHomonym = resTestHomonym.result
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
  
  it('1 WordlistController - new constructor', () => {
    let wC = new WordlistController()
    wC.updateWordList(testHomonym)
    wC.updateWordList(testHomonym)
  })
})