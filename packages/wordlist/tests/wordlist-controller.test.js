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
    expect(wC.wordLists).toBeInstanceOf(Object)
    expect(Object.values(wC.wordLists).length).toEqual(0)
  })

  it('2 WordlistController - updateWordList checks wordLists map, doesn\'t add duplicate and create a separate WordList for each languageID', () => {
    let wC = new WordlistController(testUserID)
    wC.updateWordList(testHomonymLatin)

    expect(Object.values(wC.wordLists).length).toEqual(1)
    expect(Object.keys(wC.wordLists).includes('lat')).toBeTruthy()
    expect(wC.wordLists.lat).toBeDefined()

    wC.updateWordList(testHomonymLatin)
    expect(wC.wordLists.lat).toBeDefined() // check for duplicates

    wC.updateWordList(testHomonymGreek)
    expect(Object.values(wC.wordLists).length).toEqual(2)
    expect(Object.keys(wC.wordLists).includes('grc')).toBeTruthy()
    expect(wC.wordLists.grc).toBeDefined()
  })
})
