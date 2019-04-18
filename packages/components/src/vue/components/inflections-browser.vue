<template>
  <div class="alpheios-ib">

    <div class="alpheios-ib__lang-cont">
      <div
          @click="collapseLanguage(constants.LANG_LATIN)"
          class="alpheios-ib__title alpheios-clickable"
          :class="{open: !collapsed[constants.LANG_LATIN.toString()]}"
      >
        Latin Inflection Browser
        <span v-show="collapsed[constants.LANG_LATIN.toString()]">[+]</span>
        <span v-show="!collapsed[constants.LANG_LATIN.toString()]">[-]</span>
      </div>
      <div v-show="!collapsed[constants.LANG_LATIN.toString()]">
        <div class="alpheios-ib__pofs-title">Nouns</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="latinInflView({ viewID: 'latin_noun_view' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title">Adjectives</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="latinInflView({ viewID: 'latin_adjective_view'})"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title">Verbs</div>
        <div class="alpheios-ib__pofs-title-l2">Regular verbs</div>
        <div class="alpheios-ib__pofs-title-l3">Sorted by...</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_conjugation_mood_voice_view', title: 'Conjugation-Mood-Voice' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_conjugation_voice_mood_view', title: 'Conjugation-Voice-Mood' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_mood_conjugation_voice_view', title: 'Mood-Conjugation-Voice' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_mood_voice_conjugation_view', title: 'Mood-Coice-Conjugation' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_voice_conjugation_mood_view', title: 'Voice-Conjugation-Mood' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_voice_mood_conjugation_view', title: 'Voice-Mood-Conjugation' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l3">Other Forms</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="latinInflView({ viewID: 'latin_verb_participle_view'})"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="latinInflView({ viewID: 'latin_infinitive_view'})"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="latinInflView({ viewID: 'latin_imperative_view'})"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="latinInflView({ viewID: 'latin_supine_view'})"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l2">Irregular verbs</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'sum', title: 'Sum (esse,fui,futurus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_voice_view', form: 'fero', title: 'Fero (ferre, tuli, latus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'malo', title: 'Malo (malle, malui)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'nolo', title: 'Nolo (nolle, nolui)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'volo', title: 'Volo (velle, volui)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'eo', title: 'Eo (ire, ivi(ii), itus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'absum', title: 'Absum (abesse, afui, afuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'adsum', title: 'Adsum (adesse, adfui, adfuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'dēsum', title: 'Dēsum (dēesse, dēfui, dēfuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'insum', title: 'Insum (inesse, infui, infuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'intersum', title: 'Intersum (interesse, interfui, interfuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'obsum', title: 'Obsum (obesse, obfui, obfuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'possum', title: 'Possum (posse, potui)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'prosum', title: 'Prosum (prodesse, profui, profuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'praesum', title: 'Praesum (praeesse, praefui, praefuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'subsum', title: 'Subsum (subesse, subfui, subfuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'supersum', title: 'Supersum (superesse, superfui, superfuturus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_voice_view', form: 'queo', title: 'Queo (quire, quivi(ii), quitus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'nequeo', title: 'Nequeo (nequire, nequivi(ii), nequitus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_voice_view', form: 'adeo', title: 'Adeo (adire, adivi(ii), aditus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_voice_view', form: 'ineo', title: 'Ineo (inire, inivi(ii), initus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'veneo', title: 'Veneo (venire, venivi(ii), venitus)' })"
            @widthchange="inflTableWidthUpd"></wide-table>
      </div>
    </div>

    <div class="alpheios-ib__lang-cont">
      <div
          @click="collapseLanguage(constants.LANG_GREEK)"
          class="alpheios-ib__title alpheios-clickable"
          :class="{open: !collapsed[constants.LANG_GREEK.toString()]}"
      >
        Greek Inflection Browser
        <span v-show="collapsed[constants.LANG_GREEK.toString()]">[+]</span>
        <span v-show="!collapsed[constants.LANG_GREEK.toString()]">[-]</span>
      </div>
      <div v-show="!collapsed[constants.LANG_GREEK.toString()]">
        <div class="alpheios-ib__pofs-title">Nouns</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekInflView({ viewID: 'greek_noun_view'})"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekInflView({ viewID: 'greek_noun_simplified_view'})"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title">Adjectives</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekInflView({ viewID: 'greek_adjective_view'})"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false"
                    :view="greekInflView({ viewID: 'greek_adjective_simplified_view'})"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title">Pronouns</div>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="greekInflView({ viewID: 'greek_person_pronoun_view', form: 'νώ', title: 'Personal Pronoun Declension' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="greekInflView({ viewID: 'greek_person_gender_pronoun_view', form: 'ἡμᾶς', title: 'Reflexive Pronoun Declension' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'ἀλλήλᾱ', title: 'Reciprocal Pronoun Declension' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="greekInflView({ viewID: 'greek_lemma_gender_pronoun_view', form: 'τούτω', title: 'Demonstrative Pronoun Declension' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'οἷς', title: 'Relative Pronoun Declension' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'ὥτινε', title: 'General Relative Pronoun Declension' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'τίνε', title: 'Interrogative Pronoun Declension' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'τινοῖν', title: 'Indefinite Pronoun Declension' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table
            :collapsed="inflBrowserTablesCollapsed"
            :infl-browser-table="true" :no-suffix-matches-hidden="false"
            :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'αὐτά', title: 'Intensive Pronoun Declension' })"
            @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title">Articles</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false"
                    :view="greekInflView({ viewID: 'greek_article_view', form: 'τοῦ' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title">Numerals</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false"
                    :view="greekInflView({ viewID: 'greek_numeral_view', form: 'δύο' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title">Verb Paradigms</div>
        <div class="alpheios-ib__pofs-title-l2">ω Verbs</div>
        <div class="alpheios-ib__pofs-title-l3">Regular ω Verbs</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm1' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm2' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm3' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm4' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm5' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm6' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm7' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm8' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm9' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm10' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm11' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm12' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm13' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm14' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm15' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm16' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l3">Athematic Perfects</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm17' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm17b' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm17c' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l3">Present System of Contract Verbs (-εω, -αω, -οω)</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm18' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm19' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm20' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm21' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm22' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm23' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm24' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm25' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm26' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm27' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l2">μι Verbs</div>
        <div class="alpheios-ib__pofs-title-l3">τίθημι</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm28' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm29' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm30' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm31' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l3">ἵημι</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm32' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm33' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm34' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm35' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l3">δίδωμι</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm36' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm37' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm38' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm39' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l3">ἵστημι</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm40' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm41' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm42' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l3">Other</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm43' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm43b' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm44' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm45' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm46' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm47' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm48' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm49' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm50' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm51' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm52' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParadigmView({ paradigmID: 'verbpdgm53' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <div class="alpheios-ib__pofs-title-l2">Participles</div>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm54' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm55' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm56' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm57' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm58' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm59' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm60' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm61' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm62' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm63' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm64' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm65' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
        <wide-table :collapsed="inflBrowserTablesCollapsed" :infl-browser-table="true"
                    :no-suffix-matches-hidden="false" :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm66' })"
                    @widthchange="inflTableWidthUpd"></wide-table>
      </div>
    </div>

  </div>

</template>
<script>
import { Constants } from 'alpheios-data-models'
import { ViewSetFactory } from 'alpheios-inflection-tables'
import Comparable from '@/lib/utility/comparable.js'

import WideTable from './inflections-table-wide.vue'
import Vue from 'vue/dist/vue'

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
    /**
       * Returns a version of a view according to options
       * @param {symbol} languageID - A language ID of a view.
       * @param {Object} options - An options object. Obligatory prop is `viewID`.
       * May also include `form` (for form based views) and `paradigmID` (for paradigm views).
       * @return {View}
       */
    inflView: function (languageID, options) {
      /*
          Vue rendering algorithm may call this method more then once. To avoid unnecessary re-rendering,
          which might sometimes trigger an infinite loop, rendered views are cached with `options` as a key.
           */
      const key = Comparable.key(options)
      if (!this.views.has(key)) {
        let view = ViewSetFactory.getStandardForm(languageID, options)
        this.views.set(key, view)
      }
      return this.views.get(key)
    },

    latinInflView: function (options) {
      return this.inflView(this.constants.LANG_LATIN, options)
    },

    greekInflView: function (options) {
      return this.inflView(this.constants.LANG_GREEK, options)
    },

    greekParadigmView: function (paradigmOptions) {
      paradigmOptions.viewID = 'greek_verb_paradigm_view'
      return this.greekInflView(paradigmOptions)
    },

    greekParticipleParadigmView: function (paradigmOptions) {
      paradigmOptions.viewID = 'greek_verb_participle_paradigm_view'
      return this.greekInflView(paradigmOptions)
    },

    collapseLanguage: function (languageID) {
      const language = languageID.toString()
      for (const lang of Object.keys(this.collapsed)) {
        this.collapsed[lang] = (lang === language) ? !this.collapsed[language] : true
      }
    },

    inflTableWidthUpd: function () {
      Vue.nextTick(() => {
        this.$emit('contentwidth', {
          width: this.htmlElements.content.offsetWidth + 1,
          component: 'inflections-browser'
        })
      })
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
    color: var(--alpheios-text-color-vivid);
    font-size: textsize(24px);
    font-family: var(--alpheios-serif-font-face);
    font-weight: 700;
    margin-bottom: textsize(20px);
    // To have the border under the text only
    display: inline-block;

    &.open {
      border-bottom: textsize(2px) solid var(--alpheios-text-color-vivid);
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
