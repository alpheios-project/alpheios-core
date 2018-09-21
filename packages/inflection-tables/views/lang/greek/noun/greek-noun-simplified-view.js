import { Constants } from 'alpheios-data-models'
import Morpheme from '@lib/morpheme.js'
import Suffix from '@lib/suffix.js'
import GreekView from '@views/lang/greek/greek-view.js'
import GreekNounView from './greek-noun-view'

export default class GreekNounSimplifiedView extends GreekNounView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.id = 'nounDeclensionSimplified'
    this.name = 'noun declension simplified'
    this.title = 'Noun declension (simplified)'

    this.features.genders.addFeature(GreekView.datasetConsts.GEND_MASCULINE_FEMININE_NEUTER,
      [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, Constants.GEND_NEUTER])
    this.features.genders.comparisonType = Morpheme.comparisonTypes.ALL_VALUES
    this.features.genders.getOrderedValues = GreekView.getOrderedGenders

    if (this.isImplemented) {
      this.createTable()
      this.table.morphemeCellFilter = GreekNounSimplifiedView.morphemeCellFilter
    }
  }

  static get viewID () {
    return 'greek_noun_simplified_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_NOUN]
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
