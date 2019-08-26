<template>
  <div class="alpheios-definition__short">
    <span :lang="languageCode"
          class="alpheios-definition__lemma">{{ definition.lemmaText }}:</span>
    <span class="alpheios-definition__text">{{ definition.text }}</span>
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

  .alpheios-definition__short {
    .alpheios-definition__text {
      color: var(--alpheios-definition-short-color);
      font-size: textsize(18px);
      font-weight: bold;
    }
  }
</style>
