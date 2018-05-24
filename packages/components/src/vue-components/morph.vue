<template>
  <div>
    <morph-inner
      :lexemes = "lexemes"
      :definitions = "definitions"
      :linkedfeatures = "linkedfeatures"
      :translations = "translations"
      @sendfeature = "sendFeature"
    ></morph-inner>
  </div><!--alpheios-morph__lexemes-->
</template>
<script>
  import MorphInner from './morph-inner-v1.vue'

  export default {
    name: 'Morph',
    components: { morphInner: MorphInner },
    props: {
        lexemes: {
          type: Array,
          required: true
        },
        definitions: {
          type: Object,
          required: false,
          default: () => {}
        },
        linkedfeatures: {
          type: Array,
          required: false,
          default: () => []
        },
        translations: {
          type: Object,
          required: false,
          default: () => {}
        }
    },
    methods: {
      sendFeature (data) {
        this.$emit('sendfeature',data)
      },
    }
  }
</script>
<style lang="scss">
  @import "../styles/alpheios";

  .alpheios-morph__lexemes {
    color: $alpheios-tools-color;
  }
</style>
