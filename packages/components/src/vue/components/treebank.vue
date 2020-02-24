<template>
  <div class="alpheios-treebank">
    <iframe :src="srcURL" class="alpheios-treebank__frame" id="alpheios-treebank-frame"></iframe>
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
      let newSrcUrl = this.$store.state.app.treebankData.page.src
      if (this.$store.state.app.treebankData.word &&
        this.$store.state.app.treebankData.word.fullUrl) {
          newSrcUrl = this.$store.state.app.treebankData.word.fullUrl
      }
      if (! this.$store.getters['ui/isActiveTab']('treebank') &&
          this.$store.state.app.treebankData.word &&
          ! this.$store.state.app.treebankData.word.version ) {
        /*
        Prior to version 3 of treebank integration, which uses the Arethusa api
        The arethusa application could not initialize itself properly
        if it's not visible, so we wait to update the src url of the
        parent iframe until the tab is visible.
         */
        newSrcUrl = ''
      }
      return newSrcUrl
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
