/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Message from '@/lib/l10n/message'
import MessageBundle from '@/lib/l10n/message-bundle'
import enUS from '@/locales/en-us/messages.json'
import Locales from '@/locales/locales'

describe('message.test.js', () => {
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

  it('2 Message - defineProperties adds format and get to Message if message has params', () => {
    let m = new Message(enUS['NUM_LINES_TEST_MESSAGE'], Locales.en_US)

    let mb = new MessageBundle(enUS, Locales.en_US)
    m.defineProperties(mb.messages, 'NUM_LINES_TEST_MESSAGE')

    expect(typeof mb.messages['NUM_LINES_TEST_MESSAGE']).toEqual('object')
    expect(mb.messages['NUM_LINES_TEST_MESSAGE'].get(10)).toEqual('There are 10 lines.')
    expect(mb.messages['NUM_LINES_TEST_MESSAGE'].get(1)).toEqual('There is one line.')
  })

  it('3 Message - defineProperties adds get to Message if message has no params', () => {
    let m1 = new Message(enUS['TOOLTIP_MOVE_PANEL_RIGHT'], Locales.en_US)

    let mb = new MessageBundle(enUS, Locales.en_US)

    m1.defineProperties(mb.messages, 'TOOLTIP_MOVE_PANEL_RIGHT')
    expect(typeof mb.messages['TOOLTIP_MOVE_PANEL_RIGHT'].get()).toEqual('string')

    let m2 = new Message(enUS['TEXT_NOTICE_DEFSDATA_READY'], Locales.en_US)
    m2.defineProperties(mb.messages, 'TEXT_NOTICE_DEFSDATA_READY')

    expect(typeof mb.messages['TEXT_NOTICE_DEFSDATA_READY'].format).toEqual('function')
    expect(mb.messages['TEXT_NOTICE_DEFSDATA_READY'].format({ requestType: 'foo type', lemma: 'foo lemma' })).toEqual(m2.formatFunc.format({ requestType: 'foo type', lemma: 'foo lemma' }))
  })

  it('4 Message - returns abbreviation if present',() => {
    let mockMessage = { MOCK_MESSAGE : { message:"testfull",abbr:"tf."} }
    let m = new Message(mockMessage.MOCK_MESSAGE, Locales.en_US)
    let mockMessageBundle = { messages: {'MOCK_MESSAGE':m } }
    m.defineProperties(mockMessageBundle.messages,'MOCK_MESSAGE')
    expect(mockMessageBundle.messages['MOCK_MESSAGE'].abbr()).toEqual('tf.')
  })

  it('5 Message - returns full message for abbreviation if no abbreviation present',() => {
    let mockMessage = { MOCK_MESSAGE : { message:"testfull" }}
    let m = new Message(mockMessage.MOCK_MESSAGE, Locales.en_US)
    let mockMessageBundle = { messages: {'MOCK_MESSAGE':m } }
    m.defineProperties(mockMessageBundle.messages,'MOCK_MESSAGE')
    expect(mockMessageBundle.messages['MOCK_MESSAGE'].abbr()).toEqual('testfull')
  })
  it('6 Message - returns parameterized abbreviation',() => {
    let mockMessage = { MOCK_MESSAGE : { message:"testfull {p1}", abbr:"tf. {p1}", params: ["p1"] }}
    let m = new Message(mockMessage.MOCK_MESSAGE, Locales.en_US)
    let mockMessageBundle = { messages: {'MOCK_MESSAGE':m } }
    m.defineProperties(mockMessageBundle.messages,'MOCK_MESSAGE')
    expect(mockMessageBundle.messages['MOCK_MESSAGE'].abbr("1")).toEqual('tf. 1')
  })
})
