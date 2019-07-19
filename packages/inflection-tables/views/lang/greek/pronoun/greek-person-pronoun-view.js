import { Constants } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import Table from '../../../lib/table'

/**
 * Used for personal pronouns. Produces a table grouped into columns by person
 */
export default class GreekPersonPronounView extends GreekPronounView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData, GreekPersonPronounView.classes[0])

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'greek_person_pronoun_view'
  }

  createTable () {
    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.persons, this.features.numbers, this.features.cases])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [this.features.persons]
    features.rows = [this.features.numbers, this.features.cases]
    features.columnRowTitles = [this.features.cases]
    features.fullWidthRowTitles = [this.features.numbers]
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [Constants.CLASS_PERSONAL]
  }
}
