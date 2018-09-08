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
                <wide-table :view="standardForm('latin_noun_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Adjectives</div>
                <wide-table :view="standardForm('latin_adjective_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Verbs</div>
                <wide-table :view="standardForm('latin_verb_participle_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm('latin_infinitive_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm('latin_imperative_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm('latin_supine_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
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
                <wide-table :view="standardForm('greek_noun_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm('greek_noun_simplified_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Adjectives</div>
                <wide-table :view="standardForm('greek_adjective_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <wide-table :view="standardForm('greek_adjective_simplified_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Pronouns</div>
                <wide-table :view="standardForm('greek_person_pronoun_view').view" :messages="messages" :no-suffix-matches-hidden="false"></wide-table>
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
      standardForm: function (viewID, formID = 0) {
        const locale = 'en-US'
        if (!this.views.has(viewID)) {
          let view = ViewSetFactory.getStandardForm(this.languageId, viewID, formID, locale)
          this.views.set(viewID, {
            view: view,
            state: {
              collapsed: true
            }
          })
        }
        return this.views.get(viewID)
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

    div.alpheios-sf div.alpheios-sf__title .alpheios-sf__title-collapse {
        font-weight: 400;
        font-size: 0.875rem;
        position: relative;
        top: -0.1rem;
        left: 0.2rem;
        color: $alpheios-toolbar-color;
    }

    // TODO: Remove if will not be used
    .alpheios-sf__pofs-title-2 {
        font-weight: 700;
        margin: 0.6rem 0;
        padding-left: 2rem;
    }

    .alpheios-clickable {
        cursor: pointer;
    }

    .alpheios-sf .alpheios-inflections__title.alpheios-table-sf__title {
        text-align: left;
        font-weight: normal;
        font-size: 1rem;
        margin: 0 0 0.2rem 1.5rem;
    }

</style>
