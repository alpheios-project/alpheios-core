<template>
  <div class="alpheios-navbuttons alpheios-navbuttons--compact">
    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_DEFINITIONS')" tooltipDirection="bottom-narrow">
      <span :class="{ active: $store.getters['ui/isActiveTab']('definitions') }" @click="app.changeTab('definitions')"
            class="alpheios-navbuttons__btn">
        <definitions-icon></definitions-icon>
      </span>
    </alph-tooltip>

    <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT')" tooltipDirection="bottom-narrow"
                v-show="$store.getters[`app/hasInflData`]">
      <span @click="app.changeTab('inflections')" class="alpheios-navbuttons__btn"
            v-bind:class="{ active: $store.getters['ui/isActiveTab']('inflections') }">
        <inflections-icon></inflections-icon>
      </span>
    </alph-tooltip>
  </div>
</template>
<script>
// Vue components
import Tooltip from '@/vue/components/tooltip.vue'
// Embeddable SVG icons
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
    definitionsIcon: DefinitionsIcon,
    inflectionsIcon: InflectionsIcon,
    alphTooltip: Tooltip
  }
}
</script>
<style lang="scss">
  @import "../../../styles/alpheios";

  .alpheios-navbuttons__btn {
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
    background: transparent no-repeat center center;
    background-size: contain;
    margin: 10px 5px;

    svg {
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: top;
    }
  }

  .alpheios-navbuttons__btn.alpheios-panel__header-nav-btn--short {
    margin: -10px 5px 20px;
  }

  .alpheios-navbuttons__btn,
  .alpheios-navbuttons__btn.active:hover,
  .alpheios-navbuttons__btn.active:focus {
    fill: $alpheios-link-color-dark-bg;
    stroke: $alpheios-link-color-dark-bg;
  }

  .alpheios-navbuttons__btn:hover,
  .alpheios-navbuttons__btn:focus,
  .alpheios-navbuttons__btn.active {
    fill: $alpheios-link-hover-color;
    stroke: $alpheios-link-hover-color;
  }
</style>
