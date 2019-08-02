<template>
  <div
      :id="config.rootElementId"
      class="alpheios-action-panel alpheios-content"
      :class="{
        'alpheios-action-panel--lookup-visible': $store.state.actionPanel.showLookup,
        'alpheios-action-panel--nav-visible': $store.state.actionPanel.showNav
        }"
      :style="componentStyles"
      v-show="showPanel"
  >

    <span class="alpheios-action-panel__close-icon-span"
        @click.stop="$store.commit('actionPanel/close')">
      <close-icon
        class="alpheios-action-panel__close-icon"
      />
    </span>

    <div class="alpheios-action-panel__cont">
      <div
          class="alpheios-action-panel__lookup-cont"
          v-show="$store.state.actionPanel.showLookup"
      >


        <lookup
            class="alpheios-action-panel__lookup"
            :name-base="`action-panel`"
            :show-lang-selector="false"
            :show-results-in="config.lookupResultsIn"
            @lookup-started="lookupStarted"
        />
          <progress-bar
              class="alpheios-action-panel__progress-bar"
              v-if="$store.getters['app/lexicalRequestInProgress']"
          />
      </div>

      <div
          class="alpheios-action-panel__nav-cont"
          v-show="$store.state.actionPanel.showNav"
      >
        <alph-tooltip
            :tooltip-text="tooltipText('TOOLTIP_INFLECT_BROWSER')"
            :tooltip-direction="tooltipDirection"
        >
          <div
              @click.stop="openTab('inflectionsbrowser')"
              class="alpheios-action-panel__navbutton"
          >
            <inflections-browser-icon/>
          </div>
        </alph-tooltip>

        <alph-tooltip
            :tooltip-text="tooltipText('TOOLTIP_GRAMMAR', $store.getters[`app/hasGrammarRes`])"
            :tooltip-direction="tooltipDirection"
        >
          <div
              :class="{ disabled: !$store.getters[`app/hasGrammarRes`] }"
              class="alpheios-action-panel__navbutton"
              @click.stop="$store.getters[`app/hasGrammarRes`] ? openTab('grammar') : null"
          >
            <grammar-icon/>
          </div>
        </alph-tooltip>

        <alph-tooltip
            :tooltip-text="tooltipText('TOOLTIP_WORDLIST', $store.state.app.hasWordListsData)"
            :tooltip-direction="tooltipDirection"
        >
          <div
              :class="{ disabled: !$store.state.app.hasWordListsData }"
              class="alpheios-action-panel__navbutton"
              @click.stop="$store.state.app.hasWordListsData ? openTab('wordlist') : null"
          >
            <wordlist-icon/>
          </div>
        </alph-tooltip>

        <alph-tooltip
            :tooltip-text="tooltipText('TOOLTIP_USER', $store.state.auth.enableLogin)"
            :tooltip-direction="tooltipDirection"
        >
          <div
              :class="{ disabled: !$store.state.auth.enableLogin }"
              class="alpheios-action-panel__navbutton"
              @click.stop="$store.state.auth.enableLogin ? openTab('user') : null"
          >
            <user-icon/>
          </div>
        </alph-tooltip>

        <alph-tooltip
            :tooltip-text="tooltipText('TOOLTIP_OPTIONS')"
            :tooltip-direction="tooltipDirection"
        >
          <div
              class="alpheios-action-panel__navbutton"
              @click.stop="openTab('options')"
          >
            <options-icon/>
          </div>
        </alph-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
import Tooltip from '@/vue/components/tooltip.vue'
import ProgressBar from '@/vue/components/progress-bar.vue'
// Embeddable SVG icons
import InflectionsBrowserIcon from '@/images/inline-icons/inflections-browser.svg'
import UserIcon from '@/images/inline-icons/user.svg'
import OptionsIcon from '@/images/inline-icons/options.svg'
import GrammarIcon from '@/images/inline-icons/resources.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import CloseIcon from '@/images/inline-icons/x-close.svg'
// Vue components
import Lookup from '@/vue/components/lookup.vue'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'


export default {
  name: 'ActionPanel',
  // API modules that are required for this component
  inject: {
    ui: 'ui',
    l10n: 'l10n'
  },
  storeModules: ['actionPanel', 'app'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    lookup: Lookup,
    alphTooltip: Tooltip,
    progressBar: ProgressBar,
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    grammarIcon: GrammarIcon,
    wordlistIcon: WordlistIcon,
    closeIcon: CloseIcon
  },

  data: function () {
    return {
      lookupVisible: false,
      contentVisible: false,

      // How much an action panel has been dragged from its initial position, in pixels
      shift: {
        x: 0,
        y: 0
      },

      tooltipDirection: 'top'
    }
  },

  created () {
    // This is the earliest moment when data props are available
    this.shift.x = this.config.initialShift.x
    this.shift.y = this.config.initialShift.y
  },

  computed: {
    componentStyles: function () {
      let styles = {
        transform: `translate(${this.shift.x}px, ${this.shift.y}px)`,
        // Should stay on top of a toolbar
        zIndex: this.ui.zIndex + 10
      }

      if (this.$store.state.actionPanel.initialPos) {
        if (this.$store.state.actionPanel.initialPos.top) {
          styles.top = `${this.$store.state.actionPanel.initialPos.top}px`
        }
        if (this.$store.state.actionPanel.initialPos.right) {
          styles.right = `${this.$store.state.actionPanel.initialPos.right}px`
        }
        if (this.$store.state.actionPanel.initialPos.bottom) {
          styles.bottom = `${this.$store.state.actionPanel.initialPos.bottom}px`
        }
        if (this.$store.state.actionPanel.initialPos.left) {
          styles.left = `${this.$store.state.actionPanel.initialPos.left}px`
        }
      }
      return styles
    },

    showPanel: function () {
      // As modules are registered in an arbitrary order, panel module may not be available
      // during rendering of an action panel
      const panelVisible = this.$store.state.panel ? this.$store.state.panel.visible : false
      return this.$store.state.actionPanel.visible && !panelVisible
    },

    // Need this to return an object to Vue template when moduleConfig data is not available yet.
    config () {
      return this.moduleConfig || {}
    }
  },

  methods: {
    tooltipText (messageID, availabilityCondition = 'N/A') {
      if (availabilityCondition !== 'N/A') {
        return availabilityCondition
          ? this.l10n.getText(messageID)
          : `${this.l10n.getText(messageID)} (${this.l10n.getText('TOOLTIP_NOT_AVAIL_POSTFIX')})`
      }
      return this.l10n.getText(messageID)
    },

    openTab (tabName) {
      this.ui.showPanelTab(tabName)
      if (this.config.closeAfterNav) {
        this.$store.commit('actionPanel/close')
      }
    },

    // A callback for the `lookup-started` emitted by the Lookup component.
    lookupStarted () {
      if (this.config.closeAfterLookup) {
        this.$store.commit('actionPanel/close')
      }
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-action-panel {
    width: auto;
    height: auto;
    position: fixed;
    padding: 10px;
    @include alpheios-ui-border;
    background-color: var(--alpheios-text-bg-color);
    transition: display 0.4s;
  }
  .alpheios-action-panel__cont {
    margin-top: uisize(30px); /* must allow for the close icon */
  }

  .alpheios-action-panel.alpheios-action-panel--lookup-visible {
    height: ui-size(190px);
    width: ui-size(300px);
  }

  .alpheios-action-panel.alpheios-action-panel--nav-visible {
    height: ui-size(100px);
    width: ui-size(280px);
  }


  .alpheios-action-panel.alpheios-action-panel--lookup-visible.alpheios-action-panel--nav-visible {
    height: ui-size(270px);
    width: ui-size(300px);
  }

  .alpheios-action-panel__close-icon-span {
      display: inline-block;
      padding: uisize(8px);
      position: absolute;
      cursor: pointer;
      right: 10px;

    .alpheios-action-panel__close-icon {
      width: uisize(22px);
      height: uisize(22px);
      top: 50%;
      position: relative;
      fill: var(--alpheios-btn-primary-bg-color);
      &:hover,
      &:focus {
        fill: var(--alpheios-btn-primary-bg-color-hover);
      }
      &:active {
        fill: var(--alpheios-btn-primary-bg-color-pressed);
      }
    }
  }

  .alpheios-action-panel__lookup-cont {
    height: ui-size(90px);
    position: relative;
  }

  .alpheios-action-panel__lookup {
    & input.alpheios-input,
    & input.alpheios-input:focus {
      width: 65%;
    }
  }

  .alpheios-action-panel__progress-bar {
    position: absolute;
    left: 0;
    top: ui-size(70px);
    width: 100%;

    & .alpheios-popup-lexdataloading__progress-inner {
      height: ui-size(16px);
      border-color: var(--alpheios-compact-popup-progress-bar-line);
    }

    & .alpheios-popup-lexdataloading__progress-line {
      background-color: var(--alpheios-compact-popup-progress-bar-line);
      left: 0.6%;
      top: 1px;
      height: 10px;
      width: 98.8%;
    }

    & .alpheios-popup-lexdataloading__progress-text {
      display: none;
    }
  }

  .alpheios-action-panel__nav-cont {
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;

    & .alph_tooltip {
      margin-right: 8px;
    }
  }

  .alpheios-action-panel__navbutton {
    display: block;
    width: uisize(44px);
    height: uisize(44px);
    cursor: pointer;
    fill: var(--alpheios-compact-panel-icon-color);
    stroke: var(--alpheios-compact-panel-icon-color);
    background-color: var(--alpheios-compact-panel-icon-bg);
    border-radius: 50%;

    &.disabled {
      fill: var(--alpheios-compact-panel-icon-color-disabled);
      stroke: var(--alpheios-compact-panel-icon-color-disabled);
      cursor: default;
    }

    svg {
      width: 50%;
      height: auto;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover:not(.disabled),
    &:focus:not(.disabled) {
      fill: var(--alpheios-compact-panel-icon-color-hover);
      stroke: var(--alpheios-compact-panel-icon-color-hover);
      background-color: var(--alpheios-compact-panel-icon-bg);
    }

    &.active {
      fill: var(--alpheios-compact-panel-icon-color-active);
      stroke: var(--alpheios-compact-panel-icon-color-active);
      background-color: var(--alpheios-compact-panel-icon-bg);
    }
  }
</style>
