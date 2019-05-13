<template>
  <div
      id="alpheios-toolbar-inner"
      class="alpheios-content alpheios-toolbar alpheios-toolbar--compact"
      :style="componentStyles"
      v-show="$store.state.toolbar.visible"
      @click="openActionPanel"
  >
    <toolbar-icon/>
  </div>
</template>
<script>
// Embeddable SVG icons
import ToolbarIcon from '@/images/inline-icons/reading-tools.svg'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Toolbar',
  // API modules that are required for this component
  inject: {
    app: 'app',
    ui: 'ui',
    l10n: 'l10n'
  },
  storeModules: ['toolbar', 'app', 'ui', 'actionPanel'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    toolbarIcon: ToolbarIcon
  },

  computed: {
    componentStyles: function () {
      return {
        zIndex: this.ui.zIndex
      }
    }
  },

  methods: {
    openActionPanel: function () {
      // Toggle an action panel
      this.$store.state.actionPanel.visible
        ? this.$store.commit('actionPanel/close')
        : this.$store.commit('actionPanel/open')
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-toolbar {
    position: fixed;

    &.alpheios-toolbar--compact {
      cursor: pointer;
      background-color: var(--alpheios-toolbar-bg-color);
      border-radius: 50%;
      right: 15px;
      bottom: 60px;
      width: 44px;
      height: 44px;

      svg {
        width: uisize(20px);
        height: auto;
        position: relative;
        fill: var(--alpheios-icon-color);
        stroke: var(--alpheios-icon-color);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
