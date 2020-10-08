/* eslint-env jest */
import WordQueryRespones from '@comp/data-model/word-query/word-query-result.js'
import WordQueryError from '@comp/data-model/word-query/word-query-error.js'
import { HomonymGroup } from 'alpheios-data-models'

describe('WordQueryResult', () => {
  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Constructor: creates an instance', () => {
    const wordQueryResult = new WordQueryRespones()
    expect(wordQueryResult).toBeInstanceOf(WordQueryRespones)
  })

  it('Constructor: should initialize object properties', () => {
    const wordQueryResult = new WordQueryRespones()
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
    let wordQueryResult = new WordQueryRespones() // eslint-disable-line prefer-const
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
    let wordQueryResult = new WordQueryRespones() // eslint-disable-line prefer-const
    wordQueryResult.homonymGroup = new HomonymGroup([])
    const errMsgOne = 'Error message one'
    const errCodeOne = WordQueryError.errorCodes.LEXICONS_ERROR
    const errMsgTwo = 'Error message two'
    const errCodeTwo = WordQueryError.errorCodes.TUFTS_ERROR
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

  it('homonymGroupToJsonObject: should return an array', () => {
    const homonymGroup = new HomonymGroup([])
    expect(WordQueryRespones.homonymGroupToJsonObject(homonymGroup)).toEqual([])
  })

  it('stateToJsonObject: should return a state JSON object', () => {
    const wordQueryResult = new WordQueryRespones()
    expect(WordQueryRespones.stateToJsonObject(wordQueryResult.state)).toEqual({
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
  })

  it('errorsToJsonObject: should return an array of error JSON objects', () => {
    let wordQueryResult = new WordQueryRespones() // eslint-disable-line prefer-const
    const errMsgOne = 'Error message one'
    const errCodeOne = WordQueryError.errorCodes.LEXICONS_ERROR
    const pathOne = ['path segment one', 'path segment two']
    const errMsgTwo = 'Error message two'
    const errCodeTwo = WordQueryError.errorCodes.TUFTS_ERROR
    wordQueryResult.errors.push(new WordQueryError(errMsgOne, errCodeOne, { path: pathOne }))
    wordQueryResult.errors.push(new WordQueryError(errMsgTwo, errCodeTwo))
    expect(WordQueryRespones.errorsToJsonObject(wordQueryResult.errors)).toEqual([
      {
        message: errMsgOne,
        path: pathOne,
        extensions: {
          code: errCodeOne
        }
      },
      {
        message: errMsgTwo,
        path: [],
        extensions: {
          code: errCodeTwo
        }
      }
    ])
  })
})
