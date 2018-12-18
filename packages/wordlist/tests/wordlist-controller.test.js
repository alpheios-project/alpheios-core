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

  let testHomonymLatin, testHomonymGreek
  let testUserID = 'userIDTest'

  beforeAll(async () => {
    let resTestHomonymLatin = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'caeli'
      }
    })
    testHomonymLatin = resTestHomonymLatin.result

    let resTestHomonymGreek = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'μύες'
      }
    })
    testHomonymGreek = resTestHomonymGreek.result
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
    let wC = new WordlistController(testUserID)
    wC.updateWordList(testHomonymLatin)
    wC.updateWordList(testHomonymGreek)
  })
})