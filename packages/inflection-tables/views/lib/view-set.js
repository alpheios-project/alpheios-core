import {Constants} from 'alpheios-data-models'
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
  constructor (inflectionData, locale) {
    this.views = new Map([
      [
        Constants.LANG_LATIN,
        [
          LatinNounView,
          LatinAdjectiveView,
          LatinVoiceConjugationMoodView,
          LatinVoiceMoodConjugationView,
          LatinConjugationVoiceMoodView,
          LatinConjugationMoodVoiceView,
          LatinMoodVoiceConjugationView,
          LatinMoodConjugationVoiceView,
          LatinImperativeView,
          LatinVerbIrregularView,
          LatinVerbParticipleIrregularView,
          LatinSupineView,
          LatinVerbParticipleView,
          LatinInfinitiveView
        ]
      ],
      [
        Constants.LANG_GREEK,
        [
          GreekNounView,
          GreekNounSimplifiedView,
          GreekNumeralView,
          GreekArticleView,
          GreekAdjectiveView,
          GreekAdjectiveSimplifiedView,
          GreekGenderPronounView,
          GreekPersonGenderPronounView,
          GreekPersonPronounView,
          GreekLemmaGenderPronounView,
          GreekParadigmView
        ]
      ]
    ])
    this.inflectionData = inflectionData
    this.languageID = this.inflectionData.languageID
    this.locale = locale
    this.matchingViews = []

    if (this.views.has(this.languageID)) {
      for (let view of this.views.get(this.languageID)) {
        this.matchingViews.push(...view.getMatchingInstances(this.inflectionData, this.messages))
      }
    }
    this.partsOfSpeech = Array.from(new Set(this.matchingViews.map(view => view.constructor.partOfSpeech)))
  }

  get hasMatchingViews () {
    return this.matchingViews.length > 0
  }

  getViews (partOfSpeech = undefined) {
    if (partOfSpeech) {
      return this.matchingViews.filter(view => view.constructor.partOfSpeech === partOfSpeech)
    } else {
      return this.matchingViews
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
}
