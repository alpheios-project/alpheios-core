/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, GreekLanguageModel, Feature, Inflection } from 'alpheios-data-models'
import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'
import ExtendedGreekData from '@lib/extended-greek-data'

import Paradigm from '@lib/paradigm.js'
import Suffix from '@lib/suffix.js'
import Form from '@lib/form.js'

import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'

import adjectiveSuffixesCSV from '@lib/lang/greek/data/adjective/suffixes.csv'
import nounSuffixesCSV from '@lib/lang/greek/data/noun/suffixes.csv'
import articleFormsCSV from '@lib/lang/greek/data/article/forms.csv'
import numeralFormsCSV from '@lib/lang/greek/data/numeral/forms.csv'
import pronounFormsCSV from '@lib/lang/greek/data/pronoun/forms.csv'
import verbParadigmRulesCSV from '@lib/lang/greek/data/verb/paradigm/rules.csv'
import verbParticipleParadigmRulesCSV from '@lib/lang/greek/data/verb-participle/paradigm/rules.csv'

import numeralFootnotesCSV from '@lib/lang/greek/data/numeral/footnotes.csv'
import nounFootnotesCSV from '@lib/lang/greek/data/noun/footnotes.csv'
import adjectiveFootnotesCSV from '@lib/lang/greek/data/adjective/footnotes.csv'
import pronounFootnotesCSV from '@lib/lang/greek/data/pronoun/footnotes.csv'
import verbParadigmFootnotesCSV from '@lib/lang/greek/data/verb/paradigm/footnotes.csv'

import LanguageDataset from '@lib/language-dataset.js'
import papaparse from 'papaparse'

describe('greek-language-dataset.test.js', () => {
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

  it('1 GreekLanguageDataset - constructor creates with features', () => {
    let GLD = new GreekLanguageDataset()

    expect(GLD.languageID).toEqual(Constants.LANG_GREEK)
    expect(GLD.model).toEqual(GreekLanguageModel)

    expect(GLD.typeFeatures.has(Feature.types.footnote)).toBeTruthy()
    expect(GLD.typeFeatures.has(Feature.types.fullForm)).toBeTruthy()
    expect(GLD.typeFeatures.has(Feature.types.hdwd)).toBeTruthy()
    expect(GLD.typeFeatures.has(Feature.types.dialect)).toBeTruthy()

    let greekModelFeatures = GreekLanguageModel.typeFeatures
    greekModelFeatures.forEach(feature => expect(GLD.typeFeatures.has(feature.type)).toBeTruthy())
  })

  it('2 GreekLanguageDataset - addSuffixes for adjectives executes addInflectionData for each line from csv  with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    const partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    const suffixes = papaparse.parse(adjectiveSuffixesCSV, {})

    GLD.addInflectionData = jest.fn()

    let parsedAdjectiveSuffix = GLD.addSuffixes(partOfSpeech, suffixes.data, [])

    expect(GLD.addInflectionData).toHaveBeenCalledTimes(suffixes.data.length - 1) // 1 for header

    // check import using the first row
    let itemRow = suffixes.data[suffixes.data.length - 1]
    let suffixValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.typeFeatures.get(Feature.types.number).createFromImporter(itemRow[1]),
      GLD.typeFeatures.get(Feature.types.grmCase).createFromImporter(itemRow[2]),
      GLD.typeFeatures.get(Feature.types.declension).createFromImporter(itemRow[3]),
      GLD.typeFeatures.get(Feature.types.gender).createFromImporter(itemRow[4]),
      GLD.typeFeatures.get(Feature.types.type).createFromImporter(itemRow[5])
    ]

    let extendedGreekData = new ExtendedGreekData()
    extendedGreekData.primary = false

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflectionData).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, suffixValue, features, [], extendedLangData)
  })

  it('3 GreekLanguageDataset - addSuffixes for nouns executes addInflectionData for each line from csv with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    const partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    const suffixes = papaparse.parse(nounSuffixesCSV, {})

    GLD.addInflectionData = jest.fn()

    let parsedAdjectiveSuffix = GLD.addSuffixes(partOfSpeech, suffixes.data, [])

    expect(GLD.addInflectionData).toHaveBeenCalledTimes(suffixes.data.length - 1) // 1 for header

    // check import using the last row
    let itemRow = suffixes.data[suffixes.data.length - 1]
    let suffixValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.typeFeatures.get(Feature.types.number).createFromImporter(itemRow[1]),
      GLD.typeFeatures.get(Feature.types.grmCase).createFromImporter(itemRow[2]),
      GLD.typeFeatures.get(Feature.types.declension).createFromImporter(itemRow[3]),
      GLD.typeFeatures.get(Feature.types.gender).createFromImporter(itemRow[4]),
      GLD.typeFeatures.get(Feature.types.type).createFromImporter(itemRow[5])
    ]

    let extendedGreekData = new ExtendedGreekData()
    if (itemRow[6] === 'primary') { extendedGreekData.primary = true }

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflectionData).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, suffixValue, features, [], extendedLangData)
  })

  it('4 GreekLanguageDataset - addArticleForms for articles executes addInflectionData for each line from csv with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    const partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ARTICLE)
    const forms = papaparse.parse(articleFormsCSV, {})

    GLD.addInflectionData = jest.fn()
    GLD.addArticleForms(partOfSpeech, forms.data, [])

    expect(GLD.addInflectionData).toHaveBeenCalledTimes(forms.data.length - 1) // 1 for header

    let itemRow = forms.data[forms.data.length - 1]
    let formValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.typeFeatures.get(Feature.types.number).createFromImporter(itemRow[1]),
      GLD.typeFeatures.get(Feature.types.grmCase).createFromImporter(itemRow[2]),
      GLD.typeFeatures.get(Feature.types.gender).createFromImporter(itemRow[3]),
      GLD.typeFeatures.get(Feature.types.type).createFromImporter(itemRow[4])
    ]

    let extendedGreekData = new ExtendedGreekData()
    if (itemRow[5] === 'primary') { extendedGreekData.primary = true }

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflectionData).toHaveBeenLastCalledWith(partOfSpeech.value, Form, formValue, features, [], extendedLangData)
  })

  it('5 GreekLanguageDataset - addNumeralForms for numerals executes addInflectionData for each line from csv with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    const partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NUMERAL)
    const forms = papaparse.parse(numeralFormsCSV, {})

    GLD.addInflectionData = jest.fn()
    GLD.addNumeralForms(partOfSpeech, forms.data, [])

    expect(GLD.addInflectionData).toHaveBeenCalledTimes(forms.data.length - 1) // 1 for header

    let itemRow = forms.data[forms.data.length - 1]
    let formValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.typeFeatures.get(Feature.types.fullForm).createFromImporter(formValue),
      GLD.typeFeatures.get(Feature.types.hdwd).createFromImporter(itemRow[1]),
      GLD.typeFeatures.get(Feature.types.number).createFromImporter(itemRow[2]),
      GLD.typeFeatures.get(Feature.types.grmCase).createFromImporter(itemRow[3]),
      GLD.typeFeatures.get(Feature.types.gender).createFromImporter(itemRow[4]),
      GLD.typeFeatures.get(Feature.types.type).createFromImporter(itemRow[5])
    ]

    if (itemRow[7]) {
      let indexes = itemRow[7].split(' ')
      features.push(GLD.typeFeatures.get(Feature.types.footnote).createFeatures(indexes))
    }

    let extendedGreekData = new ExtendedGreekData()
    if (itemRow[6] === 'primary') { extendedGreekData.primary = true }

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflectionData).toHaveBeenLastCalledWith(partOfSpeech.value, Form, formValue, features, [], extendedLangData)
  })

  it('6 GreekLanguageDataset - numeralGroupingLemmas fills with data from numeralFormsCSV', () => {
    let GLD = new GreekLanguageDataset()

    const partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NUMERAL)
    const forms = papaparse.parse(numeralFormsCSV, {})

    GLD.addNumeralForms(partOfSpeech, forms.data, [])

    let numeralGroupingLemmas = []
    let numeralGroupingLemmasAll = forms.data.slice(1).filter(item => item[1]).map(item => item[1])
    numeralGroupingLemmasAll.forEach(item => {
      if (numeralGroupingLemmas.indexOf(item) === -1) { numeralGroupingLemmas.push(item) }
    })

    numeralGroupingLemmas.sort((a, b) => {
      let aN = parseInt(a.match(/[0-9]+/g)[0])
      let bN = parseInt(b.match(/[0-9]+/g)[0])
      return aN - bN
    })

    expect(GLD.numeralGroupingLemmas).toEqual(numeralGroupingLemmas)
  })

  it('7 GreekLanguageDataset - addPronounForms for numerals executes addInflectionData for each line from csv with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    const partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    const forms = papaparse.parse(pronounFormsCSV, {})

    GLD.addInflectionData = jest.fn()
    GLD.addPronounForms(partOfSpeech, forms.data, [])

    expect(GLD.addInflectionData).toHaveBeenCalledTimes(forms.data.length - 1) // 1 for header

    let itemRow = forms.data[forms.data.length - 1]
    let formValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.typeFeatures.get(Feature.types.fullForm).createFromImporter(formValue)
    ]
    if (itemRow[1].length > 0) {
      features.push(GLD.typeFeatures.get(Feature.types.hdwd).createFromImporter(itemRow[1]))
    }

    features.push(GLD.typeFeatures.get(Feature.types.grmClass).createFromImporter(itemRow[2]))
    if (itemRow[3].length > 0) {
      features.push(GLD.typeFeatures.get(Feature.types.person).createFromImporter(itemRow[3]))
    }

    features.push(GLD.typeFeatures.get(Feature.types.number).createFromImporter(itemRow[4]))
    features.push(GLD.typeFeatures.get(Feature.types.grmCase).createFromImporter(itemRow[5]))
    features.push(GLD.typeFeatures.get(Feature.types.gender).createFromImporter(itemRow[6]))
    features.push(GLD.typeFeatures.get(Feature.types.type).createFromImporter(itemRow[7]))

    let dialects = itemRow[9].split(',')
    if (itemRow[9] && dialects && dialects.length > 0) {
      features.push(GLD.typeFeatures.get(Feature.types.dialect).createFeatures(dialects))
    }

    if (itemRow[10]) {
      let indexes = itemRow[10].split(' ')
      features.push(GLD.typeFeatures.get(Feature.types.footnote).createFeatures(indexes))
    }

    let extendedGreekData = new ExtendedGreekData()
    if (itemRow[8] === 'primary') { extendedGreekData.primary = true }

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflectionData).toHaveBeenLastCalledWith(partOfSpeech.value, Form, formValue, features, [], extendedLangData)
  })

  it('8 GreekLanguageDataset - pronounGroupingLemmas filled while addPronounForms executed', () => {
    let GLD = new GreekLanguageDataset()

    const partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    const forms = papaparse.parse(pronounFormsCSV, {})

    GLD.addPronounForms(partOfSpeech, forms.data, [])

    expect(GLD.pronounGroupingLemmas).toBeInstanceOf(Map)
    expect(GLD.pronounGroupingLemmas.has('demonstrative')).toBeTruthy()
    expect(GLD.pronounGroupingLemmas.get('demonstrative').length).toEqual(3)
  })

  // it('8 GreekLanguageDataset - verbParadigmTables return map with Paradig objects', () => {
  //   const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables

  //   let checkFirstItem = verbParadigmTables.get(verbParadigmTables.keys()[0])
  //   expect(checkFirstItem).toBeInstanceOf(Paradigm)
  // })

  it('9 GreekLanguageDataset - setParadigmData creates array of Paradigms from source jsons (Verb)', () => {
    let GLD = new GreekLanguageDataset()

    const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables
    const verbParticipleParadigmTables = GreekLanguageDatasetJSON.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    const partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB)

    let paradigmRules = papaparse.parse(verbParadigmRulesCSV, {}).data

    let paradigms = GLD.setParadigmData(
      partOfSpeech, verbParadigmTables,
      paradigmRules, verbAndParticipleParadigmTables)

    paradigms.forEach(item => { expect(item).toBeInstanceOf(Paradigm) })

    // check using the first item
    let checkItem = paradigms[0]
    expect(checkItem.rules.length).toBeGreaterThan(0)
    expect(checkItem._suppParadigms.size).toBeGreaterThan(0)
  })

  it('10 GreekLanguageDataset - setParadigmData creates array of Paradigms from source jsons (Verb Participle)', () => {
    let GLD = new GreekLanguageDataset()

    const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables
    const verbParticipleParadigmTables = GreekLanguageDatasetJSON.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    const partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB_PARTICIPLE)

    let paradigmRules = papaparse.parse(verbParticipleParadigmRulesCSV, {}).data

    let paradigms = GLD.setParadigmData(
      partOfSpeech, verbParticipleParadigmTables,
      paradigmRules, verbAndParticipleParadigmTables)

    paradigms.forEach(item => { expect(item).toBeInstanceOf(Paradigm) })

    // check using the first item
    let checkItem = paradigms[0]
    expect(checkItem.rules.length).toBeGreaterThan(0)
  })

  it('11 GreekLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Numerals)', () => {
    let GLD = new GreekLanguageDataset()

    GLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Numerals
    partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NUMERAL)
    footnotes = papaparse.parse(numeralFootnotesCSV, {})

    GLD.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    expect(GLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(GLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it('12 GreekLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Noun)', () => {
    let GLD = new GreekLanguageDataset()

    GLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Noun
    partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    footnotes = papaparse.parse(nounFootnotesCSV, {})

    GLD.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    expect(GLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(GLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it('13 GreekLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Adjective)', () => {
    let GLD = new GreekLanguageDataset()

    GLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Noun
    partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    footnotes = papaparse.parse(adjectiveFootnotesCSV, {})

    GLD.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    expect(GLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(GLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it('14 GreekLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Pronoun)', () => {
    let GLD = new GreekLanguageDataset()

    GLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Noun
    partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    footnotes = papaparse.parse(pronounFootnotesCSV, {})

    GLD.addFootnotes(partOfSpeech, Form, footnotes.data)

    expect(GLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(GLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Form, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it('15 GreekLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Verb)', () => {
    let GLD = new GreekLanguageDataset()

    GLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Noun
    partOfSpeech = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    footnotes = papaparse.parse(verbParadigmFootnotesCSV, {})

    GLD.addFootnotes(partOfSpeech, Paradigm, footnotes.data)

    expect(GLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(GLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Paradigm, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it.skip('16 GreekLanguageDataset - loadData loads data for all parts of speech', () => {
    Object.defineProperty(GreekLanguageDataset, 'verbParadigmTables', {
      get: jest.fn(() => GreekLanguageDatasetJSON.verbParadigmTables),
      set: jest.fn()
    })
    Object.defineProperty(GreekLanguageDataset, 'verbParticipleParadigmTables', {
      get: jest.fn(() => GreekLanguageDatasetJSON.verbParticipleParadigmTables),
      set: jest.fn()
    })

    let GLD = new LanguageDataset(Constants.LANG_GREEK)

    GLD.addSuffixes = jest.fn()
    GLD.addFootnotes = jest.fn()
    GLD.addArticleForms = jest.fn()
    GLD.addPronounForms = jest.fn()
    GLD.addNumeralForms = jest.fn()
    GLD.setParadigmData = jest.fn()
    GLD.addParadigms = jest.fn()

    let partOfSpeechNoun = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    let suffixesNoun = papaparse.parse(nounSuffixesCSV, {})
    let footnotesNoun = papaparse.parse(nounFootnotesCSV, {})

    let partOfSpeechAdjective = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    let suffixesAdjective = papaparse.parse(adjectiveSuffixesCSV, {})
    let footnotesAdjective = papaparse.parse(adjectiveFootnotesCSV, {})

    let partOfSpeechArticles = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ARTICLE)
    let formsArticles = papaparse.parse(articleFormsCSV, {})

    let partOfSpeechPronoun = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    let formsPronoun = papaparse.parse(pronounFormsCSV, {})
    let footnotesPronoun = papaparse.parse(pronounFootnotesCSV, {})

    let partOfSpeechNumeral = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NUMERAL)
    let formsNumeral = papaparse.parse(numeralFormsCSV, {})
    let footnotesNumeral = papaparse.parse(numeralFootnotesCSV, {})

    const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables
    const verbParticipleParadigmTables = GreekLanguageDatasetJSON.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    let partOfSpeechVerb = GLD.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    let footnoteVerb = papaparse.parse(verbParadigmFootnotesCSV, {})

    expect(GLD.dataLoaded).toBeFalsy()

    GLD.loadData()

    expect(GLD.addSuffixes).toHaveBeenCalledWith(partOfSpeechNoun, suffixesNoun.data)
    expect(GLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechNoun, Suffix, footnotesNoun.data)

    expect(GLD.addSuffixes).toHaveBeenCalledWith(partOfSpeechAdjective, suffixesAdjective.data)
    expect(GLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechAdjective, Suffix, footnotesAdjective.data)

    expect(GLD.addArticleForms).toHaveBeenCalledWith(partOfSpeechArticles, formsArticles.data)

    expect(GLD.addPronounForms).toHaveBeenCalledWith(partOfSpeechPronoun, formsPronoun.data)
    expect(GLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechPronoun, Form, footnotesPronoun.data)

    expect(GLD.addNumeralForms).toHaveBeenCalledWith(partOfSpeechNumeral, formsNumeral.data)
    expect(GLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechNumeral, Form, footnotesNumeral.data)

    expect(GLD.setParadigmData).toHaveBeenCalledTimes(2)
    expect(GLD.addParadigms).toHaveBeenCalledTimes(2)

    expect(GLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechVerb, Paradigm, footnoteVerb.data)
    expect(GLD.dataLoaded).toBeTruthy()
  })

  it('17 GreekLanguageDataset - getPronounGroupingLemmas returns for current grammar class', () => {
    let GLD = new GreekLanguageDataset()
    GLD.loadData()

    expect(GLD.getPronounGroupingLemmas('fooclass').length).toEqual(0)
    expect(GLD.getPronounGroupingLemmas('demonstrative').length).toBeGreaterThan(0)
  })

  it('18 GreekLanguageDataset - getNumeralGroupingLemmas returns numerals lemmas', () => {
    let GLD = new GreekLanguageDataset()
    GLD.loadData()

    expect(GLD.getNumeralGroupingLemmas().length).toBeGreaterThan(0)
  })

  it('19 GreekLanguageDataset - getObligatoryMatchList returns different conditions for different parts of speech', () => {
    let inflectionPronoun = new Inflection('foo', 'grc')
    inflectionPronoun.addFeature(new Feature(Feature.types.part, Constants.POFS_PRONOUN, Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getObligatoryMatchList(inflectionPronoun)).toEqual([Feature.types.part, Feature.types.grmClass])

    let inflectionNumeral = new Inflection('foo', 'grc')
    inflectionNumeral.addFeature(new Feature(Feature.types.part, Constants.POFS_NUMERAL, Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getObligatoryMatchList(inflectionNumeral)).toEqual([Feature.types.part])

    let inflectionArticle = new Inflection('foo', 'grc')
    inflectionArticle.addFeature(new Feature(Feature.types.part, Constants.POFS_ARTICLE, Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getObligatoryMatchList(inflectionArticle)).toEqual([Feature.types.part])

    let inflectionNoun = new Inflection('foo', 'grc')
    inflectionNoun.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getObligatoryMatchList(inflectionNoun)).toEqual([Feature.types.part])

    let inflectionAdjective = new Inflection('foo', 'grc')
    inflectionAdjective.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getObligatoryMatchList(inflectionAdjective)).toEqual([Feature.types.part])

    let inflectionVerb = new Inflection('foo', 'grc')
    inflectionVerb.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getObligatoryMatchList(inflectionVerb)).toEqual([Feature.types.part])

    let inflectionVerbParticiple = new Inflection('foo', 'grc')
    inflectionVerbParticiple.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB_PARTICIPLE, Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getObligatoryMatchList(inflectionVerbParticiple)).toEqual([Feature.types.part])
  })

  it('20 GreekLanguageDataset - getOptionalMatchList returns different conditions for different parts of speech', () => {
    const GEND_MASCULINE_FEMININE = 'masculine feminine'
    const GEND_MASCULINE_FEMININE_NEUTER = 'masculine feminine neuter'
    const wideGenders = new Feature(
      Feature.types.gender,
      [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, GEND_MASCULINE_FEMININE, Constants.GEND_NEUTER, GEND_MASCULINE_FEMININE_NEUTER],
      Constants.LANG_GREEK
    )

    let inflectionNoun = new Inflection('ξηρή', 'grc')
    inflectionNoun.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_GREEK))
    inflectionNoun.addFeature(new Feature(Feature.types.grmCase, 'nominative', Constants.LANG_GREEK))
    inflectionNoun.addFeature(new Feature(Feature.types.declension, '1st', Constants.LANG_GREEK))
    inflectionNoun.addFeature(new Feature(Feature.types.dialect, 'epic Ionic', Constants.LANG_GREEK))
    inflectionNoun.addFeature(new Feature(Feature.types.fullForm, 'ξηρή', Constants.LANG_GREEK))
    inflectionNoun.addFeature(new Feature(Feature.types.gender, 'feminine', Constants.LANG_GREEK))
    inflectionNoun.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getOptionalMatchList(inflectionNoun)).toEqual([Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number])

    let inflectionAdjective = new Inflection('ξηρή', 'grc')
    inflectionAdjective.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, Constants.LANG_GREEK))
    inflectionAdjective.addFeature(new Feature(Feature.types.grmCase, 'nominative', Constants.LANG_GREEK))
    inflectionAdjective.addFeature(new Feature(Feature.types.declension, '1st', Constants.LANG_GREEK))
    inflectionAdjective.addFeature(new Feature(Feature.types.dialect, 'epic Ionic', Constants.LANG_GREEK))
    inflectionAdjective.addFeature(new Feature(Feature.types.fullForm, 'ξηρή', Constants.LANG_GREEK))
    inflectionAdjective.addFeature(new Feature(Feature.types.gender, 'masculine feminine', Constants.LANG_GREEK))
    inflectionAdjective.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getOptionalMatchList(inflectionAdjective)).toEqual([Feature.types.grmCase, Feature.types.gender, Feature.types.number, Feature.types.declension])

    let inflectionPronoun = new Inflection('ξηρή', 'grc')
    inflectionPronoun.addFeature(new Feature(Feature.types.part, Constants.POFS_PRONOUN, Constants.LANG_GREEK))
    inflectionPronoun.addFeature(new Feature(Feature.types.grmCase, 'nominative', Constants.LANG_GREEK))
    inflectionPronoun.addFeature(new Feature(Feature.types.declension, '1st', Constants.LANG_GREEK))
    inflectionPronoun.addFeature(new Feature(Feature.types.dialect, 'epic Ionic', Constants.LANG_GREEK))
    inflectionPronoun.addFeature(new Feature(Feature.types.fullForm, 'ξηρή', Constants.LANG_GREEK))
    inflectionPronoun.addFeature(new Feature(Feature.types.gender, 'masculine feminine', Constants.LANG_GREEK))
    inflectionPronoun.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getOptionalMatchList(inflectionPronoun)).toEqual([Feature.types.grmCase, Feature.types.gender, Feature.types.number])

    let inflectionArticle = new Inflection('ξηρή', 'grc')
    inflectionArticle.addFeature(new Feature(Feature.types.part, Constants.POFS_ARTICLE, Constants.LANG_GREEK))
    inflectionArticle.addFeature(new Feature(Feature.types.grmCase, 'nominative', Constants.LANG_GREEK))
    inflectionArticle.addFeature(new Feature(Feature.types.declension, '1st', Constants.LANG_GREEK))
    inflectionArticle.addFeature(new Feature(Feature.types.dialect, 'epic Ionic', Constants.LANG_GREEK))
    inflectionArticle.addFeature(new Feature(Feature.types.fullForm, 'ξηρή', Constants.LANG_GREEK))
    inflectionArticle.addFeature(new Feature(Feature.types.gender, 'masculine feminine', Constants.LANG_GREEK))
    inflectionArticle.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getOptionalMatchList(inflectionArticle)).toEqual([Feature.types.grmCase, Feature.types.gender, Feature.types.number])

    let inflectionNumeral = new Inflection('ξηρή', 'grc')
    inflectionNumeral.addFeature(new Feature(Feature.types.part, Constants.POFS_NUMERAL, Constants.LANG_GREEK))
    inflectionNumeral.addFeature(new Feature(Feature.types.grmCase, 'nominative', Constants.LANG_GREEK))
    inflectionNumeral.addFeature(new Feature(Feature.types.declension, '1st', Constants.LANG_GREEK))
    inflectionNumeral.addFeature(new Feature(Feature.types.dialect, 'epic Ionic', Constants.LANG_GREEK))
    inflectionNumeral.addFeature(new Feature(Feature.types.fullForm, 'ξηρή', Constants.LANG_GREEK))
    inflectionNumeral.addFeature(new Feature(Feature.types.gender, 'masculine feminine', Constants.LANG_GREEK))
    inflectionNumeral.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getOptionalMatchList(inflectionNumeral)).toEqual([Feature.types.grmCase, Feature.types.gender, Feature.types.number])

    let inflectionVerb = new Inflection('ξηρή', 'grc')
    inflectionVerb.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_GREEK))
    inflectionVerb.addFeature(new Feature(Feature.types.dialect, 'epic Ionic', Constants.LANG_GREEK))
    inflectionVerb.addFeature(new Feature(Feature.types.fullForm, 'ξηρή', Constants.LANG_GREEK))
    inflectionVerb.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK))
    inflectionVerb.addFeature(new Feature(Feature.types.voice, 'mediopassive', Constants.LANG_GREEK))
    inflectionVerb.addFeature(new Feature(Feature.types.mood, 'indicative', Constants.LANG_GREEK))
    inflectionVerb.addFeature(new Feature(Feature.types.tense, 'present', Constants.LANG_GREEK))
    inflectionVerb.addFeature(new Feature(Feature.types.person, '2nd', Constants.LANG_GREEK))

    expect(GreekLanguageDataset.getOptionalMatchList(inflectionVerb)).toEqual([Feature.types.number, Feature.types.voice, Feature.types.mood, Feature.types.tense, Feature.types.person])
  })
})
