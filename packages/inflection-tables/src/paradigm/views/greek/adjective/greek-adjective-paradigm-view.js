import { Constants } from 'alpheios-data-models'
import GreekParadigmView from '@/paradigm/views/greek/greek-paradigm-view.js'

export default class GreekAdjectiveParadigmView extends GreekParadigmView {
  static get viewID () {
    return 'greek_adjective_paradigm_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ADJECTIVE]
  }

}
