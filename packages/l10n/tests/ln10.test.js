/* eslint-env jest */
/* eslint-disable no-unused-vars */
import L10n from '@l10n/l10n.js'
import MessageBundle from '@l10n/message-bundle.js'

describe('l10n.test.js', () => {
  const localeEnUs = 'en-US'
  const localeEnGb = 'en-GB'
  const enUS = {}
  const enGB = {}
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
    const testLn10 = new L10n()

    expect(testLn10.selectedLocale).toBeUndefined()
    expect(testLn10.bundles.constructor.name).toEqual('Map')
  })

  it('2 l10n - addMessages method, when bundle doesn\'t contain data for given locale (in arguments) it creates a new MessageBundle', () => {
    let testLn10 = new L10n() // eslint-disable-line prefer-const

    jest.spyOn(testLn10, 'addMessageBundle')

    const res = testLn10.addMessages(enUS, localeEnUs)

    expect(testLn10.addMessageBundle).toHaveBeenCalled()
    expect(res.constructor.name).toEqual('L10n')
    expect(res.selectedLocale).toEqual('en-US')
    expect(res.bundles.get('en-US').constructor.name).toEqual('MessageBundle')
  })

  it('3 l10n - addMessages method, when bundle contains data for given locale - it adds data ', () => {
    let testLn10 = new L10n() // eslint-disable-line prefer-const

    const res = testLn10.addMessages(enUS, localeEnUs)
    const messageBundle = testLn10.bundles.get(localeEnUs)

    jest.spyOn(messageBundle, 'appendFromJSON')

    res.addMessages(JSON.stringify(enGB), localeEnUs)
    expect(messageBundle.appendFromJSON).toHaveBeenCalledWith(JSON.stringify(enGB))
  })

  it('4 l10n - addMessageBundle method adds MessageBundle to bundle property and set selectedLocale if it is empty ', () => {
    let testLn10 = new L10n() // eslint-disable-line prefer-const
    const messageBundle = new MessageBundle(enUS, localeEnUs)

    expect(testLn10.selectedLocale).toBeUndefined()
    testLn10.addMessageBundle(messageBundle)

    expect(testLn10.selectedLocale).toEqual(localeEnUs)
    expect(testLn10.bundles.get('en-US')).toBeDefined()

    const messageBundle1 = new MessageBundle(enGB, localeEnGb)
    testLn10.addMessageBundle(messageBundle1)
    expect(testLn10.selectedLocale).toEqual(localeEnUs)
  })

  it('5 l10n - locales get method returns keys from bundle ', () => {
    const testLn10 = new L10n().addMessages(enUS, localeEnUs)
    expect(testLn10.locales).toEqual(['en-US'])
  })

  it('6 l10n - bundle get method returns data for selectedLocale from bundle  ', () => {
    const testLn10 = new L10n().addMessages(enUS, localeEnUs)
    expect(testLn10.bundle).toEqual(testLn10.bundles.get(localeEnUs))
  })

  it('7 l10n - setLocale method sets selectedLocale from argument if there is an object in bundle for locale from arguments', () => {
    let testLn10 = new L10n().addMessages(enUS, localeEnUs) // eslint-disable-line prefer-const

    testLn10.setLocale(localeEnUs)
    expect(testLn10.selectedLocale).toEqual(localeEnUs)

    testLn10.setLocale(localeEnGb)
    expect(testLn10.selectedLocale).toEqual(localeEnUs)
  })
})
