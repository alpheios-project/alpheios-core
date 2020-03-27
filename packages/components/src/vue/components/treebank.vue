<template>
  <div class="alpheios-treebank">
    <iframe :src="$store.state.lexis.treebankSrc" class="alpheios-treebank__frame" id="alpheios-treebank-frame" :style="{width: `${iframeWidth}px`}"></iframe>
  </div>
</template>
<script>
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
/*
A minimal height of the treebank's iframe, shall be no less than 43em,
but no more than that because max width of panel's content is 800px and
treebank frame will not if in if too wide
*/
const initialIframeWidth = 690

export default {
  name: 'Treebank',
  inject: ['l10n'],
  storeModules: ['lexis'],
  mixins: [DependencyCheck],
  data () {
    return {
      iframeWidth: initialIframeWidth
    }
  },

  watch: {
    '$store.state.lexis.treebankRefreshDT' (value) {
      /*
      A change in the value of `treebankRefreshDT` serves as an indication that
      a treebank view within an iframe needs to be refreshed.
      Fot the reason unknown it, being placed into an iframe inside a Vue component
      may not render itself properly in some circumstances (that is not the case
      when a treebank view is placed into a page directly).
      To fix this, we will change the width of an iframe by one pixel.
      This will force a treebank view to refresh itself.
       */
      this.iframeWidth === initialIframeWidth ? this.iframeWidth-- : this.iframeWidth++
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
