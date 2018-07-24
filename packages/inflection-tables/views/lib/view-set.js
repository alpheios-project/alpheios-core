import { LanguageModelFactory } from 'alpheios-data-models'
import LanguageDatasetFactory from '../../lib/language-dataset-factory.js'

/**
 * A set of inflection table views that represent all possible forms of inflection data. A new ViewSet instance
 * mast be created for each new inflection data piece.
 */
export default class ViewSet {
  /**
   * @param {Homonym} homonym - Data about inflections we need to build views for
   * @param {string} locale - A locale's IETF language tag (ex. `en-US`)
   */
  constructor (homonym, locale) {
    this.homonym = homonym
    this.languageID = homonym.languageID
    this.dataset = LanguageDatasetFactory.getDataset(homonym.languageID)

    /**
     * Whether inflections are enabled for the homonym's language
     */
    this.enabled = LanguageModelFactory.getLanguageModel(homonym.languageID).canInflect()
    this.inflectionData = null
    this.locale = locale
    this.matchingViews = []
    this.matchingViewsMap = new Map()

    if (this.enabled) {
      // this.inflectionData = LanguageDatasetFactory.getInflectionData(this.homonym)

      for (let lexeme of homonym.lexemes) {
        for (let inflection of lexeme.inflections) {
          // Inflections are grouped by part of speech
          inflection = this.dataset.setInflectionData(inflection, lexeme.lemma)
        }
      }

      // let view = new LatinNounView(homonym, locale)
      // this.matchingViews = [view]
      this.matchingViews.push(...this.constructor.views.reduce(
        (acc, view) => acc.concat(...view.getMatchingInstances(this.homonym, this.messages)), []))
      /* for (const lexeme of this.homonym.lexemes) {
        // TODO: Can we handle combined data better?
        for (const inflection of lexeme.inflections) {
          matchingInstances.push(...this.constructor.views.reduce(
            (acc, view) => acc.concat(...view.getMatchingInstances(inflection, this.inflectionData, this.messages)), []))
        }
      } */
      this.updateMatchingViewsMap(this.matchingViews)
    }
    this.matchingViews.forEach(v => v.render())
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
      let storedInstances = this.matchingViewsMap.get(view.partOfSpeech)
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

  updateMessages (messages) {
    this.messages = messages
    for (let view of this.matchingViews) {
      view.updateMessages(messages)
    }
  }

  setLocale (locale) {
    for (let view of this.matchingViews) {
      view.setLocale(locale)
    }
  }

  static getViewByID (viewID) {
    return this.views.find(v => v.viewID === viewID)
  }

  static getStandardForm (viewID, formID, messages) {
    let view = this.getViewByID(viewID)
    return view ? view.getStandardFormInstance(formID, messages) : null
  }
}
