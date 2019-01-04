/* eslint-env jest */
/* eslint-disable no-unused-vars */
import MessageBundle from '@/lib/l10n/message-bundle'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import Locales from '@/locales/locales'

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

  it('1 MessageBundle - constructor has required properties Locale and messagesJSON', () => {
    expect(function () {
      let l = new MessageBundle(enUS, null)
      console.log(l)
    }).toThrowError('Locale data is missing')

    expect(function () {
      let l = new MessageBundle(null, Locales.en_US)
      console.log(l)
    }).toThrowError('Message data is missing')
  })

  it('2 MessageBundle - get method returns message by id', () => {
    let mockMessage = { MOCK_MESSAGE : { message:"testfull",abbr:"tf."} }
    let mb = new MessageBundle(mockMessage, Locales.en_US)
    expect(mb.get('MOCK_MESSAGE')).toEqual('testfull')
    expect(mb.get('FOO_BAR_TEST')).toEqual(`Not in translation data: "FOO_BAR_TEST"`)

    // console.info('*****************mb.get(TEXT_NOTICE_DEFSDATA_READY)', mb.get('TEXT_NOTICE_DEFSDATA_READY'))
    // console.info('*****************mb.messages[TEXT_NOTICE_DEFSDATA_READY]', mb.messages['TEXT_NOTICE_DEFSDATA_READY'])
  })

  it('3 MessageBundle - abbr method returns abbreviated message by id', () => {
    let mockMessage = { MOCK_MESSAGE : { message:"testfull",abbr:"tf."} }
    let mb = new MessageBundle(mockMessage, Locales.en_US)
    expect(mb.get('MOCK_MESSAGE')).toEqual('testfull')
    expect(mb.abbr('MOCK_MESSAGE')).toEqual('tf.')
  })

  it('4 MessageBundle - parses data messages', () => {
      let l = new MessageBundle(enUSData, Locales.en_US)
      expect(l.get('noun')).toEqual('noun')
  })

  it('5 MessageBundle - abbr method handles abbreviated message request missing id', () => {
    let mockMessage = { MOCK_MESSAGE : { message:"testfull",abbr:"tf."} }
    let mb = new MessageBundle(mockMessage, Locales.en_US)
    expect(mb.abbr('MISSING_MESSAGE')).toEqual('Not in translation data: "MISSING_MESSAGE"')
  })
})
