/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Lemma from '@/lemma.js'
import Language from '@/language.js'
import Translation from '@/translation.js'
import Feature from '@/feature.js'
import * as Constants from '@/constants.js'

describe('lemma.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Lemma - check required arguments for Lemma constructor', () => {
    expect(function () {
      const l = new Lemma()
      console.log(l)
    }).toThrowError(/empty/)

    expect(function () {
      const l = new Lemma('fooword')
      console.log(l)
    }).toThrowError(/empty/)
  })

  it('2 Lemma - create with min arguments', () => {
    const lemma = new Lemma('fooword', Language.LATIN)

    expect(lemma.word).toEqual('fooword')
    expect(Array.isArray(lemma.principalParts)).toBeTruthy()
    expect(lemma.features).toEqual({})

    expect(lemma.languageID).toEqual(Constants.LANG_LATIN)
    expect(lemma.languageCode).toEqual('lat')
    expect(lemma.ID).toBeDefined()

    const lemma2 = new Lemma('fooword', Language.LATIN, ['part1', 'part2'], { feature1: 'foofeature' })

    expect(lemma2.principalParts).toEqual(['part1', 'part2'])
    expect(lemma2.features).toEqual({})
  })

  it('3 Lemma - language method', () => {
    const lemma = new Lemma('fooword', Language.LATIN)
    expect(lemma.language.toCode()).toEqual(Constants.STR_LANG_CODE_LAT)
  })

  it('4 Lemma - readObject method', () => {
    const testJson = {
      word: 'fooword',
      languageCode: Constants.STR_LANG_CODE_LAT,
      principalParts: ['part1', 'part2'],
      features: {}
    }

    const res = Lemma.readObject(testJson)

    expect(res).toBeInstanceOf(Lemma)
    expect(res.word).toEqual('fooword')
    expect(res.language.toCode()).toEqual(Constants.STR_LANG_CODE_LAT)
    expect(res.principalParts).toEqual(['part1', 'part2'])
  })

  it('6 Lemma - addFeature method', () => {
    const testFeatureGreek = new Feature(Feature.types.note, 'valuea', Constants.LANG_GREEK)
    const testFeatureLatin = new Feature(Feature.types.note, 'valuea', Constants.LANG_LATIN)

    const lemma = new Lemma('fooword', Language.LATIN)

    expect(function () {
      lemma.addFeature()
    }).toThrowError(/empty/)

    expect(function () {
      lemma.addFeature('foofeature')
    }).toThrowError(/Feature object/)

    expect(function () {
      lemma.addFeature(testFeatureGreek)
    }).toThrowError(/does not match a language/)

    lemma.addFeature(testFeatureLatin)
    expect(Array.isArray(lemma.features.note)).toBeFalsy()
    expect(lemma.features.note).toEqual(testFeatureLatin)
  })

  it('7 Lemma - addFeatures method', () => {
    const testFeature1 = new Feature(Feature.types.note, 'value1', Constants.LANG_LATIN)
    const testFeature2 = new Feature(Feature.types.word, 'value2', Constants.LANG_LATIN)

    const lemma = new Lemma('fooword', Language.LATIN)

    expect(function () {
      lemma.addFeatures(testFeature1)
    }).toThrowError(/array/)

    lemma.addFeatures([testFeature1, testFeature2])
    expect(lemma.features.note).toEqual(testFeature1)
    expect(lemma.features.word).toEqual(testFeature2)
  })

  it('8 Lemma - addTranslation method', () => {
    const lemma = new Lemma('fooword', Language.LATIN)
    const translation = new Translation(lemma, 'lat')

    expect(function () {
      lemma.addTranslation()
    }).toThrowError(/empty/)

    expect(function () {
      lemma.addTranslation('footranslation')
    }).toThrowError(/Translation object/)

    lemma.addTranslation(translation)
    expect(lemma.translation).toEqual(translation)
  })
  it('9 Lemma - isFullHomonym method', () => {
    const lemma1 = new Lemma('fooword', Language.LATIN)
    const lemma2 = new Lemma('fooword', Language.LATIN)
    const lemma3 = new Lemma('fooword', Language.LATIN)
    const lemma4 = new Lemma('barword', Language.LATIN)
    lemma1.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    lemma2.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    lemma3.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_LATIN))
    expect(lemma1.isFullHomonym(lemma2)).toBeTruthy()
    expect(lemma1.isFullHomonym(lemma3)).toBeFalsy()
    expect(lemma1.isFullHomonym(lemma4)).toBeFalsy()
  })
})
