<template>
  <div
      id="alpheios-toolbar-inner"
      class="alpheios-content alpheios-toolbar alpheios-toolbar--large"
      :class="componentClasses"
      :style="componentStyles"
      v-show="$store.state.toolbar.visible"
  >
    <div
        id="alpheios-toolbar-drag-handle"
        class="alpheios-toolbar__drag-handle"
    >
      <div class="alpheios-toolbar__logo-icon">
        <logo-icon class="alpheios-logo-on-dark"/>
      </div>
    </div>
    <div
        class="alpheios-toolbar__lookup-control"
        @click="lookupVisible = !lookupVisible"
    >
      <alph-tooltip
          :tooltip-text="l10n.getText('LABEL_LOOKUP_CONTROL')"
          :tooltip-direction="tooltipDirection"
      >
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
      <collapsed-icon v-show="!contentVisible" />
      <expanded-icon v-show="contentVisible" />
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
      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_HELP')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            @click="ui.togglePanelTab('info')"
            class="alpheios-navbuttons__btn"
            :class="{ active: $store.getters['ui/isActiveTab']('info') }"
        >
          <info-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_INFLECT_BROWSER')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            @click="ui.togglePanelTab('inflectionsbrowser')"
            class="alpheios-navbuttons__btn"
            :class="{ active: $store.getters['ui/isActiveTab']('inflectionsbrowser') }"
        >
          <inflections-browser-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_GRAMMAR')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('grammar'), disabled: !$store.getters[`app/hasGrammarRes`] }"
            class="alpheios-navbuttons__btn"
            @click="ui.togglePanelTab('grammar')"
        >
          <grammar-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_OPTIONS')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('options') }"
            class="alpheios-navbuttons__btn"
            @click="ui.togglePanelTab('options')"
        >
          <options-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_USER')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('user'), disabled: !$store.state.auth.enableLogin }"
            class="alpheios-navbuttons__btn"
            @click="ui.togglePanelTab('user')"
        >
          <user-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_WORDLIST')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('wordlist'), disabled: !$store.state.app.hasWordListsData }"
            class="alpheios-navbuttons__btn"
            @click="ui.togglePanelTab('wordlist')"
        >
          <wordlist-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_STATUS')"
          :tooltip-direction="tooltipDirection"
          v-show="settings.contentOptions.items.verboseMode.currentValue === `verbose`"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('status') }"
            class="alpheios-navbuttons__btn"
            @click="ui.togglePanelTab('status')"
        >
          <status-icon/>
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
import InflectionsBrowserIcon from '@/images/inline-icons/inflections-browser.svg'
import StatusIcon from '@/images/inline-icons/status.svg'
import UserIcon from '@/images/inline-icons/user.svg'
import OptionsIcon from '@/images/inline-icons/options.svg'
import GrammarIcon from '@/images/inline-icons/resources.svg'
import InfoIcon from '@/images/inline-icons/info.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import CollapsedIcon from '@/images/inline-icons/collapsed.svg'
import ExpandedIcon from '@/images/inline-icons/expanded.svg'
import LookupIcon from '@/images/inline-icons/lookup.svg'
// Vue components
import ToolbarCompact from '@/vue/components/nav/toolbar-compact.vue'
import Lookup from '@/vue/components/lookup.vue'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'Toolbar',
  extends: ToolbarCompact,
  // API modules that are required for this component
  inject: {
    app: 'app',
    ui: 'ui',
    l10n: 'l10n',
    settings: 'settings'
  },
  storeModules: ['toolbar', 'app', 'ui'], // Store modules that are required by this component
  mixins: [DependencyCheck],
  components: {
    lookup: Lookup,
    alphTooltip: Tooltip,
    logoIcon: LogoIcon,
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    statusIcon: StatusIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    infoIcon: InfoIcon,
    grammarIcon: GrammarIcon,
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
  props: {
    moduleData: {
      type: Object,
      required: true
    }
  },

  data: function () {
    return {
      lookupVisible: false,
      contentVisible: false,

      // How much a toolbar has been dragged from its initial position, in pixels
      shift: {
        x: this.moduleData.initialShift.x,
        y: this.moduleData.initialShift.y
      }
    }
  },

  computed: {
    componentStyles: function () {
      let styles = {
        transform: `translate(${this.shift.x}px, ${this.shift.y}px)`
      }

      if (this.moduleData.initialPos) {
        if (this.moduleData.initialPos.top) {
          styles.top = this.moduleData.initialPos.top
        }
        if (this.moduleData.initialPos.right) {
          styles.right = this.moduleData.initialPos.right
        }
        if (this.moduleData.initialPos.bottom) {
          styles.bottom = this.moduleData.initialPos.bottom
        }
        if (this.moduleData.initialPos.left) {
          styles.left = this.moduleData.initialPos.left
        }
      }
      return styles
    },

    isInLeftHalf: function () {
      if (this.moduleData.initialPos.hasOwnProperty(`right`)) {
        return (window.innerWidth / 2 - this.moduleData.initialPos.right + this.shift.x < 0)
      } else if (this.moduleData.initialPos.hasOwnProperty(`left`)) {
        return (this.moduleData.initialPos.left + this.shift.x < window.innerWidth / 2)
      } else {
        // We have no information in which part of the screen the toolbar is, will default to right
        return false
      }
    },

    componentClasses: function () {
      return this.isInLeftHalf ? 'alpheios-toolbar--left' : 'alpheios-toolbar--right'
    },

    tooltipDirection: function () {
      return this.isInLeftHalf ? 'right' : 'left'
    }
  },

  methods: {
    dragMoveListener (event) {
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
      this.shift.x += dx
      this.shift.y += dy
    },

    dragEndListener () {
      this.settings.contentOptions.items.toolbarShiftX.setValue(this.shift.x)
      this.settings.contentOptions.items.toolbarShiftY.setValue(this.shift.y)
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
        ignoreFrom: 'input, textarea, a[href], select, option'
      })
      .on('dragmove', this.dragMoveListener)
      .on('dragend', this.dragEndListener)
      .on('resizemove', this.resizeListener)
  }
}
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-toolbar {
    &.alpheios-toolbar--large {
      background: transparent;
    }

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
    border-radius: uisize(10px) 0 0 uisize(10px);
    box-sizing: border-box;
    padding: uisize(10px) uisize(20px) uisize(10px) uisize(10px);
    // To place it below other toolbar elements so that it will blend smoothly with rounded corners of those
    z-index: -1;

    .alpheios-toolbar--left & {
      left: $alpheios-toolbar-base-width - 10px;
      border-radius: 0 uisize(10px) uisize(10px) 0;
      padding: uisize(10px) uisize(10px) uisize(10px) uisize(20px);
    }

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

    .alpheios-navbuttons__btn.disabled {
      fill: var(--alpheios-color-neutral-dark);
      stroke: var(--alpheios-color-neutral-dark);
      cursor: default;
    }
  }
</style>
