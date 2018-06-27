import { Constants, LanguageModelFactory } from 'alpheios-data-models'
import Suffix from '@lib/suffix.js'
import GreekView from '@views/lang/greek/greek-view.js'

export default class GreekAdjectiveView extends GreekView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'adjectiveDeclension'
    this.name = 'adjective declension'
    this.title = 'Adjective declension'
    this.partOfSpeech = Constants.POFS_ADJECTIVE
    this.inflectionType = Suffix
    const genderMasculine = Constants.GEND_MASCULINE
    const genderFeminine = Constants.GEND_FEMININE
    const genderNeuter = Constants.GEND_NEUTER

    this.features.genders.getOrderedValues = function getOrderedValues (ancestorFeatures) {
      if (ancestorFeatures) {
        if (ancestorFeatures.value === Constants.ORD_2ND || ancestorFeatures.value === Constants.ORD_3RD) {
          return [[genderMasculine, genderFeminine], genderNeuter]
        }
      }
      return [genderMasculine, genderFeminine, genderNeuter]
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
