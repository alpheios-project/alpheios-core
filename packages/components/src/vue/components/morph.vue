<template>
  <div class="alpheios-morph" :data-annotation-mode="$store.state.app.isInAnnotationMode">
    <div
        :key="lex.lemma.ID"
        v-for="(lex, index) in lexemes"
        v-show="showLexeme(lex)"
    >
      <div :class="morphClass(lex)">
        <morph-data :lexeme="lex" :lexemeindex = "index" :lexemeslength="lexemes.length" v-if="lex"/>
        <div class="alpheios-annotations__act-panel" data-annotation-selected-action="edit" style="display: none">
          <div class="alpheios-annotations__act-ctrls">
            <div class="alpheios-annotations__act-ctrls-edit">[*comment]</div>
            <div class="alpheios-annotations__act-ctrls-remove">[-remove]</div>
          </div>
          <div class="alpheios-annotations__act-form">
            <div class="alpheios-annotations__act-form-content">
              <div class="alpheios-annotations__act-form-headline">Edit the comment:</div>
              <div class="alpheios-annotations__act-form-text">
                A comment about the part of speech of the lexeme
              </div>
            </div>
            <div class="alpheios-annotations__act-form-ctrls">
              <div class="alpheios-annotations__act-form-ctrls-save">Save</div>
              <div class="alpheios-annotations__act-form-ctrls-cancel">Cancel</div>
            </div>
          </div>
        </div>

        <div class="alpheios-annotations__act-panel" data-annotation-selected-action="remove">
          <div class="alpheios-annotations__act-ctrls">
            <div class="alpheios-annotations__act-ctrls-edit">[*comment]</div>
            <div class="alpheios-annotations__act-ctrls-remove">[-remove]</div>
          </div>
          <div class="alpheios-annotations__act-form">
            <div class="alpheios-annotations__act-form-content">
              <div class="alpheios-annotations__act-form-headline">Remove the comment:</div>
              <div class="alpheios-annotations__act-form-text">
                Are you sure that you want to remove this comment?
              </div>
            </div>
            <div class="alpheios-annotations__act-form-ctrls">
              <div class="alpheios-annotations__act-form-ctrls-remove">Remove</div>
              <div class="alpheios-annotations__act-form-ctrls-cancel">Cancel</div>
            </div>
          </div>
        </div>

        <definitions-list :lexeme = "lex" v-if="lex"/>

        <div
            class="alpheios-morph__translation_list"
            v-if="hasTranslations(lex.lemma.ID)">
            <lemmatranslation :lemmakey="lex.lemma.ID" :translations="translations"></lemmatranslation>
        </div>

        <inflections-list :lexeme = "lex"/>
      </div>
    </div>

    <div class="alpheios-annotations__act-panel" data-annotation-selected-action="none">
      <div class="alpheios-annotations__act-ctrls">
        <div class="alpheios-annotations__act-ctrls-add">[+lemma]</div>
      </div>
    </div>
  </div>
</template>
<script>
import LemmaTranslation from './lemma-translation.vue'
import MorphData from '@/vue/components/morph-parts/morph-data.vue'
import DefinitionsList from '@/vue/components/morph-parts/definitions-list.vue'
import InflectionsList from '@/vue/components/morph-parts/inflections-list.vue'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Morph',
  components: {
    morphData: MorphData,
    definitionsList: DefinitionsList,
    inflectionsList: InflectionsList,
    lemmatranslation: LemmaTranslation
  },
  inject: ['app', 'l10n'],
  storeModules: ['app'],
  mixins: [DependencyCheck],
  computed: {
    lexemes () {
      // A call to `shortDefDataReady` will force this computed prop to recalculate every time definitions data is updated
      const defs = this.$store.getters['app/shortDefDataReady'] // eslint-disable-line no-unused-vars
      return this.$store.state.app.morphDataReady ? this.app.getHomonymLexemes() : []
    },

    translations () {
      let translations = {} // eslint-disable-line prefer-const
      if (this.$store.state.app.translationsDataReady) {
        for (const lexeme of this.lexemes) {
          if (lexeme.lemma.translation !== undefined) {
            translations[lexeme.lemma.ID] = lexeme.lemma.translation
          }
        }
      }
      return translations
    }
  },
  methods: {
    showLexeme (lex) {
      return (lex.isPopulated) ? lex.isPopulated() : false
    },
    hasTranslations (lemmaID) {
      return this.translations && this.translations[lemmaID] && this.translations[lemmaID].glosses && this.translations[lemmaID].glosses.length > 0
    },

    morphClass (lex) {
      let c = 'alpheios-morph__dictentry'
      if (lex.disambiguated) {
        c = `${c} alpheios-morph__dictentry-disambiguated`
      }
      return c
    }
  }
}
</script>
<style lang="scss">
  @use "../../styles/annotations";
  @import "../../styles/variables";

  $lemma_index_size: 20px;

  .alpheios-morph__dictentry {
    clear: both;
    margin-bottom: textsize(20px);

    .alpheios-morph-data__morphdata,
    p.feature_extras,
    .alpheios-morph-definitions_list,
    .alpheios-morph__translation_list,
    .alpheios-inflections-list__inflections,
    .alpheios-morph-data__chinese {
      margin-left: $lemma_index_size + 14px;
    }

    .alpheios-morph-definitions_list,
    .alpheios-morph__translation_list,
    .alpheios-inflections-list__inflections {
      // border-top: 1px solid var(--alpheios-border-color);
      margin-top: 5px;
      padding-left: 15px;
    }
  }

  .alpheios-morph__dictentry {
    .alpheios-morph__features {
      &:before,
      &:after {
        content: '';
        display: table;
        clear: both;
      }

      p {
        margin-bottom: 0;
        margin-top: 0;
      }
    }
  }

  // region Annotation UI
  .alpheios-morph-data__morphdata {
    [data-annotation-mode="true"] & {
      @include annotations.editable-element;
    }
  }

  .alpheios-morph[data-annotation-mode="true"] > div:first-child .alpheios-morph-data__morphdata {
    @include annotations.editable-element-selected
  }
  // endregion Annotation UI
</style>
