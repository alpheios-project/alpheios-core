<template>
  <div
      class="alpheios-action-menu alpheios-content"
      v-show="visible"
  >
    <close-icon
        class="alpheios-action-menu__close-icon"
        @click.stop="close"
    />

    <div class="alpheios-action-menu__lookup-cont">
      <lookup
          class="alpheios-action-menu__lookup"
          :name-base="`action-panel`"
          :show-lang-selector="false"
      />
      <progress-bar
          class="alpheios-action-menu__progress-bar"
          v-if="$store.getters['app/lexicalRequestInProgress']"
      />
    </div>

    <div class="alpheios-action-menu__nav-cont">
      <alph-tooltip
          :tooltipText="tooltipText('TOOLTIP_DEFINITIONS', $store.getters['app/fullDefDataReady'])"
          :tooltipDirection="tooltipDirection"
      >
        <div
            :class="{ disabled: !$store.getters['app/fullDefDataReady'] }"
            @click.stop="showPanelTab('definitions')"
            class="alpheios-action-menu__navbutton"
        >
          <definitions-icon/>
        </div>
      </alph-tooltip>

      <alph-tooltip
          :tooltipText="tooltipText('TOOLTIP_INFLECT', $store.state.app.hasInflData)"
          :tooltipDirection="tooltipDirection"
      >
        <div
            @click.stop="showPanelTab('inflections')"
            class="alpheios-action-menu__navbutton"
            :class="{ disabled: !$store.state.app.hasInflData }"
        >
          <inflections-icon/>
        </div>
      </alph-tooltip>

      <alph-tooltip
          :tooltipText="tooltipText('TOOLTIP_WORD_USAGE', $store.state.app.wordUsageExampleEnabled)"
          :tooltipDirection="tooltipDirection"
      >
        <div
            @click.stop="showPanelTab('wordUsage')"
            class="alpheios-action-menu__navbutton"
            :class="{ disabled: !$store.state.app.wordUsageExampleEnabled }"
        >
          <word-usage-icon/>
        </div>
      </alph-tooltip>

      <alph-tooltip
          :tooltipText="tooltipText('TOOLTIP_TREEBANK', $store.getters['app/hasTreebankData'])"
          :tooltipDirection="tooltipDirection"
      >
        <div
            @click.stop="showPanelTab('treebank')"
            class="alpheios-action-menu__navbutton"
            :class="{ disabled: !$store.getters['app/hasTreebankData'] }"
        >
          <treebank-icon/>
        </div>
      </alph-tooltip>
    </div>

    <div class="alpheios-action-menu__nav-cont">
      <alph-tooltip
          :tooltip-text="tooltipText('TOOLTIP_INFLECT_BROWSER')"
          :tooltip-direction="tooltipDirection"
      >
        <div
            @click.stop="showPanelTab('inflectionsbrowser')"
            class="alpheios-action-menu__navbutton"
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
            class="alpheios-action-menu__navbutton"
            @click.stop="showPanelTab('grammar')"
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
            class="alpheios-action-menu__navbutton"
            @click.stop="showPanelTab('wordlist')"
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
            class="alpheios-action-menu__navbutton"
            @click.stop="showPanelTab('user')"
        >
          <user-icon/>
        </div>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="tooltipText('TOOLTIP_OPTIONS')"
          :tooltip-direction="tooltipDirection"
      >
        <div
            class="alpheios-action-menu__navbutton"
            @click.stop="showPanelTab('options')"
        >
          <options-icon/>
        </div>
      </alph-tooltip>
    </div>
  </div>
</template>
<script>
import Tooltip from '@/vue/components/tooltip.vue'
import ProgressBar from '@/vue/components/progress-bar.vue'
// Embeddable SVG icons
import DefinitionsIcon from '@/images/inline-icons/definitions.svg'
import InflectionsIcon from '@/images/inline-icons/inflections.svg'
import InflectionsBrowserIcon from '@/images/inline-icons/inflections-browser.svg'
import TreebankIcon from '@/images/inline-icons/sitemap.svg'
import UserIcon from '@/images/inline-icons/user.svg'
import OptionsIcon from '@/images/inline-icons/options.svg'
import GrammarIcon from '@/images/inline-icons/resources.svg'
import UsageExamplesIcon from '@/images/inline-icons/usage-examples-icon1.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import CloseIcon from '@/images/inline-icons/x-close.svg'
// Vue components
import Lookup from '@/vue/components/lookup.vue'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'ActionPanelMenu',
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
    definitionsIcon: DefinitionsIcon,
    inflectionsIcon: InflectionsIcon,
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    treebankIcon: TreebankIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    grammarIcon: GrammarIcon,
    wordUsageIcon: UsageExamplesIcon,
    wordlistIcon: WordlistIcon,
    closeIcon: CloseIcon
  },

  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data: function () {
    return {
      lookupVisible: false,
      contentVisible: false,

      // How much an action panel has been dragged from its initial position, in pixels
      shift: {
        x: 0, // this.moduleConfig.initialShift.x,
        y: 0 // this.moduleConfig.initialShift.y
      },

      tooltipDirection: 'top'
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

    close () {
      this.$emit('close-action-menu')
    },

    showPanelTab (tabName) {
      this.ui.showPanelTab(tabName)
      this.close()
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-action-menu {
    width: 300px;
    height: 245px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 20px;
    @include alpheios-ui-border;
    background-color: var(--alpheios-text-bg-color);
    transition: display 0.4s;
    z-index: 100;
  }

  .alpheios-action-menu__close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    width: 20px;
    height: auto;
    fill: var(--alpheios-color-vivid);

    &:hover,
    &:focus {
      fill: var(--alpheios-color-vivid-hover);
    }

    &:active {
      fill: var(--alpheios-color-vivid-pressed);
    }
  }

  .alpheios-action-menu__lookup-cont {
    margin: 20px 0 10px;
    height: 90px;
    position: relative;
  }

  .alpheios-action-menu__lookup {
    & input.alpheios-input,
    & input.alpheios-input:focus {
      width: 65%;
    }
  }

  .alpheios-action-menu__progress-bar {
    position: absolute;
    left: 0;
    top: 70px;
    width: 100%;

    & .alpheios-popup-lexdataloading__progress-inner {
      height: 16px;
      border-color: var(--alpheios-color-vivid);
    }

    & .alpheios-popup-lexdataloading__progress-line {
      background-color: var(--alpheios-color-vivid-hover);
      left: 0.6%;
      top: 1px;
      height: 10px;
      width: 98.8%;
    }

    & .alpheios-popup-lexdataloading__progress-text {
      display: none;
    }
  }

  .alpheios-action-menu__nav-cont {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;

    & .alph_tooltip {
      margin-right: 8px;
    }
  }

  .alpheios-action-menu__navbutton {
    display: block;
    width: uisize(44px);
    height: uisize(44px);
    cursor: pointer;
    fill: var(--alpheios-icon-color);
    stroke: var(--alpheios-icon-color);
    background-color: var(--alpheios-color-dark);
    border-radius: 50%;

    &.disabled {
      fill: var(--alpheios-color-neutral-dark);
      stroke: var(--alpheios-color-neutral-dark);
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
