/* eslint-env jest */
'use strict'
import LMF from '../src/language_model_factory.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let persian

  beforeAll(() => {
    persian = LMF.getLanguageForCode('per')
  })

  test('has features', () => {
    expect(persian.features).toBeDefined()
  })
})
