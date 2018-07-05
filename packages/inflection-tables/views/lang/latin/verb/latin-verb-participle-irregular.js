import { Constants, LanguageModelFactory } from 'alpheios-data-models'
import LatinVerbIrregularView from '@views/lang/latin/verb/latin-verb-irregular.js'
// import GroupFeatureType from '@views/lib/group-feature-type'

export default class LatinVerbParticipleIrregularView extends LatinVerbIrregularView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)

    this.id = 'verbParticipleConjugationIrregular'
    this.name = 'verb-participle-irregular'
    this.title = 'Verb Participle Conjugation (Irregular)'
  }

  static get partOfSpeech () {
    return Constants.POFS_VERB_PARTICIPLE
  }

  static matchFilter (inflectionData) {
    if (LanguageModelFactory.compareLanguages(LatinVerbParticipleIrregularView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(LatinVerbParticipleIrregularView.partOfSpeech) &&
             LatinVerbParticipleIrregularView.enabledForLexemes(inflectionData.homonym.lexemes)
    }
  }
}
