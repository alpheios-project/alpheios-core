/* eslint-env jest */
/* eslint-disable no-unused-vars */
import * as Constants from '@/constants.js'
import LMF from '@/language_model_factory.js'
import Feature from '@/feature.js'
import Inflection from '@/inflection.js'

describe('greek_language_model.j', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let greekModel

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    greekModel = LMF.getLanguageModel(Constants.LANG_GREEK)
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 GreekLanguageModel - check static get methods', () => {
    expect(greekModel.languageID).toEqual(Constants.LANG_GREEK)
    expect(greekModel.contextForward).toEqual(0)
    expect(greekModel.contextBackward).toEqual(0)
    expect(greekModel.direction).toEqual(Constants.LANG_DIR_LTR)
    expect(greekModel.baseUnit).toEqual(Constants.LANG_UNIT_WORD)

    expect(greekModel.featureValues.size).toBeGreaterThan(0)

    expect(greekModel.canInflect()).toBeTruthy()
    expect(greekModel.getPunctuation().length).toBeGreaterThan(0)
  })

  it('2 GreekLanguageModel - grammar features', () => {
    expect(greekModel.grammarFeatures().length).toBeGreaterThan(0)
    expect(greekModel.grammarFeatures()).toEqual(['part of speech', 'case', 'mood', 'declension', 'tense', 'voice'])
  })

  it('3 GreekLanguageModel - alternateWordEncodings - additional encodings strip vowel length', () => {
    let word = '\u1FB0\u03B2\u1FB0\u1FB1'
    let alt = greekModel.alternateWordEncodings(word)
    expect(alt[0]).toEqual('\u03B1\u03B2\u03B1\u03B1')

    let alt2 = greekModel.alternateWordEncodings(word, null, null, 'strippedDiaeresis')
    expect(alt2[0]).toEqual('\u1FB0\u03B2\u1FB0\u1FB1')
  })

  it('4 GreekLanguageModel - Uses default features with correct language', () => {
    expect(greekModel.typeFeatures.size).toBeGreaterThan(0)

    let noun = greekModel.typeFeature(Feature.types.part).createFeature(Constants.POFS_NOUN)
    expect(noun).toBeDefined()
    expect(noun.languageID).toEqual(Constants.LANG_GREEK)
  })

  it('5 GreekLanguageModel - normalizes accents', () => {
    expect(greekModel.normalizeWord('ferāmus')).toEqual('ferāmus')
    expect(greekModel.normalizeWord(null)).toBeNull()
  })

  it('6 GreekLanguageModel - getInflectionConstraints - no part of speach', () => {
    let inflection = new Inflection('foo', 'grc')

    greekModel.getInflectionConstraints(inflection)
    expect(console.warn).toHaveBeenCalledWith('Unable to set grammar: part of speech data is missing or is incorrect', undefined)
  })

  it('7 GreekLanguageModel - getInflectionConstraints - suffixBased part of speach', () => {
    let inflection = new Inflection('foo', 'grc')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_GREEK))

    expect(greekModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: false,
      suffixBased: true,
      pronounClassRequired: false
    }))
  })

  it('8 GreekLanguageModel - getInflectionConstraints - fullFormBased part of speach', () => {
    let inflection = new Inflection('foo', 'grc')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_NUMERAL, Constants.LANG_GREEK))

    expect(greekModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: true,
      suffixBased: false,
      pronounClassRequired: false
    }))
  })

  it('9 GreekLanguageModel - getInflectionConstraints - POFS_PRONOUN part of speach', () => {
    let inflection = new Inflection('foo', 'grc')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_PRONOUN, Constants.LANG_GREEK))

    expect(greekModel.getInflectionConstraints(inflection)).toEqual(expect.objectContaining({
      fullFormBased: true,
      suffixBased: false,
      pronounClassRequired: true
    }))
  })

  it('10 GreekLanguageModel - getPronounClasses', () => {
    let featureDative = new Feature(Feature.types.grmClass, Constants.CASE_DATIVE, Constants.LANG_GREEK)
    let featureHdwd = new Feature(Feature.types.hdwd,'foo', Constants.LANG_GREEK)

    let form1 = { value: 'foo1', features: { 'class': featureDative } }
    let form2 = { value: 'foo2', features: {} }
    let form3 = { features: {} }
    let form_with_hdwd = { value: 'foo1', features: { 'class': featureDative, [Feature.types.hdwd]: featureHdwd } }

    expect(greekModel.getPronounClasses([form1, form2], 'foo1', 'foo')).toEqual(featureDative)
    expect(greekModel.getPronounClasses([form1, form2], 'foo3', 'foo')).toBeUndefined()
    expect(greekModel.getPronounClasses([form2], 'foo2', 'foo')).toBeUndefined()
    expect(greekModel.getPronounClasses([form3], '', '')).toBeUndefined()
    expect(greekModel.getPronounClasses([form_with_hdwd], 'foo1', 'foo')).toEqual(featureDative)
    expect(greekModel.getPronounClasses([form_with_hdwd], 'foo1', 'bar')).toBeUndefined()
  })

  it('11 GreekLanguageModel - alternateWordEncodings - additional encodings strip diacritics for inflections', () => {
    let word = 'συνεχής'.normalize('NFD')
    expect(greekModel.alternateWordEncodings(word, null, null, 'strippedDiacritics')).toEqual(['συνεχης'])
  })

  it('12 compareWords respects normalization', () => {
    expect(greekModel.compareWords('συνεχής', 'συνεχης', true)).toBeTruthy()
    // and are not equal if we don't normalize
    expect(greekModel.compareWords('συνεχής', 'συνεχης', false)).toBeFalsy()
  })

  it('13 GreekLanguageModel - normalizes right quotation to koronis', () => {
    expect(greekModel.normalizeWord('ἀλλ’')).toEqual('ἀλλ\u1fbd')
  })

  it('14 GreekLanguageModel - isValidUnicode defines βουλά in unicode as greek', () => {
    expect(greekModel.isValidUnicode('βουλά')).toBeTruthy()
  })

  it('15 GreekLanguageModel - isValidUnicode defines mare as not greek', () => {
    expect(greekModel.isValidUnicode('beatum')).toBeFalsy()
  })
})
