/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import WordList from '@/lib/word-list.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants } from 'alpheios-data-models'
import WordItem from '@/lib/word-item';

describe('word-list.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}  

  let testWILatin, testWIGreek
  let testUserID = 'userIDTest'
  let testLanguageID = Constants.LANG_LATIN

  beforeAll(async () => {
    let resTestHomonymLatin = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: 'caeli'
      }
    })
    let testHomonymLatin = resTestHomonymLatin.result
    testWILatin = new WordItem(testHomonymLatin)

    let resTestHomonymGreek = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: 'μύες'
      }
    })
    let testHomonymGreek = resTestHomonymGreek.result
    testWIGreek = new WordItem(testHomonymGreek)
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
  
  it('1 WordList - constructor saves userID, languageID from properties and inits items', () => {
    let wL = new WordList(testUserID, testLanguageID)
    expect(wL.userID).toEqual(testUserID)
    expect(wL.languageID).toEqual(testLanguageID)
    expect(Array.isArray(wL.items)).toBeTruthy()
    expect(wL.items.length).toEqual(0)
  })

  it('2 WordList - push method adds WordItem to items if languageID is the same and it is not a duplicate for any item in the wordlist', () => {
    let wL = new WordList(testUserID, Constants.LANG_LATIN)

    wL.push(testWILatin)
    expect(wL.items.length).toEqual(1)

    wL.push(testWILatin)
    expect(wL.items.length).toEqual(1) // duplicate
    
    wL.push(testWIGreek)
    expect(wL.items.length).toEqual(1) // wrong languageID
  })

  it('3 WordList - contains method check if WordItem is already in the list or not', () => {
    let wL = new WordList(testUserID, Constants.LANG_LATIN)

    expect(wL.contains(testWILatin)).toBeFalsy() // still empty

    wL.push(testWILatin)
    expect(wL.contains(testWILatin)).toBeTruthy() // was added
    expect(wL.contains(testWIGreek)).toBeFalsy() // was not added
  })

  it('4 WordList - makeAllImportant method marks each wordItem in the list as important', () => {
    let wL = new WordList(testUserID, Constants.LANG_LATIN)

    wL.push(testWILatin)
    expect(wL.items.every(item => !item.important)).toBeTruthy() // first all are added without important flags
    wL.makeAllImportant()
    expect(wL.items.every(item => item.important)).toBeTruthy() // now all are important
  })

  it('5 WordList - removeAllImportant method marks each wordItem in the list as not important', () => {
    let wL = new WordList(testUserID, Constants.LANG_LATIN)

    wL.push(testWILatin)
    
    wL.makeAllImportant()
    expect(wL.items.every(item => item.important)).toBeTruthy() // now all are important

    wL.removeAllImportant()
    expect(wL.items.every(item => !item.important)).toBeTruthy() // first all are added without important flags
  })
})
