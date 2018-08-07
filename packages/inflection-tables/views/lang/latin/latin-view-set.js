import ViewSet from '../../lib/view-set.js'
import LatinNounView from '@views/lang/latin/noun/latin-noun-view.js'
import LatinAdjectiveView from '@views/lang/latin/adjective/latin-adjective-view.js'
import LatinVoiceConjugationMoodView from '@views/lang/latin/verb/latin-voice-conjugation-mood-view.js'
import LatinVoiceMoodConjugationView from '@views/lang/latin/verb/latin-voice-mood-conjugation-view.js'
import LatinConjugationVoiceMoodView from '@views/lang/latin/verb/latin-conjugation-voice-mood-view.js'
import LatinConjugationMoodVoiceView from '@views/lang/latin/verb/latin-conjugation-mood-voice-view.js'
import LatinMoodVoiceConjugationView from '@views/lang/latin/verb/latin-mood-voice-conjugation-view.js'
import LatinMoodConjugationVoiceView from '@views/lang/latin/verb/latin-mood-conjugation-voice-view.js'
import LatinImperativeView from '@views/lang/latin/verb/latin-imperative-view.js'
import LatinSupineView from '@views/lang/latin/noun/latin-supine-view.js'
import LatinVerbIrregularView from '@views/lang/latin/verb/latin-verb-irregular.js'
import LatinVerbIrregularVoiceView from '@views/lang/latin/verb/latin-verb-irregular-voice.js'
import LatinVerbParticipleView from '@views/lang/latin/verb/latin-verb-participle-view.js'
import LatinVerbParticipleIrregularView from '@views/lang/latin/verb/latin-verb-participle-irregular.js'
import LatinInfinitiveView from '@views/lang/latin/verb/latin-infinitive-view.js'
export default class LatinViewSet extends ViewSet {
  /**
   * Returns a list of views available within a view set.
   * @return {View[]} A list of views available within the view set.
   */
  static get views () {
    return [
      LatinNounView,
      LatinAdjectiveView,
      LatinVoiceConjugationMoodView,
      LatinVoiceMoodConjugationView,
      LatinConjugationVoiceMoodView,
      LatinConjugationMoodVoiceView,
      LatinMoodVoiceConjugationView,
      LatinMoodConjugationVoiceView,
      LatinInfinitiveView,
      LatinImperativeView,
      LatinVerbIrregularView,
      LatinVerbIrregularVoiceView,
      LatinVerbParticipleIrregularView,
      LatinSupineView,
      LatinVerbParticipleView
    ]
  }
}
