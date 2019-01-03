import { Constants, Feature } from 'alpheios-data-models'
import View from '@views/lib/view.js'
import GroupFeatureType from '@views/lib/group-feature-type.js'
import Table from '@views/lib/table.js'

export default class LatinView extends View {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.features = {
      numbers: GroupFeatureType.createFromType(Feature.types.number, this.constructor.languageID, 'Number'),
      cases: GroupFeatureType.createFromType(Feature.types.grmCase, this.constructor.languageID, 'Case'),
      declensions: GroupFeatureType.createFromType(Feature.types.declension, this.constructor.languageID, 'Declension Stem'),
      genders: GroupFeatureType.createFromType(Feature.types.gender, this.constructor.languageID, 'Gender'),
      types: GroupFeatureType.createFromType(Feature.types.type, this.constructor.languageID, 'Type'),
      tenses: GroupFeatureType.createFromType(Feature.types.tense, this.constructor.languageID, 'Tense'),
      voices: GroupFeatureType.createFromType(Feature.types.voice, this.constructor.languageID, 'Voice'),
      moods: new GroupFeatureType(Feature.types.mood, this.constructor.languageID, 'Mood', [
        this.constructor.model.typeFeature(Feature.types.mood).createFeature(Constants.MOOD_INDICATIVE),
        this.constructor.model.typeFeature(Feature.types.mood).createFeature(Constants.MOOD_SUBJUNCTIVE)
      ]),
      persons: GroupFeatureType.createFromType(Feature.types.person, this.constructor.languageID, 'Person'),
      conjugations: GroupFeatureType.createFromType(Feature.types.conjugation, this.constructor.languageID, 'Conjugation Stem')
    }
    this.features.declensions.getTitle = this.constructor.getDeclensionTitle
    this.features.genders.getTitle = this.constructor.getGenderTitle
    this.features.conjugations.getTitle = this.constructor.getConjugationTitle
    this.features.persons.getTitle = this.constructor.getOrdinalTitle
    this.features.voices.getTitle = this.constructor.getVoiceTitle
  }

  /**
   * Defines a language ID of a view. Should be redefined in child classes.
   * @return {symbol}
   */
  static get languageID () {
    return Constants.LANG_LATIN
  }

  /*
    Creates and initializes an inflection table. Redefine this method in child objects in order to create
    an inflection table differently
     */
  createTable () {
    this.table = new Table([this.features.declensions, this.features.genders,
      this.features.types, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.declension),
      this.constructor.model.typeFeature(Feature.types.gender),
      this.constructor.model.typeFeature(Feature.types.type)]
    features.rows = [
      this.constructor.model.typeFeature(Feature.types.number),
      this.constructor.model.typeFeature(Feature.types.grmCase)]
    features.columnRowTitles = [this.constructor.model.typeFeature(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.constructor.model.typeFeature(Feature.types.number)]
  }

  /*
  GetTitle and getOrderFeatures methods will be attached to a GroupFeatureType, so `this` value
  will point to a GroupFeatureType object, not to the View instance.
   */

  /**
   * Define ordinal group titles.
   * @param {String} featureValue - A value of a declension.
   * @return {string} - A title of a declension group.
   */
  static getOrdinalTitle (featureValue) {
    switch (featureValue) {
      case Constants.ORD_1ST: return `First`
      case Constants.ORD_2ND: return `Second`
      case Constants.ORD_3RD: return `Third`
      case Constants.ORD_4TH: return `Fourth`
      case Constants.ORD_5TH: return `Fifth`
      default: return featureValue
    }
  }

  /**
   * Define declension group titles.
   * @param {String} featureValue - A value of a declension.
   * @return {string} - A title of a declension group.
   */
  static getDeclensionTitle (featureValue) {
    switch (featureValue) {
      case Constants.ORD_1ST: return `First<br>ā`
      case Constants.ORD_2ND: return `Second<br>o`
      case Constants.ORD_3RD: return `Third<br>(mutes, liquids, nasals, i)`
      case Constants.ORD_4TH: return `Fourth<br>u`
      case Constants.ORD_5TH: return `Fifth<br>ē`
      default: return featureValue
    }
  }

  /**
   * Define gender group titles.
   * @param {String} featureValue - A value of a gender.
   * @return {string} - A title of a declension group.
   */
  static getGenderTitle (featureValue) {
    switch (featureValue) {
      case Constants.GEND_MASCULINE: return `m.`
      case Constants.GEND_FEMININE: return `f.`
      case Constants.GEND_NEUTER: return `n.`
      case LatinView.datasetConsts.GEND_MASCULINE_FEMININE: return `f./m.`
      default: return featureValue
    }
  }

  /**
   * Define voice group titles.
   * @param {String} featureValue - A value of a declension.
   * @return {string} - A title of a declension group.
   */
  static getVoiceTitle (featureValue) {
    switch (featureValue) {
      case Constants.VOICE_ACTIVE: return `Active`
      case Constants.VOICE_PASSIVE: return `Passive`
      default: return featureValue
    }
  }

  static getConjugationTitle (featureValue) {
    switch (featureValue) {
      case Constants.ORD_1ST: return `First<br><span class="infl-cell__conj-stem">ā</span>`
      case Constants.ORD_2ND: return `Second<br><span class="infl-cell__conj-stem">ē</span>`
      case Constants.ORD_3RD: return `Third<br><span class="infl-cell__conj-stem">e</span>`
      case Constants.ORD_4TH: return `Fourth<br><span class="infl-cell__conj-stem">i</span>`
      default: return featureValue
    }
  }
}
