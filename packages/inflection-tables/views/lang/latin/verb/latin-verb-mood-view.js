import Suffix from '../../../../lib/suffix.js'
import LatinVerbView from './latin-verb-view.js'

export default class LatinVerbMoodView extends LatinVerbView {
  static get inflectionType () {
    return Suffix
  }
}
