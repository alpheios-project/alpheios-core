/* eslint-env jest */
const t = require('../../tests/test-bundle')

describe('LanguageDataset object', () => {
  let languageDataset

  beforeAll(() => {
    // Create a test environment
    languageDataset = new t.LanguageDataset(t.languages.latin)
  })

  test('Should be initialized properly', () => {
    expect(languageDataset).toEqual({
      language: t.languages.latin,
      suffixes: [],
      footnotes: []
    })
  })

  test('Should require language to be provided', () => {
    expect(() => new t.LanguageDataset()).toThrowError(/empty/)
  })

  test('Should not allow initialization with unsupported languages', () => {
    expect(() => new t.LanguageDataset('egyptian')).toThrowError(/not supported/)
  })

  // TODO: Add tests for addSuffix for later as the logic might change

  test('addFootnote should add proper data into a footnotes object', () => {
    let partOfSpeech = new t.Feature('noun', t.Feature.types.part, t.languages.latin)
    languageDataset.addFootnote(partOfSpeech, 5, 'Footnote text')
    expect(languageDataset.footnotes).toEqual(
      expect.arrayContaining([{index: 5, text: 'Footnote text', 'part of speech': 'noun'}]))
  })

  test('addFootnote should not allow empty values', () => {
    expect(() => languageDataset.addFootnote(5)).toThrowError(/empty/)
  })

  // TODO: Add tests for getSuffixes later as the logic might change

  afterAll(() => {
    // Clean a test environment up
    languageDataset = undefined
  })
})

describe('LanguageData', () => {
  let languageData, latinDataset, greekDataset

  beforeAll(() => {
    latinDataset = new t.LanguageDataset(t.languages.latin)
    greekDataset = new t.LanguageDataset(t.languages.greek)

    languageData = new t.LanguageData([latinDataset, greekDataset])
  })

  test('constructor should initialize object properly.', () => {
    expect(languageData).toEqual(expect.objectContaining({
      grc: greekDataset,
      lat: latinDataset,
      supportedLanguages: [t.languages.latin, t.languages.greek]
    }))
  })

  test('loadData() should call a matching method of all language data sets.', () => {
    const loadData = jest.fn()
    latinDataset.loadData = loadData
    greekDataset.loadData = loadData
    languageData.loadData()

    expect(loadData.mock.calls.length).toBe(2)
  })

  test('getSuffixes() should call a getSuffixes() method of a proper language dataset with correct argument(s).', () => {
    let homonym = new t.Homonym([
      new t.Lexeme(
        new t.Lemma('word1', t.languages.greek),
        [
          new t.Inflection('stem1', t.languages.greek),
          new t.Inflection('stem2', t.languages.greek)
        ]
      )
    ])
    const getSuffixes = jest.fn()
    greekDataset.getSuffixes = getSuffixes
    languageData.getSuffixes(homonym)

    expect(getSuffixes.mock.calls.length).toBe(1)
    expect(getSuffixes.mock.calls[0][0]).toBe(homonym)
  })
})

describe('Suffix object', () => {
  'use strict'

  let suffix

  beforeAll(() => {
    // Create a test environment

    suffix = new t.Suffix('suffixtext')
  })

  test('Should be initialized properly', () => {
    expect(suffix).toEqual({
      value: 'suffixtext',
      features: {},
      featureGroups: {},
      extendedLangData: {},
      match: undefined
    })
  })

  test('Should not allow an empty argument', () => {
    expect(() => new t.Suffix()).toThrowError(/empty/)
  })

  test('clone method should return a copy of a Suffix object', () => {
    let clone = suffix.clone()
    expect(clone).toEqual(suffix)
  })

  // TODO: implement tests for featureMatch as functionality may change
  // TODO: implement tests for getCommonGroups as functionality may change
  // TODO: implement tests for isInSameGroupWith as functionality may change
  // TODO: implement tests for split as functionality may change
  // TODO: implement tests for combine as functionality may change

  test('merge() should join two previously split object (objects that are in the same group) together.', () => {
    let values = ['masculine', 'feminine']
    let suffixes = [new t.Suffix('endingOne', undefined), new t.Suffix('endingOne', undefined)]
    suffixes[0].features[t.Feature.types.gender] = values[0]
    suffixes[1].features[t.Feature.types.gender] = values[1]
    suffixes[0].featureGroups[t.Feature.types.gender] = values
    suffixes[1].featureGroups[t.Feature.types.gender] = values
    let merged = t.Suffix.merge(suffixes[0], suffixes[1])
    expect(merged.features[t.Feature.types.gender]).toBe(values[0] + ', ' + values[1])
  })

  afterAll(() => {
    // Clean a test environment up
    suffix = undefined
  })
})

// TODO: implement tests for a WordData later as it will evolve
