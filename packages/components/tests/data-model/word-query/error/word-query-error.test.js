/* eslint-env jest */
import WordQueryError from '@comp/lexical-data/word-query/error/word-query-error.js'
import ErrorCodes from '@comp/lexical-data/constants/error-codes.js'
import ErrorSeverityTypes from '@comp/lexical-data/constants/error-severity-types.js'

describe('WordQueryError', () => {
  let errorMessage
  let errCode
  let path

  beforeEach(() => {
    errorMessage = 'Error message'
    errCode = ErrorCodes.TUFTS_ERROR
    path = ['homonyms']
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Constructor: creates an instance', async () => {
    const wordQueryError = new WordQueryError(errorMessage, errCode)
    expect(wordQueryError).toBeInstanceOf(WordQueryError)
  })

  it('Constructor: should not create an instance without a message', async () => {
    expect(() => new WordQueryError()).toThrowError(WordQueryError.errMsgs.NO_MESSAGE)
  })

  it('Constructor: should not create an instance without an error code', async () => {
    expect(() => new WordQueryError(errorMessage)).toThrowError(WordQueryError.errMsgs.NO_ERROR_CODE)
  })

  it('Constructor: should initialize all values properly', async () => {
    const wordQueryError = new WordQueryError(errorMessage, errCode, { path })
    expect(wordQueryError.message).toBe(errorMessage)
    expect(wordQueryError.path).toEqual(path)
    expect(wordQueryError.extensions.errCode).toBe(errCode)
  })

  it('Constructor: if path is not provided it should be set to an empty array', async () => {
    const wordQueryError = new WordQueryError(errorMessage, errCode)
    expect(wordQueryError.path).toEqual(path)
  })

  it('toJsonObject: should return a JSON object representation', async () => {
    const wordQueryError = new WordQueryError(errorMessage, errCode, { path })
    expect(wordQueryError.toJsonObject()).toEqual({
      message: errorMessage,
      path: path,
      extensions: {
        severity: ErrorSeverityTypes.ERROR,
        errCode: errCode
      }
    })
  })
})
