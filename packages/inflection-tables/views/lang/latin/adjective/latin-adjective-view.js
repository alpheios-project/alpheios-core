import { Constants, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinView from '../latin-view.js'

export default class LatinAdjectiveView extends LatinView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)
    this.id = 'adjectiveDeclension'
    this.name = 'adjective declension'
    this.title = 'Adjective declension'

    this.features.declensions.addFeature(LatinView.datasetConsts.ORD_1ST_2ND, [Constants.ORD_1ST, Constants.ORD_2ND])
    this.features.declensions.getOrderedFeatures = this.constructor.getOrderedDeclensions
    this.features.declensions.getTitle = this.constructor.getDeclensionTitle

    this.features.genders = this.features.genders.createOfSameType() // Create a copy so that original object will not be affected by a change
    this.features.genders.getOrderedFeatures = this.constructor.getOrderedGenders
    this.features.genders.getTitle = this.constructor.getGenderTitle

    if (this.isImplemented) {
      this.createTable()
      this.table.morphemeCellFilter = LatinAdjectiveView.morphemeCellFilter
    }
  }

  static get viewID () {
    return 'latin_adjective_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ADJECTIVE]
  }

  static get inflectionType () {
    return Suffix
  }

  static getOrderedDeclensions () {
    return [
      this.featureMap.get(LatinView.datasetConsts.ORD_1ST_2ND),
      this.featureMap.get(Constants.ORD_3RD)
    ]
  }

  static getDeclensionTitle (featureValue) {
    switch (featureValue) {
      case LatinView.datasetConsts.ORD_1ST_2ND: return 'First/Second<br>ā and o'
      case Constants.ORD_3RD: return 'Third<br>consonant and i'
      default: return featureValue
    }
  }

  static getOrderedGenders () {
    return [
      this.featureMap.get(Constants.GEND_FEMININE),
      this.featureMap.get(Constants.GEND_MASCULINE),
      this.featureMap.get(Constants.GEND_NEUTER)
    ]
  }

  static matchFilter (languageID, inflections) {
    return Boolean(
      this.languageID === languageID &&
      inflections.some(i => this.enabledForInflection(i)))
  }

  static enabledForInflection (inflection) {
    return inflection[Feature.types.part].value === this.mainPartOfSpeech
  }

  static morphemeCellFilter (form) {
    return !form.features[Feature.types.comparison]
  }
}
