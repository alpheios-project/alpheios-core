/* eslint-env jest */
'use strict'
import PersianLanguageModel from '../src/persian_language_model.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let persian

  beforeAll(() => {
    persian = new PersianLanguageModel()
  })

  test('has features', () => {
    expect(persian.features).toBeDefined()
  })
})
