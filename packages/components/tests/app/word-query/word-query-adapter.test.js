/* eslint-env jest */
// Cross-fetch is required to replace an in-browser `fetch` implementation
import fetch from 'cross-fetch' // eslint-disable-line no-unused-vars
import WordQueryAdapter from '@comp/app/word-query/word-query-adapter.js'
import { gql } from '@apollo/client/core'

describe('WordQueryAdapter', () => {
  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it.skip('Query should return correct results', async () => {
    const query = {
      query: gql`
            query WordQuery($langCode: Language, $userID: String) {
              word(langCode: $langCode, userID: $userID)
            }
          `,
      variables: {
        langCode: 'lat',
        word: 'fero'
      }
    }
    const results = await WordQueryAdapter.getInstance().query(query)
    expect(results.data).toEqual({
      word: {
      }
    })
  })
})
