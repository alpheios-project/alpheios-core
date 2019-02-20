<template>
  <div>
    <div class="alpheios-morph__lexemes morph-inner-v1">
      <morph-inner
          :count="count"
          :index="index"
          :key="lex.lemma.ID"
          :lex="lex"
          :linkedfeatures="linkedfeatures"
          @sendfeature="sendFeature"
          v-for="(lex,index) in lexemes"
          v-show="showLexeme(lex)"
      ></morph-inner>
    </div><!--alpheios-morph__lexemes-->
  </div>
</template>
<script>
import MorphInner from './morph-inner.vue'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Morph',
  components: { morphInner: MorphInner },
  storeModules: ['app'],
  mixins: [DependencyCheck],
  props: {
    linkedfeatures: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    lexemes () {
      return (this.$store.state.app.homonym && this.$store.state.app.homonym.lexemes) ? this.$store.state.app.homonym.lexemes : []
    },

    count () {
      return (this.$store.state.app.homonym && this.$store.state.app.homonym.lexemes) ? this.$store.state.app.homonym.lexemes.length : 0
    }

    // TODO: This is not used now. Will we need it in the future?
    /* linkedFeatures () {
      return LanguageModelFactory.getLanguageModel(this.$store.app.homonym.lexemes[0].lemma.languageID).grammarFeatures()
    } */
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
