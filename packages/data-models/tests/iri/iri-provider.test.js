/* eslint-env jest */
import IRIProvider from '@dmodels/iri/iri-provider.js'

describe('IRIProvider', () => {
  const identityData = {
    propOne: 'one',
    propTwo: 'two'
  }

  const uuidPattern = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/
  const md5Pattern = /\w{32}/

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('getIRI: should return a UUID v4 if called without arguments', () => {
    const retVal = IRIProvider.getIRI()
    expect(retVal).toMatch(uuidPattern)
  })

  it('getIRI: should return an MD5 hash if called with an identity data', () => {
    const retVal = IRIProvider.getIRI({ identityData })
    expect(retVal).toMatch(md5Pattern)
  })

  it('getIRI: should return a UUID v4 if corresponding type is selected (without identity data)', () => {
    const retVal = IRIProvider.getIRI({ type: IRIProvider.IRITypes.UUID_V4 })
    expect(retVal).toMatch(uuidPattern)
  })

  it('getIRI: should return a UUID v4 if corresponding type is selected (identity data supplied)', () => {
    const retVal = IRIProvider.getIRI({ identityData, type: IRIProvider.IRITypes.UUID_V4 })
    expect(retVal).toMatch(uuidPattern)
  })

  it('getIRI: should return an MD5 hash if corresponding type is selected', () => {
    const retVal = IRIProvider.getIRI({ identityData, type: IRIProvider.IRITypes.MD5_HASH })
    expect(retVal).toMatch(md5Pattern)
  })

  it('getIRI: should throw an error if identity data is not provided for the MD5', () => {
    expect(() => IRIProvider.getIRI({ type: IRIProvider.IRITypes.MD5_HASH }))
      .toThrowError(IRIProvider.errMsgs.INCORRECT_IDENTITY_DATA)
  })

  it('getIRI: should throw an error if incorrect IRI type is provided', () => {
    expect(() => IRIProvider.getIRI({ type: 'Unknown IRI Type' }))
      .toThrowError(IRIProvider.errMsgs.UNKNOWN_IRI_TYPE)
  })

  it('getIRI: should throw an error if an empty identity object is provided for the MD5', () => {
    expect(() => IRIProvider.getIRI({ identityData: {}, type: IRIProvider.IRITypes.MD5_HASH }))
      .toThrowError(IRIProvider.errMsgs.INCORRECT_IDENTITY_DATA)
  })

  it('getIRI: should throw an error if an identity object provided for the MD5 contains non-string values', () => {
    const identityData = {
      validValue: 'A valid value',
      invalidValue: 11
    }
    expect(() => IRIProvider.getIRI({ identityData, type: IRIProvider.IRITypes.MD5_HASH }))
      .toThrowError(IRIProvider.errMsgs.INCORRECT_IDENTITY_DATA)
  })

  it('getIRI: should throw an error if an identity object provided for the MD5 contains empty string values', () => {
    const identityData = {
      validValue: 'A valid value',
      invalidValue: ''
    }
    expect(() => IRIProvider.getIRI({ identityData, type: IRIProvider.IRITypes.MD5_HASH }))
      .toThrowError(IRIProvider.errMsgs.INCORRECT_IDENTITY_DATA)
  })
})
