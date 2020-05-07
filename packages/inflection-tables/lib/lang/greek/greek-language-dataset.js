/*
 * Greek language data module
 */
import { Constants, Feature, FeatureImporter } from 'alpheios-data-models'

import LanguageDataset from '@lib/language-dataset.js'
import ExtendedGreekData from '@lib/extended-greek-data'
import Suffix from '@lib/suffix.js'
import Form from '@lib/form.js'

import nounSuffixesCSV from '@lib/lang/greek/data/noun/suffixes.csv'
import nounFootnotesCSV from '@lib/lang/greek/data/noun/footnotes.csv'

import adjectiveSuffixesCSV from '@lib/lang/greek/data/adjective/suffixes.csv'
import adjectiveFootnotesCSV from '@lib/lang/greek/data/adjective/footnotes.csv'

import articleFormsCSV from '@lib/lang/greek/data/article/forms.csv'

import numeralFormsCSV from '@lib/lang/greek/data/numeral/forms.csv'
import numeralFootnotesCSV from '@lib/lang/greek/data/numeral/footnotes.csv'

import pronounFormsCSV from '@lib/lang/greek/data/pronoun/forms.csv'
import pronounFootnotesCSV from '@lib/lang/greek/data/pronoun/footnotes.csv'

// import GroupFeatureType from '@views/lib/group-feature-type.js'

/* import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv'; */

import papaparse from 'papaparse'

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */

// endregion Definition of grammatical features

export default class GreekLanguageDataset extends LanguageDataset {
  constructor () {
    super(GreekLanguageDataset.languageID)

    this.typeFeatures = this.model.typeFeatures
    this.typeFeatures.set(Feature.types.footnote, new Feature(Feature.types.footnote, [], GreekLanguageDataset.languageID))
    this.typeFeatures.set(Feature.types.fullForm, new Feature(Feature.types.fullForm, [], GreekLanguageDataset.languageID))
    this.typeFeatures.set(Feature.types.hdwd, new Feature(Feature.types.hdwd, [], GreekLanguageDataset.languageID))
    this.typeFeatures.set(Feature.types.dialect, new Feature(Feature.types.dialect, [], GreekLanguageDataset.languageID))

    // Create an importer with default values for every feature
    for (let feature of this.typeFeatures.values()) { // eslint-disable-line prefer-const
      feature.addImporter(new FeatureImporter(feature.values, true))
    }

    // Custom importers for Greek-specific feature values
    this.typeFeatures.get(Feature.types.gender).getImporter()
      .map(this.constructor.constants.GEND_MASCULINE_FEMININE, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE])
      .map(this.constructor.constants.GEND_MASCULINE_FEMININE_NEUTER, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, Constants.GEND_NEUTER])
    this.typeFeatures.get(Feature.types.tense).getImporter()
      .map('future_perfect', [Constants.TENSE_FUTURE_PERFECT])
  }

  static get languageID () {
    return Constants.LANG_GREEK
  }

  static get constants () {
    // TODO: Shall we move it to constants in data models?
    return {
      GEND_MASCULINE_FEMININE: 'masculine feminine',
      GEND_MASCULINE_FEMININE_NEUTER: 'masculine feminine neuter'
    }
  }

  // For noun and adjectives
  addSuffixes (partOfSpeech, data, pofsFootnotes) {
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
    const noSuffixValue = '-'
    let footnotes = []

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let suffixValue = item[n.suffix]
      // Handle special suffix values
      if (suffixValue === noSuffixValue) {
        suffixValue = null
      }

      let primary = false
      const features = [partOfSpeech,
        this.typeFeatures.get(Feature.types.number).createFromImporter(item[n.number]),
        this.typeFeatures.get(Feature.types.grmCase).createFromImporter(item[n.grmCase]),
        this.typeFeatures.get(Feature.types.declension).createFromImporter(item[n.declension]),
        this.typeFeatures.get(Feature.types.gender).createFromImporter(item[n.gender]),
        this.typeFeatures.get(Feature.types.type).createFromImporter(item[n.type])]
      if (item[n.primary] === 'primary') {
        primary = true
      }
      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        const indexes = item[n.footnote].split(' ')
        features.push(this.typeFeatures.get(Feature.types.footnote).createFeatures(indexes))
        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }

      let extendedGreekData = new ExtendedGreekData() // eslint-disable-line prefer-const
      extendedGreekData.primary = primary
      const extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }

      this.addInflectionData(partOfSpeech.value, Suffix, suffixValue, features, footnotes, extendedLangData)
    }
  }

  addArticleForms (partOfSpeech, data) {
    // An order of columns in a data CSV file
    const n = {
      form: 0,
      number: 1,
      grmCase: 2,
      gender: 3,
      type: 4,
      primary: 5
    }

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      const formValue = item[n.form]

      let primary = false
      const features = [partOfSpeech,
        this.typeFeatures.get(Feature.types.number).createFromImporter(item[n.number]),
        this.typeFeatures.get(Feature.types.grmCase).createFromImporter(item[n.grmCase]),
        this.typeFeatures.get(Feature.types.gender).createFromImporter(item[n.gender]),
        this.typeFeatures.get(Feature.types.type).createFromImporter(item[n.type])]
      if (item[n.primary] === 'primary') {
        primary = true
      }

      let extendedGreekData = new ExtendedGreekData() // eslint-disable-line prefer-const
      extendedGreekData.primary = primary
      const extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }

      this.addInflectionData(partOfSpeech.value, Form, formValue, features, [], extendedLangData)
    }
  }

  // For numerals
  addNumeralForms (partOfSpeech, data, pofsFootnotes) {
    // An order of columns in a data CSV file
    // this.numeralGroupingLemmas = ['εἱς - μία - ἑν (1)', 'δύο (2)', 'τρεῖς - τρία (3)', 'τέτταρες - τέτταρα (4)']
    this.numeralGroupingLemmas = []

    const n = {
      form: 0,
      hdwd: 1,
      number: 2,
      grmCase: 3,
      gender: 4,
      type: 5,
      primary: 6,
      footnote: 7
    }
    let footnotes = []

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      const form = item[n.form]

      let features = [ // eslint-disable-line prefer-const
        partOfSpeech,
        this.typeFeatures.get(Feature.types.fullForm).createFromImporter(form)
      ]

      if (item[n.hdwd]) {
        features.push(this.typeFeatures.get(Feature.types.hdwd).createFromImporter(item[n.hdwd]))

        if (this.numeralGroupingLemmas.indexOf(item[n.hdwd]) === -1) { this.numeralGroupingLemmas.push(item[n.hdwd]) }
      }

      if (item[n.number]) { features.push(this.typeFeatures.get(Feature.types.number).createFromImporter(item[n.number])) }
      if (item[n.grmCase]) { features.push(this.typeFeatures.get(Feature.types.grmCase).createFromImporter(item[n.grmCase])) }
      if (item[n.gender]) { features.push(this.typeFeatures.get(Feature.types.gender).createFromImporter(item[n.gender])) }
      if (item[n.type]) { features.push(this.typeFeatures.get(Feature.types.type).createFromImporter(item[n.type])) }

      const primary = (item[n.primary] === 'primary')

      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        const indexes = item[n.footnote].split(' ')
        features.push(this.typeFeatures.get(Feature.types.footnote).createFeatures(indexes))
        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }

      let extendedGreekData = new ExtendedGreekData() // eslint-disable-line prefer-const
      extendedGreekData.primary = primary
      const extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }

      this.numeralGroupingLemmas.sort((a, b) => {
        const aN = parseInt(a.match(/[0-9]+/g)[0])
        const bN = parseInt(b.match(/[0-9]+/g)[0])
        return aN - bN
      })

      this.addInflectionData(partOfSpeech.value, Form, form, features, footnotes, extendedLangData)
    }
  }

  // For pronoun
  addPronounForms (partOfSpeech, data, pofsFootnotes) {
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
    let footnotes = []

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      const form = item[n.form]

      let features = [ // eslint-disable-line prefer-const
        partOfSpeech,
        this.typeFeatures.get(Feature.types.fullForm).createFromImporter(form)
      ]

      if (item[n.hdwd]) {
        features.push(this.typeFeatures.get(Feature.types.hdwd).createFromImporter(item[n.hdwd]))
      }
      if (item[n.grmClass]) { features.push(this.typeFeatures.get(Feature.types.grmClass).createFromImporter(item[n.grmClass])) }
      if (item[n.person]) { features.push(this.typeFeatures.get(Feature.types.person).createFromImporter(item[n.person])) }
      if (item[n.number]) { features.push(this.typeFeatures.get(Feature.types.number).createFromImporter(item[n.number])) }
      if (item[n.grmCase]) { features.push(this.typeFeatures.get(Feature.types.grmCase).createFromImporter(item[n.grmCase])) }
      if (item[n.gender]) { features.push(this.typeFeatures.get(Feature.types.gender).createFromImporter(item[n.gender])) }
      if (item[n.type]) { features.push(this.typeFeatures.get(Feature.types.type).createFromImporter(item[n.type])) }

      const primary = (item[n.primary] === 'primary')

      // Dialects could have multiple values
      const dialects = item[n.dialect].split(',')
      if (item[n.dialect] && dialects && dialects.length > 0) {
        features.push(this.typeFeatures.get(Feature.types.dialect).createFeatures(dialects))
      }

      // Footnotes. There can be multiple footnote indexes separated by commas
      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        const indexes = item[n.footnote].split(' ')
        features.push(this.typeFeatures.get(Feature.types.footnote).createFeatures(indexes))
        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }

      let extendedGreekData = new ExtendedGreekData() // eslint-disable-line prefer-const
      extendedGreekData.primary = primary
      const extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }
      this.addInflectionData(partOfSpeech.value, Form, form, features, footnotes, extendedLangData)
    }
  }

  addFootnotes (partOfSpeech, classType, data) {
    let footnotes = [] // eslint-disable-line prefer-const
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const footnote = this.addFootnote(partOfSpeech.value, classType, data[i][0], data[i][1])
      footnotes.push(footnote)
    }
    return footnotes
  }

  loadData () {
    let partOfSpeech
    let suffixes
    let forms
    let pofsFootnotes
    let footnotes

    // Nouns
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    pofsFootnotes = papaparse.parse(nounFootnotesCSV, { skipEmptyLines: true })
    footnotes = this.addFootnotes(partOfSpeech, Suffix, pofsFootnotes.data)
    suffixes = papaparse.parse(nounSuffixesCSV, { skipEmptyLines: true })
    this.addSuffixes(partOfSpeech, suffixes.data, footnotes)

    // Adjective
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    pofsFootnotes = papaparse.parse(adjectiveFootnotesCSV, { skipEmptyLines: true })
    footnotes = this.addFootnotes(partOfSpeech, Suffix, pofsFootnotes.data)
    suffixes = papaparse.parse(adjectiveSuffixesCSV, { skipEmptyLines: true })
    this.addSuffixes(partOfSpeech, suffixes.data, footnotes)

    // Articles
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ARTICLE)
    forms = papaparse.parse(articleFormsCSV, { skipEmptyLines: true })
    this.addArticleForms(partOfSpeech, forms.data)

    // Pronouns
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    pofsFootnotes = papaparse.parse(pronounFootnotesCSV, { skipEmptyLines: true })
    footnotes = this.addFootnotes(partOfSpeech, Form, pofsFootnotes.data)
    forms = papaparse.parse(pronounFormsCSV, { skipEmptyLines: true })
    this.addPronounForms(partOfSpeech, forms.data, footnotes)

    // Numerals
    partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NUMERAL)
    pofsFootnotes = papaparse.parse(numeralFootnotesCSV, { skipEmptyLines: true })
    footnotes = this.addFootnotes(partOfSpeech, Form, pofsFootnotes.data)
    forms = papaparse.parse(numeralFormsCSV, { skipEmptyLines: true })
    this.addNumeralForms(partOfSpeech, forms.data, footnotes)

    this.dataLoaded = true
    return this
  }

  isIrregular (inflection) {
    // All pronouns are irregular right now
    return inflection[Feature.types.part].value === Constants.POFS_PRONOUN
  }

  /**
   * Returns an array of lemmas that are used to group values within inflection tables,
   * such as for demonstrative pronouns
   * @param {string} grammarClass - A name of a pronoun class
   * @return {string[]} An array of lemma values
   */
  getPronounGroupingLemmas (grammarClass) {
    return this.pronounGroupingLemmas.has(grammarClass) ? this.pronounGroupingLemmas.get(grammarClass) : []
  }

  getPronounGroupingLemmaFeatures (grammarClass) {
    return this.getPronounGroupingLemmas(grammarClass).map(lemma => new Feature(Feature.types.hdwd, lemma, GreekLanguageDataset.languageID))
  }

  getNumeralGroupingLemmas () {
    return this.numeralGroupingLemmas
  }

  getNumeralGroupingLemmaFeatures () {
    return this.numeralGroupingLemmas.map(lemma => new Feature(Feature.types.hdwd, lemma, GreekLanguageDataset.languageID))
  }

  static getObligatoryMatchList (inflection) {
    if (inflection.hasFeatureValue(Feature.types.part, Constants.POFS_PRONOUN)) {
      // If it is a pronoun, it must match a grammatical class
      return [Feature.types.part, Feature.types.grmClass]
    } else if ([Constants.POFS_NUMERAL, Constants.POFS_ARTICLE].includes(inflection[Feature.types.part].value)) {
      // If it is a numeral, it must match a part of speach
      return [Feature.types.part]
    } else if (inflection.constraints.fullFormBased) {
      // Not a pronoun, but the other form-based word
      return [Feature.types.part, Feature.types.fullForm]
    } else {
      // Default value for suffix matching
      return [Feature.types.part]
    }
  }

  static getOptionalMatchList (inflection) {
    let featureOptions = []

    if ([Constants.POFS_PRONOUN, Constants.POFS_NUMERAL, Constants.POFS_ARTICLE].includes(inflection[Feature.types.part].value)) {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.gender,
        Feature.types.number
      ]
    } else if (inflection.hasFeatureValue(Feature.types.part, Constants.POFS_ADJECTIVE)) {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.declension
      ]
    } else {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.declension,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.voice,
        Feature.types.mood,
        Feature.types.tense,
        Feature.types.person
      ]
    }

    return featureOptions.filter(f => inflection[f])
  }

  /**
   * Returns a list of features that should be the same for the morphology match.
   * @param {Inflection} inflection - An inflection for which a list needs to be built.
   * @return {string[]} An array of feature names.
   */
  static getMorphologyMatchList (inflection) {
    let featureOptions = []

    if ([Constants.POFS_PRONOUN, Constants.POFS_NUMERAL, Constants.POFS_ARTICLE].includes(inflection[Feature.types.part].value)) {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.person

      ]
    } else if (inflection.hasFeatureValue(Feature.types.part, Constants.POFS_ADJECTIVE)) {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.declension
      ]
    } else {
      featureOptions = [
        Feature.types.grmCase,
        Feature.types.declension,
        Feature.types.gender,
        Feature.types.number,
        Feature.types.voice,
        Feature.types.mood,
        Feature.types.tense,
        Feature.types.person
      ]
    }

    return featureOptions.filter(f => inflection[f])
  }
}
