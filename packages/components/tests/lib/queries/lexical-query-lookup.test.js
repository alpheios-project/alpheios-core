/* eslint-env jest */
import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup'

describe('lexical-query-lookup.test.js', () => {
  let mockSelector = {
    location: 'http://example.org',
    languageCode: 'lat'
  }

  let uiController = {
    updateLanguage: function () { }
  }

  it('1 LexicalQueryLookup - create function returns a new LexicalQuery with params', () => {
    let query = LexicalQueryLookup.create(mockSelector, uiController, { test: 'foo' })
    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('LexicalQuery')
    expect(typeof query.ID).toEqual('string')
    expect(query.canReset).toBeFalsy()

    expect(query.resourceOptions.test).toEqual('foo')
  })

  it('2 LexicalQueryLookup - create function with undefined resourceOptions then it would be uploaded from uiController', () => {
    uiController.resourceOptions = { test: 'bar' }
    let query = LexicalQueryLookup.create(mockSelector, uiController)
    expect(query.resourceOptions.test).toEqual('bar')
  })
})
