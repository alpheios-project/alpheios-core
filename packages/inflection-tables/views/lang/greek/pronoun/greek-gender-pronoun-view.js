import { Constants } from 'alpheios-data-models'
import GreekView from '../greek-view.js'
import GreekPronounView from './greek-pronoun-view.js'
import Table from '../../../lib/table'

/**
 * Used for several classes of pronouns, see `classes` method for a full list.
 * Produces a table grouped into columns by gender.
 */
export default class GreekGenderPronounView extends GreekPronounView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale, GreekPronounView.getClassFromInflection(inflectionData.inflections))

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'greek_gender_pronoun_view'
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [
      Constants.CLASS_GENERAL_RELATIVE,
      Constants.CLASS_INDEFINITE,
      Constants.CLASS_INTENSIVE,
      Constants.CLASS_INTERROGATIVE,
      Constants.CLASS_RECIPROCAL,
      Constants.CLASS_RELATIVE
    ]
  }

  createTable () {
    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.features.genders]
    features.rows = [this.features.numbers, this.features.cases]
    features.columnRowTitles = [this.features.cases]
    features.fullWidthRowTitles = [this.features.numbers]
  }

  static getOrderedGenders () {
    return [
      this.featureMap.get(Constants.GEND_FEMININE),
      this.featureMap.get(Constants.GEND_MASCULINE),
      this.featureMap.get(GreekView.datasetConsts.GEND_MASCULINE_FEMININE),
      this.featureMap.get(Constants.GEND_NEUTER),
      this.featureMap.get(GreekView.datasetConsts.GEND_MASCULINE_FEMININE_NEUTER)
    ]
  }
}
