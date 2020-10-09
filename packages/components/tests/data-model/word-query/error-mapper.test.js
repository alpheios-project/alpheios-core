/* eslint-env jest */
import { AdapterError } from 'alpheios-client-adapters'
import ErrorMapper from '@comp/data-model/word-query/error/error-mapper.js'
import WordQueryErrorCodes from '@comp/data-model/word-query/error/word-query-error-codes.js'

describe('ErrorMapper', () => {
  let claCategory
  let claAdapterName
  let claMethodName
  let claErrorMessage
  let adapterError
  let errorCode

  beforeAll(() => {
    claCategory = 'The Category'
    claAdapterName = 'The Adapter Name'
    claMethodName = 'The Method Name'
    claErrorMessage = 'The Error Message'
    adapterError = new AdapterError(claCategory, claAdapterName, claMethodName, claErrorMessage)
    errorCode = WordQueryErrorCodes.TREEBANK_ERROR
  })

  beforeEach(() => {
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('toWordQueryError: creates an instance of a WordQueryError out of AdapterError', async () => {
    const wordQueryError = ErrorMapper.toWordQueryError(adapterError, { errorCode })
    expect(wordQueryError).toEqual({
      message: `${claErrorMessage} (${claCategory}.${claAdapterName}.${claMethodName})`,
      path: [claMethodName, `${claCategory}.${claAdapterName}`],
      extensions: {
        code: errorCode
      }
    })
  })
})
