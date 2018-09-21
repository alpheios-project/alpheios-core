import { Constants, Feature, Inflection, Homonym } from 'alpheios-data-models'
import Form from '@lib/form.js'
import View from '@views/lib/view.js'
import GroupFeatureType from '@views/lib/group-feature-type.js'
import GreekView from '@views/lang/greek/greek-view.js'

/**
 * This is a base class for all pronoun views. This class should not be used to create tables. Its purpose
 * is to define common features and properties for all pronoun classes.
 */
export default class GreekPronounView extends GreekView {
  /**
   * @param {Homonym} homonym
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

    this.lemmaTypeFeature = new Feature(Feature.types.hdwd, this.constructor.dataset.getNumeralGroupingLemmas(), GreekView.languageID)
    this.features.lemmas = new GroupFeatureType(Feature.types.hdwd, this.constructor.languageID, 'Lemma',
      this.constructor.dataset.getNumeralGroupingLemmaFeatures())

    this.features.genders.filter = this.constructor.genderFilter
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

  /**
   * Returns a class of view from a list of inflections.
   * Currently returns a class of a first inflection from the list.
   * @param {Inflection} inflections - A list of inflections.
   * @return {string} A name of a view's class name or an empty string if class cannot be determined.
   */
  static getClassesFromInflection (inflections) {
    if (inflections && inflections.length > 0 && inflections[0][Feature.types.grmClass]) {
      return inflections[0][Feature.types.grmClass].values
    }
    return ''
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

  static genderFilter (featureValues, suffix) {
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

  /**
   * Determines whether this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param {symbol} languageID
   * @param {Inflection[]} inflections
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (languageID, inflections, inflectionData) {
    if (this.languageID === languageID && inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech)) {
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
    if (this.matchFilter(homonym.languageID, homonym.inflections, inflectionData)) {
      return [new this(homonym, inflectionData, messages).render()]
    }
    return []
  }

  getMorphemes () {
    return this.inflectionData.types.get(this.constructor.inflectionType).items
      .filter(item => item.features.hasOwnProperty(Feature.types.grmClass) &&
            item.features[Feature.types.grmClass].hasSomeValues(this.constructor.classes)
      )
  }

  static createStandardFormHomonym (options = {}) {
    if (!options || !options.form) {
      throw new Error(`Obligatory options property, "form", is missing`)
    }
    let inflection = new Inflection(options.form, this.languageID)
    inflection.addFeature(new Feature(Feature.types.part, this.mainPartOfSpeech, this.languageID))
    let homonym = Homonym.createSimpleForm(options.form, this.languageID, [inflection])
    inflection = this.dataset.setInflectionData(inflection, homonym.lexemes[0].lemma)
    return homonym
  }
}
