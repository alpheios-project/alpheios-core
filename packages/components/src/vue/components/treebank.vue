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
  mixins: [DependencyCheck]
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
    width: 100%;
    flex: 1 1 100vh;
    height: 100%;
  }
</style>
