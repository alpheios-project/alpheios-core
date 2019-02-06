<template>
  <div class="alpheios-treebank">
    <iframe :src="srcURL" class="alpheios-treebank__frame"></iframe>
  </div>
</template>
<script>
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Treebank',
  inject: ['l10n'],
  storeModules: ['app'],
  mixins: [DependencyCheck],
  computed: {
    visible: function () {
      return this.$store.getters[`app/hasTreebankData`]
    },

    /*
    Returns a source URL of a treebank page. This computed prop will be cached by Vue.js.
    If caching will not work effectively, we shall prevent unnecessary page reloads manually.
    */
    srcURL: function () {
      let newSrcUrl = this.$store.state.app.treebankData.page.src
      if (this.$store.state.app.treebankData.word &&
        this.$store.state.app.treebankData.word.src &&
        this.$store.state.app.treebankData.word.ref) {
        let [doc, ref] = this.$store.state.app.treebankData.word.ref.split(/#/)
        if (doc && ref) {
          let [s, w] = ref.split(/-/)
          newSrcUrl = this.$store.state.app.treebankData.word.src.replace('DOC', doc).replace('SENTENCE', s).replace('WORD', w)
        }
      }
      return newSrcUrl
    }
  },
  watch: {
    visible: function (val) {
      if (val) {
        this.$emit('treebankcontentwidth', '43em')
      }
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-treebank {
    display: flex;
    flex-direction: column;
  }

  .alpheios-treebank__frame {
    flex: 1 1 100vh;
  }
</style>
