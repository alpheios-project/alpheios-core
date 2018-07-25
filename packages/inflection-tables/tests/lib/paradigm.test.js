/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, Inflection } from 'alpheios-data-models'
import Paradigm from '@lib/paradigm.js'

import paradigm01 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-01.json'
import paradigm32 from '@lib/lang/greek/data/verb/paradigm/tables/paradigm-32.json'

import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'

describe('paradigm.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  // console.warn = function () {}

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

  it('1 Paradigm - constructor creates with default values', () => {
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm01)

    expect(paradigm.id).toBeDefined()
    expect(paradigm.paradigmID).toEqual(paradigm01.ID)
    expect(paradigm.languageID).toEqual(Constants.LANG_GREEK)
    expect(paradigm.partOfSpeech).toEqual('verb')
    expect(paradigm.title).toEqual(paradigm01.title)

    expect(paradigm.hasCredits).toEqual(!!paradigm01.credits)
    expect(paradigm.creditsText).toEqual(paradigm01.credits ? paradigm01.credits : '')
    expect(paradigm.subTables).toEqual(paradigm01.subTables)
    expect(paradigm.rules.length).toEqual(0)
    expect(paradigm._suppParadigms.size).toEqual(0)
  })

  it('2 Paradigm - ClassType return Paradigm', () => {
    expect(Paradigm.ClassType).toEqual(Paradigm)
  })

  it('3 Paradigm - addRule adds ParadigmRule to rules attribute', () => {
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm01)

    paradigm.addRule('matchOrder', 'features', 'lemma', 'morphFlags')
    expect(paradigm.rules.length).toEqual(1)
    expect(paradigm.rules[0].constructor.name).toEqual('ParadigmRule')
  })

  it('4 Paradigm - sortRules sorts rules by matchOrder  DESC', () => {
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm01)
    paradigm.addRule(5, 'features', 'lemma', 'morphFlags')
    paradigm.addRule(10, 'features', 'lemma', 'morphFlags')

    expect(paradigm.rules.map(elem => elem.matchOrder)).toEqual([5, 10])
    paradigm.sortRules()

    expect(paradigm.rules.map(elem => elem.matchOrder)).toEqual([10, 5])
  })

  it('5 Paradigm - addSuppTables method fills to _suppParadigms', () => {
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm01)

    const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables
    const verbParticipleParadigmTables = GreekLanguageDatasetJSON.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    paradigm.addSuppTables(verbAndParticipleParadigmTables)

    expect(paradigm._suppParadigms.size).toBeGreaterThan(0)
  })

  it('6 Paradigm - hasSuppParadigms return true if _suppParadigms is filled', () => {
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm01)

    const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables
    const verbParticipleParadigmTables = GreekLanguageDatasetJSON.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    expect(paradigm.hasSuppParadigms).toBeFalsy()

    paradigm.addSuppTables(verbAndParticipleParadigmTables)

    expect(paradigm.hasSuppParadigms).toBeTruthy()
  })

  it('7 Paradigm - suppParadigmList returns values from _suppParadigms', () => {
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm01)

    const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables
    const verbParticipleParadigmTables = GreekLanguageDatasetJSON.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    expect(paradigm.suppParadigmList.length).toEqual(0)

    paradigm.addSuppTables(verbAndParticipleParadigmTables)

    expect(paradigm.suppParadigmList.length).toBeGreaterThan(0)
  })

  it('8 Paradigm - suppParadigmsMap is a get method for _suppParadigms', () => {
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm01)

    const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables
    const verbParticipleParadigmTables = GreekLanguageDatasetJSON.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])
    paradigm.addSuppTables(verbAndParticipleParadigmTables)

    expect(paradigm.suppParadigmsMap.size).toBeGreaterThan(0)
  })

  it('9 Paradigm - matches - compare with inflection based on paradigm rules - success example', () => {
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm32)
    let features = []
    features.push(new Feature(Feature.types.part, 'verb', Constants.LANG_GREEK))
    features.push(new Feature(Feature.types.voice, 'active', Constants.LANG_GREEK))

    paradigm.addRule(2, features, 'fooLemma', '')
    let inflectionSuccess = new Inflection('σύν:δ', 'grc', 'έει', null, null)
    inflectionSuccess.addFeatures(features)

    expect(paradigm.matches(inflectionSuccess)).toBeTruthy()
  })

  it('10 Paradigm - matches - compare with inflection based on paradigm rules - failed example', () => {
    let paradigm = new Paradigm(Constants.LANG_GREEK, 'verb', paradigm32)
    let features1 = []
    features1.push(new Feature(Feature.types.part, 'verb', Constants.LANG_GREEK))
    features1.push(new Feature(Feature.types.voice, 'active', Constants.LANG_GREEK))

    paradigm.addRule(2, features1, 'fooLemma', '')
    let inflectionSuccess = new Inflection('σύν:δ', 'grc', 'έει', null, null)

    let features2 = []
    features2.push(new Feature(Feature.types.part, 'verb', Constants.LANG_GREEK))
    features2.push(new Feature(Feature.types.voice, 'passive', Constants.LANG_GREEK))
    inflectionSuccess.addFeatures(features2)

    expect(paradigm.matches(inflectionSuccess)).toBeFalsy()
  })
})
