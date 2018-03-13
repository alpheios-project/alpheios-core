import { Constants, GreekLanguageModel, Feature } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import Table from '../../../lib/table'

/**
 * Used for several classes of pronouns, see `classes` method for a full list.
 * Produces a table grouped into columns by gender.
 */
export default class GreekGenderPronounView extends GreekPronounView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)

    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.featureTypes.genders]
    features.rows = [this.featureTypes.numbers, GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.columnRowTitles = [GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.featureTypes.numbers]
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
}
