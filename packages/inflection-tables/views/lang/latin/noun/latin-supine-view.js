import { Constants, LanguageModelFactory, Feature, FeatureType } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinView from '../latin-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'
import Table from '../../../lib/table'

export default class LatinSupineView extends LatinView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.partOfSpeech = this.language_features[Feature.types.part][Constants.POFS_SUPINE].value
    this.id = 'verbSupine'
    this.name = 'supine'
    this.title = 'Supine'
    this.features.moods = new GroupFeatureType(
      new FeatureType(Feature.types.mood, [Constants.MOOD_SUPINE], this.model.languageID),
      'Mood')
    this.language_features[Feature.types.grmCase] = new FeatureType(Feature.types.grmCase,
      [Constants.CASE_ACCUSATIVE, Constants.CASE_ABLATIVE], this.model.languageID)
    this.features = {
      cases: new GroupFeatureType(this.language_features[Feature.types.grmCase], 'Case'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Feature.types.conjugation], 'Conjugation Stem')
    }
    this.createTable()
  }

  static get partOfSpeech () {
    return Constants.POFS_SUPINE
  }

  static get inflectionType () {
    return Suffix
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
    if (LanguageModelFactory.compareLanguages(LatinSupineView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(LatinSupineView.partOfSpeech)
    }
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.cases])
    let features = this.table.features
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.conjugation]]
    features.rows = [this.language_features[Feature.types.grmCase]]
    features.columnRowTitles = [this.language_features[Feature.types.grmCase]]
    features.fullWidthRowTitles = []
  }
}
