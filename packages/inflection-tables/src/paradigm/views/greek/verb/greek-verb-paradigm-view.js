import { Constants } from 'alpheios-data-models'
import GreekParadigmView from '@/paradigm/views/greek/greek-paradigm-view.js'

export default class GreekVerbParadigmView extends GreekParadigmView {
  static get viewID () {
    return 'greek_verb_paradigm_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB]
  }
}
