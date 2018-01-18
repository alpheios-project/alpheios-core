/* eslint-env jest */
import DefinitionSet from '../src/definition-set'

describe('DefinitionSet object', () => {
  test('isEmpty returns true for empty set', () => {
    let set = new DefinitionSet('foo', 'lat')
    expect(set.isEmpty()).toBeTruthy()
  })

  test('isEmpty returns false fornon-empty set', () => {
    let set = new DefinitionSet('foo', 'lat')
    set.appendShortDefs([{mock: true}])
    expect(set.isEmpty()).toBeFalsy()
  })
})
