/* eslint-env jest */
import WordQueryWarning from '@comp/data-model/word-query/error/word-query-warning.js'
import ErrorCodes from '@comp/data-model/constants/error-codes.js'
import ErrorSeverityTypes from '@comp/data-model/constants/error-severity-types.js'

describe('WordQueryWarning', () => {
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
    const wordQueryError = new WordQueryWarning(errorMessage, errCode)
    expect(wordQueryError).toBeInstanceOf(WordQueryWarning)
  })

  it('Constructor: should not create an instance without a message', async () => {
    expect(() => new WordQueryWarning()).toThrowError(WordQueryWarning.errMsgs.NO_MESSAGE)
  })

  it('Constructor: should not create an instance without an error code', async () => {
    expect(() => new WordQueryWarning(errorMessage)).toThrowError(WordQueryWarning.errMsgs.NO_ERROR_CODE)
  })

  it('Constructor: should initialize all values properly', async () => {
    const wordQueryError = new WordQueryWarning(errorMessage, errCode, { path })
    expect(wordQueryError.message).toBe(errorMessage)
    expect(wordQueryError.path).toEqual(path)
    expect(wordQueryError.extensions.errCode).toBe(errCode)
  })

  it('Constructor: if path is not provided it should be set to an empty array', async () => {
    const wordQueryError = new WordQueryWarning(errorMessage, errCode)
    expect(wordQueryError.path).toEqual(path)
  })

  it('toJsonObject: should return a JSON object representation', async () => {
    const wordQueryError = new WordQueryWarning(errorMessage, errCode, { path })
    expect(wordQueryError.toJsonObject()).toEqual({
      message: errorMessage,
      path: path,
      extensions: {
        severity: ErrorSeverityTypes.WARNING,
        errCode: errCode
      }
    })
  })
})
