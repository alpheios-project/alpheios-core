/* eslint-env jest */
import WordQueryResponse from '@comp/lexical-data/word-query/word-query-response.js'
import WordQueryError from '@comp/lexical-data/word-query/error/word-query-error.js'
import ErrorCodes from '@comp/lexical-data/constants/error-codes.js'
import ErrorSeverityTypes from '@comp/lexical-data/constants/error-severity-types.js'
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
      data: {
        homonyms: []
      },
      extensions: {
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
      }
    })
  })

  it('toJsonObject: should include errors if they are present', () => {
    let wordQueryResult = new WordQueryResponse() // eslint-disable-line prefer-const
    wordQueryResult.homonymGroup = new HomonymGroup([])
    const errMsgOne = 'Error message one'
    const errCodeOne = ErrorCodes.TREEBANK_ERROR
    const errMsgTwo = 'Error message two'
    const errCodeTwo = ErrorCodes.TUFTS_ERROR
    wordQueryResult.errors.push(new WordQueryError(errMsgOne, errCodeOne))
    wordQueryResult.errors.push(new WordQueryError(errMsgTwo, errCodeTwo))
    const jsonObject = wordQueryResult.toJsonObject()
    expect(jsonObject).toMatchObject({
      errors: [
        {
          message: errMsgOne,
          extensions: {
            errCode: errCodeOne,
            severity: ErrorSeverityTypes.ERROR
          }
        },
        {
          message: errMsgTwo,
          extensions: {
            errCode: errCodeTwo,
            severity: ErrorSeverityTypes.ERROR
          }
        }
      ]
    })
  })
})
