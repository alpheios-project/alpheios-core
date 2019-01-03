import { Constants, Feature } from 'alpheios-data-models'
// import LanguageDatasetFactory from '../../../lib/language-dataset-factory.js'
import Table from '../../lib/table.js'
import View from '../../lib/view.js'
import GroupFeatureType from '../../lib/group-feature-type.js'

export default class GreekView extends View {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    /*
    Default grammatical features of a View. It child views need to have different feature values, redefine
    those values in child objects.
     */
    this.features = {
      numbers: GroupFeatureType.createFromType(Feature.types.number, this.constructor.languageID, 'Number'),
      cases: GroupFeatureType.createFromType(Feature.types.grmCase, this.constructor.languageID, 'Case'),
      declensions: GroupFeatureType.createFromType(Feature.types.declension, this.constructor.languageID, 'Declension Stem'),
      genders: GroupFeatureType.createFromType(Feature.types.gender, this.constructor.languageID, 'Gender'),
      types: GroupFeatureType.createFromType(Feature.types.type, this.constructor.languageID, 'Type'),
      persons: GroupFeatureType.createFromType(Feature.types.person, this.constructor.languageID, 'Person')
    }
    this.features.numbers.getOrderedFeatures = this.constructor.getOrderedNumbers
    this.features.genders.addFeature(GreekView.datasetConsts.GEND_MASCULINE_FEMININE,
      [Constants.GEND_MASCULINE, Constants.GEND_FEMININE])
    this.features.genders.addFeature(GreekView.datasetConsts.GEND_MASCULINE_FEMININE_NEUTER,
      [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, Constants.GEND_NEUTER])
    this.features.declensions.getTitle = this.constructor.getDeclensionTitle
    this.features.genders.getOrderedFeatures = this.constructor.getOrderedGenders
    this.features.genders.getTitle = this.constructor.getGenderTitle
    this.features.persons.getTitle = this.constructor.getOrdinalTitle
  }

  static get languageID () {
    return Constants.LANG_GREEK
  }

  /**
   * Creates and initializes an inflection table. Redefine this method in child objects in order to create
   * an inflection table differently.
   */
  createTable () {
    this.table = new Table([this.features.declensions, this.features.genders,
      this.features.types, this.features.numbers, this.features.cases])

    let features = this.table.features
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.declension),
      this.constructor.model.typeFeature(Feature.types.gender),
      this.constructor.model.typeFeature(Feature.types.type)
    ]
    features.rows = [
      this.constructor.model.typeFeature(Feature.types.number),
      this.constructor.model.typeFeature(Feature.types.grmCase)
    ]
    features.columnRowTitles = [
      this.constructor.model.typeFeature(Feature.types.grmCase)
    ]
    features.fullWidthRowTitles = [
      this.constructor.model.typeFeature(Feature.types.number)
    ]
  }

  /*
  GetTitle and getOrderFeatures methods will be attached to a GroupFeatureType, so `this` value
  will point to a GroupFeatureType object, not to the View instance.
   */

  static getOrdinalTitle (featureValue) {
    switch (featureValue) {
      case Constants.ORD_1ST: return `First`
      case Constants.ORD_2ND: return `Second`
      case Constants.ORD_3RD: return `Third`
      case Constants.ORD_4TH: return `Fourth`
      case Constants.ORD_5TH: return `Fifth`
      default: return featureValue
    }
  }

  static getDeclensionTitle (featureValue) {
    switch (featureValue) {
      case Constants.ORD_1ST: return `First<br>α`
      case Constants.ORD_2ND: return `Second<br>ο`
      case Constants.ORD_3RD: return `Third<br>ι, ω`
      case Constants.ORD_4TH: return `Fourth`
      case Constants.ORD_5TH: return `Fifth`
      default: return featureValue
    }
  }

  static getOrderedGenders (ancestorFeatures) {
    const ancestorValue = ancestorFeatures.length > 0 ? ancestorFeatures[ancestorFeatures.length - 1].value : ''
    if (ancestorValue === Constants.ORD_2ND) {
      return [
        this.featureMap.get(GreekView.datasetConsts.GEND_MASCULINE_FEMININE),
        this.featureMap.get(Constants.GEND_NEUTER)
      ]
    } else if (ancestorValue === Constants.ORD_3RD) {
      return [
        this.featureMap.get(GreekView.datasetConsts.GEND_MASCULINE_FEMININE_NEUTER)
      ]
    } else {
      return [
        this.featureMap.get(Constants.GEND_FEMININE),
        this.featureMap.get(Constants.GEND_MASCULINE),
        this.featureMap.get(Constants.GEND_NEUTER)
      ]
    }
  }

  static getOrderedNumbers () {
    return [
      this.featureMap.get(Constants.NUM_SINGULAR),
      this.featureMap.get(Constants.NUM_DUAL),
      this.featureMap.get(Constants.NUM_PLURAL)
    ]
  }

  static getGenderTitle (featureValue) {
    if (featureValue === Constants.GEND_MASCULINE) { return 'm.' }
    if (featureValue === Constants.GEND_FEMININE) { return 'f.' }
    if (featureValue === Constants.GEND_NEUTER) { return 'n.' }
    if (featureValue === GreekView.datasetConsts.GEND_MASCULINE_FEMININE) { return 'f./m.' }
    if (featureValue === GreekView.datasetConsts.GEND_MASCULINE_FEMININE_NEUTER) { return 'f./m./n.' }
    return featureValue
  }
}
