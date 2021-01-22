/* eslint-env jest */
// Cross-fetch is required to replace an in-browser `fetch` implementation
import fetch from 'cross-fetch' // eslint-disable-line no-unused-vars
import DataModelController from '@comp/data-model/data-model-controller.js'
import GqlEndpoint from '@comp/data-model/endpoints/gql-endpoint.js'
import Platform from '@comp/lib/utility/platform.js'

describe('DataModelController', () => {
  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('Constructor: creates an instance', async () => {
    const platform = new Platform()
    const dmC = new DataModelController({ platform })
    expect(dmC).toBeInstanceOf(DataModelController)
  })

  it('Constructor: should create an instance of gqlEndpoint', async () => {
    const platform = new Platform()
    const dmC = new DataModelController({ platform })
    expect(dmC.gqlEndpoint).toBeInstanceOf(GqlEndpoint)
  })
})
