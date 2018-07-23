/* eslint-env jest */
/* eslint-disable no-unused-vars */

import ExtendedGreekData from '@lib/extended-greek-data.js'

describe('extended-greek-data.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
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
    expect(console.log).toHaveBeenCalledWith('Mismatch', false, true)
    expect(console.log).toHaveBeenCalledWith('Mismatch', true, false)
  })
})
