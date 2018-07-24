import { Constants, Feature } from 'alpheios-data-models'
import Suffix from '@lib/suffix.js'
import GreekView from '@views/lang/greek/greek-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'

export default class GreekAdjectiveView extends GreekView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.id = 'adjectiveDeclension'
    this.name = 'adjective declension'
    this.title = 'Adjective declension'

    const GEND_MASCULINE_FEMININE = 'masculine feminine'
    const GEND_MASCULINE_FEMININE_NEUTER = 'masculine feminine neuter'

    let featureTypesGenders = new Feature(
      Feature.types.gender,
      [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, GEND_MASCULINE_FEMININE, Constants.GEND_NEUTER, GEND_MASCULINE_FEMININE_NEUTER],
      this.languageID
    )
    this.features.genders = new GroupFeatureType(featureTypesGenders, 'Gender')
    this.features.genders.getOrderedValues = function getOrderedValues (ancestorFeatures) {
      return [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, GEND_MASCULINE_FEMININE, Constants.GEND_NEUTER, GEND_MASCULINE_FEMININE_NEUTER]
    }

    this.features.genders.getTitle = function getTitle (featureValue) {
      if (featureValue === Constants.GEND_MASCULINE) { return 'm.' }
      if (featureValue === Constants.GEND_FEMININE) { return 'f.' }
      if (featureValue === Constants.GEND_NEUTER) { return 'n.' }
      if (featureValue === GEND_MASCULINE_FEMININE) { return 'm./f.' }
      if (featureValue === GEND_MASCULINE_FEMININE_NEUTER) { return 'm./f./n.' }
      return featureValue
    }
    this.createTable()
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ADJECTIVE]
  }

  static get inflectionType () {
    return Suffix
  }
}
