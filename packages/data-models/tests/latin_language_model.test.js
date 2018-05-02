/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import LMF from '../src/language_model_factory.js'
import Feature from '../src/feature.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let latinModel

  beforeAll(() => {
    latinModel = LMF.getLanguageModel(Constants.LANG_LATIN)
  })

  test('Uses default features with correct language', () => {
    let noun = latinModel.typeFeature(Feature.types.part).createFeature(Constants.POFS_NOUN)
    expect(noun).toBeDefined()
    expect(noun.languageID).toEqual(Constants.LANG_LATIN)
  })

  test('Uses model specific features', () => {
    let decl = latinModel.typeFeature(Feature.types.declension).createFeature(Constants.ORD_5TH)
    expect(decl).toBeDefined()
  })

  test('normalizes accents', () => {
    expect(latinModel.normalizeWord('tantulō')).toEqual('tantulo')
  })

  test('grammar features', () => {
    expect(latinModel.grammarFeatures()).toEqual(['part of speech', 'case', 'mood', 'declension', 'tense'])
  })
})
