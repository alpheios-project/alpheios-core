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
        '_data': [{value: 'masculine', sortOrder: 1}]
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

  it('13 Inflection - readObject from JSON', () => {
    let testJSON = {
      stem: 'stem',
      languageCode: 'lat',
      suffix: 'suffix'
    }

    let inflection = Inflection.readObject(testJSON)

    expect(inflection).toBeInstanceOf(Inflection)
    expect(inflection.stem).toEqual('stem')
    expect(inflection.suffix).toEqual('suffix')
    expect(inflection.languageID).toEqual(Constants.LANG_LATIN)
  })

  it('14 Inflection - compareWithWordDependsOnType for non-verbs', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_LATIN))
    inflection.setConstraints()

    expect(inflection.compareWithWordDependsOnType('suffix', 'Suffix')).toBeTruthy()
  })

  it('15 Inflection - compareWithWordDependsOnType for only regular verb with suffix', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection.setConstraints()

    expect(inflection.compareWithWordDependsOnType('suffix', 'Suffix')).toBeTruthy()
  })

  it('16 Inflection - compareWithWordDependsOnType for irregular verb with suffix', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection.setConstraints()
    inflection.constraints.irregularVerb = true

    expect(inflection.compareWithWordDependsOnType('suffix', 'Suffix')).toBeTruthy()
  })

  it('17 Inflection - compareWithWordDependsOnType for irregular verb with fullForm with form', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection.addFeature(new Feature(Feature.types.fullForm, 'stemsuffix', Constants.LANG_LATIN))
    inflection.setConstraints()
    inflection.constraints.irregularVerb = true

    expect(inflection.compareWithWordDependsOnType('stemsuffix', 'Form')).toBeTruthy()
  })

  it('18 Inflection - compareWithWordDependsOnType for irregular verb without fullForm with form', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflection.setConstraints()
    inflection.constraints.irregularVerb = true

    expect(inflection.compareWithWordDependsOnType('stem - suffix', 'Form')).toBeTruthy()
  })

  it('19 Inflection - hasFeatureValue', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))

    expect(inflection.hasFeatureValue(Feature.types.part, Constants.POFS_VERB)).toBeTruthy()
    expect(inflection.hasFeatureValue(Feature.types.fullForm, 'foo')).toBeFalsy()
  })

  it('20 Inflection - addFeatures', () => {
    let inflection = new Inflection('stem', 'lat', 'suffix')

    expect(() => { inflection.addFeatures('foo') }).toThrowError(/must be in an array/)

    inflection.addFeatures([new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN), new Feature(Feature.types.fullForm, 'foo', Constants.LANG_LATIN)])

    expect(inflection.hasFeatureValue(Feature.types.part, Constants.POFS_VERB)).toBeTruthy()
    expect(inflection.hasFeatureValue(Feature.types.fullForm, 'foo')).toBeTruthy()
  })
})
