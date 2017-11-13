/* eslint-env jest */
'use strict'
import ArabicLanguageModel from '../src/arabic_language_model.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let arabic

  beforeAll(() => {
    arabic = new ArabicLanguageModel()
  })

  test('has features', () => {
    expect(arabic.features).toBeDefined()
  })
})
