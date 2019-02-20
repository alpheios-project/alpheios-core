<template>
  <div>
    <div class="alpheios-morph__lexemes morph-inner-v1">
      <morph-inner
          :count="count"
          :index="index"
          :key="lex.lemma.ID"
          :lex="lex"
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
  computed: {
    lexemes () {
      return (this.$store.state.app.homonym && this.$store.state.app.homonym.lexemes) ? this.$store.state.app.homonym.lexemes : []
    },

    count () {
      return (this.$store.state.app.homonym && this.$store.state.app.homonym.lexemes) ? this.$store.state.app.homonym.lexemes.length : 0
    }
  },
  methods: {
    showLexeme (lex) {
      return (lex.isPopulated) ? lex.isPopulated() : false
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
