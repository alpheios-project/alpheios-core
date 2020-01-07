import { LanguageModelFactory } from 'alpheios-data-models'
import LanguageDatasetFactory from '../../lib/language-dataset-factory.js'

/**
 * A set of inflection table views that represent all possible forms of inflection data. A new ViewSet instance
 * mast be created for each new inflection data piece.
 */
export default class ViewSet {
  /**
   * @param {Homonym} homonym - Data about inflections we need to build views for
   */
  constructor (homonym = undefined) {
    this.homonym = homonym
    this.matchingViews = []
    this.matchingViewsMap = new Map()
    this.inflectionData = null
    this.enabled = false

    if (this.homonym) {
      this.languageID = homonym.languageID
      this.datasets = LanguageDatasetFactory.getDatasets(homonym.languageID)

      /**
       * Whether inflections are enabled for the homonym's language
       */
      this.enabled = LanguageModelFactory.getLanguageModel(homonym.languageID).canInflect()

      if (this.enabled) {
        for (const lexeme of homonym.lexemes) {
          for (const inflection of lexeme.inflections) {
            // Inflections are grouped by part of speech
            // inflection = this.dataset.setInflectionData(inflection, lexeme.lemma)
            this.datasets.forEach(dataset => {
              dataset.setInflectionData(inflection, lexeme.lemma)
            })
          }
        }

        this.matchingViews.push(...this.constructor.views.reduce(
          (acc, view) => acc.concat(...view.getMatchingInstances(this.homonym)), []))
        this.updateMatchingViewsMap(this.matchingViews)
      }
    }
  }

  /**
   * Returns a list of views available within a view set. Should be redefined in descendant classes.
   * @return {View[]} A list of views available within the view set.
   */
  static get views () {
    return []
  }

  get partsOfSpeech () {
    return Array.from(this.matchingViewsMap.keys())
  }

  get hasMatchingViews () {
    return this.matchingViewsMap.size > 0
  }

  updateMatchingViewsMap (views) {
    for (const view of views) {
      if (!this.matchingViewsMap.has(view.partOfSpeech)) {
        this.matchingViewsMap.set(view.partOfSpeech, [])
      }
      let storedInstances = this.matchingViewsMap.get(view.partOfSpeech) // eslint-disable-line prefer-const
      // Filter out instances that are already stored in a view set
      const isNew = !storedInstances.find(v => v.sameAs(view))
      if (isNew) {
        storedInstances.push(view)
      }
    }
  }

  /**
   * Returns all matching views available, or matching views available only for a particular part of speech.
   * Views are sorted according to sorting rules defined for each part of speech.
   * Each view might have linked views specified within a view class. Those view will be added after
   * an original view
   * @param {string | undefined} partOfSpeech - A part of speech for which views should be returned.
   * If not specify, will result in views returned for all parts of speech available for ViewSet's inflection data.
   * @return {View[]}
   */
  getViews (partOfSpeech = undefined) {
    if (partOfSpeech) {
      // Return views for a particular part of speech
      return this.matchingViewsMap.has(partOfSpeech) ? this.matchingViewsMap.get(partOfSpeech) : []
    } else {
      // Return all matching views
      return Array.from(this.matchingViewsMap.values()).reduce((acc, views) => acc.concat(...views), [])
    }
  }

  static getViewByID (viewID) {
    return this.views.find(v => v.viewID === viewID)
  }

  static getStandardForm (options) {
    if (!options || !options.viewID) {
      throw new Error(`Obligatory options property, "viewID", is missing`)
    }
    const view = this.getViewByID(options.viewID)
    return view ? view.getStandardFormInstance(options) : null
  }
}
