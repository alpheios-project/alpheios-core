import { Constants } from 'alpheios-data-models'
import Suffix from '@lib/suffix.js'
import GreekAdjectiveView from '@views/lang/greek/adjective/greek-adjective-view'

export default class GreekAdjectiveSimplifiedView extends GreekAdjectiveView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.id = 'adjectiveDeclensionSimplified'
    this.name = 'adjective declension simplified'
    this.title = 'Adjective declension (simplified)'
    this.partOfSpeech = this.constructor.mainPartOfSpeech
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

    this.table.morphemeCellFilter = GreekAdjectiveSimplifiedView.morphemeCellFilter
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ADJECTIVE]
  }

  static get inflectionType () {
    return Suffix
  }

  static morphemeCellFilter (suffix) {
    if (suffix.extendedLangData && suffix.extendedLangData[Constants.STR_LANG_CODE_GRC]) {
      return suffix.extendedLangData[Constants.STR_LANG_CODE_GRC].primary
    } else {
      console.warn(`Greek morpheme "${suffix.value}" has no extended language data attached.`)
      return false
    }
  }
}
