/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, LatinLanguageModel, Feature, Inflection, Lemma } from 'alpheios-data-models'
import LatinLanguageDataset from '@lib/lang/latin/latin-language-dataset.js'

import Suffix from '@lib/suffix.js'
import Form from '@lib/form.js'

import adjectiveSuffixesCSV from '@lib/lang/latin/data/adjective/suffixes.csv'
import nounSuffixesCSV from '@lib/lang/latin/data/noun/suffixes.csv'
import pronounFormsCSV from '@lib/lang/latin/data/pronoun/forms.csv'
import verbSuffixesCSV from '@lib/lang/latin/data/verb/suffixes.csv'
import verbParticipleSuffixesCSV from '@lib/lang/latin/data/participle/suffixes.csv'
import verbSupineSuffixesCSV from '@lib/lang/latin/data/supine/suffixes.csv'
import verbFormsCSV from '@lib/lang/latin/data/verb/forms.csv'

import nounFootnotesCSV from '@lib/lang/latin/data/noun/footnotes.csv'
import pronounFootnotesCSV from '@lib/lang/latin/data/pronoun/footnotes.csv'
import adjectiveFootnotesCSV from '@lib/lang/latin/data/adjective/footnotes.csv'
import verbFootnotesCSV from '@lib/lang/latin/data/verb/footnotes.csv'
import verbFormFootnotesCSV from '@lib/lang/latin/data/verb/form_footnotes.csv'

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

  it('1 LatinLanguageDataset - constructor creates with features', () => {
    let LLD = new LatinLanguageDataset()

    expect(LLD.languageID).toEqual(Constants.LANG_LATIN)
    expect(LLD.model).toEqual(LatinLanguageModel)

    expect(LLD.features.has(Feature.types.footnote)).toBeTruthy()
    expect(LLD.features.has(Feature.types.fullForm)).toBeTruthy()
    expect(LLD.features.has(Feature.types.hdwd)).toBeTruthy()
    expect(LLD.features.has(Feature.types.declension)).toBeTruthy()
    expect(LLD.features.has(Feature.types.gender)).toBeTruthy()
    expect(LLD.features.has(Feature.types.tense)).toBeTruthy()

    let latinModelFeatures = LatinLanguageModel.typeFeatures
    latinModelFeatures.forEach(feature => expect(LLD.features.has(feature.type)).toBeTruthy())
  })

  it('2 LatinLanguageDataset - addSuffixes for adjectives executes addInflection for each line from csv  with specific arguments', () => {
    let LLD = new LatinLanguageDataset()

    const partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    const suffixes = papaparse.parse(adjectiveSuffixesCSV, {})

    LLD.addInflection = jest.fn()

    LLD.addSuffixes(partOfSpeech, suffixes.data)

    expect(LLD.addInflection).toHaveBeenCalledTimes(suffixes.data.length - 1) // 1 for header

    // check import using the first row
    let itemRow = suffixes.data[suffixes.data.length - 1]
    let suffixValue = itemRow[0]

    let features = [partOfSpeech,
      LLD.features.get(Feature.types.number).createFromImporter(itemRow[1]),
      LLD.features.get(Feature.types.grmCase).createFromImporter(itemRow[2]),
      LLD.features.get(Feature.types.declension).createFromImporter(itemRow[3]),
      LLD.features.get(Feature.types.gender).createFromImporter(itemRow[4]),
      LLD.features.get(Feature.types.type).createFromImporter(itemRow[5])
    ]

    expect(LLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, suffixValue, features)
  })

  it('3 LatinLanguageDataset - addSuffixes for nouns executes addInflection for each line from csv  with specific arguments', () => {
    let LLD = new LatinLanguageDataset()

    const partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    const suffixes = papaparse.parse(nounSuffixesCSV, {})

    LLD.addInflection = jest.fn()

    LLD.addSuffixes(partOfSpeech, suffixes.data)

    expect(LLD.addInflection).toHaveBeenCalledTimes(suffixes.data.length - 1) // 1 for header

    // check import using the first row
    let itemRow = suffixes.data[suffixes.data.length - 1]
    let suffixValue = itemRow[0]

    let features = [partOfSpeech,
      LLD.features.get(Feature.types.number).createFromImporter(itemRow[1]),
      LLD.features.get(Feature.types.grmCase).createFromImporter(itemRow[2]),
      LLD.features.get(Feature.types.declension).createFromImporter(itemRow[3]),
      LLD.features.get(Feature.types.gender).createFromImporter(itemRow[4]),
      LLD.features.get(Feature.types.type).createFromImporter(itemRow[5])
    ]

    expect(LLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, suffixValue, features)
  })

  it('4 LatinLanguageDataset - addPronounForms for pronouns executes addInflection for each line from csv  with specific arguments', () => {
    let LLD = new LatinLanguageDataset()

    const partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    const forms = papaparse.parse(pronounFormsCSV, {})

    LLD.addInflection = jest.fn()

    LLD.addPronounForms(partOfSpeech, forms.data)

    expect(LLD.addInflection).toHaveBeenCalledTimes(forms.data.length - 1) // 1 for header

    // check import using the first row
    let itemRow = forms.data[forms.data.length - 1]
    let formValue = itemRow[7]

    let features = [partOfSpeech,
      LLD.features.get(Feature.types.grmClass).createFromImporter(itemRow[2]),
      // LLD.features.get(Feature.types.person).createFromImporter(itemRow[3]),
      LLD.features.get(Feature.types.number).createFromImporter(itemRow[4]),
      LLD.features.get(Feature.types.case).createFromImporter(itemRow[5]),
      LLD.features.get(Feature.types.type).createFromImporter(itemRow[6])
    ]

    expect(LLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Form, formValue, features)
  })

  it('5 LatinLanguageDataset - addVerbSuffixes for verbs executes addInflection for each line from csv  with specific arguments', () => {
    let LLD = new LatinLanguageDataset()

    const partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    const suffixes = papaparse.parse(verbSuffixesCSV, {})

    LLD.addInflection = jest.fn()

    LLD.addVerbSuffixes(partOfSpeech, suffixes.data)

    expect(LLD.addInflection).toHaveBeenCalledTimes(suffixes.data.length - 1) // 1 for header

    // check import using the first row
    let itemRow = suffixes.data[suffixes.data.length - 1]
    let suffixValue = itemRow[0]

    let features = [partOfSpeech,
      LLD.features.get(Feature.types.conjugation).createFromImporter(itemRow[1]),
      LLD.features.get(Feature.types.voice).createFromImporter(itemRow[2]),
      LLD.features.get(Feature.types.mood).createFromImporter(itemRow[3]),
      LLD.features.get(Feature.types.tense).createFromImporter(itemRow[4]),
      LLD.features.get(Feature.types.number).createFromImporter(itemRow[5]),
      LLD.features.get(Feature.types.person).createFromImporter(itemRow[6]),
      LLD.features.get(Feature.types.case).createFromImporter(itemRow[7]),
      LLD.features.get(Feature.types.type).createFromImporter(itemRow[8])
    ]

    expect(LLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, suffixValue, features)
  })

  it('6 LatinLanguageDataset - addVerbParticipleSuffixes for verb participles executes addInflection for each line from csv  with specific arguments', () => {
    let LLD = new LatinLanguageDataset()

    const partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_VERB_PARTICIPLE)
    const suffixes = papaparse.parse(verbParticipleSuffixesCSV, {})

    LLD.addInflection = jest.fn()

    LLD.addVerbSuffixes(partOfSpeech, suffixes.data)

    expect(LLD.addInflection).toHaveBeenCalledTimes(suffixes.data.length - 1) // 1 for header

    // check import using the first row
    let itemRow = suffixes.data[suffixes.data.length - 1]
    let suffixValue = itemRow[0]

    let features = [partOfSpeech,
      LLD.features.get(Feature.types.conjugation).createFromImporter(itemRow[1]),
      LLD.features.get(Feature.types.voice).createFromImporter(itemRow[2]),
      LLD.features.get(Feature.types.mood).createFromImporter(itemRow[3]),
      LLD.features.get(Feature.types.tense).createFromImporter(itemRow[4]),
      LLD.features.get(Feature.types.number).createFromImporter(itemRow[5]),
      LLD.features.get(Feature.types.person).createFromImporter(itemRow[6]),
      LLD.features.get(Feature.types.case).createFromImporter(itemRow[7]),
      LLD.features.get(Feature.types.type).createFromImporter(itemRow[8])
    ]

    expect(LLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, suffixValue, features)
  })

  it('7 LatinLanguageDataset - addVerbSupineSuffixes for verb supines executes addInflection for each line from csv  with specific arguments', () => {
    let LLD = new LatinLanguageDataset()

    const partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_SUPINE)
    const suffixes = papaparse.parse(verbSupineSuffixesCSV, {})

    LLD.addInflection = jest.fn()

    LLD.addVerbSupineSuffixes(partOfSpeech, suffixes.data)

    expect(LLD.addInflection).toHaveBeenCalledTimes(suffixes.data.length - 1) // 1 for header

    // check import using the first row
    let itemRow = suffixes.data[suffixes.data.length - 1]
    let suffixValue = itemRow[0]

    let features = [partOfSpeech,
      LLD.features.get(Feature.types.conjugation).createFromImporter(itemRow[1]),
      LLD.features.get(Feature.types.voice).createFromImporter(itemRow[2]),
      LLD.features.get(Feature.types.mood).createFromImporter(itemRow[3]),
      LLD.features.get(Feature.types.tense).createFromImporter(itemRow[4]),
      LLD.features.get(Feature.types.number).createFromImporter(itemRow[5]),
      LLD.features.get(Feature.types.person).createFromImporter(itemRow[6]),
      LLD.features.get(Feature.types.case).createFromImporter(itemRow[7]),
      LLD.features.get(Feature.types.type).createFromImporter(itemRow[8])
    ]

    expect(LLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, suffixValue, features)
  })

  it('8 LatinLanguageDataset - addVerbForms for verbs executes addInflection for each line from csv with specific arguments', () => {
    let LLD = new LatinLanguageDataset()

    const partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    const forms = papaparse.parse(verbFormsCSV, {})

    LLD.addInflection = jest.fn()

    LLD.addVerbForms(partOfSpeech, forms.data)

    expect(LLD.addInflection).toHaveBeenCalledTimes(forms.data.length - 1) // 1 for header

    // check import using the first row
    let itemRow = forms.data[forms.data.length - 1]
    let formValue = itemRow[2]

    let features = [partOfSpeech,
      LLD.features.get(Feature.types.hdwd).createFromImporter(itemRow[0]),
      LLD.features.get(Feature.types.voice).createFromImporter(itemRow[3] ? itemRow[3] : '-'),
      LLD.features.get(Feature.types.mood).createFromImporter(itemRow[4]),
      LLD.features.get(Feature.types.tense).createFromImporter(itemRow[5]),
      LLD.features.get(Feature.types.number).createFromImporter(itemRow[6]),
      LLD.features.get(Feature.types.person).createFromImporter(itemRow[7])
    ]

    expect(LLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Form, formValue, features)
  })

  it('9 LatinLanguageDataset - verbsIrregularLemmas fills in addVerbForms with Lemmas', () => {
    let LLD = new LatinLanguageDataset()

    const partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    const forms = papaparse.parse(verbFormsCSV, {})

    LLD.addInflection = jest.fn()

    LLD.addVerbForms(partOfSpeech, forms.data)

    expect(LLD.verbsIrregularLemmas.length).toBeGreaterThan(0)
    LLD.verbsIrregularLemmas.forEach(lemma => { expect(lemma).toBeInstanceOf(Lemma) })
  })

  it('10 LatinLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Noun)', () => {
    let LLD = new LatinLanguageDataset()

    LLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Noun
    partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    footnotes = papaparse.parse(nounFootnotesCSV, {})

    LLD.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    expect(LLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(LLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it('11 LatinLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Pronoun)', () => {
    let LLD = new LatinLanguageDataset()

    LLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Noun
    partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    footnotes = papaparse.parse(pronounFootnotesCSV, {})

    LLD.addFootnotes(partOfSpeech, Form, footnotes.data)

    expect(LLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(LLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Form, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it('12 LatinLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Adjective)', () => {
    let LLD = new LatinLanguageDataset()

    LLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Noun
    partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    footnotes = papaparse.parse(adjectiveFootnotesCSV, {})

    LLD.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    expect(LLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(LLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it('13 LatinLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Verbs)', () => {
    let LLD = new LatinLanguageDataset()

    LLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Noun
    partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    footnotes = papaparse.parse(verbFootnotesCSV, {})

    LLD.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    expect(LLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(LLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it('14 LatinLanguageDataset - addFootnotes executes addFootnote for each row with specific arguments (Verbs Irregular)', () => {
    let LLD = new LatinLanguageDataset()

    LLD.addFootnote = jest.fn()

    let partOfSpeech, footnotes

    // Noun
    partOfSpeech = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    footnotes = papaparse.parse(verbFormFootnotesCSV, {})

    LLD.addFootnotes(partOfSpeech, Form, footnotes.data)

    expect(LLD.addFootnote).toHaveBeenCalledTimes(footnotes.data.length - 1) // 1 for header

    expect(LLD.addFootnote).toHaveBeenLastCalledWith(partOfSpeech.value, Form, footnotes.data[footnotes.data.length - 1][0], footnotes.data[footnotes.data.length - 1][1])
  })

  it('15 LatinLanguageDataset - loadData loads data for all parts of speech', () => {
    let LLD = new LatinLanguageDataset()

    LLD.addSuffixes = jest.fn()
    LLD.addFootnotes = jest.fn()
    LLD.addPronounForms = jest.fn()
    LLD.addVerbSuffixes = jest.fn()
    LLD.addVerbForms = jest.fn()
    LLD.addVerbParticipleSuffixes = jest.fn()
    LLD.addVerbSupineSuffixes = jest.fn()

    let partOfSpeechNoun = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    let suffixesNoun = papaparse.parse(nounSuffixesCSV, {})
    let footnotesNoun = papaparse.parse(nounFootnotesCSV, {})

    let partOfSpeechPronoun = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    let formsPronoun = papaparse.parse(pronounFormsCSV, {})
    let footnotesPronoun = papaparse.parse(pronounFootnotesCSV, {})

    let partOfSpeechAdjective = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    let suffixesAdjective = papaparse.parse(adjectiveSuffixesCSV, {})
    let footnotesAdjective = papaparse.parse(adjectiveFootnotesCSV, {})

    let partOfSpeechVerb = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    let suffixesVerb = papaparse.parse(verbSuffixesCSV, {})
    let footnotesVerb = papaparse.parse(verbFootnotesCSV, {})
    let formsVerb = papaparse.parse(verbFormsCSV, {})
    let footnotesVerbForms = papaparse.parse(verbFormFootnotesCSV, {})

    let partOfSpeechVerbParticiple = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_VERB_PARTICIPLE)
    let suffixesVerbParticiple = papaparse.parse(verbParticipleSuffixesCSV, {})
    let formsVerbParticiple = papaparse.parse(verbFormsCSV, {})

    let partOfSpeechSupine = LLD.features.get(Feature.types.part).createFeature(Constants.POFS_SUPINE)
    let suffixesSupine = papaparse.parse(verbSupineSuffixesCSV, {})

    expect(LLD.dataLoaded).toBeFalsy()
    LLD.loadData()

    expect(LLD.addSuffixes).toHaveBeenCalledWith(partOfSpeechNoun, suffixesNoun.data)
    expect(LLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechNoun, Suffix, footnotesNoun.data)

    expect(LLD.addPronounForms).toHaveBeenCalledWith(partOfSpeechPronoun, formsPronoun.data)
    expect(LLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechPronoun, Form, footnotesPronoun.data)

    expect(LLD.addSuffixes).toHaveBeenCalledWith(partOfSpeechAdjective, suffixesAdjective.data)
    expect(LLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechAdjective, Suffix, footnotesAdjective.data)

    expect(LLD.addVerbSuffixes).toHaveBeenCalledWith(partOfSpeechVerb, suffixesVerb.data)
    expect(LLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechVerb, Suffix, footnotesVerb.data)
    expect(LLD.addVerbForms).toHaveBeenCalledWith(partOfSpeechVerb, formsVerb.data)
    expect(LLD.addFootnotes).toHaveBeenCalledWith(partOfSpeechVerb, Form, footnotesVerbForms.data)

    expect(LLD.addVerbParticipleSuffixes).toHaveBeenCalledWith(partOfSpeechVerbParticiple, suffixesVerbParticiple.data)
    expect(LLD.addVerbForms).toHaveBeenCalledWith(partOfSpeechVerbParticiple, formsVerbParticiple.data)

    expect(LLD.addVerbSupineSuffixes).toHaveBeenCalledWith(partOfSpeechSupine, suffixesSupine.data)

    expect(LLD.dataLoaded).toBeTruthy()
  })

  it('16 LatinLanguageDataset - checkIrregularVerb find lemma for irregular verb or verb participle', () => {
    let LLD = new LatinLanguageDataset()
    LLD.loadData()

    let inflectionIrregular = new Inflection('fero', 'lat')
    inflectionIrregular.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflectionIrregular.addFeature(new Feature(Feature.types.word, 'fero', Constants.LANG_LATIN))

    expect(LLD.checkIrregularVerb(inflectionIrregular)).toBeTruthy()

    let inflectionRegular = new Inflection('placito', 'lat')
    inflectionRegular.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflectionRegular.addFeature(new Feature(Feature.types.word, 'placet', Constants.LANG_LATIN))

    expect(LLD.checkIrregularVerb(inflectionRegular)).toBeFalsy()

    let inflectionNoun = new Inflection('fero', 'lat')
    inflectionNoun.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_LATIN))
    inflectionNoun.addFeature(new Feature(Feature.types.word, 'fero', Constants.LANG_LATIN))

    expect(LLD.checkIrregularVerb(inflectionNoun)).toBeFalsy()
  })

  it('17 LatinLanguageDataset - getObligatoryMatchList  returns feature lists for different parts of speech', () => {
    let inflectionNoun = new Inflection('fero', 'lat')
    inflectionNoun.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_LATIN))
    inflectionNoun.setConstraints()

    expect(LatinLanguageDataset.getObligatoryMatchList(inflectionNoun)).toEqual([Feature.types.part])

    let inflectionAdjective = new Inflection('fero', 'lat')
    inflectionAdjective.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, Constants.LANG_LATIN))
    inflectionAdjective.setConstraints()

    expect(LatinLanguageDataset.getObligatoryMatchList(inflectionAdjective)).toEqual([Feature.types.part])

    let inflectionPronoun = new Inflection('fero', 'lat')
    inflectionPronoun.addFeature(new Feature(Feature.types.part, Constants.POFS_PRONOUN, Constants.LANG_LATIN))
    inflectionPronoun.setConstraints()

    expect(LatinLanguageDataset.getObligatoryMatchList(inflectionPronoun)).toEqual([Feature.types.fullForm])

    let inflectionVerb = new Inflection('fero', 'lat')
    inflectionVerb.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflectionVerb.setConstraints()

    expect(LatinLanguageDataset.getObligatoryMatchList(inflectionVerb)).toEqual([Feature.types.part])
  })

  it('18 LatinLanguageDataset - getOptionalMatchList  returns specific list for irregularVerbs', () => {
    let inflectionVerb = new Inflection('fero', 'lat')
    inflectionVerb.addFeature(new Feature(Feature.types.part, Constants.POFS_VERB, Constants.LANG_LATIN))
    inflectionVerb.addFeature(new Feature(Feature.types.word, 'fero', Constants.LANG_LATIN))

    inflectionVerb.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_LATIN))
    inflectionVerb.addFeature(new Feature(Feature.types.voice, 'active', Constants.LANG_LATIN))
    inflectionVerb.addFeature(new Feature(Feature.types.mood, 'indicative', Constants.LANG_LATIN))
    inflectionVerb.addFeature(new Feature(Feature.types.tense, 'present', Constants.LANG_LATIN))
    inflectionVerb.addFeature(new Feature(Feature.types.person, '1st', Constants.LANG_LATIN))
    inflectionVerb.addFeature(new Feature(Feature.types.conjugation, '3rd', Constants.LANG_LATIN))
    inflectionVerb.setConstraints()
    inflectionVerb.constraints.irregularVerb = true

    expect(LatinLanguageDataset.getOptionalMatchList(inflectionVerb)).toEqual([
      Feature.types.mood,
      Feature.types.tense,
      Feature.types.number,
      Feature.types.person,
      Feature.types.voice,
      Feature.types.conjugation
    ])
  })

  it('19 LatinLanguageDataset - getOptionalMatchList  returns specific list for others (Noun for example)', () => {
    let inflectionNoun = new Inflection('fero', 'lat')
    inflectionNoun.addFeature(new Feature(Feature.types.part, Constants.POFS_NOUN, Constants.LANG_LATIN))
    inflectionNoun.addFeature(new Feature(Feature.types.word, 'fero', Constants.LANG_LATIN))

    inflectionNoun.addFeature(new Feature(Feature.types.grmCase, 'dative', Constants.LANG_LATIN))
    inflectionNoun.addFeature(new Feature(Feature.types.declension, '2nd', Constants.LANG_LATIN))
    inflectionNoun.addFeature(new Feature(Feature.types.gender, 'feminine', Constants.LANG_LATIN))
    inflectionNoun.addFeature(new Feature(Feature.types.number, 'singular', Constants.LANG_LATIN))
    inflectionNoun.setConstraints()

    expect(LatinLanguageDataset.getOptionalMatchList(inflectionNoun)).toEqual([
      Feature.types.grmCase,
      Feature.types.declension,
      Feature.types.gender,
      Feature.types.number
    ])
  })
})
