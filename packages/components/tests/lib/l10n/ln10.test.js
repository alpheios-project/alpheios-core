/* eslint-env jest */
/* eslint-disable no-unused-vars */
import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import MessageBundle from '@/lib/l10n/message-bundle'

import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

describe('l10n.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  console.info = function () {}

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

  it('1 l10n - constructor creates an object with two attributes', () => {
    let testLn10 = new L10n()

    expect(testLn10.selectedLocale).toBeUndefined()
    expect(testLn10.bundles.constructor.name).toEqual('Map')
  })

  it('2 l10n - addMessages method, when bundle doesn\'t contain data for given locale (in arguments) it creates a new MessageBundle', () => {
    let testLn10 = new L10n()

    jest.spyOn(testLn10, 'addMessageBundle')

    let res = testLn10.addMessages(enUS, Locales.en_US)

    expect(testLn10.addMessageBundle).toHaveBeenCalled()
    expect(res.constructor.name).toEqual('L10n')
    expect(res.selectedLocale).toEqual('en-US')
    expect(res.bundles.get('en-US').constructor.name).toEqual('MessageBundle')
  })

  it('3 l10n - addMessages method, when bundle contains data for given locale - it adds data ', () => {
    let testLn10 = new L10n()

    let res = testLn10.addMessages(enUS, Locales.en_US)
    let messageBundle = testLn10.bundles.get(Locales.en_US)

    jest.spyOn(messageBundle, 'appendFromJSON')

    res.addMessages(JSON.stringify(enGB), Locales.en_US)
    expect(messageBundle.appendFromJSON).toHaveBeenCalledWith(JSON.stringify(enGB))
  })

  it('4 l10n - addMessageBundle method adds MessageBundle to bundle property and set selectedLocale if it is empty ', () => {
    let testLn10 = new L10n()
    let messageBundle = new MessageBundle(enUS, Locales.en_US)

    expect(testLn10.selectedLocale).toBeUndefined()
    testLn10.addMessageBundle(messageBundle)

    expect(testLn10.selectedLocale).toEqual(Locales.en_US)
    expect(testLn10.bundles.get('en-US')).toBeDefined()

    let messageBundle1 = new MessageBundle(enGB, Locales.en_GB)
    testLn10.addMessageBundle(messageBundle1)
    expect(testLn10.selectedLocale).toEqual(Locales.en_US)
  })

  it('5 l10n - locales get method returns keys from bundle ', () => {
    let testLn10 = new L10n().addMessages(enUS, Locales.en_US)
    expect(testLn10.locales).toEqual(['en-US'])
  })

  it('6 l10n - bundle get method returns data for selectedLocale from bundle  ', () => {
    let testLn10 = new L10n().addMessages(enUS, Locales.en_US)
    expect(testLn10.bundle).toEqual(testLn10.bundles.get(Locales.en_US))
  })

  it('7 l10n - setLocale method sets selectedLocale from argument if there is an object in bundle for locale from arguments', () => {
    let testLn10 = new L10n().addMessages(enUS, Locales.en_US)

    testLn10.setLocale(Locales.en_US)
    expect(testLn10.selectedLocale).toEqual(Locales.en_US)

    testLn10.setLocale(Locales.en_GB)
    expect(testLn10.selectedLocale).toEqual(Locales.en_US)
  })
})
