/* eslint-env jest */
import Logger from '../../../src/lib/log/logger'

describe('logger.test.js', () => {
  let logger
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  console.info = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
    jest.spyOn(console, 'info')
    logger = Logger.getInstance()
  })
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('logs in verbose mode', () => {
    logger.verboseModeOn()
    logger.log('test', 'test1')
    expect(console.log).toHaveBeenCalled()
  })

  it('does not log if not in verbose mode', () => {
    logger.verboseModeOff()
    logger.log('test2')
    expect(console.log).not.toHaveBeenCalled()
  })

  it('infos in verbose mode', () => {
    logger.verboseModeOn()
    logger.info('test3')
    expect(console.info).toHaveBeenCalled()
  })

  it('does not info if not in verbose mode', () => {
    logger.verboseModeOff()
    logger.info('test4')
    expect(console.info).not.toHaveBeenCalled()
  })

  it('warns in verbose mode', () => {
    logger.verboseModeOn()
    logger.warn('test3')
    expect(console.warn).toHaveBeenCalled()
  })

  it('does not warn if not in verbose mode', () => {
    logger.verboseModeOff()
    logger.warn('test4')
    expect(console.warn).not.toHaveBeenCalled()
  })

  it('errors in verbose mode', () => {
    logger.verboseModeOn()
    logger.error('test5')
    expect(console.error).toHaveBeenCalled()
  })

  it('does error if not in verbose mode', () => {
    logger.verboseModeOff()
    logger.error('test6')
    expect(console.error).toHaveBeenCalled()
  })
})
