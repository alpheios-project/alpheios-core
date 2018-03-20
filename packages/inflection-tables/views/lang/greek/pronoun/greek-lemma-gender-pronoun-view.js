import { Constants, GreekLanguageModel, Feature } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'
import Table from '../../../lib/table'

/**
 * Used for demonstrative pronouns. Produces a table grouped into columns by lemma and gender
 */
export default class GreekLemmaGenderPronounView extends GreekPronounView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale, GreekLemmaGenderPronounView.classes[0])

    // Add lemmas
    this.featureTypes.lemmas = this.dataset.getPronounGroupingLemmas(GreekLemmaGenderPronounView.classes[0])
    this.features.lemmas = new GroupFeatureType(this.featureTypes.lemmas, 'Lemma')

    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.lemmas, this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.featureTypes.lemmas, this.featureTypes.genders]
    features.rows = [this.featureTypes.numbers, GreekLanguageModel.typeFeature(Feature.types.grmCase)]
    features.columnRowTitles = [GreekLanguageModel.typeFeature(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.featureTypes.numbers]
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [Constants.CLASS_DEMONSTRATIVE]
  }
}
