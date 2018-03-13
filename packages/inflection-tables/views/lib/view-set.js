import {Constants} from 'alpheios-data-models'
// Latin views
import LatinNounView from '../lang/latin/noun/latin-noun-view.js'
import LatinAdjectiveView from '../lang/latin/adjective/latin-adjective-view.js'
import LatinVoiceConjugationMoodView from '../lang/latin/verb/latin-voice-conjugation-mood-view.js'
import LatinVoiceMoodConjugationView from '../lang/latin/verb/latin-voice-mood-conjugation-view.js'
import LatinConjugationVoiceMoodView from '../lang/latin/verb/latin-conjugation-voice-mood-view.js'
import LatinConjugationMoodVoiceView from '../lang/latin/verb/latin-conjugation-mood-voice-view.js'
import LatinMoodVoiceConjugationView from '../lang/latin/verb/latin-mood-voice-conjugation-view.js'
import LatinMoodConjugationVoiceView from '../lang/latin/verb/latin-mood-conjugation-voice-view.js'
import LatinImperativeView from '../lang/latin/verb/latin-imperative-view.js'
import LatinSupineView from '../lang/latin/noun/latin-supine-view.js'
import LatinVerbParticipleView from '../lang/latin/verb/latin-verb-participle-view.js'
import LatinInfinitiveView from '../lang/latin/verb/latin-infinitive-view.js'

// Greek views
import GreekNounView from '../lang/greek/noun/greek-noun-view.js'
import GreekNounSimplifiedView from '../lang/greek/noun/greek-noun-simplified-view.js'
import GreekGenderPronounView from '../lang/greek/pronoun/greek-gender-pronoun-view.js'
import GreekLemmaGenderPronounView from '../lang/greek/pronoun/greek-lemma-gender-pronoun-view.js'
import GreekPersonGenderPronounView from '../lang/greek/pronoun/greek-person-gender-pronoun-view.js'
import GreekPersonPronounView from '../lang/greek/pronoun/greek-person-pronoun-view.js'
import GreekParadigmView from '../lang/greek/paradigm/greek-paradigm-view.js'

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
