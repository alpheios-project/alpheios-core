import { Constants, GreekLanguageModel, Feature } from 'alpheios-data-models'
import Form from '../../../../lib/form.js'
import View from '../../../lib/view.js'
import GreekView from '../greek-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'

/**
 * This is a base class for all pronoun views. This class should not be used to create tables. Its purpose
 * is to define common features and properties for all pronoun classes.
 */
export default class GreekPronounView extends GreekView {
  /**
   * @param {InflectionData} inflectionData
   * @param {string} locale
   * @param {string} grammarClass - For what pronoun class a view will be created
   */
  constructor (homonym, inflectionData, locale, grammarClass = 'Greek') {
    super(homonym, inflectionData, locale)
    this.id = GreekPronounView.getID(grammarClass)
    this.name = GreekPronounView.getName(grammarClass)
    this.title = GreekPronounView.getTitle(grammarClass)
    this.featureTypes = {}

    const GEND_MASCULINE_FEMININE = 'masculine feminine'
    const GEND_MASCULINE_FEMININE_NEUTER = 'masculine feminine neuter'
    this.featureTypes.numbers = new Feature(
      Feature.types.number,
      [Constants.NUM_SINGULAR, Constants.NUM_DUAL, Constants.NUM_PLURAL],
      this.constructor.languageID
    )

    this.featureTypes.genders = new Feature(
      Feature.types.gender,
      [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, GEND_MASCULINE_FEMININE, Constants.GEND_NEUTER, GEND_MASCULINE_FEMININE_NEUTER],
      this.constructor.languageID
    )

    // This is just a placeholder. Lemma values will be generated dynamically
    this.featureTypes.lemmas = new Feature(Feature.types.hdwd, [], this.constructor.languageID)

    this.features = {
      numbers: new GroupFeatureType(this.featureTypes.numbers, 'Number'),
      cases: new GroupFeatureType(GreekLanguageModel.typeFeature(Feature.types.grmCase), 'Case'),
      genders: new GroupFeatureType(this.featureTypes.genders, 'Gender'),
      persons: new GroupFeatureType(GreekLanguageModel.typeFeature(Feature.types.person), 'Person')
    }

    this.features.genders.getTitle = function getTitle (featureValue) {
      if (featureValue === Constants.GEND_MASCULINE) { return 'm.' }
      if (featureValue === Constants.GEND_FEMININE) { return 'f.' }
      if (featureValue === Constants.GEND_NEUTER) { return 'n.' }
      if (featureValue === GEND_MASCULINE_FEMININE) { return 'm./f.' }
      if (featureValue === GEND_MASCULINE_FEMININE_NEUTER) { return 'm./f./n.' }
      return featureValue
    }

    this.features.genders.filter = function filter (featureValues, suffix) {
      // If not an array, convert it to array for uniformity
      if (!Array.isArray(featureValues)) {
        featureValues = [featureValues]
      }
      for (const value of featureValues) {
        if (suffix.features[this.type] === value) {
          return true
        }
      }

      return false
    }
  }

  static get partsOfSpeech () {
    return [Constants.POFS_PRONOUN]
  }

  static get inflectionType () {
    return Form
  }

  /**
   * What classes of pronouns this view should be used with.
   * Should be defined in descendants.
   * @return {string[]} Array of class names
   */
  static get classes () {
    return []
  }

  static getID (grammarClass) {
    return `${grammarClass}${View.toTitleCase(GreekPronounView.mainPartOfSpeech)}Declension`
  }

  static getName (grammarClass) {
    return `${grammarClass} ${GreekPronounView.mainPartOfSpeech} declension`
  }

  static getTitle (grammarClass) {
    return View.toTitleCase(`${grammarClass} ${GreekPronounView.mainPartOfSpeech} Declension`).trim()
  }

  // Select inflections that have a 'Form' type (form based) and find those whose grammar class matches a grammar class of the view

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param homonym
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (homonym, inflectionData) {
    if (this.languageID === homonym.languageID && homonym.inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech)) {
      if (inflectionData.types.has(this.inflectionType)) {
        let inflections = inflectionData.types.get(this.inflectionType)
        let found = inflections.items.find(form => {
          let match = false
          for (const value of form.features[Feature.types.grmClass].values) {
            match = match || this.classes.includes(value)
          }
          return match
        })
        if (found) {
          return true
        }
      }
    }
    return false
  }

  static getMatchingInstances (homonym, messages) {
    let inflectionData = this.getInflectionsData(homonym)
    if (this.matchFilter(homonym, inflectionData)) {
      return [new this(homonym, inflectionData, messages)]
    }
    return []
  }

  getMorphemes () {
    return this.inflectionData.types.get(this.constructor.inflectionType).items
      .filter(item => item.features.hasOwnProperty(Feature.types.grmClass) &&
            item.features[Feature.types.grmClass].hasSomeValues(this.constructor.classes)
      )
  }
}
