import { Constants } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import Table from '../../../lib/table'

/**
 * Used for reflexive pronouns. Produces a table grouped into columns by person and gender
 */
export default class GreekPersonGenderPronounView extends GreekPronounView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale, GreekPersonGenderPronounView.classes[0])

    this.createTable()
  }

  static get viewID () {
    return 'greek_person_gender_pronoun_view'
  }

  createTable () {
    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.persons, this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.features.persons, this.features.genders]
    features.rows = [this.features.numbers, this.features.cases]
    features.columnRowTitles = [this.features.cases]
    features.fullWidthRowTitles = [this.features.numbers]
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [Constants.CLASS_REFLEXIVE]
  }

  static getOrderedGenders () {
    return [
      this.featureMap.get(Constants.GEND_MASCULINE),
      this.featureMap.get(Constants.GEND_FEMININE),
      this.featureMap.get(Constants.GEND_NEUTER)
    ]
  }
}
