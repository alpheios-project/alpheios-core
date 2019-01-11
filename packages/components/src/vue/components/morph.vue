<template>
  <div>
    <div class="alpheios-morph__lexemes morph-inner-v1">
      <morph-inner
          :count="lexemes.length"
          :definitions="definitions[lex.lemma.ID] ? definitions[lex.lemma.ID] : []"
          :index="index"
          :key="lex.lemma.ID"
          :lex="lex"
          :linkedfeatures="linkedfeatures"
          :messages="messages"
          :morphDataReady="morphDataReady"
          :translations="translations"
          @sendfeature="sendFeature"
          v-for="(lex,index) in lexemes"
          v-show="showLexeme(lex)"
      ></morph-inner>
    </div><!--alpheios-morph__lexemes-->
  </div>
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
    },
    morphDataReady: {
      type: Boolean,
      required: true
    },
    messages: {
      type: Object,
      required: false
    }
  },
  methods: {
    showLexeme (lex) {
      return (lex.isPopulated) ? lex.isPopulated() : false
    },
    sendFeature (data) {
      this.$emit('sendfeature', data)
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-morph__lexemes {
    color: $alpheios-tools-color;
  }
</style>
