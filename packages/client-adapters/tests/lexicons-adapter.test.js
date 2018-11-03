/* eslint-env jest */
import 'whatwg-fetch'
import AlpheiosLexiconsAdapter from '@/lexicons/adapter'

describe('LexiconsAdapter', () => {
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

  it('1 LexiconsAdapter', async () => {
    let adapter = new AlpheiosLexiconsAdapter()
    adapter.fetchDefinitions(null, { foo: 'bar' }, null)
    console.info('adapter1', adapter)
  })
})
