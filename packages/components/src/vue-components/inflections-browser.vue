<template>
    <div class="alpheios-ib">

        <div class="alpheios-ib__title alpheios-clickable" @click="collapseLanguage(constants.LANG_LATIN)">
            Latin Inflection Browser
            <span class='alpheios-ib__title-collapse' v-show="collapsed[constants.LANG_LATIN.toString()]">[+]</span>
            <span class='alpheios-ib__title-collapse' v-show="!collapsed[constants.LANG_LATIN.toString()]">[-]</span>
        </div>
        <div v-show="!collapsed[constants.LANG_LATIN.toString()]">
            <div class="alpheios-ib__pofs-title">Nouns</div>
            <wide-table :view="latinInflView({ viewID: 'latin_noun_view' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title">Adjectives</div>
            <wide-table :view="latinInflView({ viewID: 'latin_adjective_view'})" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title">Verbs</div>
            <div class="alpheios-ib__pofs-title-l2">Regular verbs</div>
            <div class="alpheios-ib__pofs-title-l3">Sorted by...</div>
            <wide-table :view="latinInflView({ viewID: 'latin_conjugation_mood_voice_view', title: 'Conjugation-Mood-Voice' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_conjugation_voice_mood_view', title: 'Conjugation-Voice-Mood' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_mood_conjugation_voice_view', title: 'Mood-Conjugation-Voice' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_mood_voice_conjugation_view', title: 'Mood-Coice-Conjugation' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_voice_conjugation_mood_view', title: 'Voice-Conjugation-Mood' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_voice_mood_conjugation_view', title: 'Voice-Mood-Conjugation' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">Other Forms</div>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_participle_view'})" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_infinitive_view'})" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_imperative_view'})" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_supine_view'})" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l2">Irregular verbs</div>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'sum', title: 'Sum (esse,fui,futurus)' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'fero', title: 'Fero (ferre, tuli, latus)' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'volo', title: 'Volo (velle, volui)' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'eo', title: 'Eo (ire, ivi(ii), itus)' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'possum', title: 'Possum (posse, potui)' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'prosum', title: 'Prosum (prodesse, profui, profuturus)' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'absum', title: 'Absum (abesse, afui, afuturus)' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
        </div>


        <div class="alpheios-ib__title alpheios-clickable" @click="collapseLanguage(constants.LANG_GREEK)">
            Greek Inflection Browser
            <span class='alpheios-ib__title-collapse' v-show="collapsed[constants.LANG_GREEK.toString()]">[+]</span>
            <span class='alpheios-ib__title-collapse' v-show="!collapsed[constants.LANG_GREEK.toString()]">[-]</span>
        </div>
        <div v-show="!collapsed[constants.LANG_GREEK.toString()]">
            <div class="alpheios-ib__pofs-title">Nouns</div>
            <wide-table :view="greekInflView({ viewID: 'greek_noun_view'})" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_noun_simplified_view'})" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title">Adjectives</div>
            <wide-table :view="greekInflView({ viewID: 'greek_adjective_view'})" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_adjective_simplified_view'})" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title">Pronouns</div>
            <wide-table :view="greekInflView({ viewID: 'greek_person_pronoun_view', form: 'νώ', title: 'Personal Pronoun Declension' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_person_gender_pronoun_view', form: 'ἡμᾶς', title: 'Reflexive Pronoun Declension' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'ἀλλήλᾱ', title: 'Reciprocal Pronoun Declension' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_lemma_gender_pronoun_view', form: 'τούτω', title: 'Demonstrative Pronoun Declension' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'οἷς', title: 'Relative Pronoun Declension' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'ὥτινε', title: 'General Relative Pronoun Declension' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'τίνε', title: 'Interrogative Pronoun Declension' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'τινοῖν', title: 'Indefinite Pronoun Declension' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'αὐτά', title: 'Intensive Pronoun Declension' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title">Articles</div>
            <wide-table :view="greekInflView({ viewID: 'greek_article_view', form: 'τοῦ' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title">Numerals</div>
            <wide-table :view="greekInflView({ viewID: 'greek_numeral_view', form: 'δύο' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title">Verb Paradigms</div>
            <div class="alpheios-ib__pofs-title-l2">ω Verbs</div>
            <div class="alpheios-ib__pofs-title-l3">Regular ω Verbs</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm1' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm2' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm3' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm4' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm5' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm6' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm7' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm8' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm9' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm10' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm11' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm12' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm13' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm14' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm15' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm16' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">Athematic Perfects</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm17' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm17b' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm17c' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">Present System of Contract Verbs (-εω, -αω, -οω)</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm18' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm19' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm20' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm21' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm22' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm23' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm24' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm25' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm26' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm27' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l2">μι Verbs</div>
            <div class="alpheios-ib__pofs-title-l3">τίθημι</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm28' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm29' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm30' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm31' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">ἵημι</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm32' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm33' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm34' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm35' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">δίδωμι</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm36' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm37' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm38' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm39' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">ἵστημι</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm40' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm41' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm42' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">Other</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm43' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm43b' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm44' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm45' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm46' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm47' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm48' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm49' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm50' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm51' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm52' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm53' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <div class="alpheios-ib__pofs-title-l2">Participles</div>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm54' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm55' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm56' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm57' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm58' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm59' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm60' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm61' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm62' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm63' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm64' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm65' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm66' })" :infl-browser-table="true" :messages="messages" :no-suffix-matches-hidden="false" :collapsed="inflBrowserTablesCollapsed" @widthchange="inflTableWidthUpd" @interaction="inflTableInteraction"></wide-table>
        </div>

    </div>

</template>
<script>
  import { Constants } from 'alpheios-data-models'
  import { ViewSetFactory } from 'alpheios-inflection-tables'
  import Comparable from '../lib/utility/comparable.js'

  import WideTable from './inflections-table-wide.vue'

  export default {
    name: 'InflectionStandardForms',
    components: {
      wideTable: WideTable,
    },

    props: {
      languageId: {
        type: Symbol,
        required: false
      },

      // A passtrough to inflection-tables-wide
      messages: {
        type: Object,
        required: true
      },

      inflBrowserTablesCollapsed: {
        type: Boolean,
        required: false,
        default: true
      }
    },

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
        const locale = 'en-US'
        /*
        Vue rendering algorithm may call this method more then once. To avoid unnecessary re-rendering,
        which might sometimes trigger an infinite loop, rendered views are cached with `options` as a key.
         */
        const key = Comparable.key(options)
        if (!this.views.has(key)) {
          let view = ViewSetFactory.getStandardForm(languageID, options, locale)
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
        if (this.collapsed.hasOwnProperty(language)) {
          this.collapsed[language] = !this.collapsed[language]
        }
        this.$emit('interaction')
      },

      inflTableWidthUpd: function () {
        this.$emit('widthchange')
      },

      inflTableInteraction: function () {
        this.$emit('interaction')
      }
    },

    mounted: function () {
      if (this.languageId) {
        // Set a group that will be opened initially
        this.collapsed[this.languageId.toString()] = false
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-ib {
        padding: 1rem 20px 0.2rem;
    }

    .alpheios-ib__title,
    // To override color schema's colors
    div.alpheios-ib div.alpheios-ib__title {
        color: $alpheios-toolbar-color;
        font-weight: 700;
        margin: 1rem 0 0.6rem;
        text-transform: uppercase;
        font-size: 1rem;
        font-style: normal;
    }

    .alpheios-ib__pofs-title {
        font-weight: 700;
    }

    .alpheios-ib__pofs-title-l2 {
        font-weight: 700;
        margin-top: 0.2rem;
        margin-left: 1rem;
    }

    .alpheios-ib__pofs-title-l3 {
        font-weight: 700;
        margin-top: 0.2rem;
        margin-left: 2rem;
    }

    div.alpheios-ib div.alpheios-ib__title .alpheios-ib__title-collapse {
        font-weight: 400;
        font-size: 0.875rem;
        position: relative;
        top: -0.1rem;
        left: 0.2rem;
        color: $alpheios-toolbar-color;
    }

    .alpheios-clickable {
        cursor: pointer;
    }

    .alpheios-ib .alpheios-inflections__title.alpheios-table-sf__title {
        text-align: left;
        font-weight: normal;
        font-size: 1rem;
        margin: 0 0 0.2rem 3rem;
    }

</style>
