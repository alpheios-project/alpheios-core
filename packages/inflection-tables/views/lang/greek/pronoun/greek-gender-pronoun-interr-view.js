import { Constants } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import GreekGenderPronounView from './greek-gender-pronoun-view.js'

/**
 * Used for several classes of pronouns, see `classes` method for a full list.
 * Produces a table grouped into columns by gender.
 */
export default class GreekGenderPronounInterrogativeView extends GreekGenderPronounView {
  constructor (homonym, inflectionData) {
    const grammarClass = GreekPronounView.getClassesFromInflection(inflectionData.inflections).filter(c => GreekGenderPronounInterrogativeView.classes.includes(c))
    super(homonym, inflectionData, grammarClass[0])

    if (this.isImplemented) {
      this.createTable()
    }
  }

  static get viewID () {
    return 'greek_gender_pronoun_interr_view'
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [
      Constants.CLASS_INTERROGATIVE
    ]
  }

  //  static matchFilter (languageID, inflections) {
  //    return Boolean(
  //      this.languageID === languageID && inflections.some(i => this.enabledForInflection(i))
  //   )
  // }

//  static enabledForInflection (inflection) {
  // default returns true
  //   return inflection.lemma.word === 'τίς'
//  }
}
