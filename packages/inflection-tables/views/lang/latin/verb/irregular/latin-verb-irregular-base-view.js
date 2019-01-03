import { Constants, Feature } from 'alpheios-data-models'
import LatinView from '@views/lang/latin/latin-view.js'
import Form from '@lib/form.js'
import Table from '@views/lib/table'

/**
 * A base view for all Latin irregular verb views.
 * It is supposed to serve as a base view only and never created directly.
 * That's why its match filter will always return false.
 */
export default class LatinVerbIrregularVoiceView extends LatinView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'verbConjugationIrregularBase'
    this.name = 'verb-irregular-base'
    this.title = 'Base Verb Conjugation (Irregular)'
  }

  static get viewID () {
    return 'latin_verb_irregular_base_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB]
  }

  static get inflectionType () {
    return Form
  }

  static get voiceEnabledHdwds () {
    return ['fero']
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.moods, this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [ this.features.voices, this.features.moods ]
    features.rows = [this.features.tenses, this.features.numbers, this.features.persons]
    features.columnRowTitles = [this.features.numbers, this.features.persons]
    features.fullWidthRowTitles = [this.features.tenses]
  }

  /**
   * Will always return false because this view serves as base class and is never created directly.
   * @param {symbol} languageID
   * @param {Inflection[]} inflections
   * @return {boolean} Always returns false
   */
  static matchFilter (languageID, inflections) {
    return false
  }

  static enabledForInflection (inflection) {
    return inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection.constraints &&
      inflection.constraints.irregular
  }

  /**
   * Gets inflection data for a homonym. For this view we need to use irregular verb inflections only.
   * @param {Homonym} homonym - A homonym for which inflection data needs to be retrieved
   * @param {Object} options
   * @return {InflectionSet} Resulting inflection set.
   */
  static getInflectionsData (homonym, options) {
    // Select only those inflections that are required for this view
    let inflections = homonym.inflections.filter(
      i => i[Feature.types.part].value === this.mainPartOfSpeech &&
        i.constraints && i.constraints.irregular
    )
    return this.dataset.createInflectionSet(this.mainPartOfSpeech, inflections, options)
  }

  /**
   * Creates an array of linked table views: views, that will be shown below the main table view.
   * @return {View[]} - An array of linked views or an empty array if no linked views can be created.
   */
  createLinkedViews () {
    let views = []
    // we want to restrict the inflections for the linked views to irregular verbs for now because inflections from other verbs seem to corrupt the match data constraints
    // (e.g. sum, which has both an irregular and regular verb and one of the regular verbs has a different, non-matching lemma)
    // this will fail if we want to link tables for irregular and regular verbs together this way
    let inflections = this.homonym.inflections.filter(infl => infl[Feature.types.part].value === this.constructor.mainPartOfSpeech && infl.constraints && infl.constraints.irregular)
    for (let Constructor of this.constructor.linkedViewConstructors) {
      let linkedViewInflections = []
      for (let infl of inflections) {
        let clone = infl.clone()
        clone[Feature.types.part] = clone[Feature.types.part].createFeature(Constructor.mainPartOfSpeech)
        clone = this.constructor.dataset.setInflectionData(clone, infl.lemma)
        linkedViewInflections.push(clone)
      }
      let inflectionData = this.constructor.dataset.createInflectionSet(Constructor.mainPartOfSpeech, linkedViewInflections, { findMorphologyMatches: false })
      if (Constructor.matchFilter(this.homonym.languageID, linkedViewInflections)) {
        let view = new Constructor(this.homonym, inflectionData)
        for (let infl of inflections) {
          infl[Feature.types.part] = infl[Feature.types.part].createFeature(this.constructor.mainPartOfSpeech)
        }
        views.push(view)
      }
    }
    this.linkedViews = views
    return views
  }

  // See base view for description
  static getMatchingInstances (homonym) {
    if (this.matchFilter(homonym.languageID, homonym.inflections)) {
      let inflectionData = this.getInflectionsData(homonym)
      let view = new this(homonym, inflectionData)
      view.createLinkedViews()
      return [view.render()]
    }
    return []
  }
}
