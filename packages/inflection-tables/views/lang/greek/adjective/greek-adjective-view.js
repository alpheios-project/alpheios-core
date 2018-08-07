import { Constants } from 'alpheios-data-models'
import Suffix from '@lib/suffix.js'
import GreekView from '@views/lang/greek/greek-view.js'

export default class GreekAdjectiveView extends GreekView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.id = 'adjectiveDeclension'
    this.name = 'adjective declension'
    this.title = 'Adjective declension'

    this.createTable()
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ADJECTIVE]
  }

  static get inflectionType () {
    return Suffix
  }
}
