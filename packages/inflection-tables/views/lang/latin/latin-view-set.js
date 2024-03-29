import ViewSet from '../../lib/view-set.js'
import LatinNounView from '@views/lang/latin/noun/latin-noun-view.js'
import LatinAdjectiveView from '@views/lang/latin/adjective/latin-adjective-view.js'
import LatinAdjectiveComparativeView from '@views/lang/latin/adjective/latin-comparative-view.js'
import LatinAdjectiveSuperlativeView from '@views/lang/latin/adjective/latin-superlative-view.js'
import LatinVoiceConjugationMoodView from '@views/lang/latin/verb/latin-voice-conjugation-mood-view.js'
import LatinVoiceMoodConjugationView from '@views/lang/latin/verb/latin-voice-mood-conjugation-view.js'
import LatinConjugationVoiceMoodView from '@views/lang/latin/verb/latin-conjugation-voice-mood-view.js'
import LatinConjugationMoodVoiceView from '@views/lang/latin/verb/latin-conjugation-mood-voice-view.js'
import LatinMoodVoiceConjugationView from '@views/lang/latin/verb/latin-mood-voice-conjugation-view.js'
import LatinMoodConjugationVoiceView from '@views/lang/latin/verb/latin-mood-conjugation-voice-view.js'
import LatinImperativeView from '@views/lang/latin/verb/latin-imperative-view.js'
import LatinSupineView from '@views/lang/latin/noun/latin-supine-view.js'
import LatinVerbIrregularView from '@views/lang/latin/verb/irregular/latin-verb-irregular-view.js'
import LatinVerbIrregularVoiceView from '@views/lang/latin/verb/irregular/latin-verb-irregular-voice-view.js'
import LatinVerbParticipleView from '@views/lang/latin/verb/latin-verb-participle-view.js'
import LatinVerbParticipleIrregularView from '@views/lang/latin/verb/irregular/latin-verb-participle-irregular-view.js'
import LatinVerbSupineIrregularView from '@views/lang/latin/verb/irregular/latin-verb-supine-irregular-view.js'
import LatinVerbInfinitiveIrregularView from '@views/lang/latin/verb/irregular/latin-verb-infinitive-irregular-view.js'
import LatinVerbInfinitiveIrregularVoiceView from '@views/lang/latin/verb/irregular/latin-verb-infinitive-irregular-voice-view.js'
import LatinVerbImperativeIrregularView from '@views/lang/latin/verb/irregular/latin-verb-imperative-irregular-view.js'
import LatinVerbImperativeIrregularVoiceView from '@views/lang/latin/verb/irregular/latin-verb-imperative-irregular-voice-view.js'
// import LatinVerbGerundiveIrregularView from '@views/lang/latin/verb/irregular/latin-verb-gerundive-irregular-view.js'
import LatinInfinitiveView from '@views/lang/latin/verb/latin-infinitive-view.js'
export default class LatinViewSet extends ViewSet {
  /**
   * Returns a list of views available within a view set.
   * @return {View[]} A list of views available within the view set.
   */
  static get views () {
    return [
      LatinNounView,
      LatinAdjectiveComparativeView,
      LatinAdjectiveSuperlativeView,
      LatinAdjectiveView,
      LatinVerbParticipleIrregularView,
      LatinVerbParticipleView,
      LatinVerbSupineIrregularView,
      LatinSupineView,
      LatinVerbInfinitiveIrregularView,
      LatinVerbInfinitiveIrregularVoiceView,
      LatinVerbImperativeIrregularView,
      LatinVerbImperativeIrregularVoiceView,
      LatinVerbIrregularView,
      LatinVerbIrregularVoiceView,
      LatinInfinitiveView,
      LatinImperativeView,
      //      LatinVerbGerundiveIrregularView, // Gerundive table is eliminated for now as per discussion in https://github.com/alpheios-project/inflection-tables/issues/76
      LatinVoiceConjugationMoodView,
      LatinVoiceMoodConjugationView,
      LatinConjugationVoiceMoodView,
      LatinConjugationMoodVoiceView,
      LatinMoodVoiceConjugationView,
      LatinMoodConjugationVoiceView
    ]
  }
}
