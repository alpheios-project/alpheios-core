/* eslint-env jest */
'use strict'
import LatinLanguageModel from '../src/latin_language_model.js'
import Feature from '../src/feature.js'
import * as Constants from '../src/constants.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let latin

  beforeAll(() => {
    latin = new LatinLanguageModel()
  })

  test('Uses default features with correct language', () => {
    let noun = latin.features[Feature.types.part][Constants.POFS_NOUN]
    expect(noun).toBeDefined()
    expect(noun.language).toEqual(Constants.STR_LANG_CODE_LAT)
  })

  test('Uses model specific features', () => {
    let decl = latin.features[Feature.types.declension][Constants.ORD_5TH]
    expect(decl).toBeDefined()
  })
})
