/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import Inflection from '../src/inflection.js'
import InflectionGroupingKey from '../src/inflection_grouping_key.js'
import Feature from '../src/feature.js'

describe('GroupingKey object', () => {
  beforeAll(() => {
  })

  test('toString', () => {
    let one = new Inflection('nat', 'lat', 'urae', null, null)
    one.addFeatures([
      new Feature(Feature.types.part, 'verb', Constants.LANG_LATIN),
      new Feature(Feature.types.gender, ['feminine', 'masculine'], Constants.LANG_LATIN)
    ])
    let groupingKey = new InflectionGroupingKey(one, [Feature.types.part, Feature.types.gender], {foo: 'bar'})
    let stringValue = groupingKey.toString()
    expect(stringValue).toEqual('bar feminine,masculine verb')
  })

  afterAll(() => {
  })
})
