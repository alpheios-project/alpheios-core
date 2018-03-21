/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import LMF from '../src/language_model_factory.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let greek

  beforeAll(() => {
    greek = LMF.getLanguageModel(Constants.LANG_GREEK)
  })

  test('additional encodings strip vowel length', () => {
    let word = '\u1FB0\u03B2\u1FB0\u1FB1'
    let alt = greek.alternateWordEncodings(word)
    expect(alt[0]).toEqual('\u03B1\u03B2\u03B1\u03B1')
  })
})
