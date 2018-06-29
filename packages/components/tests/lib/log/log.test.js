/* eslint-env jest */
import Logger from '../../../src/lib/log/logger'

describe('logger.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  console.info = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
    jest.spyOn(console, 'info')
  })
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('logs in verbose mode', () => {
    let logger = Logger.getLogger(true)
    logger.log('test', 'test1')
    expect(console.log).toHaveBeenCalled()
  })

  it('does not log if not in verbose mode', () => {
    let logger = Logger.getLogger(false)
    logger.log('test2')
    expect(console.log).not.toHaveBeenCalled()
  })

  it('infos in verbose mode', () => {
    let logger = Logger.getLogger(true)
    logger.info('test3')
    expect(console.info).toHaveBeenCalled()
  })

  it('does not info if not in verbose mode', () => {
    let logger = Logger.getLogger(false)
    logger.info('test4')
    expect(console.info).not.toHaveBeenCalled()
  })

  it('warns in verbose mode', () => {
    let logger = Logger.getLogger(true)
    logger.warn('test3')
    expect(console.warn).toHaveBeenCalled()
  })

  it('does not warn if not in verbose mode', () => {
    let logger = Logger.getLogger(false)
    logger.warn('test4')
    expect(console.warn).not.toHaveBeenCalled()
  })

  it('errors in verbose mode', () => {
    let logger = Logger.getLogger(true)
    logger.error('test5')
    expect(console.error).toHaveBeenCalled()
  })

  it('does error if not in verbose mode', () => {
    let logger = Logger.getLogger(false)
    logger.error('test6')
    expect(console.error).toHaveBeenCalled()
  })
})
