/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import LMF from '../src/language_model_factory.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let persian

  beforeAll(() => {
    persian = LMF.getLanguageModel(Constants.LANG_PERSIAN)
  })

  test('has features', () => {
    expect(persian.typeFeatures).toBeDefined()
  })
})
