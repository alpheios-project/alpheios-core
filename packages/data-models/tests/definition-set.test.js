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

  test('clearShortDefs empties short defs', () => {
    let set = new DefinitionSet('foo', 'lat')
    set.appendShortDefs([{mock: true}])
    expect(set.isEmpty()).toBeFalsy()
    set.clearShortDefs()
    expect(set.isEmpty()).toBeTruthy()
  })

  test('clearFullDefs empties full defs', () => {
    let set = new DefinitionSet('foo', 'lat')
    set.appendFullDefs([{mock: true}])
    expect(set.isEmpty()).toBeFalsy()
    set.clearFullDefs()
    expect(set.isEmpty()).toBeTruthy()
  })
})
