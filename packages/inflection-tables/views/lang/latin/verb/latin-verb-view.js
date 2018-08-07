import { Constants } from 'alpheios-data-models'
import LatinView from '../latin-view.js'

export default class LatinVerbView extends LatinView {
  static get partsOfSpeech () {
    return [Constants.POFS_VERB]
  }
}
