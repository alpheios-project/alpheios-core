import LexicalQuery from './lexical-query.js'
import Query from './query.js'
import { Constants } from 'alpheios-data-models'

import {LemmaTranslations} from 'alpheios-lemma-client'
import {AlpheiosTuftsAdapter} from 'alpheios-morph-client'
import {Lexicons} from 'alpheios-lexicon-client'

import ResourceOptions from '../options/resource-options'

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

  static createForLookup (textSelector, uiController) {
    let resourceOptions = new ResourceOptions(LexicalQueryLookup.optionSaver, LexicalQueryLookup.optionLoader)

    uiController.updateLanguage(textSelector.languageCode)

    return Query.create(LexicalQueryLookup, textSelector, {
      htmlSelector: LexicalQueryLookup.getDumpHTMLSelector(),
      uiController: uiController,
      maAdapter: new AlpheiosTuftsAdapter(),
      lexicons: Lexicons,

      lemmaTranslations: LemmaTranslations,

      resourceOptions: resourceOptions,
      langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
    })
  }

  /**
   * @optionSaver - it is a dump promise (similiar as in embedded)
   */

  static optionSaver () {
    return new Promise((resolve, reject) => {
      reject(new Error('save not implemented'))
    })
  }

  /**
   * @optionLoader - it is a dump promise (similiar as in embedded)
   */

  static optionLoader () {
    return new Promise((resolve, reject) => {
      reject(new Error('load not implemented'))
    })
  }

  /**
   * @getDumpHTMLSelector - it creates an object with the minimum data for imitating HTMLSelector
   */

  static getDumpHTMLSelector () {
    return {
      targetRect: {
        top: 0,
        left: 0
      }
    }
  }
}
