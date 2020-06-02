/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Logger } from 'alpheios-data-models'
import ExtendedGreekData from '@lib/extended-greek-data.js'

describe('extended-greek-data.test.js', () => {
  const logger = Logger.getInstance({ verbose: true })
  logger.log = jest.fn(() => {})

  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 ExtendedGreekData - constructor creates instance with default attributes values', () => {
    let EGD = new ExtendedGreekData()

    expect(EGD._type).toEqual('ExtendedGreekData')
    expect(EGD.primary).toBeFalsy()
  })

  it('2 ExtendedGreekData - readObject returns ExtendedGreekData object from JSON', () => {
    let testJSON = { 'primary': true }
    let result = ExtendedGreekData.readObject(testJSON)

    expect(result._type).toEqual('ExtendedGreekData')
    expect(result.primary).toBeTruthy()
  })

  it('3 ExtendedGreekData - merge combines two ExtendedGreekData', () => {
    let EGD1 = new ExtendedGreekData()

    let testJSON = { 'primary': true }
    let EGD2 = ExtendedGreekData.readObject(testJSON)

    expect(EGD1.merge(EGD2).primary).toBeFalsy()
    expect(EGD2.merge(EGD1).primary).toBeTruthy()
    expect(logger.log).toHaveBeenCalledWith('Mismatch', false, true)
    expect(logger.log).toHaveBeenCalledWith('Mismatch', true, false)
  })
})
