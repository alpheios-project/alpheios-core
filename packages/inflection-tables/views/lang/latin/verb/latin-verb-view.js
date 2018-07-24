import { Constants, Feature } from 'alpheios-data-models'
import LatinView from '../latin-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'

export default class LatinVerbView extends LatinView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.features = {
      tenses: new GroupFeatureType(this.language_features[Feature.types.tense], 'Tenses'),
      numbers: new GroupFeatureType(this.language_features[Feature.types.number], 'Number'),
      persons: new GroupFeatureType(this.language_features[Feature.types.person], 'Person'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Feature.types.conjugation], 'Conjugation Stem'),
      moods: new GroupFeatureType(this.language_features[Feature.types.mood], 'Mood')
    }

    /**
     * Define conjugation group titles
     * @param {String} featureValue - A value of a conjugation feature
     * @return {string} - A title of a conjugation group, in HTML format
     */
    this.features.conjugations.getTitle = function getTitle (featureValue) {
      if (featureValue === Constants.ORD_1ST) { return `First<br><span class="infl-cell__conj-stem">ā</span>` }
      if (featureValue === Constants.ORD_2ND) { return `Second<br><span class="infl-cell__conj-stem">ē</span>` }
      if (featureValue === Constants.ORD_3RD) { return `Third<br><span class="infl-cell__conj-stem">e</span>` }
      if (featureValue === Constants.ORD_4TH) { return `Fourth<br><span class="infl-cell__conj-stem">i</span>` }

      if (this.hasOwnProperty(featureValue)) {
        if (Array.isArray(this[featureValue])) {
          return this[featureValue].map((feature) => feature.value).join('/')
        } else {
          return this[featureValue].value
        }
      } else {
        return 'not available'
      }
    }
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB]
  }
}
