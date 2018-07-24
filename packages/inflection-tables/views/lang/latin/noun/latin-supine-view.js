import { Constants, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinView from '../latin-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'
import Table from '../../../lib/table'

export default class LatinSupineView extends LatinView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.partOfSpeech = this.constructor.mainPartOfSpeech
    this.id = 'verbSupine'
    this.name = 'supine'
    this.title = 'Supine'
    this.features.moods = new GroupFeatureType(
      new Feature(Feature.types.mood, [Constants.MOOD_SUPINE], this.constructor.model.languageID),
      'Mood')
    this.language_features[Feature.types.grmCase] = new Feature(Feature.types.grmCase,
      [Constants.CASE_ACCUSATIVE, Constants.CASE_ABLATIVE], this.constructor.model.languageID)
    this.features = {
      cases: new GroupFeatureType(this.language_features[Feature.types.grmCase], 'Case'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Feature.types.conjugation], 'Conjugation Stem')
    }
    this.createTable()
  }

  static get viewID () {
    return 'latin_supine_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_SUPINE]
  }

  static get inflectionType () {
    return Suffix
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
