import { Constants } from 'alpheios-data-models'
import Form from '../../../../lib/form.js'
import GreekView from '../greek-view.js'
import Table from '../../../lib/table'

export default class GreekArticleView extends GreekView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'articleDeclension'
    this.name = 'article declension'
    this.title = 'Article Declension'

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'greek_article_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ARTICLE]
  }

  static get inflectionType () {
    return Form
  }

  createTable () {
    this.table = new Table([this.features.genders, this.features.types, this.features.numbers, this.features.cases])
    let features = this.table.features // eslint-disable-line prefer-const
    features.columns = [this.features.genders]

    features.rows = [this.features.numbers, this.features.cases]
    features.columnRowTitles = [this.features.cases]
    features.fullWidthRowTitles = [this.features.numbers]
  }
}
