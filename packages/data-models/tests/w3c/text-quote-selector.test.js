/* eslint-env jest */

import TextQuoteSelector from '@/w3c/text-quote-selector'

describe('TextQuoteSelector object', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let tqA
  let tqB
  let tqAC

  beforeAll(() => {
    tqA = new TextQuoteSelector('lat', 'wordA')
    tqA.prefix = 'prefixA'
    tqA.suffix = 'suffixA'
    tqA.source = 'sourceA'
    tqA.text = 'wordA'

    tqB = new TextQuoteSelector('lat', 'wordB')
    tqB.prefix = 'prefixB'
    tqB.suffix = 'suffixB'
    tqB.source = 'sourceB'
    tqB.text = 'wordB'

    // same word as A but different source
    tqAC = new TextQuoteSelector('lat', 'wordA')
    tqAC.prefix = 'prefixA'
    tqAC.suffix = 'suffixA'
    tqAC.source = 'sourceC'
    tqAC.text = 'wordA'
  })

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

  it('1 TextQuoteSelector - isEqual', () => {
    expect(tqA.isEqual(tqA)).toBeTruthy()
    expect(tqB.isEqual(tqA)).toBeFalsy()
    expect(tqAC.isEqual(tqA)).toBeFalsy()
    // TODO and so on...
  })
})
