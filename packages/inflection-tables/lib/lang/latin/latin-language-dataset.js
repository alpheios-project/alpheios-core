/*
 * Latin language data module
 */
import {Constants, LatinLanguageModel, Feature, FeatureType} from 'alpheios-data-models'
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
let types = Feature.types

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv'
LatinLanguageModel.getFeatureType(types.declension).addImporter(importerName)
  .map('1st 2nd',
    [ LatinLanguageModel.getFeatureType(types.declension)[Constants.ORD_1ST],
      LatinLanguageModel.getFeatureType(types.declension)[Constants.ORD_2ND]
    ])
LatinLanguageModel.getFeatureType(types.gender).addImporter(importerName)
  .map('masculine feminine',
    [ LatinLanguageModel.getFeatureType(types.gender)[Constants.GEND_MASCULINE],
      LatinLanguageModel.getFeatureType(types.gender)[Constants.GEND_FEMININE]
    ])
LatinLanguageModel.getFeatureType(types.tense).addImporter(importerName)
  .map('future_perfect', LatinLanguageModel.getFeatureType(types.tense)[Constants.TENSE_FUTURE_PERFECT])
const footnotes = new FeatureType(types.footnote, [], Constants.LANG_LATIN)

// endregion Definition of grammatical features

export default class LatinLanguageDataset extends LanguageDataset {
  constructor () {
    super(LatinLanguageDataset.languageID)
  }

  static get languageID () {
    return Constants.LANG_LATIN
  }

  // For noun and adjectives
  addSuffixes (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let suffix = data[i][0]
      // Handle special suffix values
      if (suffix === noSuffixValue) {
        suffix = null
      }

      let features = [partOfSpeech,
        this.model.getFeatureType(types.number).getFromImporter('csv', data[i][1]),
        this.model.getFeatureType(types.grmCase).getFromImporter('csv', data[i][2]),
        this.model.getFeatureType(types.declension).getFromImporter('csv', data[i][3]),
        this.model.getFeatureType(types.gender).getFromImporter('csv', data[i][4]),
        this.model.getFeatureType(types.type).getFromImporter('csv', data[i][5])]
      if (data[i][6]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = data[i][6].split(' ').map(function (index) {
          return footnotes.get(index)
        })
        features.push(...indexes)
      }
      this.addInflection(partOfSpeech.value, Suffix, suffix, features)
    }
  }

  // For pronouns
  addPronounForms (partOfSpeech, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let features = [partOfSpeech]
      //    if (data[i][0]) {
      //      features.push(languageModel.features[types.formSet].getFromImporter('csv', data[i][0]))
      //    }
      // TODO read a headword into a principalPars array
      //  if (data[i][1]) { }
      if (data[i][2]) {
        features.push(this.model.getFeatureType(types.grmClass).getFromImporter('csv', data[i][2]))
      }
      if (data[i][3]) {
        features.push(this.model.getFeatureType(types.person).getFromImporter('csv', data[i][3]))
      }
      if (data[i][4]) {
        features.push(this.model.getFeatureType(types.number).getFromImporter('csv', data[i][4]))
      }
      if (data[i][5]) {
        features.push(this.model.getFeatureType(types.case).getFromImporter('csv', data[i][5]))
      }
      if (data[i][6]) {
        features.push(this.model.getFeatureType(types.type).getFromImporter('csv', data[i][6]))
      }
      let form = data[i][7] ? data[i][7] : ''

      // Footnotes
      if (data[i][8]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = data[i][8].split(' ').map(function (index) {
          return footnotes.get(index)
        })
        features.push(...indexes)
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
      let suffix = data[i][0]
      // Handle special suffix values
      if (suffix === noSuffixValue) {
        suffix = null
      }

      let features = [partOfSpeech]
      let columns = [types.conjugation, types.voice, types.mood, types.tense, types.number, types.person, types.case, types.type]
      columns.forEach((c, j) => {
        try {
          features.push(this.model.getFeatureType(c).getFromImporter('csv', data[i][j + 1]))
        } catch (e) {
          // ignore empty or non-parsable values
        }
      })

      let grammartype = data[i][7]
      // Type information can be empty if no ending is provided
      if (grammartype) {
        features.push(this.model.getFeatureType(types.type).getFromImporter('csv', grammartype))
      }
      // Footnotes
      if (data[i][9]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = data[i][9].split(' ').map(function (index) {
          return footnotes.get(index)
        })
        features.push(...indexes)
      }
      this.addInflection(partOfSpeech.value, Suffix, suffix, features)
    }
  }

  addVerbParticipleSuffixes (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let suffix = data[i][0]
      // Handle special suffix values
      if (suffix === noSuffixValue) {
        suffix = null
      }

      let features = [partOfSpeech]
      let columns = [types.conjugation, types.voice, types.mood, types.tense, types.number, types.person, types.case, types.type]
      columns.forEach((c, j) => {
        try {
          features.push(this.model.getFeatureType(c).getFromImporter('csv', data[i][j + 1]))
        } catch (e) {
          // ignore empty or non-parsable values
        }
      })

      let grammartype = data[i][7]
      // Type information can be empty if no ending is provided
      if (grammartype) {
        features.push(this.model.getFeatureType(types.type).getFromImporter('csv', grammartype))
      }
      this.addInflection(partOfSpeech.value, Suffix, suffix, features)
    }
  }

  addVerbSupineSuffixes (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let suffix = data[i][0]
      // Handle special suffix values
      if (suffix === noSuffixValue) {
        suffix = null
      }

      let features = [partOfSpeech]
      let columns = [types.conjugation, types.voice, types.mood, types.tense, types.number, types.person, types.case, types.type]
      columns.forEach((c, j) => {
        try {
          features.push(this.model.getFeatureType(c).getFromImporter('csv', data[i][j + 1]))
        } catch (e) {
          // ignore empty or non-parsable values
        }
      })

      let grammartype = data[i][7]
      // Type information can be empty if no ending is provided
      if (grammartype) {
        features.push(this.model.getFeatureType(types.type).getFromImporter('csv', grammartype))
      }
      this.addInflection(partOfSpeech.value, Suffix, suffix, features)
    }
  }

  // for Lemmas
  addVerbForms (partOfSpeech, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let lemma = data[i][0]
      // let principalParts = data[i][1].split(/_/)
      let form = data[i][2]

      // Lemma,PrincipalParts,Form,Voice,Mood,Tense,Number,Person,Footnote
      let features = [partOfSpeech,
        new FeatureType(types.word, [FeatureType.UNRESTRICTED_VALUE], this.languageID).getFromImporter('csv', lemma)]
      if (data[i][3]) {
        features.push(this.model.getFeatureType(types.voice).getFromImporter('csv', data[i][3]))
      }
      if (data[i][4]) {
        features.push(this.model.getFeatureType(types.mood).getFromImporter('csv', data[i][4]))
      }
      if (data[i][5]) {
        features.push(this.model.getFeatureType(types.tense).getFromImporter('csv', data[i][5]))
      }
      if (data[i][6]) {
        features.push(this.model.getFeatureType(types.number).getFromImporter('csv', data[i][6]))
      }
      if (data[i][7]) {
        features.push(this.model.getFeatureType(types.person).getFromImporter('csv', data[i][7]))
      }

      // Footnotes
      if (data[i][8]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = data[i][8].split(' ').map(function (index) {
          return footnotes.get(index)
        })
        features.push(...indexes)
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
    partOfSpeech = this.model.getFeatureType(types.part)[Constants.POFS_NOUN]
    suffixes = papaparse.parse(nounSuffixesCSV, {})
    this.addSuffixes(partOfSpeech, suffixes.data)
    footnotes = papaparse.parse(nounFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    // Pronouns
    partOfSpeech = this.model.getFeatureType(types.part)[Constants.POFS_PRONOUN]
    forms = papaparse.parse(pronounFormsCSV, {})
    this.addPronounForms(partOfSpeech, forms.data)
    footnotes = papaparse.parse(pronounFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Form, footnotes.data)

    // Adjectives
    partOfSpeech = this.model.getFeatureType(types.part)[Constants.POFS_ADJECTIVE]
    suffixes = papaparse.parse(adjectiveSuffixesCSV, {})
    this.addSuffixes(partOfSpeech, suffixes.data)
    footnotes = papaparse.parse(adjectiveFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    // Verbs
    partOfSpeech = this.model.getFeatureType(types.part)[Constants.POFS_VERB]
    suffixes = papaparse.parse(verbSuffixesCSV, {})
    this.addVerbSuffixes(partOfSpeech, suffixes.data)
    footnotes = papaparse.parse(verbFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Suffix, footnotes.data)
    forms = papaparse.parse(verbFormsCSV, {})
    this.addVerbForms(partOfSpeech, forms.data)
    footnotes = papaparse.parse(verbFormFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Form, footnotes.data)

    // Verb Participles
    partOfSpeech = this.model.getFeatureType(types.part)[Constants.POFS_VERB_PARTICIPLE]
    suffixes = papaparse.parse(verbParticipleSuffixesCSV, {})
    this.addVerbParticipleSuffixes(partOfSpeech, suffixes.data)

    // Verb Supine
    partOfSpeech = this.model.getFeatureType(types.part)[Constants.POFS_SUPINE]
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
      types.grmCase,
      types.declension,
      types.gender,
      types.number,
      types.voice,
      types.mood,
      types.tense,
      types.person
    ]
    return featureOptions.filter(f => inflection[f])
  }
}
