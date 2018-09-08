import { Constants, Feature } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'
import Table from '../../../lib/table'

/**
 * Used for reflexive pronouns. Produces a table grouped into columns by person and gender
 */
export default class GreekPersonGenderPronounView extends GreekPronounView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale, GreekPersonGenderPronounView.classes[0])

    // Add persons
    this.features.persons = GroupFeatureType.createFromType(Feature.types.person, this.constructor.languageID, 'Person')

    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.persons, this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.person),
      this.constructor.model.typeFeature(Feature.types.gender)
    ]
    features.rows = [
      this.constructor.model.typeFeature(Feature.types.number),
      this.constructor.model.typeFeature(Feature.types.grmCase)
    ]
    features.columnRowTitles = [
      this.constructor.model.typeFeature(Feature.types.grmCase)
    ]
    features.fullWidthRowTitles = [
      this.constructor.model.typeFeature(Feature.types.number)
    ]
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [Constants.CLASS_REFLEXIVE]
  }
}
