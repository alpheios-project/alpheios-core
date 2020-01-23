import { Constants } from 'alpheios-data-models'
import GreekVerbParadigmView from '@/paradigm/views/greek/verb/greek-verb-paradigm-view.js'

export default class GreekNounParadigmView extends GreekVerbParadigmView {
  static get viewID () {
    return 'greek_noun_paradigm_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_NOUN]
  }

}
