import { Constants } from '@alpheios-core/data-models'
import GreekParadigmView from '@/paradigm/views/greek/greek-paradigm-view.js'

export default class GreekNounParadigmView extends GreekParadigmView {
  static get viewID () {
    return 'greek_noun_paradigm_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_NOUN]
  }

}
