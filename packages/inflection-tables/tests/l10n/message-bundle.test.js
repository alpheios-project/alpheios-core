/* eslint-env jest */
/* eslint-disable no-unused-vars */

import MessageBundle from '@l10n/message-bundle.js'
import enUS from '@l10n/locale/en-us.json'

import IntlMessageFormat from 'intl-messageformat'

describe('message-bundle.test.js', () => {
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

  it('1 MessageBundle - constructor throw error if locale is empty', () => {
    expect(() => new MessageBundle()).toThrow(new Error('Locale data is missing'))
  })

  it('2 MessageBundle - constructor throw error if messages are empty', () => {
    expect(() => new MessageBundle('en-US')).toThrow(new Error('Messages data is missing'))
  })

  it('3 MessageBundle - constructor inits arguments with default values', () => {
    let mb = new MessageBundle('en-US', enUS)
    expect(mb._locale).toEqual('en-US')
    Object.keys(enUS).forEach(mess => { expect(mb[mess]).toBeInstanceOf(IntlMessageFormat) })
  })

  it('4 MessageBundle - locale returns _locale attribute', () => {
    let mb = new MessageBundle('en-US', enUS)
    expect(mb.locale).toEqual('en-US')
  })

  it('5 MessageBundle - get returns message data for messageID', () => {
    let mb = new MessageBundle('en-US', enUS)
    expect(mb.get('Case')).toEqual('Case')
  })

  it('5 MessageBundle - get returns error for non-exists messageID', () => {
    let mb = new MessageBundle('en-US', enUS)
    expect(mb.get('Foo')).toEqual('Not in translation data: "Foo"')
  })
})
