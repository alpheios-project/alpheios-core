/* eslint-env jest */
'use strict'
import GreekLanguageModel from '../src/greek_language_model.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let greek

  beforeAll(() => {
    greek = new GreekLanguageModel()
  })

  test('additional encodings strip vowel length', () => {
    let word = '\u1FB0\u03B2\u1FB0\u1FB1'
    let alt = greek.alternateWordEncodings(word)
    expect(alt[0]).toEqual('\u03B1\u03B2\u03B1\u03B1')
  })
})
