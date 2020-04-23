<template>
  <div class="alpheios-definition__short">
    <span :lang="languageCode"
          class="alpheios-definition__lemma">{{ definition.lemmaText }}:</span>
    <span class="alpheios-definition__text" v-html="definition.text"></span>
  </div>
</template>
<script>
export default {
  name: 'ShortDef',
  props: ['definition', 'languageCode']
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
