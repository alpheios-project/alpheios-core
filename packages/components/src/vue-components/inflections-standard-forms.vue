<template>
    <div class="alpheios-sf">
        <template v-if="isLatin">
            <div class="alpheios-sf__title alpheios-clickable" @click="collapseTogle()">
                Latin inflection tables
                <span v-show="state.collapsed">[+]</span>
                <span v-show="!state.collapsed">[-]</span>
            </div>
            <div v-if="!state.collapsed">
                <div class="alpheios-sf__pofs-title">Nouns</div>
                <wide-table :view="standardForm('latin_noun_view').view" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Adjectives</div>
                <wide-table :view="standardForm('latin_adjective_view').view" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title">Verbs</div>
                <div class="alpheios-sf__pofs-title-2">Participles</div>
                <wide-table :view="standardForm('latin_verb_participle_view').view" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-2">Infinitive</div>
                <wide-table :view="standardForm('latin_infinitive_view').view" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-2">Imperative</div>
                <wide-table :view="standardForm('latin_imperative_view').view" :no-suffix-matches-hidden="false"></wide-table>
                <div class="alpheios-sf__pofs-title-2">Supine</div>
                <wide-table :view="standardForm('latin_supine_view').view" :no-suffix-matches-hidden="false"></wide-table>
            </div>
        </template>

        <template v-if="isGreek">
            Greek standard forms
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
      }
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
        if (!this.views.has(viewID)) {
          let view = ViewSetFactory.getStandardForm(this.languageId, viewID, formID, this.messages)
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

    .alpheios-sf__title {
        font-size: 1.2em;
        font-weight: 700;
        margin-bottom: 30px;
    }

    .alpheios-sf__pofs-title {
        font-weight: 700;
        margin: 20px 0 10px;
    }

    .alpheios-sf__pofs-title-2 {
        font-weight: 700;
        margin: 10px 0;
        padding-left: 30px;
    }

    .alpheios-clickable {
        cursor: pointer;
    }

    .alpheios-sf h3.alpheios-inflections__title {
        text-align: left;
    }

</style>
