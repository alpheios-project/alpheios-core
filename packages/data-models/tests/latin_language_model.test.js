/* eslint-env jest */
/* eslint-disable no-unused-vars */
import * as Constants from '@/constants.js'
import LMF from '@/language_model_factory.js'
import Feature from '@/feature.js'
import Inflection from '@/inflection.js'

describe('latin_language_model.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let latinModel

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    latinModel = LMF.getLanguageModel(Constants.LANG_LATIN)
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 LatinLanguageModel - check static get methods', () => {
    expect(latinModel.languageID).toEqual(Constants.LANG_LATIN)
    expect(latinModel.contextForward).toEqual(0)
    expect(latinModel.contextBackward).toEqual(0)
    expect(latinModel.direction).toEqual(Constants.LANG_DIR_LTR)
    expect(latinModel.baseUnit).toEqual(Constants.LANG_UNIT_WORD)

    expect(latinModel.featureValues.size).toBeGreaterThan(0)

    expect(latinModel.canInflect()).toBeTruthy()
    expect(latinModel.getPunctuation().length).toBeGreaterThan(0)
    expect(latinModel.alternateWordEncodings().length).toEqual(0)
  })

  it('2 LatinLanguageModel - normalizes accents', () => {
    expect(latinModel.normalizeWord('tantulō')).toEqual('tantulo')
    expect(latinModel.normalizeWord(null)).toBeNull()
  })

  it('3 LatinLanguageModel - grammar features', () => {
    expect(latinModel.grammarFeatures().length).toBeGreaterThan(0)
    expect(latinModel.grammarFeatures()).toEqual(['part of speech', 'case', 'mood', 'declension', 'tense', 'conjugation'])
  })

  it('4 LatinLanguageModel - Uses default features with correct language', () => {
    expect(latinModel.typeFeatures.size).toBeGreaterThan(0)

    let noun = latinModel.typeFeature(Feature.types.part).createFeature(Constants.POFS_NOUN)
    expect(noun).toBeDefined()
    expect(noun.languageID).toEqual(Constants.LANG_LATIN)
  })

  it('5 LatinLanguageModel - Uses model specific features', () => {
    let decl = latinModel.typeFeature(Feature.types.declension).createFeature(Constants.ORD_5TH)
    expect(decl).toBeDefined()
  })

  it('6 LatinLanguageModel - getInflectionConstraints - no part of speach', () => {
    let inflection = new Inflection('foo', 'lat')

    latinModel.getInflectionConstraints(inflection)
    expect(console.warn).toHaveBeenCalledWith('Unable to set grammar: part of speech data is missing or is incorrect', undefined)
  })

  it('7 LatinLanguageModel - getInflectionConstraints - suffixBased part of speach', () => {
    let inflection = new Inflection('foo', 'lat')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_LATIN))

    expect(latinModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: false,
      suffixBased: true,
      pronounClassRequired: false
    }))
  })

  it('8 LatinLanguageModel - getInflectionConstraints - POFS_PRONOUN is fullFormBased', () => {
    let inflection = new Inflection('foo', 'lat')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_PRONOUN, Constants.LANG_LATIN))

    expect(latinModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: true,
      suffixBased: false,
      pronounClassRequired: false
    }))
  })

  it('9 LatinLanguageModel - getInflectionConstraints - POFS_VERB is suffixBased and fullFormBased', () => {
    let inflection = new Inflection('foo', 'lat')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    expect(latinModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: true,
      suffixBased: true,
      pronounClassRequired: false
    }))
  })

  it('10 LatinLanguageModel - getInflectionConstraints - POFS_VERB_PARTICIPLE is suffixBased and fullFormBased', () => {
    let inflection = new Inflection('foo', 'lat')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB_PARTICIPLE, Constants.LANG_LATIN))
    expect(latinModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: true,
      suffixBased: true,
      pronounClassRequired: false
    }))
  })
})
