/* eslint-env jest */
import { Constants } from 'alpheios-data-models'
import Morpheus from '@clAdapters/adapters/tufts/engine/morpheusgrc'

describe('morpheusgrc.test.js', () => {

  beforeEach(() => {
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Morpheusgrc Engine - sets pofs for irregular pronoun ti/s', () => {
    let mockInput = { hdwd: { $: "τίς"} }
    let parsed = Morpheus.parseProperty('pofs', 'irregular',mockInput)
    expect(parsed).toEqual([Constants.POFS_PRONOUN])
  })
})
