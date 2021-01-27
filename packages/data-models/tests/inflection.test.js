/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Inflection from '@/inflection.js'
import Feature from '@/feature.js'
import * as Constants from '@/constants.js'

describe('inflection.test.js', () => {
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

  it('1 Inflection - check required arguments for Inflection constructor', () => {
    expect(function () {
      let l = new Inflection()
      console.log(l)
    }).toThrowError(/stem or suffix must be defined/)

    expect(function () {
      let l = new Inflection('foo')
      console.log(l)
    }).toThrowError(/Language should not be empty/)

    expect(function () {
      let l = new Inflection('foo', 'foolang')
      console.log(l)
    }).toThrowError(/language foolang not supported/)

    expect(function () {
      let l = new Inflection(null, 'grc', 'foo')
      console.log(l)
    }).not.toThrowError()
  })

  it('2 Inflection - form should work with a stem only', () => {
    let inflection = new Inflection('stem', 'grc')
    expect(inflection.form).toEqual('stem')
  })

  it('3 Inflection - form should work with a stem and suffix', () => {
    let inflection = new Inflection('stem', 'grc', 'suffix')
    expect(inflection.form).toEqual('stem - suffix')
  })

  it('4 Inflection - form should work with a stem and prefix', () => {
    let inflection = new Inflection('stem', 'grc', null, 'pref')
    expect(inflection.form).toEqual('pref - stem')
  })

  it('5 Inflection - form should work with a suffix only', () => {
    let inflection = new Inflection(null, 'grc', 'suff')
    expect(inflection.form).toEqual('suff')
  })

  it('6 Inflection - form should work with a suffix only', () => {
    let inflection = new Inflection(null, 'grc', 'suff')
    expect(inflection.form).toEqual('suff')
  })

  it('7 Inflection - feature method should add a single feature to the inflection', () => {
    let inflection = new Inflection('foo', 'grc')
    inflection.addFeature(new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK))

    expect(inflection).toMatchObject({
      gender: {
        languageID: Constants.LANG_GREEK,
        type: 'gender',
        '_data': [{ value: 'masculine', sortOrder: 1 }]
      }
    })
  })

  it('8 Inflection - feature method should throw an error if no arguments are provided', () => {
    let inflection = new Inflection('foo', 'grc')

    expect(() => inflection.addFeature('')).toThrowError('feature data cannot be empty')
  })

  it('9 Inflection - feature method should throw an error if argument(s) are of the wrong type', () => {
    let inflection = new Inflection('foo', 'grc')

    expect(() => inflection.addFeature('some value')).toThrowError('feature data must be a Feature object')
  })

  it('10 Inflection - feature method should not allow a feature language to be different from a language of an inflection', () => {
    let inflection = new Inflection('foo', 'grc')

    expect(() => inflection.addFeature(new Feature(Feature.types.gender, 'masculine', Constants.LANG_LATIN))).toThrowError('does not match a language')
  })

  it('11 Inflection - setConstraints method adds constraints to inflection based on features and language', () => {
    let inflection = new Inflection('foo', 'grc')

    expect(inflection.constraints.fullFormBased).toBeFalsy()
    expect(inflection.constraints.suffixBased).toBeFalsy()
    expect(inflection.constraints.pronounClassRequired).toBeUndefined()

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_NUMERAL, Constants.LANG_GREEK))
    inflection.setConstraints()

    expect(inflection.constraints.fullFormBased).toBeTruthy()
    expect(inflection.constraints.pronounClassRequired).toBeFalsy()
  })

  it('12.1 Inflection - compare with word suffixBased', () => {
    let inflection1 = new Inflection('stem', 'grc', 'suffix')

    inflection1.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_GREEK))
    inflection1.setConstraints()

    expect(inflection1.compareWithWord('foo')).toBeFalsy()
    expect(inflection1.compareWithWord('suffix')).toBeTruthy()
  })

  it('12.2 Inflection - compare with word formBased', () => {
    let inflection2 = new Inflection('stem', 'grc', 'suffix')

    inflection2.addFeature(new Feature(Feature.types.part, Constants.POFS_NUMERAL, Constants.LANG_GREEK))
    inflection2.setConstraints()

    expect(inflection2.compareWithWord('suffix')).toBeFalsy()
    expect(inflection2.compareWithWord('stem - suffix')).toBeTruthy()
  })

  it('13 Inflection - smartWordCompare for non-verbs', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_LATIN))
    inflection.setConstraints()

    expect(inflection.smartWordCompare('suffix', 'Suffix')).toBeTruthy()
  })

  it('14 Inflection - smartWordCompare for only regular verb with suffix', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection.setConstraints()

    expect(inflection.smartWordCompare('suffix', 'Suffix')).toBeTruthy()
  })

  it('15 Inflection - smartWordCompare for irregular verb with suffix', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection.setConstraints()
    inflection.constraints.irregularVerb = true

    expect(inflection.smartWordCompare('suffix', 'Suffix')).toBeTruthy()
  })

  it('16 Inflection - smartWordCompare for irregular verb with fullForm with form', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection.addFeature(new Feature(Feature.types.fullForm, 'stemsuffix', Constants.LANG_LATIN))
    inflection.setConstraints()
    inflection.constraints.irregular = true

    expect(inflection.smartWordCompare('stemsuffix', 'Form')).toBeTruthy()
  })

  it('17 Inflection - smartWordCompare for irregular verb without fullForm with form', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection.setConstraints()
    inflection.constraints.irregular = true

    expect(inflection.smartWordCompare('stem - suffix', 'Form')).toBeTruthy()
  })

  it('18 Inflection - hasFeatureValue', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))

    expect(inflection.hasFeatureValue(Feature.types.part, Constants.POFS_VERB)).toBeTruthy()
    expect(inflection.hasFeatureValue(Feature.types.fullForm, 'foo')).toBeFalsy()
  })

  it('19 Inflection - addFeatures', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    expect(() => { inflection.addFeatures('foo') }).toThrowError(/must be in an array/)

    inflection.addFeatures([new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN), new Feature(Feature.types.fullForm, 'foo', Constants.LANG_LATIN)])

    expect(inflection.hasFeatureValue(Feature.types.part, Constants.POFS_VERB)).toBeTruthy()
    expect(inflection.hasFeatureValue(Feature.types.fullForm, 'foo')).toBeTruthy()
  })

  it('20 Inflection - disambiguatedBy', () => {
    let inflection1 = new Inflection('stem', 'lat', 'suffix')
    inflection1.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection1.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_LATIN))
    inflection1.addFeature(new Feature(Feature.types.number, Constants.NUM_SINGULAR, Constants.LANG_LATIN))

    let inflection2 = new Inflection('form', 'lat', null)
    inflection2.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection2.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_LATIN))
    expect(inflection1.disambiguatedBy(inflection2).match).toBeTruthy()
    expect(inflection1.disambiguatedBy(inflection2).exactMatch).toBeTruthy()

    let inflection3 = new Inflection('form', 'lat', null)
    inflection3.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection3.addFeature(new Feature(Feature.types.voice, Constants.VOICE_PASSIVE, Constants.LANG_LATIN))
    // voice is mismatch
    expect(inflection1.disambiguatedBy(inflection3).match).toBeFalsy()
    expect(inflection1.disambiguatedBy(inflection3).exactMatch).toBeTruthy()

    let inflection4 = new Inflection('form', 'lat', null)
    inflection4.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection4.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_LATIN))
    inflection4.addFeature(new Feature(Feature.types.number, Constants.NUM_PLURAL, Constants.LANG_LATIN))
    // disambiguation requires match on part,voice - inflection being disambiguated also has different number so no match
    expect(inflection1.disambiguatedBy(inflection4).match).toBeFalsy()
    expect(inflection1.disambiguatedBy(inflection4).exactMatch).toBeTruthy()

    let inflection5 = new Inflection('form', 'lat', null)
    inflection5.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection5.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_LATIN))
    inflection5.addFeature(new Feature(Feature.types.number, Constants.NUM_PLURAL, Constants.LANG_LATIN))
    inflection5.addFeature(new Feature(Feature.types.gender, Constants.GEND_FEMININE, Constants.LANG_LATIN))
    // inflection being disambiguated is more specific so it doesn't match
    expect(inflection1.disambiguatedBy(inflection5).match).toBeFalsy()
    expect(inflection1.disambiguatedBy(inflection5).exactMatch).toBeTruthy()

    let inflection6 = new Inflection('form', 'lat', null)
    inflection6.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, Constants.LANG_LATIN))
    inflection6.addFeature(new Feature(Feature.types.number, Constants.NUM_PLURAL, Constants.LANG_LATIN))
    inflection6.addFeature(new Feature(Feature.types.gender, [Constants.GEND_FEMININE, Constants.GEND_MASCULINE], Constants.LANG_LATIN))

    let inflection7 = new Inflection('form', 'lat', null)
    inflection7.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, Constants.LANG_LATIN))
    inflection7.addFeature(new Feature(Feature.types.number, Constants.NUM_PLURAL, Constants.LANG_LATIN))
    inflection7.addFeature(new Feature(Feature.types.gender, Constants.GEND_FEMININE, Constants.LANG_LATIN))
    expect(inflection6.disambiguatedBy(inflection7).match).toBeTruthy()
    expect(inflection6.disambiguatedBy(inflection7).exactMatch).toBeFalsy()

    let inflection8 = new Inflection('form','lat', null)
    inflection8.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection8.addFeature(new Feature(Feature.types.number, Constants.NUM_SINGULAR, Constants.LANG_LATIN))
    inflection8.addFeature(new Feature(Feature.types.case, Constants.CASE_ABLATIVE, Constants.LANG_LATIN))
    inflection8.addFeature(new Feature(Feature.types.tense, Constants.TENSE_FUTURE, Constants.LANG_LATIN))
    let inflection9 = new Inflection('form','lat', null)
    inflection9.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB_PARTICIPLE, Constants.LANG_LATIN))
    inflection9.addFeature(new Feature(Feature.types.number, Constants.NUM_SINGULAR, Constants.LANG_LATIN))
    inflection9.addFeature(new Feature(Feature.types.case, Constants.CASE_ABLATIVE, Constants.LANG_LATIN))
    expect(inflection8.disambiguatedBy(inflection9,{ ignorePofs: false }).match).toBeFalsy()
    expect(inflection8.disambiguatedBy(inflection9,{ ignorePofs: true }).match).toBeTruthy()
    expect(inflection8.disambiguatedBy(inflection9,{ ignorePofs: true }).exactMatch).toBeTruthy()

  })

  it('21 Inflection - features is populated', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection.addFeature(new Feature(Feature.types.voice, Constants.VOICE_ACTIVE, Constants.LANG_LATIN))
    inflection.addFeature(new Feature(Feature.types.number, Constants.NUM_SINGULAR, Constants.LANG_LATIN))
    expect(inflection.features).toEqual(new Set([Feature.types.part, Feature.types.voice, Feature.types.number]))
  })

  it('22 Inflection - modelCompareWords respects normalization', () => {
    let inflection = new Inflection('συνεχ', 'grc', 'ης')
    let matched = inflection.modelCompareWords('συνεχής', 'συνεχης', true)
    expect(inflection.modelCompareWords('συνεχής', 'συνεχης', true)).toBeTruthy()
    // and are not equal if we don't normalize
    expect(inflection.modelCompareWords('συνεχής', 'συνεχης', false)).toBeFalsy()
    // make sure languages without stripped diacritics as alternate encodings also still work
    inflection = new Inflection('cepit', 'lat', 'it')
    expect(inflection.modelCompareWords('cepit', 'cepit', true)).toBeTruthy()
  })
})
