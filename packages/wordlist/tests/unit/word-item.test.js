/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import WordItem from '@/lib/word-item';

describe('word-item.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let testHomonymLatin, testHomonymGreek

  beforeAll(async () => {
    testHomonymLatin = {}
    testHomonymGreek = {}
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

  it('1 WordItem - constructor throws error on missing props', () => {
    expect(function () {
      let wI = new WordItem({})
    }).toThrowError(/Unable to construct/)
  })


  it('2 WordItem - constructor sets proper defaults', () => {
      let wI = new WordItem({targetWord: 'mare', languageCode: 'lat'})
      expect(wI.targetWord).toEqual('mare')
      expect(wI.languageCode).toEqual('lat')
      expect(wI.important).toBeFalsy()
      expect(wI.currentSession).toBeTruthy()
      expect(wI.context).toEqual([])
      expect(wI.homonym).toEqual({})
  })

  it.skip('3 WordItem - constructs from JSON', () => {

  })

  it.skip('4 WordItem - readHomonym from JSON', () => {

  })

  it.skip('5 WordItem - readContext from JSON', () => {

  })

  it('6 WordItem - addContext adds new context', () => {
    let mockContextA = { isEqual: () => { return false }}
    let mockContextB = { isEqual: () => { return false }}
    let wI = new WordItem({targetWord: 'mare', languageCode: 'lat'})
    wI.addContext([mockContextA])
    expect(wI.context).toEqual([mockContextA])
    wI.addContext([mockContextB])
    expect(wI.context).toEqual([mockContextA,mockContextB])
  })

  it('7 WordItem - addContext does not add existing context', () => {
    let mockContextA = { isEqual: () => { return true }}
    let mockContextB = { isEqual: () => { return true }}
    let wI = new WordItem({targetWord: 'mare', languageCode: 'lat'})
    wI.addContext([mockContextA])
    expect(wI.context).toEqual([mockContextA])
    wI.addContext([mockContextB])
    expect(wI.context).toEqual([mockContextA])
  })

  it.skip('8 WordItem - lemmasList returns lemmas', () => {

  })

  it.skip('9 WordItem - merges two items', () => {

  })

})