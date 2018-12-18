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
  
  it('1 WordlistController - constructor saves userID from properties and inits wordLists', () => {
    let wC = new WordlistController(testUserID)
    expect(wC.userID).toEqual(testUserID)
    expect(wC.wordLists).toBeInstanceOf(Map)
    expect(wC.wordLists.size).toEqual(0)
  })

  it('2 WordlistController - updateWordList checks wordLists map, doesn\'t add duplicate and create a separate WordList for each languageID', () => {
    let wC = new WordlistController(testUserID)
    wC.updateWordList(testHomonymLatin)

    expect(wC.wordLists.size).toEqual(1)
    expect(wC.wordLists.has(Constants.LANG_LATIN)).toBeTruthy()
    expect(wC.wordLists.get(Constants.LANG_LATIN).values.length).toEqual(1)

    wC.updateWordList(testHomonymLatin)
    expect(wC.wordLists.get(Constants.LANG_LATIN).values.length).toEqual(1) // check for duplicates

    wC.updateWordList(testHomonymGreek)
    expect(wC.wordLists.size).toEqual(2)
    expect(wC.wordLists.has(Constants.LANG_GREEK)).toBeTruthy()
    expect(wC.wordLists.get(Constants.LANG_GREEK).values.length).toEqual(1)
  })
})
