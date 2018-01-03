/* eslint-env jest */
'use strict'
import Inflection from '../src/inflection.js'
import InflectionGroupingKey from '../src/inflection_grouping_key.js'
import Feature from '../src/feature.js'

describe('GroupingKey object', () => {
  beforeAll(() => {
  })

  test('toString', () => {
    let one = new Inflection('nat', 'lat', 'urae', null, null)
    one.feature = new Feature('verb', Feature.types.part, 'lat', 3)
    one.feature = new Feature(['feminine', 'masculine'], Feature.types.gender, 'lat')
    let groupingKey = new InflectionGroupingKey(one, [Feature.types.part, Feature.types.gender], {foo: 'bar'})
    expect(groupingKey.toString()).toEqual('bar feminine,masculine verb')
  })

  afterAll(() => {
  })
})
