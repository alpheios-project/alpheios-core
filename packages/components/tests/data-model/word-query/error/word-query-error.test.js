/* eslint-env jest */
import WordQueryError from '@comp/data-model/word-query/error/word-query-error.js'
import WordQueryErrorCodes from '@comp/data-model/word-query/error/word-query-error-codes.js'

describe('WordQueryError', () => {
  let errorMessage
  let errorCode
  let path

  beforeEach(() => {
    errorMessage = 'Error message'
    errorCode = WordQueryErrorCodes.TUFTS_ERROR
    path = ['segment one', 'segment two']
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Constructor: creates an instance', async () => {
    const wordQueryError = new WordQueryError(errorMessage, errorCode)
    expect(wordQueryError).toBeInstanceOf(WordQueryError)
  })

  it('Constructor: should not create an instance without a message', async () => {
    expect(() => new WordQueryError()).toThrowError('WordQueryError requires a message to be provided')
  })

  it('Constructor: should not create an instance without an error code', async () => {
    expect(() => new WordQueryError(errorMessage)).toThrowError('WordQueryError requires a code to be provided')
  })

  it('Constructor: should initialize all values properly', async () => {
    const wordQueryError = new WordQueryError(errorMessage, errorCode, { path })
    expect(wordQueryError.message).toBe(errorMessage)
    expect(wordQueryError.path).toBe(path)
    expect(wordQueryError.extensions.code).toBe(errorCode)
  })

  it('Constructor: if path is not provided it should be set to an empty array', async () => {
    const wordQueryError = new WordQueryError(errorMessage, errorCode)
    expect(wordQueryError.path).toEqual([])
  })

  it('toJsonObject: should return a JSON object representation', async () => {
    const wordQueryError = new WordQueryError(errorMessage, errorCode, { path })
    expect(wordQueryError.toJsonObject()).toEqual({
      message: errorMessage,
      path: path,
      extensions: {
        code: errorCode
      }
    })
  })
})
