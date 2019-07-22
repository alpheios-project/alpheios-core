<template>
  <div class="alpheios-ib">

    <div class="alpheios-ib__lang-cont">
      <div
          :class="{open: !collapsed[constants.LANG_LATIN.toString()]}"
          @click="collapseLanguage(constants.LANG_LATIN)"
          class="alpheios-ib__title alpheios-clickable"
      >
        Latin Inflection Browser
        <span v-show="collapsed[constants.LANG_LATIN.toString()]">[+]</span>
        <span v-show="!collapsed[constants.LANG_LATIN.toString()]">[-]</span>
      </div>
      <div v-show="!collapsed[constants.LANG_LATIN.toString()]">
        <div class="alpheios-ib__pofs-title">Nouns</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_noun_view', title: 'Noun declension' }"
        />
        <div class="alpheios-ib__pofs-title">Adjectives</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_adjective_view', title: 'Adjective declension' }"
        />
        <div class="alpheios-ib__pofs-title">Verbs</div>
        <div class="alpheios-ib__pofs-title-l2">Regular verbs</div>
        <div class="alpheios-ib__pofs-title-l3">Sorted by...</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_conjugation_mood_voice_view', title: 'Conjugation-Mood-Voice' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_conjugation_voice_mood_view', title: 'Conjugation-Voice-Mood' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_mood_conjugation_voice_view', title: 'Mood-Conjugation-Voice' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_mood_voice_conjugation_view', title: 'Mood-Coice-Conjugation' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_voice_conjugation_mood_view', title: 'Voice-Conjugation-Mood' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_voice_mood_conjugation_view', title: 'Voice-Mood-Conjugation' }"
        />
        <div class="alpheios-ib__pofs-title-l3">Other Forms</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_participle_view', title: 'Participle'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_infinitive_view', title: 'Infinitive'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_imperative_view', title: 'Imperative'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_supine_view', title: 'Supine'}"
        />
        <div class="alpheios-ib__pofs-title-l2">Irregular verbs</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'sum', title: 'Sum (esse,fui,futurus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_voice_view', form: 'fero', title: 'Fero (ferre, tuli, latus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'malo', title: 'Malo (malle, malui)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'nolo', title: 'Nolo (nolle, nolui)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'volo', title: 'Volo (velle, volui)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'eo', title: 'Eo (ire, ivi(ii), itus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'absum', title: 'Absum (abesse, afui, afuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'adsum', title: 'Adsum (adesse, adfui, adfuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'dēsum', title: 'Dēsum (dēesse, dēfui, dēfuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'insum', title: 'Insum (inesse, infui, infuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'intersum', title: 'Intersum (interesse, interfui, interfuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'obsum', title: 'Obsum (obesse, obfui, obfuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'possum', title: 'Possum (posse, potui)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'prosum', title: 'Prosum (prodesse, profui, profuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'praesum', title: 'Praesum (praeesse, praefui, praefuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'subsum', title: 'Subsum (subesse, subfui, subfuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'supersum', title: 'Supersum (superesse, superfui, superfuturus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_voice_view', form: 'queo', title: 'Queo (quire, quivi(ii), quitus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'nequeo', title: 'Nequeo (nequire, nequivi(ii), nequitus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_voice_view', form: 'adeo', title: 'Adeo (adire, adivi(ii), aditus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_voice_view', form: 'ineo', title: 'Ineo (inire, inivi(ii), initus)' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_LATIN, viewID: 'latin_verb_irregular_view', form: 'veneo', title: 'Veneo (venire, venivi(ii), venitus)' }"
        />
      </div>
    </div>

    <div class="alpheios-ib__lang-cont">
      <div
          :class="{open: !collapsed[constants.LANG_GREEK.toString()]}"
          @click="collapseLanguage(constants.LANG_GREEK)"
          class="alpheios-ib__title alpheios-clickable"
      >
        Greek Inflection Browser
        <span v-show="collapsed[constants.LANG_GREEK.toString()]">[+]</span>
        <span v-show="!collapsed[constants.LANG_GREEK.toString()]">[-]</span>
      </div>
      <div v-show="!collapsed[constants.LANG_GREEK.toString()]">
        <div class="alpheios-ib__pofs-title">Nouns</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_noun_view', title: 'Noun declension'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_noun_simplified_view', title: 'Noun declension (simplified)'}"
        />
        <div class="alpheios-ib__pofs-title">Adjectives</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_adjective_view', title: 'Adjective declension'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_adjective_simplified_view', title: 'Adjective declension (simplified)'}"
        />
        <div class="alpheios-ib__pofs-title">Pronouns</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_person_pronoun_view', form: 'νώ', title: 'Personal Pronoun Declension' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_person_gender_pronoun_view', form: 'ἡμᾶς', title: 'Reflexive Pronoun Declension' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_gender_pronoun_view', form: 'ἀλλήλᾱ', title: 'Reciprocal Pronoun Declension' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_lemma_gender_pronoun_view', form: 'τούτω', title: 'Demonstrative Pronoun Declension' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_gender_pronoun_view', form: 'οἷς', title: 'Relative Pronoun Declension' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_gender_pronoun_view', form: 'ὥτινε', title: 'General Relative Pronoun Declension' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_gender_pronoun_view', form: 'τίνε', title: 'Interrogative Pronoun Declension' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_gender_pronoun_view', form: 'τινοῖν', title: 'Indefinite Pronoun Declension' }"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_gender_pronoun_view', form: 'αὐτά', title: 'Intensive Pronoun Declension' }"
        />
        <div class="alpheios-ib__pofs-title">Articles</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_article_view', form: 'τοῦ', title: 'Article Declension'}"
        />
        <div class="alpheios-ib__pofs-title">Numerals</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_numeral_view', form: 'δύο', title: 'Numeral Declension'}"
        />
        <div class="alpheios-ib__pofs-title">Verb Paradigms</div>
        <div class="alpheios-ib__pofs-title-l2">ω Verbs</div>
        <div class="alpheios-ib__pofs-title-l3">Regular ω Verbs</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm1', title: 'ω-Verbs: Present System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm2', title: 'ω-Verbs: Present System Middle-Passive'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm3', title: 'Future System (without contraction)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm4', title: 'Future System (Active and Middle) with contraction in -έω'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm5', title: 'Future System (Active) with contraction in -άω'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm6', title: 'Strong (2nd) Aorist System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm7', title: 'Strong (2nd) Aorist System Middle'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm8', title: 'Weak (1st) Aorist System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm9', title: 'Weak (1st) Aorist System Middle'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm10', title: 'Aorist Passive System'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm11', title: 'Perfect Active System'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm12', title: 'Perfect System Middle-Passive: indicative, infinitive, participle'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm13', title: 'Perfect System Middle-Passive: periphrastic subjunctive, optative, imperative'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm14', title: 'Perfect System Middle-Passive: simple subjunctive, optative, imperative'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm15', title: 'Pluperfect Middle-Passive Indicative'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm16', title: 'Future Perfect Indicative, Infinitive, Participle'}"
        />
        <div class="alpheios-ib__pofs-title-l3">Athematic Perfects</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm17', title: 'Athematic Perfects - ἵστημι (in addition to forms from ἕστηκα)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm17b', title: 'Athematic Perfects - θνῄσκω (in addition to forms from τέθνηκα)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm17c', title: 'Athematic Perfects - δέδια (in addition to forms from δέδοικα)'}"
        />
        <div class="alpheios-ib__pofs-title-l3">Present System of Contract Verbs (-εω, -αω, -οω)</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm18', title: 'Present System Active of Contract Verbs in -έω'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm19', title: 'Present System Active of Contract Verbs in -έω (monosyllabic stems)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm20', title: 'Present System Middle-Passive of Contract Verbs in -έω'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm21', title: 'Present System Middle-Passive of Contract Verbs in -έω (monosyllabic stem)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm22', title: 'Present System Active of Contract Verbs in -άω'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm23', title: 'Present System Active of Contract Verbs in -άω (with η contraction)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm24', title: 'Present System Middle-Passive of Contract Verbs in -άω'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm25', title: 'Present System Middle-Passive of Contract Verbs in -άω (with η contraction)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm26', title: 'Present System Active of Contract Verbs in -όω'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm27', title: 'Present System Middle-Passive of Contract Verbs in -όω'}"
        />
        <div class="alpheios-ib__pofs-title-l2">μι Verbs</div>
        <div class="alpheios-ib__pofs-title-l3">τίθημι</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm28', title: 'τίθημι: Present System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm29', title: 'τίθημι: Present System Middle-Passive'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm30', title: 'τίθημι: Aorist System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm31', title: 'τίθημι: Aorist System Middle'}"
        />
        <div class="alpheios-ib__pofs-title-l3">ἵημι</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm32', title: 'ἵημι: Present System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm33', title: 'ἵημι: Present System Middle-Passive'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm34', title: 'ἵημι: Aorist System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm35', title: 'ἵημι: Aorist System Middle'}"
        />
        <div class="alpheios-ib__pofs-title-l3">δίδωμι</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm36', title: 'δίδωμι: Present System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm37', title: 'δίδωμι: Present System Middle-Passive'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm38', title: 'δίδωμι: Aorist System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm39', title: 'δίδωμι: Aorist System Middle'}"
        />
        <div class="alpheios-ib__pofs-title-l3">ἵστημι</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm40', title: 'ἵστημι: Present System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm41', title: 'ἵστημι: Present System Middle-Passive'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm42', title: 'ἵστημι: (Athematic/Intransitive) Aorist System Active'}"
        />
        <div class="alpheios-ib__pofs-title-l3">Other</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm43', title: 'δύναμαι: Present System Middle-Passive'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm43b', title: 'ἐπίσταμαι: Present System Middle-Passive'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm44', title: 'δείκνυμι: Present System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm45', title: 'δείκνυμι: Present System Middle-Passive'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm46', title: 'εἰμί (be): Present System and Future'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm47', title: 'εἶμι (go): Present System'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm48', title: 'φημί: Present System'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm49', title: 'βαίνω: Aorist System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm50', title: 'γιγνώσκω: Aorist System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm51', title: 'ἁλίσκομαι: Aorist System'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm52', title: 'δύω: Aorist System Active'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_paradigm_view', paradigmID : 'verbpdgm53', title: 'οἶδα: Perfect System'}"
        />
        <div class="alpheios-ib__pofs-title-l2">Participles</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm54', title: 'Participles in -ων, -ουσα, -ον (present and future active, uncontracted)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm55', title: 'Participles in -ῶν, -οῦσα, -οῦν (present and future active, ε- and ο-contract)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm56', title: 'Participles in -ῶν, -ῶσα, -ῶν (present and future active, α-contract)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm57', title: 'Participles in -ών, -οῦσα, -όν (strong aorist active; present of εἰμί and εἶμι)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm58', title: 'Participles in -ᾱς, -ᾶσα, -αν (weak aorist active)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm59', title: 'Participles in -άς, -ᾶσα, -άν (μι-verb present and aorist active)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm60', title: 'Participles in -είς, -εῖσα, -έν'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm61', title: 'Participles in -ούς, -οῦσᾰ, -όν (μι-verb active)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm62', title: 'Participles in -ύς, -ῦσᾰ, -ύν (μι-verb active)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm63', title: 'Participles in -ώς, -υῖᾰ, -ός (perfect active)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm64', title: 'Participles in -ώς, -ῶσα, -ός (some athematic perfects)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm65', title: 'Participles in -μενος, -μένη, -μενον (all middle-passive and middle except perfect)'}"
        />
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :standard-form-data="{ langID: constants.LANG_GREEK, viewID: 'greek_verb_participle_paradigm_view', paradigmID : 'verbpdgm66', title: 'Participles in -μένος, -μένη, -μένον (perfect middle-passive)'}"
        />
      </div>
    </div>

  </div>

</template>
<script>
import { Constants } from 'alpheios-data-models'

import WideTable from './inflections-table-wide.vue'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'InflectionStandardForms',
  components: {
    wideTable: WideTable
  },
  storeModules: ['app'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  lexrqStartedUnwatch: null,

  data: function () {
    return {
      // As we cannot reference `Constants` in template during rendering we have to reassign them this way
      constants: {
        LANG_LATIN: Constants.LANG_LATIN,
        LANG_GREEK: Constants.LANG_GREEK
      },
      views: new Map(),
      collapsed: {
        // Vue.js currently cannot track Maps or Symbol props so we have to do it this way:
        [Constants.LANG_LATIN.toString()]: true,
        [Constants.LANG_GREEK.toString()]: true
      },
      htmlElements: {
        content: undefined
      },
      languageId: this.$store.state.app.currentLanguageID,
      inflBrowserTablesCollapsed: true
    }
  },

  watch: {
    languageId: function (newValue, oldValue) {
      if (oldValue) {
        this.collapsed[oldValue.toString()] = true
      }
      if (newValue) {
        this.languageId = newValue
        this.collapsed[newValue.toString()] = false
      }
    }
  },

  methods: {
    collapseLanguage: function (languageID) {
      const language = languageID.toString()
      for (const lang of Object.keys(this.collapsed)) {
        this.collapsed[lang] = (lang === language) ? !this.collapsed[language] : true
      }
    }
  },

  mounted: function () {
    if (this.languageId) {
      // Set a group that will be opened initially
      this.collapsed[this.languageId.toString()] = false
    }
    if (typeof this.$el.querySelector === 'function') {
      this.htmlElements.content = this.$el
    }

    this.$options.lexrqStartedUnwatch = this.$store.watch((state) => state.app.lexicalRequest.startTime, () => {
      this.inflBrowserTablesCollapsed = true
    })
  },

  beforeDestroy () {
    // Teardown the watch function
    this.$options.lexrqStartedUnwatch()
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-ib {
    margin-bottom: textsize(20px);

    .alpheios-inflections__title {
      font-family: var(--alpheios-sans-font-face);
      font-size: var(--alpheios-base-text-size);
      margin: 0 0 textsize(20px) textsize(48px);
    }
  }

  .alpheios-ib__title {
    color: var(--alpheios-inflect-title-color);
    font-size: textsize(24px);
    font-family: var(--alpheios-serif-font-face);
    font-weight: 700;
    margin-bottom: textsize(20px);
    // To have the border under the text only
    display: inline-block;

    &.open {
      border-bottom: textsize(2px) solid var(--alpheios-inflect-title-color);
    }
  }

  .alpheios-ib__pofs-title {
    font-weight: 700;
    font-size: textsize(22px);
    margin-bottom: textsize(10px);
  }

  .alpheios-ib__pofs-title-l2 {
    font-weight: 700;
    margin-left: textsize(16px);
    margin-bottom: textsize(20px);
  }

  .alpheios-ib__pofs-title-l3 {
    font-weight: 700;
    margin-left: textsize(32px);
    margin-bottom: textsize(20px);
  }

</style>
