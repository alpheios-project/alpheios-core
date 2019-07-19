import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbMoodView from './latin-verb-mood-view.js'
// import GroupFeatureType from '../../../lib/group-feature-type'
import Table from '../../../lib/table'

export default class LatinImperativeView extends LatinVerbMoodView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)
    this.id = 'verbImperative'
    this.name = 'imperative'
    this.title = 'Imperative'

    if (this.isImplemented) {
      this.createTable()
      this.table.morphemeCellFilter = LatinImperativeView.morphemeCellFilter
    }
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.voice),
      this.constructor.model.typeFeature(Feature.types.conjugation)
    ]
    features.rows = [
      this.constructor.model.typeFeature(Feature.types.tense),
      this.constructor.model.typeFeature(Feature.types.number),
      this.constructor.model.typeFeature(Feature.types.person)
    ]
    features.columnRowTitles = [
      this.constructor.model.typeFeature(Feature.types.number),
      this.constructor.model.typeFeature(Feature.types.person)
    ]
    features.fullWidthRowTitles = [this.constructor.model.typeFeature(Feature.types.tense)]
  }

  static get viewID () {
    return 'latin_imperative_view'
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param {symbol} languageID
   * @param {Inflection[]} inflections
   * @return {boolean}
   */
  static matchFilter (languageID, inflections) {
    return Boolean(
      this.languageID === languageID &&
      inflections.some(i => this.enabledForInflection(i)))
  }

  static enabledForInflection (inflection) {
    return inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection[Feature.types.mood] &&
      inflection[Feature.types.mood].values.includes(Constants.MOOD_IMPERATIVE)
  }

  static morphemeCellFilter (suffix) {
    return suffix.features[Feature.types.mood].values.includes(Constants.MOOD_IMPERATIVE)
  }
}
