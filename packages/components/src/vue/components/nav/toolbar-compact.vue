<template>
  <div
      id="alpheios-toolbar-inner"
      class="alpheios-content alpheios-toolbar alpheios-toolbar--compact"
      :style="componentStyles"
      v-show="$store.state.toolbar.visible"
      @click="ui.toggleActionPanel"
      data-alpheios-ignore="all"
  >
    <toolbar-icon/>
  </div>
</template>
<script>
// Embeddable SVG icons
import ToolbarIcon from '@/vue/icons/reading-toolsIcon.vue'

// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Toolbar',
  storeModules: ['toolbar', 'app', 'ui'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    toolbarIcon: ToolbarIcon
  },

  computed: {
    componentStyles: function () {
      return {
        zIndex: this.$store.state.ui.zIndexMax
      }
    },
    app () {
      return this.$api.app
    },
    ui () {
      return this.$api.ui
    },
    l10n () {
      return this.$api.l10n
    },
    settings () {
      return this.$api.settings
    },
    auth () {
      return this.$api.auth
    }
  }
}
</script>
<style lang="scss">
  @use "@/styles/_variables.scss" as *;

  .alpheios-toolbar {
    position: fixed;

    &.alpheios-toolbar--compact {
      cursor: pointer;
      background-color: var(--alpheios-compact-toolbar-bg);
      border-radius: 50%;
      right: 15px;
      bottom: 60px;
      width: 44px;
      height: 44px;

      svg {
        width: uisize(20px);
        height: auto;
        position: relative;
        fill: var(--alpheios-compact-toolbar-icon-color);
        stroke: var(--alpheios-compact-toolbar-icon-color);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
