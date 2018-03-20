/*
 * Latin language data module
 */
import { Constants, LatinLanguageModel, Feature, FeatureImporter } from 'alpheios-data-models'
import LanguageDataset from '../../../lib/language-dataset.js'
import Suffix from '../../../lib/suffix.js'
import Form from '../../../lib/form.js'
import nounSuffixesCSV from './data/noun/suffixes.csv'
import nounFootnotesCSV from './data/noun/footnotes.csv'
import pronounFormsCSV from './data/pronoun/forms.csv'
import pronounFootnotesCSV from './data/pronoun/footnotes.csv'
import adjectiveSuffixesCSV from './data/adjective/suffixes.csv'
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv'
import verbSuffixesCSV from './data/verb/suffixes.csv'
import verbFootnotesCSV from './data/verb/footnotes.csv'
import verbFormsCSV from './data/verb/forms.csv'
import verbFormFootnotesCSV from './data/verb/form_footnotes.csv'
import verbParticipleSuffixesCSV from './data/participle/suffixes.csv'
import verbSupineSuffixesCSV from './data/supine/suffixes.csv'
import papaparse from 'papaparse'

/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
export default class LatinLanguageDataset extends LanguageDataset {
  constructor () {
    super(LatinLanguageDataset.languageID)

    this.features = this.model.typeFeatures
    this.features.set(Feature.types.footnote, new Feature(Feature.types.footnote, [], LatinLanguageDataset.languageID))
    this.features.set(Feature.types.word, new Feature(Feature.types.word, [], LatinLanguageDataset.languageID))

    // Create an importer with default values for every feature
    for (let feature of this.features.values()) {
      feature.addImporter(new FeatureImporter(feature.values, true))
    }

    // Create importer mapping for special language-specific values
    this.features.get(Feature.types.declension).getImporter()
      .map('1st 2nd', LatinLanguageModel.typeFeature(Feature.types.declension)
        .createFeatures([Constants.ORD_1ST, Constants.ORD_2ND]))
    this.features.get(Feature.types.gender).getImporter()
      .map('masculine feminine', LatinLanguageModel.typeFeature(Feature.types.declension)
        .createFeatures([Constants.GEND_MASCULINE, Constants.GEND_FEMININE]))

    this.features.get(Feature.types.tense).getImporter()
      .map('future_perfect', LatinLanguageModel.typeFeature(Feature.types.tense).createFeature(Constants.TENSE_FUTURE_PERFECT))
  }

  static get languageID () {
    return Constants.LANG_LATIN
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
      footnote: 6
    }
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let suffix = item[n.suffix]
      // Handle special suffix values
      if (suffix === noSuffixValue) {
        suffix = null
      }

      let features = [partOfSpeech,
        this.features.get(Feature.types.number).createFromImporter(item[n.number]),
        this.features.get(Feature.types.grmCase).createFromImporter(item[n.grmCase]),
        this.features.get(Feature.types.declension).createFromImporter(item[n.declension]),
        this.features.get(Feature.types.gender).createFromImporter(item[n.gender]),
        this.features.get(Feature.types.type).createFromImporter(item[n.type])]
      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = item[n.footnote].split(' ')
        features.push(this.features.get(Feature.types.footnote).createFeatures(indexes))
      }
      this.addInflection(partOfSpeech.value, Suffix, suffix, features)
    }
  }

  // For pronouns
  addPronounForms (partOfSpeech, data) {
    const n = {
      formSet: 0,
      headword: 1,
      grmClass: 2,
      person: 3,
      number: 4,
      case: 5,
      type: 6,
      form: 7,
      footnote: 8
    }

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let features = [partOfSpeech]
      //    if (item[n.formSet]) {
      //      features.push(languageModel.features[Feature.types.formSet]createFromImporter(item[0]))
      //    }
      // TODO read a headword into a principalPars array
      //  if (item[n.headword]) { }
      if (item[n.grmClass]) {
        features.push(this.features.get(Feature.types.grmClass).createFromImporter(item[n.grmClass]))
      }
      if (item[n.person]) {
        features.push(this.features.get(Feature.types.person).createFromImporter(item[n.person]))
      }
      if (item[n.number]) {
        features.push(this.features.get(Feature.types.number).createFromImporter(item[n.number]))
      }
      if (item[n.case]) {
        features.push(this.features.get(Feature.types.case).createFromImporter(item[n.case]))
      }
      if (item[n.type]) {
        features.push(this.features.get(Feature.types.type).createFromImporter(item[n.type]))
      }
      let form = item[n.form] ? item[n.form] : ''

      // Footnotes
      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = item[n.footnote].split(' ')
        features.push(this.features.get(Feature.types.footnote).createFeatures(indexes))
      }
      this.addInflection(partOfSpeech.value, Form, form, features)
    }
  }

  // For verbs
  addVerbSuffixes (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let suffix = item[0]
      // Handle special suffix values
      if (suffix === noSuffixValue) {
        suffix = null
      }

      let features = [partOfSpeech]
      let columns = [
        Feature.types.conjugation,
        Feature.types.voice,
        Feature.types.mood,
        Feature.types.tense,
        Feature.types.number,
        Feature.types.person,
        Feature.types.case,
        Feature.types.type
      ]
      columns.forEach((c, j) => {
        try {
          features.push(this.features.get(c).createFromImporter(item[j + 1]))
        } catch (e) {
          // ignore empty or non-parsable values
        }
      })

      let grammartype = item[7]
      // Type information can be empty if no ending is provided
      if (grammartype) {
        features.push(this.features.get(Feature.types.type).createFromImporter(grammartype))
      }
      // Footnotes
      if (item[9]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = item[9].split(' ')
        features.push(this.features.get(Feature.types.footnote).createFeatures(indexes))
      }
      this.addInflection(partOfSpeech.value, Suffix, suffix, features)
    }
  }

  addVerbParticipleSuffixes (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let suffix = item[0]
      // Handle special suffix values
      if (suffix === noSuffixValue) {
        suffix = null
      }

      let features = [partOfSpeech]
      let columns = [
        Feature.types.conjugation,
        Feature.types.voice,
        Feature.types.mood,
        Feature.types.tense,
        Feature.types.number,
        Feature.types.person,
        Feature.types.case,
        Feature.types.type
      ]
      columns.forEach((c, j) => {
        try {
          features.push(this.features.get(c).createFromImporter(item[j + 1]))
        } catch (e) {
          // ignore empty or non-parsable values
        }
      })

      let grammartype = item[7]
      // Type information can be empty if no ending is provided
      if (grammartype) {
        features.push(this.features.get(Feature.types.type).createFromImporter(grammartype))
      }
      this.addInflection(partOfSpeech.value, Suffix, suffix, features)
    }
  }

  addVerbSupineSuffixes (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let suffix = item[0]
      // Handle special suffix values
      if (suffix === noSuffixValue) {
        suffix = null
      }

      let features = [partOfSpeech]
      let columns = [
        Feature.types.conjugation,
        Feature.types.voice,
        Feature.types.mood,
        Feature.types.tense,
        Feature.types.number,
        Feature.types.person,
        Feature.types.case,
        Feature.types.type
      ]
      columns.forEach((c, j) => {
        try {
          features.push(this.features.get(c).createFromImporter(item[j + 1]))
        } catch (e) {
          // ignore empty or non-parsable values
        }
      })

      let grammartype = item[7]
      // Type information can be empty if no ending is provided
      if (grammartype) {
        features.push(this.features.get(Feature.types.type).createFromImporter(grammartype))
      }
      this.addInflection(partOfSpeech.value, Suffix, suffix, features)
    }
  }

  // for Lemmas
  addVerbForms (partOfSpeech, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let lemma = item[0]
      // let principalParts = item[1].split(/_/)
      let form = item[2]

      // Lemma,PrincipalParts,Form,Voice,Mood,Tense,Number,Person,Footnote
      let features = [
        partOfSpeech,
        this.features.get(Feature.types.word).createFromImporter(lemma)
      ]
      if (item[3]) {
        features.push(this.features.get(Feature.types.voice).createFromImporter(item[3]))
      }
      if (item[4]) {
        features.push(this.features.get(Feature.types.mood).createFromImporter(item[4]))
      }
      if (item[5]) {
        features.push(this.features.get(Feature.types.tense).createFromImporter(item[5]))
      }
      if (item[6]) {
        features.push(this.features.get(Feature.types.number).createFromImporter(item[6]))
      }
      if (item[7]) {
        features.push(this.features.get(Feature.types.person).createFromImporter(item[7]))
      }

      // Footnotes
      if (item[8]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = item[8].split(' ')
        features.push(this.features.get(Feature.types.footnote).createFeatures(indexes))
      }
      this.addInflection(partOfSpeech.value, Form, form, features)
    }
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
    let footnotes

    // Nouns
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    suffixes = papaparse.parse(nounSuffixesCSV, {})
    this.addSuffixes(partOfSpeech, suffixes.data)
    footnotes = papaparse.parse(nounFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    // Pronouns
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    forms = papaparse.parse(pronounFormsCSV, {})
    this.addPronounForms(partOfSpeech, forms.data)
    footnotes = papaparse.parse(pronounFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Form, footnotes.data)

    // Adjectives
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    suffixes = papaparse.parse(adjectiveSuffixesCSV, {})
    this.addSuffixes(partOfSpeech, suffixes.data)
    footnotes = papaparse.parse(adjectiveFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    // Verbs
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    suffixes = papaparse.parse(verbSuffixesCSV, {})
    this.addVerbSuffixes(partOfSpeech, suffixes.data)
    footnotes = papaparse.parse(verbFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Suffix, footnotes.data)
    forms = papaparse.parse(verbFormsCSV, {})
    this.addVerbForms(partOfSpeech, forms.data)
    footnotes = papaparse.parse(verbFormFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Form, footnotes.data)

    // Verb Participles
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_VERB_PARTICIPLE)
    suffixes = papaparse.parse(verbParticipleSuffixesCSV, {})
    this.addVerbParticipleSuffixes(partOfSpeech, suffixes.data)

    // Verb Supine
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_SUPINE)
    suffixes = papaparse.parse(verbSupineSuffixesCSV, {})
    this.addVerbSupineSuffixes(partOfSpeech, suffixes.data)

    this.dataLoaded = true
    return this
  }

  getObligatoryMatches (inflection) {
    let obligatoryMatches = []
    if (inflection.constraints.fullFormBased) {
      obligatoryMatches.push(Feature.types.word)
    } else {
      // Default value for suffix matching
      obligatoryMatches.push(Feature.types.part)
    }
    return obligatoryMatches
  }

  getOptionalMatches (inflection) {
    const featureOptions = [
      Feature.types.grmCase,
      Feature.types.declension,
      Feature.types.gender,
      Feature.types.number,
      Feature.types.voice,
      Feature.types.mood,
      Feature.types.tense,
      Feature.types.person
    ]
    return featureOptions.filter(f => inflection[f])
  }
}
