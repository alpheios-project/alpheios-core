import { Constants, Feature, FeatureImporter, Lemma, LanguageModelFactory as LMF } from 'alpheios-data-models'
import Paradigm from '@/paradigm/lib/paradigm.js'
import GreekParadigmData from '@/paradigm/data/greek/greek-paradigm-data.js'

import InflectionSet from '@lib//inflection-set.js'

import papaparse from 'papaparse'
import LanguageDataset from '@lib/language-dataset.js'

export default class GreekParadigmDataset extends LanguageDataset {
  constructor () {
    super(GreekParadigmDataset.languageID)

    this.typeFeatures = this.model.typeFeatures
    this.typeFeatures.set(Feature.types.footnote, new Feature(Feature.types.footnote, [], GreekParadigmDataset.languageID))
    this.typeFeatures.set(Feature.types.dialect, new Feature(Feature.types.dialect, [], GreekParadigmDataset.languageID))

    // Create an importer with default values for every feature
    for (let feature of this.typeFeatures.values()) { // eslint-disable-line prefer-const
      feature.addImporter(new FeatureImporter(feature.values, true))
    }

    this.typeFeatures.get(Feature.types.tense).getImporter()
      .map('future_perfect', [Constants.TENSE_FUTURE_PERFECT])
  }

  static get languageID () {
    return Constants.LANG_GREEK
  }

  setVerbParadigmData (partOfSpeech, paradigms, rulesData, suppParadigmTables) {
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
      const item = rulesData[i]
      const id = item[n.id]
      const matchOrder = Number.parseInt(item[n.matchOrder])

      let features = [partOfSpeech] // eslint-disable-line prefer-const

      if (item[n.stemtype]) { features.push(this.typeFeatures.get(Feature.types.stemtype).createFromImporter(item[n.stemtype])) }
      if (item[n.voice]) { features.push(this.typeFeatures.get(Feature.types.voice).createFromImporter(item[n.voice])) }
      if (item[n.mood]) { features.push(this.typeFeatures.get(Feature.types.mood).createFromImporter(item[n.mood])) }
      if (item[n.tense]) { features.push(this.typeFeatures.get(Feature.types.tense).createFromImporter(item[n.tense])) }
      if (item[n.dialect]) { features.push(this.typeFeatures.get(Feature.types.dialect).createFromImporter(item[n.dialect])) }

      let lemma
      if (item[n.lemma]) {
        lemma = new Lemma(item[n.lemma], this.languageID)
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
    for (let paradigm of paradigms.values()) { // eslint-disable-line prefer-const
      paradigm.sortRules()
      paradigm.addSuppTables(suppParadigmTables)
    }

    return Array.from(paradigms.values())
  }

  setNounParadigmData (partOfSpeech, paradigms, rulesData) {
    // An order of columns in a data CSV file
    const n = {
      id: 0,
      matchOrder: 1,
      partOfSpeech: 2, // Ignored, an argument value will be used
      stemtype: 3,
      declension: 4,
      gender: 5,
      lemma: 6,
      morphFlags: 7,
      dialect: 8
    }

    // First row contains headers
    for (let i = 1; i < rulesData.length; i++) {
      const item = rulesData[i]
      const id = item[n.id]
      const matchOrder = Number.parseInt(item[n.matchOrder])

      let features = [partOfSpeech] // eslint-disable-line prefer-const

      if (item[n.stemtype]) { features.push(this.typeFeatures.get(Feature.types.stemtype).createFromImporter(item[n.stemtype])) }
      if (item[n.declension]) { features.push(this.typeFeatures.get(Feature.types.declension).createFromImporter(item[n.declension])) }
      if (item[n.gender]) { features.push(this.typeFeatures.get(Feature.types.gender).createFromImporter(item[n.gender])) }
      if (item[n.dialect]) { features.push(this.typeFeatures.get(Feature.types.dialect).createFromImporter(item[n.dialect])) }

      let lemma
      if (item[n.lemma]) {
        lemma = new Lemma(item[n.lemma], this.languageID)
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
    for (let paradigm of paradigms.values()) { // eslint-disable-line prefer-const
      paradigm.sortRules()
    }

    return Array.from(paradigms.values())
  }

  loadData () {
    this.loadVerbParadigmData()
    this.loadVerbParticipleParadigmData()
    this.loadNounParadigmData()
    this.loadAdjectiveParadigmData()

    this.dataLoaded = true
  }

  loadVerbParadigmData () {
    const verbParadigmTables = GreekParadigmData.verbParadigmTables
    const verbParticipleParadigmTables = GreekParadigmData.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    const partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    const paradigms = this.setVerbParadigmData(
      partOfSpeech, verbParadigmTables,
      papaparse.parse(GreekParadigmData.verbParadigmRules, { skipEmptyLines: true }).data, verbAndParticipleParadigmTables)

    this.addParadigms(partOfSpeech, paradigms)
    this.addFootnotes(partOfSpeech, Paradigm, papaparse.parse(GreekParadigmData.verbParadigmFootnotes, { skipEmptyLines: true }).data)
  }

  loadVerbParticipleParadigmData () {
    const verbParadigmTables = GreekParadigmData.verbParadigmTables
    const verbParticipleParadigmTables = GreekParadigmData.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])
    
    const partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB_PARTICIPLE)
    const paradigms = this.setVerbParadigmData(
      partOfSpeech, verbParticipleParadigmTables,
      papaparse.parse(GreekParadigmData.verbParticipleParadigmRules, { skipEmptyLines: true }).data, verbAndParticipleParadigmTables)
    
    this.addParadigms(partOfSpeech, paradigms)
  }

  loadNounParadigmData () {
    const nounParadigmTables = GreekParadigmData.nounParadigmTables
    
    const partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    const paradigms = this.setNounParadigmData(
      partOfSpeech, nounParadigmTables,
      papaparse.parse(GreekParadigmData.nounParadigmRules, { skipEmptyLines: true }).data, nounParadigmTables)
    
    this.addParadigms(partOfSpeech, paradigms)
  }

  loadAdjectiveParadigmData () {
    const adjectiveParadigmTables = GreekParadigmData.adjectiveParadigmTables
    
    const partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    const paradigms = this.setNounParadigmData(
      partOfSpeech, adjectiveParadigmTables,
      papaparse.parse(GreekParadigmData.adjectiveParadigmRules, { skipEmptyLines: true }).data, adjectiveParadigmTables)
    
    this.addParadigms(partOfSpeech, paradigms)
  }

  addParadigms (partOfSpeech, paradigms) {
    if (!this.pos.has(partOfSpeech.value)) {
      this.pos.set(partOfSpeech.value, new InflectionSet(partOfSpeech.value, this.languageID))
    }
    this.pos.get(partOfSpeech.value).addInflectionItems(paradigms)
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

  setBaseInflectionData (inflection, lemma) {
    inflection.lemma = lemma
    inflection.addFeature(new Feature(Feature.types.word, lemma.word, lemma.languageID))
    inflection.constraints.implemented = this.isImplemented(inflection)
  }

  setInflectionData (inflection, lemma) {
    let partOfSpeech = inflection[Feature.types.part].value
    if (this.pos.get(partOfSpeech)) {
      this.setBaseInflectionData(inflection, lemma)
      inflection.constraints.paradigmBased = this.pos.get(partOfSpeech).hasMatchingItems(Paradigm, inflection)
    }
    return inflection
  }

  createInflectionSet (pofsValue, inflections, options) {
    
    let inflectionSet = new InflectionSet(pofsValue, this.languageID) // eslint-disable-line prefer-const
    inflectionSet.inflections = inflections.filter(i => i.constraints.implemented === true)
    inflectionSet.isImplemented = inflectionSet.inflections.length > 0

    const sourceSet = this.pos.get(pofsValue)
    if (!sourceSet) {
      return inflectionSet
    }

    if (inflectionSet.isImplemented) {      
      const paradigmBased = inflections.some(i => i.constraints.paradigmBased)
      if (paradigmBased) {
        const paradigms = sourceSet.getMatchingItems(Paradigm, inflections)
        inflectionSet.addInflectionItems(paradigms)
      }

      this.createInflectionSetFootnote(inflectionSet, sourceSet)
    }
    return inflectionSet
  }


  static getParadigmStandardForm (partOfSpeech, paradigmID) {
    return pos.get(partOfSpeech).types.get(Paradigm).getByID(paradigmID)
  }
}