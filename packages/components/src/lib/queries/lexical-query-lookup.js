import LexicalQuery from './lexical-query.js'
import Query from './query.js'
import { Constants } from 'alpheios-data-models'

import {LemmaTranslations} from 'alpheios-lemma-client'
import {AlpheiosTuftsAdapter} from 'alpheios-morph-client'
import {Lexicons} from 'alpheios-lexicon-client'

import ResourceOptions from '../options/resource-options'

export default class LexicalQueryLookup extends LexicalQuery {
  static createForLookup (textSelector, uiController) {
    let resourceOptions = new ResourceOptions(LexicalQueryLookup.optionSaver, LexicalQueryLookup.optionLoader)
    uiController.updateLanguage(textSelector.languageCode)

    return Query.create(LexicalQuery, textSelector, {
      htmlSelector: {
        targetRect: {
          top: 0,
          left: 0
        }
      },
      uiController: uiController,
      maAdapter: new AlpheiosTuftsAdapter(),
      lexicons: Lexicons,

      lemmaTranslations: LemmaTranslations,

      resourceOptions: resourceOptions,
      langOpts: { [Constants.LANG_PERSIAN]: { lookupMorphLast: true } } // TODO this should be externalized
    })
  }

  static optionSaver () {
    return new Promise((resolve, reject) => {
      reject(new Error('save not implemented'))
    })
  }

  static optionLoader () {
    return new Promise((resolve, reject) => {
      reject(new Error('load not implemented'))
    })
  }
}
