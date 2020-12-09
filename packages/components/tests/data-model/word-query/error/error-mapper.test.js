/* eslint-env jest */
import { AdapterError } from 'alpheios-client-adapters'
import ErrorMapper from '@comp/data-model/word-query/error/error-mapper.js'
import ErrorCodes from '@comp/data-model/constants/error-codes.js'
import ErrorOrigins from '@comp/data-model/constants/error-origins.js'
import ErrorSeverityTypes from '@comp/data-model/constants/error-severity-types.js'

describe('ErrorMapper', () => {
  let claCategory
  let claAdapterName
  let claMethodName
  let claErrorMessage
  let adapterError
  let errCode
  let path

  beforeAll(() => {
    claCategory = 'The Category'
    claAdapterName = 'The Adapter Name'
    claMethodName = 'The Method Name'
    claErrorMessage = 'The Error Message'
    errCode = ErrorCodes.TREEBANK_ERROR
    path = ['homonyms']
    adapterError = new AdapterError(claCategory, claAdapterName, claMethodName, claErrorMessage)
  })

  beforeEach(() => {
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('clientAdaptersToWordQuery: creates an instance of a WordQueryError out of AdapterError', async () => {
    const wordQueryError = ErrorMapper.clientAdaptersToWordQuery(adapterError, { errCode })
    expect(wordQueryError).toEqual({
      message: `${claErrorMessage} (${claCategory}.${claAdapterName}.${claMethodName})`,
      path: path,
      extensions: {
        severity: ErrorSeverityTypes.ERROR,
        origin: ErrorOrigins.CLIENT_ADAPTERS,
        errCode: errCode,
        clAdapter: `${claCategory}.${claAdapterName}`,
        clAdapterMethod: claMethodName
      }
    })
  })
})
