import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import LatinVerbMoodView from './latin-verb-mood-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'
import Table from '../../../lib/table'

export default class LatinInfinitiveView extends LatinVerbMoodView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'verbInfinitive'
    this.name = 'infinitive'
    this.title = 'Infinitive'
    this.features.moods = new GroupFeatureType(
      new Feature(Feature.types.mood, [Constants.MOOD_INFINITIVE], this.model.languageID),
      'Mood')
    this.language_features[Feature.types.tense] = new Feature(Feature.types.tense,
      [Constants.TENSE_PRESENT, Constants.TENSE_PERFECT, Constants.TENSE_FUTURE], this.model.languageID)
    this.features.tenses = new GroupFeatureType(this.language_features[Feature.types.tense], 'Tense')
    this.createTable()
    this.table.suffixCellFilter = LatinInfinitiveView.suffixCellFilter
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses])
    let features = this.table.features
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.conjugation]]
    features.rows = [this.language_features[Feature.types.tense]]
    features.columnRowTitles = [this.language_features[Feature.types.tense]]
    features.fullWidthRowTitles = []
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
    if (LanguageModelFactory.compareLanguages(LatinInfinitiveView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(LatinInfinitiveView.partOfSpeech) &&
        LatinInfinitiveView.enabledForLexemes(inflectionData.homonym.lexemes)
    }
  }

  static enabledForLexemes (lexemes) {
    // default is true
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection[Feature.types.mood] &&
          inflection[Feature.types.mood].values.includes(Constants.MOOD_INFINITIVE)) {
          return true
        }
      }
    }
    return false
  }

  static suffixCellFilter (suffix) {
    return suffix.features[Feature.types.mood].includes(Constants.MOOD_INFINITIVE)
  }
}
