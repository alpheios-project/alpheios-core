/* eslint-env jest */
import DefaultsLoader from '@/lib/options/defaults-loader'

describe('deafults-loader.test.js', () => {
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

  it('1 DefaultsLoader has fromJSON static method', () => {
    expect(typeof DefaultsLoader.fromJSON).toEqual('function')
  })

  it('2 DefaultsLoader - fromJSON method parses JSON string', () => {
    let res = DefaultsLoader.fromJSON('["panelPosition", "preferredLanguage"]')
    expect(Array.isArray(res)).toBeTruthy()
    expect(res[0]).toEqual('panelPosition')
    expect(res[1]).toEqual('preferredLanguage')
  })

  // it('3 DefaultsLoader - fromJSON method write console error if string is not a valid JSON', () => {
  //  let testError = new SyntaxError('Unexpected token p in JSON at position 0')
  //  DefaultsLoader.fromJSON(['panelPosition', 'preferredLanguage'])
  //  expect(console.error).toHaveBeenCalledWith(`Unable to parse JSON options string:`, testError)
  // })
})
