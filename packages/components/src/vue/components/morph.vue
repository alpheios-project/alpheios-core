<template>
  <div class="alpheios-morph" :data-annotation-mode="$store.state.app.isInAnnotationMode">
    <div
        :key="lex.lemma.ID"
        v-for="(lex, index) in lexemes"
        v-show="showLexeme(lex)"
    >
      <div :class="morphClass(lex)">
        <morph-data :lexeme="lex" :lexemeindex = "index" :lexemeslength="lexemes.length" v-if="lex"/>
        <div class="alpheios-principal-parts__annotation__ctrls">
          <div class="alpheios-principal-parts__annotation__ctrls__comment-lemma-btn" data-annotation-ctrl-selected="true">[*Comment]</div>
          <div class="alpheios-principal-parts__annotation__ctrls__remove-lemma-btn">[-Remove]</div>
        </div>
        <div class="alpheios-principal-parts__annotation__edit-form" style="display: none">
          <div class="alpheios-principal-parts__annotation__edit-form__text-input">
            A comment about the part of speech of the lexeme|
          </div>
          <div class="alpheios-principal-parts__annotation__edit-form__controls">
            <div class="alpheios-principal-parts__annotation__edit-form__controls-save">Save</div>
            <div class="alpheios-principal-parts__annotation__edit-form__controls-cancel">Cancel</div>
          </div>
        </div>
        <div class="alpheios-principal-parts__annotation__edit-form">
          <div class="alpheios-principal-parts__annotation__edit-form__warning-text">
            Are you sure that you want to remove this comment?
          </div>
          <div class="alpheios-principal-parts__annotation__edit-form__controls">
            <div class="alpheios-principal-parts__annotation__edit-form__controls-remove">Remove</div>
            <div class="alpheios-principal-parts__annotation__edit-form__controls-cancel">Cancel</div>
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

    <div class="alpheios-morph__annotation__add-lemma">[+Lemma]</div>
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
  .alpheios-principal-parts__annotation__ctrls {
    display: none;
    background-color: lightcyan;
    padding: 10px;
    border: 2px solid lightblue;
    border-radius: 10px;
    margin-top: 5px;

    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    [data-annotation-mode="true"] .alpheios-morph > div:first-child & {
      display: flex;
    }

    &__comment-lemma-btn {
      margin-left: 10px;
      font-weight: 700;
      color: steelblue;
      padding: 5px;
      border: 2px solid lightblue;
      border-radius: 10px;
    }

    &__remove-lemma-btn {
      margin-left: 10px;
      font-weight: 700;
      color: palevioletred;
      padding: 5px;
      border: 2px solid lightblue;
      border-radius: 10px;
      background: lightblue;
    }
  }

  .alpheios-morph-data__morphdata {
    [data-annotation-mode="true"] & {
      @include annotations.editable-element;
    }
  }

  .alpheios-morph[data-annotation-mode="true"] > div:first-child .alpheios-morph-data__morphdata {
    background-color: lightcyan;
  }

  .alpheios-principal-parts__annotation__edit-form {
    display: none;
    padding: 5px;
    border: 2px solid lightblue;
    border-radius: 10px;
    margin: -2px 0 5px;
    background-color: lightcyan;

    border-top-right-radius: 0;
    border-top-left-radius: 0;

    [data-annotation-mode="true"] .alpheios-morph > div:first-child & {
      display: flex;
      flex-direction: column;
    }

    .alpheios-principal-parts__annotation__edit-form__text-input {
      height: 50px;
      padding: 0 5px;
      border: 1px solid lightblue;
      border-radius: 10px;
      margin: 5px;
      background-color: white;
    }

    .alpheios-principal-parts__annotation__edit-form__controls {
      display: flex;
      justify-content: flex-end;
      padding: 5px;
    }

    .alpheios-principal-parts__annotation__edit-form__controls-save {
      font-weight: 700;
      padding: 5px 10px;
      border-radius: 10px;
      background: lightgreen;
      margin-left: 10px;
    }

    .alpheios-principal-parts__annotation__edit-form__controls-remove {
      font-weight: 700;
      padding: 5px 10px;
      border-radius: 10px;
      background: palevioletred;
      color: white;
      margin-left: 10px;
    }

    .alpheios-principal-parts__annotation__edit-form__controls-cancel {
      padding: 5px 10px;
      border-radius: 10px;
      background: lightslategrey;
      color: white;
      margin-left: 10px;
    }
  }

  .alpheios-morph__annotation__add-lemma {
    display: none;
    color: mediumseagreen;
    border: 1px solid lightblue;
    line-height: 1.3;
    font-weight: 700;
    background-color: lightcyan;
    padding: 5px 10px 10px;
    border-radius: 10px;
    margin-bottom: 10px;

    [data-annotation-mode="true"] & {
      display: block;
      border-radius: 10px;
    }
  }
  // endregion Annotation UI
</style>
