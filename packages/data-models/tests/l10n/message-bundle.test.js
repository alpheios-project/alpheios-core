/* eslint-env jest */
/* eslint-disable no-unused-vars */
import MessageBundle from '../../src/l10n/message-bundle.js'

describe('message-bundle.test.js', () => {
  const localeEnUs = 'en-US'
  const enUSData = {
    noun: {
      message: 'noun'
    }
  }
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
      const l = new MessageBundle(enUSData, null)
      console.log(l)
    }).toThrowError('Locale data is missing')

    expect(function () {
      const l = new MessageBundle(null, localeEnUs)
      console.log(l)
    }).toThrowError('Message data is missing')
  })

  it('2 MessageBundle - get method returns message by id', () => {
    const mockMessage = { MOCK_MESSAGE: { message: 'testfull', abbr: 'tf.' } }
    const mb = new MessageBundle(mockMessage, localeEnUs)
    expect(mb.getMsg('MOCK_MESSAGE')).toEqual('testfull')
    expect(mb.getMsg('FOO_BAR_TEST')).toEqual('"FOO_BAR_TEST" is not in translation data for en-US')
  })

  it('3 MessageBundle - abbr method returns abbreviated message by id', () => {
    const mockMessage = { MOCK_MESSAGE: { message: 'testfull', abbr: 'tf.' } }
    const mb = new MessageBundle(mockMessage, localeEnUs)
    expect(mb.getMsg('MOCK_MESSAGE')).toEqual('testfull')
    expect(mb.getAbbr('MOCK_MESSAGE')).toEqual('tf.')
  })

  it('4 MessageBundle - parses data messages', () => {
    const l = new MessageBundle(enUSData, localeEnUs)
    expect(l.getMsg('noun')).toEqual('noun')
  })

  it('5 MessageBundle - abbr method handles abbreviated message request missing id', () => {
    const mockMessage = { MOCK_MESSAGE: { message: 'testfull', abbr: 'tf.' } }
    const mb = new MessageBundle(mockMessage, localeEnUs)
    expect(mb.getAbbr('MISSING_MESSAGE')).toEqual('Missing translation: MISSING_MESSAGE [en-US]')
  })
})
