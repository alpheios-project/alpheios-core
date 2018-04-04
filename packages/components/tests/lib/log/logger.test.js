/* eslint-env jest */
import Logger from '../../../src/lib/log/logger'

describe('logger.test.js', () => {
  let spy

  beforeEach(() => {
  })

  it('logs in verbose mode', () => {
    spy = jest.spyOn(console, 'log')
    let logger = Logger.getLogger(true)
    logger.log('test', 'test1')
    expect(spy).toHaveBeenCalled()
  })

  it('does not log if not in verbose mode', () => {
    spy = jest.spyOn(console, 'log')
    let logger = Logger.getLogger(false)
    logger.log('test2')
    expect(spy).not.toHaveBeenCalled()
  })

  it('infos in verbose mode', () => {
    spy = jest.spyOn(console, 'info')
    let logger = Logger.getLogger(true)
    logger.info('test3')
    expect(spy).toHaveBeenCalled()
  })

  it('does not info if not in verbose mode', () => {
    spy = jest.spyOn(console, 'info')
    let logger = Logger.getLogger(false)
    logger.info('test4')
    expect(spy).not.toHaveBeenCalled()
  })

  it('warns in verbose mode', () => {
    spy = jest.spyOn(console, 'warn')
    let logger = Logger.getLogger(true)
    logger.warn('test3')
    expect(spy).toHaveBeenCalled()
  })

  it('does not warn if not in verbose mode', () => {
    spy = jest.spyOn(console, 'warn')
    let logger = Logger.getLogger(false)
    logger.warn('test4')
    expect(spy).not.toHaveBeenCalled()
  })

  it('errors in verbose mode', () => {
    spy = jest.spyOn(console, 'error')
    let logger = Logger.getLogger(true)
    logger.error('test5')
    expect(spy).toHaveBeenCalled()
  })

  it('does error if not in verbose mode', () => {
    spy = jest.spyOn(console, 'error')
    let logger = Logger.getLogger(false)
    logger.error('test6')
    expect(spy).toHaveBeenCalled()
  })

  afterEach(() => {
    spy.mockReset()
    spy.mockRestore()
  })
})
