/* eslint-env jest */
import DefinitionSet from '../src/definition-set.js'
import Language from '../src/language.js'

describe('DefinitionSet object', () => {
  test('isEmpty returns true for empty set', () => {
    const set = new DefinitionSet('foo', Language.LATIN)
    expect(set.isEmpty()).toBeTruthy()
  })

  test('isEmpty returns false fornon-empty set', () => {
    const set = new DefinitionSet('foo', Language.LATIN)
    set.appendShortDefs([{ mock: true }])
    expect(set.isEmpty()).toBeFalsy()
  })

  test('clearShortDefs empties short defs', () => {
    const set = new DefinitionSet('foo', Language.LATIN)
    set.appendShortDefs([{ mock: true }])
    expect(set.isEmpty()).toBeFalsy()
    set.clearShortDefs()
    expect(set.isEmpty()).toBeTruthy()
  })

  test('clearFullDefs empties full defs', () => {
    const set = new DefinitionSet('foo', Language.LATIN)
    set.appendFullDefs([{ mock: true }])
    expect(set.isEmpty()).toBeFalsy()
    set.clearFullDefs()
    expect(set.isEmpty()).toBeTruthy()
  })
})
