/* eslint-env jest */
import TextSelector from '@/lib/selection/text-selector'

import { LanguageModelFactory as LMF } from 'alpheios-data-models'

describe('text-selector.test.js', () => {
  const testLangId = LMF.getLanguageIdFromCode('lat')

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
      const l = new TextSelector()
      console.log(l.text)
    }).not.toThrowError()
  })

  it('2 TextSelector - new object has these properties text, languageID, model, location, data, start, end, context, position', () => {
    const testTSelector = new TextSelector()
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
    const testTSelector = new TextSelector(testLangId)
    expect(testTSelector.languageID).toEqual(testLangId)
  })

  it('4 TextSelector - readObject method returns a new TextSelector with text property from an argument', () => {
    const testTSelector = TextSelector.readObject({ text: 'caelis' })

    expect(testTSelector.constructor.name).toEqual('TextSelector')
    expect(testTSelector.text).toEqual('caelis')
  })

  it('5 TextSelector - createObjectFromText method returns a new TextSelector with text property and languageId from arguments', () => {
    const testTSelector = TextSelector.createObjectFromText('caelis', testLangId)

    expect(testTSelector.constructor.name).toEqual('TextSelector')
    expect(testTSelector.text).toEqual('caelis')
    expect(testTSelector.languageID).toEqual(testLangId)
    expect(testTSelector.model).toEqual(LMF.getLanguageModel(testLangId))
  })

  it('7 TextSelector - isEmpty returns true if text property is empty', () => {
    const testTSelector1 = new TextSelector()
    expect(testTSelector1.isEmpty()).toBeTruthy()

    const testTSelector2 = TextSelector.readObject({ text: 'caelis' })
    expect(testTSelector2.isEmpty()).toBeFalsy()
  })

  it('8 TextSelector - normalizedText returns normalized text based on model', () => {
    const testModel = LMF.getLanguageModel(testLangId)

    const testTSelector = TextSelector.createObjectFromText('caelis', testLangId)
    expect(testTSelector.normalizedText).toEqual(testModel.normalizeWord('caelis'))
  })

  it('9 TextSelector - createTextQuoteSelector creates textQuoteSelector from args', () => {
    const testTSelector = TextSelector.createObjectFromText('caelis', testLangId)
    testTSelector.start = 5
    testTSelector.end = 11

    const testElement = document.createElement('p')
    const node = document.createTextNode('mare caelis cepit differ')
    testElement.appendChild(node)
    document.body.appendChild(testElement)

    testElement.ownerDocument.getSelection = () => {
      return {
        anchorNode: {
          data: 'mare caelis cepit differ'
        }
      }
    }

    testTSelector.createTextQuoteSelector('mare', 'cepit differ')

    expect(testTSelector.textQuoteSelector).toBeDefined()
    expect(testTSelector.textQuoteSelector.text).toEqual('caelis')
    expect(testTSelector.textQuoteSelector.prefix).toEqual('mare')
    expect(testTSelector.textQuoteSelector.suffix).toEqual('cepit differ')
  })
})
