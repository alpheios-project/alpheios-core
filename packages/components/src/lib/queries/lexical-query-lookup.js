import LexicalQuery from './lexical-query.js'
import { Constants } from 'alpheios-data-models'

import HTMLSelector from '../selection/media/html-selector'

/**
   * It is a subclass of the LexicalQuery class created for lookup component (lookup.vue).
   * It is created for initiating adapters inside it (similiar to embedded)
   */

export default class LexicalQueryLookup extends LexicalQuery {
  /**
   * @createForLookup - it is used for rendering popup/panel with data for the current text
   * @param {TextSelector} textSelector - text selector containing the word for getting data from adapters and showing in the popup/panel
   * @param resourceOptions
   * @param {symbol} lemmaTranslationLang - A language ID, such as Constants.LANG_LATIN.
   * @param {String} clientId - api client identifier
   */

  static create (textSelector, resourceOptions, lemmaTranslationLang, wordUsageExamples, clientId, verboseMode) {
    // Check to see if Lemma Translations should be enabled for a query
    // Experimental
    let lemmaTranslations
    if (textSelector.languageID === Constants.LANG_LATIN && lemmaTranslationLang) {
      lemmaTranslations = { locale: lemmaTranslationLang }
    }
    const options = {
      htmlSelector: HTMLSelector.getDumpHTMLSelector(),

      clientId: clientId,

      verboseMode: verboseMode,

      lemmaTranslations: lemmaTranslations,

      wordUsageExamples: wordUsageExamples,

      resourceOptions: resourceOptions,
      langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
    }
    return LexicalQuery.create(textSelector, options)
  }
}
