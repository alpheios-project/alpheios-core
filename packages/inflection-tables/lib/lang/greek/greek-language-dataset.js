/*
 * Greek language data module
 */
import { Constants, LanguageModelFactory, Feature, FeatureType, Lemma } from 'alpheios-data-models'
import LanguageDataset from '../../../lib/language-dataset'
import ExtendedGreekData from '../../../lib/extended-greek-data'
import Suffix from '../../../lib/suffix.js'
import Form from '../../../lib/form.js'
import Paradigm from '../../../lib/paradigm.js'
import nounSuffixesCSV from './data/noun/suffixes.csv'
import nounFootnotesCSV from './data/noun/footnotes.csv'
import pronounFormsCSV from './data/pronoun/forms.csv'
import pronounFootnotesCSV from './data/pronoun/footnotes.csv'
/* import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv'; */

// Verb paradigm tables
import paradigm01 from './data/verb/paradigm/tables/paradigm-01.json'
import paradigm02 from './data/verb/paradigm/tables/paradigm-02.json'
import paradigm03 from './data/verb/paradigm/tables/paradigm-03.json'
import paradigm04 from './data/verb/paradigm/tables/paradigm-04.json'
import paradigm05 from './data/verb/paradigm/tables/paradigm-05.json'
import paradigm06 from './data/verb/paradigm/tables/paradigm-06.json'
import paradigm07 from './data/verb/paradigm/tables/paradigm-07.json'
import paradigm08 from './data/verb/paradigm/tables/paradigm-08.json'
import paradigm09 from './data/verb/paradigm/tables/paradigm-09.json'
import paradigm10 from './data/verb/paradigm/tables/paradigm-10.json'
import paradigm11 from './data/verb/paradigm/tables/paradigm-11.json'
import paradigm12 from './data/verb/paradigm/tables/paradigm-12.json'
import paradigm13 from './data/verb/paradigm/tables/paradigm-13.json'
import paradigm14 from './data/verb/paradigm/tables/paradigm-14.json'
import paradigm15 from './data/verb/paradigm/tables/paradigm-15.json'
import paradigm16 from './data/verb/paradigm/tables/paradigm-16.json'
import paradigm17 from './data/verb/paradigm/tables/paradigm-17.json'
import paradigm18 from './data/verb/paradigm/tables/paradigm-18.json'
import paradigm19 from './data/verb/paradigm/tables/paradigm-19.json'
import paradigm20 from './data/verb/paradigm/tables/paradigm-20.json'
import paradigm21 from './data/verb/paradigm/tables/paradigm-21.json'
import paradigm22 from './data/verb/paradigm/tables/paradigm-22.json'
import paradigm23 from './data/verb/paradigm/tables/paradigm-23.json'
import paradigm24 from './data/verb/paradigm/tables/paradigm-24.json'
import paradigm25 from './data/verb/paradigm/tables/paradigm-25.json'
import paradigm26 from './data/verb/paradigm/tables/paradigm-26.json'
import paradigm27 from './data/verb/paradigm/tables/paradigm-27.json'
import paradigm28 from './data/verb/paradigm/tables/paradigm-28.json'
import paradigm29 from './data/verb/paradigm/tables/paradigm-29.json'
import paradigm30 from './data/verb/paradigm/tables/paradigm-30.json'
import paradigm31 from './data/verb/paradigm/tables/paradigm-31.json'
import paradigm32 from './data/verb/paradigm/tables/paradigm-32.json'
import paradigm33 from './data/verb/paradigm/tables/paradigm-33.json'
import paradigm34 from './data/verb/paradigm/tables/paradigm-34.json'
import paradigm35 from './data/verb/paradigm/tables/paradigm-35.json'
import paradigm36 from './data/verb/paradigm/tables/paradigm-36.json'
import paradigm37 from './data/verb/paradigm/tables/paradigm-37.json'
import paradigm38 from './data/verb/paradigm/tables/paradigm-38.json'
import paradigm39 from './data/verb/paradigm/tables/paradigm-39.json'
import paradigm40 from './data/verb/paradigm/tables/paradigm-40.json'
import paradigm41 from './data/verb/paradigm/tables/paradigm-41.json'
import paradigm42 from './data/verb/paradigm/tables/paradigm-42.json'
import paradigm43 from './data/verb/paradigm/tables/paradigm-43.json'
import paradigm44 from './data/verb/paradigm/tables/paradigm-44.json'
import paradigm45 from './data/verb/paradigm/tables/paradigm-45.json'
import paradigm46 from './data/verb/paradigm/tables/paradigm-46.json'
import paradigm47 from './data/verb/paradigm/tables/paradigm-47.json'
import paradigm48 from './data/verb/paradigm/tables/paradigm-48.json'
import paradigm49 from './data/verb/paradigm/tables/paradigm-49.json'
import paradigm50 from './data/verb/paradigm/tables/paradigm-50.json'
import paradigm51 from './data/verb/paradigm/tables/paradigm-51.json'
import paradigm52 from './data/verb/paradigm/tables/paradigm-52.json'
import paradigm53 from './data/verb/paradigm/tables/paradigm-53.json'
// Verb paradigm rules and footnotes
import verbParadigmRulesCSV from './data/verb/paradigm/rules.csv'
import verbParadigmFootnotesCSV from './data/verb/paradigm/footnotes.csv'

// Verb participle paradigm tables
import paradigm54 from './data/verb-participle/paradigm/tables/paradigm-54.json'
import paradigm55 from './data/verb-participle/paradigm/tables/paradigm-55.json'
import paradigm56 from './data/verb-participle/paradigm/tables/paradigm-56.json'
import paradigm57 from './data/verb-participle/paradigm/tables/paradigm-57.json'
import paradigm58 from './data/verb-participle/paradigm/tables/paradigm-58.json'
import paradigm59 from './data/verb-participle/paradigm/tables/paradigm-59.json'
import paradigm60 from './data/verb-participle/paradigm/tables/paradigm-60.json'
import paradigm61 from './data/verb-participle/paradigm/tables/paradigm-61.json'
import paradigm62 from './data/verb-participle/paradigm/tables/paradigm-62.json'
import paradigm63 from './data/verb-participle/paradigm/tables/paradigm-63.json'
import paradigm64 from './data/verb-participle/paradigm/tables/paradigm-64.json'
import paradigm65 from './data/verb-participle/paradigm/tables/paradigm-65.json'
import paradigm66 from './data/verb-participle/paradigm/tables/paradigm-66.json'
// Verb participle rules
import verbParticipleParadigmRulesCSV from './data/verb-participle/paradigm/rules.csv'

import papaparse from 'papaparse'

// Create a language data set that will keep all language-related information
// let dataSet = new LanguageDataset(Constants.LANG_GREEK)
let fTypes = Feature.types

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const impName = 'csv'
const footnotes = new FeatureType(Feature.types.footnote, [], Constants.LANG_GREEK)

// endregion Definition of grammatical features

export default class GreekLanguageDataset extends LanguageDataset {
  constructor () {
    super(GreekLanguageDataset.languageID)
  }

  static get languageID () {
    return Constants.LANG_GREEK
  }

  // For noun and adjectives
  addSuffixes (partOfSpeech, data) {
    // An order of columns in a data CSV file
    const n = {
      suffix: 0,
      number: 1,
      grmCase: 2,
      declension: 3,
      gender: 4,
      type: 5,
      primary: 6,
      footnote: 7
    }
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let item = data[i]
      let suffixValue = item[n.suffix]
      // Handle special suffix values
      if (suffixValue === noSuffixValue) {
        suffixValue = null
      }

      let primary = false
      let features = [partOfSpeech,
        this.model.getFeatureType(fTypes.number).getFromImporter(impName, item[n.number]),
        this.model.getFeatureType(fTypes.grmCase).getFromImporter(impName, item[n.grmCase]),
        this.model.getFeatureType(fTypes.declension).getFromImporter(impName, item[n.declension]),
        this.model.getFeatureType(fTypes.gender).getFromImporter(impName, item[n.gender]),
        this.model.getFeatureType(fTypes.type).getFromImporter(impName, item[n.type])]
      if (item[n.primary] === 'primary') {
        primary = true
      }
      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = item[n.footnote].split(' ').map(function (index) {
          return footnotes.get(index)
        })
        features.push(...indexes)
      }
      let extendedGreekData = new ExtendedGreekData()
      extendedGreekData.primary = primary
      let extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }
      this.addInflection(partOfSpeech.value, Suffix, suffixValue, features, extendedLangData)
    }
  }

  // For pronoun
  addPronounForms (partOfSpeech, data) {
    this.pronounGroupingLemmas = new Map([
      ['demonstrative', ['ὅδε', 'οὗτος', 'ἐκεῖνος']]
    ])

    // An order of columns in a data CSV file
    const n = {
      form: 0,
      hdwd: 1,
      grmClass: 2,
      person: 3,
      number: 4,
      grmCase: 5,
      gender: 6,
      type: 7,
      primary: 8,
      dialect: 9,
      footnote: 10
    }

    // Custom importers
    // TODO: decide on the best way to keep mulitple values and re-enable later
    /* languageModel.features[fTypes.gender].addImporter(impName)
      .map('masculine feminine neuter', [
        languageModel.features[fTypes.gender][Constants.GEND_MASCULINE],
        languageModel.features[fTypes.gender][Constants.GEND_FEMININE],
        languageModel.features[fTypes.gender][Constants.GEND_NEUTER]
      ]) */

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let item = data[i]
      let form = item[n.form]

      let features = [partOfSpeech]

      if (item[n.hdwd]) {
        features.push(
          new FeatureType(fTypes.word, [FeatureType.UNRESTRICTED_VALUE], this.languageID).getFromImporter(impName, item[n.hdwd])
        )
      }
      if (item[n.grmClass]) { features.push(this.model.getFeatureType(fTypes.grmClass).getFromImporter(impName, item[n.grmClass])) }
      if (item[n.person]) { features.push(this.model.getFeatureType(fTypes.person).getFromImporter(impName, item[n.person])) }
      if (item[n.number]) { features.push(this.model.getFeatureType(fTypes.number).getFromImporter(impName, item[n.number])) }
      if (item[n.grmCase]) { features.push(this.model.getFeatureType(fTypes.grmCase).getFromImporter(impName, item[n.grmCase])) }
      if (item[n.gender]) { features.push(this.model.getFeatureType(fTypes.gender).getFromImporter(impName, item[n.gender])) }
      if (item[n.type]) { features.push(this.model.getFeatureType(fTypes.type).getFromImporter(impName, item[n.type])) }

      let primary = (item[n.primary] === 'primary')

      // Dialects could have multiple values
      let dialects = item[n.dialect].split(',')
      if (item[n.dialect] && dialects && dialects.length > 0) {
        features.push(new Feature(dialects, fTypes.dialect, this.languageID))
      }

      // Footnotes. There can be multiple footnote indexes separated by commas
      let footnoteIndexes = item[n.footnote].split(',')
      if (item[n.footnote] && footnoteIndexes && footnoteIndexes.length > 0) {
        for (let index of footnoteIndexes) { features.push(footnotes.get(index)) }
      }

      let extendedGreekData = new ExtendedGreekData()
      extendedGreekData.primary = primary
      let extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }
      this.addInflection(partOfSpeech.value, Form, form, features, extendedLangData)
    }
  }

  static get verbParadigmTables () {
    const partOfSpeech = LanguageModelFactory.getLanguageModel(this.languageID)
      .getFeatureType(fTypes.part).get(Constants.POFS_VERB)
    return new Map([
      ['verbpdgm1', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm01))],
      ['verbpdgm2', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm02))],
      ['verbpdgm3', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm03))],
      ['verbpdgm4', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm04))],
      ['verbpdgm5', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm05))],
      ['verbpdgm6', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm06))],
      ['verbpdgm7', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm07))],
      ['verbpdgm8', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm08))],
      ['verbpdgm9', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm09))],
      ['verbpdgm10', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm10))],
      ['verbpdgm11', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm11))],
      ['verbpdgm12', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm12))],
      ['verbpdgm13', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm13))],
      ['verbpdgm14', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm14))],
      ['verbpdgm15', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm15))],
      ['verbpdgm16', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm16))],
      ['verbpdgm17', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm17))],
      ['verbpdgm18', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm18))],
      ['verbpdgm19', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm19))],
      ['verbpdgm20', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm20))],
      ['verbpdgm21', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm21))],
      ['verbpdgm22', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm22))],
      ['verbpdgm23', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm23))],
      ['verbpdgm24', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm24))],
      ['verbpdgm25', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm25))],
      ['verbpdgm26', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm26))],
      ['verbpdgm27', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm27))],
      ['verbpdgm28', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm28))],
      ['verbpdgm29', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm29))],
      ['verbpdgm30', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm30))],
      ['verbpdgm31', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm31))],
      ['verbpdgm32', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm32))],
      ['verbpdgm33', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm33))],
      ['verbpdgm34', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm34))],
      ['verbpdgm35', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm35))],
      ['verbpdgm36', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm36))],
      ['verbpdgm37', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm37))],
      ['verbpdgm38', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm38))],
      ['verbpdgm39', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm39))],
      ['verbpdgm40', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm40))],
      ['verbpdgm41', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm41))],
      ['verbpdgm42', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm42))],
      ['verbpdgm43', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm43))],
      ['verbpdgm44', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm44))],
      ['verbpdgm45', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm45))],
      ['verbpdgm46', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm46))],
      ['verbpdgm47', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm47))],
      ['verbpdgm48', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm48))],
      ['verbpdgm49', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm49))],
      ['verbpdgm50', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm50))],
      ['verbpdgm51', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm51))],
      ['verbpdgm52', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm52))],
      ['verbpdgm53', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm53))]
    ])
  }

  static get verbParticipleParadigmTables () {
    const partOfSpeech = LanguageModelFactory.getLanguageModel(this.languageID)
      .getFeatureType(fTypes.part).get(Constants.POFS_VERB_PARTICIPLE)
    return new Map([
      ['verbpdgm54', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm54))],
      ['verbpdgm55', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm55))],
      ['verbpdgm56', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm56))],
      ['verbpdgm57', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm57))],
      ['verbpdgm58', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm58))],
      ['verbpdgm59', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm59))],
      ['verbpdgm60', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm60))],
      ['verbpdgm61', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm61))],
      ['verbpdgm62', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm62))],
      ['verbpdgm63', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm63))],
      ['verbpdgm64', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm64))],
      ['verbpdgm65', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm65))],
      ['verbpdgm66', new Paradigm(this.languageID, partOfSpeech, JSON.parse(paradigm66))]
    ])
  }

  getParadigms (partOfSpeech, paradigms, rulesData) {
    // An order of columns in a data CSV file
    const n = {
      id: 0,
      matchOrder: 1,
      partOfSpeech: 2, // Ignored, an argument value will be used
      stemtype: 3,
      voice: 4,
      mood: 5,
      tense: 6,
      lemma: 7,
      morphFlags: 8,
      dialect: 9
    }

    // First row contains headers
    for (let i = 1; i < rulesData.length; i++) {
      let item = rulesData[i]
      let id = item[n.id]
      let matchOrder = Number.parseInt(item[n.matchOrder])

      let features = [partOfSpeech]

      if (item[n.stemtype]) { features.push(this.model.getFeatureType(Feature.types.stemtype).getFromImporter(impName, item[n.stemtype])) }
      if (item[n.voice]) { features.push(this.model.getFeatureType(Feature.types.voice).getFromImporter(impName, item[n.voice])) }
      if (item[n.mood]) { features.push(this.model.getFeatureType(Feature.types.mood).getFromImporter(impName, item[n.mood])) }
      if (item[n.tense]) { features.push(this.model.getFeatureType(Feature.types.tense).getFromImporter(impName, item[n.tense])) }
      if (item[n.dialect]) { features.push(this.model.getFeatureType(Feature.types.dialect).getFromImporter(impName, item[n.dialect])) }

      let lemma
      if (item[n.lemma]) {
        lemma = new Lemma(item[n.lemma], this.constructor.languageID)
      }

      let morphFlags = ''
      if (item[n.morphFlags]) {
        morphFlags = item[n.morphFlags]
      }

      if (paradigms.has(id)) {
        paradigms.get(id).addRule(matchOrder, features, lemma, morphFlags)
      } else {
        console.warn(`Cannot find a paradigm table for "${id}" index`)
      }
    }
    for (let paradigm of paradigms.values()) {
      paradigm.sortRules()
    }
    return Array.from(paradigms.values())
  }

  addFootnotes (partOfSpeech, classType, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      this.addFootnote(partOfSpeech.value, classType, data[i][0], data[i][1])
    }
  }

  loadData () {
    let partOfSpeech
    let suffixes
    let forms
    let paradigms
    let footnotes

    // Nouns
    partOfSpeech = this.model.getFeatureType(fTypes.part)[Constants.POFS_NOUN]
    suffixes = papaparse.parse(nounSuffixesCSV, {})
    this.addSuffixes(partOfSpeech, suffixes.data)
    footnotes = papaparse.parse(nounFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    // Pronouns
    partOfSpeech = this.model.getFeatureType(fTypes.part)[Constants.POFS_PRONOUN]
    forms = papaparse.parse(pronounFormsCSV, {})
    this.addPronounForms(partOfSpeech, forms.data)
    footnotes = papaparse.parse(pronounFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Form, footnotes.data)

    // Verbs
    // Paradigms
    partOfSpeech = this.model.getFeatureType(fTypes.part)[Constants.POFS_VERB]
    paradigms = this.getParadigms(
      partOfSpeech, this.constructor.verbParadigmTables, papaparse.parse(verbParadigmRulesCSV, {}).data)
    this.addParadigms(partOfSpeech, paradigms)
    this.addFootnotes(partOfSpeech, Paradigm, papaparse.parse(verbParadigmFootnotesCSV, {}).data)

    // Verb Participles
    // Paradigms
    partOfSpeech = this.model.getFeatureType(fTypes.part)[Constants.POFS_VERB_PARTICIPLE]
    paradigms = this.getParadigms(
      partOfSpeech, this.constructor.verbParticipleParadigmTables, papaparse.parse(verbParticipleParadigmRulesCSV, {}).data)
    this.addParadigms(partOfSpeech, paradigms)

    this.dataLoaded = true
    return this
  }

  /**
   * Returns a feature type with lemmas that are used to group values within inflection tables,
   * such as for demonstrative pronouns
   * @param {string} grammarClass - A name of a pronoun class
   * @return {FeatureType} An object with lemma values
   */
  getPronounGroupingLemmas (grammarClass) {
    let values = this.pronounGroupingLemmas.has(grammarClass) ? this.pronounGroupingLemmas.get(grammarClass) : []
    return new FeatureType(Feature.types.word, values, this.languageID)
  }

  getObligatoryMatches (inflection) {
    let obligatoryMatches = []
    if (inflection.hasFeatureValue(Feature.types.part, Constants.POFS_PRONOUN)) {
      obligatoryMatches.push(Feature.types.grmClass)
    } else if (inflection.constraints.fullFormBased) {
      obligatoryMatches.push(Feature.types.word)
    } else {
      // Default value for suffix matching
      obligatoryMatches.push(Feature.types.part)
    }
    return obligatoryMatches
  }

  getOptionalMatches (inflection) {
    const featureOptions = [
      fTypes.grmCase,
      fTypes.declension,
      fTypes.gender,
      fTypes.number,
      fTypes.voice,
      fTypes.mood,
      fTypes.tense,
      fTypes.person
    ]
    return featureOptions.filter(f => inflection[f])
  }
}
