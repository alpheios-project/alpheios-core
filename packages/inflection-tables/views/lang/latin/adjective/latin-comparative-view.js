import { Constants, Feature } from 'alpheios-data-models'
import Morpheme from '@lib/morpheme.js'
import Suffix from '../../../../lib/suffix.js'
import LatinView from '../latin-view.js'
import Table from '@views/lib/table.js'

export default class LatinAdjectiveComparativeView extends LatinView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)
    this.id = 'adjectiveComparativeDeclension'
    this.name = 'adjective comparative declension'
    this.title = 'Adjective Comparative Declension'

    this.features.genders.addFeature(LatinView.datasetConsts.GEND_MASCULINE_FEMININE, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE])
    this.features.genders.getOrderedFeatures = this.constructor.getOrderedGenders
    this.features.genders.getTitle = this.constructor.getGenderTitle
    this.features.genders.comparisonType = Morpheme.comparisonTypes.ALL_VALUES

    if (this.isImplemented) {
      this.createTable()
      this.table.morphemeCellFilter = LatinAdjectiveComparativeView.morphemeCellFilter
    }
  }

  static get viewID () {
    return 'latin_adjective_comparative_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ADJECTIVE]
  }

  static get inflectionType () {
    return Suffix
  }

  createTable () {
    this.table = new Table([this.features.genders, this.features.types,
      this.features.numbers, this.features.cases])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.gender),
      this.constructor.model.typeFeature(Feature.types.type)]
    features.rows = [
      this.constructor.model.typeFeature(Feature.types.number),
      this.constructor.model.typeFeature(Feature.types.grmCase)]
    features.columnRowTitles = [this.constructor.model.typeFeature(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.constructor.model.typeFeature(Feature.types.number)]
  }

  static getOrderedGenders () {
    return [
      this.featureMap.get(LatinView.datasetConsts.GEND_MASCULINE_FEMININE),
      this.featureMap.get(Constants.GEND_NEUTER)
    ]
  }

  static matchFilter (languageID, inflections) {
    return Boolean(
      this.languageID === languageID &&
      inflections.some(i => this.enabledForInflection(i)))
  }

  static enabledForInflection (inflection) {
    return inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection[Feature.types.comparison] &&
      inflection[Feature.types.comparison].value === Constants.COMP_COMPARITIVE
  }

  static morphemeCellFilter (form) {
    return form.features[Feature.types.comparison] &&
      form.features[Feature.types.comparison].value === Constants.COMP_COMPARITIVE
  }
}
