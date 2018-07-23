/* eslint-env jest */
/* eslint-disable no-unused-vars */

import L10n from '@l10n/l10n.js'

import MessageBundle from '@l10n/message-bundle.js'
import enUS from '@l10n/locale/en-us.json'
import enGB from '@l10n/locale/en-gb.json'

describe('l10n.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let messageData = []
  messageData.push(new MessageBundle('en-US', enUS))
  messageData.push(new MessageBundle('en-GB', enGB))

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

  it('1 L10n - constructor inits attributes with default data and executes addLocaleData for each MesageBundle', () => {
    let l10n = new L10n(messageData)
    expect(Object.keys(l10n._locales).length).toEqual(2)
    expect(Object.keys(l10n._localeList).length).toEqual(2)
  })

  it('2 L10n - defaultLocale returns en-US', () => {
    expect(L10n.defaultLocale).toEqual('en-US')
  })

  it('3 L10n - locales returns constant array of available locales', () => {
    expect(L10n.locales).toEqual(['en-US', 'en-GB'])
  })

  it('4 L10n - addLocaleData adds messages', () => {
    let l10n = new L10n(messageData)

    expect(l10n._localeList).toEqual(['en-US', 'en-GB'])
    expect(l10n._locales).toEqual({ 'en-US': messageData[0], 'en-GB': messageData[1] })
  })

  it('5 L10n - messages throw error for unsupported locale', () => {
    let l10n = new L10n(messageData)

    expect(() => l10n.messages('ru-RU')).toThrow(new Error('Locale "ru-RU" is not found.'))
  })

  it('6 L10n - messages returns messages for locale from attributes', () => {
    let l10n = new L10n(messageData)

    expect(l10n.messages('en-US')).toEqual(messageData[0])
  })

  it('7 L10n - locales returns all supported locales', () => {
    let l10n = new L10n(messageData)

    expect(l10n.locales).toEqual(['en-US', 'en-GB'])
  })
})
