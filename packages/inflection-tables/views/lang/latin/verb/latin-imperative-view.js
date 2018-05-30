import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import LatinVerbMoodView from './latin-verb-mood-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'
import Table from '../../../lib/table'

export default class LatinImperativeView extends LatinVerbMoodView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'verbImperative'
    this.name = 'imperative'
    this.title = 'Imperative'
    this.features.moods = new GroupFeatureType(
      new Feature(Feature.types.mood, [Constants.MOOD_IMPERATIVE], this.model.languageID),
      'Mood')
    this.language_features[Feature.types.person] = new Feature(Feature.types.person, [Constants.ORD_2ND, Constants.ORD_3RD], this.model.languageID)
    this.features.persons = new GroupFeatureType(this.language_features[Feature.types.person], 'Person')
    this.language_features[Feature.types.tense] = new Feature(Feature.types.tense,
      [Constants.TENSE_PRESENT, Constants.TENSE_FUTURE], this.model.languageID)
    this.features.tenses = new GroupFeatureType(this.language_features[Feature.types.tense], 'Tense')
    this.createTable()
    this.table.suffixCellFilter = LatinImperativeView.suffixCellFilter
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

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (inflectionData) {
    if (LanguageModelFactory.compareLanguages(LatinImperativeView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(LatinImperativeView.partOfSpeech) &&
        LatinImperativeView.enabledForLexemes(inflectionData.homonym.lexemes)
    }
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

  static suffixCellFilter (suffix) {
    return suffix.features[Feature.types.mood].values.includes(Constants.MOOD_IMPERATIVE)
  }
}
