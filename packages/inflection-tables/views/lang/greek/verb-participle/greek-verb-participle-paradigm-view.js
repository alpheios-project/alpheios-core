import { Constants } from 'alpheios-data-models'
import GreekVerbParadigmView from '../verb/greek-verb-paradigm-view.js'

export default class GreekVerbParticipleParadigmView extends GreekVerbParadigmView {
  static get viewID () {
    return 'greek_verb_participle_paradigm_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB_PARTICIPLE]
  }
}
