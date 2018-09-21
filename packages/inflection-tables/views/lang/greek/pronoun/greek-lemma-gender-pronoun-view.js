import { Constants, Feature } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'
import Table from '../../../lib/table'

/**
 * Used for demonstrative pronouns. Produces a table grouped into columns by lemma and gender
 */
export default class GreekLemmaGenderPronounView extends GreekPronounView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale, GreekLemmaGenderPronounView.classes[0])

    // Add lemmas
    /* this.lemmaTypeFeature = new Feature(
      Feature.types.hdwd,
      this.constructor.dataset.getPronounGroupingLemmas(GreekLemmaGenderPronounView.classes[0]),
      GreekPronounView.languageID
    ) */
    this.features.lemmas = new GroupFeatureType(Feature.types.hdwd, this.constructor.languageID, 'Lemma',
      this.constructor.dataset.getPronounGroupingLemmaFeatures(GreekLemmaGenderPronounView.classes[0]))

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'greek_lemma_gender_pronoun_view'
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [Constants.CLASS_DEMONSTRATIVE]
  }

  createTable () {
    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.lemmas, this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.features.lemmas, this.features.genders]
    features.rows = [this.features.numbers, this.features.cases]
    features.columnRowTitles = [this.features.cases]
    features.fullWidthRowTitles = [this.features.numbers]
  }

  static getOrderedGenders () {
    return [
      this.featureMap.get(Constants.GEND_FEMININE),
      this.featureMap.get(Constants.GEND_MASCULINE),
      this.featureMap.get(Constants.GEND_NEUTER),
      this.featureMap.get(GreekPronounView.datasetConsts.GEND_MASCULINE_FEMININE_NEUTER)
    ]
  }
}
