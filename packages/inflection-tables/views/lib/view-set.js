import {Constants} from 'alpheios-data-models'
import { LanguageModelFactory } from 'alpheios-data-models'
import LanguageDatasetFactory from '../../lib/language-dataset-factory.js'
// Latin views
import LatinNounView from '@views/lang/latin/noun/latin-noun-view.js'
import LatinAdjectiveView from '@views/lang/latin/adjective/latin-adjective-view.js'
import LatinVoiceConjugationMoodView from '@views/lang/latin/verb/latin-voice-conjugation-mood-view.js'
import LatinVoiceMoodConjugationView from '@views/lang/latin/verb/latin-voice-mood-conjugation-view.js'
import LatinConjugationVoiceMoodView from '@views/lang/latin/verb/latin-conjugation-voice-mood-view.js'
import LatinConjugationMoodVoiceView from '@views/lang/latin/verb/latin-conjugation-mood-voice-view.js'
import LatinMoodVoiceConjugationView from '@views/lang/latin/verb/latin-mood-voice-conjugation-view.js'
import LatinMoodConjugationVoiceView from '@views/lang/latin/verb/latin-mood-conjugation-voice-view.js'
import LatinImperativeView from '@views/lang/latin/verb/latin-imperative-view.js'

import LatinVerbIrregularView from '@views/lang/latin/verb/latin-verb-irregular.js'
import LatinVerbParticipleIrregularView from '@views/lang/latin/verb/latin-verb-participle-irregular.js'

import LatinSupineView from '@views/lang/latin/noun/latin-supine-view.js'
import LatinVerbParticipleView from '@views/lang/latin/verb/latin-verb-participle-view.js'
import LatinInfinitiveView from '@views/lang/latin/verb/latin-infinitive-view.js'

// Greek views
import GreekNounView from '@views/lang/greek/noun/greek-noun-view.js'
import GreekNounSimplifiedView from '@views/lang/greek/noun/greek-noun-simplified-view.js'

import GreekNumeralView from '@views/lang/greek/numeral/greek-numeral-view.js'

import GreekArticleView from '@views/lang/greek/article/greek-article-view.js'

import GreekAdjectiveView from '@views/lang/greek/adjective/greek-adjective-view.js'
import GreekAdjectiveSimplifiedView from '@views/lang/greek/adjective/greek-adjective-simplified-view.js'

import GreekGenderPronounView from '@views/lang/greek/pronoun/greek-gender-pronoun-view.js'
import GreekLemmaGenderPronounView from '@views/lang/greek/pronoun/greek-lemma-gender-pronoun-view.js'
import GreekPersonGenderPronounView from '@views/lang/greek/pronoun/greek-person-gender-pronoun-view.js'
import GreekPersonPronounView from '@views/lang/greek/pronoun/greek-person-pronoun-view.js'
import GreekParadigmView from '@views/lang/greek/paradigm/greek-paradigm-view.js'

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
