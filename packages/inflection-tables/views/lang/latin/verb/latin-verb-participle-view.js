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

    this.features.tenses = new GroupFeatureType(Feature.types.tense, this.constructor.languageID, 'Tense', [
      this.constructor.model.typeFeature(Feature.types.tense).createFeature(Constants.TENSE_PRESENT),
      this.constructor.model.typeFeature(Feature.types.tense).createFeature(Constants.TENSE_PERFECT),
      this.constructor.model.typeFeature(Feature.types.tense).createFeature(Constants.TENSE_FUTURE)
    ])
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
    this.table = new Table([this.features.voices, this.features.conjugations, this.features.tenses])
    let features = this.table.features
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.voice),
      this.constructor.model.typeFeature(Feature.types.conjugation)
    ]
    features.rows = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.columnRowTitles = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.fullWidthRowTitles = []
  }
}
