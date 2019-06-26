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
  storeModules: ['app', 'ui'],
  mixins: [DependencyCheck],

  computed: {
    /*
    Returns a source URL of a treebank page. This computed prop will be cached by Vue.js.
    If caching will not work effectively, we shall prevent unnecessary page reloads manually.
    */
    srcURL: function () {
      if (this.$store.getters['ui/isActiveTab']('treebank')) {
        /*
        The arethusa application can't initialize itself properly
        if it's not visible, so we wait to update the src url of the
        parent iframe until the tab is visible.
         */

        // Treebank is visible
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
      } else {
        // Treebank is hidden
        return ''
      }
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-treebank {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .alpheios-treebank__frame {
    /*
    A minimal height of the treebank's iframe, shall be no less than 43em,
    but no more than that because max width of panel's content is 800px and
    treebank frame will not if in if too wide
    */
    width: 690px;
    flex: 1 1 100vh;
    height: 100%;
  }
</style>
