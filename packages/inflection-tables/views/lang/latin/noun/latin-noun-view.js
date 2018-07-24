import { Constants, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LatinView from '../latin-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'

export default class LatinNounView extends LatinView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.id = 'noun_declension'
    this.name = 'noun declension'
    this.title = 'Noun declension'

    // Feature that are different from base class values
    this.features.genders = new GroupFeatureType(this.language_features[Feature.types.gender], 'Gender',
      [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, Constants.GEND_NEUTER])
    this.createTable()
  }

  static get viewID () {
    return 'latin_noun_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_NOUN]
  }

  static get inflectionType () {
    return Suffix
  }
}
