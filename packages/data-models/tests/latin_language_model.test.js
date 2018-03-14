/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import LMF from '../src/language_model_factory.js'
import Feature from '../src/grm-feature.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let latin
  let latinModel

  beforeAll(() => {
    latin = LMF.getLanguageForCode('lat')
    latinModel = LMF.getLanguageModel(Constants.LANG_LATIN)
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

  test('normalizes accents', () => {
    expect(latinModel.normalizeWord('tantulō')).toEqual('tantulo')
  })
})
