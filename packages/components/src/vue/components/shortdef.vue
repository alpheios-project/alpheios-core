<template>
  <div class="alpheios-definition__short">
    <span :lang="languageCode"
          class="alpheios-definition__lemma">{{ definition.lemmaText }}:</span>
    <span v-if='alpheiosEnabled' data-alpheios-ignore="none" class="alpheios-definition__text" v-html="definition.text" :lang="definition.language"></span>
    <span v-else data-alpheios-ignore="none" class="alpheios-definition__text" v-html="definition.text" :lang="definition.language"></span>
  </div>
</template>
<script>
import { LanguageModelFactory } from 'alpheios-data-models'
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
export default {
  name: 'ShortDef',
  inject: ['ui'],
  mixins: [DependencyCheck],
  props: ['definition', 'languageCode'],
  computed: {
    alpheiosEnabled () {
      return LanguageModelFactory.supportsLanguage(this.definition.language)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (LanguageModelFactory.supportsLanguage(this.definition.language)) {
        this.ui.registerAndActivateGetSelectedText('getSelectedText-shortDefinitions', '.alpheios-definition__short')
      }
    })
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  #{$alpheios-namespace} {
    // These rules intentionally use an increased specificity to fight the style leakage
    .alpheios-definition__short {
      .alpheios-definition__text {
        color: var(--alpheios-definition-short-color);
        font-size: textsize(18px);
        font-weight: bold;
      }
    }
  }
</style>
