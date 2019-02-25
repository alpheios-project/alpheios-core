/* eslint-env jest */
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import L10n from '@/lib/l10n/l10n.js'
import Locales from '@/locales/locales.js'

describe('l10n-module.test.js', () => {
  const testMsgsEnUs = {
    COOKIE_TEST_MESSAGE: {
      message: 'This is a test message about a cookie.',
      description: 'Test message description',
      component: 'Test component'
    },
    NUM_LINES_TEST_MESSAGE: {
      message: 'There {numLines, plural, =0 {are no lines} =1 {is one line} other {are # lines}}.',
      description: 'Test message description',
      component: 'Test component',
      params: ['numLines']
    },
    ABBREVIATED_MESSAGE: {
      message: 'This is an abbreviated message.',
      description: 'Test message description',
      component: 'Test component',
      abbr: 'Abbrev.'
    }
  }
  const testMsgsEnGb = {
    COOKIE_TEST_MESSAGE: {
      message: 'This is a test message about a biscuit.',
      description: 'Test message description',
      component: 'Test component'
    },
    NUM_LINES_TEST_MESSAGE: {
      message: 'There {numLines, plural, =0 {are no lines} =1 {is one line} other {are # lines}}.',
      description: 'Test message description',
      component: 'Test component',
      params: ['numLines']
    }
  }
  const existingMsgId = `COOKIE_TEST_MESSAGE`
  const existingPrmMsgId = `NUM_LINES_TEST_MESSAGE`
  const existingAbbrMsgId = `ABBREVIATED_MESSAGE`
  const nonExistingMsgId = 'NON_EXISTING_MESSAGE_ID'
  const nonExistingMsgTxt = `"NON_EXISTING_MESSAGE_ID" is not in translation data for en-US`

  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let l10nModule
  let api

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = new Vuex.Store({
      modules: {
      }
    })

    api = {}

    l10nModule = new L10nModule(store, api, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.createBundleArr([
        [testMsgsEnUs, Locales.en_US],
        [testMsgsEnGb, Locales.en_GB]
      ])
    })
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('L10nModule should have a correct static public name', () => {
    const modulePublicName = 'l10n'
    expect(L10nModule.moduleName).toEqual(modulePublicName)
  })

  it('L10nModule should have a fully initialized private L10n object', () => {
    const selectedLocale = `en-US`
    const l10nLocales = [`en-US`, `en-GB`]
    const l10nLocalesQty = l10nLocales.length
    expect(l10nModule._l10n).toBeInstanceOf(L10n)
    expect(l10nModule._l10n.locales).toEqual(expect.arrayContaining(l10nLocales))
    expect(l10nModule._l10n.locales).toHaveLength(l10nLocalesQty)
    expect(l10nModule._l10n.selectedLocale).toEqual(selectedLocale)
  })

  it(`L10nModule's store should be initialized with correct default values`, () => {
    const defaultLocale = `en-US`
    expect(store.state.l10n.selectedLocale).toEqual(defaultLocale)
  })

  it(`L10nModule's setLocale() store mutation should change a locale value`, () => {
    const newLocale = `en-GB`
    store.commit('l10n/setLocale', newLocale)
    expect(store.state.l10n.selectedLocale).toEqual(newLocale)
  })

  it('L10nModule should expose an api with a correct set of methods', () => {
    const methods = ['getLocale', 'setLocale', 'hasMsg', 'getMsg', 'getText', 'getAbbr']
    expect(Object.keys(api.l10n)).toEqual(expect.arrayContaining(methods))
  })

  it(`L10nModule API's getLocale() should return a value of a current locale`, () => {
    const currentLocale = `en-US`
    expect(api.l10n.getLocale()).toEqual(currentLocale)
  })

  it(`L10nModule API's setLocale() should change a current locale value`, () => {
    const newLocale = `en-GB`
    api.l10n.setLocale(newLocale)
    expect(store.state.l10n.selectedLocale).toEqual(newLocale)
  })

  it(`L10nModule API's hasMsg() should return true for an existing message`, () => {
    expect(api.l10n.hasMsg(existingMsgId)).toBeTruthy()
  })

  it(`L10nModule API's hasMsg() should change a current locale value`, () => {
    expect(api.l10n.hasMsg(existingMsgId)).toBeTruthy()
  })

  it(`L10nModule API's getMsg() should retrieve a message text`, () => {
    expect(api.l10n.getMsg(existingMsgId)).toEqual(testMsgsEnUs[existingMsgId].message)
  })

  it(`L10nModule API's getMsg() with default options should display an error message if message does not exist`, () => {
    expect(api.l10n.getMsg(nonExistingMsgId)).toEqual(nonExistingMsgTxt)
  })

  it(`L10nModule API's getMsg() with passthrough options should return a message ID if message does not exist`, () => {
    expect(api.l10n.getMsg(nonExistingMsgId, {}, { passthrough: true })).toEqual(nonExistingMsgId)
  })

  it(`L10nModule API's getMsg() with formatting parameters should retrieve a message text`, () => {
    const prmMsg = 'There is one line.'
    expect(api.l10n.getMsg(existingPrmMsgId, { numLines: 1 })).toEqual(prmMsg)
  })

  it(`L10nModule API's getText() should retrieve a message text`, () => {
    expect(api.l10n.getText(existingMsgId)).toEqual(testMsgsEnUs[existingMsgId].message)
  })

  it(`L10nModule API's getText() with formatting parameters should retrieve a message text`, () => {
    const prmMsg = 'There are 2 lines.'
    expect(api.l10n.getText(existingPrmMsgId, { numLines: 2 })).toEqual(prmMsg)
  })

  it(`L10nModule API's getText() should return a message ID if message does not exist`, () => {
    expect(api.l10n.getText(nonExistingMsgId)).toEqual(nonExistingMsgId)
  })

  it(`L10nModule API's getAbbr() should return an abbreviated version of a message if exists`, () => {
    const abbrMsg = 'Abbrev.'
    expect(api.l10n.getAbbr(existingAbbrMsgId)).toEqual(abbrMsg)
  })

  it(`L10nModule API's getAbbr() should return a message text if abbreviation does not exists`, () => {
    expect(api.l10n.getAbbr(existingMsgId)).toEqual(testMsgsEnUs[existingMsgId].message)
  })

  it(`L10nModule API's getAbbr() should return a formatted message text if abbreviation does not exists and message has parameters`, () => {
    const prmMsg = 'There are no lines.'
    expect(api.l10n.getAbbr(existingPrmMsgId, { numLines: 0 })).toEqual(prmMsg)
  })
})
