<template>
  <div class="alpheios-definition__short">
    <span :lang="languageCode"
          class="alpheios-definition__lemma">{{ definition.lemmaText }}:</span>
    <span v-if='alpheiosEnabled' data-alpheios-enable="all" class="alpheios-definition__text" v-html="definition.text" :lang="definition.language"></span>
    <span v-else class="alpheios-definition__text" v-html="definition.text" :lang="definition.language"></span>
  </div>
</template>
<script>
import { LanguageModelFactory, Logger } from 'alpheios-data-models'
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
export default {
  name: 'ShortDef',
  inject: ['app'],
  mixins: [DependencyCheck],
  props: ['definition', 'languageCode'],
  computed: {
    alpheiosEnabled () {
      return LanguageModelFactory.supportsLanguage(this.definition.language)
    }
  },
  mounted () {
    this.$nextTick(() => {
      const selectorName = 'getSelectedText-shortDefinitions'
      try {
        this.app.registerTextSelector(selectorName, '.alpheios-definition__short')
        this.app.activateTextSelector(selectorName)
      } catch (err) {
        Logger.getInstance().error(err)
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
      .alpheios-definition__text, .alpheios-definition__text * {
        color: var(--alpheios-definition-short-color);
        font-size: textsize(18px);
        font-weight: bold;
      }
    }
  }
</style>
