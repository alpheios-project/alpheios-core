import { Constants, LanguageModelFactory } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import GreekView from '../greek-view.js'

export default class GreekNounView extends GreekView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'nounDeclension'
    this.name = 'noun declension'
    this.title = 'Noun declension'
    this.partOfSpeech = Constants.POFS_NOUN
    this.inflectionType = Suffix
    let genderMasculine = Constants.GEND_MASCULINE
    let genderFeminine = Constants.GEND_FEMININE
    let genderNeuter = Constants.GEND_NEUTER

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
    return Constants.POFS_NOUN
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
    if (LanguageModelFactory.compareLanguages(GreekNounView.languageID, inflectionData.languageID)) {
      return inflectionData.pos.has(GreekNounView.partOfSpeech)
    }
  }
}
