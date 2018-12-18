/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants } from 'alpheios-data-models'
import WordItem from '@/lib/word-item';

describe('word-item.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}  

  let testHomonymLatin, testHomonymGreek
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

  it('1 WordItem - constructor uploads homonym properties', () => {
    let wI = new WordItem(testHomonymLatin)
    expect(wI.targetWord).toEqual(testHomonymLatin.targetWord)
    expect(wI.languageID).toEqual(testHomonymLatin.languageID)
    expect(wI.homonym).toEqual(testHomonymLatin)
  })

  it('2 WordItem - makeImportant method marks item as important', () => {
    let wI = new WordItem(testHomonymLatin)
    expect(wI.important).toBeFalsy()
    
    wI.makeImportant()
    expect(wI.important).toBeTruthy()
  })

  it('3 WordItem - removeImportant method marks item as not important', () => {
    let wI = new WordItem(testHomonymLatin)
    
    wI.makeImportant()
    expect(wI.important).toBeTruthy()

    wI.removeImportant()
    expect(wI.important).toBeFalsy()
  })

})