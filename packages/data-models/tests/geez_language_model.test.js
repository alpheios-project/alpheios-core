/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import LMF from '../src/language_model_factory.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let geez

  beforeAll(() => {
    geez = LMF.getLanguageModel(Constants.LANG_GEEZ)
  })

  test('has features', () => {
    expect(geez.typeFeatures).toBeDefined()
  })

  test('has correct Language ID', () => {
    expect(geez.languageID).toEqual(Constants.LANG_GEEZ)
  })

  test('has correct Language Code', () => {
    expect(geez.languageCodes).toEqual([Constants.STR_LANG_CODE_GEZ])
  })

  test('can inflect should be false', () => {
    expect(geez.canInflect()).toBeFalsy()
  })
})
