import ViewSet from '../../lib/view-set.js'

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
import GreekVerbParadigmView from '@/paradigm/views/greek/verb/greek-verb-paradigm-view.js'
import GreekVerbParticipleParadigmView from '@/paradigm/views/greek/verb-participle/greek-verb-participle-paradigm-view.js'
import GreekNounParadigmView from '@/paradigm/views/greek/noun/greek-noun-paradigm-view.js'
import GreekAdjectiveParadigmView from '@/paradigm/views/greek/adjective/greek-adjective-paradigm-view.js'

export default class GreekViewSet extends ViewSet {
  /**
   * Returns a list of views available within a view set.
   * @return {View[]} A list of views available within the view set.
   */
  static get views () {
    return [
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
      GreekVerbParadigmView,
      GreekVerbParticipleParadigmView,
      GreekNounParadigmView,
      GreekNounParadigmView,
      GreekAdjectiveParadigmView
    ]
  }
}
