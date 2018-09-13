<template>
    <div class="alpheios-ib">

        <div class="alpheios-ib__title alpheios-clickable" @click="collapseLanguage(constants.LANG_LATIN)">
            Latin Inflection Browser
            <span class='alpheios-ib__title-collapse' v-show="collapsed[constants.LANG_LATIN.toString()]">[+]</span>
            <span class='alpheios-ib__title-collapse' v-show="!collapsed[constants.LANG_LATIN.toString()]">[-]</span>
        </div>
        <div v-if="!collapsed[constants.LANG_LATIN.toString()]">
            <div class="alpheios-ib__pofs-title">Nouns</div>
            <wide-table :view="latinInflView({ viewID: 'latin_noun_view' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title">Adjectives</div>
            <wide-table :view="latinInflView({ viewID: 'latin_adjective_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title">Verbs</div>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_participle_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_infinitive_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_imperative_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_supine_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title-l2">Irregular verbs</div>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'sum', title: 'Sum (esse,fui,futurus)' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'fero', title: 'Fero (ferre, tuli, latus)' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'volo', title: 'Volo (velle, volui)' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'eo', title: 'Eo (ire, ivi(ii), itus)' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'possum', title: 'Possum (posse, potui)' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'prosum', title: 'Prosum (prodesse, profui, profuturus)' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="latinInflView({ viewID: 'latin_verb_irregular_view', form: 'absum', title: 'Absum (abesse, afui, afuturus)' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
        </div>


        <div class="alpheios-ib__title alpheios-clickable" @click="collapseLanguage(constants.LANG_GREEK)">
            Greek Inflection Browser
            <span class='alpheios-ib__title-collapse' v-show="collapsed[constants.LANG_GREEK.toString()]">[+]</span>
            <span class='alpheios-ib__title-collapse' v-show="!collapsed[constants.LANG_GREEK.toString()]">[-]</span>
        </div>
        <div v-if="!collapsed[constants.LANG_GREEK.toString()]">
            <div class="alpheios-ib__pofs-title">Nouns</div>
            <wide-table :view="greekInflView({ viewID: 'greek_noun_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_noun_simplified_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title">Adjectives</div>
            <wide-table :view="greekInflView({ viewID: 'greek_adjective_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_adjective_simplified_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title">Pronouns</div>
            <wide-table :view="greekInflView({ viewID: 'greek_person_pronoun_view', form: 'νώ', title: 'Personal Pronoun Declension' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_person_gender_pronoun_view', form: 'ἡμᾶς', title: 'Reflexive Pronoun Declension' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'ἀλλήλᾱ', title: 'Reciprocal Pronoun Declension' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_lemma_gender_pronoun_view', form: 'τούτω', title: 'Demonstrative Pronoun Declension' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'οἷς', title: 'Relative Pronoun Declension' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'ὥτινε', title: 'General Relative Pronoun Declension' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'τίνε', title: 'Interrogative Pronoun Declension' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'τινοῖν', title: 'Indefinite Pronoun Declension' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekInflView({ viewID: 'greek_gender_pronoun_view', form: 'αὐτά', title: 'Intensive Pronoun Declension' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title">Articles</div>
            <wide-table :view="greekInflView({ viewID: 'greek_article_view', form: 'τοῦ' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title">Numerals</div>
            <wide-table :view="greekInflView({ viewID: 'greek_numeral_view', form: 'δύο' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title">Verb Paradigms</div>
            <div class="alpheios-ib__pofs-title-l2">ω Verbs</div>
            <div class="alpheios-ib__pofs-title-l3">Regular ω Verbs</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm1' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm2' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm3' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm4' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm5' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm6' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm7' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm8' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm9' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm10' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm11' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm12' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm13' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm14' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm15' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm16' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">Present System of Contract Verbs (-εω, -αω, -οω)</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm17' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm18' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm19' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm20' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm21' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm22' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm23' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm24' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm25' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm26' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">Second Aorist of βαίνω, γιγνώσκω, ἁλίσκομαι, δύω</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm27' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title-l2">μι Verbs</div>
            <div class="alpheios-ib__pofs-title-l3">τίθημι</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm28' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm29' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm30' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm31' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">ἵημι</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm32' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm33' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm34' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm35' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">δίδωμι</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm36' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm37' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm38' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm39' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">ἵστημι</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm40' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm41' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm42' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title-l3">Other</div>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm43' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm44' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm45' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm46' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm47' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm48' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm49' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm50' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm51' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm52' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParadigmView({ paradigmID: 'verbpdgm53' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <div class="alpheios-ib__pofs-title-l2">Participles</div>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm54' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm55' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm56' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm57' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm58' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm59' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm60' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm61' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm62' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm63' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm64' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm65' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            <wide-table :view="greekParticipleParadigmView({ paradigmID: 'verbpdgm66' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
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
        type: [Symbol],
        required: false
      },

      // A passtrough to inflection-tables-wide
      messages: {
        type: Object,
        required: true
      },
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
        border-top: 1px solid $alpheios-base-border-color;
    }

    .alpheios-ib__title,
    // To override color schema's colors
    div.alpheios-ib div.alpheios-ib__title {
        color: $alpheios-toolbar-color;
        font-weight: 700;
        margin: 1rem 0 0.6rem;
        text-transform: uppercase;
        font-size: 1rem;
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
