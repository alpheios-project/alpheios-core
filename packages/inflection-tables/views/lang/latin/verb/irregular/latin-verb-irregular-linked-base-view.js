import LatinVerbIrregularBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-base-view.js'

/**
 * A base view for all Latin irregular verb views which are linked views.
 */
export default class LatinVerbIrregularLinkedBaseView extends LatinVerbIrregularBaseView {
  constructor (homonym, inflectionData) {
    super(homonym, inflectionData)

    this.id = 'verbConjugationIrregularLinkedBase'
    this.name = 'verb-irregular-linked-base'
    this.title = 'Base Verb Linked View (Irregular)'
  }

  static get viewID () {
    return 'latin_verb_irregular_linked_base_view'
  }

  /**
   * Linked views Match Filter
   * @param {symbol} languageID
   * @param {Inflection[]} inflections
   * @return {boolean} Always returns false
   */
  static matchFilterForLink (languageID, inflections) {
    return Boolean(
      this.languageID === languageID &&
      inflections.some(i => this.enabledForLinking(i)))
  }

  static enabledForLinking (inflection) {
    // default behavior is enabled for linking if enabled for viewing
    return this.enabledForInflection(inflection)
  }
}
