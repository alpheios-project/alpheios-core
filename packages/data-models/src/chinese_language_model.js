import LanguageModel from './language_model.js'
import Feature from './feature.js'
import * as Constants from './constants.js'

let typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
export default class ChineseLanguageModel extends LanguageModel {
  static get languageID () { return Constants.LANG_CHINESE }
  static get languageCode () { return Constants.STR_LANG_CODE_ZHO }
  static get languageCodes () { return [Constants.STR_LANG_CODE_ZH, Constants.STR_LANG_CODE_ZHO] }
  static get contextForward () { return 5 }
  static get contextBackward () { return 0 }
  static get direction () { return Constants.LANG_DIR_LTR }
  static get baseUnit () { return Constants.LANG_UNIT_CHAR }

  static get featureValues () {
    return new Map([
      [
        Feature.types.fullForm,
        []
      ],

      [
        Feature.types.frequency,
        []
      ],
      [
        Feature.types.pronunciation,
        []
      ],
      [
        Feature.types.radical,
        []
      ]

    ])
  }

  static get typeFeatures () {
    if (!typeFeaturesInitialized) { this.initTypeFeatures() }
    return typeFeatures
  }

  static initTypeFeatures () {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName))
    }
    typeFeaturesInitialized = true
  }

  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\n\r\uFF0C\u3001\u3002\u300C\u300D\u300A\u300B\u200C\u200D"
  }
}
