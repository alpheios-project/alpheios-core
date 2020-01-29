import { Constants } from 'alpheios-data-models'
import Paradigm from '@/paradigm/lib/paradigm.js'

// Verb paradigm tables
import paradigm01 from '@/paradigm/data/greek/verb/tables/paradigm-01.json'
import paradigm02 from '@/paradigm/data/greek/verb/tables/paradigm-02.json'
import paradigm03 from '@/paradigm/data/greek/verb/tables/paradigm-03.json'
import paradigm04 from '@/paradigm/data/greek/verb/tables/paradigm-04.json'
import paradigm05 from '@/paradigm/data/greek/verb/tables/paradigm-05.json'
import paradigm06 from '@/paradigm/data/greek/verb/tables/paradigm-06.json'
import paradigm07 from '@/paradigm/data/greek/verb/tables/paradigm-07.json'
import paradigm08 from '@/paradigm/data/greek/verb/tables/paradigm-08.json'
import paradigm09 from '@/paradigm/data/greek/verb/tables/paradigm-09.json'
import paradigm10 from '@/paradigm/data/greek/verb/tables/paradigm-10.json'
import paradigm11 from '@/paradigm/data/greek/verb/tables/paradigm-11.json'
import paradigm12 from '@/paradigm/data/greek/verb/tables/paradigm-12.json'
import paradigm13 from '@/paradigm/data/greek/verb/tables/paradigm-13.json'
import paradigm14 from '@/paradigm/data/greek/verb/tables/paradigm-14.json'
import paradigm15 from '@/paradigm/data/greek/verb/tables/paradigm-15.json'
import paradigm16 from '@/paradigm/data/greek/verb/tables/paradigm-16.json'
import paradigm17 from '@/paradigm/data/greek/verb/tables/paradigm-17.json'
import paradigm17b from '@/paradigm/data/greek/verb/tables/paradigm-17b.json'
import paradigm17c from '@/paradigm/data/greek/verb/tables/paradigm-17c.json'
import paradigm18 from '@/paradigm/data/greek/verb/tables/paradigm-18.json'
import paradigm19 from '@/paradigm/data/greek/verb/tables/paradigm-19.json'
import paradigm20 from '@/paradigm/data/greek/verb/tables/paradigm-20.json'
import paradigm21 from '@/paradigm/data/greek/verb/tables/paradigm-21.json'
import paradigm22 from '@/paradigm/data/greek/verb/tables/paradigm-22.json'
import paradigm23 from '@/paradigm/data/greek/verb/tables/paradigm-23.json'
import paradigm24 from '@/paradigm/data/greek/verb/tables/paradigm-24.json'
import paradigm25 from '@/paradigm/data/greek/verb/tables/paradigm-25.json'
import paradigm26 from '@/paradigm/data/greek/verb/tables/paradigm-26.json'
import paradigm27 from '@/paradigm/data/greek/verb/tables/paradigm-27.json'
import paradigm28 from '@/paradigm/data/greek/verb/tables/paradigm-28.json'
import paradigm29 from '@/paradigm/data/greek/verb/tables/paradigm-29.json'
import paradigm30 from '@/paradigm/data/greek/verb/tables/paradigm-30.json'
import paradigm31 from '@/paradigm/data/greek/verb/tables/paradigm-31.json'
import paradigm32 from '@/paradigm/data/greek/verb/tables/paradigm-32.json'
import paradigm33 from '@/paradigm/data/greek/verb/tables/paradigm-33.json'
import paradigm34 from '@/paradigm/data/greek/verb/tables/paradigm-34.json'
import paradigm35 from '@/paradigm/data/greek/verb/tables/paradigm-35.json'
import paradigm36 from '@/paradigm/data/greek/verb/tables/paradigm-36.json'
import paradigm37 from '@/paradigm/data/greek/verb/tables/paradigm-37.json'
import paradigm38 from '@/paradigm/data/greek/verb/tables/paradigm-38.json'
import paradigm39 from '@/paradigm/data/greek/verb/tables/paradigm-39.json'
import paradigm40 from '@/paradigm/data/greek/verb/tables/paradigm-40.json'
import paradigm41 from '@/paradigm/data/greek/verb/tables/paradigm-41.json'
import paradigm42 from '@/paradigm/data/greek/verb/tables/paradigm-42.json'
import paradigm43 from '@/paradigm/data/greek/verb/tables/paradigm-43.json'
import paradigm43b from '@/paradigm/data/greek/verb/tables/paradigm-43b.json'
import paradigm44 from '@/paradigm/data/greek/verb/tables/paradigm-44.json'
import paradigm45 from '@/paradigm/data/greek/verb/tables/paradigm-45.json'
import paradigm46 from '@/paradigm/data/greek/verb/tables/paradigm-46.json'
import paradigm47 from '@/paradigm/data/greek/verb/tables/paradigm-47.json'
import paradigm48 from '@/paradigm/data/greek/verb/tables/paradigm-48.json'
import paradigm49 from '@/paradigm/data/greek/verb/tables/paradigm-49.json'
import paradigm50 from '@/paradigm/data/greek/verb/tables/paradigm-50.json'
import paradigm51 from '@/paradigm/data/greek/verb/tables/paradigm-51.json'
import paradigm52 from '@/paradigm/data/greek/verb/tables/paradigm-52.json'
import paradigm53 from '@/paradigm/data/greek/verb/tables/paradigm-53.json'
// Verb paradigm rules and footnotes
import verbParadigmRulesCSV from '@/paradigm/data/greek/verb/rules.csv'
import verbParadigmFootnotesCSV from '@/paradigm/data/greek/verb/footnotes.csv'

// Verb participle paradigm tables
import paradigm54 from '@/paradigm/data/greek/verb-participle/tables/paradigm-54.json'
import paradigm55 from '@/paradigm/data/greek/verb-participle/tables/paradigm-55.json'
import paradigm56 from '@/paradigm/data/greek/verb-participle/tables/paradigm-56.json'
import paradigm57 from '@/paradigm/data/greek/verb-participle/tables/paradigm-57.json'
import paradigm58 from '@/paradigm/data/greek/verb-participle/tables/paradigm-58.json'
import paradigm59 from '@/paradigm/data/greek/verb-participle/tables/paradigm-59.json'
import paradigm60 from '@/paradigm/data/greek/verb-participle/tables/paradigm-60.json'
import paradigm61 from '@/paradigm/data/greek/verb-participle/tables/paradigm-61.json'
import paradigm62 from '@/paradigm/data/greek/verb-participle/tables/paradigm-62.json'
import paradigm63 from '@/paradigm/data/greek/verb-participle/tables/paradigm-63.json'
import paradigm64 from '@/paradigm/data/greek/verb-participle/tables/paradigm-64.json'
import paradigm65 from '@/paradigm/data/greek/verb-participle/tables/paradigm-65.json'
import paradigm66 from '@/paradigm/data/greek/verb-participle/tables/paradigm-66.json'
// Verb participle rules
import verbParticipleParadigmRulesCSV from '@/paradigm/data/greek/verb-participle/rules.csv'

// Noun paradigm tables
import paradigmNoun1 from '@/paradigm/data/greek/noun/tables/paradigm-noun-1.json'
import paradigmNoun2 from '@/paradigm/data/greek/noun/tables/paradigm-noun-2.json'
import paradigmNoun3 from '@/paradigm/data/greek/noun/tables/paradigm-noun-3.json'
import paradigmNoun4 from '@/paradigm/data/greek/noun/tables/paradigm-noun-4.json'
import paradigmNoun5 from '@/paradigm/data/greek/noun/tables/paradigm-noun-5.json'
import paradigmNoun6 from '@/paradigm/data/greek/noun/tables/paradigm-noun-6.json'
import paradigmNoun7 from '@/paradigm/data/greek/noun/tables/paradigm-noun-7.json'
import paradigmNoun8 from '@/paradigm/data/greek/noun/tables/paradigm-noun-8.json'
import paradigmNoun9 from '@/paradigm/data/greek/noun/tables/paradigm-noun-9.json'
import paradigmNoun10 from '@/paradigm/data/greek/noun/tables/paradigm-noun-10.json'
import paradigmNoun11 from '@/paradigm/data/greek/noun/tables/paradigm-noun-11.json'
import paradigmNoun12 from '@/paradigm/data/greek/noun/tables/paradigm-noun-12.json'
import paradigmNoun13 from '@/paradigm/data/greek/noun/tables/paradigm-noun-13.json'
import paradigmNoun14 from '@/paradigm/data/greek/noun/tables/paradigm-noun-14.json'
import paradigmNoun15 from '@/paradigm/data/greek/noun/tables/paradigm-noun-15.json'
import paradigmNoun16 from '@/paradigm/data/greek/noun/tables/paradigm-noun-16.json'
import paradigmNoun17 from '@/paradigm/data/greek/noun/tables/paradigm-noun-17.json'
import paradigmNoun18 from '@/paradigm/data/greek/noun/tables/paradigm-noun-18.json'

// Noun rules
import nounParadigmRulesCSV from '@/paradigm/data/greek/noun/rules.csv'



export default class GreekParadigmData {
  static get languageID () {
    return Constants.LANG_GREEK
  }

  static get verbParadigmTables () {
    const partOfSpeech = Constants.POFS_VERB
    return new Map([
        ['verbpdgm1', new Paradigm(this.languageID, partOfSpeech, paradigm01)],
        ['verbpdgm2', new Paradigm(this.languageID, partOfSpeech, paradigm02)],
        ['verbpdgm3', new Paradigm(this.languageID, partOfSpeech, paradigm03)],
        ['verbpdgm4', new Paradigm(this.languageID, partOfSpeech, paradigm04)],
        ['verbpdgm5', new Paradigm(this.languageID, partOfSpeech, paradigm05)],
        ['verbpdgm6', new Paradigm(this.languageID, partOfSpeech, paradigm06)],
        ['verbpdgm7', new Paradigm(this.languageID, partOfSpeech, paradigm07)],
        ['verbpdgm8', new Paradigm(this.languageID, partOfSpeech, paradigm08)],
        ['verbpdgm9', new Paradigm(this.languageID, partOfSpeech, paradigm09)],
        ['verbpdgm10', new Paradigm(this.languageID, partOfSpeech, paradigm10)],
        ['verbpdgm11', new Paradigm(this.languageID, partOfSpeech, paradigm11)],
        ['verbpdgm12', new Paradigm(this.languageID, partOfSpeech, paradigm12)],
        ['verbpdgm13', new Paradigm(this.languageID, partOfSpeech, paradigm13)],
        ['verbpdgm14', new Paradigm(this.languageID, partOfSpeech, paradigm14)],
        ['verbpdgm15', new Paradigm(this.languageID, partOfSpeech, paradigm15)],
        ['verbpdgm16', new Paradigm(this.languageID, partOfSpeech, paradigm16)],
        ['verbpdgm17', new Paradigm(this.languageID, partOfSpeech, paradigm17)],
        ['verbpdgm17b', new Paradigm(this.languageID, partOfSpeech, paradigm17b)],
        ['verbpdgm17c', new Paradigm(this.languageID, partOfSpeech, paradigm17c)],
        ['verbpdgm18', new Paradigm(this.languageID, partOfSpeech, paradigm18)],
        ['verbpdgm19', new Paradigm(this.languageID, partOfSpeech, paradigm19)],
        ['verbpdgm20', new Paradigm(this.languageID, partOfSpeech, paradigm20)],
        ['verbpdgm21', new Paradigm(this.languageID, partOfSpeech, paradigm21)],
        ['verbpdgm22', new Paradigm(this.languageID, partOfSpeech, paradigm22)],
        ['verbpdgm23', new Paradigm(this.languageID, partOfSpeech, paradigm23)],
        ['verbpdgm24', new Paradigm(this.languageID, partOfSpeech, paradigm24)],
        ['verbpdgm25', new Paradigm(this.languageID, partOfSpeech, paradigm25)],
        ['verbpdgm26', new Paradigm(this.languageID, partOfSpeech, paradigm26)],
        ['verbpdgm27', new Paradigm(this.languageID, partOfSpeech, paradigm27)],
        ['verbpdgm28', new Paradigm(this.languageID, partOfSpeech, paradigm28)],
        ['verbpdgm29', new Paradigm(this.languageID, partOfSpeech, paradigm29)],
        ['verbpdgm30', new Paradigm(this.languageID, partOfSpeech, paradigm30)],
        ['verbpdgm31', new Paradigm(this.languageID, partOfSpeech, paradigm31)],
        ['verbpdgm32', new Paradigm(this.languageID, partOfSpeech, paradigm32)],
        ['verbpdgm33', new Paradigm(this.languageID, partOfSpeech, paradigm33)],
        ['verbpdgm34', new Paradigm(this.languageID, partOfSpeech, paradigm34)],
        ['verbpdgm35', new Paradigm(this.languageID, partOfSpeech, paradigm35)],
        ['verbpdgm36', new Paradigm(this.languageID, partOfSpeech, paradigm36)],
        ['verbpdgm37', new Paradigm(this.languageID, partOfSpeech, paradigm37)],
        ['verbpdgm38', new Paradigm(this.languageID, partOfSpeech, paradigm38)],
        ['verbpdgm39', new Paradigm(this.languageID, partOfSpeech, paradigm39)],
        ['verbpdgm40', new Paradigm(this.languageID, partOfSpeech, paradigm40)],
        ['verbpdgm41', new Paradigm(this.languageID, partOfSpeech, paradigm41)],
        ['verbpdgm42', new Paradigm(this.languageID, partOfSpeech, paradigm42)],
        ['verbpdgm43', new Paradigm(this.languageID, partOfSpeech, paradigm43)],
        ['verbpdgm43b', new Paradigm(this.languageID, partOfSpeech, paradigm43b)],
        ['verbpdgm44', new Paradigm(this.languageID, partOfSpeech, paradigm44)],
        ['verbpdgm45', new Paradigm(this.languageID, partOfSpeech, paradigm45)],
        ['verbpdgm46', new Paradigm(this.languageID, partOfSpeech, paradigm46)],
        ['verbpdgm47', new Paradigm(this.languageID, partOfSpeech, paradigm47)],
        ['verbpdgm48', new Paradigm(this.languageID, partOfSpeech, paradigm48)],
        ['verbpdgm49', new Paradigm(this.languageID, partOfSpeech, paradigm49)],
        ['verbpdgm50', new Paradigm(this.languageID, partOfSpeech, paradigm50)],
        ['verbpdgm51', new Paradigm(this.languageID, partOfSpeech, paradigm51)],
        ['verbpdgm52', new Paradigm(this.languageID, partOfSpeech, paradigm52)],
        ['verbpdgm53', new Paradigm(this.languageID, partOfSpeech, paradigm53)]
    ])
  }

  static get verbParadigmRules () {
    return verbParadigmRulesCSV
  }

  static get verbParadigmFootnotes () {
    return verbParadigmFootnotesCSV
  }

  static get verbParticipleParadigmTables () {
    const partOfSpeech = Constants.POFS_VERB_PARTICIPLE
    return new Map([
        ['verbpdgm54', new Paradigm(this.languageID, partOfSpeech, paradigm54)],
        ['verbpdgm55', new Paradigm(this.languageID, partOfSpeech, paradigm55)],
        ['verbpdgm56', new Paradigm(this.languageID, partOfSpeech, paradigm56)],
        ['verbpdgm57', new Paradigm(this.languageID, partOfSpeech, paradigm57)],
        ['verbpdgm58', new Paradigm(this.languageID, partOfSpeech, paradigm58)],
        ['verbpdgm59', new Paradigm(this.languageID, partOfSpeech, paradigm59)],
        ['verbpdgm60', new Paradigm(this.languageID, partOfSpeech, paradigm60)],
        ['verbpdgm61', new Paradigm(this.languageID, partOfSpeech, paradigm61)],
        ['verbpdgm62', new Paradigm(this.languageID, partOfSpeech, paradigm62)],
        ['verbpdgm63', new Paradigm(this.languageID, partOfSpeech, paradigm63)],
        ['verbpdgm64', new Paradigm(this.languageID, partOfSpeech, paradigm64)],
        ['verbpdgm65', new Paradigm(this.languageID, partOfSpeech, paradigm65)],
        ['verbpdgm66', new Paradigm(this.languageID, partOfSpeech, paradigm66)]
    ])
  }

  static get verbParticipleParadigmRules () {
    return verbParticipleParadigmRulesCSV
  }

  static get nounParadigmTables () {
    const partOfSpeech = Constants.POFS_NOUN
    return new Map([
        ['nounpdgm1', new Paradigm(this.languageID, partOfSpeech, paradigmNoun1)],
        ['nounpdgm2', new Paradigm(this.languageID, partOfSpeech, paradigmNoun2)],
        ['nounpdgm3', new Paradigm(this.languageID, partOfSpeech, paradigmNoun3)],
        ['nounpdgm4', new Paradigm(this.languageID, partOfSpeech, paradigmNoun4)],
        ['nounpdgm5', new Paradigm(this.languageID, partOfSpeech, paradigmNoun5)],
        ['nounpdgm6', new Paradigm(this.languageID, partOfSpeech, paradigmNoun6)],
        ['nounpdgm7', new Paradigm(this.languageID, partOfSpeech, paradigmNoun7)],
        ['nounpdgm8', new Paradigm(this.languageID, partOfSpeech, paradigmNoun8)],
        ['nounpdgm9', new Paradigm(this.languageID, partOfSpeech, paradigmNoun9)],
        ['nounpdgm10', new Paradigm(this.languageID, partOfSpeech, paradigmNoun10)],
        ['nounpdgm11', new Paradigm(this.languageID, partOfSpeech, paradigmNoun11)],
        ['nounpdgm12', new Paradigm(this.languageID, partOfSpeech, paradigmNoun12)],
        ['nounpdgm13', new Paradigm(this.languageID, partOfSpeech, paradigmNoun13)],
        ['nounpdgm14', new Paradigm(this.languageID, partOfSpeech, paradigmNoun14)],
        ['nounpdgm15', new Paradigm(this.languageID, partOfSpeech, paradigmNoun15)],
        ['nounpdgm16', new Paradigm(this.languageID, partOfSpeech, paradigmNoun16)],
        ['nounpdgm17', new Paradigm(this.languageID, partOfSpeech, paradigmNoun17)],
        ['nounpdgm18', new Paradigm(this.languageID, partOfSpeech, paradigmNoun18)]
    ])
  }

  static get nounParadigmRules () {
    return nounParadigmRulesCSV
  }
}