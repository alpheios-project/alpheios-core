<template>
  <div class="alpheios-definition__short">
      <span :lang="languageCode" class="alpheios-definition__lemma alpheios-text__medium">{{ definition.lemmaText }}:</span>
      <span class="alpheios-definition__text alpheios-text__medium">{{ definition.text }}</span>
  </div>
</template>
<script>
export default {
  name: 'ShortDef',
  props: ['definition', 'languageCode'],
  methods: {},
  mounted () {
    // console.log('ShortDef is mounted')
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-definition__text {
     color: $alpheios-tools-color;
     font-weight: bold;
  }
</style>
