/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature } from 'alpheios-data-models'
import Morpheme from '@lib/morpheme.js'

describe('morpheme.test.js', () => {
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

  it('1 Morpheme - constructor throw Error if there is no morphemeValue in arguments', () => {
    expect(() => new Morpheme()).toThrow(new Error('Morpheme value should not be empty.'))
  })

  it('2 Morpheme - constructor inits morpheme properties with default values', () => {
    let morpheme = new Morpheme('δύο')
    expect(morpheme.id).toBeDefined()
    expect(morpheme.value).toEqual('δύο')
    expect(morpheme.features).toEqual({})
    expect(morpheme.featureGroups).toEqual({})
    expect(morpheme.extendedLangData).toEqual({})
    expect(morpheme.match).toBeUndefined()
  })

  it('3 Morpheme - readObject returns Morpheme objects with attributes from json', () => {
    let jsonObject = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK)
      },
      featureGroups: {
        'foogroup': [ 'foovalue' ]
      },
      footnote: [
        'foovalue'
      ],
      match: {
        suffixMatch: false,
        fullMatch: false,
        matchedFeatures: []
      }
    }

    let morpheme = Morpheme.readObject(jsonObject)

    expect(morpheme.constructor.name).toEqual('Morpheme')
    expect(morpheme.value).toEqual('δύο')

    expect(Object.keys(morpheme.features)).toEqual([ Feature.types.part ])
    expect(Object.keys(morpheme.featureGroups)).toEqual([ 'foogroup' ])
    expect(morpheme.footnote).toEqual([ 'foovalue' ])
    expect(morpheme.match).toEqual({
      formMatch: false,
      morphologyMatch: false,
      suffixMatch: false,
      fullMatch: false,
      matchedFeatures: []
    })
  })

  it('4 Morpheme - clone returns any class extended from Morpheme objects with the same attributes', () => {
    let jsonObject = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK)
      },
      featureGroups: {
        'foogroup': [ 'foovalue' ]
      },
      footnote: [
        'foovalue'
      ]
    }

    let morpheme = Morpheme.readObject(jsonObject)

    let clonedMorpheme = morpheme.clone()

    expect(clonedMorpheme.constructor.name).toEqual('Morpheme')
    expect(clonedMorpheme.value).toEqual('δύο')

    expect(Object.keys(clonedMorpheme.features)).toEqual([ Feature.types.part ])
    expect(Object.keys(clonedMorpheme.featureGroups)).toEqual([ 'foogroup' ])
    expect(clonedMorpheme.footnote).toEqual([ 'foovalue' ])
  })

  it('5 Morpheme - featureMatch - compares feature with morpheme', () => {
    let jsonObject = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK)
      },
      featureGroups: {
        'foogroup': [ 'foovalue' ]
      },
      footnote: [
        'foovalue'
      ]
    }

    let morpheme = Morpheme.readObject(jsonObject)
    let featureForCompareFailed = new Feature(Feature.types.part, 'noun', Constants.LANG_GREEK)
    let featureForCompareSuccess = new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK)

    expect(morpheme.featureMatch(featureForCompareFailed)).toBeFalsy()
    expect(morpheme.featureMatch(featureForCompareSuccess)).toBeTruthy()
  })

  it('6 Morpheme - matchingValues - return matched values for argument features', () => {
    let jsonObject = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK)
      },
      featureGroups: {
        'foogroup': [ 'foovalue' ]
      },
      footnote: [
        'foovalue'
      ]
    }

    let morpheme = Morpheme.readObject(jsonObject)
    let featureForCompareFailed = new Feature(Feature.types.class, 'fooclass', Constants.LANG_GREEK)

    expect(morpheme.matchingValues(featureForCompareFailed).length).toEqual(0)

    let featureForCompareSuccessSingle = new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK)
    expect(morpheme.matchingValues(featureForCompareSuccessSingle)).toEqual([ 'numeral' ])

    let featureForCompareSuccessMultiple = new Feature(Feature.types.part, ['numeral', 'verb'], Constants.LANG_GREEK)
    expect(morpheme.matchingValues(featureForCompareSuccessMultiple, Morpheme.comparisonTypes.PARTIAL)).toEqual([ 'numeral' ])
  })

  it('7 Morpheme - getCommonGroups - compares features in featureGroups', () => {
    let suffixes = []

    let suffix1 = {
      featureGroups: {
        'part of speech': 'fooValue', 'type': 'regular'
      },
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'number': new Feature(Feature.types.number, 'dual', Constants.LANG_GREEK)
      }
    }
    let suffix2 = {
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'number': new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK)
      }
    }

    suffixes.push(suffix1)
    suffixes.push(suffix2)

    expect(Morpheme.getCommonGroups(suffixes)).toEqual(['part of speech'])
  })

  it('8 Morpheme - isInSameGroupWith - compares current morpheme with morpheme from argument - if there are no common groups - returns false', () => {
    let jsonObject = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'number': new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK)
      },
      featureGroups: { 'number': 'fooValue' }
    }

    let morpheme = Morpheme.readObject(jsonObject)
    let suffix1 = {
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'type': new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK)
      }
    }

    expect(morpheme.isInSameGroupWith(suffix1)).toBeFalsy()
  })

  it('9 Morpheme - isInSameGroupWith - compares current morpheme with morpheme from argument - if value is not the same - returns false', () => {
    let jsonObject = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'number': new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK)
      },
      featureGroups: { 'number': 'fooValue' }
    }

    let morpheme = Morpheme.readObject(jsonObject)
    let suffix1 = {
      value: 'δύοh',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'number': new Feature(Feature.types.type, 'singular', Constants.LANG_GREEK)
      }
    }

    expect(morpheme.isInSameGroupWith(suffix1)).toBeFalsy()
  })

  it('10 Morpheme - isInSameGroupWith - compares current morpheme with morpheme from argument - if value of features from common group is different - return false', () => {
    let jsonObject = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'number': new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK)
      },
      featureGroups: { 'number': 'fooValue' }
    }

    let morpheme = Morpheme.readObject(jsonObject)
    let suffix1 = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'number': new Feature(Feature.types.type, 'dual', Constants.LANG_GREEK)
      }
    }

    expect(morpheme.isInSameGroupWith(suffix1)).toBeFalsy()
  })

  it('11 Morpheme - isInSameGroupWith - compares current morpheme with morpheme from argument - value and features are the same - return true', () => {
    let jsonObject = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'number': new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK),
        'type': new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK)
      },
      featureGroups: { 'number': 'fooValue', 'type': 'fooValue' }
    }

    let morpheme = Morpheme.readObject(jsonObject)
    let suffix1 = {
      value: 'δύο',
      features: {
        'part of speech': new Feature(Feature.types.part, 'numeral', Constants.LANG_GREEK),
        'number': new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK),
        'type': new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK)
      }
    }

    // expect(morpheme.isInSameGroupWith(suffix1)).toBeTruthy()
  })
})
