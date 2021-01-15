/* eslint-env jest */
import { Language, HomonymGroup } from 'alpheios-data-models'
import DisambiguatedData from '@comp/lexical-data/word-query/lexical-data/data-objects/disambiguated-data.js'
import LexicalDataResult from '@comp/lexical-data/word-query/lexical-data/result/lexical-data-result.js'
import LexicalDataTypes from '@comp/lexical-data/word-query/lexical-data/types/lexical-data-types.js'
import ErrorCodes from '@comp/lexical-data/constants/error-codes.js'
import ErrorSeverityTypes from '@comp/lexical-data/constants/error-severity-types.js'
import ErrorOrigins from '@comp/lexical-data/constants/error-origins.js'
import WordAsLexemeData from '@comp/lexical-data/word-query/lexical-data/data-objects/word-as-lexeme-data.js'

describe('DisambiguatedData', () => {
  const word = 'testWord'
  const language = Language.SYRIAC
  const path = ['homonyms']

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Constructor: creates an instance', () => {
    const disambiguatedData = new DisambiguatedData()
    expect(disambiguatedData).toBeInstanceOf(DisambiguatedData)
  })

  it('Retrieve: data returned must heave a correct format', async () => {
    const disambiguatedData = new DisambiguatedData()
    const lexicalData = new Map()
    const disambiguatedResult = await disambiguatedData.retrieve(lexicalData)
    expect(disambiguatedResult).toBeInstanceOf(LexicalDataResult)
    expect(disambiguatedResult.dataType).toBe(LexicalDataTypes.DISAMBIGUATED)
  })

  it('Retrieve: returns an empty homonym group if no lexical data provided', async () => {
    const disambiguatedData = new DisambiguatedData()
    const lexicalData = new Map()
    const disambiguatedResult = await disambiguatedData.retrieve(lexicalData)
    expect(disambiguatedResult.state).toEqual({
      loading: false,
      available: false,
      failed: true
    })
    expect(disambiguatedResult.data).toBeInstanceOf(HomonymGroup)
    expect(disambiguatedResult.data.homonyms.length).toBe(0)
    expect(disambiguatedResult.errors.length).toBe(1)
    expect(disambiguatedResult.errors[0]).toEqual({
      message: DisambiguatedData.errMsgs.NO_DISAMBIGUATION_DATA,
      path: path,
      extensions: expect.objectContaining({
        severity: ErrorSeverityTypes.ERROR,
        errCode: ErrorCodes.DISAMBIGUATION_ERROR,
        origin: ErrorOrigins.DISAMBIGUATED_DATA_OBJECT
      })
    })
  })

  it('Retrieve: returns a copy of a homonym group', async () => {
    const disambiguatedData = new DisambiguatedData()
    const wordAsLexemeData = new WordAsLexemeData({ word, language })
    const wordAsLexemeResult = await wordAsLexemeData.retrieve()
    let lexicalData = new Map() // eslint-disable-line prefer-const
    lexicalData.set(wordAsLexemeResult.dataType, wordAsLexemeResult)
    const disambiguatedResult = await disambiguatedData.retrieve(lexicalData)
    expect(disambiguatedResult.state).toEqual({
      loading: false,
      available: true,
      failed: false
    })
    expect(disambiguatedResult.data).toBeInstanceOf(HomonymGroup)
    expect(disambiguatedResult.data.homonyms.length).toBe(1)
    expect(disambiguatedResult.data).toBe(wordAsLexemeResult.data)
    expect(disambiguatedResult.errors.length).toBe(0)
  })
})
