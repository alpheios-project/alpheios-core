<template>
  <div class="alpheios-navbuttons alpheios-navbuttons--compact">
    <alph-tooltip
        :tooltipText="l10n.getText('TOOLTIP_MORPHOLOGY')"
        tooltipDirection="top"
        v-show="hasMorphologyData"
    >
      <div
          :class="{ active: $store.getters['ui/isActiveTab']('morphology') }"
          class="alpheios-navbuttons__btn"
          @click="ui.changeTab('morphology')"
      >
        <morphology-icon/>
      </div>
    </alph-tooltip>

    <alph-tooltip
        :tooltipText="l10n.getText('TOOLTIP_DEFINITIONS')"
        tooltipDirection="top"
        v-show="$store.getters['app/fullDefDataReady']"
    >
      <div
          :class="{ active: $store.getters['ui/isActiveTab']('definitions') }"
          class="alpheios-navbuttons__btn"
          @click="ui.changeTab('definitions')"
      >
        <definitions-icon/>
      </div>
    </alph-tooltip>

    <alph-tooltip
        :tooltipText="l10n.getText('TOOLTIP_INFLECT')"
        tooltipDirection="top"
        v-show="$store.state.app.hasInflData"
    >
      <div
          :class="{ active: $store.getters['ui/isActiveTab']('inflections') }"
          class="alpheios-navbuttons__btn"
          @click="ui.changeTab('inflections')"
      >
        <inflections-icon/>
      </div>
    </alph-tooltip>
  </div>
</template>
<script>
// Vue components
import Tooltip from '@/vue/components/tooltip.vue'
// Embeddable SVG icons
import MorphologyIcon from '@/images/inline-icons/language.svg'
import DefinitionsIcon from '@/images/inline-icons/definitions.svg'
import InflectionsIcon from '@/images/inline-icons/inflections.svg'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'NavbuttonsCompact',
  // API modules that are required for this component
  inject: {
    app: 'app',
    ui: 'ui',
    l10n: 'l10n',
    settings: 'settings',
    auth: { from: 'auth', default: null } // This module is options
  },
  storeModules: ['app', 'ui'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    morphologyIcon: MorphologyIcon,
    definitionsIcon: DefinitionsIcon,
    inflectionsIcon: InflectionsIcon,
    alphTooltip: Tooltip
  },

  computed: {
    hasMorphologyData: function () {
      return this.$store.state.app.morphDataReady && this.app.hasMorphData()
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-navbuttons {
    display: flex;
    align-items: center;
  }

  .alpheios-navbuttons__btn {
    display: block;
    width: uisize(56px);
    height: uisize(56px);
    cursor: pointer;
    fill: var(--alpheios-icon-color);
    stroke: var(--alpheios-icon-color);
    background-color: var(--alpheios-icon-bg-color);

    svg {
      width: 52%;
      height: auto;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover,
    &:focus,
    &.active:hover,
    &.active:focus{
      fill: var(--alpheios-icon-color-hover);
      stroke: var(--alpheios-icon-color-hover);
      background-color: var(--alpheios-icon-bg-color-hover);
    }

    &.active {
      fill: var(--alpheios-icon-color-active);
      stroke: var(--alpheios-icon-color-active);
      background-color: var(--alpheios-icon-bg-color-active);
    }
  }
</style>
