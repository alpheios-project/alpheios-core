<template>
  <div
      :class="rootClasses"
      :style="componentStyles"
      class="alpheios-panel alpheios-panel--large alpheios-content"
      data-component="alpheios-panel"
      data-resizable="true"
      :data-resized="resized"
      id="alpheios-panel-inner"
      v-on-clickaway="ui.closePanel"
      v-show="$store.state.panel.visible"
  >

    <div class="alpheios-panel__header">
      <div class="alpheios-panel__header-logo">
        <logo-icon class="alpheios-logo-on-dark"/>
      </div>

      <div class="alpheios-panel__header-btn-group--center">

        <navbuttons-large v-show="showNav"></navbuttons-large>
        <div class="alpheios-panel__nav-spacer" v-show="! showNav"></div>

        <alph-tooltip :tooltipText="swapTooltip" tooltipDirection="bottom-narrow">
          <span @click="swapPosition()"
                class="alpheios-navbuttons__btn">
              <swap-position></swap-position>
          </span>
        </alph-tooltip>
      </div>

      <div class="alpheios-panel__header-btn-group--end">
          <div @click="ui.closePanel" class="alpheios-panel__close-btn">
              <close-icon></close-icon>
          </div>
      </div>
    </div>

    <div class="alpheios-panel__content">
      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__definitions"
          v-show="$store.getters['ui/isActiveTab']('definitions')"
          data-alpheios-ignore="all"
          >
        <div v-if="$store.getters['app/shortDefDataReady']">
          <div :key="definition.ID"
               class="alpheios-panel__contentitem"
               v-for="definition in formattedShortDefinitions"
          >
            <shortdef
                :definition="definition"
                :languageCode="$store.state.app.languageCode"
            />
          </div>
        </div>

        <div v-if="$store.getters['app/fullDefDataReady']">
          <div
              class="alpheios-panel__contentitem alpheios-panel__contentitem-full-definitions"
              v-html="formattedFullDefinitions"/>
        </div>
      </div>

      <div
          :id="inflectionsPanelID"
          class="alpheios-panel__tab-panel alpheios-panel__tab__inflections"
          v-show="$store.state.app.hasInflData && $store.getters['ui/isActiveTab']('inflections')"
          data-alpheios-ignore="all"
      >
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_PANEL') }}
        </h1>
        <inflections class="alpheios-panel-inflections"></inflections>
      </div>

      <div :id="inflectionsBrowserPanelID" class="alpheios-panel__tab-panel alpheios-panel__tab__inflectionsbrowser"
           v-show="$store.getters['ui/isActiveTab']('inflectionsbrowser')"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_INFLECTIONS_BROWSER_PANEL') }}
        </h1>
        <inflection-browser/>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__grammar
            alpheios-panel__tab-panel--no-padding"
            data-alpheios-ignore="all"
            v-show="$store.getters['ui/isActiveTab']('grammar')">
        <grammar></grammar>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab__treebank"
          v-if="$store.getters['app/hasTreebankData']" v-show="$store.getters['ui/isActiveTab']('treebank')"
          data-alpheios-ignore="all">
        <treebank/>
      </div>
      <div class="alpheios-panel__tab-panel alpheios-panel__tab__status"
           v-show="$store.getters['ui/isActiveTab']('status')"
           data-alpheios-ignore="all">
         <!-- Messages to be displayed in a status panel -->
        <div v-for="message in $store.state.ui.messages">
          <div class="alpheios-panel__message">{{message}}</div>
        </div>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__user"
          v-if="$store.state.auth.enableLogin" v-show="$store.getters['ui/isActiveTab']('user')"
           data-alpheios-ignore="all">
        <user-auth></user-auth>
      </div>

      <div
          class="alpheios-panel__tab-panel alpheios-panel__tab-panel--scroll"
          v-show="$store.getters['ui/isActiveTab']('wordUsage')"
        >
        <word-usage-examples/>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab-panel--options"
           v-show="$store.getters['ui/isActiveTab']('options')"
           data-alpheios-ignore="all"
      >
        <options-panel />
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__info"
           v-show="$store.getters['ui/isActiveTab']('info')"
           data-alpheios-ignore="all">
        <h1
            class="alpheios-panel__title"
        >
          {{ l10n.getText('TITLE_HELP_PANEL') }}
        </h1>
        <info></info>
      </div>

      <div class="alpheios-panel__tab-panel alpheios-panel__tab__wordlist"
           v-show="$store.getters['ui/isActiveTab']('wordlist')"
           data-alpheios-ignore="all"
      >
        <word-list-panel/>
      </div>
    </div>

    <notification-area/>
  </div>
</template>
<script>
/*
    This is a desktop version of a panel
     */
// JS imports
import interact from 'interactjs'
// UI components
import NavbuttonsLarge from '@/vue/components/nav/navbuttons-large.vue'
// SVG icons
import LogoIcon from '@/images/alpheios/logo.svg'
import SwapPosition from '@/images/inline-icons/swap-horizontally.svg'
// Vue components
import CompactPanel from '@/vue/components/panel-compact.vue'
import Tooltip from '@/vue/components/tooltip.vue'
import Info from '@/vue/components/info.vue'

export default {
  name: 'PanelLarge',
  extends: CompactPanel,
  components: {
    alphTooltip: Tooltip,
    info: Info,
    navbuttonsLarge: NavbuttonsLarge,
    logoIcon: LogoIcon,
    swapPosition: SwapPosition
  },
  // A minimal width of a panel, in pixels. It should be large enough to fit all the buttons of a large size into the panel
  minWidth: 698,
  // Maximum allowed size of a panel, as percentage of the viewport width.
  maxWidthPct: 80,

  // custom property for use in constructing keys on subcomponents
  prefixName: 'panel-large',

  computed: {
    showNav() {
      return this.moduleConfig.showNav
    },
    rootClasses () {
      return this.$options.positionClassVariants[this.$store.state.panel.position]
    },

    swapTooltip () {
      return this.isAttachedToLeft
        ? this.l10n.getText('TOOLTIP_MOVE_PANEL_RIGHT')
        : this.l10n.getText('TOOLTIP_MOVE_PANEL_LEFT')
    }
  },

  mounted: function () {
    // Determine paddings and sidebar width for calculation of a panel width to fit content
    if (typeof this.$el.querySelector === 'function') {
      const maxWidth = Math.floor(document.documentElement.clientWidth / 100 * this.$options.maxWidthPct)

      // Initialize Interact.js: make panel resizable
      interact(this.$el)
        .resizable({
          // resize from all edges and corners
          edges: { left: true, right: true, bottom: false, top: false },

          // keep the edges inside the parent
          restrictEdges: {
            outer: document.body,
            endOnly: true
          },

          // minimum size
          restrictSize: {
            min: { width: this.$options.minWidth },
            max: { width: maxWidth }
          },

          inertia: true
        })
        .on('resizemove', event => {
          let target = event.target
          // Indicate that panel received a custom size
          this.resized = true
          // update the element's style
          target.style.width = `${event.rect.width}px`
        })
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/variables";

  .alpheios-panel--large {
    height: 100vh;
    max-width: 80vw;
    top: 0;

    .alpheios-navbuttons__btn {
      svg {
        width: uisize(22px);
      }
    }

    /** make sure the panel is wide enough when we don't have navigation **/
    .alpheios-panel__nav-spacer {
      width: 600px;
    }

    &.alpheios-panel--left {
      .alpheios-panel__header {
        padding-left: uisize(14px);
      }
    }

    .alpheios-panel__header-logo {
      width: uisize(44px);
      height: auto;
    }

    .alpheios-panel__header-btn-group--center {
      direction: ltr;
      display: flex;
      flex-wrap: nowrap;
      box-sizing: border-box;
      align-items: stretch;
    }

    .alpheios-panel__close-btn {
      width: uisize(80px);
    }

    .alpheios-panel__header {
      background: var(--alpheios-desktop-panel-header-bg);
    }

    .alpheios-navbuttons__btn,
    .alpheios-panel__close-btn {
        fill: var(--alpheios-desktop-panel-icon-color);
        stroke: var(--alpheios-desktop-panel-icon-color);
        background: var(--alpheios-desktop-panel-icon-bg);

        &:hover,
        &:focus {
          fill: var(--alpheios-desktop-panel-icon-color-hover);
          stroke: var(--alpheios-desktop-panel-icon-color-hover);
          background: var(--alpheios-desktop-panel-icon-bg-hover);
        }

        &:active,
        &.active {
          fill: var(--alpheios-desktop-panel-icon-color-pressed);
          stroke: var(--alpheios-desktop-panel-icon-color-pressed);
          background: var(--alpheios-desktop-panel-icon-bg-active);
        }
    }

    .alpheios-reset-button {
      color: var(--alpheios-settings-reset-button-color);
      background-color: var(--alpheios-settings-reset-button-bg);
      border-color: var(--alpheios-settings-reset-button-border-color);

      &:hover,
      &:focus,
      &:active {
        color: var(--alpheios-settings-reset-button-color-hover);
        background-color: var(--alpheios-settings-reset-button-bg-hover);
        border-color: var(--alpheios-settings-reset-button-border-color-hover);
      }
    }
  }
</style>
