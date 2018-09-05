import { Constants, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinView from '../latin-view.js'
import Table from '../../../lib/table'

export default class LatinSupineView extends LatinView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.partOfSpeech = this.constructor.mainPartOfSpeech
    this.id = 'verbSupine'
    this.name = 'supine'
    this.title = 'Supine'

    this.features = {
      cases: this.features.cases,
      conjugations: this.features.conjugations
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
    this.table = new Table([this.features.conjugations,
      this.features.cases])
    let features = this.table.features
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.conjugation)
    ]
    features.rows = [this.constructor.model.typeFeature(Feature.types.grmCase)]
    features.columnRowTitles = [this.constructor.model.typeFeature(Feature.types.grmCase)]
    features.fullWidthRowTitles = []
  }
}
