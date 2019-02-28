<template>
  <div
      id="alpheios-overlay-nav-inner"
      class="alpheios-overlay-nav"
  >
    <div
        id="alpheios-overlay-nav-drag-handle"
        class="alpheios-overlay-nav__drag-handle"
    >
      <img class="alpheios-overlay-nav__logo-icon" src="../../../images/icon.png">
    </div>
    <div
        class="alpheios-overlay-nav__header"
        :class="{ expanded: contentVisible }"
        @click="contentVisible = !contentVisible"
    >
      <template v-if="!contentVisible">
        <collapsed-icon></collapsed-icon>
      </template>
      <template v-else>
        <expanded-icon></expanded-icon>
      </template>
    </div>

    <div v-show="contentVisible">
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
import WordUsageIcon from '@/images/inline-icons/books-stack.svg'
import CollapsedIcon from '@/images/inline-icons/collapsed.svg'
import ExpandedIcon from '@/images/inline-icons/expanded.svg'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'OverlayNav',
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
    alphTooltip: Tooltip,
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
    expandedIcon: ExpandedIcon
  },
  interactInstance: null,
  dragTreshold: 100, // Drag distance values above this will be considered abnormal
  // Whether there is an error with Interact.js drag coordinates in the corresponding direction
  dragErrorX: false,
  dragErrorY: false,

  data: function () {
    return {
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
    this.$options.interactInstance = interact(this.$el.querySelector('#alpheios-overlay-nav-drag-handle'))
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
  @import "../../../styles/alpheios";

  .alpheios-overlay-nav {
    background: transparent;
    width: 30px;
    position: fixed;
    top: 10px;
    right: 15px;
    z-index: 10000;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;

    & .alpheios-navbuttons__btn {
      background: #FFF;
      border: 1px solid $alpheios-sidebar-header-border-color;
      padding: 5px;
    }

    & .alpheios-navbuttons__btn {
      width: 40px;
      height: 40px;
      margin: 10px 0;
      box-sizing: border-box;
      position: relative;
      padding: 0;
    }

    & .alpheios-navbuttons__btn svg {
      width: 20px;
      height: 20px;
      top: 9px;
      left: 0;
      position: relative;
      box-sizing: border-box;
    }

    & .alph_tooltip {
      position: relative;
    }

    & .alph_tooltip .tooltiptext {
      visibility: hidden;
      position: absolute;
      width: 120px;
      text-align: center;
      z-index: 1;
      opacity: 0;
      font-size: 12px;
      display: none;
      padding: 5px 0;
      border-radius: 6px;
      transition: opacity 0.6s ease 0s;
      background-color: rgb(252, 252, 250);
      color: rgb(78, 100, 118);
      border-width: 1px;
      border-style: solid;
      border-color: rgb(78, 100, 118);
      border-image: initial;
    }

    & .alph_tooltip-left {
      top: 5px;
      bottom: auto;
      right: 128%;
    }

    & .alph_tooltip-left::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 100%;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent #555;
    }

    & .alph_tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
      display: inline;
    }

    .alpheios-overlay-nav__header {
      height: 20px;
      width: 40px;
      box-sizing: border-box;
      border: 1px solid $alpheios-sidebar-header-border-color;
      cursor: pointer;
      background: #FFF;

      & svg {
        width: 20px;
        height: auto;
        position: relative;
        left: 9px;
        top: -5px;
        fill: $alpheios-sidebar-header-border-color;
      }

      &.expanded svg {
        top: 5px;
      }

      &:hover svg {
        fill: $alpheios-link-hover-color;
      }
    }

    .alpheios-overlay-nav__drag-handle {
      width: 40px;
      height: 30px;
      border: 1px solid $alpheios-sidebar-header-border-color;
      border-bottom: none;
      background: #FFF;
      box-sizing: border-box;
    }

    .alpheios-overlay-nav__logo-icon {
      width: 30px;
      height: auto;
      position: relative;
      top: 3px;
      left: 4px;
    }
  }
</style>
