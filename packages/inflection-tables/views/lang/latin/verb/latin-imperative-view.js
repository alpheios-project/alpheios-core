import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbMoodView from './latin-verb-mood-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'
import Table from '../../../lib/table'

export default class LatinImperativeView extends LatinVerbMoodView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.id = 'verbImperative'
    this.name = 'imperative'
    this.title = 'Imperative'
    this.features.moods = new GroupFeatureType(
      new Feature(Feature.types.mood, [Constants.MOOD_IMPERATIVE], this.constructor.model.languageID),
      'Mood')
    this.language_features[Feature.types.person] = new Feature(Feature.types.person, [Constants.ORD_2ND, Constants.ORD_3RD], this.constructor.model.languageID)
    this.features.persons = new GroupFeatureType(this.language_features[Feature.types.person], 'Person')
    this.language_features[Feature.types.tense] = new Feature(Feature.types.tense,
      [Constants.TENSE_PRESENT, Constants.TENSE_FUTURE], this.constructor.model.languageID)
    this.features.tenses = new GroupFeatureType(this.language_features[Feature.types.tense], 'Tense')
    this.createTable()
    this.table.morphemeCellFilter = LatinImperativeView.morphemeCellFilter
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.conjugation]]
    features.rows = [this.language_features[Feature.types.tense], this.language_features[Feature.types.number], this.language_features[Feature.types.person]]
    features.columnRowTitles = [this.language_features[Feature.types.number], this.language_features[Feature.types.person]]
    features.fullWidthRowTitles = [this.language_features[Feature.types.tense]]
  }

  static get viewID () {
    return 'latin_imperative_view'
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param homonym
   * @return {boolean}
   */
  static matchFilter (homonym) {
    return (this.languageID === homonym.languageID &&
      homonym.inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech) &&
      this.enabledForLexemes(homonym.lexemes))
  }

  static enabledForLexemes (lexemes) {
    // default is true
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection[Feature.types.mood] &&
          inflection[Feature.types.mood].values.includes(Constants.MOOD_IMPERATIVE)) {
          return true
        }
      }
    }
    return false
  }

  static morphemeCellFilter (suffix) {
    return suffix.features[Feature.types.mood].values.includes(Constants.MOOD_IMPERATIVE)
  }
}
