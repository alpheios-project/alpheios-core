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
    </div>
    <div
        class="alpheios-toolbar__help-control">
      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_HELP')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            @click="showHelp"
            class="alpheios-navbuttons__btn"
            :class="{ active: $store.getters['ui/isActiveTab']('info') && $store.state.panel.open }"
        >
          <help-icon/>
        </span>
      </alph-tooltip>
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
    <div class="alpheios-toolbar__header alpheios-toolbar__brand"
      v-show="!showNav">
      <alph-tooltip
          :tooltip-text="l10n.getText('LABEL_TOOLS_BRAND')"
          :tooltip-direction="tooltipDirection"
      >
        <span class="alpheios-navbuttons__btn disabled">
          <reading-tools-icon></reading-tools-icon>
        </span>
      </alph-tooltip>
    </div>
    <div
        class="alpheios-toolbar__header"
        v-show="showNav"
        :class="{ expanded: contentVisible }"
        @click="contentVisible = !contentVisible"
    >
      <alph-tooltip
          :tooltip-text="l10n.getText('LABEL_TOOLS_CONTROL')"
          :tooltip-direction="tooltipDirection"
      >
        <span class="alpheios-navbuttons__btn"
            :class="{ active: contentVisible }">
          <reading-tools-icon
          />
        </span>
      </alph-tooltip>
      <collapsed-icon
          class="alpheios-toolbar__header-icon-collapsed"
          v-show="!contentVisible"
      />
      <expanded-icon
          class="alpheios-toolbar__header-icon-expanded"
          v-show="contentVisible"
      />
    </div>

    <div
        class="alpheios-toolbar__lookup"
        v-show="lookupVisible"
    >
      <lookup
          :name-base="`toolbar`"
          :show-lang-selector="false"
      />
    </div>

    <div
        class="alpheios-toolbar__buttons"
        v-show="contentVisible">

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_INFLECT_BROWSER')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            @click="ui.togglePanelTab('inflectionsbrowser')"
            class="alpheios-navbuttons__btn"
            :class="{ active: $store.getters['ui/isActiveTab']('inflectionsbrowser') && $store.state.panel.open }"
        >
          <inflections-browser-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_GRAMMAR')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('grammar') && $store.state.panel.open, disabled: !$store.getters[`app/hasGrammarRes`] }"
            class="alpheios-navbuttons__btn"
            @click="ui.togglePanelTab('grammar')"
        >
          <grammar-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_WORDLIST')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('wordlist') && $store.state.panel.open, disabled: !$store.state.app.hasWordListsData }"
            class="alpheios-navbuttons__btn"
            @click="ui.togglePanelTab('wordlist')"
        >
          <wordlist-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_USER')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('user') && $store.state.panel.open, disabled: !$store.state.auth.enableLogin }"
            class="alpheios-navbuttons__btn"
            @click="ui.togglePanelTab('user')"
        >
          <user-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_OPTIONS')"
          :tooltip-direction="tooltipDirection"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('options') && $store.state.panel.open }"
            class="alpheios-navbuttons__btn"
            @click="ui.togglePanelTab('options')"
        >
          <options-icon/>
        </span>
      </alph-tooltip>

      <alph-tooltip
          :tooltip-text="l10n.getText('TOOLTIP_STATUS')"
          :tooltip-direction="tooltipDirection"
          v-show="this.settings.verboseMode()"
      >
        <span
            :class="{ active: $store.getters['ui/isActiveTab']('status') && $store.state.panel.open }"
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
import Logger from '@/lib/log/logger'

import Tooltip from '@/vue/components/tooltip.vue'
// Embeddable SVG icons
import InflectionsBrowserIcon from '@/images/inline-icons/inflections-browser.svg'
import StatusIcon from '@/images/inline-icons/status.svg'
import UserIcon from '@/images/inline-icons/user.svg'
import OptionsIcon from '@/images/inline-icons/options.svg'
import GrammarIcon from '@/images/inline-icons/resources.svg'
// import InfoIcon from '@/images/inline-icons/info.svg'
import HelpIcon from '@/images/inline-icons/help-icon.svg'
import WordlistIcon from '@/images/inline-icons/wordlist-icon.svg'
import CollapsedIcon from '@/images/inline-icons/collapsed.svg'
import ExpandedIcon from '@/images/inline-icons/expanded.svg'
import ReadingToolsIcon from '@/images/inline-icons/reading-tools.svg'
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
    inflectionsBrowserIcon: InflectionsBrowserIcon,
    statusIcon: StatusIcon,
    userIcon: UserIcon,
    optionsIcon: OptionsIcon,
    helpIcon: HelpIcon,
    grammarIcon: GrammarIcon,
    wordlistIcon: WordlistIcon,
    collapsedIcon: CollapsedIcon,
    expandedIcon: ExpandedIcon,
    readingToolsIcon: ReadingToolsIcon,
    lookupIcon: LookupIcon
  },
  interactInstance: null,
  dragTreshold: 100, // Drag distance values above this will be considered abnormal
  // Whether there is an error with Interact.js drag coordinates in the corresponding direction
  dragErrorX: false,
  dragErrorY: false,
  visibleUnwatch: null,
  logger: Logger.getInstance(),

  data: function () {
    return {
      lookupVisible: false,
      contentVisible: false,

      // How much a toolbar has been dragged from its initial position, in pixels
      shift: {
        x: 0,
        y: 0
      },

      // An X position of the central point of a toolbar
      xCenter: undefined
    }
  },

  created () {
    // This is the earliest moment when data props are available
    this.shift.x = this.moduleConfig.initialShift.x
    this.shift.y = this.moduleConfig.initialShift.y
  },

  computed: {
    showNav: function () {
      return this.moduleConfig.showNav
    },
    componentStyles: function () {
      let styles = {
        transform: `translate(${this.shift.x}px, ${this.shift.y}px)`,
        zIndex: this.ui.zIndex
      }

      if (this.moduleConfig) {
        if (this.moduleConfig.initialPos.top) {
          styles.top = this.moduleConfig.initialPos.top
        }
        if (this.moduleConfig.initialPos.right) {
          styles.right = this.moduleConfig.initialPos.right
        }
        if (this.moduleConfig.initialPos.bottom) {
          styles.bottom = this.moduleConfig.initialPos.bottom
        }
        if (this.moduleConfig.initialPos.left) {
          styles.left = this.moduleConfig.initialPos.left
        }
      }
      return styles
    },

    isInLeftHalf: function () {
      if (this.xCenter) {
        return (window.innerWidth / 2 - this.xCenter > 0)
      }
      // Default value is false as the toolbar's default position is at the right
      return false
    },

    componentClasses: function () {
      return this.isInLeftHalf ? 'alpheios-toolbar--left' : 'alpheios-toolbar--right'
    },

    tooltipDirection: function () {
      return this.isInLeftHalf ? 'right' : 'left'
    }
  },

  methods: {
    showHelp() {
      if (! this.$store.state.ui.overrideHelp) {
        this.ui.togglePanelTab('info')
      }
    },

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
          this.$options.logger.log(`Calculated horizontal drag distance is out of bounds: ${dx}. This is probably an error. Dragging in horizontal direction will be disabled.`)
          this.$options.dragErrorX = true
        }
        dx = 0
      }
      if (Math.abs(dy) > this.$options.dragTreshold) {
        if (!this.$options.dragErrorY) {
          this.$options.logger.log(`Calculated vertical drag distance is out of bounds: ${dy}. This is probably an error. Dragging in vertical direction will be disabled.`)
          this.$options.dragErrorY = true
        }
        dy = 0
      }
      this.shift.x += dx
      this.shift.y += dy
    },

    dragEndListener () {
      let boundsCheck = this.isWithinBounds()
      if (!boundsCheck.withinBounds) {
        this.shift.x += boundsCheck.adjX
        this.shift.y += boundsCheck.adjY
      }
      let uiOptions = this.settings.getUiOptions()
      uiOptions.items.toolbarShiftX.setValue(this.shift.x)
      uiOptions.items.toolbarShiftY.setValue(this.shift.y)
      // Recalculate the new position of a toolbar center
      this.xCenter = this.getXCenter()
    },

    /**
     * @typedef {Object} BoundsCheckResult
     * @property {boolean} withinBounds - If the toolbar is within the viewport bounds.
     * @property {number} adjX - How much an X coordinate must be adjusted for the toolbar to fit into the viewport.
     * @property {number} adjY - How much an Y coordinate must be adjusted for the toolbar to fit into the viewport.
     */
    /**
     * Checks if the object is within the viewport bounds and if it is not,
     * calculates how much a toolbar position must be adjusted so that it will fit into the viewport.
     *
     * @returns {BoundsCheckResult} A result of the bounds check
     */
    isWithinBounds () {
      const rect = this.$el.getBoundingClientRect()
      let xAdjustment = 0
      let yAdjustment = 0
      if (rect.x < 0) {
        xAdjustment = -rect.x
      }
      if ((rect.x + rect.width) > this.app.platform.viewport.width) {
        xAdjustment = -(rect.x + rect.width - this.app.platform.viewport.width)
      }
      if (rect.y < 0) {
        yAdjustment = -rect.y
      }
      if ((rect.y + rect.height) > this.app.platform.viewport.height) {
        yAdjustment = -(rect.y + rect.height - this.app.platform.viewport.height)
      }
      return {
        withinBounds: xAdjustment === 0 && yAdjustment === 0,
        adjX: xAdjustment,
        adjY: yAdjustment
      }
    },

    /**
     * Returns a x-coordinate of a central position of the toolbar
     *
     * @returns {number} An x coordinate of a toolbar's center line
     */
    getXCenter () {
      const rect = this.$el.getBoundingClientRect()
      return rect.x + rect.width / 2
    }
  },

  mounted: function () {
    // Calculate an initial position of the central point
    this.xCenter = this.getXCenter()

    this.$options.visibleUnwatch = this.$store.watch((state) => state.toolbar.visible, (value) => {
      if (value) {
        // Check if the viewport is within the bounds of the viewport
        let boundsCheck = this.isWithinBounds()
        if (!boundsCheck.withinBounds) {
          this.shift.x += boundsCheck.adjX
          this.shift.y += boundsCheck.adjY
          this.$options.logger.log(`Toolbar position has been adjusted to stay within the viewport`)
        }
      }
    })

    this.$options.interactInstance = interact(this.$el.querySelector('#alpheios-toolbar-drag-handle'))
      .draggable({
        // It seems that drag restrictions of interact.js are not working at the moment
        // so we have to rely on our own mechanics for that.
        inertia: true,
        autoScroll: false,
        reFrom: 'input, textarea, a[href], select, option'
      })
      .on('dragmove', this.dragMoveListener)
      .on('dragend', this.dragEndListener)
  },

  beforeDestroy () {
    this.visibleUnwatch()
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
      background-color: var(--alpheios-desktop-toolbar-bg);
      border: uisize(1px) solid var(--alpheios-desktop-toolbar-border-color);
      border-radius: uisize(10px);

      fill: var(--alpheios-desktop-toolbar-icon-color);
      stroke: var(--alpheios-desktop-toolbar-icon-color);

      &:hover,
      &.active {
        background-color: var(--alpheios-desktop-toolbar-bg);

        fill: var(--alpheios-desktop-toolbar-icon-color-hover);
        stroke: var(--alpheios-desktop-toolbar-icon-color-hover);
      }

      &.disabled {
        fill: var(--alpheios-desktop-toolbar-icon-color-disabled);
        stroke: var(--alpheios-desktop-toolbar-icon-color-disabled);
        cursor: default;
      }
    }
  }

  .alpheios-toolbar__drag-handle {
    width: uisize($alpheios-toolbar-base-width);
    height: uisize(24px);
    border-bottom: none;
    background: var(--alpheios-desktop-toolbar-bg);
    box-sizing: border-box;
    border-top-left-radius: uisize(10px);
    border-top-right-radius: uisize(10px);
    border-bottom: 1px solid var();
    // Need this for interact.js to work more reliably
    touch-action: none;
  }

  .alpheios-toolbar__lookup-control {
    cursor: pointer;
    background: var(--alpheios-text-bg-color);

    .alpheios-navbuttons__btn {
      margin: 0;
      border-radius: 0;
      border: none;
    }
  }

  .alpheios-toolbar__help-control {
    background: var(--alpheios-text-bg-color);
    .alpheios-navbuttons__btn {
      margin: 0;
      border-radius: 0;
      border: none;
    }
  }

  .alpheios-toolbar__header {
    width: uisize($alpheios-toolbar-base-width);
    border-bottom: none;
    background: var(--alpheios-desktop-toolbar-bg);
    box-sizing: border-box;
    text-align: center;
    border-bottom-left-radius: uisize(10px);
    border-bottom-right-radius: uisize(10px);
    position: relative;
    // Need this for interact.js to work more reliably
    touch-action: none;
    .alpheios-navbuttons__btn {
      margin: 0 0 uisize(4px) 0;
      border: none;
    }
  }

  .alpheios-toolbar__header-icon {
    width: uisize(22px);
    height: auto;
    position: relative;
    top: uisize(4px);
    left: 1px;
    fill: var(--alpheios-desktop-toolbar-icon-color);
    stroke: var( --alpheios-desktop-toolbar-icon-color);
  }

  .alpheios-toolbar__header-icon-collapsed,
  .alpheios-toolbar__header-icon-expanded {
    width: uisize(22px);
    height: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    fill: var(--alpheios-desktop-toolbar-icon-color);
    stroke: var( --alpheios-desktop-toolbar-icon-color);
    cursor: pointer;

    &:hover {
      fill: var(--alpheios-desktop-toolbar-icon-color-hover);
      stroke: var(--alpheios-desktop-toolbar-icon-color-hover);
    }

    .expanded & {
      fill: var(--alpheios-desktop-toolbar-icon-color-active);
      stroke: var(--alpheios-desktop-toolbar-icon-color-active);
    }
  }

  .alpheios-toolbar__header-icon-collapsed {
    top: uisize(24px);
  }

  .alpheios-toolbar__header-icon-expanded {
    top: uisize(34px);
  }

  .alpheios-toolbar__lookup {
    display: flex;
    position: absolute;
    width: uisize(330px);
    height: uisize(160px);
    background: var(--alpheios-lookup-bg);
    left: uisize(-320px);
    top: 0;
    border: uisize(1px) solid var(--alpheios-lookup-border-color);
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
      justify-content: center;
    }

    .alph_tooltip {
      display: inline-block;
    }
  }

  .alpheios-toolbar__buttons {
    display: flex;
    flex-direction: column;

    .alpheios-navbuttons__btn.disabled {
      fill: var(--alpheios-desktop-toolbar-icon-color-disabled);
      stroke: var(--alpheios-desktop-toolbar-icon-color-disabled);

      background-color: var(--alpheios-desktop-toolbar-icon-bg-disabled);
      cursor: default;
    }
  }
</style>
