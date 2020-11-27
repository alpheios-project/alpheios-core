<template>
    <div class="alpheios-morph-definitions_list">

        <div class="alpheios-morph-definitions_list__definitions--placeholder"
            v-show="! $store.getters['app/shortDefDataReady']"
        >
            <progress-bar :text="l10n.getText('PLACEHOLDER_LEX_DATA_LOADING')" />
        </div>

        <div :data-lemmakey="lexeme.lemma.ID"  class="alpheios-morph-definitions_list__definition"
            v-for="(definition, dindex) in definitions" :key="definition.ID"
            v-show="$store.getters['app/shortDefDataReady']"
        >

            <span class="alpheios-morph-definitions_list__definition_index" v-if="definitions.length > 1">{{ definitionIndex(dindex) }}</span>
            <shortdef :definition="definition" :languageCode="lexeme.lemma.languageCode"></shortdef>

        </div>
      <div class="alpheios-annotations__act-panel" data-annotation-selected-action="add">
        <div class="alpheios-annotations__act-ctrls">
          <div class="alpheios-annotations__act-ctrls-add">[+definition]</div>
        </div>
        <div class="alpheios-annotations__act-form">
          <div class="alpheios-annotations__act-form-content">
            <div class="alpheios-annotations__act-form-headline">Add a definition:</div>
            <div class="alpheios-annotations__act-form-text-input-group">
              <label for="lemma-definition">Definition:</label>
              <textarea id="lemma-definition" name="lemma-definition" rows="4" cols="50"/>
            </div>
            <div class="alpheios-annotations__act-form-text-input-group">
              <label for="lemma-source">Source:</label>
              <input id="lemma-source" name="lemma-source"/>
            </div>
          </div>
          <div class="alpheios-annotations__act-form-ctrls">
            <div class="alpheios-annotations__act-form-ctrls-add">Add</div>
            <div class="alpheios-annotations__act-form-ctrls-cancel">Cancel</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { Definition } from 'alpheios-data-models'
import ProgressBar from '@/vue/components/progress-bar.vue'
import ShortDef from '@/vue/components/shortdef.vue'

export default {
  name: 'DefinitionsList',
  components: {
    progressBar: ProgressBar,
    shortdef: ShortDef
  },
  inject: ['app', 'l10n'],
  storeModules: ['app'],
  props: {

    lexeme: {
      type: Object,
      required: true
    }
  },
  computed: {
    definitions () {
      let definitionsLocal = []
      if (this.$store.getters['app/shortDefDataReady'] && this.lexeme && this.lexeme.meaning && this.lexeme.meaning.shortDefs && this.lexeme.meaning.shortDefs.length > 0) {
        definitionsLocal = this.lexeme.meaning.shortDefs
      } else if (this.lexeme && this.lexeme.lemma.features && Object.entries(this.lexeme.lemma.features).length > 0) {
        definitionsLocal = [new Definition(this.l10n.getMsg('TEXT_NOTICE_NO_DEFS_FOUND'), 'en-US', 'text/plain', this.lexeme.lemma.word)]
      }
      return definitionsLocal
    }
  },
  methods: {
    definitionIndex (dIndex) {
      const letters = 'abcdefghijklmnopqrstuvwxyz'
      return letters.substr(dIndex, 1) + '.'
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-morph__lexemes .alpheios-definition__lemma {
    display: none;
  }

  .alpheios-panel__tab-panel .alpheios-morph__lexemes {
    font-size: .75rem;
  }

  .alpheios-morph-definitions_list {
    .alpheios-morph-definitions_list__definition {
        margin-bottom: 5px;
    }
  }
  .alpheios-morph-definitions_list {
    .alpheios-morph-definitions_list__definition_index {
      display: inline-block;
      font-weight: bold;
     }

    .alpheios-definition__short {
      display: inline-block;
    }
  }

</style>
