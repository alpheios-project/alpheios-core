<template>
  <div class="alpheios-navbuttons alpheios-navbuttons--compact">
    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_MORPHOLOGY')" tooltipDirection="top">
      <div :class="{ active: $store.getters['ui/isActiveTab']('morphology') }" @click="ui.changeTab('morphology')"
            class="alpheios-navbuttons__btn">
        <morphology-icon></morphology-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_DEFINITIONS')" tooltipDirection="top"
                  v-show="$store.getters['app/defDataReady']">
      <div :class="{ active: $store.getters['ui/isActiveTab']('definitions') }" @click="ui.changeTab('definitions')"
            class="alpheios-navbuttons__btn">
        <definitions-icon></definitions-icon>
      </div>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT')" tooltipDirection="top"
                v-show="$store.state.app.hasInflData">
      <div @click="ui.changeTab('inflections')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('inflections') }">
        <inflections-icon></inflections-icon>
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
    width: 56px;
    height: 56px;
    text-align: center;
    cursor: pointer;
    fill: var(--alpheios-icon-color);
    stroke: var(--alpheios-icon-color);
    background-color: var(--alpheios-icon-bg-color);

    svg {
      width: 32px;
      height: auto;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }

    &:hover,
    &:focus {
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
