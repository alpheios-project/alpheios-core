/* eslint-env jest */
'use strict'
import * as Constants from '../src/constants.js'
import LMF from '../src/language_model_factory.js'
import Feature from '../src/feature'
import Inflection from '../src/inflection'

describe('LanguageModelFactory object', () => {
  'use strict'

  let arabicModel

  beforeAll(() => {
    arabicModel = LMF.getLanguageModel(Constants.LANG_ARABIC)
  })

  test('has features', () => {
    expect(arabicModel.features).toBeDefined()
  })

  test('additional encodings strip vowel length', () => {
    let word = '\u{064B}\u{0622}\u{064E}\u{0651}\u{0652}\u{0627}'
    let alt = arabicModel.alternateWordEncodings(word)
    expect(alt[0]).toEqual('\u{0622}\u{064E}\u{0651}\u{0652}\u{0627}')
    expect(alt[1]).toEqual('\u{0627}\u{064E}\u{0651}\u{0652}\u{0627}')
    expect(alt[2]).toEqual('\u{0627}\u{0651}\u{0652}\u{0627}')
    expect(alt[3]).toEqual('\u{0627}\u{0652}\u{0627}')
    expect(alt[4]).toEqual('\u{0627}\u{0627}')
    expect(alt[5]).toEqual('')
  })

  test('aggregation of adjective inflections', () => {
    let pofs = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, Constants.LANG_ARABIC)
    let infla = new Inflection('صَغِير', Constants.LANG_ARABIC, null, null, null)
    infla.addFeature(pofs)
    infla.addFeature(new Feature(Feature.types.morph, 'DETSagiyr/ADJ', Constants.LANG_ARABIC))
    let inflb = new Inflection('صَغِير', Constants.LANG_ARABIC, 'u', null, 'the + small/young + [def.nom.]')
    inflb.addFeature(pofs)
    inflb.addFeature(new Feature(Feature.types.morph, 'DETSagiyr/ADJu', Constants.LANG_ARABIC))
    let inflc = new Inflection('صَغِير', Constants.LANG_ARABIC, 'a', null, 'the + small/young + [def.acc.]')
    inflc.addFeature(pofs)
    inflc.addFeature(new Feature(Feature.types.morph, 'DETSagiyr/ADJa', Constants.LANG_ARABIC))
    let infld = new Inflection('صَغِير', Constants.LANG_ARABIC, 'i', null, 'the + small/young + [def.gen.]')
    infld.addFeature(pofs)
    infld.addFeature(new Feature(Feature.types.morph, 'DETSagiyr/ADJi', Constants.LANG_ARABIC))
    let mockInflections = [infla, inflb, inflc, infld]
    let aggregated = arabicModel.aggregateInflectionsForDisplay(mockInflections)
    expect(mockInflections.length).toBe(4)
    expect(aggregated.length).toBe(1)
  })

  test('aggregation of noun inflections', () => {
    let pofs = new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_ARABIC)
    let infla = new Inflection('سُلْطان', Constants.LANG_ARABIC, null, null, null)
    infla.addFeature(pofs)
    infla.addFeature(new Feature(Feature.types.morph, 'NOUN', Constants.LANG_ARABIC))
    let inflb = new Inflection('سُلْطان', Constants.LANG_ARABIC, 'u', null, null)
    inflb.addFeature(pofs)
    inflb.addFeature(new Feature(Feature.types.morph, 'NOUNu/CASE_DEF_NOM', Constants.LANG_ARABIC))
    let inflc = new Inflection('سُلْطان', Constants.LANG_ARABIC, 'a', null, null)
    inflc.addFeature(pofs)
    inflc.addFeature(new Feature(Feature.types.morph, 'NOUNa/CASE_DEF_NOM', Constants.LANG_ARABIC))
    let infld = new Inflection('سُلْطان', Constants.LANG_ARABIC, 'i', null, null)
    infld.addFeature(pofs)
    infld.addFeature(new Feature(Feature.types.morph, 'NOUNi/CASE_DEF_NOM', Constants.LANG_ARABIC))
    let mockInflections = [infla, inflb, inflc, infld]
    let aggregated = arabicModel.aggregateInflectionsForDisplay(mockInflections)
    expect(mockInflections.length).toBe(4)
    expect(aggregated.length).toBe(1)
  })

  test('aggregation of proper noun inflections', () => {
    let pofs = new Feature(Feature.types.part, Constants.POFS_NOUN_PROPER, Constants.LANG_ARABIC)
    let infla = new Inflection('سُلْطان', Constants.LANG_ARABIC, null, null, null)
    infla.addFeature(pofs)
    infla.addFeature(new Feature(Feature.types.morph, 'NOUN_PROP', Constants.LANG_ARABIC))
    let inflb = new Inflection('سُلْطان', Constants.LANG_ARABIC, 'u', null, null)
    inflb.addFeature(pofs)
    inflb.addFeature(new Feature(Feature.types.morph, 'NOUN_PROPu/CASE_DEF_NOM', Constants.LANG_ARABIC))
    let inflc = new Inflection('سُلْطان', Constants.LANG_ARABIC, 'a', null, null)
    inflc.addFeature(pofs)
    inflc.addFeature(new Feature(Feature.types.morph, 'NOUN_PROPa/CASE_DEF_NOM', Constants.LANG_ARABIC))
    let infld = new Inflection('سُلْطان', Constants.LANG_ARABIC, 'i', null, null)
    infld.addFeature(pofs)
    infld.addFeature(new Feature(Feature.types.morph, 'NOUN_PROPi/CASE_DEF_NOM', Constants.LANG_ARABIC))
    let mockInflections = [infla, inflb, inflc, infld]
    let aggregated = arabicModel.aggregateInflectionsForDisplay(mockInflections)
    expect(mockInflections.length).toBe(4)
    expect(aggregated.length).toBe(1)
  })
})
