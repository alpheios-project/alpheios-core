/*
 * Latin language data module
 */
import { Constants, Feature, FeatureImporter, Lemma } from 'alpheios-data-models'
import LanguageDataset from '@lib/language-dataset.js'
import Suffix from '@lib/suffix.js'
import Form from '@lib/form.js'
// import ComparisonFeature from '@lib/comparison-feature.js'
import nounSuffixesCSV from '@lib/lang/latin/data/noun/suffixes.csv'
import nounFootnotesCSV from '@lib/lang/latin/data/noun/footnotes.csv'
import pronounFormsCSV from '@lib/lang/latin/data/pronoun/forms.csv'
import pronounFootnotesCSV from '@lib/lang/latin/data/pronoun/footnotes.csv'
import adjectiveSuffixesCSV from '@lib/lang/latin/data/adjective/suffixes.csv'
import adjectiveFootnotesCSV from '@lib/lang/latin/data/adjective/footnotes.csv'
import verbSuffixesCSV from '@lib/lang/latin/data/verb/suffixes.csv'
import verbFootnotesCSV from '@lib/lang/latin/data/verb/footnotes.csv'
import verbFormsCSV from '@lib/lang/latin/data/verb/forms.csv'
import verbFormFootnotesCSV from '@lib/lang/latin/data/verb/form_footnotes.csv'
import verbParticipleSuffixesCSV from '@lib/lang/latin/data/participle/suffixes.csv'
import verbParticipleFormsCSV from '@lib/lang/latin/data/participle/forms.csv'
import verbParticipleFormFootnotesCSV from '@lib/lang/latin/data/participle/form_footnotes.csv'
import verbSupineSuffixesCSV from '@lib/lang/latin/data/supine/suffixes.csv'
import verbSupineFormsCSV from '@lib/lang/latin/data/supine/forms.csv'
import verbSupineFormFootnotesCSV from '@lib/lang/latin/data/supine/form_footnotes.csv'
import gerundiveFormsCSV from '@lib/lang/latin/data/gerundive/forms.csv'
import gerundiveFormFootnotesCSV from '@lib/lang/latin/data/gerundive/form_footnotes.csv'
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
    this.features.set(Feature.types.fullForm, new Feature(Feature.types.fullForm, [], LatinLanguageDataset.languageID))
    this.features.set(Feature.types.word, new Feature(Feature.types.word, [], LatinLanguageDataset.languageID))

    // Create an importer with default values for every feature
    for (let feature of this.features.values()) {
      feature.addImporter(new FeatureImporter(feature.values, true))
    }

    // Create importer mapping for special language-specific values
    this.features.get(Feature.types.declension).getImporter()
      .map(this.constructor.constants.ORD_1ST_2ND, [Constants.ORD_1ST, Constants.ORD_2ND])
    this.features.get(Feature.types.gender).getImporter()
      .map(this.constructor.constants.GEND_MASCULINE_FEMININE, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE])

    this.features.get(Feature.types.tense).getImporter()
      .map('future_perfect', Constants.TENSE_FUTURE_PERFECT)

    /**
     * Contains a list of irregular verb lemmas for which we have data.
     * @type {Array}
     */
    this.verbsIrregularLemmas = []
  }

  static get languageID () {
    return Constants.LANG_LATIN
  }

  static get constants () {
    return {
      ORD_1ST_2ND: '1st 2nd',
      GEND_MASCULINE_FEMININE: 'masculine feminine'
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
      footnote: 6
    }
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'
    let footnotes = []

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let suffix = item[n.suffix]
      // Handle special suffix values
      if (!suffix || suffix === noSuffixValue) {
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
        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }
      this.addInflectionData(partOfSpeech.value, Suffix, suffix, features, footnotes)
    }
  }

  // For pronouns
  addPronounForms (partOfSpeech, data, pofsFootnotes) {
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
    let footnotes = []

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
        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }
      this.addInflectionData(partOfSpeech.value, Form, form, features, footnotes)
    }
  }

  // For verbs
  addVerbSuffixes (partOfSpeech, data, pofsFootnotes) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'
    let footnotes = []

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let suffix = item[0]
      // Handle special suffix values
      if (!suffix || suffix === noSuffixValue) {
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
          if (item[j + 1]) {
            features.push(this.features.get(c).createFromImporter(item[j + 1]))
          }
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
        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }
      this.addInflectionData(partOfSpeech.value, Suffix, suffix, features, footnotes)
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
      if (!suffix || suffix === noSuffixValue) {
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
          if (item[j + 1]) {
            features.push(this.features.get(c).createFromImporter(item[j + 1]))
          }
        } catch (e) {
          // ignore empty or non-parsable values
        }
      })

      let grammartype = item[7]
      // Type information can be empty if no ending is provided
      if (grammartype) {
        features.push(this.features.get(Feature.types.type).createFromImporter(grammartype))
      }
      this.addInflectionData(partOfSpeech.value, Suffix, suffix, features)
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
      if (!suffix || suffix === noSuffixValue) {
        suffix = null
      }

      let features = [partOfSpeech]
      // Ending,Conjugation,Voice,Mood,Tense,Number,Person,Case,Type,Footnote
      let columns = [
        Feature.types.conjugation,
        Feature.types.case
      ]
      columns.forEach((c, j) => {
        try {
          if (item[j + 1]) {
            features.push(this.features.get(c).createFromImporter(item[j + 1]))
          }
        } catch (e) {
          // ignore empty or non-parsable values
        }
      })

      this.addInflectionData(partOfSpeech.value, Suffix, suffix, features)
    }
  }

  // For Lemmas of verbs, verb participles, gerundive, and supine
  addVerbForms (partOfSpeech, data, pofsFootnotes = []) {
    let footnotes = []
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const item = data[i]
      let hdwd = item[0]
      let principalParts = item[1].split(/_/)
      let lemma = new Lemma(hdwd, LatinLanguageDataset.languageID, principalParts)

      let form = item[2]

      // Lemma,PrincipalParts,Form,Voice,Mood,Tense,Number,Person,Footnote
      let features = [
        partOfSpeech/*,
        this.features.get(Feature.types.fullForm).createFromImporter(lemma.word) */
      ]

      if (hdwd && lemma) {
        // TODO: Shall we store it as `word` or as `hdwd`. Which one is more correct?
        features.push(this.features.get(Feature.types.word).createFromImporter(hdwd))
        if (this.verbsIrregularLemmas.filter(item => item.word === lemma.word).length === 0) {
          this.verbsIrregularLemmas.push(lemma)
        }
      }

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

        footnotes = pofsFootnotes.filter(f => indexes.includes(f.index))
      }
      this.addInflectionData(partOfSpeech.value, Form, form, features, footnotes)
    }
  }

  addFootnotes (partOfSpeech, classType, data) {
    let footnotes = []
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
    let footnotesData
    let footnotes

    // Nouns
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    footnotesData = papaparse.parse(nounFootnotesCSV, {skipEmptyLines: true})
    footnotes = this.addFootnotes(partOfSpeech, Suffix, footnotesData.data)
    suffixes = papaparse.parse(nounSuffixesCSV, {skipEmptyLines: true})
    this.addSuffixes(partOfSpeech, suffixes.data, footnotes)

    // Pronouns
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    footnotesData = papaparse.parse(pronounFootnotesCSV, {skipEmptyLines: true})
    footnotes = this.addFootnotes(partOfSpeech, Form, footnotesData.data)
    forms = papaparse.parse(pronounFormsCSV, {skipEmptyLines: true})
    this.addPronounForms(partOfSpeech, forms.data, footnotes)

    // Adjectives
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    footnotesData = papaparse.parse(adjectiveFootnotesCSV, {skipEmptyLines: true})
    footnotes = this.addFootnotes(partOfSpeech, Suffix, footnotesData.data)
    suffixes = papaparse.parse(adjectiveSuffixesCSV, {skipEmptyLines: true})
    this.addSuffixes(partOfSpeech, suffixes.data, footnotes)

    // Verbs
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    footnotesData = papaparse.parse(verbFootnotesCSV, {skipEmptyLines: true})
    footnotes = this.addFootnotes(partOfSpeech, Suffix, footnotesData.data)

    suffixes = papaparse.parse(verbSuffixesCSV, {skipEmptyLines: true})
    this.addVerbSuffixes(partOfSpeech, suffixes.data, footnotes)

    footnotesData = papaparse.parse(verbFormFootnotesCSV, {skipEmptyLines: true})
    footnotes = this.addFootnotes(partOfSpeech, Form, footnotesData.data)

    forms = papaparse.parse(verbFormsCSV, {skipEmptyLines: true})
    this.addVerbForms(partOfSpeech, forms.data, footnotes)

    // Verb Participles
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_VERB_PARTICIPLE)
    suffixes = papaparse.parse(verbParticipleSuffixesCSV, {skipEmptyLines: true})
    this.addVerbParticipleSuffixes(partOfSpeech, suffixes.data)

    footnotesData = papaparse.parse(verbParticipleFormFootnotesCSV, {skipEmptyLines: true})
    footnotes = this.addFootnotes(partOfSpeech, Form, footnotesData.data)
    forms = papaparse.parse(verbParticipleFormsCSV, {skipEmptyLines: true})
    this.addVerbForms(partOfSpeech, forms.data, footnotes)

    // Verb Supine
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_SUPINE)
    suffixes = papaparse.parse(verbSupineSuffixesCSV, {skipEmptyLines: true})
    this.addVerbSupineSuffixes(partOfSpeech, suffixes.data)

    footnotesData = papaparse.parse(verbSupineFormFootnotesCSV, {skipEmptyLines: true})
    footnotes = this.addFootnotes(partOfSpeech, Form, footnotesData.data)
    forms = papaparse.parse(verbSupineFormsCSV, {skipEmptyLines: true})
    this.addVerbForms(partOfSpeech, forms.data, footnotes)

    // Gerundive
    partOfSpeech = this.features.get(Feature.types.part).createFeature(Constants.POFS_GERUNDIVE)
    footnotesData = papaparse.parse(gerundiveFormFootnotesCSV, {skipEmptyLines: true})
    footnotes = this.addFootnotes(partOfSpeech, Form, footnotesData.data)
    forms = papaparse.parse(gerundiveFormsCSV, {skipEmptyLines: true})
    this.addVerbForms(partOfSpeech, forms.data, footnotes)

    this.dataLoaded = true
    return this
  }

  checkIrregularVerb (inflection) {
    if (
      inflection[Feature.types.part].value === Constants.POFS_VERB &&
      inflection[Feature.types.conjugation] &&
      inflection[Feature.types.conjugation].value === Constants.TYPE_IRREGULAR
    ) {
      // This is an irregular verb that was identified by a morphological analyzer
      return true
    } else if ([Constants.POFS_VERB, Constants.POFS_VERB_PARTICIPLE].includes(inflection[Feature.types.part].value) && inflection[Feature.types.word]) {
      return this.verbsIrregularLemmas.filter(item => item.word === inflection[Feature.types.word].value).length > 0
    }
    return false
  }

  /**
   * Checks whether we implemented (i.e. have word data) a particular word (stored in inflection.word).
   * Currently checks for unimplemented irregular verbs only.
   * @param {Inflection} inflection - An inflection we need to check
   * @return {boolean} - True if verb is implemented yet, false otherwise
   */
  isImplemented (inflection) {
    /*
    Identifies words that are not implemented. Currently those are irregular verbs that are not in our data CSV files.
     */
    return Boolean(
      !this.checkIrregularVerb(inflection) ||
      this.verbsIrregularLemmas.some(item => item.word === inflection[Feature.types.word].value)
    )
  }

  static getObligatoryMatchList (inflection) {
    if (inflection.constraints.irregularVerb) {
      return [Feature.types.fullForm, Feature.types.word]
    } else if (inflection.hasFeatureValue(Feature.types.part, Constants.POFS_VERB)) {
      return [Feature.types.part]
    } else if (inflection.constraints.fullFormBased) {
      return [Feature.types.fullForm]
    } else {
      // Default value for suffix matching
      return [Feature.types.part]
    }
  }

  static getOptionalMatchList (inflection) {
    const featureOptions = [
      Feature.types.grmCase,
      Feature.types.declension,
      Feature.types.gender,
      Feature.types.number,
      Feature.types.voice,
      Feature.types.mood,
      Feature.types.tense,
      Feature.types.person,
      Feature.types.conjugation
    ]

    if (inflection.constraints.irregularVerb) {
      return [
        Feature.types.mood,
        Feature.types.tense,
        Feature.types.number,
        Feature.types.person,
        Feature.types.voice,
        Feature.types.conjugation
      ]
    } else {
      return featureOptions.filter(f => inflection[f])
    }
  }
}
