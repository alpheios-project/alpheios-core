import { Constants, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinView from '../latin-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'
import Table from '../../../lib/table'

export default class LatinVerbParticipleView extends LatinView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.partOfSpeech = this.constructor.mainPartOfSpeech
    this.id = 'verbParticiple'
    this.name = 'participle'
    this.title = 'Participle'
    this.language_features[Feature.types.tense] = new Feature(Feature.types.tense,
      [Constants.TENSE_PRESENT, Constants.TENSE_PERFECT, Constants.TENSE_FUTURE], this.constructor.model.languageID)
    this.features = {
      tenses: new GroupFeatureType(this.language_features[Feature.types.tense], 'Tenses'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Feature.types.conjugation], 'Conjugation Stem')
    }
    this.createTable()
  }

  static get viewID () {
    return 'latin_verb_participle_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB_PARTICIPLE, Constants.POFS_ADJECTIVE]
  }

  static get inflectionType () {
    return Suffix
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
}
