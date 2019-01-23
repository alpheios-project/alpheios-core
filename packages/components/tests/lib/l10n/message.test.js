/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Message from '@/lib/l10n/message'
import MessageBundle from '@/lib/l10n/message-bundle'
import enUS from '@/locales/en-us/messages.json'
import Locales from '@/locales/locales'

describe('message.test.js', () => {
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
  const existingMsgId = `COOKIE_TEST_MESSAGE`
  const existingPrmMsgId = `NUM_LINES_TEST_MESSAGE`
  const existingAbbrMsgId = `ABBREVIATED_MESSAGE`

  let message

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

  it('1 Message - constructor has required properties Locale and messagesJSON', () => {
    expect(function () {
      let l = new Message(enUS['COOKIE_TEST_MESSAGE'], null)
      console.log(l)
    }).toThrowError('Locale data is missing')

    expect(function () {
      let l = new Message(null, Locales.en_US)
      console.log(l)
    }).toThrowError('Message data is missing')
  })

  it(`2 Message - getMsg() should retrieve a message text`, () => {
    message = new Message(testMsgsEnUs[existingMsgId], Locales.en_US)
    expect(message.getMsg(existingMsgId)).toEqual(testMsgsEnUs[existingMsgId].message)
  })

  it(`3 Message - getMsg() with formatting parameters should retrieve a message text`, () => {
    const prmMsg = 'There is one line.'
    message = new Message(testMsgsEnUs[existingPrmMsgId], Locales.en_US)
    expect(message.getMsg({ numLines: 1 })).toEqual(prmMsg)
  })

  it(`4 Message - getAbbr() should return an abbreviated version of a message if exists`, () => {
    const abbrMsg = 'Abbrev.'
    message = new Message(testMsgsEnUs[existingAbbrMsgId], Locales.en_US)
    expect(message.getAbbr(existingAbbrMsgId)).toEqual(abbrMsg)
  })

  it(`5 Message - getAbbr() should return a message text if abbreviation does not exists`, () => {
    message = new Message(testMsgsEnUs[existingMsgId], Locales.en_US)
    expect(message.getAbbr()).toEqual(testMsgsEnUs[existingMsgId].message)
  })

  it(`6 Message - getAbbr() should return a formatted message text if abbreviation does not exists and message has parameters`, () => {
    const prmMsg = 'There are no lines.'
    message = new Message(testMsgsEnUs[existingPrmMsgId], Locales.en_US)
    expect(message.getAbbr({ numLines: 0 })).toEqual(prmMsg)
  })
})
