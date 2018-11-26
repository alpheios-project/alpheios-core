/* eslint-env jest */
import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup'

describe('lexical-query-lookup.test.js', () => {
  let mockSelector = {
    location: 'http://example.org',
    languageCode: 'lat'
  }

  it('1 LexicalQueryLookup - create function returns a new LexicalQuery with params', () => {
    let query = LexicalQueryLookup.create(mockSelector, { test: 'foo' })
    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('LexicalQuery')
    expect(typeof query.ID).toEqual('string')
    expect(query.canReset).toBeFalsy()

    expect(query.resourceOptions.test).toEqual('foo')
  })
})
