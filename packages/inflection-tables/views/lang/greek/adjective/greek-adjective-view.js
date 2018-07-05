import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import GreekView from '../greek-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'

export default class GreekAdjectiveView extends GreekView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'adjectiveDeclension'
    this.name = 'adjective declension'
    this.title = 'Adjective declension'
    this.partOfSpeech = Constants.POFS_ADJECTIVE
    this.inflectionType = Suffix

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

  static get partOfSpeech () {
    return Constants.POFS_ADJECTIVE
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
    if (LanguageModelFactory.compareLanguages(GreekAdjectiveView.languageID, inflectionData.languageID)) {
      return inflectionData.pos.has(GreekAdjectiveView.partOfSpeech)
    }
  }
}
