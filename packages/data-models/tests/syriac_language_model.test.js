/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import LMF from '../src/language_model_factory.js'
import Feature from '../src/feature.js'
import Inflection from '../src/inflection.js'

describe('LanguageModelFactory object', () => {
  'use strict'

  let syr

  beforeAll(() => {
    syr = LMF.getLanguageModel(Constants.LANG_SYRIAC)
  })

  test('has features', () => {
    expect(syr.typeFeatures).toBeDefined()
  })

  test('has correct Language ID', () => {
    expect(syr.languageID).toEqual(Constants.LANG_SYRIAC)
  })

  test('has correct Language Code', () => {
    expect(syr.languageCodes).toEqual([Constants.STR_LANG_CODE_SYR, Constants.STR_LANG_CODE_SYC, Constants.STR_LANG_CODE_SYR_SYRJ])
  })

  test('can inflect should be false', () => {
    expect(syr.canInflect()).toBeFalsy()
  })

  it('supports pofs denominative', () => {
    let pofs = syr.typeFeature(Feature.types.part).createFeature(Constants.POFS_DENOMINATIVE)
    expect(pofs).toBeDefined()
  })

  it('supports kaylo paradigm', () => {
    let paradigm = syr.typeFeature(Feature.types.kaylo).createFeature('ethpaʿli')
    expect(paradigm).toBeDefined()
  })

  it('includes kaylo in base inflection group', () => {
    let one = new Inflection('a', Constants.LANG_SYRIAC, 'astem', null, null)

    one.addFeature(new Feature(Feature.types.part, [['verb', 1]], Constants.LANG_SYRIAC))
    one.addFeature(new Feature(Feature.types.gender, 'masculine', Constants.LANG_SYRIAC))
    one.addFeature(new Feature(Feature.types.number, 'plural', Constants.LANG_SYRIAC))
    one.addFeature(new Feature(Feature.types.mood, 'participle', Constants.LANG_SYRIAC))
    one.addFeature(new Feature(Feature.types.kaylo, "p'al", Constants.LANG_SYRIAC))
    let grouped = syr.groupInflectionsForDisplay([one])
    expect(grouped[0].groupingKey.hasFeatureValue(Feature.types.kaylo, "p'al")).toBeTruthy()
    expect(grouped[0].groupingKey.hasFeatureValue(Feature.types.part, 'verb')).toBeTruthy()
  })
})
