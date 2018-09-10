<template>
    <div class="alpheios-sf">
        <template v-if="isLatin">
            <div class="alpheios-sf__title alpheios-clickable" @click="collapseTogle()">
                Inflection Browser
                <span class='alpheios-sf__title-collapse' v-show="state.collapsed">[+]</span>
                <span class='alpheios-sf__title-collapse' v-show="!state.collapsed">[-]</span>
            </div>
            <div v-if="!state.collapsed">
                <div class="alpheios-sf__pofs-title">Nouns</div>
                <wide-table :view="standardForm({ viewID: 'latin_noun_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Adjectives</div>
                <wide-table :view="standardForm({ viewID: 'latin_adjective_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Verbs</div>
                <wide-table :view="standardForm({ viewID: 'latin_verb_participle_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'latin_infinitive_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'latin_imperative_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'latin_supine_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            </div>
        </template>

        <template v-if="isGreek">
            <div class="alpheios-sf__title alpheios-clickable" @click="collapseTogle()">
                Inflection Browser
                <span class='alpheios-sf__title-collapse' v-show="state.collapsed">[+]</span>
                <span class='alpheios-sf__title-collapse' v-show="!state.collapsed">[-]</span>
            </div>
            <div v-if="!state.collapsed">
                <div class="alpheios-sf__pofs-title">Nouns</div>
                <wide-table :view="standardForm({ viewID: 'greek_noun_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <!--<wide-table :view="standardForm({ viewID: 'greek_noun_simplified_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>-->
                <div class="alpheios-sf__pofs-title">Adjectives</div>
                <wide-table :view="standardForm({ viewID: 'greek_adjective_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_adjective_simplified_view'})" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Pronouns</div>
                <wide-table :view="standardForm({ viewID: 'greek_person_pronoun_view', form: 'νώ' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_person_gender_pronoun_view', form: 'ἡμᾶς' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_gender_pronoun_view', form: 'ἀλλήλᾱ' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_lemma_gender_pronoun_view', form: 'τούτω' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_gender_pronoun_view', form: 'οἷς' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_gender_pronoun_view', form: 'ὥτινε' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_gender_pronoun_view', form: 'τίνε' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_gender_pronoun_view', form: 'τινοῖν' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_gender_pronoun_view', form: 'αὐτά' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Articles</div>
                <wide-table :view="standardForm({ viewID: 'greek_article_view', form: 'τοῦ' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Numerals</div>
                <wide-table :view="standardForm({ viewID: 'greek_numeral_view', form: 'δύο' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Verb Paradigms</div>
                <div class="alpheios-sf__pofs-title-l2">ω Verbs</div>
                <div class="alpheios-sf__pofs-title-l3">Regular ω Verbs</div>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm1' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm2' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm3' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm4' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm5' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm6' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm7' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm8' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm9' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm10' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm11' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm12' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm13' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm14' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm15' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm16' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-l3">Present System of Contract Verbs (-εω, -αω, -οω)</div>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm17' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm18' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm19' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm20' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm21' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm22' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm23' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm24' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm25' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm26' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-l3">Second Aorist of βαίνω, γιγνώσκω, ἁλίσκομαι, δύω</div>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm27' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-l2">μι Verbs</div>
                <div class="alpheios-sf__pofs-title-l3">τίθημι</div>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm28' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm29' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm30' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm31' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-l3">ἵημι</div>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm32' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm33' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm34' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm35' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-l3">δίδωμι</div>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm36' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm37' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm38' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm39' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-l3">ἵστημι</div>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm40' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm41' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm42' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-l3">Other</div>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm43' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm44' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm45' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm46' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm47' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm48' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm49' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm50' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm51' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm52' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_paradigm_view', paradigmID: 'verbpdgm53' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-l2">Participles</div>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm54' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm55' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm56' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm57' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm58' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm59' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm60' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm61' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm62' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm63' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm64' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm65' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm({ viewID: 'greek_verb_participle_paradigm_view', paradigmID: 'verbpdgm66' })" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
            </div>
        </template>

    </div>

</template>
<script>
  import { Constants } from 'alpheios-data-models'
  import { ViewSetFactory } from 'alpheios-inflection-tables'

  import WideTable from './inflections-table-wide.vue'

  export default {
    name: 'InflectionStandardForms',
    components: {
      wideTable: WideTable,
    },

    props: {
      languageId: {
        type: Symbol,
        required: true
      },

      // A passtrough to inflection-tables-wide
      messages: {
        type: Object,
        required: true
      },
    },

    data: function () {
      return {
        views: new Map(),
        state: {
          collapsed: true
        }
      }
    },

    computed: {
      isLatin: function () {
        return this.languageId === Constants.LANG_LATIN
      },

      isGreek: function () {
        return this.languageId === Constants.LANG_GREEK
      }
    },

    methods: {
      standardForm: function (options) {
        const locale = 'en-US'
        if (!this.views.has(options)) {
          let view = ViewSetFactory.getStandardForm(this.languageId, options, locale)
          this.views.set(options, view)
        }
        return this.views.get(options)
      },

      collapseTogle: function () {
        this.state.collapsed = !this.state.collapsed
        this.$emit('collapse', this.state.collapsed)
      },

      toggleSF: function (viewID) {
        let sfView = this.standardForm(viewID)
        sfView.state.collapsed = !sfView.state.collapsed
      },

      isSFCollapsed: function (viewID) {
        let state = this.standardForm(viewID).state.collapsed
        return state
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-sf {
        padding: 0 20px 1rem;
        margin-bottom: 4rem;
        border-bottom: 1px solid $alpheios-base-border-color;
    }

    .alpheios-sf__title,
    // To override color schema's colors
    div.alpheios-sf div.alpheios-sf__title {
        color: $alpheios-toolbar-color;
        font-weight: 700;
        margin: 1rem 0 0.6rem;
        text-transform: uppercase;
        font-size: 1rem;
    }

    .alpheios-sf__pofs-title {
        font-weight: 700;
    }

    .alpheios-sf__pofs-title-l2 {
        font-weight: 700;
        margin-top: 0.2rem;
        margin-left: 1rem;
    }

    .alpheios-sf__pofs-title-l3 {
        font-weight: 700;
        margin-top: 0.2rem;
        margin-left: 2rem;
    }

    div.alpheios-sf div.alpheios-sf__title .alpheios-sf__title-collapse {
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

    .alpheios-sf .alpheios-inflections__title.alpheios-table-sf__title {
        text-align: left;
        font-weight: normal;
        font-size: 1rem;
        margin: 0 0 0.2rem 3rem;
    }

</style>
