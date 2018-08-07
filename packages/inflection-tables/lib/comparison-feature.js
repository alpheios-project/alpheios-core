import Morpheme from '@lib/morpheme.js'

export default class ComparisonFeature {
  constructor (featureName, comparisonType = Morpheme.comparisonTypes.EXACT) {
    this.featureName = featureName
    this.comparisonType = comparisonType
  }
}
