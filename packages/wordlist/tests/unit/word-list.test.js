/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import WordList from '@/lib/word-list.js'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants } from 'alpheios-data-models'

describe('word-list.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let mockWILatin
  let mockWIGreek
  let testLanguageCode

  beforeAll(async () => {
    mockWILatin = {languageCode: 'lat', targetWord: 'mare', merge: (i) => {return i}}
    mockWIGreek = {languageCode: 'grc', targetWord: 'mou=sa', merge: (i) => {return i}}
    testLanguageCode = 'lat'
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

  it('1 WordList - throws error on missing arguments', () => {
    expect(function () {
      let wI = new WordList()
    }).toThrowError(/Unable to construct/)
  })

  it('2 WordList - constructor sets languageCode and items from arguments', () => {
    let wL = new WordList(testLanguageCode,[mockWILatin])
    expect(wL.languageCode).toEqual(testLanguageCode)
    expect(wL.values.length).toEqual(1)
  })

  it('3 WordList - values returns items', () => {
    let wL = new WordList(testLanguageCode,[mockWILatin])
    expect(wL.values).toEqual([mockWILatin])
  })

  it('3 WordList - addWordItem adds WordItem to items if languageCode is the same and it is not a duplicate for any item in the wordlist', () => {
    let wL = new WordList(testLanguageCode)

    wL.addWordItem(mockWILatin)
    expect(wL.values.length).toEqual(1)

    wL.addWordItem(mockWILatin)
    expect(wL.values.length).toEqual(1) // duplicate

    expect(function () {
      wL.addWordItem(mockWIGreek)
    }).toThrowError(/mismatch/)
  })

  it.skip('4 WordList - deleteWordItem removes an item from the list',() => {

  })

  it.skip('5 WordList - removeAllWordItems removes all items from the list',() => {


  })

  it.skip('6 WordList - getWordItem creates new item if it does not exist',() => {

  })

  it.skip('7 WordList - getWordItem does not create new item if it does not exist',() => {

  })

  it.skip('8 WordList - test isEmpty method', () => {

  })

})
