/* eslint-env jest */
import TextSelector from '@/lib/selection/text-selector'

import { LanguageModelFactory as LMF } from 'alpheios-data-models'

describe('text-selector.test.js', () => {
  let testLangId = LMF.getLanguageIdFromCode('lat')

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

  it('1 TextSelector - constructor doesn\'t have required properties', () => {
    expect(function () {
      let l = new TextSelector()
      console.log(l.text)
    }).not.toThrowError()
  })

  it('2 TextSelector - new object has these properties text, languageID, model, location, data, start, end, context, position', () => {
    let testTSelector = new TextSelector()
    expect(testTSelector.text).toEqual('')
    expect(testTSelector.languageID).toBeNull()
    expect(testTSelector.model).toBeUndefined()
    expect(testTSelector.location).toEqual('')
    expect(testTSelector.data).toEqual({})
    expect(testTSelector.start).toEqual(0)
    expect(testTSelector.end).toEqual(0)
    expect(testTSelector.context).toBeNull()
    expect(testTSelector.position).toEqual(0)
  })

  it('3 TextSelector - new object would save languageID to properties from arguments', () => {
    let testTSelector = new TextSelector(testLangId)
    expect(testTSelector.languageID).toEqual(testLangId)
  })

  it('4 TextSelector - readObject method returns a new TextSelector with text property from an argument', () => {
    let testTSelector = TextSelector.readObject({ text: 'caelis' })

    expect(testTSelector.constructor.name).toEqual('TextSelector')
    expect(testTSelector.text).toEqual('caelis')
  })

  it('5 TextSelector - createObjectFromText method returns a new TextSelector with text property and languageId from arguments', () => {
    let testTSelector = TextSelector.createObjectFromText('caelis', testLangId)

    expect(testTSelector.constructor.name).toEqual('TextSelector')
    expect(testTSelector.text).toEqual('caelis')
    expect(testTSelector.languageID).toEqual(testLangId)
    expect(testTSelector.model).toEqual(LMF.getLanguageModel(testLangId))
  })

  it('6 TextSelector - languageCode method prints warn to console about deprecated status and returns languageCode or empty string', () => {
    let testTSelector1 = new TextSelector(testLangId)

    expect(testTSelector1.languageCode).toEqual(LMF.getLanguageCodeFromId(testLangId))
    expect(console.warn).toHaveBeenCalledWith('Deprecated. Please use "languageID" instead of "languageCode"')

    let testTSelector2 = new TextSelector()
    expect(testTSelector2.languageCode).toEqual('')
  })

  it('7 TextSelector - isEmpty returns true if text property is empty', () => {
    let testTSelector1 = new TextSelector()
    expect(testTSelector1.isEmpty()).toBeTruthy()

    let testTSelector2 = TextSelector.readObject({ text: 'caelis' })
    expect(testTSelector2.isEmpty()).toBeFalsy()
  })

  it('8 TextSelector - normalizedText returns normalized text based on model', () => {
    let testModel = LMF.getLanguageModel(testLangId)

    let testTSelector = TextSelector.createObjectFromText('caelis', testLangId)
    expect(testTSelector.normalizedText).toEqual(testModel.normalizeWord('caelis'))
  })

  it('9 TextSelector - textQuoteSelector returns an object TextQuoteSelector', () => {
    let testTSelector = new TextSelector()
    let testTQSelector = testTSelector.textQuoteSelector
    expect(testTQSelector.constructor.name).toEqual('TextQuoteSelector')
  })
})
