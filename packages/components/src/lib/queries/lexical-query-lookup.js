import LexicalQuery from './lexical-query.js'
import { Constants } from 'alpheios-data-models'

import {LemmaTranslations} from 'alpheios-lemma-client'
import {AlpheiosTuftsAdapter} from 'alpheios-morph-client'
import {Lexicons} from 'alpheios-lexicon-client'

import HTMLSelector from '../selection/media/html-selector'

/**
   * It is a subclass of the LexicalQuery class created for lookup component (lookup.vue).
   * It is created for initiating adapters inside it (similiar to embedded)
   */

export default class LexicalQueryLookup extends LexicalQuery {
  /**
   * @createForLookup - it is used for rendering popup/panel with data for the current text
   * @param {TextSelector} textSelector - text selector containg the word for getting data from adapters and showing in the popup/panel
   * @param {UIController} uiController - ui controller for re-rendering popup/panel (passed fro current rendered popup)
   */

  static create (textSelector, uiController, resourceOptions) {
    if (resourceOptions === undefined) {
      resourceOptions = uiController.resourceOptions
    }

    let options = {
      htmlSelector: HTMLSelector.getDumpHTMLSelector(),
      uiController: uiController,
      maAdapter: new AlpheiosTuftsAdapter(),
      lexicons: Lexicons,

      lemmaTranslations: LemmaTranslations,

      resourceOptions: resourceOptions,
      langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
    }
    return LexicalQuery.create(textSelector, options)
  }
}
