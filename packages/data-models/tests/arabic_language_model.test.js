/* eslint-env jest */
'use strict'
import LMF from '../src/language_model_factory.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let arabic

  beforeAll(() => {
    arabic = LMF.getLanguageForCode('ara')
  })

  test('has features', () => {
    expect(arabic.features).toBeDefined()
  })

  test('additional encodings strip vowel length', () => {
    let word = '\u{064B}\u{0622}\u{064E}\u{0651}\u{0652}\u{0627}'
    let alt = arabic.alternateWordEncodings(word)
    expect(alt[0]).toEqual('\u{0622}\u{064E}\u{0651}\u{0652}\u{0627}')
    expect(alt[1]).toEqual('\u{0627}\u{064E}\u{0651}\u{0652}\u{0627}')
    expect(alt[2]).toEqual('\u{0627}\u{0651}\u{0652}\u{0627}')
    expect(alt[3]).toEqual('\u{0627}\u{0652}\u{0627}')
    expect(alt[4]).toEqual('\u{0627}\u{0627}')
    expect(alt[5]).toEqual('')
  })
})
