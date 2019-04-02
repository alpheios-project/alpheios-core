<template>
  <div
      id="alpheios-toolbar-inner"
      class="alpheios-content alpheios-toolbar"
  >
    <div
        id="alpheios-toolbar-drag-handle"
        class="alpheios-toolbar__drag-handle"
    >
      <div class="alpheios-toolbar__logo-icon">
        <logo-icon></logo-icon>
      </div>
    </div>
    <div
        class="alpheios-toolbar__lookup-control"
        @click="lookupVisible = !lookupVisible"
    >
      <alph-tooltip :tooltipText="l10n.getText('LABEL_LOOKUP_CONTROL')" tooltipDirection="left">
        <span class="alpheios-navbuttons__btn"
              :class="{ active: lookupVisible }">
          <lookup-icon></lookup-icon>
        </span>
      </alph-tooltip>
    </div>
    <div
        class="alpheios-toolbar__header"
        :class="{ expanded: contentVisible }"
        @click="contentVisible = !contentVisible"
    >
      <template v-if="!contentVisible">
        <collapsed-icon/>
      </template>
      <template v-else>
        <expanded-icon/>
      </template>
    </div>

    <div
        class="alpheios-toolbar__lookup"
        v-show="lookupVisible"
    >
      <lookup
          :name-base="`toolbar`"
          :use-page-lang-prefs="true"
          :show-language-settings-group="false"
      />
    </div>

    <div
        class="alpheios-toolbar__buttons"
        v-show="contentVisible">
      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_HELP')" tooltipDirection="left">
        <span @click="ui.togglePanelTab('info')" class="alpheios-navbuttons__btn"
              :class="{ active: $store.getters['ui/isActiveTab']('info') }">
          <info-icon></info-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_DEFINITIONS')" tooltipDirection="left" v-show="$store.getters['app/defDataReady']">
        <span :class="{ active: $store.getters['ui/isActiveTab']('definitions') }" @click="ui.togglePanelTab('definitions')"
              class="alpheios-navbuttons__btn">
          <definitions-icon></definitions-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT')" tooltipDirection="left"
                  v-show="$store.state.app.hasInflData">
        <span @click="ui.togglePanelTab('inflections')" class="alpheios-navbuttons__btn"
              v-bind:class="{ active: $store.getters['ui/isActiveTab']('inflections') }">
          <inflections-icon></inflections-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_INFLECT_BROWSER')" tooltipDirection="left">
        <span @click="ui.togglePanelTab('inflectionsbrowser')" class="alpheios-navbuttons__btn"
              v-bind:class="{ active: $store.getters['ui/isActiveTab']('inflectionsbrowser') }">
          <inflections-browser-icon></inflections-browser-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_GRAMMAR')" tooltipDirection="left"
                  v-show="$store.getters[`app/hasGrammarRes`]">
        <span @click="ui.togglePanelTab('grammar')" class="alpheios-navbuttons__btn"
              v-bind:class="{ active: $store.getters['ui/isActiveTab']('grammar') }">
          <grammar-icon></grammar-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_TREEBANK')" tooltipDirection="left"
                  v-show="$store.getters['app/hasTreebankData']">
        <span @click="ui.togglePanelTab('treebank')" class="alpheios-navbuttons__btn"
              v-bind:class="{ active: $store.getters['ui/isActiveTab']('treebank') }">
          <treebank-icon></treebank-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_OPTIONS')" tooltipDirection="left">
        <span @click="ui.togglePanelTab('options')" class="alpheios-navbuttons__btn"
              v-bind:class="{ active: $store.getters['ui/isActiveTab']('options') }">
          <options-icon></options-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_USER')" tooltipDirection="left"
                  v-if="Boolean(auth)">
        <span @click="ui.togglePanelTab('user')" class="alpheios-navbuttons__btn"
              v-bind:class="{ active: $store.getters['ui/isActiveTab']('user') }">
          <user-icon></user-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_WORD_USAGE')" tooltipDirection="left"
                  v-show="$store.state.app.wordUsageExamplesReady">
        <span @click="ui.togglePanelTab('wordUsage')" class="alpheios-navbuttons__btn"
              v-bind:class="{ active: $store.getters['ui/isActiveTab']('wordUsage') }">
          <word-usage-icon></word-usage-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_WORDLIST')" tooltipDirection="left">
        <span @click="ui.togglePanelTab('wordlist')" class="alpheios-navbuttons__btn"
              v-bind:class="{ active: $store.getters['ui/isActiveTab']('wordlist') }"
              v-show="this.$store.state.app.wordListUpdateTime && this.app.wordlistC && Object.keys(this.app.wordlistC.wordLists).length > 0">
          <wordlist-icon></wordlist-icon>
        </span>
      </alph-tooltip>

      <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_STATUS')" tooltipDirection="left">
        <span @click="ui.togglePanelTab('status')" class="alpheios-navbuttons__btn"
              v-bind:class="{ active: $store.getters['ui/isActiveTab']('status') }"
              v-show="this.settings.contentOptions.items.verboseMode.currentValue === `verbose`">
          <status-icon></status-icon>
        </span>
      </alph-tooltip>
    </div>
  </div>
</template>
<script>
import interact from 'interactjs'

import Tooltip from '@/vue/components/tooltip.vue'
// Embeddable SVG icons
import LogoIcon from '@/images/alpheios/logo.svg'
import DefinitionsIcon from '@/images/inline-icons/definitions.svg'
import InflectionsIcon from '@/images/inline-icons/inflections.svg'
import InflectionsBrowserIcon from '@/images/inline-icons/inflections-browser.svg'
import StatusIcon from '@/images/inline-icons/status.svg'
import UserIcon from '@/images/inline-icons/user.svg'
import OptionsIcon from '@/images/inline-icons/options.svg'
import GrammarIcon from '@/images/inline-icons/resources.svg'
import TreebankIcon from '@/images/inline-icons/sitemap.svg'
import InfoIcon from '@/images/inline-icons/info.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import WordUsageIcon from '@/images/inline-icons/usage-examples-icon1.svg'
import CollapsedIcon from '@/images/inline-icons/collapsed.svg'
import ExpandedIcon from '@/images/inline-icons/expanded.svg'
import LookupIcon from '@/images/inline-icons/lookup.svg'
// Vue components
import Lookup from '@/vue/components/lookup.vue'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Toolbar',
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
    lookup: Lookup,
    alphTooltip: Tooltip,
    logoIcon: LogoIcon,
    definitionsIcon: DefinitionsIcon,
    inflectionsIcon: InflectionsIcon,
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    statusIcon: StatusIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    infoIcon: InfoIcon,
    grammarIcon: GrammarIcon,
    treebankIcon: TreebankIcon,
    wordUsageIcon: WordUsageIcon,
    wordlistIcon: WordlistIcon,
    collapsedIcon: CollapsedIcon,
    expandedIcon: ExpandedIcon,
    lookupIcon: LookupIcon
  },
  interactInstance: null,
  dragTreshold: 100, // Drag distance values above this will be considered abnormal
  // Whether there is an error with Interact.js drag coordinates in the corresponding direction
  dragErrorX: false,
  dragErrorY: false,

  data: function () {
    return {
      lookupVisible: false,
      contentVisible: false
    }
  },
  methods: {
    dragMoveListener (event) {
      const target = this.$el
      let dx = event.dx
      let dy = event.dy
      /*
          On some websites Interact.js is unable to determine correct clientX or clientY coordinates.
          This will result in a popup moving abruptly beyond screen limits.
          To fix this, we will filter out erroneous coordinates and chancel a move in the corresponding
          direction as incorrect. This will allow us to keep the popup on screen by sacrificing its movement
          in (usually) one direction. This is probably the best we can do with all the information we have.
           */
      if (Math.abs(dx) > this.$options.dragTreshold) {
        if (!this.$options.dragErrorX) {
          console.warn(`Calculated horizontal drag distance is out of bounds: ${dx}. This is probably an error. Dragging in horizontal direction will be disabled.`)
          this.$options.dragErrorX = true
        }
        dx = 0
      }
      if (Math.abs(dy) > this.$options.dragTreshold) {
        if (!this.$options.dragErrorY) {
          console.warn(`Calculated vertical drag distance is out of bounds: ${dy}. This is probably an error. Dragging in vertical direction will be disabled.`)
          this.$options.dragErrorY = true
        }
        dy = 0
      }
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy
      target.style.webkitTransform = `translate(${x}px, ${y}px)`
      target.style.transform = `translate(${x}px, ${y}px)`
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
    }
  },
  mounted: function () {
    this.$options.interactInstance = interact(this.$el.querySelector('#alpheios-toolbar-drag-handle'))
      .draggable({
        inertia: true,
        autoScroll: false,
        restrict: {
          elementRect: { top: 0.5, left: 0.5, bottom: 0.5, right: 0.5 }
        },
        ignoreFrom: 'input, textarea, a[href], select, option',
        onmove: this.dragMoveListener
      })
      .on('resizemove', this.resizeListener)
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  $alpheios-toolbar-base-width: 44px;

  .alpheios-toolbar {
    background: transparent;
    position: fixed;
    top: 10px;
    right: 15px;
    z-index: 10000;

    .alpheios-navbuttons__btn {
      width: uisize($alpheios-toolbar-base-width);
      height: uisize($alpheios-toolbar-base-width);
      margin: uisize(8px) 0;
      box-sizing: border-box;
      position: relative;
      background-color: var(--alpheios-toolbar-bg-color);
      border: uisize(1px) solid var(--alpheios-border-color);
      border-radius: uisize(10px);
    }
  }

  .alpheios-toolbar__header {
    box-sizing: border-box;
    border: 1px solid var(--alpheios-border-color);
    border-bottom-left-radius: uisize(10px);
    border-bottom-right-radius: uisize(10px);
    cursor: pointer;
    background: var(--alpheios-text-bg-color);

    svg {
      width: uisize(20px);
      height: auto;
      position: relative;
      left: uisize(11px);
      top: uisize(-5px);
      fill: var(--alpheios-border-color);
    }

    &.expanded svg {
      top: uisize(5px);
    }

    &:hover svg {
      fill: var(--alpheios-icon-color-hover);
    }
  }

  .alpheios-toolbar__drag-handle {
    width: uisize($alpheios-toolbar-base-width);
    height: uisize($alpheios-toolbar-base-width);
    border-bottom: none;
    background: var(--alpheios-toolbar-bg-color);
    box-sizing: border-box;
    border-top-left-radius: uisize(10px);
    border-top-right-radius: uisize(10px);
  }

  .alpheios-toolbar__logo-icon {
    width: 60%;
    height: auto;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-45%, -45%);
  }

  .alpheios-toolbar__lookup-control {
    cursor: pointer;
    background: var(--alpheios-text-bg-color);

    .alpheios-navbuttons__btn {
      margin: 0;
      border-radius: 0;
      border-bottom: none;
    }
  }

  .alpheios-toolbar__lookup {
    display: flex;
    position: absolute;
    width: uisize(330px);
    height: uisize(90px);
    background: var(--alpheios-text-bg-color);
    left: uisize(-320px);
    top: 0;
    border: uisize(1px) solid var(--alpheios-border-color);
    border-top-left-radius: uisize(10px);
    border-bottom-left-radius: uisize(10px);
    border-right: none;
    box-sizing: border-box;
    padding: uisize(10px);
    padding-right: uisize(20px);
    // To place it below other toolbar elements so that it will blend smoothly with rounded corners of those
    z-index: -1;

    .alpheios-lookup__form {
      justify-content: flex-end;
    }

    .alph_tooltip {
      display: inline-block;
    }
  }

  .alpheios-toolbar__buttons {
    display: flex;
    flex-direction: column;
  }
</style>
