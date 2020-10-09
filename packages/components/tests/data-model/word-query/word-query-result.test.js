/* eslint-env jest */
import WordQueryResponse from '@comp/data-model/word-query/word-query-response.js'
import WordQueryError from '@comp/data-model/word-query/error/word-query-error.js'
import WordQueryErrorCodes from '@comp/data-model/word-query/error/word-query-error-codes.js'
import { HomonymGroup } from 'alpheios-data-models'

describe('WordQueryResult', () => {
  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Constructor: creates an instance', () => {
    const wordQueryResult = new WordQueryResponse()
    expect(wordQueryResult).toBeInstanceOf(WordQueryResponse)
  })

  it('Constructor: should initialize object properties', () => {
    const wordQueryResult = new WordQueryResponse()
    expect(wordQueryResult.homonymGroup).toBeNull()
    expect(wordQueryResult.state).toEqual({
      loading: false,
      lexemes: {
        loading: false,
        available: false,
        failed: false
      },
      shortDefs: {
        loading: false,
        available: false,
        failed: false
      }
    })
    expect(wordQueryResult.errors).toEqual([])
  })

  it('toJsonObject: should initialize object properties', () => {
    let wordQueryResult = new WordQueryResponse() // eslint-disable-line prefer-const
    wordQueryResult.homonymGroup = new HomonymGroup([])
    const jsonObject = wordQueryResult.toJsonObject()
    expect(jsonObject).toEqual({
      homonyms: [],
      state: {
        loading: false,
        lexemes: {
          loading: false,
          available: false,
          failed: false
        },
        shortDefs: {
          loading: false,
          available: false,
          failed: false
        }
      }
    })
  })

  it('toJsonObject: should include errors if they are present', () => {
    let wordQueryResult = new WordQueryResponse() // eslint-disable-line prefer-const
    wordQueryResult.homonymGroup = new HomonymGroup([])
    const errMsgOne = 'Error message one'
    const errCodeOne = WordQueryErrorCodes.TREEBANK_ERROR
    const errMsgTwo = 'Error message two'
    const errCodeTwo = WordQueryErrorCodes.TUFTS_ERROR
    wordQueryResult.errors.push(new WordQueryError(errMsgOne, errCodeOne))
    wordQueryResult.errors.push(new WordQueryError(errMsgTwo, errCodeTwo))
    const jsonObject = wordQueryResult.toJsonObject()
    expect(jsonObject).toMatchObject({
      errors: [
        {
          message: errMsgOne,
          extensions: {
            code: errCodeOne
          }
        },
        {
          message: errMsgTwo,
          extensions: {
            code: errCodeTwo
          }
        }
      ]
    })
  })
})
