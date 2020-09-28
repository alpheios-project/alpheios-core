/* eslint-env jest */
// Cross-fetch is required to replace an in-browser `fetch` implementation
import fetch from 'cross-fetch' // eslint-disable-line no-unused-vars
import GqlEndpoint from '@comp/app/word-query/word-query-adapter.js'

describe('GqlEndpoint', () => {
  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  // TODO: Solve an issue with fetch being not defined
  it.skip('Constructor: should create an instance', async () => {
    const gqlEndpoint = new GqlEndpoint()
    expect(gqlEndpoint).toBeInstanceOf(GqlEndpoint)
  })
})
