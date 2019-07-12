/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { Constants, Feature, Inflection, LanguageModelFactory as LMF } from 'alpheios-data-models'

import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'

import LanguageDataset from '@lib/language-dataset.js'
import LanguageDatasetFactory from '@lib/language-dataset-factory.js'

import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'
import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'

import verbParadigmRulesCSV from '@lib/lang/greek/data/verb/paradigm/rules.csv'

import Morpheme from '@lib/morpheme.js'
import Suffix from '@lib/suffix.js'
import Form from '@lib/form.js'
import Paradigm from '@lib/paradigm.js'

import papaparse from 'papaparse'

describe('language-dataset.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  const languageIDLat = Constants.LANG_LATIN
  const languageIDGreek = Constants.LANG_GREEK
  /*
  Object.defineProperty(GreekLanguageDataset, 'verbParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParadigmTables),
    set: jest.fn()
  })
  Object.defineProperty(GreekLanguageDataset, 'verbParticipleParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParticipleParadigmTables),
    set: jest.fn()
  })
*/
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

  it('1 LanguageDataset - constructor throw Error if languageID is not defined', () => {
    expect(() => new LanguageDataset()).toThrow(new Error('Language ID cannot be empty.'))
  })

  it('2 LanguageDataset - constructor creates with common features for current languageID', () => {
    let LD = new LanguageDataset(languageIDLat)

    expect(LD.languageID).toEqual(languageIDLat)
    expect(LD.dataLoaded).toBeFalsy()
    expect(LD.model).toEqual(LMF.getLanguageModel(languageIDLat))
    expect(LD.pos).toBeDefined()
    expect(LD.footnotes).toBeDefined()
  })

  it('3 LanguageDataset - addInflectionData creates and loads inflectionSet to LanguageDataset.pos', () => {
    let LD = new LanguageDataset(languageIDLat)

    const partOfSpeech = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    const classType = Suffix
    const itemValue = 'a'
    let features = []
    features.push(partOfSpeech)
    features.push(new Feature(Feature.types.number, 'singular', languageIDLat))
    features.push(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    features.push(new Feature(Feature.types.declension, '1st', languageIDLat))
    features.push(new Feature(Feature.types.gender, 'feminine', languageIDLat))
    features.push(new Feature(Feature.types.type, 'regular', languageIDLat))
    features.push(new Feature(Feature.types.footnote, '3', languageIDLat))

    expect(LD.pos.size).toEqual(0)
    LD.addInflectionData(partOfSpeech.value, classType, itemValue, features)

    expect(LD.pos.size).toEqual(1)
    expect(Array.from(LD.pos.keys())).toEqual(['adjective'])

    expect(LD.pos.get('adjective').constructor.name).toEqual('InflectionSet')
    expect(LD.pos.get('adjective').partOfSpeech).toEqual('adjective')
    expect(Array.from(LD.pos.get('adjective').types.keys())).toEqual([Suffix])
    expect(LD.pos.get('adjective').types.get(Suffix).constructor.name).toEqual('InflectionList')
  })

  it('4 LanguageDataset - addParadigms adds Paradigm to LanguageDataset.pos', () => {
    let LD = new LanguageDataset(languageIDGreek)
    let GLD = new GreekLanguageDataset()

    const partOfSpeech = new Feature(Feature.types.part, Constants.POFS_VERB, languageIDGreek)
    const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables
    const verbParticipleParadigmTables = GreekLanguageDatasetJSON.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    let paradigms = GLD.setParadigmData(
      partOfSpeech, verbParadigmTables,
      papaparse.parse(verbParadigmRulesCSV, {}).data, verbAndParticipleParadigmTables)

    expect(LD.pos.size).toEqual(0)

    LD.addParadigms(partOfSpeech, paradigms)

    expect(LD.pos.size).toEqual(1)
    expect(Array.from(LD.pos.keys())).toEqual(['verb'])

    expect(LD.pos.get('verb').constructor.name).toEqual('InflectionSet')
    expect(LD.pos.get('verb').partOfSpeech).toEqual('verb')
    expect(Array.from(LD.pos.get('verb').types.keys())).toEqual([Paradigm])
    expect(LD.pos.get('verb').types.get(Paradigm).constructor.name).toEqual('ParadigmInflectionList')
  })

  it('5 LanguageDataset - addFootnote checks arguments - index and text are required', () => {
    let LD = new LanguageDataset(languageIDLat)

    const partOfSpeech = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    const classType = Suffix
    const index = '3'
    const text = 'foo footnote'

    expect(() => LD.addFootnote()).toThrow(new Error('Footnote index data should not be empty.'))
    expect(() => LD.addFootnote(partOfSpeech)).toThrow(new Error('Footnote index data should not be empty.'))
    expect(() => LD.addFootnote(partOfSpeech, classType)).toThrow(new Error('Footnote index data should not be empty.'))
    expect(() => LD.addFootnote(partOfSpeech, classType, index)).toThrow(new Error('Footnote text data should not be empty.'))
    expect(() => LD.addFootnote(partOfSpeech, classType, index, text)).not.toThrow(expect.any(Error))
  })

  it('6 LanguageDataset - addFootnote adds Footnote to LD.pos', () => {
    let LD = new LanguageDataset(languageIDLat)

    const partOfSpeech = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    const classType = Suffix
    const index = '3'
    const text = 'foo footnote'

    expect(LD.pos.size).toEqual(0)

    LD.addFootnote(partOfSpeech.value, classType, index, text)

    let suffixItem = LD.pos.get('adjective').types.get(Suffix)

    expect(suffixItem).toBeDefined()
    expect(Array.from(suffixItem.footnotesMap.keys())).toEqual(['3'])
    expect(suffixItem.footnotesMap.get('3').constructor.name).toEqual('Footnote')
    expect(suffixItem.footnotesMap.get('3').index).toEqual('3')
    expect(suffixItem.footnotesMap.get('3').text).toEqual('foo footnote')
  })

  it('7 LanguageDataset - checkMatches checks fullMatch for matchList, inflection and morpheme (success result for obligatory match)', () => {
    let matchList = [ Feature.types.part ]

    let inflection = new Inflection('beat', 'lat', 'um')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat))
    inflection.addFeature(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.declension, '1st', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.gender, 'neuter', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.number, 'singular', languageIDLat))
    inflection.setConstraints()

    let suffixItem = new Suffix('um')
    suffixItem.features[Feature.types.part] = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    suffixItem.features[Feature.types.grmCase] = new Feature(Feature.types.grmCase, 'nominative', languageIDLat)
    suffixItem.features[Feature.types.declension] = new Feature(Feature.types.declension, ['1st', '2nd'], languageIDLat)
    suffixItem.features[Feature.types.gender] = new Feature(Feature.types.gender, 'neuter', languageIDLat)
    suffixItem.features[Feature.types.number] = new Feature(Feature.types.number, 'singular', languageIDLat)

    let result = LanguageDataset.checkMatches(matchList, inflection, suffixItem)

    expect(result.fullMatch).toBeTruthy()
    expect(result.matchedItems).toEqual(matchList)
  })

  it('8 LanguageDataset - checkMatches checks fullMatch for matchList, inflection and morpheme (success result for optional match)', () => {
    let matchList = [ Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number ]

    let inflection = new Inflection('beat', 'lat', 'um')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat))
    inflection.addFeature(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.declension, '1st', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.gender, 'neuter', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.number, 'singular', languageIDLat))
    inflection.setConstraints()

    let suffixItem = new Suffix('um')
    suffixItem.features[Feature.types.part] = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    suffixItem.features[Feature.types.grmCase] = new Feature(Feature.types.grmCase, 'nominative', languageIDLat)
    suffixItem.features[Feature.types.declension] = new Feature(Feature.types.declension, '1st', languageIDLat)
    suffixItem.features[Feature.types.gender] = new Feature(Feature.types.gender, 'neuter', languageIDLat)
    suffixItem.features[Feature.types.number] = new Feature(Feature.types.number, 'singular', languageIDLat)

    let result = LanguageDataset.checkMatches(matchList, inflection, suffixItem)

    expect(result.fullMatch).toBeTruthy()
    expect(result.matchedItems).toEqual(matchList)
  })

  it('9 LanguageDataset - checkMatches checks fullMatch for matchList, inflection and morpheme (failed result for obligatory match)', () => {
    let matchList = [ Feature.types.part ]

    let inflection = new Inflection('beat', 'lat', 'um')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat))
    inflection.addFeature(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.declension, '1st', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.gender, 'neuter', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.number, 'singular', languageIDLat))
    inflection.setConstraints()

    let suffixItem = new Suffix('um')
    suffixItem.features[Feature.types.part] = new Feature(Feature.types.part, Constants.POFS_NOUN, languageIDLat)
    suffixItem.features[Feature.types.grmCase] = new Feature(Feature.types.grmCase, 'nominative', languageIDLat)
    suffixItem.features[Feature.types.declension] = new Feature(Feature.types.declension, ['1st', '2nd'], languageIDLat)
    suffixItem.features[Feature.types.gender] = new Feature(Feature.types.gender, 'neuter', languageIDLat)
    suffixItem.features[Feature.types.number] = new Feature(Feature.types.number, 'singular', languageIDLat)

    let result = LanguageDataset.checkMatches(matchList, inflection, suffixItem)

    expect(result.fullMatch).toBeFalsy()
    expect(result.matchedItems.length).toEqual(0)
  })

  it('10 LanguageDataset - checkMatches checks fullMatch for matchList, inflection and morpheme (failed result for optional match)', () => {
    let matchList = [ Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number ]

    let inflection = new Inflection('beat', 'lat', 'um')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat))
    inflection.addFeature(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.declension, '1st', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.gender, 'neuter', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.number, 'singular', languageIDLat))
    inflection.setConstraints()

    let suffixItem = new Suffix('um')
    suffixItem.features[Feature.types.part] = new Feature(Feature.types.part, Constants.POFS_NOUN, languageIDLat)
    suffixItem.features[Feature.types.grmCase] = new Feature(Feature.types.grmCase, 'nominative', languageIDLat)
    suffixItem.features[Feature.types.declension] = new Feature(Feature.types.declension, '2nd', languageIDLat)
    suffixItem.features[Feature.types.gender] = new Feature(Feature.types.gender, 'neuter', languageIDLat)
    suffixItem.features[Feature.types.number] = new Feature(Feature.types.number, 'singular', languageIDLat)

    let result = LanguageDataset.checkMatches(matchList, inflection, suffixItem)

    expect(result.fullMatch).toBeFalsy()
    expect(result.matchedItems).toEqual([ Feature.types.grmCase, Feature.types.gender, Feature.types.number ])
  })

  // It now does not provide such comparison behavior
  /* it('11 LanguageDataset - checkMatches checks matches of the feature and if morpheme hasn\'t current feature - it automaticaly adds as matched', () => {
    let matchList = [ Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number ]

    let inflection = new Inflection('beat', 'lat', 'um')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat))
    inflection.addFeature(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.declension, '1st', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.gender, 'neuter', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.number, 'singular', languageIDLat))
    inflection.setConstraints()

    let suffixItem = new Suffix('um')
    suffixItem.features[Feature.types.part] = new Feature(Feature.types.part, Constants.POFS_NOUN, languageIDLat)
    suffixItem.features[Feature.types.grmCase] = new Feature(Feature.types.grmCase, 'nominative', languageIDLat)

    let result = LanguageDataset.checkMatches(matchList, inflection, suffixItem)

    expect(result.fullMatch).toBeTruthy()
    expect(result.matchedItems).toEqual([ Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number ])
  }) */

  it('12 LanguageDataset - setInflectionData - throw Error if even one inflection doesn\'t have part of speech feature', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'ζώνη')

    let testInflection = testHomonym.lexemes[0].inflections[0]
    let testLemma = testHomonym.lexemes[0].lemma
    testInflection[Feature.types.part] = undefined

    let LD = new GreekLanguageDataset()

    expect(() => LD.setInflectionData(testInflection, testLemma)).toThrow(new Error('Part of speech data is missing in an inflection'))
  })

  it('13 LanguageDataset - setInflectionData - throw Error if even one inflection has part of speech feature as Multiple ', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'ζώνη')

    let testInflection = testHomonym.lexemes[0].inflections[0]
    let testLemma = testHomonym.lexemes[0].lemma
    testInflection[Feature.types.part] = new Feature(Feature.types.part, ['verb', 'noun'], Constants.LANG_GREEK)
    let LD = new GreekLanguageDataset()

    expect(() => LD.setInflectionData(testInflection, testLemma)).toThrow(new Error('Part of speech data should have only one value'))
  })

  it('14 LanguageDataset - setInflectionData - throw Error if even inflection.constraints has pronounClassRequired = true and doesn\'t have class Feature ', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'δύο')

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek)

    let testInflection = testHomonym.lexemes[0].inflections[0]
    let testLemma = testHomonym.lexemes[0].lemma
    testInflection[Feature.types.part] = new Feature(Feature.types.part, 'pronoun', Constants.LANG_GREEK)

    let res = LD.setInflectionData(testInflection, testLemma)

    expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(/^Cannot determine a grammar class for a δύο pronoun/))
  })

  it('15 LanguageDataset - setInflectionData - throw Error if even inflection.constraints has pronounClassRequired = true and doesn\'t have class Feature ', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'δύο')

    let LD = new GreekLanguageDataset()

    let testInflection = testHomonym.lexemes[0].inflections[0]
    let testLemma = testHomonym.lexemes[0].lemma
    testInflection[Feature.types.part] = new Feature(Feature.types.part, 'spine', Constants.LANG_GREEK)

    let res = LD.setInflectionData(testInflection, testLemma)

    expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(/^There is no source data for the following part of speech:/))
  })

  it('16 LanguageDataset - setInflectionData - define fullFormBased, suffixBased, pronounClassRequired, paradigmBased (numeral)', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'δύο')

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek) // returns LanguageDataset

    let testInflection = testHomonym.lexemes[0].inflections[0]
    let testLemma = testHomonym.lexemes[0].lemma

    let res = LD.setInflectionData(testInflection, testLemma)

    expect(res.constraints.fullFormBased).toBeTruthy()
    expect(res.constraints.suffixBased).toBeFalsy()
    expect(res.constraints.pronounClassRequired).toBeFalsy()
    expect(res.constraints.paradigmBased).toBeFalsy()
  })

  it('17 LanguageDataset - setInflectionData - define fullFormBased, suffixBased, pronounClassRequired, paradigmBased (verb)', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'συνδέει')

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek) // returns LanguageDataset

    let testInflection = testHomonym.lexemes[0].inflections[0]
    let testLemma = testHomonym.lexemes[0].lemma

    let res = LD.setInflectionData(testInflection, testLemma)

    expect(res.constraints.fullFormBased).toBeFalsy()
    expect(res.constraints.suffixBased).toBeTruthy()
    expect(res.constraints.pronounClassRequired).toBeFalsy()
    expect(res.constraints.paradigmBased).toBeTruthy()
  })

  it('18 LanguageDataset - setInflectionData - define fullFormBased, suffixBased, pronounClassRequired, paradigmBased (pronoun)', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'με')

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek) // returns LanguageDataset

    let testInflection = testHomonym.lexemes[0].inflections[0]
    let testLemma = testHomonym.lexemes[0].lemma

    let res = LD.setInflectionData(testInflection, testLemma)

    expect(res.constraints.fullFormBased).toBeTruthy()
    expect(res.constraints.suffixBased).toBeFalsy()
    expect(res.constraints.pronounClassRequired).toBeTruthy()
    expect(res.constraints.paradigmBased).toBeFalsy()
  })

  it.skip('17 LanguageDataset - getInflectionData - define Word feature for inflections and fill pos with InflectionSet with Suffix key', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym('grc', 'συνεχής')

    for (let inflection of testHomonym.inflections) {
      inflection.setConstraints()
    }

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek) // returns LanguageDataset

    expect(testHomonym.lexemes.every(lex => lex.inflections.every(infl => infl.word === undefined))).toBeTruthy()

    let res = LD.getInflectionData(testHomonym)

    expect(res.constructor.name).toEqual('InflectionData')
    expect(res.homonym.lexemes.every(lex => lex.inflections.every(infl => infl.word !== undefined))).toBeTruthy()

    expect(res.pos.size).toBeGreaterThan(0)
    expect(Array.from(res.pos.keys())).toEqual(['adjective'])
    expect(res.pos.get('adjective').constructor.name).toEqual('InflectionSet')

    expect(res.pos.get('adjective').types.get(Suffix).items.length).not.toBeLessThan(513)
    expect(res.pos.get('adjective').types.get(Suffix).footnotesMap.size).not.toBeLessThan(14)
  })

  it.skip('18 LanguageDataset - getInflectionData - if pronounClassRequired, class feature is added to inflections', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym('grc', 'με')

    for (let inflection of testHomonym.inflections) {
      inflection.setConstraints()
    }

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek) // returns LanguageDataset

    expect(testHomonym.lexemes.every(lex => lex.inflections.every(infl => infl.word === undefined))).toBeTruthy()

    expect(testHomonym.lexemes[0].inflections[0][Feature.types.class]).toBeUndefined()
    let res = LD.getInflectionData(testHomonym)

    expect(testHomonym.lexemes[0].inflections[0][Feature.types.class]).toBeDefined()
    expect(testHomonym.lexemes[0].inflections[0][Feature.types.class].type).toEqual('class')
  })

  it.skip('19 LanguageDataset - getInflectionData - if LD.pos hasn\'t morphems for current part of speech - it prints warn to console', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym('grc', 'με')

    for (let inflection of testHomonym.inflections) {
      inflection.setConstraints()
    }

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek) // returns LanguageDataset

    expect(testHomonym.lexemes.every(lex => lex.inflections.every(infl => infl.word === undefined))).toBeTruthy()

    let res = LD.getInflectionData(testHomonym)

    expect(testHomonym.lexemes[0].inflections[0][Feature.types.class]).toBeDefined()
    expect(testHomonym.lexemes[0].inflections[0][Feature.types.class].type).toEqual('class')
  })

  it('20 LanguageDataset - hasMatchingForms - returns False if partOfSpeech of inflection is not the same as partOfSpeech from the argument', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'συνεχής') // adjective

    for (let inflection of testHomonym.inflections) {
      inflection.setConstraints()
    }

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek) // returns LanguageDataset
    testHomonym.lexemes[0].inflections[0][Feature.types.part]._data = ['foopart']
    LD.getInflectionData(testHomonym)

    expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(/^There is no source data for the following part of speech/))
  })

  it('21 LanguageDataset - hasMatchingForms - returns False if it hasn\'t Form', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'συνεχής') // adjective

    for (let inflection of testHomonym.inflections) {
      inflection.setConstraints()
    }

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek) // returns LanguageDataset
    LD.getInflectionData(testHomonym)

    expect(LD.hasMatchingForms('adjective', testHomonym.inflections[0])).toBeFalsy()
  })

  it.skip('22 LanguageDataset - hasMatchingForms - returns True If it has Form from inflections using matcher function', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'δύο') // numeral

    for (let inflection of testHomonym.inflections) {
      inflection.setConstraints()
    }

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek) // returns LanguageDataset
    LD.getInflectionData(testHomonym)

    expect(LD.hasMatchingForms('numeral', testHomonym.inflections[0])).toBeTruthy()

    LD.matcher = jest.fn()
    LD.hasMatchingForms('numeral', testHomonym.inflections[0])
    expect(LD.matcher).toHaveBeenCalled()
  })

  it.skip('23 LanguageDataset - reducer - adds matched inflections to accumulator using match method', async () => {
    let LD = LanguageDatasetFactory.getDataset(languageIDGreek)
    LD.matcher = jest.fn((arg1, arg2) => arg1 === arg2 ? arg1 : null)

    let accumulator = []
    LD.reducer('arg1', accumulator, 'arg2')

    expect(accumulator.length).toEqual(0)

    LD.reducer('arg1', accumulator, 'arg1')

    expect(accumulator).toEqual([ 'arg1' ])
    LD.matcher.mockReset()
  })

  it('24 LanguageDataset - matcher - checks inflections with item - has all matches example', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'ταῖν') // adjective
    let LD = LanguageDatasetFactory.getDataset(languageIDGreek)
    const obligatoryMatchList = LD.constructor.getObligatoryMatchList(testHomonym.lexemes[0].inflections[0])
    const optionalMatchList = LD.constructor.getOptionalMatchList(testHomonym.lexemes[0].inflections[0])
    testHomonym.lexemes[0].inflections.forEach(i => {
      i.constraints.obligatoryMatches = obligatoryMatchList
      i.constraints.optionalMatches = optionalMatchList
    })

    let formForCompare = new Form('ταῖν')
    formForCompare.features = {}
    formForCompare.features[Feature.types.part] = new Feature(Feature.types.part, 'article', languageIDGreek)
    formForCompare.features[Feature.types.gender] = new Feature(Feature.types.gender, 'feminine', languageIDGreek)

    let res = LD.matcher(testHomonym.lexemes[0].inflections, formForCompare, { findMatches: true })

    expect(res.match.suffixMatch).toBeTruthy()
    expect(res.match.fullMatch).toBeTruthy()
  })

  it('25 LanguageDataset - matcher - checks inflections with item - has only partial match example', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'ἐμαυτοῦ') // adjective
    let LD = LanguageDatasetFactory.getDataset(languageIDGreek)
    const obligatoryMatchList = LD.constructor.getObligatoryMatchList(testHomonym.lexemes[0].inflections[0])
    const optionalMatchList = LD.constructor.getOptionalMatchList(testHomonym.lexemes[0].inflections[0])
    testHomonym.lexemes[0].inflections.forEach(i => {
      i.constraints.obligatoryMatches = obligatoryMatchList
      i.constraints.optionalMatches = optionalMatchList
    })

    let formForCompare = new Form('ἐμαυτοῦ')
    formForCompare.features = {}
    formForCompare.features[Feature.types.part] = new Feature(Feature.types.part, 'pronoun', languageIDGreek)
    formForCompare.features[Feature.types.gender] = new Feature(Feature.types.gender, 'foo', languageIDGreek)
    formForCompare.features[Feature.types.number] = new Feature(Feature.types.number, 'foo', languageIDGreek)

    let res = LD.matcher(testHomonym.inflections, formForCompare)

    expect(res.match.suffixMatch).toBeTruthy()
    expect(res.match.fullMatch).toBeFalsy()
  })

  it('26 LanguageDataset - matcher - checks inflections with item with different part of speech has no match', async () => {
    let maAdapter = new AlpheiosTuftsAdapter()
    let testHomonym = await maAdapter.getHomonym(languageIDGreek, 'ταῖν') // adjective

    let LD = LanguageDatasetFactory.getDataset(languageIDGreek)

    let formForCompare = new Form('ταῖν')
    formForCompare.features = {}
    formForCompare.features[Feature.types.part] = new Feature(Feature.types.part, 'verb', languageIDGreek)
    formForCompare.features[Feature.types.gender] = new Feature(Feature.types.gender, 'foo', languageIDGreek)

    let res = LD.matcher(testHomonym.inflections, formForCompare)

    expect(res).toBeNull()
  })

  it('27 LanguageDataset - bestMatch - if one of the argument is not defined or null then returns the other argument', async () => {
    let LD = new LanguageDataset(languageIDGreek)

    expect(LD.bestMatch(null, 'arg2')).toEqual('arg2')
    expect(LD.bestMatch('arg1', null)).toEqual('arg1')
  })

  it('28 LanguageDataset - bestMatch - compares suffixMatch and returns with truthy value if only one has true value', async () => {
    let LD = new LanguageDataset(languageIDGreek)

    expect(LD.bestMatch({ id: 1, suffixMatch: true }, { id: 2, suffixMatch: false }).id).toEqual(1)
    expect(LD.bestMatch({ id: 1, suffixMatch: false }, { id: 2, suffixMatch: true }).id).toEqual(2)
  })

  it('29 LanguageDataset - bestMatch - if both suffixMatch are true then we it compares length of matchedFeatures', async () => {
    let LD = new LanguageDataset(languageIDGreek)

    expect(LD.bestMatch({ id: 1, suffixMatch: true, matchedFeatures: ['feature1'] }, { id: 2, suffixMatch: true, matchedFeatures: [] }).id).toEqual(1)
    expect(LD.bestMatch({ id: 1, suffixMatch: true, matchedFeatures: [] }, { id: 2, suffixMatch: true, matchedFeatures: ['feature1'] }).id).toEqual(2)
  })

  it('100 LanguageDataset - getObligatoryMatches executes checkMatches with list of features from an inflection', () => {
    LanguageDataset.checkMatches = jest.fn()
    LanguageDataset.getObligatoryMatchList = jest.fn(() => 'getObligatoryMatchList')
    const obligatoryMatches = ['feature']
    const dummyInflection = {
      constraints: {
        obligatoryMatches
      }
    }

    LanguageDataset.getObligatoryMatches(dummyInflection, 'fooItem')

    expect(LanguageDataset.checkMatches).toHaveBeenCalledWith(obligatoryMatches, dummyInflection, 'fooItem', Morpheme.comparisonTypes.EXACT)
  })

  it('101 LanguageDataset - getOptionalMatches executes checkMatches with getOptionalMatchList', () => {
    LanguageDataset.checkMatches = jest.fn()
    LanguageDataset.getOptionalMatchList = jest.fn(() => 'getOptionalMatchList')
    const optionalMatches = ['feature']
    const dummyInflection = {
      constraints: {
        optionalMatches
      }
    }

    LanguageDataset.getOptionalMatches(dummyInflection, 'fooItem')

    expect(LanguageDataset.checkMatches).toHaveBeenCalledWith(optionalMatches, dummyInflection, 'fooItem', Morpheme.comparisonTypes.EXACT)
  })
})
