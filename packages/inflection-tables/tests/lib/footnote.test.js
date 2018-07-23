/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Feature } from 'alpheios-data-models'
import Footnote from '@lib/footnote.js'

describe('footnote.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Footnote - constructor creates instance with default attributes values', () => {
    let footnote = new Footnote(1, 'foonote', 'verb')

    expect(footnote.index).toEqual(1)
    expect(footnote.text).toEqual('foonote')
    expect(footnote[Feature.types.part]).toEqual('verb')
  })

  it('2 Footnote - readObject creates instance with attributes from JSON', () => {
    let jsonFootnote = { index: 2, text: 'footnote2', 'part of speech': 'numeral' }
    let footnote = Footnote.readObject(jsonFootnote)

    expect(footnote.index).toEqual(2)
    expect(footnote.text).toEqual('footnote2')
    expect(footnote[Feature.types.part]).toEqual('numeral')
  })
})
