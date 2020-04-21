<template>
  <div class="alpheios-treebank">
    <iframe :src="$store.state.lexis.treebankSrc" class="alpheios-treebank__frame" id="alpheios-treebank-frame"></iframe>
  </div>
</template>
<script>
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Treebank',
  inject: ['settings'],
  storeModules: ['lexis'],
  mixins: [DependencyCheck],
  data () {
    return {
      treebankSrcUrl: null
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
